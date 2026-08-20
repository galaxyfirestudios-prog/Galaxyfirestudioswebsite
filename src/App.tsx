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

/* ============================================================
   27 VISUAL IMAGES (MATCHED TO YOUR LOWERCASE FILES)
   ============================================================ */
import image01 from "@/imports/image_1.jpg";
import image02 from "@/imports/image_2.jpg";
import image03 from "@/imports/image_3.jpg";
import image04 from "@/imports/image_4.jpg";
import image05 from "@/imports/image_5.jpg";
import image06 from "@/imports/image_6.jpg";
import image07 from "@/imports/image_7.jpg";
import image08 from "@/imports/image_8.jpg";
import image09 from "@/imports/image_9.jpg";
import image10 from "@/imports/image_10.jpg";
import image11 from "@/imports/image_11.jpg";
import image12 from "@/imports/image_12.jpg";
import image13 from "@/imports/image_13.jpg";
import image14 from "@/imports/image_14.jpg";
import image15 from "@/imports/image_15.jpg";
import image16 from "@/imports/image_16.jpg";
import image17 from "@/imports/image_17.jpg";
import image18 from "@/imports/image_18.jpg";
import image19 from "@/imports/image_19.jpg";
import image20 from "@/imports/image_20.jpg";
import image21 from "@/imports/image_21.jpg";
import image22 from "@/imports/image_22.jpg";
import image23 from "@/imports/image_23.jpg";
import image24 from "@/imports/image_24.jpg";
import image25 from "@/imports/image_25.jpg";
import image26 from "@/imports/image_26.jpg";
import image27 from "@/imports/image_27.jpg";

const visualImages = [
  image01, image02, image03, image04, image05, image06, image07, image08, image09,
  image10, image11, image12, image13, image14, image15, image16, image17, image18,
  image19, image20, image21, image22, image23, image24, image25, image26, image27
];

/* ============================================================
   VISUAL SLIDER COMPONENT
   ============================================================ */
type VisualSliderProps = {
  images: string[];
  title: string;
  number: string;
};

