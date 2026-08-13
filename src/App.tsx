import { useState } from "react";

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
            <a href="#booking" className="price-button">BOOK THE FIRE SESSION →</a>
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
            <a href="#booking" className="price-button">BOOK →</a>
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
            <a href="#booking" className="price-button">START A MIX →</a>
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
            <a href="#booking" className="price-button">MASTER MY SONG →</a>
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
            <a href="#booking" className="price-button">COMPLETE MY SONG →</a>
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
            <a href="#booking" className="price-button">START CREATING →</a>
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


      {/* PROMO / SOCIAL */}
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
          <p>Book your next recording, production, mixing or mastering session with Galaxy Fire Studios.</p>
          <div className="booking-buttons">
            <a href="https://wa.me/2348035345977" className="button red">BOOK VIA WHATSAPP</a>
            <a href="mailto:galaxyfirestudios@gmail.com" className="button outline">SEND AN EMAIL</a>
          </div>
          <div className="contact-details">
            <div><span>EMAIL</span>galaxyfirestudios@gmail.com</div>
            <div><span>PHONE / WHATSAPP</span>+234 803 534 5977</div>
          </div>
        </div>
      </section>


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
          .footer-bottom { flex-direction: column; gap: 12px; }
        }
      `}</style>
    </div>
  );
}
