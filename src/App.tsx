import { useEffect, useState, type FormEvent } from "react";

/*
  ============================================================
  GALAXY FIRE STUDIOS
  FULL APP.TSX REPLACEMENT
  ============================================================
*/

/* ============================================================
   ORIGINAL STUDIO IMAGES
   ============================================================ */

import studioDesk from "./imports/3fdd97c2-2891-4094-9214-196df630473f.JPG";
import studioMicClose from "./imports/9b6f958a-50ea-406b-b280-731a77251cd2.JPG";
import studioMic from "./imports/2dad0e2f-97cd-4bc5-8a40-6d2ca428cee7.JPG";
import studioMpc from "./imports/5f761b8a-db00-4f37-be3f-8a9cf9ced4ba.JPG";
import studioSpeaker from "./imports/7aa7a4d2-c05f-4d17-ace1-204719c82c51.JPG";

import promoStudioTimeImg from "./imports/IMG_3312.PNG";
import promoBeatsImg from "./imports/IMG_3365.PNG";
import promoSuperstarsImg from "./imports/IMG_3360.PNG";
import promoMixMasterImg from "./imports/IMG_3359.PNG";

/* ============================================================
   NEW 27 VISUAL IMAGES (ALL LOWERCASE)
   ============================================================ */

import image01 from "./imports/image_1.jpg";
import image02 from "./imports/image_2.jpg";
import image03 from "./imports/image_3.jpg";
import image04 from "./imports/image_4.jpg";
import image05 from "./imports/image_5.jpg";
import image06 from "./imports/image_6.jpg";
import image07 from "./imports/image_7.jpg";
import image08 from "./imports/image_8.jpg";
import image09 from "./imports/image_9.jpg";
import image10 from "./imports/image_10.jpg";
import image11 from "./imports/image_11.jpg";
import image12 from "./imports/image_12.jpg";
import image13 from "./imports/image_13.jpg";
import image14 from "./imports/image_14.jpg";
import image15 from "./imports/image_15.jpg";
import image16 from "./imports/image_16.jpg";
import image17 from "./imports/image_17.jpg";
import image18 from "./imports/image_18.jpg";
import image19 from "./imports/image_19.jpg";
import image20 from "./imports/image_20.jpg";
import image21 from "./imports/image_21.jpg";
import image22 from "./imports/image_22.jpg";
import image23 from "./imports/image_23.jpg";
import image24 from "./imports/image_24.jpg";
import image25 from "./imports/image_25.jpg";
import image26 from "./imports/image_26.jpg";
import image27 from "./imports/image_27.jpg";

/* ============================================================
   NEW VISUAL IMAGE COLLECTION
   ============================================================ */

const visualImages = [
  image01,
  image02,
  image03,
  image04,
  image05,
  image06,
  image07,
  image08,
  image09,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
  image16,
  image17,
  image18,
  image19,
  image20,
  image21,
  image22,
  image23,
  image24,
  image25,
  image26,
  image27,
];

/* ============================================================
   PRICING
   ============================================================ */

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

/* ============================================================
   STUDIO SERVICES
   ============================================================ */

const studioServices = [
  [
    "01",
    "RECORDING",
    "Professional recording sessions engineered to capture your performance with clarity, character and impact.",
  ],
  [
    "02",
    "MUSIC PRODUCTION",
    "Build your record from the first idea with beat production, arrangement, sound selection and creative development.",
  ],
  [
    "03",
    "VOCAL PRODUCTION",
    "Performance direction, harmonies, ad-libs, vocal arrangement and detailed vocal preparation.",
  ],
  [
    "04",
    "MIXING",
    "Turn your recordings into a finished record with balance, depth, punch and clarity.",
  ],
  [
    "05",
    "MASTERING",
    "Give your finished music the final polish it needs before it reaches the world.",
  ],
  [
    "06",
    "RELEASE SUPPORT",
    "Help preparing music for release, including metadata, distribution guidance and release planning.",
  ],
];

/* ============================================================
   FORMATTERS
   ============================================================ */

const naira = (value: number) =>
  `₦${Math.round(value).toLocaleString("en-NG")}`;

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
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </span>

          <button type="button" onClick={next} aria-label="Next image">
            →
          </button>
        </div>
      </div>

      <div className="slider-info">
        <div>
          <span className="section-no">{number} / VISUAL PORTFOLIO</span>
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

