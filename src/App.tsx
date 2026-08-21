import { useEffect, useRef, useState } from "react";

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
import visual01 from "@/imports/visuals/visual_01.webp";
import visual02 from "@/imports/visuals/visual_02.webp";
import visual03 from "@/imports/visuals/visual_03.webp";
import visual04 from "@/imports/visuals/visual_04.webp";
import visual05 from "@/imports/visuals/visual_05.webp";
import visual06 from "@/imports/visuals/visual_06.webp";
import visual07 from "@/imports/visuals/visual_07.webp";
import visual08 from "@/imports/visuals/visual_08.webp";
import visual09 from "@/imports/visuals/visual_09.webp";
import visual10 from "@/imports/visuals/visual_10.webp";
import visual11 from "@/imports/visuals/visual_11.webp";
import visual12 from "@/imports/visuals/visual_12.webp";
import visual13 from "@/imports/visuals/visual_13.webp";
import visual14 from "@/imports/visuals/visual_14.webp";
import visual15 from "@/imports/visuals/visual_15.webp";
import visual16 from "@/imports/visuals/visual_16.webp";
import visual17 from "@/imports/visuals/visual_17.webp";
import visual18 from "@/imports/visuals/visual_18.webp";
import visual19 from "@/imports/visuals/visual_19.webp";
import visual20 from "@/imports/visuals/visual_20.webp";
import visual21 from "@/imports/visuals/visual_21.webp";
import visual22 from "@/imports/visuals/visual_22.webp";
import visual23 from "@/imports/visuals/visual_23.webp";
import visual24 from "@/imports/visuals/visual_24.webp";
import visual25 from "@/imports/visuals/visual_25.webp";
import visual26 from "@/imports/visuals/visual_26.webp";
import visual27 from "@/imports/visuals/visual_27.webp";
import visual28 from "@/imports/visuals/visual_28.webp";
import visual29 from "@/imports/visuals/visual_29.webp";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visualSlide, setVisualSlide] = useState(0);
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

  const storeProducts = [
    { id: "at2020", name: "Audio-Technica AT2020", category: "Microphones", market: 150000, price: 187500, stock: 5, badge: "BEST SELLER", desc: "Cardioid condenser microphone for vocals, instruments and home studios.", query: "Audio-Technica AT2020 microphone" },
    { id: "at2035", name: "Audio-Technica AT2035", category: "Microphones", market: 285000, price: 356250, stock: 3, badge: "PRO", desc: "Large-diaphragm condenser with detailed, low-noise vocal capture.", query: "Audio-Technica AT2035 microphone" },
    { id: "at2050", name: "Audio-Technica AT2050", category: "Microphones", market: 385000, price: 481250, stock: 2, badge: "PRO", desc: "Multi-pattern condenser for flexible professional recording.", query: "Audio-Technica AT2050 microphone" },
    { id: "at2020usb", name: "Audio-Technica AT2020USB+", category: "Microphones", market: 195000, price: 243750, stock: 3, badge: "CREATOR", desc: "USB condenser microphone with direct headphone monitoring.", query: "Audio-Technica AT2020USB+ microphone" },
    { id: "se-x1a", name: "sE Electronics X1 A", category: "Microphones", market: 146000, price: 182500, stock: 3, badge: "VALUE", desc: "Versatile large-diaphragm condenser for vocals and instruments.", query: "sE Electronics X1 A microphone" },
    { id: "uad-sd1", name: "UAD SD-1", category: "Microphones", market: 457500, price: 571875, stock: 1, badge: "ELITE", desc: "Dynamic microphone designed for vocals, broadcast and close miking.", query: "Universal Audio SD-1 microphone" },
    { id: "behr-c1", name: "Behringer C-1", category: "Microphones", market: 78500, price: 98125, stock: 5, badge: "STARTER", desc: "Affordable large-diaphragm condenser for first studio setups.", query: "Behringer C-1 microphone" },
    { id: "m20x", name: "Audio-Technica ATH-M20x", category: "Headphones", market: 85000, price: 106250, stock: 8, badge: "BEST SELLER", desc: "Closed-back monitoring headphones for recording and mixing.", query: "Audio-Technica ATH-M20x headphones" },
    { id: "m30x", name: "Audio-Technica ATH-M30x", category: "Headphones", market: 125000, price: 156250, stock: 5, badge: "VALUE", desc: "Professional monitoring headphones with strong isolation.", query: "Audio-Technica ATH-M30x headphones" },
    { id: "m40x", name: "Audio-Technica ATH-M40x", category: "Headphones", market: 180000, price: 225000, stock: 5, badge: "PRO", desc: "Accurate studio monitoring with rotating earcups.", query: "Audio-Technica ATH-M40x headphones" },
    { id: "m50x", name: "Audio-Technica ATH-M50x", category: "Headphones", market: 230000, price: 287500, stock: 5, badge: "BEST SELLER", desc: "Industry-loved closed-back headphones for detailed monitoring.", query: "Audio-Technica ATH-M50x headphones" },
    { id: "m70x", name: "Audio-Technica ATH-M70x", category: "Headphones", market: 450000, price: 562500, stock: 2, badge: "ELITE", desc: "High-resolution professional monitor headphones.", query: "Audio-Technica ATH-M70x headphones" },
    { id: "hd200", name: "Sennheiser HD 200 PRO", category: "Headphones", market: 115000, price: 143750, stock: 5, badge: "VALUE", desc: "Closed-back studio headphones for tracking and editing.", query: "Sennheiser HD 200 PRO headphones" },
    { id: "hd280", name: "Sennheiser HD 280 PRO", category: "Headphones", market: 155000, price: 193750, stock: 4, badge: "PRO", desc: "Reliable isolation and accurate monitoring for studio work.", query: "Sennheiser HD 280 PRO headphones" },
    { id: "hd300", name: "Sennheiser HD 300 PRO", category: "Headphones", market: 285000, price: 356250, stock: 2, badge: "PRO", desc: "High-isolation professional headphones for demanding sessions.", query: "Sennheiser HD 300 PRO headphones" },
    { id: "hc2000", name: "Behringer HC 2000", category: "Headphones", market: 35500, price: 44375, stock: 10, badge: "STARTER", desc: "Budget-friendly monitoring headphones for tracking.", query: "Behringer HC 2000 headphones" },
    { id: "umc204", name: "Behringer UMC204HD", category: "Audio Interfaces", market: 125500, price: 156875, stock: 5, badge: "STARTER", desc: "2-in/4-out USB interface with MIDAS-designed preamps.", query: "Behringer UMC204HD audio interface" },
    { id: "minifuse1", name: "Arturia MiniFuse 1", category: "Audio Interfaces", market: 152650, price: 190813, stock: 4, badge: "CREATOR", desc: "Compact one-channel USB interface for mobile and home studios.", query: "Arturia MiniFuse 1 audio interface" },
    { id: "volt1", name: "Universal Audio Volt 1", category: "Audio Interfaces", market: 205000, price: 256250, stock: 3, badge: "CREATOR", desc: "USB recording interface with vintage mic preamp mode.", query: "Universal Audio Volt 1 audio interface" },
    { id: "id4", name: "Audient iD4 MKII", category: "Audio Interfaces", market: 230000, price: 287500, stock: 3, badge: "PRO", desc: "Premium compact interface with Audient mic preamp.", query: "Audient iD4 MKII audio interface" },
    { id: "volt2", name: "Universal Audio Volt 2", category: "Audio Interfaces", market: 275000, price: 343750, stock: 3, badge: "BEST SELLER", desc: "2-in/2-out USB interface with vintage preamp mode.", query: "Universal Audio Volt 2 audio interface" },
    { id: "ssl2", name: "Solid State Logic SSL 2", category: "Audio Interfaces", market: 281500, price: 351875, stock: 3, badge: "PRO", desc: "Professional 2-in/2-out interface with SSL Legacy 4K mode.", query: "Solid State Logic SSL 2 audio interface" },
    { id: "id14", name: "Audient iD14 MKII", category: "Audio Interfaces", market: 345000, price: 431250, stock: 2, badge: "PRO", desc: "Expanded I/O and premium Audient conversion for serious creators.", query: "Audient iD14 MKII audio interface" },
    { id: "ssl2plus", name: "Solid State Logic SSL 2+", category: "Audio Interfaces", market: 386500, price: 483125, stock: 2, badge: "PRO", desc: "Expanded SSL interface with extra outputs and MIDI.", query: "Solid State Logic SSL 2 Plus audio interface" },
    { id: "iloud", name: "IK Multimedia iLoud Micro Monitor Pair", category: "Studio Monitors", market: 450000, price: 562500, stock: 2, badge: "BEST SELLER", desc: "Ultra-compact stereo monitors for small production spaces.", query: "IK Multimedia iLoud Micro Monitor pair" },
    { id: "kali-lp6", name: "Kali Audio LP-6 V2 Pair", category: "Studio Monitors", market: 548625, price: 685781, stock: 2, badge: "PRO", desc: "6.5-inch nearfield monitors designed for accurate mixing.", query: "Kali Audio LP-6 V2 studio monitors" },
    { id: "jbl305", name: "JBL 305P MkII Pair", category: "Studio Monitors", market: 650000, price: 812500, stock: 2, badge: "PRO", desc: "5-inch powered monitors with wide sweet spot.", query: "JBL 305P MkII studio monitors" },
    { id: "hs5", name: "Yamaha HS5 Pair", category: "Studio Monitors", market: 750000, price: 937500, stock: 2, badge: "PRO", desc: "Compact nearfields built for dependable mix translation.", query: "Yamaha HS5 studio monitors pair" },
    { id: "krk5", name: "KRK Rokit 5 G4 Pair", category: "Studio Monitors", market: 800000, price: 1000000, stock: 2, badge: "PRO", desc: "5-inch powered monitors with DSP-driven voicing.", query: "KRK Rokit 5 G4 studio monitors pair" },
    { id: "genelec8010", name: "Genelec 8010A Pair", category: "Studio Monitors", market: 950000, price: 1187500, stock: 1, badge: "ELITE", desc: "Compact professional monitors with exceptional imaging.", query: "Genelec 8010A studio monitors pair" },
    { id: "minilab3", name: "Arturia MiniLab 3", category: "MIDI & Production", market: 220000, price: 275000, stock: 4, badge: "BEST SELLER", desc: "Compact MIDI controller with pads, knobs and creative controls.", query: "Arturia MiniLab 3 MIDI controller" },
    { id: "mpkmini", name: "Akai MPK Mini MK3", category: "MIDI & Production", market: 220000, price: 275000, stock: 4, badge: "BEST SELLER", desc: "Portable keyboard and pad controller for producers.", query: "Akai MPK Mini MK3 MIDI controller" },
    { id: "keylab49", name: "Arturia KeyLab Essential 49 MK3", category: "MIDI & Production", market: 350000, price: 437500, stock: 2, badge: "PRO", desc: "49-key controller for hands-on production and composition.", query: "Arturia KeyLab Essential 49 MK3" },
    { id: "maschine", name: "Native Instruments Maschine Mikro MK3", category: "MIDI & Production", market: 350000, price: 437500, stock: 2, badge: "PRO", desc: "Pad-based production controller for beats and sampling.", query: "Native Instruments Maschine Mikro MK3" },
    { id: "tr8s", name: "Roland TR-8S", category: "Drum Machines", market: 1000000, price: 1250000, stock: 1, badge: "ELITE", desc: "Performance rhythm machine for modern and classic drum sounds.", query: "Roland TR-8S drum machine" },
    { id: "reflexion", name: "sE Reflexion Filter X", category: "Studio Accessories", market: 140000, price: 175000, stock: 3, badge: "VOCAL", desc: "Portable acoustic reflection filter for cleaner vocal recording.", query: "sE Reflexion Filter X" },
    { id: "popfilter", name: "Professional Metal Pop Filter", category: "Studio Accessories", market: 25000, price: 31250, stock: 10, badge: "ESSENTIAL", desc: "Helps control plosives and protects your vocal microphone.", query: "studio metal pop filter microphone" },
    { id: "micstand", name: "Heavy-Duty Boom Mic Stand", category: "Studio Accessories", market: 50000, price: 62500, stock: 8, badge: "ESSENTIAL", desc: "Stable boom stand for vocal and instrument microphones.", query: "heavy duty boom microphone stand" },
    { id: "xlr3", name: "Premium XLR Cable 3m", category: "Studio Accessories", market: 20000, price: 25000, stock: 15, badge: "ESSENTIAL", desc: "Balanced XLR connection for microphones and studio gear.", query: "premium XLR microphone cable 3m" },
    { id: "isopad", name: "Monitor Isolation Pads", category: "Studio Accessories", market: 35000, price: 43750, stock: 8, badge: "ESSENTIAL", desc: "Reduce vibration transfer between monitors and your desk.", query: "studio monitor isolation pads" },
    { id: "dibox", name: "Whirlwind IMP 2 DI Box", category: "Studio Accessories", market: 126500, price: 158125, stock: 3, badge: "PRO", desc: "Professional direct box for clean instrument connections.", query: "Whirlwind IMP 2 DI box" },
  ];
  const storeCategories = ["All", ...Array.from(new Set(storeProducts.map((p) => p.category)))];
  const [storeCategory, setStoreCategory] = useState("All");
  const [cart, setCart] = useState<Array<{ product: typeof storeProducts[number]; quantity: number }>>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [storeCheckoutOpen, setStoreCheckoutOpen] = useState(false);
  const [storeProcessing, setStoreProcessing] = useState(false);
  const [storeSuccess, setStoreSuccess] = useState("");
  const [storeError, setStoreError] = useState("");
  const [storeCustomer, setStoreCustomer] = useState({ name: "", email: "", phone: "", address: "", city: "Abuja" });

  const filteredProducts = storeCategory === "All"
    ? storeProducts
    : storeProducts.filter((p) => p.category === storeCategory);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingHandling = cartSubtotal === 0 ? 0 : cartSubtotal >= 1000000 ? 45000 : cartSubtotal >= 500000 ? 30000 : cartSubtotal >= 200000 ? 18000 : 10000;
  const cartTotal = cartSubtotal + shippingHandling;

  const addToCart = (product: typeof storeProducts[number]) => {
    setStoreSuccess("");
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) return current.map((item) => item.product.id === product.id ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) } : item);
      return [...current, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };
  const updateCartQuantity = (id: string, delta: number) => {
    setCart((current) => current.map((item) => item.product.id === id ? { ...item, quantity: Math.max(0, Math.min(item.quantity + delta, item.product.stock)) } : item).filter((item) => item.quantity > 0));
  };
  const productImage = (query: string) => `https://tse1.mm.bing.net/th?q=${encodeURIComponent(query + " product")}&w=700&h=700`;
  const checkoutStore = () => {
    setStoreError("");
    if (!storeCustomer.name || !storeCustomer.email || !storeCustomer.phone || !storeCustomer.address) {
      setStoreError("Please complete your name, email, phone and delivery address.");
      return;
    }
    setStoreProcessing(true);
    const reference = `GFS-SHOP-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    const PaystackPop = (window as any).PaystackPop;
    const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "pk_test_f350611c4c768b941d8725e73b122d3d37c9e5d7";
    const launch = () => {
      const PS = (window as any).PaystackPop;
      if (!PS) { setStoreProcessing(false); setStoreError("Paystack could not load. Please refresh and try again."); return; }
      const paystack = new PS();
      paystack.newTransaction({
        key: publicKey,
        email: storeCustomer.email,
        amount: cartTotal * 100,
        currency: "NGN",
        reference,
        firstName: storeCustomer.name.trim().split(/\s+/)[0],
        phone: storeCustomer.phone,
        metadata: {
          custom_fields: [
            { display_name: "Order Type", variable_name: "order_type", value: "Galaxy Fire Studio Equipment Store" },
            { display_name: "Products", variable_name: "products", value: cart.map((i) => `${i.product.name} x${i.quantity}`).join(" | ") },
            { display_name: "Delivery City", variable_name: "delivery_city", value: storeCustomer.city },
            { display_name: "Delivery Address", variable_name: "delivery_address", value: storeCustomer.address },
          ],
        },
        onSuccess: async (transaction: { reference: string }) => {
          try {
            const response = await fetch("/api/verify-store-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ reference: transaction.reference, expectedAmount: cartTotal * 100, customer: storeCustomer, items: cart.map((i) => ({ id: i.product.id, name: i.product.name, quantity: i.quantity, price: i.product.price })) }),
            });
            const result = await response.json();
            if (!response.ok || !result.verified) throw new Error(result.message || "Payment verification failed.");
            setStoreSuccess(`Payment confirmed. Your order reference is ${result.orderReference || transaction.reference}. We will contact you about delivery.`);
            setCart([]);
            setStoreCheckoutOpen(false);
          } catch (error) {
            console.error(error);
            setStoreError("Payment was completed, but verification is pending. Please keep your Paystack reference: " + transaction.reference);
          } finally { setStoreProcessing(false); }
        },
        onCancel: () => setStoreProcessing(false),
      });
    };
    if (PaystackPop) launch();
    else {
      const timer = window.setInterval(() => { if ((window as any).PaystackPop) { window.clearInterval(timer); launch(); } }, 150);
      window.setTimeout(() => { window.clearInterval(timer); if (!(window as any).PaystackPop) { setStoreProcessing(false); setStoreError("Paystack could not load. Please refresh and try again."); } }, 8000);
    }
  };

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

  const services = [
    { number: "01", title: "RECORDING", text: "Professional recording sessions engineered to capture your performance with clarity, character and impact." },
    { number: "02", title: "MUSIC PRODUCTION", text: "Build your record from the first idea. Beat production, arrangement, sound selection and creative development." },
    { number: "03", title: "VOCAL PRODUCTION", text: "Performance direction, harmonies, ad-libs, vocal arrangement and detailed vocal preparation." },
    { number: "04", title: "MIXING", text: "Turn your recordings into a finished record with balance, depth, punch and clarity." },
    { number: "05", title: "MASTERING", text: "Give your finished music the final polish it needs before it reaches the world." },
    { number: "06", title: "RELEASE SUPPORT", text: "Get help preparing your music for release, including metadata, distribution guidance and release planning." },
  ];

  const visualImages = [
    visual01, visual02, visual03, visual04, visual05, visual06, visual07, visual08, visual09,
    visual10, visual11, visual12, visual13, visual14, visual15, visual16, visual17, visual18,
    visual19, visual20, visual21, visual22, visual23, visual24, visual25, visual26, visual27,
    visual28, visual29,
  ];
  // Keep the photography slider to three balanced slides while allowing new images to be added.
  const visualSlides = [0, 1, 2].map((slide) => {
    const start = slide * (visualImages.length === 29 ? 10 : 9);
    const end = slide === 2 && visualImages.length === 29 ? visualImages.length : start + 10;
    return visualImages.slice(start, end);
  });

  const beatArt = "/beats/galaxy-records-art.png";
  const beats = [
    { id: "beat-01", title: "Crimson Motion", bpm: 110, key: "G♯ Minor", mode: "Minor", mood: "Dark / Cinematic", genre: "Galaxy Fire Original", preview: "/beats/beat_1_gsharp_minor_110.mp3" },
    { id: "beat-02", title: "Night Protocol", bpm: 110, key: "C♯ Minor", mode: "Minor", mood: "Moody / Driven", genre: "Galaxy Fire Original", preview: "/beats/beat_2_csharp_minor_110.mp3" },
    { id: "beat-03", title: "Golden Current", bpm: 97, key: "C Major", mode: "Major", mood: "Warm / Uplifting", genre: "Galaxy Fire Original", preview: "/beats/beat_3_c_major_97.mp3" },
    { id: "beat-04", title: "Midnight Pressure", bpm: 102, key: "A♯ Minor", mode: "Minor", mood: "Intense / Atmospheric", genre: "Galaxy Fire Original", preview: "/beats/beat_4_asharp_minor_102.mp3" },
    { id: "beat-05", title: "Velvet Heat", bpm: 100, key: "A Minor", mode: "Minor", mood: "Smooth / Emotional", genre: "Galaxy Fire Original", preview: "/beats/beat_5_a_minor_100.mp3" },
    { id: "beat-06", title: "Dark Frequency", bpm: 110, key: "D Minor", mode: "Minor", mood: "Heavy / Focused", genre: "Galaxy Fire Original", preview: "/beats/beat_6_d_minor_110.mp3" },
  ];
  const [selectedBeat, setSelectedBeat] = useState(beats[0]);
  const [beatPlaying, setBeatPlaying] = useState(false);
  const [beatProgress, setBeatProgress] = useState(0);
  const [beatSearch, setBeatSearch] = useState("");
  const [beatFilter, setBeatFilter] = useState("ALL");
  const [vinylRotation, setVinylRotation] = useState(0);
  const [vinylState, setVinylState] = useState<"stopped" | "playing" | "slowing">("stopped");
  const beatAudioRef = useRef<HTMLAudioElement | null>(null);
  const vinylFrameRef = useRef<number | null>(null);
  const vinylLastFrameRef = useRef<number | null>(null);
  const stopTimerRef = useRef<number | null>(null);

  const stopBeatPreview = (slow = true) => {
    const audio = beatAudioRef.current;
    if (stopTimerRef.current) window.clearTimeout(stopTimerRef.current);
    if (audio) {
      audio.pause();
      audio.currentTime = Math.min(audio.currentTime, 15);
    }
    setBeatPlaying(false);
    if (slow) {
      setVinylState("slowing");
      stopTimerRef.current = window.setTimeout(() => {
        setVinylState("stopped");
        setBeatProgress((current) => Math.min(current, 15));
      }, 1100);
    } else {
      setVinylState("stopped");
    }
  };

  const playBeat = async (beat: typeof beats[number]) => {
    const audio = beatAudioRef.current;
    if (!audio) return;
    if (stopTimerRef.current) window.clearTimeout(stopTimerRef.current);
    if (selectedBeat.id !== beat.id) {
      audio.pause();
      audio.currentTime = 0;
      setSelectedBeat(beat);
      setBeatProgress(0);
    } else if (beatPlaying) {
      stopBeatPreview(true);
      return;
    }
    audio.src = beat.preview;
    audio.currentTime = 0;
    try {
      await audio.play();
      setBeatPlaying(true);
      setVinylState("playing");
    } catch (error) {
      console.error(error);
      setBeatPlaying(false);
      setVinylState("stopped");
    }
  };

  const filteredBeats = beats.filter((beat) => {
    const matchesSearch = `${beat.title} ${beat.key} ${beat.bpm} ${beat.mood} ${beat.genre}`.toLowerCase().includes(beatSearch.toLowerCase());
    const matchesFilter = beatFilter === "ALL" || beat.mode === beatFilter;
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    const audio = beatAudioRef.current;
    if (!audio) return;
    const onTimeUpdate = () => {
      const current = Math.min(audio.currentTime, 15);
      setBeatProgress(current);
      if (current >= 14.98) stopBeatPreview(true);
    };
    const onEnded = () => stopBeatPreview(true);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      if (stopTimerRef.current) window.clearTimeout(stopTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const spin = (timestamp: number) => {
      if (vinylState === "playing") {
        if (vinylLastFrameRef.current === null) vinylLastFrameRef.current = timestamp;
        const delta = timestamp - vinylLastFrameRef.current;
        vinylLastFrameRef.current = timestamp;
        setVinylRotation((rotation) => (rotation + delta * (360 / 1800)) % 360);
        vinylFrameRef.current = requestAnimationFrame(spin);
      } else {
        vinylLastFrameRef.current = null;
        vinylFrameRef.current = null;
      }
    };
    if (vinylState === "playing") vinylFrameRef.current = requestAnimationFrame(spin);
    return () => {
      if (vinylFrameRef.current) cancelAnimationFrame(vinylFrameRef.current);
      vinylFrameRef.current = null;
    };
  }, [vinylState]);

  useEffect(() => {
    if (vinylState !== "slowing") return;
    const start = performance.now();
    const initial = vinylRotation;
    const duration = 1100;
    const easeOut = (value: number) => 1 - Math.pow(1 - value, 3);
    const animateStop = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setVinylRotation((initial + 90 * (1 - easeOut(progress))) % 360);
      if (progress < 1) requestAnimationFrame(animateStop);
    };
    requestAnimationFrame(animateStop);
  }, [vinylState]);


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
          <img src={deskImg} alt="Galaxy Studios full desk setup with dual monitors and MPC" className="section-photo" loading="lazy" decoding="async" />
        </div>
      </section>


      {/* STUDIO EXPERIENCE */}
      <section className="experience">
        <div className="experience-image">
          <img src={micWideImg} alt="Condenser microphone with acoustic shield in the recording room" className="section-photo" loading="lazy" decoding="async" />
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
          <img src={monitorsImg} alt="Studio monitor speakers and audio interface on the mixing desk" className="feature-photo" loading="lazy" decoding="async" />
          <div className="feature-overlay" />
          <div className="feature-content">
            <div className="eyebrow">THE GALAXY FIRE STANDARD</div>
            <h2>GREAT MUSIC<br /><span>STARTS HERE.</span></h2>
            <a href="#booking" className="button red">BOOK YOUR SESSION</a>
          </div>
        </div>
      </section>


      {/* PHOTOGRAPHY & VISUALS */}
      <section className="visual-production" id="visuals">
        <div className="section-heading">
          <div className="section-number">04 / PHOTOGRAPHY &amp; VISUALS</div>
          <h2>BRING YOUR<br /><span>SOUND TO LIFE.</span></h2>
          <p>Professional photography, music videos and creative visual production designed to give your music and brand the visual identity it deserves.</p>
        </div>

        <div className="visual-slider">
          <div className="visual-grid">
            {visualSlides[visualSlide].map((image, index) => (
              <div className={`visual-grid-item visual-grid-item-${index + 1}`} key={`${visualSlide}-${index}`}>
                <img src={image} alt={`Galaxy Fire Studios photography and visual production ${visualSlide * 10 + index + 1}`} loading="lazy" decoding="async" width="1600" height="1067" />
              </div>
            ))}
          </div>
          <div className="visual-slider-controls">
            <button type="button" onClick={() => setVisualSlide((visualSlide + 2) % 3)} aria-label="Previous visual slide">←</button>
            <div className="visual-slider-dots">
              {visualSlides.map((_, index) => (
                <button type="button" key={index} className={index === visualSlide ? "active" : ""} onClick={() => setVisualSlide(index)} aria-label={`Show visual slide ${index + 1}`} />
              ))}
            </div>
            <button type="button" onClick={() => setVisualSlide((visualSlide + 1) % 3)} aria-label="Next visual slide">→</button>
          </div>
        </div>

        <div className="visual-services-pricing">
          <div className="visual-price-group">
            <div className="visual-price-title">PHOTOGRAPHY</div>
            <div className="visual-price-row"><span>Artist Photoshoot</span><strong>₦75,000</strong></div>
            <div className="visual-price-row"><span>Cover Art Shoot</span><strong>₦50,000</strong></div>
            <div className="visual-price-row"><span>Event Photography</span><strong>₦100,000</strong></div>
          </div>
          <div className="visual-price-group">
            <div className="visual-price-title">VIDEOGRAPHY</div>
            <div className="visual-price-row"><span>Music Video</span><strong>From ₦250,000</strong></div>
            <div className="visual-price-row"><span>Performance Video</span><strong>From ₦150,000</strong></div>
            <div className="visual-price-row"><span>Visualizer</span><strong>From ₦100,000</strong></div>
            <div className="visual-price-row"><span>Lyric Video</span><strong>From ₦75,000</strong></div>
            <div className="visual-price-row"><span>Social Content Package</span><strong>From ₦100,000</strong></div>
          </div>
          <div className="visual-price-group">
            <div className="visual-price-title">CREATIVE DIRECTION</div>
            <div className="visual-price-row"><span>Creative Direction</span><strong>Custom Quote</strong></div>
          </div>
        </div>

        <div className="visual-cta">
          <div>
            <span className="eyebrow">YOUR IDEA. OUR VISUAL TEAM.</span>
            <h3>READY TO<br /><span>SHOOT?</span></h3>
          </div>
          <div className="visual-cta-buttons">
            <button type="button" className="button red" onClick={() => openBooking("Artist Photoshoot")}>BOOK A VISUAL SESSION</button>
            <a href="https://wa.me/2348035345977?text=Hi%20Galaxy%20Fire%20Studios%2C%20I%27d%20like%20a%20quote%20for%20a%20visual%20production%20project." className="button outline" target="_blank" rel="noreferrer">GET A QUOTE</a>
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
            <img src={heroImg} alt="Galaxy Studios control room with mixing desk and booth window" className="gallery-photo" loading="lazy" decoding="async" />
            <div className="gallery-caption">THE CONTROL ROOM</div>
          </div>
          <div className="gallery-col">
            <div className="gallery-small">
              <img src={micCloseImg} alt="Condenser microphone in the red acoustic vocal booth" className="gallery-photo" loading="lazy" decoding="async" />
              <div className="gallery-caption">THE VOCAL BOOTH</div>
            </div>
            <div className="gallery-small">
              <img src={mpcLitImg} alt="AKAI MPC X with lit cyan performance pads" className="gallery-photo" loading="lazy" decoding="async" />
              <div className="gallery-caption">PRODUCTION</div>
            </div>
            <div className="gallery-small">
              <img src={speakerImg} alt="Studio monitor speaker cone close-up against red velvet wall" className="gallery-photo" loading="lazy" decoding="async" />
              <div className="gallery-caption">THE MONITORS</div>
            </div>
          </div>
        </div>

        {/* Second row */}
        <div className="gallery-row2">
          <div className="gallery-med">
            <img src={deskImg} alt="Full studio desk with dual monitors, MPC and studio monitors" className="gallery-photo" loading="lazy" decoding="async" />
            <div className="gallery-caption">THE DESK</div>
          </div>
          <div className="gallery-med">
            <img src={keyboardImg} alt="Studio keyboard with blue LED lighting" className="gallery-photo" loading="lazy" decoding="async" />
            <div className="gallery-caption">THE KEYS</div>
          </div>
          <div className="gallery-med">
            <img src={monitorsImg} alt="AKG headphones and studio monitor on mixing desk" className="gallery-photo" loading="lazy" decoding="async" />
            <div className="gallery-caption">MONITORING</div>
          </div>
        </div>

        {/* Third row */}
        <div className="gallery-row2" style={{marginTop: '12px'}}>
          <div className="gallery-med">
            <img src={micWideImg} alt="Microphone with acoustic shield in the recording room" className="gallery-photo" loading="lazy" decoding="async" />
            <div className="gallery-caption">THE MIC SETUP</div>
          </div>
          <div className="gallery-med">
            <img src={mpcDemoImg} alt="AKAI MPC X showing genre demo selection screen" className="gallery-photo" loading="lazy" decoding="async" />
            <div className="gallery-caption">THE MPC</div>
          </div>
          <div className="gallery-med">
            <img src={interfaceImg} alt="Universal Audio interface close-up on the studio desk" className="gallery-photo" loading="lazy" decoding="async" />
            <div className="gallery-caption">AUDIO INTERFACE</div>
          </div>
        </div>
      </section>


      {/* FOR THE CULTURE */}
      <section className="culture" id="culture">
        <div className="section-heading">
          <div className="section-number">08 / FOR THE CULTURE</div>
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
              <p>Discover original Galaxy Fire beats by BPM, key and mood, then choose the license that fits your record.</p>
              <strong>EXPLORE BEATS →</strong>
            </div>
          </a>

          <a href="#shop" className="culture-card">
            <div className="culture-card-number">04</div>
            <div className="culture-card-content">
              <span>PRO AUDIO EQUIPMENT</span>
              <h3>GALAXY FIRE<br />PRO SHOP</h3>
              <p>Microphones, interfaces, monitors, headphones, MIDI gear, drum machines and studio essentials.</p>
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

      {/* ECOSYSTEM COMING SOON */}
      <section className="ecosystem-preview" id="radio">
        <div className="ecosystem-preview-inner">
          <div>
            <div className="section-number">09 / RADIO</div>
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
            <div className="section-number">10 / BLOG</div>
            <h2>THE<br /><span>STORIES.</span></h2>
            <p>
              Artist interviews, producer spotlights, new releases, Abuja creative culture,
              events, tutorials and behind-the-scenes stories will live here.
            </p>
          </div>
          <a href="#contact" className="button outline">GET FEATURED →</a>
        </div>
      </section>

      <section className="beats-marketplace" id="beats">
        <div className="beats-shell">
          <div className="beats-heading">
            <div>
              <div className="section-number">11 / GALAXY FIRE BEATS</div>
              <h2>FIND YOUR<br /><span>SOUND.</span></h2>
              <p>Original Galaxy Fire beats, ready for your next record. Preview for 15 seconds, choose your license, and keep creating.</p>
            </div>
            <div className="beats-search-wrap">
              <input value={beatSearch} onChange={(event) => setBeatSearch(event.target.value)} placeholder="SEARCH BEATS..." aria-label="Search beats" />
              <div className="beat-filter-buttons">
                {["ALL", "MAJOR", "MINOR"].map((filter) => (
                  <button key={filter} className={beatFilter === filter ? "active" : ""} onClick={() => setBeatFilter(filter)}>{filter}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="beat-feature">
            <div className={`vinyl-player ${vinylState}`}>
              <div className="vinyl-platter">
                <div className="vinyl-grooves" />
                <img src={beatArt} alt="Galaxy Records Limited artwork" className="vinyl-label" style={{ transform: `rotate(${vinylRotation}deg)` }} />
                <div className="vinyl-shine" />
              </div>
              <div className="tonearm"><div className="tonearm-head" /></div>
              <div className="turntable-control">
                <span>33⅓ RPM</span>
                <span>{vinylState === "playing" ? "PLAYING" : vinylState === "slowing" ? "STOPPING" : "READY"}</span>
              </div>
              <button className="vinyl-play" onClick={() => playBeat(selectedBeat)} aria-label={beatPlaying ? "Pause preview" : "Play preview"}>
                {beatPlaying ? "Ⅱ" : "▶"}
              </button>
            </div>

            <div className="beat-feature-info">
              <div className="now-playing-label">{beatPlaying ? "NOW PLAYING" : "BEAT PREVIEW"}</div>
              <h3>{selectedBeat.title}</h3>
              <div className="beat-meta">
                <span>BPM <b>{selectedBeat.bpm}</b></span>
                <span>KEY <b>{selectedBeat.key}</b></span>
                <span>MODE <b>{selectedBeat.mode}</b></span>
                <span>MOOD <b>{selectedBeat.mood}</b></span>
              </div>
              <p>Galaxy Fire original production. Preview is limited to 15 seconds before the vinyl slows to a stop.</p>
              <div className="beat-progress-row">
                <div className="beat-progress"><span style={{ width: `${Math.min(100, (beatProgress / 15) * 100)}%` }} /></div>
                <span>{Math.floor(beatProgress).toString().padStart(2, "0")} / 15</span>
              </div>

              <div className="beat-license-grid">
                <div><small>BASIC</small><strong>₦20,000</strong><span>MP3 Lease</span><button>SELECT</button></div>
                <div><small>PREMIUM</small><strong>₦40,000</strong><span>WAV Lease</span><button>SELECT</button></div>
                <div className="featured"><small>UNLIMITED</small><strong>₦80,000</strong><span>Unlimited Use</span><button>SELECT</button></div>
                <div><small>EXCLUSIVE</small><strong>₦150,000</strong><span>Exclusive Rights</span><button>SELECT</button></div>
              </div>
              <div className="beat-license-note">Secure purchase and delivery will be connected to the existing Paystack flow after the catalogue is finalized.</div>
            </div>
          </div>

          <div className="beats-table">
            <div className="beats-table-head"><span>ALL BEATS</span><span>BPM</span><span>KEY</span><span>MODE</span><span>MOOD</span><span>PREVIEW</span></div>
            {filteredBeats.map((beat) => (
              <div key={beat.id} className={`beat-row ${selectedBeat.id === beat.id ? "selected" : ""}`} onClick={() => { setSelectedBeat(beat); setBeatProgress(0); stopBeatPreview(false); }}>
                <span className="beat-row-title"><i>{selectedBeat.id === beat.id && beatPlaying ? "Ⅱ" : "▶"}</i>{beat.title}</span>
                <span>{beat.bpm}</span>
                <span>{beat.key}</span>
                <span>{beat.mode}</span>
                <span>{beat.mood}</span>
                <button className="beat-row-action" onClick={(event) => { event.stopPropagation(); playBeat(beat); }}>{selectedBeat.id === beat.id && beatPlaying ? "PAUSE" : "PLAY 15s"}</button>
              </div>
            ))}
          </div>
          <audio ref={beatAudioRef} preload="none" aria-hidden="true" />
        </div>
      </section>

      <section className="store-section" id="shop">
        <div className="store-shell">
          <div className="section-heading store-heading">
            <div className="section-number">12 / GALAXY FIRE PRO AUDIO</div>
            <h2>BUILD<br /><span>YOUR STUDIO.</span></h2>
            <p>Studio microphones, interfaces, monitors, headphones, production gear and essential accessories — selected for artists and creators.</p>
          </div>
          <div className="store-topbar">
            <div className="store-categories">
              {storeCategories.map((category) => (
                <button key={category} className={storeCategory === category ? "store-filter active" : "store-filter"} onClick={() => setStoreCategory(category)}>
                  {category}
                </button>
              ))}
            </div>
            <button className="cart-button" onClick={() => setCartOpen(true)}>CART <span>{cart.reduce((n, i) => n + i.quantity, 0)}</span> →</button>
          </div>
          {storeSuccess && <div className="store-success">{storeSuccess}</div>}
          <div className="store-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image-wrap">
                  <img
                    src={productImage(product.query)}
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = deskImg; }}
                  />
                  <span className="product-badge">{product.badge}</span>
                </div>
                <div className="product-info">
                  <div className="product-category">{product.category}</div>
                  <h3>{product.name}</h3>
                  <p>{product.desc}</p>
                  <div className="product-bottom">
                    <strong>{formatNaira(product.price)}</strong>
                    <button className="add-button" onClick={() => addToCart(product)}>ADD TO CART</button>
                  </div>
                  <small>{product.stock <= 2 ? "Limited stock" : "In stock"} · Ships across Nigeria</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {cartOpen && (
        <div className="store-overlay" onClick={() => setCartOpen(false)}>
          <aside className="cart-drawer" onClick={(event) => event.stopPropagation()}>
            <button className="store-close" onClick={() => setCartOpen(false)}>×</button>
            <div className="section-number">YOUR CART</div>
            <h2>READY<br /><span>TO ORDER.</span></h2>
            {cart.length === 0 ? <p className="empty-cart">Your cart is empty. Add some studio gear.</p> : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.product.id}>
                      <img src={productImage(item.product.query)} alt="" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = deskImg; }} />
                      <div>
                        <strong>{item.product.name}</strong>
                        <span>{formatNaira(item.product.price)}</span>
                        <div className="quantity-controls">
                          <button onClick={() => updateCartQuantity(item.product.id, -1)}>−</button>
                          <b>{item.quantity}</b>
                          <button onClick={() => updateCartQuantity(item.product.id, 1)}>+</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <div><span>Products</span><strong>{formatNaira(cartSubtotal)}</strong></div>
                  <div><span>Shipping & handling</span><strong>{formatNaira(shippingHandling)}</strong></div>
                  <div className="cart-total"><span>TOTAL</span><strong>{formatNaira(cartTotal)}</strong></div>
                </div>
                <button className="button red full" onClick={() => { setCartOpen(false); setStoreCheckoutOpen(true); }}>CHECKOUT WITH PAYSTACK →</button>
              </>
            )}
          </aside>
        </div>
      )}

      {storeCheckoutOpen && (
        <div className="store-overlay" onClick={() => !storeProcessing && setStoreCheckoutOpen(false)}>
          <div className="store-checkout" onClick={(event) => event.stopPropagation()}>
            <button className="store-close" onClick={() => !storeProcessing && setStoreCheckoutOpen(false)}>×</button>
            <div className="section-number">12 / CHECKOUT</div>
            <h2>DELIVERY<br /><span>DETAILS.</span></h2>
            <p className="checkout-note">Secure payment is processed through your existing Paystack integration. Shipping and handling are included in the final total shown below.</p>
            <div className="checkout-grid">
              <label>FULL NAME<input value={storeCustomer.name} onChange={(e) => setStoreCustomer({...storeCustomer, name: e.target.value})} /></label>
              <label>EMAIL<input type="email" value={storeCustomer.email} onChange={(e) => setStoreCustomer({...storeCustomer, email: e.target.value})} /></label>
              <label>PHONE<input value={storeCustomer.phone} onChange={(e) => setStoreCustomer({...storeCustomer, phone: e.target.value})} /></label>
              <label>CITY<input value={storeCustomer.city} onChange={(e) => setStoreCustomer({...storeCustomer, city: e.target.value})} /></label>
              <label className="wide">DELIVERY ADDRESS<textarea rows={3} value={storeCustomer.address} onChange={(e) => setStoreCustomer({...storeCustomer, address: e.target.value})} /></label>
            </div>
            <div className="checkout-total"><span>TOTAL TO PAY</span><strong>{formatNaira(cartTotal)}</strong></div>
            {storeError && <div className="store-error">{storeError}</div>}
            <button className="button red full" disabled={storeProcessing || cart.length === 0} onClick={checkoutStore}>{storeProcessing ? "OPENING SECURE PAYMENT..." : "PAY WITH PAYSTACK →"}</button>
          </div>
        </div>
      )}

      <section className="about-preview" id="about">
        <div className="about-preview-inner">
          <div className="section-number">13 / ABOUT GALAXY FIRE</div>
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
          <div className="section-number">14 / THE WORD</div>
          <h2>SPREAD<br /><span>THE FIRE.</span></h2>
          <p>Galaxy Fire Studios — where beats get built, voices get captured, and music gets finished.</p>
        </div>
        <div className="promo-grid">
          <div className="promo-card">
            <img src={promoStudioTimeImg} alt="Need some studio time? Reach out today" className="promo-img" loading="lazy" decoding="async" />
          </div>
          <div className="promo-card">
            <img src={promoBeatsImg} alt="Do you need beats or engineering? Contact us today" className="promo-img" loading="lazy" decoding="async" />
          </div>
          <div className="promo-card">
            <img src={promoSuperstarsImg} alt="Bring out the superstar in you — contact us now" className="promo-img" loading="lazy" decoding="async" />
          </div>
          <div className="promo-card">
            <img src={promoMixMasterImg} alt="Need to mix and master your music? Reach out to us today" className="promo-img" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>


      {/* WHY GALAXY FIRE */}
      <section className="why">
        <div className="why-content">
          <div className="section-number">15 / THE STANDARD</div>
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
        <img src={interfaceImg} alt="Studio audio interface" className="booking-photo" loading="lazy" decoding="async" />
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
              <a href="#home">Home</a>
              <a href="#studio">Studio</a>
              <a href="#services">Services</a>
              <a href="#booking">Book a Session</a>
              <a href="#culture">For the Culture</a>
              <a href="#beats">Beats</a>
              <a href="#shop">Shop</a>
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

        /* PHOTOGRAPHY & VISUALS */
        .visual-production { background: #0b0b0b; border-top: 1px solid #181818; }
        .visual-slider { margin-top: 55px; }
        .visual-grid { column-count: 3; column-gap: 12px; }
        .visual-grid-item { position: relative; overflow: hidden; display: block; width: 100%; margin: 0 0 12px; break-inside: avoid; background: #111; border: 1px solid #222; }
        .visual-grid-item img { width: 100%; height: auto; display: block; object-fit: contain; transition: transform .55s ease, filter .35s ease; }
        .visual-grid-item:hover img { transform: scale(1.045); filter: brightness(1.08); }
        .visual-slider-controls { display: flex; justify-content: center; align-items: center; gap: 28px; margin-top: 28px; }
        .visual-slider-controls > button { width: 44px; height: 44px; border: 1px solid #333; background: #111; color: #fff; cursor: pointer; font-size: 20px; }
        .visual-slider-controls > button:hover { border-color: #e50914; color: #e50914; }
        .visual-slider-dots { display: flex; gap: 8px; }
        .visual-slider-dots button { width: 7px; height: 7px; padding: 0; border: 0; border-radius: 50%; background: #555; cursor: pointer; }
        .visual-slider-dots button.active { background: #e50914; transform: scale(1.25); }
        .visual-services-pricing { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 65px; }
        .visual-price-group { border: 1px solid #242424; background: #0e0e0e; padding: 28px; }
        .visual-price-title { color: #e50914; font-family: 'Barlow Condensed', sans-serif; font-weight: 900; letter-spacing: 2px; font-size: 13px; margin-bottom: 16px; }
        .visual-price-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; padding: 14px 0; border-top: 1px solid #202020; color: #bbb; font-size: 13px; line-height: 1.45; }
        .visual-price-row strong { color: #fff; font-family: 'Barlow Condensed', sans-serif; font-size: 16px; white-space: nowrap; }

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

        /* FOR THE CULTURE */
        .culture { background: #0a0a0a; }
        .culture-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-top: 55px;
        }
        .culture-card {
          min-height: 420px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 32px;
          background: #111;
          border: 1px solid #252525;
          overflow: hidden;
          transition: transform .3s ease, border-color .3s ease, background .3s ease;
        }
        .culture-card::after {
          content: "";
          position: absolute;
          width: 180px;
          height: 180px;
          right: -70px;
          bottom: -70px;
          border-radius: 50%;
          background: rgba(229,9,20,.08);
          transition: transform .4s ease;
        }
        .culture-card:hover {
          transform: translateY(-5px);
          border-color: #e50914;
          background: #151515;
        }
        .culture-card:hover::after { transform: scale(1.5); }
        .culture-card-featured {
          background: linear-gradient(145deg, #171717, #0d0d0d);
          border-color: #e50914;
        }
        .culture-card-number {
          position: relative;
          z-index: 1;
          color: #e50914;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 1px;
        }
        .culture-card-content {
          position: relative;
          z-index: 1;
        }
        .culture-card-content > span {
          color: #777;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 2px;
        }
        .culture-card h3 {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 31px;
          line-height: .95;
          letter-spacing: -0.5px;
          margin: 15px 0 18px;
        }
        .culture-card p {
          color: #777;
          font-size: 13px;
          line-height: 1.7;
          margin: 0 0 25px;
        }
        .culture-card strong {
          color: #e50914;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.2px;
        }
        .culture-statement {
          margin-top: 12px;
          padding: 35px;
          border: 1px solid #242424;
          background: #111;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          align-items: center;
        }
        .culture-statement h3 {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 32px;
          margin: 12px 0 0;
          letter-spacing: 1px;
        }
        .culture-statement p {
          color: #777;
          line-height: 1.8;
          font-size: 14px;
          margin: 0;
        }

        /* ECOSYSTEM PREVIEWS */
        .ecosystem-preview {
          padding: 120px 7%;
          background: #0b0b0b;
          border-top: 1px solid #181818;
        }
        .ecosystem-preview.dark { background: #080808; }
        .ecosystem-preview-inner {
          max-width: 1200px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 70px;
        }
        .ecosystem-preview-inner > div:first-child { max-width: 700px; }
        .ecosystem-preview h2 {
          font-size: clamp(50px, 7vw, 95px);
          margin-bottom: 25px;
        }
        .ecosystem-preview p {
          max-width: 600px;
          color: #777;
          line-height: 1.8;
          font-size: 15px;
          margin: 0;
        }
        .ecosystem-status {
          min-width: 260px;
          padding: 30px;
          border: 1px solid #2b2b2b;
          background: #101010;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ecosystem-status span {
          color: #e50914;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 2px;
        }
        .ecosystem-status strong {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 26px;
          letter-spacing: 1px;
        }
        .ecosystem-status small {
          color: #555;
          font-size: 9px;
          line-height: 1.6;
          letter-spacing: 1px;
        }

        /* ABOUT PREVIEW */
        .about-preview {
          padding: 120px 7%;
          background: #111;
          border-top: 1px solid #1c1c1c;
        }
        .about-preview-inner {
          max-width: 1000px;
          margin: auto;
        }
        .about-preview h2 { font-size: clamp(55px, 8vw, 110px); }
        .about-preview p {
          max-width: 620px;
          color: #888;
          line-height: 1.8;
          font-size: 16px;
          margin-bottom: 35px;
        }

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
            background: #0a0a0a; padding: 30px; flex-direction: column; border-bottom: 1px solid #222; max-height: calc(100vh - 82px); overflow-y: auto;
          }
          .nav-links.open { display: flex; }
          .nav-button { display: none; }
          .menu-button { display: block; }
          .intro, .experience { grid-template-columns: 1fr; }
          .experience-image { order: -1; }
          .service-grid, .pricing-grid, .visual-services-pricing { grid-template-columns: 1fr 1fr; }
          .visual-cta { flex-direction: column; align-items: flex-start; }
          .visual-cta-buttons { justify-content: flex-start; }
          .why-grid { grid-template-columns: 1fr 1fr; }
          .gallery-grid { grid-template-columns: 1fr; }
          .gallery-row2 { grid-template-columns: 1fr 1fr; }
          .promo-grid { grid-template-columns: 1fr 1fr; }
          .store-grid { grid-template-columns:1fr 1fr; }
          .store-topbar { flex-direction:column; }
          .cart-button { align-self:stretch; }
          .store-checkout { padding:35px 22px; }
          .culture-grid { grid-template-columns: 1fr 1fr; }
          .culture-statement { grid-template-columns: 1fr; gap: 25px; }
          .ecosystem-preview-inner { flex-direction: column; align-items: flex-start; gap: 40px; }
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
          .visual-grid { column-count: 1; }
          .visual-services-pricing { grid-template-columns: 1fr; }
          .visual-cta { padding: 30px 22px; }
          .visual-cta-buttons { flex-direction: column; width: 100%; }
          .visual-cta-buttons .button { width: 100%; }
          .gallery-row2 { grid-template-columns: 1fr; }
          .promo-grid { grid-template-columns: 1fr 1fr; }
          .store-grid { grid-template-columns:1fr; }
          .checkout-grid { grid-template-columns:1fr; }
          .checkout-grid .wide { grid-column:auto; }
          .store-section { padding:80px 6%; }
          .cart-drawer { padding:45px 22px 25px; }
          .culture-grid { grid-template-columns: 1fr; }
          .culture-card { min-height: 360px; }
          .culture-statement { padding: 25px; }
          .ecosystem-preview, .about-preview { padding: 90px 6%; }
          .ecosystem-status { width: 100%; min-width: 0; }
          .stats { gap: 25px; }
          .contact-details { flex-direction: column; gap: 25px; align-items: center; }
          .booking-modal { padding: 10px; }
          .booking-modal-card { padding: 35px 20px 25px; max-height: 96vh; }
          .booking-form-grid, .payment-options { grid-template-columns: 1fr; }
          .booking-total strong { font-size: 22px; }
          .footer-bottom { flex-direction: column; gap: 12px; }
        }

        /* GALAXY FIRE BEATS MARKETPLACE */
        .beats-marketplace { background:#050505; padding:120px 5%; border-top:1px solid #1b1b1b; overflow:hidden; }
        .beats-shell { max-width:1500px; margin:0 auto; }
        .beats-heading { display:flex; justify-content:space-between; align-items:flex-end; gap:40px; margin-bottom:50px; }
        .beats-heading h2 { margin:12px 0 0; }
        .beats-heading p { max-width:700px; color:#777; line-height:1.8; margin:20px 0 0; }
        .beats-search-wrap { width:min(430px,100%); }
        .beats-search-wrap input { width:100%; box-sizing:border-box; background:#0b0b0b; color:#fff; border:1px solid #2b2b2b; padding:16px 18px; outline:none; text-transform:uppercase; letter-spacing:.08em; font-size:11px; }
        .beats-search-wrap input:focus { border-color:#e50914; }
        .beat-filter-buttons { display:flex; gap:8px; margin-top:10px; }
        .beat-filter-buttons button { flex:1; background:#101010; color:#777; border:1px solid #252525; padding:10px 12px; font-size:9px; letter-spacing:.14em; cursor:pointer; }
        .beat-filter-buttons button:hover,.beat-filter-buttons button.active { color:#fff; border-color:#e50914; background:#150606; }
        .beat-feature { display:grid; grid-template-columns:minmax(420px,1.08fr) minmax(460px,.92fr); gap:0; background:linear-gradient(135deg,#0b0b0b,#070707); border:1px solid #242424; box-shadow:0 30px 80px rgba(0,0,0,.45); }
        .vinyl-player { min-height:560px; position:relative; overflow:hidden; background:radial-gradient(circle at 50% 48%,#161616 0,#090909 52%,#050505 100%); border-right:1px solid #222; display:flex; align-items:center; justify-content:center; }
        .vinyl-player::before { content:""; position:absolute; inset:7%; border:1px solid rgba(229,9,20,.35); border-radius:50%; box-shadow:0 0 80px rgba(229,9,20,.08); }
        .vinyl-platter { width:min(74%,520px); aspect-ratio:1; position:relative; border-radius:50%; background:repeating-radial-gradient(circle,#050505 0 3px,#0e0e0e 3px 5px,#070707 5px 7px); box-shadow:0 0 0 8px #111,0 0 0 11px #2a2a2a,0 0 60px rgba(229,9,20,.28); transform-origin:center; }
        .vinyl-platter::before { content:""; position:absolute; inset:3%; border-radius:50%; border:1px solid rgba(255,255,255,.08); box-shadow:inset 0 0 30px rgba(255,255,255,.04); }
        .vinyl-grooves { position:absolute; inset:8%; border-radius:50%; background:repeating-radial-gradient(circle,transparent 0 5px,rgba(255,255,255,.055) 6px 7px,transparent 8px 11px); opacity:.65; }
        .vinyl-label { position:absolute; inset:25%; width:50%; height:50%; border-radius:50%; object-fit:cover; display:block; border:1px solid #3b3b3b; box-shadow:0 0 0 5px #090909,0 0 25px rgba(229,9,20,.16); transition:transform .05s linear; }
        .vinyl-shine { position:absolute; inset:0; border-radius:50%; background:linear-gradient(115deg,transparent 0 38%,rgba(255,255,255,.12) 45%,transparent 52% 100%); mix-blend-mode:screen; pointer-events:none; }
        .tonearm { position:absolute; width:190px; height:15px; background:linear-gradient(90deg,#222,#aaa,#333); border-radius:12px; right:7%; top:15%; transform:rotate(43deg); transform-origin:92% 50%; box-shadow:0 0 10px rgba(255,255,255,.12); }
        .tonearm::before { content:""; position:absolute; right:-8px; top:-16px; width:44px; height:44px; border-radius:50%; border:9px solid #202020; box-shadow:inset 0 0 0 2px #aaa; }
        .tonearm-head { position:absolute; left:-14px; top:2px; width:34px; height:10px; background:#111; border-radius:3px; box-shadow:0 0 8px rgba(229,9,20,.4); }
        .turntable-control { position:absolute; left:28px; bottom:24px; display:flex; flex-direction:column; gap:5px; color:#666; font-size:8px; letter-spacing:.18em; text-transform:uppercase; }
        .turntable-control span:last-child { color:#e50914; }
        .vinyl-play { position:absolute; left:50%; bottom:24px; transform:translateX(-50%); width:62px; height:62px; border-radius:50%; border:1px solid #e50914; background:#090909; color:#fff; font-size:18px; cursor:pointer; box-shadow:0 0 25px rgba(229,9,20,.2); }
        .vinyl-play:hover { background:#e50914; }
        .vinyl-player.slowing .vinyl-platter { animation:vinylSlow .95s ease-out both; }
        .vinyl-player.playing .vinyl-platter { box-shadow:0 0 0 8px #111,0 0 0 11px #2a2a2a,0 0 90px rgba(229,9,20,.38); }
        @keyframes vinylSlow { from { filter:brightness(1); } to { filter:brightness(.84); } }
        .beat-feature-info { padding:52px 48px 44px; display:flex; flex-direction:column; justify-content:center; }
        .now-playing-label { color:#e50914; font-size:10px; letter-spacing:.18em; font-weight:700; }
        .beat-feature-info h3 { font-size:clamp(42px,4vw,72px); line-height:.95; margin:14px 0 22px; letter-spacing:-.04em; }
        .beat-meta { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; }
        .beat-meta span { border:1px solid #242424; background:#0c0c0c; padding:12px; color:#666; font-size:8px; letter-spacing:.13em; text-transform:uppercase; }
        .beat-meta b { display:block; color:#fff; margin-top:6px; font-size:11px; letter-spacing:0; text-transform:none; }
        .beat-feature-info > p { color:#777; line-height:1.7; font-size:13px; max-width:640px; margin:22px 0; }
        .beat-progress-row { display:flex; align-items:center; gap:12px; color:#777; font-size:10px; margin-bottom:30px; }
        .beat-progress { flex:1; height:4px; background:#222; overflow:hidden; }
        .beat-progress span { display:block; height:100%; background:#e50914; transition:width .08s linear; }
        .beat-license-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; }
        .beat-license-grid > div { min-height:140px; padding:16px 12px; border:1px solid #252525; background:#0b0b0b; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; }
        .beat-license-grid > div.featured { border-color:#e50914; box-shadow:0 0 24px rgba(229,9,20,.12); }
        .beat-license-grid small { color:#aaa; font-weight:700; letter-spacing:.12em; }
        .beat-license-grid strong { font-size:17px; margin:9px 0 4px; }
        .beat-license-grid span { color:#666; font-size:9px; }
        .beat-license-grid button { margin-top:13px; width:100%; padding:8px 4px; border:1px solid #333; background:#111; color:#fff; font-size:8px; letter-spacing:.1em; cursor:pointer; }
        .beat-license-grid button:hover,.beat-license-grid .featured button { border-color:#e50914; background:#e50914; }
        .beat-license-note { color:#555; font-size:9px; line-height:1.6; margin-top:18px; }
        .beats-table { margin-top:22px; border:1px solid #242424; background:#080808; }
        .beats-table-head,.beat-row { display:grid; grid-template-columns:2.2fr .6fr .9fr .8fr 1.3fr .8fr; align-items:center; gap:12px; }
        .beats-table-head { padding:15px 20px; color:#555; border-bottom:1px solid #222; font-size:8px; letter-spacing:.15em; text-transform:uppercase; }
        .beat-row { width:100%; padding:0 20px; min-height:66px; border:0; border-bottom:1px solid #1c1c1c; background:#080808; color:#777; text-align:left; font:inherit; cursor:pointer; }
        .beat-row:last-child { border-bottom:0; }
        .beat-row:hover,.beat-row.selected { background:linear-gradient(90deg,#120606,#080808); color:#fff; }
        .beat-row-title { display:flex; align-items:center; gap:12px; color:#ddd; font-size:12px; }
        .beat-row-title i { display:grid; place-items:center; width:30px; height:30px; border:1px solid #292929; border-radius:50%; background:#101010; color:#fff; font-style:normal; font-size:9px; }
        .beat-row.selected .beat-row-title i { border-color:#e50914; color:#e50914; }
        .beat-row > span:not(.beat-row-title) { font-size:10px; }
        .beat-row-action { justify-self:end; background:none; border:0; cursor:pointer; padding:8px 0; color:#e50914 !important; font-size:8px !important; letter-spacing:.12em; font-weight:700; }
        @media (max-width: 1000px) {
          .beats-heading { flex-direction:column; align-items:flex-start; }
          .beats-search-wrap { width:100%; }
          .beat-feature { grid-template-columns:1fr; }
          .vinyl-player { min-height:520px; border-right:0; border-bottom:1px solid #222; }
          .beat-feature-info { padding:40px 30px; }
          .beat-license-grid { grid-template-columns:repeat(2,1fr); }
        }
        @media (max-width: 700px) {
          .beats-marketplace { padding:90px 6%; }
          .vinyl-player { min-height:390px; }
          .vinyl-platter { width:78%; }
          .tonearm { width:130px; right:2%; top:13%; }
          .beat-feature-info { padding:32px 20px; }
          .beat-meta { grid-template-columns:repeat(2,1fr); }
          .beat-license-grid { grid-template-columns:1fr 1fr; }
          .beats-table { overflow-x:auto; }
          .beats-table-head,.beat-row { min-width:720px; }
        }

        /* GALAXY FIRE PRO AUDIO STORE */
        .store-section { background:#080808; padding:110px 6%; border-top:1px solid #1d1d1d; }
        .store-shell { max-width:1400px; margin:0 auto; }
        .store-heading { max-width:780px; margin-bottom:45px; }
        .store-heading p { max-width:650px; color:#888; line-height:1.8; margin-top:20px; }
        .store-topbar { display:flex; justify-content:space-between; gap:20px; align-items:flex-start; margin-bottom:30px; }
        .store-categories { display:flex; gap:8px; flex-wrap:wrap; }
        .store-filter,.cart-button { background:#111; color:#aaa; border:1px solid #292929; padding:11px 14px; text-transform:uppercase; font-size:10px; letter-spacing:.12em; cursor:pointer; }
        .store-filter:hover,.store-filter.active { color:#fff; border-color:#e50914; }
        .cart-button { color:#fff; min-width:120px; }
        .cart-button span { display:inline-grid; place-items:center; width:22px; height:22px; margin-left:7px; border-radius:50%; background:#e50914; font-size:10px; }
        .store-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
        .product-card { background:#0f0f0f; border:1px solid #222; overflow:hidden; transition:transform .25s,border-color .25s; }
        .product-card:hover { transform:translateY(-4px); border-color:#444; }
        .product-image-wrap { position:relative; aspect-ratio:1/1; background:#f4f4f4; overflow:hidden; }
        .product-image { width:100%; height:100%; object-fit:contain; display:block; mix-blend-mode:multiply; transition:transform .35s; }
        .product-card:hover .product-image { transform:scale(1.04); }
        .product-badge { position:absolute; top:12px; left:12px; background:#e50914; color:#fff; padding:6px 8px; font-size:8px; font-weight:700; letter-spacing:.12em; }
        .product-info { padding:18px; }
        .product-category { color:#777; font-size:9px; text-transform:uppercase; letter-spacing:.15em; margin-bottom:8px; }
        .product-info h3 { font-size:19px; line-height:1.15; margin:0 0 10px; }
        .product-info p { color:#777; font-size:12px; line-height:1.55; min-height:58px; margin:0 0 16px; }
        .product-bottom { display:flex; justify-content:space-between; align-items:center; gap:10px; }
        .product-bottom strong { font-size:18px; }
        .add-button { background:#fff; color:#050505; border:0; padding:10px 12px; font-size:9px; font-weight:800; letter-spacing:.08em; cursor:pointer; }
        .add-button:hover { background:#e50914; color:#fff; }
        .product-info small { display:block; color:#555; margin-top:12px; font-size:9px; }
        .store-success,.store-error { padding:14px 16px; margin:0 0 20px; border:1px solid #333; font-size:12px; line-height:1.5; }
        .store-success { background:#0c1b0c; color:#9fdd9f; border-color:#285528; }
        .store-error { background:#1b0c0c; color:#ffaaa8; border-color:#552828; }
        .store-overlay { position:fixed; inset:0; z-index:1000; background:rgba(0,0,0,.82); display:flex; justify-content:flex-end; align-items:stretch; }
        .cart-drawer { width:min(520px,100%); height:100%; overflow:auto; background:#0b0b0b; padding:55px 35px 35px; border-left:1px solid #222; position:relative; }
        .store-checkout { width:min(760px,94%); max-height:92vh; overflow:auto; margin:auto; background:#0b0b0b; padding:55px; border:1px solid #292929; position:relative; }
        .store-close { position:absolute; right:20px; top:16px; background:none; border:0; color:#fff; font-size:30px; cursor:pointer; }
        .cart-drawer h2,.store-checkout h2 { font-size:52px; line-height:.9; margin:15px 0 30px; }
        .cart-drawer h2 span,.store-checkout h2 span { color:#e50914; }
        .cart-items { border-top:1px solid #222; }
        .cart-item { display:grid; grid-template-columns:72px 1fr; gap:14px; padding:15px 0; border-bottom:1px solid #222; }
        .cart-item img { width:72px; height:72px; object-fit:contain; background:#f4f4f4; mix-blend-mode:multiply; }
        .cart-item strong,.cart-item span { display:block; }
        .cart-item strong { font-size:13px; margin-bottom:5px; }
        .cart-item span { color:#999; font-size:12px; }
        .quantity-controls { display:flex; align-items:center; gap:10px; margin-top:8px; }
        .quantity-controls button { width:25px; height:25px; background:#171717; color:#fff; border:1px solid #333; cursor:pointer; }
        .quantity-controls b { font-size:11px; }
        .cart-summary { margin:25px 0; border-top:1px solid #333; }
        .cart-summary > div { display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid #222; font-size:12px; color:#888; }
        .cart-summary .cart-total { color:#fff; font-size:14px; }
        .cart-total strong { font-size:20px; }
        .button.full { width:100%; border:0; cursor:pointer; }
        .empty-cart { color:#777; line-height:1.7; }
        .checkout-note { color:#777; line-height:1.7; font-size:13px; max-width:620px; margin-bottom:25px; }
        .checkout-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .checkout-grid label { display:flex; flex-direction:column; gap:8px; color:#777; font-size:9px; letter-spacing:.12em; }
        .checkout-grid .wide { grid-column:1/-1; }
        .checkout-grid input,.checkout-grid textarea { background:#111; color:#fff; border:1px solid #292929; padding:13px; font:inherit; outline:none; resize:vertical; }
        .checkout-grid input:focus,.checkout-grid textarea:focus { border-color:#e50914; }
        .checkout-total { display:flex; justify-content:space-between; align-items:center; margin:25px 0; padding:18px 0; border-top:1px solid #333; border-bottom:1px solid #333; }
        .checkout-total span { color:#777; font-size:10px; letter-spacing:.12em; }
        .checkout-total strong { font-size:24px; }
      `}</style>
    </div>
  );
}
