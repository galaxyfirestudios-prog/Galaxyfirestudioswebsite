import { useEffect, useState } from "react";

import logoImg from "@/imports/galaxy_studio_logo_for_video_without_background.png";
import heroImg from "@/imports/bcff0804-5388-404a-8e04-15f201fad894.JPG";
import deskImg from "@/imports/3fdd97c2-2891-4094-9214-196df630473f.JPG";
import micCloseImg from "@/imports/9b6f958a-50ea-406b-b280-731a77251cd2.JPG";
import micWideImg from "@/imports/2dad0e2f-97cd-4bc5-8a40-6d2ca428cee7.JPG";
import monitorsImg from "@/imports/c896af71-ea06-4d96-9f86-afc747ae9b1f.JPG";
import mpcLitImg from "@/imports/5f761b8a-db00-4f37-be3f-8a9cf9ced4ba.JPG";
import mpcDemoImg from "@/imports/e2706307-4e0c-4c81-8ad8-c2b703520b7a.JPG";
import interfaceImg from "@/imports/e508b057-4fc6-4354-b78c-ed237765bde3.JPG";
import keyboardImg from "@/imports/b58464ee-8826-4dcf-82c2-e782d895a5eb.JPG";
import speakerImg from "@/imports/7aa7a4d2-c05f-4d17-ace1-204719c82c51.JPG";
import promoStudioTimeImg from "@/imports/IMG_3312.PNG";
import promoBeatsImg from "@/imports/IMG_3365.PNG";
import promoSuperstarsImg from "@/imports/IMG_3360.PNG";
import promoMixMasterImg from "@/imports/IMG_3359.PNG";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
  const [shopCategory, setShopCategory] = useState("ALL");
  const [cart, setCart] = useState<Array<{ name: string; price: number; qty: number }>>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [booking, setBooking] = useState({
    service: "The Fire Session",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
    payment: "deposit",
  });

  const bookingServices = [
    { title: "The Fire Session", price: 130000, unit: "6 hours" },
    { title: "Studio Hour", price: 25000, unit: "per hour" },
    { title: "Professional Mix", price: 75000, unit: "per song" },
    { title: "Mastering", price: 35000, unit: "per song" },
    { title: "Mix + Master", price: 100000, unit: "per song" },
    { title: "Production Session", price: 30000, unit: "per hour" },
  ];

  const selectedService = bookingServices.find((service) => service.title === booking.service) || bookingServices[0];
  const amountDue = booking.payment === "deposit" ? Math.round(selectedService.price * 0.5) : selectedService.price;
  const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

  const openBooking = (service?: string) => {
    setBookingSubmitted(false);
    if (service) setBooking((current) => ({ ...current, service }));
    setBookingOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeBooking = () => {
    setBookingOpen(false);
    document.body.style.overflow = "";
  };

  const updateBooking = (field: string, value: string) => {
    setBooking((current) => ({ ...current, [field]: value }));
  };

  useEffect(() => {
    const existing = document.querySelector('script[src="https://js.paystack.co/v2/inline.js"]');
    if (existing) return;
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v2/inline.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const submitBooking = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPaymentError("");

    // Check studio availability before opening Paystack.
    if (
      booking.service === "The Fire Session" ||
      booking.service === "Studio Hour" ||
      booking.service === "Production Session"
    ) {
      const durationHours = booking.service === "The Fire Session" ? 6 : 1;
      const startAt = new Date(`${booking.date}T${booking.time}`);
      const endAt = new Date(startAt.getTime() + durationHours * 60 * 60 * 1000);

      const formatTimestamp = (date: Date) => {
        const pad = (value: number) => String(value).padStart(2, "0");
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
      };

      try {
        const availabilityResponse = await fetch(
          "/api/check-availability",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              startAt: formatTimestamp(startAt),
              endAt: formatTimestamp(endAt),
            }),
          }
        );

        if (!availabilityResponse.ok) {
          const errorText = await availabilityResponse.text();
          console.error("Availability API error:", errorText);
          throw new Error("Could not check studio availability.");
        }

        const available = await availabilityResponse.json();

        if (available !== true) {
          setPaymentError(
            "Sorry, that time is already booked. Please choose another date or time."
          );
          return;
        }
      } catch (error) {
        console.error("Availability check failed:", error);
        setPaymentError(
          "We could not check availability right now. Please try again."
        );
        return;
      }
    }

    setPaymentProcessing(true);

    const reference = `GFS-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "pk_test_f350611c4c768b941d8725e73b122d3d37c9e5d7";

    const openPaystack = () => {
      const PaystackPop = (window as any).PaystackPop;
      if (!PaystackPop) {
        setPaymentProcessing(false);
        setPaymentError("Paystack could not load. Please check your internet connection and try again.");
        return;
      }

      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: publicKey,
        email: booking.email,
        amount: amountDue * 100,
        currency: "NGN",
        reference,
        firstName: booking.name.trim().split(/\s+/)[0],
        phone: booking.phone,
        metadata: {
          custom_fields: [
            { display_name: "Service", variable_name: "service", value: booking.service },
            { display_name: "Booking Date", variable_name: "booking_date", value: booking.date },
            { display_name: "Preferred Time", variable_name: "preferred_time", value: booking.time },
            { display_name: "Payment Type", variable_name: "payment_type", value: booking.payment === "deposit" ? "50% deposit" : "Full payment" },
            { display_name: "Notes", variable_name: "notes", value: booking.notes || "None" },
          ],
        },
        onSuccess: async (transaction: { reference: string }) => {
          try {
            const response = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                reference: transaction.reference,
                expectedAmount: amountDue * 100,
                booking,
              }),
            });

            const result = await response.json();
            if (!response.ok || !result.verified) {
              throw new Error(result.message || "We could not verify the payment.");
            }

            setPaymentReference(transaction.reference);
            setPaymentProcessing(false);
            setBookingSubmitted(true);
          } catch (error) {
            console.error(error);
            setPaymentProcessing(false);
            setPaymentError("Payment was completed, but we could not verify it yet. Please contact us on WhatsApp with your payment reference: " + transaction.reference);
          }
        },
        onCancel: () => {
          setPaymentProcessing(false);
        },
      });
    };

    if ((window as any).PaystackPop) {
      openPaystack();
    } else {
      const waitForPaystack = window.setInterval(() => {
        if ((window as any).PaystackPop) {
          window.clearInterval(waitForPaystack);
          openPaystack();
        }
      }, 150);
      window.setTimeout(() => {
        window.clearInterval(waitForPaystack);
        if (!(window as any).PaystackPop) {
          setPaymentProcessing(false);
          setPaymentError("Paystack could not load. Please refresh the page and try again.");
        }
      }, 8000);
    }
  };

  // Product images are hotlinked from reputable product/manufacturer/retailer pages so the catalogue shows the real gear immediately.
  const productImages: Record<string, string> = {
    at2020: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Audio-technica_AT2020.JPG",
    at2035: micWideImg,
    at2050: micCloseImg,
    at2020usb: micWideImg,
    se4400: micWideImg,
    behr_c1: "https://www.rekormuzik.com/UserFiles/Fotograflar/org/1057-7679-jpg-7679.jpg",
    se_x1a: "https://f.fcdn.app/imgs/ebb194/www.palaciodelamusica.com.uy/pmusuy/bfdc/webp/catalogo/X1A-X1A_1/1024-1024/microfono-condensador-se-electronics-x1a-microfono-condensador-se-electronics-x1a.jpg",
    behr_c3: micWideImg,
    m20x: "https://thumbs.static-thomann.de/thumb//bdbmagic/pics/prod/331902.jpg",
    m30x: monitorsImg,
    m40x: "https://cdn11.bigcommerce.com/s-hsjzdjtp1u/images/stencil/1280x1280/products/64698/55844/casque-audio-technica-ath-m40x-zoom__16015.1718060705.jpg?c=1",
    m50x: monitorsImg,
    hd280: "https://thumbs.static-thomann.de/thumb//bdbmagic/pics/prod/400099.jpg",
    umc204: interfaceImg,
    minifuse1: interfaceImg,
    ssl2: interfaceImg,
    yamaha_hs5: "https://www.bonnersmusic.co.uk/cdn/shop/products/yamaha-hs5-w_e3c7a1a2-e710-490a-946e-d6a5bfaa0b8a.jpg?v=1704218616&width=1946",
    iloud: monitorsImg,
    mpkmini: "https://ortizo.com.co/cdn/shop/files/SE00883.jpg?v=1755619114&width=480",
  };

  const storeProducts = [
    { id: "at2020", name: "Audio-Technica AT2020", category: "MICROPHONES", price: 187500, marketPrice: 150000, stock: 5, badge: "BEST SELLER", image: productImages.at2020, description: "Cardioid condenser microphone for clean, detailed vocal and instrument recording." },
    { id: "at2035", name: "Audio-Technica AT2035", category: "MICROPHONES", price: 356250, marketPrice: 285000, stock: 3, badge: "PRO VOCALS", image: productImages.at2035, description: "Large-diaphragm condenser with a smooth, detailed response for serious vocal recording." },
    { id: "at2050", name: "Audio-Technica AT2050", category: "MICROPHONES", price: 481250, marketPrice: 385000, stock: 2, badge: "VERSATILE", image: productImages.at2050, description: "Multi-pattern condenser for vocals, instruments and flexible studio recording." },
    { id: "at2020usb", name: "Audio-Technica AT2020USB+", category: "MICROPHONES", price: 243750, marketPrice: 195000, stock: 3, badge: "USB", image: productImages.at2020usb, description: "USB condenser microphone for creators, vocalists and home studios." },
    { id: "se-x1a", name: "sE Electronics X1 A", category: "MICROPHONES", price: 182500, marketPrice: 146000, stock: 3, badge: "VALUE PICK", image: productImages.se_x1a, description: "Accessible large-diaphragm condenser for vocals, voiceover and instruments." },
    { id: "se4400", name: "sE Electronics sE4400", category: "MICROPHONES", price: 1061250, marketPrice: 849000, stock: 1, badge: "ELITE", image: productImages.se4400, description: "Premium multi-pattern condenser built for demanding studio sessions." },
    { id: "uad-sd1", name: "Universal Audio SD-1", category: "MICROPHONES", price: 537500, marketPrice: 430000, stock: 1, badge: "BROADCAST", image: micCloseImg, description: "Dynamic microphone suited to vocals, broadcast, podcasting and spoken word." },
    { id: "behr-c1", name: "Behringer C-1", category: "MICROPHONES", price: 98125, marketPrice: 78500, stock: 5, badge: "STARTER", image: productImages.behr_c1, description: "Affordable large-diaphragm condenser for first studios and project setups." },
    { id: "m20x", name: "Audio-Technica ATH-M20x", category: "HEADPHONES", price: 106250, marketPrice: 85000, stock: 8, badge: "STARTER", image: productImages.m20x, description: "Closed-back monitoring headphones for recording, editing and everyday studio work." },
    { id: "m30x", name: "Audio-Technica ATH-M30x", category: "HEADPHONES", price: 156250, marketPrice: 125000, stock: 5, badge: "STUDIO", image: productImages.m30x, description: "Professional closed-back headphones with detailed midrange monitoring." },
    { id: "m40x", name: "Audio-Technica ATH-M40x", category: "HEADPHONES", price: 225000, marketPrice: 180000, stock: 5, badge: "MIXING", image: productImages.m40x, description: "Accurate, foldable monitoring headphones designed for critical listening." },
    { id: "m50x", name: "Audio-Technica ATH-M50x", category: "HEADPHONES", price: 287500, marketPrice: 230000, stock: 5, badge: "PRO", image: productImages.m50x, description: "Industry-popular closed-back headphones for tracking and mixing." },
    { id: "hd200", name: "Sennheiser HD 200 PRO", category: "HEADPHONES", price: 143750, marketPrice: 115000, stock: 5, badge: "VALUE PICK", image: monitorsImg, description: "Closed-back studio headphones for focused monitoring and recording." },
    { id: "hd280", name: "Sennheiser HD 280 PRO", category: "HEADPHONES", price: 193750, marketPrice: 155000, stock: 4, badge: "CLASSIC", image: productImages.hd280, description: "Reliable closed-back headphones with strong isolation for tracking." },
    { id: "umc204", name: "Behringer UMC204HD", category: "INTERFACES", price: 156875, marketPrice: 125500, stock: 5, badge: "STARTER", image: productImages.umc204, description: "Two-input USB audio interface for recording vocals, instruments and production." },
    { id: "minifuse1", name: "Arturia MiniFuse 1", category: "INTERFACES", price: 190813, marketPrice: 152650, stock: 4, badge: "COMPACT", image: productImages.minifuse1, description: "Compact USB interface for creators who want a clean, portable setup." },
    { id: "volt1", name: "Universal Audio Volt 1", category: "INTERFACES", price: 256250, marketPrice: 205000, stock: 3, badge: "CREATOR", image: interfaceImg, description: "USB audio interface with classic-style preamp processing for vocals and instruments." },
    { id: "id4", name: "Audient iD4 MKII", category: "INTERFACES", price: 287500, marketPrice: 230000, stock: 3, badge: "VOCALS", image: interfaceImg, description: "High-quality compact interface with a strong mic preamp for vocal recording." },
    { id: "volt2", name: "Universal Audio Volt 2", category: "INTERFACES", price: 343750, marketPrice: 275000, stock: 3, badge: "POPULAR", image: interfaceImg, description: "Two-channel USB interface for artists, producers and home studios." },
    { id: "ssl2", name: "Solid State Logic SSL 2", category: "INTERFACES", price: 351875, marketPrice: 281500, stock: 3, badge: "PRO PICK", image: productImages.ssl2, description: "Professional two-input interface with SSL workflow and analogue character." },
    { id: "id14", name: "Audient iD14 MKII", category: "INTERFACES", price: 431250, marketPrice: 345000, stock: 2, badge: "EXPANDABLE", image: interfaceImg, description: "Feature-rich interface for producers and engineers needing more I/O." },
    { id: "ssl2plus", name: "Solid State Logic SSL 2+", category: "INTERFACES", price: 483125, marketPrice: 386500, stock: 2, badge: "PRO", image: interfaceImg, description: "Expanded SSL interface with extra outputs and MIDI connectivity." },
    { id: "iloud", name: "IK Multimedia iLoud Micro Monitor Pair", category: "MONITORS", price: 562500, marketPrice: 450000, stock: 2, badge: "SMALL ROOM", image: productImages.iloud, description: "Compact reference monitor pair designed for accurate monitoring in small spaces." },
    { id: "kali-lp6", name: "Kali Audio LP-6 V2 Pair", category: "MONITORS", price: 685781, marketPrice: 548625, stock: 2, badge: "MIXING", image: speakerImg, description: "Six-inch nearfield monitor pair for serious home and project studios." },
    { id: "yamaha-hs5", name: "Yamaha HS5 Pair", category: "MONITORS", price: 981250, marketPrice: 785000, stock: 2, badge: "REFERENCE", image: productImages.yamaha_hs5, description: "Five-inch nearfield reference monitor pair for honest mixing decisions." },
    { id: "krk-r5", name: "KRK Rokit 5 G4 Pair", category: "MONITORS", price: 1000000, marketPrice: 800000, stock: 2, badge: "PRODUCER", image: speakerImg, description: "Five-inch studio monitor pair with the familiar KRK low-end response." },
    { id: "genelec8010", name: "Genelec 8010A Pair", category: "MONITORS", price: 1187500, marketPrice: 950000, stock: 1, badge: "ELITE", image: speakerImg, description: "Premium compact reference monitors for professional production environments." },
    { id: "minilab3", name: "Arturia MiniLab 3", category: "MIDI & DRUMS", price: 275000, marketPrice: 220000, stock: 3, badge: "BEST SELLER", image: keyboardImg, description: "Compact MIDI controller for beat-making, melodies and production workflows." },
    { id: "mpkmini", name: "Akai MPK Mini", category: "MIDI & DRUMS", price: 275000, marketPrice: 220000, stock: 3, badge: "PRODUCER", image: productImages.mpkmini, description: "Portable MIDI keyboard with pads for beat-making and mobile production." },
    { id: "maschine", name: "Native Instruments Maschine Mikro MK3", category: "MIDI & DRUMS", price: 437500, marketPrice: 350000, stock: 2, badge: "BEATMAKER", image: mpcLitImg, description: "Pad controller for drums, samples and hands-on beat production." },
    { id: "tr8s", name: "Roland TR-8S", category: "MIDI & DRUMS", price: 1250000, marketPrice: 1000000, stock: 1, badge: "DRUM MACHINE", image: mpcDemoImg, description: "Professional rhythm performer for electronic drums, patterns and live production." },
    { id: "popfilter", name: "Professional Studio Pop Filter", category: "ACCESSORIES", price: 31250, marketPrice: 25000, stock: 10, badge: "ESSENTIAL", image: micCloseImg, description: "Reduces plosives and protects the microphone during vocal recording." },
    { id: "reflexion", name: "sE Reflexion Filter X", category: "ACCESSORIES", price: 175000, marketPrice: 140000, stock: 3, badge: "VOCAL", image: micWideImg, description: "Reflection-control accessory for cleaner vocal recordings in untreated spaces." },
    { id: "boomstand", name: "Heavy-Duty Boom Mic Stand", category: "ACCESSORIES", price: 62500, marketPrice: 50000, stock: 8, badge: "ESSENTIAL", image: micWideImg, description: "Stable boom stand for studio microphones and vocal setups." },
    { id: "xlr3", name: "Premium XLR Cable 3m", category: "ACCESSORIES", price: 25000, marketPrice: 20000, stock: 15, badge: "CABLE", image: interfaceImg, description: "Balanced XLR cable for microphones, interfaces and professional connections." },
    { id: "shockmount", name: "Universal Microphone Shock Mount", category: "ACCESSORIES", price: 37500, marketPrice: 30000, stock: 8, badge: "ESSENTIAL", image: micCloseImg, description: "Helps isolate the microphone from stand vibration and handling noise." },
    { id: "isopads", name: "Studio Monitor Isolation Pads", category: "ACCESSORIES", price: 43750, marketPrice: 35000, stock: 8, badge: "MONITORING", image: speakerImg, description: "Decouples studio monitors from desks and stands for cleaner low-end response." },
  ];

  const storeCategories = ["ALL", "MICROPHONES", "HEADPHONES", "INTERFACES", "MONITORS", "MIDI & DRUMS", "ACCESSORIES"];
  const visibleProducts = shopCategory === "ALL" ? storeProducts : storeProducts.filter((p) => p.category === shopCategory);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const addToCart = (product: (typeof storeProducts)[number]) => {
    setCart((current) => {
      const existing = current.find((item) => item.name === product.name);
      if (existing) return current.map((item) => item.name === product.name ? { ...item, qty: item.qty + 1 } : item);
      return [...current, { name: product.name, price: product.price, qty: 1 }];
    });
    setCartOpen(true);
  };
  const removeFromCart = (name: string) => setCart((current) => current.filter((item) => item.name !== name));
  const shopCheckout = () => {
    const order = cart.map((item) => `${item.qty}x ${item.name} — ${formatNaira(item.price * item.qty)}`).join("%0A");
    const message = `Hi Galaxy Fire Studios, I want to order:%0A%0A${order}%0A%0AEstimated product total: ${formatNaira(cartTotal)}%0APlease confirm availability, shipping and handling for my location.`;
    window.open(`https://wa.me/2348035345977?text=${message}`, "_blank", "noopener,noreferrer");
  };

  const services = [
    { number: "01", title: "RECORDING", text: "Professional recording sessions engineered to capture your performance with clarity, character and impact." },
    { number: "02", title: "MUSIC PRODUCTION", text: "Build your record from the first idea. Beat production, arrangement, sound selection and creative development." },
    { number: "03", title: "VOCAL PRODUCTION", text: "Performance direction, harmonies, ad-libs, vocal arrangement and detailed vocal preparation." },
    { number: "04", title: "MIXING", text: "Turn your recordings into a finished record with balance, depth, punch and clarity." },
    { number: "05", title: "MASTERING", text: "Give your finished music the final polish it needs before it reaches the world." },
    { number: "06", title: "RELEASE SUPPORT", text: "Get help preparing your music for release, including metadata, distribution guidance and release planning." },
  ];

  return (
    <div className="site">

      {/* NAVIGATION */}
      <header className="nav">
        <div className="logo">
          <img src={logoImg} alt="Galaxy Studios logo" className="logo-img" />
          <div>
            <div className="logo-title">GALAXY FIRE</div>
            <div className="logo-sub">STUDIOS · EST. 2020</div>
          </div>
        </div>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#studio">STUDIO</a>
          <a href="#services">SERVICES</a>
          <a href="#pricing">PRICING</a>
          <a href="#gallery">GALLERY</a>
          <a href="#shop">SHOP</a>
          <a href="#contact">CONTACT</a>
        </nav>

        <a className="nav-button" href="#booking">BOOK A SESSION</a>

        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </header>


      {/* HERO */}
      <section className="hero">
        <img src={heroImg} alt="Galaxy Studios control room" className="hero-photo" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="eyebrow">PROFESSIONAL RECORDING STUDIO · NIGERIA</div>
          <h1>YOUR SOUND.<br /><span>YOUR FIRE.</span></h1>
          <p>A professional recording and production studio built for artists who take their music seriously.</p>
          <div className="hero-buttons">
            <a href="#booking" className="button red">BOOK A SESSION</a>
            <a href="#studio" className="button outline">EXPLORE THE STUDIO</a>
          </div>
          <div className="hero-est">EST. 2020</div>
        </div>
        <div className="scroll">SCROLL TO EXPLORE <span>↓</span></div>
      </section>


      {/* INTRO */}
      <section className="intro" id="studio">
        <div className="intro-text">
          <div className="section-number">01 / THE STUDIO</div>
          <h2>ONE ROOM.<br /><span>BUILT FOR CREATION.</span></h2>
          <p>Galaxy Fire Studios is a professional recording and production environment created for artists, producers and creators who want more from their music.</p>
          <p>From the first vocal take to the final master, we give you the space, tools and expertise to bring your vision to life.</p>
          <div className="stats">
            <div><strong>2020</strong><span>ESTABLISHED</span></div>
            <div><strong>01</strong><span>STUDIO ROOM</span></div>
            <div><strong>∞</strong><span>POSSIBILITIES</span></div>
          </div>
        </div>
        <div className="intro-image">
          <img src={deskImg} alt="Galaxy Studios full desk setup with dual monitors and MPC" className="section-photo" />
        </div>
      </section>


      {/* STUDIO EXPERIENCE */}
      <section className="experience">
        <div className="experience-image">
          <img src={micWideImg} alt="Condenser microphone with acoustic shield in the recording room" className="section-photo" />
        </div>
        <div className="experience-content">
          <div className="section-number">02 / THE EXPERIENCE</div>
          <h2>WALK IN WITH<br /><span>AN IDEA.</span></h2>
          <h3>WALK OUT WITH A RECORD.</h3>
          <p>Galaxy Fire is designed to keep you focused on what matters — making great music.</p>
          <div className="steps">
            <div className="step"><span>01</span><div><strong>BOOK</strong><p>Choose your service and session.</p></div></div>
            <div className="step"><span>02</span><div><strong>CREATE</strong><p>Come into the studio and make the record.</p></div></div>
            <div className="step"><span>03</span><div><strong>REFINE</strong><p>Record, produce, mix and shape the sound.</p></div></div>
            <div className="step"><span>04</span><div><strong>RELEASE</strong><p>Leave with music ready for the world.</p></div></div>
          </div>
        </div>
      </section>


      {/* SERVICES */}
      <section className="services" id="services">
        <div className="section-heading">
          <div className="section-number">03 / SERVICES</div>
          <h2>WHAT<br /><span>WE DO.</span></h2>
          <p>Everything you need to take an idea from the first recording to a finished release.</p>
        </div>
        <div className="service-grid">
          {services.map((s) => (
            <div className="service-card" key={s.number}>
              <div className="service-number">{s.number}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <a href="#booking">GET STARTED →</a>
            </div>
          ))}
        </div>
      </section>


      {/* FEATURE BANNER */}
      <section className="feature">
        <div className="feature-image">
          <img src={monitorsImg} alt="Studio monitor speakers and audio interface on the mixing desk" className="feature-photo" />
          <div className="feature-overlay" />
          <div className="feature-content">
            <div className="eyebrow">THE GALAXY FIRE STANDARD</div>
            <h2>GREAT MUSIC<br /><span>STARTS HERE.</span></h2>
            <a href="#booking" className="button red">BOOK YOUR SESSION</a>
          </div>
        </div>
      </section>


      {/* PRICING */}
      <section className="pricing" id="pricing">
        <div className="section-heading center">
          <div className="section-number">04 / PRICING</div>
          <h2>STUDIO<br /><span>RATES.</span></h2>
          <p>Professional services. Straightforward pricing. No unnecessary complications.</p>
        </div>
        <div className="pricing-grid">

          <div className="price-card featured">
            <div className="popular">MOST POPULAR</div>
            <div className="price-category">RECORDING</div>
            <h3>THE FIRE SESSION</h3>
            <div className="price">₦130,000</div>
            <div className="price-detail">6 HOURS · ENGINEER INCLUDED</div>
            <ul>
              <li>Studio access</li><li>Recording engineer</li><li>Vocal recording</li>
              <li>Basic vocal editing</li><li>Professional monitoring</li><li>Session files</li>
            </ul>
            <button type="button" className="price-button" onClick={() => openBooking("The Fire Session")}>BOOK THE FIRE SESSION →</button>
          </div>

          <div className="price-card">
            <div className="price-category">RECORDING</div>
            <h3>STUDIO HOUR</h3>
            <div className="price">₦25,000</div>
            <div className="price-detail">PER HOUR · ENGINEER INCLUDED</div>
            <ul>
              <li>Studio access</li><li>Recording engineer</li>
              <li>Professional recording setup</li><li>Session files</li>
            </ul>
            <button type="button" className="price-button" onClick={() => openBooking("Studio Hour")}>BOOK →</button>
          </div>

          <div className="price-card">
            <div className="price-category">MIXING</div>
            <h3>PROFESSIONAL MIX</h3>
            <div className="price">₦75,000</div>
            <div className="price-detail">PER SONG</div>
            <ul>
              <li>Full song mix</li><li>Vocal processing</li>
              <li>EQ &amp; compression</li><li>Effects</li><li>2 revisions</li>
            </ul>
            <button type="button" className="price-button" onClick={() => openBooking("Professional Mix")}>START A MIX →</button>
          </div>

          <div className="price-card">
            <div className="price-category">MASTERING</div>
            <h3>MASTERING</h3>
            <div className="price">₦35,000</div>
            <div className="price-detail">PER SONG</div>
            <ul>
              <li>Professional mastering</li><li>Streaming-ready master</li>
              <li>WAV delivery</li><li>MP3 reference</li>
            </ul>
            <button type="button" className="price-button" onClick={() => openBooking("Mastering")}>MASTER MY SONG →</button>
          </div>

          <div className="price-card">
            <div className="price-category">COMPLETE</div>
            <h3>MIX + MASTER</h3>
            <div className="price">₦100,000</div>
            <div className="price-detail">PER SONG</div>
            <ul>
              <li>Professional mix</li><li>Vocal processing</li>
              <li>2 mix revisions</li><li>Final master</li><li>WAV + MP3</li>
            </ul>
            <button type="button" className="price-button" onClick={() => openBooking("Mix + Master")}>COMPLETE MY SONG →</button>
          </div>

          <div className="price-card">
            <div className="price-category">PRODUCTION</div>
            <h3>PRODUCTION SESSION</h3>
            <div className="price">₦30,000</div>
            <div className="price-detail">PER HOUR</div>
            <ul>
              <li>Beat production</li><li>Arrangement</li>
              <li>Sound selection</li><li>MIDI production</li><li>Creative direction</li>
            </ul>
            <button type="button" className="price-button" onClick={() => openBooking("Production Session")}>START CREATING →</button>
          </div>

        </div>
      </section>


      {/* GALLERY */}
      <section className="gallery" id="gallery">
        <div className="section-heading">
          <div className="section-number">05 / GALLERY</div>
          <h2>INSIDE<br /><span>THE FIRE.</span></h2>
        </div>
        <div className="gallery-grid">
          <div className="gallery-large">
            <img src={heroImg} alt="Galaxy Studios control room with mixing desk and booth window" className="gallery-photo" />
            <div className="gallery-caption">THE CONTROL ROOM</div>
          </div>
          <div className="gallery-col">
            <div className="gallery-small">
              <img src={micCloseImg} alt="Condenser microphone in the red acoustic vocal booth" className="gallery-photo" />
              <div className="gallery-caption">THE VOCAL BOOTH</div>
            </div>
            <div className="gallery-small">
              <img src={mpcLitImg} alt="AKAI MPC X with lit cyan performance pads" className="gallery-photo" />
              <div className="gallery-caption">PRODUCTION</div>
            </div>
            <div className="gallery-small">
              <img src={speakerImg} alt="Studio monitor speaker cone close-up against red velvet wall" className="gallery-photo" />
              <div className="gallery-caption">THE MONITORS</div>
            </div>
          </div>
        </div>

        {/* Second row */}
        <div className="gallery-row2">
          <div className="gallery-med">
            <img src={deskImg} alt="Full studio desk with dual monitors, MPC and studio monitors" className="gallery-photo" />
            <div className="gallery-caption">THE DESK</div>
          </div>
          <div className="gallery-med">
            <img src={keyboardImg} alt="Studio keyboard with blue LED lighting" className="gallery-photo" />
            <div className="gallery-caption">THE KEYS</div>
          </div>
          <div className="gallery-med">
            <img src={monitorsImg} alt="AKG headphones and studio monitor on mixing desk" className="gallery-photo" />
            <div className="gallery-caption">MONITORING</div>
          </div>
        </div>

        {/* Third row */}
        <div className="gallery-row2" style={{marginTop: '12px'}}>
          <div className="gallery-med">
            <img src={micWideImg} alt="Microphone with acoustic shield in the recording room" className="gallery-photo" />
            <div className="gallery-caption">THE MIC SETUP</div>
          </div>
          <div className="gallery-med">
            <img src={mpcDemoImg} alt="AKAI MPC X showing genre demo selection screen" className="gallery-photo" />
            <div className="gallery-caption">THE MPC</div>
          </div>
          <div className="gallery-med">
            <img src={interfaceImg} alt="Universal Audio interface close-up on the studio desk" className="gallery-photo" />
            <div className="gallery-caption">AUDIO INTERFACE</div>
          </div>
        </div>
      </section>



      {/* PRO AUDIO SHOP */}
      <section className="shop" id="shop">
        <div className="section-heading shop-heading">
          <div className="section-number">06 / GALAXY FIRE SHOP</div>
          <h2>BUILD<br /><span>YOUR SETUP.</span></h2>
          <p>Studio microphones, interfaces, monitors, headphones, MIDI gear and the essentials you need to create.</p>
        </div>
        <div className="shop-toolbar">
          <div className="shop-categories">
            {storeCategories.map((category) => (
              <button key={category} className={shopCategory === category ? "shop-filter active" : "shop-filter"} onClick={() => setShopCategory(category)}>{category}</button>
            ))}
          </div>
          <button className="cart-button" onClick={() => setCartOpen(true)}>CART <span>{cartCount}</span></button>
        </div>
        <div className="shop-grid">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image-wrap">
                <img src={product.image} alt={`${product.name} studio equipment`} className="product-image" />
                <span className="product-badge">{product.badge}</span>
              </div>
              <div className="product-info">
                <div className="product-category">{product.category}</div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-price">{formatNaira(product.price)}</div>
                <div className="product-meta">MARKET {formatNaira(product.marketPrice)} · 25% GALAXY FIRE MARKUP</div>
                <div className="product-stock">{product.stock <= 2 ? "SPECIAL ORDER / LIMITED STOCK" : "IN STOCK"}</div>
                <button className="product-button" onClick={() => addToCart(product)}>ADD TO CART →</button>
              </div>
            </article>
          ))}
        </div>
        <div className="shop-note">
          <strong>SHIPPING & HANDLING</strong>
          <span>Calculated separately at checkout based on destination, product size and courier cost. Product prices already include the Galaxy Fire 25% retail markup.</span>
        </div>
      </section>

      {cartOpen && (
        <div className="cart-drawer-backdrop" onClick={() => setCartOpen(false)}>
          <aside className="cart-drawer" onClick={(event) => event.stopPropagation()}>
            <button className="cart-close" onClick={() => setCartOpen(false)}>×</button>
            <div className="section-number">YOUR CART</div>
            <h2>READY TO<br /><span>ORDER?</span></h2>
            {cart.length === 0 ? <p>Your cart is empty. Add some studio gear.</p> : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.name}>
                      <div><strong>{item.name}</strong><span>{item.qty} × {formatNaira(item.price)}</span></div>
                      <button onClick={() => removeFromCart(item.name)}>REMOVE</button>
                    </div>
                  ))}
                </div>
                <div className="cart-total"><span>PRODUCT TOTAL</span><strong>{formatNaira(cartTotal)}</strong></div>
                <p className="cart-shipping">Shipping & handling is calculated separately. We will confirm the exact delivery charge before payment.</p>
                <button className="button red cart-checkout" onClick={shopCheckout}>ORDER VIA WHATSAPP →</button>
              </>
            )}
          </aside>
        </div>
      )}

      {/* PROMO / SOCIAL */
      <section className="promo-section">
        <div className="section-heading">
          <div className="section-number">07 / THE WORD</div>
          <h2>SPREAD<br /><span>THE FIRE.</span></h2>
          <p>Galaxy Fire Studios — where beats get built, voices get captured, and music gets finished.</p>
        </div>
        <div className="promo-grid">
          <div className="promo-card">
            <img src={promoStudioTimeImg} alt="Need some studio time? Reach out today" className="promo-img" />
          </div>
          <div className="promo-card">
            <img src={promoBeatsImg} alt="Do you need beats or engineering? Contact us today" className="promo-img" />
          </div>
          <div className="promo-card">
            <img src={promoSuperstarsImg} alt="Bring out the superstar in you — contact us now" className="promo-img" />
          </div>
          <div className="promo-card">
            <img src={promoMixMasterImg} alt="Need to mix and master your music? Reach out to us today" className="promo-img" />
          </div>
        </div>
      </section>


      {/* WHY GALAXY FIRE */}
      <section className="why">
        <div className="why-content">
          <div className="section-number">06 / THE STANDARD</div>
          <h2>YOUR MUSIC.<br /><span>OUR CRAFT.</span></h2>
          <div className="why-grid">
            <div><strong>01</strong><h3>PROFESSIONAL</h3><p>A serious environment for serious music.</p></div>
            <div><strong>02</strong><h3>CREATIVE</h3><p>A space designed to keep artists focused on creating.</p></div>
            <div><strong>03</strong><h3>PERSONAL</h3><p>Your record isn&#39;t treated like just another session.</p></div>
            <div><strong>04</strong><h3>QUALITY</h3><p>Every detail matters from recording to final master.</p></div>
          </div>
        </div>
      </section>


      {/* BOOKING */}
      <section className="booking" id="booking">
        <img src={interfaceImg} alt="Studio audio interface" className="booking-photo" />
        <div className="booking-overlay" />
        <div className="booking-content">
          <div className="eyebrow">GALAXY FIRE STUDIOS · EST. 2020</div>
          <h2>READY TO<br /><span>MAKE SOME FIRE?</span></h2>
          <p>Choose your service, preferred session time and payment option. We will confirm your slot with you.</p>
          <div className="booking-buttons">
            <button type="button" className="button red" onClick={() => openBooking()}>BOOK & PAY ONLINE</button>
            <a href="https://wa.me/2348035345977" className="button outline">BOOK VIA WHATSAPP</a>
          </div>
          <div className="contact-details">
            <div><span>EMAIL</span>galaxyfirestudios@gmail.com</div>
            <div><span>PHONE / WHATSAPP</span>+234 803 534 5977</div>
          </div>
        </div>
      </section>

      {bookingOpen && (
        <div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
          <div className="booking-modal-backdrop" onClick={closeBooking} />
          <div className="booking-modal-card">
            <button type="button" className="booking-close" onClick={closeBooking} aria-label="Close booking form">×</button>
            {!bookingSubmitted ? (
              <>
                <div className="section-number">BOOKING / 01</div>
                <h2 id="booking-title">BOOK YOUR<br /><span>SESSION.</span></h2>
                <p className="booking-modal-intro">Reserve your preferred slot and choose whether you want to pay a 50% deposit or the full amount.</p>
                <form onSubmit={submitBooking} className="booking-form">
                  <label>
                    SERVICE
                    <select value={booking.service} onChange={(e) => updateBooking("service", e.target.value)}>
                      {bookingServices.map((service) => (
                        <option key={service.title} value={service.title}>{service.title} — {formatNaira(service.price)}</option>
                      ))}
                    </select>
                  </label>
                  <div className="booking-form-grid">
                    <label>DATE<input required type="date" min={new Date().toISOString().split("T")[0]} value={booking.date} onChange={(e) => updateBooking("date", e.target.value)} /></label>
                    <label>PREFERRED TIME<input required type="time" value={booking.time} onChange={(e) => updateBooking("time", e.target.value)} /></label>
                  </div>
                  <div className="booking-form-grid">
                    <label>FULL NAME<input required type="text" placeholder="Your name" value={booking.name} onChange={(e) => updateBooking("name", e.target.value)} /></label>
                    <label>PHONE / WHATSAPP<input required type="tel" placeholder="080..." value={booking.phone} onChange={(e) => updateBooking("phone", e.target.value)} /></label>
                  </div>
                  <label>EMAIL<input required type="email" placeholder="you@example.com" value={booking.email} onChange={(e) => updateBooking("email", e.target.value)} /></label>
                  <label>NOTES / SONG DETAILS<textarea rows={3} placeholder="Tell us anything we should know before the session..." value={booking.notes} onChange={(e) => updateBooking("notes", e.target.value)} /></label>
                  <div className="payment-options">
                    <button type="button" className={booking.payment === "deposit" ? "payment-option active" : "payment-option"} onClick={() => updateBooking("payment", "deposit")}><span>50% DEPOSIT</span><strong>{formatNaira(selectedService.price * 0.5)}</strong><small>Secure your booking</small></button>
                    <button type="button" className={booking.payment === "full" ? "payment-option active" : "payment-option"} onClick={() => updateBooking("payment", "full")}><span>FULL PAYMENT</span><strong>{formatNaira(selectedService.price)}</strong><small>Pay in full</small></button>
                  </div>
                  <div className="booking-total"><span>AMOUNT DUE</span><strong>{formatNaira(amountDue)}</strong></div>
                  <button className="button red booking-submit" type="submit" disabled={paymentProcessing}>
                    {paymentProcessing ? "OPENING PAYSTACK..." : `PAY ${formatNaira(amountDue)} WITH PAYSTACK →`}
                  </button>
                  {paymentError && <p className="booking-payment-error" role="alert">{paymentError}</p>}
                  <p className="booking-payment-note">Secure payment is processed by Paystack. Your booking is confirmed only after the payment is verified.</p>
                </form>
              </>
            ) : (
              <div className="booking-success">
                <div className="success-mark">✓</div>
                <div className="section-number">BOOKING REQUEST SENT</div>
                <h2>YOU'RE ON<br /><span>THE LIST.</span></h2>
                <p>Your payment has been received and verified. Galaxy Fire Studios will contact you to confirm your session slot.</p>
                {paymentReference && <p className="booking-reference">PAYMENT REFERENCE: <strong>{paymentReference}</strong></p>}
                <div className="booking-success-actions">
                  <a className="button outline" href={`https://wa.me/2348035345977?text=${encodeURIComponent(`Hi Galaxy Fire Studios, I just paid for ${booking.service}. Payment reference: ${paymentReference}. My preferred date/time is ${booking.date} at ${booking.time}.`)}`} target="_blank" rel="noreferrer">MESSAGE US ON WHATSAPP</a>
                  <button type="button" className="button red" onClick={closeBooking}>DONE</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer id="contact">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo">
              <img src={logoImg} alt="Galaxy Studios logo" className="logo-img" />
              <div>
                <div className="logo-title">GALAXY FIRE</div>
                <div className="logo-sub">STUDIOS · EST. 2020</div>
              </div>
            </div>
            <p>Record. Create. Ignite.</p>
          </div>
          <div className="footer-links">
            <div>
              <span>EXPLORE</span>
              <a href="#studio">Studio</a>
              <a href="#services">Services</a>
              <a href="#pricing">Pricing</a>
              <a href="#gallery">Gallery</a>
            </div>
            <div>
              <span>CONTACT</span>
              <a href="#booking">Book a Session</a>
              <a href="mailto:galaxyfirestudios@gmail.com">Email Us</a>
              <a href="https://wa.me/2348035345977">WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 GALAXY FIRE STUDIOS</span>
          <span>EST. 2020 · NIGERIA</span>
        </div>
      </footer>


      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        body {
          margin: 0;
          font-family: 'Barlow', Arial, sans-serif;
          background: #080808;
          color: white;
        }

        .site { background: #080808; overflow: hidden; }
        a { color: inherit; text-decoration: none; }

        /* NAV */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; height: 82px; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 5%;
          background: rgba(5,5,5,.92);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(255,255,255,.07);
        }

        .logo { display: flex; align-items: center; gap: 12px; }

        .logo-img {
          width: 46px; height: 46px;
          object-fit: contain;
          border-radius: 50%;
        }

        .logo-title { font-family: 'Barlow Condensed', sans-serif; font-size: 15px; font-weight: 900; letter-spacing: 2px; }
        .logo-sub { margin-top: 3px; font-size: 8px; letter-spacing: 2px; color: #888; font-family: 'Barlow Condensed', sans-serif; }

        .nav-links { display: flex; gap: 34px; font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; }
        .nav-links a { transition: color .2s; }
        .nav-links a:hover { color: #e50914; }

        .nav-button {
          padding: 13px 22px;
          background: #e50914;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px; font-weight: 900; letter-spacing: 1px;
        }

        .menu-button { display: none; background: none; color: white; border: none; font-size: 22px; cursor: pointer; }

        /* HERO */
        .hero { min-height: 100vh; position: relative; display: flex; align-items: center; }

        .hero-photo {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: center;
        }

        .hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, rgba(0,0,0,.88) 0%, rgba(0,0,0,.5) 60%, rgba(0,0,0,.2) 100%);
        }

        .hero-content {
          position: relative; z-index: 2;
          max-width: 1100px; padding: 150px 8% 100px;
        }

        .eyebrow, .section-number {
          color: #e50914; font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px; font-weight: 900; letter-spacing: 3px;
        }

        h1 {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(60px, 9vw, 130px);
          line-height: .88; margin: 25px 0; font-weight: 900; letter-spacing: -2px;
        }

        h1 span, h2 span { color: #e50914; }

        .hero-content p { max-width: 500px; color: #ccc; font-size: 17px; line-height: 1.7; }

        .hero-buttons, .booking-buttons { display: flex; gap: 14px; margin-top: 35px; flex-wrap: wrap; }

        .button { padding: 16px 24px; font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 900; letter-spacing: 1.5px; }
        .button.red { background: #e50914; }
        .button.outline { border: 1px solid rgba(255,255,255,.45); }
        .button:hover { opacity: .88; }

        .hero-est { margin-top: 80px; font-family: 'Barlow Condensed', sans-serif; font-size: 11px; letter-spacing: 4px; color: #888; }

        .scroll {
          position: absolute; bottom: 30px; right: 6%;
          display: flex; align-items: center; gap: 12px;
          font-family: 'Barlow Condensed', sans-serif; font-size: 9px; letter-spacing: 2px; color: #aaa;
        }
        .scroll span { color: #e50914; font-size: 20px; }

        /* SECTIONS */
        section { padding: 130px 7%; }

        h2 {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(50px, 7vw, 100px);
          line-height: .9; letter-spacing: -2px; margin: 25px 0; font-weight: 900;
        }

        /* SECTION PHOTOS */
        .section-photo { width: 100%; height: 100%; min-height: 580px; object-fit: cover; display: block; }

        /* INTRO */
        .intro {
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
          background: #0b0b0b;
        }

        .intro-text p { max-width: 540px; color: #aaa; line-height: 1.8; font-size: 16px; }
        .intro-image { min-height: 580px; overflow: hidden; }

        .stats { display: flex; gap: 50px; margin-top: 50px; }
        .stats div { display: flex; flex-direction: column; gap: 6px; }
        .stats strong { font-family: 'Barlow Condensed', sans-serif; color: #e50914; font-size: 34px; font-weight: 900; }
        .stats span { font-family: 'Barlow Condensed', sans-serif; font-size: 9px; color: #666; letter-spacing: 2px; }

        /* EXPERIENCE */
        .experience {
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
          background: #0e0e0e;
        }
        .experience-image { min-height: 580px; overflow: hidden; }
        .experience-content > p { max-width: 520px; color: #aaa; line-height: 1.8; font-size: 16px; }
        .experience-content h3 { font-family: 'Barlow Condensed', sans-serif; font-size: 22px; letter-spacing: 1px; margin-top: -5px; font-weight: 700; }

        .steps { margin-top: 45px; }
        .step { display: flex; gap: 25px; padding: 22px 0; border-top: 1px solid #222; }
        .step > span { color: #e50914; font-family: 'Barlow Condensed', sans-serif; font-weight: 900; font-size: 15px; }
        .step strong { font-family: 'Barlow Condensed', sans-serif; font-size: 13px; letter-spacing: 2px; }
        .step p { margin: 7px 0 0; color: #666; font-size: 13px; }

        /* SERVICES */
        .services { background: #080808; }

        .section-heading { max-width: 650px; margin-bottom: 70px; }
        .section-heading.center { margin-left: auto; margin-right: auto; text-align: center; }
        .section-heading p { color: #777; line-height: 1.7; font-size: 15px; }

        .service-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid #242424; border-left: 1px solid #242424;
        }

        .service-card {
          min-height: 340px; padding: 40px;
          border-right: 1px solid #242424; border-bottom: 1px solid #242424;
          transition: background .25s;
        }
        .service-card:hover { background: #141414; }
        .service-number { color: #e50914; font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 900; letter-spacing: 1px; }
        .service-card h3 { font-family: 'Barlow Condensed', sans-serif; margin-top: 70px; font-size: 20px; letter-spacing: 1px; }
        .service-card p { color: #777; line-height: 1.7; font-size: 13px; }
        .service-card a { display: inline-block; margin-top: 20px; color: #e50914; font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 900; letter-spacing: 1px; }

        /* FEATURE */
        .feature { padding: 0; }
        .feature-image { min-height: 680px; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .feature-photo { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 30%; }
        .feature-overlay { position: absolute; inset: 0; background: linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.88)); }
        .feature-content { position: relative; text-align: center; z-index: 1; }
        .feature-content h2 { font-size: clamp(55px, 8vw, 115px); }

        /* PRICING */
        .pricing { background: #0b0b0b; }
        .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; max-width: 1250px; margin: auto; }

        .price-card { position: relative; background: #111; border: 1px solid #252525; padding: 40px; }
        .price-card.featured { border-color: #e50914; }

        .popular { position: absolute; top: 0; right: 0; padding: 8px 12px; background: #e50914; font-family: 'Barlow Condensed', sans-serif; font-size: 9px; font-weight: 900; letter-spacing: 1px; }
        .price-category { color: #e50914; font-family: 'Barlow Condensed', sans-serif; font-size: 10px; font-weight: 900; letter-spacing: 2px; }
        .price-card h3 { font-family: 'Barlow Condensed', sans-serif; margin-top: 28px; font-size: 20px; letter-spacing: .5px; }
        .price { font-family: 'Barlow Condensed', sans-serif; font-size: 42px; font-weight: 900; margin: 22px 0 8px; }
        .price-detail { color: #555; font-family: 'Barlow Condensed', sans-serif; font-size: 9px; letter-spacing: 2px; }
        .price-card ul { padding: 22px 0; margin: 0; list-style: none; border-top: 1px solid #252525; border-bottom: 1px solid #252525; margin-top: 28px; }
        .price-card li { padding: 7px 0; color: #999; font-size: 12px; }
        .price-card li::before { content: "✓"; color: #e50914; margin-right: 10px; }
        .price-button { display: block; margin-top: 22px; padding: 14px; text-align: center; border: 1px solid #383838; font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 900; letter-spacing: 1px; transition: border-color .2s, color .2s; }
        .price-button:hover { border-color: #e50914; color: #e50914; }

        /* GALLERY */
        .gallery { background: #080808; }

        .gallery-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 12px; }

        .gallery-large { position: relative; overflow: hidden; min-height: 640px; }
        .gallery-col { display: flex; flex-direction: column; gap: 12px; }
        .gallery-small { position: relative; overflow: hidden; flex: 1; min-height: 200px; }

        .gallery-photo { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s ease; }
        .gallery-large:hover .gallery-photo,
        .gallery-small:hover .gallery-photo,
        .gallery-med:hover .gallery-photo { transform: scale(1.04); }

        .gallery-caption {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 20px; background: linear-gradient(transparent, rgba(0,0,0,.75));
          font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 900; letter-spacing: 2px; color: rgba(255,255,255,.75);
        }

        .gallery-row2 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 12px; }
        .gallery-med { position: relative; overflow: hidden; min-height: 280px; }

        /* WHY */
        .why { background: #111; }
        .why-content { max-width: 1200px; margin: auto; }
        .why-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 35px; margin-top: 80px; }
        .why-grid strong { color: #e50914; font-family: 'Barlow Condensed', sans-serif; font-size: 13px; font-weight: 900; }
        .why-grid h3 { font-family: 'Barlow Condensed', sans-serif; font-size: 15px; letter-spacing: 1px; margin-top: 30px; }
        .why-grid p { color: #666; font-size: 13px; line-height: 1.6; }

        /* BOOKING */
        .booking { min-height: 750px; position: relative; display: flex; align-items: center; justify-content: center; text-align: center; overflow: hidden; }
        .booking-photo { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; }
        .booking-overlay { position: absolute; inset: 0; background: linear-gradient(rgba(0,0,0,.72), rgba(0,0,0,.92)); }
        .booking-content { position: relative; z-index: 1; max-width: 900px; padding: 0 5%; }
        .booking-content h2 { font-size: clamp(55px, 8vw, 110px); }
        .booking-content p { max-width: 520px; margin: auto; color: #999; line-height: 1.7; }
        .booking-buttons { justify-content: center; }

        .contact-details { display: flex; justify-content: center; gap: 70px; margin-top: 80px; }
        .contact-details div { display: flex; flex-direction: column; gap: 8px; font-size: 13px; }
        .contact-details span { color: #e50914; font-family: 'Barlow Condensed', sans-serif; font-size: 8px; font-weight: 900; letter-spacing: 2px; }

        /* BOOKING MODAL */
        .booking-buttons button { cursor: pointer; border: 0; color: white; }
        .price-button { cursor: pointer; border: 0; background: transparent; color: white; font-family: inherit; font-weight: 900; letter-spacing: 1.5px; font-size: 11px; padding: 0; }
        .booking-modal { position: fixed; inset: 0; z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 25px; }
        .booking-modal-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,.86); backdrop-filter: blur(8px); }
        .booking-modal-card { position: relative; z-index: 1; width: min(760px, 100%); max-height: 92vh; overflow-y: auto; background: #0b0b0b; border: 1px solid #272727; padding: 48px; box-shadow: 0 30px 100px rgba(0,0,0,.6); }
        .booking-close { position: absolute; top: 15px; right: 18px; border: 0; background: transparent; color: #aaa; font-size: 32px; cursor: pointer; line-height: 1; }
        .booking-modal-card h2 { font-family: 'Barlow Condensed', sans-serif; font-size: clamp(48px, 7vw, 82px); line-height: .88; margin: 16px 0 22px; }
        .booking-modal-intro { color: #888; line-height: 1.6; max-width: 600px; margin-bottom: 30px; }
        .booking-form { display: flex; flex-direction: column; gap: 18px; }
        .booking-form label { display: flex; flex-direction: column; gap: 8px; color: #e50914; font-family: 'Barlow Condensed', sans-serif; font-size: 10px; font-weight: 900; letter-spacing: 1.8px; }
        .booking-form input, .booking-form select, .booking-form textarea { width: 100%; box-sizing: border-box; border: 1px solid #2b2b2b; background: #121212; color: white; padding: 14px; font: 14px Arial, sans-serif; outline: none; }
        .booking-form input:focus, .booking-form select:focus, .booking-form textarea:focus { border-color: #e50914; }
        .booking-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .payment-options { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .payment-option { text-align: left; cursor: pointer; border: 1px solid #292929; background: #101010; color: white; padding: 18px; display: flex; flex-direction: column; gap: 7px; }
        .payment-option.active { border-color: #e50914; background: #18090a; }
        .payment-option span { color: #e50914; font-family: 'Barlow Condensed', sans-serif; font-size: 10px; font-weight: 900; letter-spacing: 1.5px; }
        .payment-option strong { font-size: 24px; }
        .payment-option small { color: #777; }
        .booking-total { border-top: 1px solid #242424; border-bottom: 1px solid #242424; padding: 17px 0; display: flex; justify-content: space-between; align-items: center; }
        .booking-total span { color: #777; font-family: 'Barlow Condensed', sans-serif; font-size: 10px; letter-spacing: 2px; }
        .booking-total strong { font-size: 28px; }
        .booking-submit { cursor: pointer; border: 0; color: white; width: 100%; margin-top: 4px; }
        .booking-payment-error { color: #ff5a61; margin: 12px 0 0; font-size: 13px; line-height: 1.5; }
        .booking-payment-note { color: #666; font-size: 11px; line-height: 1.6; text-align: center; }
        .booking-success { text-align: center; padding: 30px 10px 10px; }
        .booking-success h2 { margin-bottom: 25px; }
        .booking-success p { max-width: 520px; margin: 0 auto 30px; color: #888; line-height: 1.7; }
        .success-mark { width: 58px; height: 58px; display: grid; place-items: center; margin: 0 auto 25px; border: 1px solid #e50914; color: #e50914; font-size: 28px; }

        /* FOOTER */
        footer { padding: 80px 7% 30px; background: #050505; }
        .footer-top { display: flex; justify-content: space-between; padding-bottom: 70px; }
        .footer-brand p { color: #666; margin-top: 20px; font-size: 14px; }
        .footer-links { display: flex; gap: 100px; }
        .footer-links div { display: flex; flex-direction: column; gap: 14px; }
        .footer-links span { color: #e50914; font-family: 'Barlow Condensed', sans-serif; font-size: 9px; letter-spacing: 2px; margin-bottom: 6px; }
        .footer-links a { color: #777; font-size: 13px; transition: color .2s; }
        .footer-links a:hover { color: white; }
        .footer-bottom { border-top: 1px solid #1a1a1a; padding-top: 25px; display: flex; justify-content: space-between; color: #444; font-family: 'Barlow Condensed', sans-serif; font-size: 9px; letter-spacing: 1px; }

        /* PROMO */
        .promo-section { background: #0a0a0a; }

        .promo-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 20px;
        }

        .promo-card {
          position: relative;
          overflow: hidden;
          border: 1px solid #222;
          aspect-ratio: 1 / 1;
          transition: transform .3s ease, border-color .3s;
        }

        .promo-card:hover {
          transform: translateY(-4px);
          border-color: #e50914;
        }

        .promo-img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform .5s ease;
        }

        .promo-card:hover .promo-img { transform: scale(1.04); }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .nav-links {
            display: none; position: absolute; top: 82px; left: 0; right: 0;
            background: #0a0a0a; padding: 30px; flex-direction: column; border-bottom: 1px solid #222;
          }
          .nav-links.open { display: flex; }
          .nav-button { display: none; }
          .menu-button { display: block; }
          .intro, .experience { grid-template-columns: 1fr; }
          .experience-image { order: -1; }
          .service-grid, .pricing-grid { grid-template-columns: 1fr 1fr; }
          .why-grid { grid-template-columns: 1fr 1fr; }
          .gallery-grid { grid-template-columns: 1fr; }
          .gallery-row2 { grid-template-columns: 1fr 1fr; }
          .promo-grid { grid-template-columns: 1fr 1fr; }
          .footer-top { flex-direction: column; gap: 50px; }
          .footer-links { gap: 50px; }
        }

        @media (max-width: 600px) {
          section { padding: 90px 6%; }
          .hero-content { padding: 140px 6% 80px; }
          h1 { font-size: 58px; }
          h2 { font-size: 52px; }
          .hero-buttons, .booking-buttons { flex-direction: column; }
          .button { text-align: center; }
          .service-grid, .pricing-grid, .why-grid { grid-template-columns: 1fr; }
          .gallery-row2 { grid-template-columns: 1fr; }
          .promo-grid { grid-template-columns: 1fr 1fr; }
          .stats { gap: 25px; }
          .contact-details { flex-direction: column; gap: 25px; align-items: center; }
          .booking-modal { padding: 10px; }
          .booking-modal-card { padding: 35px 20px 25px; max-height: 96vh; }
          .booking-form-grid, .payment-options { grid-template-columns: 1fr; }
          .booking-total strong { font-size: 22px; }
          .footer-bottom { flex-direction: column; gap: 12px; }
        }
      `}</style>
    </div>
  );
}
        .shop { padding: 110px 5%; background: #0b0b0b; border-top: 1px solid rgba(255,255,255,.07); }
        .shop-heading { margin-bottom: 35px; }
        .shop-toolbar { display:flex; justify-content:space-between; gap:20px; align-items:center; margin-bottom:28px; flex-wrap:wrap; }
        .shop-categories { display:flex; gap:8px; flex-wrap:wrap; }
        .shop-filter,.cart-button { border:1px solid rgba(255,255,255,.16); background:#111; color:#fff; padding:10px 14px; font:inherit; font-weight:700; letter-spacing:.05em; cursor:pointer; }
        .shop-filter.active { background:#d71920; border-color:#d71920; }
        .cart-button { min-width:110px; display:flex; justify-content:center; gap:10px; }
        .cart-button span { background:#d71920; padding:0 6px; }
        .shop-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:16px; }
        .product-card { background:#111; border:1px solid rgba(255,255,255,.08); overflow:hidden; display:flex; flex-direction:column; min-width:0; }
        .product-image-wrap { aspect-ratio:1/1; background:#161616; position:relative; overflow:hidden; }
        .product-image { width:100%; height:100%; object-fit:cover; display:block; filter:saturate(.85); transition:transform .4s ease; }
        .product-card:hover .product-image { transform:scale(1.04); }
        .product-badge { position:absolute; left:12px; top:12px; background:#d71920; color:#fff; padding:6px 8px; font-size:10px; font-weight:800; letter-spacing:.08em; }
        .product-info { padding:18px; display:flex; flex-direction:column; flex:1; }
        .product-category,.product-meta,.product-stock { font-size:10px; letter-spacing:.09em; font-weight:800; color:#888; }
        .product-info h3 { margin:8px 0 8px; font-size:20px; line-height:1.05; }
        .product-info p { margin:0 0 14px; color:#aaa; font-size:13px; line-height:1.55; min-height:62px; }
        .product-price { font-size:24px; font-weight:900; margin-bottom:7px; }
        .product-meta { font-size:9px; line-height:1.5; }
        .product-stock { margin-top:8px; color:#ddd; }
        .product-button { margin-top:15px; width:100%; padding:12px; background:#fff; color:#080808; border:0; font:inherit; font-weight:900; cursor:pointer; }
        .product-button:hover { background:#d71920; color:#fff; }
        .shop-note { margin-top:25px; padding:18px; border-left:3px solid #d71920; background:#111; display:flex; gap:14px; flex-wrap:wrap; font-size:12px; color:#aaa; }
        .shop-note strong { color:#fff; }
        .cart-drawer-backdrop { position:fixed; inset:0; z-index:500; background:rgba(0,0,0,.72); display:flex; justify-content:flex-end; }
        .cart-drawer { width:min(470px,92vw); height:100%; background:#0b0b0b; padding:35px; overflow:auto; position:relative; box-shadow:-20px 0 60px rgba(0,0,0,.5); }
        .cart-close { position:absolute; top:18px; right:20px; background:none; border:0; color:#fff; font-size:32px; cursor:pointer; }
        .cart-drawer h2 { font-size:46px; line-height:.9; margin:14px 0 30px; }
        .cart-drawer h2 span { color:#d71920; }
        .cart-items { border-top:1px solid rgba(255,255,255,.1); }
        .cart-item { padding:16px 0; border-bottom:1px solid rgba(255,255,255,.1); display:flex; justify-content:space-between; gap:15px; }
        .cart-item div { display:flex; flex-direction:column; gap:6px; }
        .cart-item span { color:#999; font-size:12px; }
        .cart-item button { background:none; border:0; color:#d71920; font-size:10px; font-weight:800; cursor:pointer; align-self:center; }
        .cart-total { display:flex; justify-content:space-between; padding:22px 0; border-bottom:1px solid rgba(255,255,255,.1); }
        .cart-total span { color:#888; font-size:11px; letter-spacing:.08em; }
        .cart-total strong { font-size:22px; }
        .cart-shipping { color:#888; font-size:12px; line-height:1.5; }
        .cart-checkout { width:100%; margin-top:10px; }
        @media (max-width:1100px) { .shop-grid { grid-template-columns:repeat(3,minmax(0,1fr)); } }
        @media (max-width:760px) { .shop { padding:80px 5%; } .shop-grid { grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; } .product-info { padding:13px; } .product-info h3 { font-size:16px; } .product-info p { font-size:12px; min-height:auto; } .product-price { font-size:20px; } }
        @media (max-width:480px) { .shop-grid { grid-template-columns:1fr; } .shop-filter { font-size:10px; padding:8px 9px; } }