/* ============================================================
   APP
   ============================================================ */

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

  const selectedService =
    bookingServices.find((service) => service.title === booking.service) ||
    bookingServices[0];

  const amountDue =
    booking.payment === "deposit"
      ? Math.round(selectedService.price * 0.5)
      : selectedService.price;

  /* ============================================================
     BODY SCROLL LOCK
     ============================================================ */

  useEffect(() => {
    if (!bookingOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [bookingOpen]);

  /* ============================================================
     PAYSTACK SCRIPT
     ============================================================ */

  useEffect(() => {
    const scriptUrl = "https://js.paystack.co/v2/inline.js";

    if (document.querySelector(`script[src="${scriptUrl}"]`)) {
      return;
    }

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;

    document.body.appendChild(script);
  }, []);

  /* ============================================================
     BOOKING
     ============================================================ */

  const openBooking = (service?: string) => {
    setBookingSubmitted(false);
    setPaymentError("");
    setPaymentReference("");

    if (service) {
      setBooking((current) => ({
        ...current,
        service,
      }));
    }

    setBookingOpen(true);
  };

  /* ============================================================
     IMAGE GROUPS (27 IMAGES / 3 SLIDERS)
     ============================================================ */

  const visualSetOne = visualImages.slice(0, 9);
  const visualSetTwo = visualImages.slice(9, 18);
  const visualSetThree = visualImages.slice(18, 27);

  /* ============================================================
     RENDER
     ============================================================ */

  return (
    <div className="site">
      {/* NAVIGATION */}
      <header className="nav">
        <a className="brand" href="#home">
          <span className="brand-mark">GF</span>
          <span>
            <strong>GALAXY FIRE</strong>
            <small>STUDIOS · EST. 2020</small>
          </span>
        </a>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          {[
            ["HOME", "home"],
            ["STUDIO", "studio"],
            ["SERVICES", "services"],
            ["VISUALS", "visuals"],
            ["PRICING", "pricing"],
            ["BOOK", "booking"],
            ["FOR THE CULTURE", "culture"],
            ["RADIO", "radio"],
            ["BLOG", "blog"],
            ["BEATS", "beats"],
            ["SHOP", "shop"],
            ["ABOUT", "about"],
            ["CONTACT", "contact"],
          ].map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>

        <a className="nav-cta" href="#booking">
          BOOK A SESSION
        </a>

        <button
          className="menu"
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Open menu"
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </header>

      <main>
        {/* HERO */}
        <section className="hero" id="home">
          <img src={studioDesk} alt="Galaxy Fire Studios control room" />
          <div className="shade" />
          <div className="hero-copy">
            <span className="eyebrow">
              PROFESSIONAL RECORDING STUDIO · NIGERIA
            </span>
            <h1>
              YOUR SOUND.
              <br />
              <span>YOUR FIRE.</span>
            </h1>
            <p>
              A professional recording and production studio built for artists
              who take their music seriously.
            </p>
            <div className="actions">
              <a className="btn red" href="#booking">
                BOOK A SESSION
              </a>
              <a className="btn ghost" href="#studio">
                EXPLORE THE STUDIO
              </a>
            </div>
            <small className="est">EST. 2020</small>
          </div>
        </section>

        {/* STUDIO */}
        <section className="split" id="studio">
          <div>
            <span className="section-no">01 / THE STUDIO</span>
            <h2>
              ONE ROOM.
              <br />
              <span>BUILT FOR CREATION.</span>
            </h2>
            <p>
              Galaxy Fire Studios is a professional recording and production
              environment created for artists, producers and creators who want
              more from their music.
            </p>
            <div className="stats">
              <b>
                2020 <small>ESTABLISHED</small>
              </b>
              <b>
                01 <small>STUDIO ROOM</small>
              </b>
              <b>
                ∞ <small>POSSIBILITIES</small>
              </b>
            </div>
          </div>
          <img src={studioDesk} alt="Studio desk and monitors" />
        </section>

        {/* SERVICES */}
        <section id="services">
          <div className="heading">
            <span className="section-no">03 / SERVICES</span>
            <h2>
              WHAT <br />
              <span>WE DO.</span>
            </h2>
          </div>
          <div className="cards">
            {studioServices.map(([number, title, text]) => (
              <article className="card" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <button type="button" onClick={() => openBooking()}>
                  GET STARTED →
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* VISUALS SECTION */}
        <section id="visuals" className="visual-section">
          <div className="heading">
            <span className="section-no">
              04 / PHOTOGRAPHY & VIDEOGRAPHY
            </span>
            <h2>
              MAKE IT <br />
              <span>VISIBLE.</span>
            </h2>
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

        {/* GALLERY */}
        <section id="gallery">
          <div className="heading">
            <span className="section-no">06 / STUDIO GALLERY</span>
            <h2>
              INSIDE <br />
              <span>THE FIRE.</span>
            </h2>
          </div>
          <div className="gallery">
            <img src={studioDesk} alt="Galaxy Fire studio control room" />
            <img src={studioMicClose} alt="Galaxy Fire recording mic" />
            <img src={studioMpc} alt="MPC production setup" />
            <img src={studioSpeaker} alt="Studio monitor speaker" />
            <img src={studioMic} alt="Recording mic setup" />
            <img src={promoStudioTimeImg} alt="Studio promo" />
            <img src={promoBeatsImg} alt="Beats promo" />
            <img src={promoSuperstarsImg} alt="Artist promo" />
            <img src={promoMixMasterImg} alt="Mixing promo" />
          </div>
        </section>
      </main>
    </div>
  );
}
