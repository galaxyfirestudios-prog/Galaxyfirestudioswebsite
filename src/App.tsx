import { useEffect, useState, type FormEvent } from "react";

// IMPORTANT: these are the OLD studio images that are actually present in src/imports.
// The previous App.tsx referenced several deleted UUID files, which caused Vite to fail.
import studioDesk from "@/imports/3fdd97c2-2891-4094-9214-196df630473f.JPG";
import studioMicClose from "@/imports/9b6f958a-50ea-406b-b280-731a77251cd2.JPG";
import studioMic from "@/imports/2dad0e2f-97cd-4bc5-8a40-6d2ca428cee7.JPG";
import studioMpc from "@/imports/5f761b8a-db00-4f37-be3f-8a9cf9ced4ba.JPG";
import studioSpeaker from "@/imports/7aa7a4d2-c05f-4d17-ace1-204719c82c51.JPG";
import promoStudioTimeImg from "@/imports/IMG_3312.PNG";
import promoBeatsImg from "@/imports/IMG_3365.PNG";
import promoSuperstarsImg from "@/imports/IMG_3360.PNG";
import promoMixMasterImg from "@/imports/IMG_3359.PNG";

// Vite imports all 27 new visual images automatically.
const visualFiles = import.meta.glob("./imports/Image *.jpg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const visualImage = (number: number) => visualFiles[`./imports/Image ${number}.jpg`];

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

const studioServices = [
  ["01", "RECORDING", "Professional recording sessions engineered to capture your performance with clarity, character and impact."],
  ["02", "MUSIC PRODUCTION", "Build your record from the first idea with beat production, arrangement, sound selection and creative development."],
  ["03", "VOCAL PRODUCTION", "Performance direction, harmonies, ad-libs, vocal arrangement and detailed vocal preparation."],
  ["04", "MIXING", "Turn your recordings into a finished record with balance, depth, punch and clarity."],
  ["05", "MASTERING", "Give your finished music the final polish it needs before it reaches the world."],
  ["06", "RELEASE SUPPORT", "Help preparing music for release, including metadata, distribution guidance and release planning."],
];

const visualServices = [
  { n: "01", title: "PHOTOGRAPHY", image: 1, price: "₦75,000+", text: "Artist portraits, cover-art photography, press photos, birthdays, events and editorial shoots.", booking: "Artist Photoshoot" },
  { n: "02", title: "VIDEOGRAPHY", image: 2, price: "₦250,000+", text: "Music videos, performance films, lyric videos, visualizers, social content and event coverage.", booking: "Music Video" },
  { n: "03", title: "CREATIVE DIRECTION", image: 3, price: "CUSTOM QUOTE", text: "Music-video concepts, cover-art concepts, artist branding, visual storytelling and content planning." },
];

const portfolioTitles = [
  "ARTIST PORTRAITS", "COVER ART", "EVENTS", "BEHIND THE SCENES", "CAMPAIGNS",
  "MUSIC VIDEOS", "PERFORMANCE FILMS", "VISUALIZERS", "LYRIC VIDEOS", "SOCIAL CONTENT",
  "EDITORIAL", "ARTIST BRANDING", "STUDIO SESSIONS", "LIVE EVENTS", "PRESS PHOTOS",
  "CREATIVE CAMPAIGNS", "COVER CONCEPTS", "MUSIC VIDEO BTS", "CONTENT CREATION", "PORTRAIT SERIES",
  "PERFORMANCE", "VISUAL STORYTELLING", "CAMERA WORK", "GALAXY FIRE VISUALS",
];

const naira = (value: number) => `₦${value.toLocaleString("en-NG")}`;

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
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

  const selected = bookingServices.find((s) => s.title === booking.service) ?? bookingServices[0];
  const amount = booking.payment === "deposit" ? Math.round(selected.price / 2) : selected.price;

  const openBooking = (service?: string) => {
    setSubmitted(false);
    setError("");
    if (service) setBooking((b) => ({ ...b, service }));
    setBookingOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeBooking = () => {
    setBookingOpen(false);
    document.body.style.overflow = "";
  };

  const update = (field: string, value: string) => {
    setBooking((b) => ({ ...b, [field]: value }));
  };

  useEffect(() => {
    const src = "https://js.paystack.co/v2/inline.js";
    if (document.querySelector(`script[src="${src}"]`)) return;
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const submitBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setProcessing(true);

    const referenceId = `GFS-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "pk_test_f350611c4c768b941d8725e73b122d3d37c9e5d7";

    const startPaystack = () => {
      const PaystackPop = (window as any).PaystackPop;
      if (!PaystackPop) {
        setProcessing(false);
        setError("Paystack could not load. Please refresh the page and try again.");
        return;
      }

      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: publicKey,
        email: booking.email,
        amount: amount * 100,
        currency: "NGN",
        reference: referenceId,
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
                expectedAmount: amount * 100,
                booking,
              }),
            });
            const result = await response.json();
            if (!response.ok || !result.verified) throw new Error(result.message || "Payment verification failed.");
            setReference(transaction.reference);
            setSubmitted(true);
          } catch (err) {
            console.error(err);
            setError(`Payment was completed, but verification failed. Please contact us with reference ${transaction.reference}.`);
          } finally {
            setProcessing(false);
          }
        },
        onCancel: () => setProcessing(false),
      });
    };

    if ((window as any).PaystackPop) {
      startPaystack();
      return;
    }

    const timer = window.setInterval(() => {
      if ((window as any).PaystackPop) {
        window.clearInterval(timer);
        startPaystack();
      }
    }, 150);

    window.setTimeout(() => {
      window.clearInterval(timer);
      if (!(window as any).PaystackPop) {
        setProcessing(false);
        setError("Paystack could not load. Please refresh the page and try again.");
      }
    }, 8000);
  };

  return (
    <div className="site">
      <header className="nav">
        <a className="brand" href="#home">
          <span className="brand-mark">GF</span>
          <span><strong>GALAXY FIRE</strong><small>STUDIOS · EST. 2020</small></span>
        </a>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          {[["HOME", "home"], ["STUDIO", "studio"], ["SERVICES", "services"], ["VISUALS", "visuals"], ["PRICING", "pricing"], ["BOOK", "booking"], ["FOR THE CULTURE", "culture"], ["RADIO", "radio"], ["BLOG", "blog"], ["BEATS", "beats"], ["SHOP", "shop"], ["ABOUT", "about"], ["CONTACT", "contact"]].map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>

        <a className="nav-cta" href="#booking">BOOK A SESSION</a>
        <button className="menu" onClick={() => setMenuOpen((v) => !v)} aria-label="Open menu">{menuOpen ? "×" : "☰"}</button>
      </header>

      <main>
        <section className="hero" id="home">
          <img src={studioDesk} alt="Galaxy Fire Studios" />
          <div className="shade" />
          <div className="hero-copy">
            <span className="eyebrow">PROFESSIONAL RECORDING STUDIO · NIGERIA</span>
            <h1>YOUR SOUND.<br /><span>YOUR FIRE.</span></h1>
            <p>A professional recording and production studio built for artists who take their music seriously.</p>
            <div className="actions"><a className="btn red" href="#booking">BOOK A SESSION</a><a className="btn ghost" href="#studio">EXPLORE THE STUDIO</a></div>
            <small className="est">EST. 2020</small>
          </div>
        </section>

        <section className="split" id="studio">
          <div><span className="section-no">01 / THE STUDIO</span><h2>ONE ROOM.<br /><span>BUILT FOR CREATION.</span></h2><p>Galaxy Fire Studios is a professional recording and production environment created for artists, producers and creators who want more from their music.</p><p>From the first vocal take to the final master, we give you the space, tools and expertise to bring your vision to life.</p><div className="stats"><b>2020<small>ESTABLISHED</small></b><b>01<small>STUDIO ROOM</small></b><b>∞<small>POSSIBILITIES</small></b></div></div>
          <img src={studioDesk} alt="Studio desk and monitors" />
        </section>

        <section className="split dark-split">
          <img src={studioMic} alt="Recording microphone" />
          <div><span className="section-no">02 / THE EXPERIENCE</span><h2>WALK IN WITH<br /><span>AN IDEA.</span></h2><h3>WALK OUT WITH A RECORD.</h3><p>Galaxy Fire is designed to keep you focused on what matters — making great music.</p><div className="steps">{[["01", "BOOK", "Choose your service and session."], ["02", "CREATE", "Come into the studio and make the record."], ["03", "REFINE", "Record, produce, mix and shape the sound."], ["04", "RELEASE", "Leave with music ready for the world."]].map(([n, t, p]) => <div className="step" key={n}><b>{n}</b><div><strong>{t}</strong><p>{p}</p></div></div>)}</div></div>
        </section>

        <section id="services">
          <div className="heading"><span className="section-no">03 / SERVICES</span><h2>WHAT<br /><span>WE DO.</span></h2><p>Everything you need to take an idea from the first recording to a finished release.</p></div>
          <div className="cards">{studioServices.map(([n, t, p]) => <article className="card" key={n}><span>{n}</span><h3>{t}</h3><p>{p}</p><a href="#booking">GET STARTED →</a></article>)}</div>
        </section>

        <section className="feature"><img src={studioSpeaker} alt="Studio monitors" /><div className="shade" /><div><span className="eyebrow">THE GALAXY FIRE STANDARD</span><h2>GREAT MUSIC<br /><span>STARTS HERE.</span></h2><a className="btn red" href="#booking">BOOK YOUR SESSION</a></div></section>

        <section id="visuals">
          <div className="heading"><span className="section-no">04 / VISUAL PRODUCTION</span><h2>MAKE IT<br /><span>VISIBLE.</span></h2><p>Photography, videography and creative direction built around the artist, the record and the story behind it.</p></div>
          <div className="visual-services">{visualServices.map((s) => <article className="visual-card" key={s.n}><div className="visual-image"><img src={visualImage(s.image)} alt={s.title} /><b>{s.n}</b></div><div className="visual-body"><h3>{s.title}</h3><strong className="visual-price">{s.price}</strong><p>{s.text}</p>{s.booking ? <button className="text-button" onClick={() => openBooking(s.booking)}>BOOK A VISUAL SESSION →</button> : <a className="text-button" href="https://wa.me/2348035345977?text=Hi%20Galaxy%20Fire%20Studios%2C%20I%27d%20like%20a%20creative%20direction%20quote." target="_blank" rel="noreferrer">GET A CREATIVE QUOTE →</a>}</div></article>)}</div>

          <div className="portfolio-title"><div><span className="section-no">PORTFOLIO</span><h3>SELECTED<br /><span>VISUAL WORK.</span></h3></div><p>Photography and videography work from Galaxy Fire Studios. All 27 new images are kept inside the Visual Production section.</p></div>
          <div className="portfolio">{portfolioTitles.map((title, i) => <article key={title}><img src={visualImage(i + 4)} alt={title} /><span>{title}</span></article>)}</div>
        </section>

        <section id="pricing">
          <div className="heading center"><span className="section-no">05 / PRICING</span><h2>STUDIO<br /><span>RATES.</span></h2><p>Professional services. Straightforward pricing.</p></div>
          <div className="pricing">{bookingServices.slice(0, 6).map((s, i) => <article className={i === 0 ? "price-card featured" : "price-card"} key={s.title}>{i === 0 && <em>MOST POPULAR</em>}<span>{s.unit.toUpperCase()}</span><h3>{s.title}</h3><strong>{naira(s.price)}</strong><p>{s.unit} · professional service</p><button onClick={() => openBooking(s.title)}>BOOK →</button></article>)}</div>
          <div className="visual-pricing"><h3>VISUAL PRODUCTION PRICING</h3><div><span>Artist Photoshoot <b>₦75,000+</b></span><span>Cover Art Shoot <b>₦50,000+</b></span><span>Event Photography <b>₦100,000+</b></span><span>Music Video <b>₦250,000+</b></span><span>Performance Video <b>₦150,000+</b></span><span>Visualizer <b>₦100,000+</b></span><span>Lyric Video <b>₦75,000+</b></span><span>Social Content Package <b>₦100,000+</b></span></div></div>
        </section>

        <section id="gallery">
          <div className="heading"><span className="section-no">06 / GALLERY</span><h2>INSIDE<br /><span>THE FIRE.</span></h2></div>
          <div className="gallery"><img src={studioDesk} alt="Control room" /><img src={studioMicClose} alt="Vocal booth" /><img src={studioMpc} alt="MPC production setup" /><img src={studioSpeaker} alt="Studio monitor" /><img src={studioMic} alt="Microphone setup" /><img src={studioDesk} alt="Studio desk" /></div>
        </section>

        <section className="culture" id="culture">
          <div className="heading"><span className="section-no">08 / FOR THE CULTURE</span><h2>THE SOUND.<br /><span>THE PEOPLE. THE CULTURE.</span></h2><p>Galaxy Fire Studios is more than a room to record in. FOR THE CULTURE is our growing home for Abuja music, artists, stories, beats, radio and the creative community around us.</p></div>
          <div className="cards culture-cards">{[["01", "FOR THE CULTURE RADIO", "Hear Abuja talent, guest mixes, premieres and future Galaxy Fire programming."], ["02", "THE BLOG", "Artist profiles, interviews, releases, events, studio stories and creative culture."], ["03", "BEATS MARKETPLACE", "Discover beats by genre, mood, BPM and producer."], ["04", "GALAXY FIRE SHOP", "Studio merchandise, FOR THE CULTURE pieces and branded essentials."]].map(([n, t, p]) => <a className="card" href={`#${n === "01" ? "radio" : n === "02" ? "blog" : n === "03" ? "beats" : "shop"}`} key={n}><span>{n}</span><h3>{t}</h3><p>{p}</p><strong>EXPLORE →</strong></a>)}</div>
        </section>

        {["radio", "blog", "beats", "shop"].map((id, i) => <section className="coming" id={id} key={id}><span className="section-no">{String(9 + i).padStart(2, "0")} / {id.toUpperCase()}</span><h2>{id === "radio" ? "FOR THE CULTURE RADIO." : id === "blog" ? "THE STORIES." : id === "beats" ? "FIND YOUR SOUND." : "WEAR THE FIRE."}</h2><p>{id === "radio" ? "The live station is coming. This space will become the home for the FOR THE CULTURE stream, guest mixes and original shows." : id === "blog" ? "Artist interviews, producer spotlights, releases, Abuja creative culture, events and behind-the-scenes stories will live here." : id === "beats" ? "The Beats Marketplace will let artists preview beats, explore producers and purchase the right license." : "Galaxy Fire and FOR THE CULTURE merchandise will be available here as the studio ecosystem grows."}</p><span className="status">COMING SOON</span></section>)}

        <section id="about" className="about"><span className="section-no">13 / ABOUT GALAXY FIRE</span><h2>BUILT FOR<br /><span>CREATORS.</span></h2><p>Galaxy Fire Studios is a professional recording and production environment for artists, producers and creators who want to take their music seriously.</p><a className="btn red" href="#booking">WORK WITH US →</a></section>

        <section className="promo"><div className="heading"><span className="section-no">14 / THE WORD</span><h2>SPREAD<br /><span>THE FIRE.</span></h2></div><div className="promo-grid">{[[promoStudioTimeImg, "Studio time"], [promoBeatsImg, "Beats and engineering"], [promoSuperstarsImg, "Bring out the superstar"], [promoMixMasterImg, "Mix and master"]].map(([img, alt]) => <img key={alt} src={img} alt={alt} />)}</div></section>

        <section className="why"><span className="section-no">15 / THE STANDARD</span><h2>YOUR MUSIC.<br /><span>OUR CRAFT.</span></h2><div className="why-grid">{[["01", "PROFESSIONAL", "A serious environment for serious music."], ["02", "CREATIVE", "A space designed to keep artists focused."], ["03", "PERSONAL", "Your record is not treated like just another session."], ["04", "QUALITY", "Every detail matters from recording to final master."]].map(([n, t, p]) => <div key={n}><b>{n}</b><h3>{t}</h3><p>{p}</p></div>)}</div></section>

        <section className="booking" id="booking"><img src={studioDesk} alt="Galaxy Fire studio" /><div className="shade" /><div><span className="eyebrow">GALAXY FIRE STUDIOS · EST. 2020</span><h2>READY TO<br /><span>MAKE SOME FIRE?</span></h2><p>Choose your service, preferred session time and payment option.</p><div className="actions"><button className="btn red" onClick={() => openBooking()}>BOOK & PAY ONLINE</button><a className="btn ghost" href="https://wa.me/2348035345977" target="_blank" rel="noreferrer">BOOK VIA WHATSAPP</a></div><p className="contact">galaxyfirestudios@gmail.com · +234 803 534 5977</p></div></section>
      </main>

      {bookingOpen && <div className="modal" role="dialog" aria-modal="true"><div className="modal-bg" onClick={closeBooking} /><div className="modal-card"><button className="close" onClick={closeBooking}>×</button>{!submitted ? <><span className="section-no">BOOKING / 01</span><h2>BOOK YOUR<br /><span>SESSION.</span></h2><form onSubmit={submitBooking}><label>SERVICE<select value={booking.service} onChange={(e) => update("service", e.target.value)}>{bookingServices.map((s) => <option key={s.title}>{s.title} — {naira(s.price)}</option>)}</select></label><div className="form-grid"><label>DATE<input required type="date" min={new Date().toISOString().split("T")[0]} value={booking.date} onChange={(e) => update("date", e.target.value)} /></label><label>TIME<input required type="time" value={booking.time} onChange={(e) => update("time", e.target.value)} /></label></div><div className="form-grid"><label>FULL NAME<input required value={booking.name} onChange={(e) => update("name", e.target.value)} /></label><label>PHONE<input required value={booking.phone} onChange={(e) => update("phone", e.target.value)} /></label></div><label>EMAIL<input required type="email" value={booking.email} onChange={(e) => update("email", e.target.value)} /></label><label>NOTES<textarea rows={3} value={booking.notes} onChange={(e) => update("notes", e.target.value)} /></label><div className="pay-options"><button type="button" className={booking.payment === "deposit" ? "active" : ""} onClick={() => update("payment", "deposit")}>50% DEPOSIT<br /><b>{naira(selected.price / 2)}</b></button><button type="button" className={booking.payment === "full" ? "active" : ""} onClick={() => update("payment", "full")}>FULL PAYMENT<br /><b>{naira(selected.price)}</b></button></div><div className="due">AMOUNT DUE <strong>{naira(amount)}</strong></div><button className="btn red submit" disabled={processing}>{processing ? "OPENING PAYSTACK..." : `PAY ${naira(amount)} WITH PAYSTACK →`}</button>{error && <p className="error">{error}</p>}</form></> : <div className="success"><div className="success-mark">✓</div><span className="section-no">PAYMENT VERIFIED</span><h2>YOU'RE ON<br /><span>THE LIST.</span></h2><p>Your payment has been received and verified. We will contact you to confirm your session.</p><p><strong>REFERENCE: {reference}</strong></p><a className="btn red" href={`https://wa.me/2348035345977?text=${encodeURIComponent(`Hi Galaxy Fire Studios, I just paid for ${booking.service}. Reference: ${reference}.`)}`} target="_blank" rel="noreferrer">MESSAGE US ON WHATSAPP</a></div>}</div></div>}

      <footer id="contact"><div><strong>GALAXY FIRE STUDIOS</strong><p>Record. Create. Ignite.</p></div><div><a href="#home">Home</a><a href="#services">Services</a><a href="#visuals">Visuals</a><a href="#pricing">Pricing</a><a href="#booking">Book</a><a href="mailto:galaxyfirestudios@gmail.com">Email</a></div><small>© 2026 GALAXY FIRE STUDIOS · EST. 2020 · NIGERIA</small></footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700;800;900&family=Barlow+Condensed:wght@400;600;700;800;900&display=swap');
        *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#080808;color:#fff;font-family:Barlow,Arial,sans-serif}a{text-decoration:none;color:inherit}button,input,select,textarea{font:inherit}.site{overflow:hidden;background:#080808}.nav{height:78px;position:fixed;z-index:100;inset:0 0 auto;display:flex;align-items:center;justify-content:space-between;padding:0 5%;background:rgba(5,5,5,.94);backdrop-filter:blur(12px);border-bottom:1px solid #222}.brand{display:flex;align-items:center;gap:10px}.brand-mark{display:grid;place-items:center;width:42px;height:42px;border:2px solid #e50914;color:#e50914;font-weight:900}.brand strong{display:block;font-family:'Barlow Condensed';letter-spacing:2px}.brand small{display:block;color:#777;font-size:8px;letter-spacing:2px}.nav-links{display:flex;gap:20px;font-family:'Barlow Condensed';font-size:11px;font-weight:800;letter-spacing:1px}.nav-links a:hover{color:#e50914}.nav-cta,.btn.red{background:#e50914}.nav-cta{padding:12px 18px;font-family:'Barlow Condensed';font-weight:900;font-size:11px}.menu{display:none;background:none;color:#fff;border:0;font-size:24px}.hero,.feature,.booking{min-height:100vh;position:relative;display:flex;align-items:center}.hero>img,.feature>img,.booking>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.9),rgba(0,0,0,.48),rgba(0,0,0,.18))}.hero-copy,.feature>div:last-child,.booking>div:last-child{position:relative;z-index:2;padding:150px 8%;max-width:1000px}.eyebrow,.section-no{color:#e50914;font-family:'Barlow Condensed';font-weight:900;letter-spacing:3px;font-size:11px}.hero h1{font:900 clamp(64px,10vw,140px)/.86 'Barlow Condensed';margin:24px 0}.hero h1 span,h2 span,.heading h3 span,.about h2 span{color:#e50914}.hero p,.heading>p,.split p,.coming p,.about p{max-width:650px;color:#bbb;line-height:1.7;font-size:16px}.actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}.btn{display:inline-block;padding:15px 22px;border:0;color:#fff;font-family:'Barlow Condensed';font-weight:900;letter-spacing:1.5px;cursor:pointer}.btn.ghost{border:1px solid #666;background:transparent}.est{display:block;color:#777;letter-spacing:4px;margin-top:70px}.hero-copy{padding-top:180px}.split,section{padding:120px 7%}.split{display:grid;grid-template-columns:1fr 1fr;gap:70px;align-items:center}.split img{width:100%;height:560px;object-fit:cover}.dark-split{background:#101010}.split h2,.heading h2,.booking h2,.about h2,.why h2{font:900 clamp(48px,7vw,90px)/.9 'Barlow Condensed';margin:20px 0}.stats{display:flex;gap:50px;margin-top:45px}.stats b{font:900 42px 'Barlow Condensed'}.stats small{display:block;color:#777;font:600 10px Barlow;letter-spacing:2px;margin-top:5px}.steps{margin-top:30px}.step{display:flex;gap:20px;padding:15px 0;border-bottom:1px solid #292929}.step>b{color:#e50914;font-family:'Barlow Condensed'}.step strong{font-family:'Barlow Condensed';letter-spacing:1px}.step p{margin:5px 0;font-size:14px}.heading{max-width:720px;margin-bottom:50px}.heading.center{margin-left:auto;margin-right:auto;text-align:center}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#333}.card{background:#0b0b0b;padding:35px;min-height:250px}.card>span{color:#e50914;font-family:'Barlow Condensed';font-weight:900}.card h3{font:800 30px 'Barlow Condensed';margin:20px 0}.card p{color:#aaa;line-height:1.6}.card a,.card strong{font:800 11px 'Barlow Condensed';letter-spacing:1.5px}.feature{min-height:70vh}.feature>div:last-child{padding-left:8%}.feature h2{font:900 clamp(50px,7vw,90px)/.9 'Barlow Condensed'}.visual-services{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.visual-card{background:#111;border:1px solid #252525}.visual-image{height:340px;position:relative}.visual-image img{width:100%;height:100%;object-fit:cover}.visual-image b{position:absolute;top:15px;left:15px;background:#e50914;padding:6px 9px;font-family:'Barlow Condensed'}.visual-body{padding:28px}.visual-body h3{font:800 30px 'Barlow Condensed';margin:0 0 10px}.visual-price{color:#e50914;font-family:'Barlow Condensed';font-size:20px}.visual-body p{color:#aaa;line-height:1.6}.text-button{border:0;background:none;color:#fff;padding:0;font:800 11px 'Barlow Condensed';letter-spacing:1px;cursor:pointer}.portfolio-title{display:flex;justify-content:space-between;gap:30px;align-items:end;margin:90px 0 30px}.portfolio-title h3{font:900 46px/.9 'Barlow Condensed';margin:12px 0}.portfolio-title p{max-width:500px;color:#888}.portfolio{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.portfolio article{position:relative;aspect-ratio:1/1;overflow:hidden;background:#111}.portfolio img{width:100%;height:100%;object-fit:cover;transition:.3s}.portfolio article:hover img{transform:scale(1.05)}.portfolio span{position:absolute;bottom:0;left:0;right:0;padding:25px 12px 12px;background:linear-gradient(transparent,#000);font:800 11px 'Barlow Condensed'}.pricing{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.price-card{background:#111;border:1px solid #252525;padding:30px;position:relative}.price-card.featured{border-color:#e50914}.price-card em{position:absolute;right:15px;top:15px;background:#e50914;padding:5px 8px;font:800 9px 'Barlow Condensed';font-style:normal}.price-card>span{color:#e50914;font:800 11px 'Barlow Condensed';letter-spacing:2px}.price-card h3{font:800 27px 'Barlow Condensed'}.price-card>strong{font:900 38px 'Barlow Condensed'}.price-card p{color:#777}.price-card button{background:#e50914;color:#fff;border:0;padding:12px 16px;font:800 11px 'Barlow Condensed';cursor:pointer}.visual-pricing{margin-top:25px;border:1px solid #252525;padding:30px;background:#101010}.visual-pricing h3{font:800 25px 'Barlow Condensed'}.visual-pricing>div{display:grid;grid-template-columns:1fr 1fr;gap:10px}.visual-pricing span{display:flex;justify-content:space-between;border-bottom:1px solid #282828;padding:12px;color:#aaa}.visual-pricing b{color:#fff}.gallery{display:grid;grid-template-columns:2fr 1fr 1fr;grid-auto-rows:260px;gap:8px}.gallery img{width:100%;height:100%;object-fit:cover}.gallery img:first-child{grid-row:span 2}.culture{background:#101010}.culture-cards{grid-template-columns:repeat(4,1fr)}.coming{background:#0b0b0b;border-top:1px solid #222}.coming h2{font:900 clamp(45px,7vw,90px) 'Barlow Condensed';max-width:800px}.status{display:inline-block;border:1px solid #e50914;color:#e50914;padding:8px 12px;font:800 10px 'Barlow Condensed';letter-spacing:2px}.about{background:#e50914}.about .section-no,.about h2 span{color:#fff}.about p{color:#eee}.about .btn.red{background:#080808}.promo-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.promo-grid img{width:100%;aspect-ratio:1/1;object-fit:cover}.why{background:#111}.why-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:25px;margin-top:45px}.why-grid b{color:#e50914;font:900 25px 'Barlow Condensed'}.why-grid h3{font:800 25px 'Barlow Condensed'}.why-grid p{color:#888}.booking{min-height:75vh}.booking h2{font-size:clamp(48px,7vw,90px)}.contact{color:#aaa}.modal{position:fixed;z-index:200;inset:0;display:grid;place-items:center;padding:25px}.modal-bg{position:absolute;inset:0;background:rgba(0,0,0,.85)}.modal-card{position:relative;z-index:2;width:min(700px,100%);max-height:90vh;overflow:auto;background:#111;border:1px solid #333;padding:35px}.close{position:absolute;right:15px;top:10px;background:none;border:0;color:#fff;font-size:30px;cursor:pointer}.modal-card h2{font:900 55px/.9 'Barlow Condensed';margin:18px 0 30px}.modal-card form label{display:block;color:#999;font:800 10px 'Barlow Condensed';letter-spacing:1px;margin:14px 0}.modal-card input,.modal-card select,.modal-card textarea{width:100%;margin-top:7px;background:#090909;border:1px solid #333;color:#fff;padding:12px}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:15px}.pay-options{display:grid;grid-template-columns:1fr 1fr;gap:10px}.pay-options button{background:#090909;border:1px solid #333;color:#fff;padding:15px;text-align:left;cursor:pointer}.pay-options button.active{border-color:#e50914}.pay-options b{font-size:20px}.due{display:flex;justify-content:space-between;padding:18px 0;font:800 12px 'Barlow Condensed'}.due strong{font-size:25px}.submit{width:100%}.error{color:#ff5a5a}.success{text-align:center;padding:35px 0}.success-mark{font-size:55px;color:#e50914}.success .btn{margin-top:20px}footer{padding:55px 7% 25px;border-top:1px solid #222;display:grid;grid-template-columns:1fr 1fr;gap:30px}footer strong{font-family:'Barlow Condensed';letter-spacing:2px}footer p{color:#777}footer>div:nth-child(2){display:flex;gap:20px;flex-wrap:wrap;justify-content:flex-end}footer small{grid-column:1/-1;color:#555;border-top:1px solid #222;padding-top:20px}
        @media(max-width:1000px){.nav-links{gap:10px}.nav-links a:nth-child(n+8){display:none}.visual-services,.pricing{grid-template-columns:1fr 1fr}.cards{grid-template-columns:1fr 1fr}.culture-cards{grid-template-columns:1fr 1fr}.portfolio{grid-template-columns:repeat(3,1fr)}.why-grid{grid-template-columns:1fr 1fr}.promo-grid{grid-template-columns:1fr 1fr}}
        @media(max-width:700px){.nav{height:68px}.nav-cta{display:none}.menu{display:block}.nav-links{display:none;position:absolute;top:68px;left:0;right:0;background:#080808;padding:20px;flex-direction:column;gap:15px}.nav-links.open{display:flex}.nav-links a{display:block!important}.hero-copy{padding:130px 7% 80px}.split{grid-template-columns:1fr;padding:80px 7%;gap:35px}.split img{height:360px}.cards,.visual-services,.pricing,.culture-cards{grid-template-columns:1fr}.portfolio{grid-template-columns:1fr 1fr}.gallery{grid-template-columns:1fr 1fr;grid-auto-rows:220px}.gallery img:first-child{grid-row:auto}.visual-pricing>div,.form-grid,.pay-options{grid-template-columns:1fr}.portfolio-title{display:block}.why-grid{grid-template-columns:1fr}.promo-grid{grid-template-columns:1fr 1fr}section{padding:80px 7%}footer{grid-template-columns:1fr}footer>div:nth-child(2){justify-content:flex-start}footer small{grid-column:auto}}
      `}</style>
    </div>
  );
}