function VisualSlider({ images, title, number }: VisualSliderProps) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((value) => (value === images.length - 1 ? 0 : value + 1));
  };

  const previous = () => {
    setCurrent((value) => (value === 0 ? images.length - 1 : value - 1));
  };

  return (
    <div className="visual-slider">
      <div className="visual-slider-image">
        <img src={images[current]} alt={`${title} ${current + 1}`} />
        <div className="visual-number">{number}</div>
        <div className="slider-controls">
          <button type="button" onClick={previous} aria-label="Previous image">
            ←
          </button>
          <span>
            {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>
          <button type="button" onClick={next} aria-label="Next image">
            →
          </button>
        </div>
      </div>
      <div className="slider-info">
        <div>
          <span className="section-number">{number} / VISUAL PORTFOLIO</span>
          <h3>{title}</h3>
        </div>
        <div className="slider-dots">
          {images.map((_, index) => (
            <button
              type="button"
              key={index}
              className={index === current ? "active" : ""}
              onClick={() => setCurrent(index)}
              aria-label={`Show image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
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
    { title: "Artist Photoshoot", price: 75000, unit: "starting price" },
    { title: "Cover Art Shoot", price: 50000, unit: "starting price" },
    { title: "Event Photography", price: 100000, unit: "starting price" },
    { title: "Music Video", price: 250000, unit: "starting price" },
    { title: "Performance Video", price: 150000, unit: "starting price" },
    { title: "Visualizer", price: 100000, unit: "starting price" },
    { title: "Lyric Video", price: 75000, unit: "starting price" },
    { title: "Social Content Package", price: 100000, unit: "starting price" },
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
        const availabilityResponse = await fetch("/api/check-availability", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            startAt: formatTimestamp(startAt),
            endAt: formatTimestamp(endAt),
          }),
        });

        if (!availabilityResponse.ok) {
          const errorText = await availabilityResponse.text();
          console.error("Availability API error:", errorText);
          throw new Error("Could not check studio availability.");
        }

        const available = await availabilityResponse.json();

        if (available !== true) {
          setPaymentError("Sorry, that time is already booked. Please choose another date or time.");
          return;
        }
      } catch (error) {
        console.error("Availability check failed:", error);
        setPaymentError("We could not check availability right now. Please try again.");
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

  const services = [
    { number: "01", title: "RECORDING", text: "Professional recording sessions engineered to capture your performance with clarity, character and impact." },
    { number: "02", title: "MUSIC PRODUCTION", text: "Build your record from the first idea. Beat production, arrangement, sound selection and creative development." },
    { number: "03", title: "VOCAL PRODUCTION", text: "Performance direction, harmonies, ad-libs, vocal arrangement and detailed vocal preparation." },
    { number: "04", title: "MIXING", text: "Turn your recordings into a finished record with balance, depth, punch and clarity." },
    { number: "05", title: "MASTERING", text: "Give your finished music the final polish it needs before it reaches the world." },
    { number: "06", title: "RELEASE SUPPORT", text: "Get help preparing your music for release, including metadata, distribution guidance and release planning." },
  ];

  /* 27 images split into 3 sets of 9 */
  const visualSetOne = visualImages.slice(0, 9);
  const visualSetTwo = visualImages.slice(9, 18);
  const visualSetThree = visualImages.slice(18, 27);

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
          <a href="#home" onClick={() => setMenuOpen(false)}>HOME</a>
          <a href="#studio" onClick={() => setMenuOpen(false)}>STUDIO</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>SERVICES</a>
          <a href="#visuals" onClick={() => setMenuOpen(false)}>VISUALS</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>PRICING</a>
          <a href="#booking" onClick={() => setMenuOpen(false)}>BOOK</a>
          <a href="#culture" onClick={() => setMenuOpen(false)}>FOR THE CULTURE</a>
          <a href="#radio" onClick={() => setMenuOpen(false)}>RADIO</a>
          <a href="#blog" onClick={() => setMenuOpen(false)}>BLOG</a>
          <a href="#beats" onClick={() => setMenuOpen(false)}>BEATS</a>
          <a href="#shop" onClick={() => setMenuOpen(false)}>SHOP</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>ABOUT</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>CONTACT</a>
        </nav>

        <a className="nav-button" href="#booking">BOOK A SESSION</a>

        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </header>

      {/* HERO */}
      <section className="hero" id="home">
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

      {/* VISUALS SECTION */}
      <section id="visuals" className="visual-section">
        <div className="section-heading">
          <div className="section-number">04 / PHOTOGRAPHY &amp; VIDEOGRAPHY</div>
          <h2>MAKE IT <br /><span>VISIBLE.</span></h2>
        </div>

        <VisualSlider
          images={visualSetOne}
          number="01"
          title="PHOTOGRAPHY & CREATIVE VISUALS"
        />
        <VisualSlider
          images={visualSetTwo}
          number="02"
          title="ARTIST & PROJECT VISUALS"
        />
        <VisualSlider
          images={visualSetThree}
          number="03"
          title="VIDEOGRAPHY & VISUAL STORYTELLING"
        />
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
          <div className="section-number">05 / PRICING</div>
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
          <div className="section-number">06 / GALLERY</div>
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

        <div className="gallery-row2" style={{ marginTop: '12px' }}>
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

      {/* FOR THE CULTURE */}
      <section className="culture" id="culture">
        <div className="section-heading">
          <div className="section-number">07 / FOR THE CULTURE</div>
          <h2>THE SOUND.<br /><span>THE PEOPLE. THE CULTURE.</span></h2>
          <p>
            Galaxy Fire Studios is more than a room to record in. FOR THE CULTURE is our
            growing home for Abuja music, artists, stories, beats, radio and the creative
            community around us.
          </p>
        </div>

        <div className="culture-grid">
          <a href="#radio" className="culture-card culture-card-featured">
            <div className="culture-card-number">01</div>
            <div className="culture-card-content">
              <span>LIVE MUSIC DESTINATION</span>
              <h3>FOR THE CULTURE<br />RADIO</h3>
              <p>Hear Abuja talent, guest mixes, premieres and future Galaxy Fire programming.</p>
              <strong>EXPLORE RADIO →</strong>
            </div>
          </a>

          <a href="#blog" className="culture-card">
            <div className="culture-card-number">02</div>
            <div className="culture-card-content">
              <span>STORIES &amp; PEOPLE</span>
              <h3>THE<br />BLOG</h3>
              <p>Artist profiles, interviews, releases, events, studio stories and creative culture.</p>
              <strong>READ THE BLOG →</strong>
            </div>
          </a>

          <a href="#beats" className="culture-card">
            <div className="culture-card-number">03</div>
            <div className="culture-card-content">
              <span>PRODUCERS &amp; ARTISTS</span>
              <h3>BEATS<br />MARKETPLACE</h3>
              <p>Discover beats by genre, mood, BPM and producer, then take the record to Galaxy Fire.</p>
              <strong>EXPLORE BEATS →</strong>
            </div>
          </a>

          <a href="#shop" className="culture-card">
            <div className="culture-card-number">04</div>
            <div className="culture-card-content">
              <span>WEAR THE BRAND</span>
              <h3>GALAXY FIRE<br />SHOP</h3>
              <p>Studio merchandise, FOR THE CULTURE pieces, accessories and branded essentials.</p>
              <strong>VISIT THE SHOP →</strong>
            </div>
          </a>
        </div>

        <div className="culture-statement">
          <div>
            <span className="eyebrow">THE GALAXY FIRE ECOSYSTEM</span>
            <h3>DISCOVER. CREATE. CONNECT.</h3>
          </div>
          <p>
            Discover music and stories. Find a beat. Hear the culture. Then bring your next
            record back to Galaxy Fire Studios to record, produce, mix, master and release it.
          </p>
        </div>
      </section>

      {/* ECOSYSTEM PREVIEWS */}
      <section className="ecosystem-preview" id="radio">
        <div className="ecosystem-preview-inner">
          <div>
            <div className="section-number">08 / RADIO</div>
            <h2>FOR THE<br /><span>CULTURE RADIO.</span></h2>
            <p>
              The live station is coming. This space will become the home for the FOR THE CULTURE
              stream, now-playing information, guest mixes, artist spotlights and original shows.
            </p>
          </div>
          <div className="ecosystem-status">
            <span>STATUS</span>
            <strong>COMING SOON</strong>
            <small>LIVE INTERNET RADIO WILL BE CONNECTED HERE.</small>
          </div>
        </div>
      </section>

      <section className="ecosystem-preview dark" id="blog">
        <div className="ecosystem-preview-inner">
          <div>
            <div className="section-number">09 / BLOG</div>
            <h2>THE<br /><span>STORIES.</span></h2>
            <p>
              Artist interviews, producer spotlights, new releases, Abuja creative culture,
              events, tutorials and behind-the-scenes stories will live here.
            </p>
          </div>
          <a href="#contact" className="button outline">GET FEATURED →</a>
        </div>
      </section>

      <section className="ecosystem-preview" id="beats">
        <div className="ecosystem-preview-inner">
          <div>
            <div className="section-number">10 / BEATS</div>
            <h2>FIND YOUR<br /><span>SOUND.</span></h2>
            <p>
              The Beats Marketplace will let artists preview beats, explore producers and
              purchase the right license for their next record.
            </p>
          </div>
          <a href="#booking" className="button red">WORK WITH A PRODUCER →</a>
        </div>
      </section>

      <section className="ecosystem-preview dark" id="shop">
        <div className="ecosystem-preview-inner">
          <div>
            <div className="section-number">11 / SHOP</div>
            <h2>WEAR<br /><span>THE FIRE.</span></h2>
            <p>
              Galaxy Fire and FOR THE CULTURE merchandise will be available here as the studio
              ecosystem grows.
            </p>
          </div>
          <a href="#contact" className="button outline">SHOP COMING SOON →</a>
        </div>
      </section>

      <section className="about-preview" id="about">
        <div className="about-preview-inner">
          <div className="section-number">12 / ABOUT GALAXY FIRE</div>
          <h2>BUILT FOR<br /><span>CREATORS.</span></h2>
          <p>
            Galaxy Fire Studios is a professional recording and production environment for
            artists, producers and creators who want to take their music seriously.
          </p>
          <a href="#booking" className="button red">WORK WITH US →</a>
        </div>
      </section>

      {/* PROMO / SOCIAL */}
      <section className="promo-section">
        <div className="section-heading">
          <div className="section-number">13 / THE WORD</div>
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
          <div className="section-number">14 / THE STANDARD</div>
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
          <div className="contact-details" id="contact">
            <div><span>EMAIL</span>galaxyfirestudios@gmail.com</div>
            <div><span>PHONE / WHATSAPP</span>+234 803 534 5977</div>
          </div>
        </div>
      </section>

      {/* BOOKING MODAL */}
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

                  <div className="form-row">
                    <label>
                      DATE
                      <input type="date" required value={booking.date} onChange={(e) => updateBooking("date", e.target.value)} />
                    </label>
                    <label>
                      TIME
                      <input type="time" required value={booking.time} onChange={(e) => updateBooking("time", e.target.value)} />
                    </label>
                  </div>

                  <div className="form-row">
                    <label>
                      FULL NAME
                      <input type="text" required placeholder="Your Name" value={booking.name} onChange={(e) => updateBooking("name", e.target.value)} />
                    </label>
                    <label>
                      PHONE
                      <input type="tel" required placeholder="+234..." value={booking.phone} onChange={(e) => updateBooking("phone", e.target.value)} />
                    </label>
                  </div>

                  <label>
                    EMAIL ADDRESS
                    <input type="email" required placeholder="you@example.com" value={booking.email} onChange={(e) => updateBooking("email", e.target.value)} />
                  </label>

                  <label>
                    SESSION NOTES (OPTIONAL)
                    <textarea placeholder="Tell us about your project or requests..." value={booking.notes} onChange={(e) => updateBooking("notes", e.target.value)} />
                  </label>

                  <div className="payment-options">
                    <label className={booking.payment === "deposit" ? "selected" : ""}>
                      <input type="radio" name="payment" value="deposit" checked={booking.payment === "deposit"} onChange={() => updateBooking("payment", "deposit")} />
                      <span>50% DEPOSIT ({formatNaira(Math.round(selectedService.price * 0.5))})</span>
                    </label>
                    <label className={booking.payment === "full" ? "selected" : ""}>
                      <input type="radio" name="payment" value="full" checked={booking.payment === "full"} onChange={() => updateBooking("payment", "full")} />
                      <span>FULL AMOUNT ({formatNaira(selectedService.price)})</span>
                    </label>
                  </div>

                  {paymentError && <div className="payment-error">{paymentError}</div>}

                  <button type="submit" className="button red full-width" disabled={paymentProcessing}>
                    {paymentProcessing ? "PROCESSING..." : `PAY ${formatNaira(amountDue)} NOW →`}
                  </button>
                </form>
              </>
            ) : (
              <div className="booking-success">
                <div className="section-number">BOOKING / CONFIRMED</div>
                <h2>YOU'RE<br /><span>BOOKED.</span></h2>
                <p>Thank you! Your payment has been processed and your booking is received.</p>
                <div className="ref-box">REFERENCE: <strong>{paymentReference}</strong></div>
                <button type="button" className="button red" onClick={closeBooking}>DONE</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
