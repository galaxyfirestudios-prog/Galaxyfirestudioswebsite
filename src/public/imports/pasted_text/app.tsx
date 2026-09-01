import React, { useState } from "react";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const services = [
    {
      number: "01",
      title: "RECORDING",
      text: "Professional recording sessions engineered to capture your performance with clarity, character and impact."
    },
    {
      number: "02",
      title: "MUSIC PRODUCTION",
      text: "Build your record from the first idea. Beat production, arrangement, sound selection and creative development."
    },
    {
      number: "03",
      title: "VOCAL PRODUCTION",
      text: "Performance direction, harmonies, ad-libs, vocal arrangement and detailed vocal preparation."
    },
    {
      number: "04",
      title: "MIXING",
      text: "Turn your recordings into a finished record with balance, depth, punch and clarity."
    },
    {
      number: "05",
      title: "MASTERING",
      text: "Give your finished music the final polish it needs before it reaches the world."
    },
    {
      number: "06",
      title: "RELEASE SUPPORT",
      text: "Get help preparing your music for release, including metadata, distribution guidance and release planning."
    }
  ];

  const gallery = [
    {
      src: "studio-wide.jpg",
      title: "THE CONTROL ROOM"
    },
    {
      src: "microphone.jpg",
      title: "THE VOCAL BOOTH"
    },
    {
      src: "mpc.jpg",
      title: "PRODUCTION"
    },
    {
      src: "studio-desk.jpg",
      title: "THE SETUP"
    }
  ];

  return (
    <div className="site">

      {/* NAVIGATION */}
      <header className="nav">
        <div className="logo">
          <div className="logo-mark">GF</div>
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

        <a className="nav-button" href="#booking">
          BOOK A SESSION
        </a>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </header>


      {/* HERO */}
      <section className="hero">

        <div className="hero-image"></div>

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <div className="eyebrow">
            PROFESSIONAL RECORDING STUDIO · NIGERIA
          </div>

          <h1>
            YOUR SOUND.
            <br />
            <span>YOUR FIRE.</span>
          </h1>

          <p>
            A professional recording and production studio built
            for artists who take their music seriously.
          </p>

          <div className="hero-buttons">
            <a href="#booking" className="button red">
              BOOK A SESSION
            </a>

            <a href="#studio" className="button outline">
              EXPLORE THE STUDIO
            </a>
          </div>

          <div className="hero-est">
            EST. 2020
          </div>

        </div>

        <div className="scroll">
          SCROLL TO EXPLORE
          <span>↓</span>
        </div>

      </section>


      {/* INTRO */}
      <section className="intro" id="studio">

        <div className="intro-text">

          <div className="section-number">01 / THE STUDIO</div>

          <h2>
            ONE ROOM.
            <br />
            <span>BUILT FOR CREATION.</span>
          </h2>

          <p>
            Galaxy Fire Studios is a professional recording and
            production environment created for artists, producers
            and creators who want more from their music.
          </p>

          <p>
            From the first vocal take to the final master, we give
            you the space, tools and expertise to bring your vision
            to life.
          </p>

          <div className="stats">
            <div>
              <strong>2020</strong>
              <span>ESTABLISHED</span>
            </div>

            <div>
              <strong>01</strong>
              <span>STUDIO ROOM</span>
            </div>

            <div>
              <strong>∞</strong>
              <span>POSSIBILITIES</span>
            </div>
          </div>

        </div>

        <div className="intro-image">
          <div className="image-placeholder">
            <span>GALAXY FIRE STUDIOS</span>
            <small>CONTROL ROOM</small>
          </div>
        </div>

      </section>


      {/* STUDIO EXPERIENCE */}
      <section className="experience">

        <div className="experience-image">
          <div className="image-placeholder">
            <span>CREATE</span>
          </div>
        </div>

        <div className="experience-content">

          <div className="section-number">02 / THE EXPERIENCE</div>

          <h2>
            WALK IN WITH
            <br />
            <span>AN IDEA.</span>
          </h2>

          <h3>WALK OUT WITH A RECORD.</h3>

          <p>
            Galaxy Fire is designed to keep you focused on what
            matters — making great music.
          </p>

          <div className="steps">

            <div className="step">
              <span>01</span>
              <div>
                <strong>BOOK</strong>
                <p>Choose your service and session.</p>
              </div>
            </div>

            <div className="step">
              <span>02</span>
              <div>
                <strong>CREATE</strong>
                <p>Come into the studio and make the record.</p>
              </div>
            </div>

            <div className="step">
              <span>03</span>
              <div>
                <strong>REFINE</strong>
                <p>Record, produce, mix and shape the sound.</p>
              </div>
            </div>

            <div className="step">
              <span>04</span>
              <div>
                <strong>RELEASE</strong>
                <p>Leave with music ready for the world.</p>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* SERVICES */}
      <section className="services" id="services">

        <div className="section-heading">

          <div className="section-number">03 / SERVICES</div>

          <h2>
            WHAT
            <br />
            <span>WE DO.</span>
          </h2>

          <p>
            Everything you need to take an idea from the first
            recording to a finished release.
          </p>

        </div>

        <div className="service-grid">

          {services.map((service) => (
            <div className="service-card" key={service.number}>

              <div className="service-number">
                {service.number}
              </div>

              <h3>{service.title}</h3>

              <p>{service.text}</p>

              <a href="#booking">
                GET STARTED →
              </a>

            </div>
          ))}

        </div>

      </section>


      {/* FEATURE IMAGE */}
      <section className="feature">

        <div className="feature-image">
          <div className="feature-overlay"></div>

          <div className="feature-content">
            <div className="eyebrow">THE GALAXY FIRE STANDARD</div>

            <h2>
              GREAT MUSIC
              <br />
              <span>STARTS HERE.</span>
            </h2>

            <a href="#booking" className="button red">
              BOOK YOUR SESSION
            </a>
          </div>

        </div>

      </section>


      {/* PRICING */}
      <section className="pricing" id="pricing">

        <div className="section-heading center">

          <div className="section-number">04 / PRICING</div>

          <h2>
            STUDIO
            <br />
            <span>RATES.</span>
          </h2>

          <p>
            Professional services. Straightforward pricing.
            No unnecessary complications.
          </p>

        </div>


        <div className="pricing-grid">

          <div className="price-card featured">

            <div className="popular">MOST POPULAR</div>

            <div className="price-category">
              RECORDING
            </div>

            <h3>THE FIRE SESSION</h3>

            <div className="price">
              ₦130,000
            </div>

            <div className="price-detail">
              6 HOURS · ENGINEER INCLUDED
            </div>

            <ul>
              <li>Studio access</li>
              <li>Recording engineer</li>
              <li>Vocal recording</li>
              <li>Basic vocal editing</li>
              <li>Professional monitoring</li>
              <li>Session files</li>
            </ul>

            <a href="#booking" className="price-button">
              BOOK THE FIRE SESSION →
            </a>

          </div>


          <div className="price-card">

            <div className="price-category">
              RECORDING
            </div>

            <h3>STUDIO HOUR</h3>

            <div className="price">
              ₦25,000
            </div>

            <div className="price-detail">
              PER HOUR · ENGINEER INCLUDED
            </div>

            <ul>
              <li>Studio access</li>
              <li>Recording engineer</li>
              <li>Professional recording setup</li>
              <li>Session files</li>
            </ul>

            <a href="#booking" className="price-button">
              BOOK →
            </a>

          </div>


          <div className="price-card">

            <div className="price-category">
              MIXING
            </div>

            <h3>PROFESSIONAL MIX</h3>

            <div className="price">
              ₦75,000
            </div>

            <div className="price-detail">
              PER SONG
            </div>

            <ul>
              <li>Full song mix</li>
              <li>Vocal processing</li>
              <li>EQ & compression</li>
              <li>Effects</li>
              <li>2 revisions</li>
            </ul>

            <a href="#booking" className="price-button">
              START A MIX →
            </a>

          </div>


          <div className="price-card">

            <div className="price-category">
              MASTERING
            </div>

            <h3>MASTERING</h3>

            <div className="price">
              ₦35,000
            </div>

            <div className="price-detail">
              PER SONG
            </div>

            <ul>
              <li>Professional mastering</li>
              <li>Streaming-ready master</li>
              <li>WAV delivery</li>
              <li>MP3 reference</li>
            </ul>

            <a href="#booking" className="price-button">
              MASTER MY SONG →
            </a>

          </div>


          <div className="price-card">

            <div className="price-category">
              COMPLETE
            </div>

            <h3>MIX + MASTER</h3>

            <div className="price">
              ₦100,000
            </div>

            <div className="price-detail">
              PER SONG
            </div>

            <ul>
              <li>Professional mix</li>
              <li>Vocal processing</li>
              <li>2 mix revisions</li>
              <li>Final master</li>
              <li>WAV + MP3</li>
            </ul>

            <a href="#booking" className="price-button">
              COMPLETE MY SONG →
            </a>

          </div>


          <div className="price-card">

            <div className="price-category">
              PRODUCTION
            </div>

            <h3>PRODUCTION SESSION</h3>

            <div className="price">
              ₦30,000
            </div>

            <div className="price-detail">
              PER HOUR
            </div>

            <ul>
              <li>Beat production</li>
              <li>Arrangement</li>
              <li>Sound selection</li>
              <li>MIDI production</li>
              <li>Creative direction</li>
            </ul>

            <a href="#booking" className="price-button">
              START CREATING →
            </a>

          </div>

        </div>

      </section>


      {/* GALLERY */}
      <section className="gallery" id="gallery">

        <div className="section-heading">

          <div className="section-number">05 / GALLERY</div>

          <h2>
            INSIDE
            <br />
            <span>THE FIRE.</span>
          </h2>

        </div>

        <div className="gallery-grid">

          <div className="gallery-large">
            <div className="gallery-placeholder">
              CONTROL ROOM
            </div>
          </div>

          <div>
            <div className="gallery-placeholder small">
              VOCAL BOOTH
            </div>

            <div className="gallery-placeholder small">
              PRODUCTION
            </div>
          </div>

        </div>

      </section>


      {/* WHY GALAXY FIRE */}
      <section className="why">

        <div className="why-content">

          <div className="section-number">06 / THE STANDARD</div>

          <h2>
            YOUR MUSIC.
            <br />
            <span>OUR CRAFT.</span>
          </h2>

          <div className="why-grid">

            <div>
              <strong>01</strong>
              <h3>PROFESSIONAL</h3>
              <p>
                A serious environment for serious music.
              </p>
            </div>

            <div>
              <strong>02</strong>
              <h3>CREATIVE</h3>
              <p>
                A space designed to keep artists focused on creating.
              </p>
            </div>

            <div>
              <strong>03</strong>
              <h3>PERSONAL</h3>
              <p>
                Your record isn't treated like just another session.
              </p>
            </div>

            <div>
              <strong>04</strong>
              <h3>QUALITY</h3>
              <p>
                Every detail matters from recording to final master.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* BOOKING */}
      <section className="booking" id="booking">

        <div className="booking-image"></div>

        <div className="booking-overlay"></div>

        <div className="booking-content">

          <div className="eyebrow">
            GALAXY FIRE STUDIOS · EST. 2020
          </div>

          <h2>
            READY TO
            <br />
            <span>MAKE SOME FIRE?</span>
          </h2>

          <p>
            Book your next recording, production, mixing
            or mastering session with Galaxy Fire Studios.
          </p>

          <div className="booking-buttons">

            <a
              href="https://wa.me/2348035345977"
              className="button red"
            >
              BOOK VIA WHATSAPP
            </a>

            <a
              href="mailto:galaxyfirestudios@gmail.com"
              className="button outline"
            >
              SEND AN EMAIL
            </a>

          </div>

          <div className="contact-details">

            <div>
              <span>EMAIL</span>
              galaxyfirestudios@gmail.com
            </div>

            <div>
              <span>PHONE / WHATSAPP</span>
              +234 803 534 5977
            </div>

          </div>

        </div>

      </section>


      {/* FOOTER */}
      <footer id="contact">

        <div className="footer-top">

          <div className="footer-brand">

            <div className="logo">
              <div className="logo-mark">GF</div>

              <div>
                <div className="logo-title">GALAXY FIRE</div>
                <div className="logo-sub">
                  STUDIOS · EST. 2020
                </div>
              </div>
            </div>

            <p>
              Record. Create. Ignite.
            </p>

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
              <a href="mailto:galaxyfirestudios@gmail.com">
                Email Us
              </a>
              <a href="https://wa.me/2348035345977">
                WhatsApp
              </a>
            </div>

          </div>

        </div>


        <div className="footer-bottom">

          <span>
            © 2026 GALAXY FIRE STUDIOS
          </span>

          <span>
            EST. 2020 · NIGERIA
          </span>

        </div>

      </footer>


      {/* STYLES */}
      <style>{`

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: #080808;
          color: white;
        }

        .site {
          background: #080808;
          overflow: hidden;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 82px;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5%;
          background: rgba(5,5,5,.88);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255,255,255,.08);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-mark {
          width: 42px;
          height: 42px;
          border: 2px solid #e50914;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          color: #e50914;
        }

        .logo-title {
          font-size: 14px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .logo-sub {
          margin-top: 4px;
          font-size: 8px;
          letter-spacing: 2px;
          color: #999;
        }

        .nav-links {
          display: flex;
          gap: 34px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        .nav-links a {
          transition: color .2s;
        }

        .nav-links a:hover {
          color: #e50914;
        }

        .nav-button {
          padding: 14px 22px;
          background: #e50914;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .menu-button {
          display: none;
          background: none;
          color: white;
          border: none;
          font-size: 24px;
        }

        .hero {
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
        }

        .hero-image {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(0,0,0,.9), rgba(0,0,0,.4)),
            url("studio-wide.jpg");
          background-size: cover;
          background-position: center;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 70% 50%, rgba(180,0,0,.2), transparent 40%);
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          padding: 150px 8% 100px;
        }

        .eyebrow,
        .section-number {
          color: #e50914;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 3px;
        }

        h1 {
          font-size: clamp(60px, 9vw, 130px);
          line-height: .88;
          margin: 25px 0;
          font-weight: 900;
          letter-spacing: -5px;
        }

        h1 span,
        h2 span {
          color: #e50914;
        }

        .hero-content p {
          max-width: 540px;
          color: #ccc;
          font-size: 18px;
          line-height: 1.6;
        }

        .hero-buttons,
        .booking-buttons {
          display: flex;
          gap: 14px;
          margin-top: 35px;
        }

        .button {
          padding: 17px 25px;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 1.5px;
        }

        .button.red {
          background: #e50914;
        }

        .button.outline {
          border: 1px solid rgba(255,255,255,.5);
        }

        .hero-est {
          margin-top: 80px;
          font-size: 11px;
          letter-spacing: 4px;
          color: #aaa;
        }

        .scroll {
          position: absolute;
          bottom: 30px;
          right: 6%;
          display: flex;
          align-items: center;
          gap: 15px;
          font-size: 9px;
          letter-spacing: 2px;
          color: #aaa;
        }

        .scroll span {
          color: #e50914;
          font-size: 22px;
        }

        section {
          padding: 130px 7%;
        }

        .intro {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          background: #0b0b0b;
        }

        h2 {
          font-size: clamp(50px, 7vw, 100px);
          line-height: .9;
          letter-spacing: -4px;
          margin: 25px 0;
          font-weight: 900;
        }

        .intro-text p,
        .experience-content > p {
          max-width: 560px;
          color: #aaa;
          line-height: 1.8;
          font-size: 16px;
        }

        .intro-image,
        .experience-image {
          min-height: 600px;
        }

        .image-placeholder {
          height: 100%;
          min-height: 600px;
          background:
            linear-gradient(135deg, #351010, #100707);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,.1);
          color: rgba(255,255,255,.3);
          font-size: 22px;
          font-weight: 900;
          letter-spacing: 5px;
        }

        .image-placeholder small {
          margin-top: 10px;
          font-size: 10px;
          letter-spacing: 3px;
        }

        .stats {
          display: flex;
          gap: 50px;
          margin-top: 50px;
        }

        .stats div {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .stats strong {
          color: #e50914;
          font-size: 32px;
        }

        .stats span {
          font-size: 9px;
          color: #777;
          letter-spacing: 2px;
        }

        .experience {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          background: #0e0e0e;
        }

        .experience-content h3 {
          font-size: 22px;
          letter-spacing: 1px;
          margin-top: -5px;
        }

        .steps {
          margin-top: 45px;
        }

        .step {
          display: flex;
          gap: 25px;
          padding: 22px 0;
          border-top: 1px solid #252525;
        }

        .step > span {
          color: #e50914;
          font-weight: 900;
        }

        .step strong {
          font-size: 13px;
          letter-spacing: 2px;
        }

        .step p {
          margin: 7px 0 0;
          color: #777;
          font-size: 13px;
        }

        .services {
          background: #080808;
        }

        .section-heading {
          max-width: 650px;
          margin-bottom: 70px;
        }

        .section-heading.center {
          margin-left: auto;
          margin-right: auto;
          text-align: center;
        }

        .section-heading p {
          color: #888;
          line-height: 1.7;
        }

        .service-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid #292929;
          border-left: 1px solid #292929;
        }

        .service-card {
          min-height: 340px;
          padding: 40px;
          border-right: 1px solid #292929;
          border-bottom: 1px solid #292929;
          transition: .3s;
        }

        .service-card:hover {
          background: #151515;
        }

        .service-number {
          color: #e50914;
          font-size: 12px;
          font-weight: 900;
        }

        .service-card h3 {
          margin-top: 80px;
          font-size: 20px;
          letter-spacing: 1px;
        }

        .service-card p {
          color: #888;
          line-height: 1.7;
          font-size: 13px;
        }

        .service-card a {
          display: inline-block;
          margin-top: 20px;
          color: #e50914;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .feature {
          padding: 0;
        }

        .feature-image {
          min-height: 700px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.85)),
            linear-gradient(135deg, #350808, #080808);
          background-size: cover;
          background-position: center;
        }

        .feature-content {
          position: relative;
          text-align: center;
        }

        .feature-content h2 {
          font-size: clamp(55px, 8vw, 115px);
        }

        .pricing {
          background: #0b0b0b;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          max-width: 1250px;
          margin: auto;
        }

        .price-card {
          position: relative;
          background: #111;
          border: 1px solid #272727;
          padding: 40px;
        }

        .price-card.featured {
          border-color: #e50914;
        }

        .popular {
          position: absolute;
          top: 0;
          right: 0;
          padding: 8px 12px;
          background: #e50914;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .price-category {
          color: #e50914;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .price-card h3 {
          margin-top: 30px;
          font-size: 20px;
        }

        .price {
          font-size: 42px;
          font-weight: 900;
          margin: 25px 0 8px;
        }

        .price-detail {
          color: #666;
          font-size: 9px;
          letter-spacing: 2px;
        }

        .price-card ul {
          padding: 25px 0;
          margin: 0;
          list-style: none;
          border-top: 1px solid #282828;
          border-bottom: 1px solid #282828;
          margin-top: 30px;
        }

        .price-card li {
          padding: 8px 0;
          color: #aaa;
          font-size: 12px;
        }

        .price-card li::before {
          content: "✓";
          color: #e50914;
          margin-right: 10px;
        }

        .price-button {
          display: block;
          margin-top: 25px;
          padding: 15px;
          text-align: center;
          border: 1px solid #444;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .gallery {
          background: #080808;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 15px;
        }

        .gallery-placeholder {
          min-height: 650px;
          display: flex;
          align-items: flex-end;
          padding: 30px;
          background:
            linear-gradient(135deg, #2c0808, #080808);
          border: 1px solid #252525;
          color: rgba(255,255,255,.4);
          font-weight: 900;
          letter-spacing: 2px;
        }

        .gallery-placeholder.small {
          min-height: 317px;
          margin-bottom: 15px;
        }

        .why {
          background: #111;
        }

        .why-content {
          max-width: 1200px;
          margin: auto;
        }

        .why-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 35px;
          margin-top: 80px;
        }

        .why-grid strong {
          color: #e50914;
          font-size: 13px;
        }

        .why-grid h3 {
          font-size: 15px;
          letter-spacing: 1px;
          margin-top: 35px;
        }

        .why-grid p {
          color: #777;
          font-size: 13px;
          line-height: 1.6;
        }

        .booking {
          min-height: 750px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .booking-image {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(0,0,0,.65), rgba(0,0,0,.9)),
            linear-gradient(135deg, #300808, #080808);
        }

        .booking-content {
          position: relative;
          max-width: 900px;
        }

        .booking-content h2 {
          font-size: clamp(55px, 8vw, 110px);
        }

        .booking-content p {
          max-width: 550px;
          margin: auto;
          color: #aaa;
          line-height: 1.7;
        }

        .booking-buttons {
          justify-content: center;
        }

        .contact-details {
          display: flex;
          justify-content: center;
          gap: 70px;
          margin-top: 80px;
        }

        .contact-details div {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 13px;
        }

        .contact-details span {
          color: #e50914;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        footer {
          padding: 80px 7% 30px;
          background: #050505;
        }

        .footer-top {
          display: flex;
          justify-content: space-between;
          padding-bottom: 70px;
        }

        .footer-brand p {
          color: #777;
          margin-top: 25px;
        }

        .footer-links {
          display: flex;
          gap: 100px;
        }

        .footer-links div {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .footer-links span {
          color: #e50914;
          font-size: 9px;
          letter-spacing: 2px;
          margin-bottom: 8px;
        }

        .footer-links a {
          color: #888;
          font-size: 12px;
        }

        .footer-bottom {
          border-top: 1px solid #222;
          padding-top: 25px;
          display: flex;
          justify-content: space-between;
          color: #555;
          font-size: 9px;
          letter-spacing: 1px;
        }

        @media (max-width: 900px) {

          .nav-links {
            display: none;
            position: absolute;
            top: 82px;
            left: 0;
            right: 0;
            background: #080808;
            padding: 30px;
            flex-direction: column;
          }

          .nav-links.open {
            display: flex;
          }

          .nav-button {
            display: none;
          }

          .menu-button {
            display: block;
          }

          .intro,
          .experience {
            grid-template-columns: 1fr;
          }

          .service-grid,
          .pricing-grid {
            grid-template-columns: 1fr 1fr;
          }

          .why-grid {
            grid-template-columns: 1fr 1fr;
          }

          .gallery-grid {
            grid-template-columns: 1fr;
          }

        }

        @media (max-width: 600px) {

          section {
            padding: 90px 6%;
          }

          .hero-content {
            padding: 140px 6% 80px;
          }

          h1 {
            font-size: 58px;
            letter-spacing: -3px;
          }

          h2 {
            font-size: 52px;
          }

          .hero-buttons,
          .booking-buttons {
            flex-direction: column;
          }

          .button {
            text-align: center;
          }

          .service-grid,
          .pricing-grid,
          .why-grid {
            grid-template-columns: 1fr;
          }

          .stats {
            gap: 25px;
          }

          .contact-details {
            flex-direction: column;
            gap: 25px;
          }

          .footer-top {
            flex-direction: column;
            gap: 50px;
          }

          .footer-links {
            gap: 50px;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 12px;
          }

        }

      `}</style>
    </div>
  );
}