```tsx
import { useEffect, useState, type FormEvent } from "react";

/*
  ============================================================
  GALAXY FIRE STUDIOS
  FULL APP.TSX REPLACEMENT

  OLD STUDIO IMAGES:
  These are the original images currently in src/imports.

  NEW VISUAL IMAGES:
  Image 1.jpg through Image 27.jpg
  These are used ONLY in the new Photography/Videography
  visual portfolio area.
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
   NEW 27 VISUAL IMAGES
   ============================================================ */

import image01 from "./imports/Image 1.jpg";
import image02 from "./imports/Image 2.jpg";
import image03 from "./imports/Image 3.jpg";
import image04 from "./imports/Image 4.jpg";
import image05 from "./imports/Image 5.jpg";
import image06 from "./imports/Image 6.jpg";
import image07 from "./imports/Image 7.jpg";
import image08 from "./imports/Image 8.jpg";
import image09 from "./imports/Image 9.jpg";
import image10 from "./imports/Image 10.jpg";
import image11 from "./imports/Image 11.jpg";
import image12 from "./imports/Image 12.jpg";
import image13 from "./imports/Image 13.jpg";
import image14 from "./imports/Image 14.jpg";
import image15 from "./imports/Image 15.jpg";
import image16 from "./imports/Image 16.jpg";
import image17 from "./imports/Image 17.jpg";
import image18 from "./imports/Image 18.jpg";
import image19 from "./imports/Image 19.jpg";
import image20 from "./imports/Image 20.jpg";
import image21 from "./imports/Image 21.jpg";
import image22 from "./imports/Image 22.jpg";
import image23 from "./imports/Image 23.jpg";
import image24 from "./imports/Image 24.jpg";
import image25 from "./imports/Image 25.jpg";
import image26 from "./imports/Image 26.jpg";
import image27 from "./imports/Image 27.jpg";

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
  {
    title: "The Fire Session",
    price: 130000,
    unit: "6 hours",
  },
  {
    title: "Studio Hour",
    price: 25000,
    unit: "per hour",
  },
  {
    title: "Professional Mix",
    price: 75000,
    unit: "per song",
  },
  {
    title: "Mastering",
    price: 35000,
    unit: "per song",
  },
  {
    title: "Mix + Master",
    price: 100000,
    unit: "per song",
  },
  {
    title: "Production Session",
    price: 30000,
    unit: "per hour",
  },
  {
    title: "Artist Photoshoot",
    price: 75000,
    unit: "starting price",
  },
  {
    title: "Cover Art Shoot",
    price: 50000,
    unit: "starting price",
  },
  {
    title: "Event Photography",
    price: 100000,
    unit: "starting price",
  },
  {
    title: "Music Video",
    price: 250000,
    unit: "starting price",
  },
  {
    title: "Performance Video",
    price: 150000,
    unit: "starting price",
  },
  {
    title: "Visualizer",
    price: 100000,
    unit: "starting price",
  },
  {
    title: "Lyric Video",
    price: 75000,
    unit: "starting price",
  },
  {
    title: "Social Content Package",
    price: 100000,
    unit: "starting price",
  },
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

function VisualSlider({
  images,
  title,
  number,
}: VisualSliderProps) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((value) =>
      value === images.length - 1 ? 0 : value + 1
    );
  };

  const previous = () => {
    setCurrent((value) =>
      value === 0 ? images.length - 1 : value - 1
    );
  };

  return (
    <div className="visual-slider">
      <div className="visual-slider-image">
        <img
          src={images[current]}
          alt={`${title} ${current + 1}`}
        />

        <div className="visual-number">
          {number}
        </div>

        <div className="slider-controls">
          <button
            type="button"
            onClick={previous}
            aria-label="Previous image"
          >
            ←
          </button>

          <span>
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </span>

          <button
            type="button"
            onClick={next}
            aria-label="Next image"
          >
            →
          </button>
        </div>
      </div>

      <div className="slider-info">
        <div>
          <span className="section-no">
            {number} / VISUAL PORTFOLIO
          </span>

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
    bookingServices.find(
      (service) => service.title === booking.service
    ) || bookingServices[0];

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

  const closeBooking = () => {
    if (paymentProcessing) return;

    setBookingOpen(false);
    setPaymentError("");
  };

  const updateBooking = (
    field: string,
    value: string
  ) => {
    setBooking((current) => ({
      ...current,
      [field]: value,
    }));
  };

  /* ============================================================
     PAYMENT
     ============================================================ */

  const submitBooking = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setPaymentError("");
    setPaymentProcessing(true);

    const referenceId =
      `GFS-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)
        .toUpperCase()}`;

    const publicKey =
      import.meta.env.VITE_PAYSTACK_PUBLIC_KEY ||
      "pk_test_f350611c4c768b941d8725e73b122d3d37c9e5d7";

    const startPaystack = () => {
      const PaystackPop = (
        window as any
      ).PaystackPop;

      if (!PaystackPop) {
        setPaymentProcessing(false);
        setPaymentError(
          "Paystack could not load. Please refresh the page and try again."
        );
        return;
      }

      const paystack = new PaystackPop();

      paystack.newTransaction({
        key: publicKey,
        email: booking.email,
        amount: amountDue * 100,
        currency: "NGN",
        reference: referenceId,

        firstName:
          booking.name.trim().split(/\s+/)[0],

        phone: booking.phone,

        metadata: {
          custom_fields: [
            {
              display_name: "Service",
              variable_name: "service",
              value: booking.service,
            },
            {
              display_name: "Booking Date",
              variable_name: "booking_date",
              value: booking.date,
            },
            {
              display_name: "Preferred Time",
              variable_name: "preferred_time",
              value: booking.time,
            },
            {
              display_name: "Payment Type",
              variable_name: "payment_type",
              value:
                booking.payment === "deposit"
                  ? "50% deposit"
                  : "Full payment",
            },
            {
              display_name: "Notes",
              variable_name: "notes",
              value: booking.notes || "None",
            },
          ],
        },

        onSuccess: async (
          transaction: { reference: string }
        ) => {
          try {
            const response = await fetch(
              "/api/verify-payment",
              {
                method: "POST",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify({
                  reference:
                    transaction.reference,
                  expectedAmount:
                    amountDue * 100,
                  booking,
                }),
              }
            );

            const result =
              await response.json();

            if (
              !response.ok ||
              !result.verified
            ) {
              throw new Error(
                result.message ||
                  "Payment verification failed."
              );
            }

            setPaymentReference(
              transaction.reference
            );

            setBookingSubmitted(true);
          } catch (error) {
            console.error(error);

            setPaymentError(
              `Payment was completed, but verification failed. Please contact us with reference ${transaction.reference}.`
            );
          } finally {
            setPaymentProcessing(false);
          }
        },

        onCancel: () => {
          setPaymentProcessing(false);
        },
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
        setPaymentProcessing(false);
        setPaymentError(
          "Paystack could not load. Please refresh the page and try again."
        );
      }
    }, 8000);
  };

  /* ============================================================
     NEW IMAGE GROUPS
     27 IMAGES / 3 SIMPLE SLIDERS
     ============================================================ */

  const visualSetOne = visualImages.slice(0, 9);
  const visualSetTwo = visualImages.slice(9, 18);
  const visualSetThree = visualImages.slice(18, 27);

  /* ============================================================
     RENDER
     ============================================================ */

  return (
    <div className="site">

      {/* ======================================================
          NAVIGATION
          ====================================================== */}

      <header className="nav">
        <a className="brand" href="#home">
          <span className="brand-mark">
            GF
          </span>

          <span>
            <strong>GALAXY FIRE</strong>
            <small>
              STUDIOS · EST. 2020
            </small>
          </span>
        </a>

        <nav
          className={
            menuOpen
              ? "nav-links open"
              : "nav-links"
          }
        >
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
            <a
              key={id}
              href={`#${id}`}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          className="nav-cta"
          href="#booking"
        >
          BOOK A SESSION
        </a>

        <button
          className="menu"
          type="button"
          onClick={() =>
            setMenuOpen((value) => !value)
          }
          aria-label="Open menu"
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </header>

      <main>

        {/* ====================================================
            HERO
            ==================================================== */}

        <section
          className="hero"
          id="home"
        >
          <img
            src={studioDesk}
            alt="Galaxy Fire Studios control room"
          />

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
              A professional recording and production
              studio built for artists who take their
              music seriously.
            </p>

            <div className="actions">
              <a
                className="btn red"
                href="#booking"
              >
                BOOK A SESSION
              </a>

              <a
                className="btn ghost"
                href="#studio"
              >
                EXPLORE THE STUDIO
              </a>
            </div>

            <small className="est">
              EST. 2020
            </small>
          </div>
        </section>

        {/* ====================================================
            STUDIO
            ==================================================== */}

        <section
          className="split"
          id="studio"
        >
          <div>
            <span className="section-no">
              01 / THE STUDIO
            </span>

            <h2>
              ONE ROOM.
              <br />
              <span>BUILT FOR CREATION.</span>
            </h2>

            <p>
              Galaxy Fire Studios is a professional
              recording and production environment created
              for artists, producers and creators who want
              more from their music.
            </p>

            <p>
              From the first vocal take to the final master,
              we give you the space, tools and expertise to
              bring your vision to life.
            </p>

            <div className="stats">
              <b>
                2020
                <small>ESTABLISHED</small>
              </b>

              <b>
                01
                <small>STUDIO ROOM</small>
              </b>

              <b>
                ∞
                <small>POSSIBILITIES</small>
              </b>
            </div>
          </div>

          <img
            src={studioDesk}
            alt="Studio desk and monitors"
          />
        </section>

        {/* ====================================================
            EXPERIENCE
            ==================================================== */}

        <section className="split dark-split">
          <img
            src={studioMic}
            alt="Recording microphone"
          />

          <div>
            <span className="section-no">
              02 / THE EXPERIENCE
            </span>

            <h2>
              WALK IN WITH
              <br />
              <span>AN IDEA.</span>
            </h2>

            <h3>
              WALK OUT WITH A RECORD.
            </h3>

            <p>
              Galaxy Fire is designed to keep you focused
              on what matters — making great music.
            </p>

            <div className="steps">
              {[
                [
                  "01",
                  "BOOK",
                  "Choose your service and session.",
                ],
                [
                  "02",
                  "CREATE",
                  "Come into the studio and make the record.",
                ],
                [
                  "03",
                  "REFINE",
                  "Record, produce, mix and shape the sound.",
                ],
                [
                  "04",
                  "RELEASE",
                  "Leave with music ready for the world.",
                ],
              ].map(([number, title, text]) => (
                <div
                  className="step"
                  key={number}
                >
                  <b>{number}</b>

                  <div>
                    <strong>
                      {title}
                    </strong>

                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================
            SERVICES
            ==================================================== */}

        <section id="services">
          <div className="heading">
            <span className="section-no">
              03 / SERVICES
            </span>

            <h2>
              WHAT
              <br />
              <span>WE DO.</span>
            </h2>

            <p>
              Everything you need to take an idea from
              the first recording to a finished release.
            </p>
          </div>

          <div className="cards">
            {studioServices.map(
              ([number, title, text]) => (
                <article
                  className="card"
                  key={number}
                >
                  <span>{number}</span>

                  <h3>{title}</h3>

                  <p>{text}</p>

                  <button
                    type="button"
                    onClick={() =>
                      openBooking()
                    }
                  >
                    GET STARTED →
                  </button>
                </article>
              )
            )}
          </div>
        </section>

        {/* ====================================================
            STUDIO FEATURE
            ==================================================== */}

        <section className="feature">
          <img
            src={studioSpeaker}
            alt="Galaxy Fire studio monitor"
          />

          <div className="shade" />

          <div className="feature-copy">
            <span className="eyebrow">
              THE GALAXY FIRE STANDARD
            </span>

            <h2>
              GREAT MUSIC
              <br />
              <span>STARTS HERE.</span>
            </h2>

            <a
              className="btn red"
              href="#booking"
            >
              BOOK YOUR SESSION
            </a>
          </div>
        </section>

        {/* ====================================================
            NEW PHOTOGRAPHY + VIDEOGRAPHY SECTION
            ONLY 3 SLIDER GROUPS
            ALL 27 NEW IMAGES ARE HERE
            ==================================================== */}

        <section
          id="visuals"
          className="visual-section"
        >
          <div className="heading">
            <span className="section-no">
              04 / PHOTOGRAPHY & VIDEOGRAPHY
            </span>

            <h2>
              MAKE IT
              <br />
              <span>VISIBLE.</span>
            </h2>

            <p>
              Photography and videography created for
              artists, brands, events and creative projects.
            </p>
          </div>

          {/* VISUAL SLIDER 01 */}
          <VisualSlider
            images={visualSetOne}
            number="01"
            title="PHOTOGRAPHY & CREATIVE VISUALS"
          />

          {/* VISUAL SLIDER 02 */}
          <VisualSlider
            images={visualSetTwo}
            number="02"
            title="ARTIST & PROJECT VISUALS"
          />

          {/* VISUAL SLIDER 03 */}
          <VisualSlider
            images={visualSetThree}
            number="03"
            title="VIDEOGRAPHY & VISUAL STORYTELLING"
          />

          {/* ==================================================
              VISUAL PRICING
              ================================================== */}

          <div className="visual-pricing">
            <div>
              <span>
                Artist Photoshoot
                <b>₦75,000+</b>
              </span>

              <span>
                Cover Art Shoot
                <b>₦50,000+</b>
              </span>

              <span>
                Event Photography
                <b>₦100,000+</b>
              </span>

              <span>
                Music Video
                <b>₦250,000+</b>
              </span>

              <span>
                Performance Video
                <b>₦150,000+</b>
              </span>

              <span>
                Visualizer
                <b>₦100,000+</b>
              </span>

              <span>
                Lyric Video
                <b>₦75,000+</b>
              </span>

              <span>
                Social Content Package
                <b>₦100,000+</b>
              </span>
            </div>
          </div>
        </section>

        {/* ====================================================
            PRICING
            ==================================================== */}

        <section id="pricing">
          <div className="heading center">
            <span className="section-no">
              05 / PRICING
            </span>

            <h2>
              STUDIO
              <br />
              <span>RATES.</span>
            </h2>

            <p>
              Professional services. Straightforward pricing.
            </p>
          </div>

          <div className="pricing">
            {bookingServices.map(
              (service, index) => (
                <article
                  className={
                    index === 0
                      ? "price-card featured"
                      : "price-card"
                  }
                  key={service.title}
                >
                  {index === 0 && (
                    <em>MOST POPULAR</em>
                  )}

                  <span>
                    {service.unit.toUpperCase()}
                  </span>

                  <h3>
                    {service.title}
                  </h3>

                  <strong>
                    {naira(service.price)}
                  </strong>

                  <p>
                    {service.unit} · professional service
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      openBooking(service.title)
                    }
                  >
                    BOOK →
                  </button>
                </article>
              )
            )}
          </div>
        </section>

        {/* ====================================================
            OLD STUDIO GALLERY
            ORIGINAL IMAGES RESTORED
            ==================================================== */}

        <section id="gallery">
          <div className="heading">
            <span className="section-no">
              06 / STUDIO GALLERY
            </span>

            <h2>
              INSIDE
              <br />
              <span>THE FIRE.</span>
            </h2>
          </div>

          <div className="gallery">
            <img
              src={studioDesk}
              alt="Galaxy Fire studio control room"
            />

            <img
              src={studioMicClose}
              alt="Galaxy Fire recording microphone"
            />

            <img
              src={studioMpc}
              alt="MPC production setup"
            />

            <img
              src={studioSpeaker}
              alt="Studio monitor speaker"
            />

            <img
              src={studioMic}
              alt="Recording microphone setup"
            />

            <img
              src={promoStudioTimeImg}
              alt="Galaxy Fire studio promotion"
            />

            <img
              src={promoBeatsImg}
              alt="Galaxy Fire beats promotion"
            />

            <img
              src={promoSuperstarsImg}
              alt="Galaxy Fire artist promotion"
            />

            <img
              src={promoMixMasterImg}
              alt="Galaxy Fire mixing promotion"
            />
          </div>
        </section>

        {/* ====================================================
            FOR THE CULTURE
            ==================================================== */}

        <section
          className="culture"
          id="culture"
        >
          <div className="heading">
            <span className="section-no">
              07 / FOR THE CULTURE
            </span>

            <h2>
              THE SOUND.
              <br />
              <span>
                THE PEOPLE. THE CULTURE.
              </span>
            </h2>

            <p>
              Galaxy Fire Studios is more than a room to
              record in. FOR THE CULTURE is our growing home
              for Abuja music, artists, stories, beats, radio
              and the creative community around us.
            </p>
          </div>

          <div className="cards culture-cards">
            {[
              [
                "01",
                "FOR THE CULTURE RADIO",
                "Hear Abuja talent, guest mixes, premieres and future Galaxy Fire programming.",
                "radio",
              ],
              [
                "02",
                "THE BLOG",
                "Artist profiles, interviews, releases, events, studio stories and creative culture.",
                "blog",
              ],
              [
                "03",
                "BEATS MARKETPLACE",
                "Discover beats by genre, mood, BPM and producer.",
                "beats",
              ],
              [
                "04",
                "GALAXY FIRE SHOP",
                "Studio merchandise, FOR THE CULTURE pieces and branded essentials.",
                "shop",
              ],
            ].map(
              ([number, title, text, link]) => (
                <a
                  className="card"
                  href={`#${link}`}
                  key={number}
                >
                  <span>{number}</span>

                  <h3>{title}</h3>

                  <p>{text}</p>

                  <strong>
                    EXPLORE →
                  </strong>
                </a>
              )
            )}
          </div>
        </section>

        {/* ====================================================
            COMING SOON AREAS
            ==================================================== */}

        {[
          [
            "radio",
            "FOR THE CULTURE RADIO.",
            "The live station is coming. This space will become the home for the FOR THE CULTURE stream, guest mixes and original shows.",
          ],
          [
            "blog",
            "THE STORIES.",
            "Artist interviews, producer spotlights, releases, Abuja creative culture, events and behind-the-scenes stories will live here.",
          ],
          [
            "beats",
            "FIND YOUR SOUND.",
            "The Beats Marketplace will let artists preview beats, explore producers and purchase the right license.",
          ],
          [
            "shop",
            "WEAR THE FIRE.",
            "Galaxy Fire and FOR THE CULTURE merchandise will be available here as the studio ecosystem grows.",
          ],
        ].map(([id, title, text], index) => (
          <section
            className="coming"
            id={id}
            key={id}
          >
            <span className="section-no">
              {String(8 + index).padStart(2, "0")} /{" "}
              {id.toUpperCase()}
            </span>

            <h2>{title}</h2>

            <p>{text}</p>

            <span className="status">
              COMING SOON
            </span>
          </section>
        ))}

        {/* ====================================================
            ABOUT
            ==================================================== */}

        <section
          id="about"
          className="about"
        >
          <span className="section-no">
            12 / ABOUT GALAXY FIRE
          </span>

          <h2>
            BUILT FOR
            <br />
            <span>CREATORS.</span>
          </h2>

          <p>
            Galaxy Fire Studios is a professional recording
            and production environment for artists, producers
            and creators who want to take their music seriously.
          </p>

          <a
            className="btn red"
            href="#booking"
          >
            WORK WITH US →
          </a>
        </section>

        {/* ====================================================
            PROMOTIONAL IMAGES
            ORIGINAL IMAGES RESTORED
            ==================================================== */}

        <section className="promo">
          <div className="heading">
            <span className="section-no">
              13 / THE WORD
            </span>

            <h2>
              SPREAD
              <br />
              <span>THE FIRE.</span>
            </h2>
          </div>

          <div className="promo-grid">
            <img
              src={promoStudioTimeImg}
              alt="Studio time"
            />

            <img
              src={promoBeatsImg}
              alt="Beats and engineering"
            />

            <img
              src={promoSuperstarsImg}
              alt="Bring out the superstar"
            />

            <img
              src={promoMixMasterImg}
              alt="Mix and master"
            />
          </div>
        </section>

        {/* ====================================================
            STANDARD
            ==================================================== */}

        <section className="why">
          <span className="section-no">
            14 / THE STANDARD
          </span>

          <h2>
            YOUR MUSIC.
            <br />
            <span>OUR CRAFT.</span>
          </h2>

          <div className="why-grid">
            {[
              [
                "01",
                "PROFESSIONAL",
                "A serious environment for serious music.",
              ],
              [
                "02",
                "CREATIVE",
                "A space designed to keep artists focused.",
              ],
              [
                "03",
                "PERSONAL",
                "Your record is not treated like just another session.",
              ],
              [
                "04",
                "QUALITY",
                "Every detail matters from recording to final master.",
              ],
            ].map(([number, title, text]) => (
              <div key={number}>
                <b>{number}</b>

                <h3>{title}</h3>

                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ====================================================
            BOOKING
            ==================================================== */}

        <section
          className="booking"
          id="booking"
        >
          <img
            src={studioDesk}
            alt="Galaxy Fire studio"
          />

          <div className="shade" />

          <div className="booking-copy">
            <span className="eyebrow">
              GALAXY FIRE STUDIOS · EST. 2020
            </span>

            <h2>
              READY TO
              <br />
              <span>MAKE SOME FIRE?</span>
            </h2>

            <p>
              Choose your service, preferred session time
              and payment option.
            </p>

            <div className="actions">
              <button
                className="btn red"
                type="button"
                onClick={() =>
                  openBooking()
                }
              >
                BOOK & PAY ONLINE
              </button>

              <a
                className="btn ghost"
                href="https://wa.me/2348035345977"
                target="_blank"
                rel="noreferrer"
              >
                BOOK VIA WHATSAPP
              </a>
            </div>

            <p className="contact">
              galaxyfirestudios@gmail.com
              {" · "}
              +234 803 534 5977
            </p>
          </div>
        </section>
      </main>

      {/* ======================================================
          BOOKING MODAL
          ====================================================== */}

      {bookingOpen && (
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="modal-bg"
            onClick={closeBooking}
          />

          <div className="modal-card">
            <button
              className="close"
              type="button"
              onClick={closeBooking}
              aria-label="Close booking"
            >
              ×
            </button>

            {!bookingSubmitted ? (
              <>
                <span className="section-no">
                  BOOKING / 01
                </span>

                <h2>
                  BOOK YOUR
                  <br />
                  <span>SESSION.</span>
                </h2>

                <form
                  onSubmit={submitBooking}
                >
                  <label>
                    SERVICE

                    <select
                      value={booking.service}
                      onChange={(event) =>
                        updateBooking(
                          "service",
                          event.target.value
                        )
                      }
                    >
                      {bookingServices.map(
                        (service) => (
                          <option
                            key={service.title}
                            value={service.title}
                          >
                            {service.title} —{" "}
                            {naira(service.price)}
                          </option>
                        )
                      )}
                    </select>
                  </label>

                  <div className="form-grid">
                    <label>
                      DATE

                      <input
                        required
                        type="date"
                        min={
                          new Date()
                            .toISOString()
                            .split("T")[0]
                        }
                        value={booking.date}
                        onChange={(event) =>
                          updateBooking(
                            "date",
                            event.target.value
                          )
                        }
                      />
                    </label>

                    <label>
                      TIME

                      <input
                        required
                        type="time"
                        value={booking.time}
                        onChange={(event) =>
                          updateBooking(
                            "time",
                            event.target.value
                          )
                        }
                      />
                    </label>
                  </div>

                  <div className="form-grid">
                    <label>
                      FULL NAME

                      <input
                        required
                        value={booking.name}
                        onChange={(event) =>
                          updateBooking(
                            "name",
                            event.target.value
                          )
                        }
                      />
                    </label>

                    <label>
                      PHONE

                      <input
                        required
                        value={booking.phone}
                        onChange={(event) =>
                          updateBooking(
                            "phone",
                            event.target.value
                          )
                        }
                      />
                    </label>
                  </div>

                  <label>
                    EMAIL

                    <input
                      required
                      type="email"
                      value={booking.email}
                      onChange={(event) =>
                        updateBooking(
                          "email",
                          event.target.value
                        )
                      }
                    />
                  </label>

                  <label>
                    NOTES

                    <textarea
                      rows={3}
                      value={booking.notes}
                      onChange={(event) =>
                        updateBooking(
                          "notes",
                          event.target.value
                        )
                      }
                    />
                  </label>

                  <div className="pay-options">
                    <button
                      type="button"
                      className={
                        booking.payment ===
                        "deposit"
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        updateBooking(
                          "payment",
                          "deposit"
                        )
                      }
                    >
                      50% DEPOSIT
                      <br />
                      <b>
                        {naira(
                          selectedService.price /
                            2
                        )}
                      </b>
                    </button>

                    <button
                      type="button"
                      className={
                        booking.payment === "full"
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        updateBooking(
                          "payment",
                          "full"
                        )
                      }
                    >
                      FULL PAYMENT
                      <br />
                      <b>
                        {naira(
                          selectedService.price
                        )}
                      </b>
                    </button>
                  </div>

                  <div className="due">
                    <span>
                      AMOUNT DUE
                    </span>

                    <strong>
                      {naira(amountDue)}
                    </strong>
                  </div>

                  <button
                    className="btn red submit"
                    type="submit"
                    disabled={
                      paymentProcessing
                    }
                  >
                    {paymentProcessing
                      ? "OPENING PAYSTACK..."
                      : `PAY ${naira(
                          amountDue
                        )} WITH PAYSTACK →`}
                  </button>

                  {paymentError && (
                    <p className="error">
                      {paymentError}
                    </p>
                  )}
                </form>
              </>
            ) : (
              <div className="success">
                <div className="success-mark">
                  ✓
                </div>

                <span className="section-no">
                  PAYMENT VERIFIED
                </span>

                <h2>
                  YOU'RE ON
                  <br />
                  <span>THE LIST.</span>
                </h2>

                <p>
                  Your payment has been received
                  and verified. We will contact you
                  to confirm your session.
                </p>

                <p>
                  <strong>
                    REFERENCE:{" "}
                    {paymentReference}
                  </strong>
                </p>

                <a
                  className="btn red"
                  href={`https://wa.me/2348035345977?text=${encodeURIComponent(
                    `Hi Galaxy Fire Studios, I just paid for ${booking.service}. Reference: ${paymentReference}.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  MESSAGE US ON WHATSAPP
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================
          FOOTER
          ====================================================== */}

      <footer id="contact">
        <div>
          <strong>
            GALAXY FIRE STUDIOS
          </strong>

          <p>
            Record. Create. Ignite.
          </p>
        </div>

        <div>
          <a href="#home">Home</a>
          <a href="#studio">Studio</a>
          <a href="#services">Services</a>
          <a href="#visuals">Visuals</a>
          <a href="#pricing">Pricing</a>
          <a href="#booking">Book</a>
          <a href="mailto:galaxyfirestudios@gmail.com">
            Email
          </a>
        </div>

        <small>
          © 2026 GALAXY FIRE STUDIOS · EST. 2020 · NIGERIA
        </small>
      </footer>

      {/* ======================================================
          STYLES
          ====================================================== */}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700;800;900&family=Barlow+Condensed:wght@400;600;700;800;900&display=swap');

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #080808;
          color: #fff;
          font-family: Barlow, Arial, sans-serif;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button,
        input,
        select,
        textarea {
          font: inherit;
        }

        button {
          cursor: pointer;
        }

        .site {
          min-height: 100vh;
          overflow: hidden;
          background: #080808;
        }

        /* ================= NAV ================= */

        .nav {
          height: 78px;
          position: fixed;
          z-index: 100;
          inset: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5%;
          background: rgba(5,5,5,.94);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #222;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .brand-mark {
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          border: 2px solid #e50914;
          color: #e50914;
          font-weight: 900;
        }

        .brand strong {
          display: block;
          font-family: "Barlow Condensed";
          letter-spacing: 2px;
        }

        .brand small {
          display: block;
          color: #777;
          font-size: 8px;
          letter-spacing: 2px;
        }

        .nav-links {
          display: flex;
          gap: 18px;
          font-family: "Barlow Condensed";
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .nav-links a:hover {
          color: #e50914;
        }

        .nav-cta {
          padding: 12px 18px;
          background: #e50914;
          font-family: "Barlow Condensed";
          font-weight: 900;
          font-size: 11px;
        }

        .menu {
          display: none;
          background: none;
          color: #fff;
          border: 0;
          font-size: 24px;
        }

        /* ================= GENERAL ================= */

        section {
          padding: 120px 7%;
        }

        .section-no,
        .eyebrow {
          color: #e50914;
          font-family: "Barlow Condensed";
          font-weight: 900;
          letter-spacing: 3px;
          font-size: 11px;
        }

        .heading {
          max-width: 720px;
          margin-bottom: 55px;
        }

        .heading.center {
          margin-left: auto;
          margin-right: auto;
          text-align: center;
        }

        .heading h2,
        .split h2,
        .about h2,
        .why h2 {
          font: 900 clamp(48px,7vw,90px)/.9 "Barlow Condensed";
          margin: 20px 0;
        }

        h2 span,
        .heading h2 span,
        .about h2 span {
          color: #e50914;
        }

        .heading p,
        .split p,
        .hero p,
        .coming p,
        .about p {
          color: #bbb;
          line-height: 1.7;
          font-size: 16px;
          max-width: 700px;
        }

        .actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 28px;
        }

        .btn {
          display: inline-block;
          padding: 15px 22px;
          border: 0;
          color: #fff;
          font-family: "Barlow Condensed";
          font-weight: 900;
          letter-spacing: 1.5px;
        }

        .btn.red {
          background: #e50914;
        }

        .btn.ghost {
          border: 1px solid #666;
          background: transparent;
        }

        /* ================= HERO ================= */

        .hero,
        .feature,
        .booking {
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
        }

        .hero > img,
        .feature > img,
        .booking > img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .shade {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              90deg,
              rgba(0,0,0,.92),
              rgba(0,0,0,.50),
              rgba(0,0,0,.18)
            );
        }

        .hero-copy,
        .feature-copy,
        .booking-copy {
          position: relative;
          z-index: 2;
          padding: 150px 8%;
          max-width: 1000px;
        }

        .hero h1 {
          font: 900 clamp(64px,10vw,140px)/.86 "Barlow Condensed";
          margin: 24px 0;
        }

        .hero h1 span {
          color: #e50914;
        }

        .est {
          display: block;
          color: #777;
          letter-spacing: 4px;
          margin-top: 70px;
        }

        /* ================= SPLITS ================= */

        .split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 70px;
          align-items: center;
        }

        .split img {
          width: 100%;
          height: 560px;
          object-fit: cover;
        }

        .dark-split {
          background: #101010;
        }

        .stats {
          display: flex;
          gap: 50px;
          margin-top: 45px;
        }

        .stats b {
          font: 900 42px "Barlow Condensed";
        }

        .stats small {
          display: block;
          color: #777;
          font: 600 10px Barlow;
          letter-spacing: 2px;
          margin-top: 5px;
        }

        .steps {
          margin-top: 30px;
        }

        .step {
          display: flex;
          gap: 20px;
          padding: 15px 0;
          border-bottom: 1px solid #292929;
        }

        .step > b {
          color: #e50914;
          font-family: "Barlow Condensed";
        }

        .step strong {
          font-family: "Barlow Condensed";
          letter-spacing: 1px;
        }

        .step p {
          margin: 5px 0;
          font-size: 14px;
        }

        /* ================= SERVICE CARDS ================= */

        .cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: #333;
        }

        .card {
          background: #0b0b0b;
          padding: 35px;
          min-height: 250px;
        }

        .card > span {
          color: #e50914;
          font-family: "Barlow Condensed";
          font-weight: 900;
        }

        .card h3 {
          font: 800 30px "Barlow Condensed";
          margin: 20px 0;
        }

        .card p {
          color: #aaa;
          line-height: 1.6;
        }

        .card button,
        .card strong {
          border: 0;
          background: none;
          color: #fff;
          padding: 0;
          font: 800 11px "Barlow Condensed";
          letter-spacing: 1.5px;
        }

        /* ================= FEATURE ================= */

        .feature {
          min-height: 70vh;
        }

        .feature h2 {
          font: 900 clamp(50px,7vw,90px)/.9 "Barlow Condensed";
        }

        /* ================= NEW VISUAL SECTION ================= */

        .visual-section {
          background: #080808;
        }

        .visual-slider {
          margin-bottom: 55px;
          background: #111;
          border: 1px solid #272727;
        }

        .visual-slider-image {
          position: relative;
          height: min(70vh, 720px);
          min-height: 430px;
          overflow: hidden;
          background: #050505;
        }

        .visual-slider-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .visual-number {
          position: absolute;
          top: 20px;
          left: 20px;
          background: #e50914;
          padding: 8px 12px;
          font: 900 12px "Barlow Condensed";
          letter-spacing: 1px;
        }

        .slider-controls {
          position: absolute;
          right: 20px;
          bottom: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(0,0,0,.85);
          padding: 8px;
        }

        .slider-controls button {
          width: 42px;
          height: 42px;
          border: 1px solid #555;
          background: #111;
          color: #fff;
          font-size: 20px;
        }

        .slider-controls button:hover {
          background: #e50914;
          border-color: #e50914;
        }

        .slider-controls span {
          min-width: 70px;
          text-align: center;
          font: 800 11px "Barlow Condensed";
          letter-spacing: 1px;
        }

        .slider-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 25px;
          padding: 25px 28px;
        }

        .slider-info h3 {
          margin: 8px 0 0;
          font: 900 34px "Barlow Condensed";
        }

        .slider-dots {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          max-width: 300px;
          justify-content: flex-end;
        }

        .slider-dots button {
          width: 9px;
          height: 9px;
          padding: 0;
          border: 0;
          border-radius: 50%;
          background: #444;
        }

        .slider-dots button.active {
          background: #e50914;
          transform: scale(1.35);
        }

        /* ================= VISUAL PRICING ================= */

        .visual-pricing {
          margin-top: 70px;
          border: 1px solid #292929;
          padding: 30px;
          background: #101010;
        }

        .visual-pricing > div {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 30px;
        }

        .visual-pricing span {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          border-bottom: 1px solid #282828;
          padding: 14px 0;
          color: #aaa;
        }

        .visual-pricing b {
          color: #fff;
        }

        /* ================= PRICING ================= */

        .pricing {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .price-card {
          position: relative;
          background: #111;
          border: 1px solid #252525;
          padding: 30px;
        }

        .price-card.featured {
          border-color: #e50914;
        }

        .price-card em {
          position: absolute;
          right: 15px;
          top: 15px;
          background: #e50914;
          padding: 5px 8px;
          font: 800 9px "Barlow Condensed";
          font-style: normal;
        }

        .price-card > span {
          color: #e50914;
          font: 800 11px "Barlow Condensed";
          letter-spacing: 2px;
        }

        .price-card h3 {
          font: 800 27px "Barlow Condensed";
        }

        .price-card > strong {
          font: 900 38px "Barlow Condensed";
        }

        .price-card p {
          color: #777;
        }

        .price-card button {
          background: #e50914;
          color: #fff;
          border: 0;
          padding: 12px 16px;
          font: 800 11px "Barlow Condensed";
        }

        /* ================= GALLERY ================= */

        .gallery {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          grid-auto-rows: 260px;
          gap: 8px;
        }

        .gallery img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .gallery img:first-child {
          grid-row: span 2;
        }

        /* ================= CULTURE ================= */

        .culture {
          background: #101010;
        }

        .culture-cards {
          grid-template-columns: repeat(4, 1fr);
        }

        /* ================= COMING SOON ================= */

        .coming {
          background: #0b0b0b;
          border-top: 1px solid #222;
        }

        .coming h2 {
          font: 900 clamp(45px,7vw,90px) "Barlow Condensed";
          max-width: 800px;
        }

        .status {
          display: inline-block;
          border: 1px solid #e50914;
          color: #e50914;
          padding: 8px 12px;
          font: 800 10px "Barlow Condensed";
          letter-spacing: 2px;
        }

        /* ================= ABOUT ================= */

        .about {
          background: #e50914;
        }

        .about .section-no,
        .about h2 span {
          color: #fff;
        }

        .about p {
          color: #eee;
        }

        .about .btn.red {
          background: #080808;
        }

        /* ================= PROMO ================= */

        .promo-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .promo-grid img {
          width: 100%;
          aspect-ratio: 1 / 1;
          object-fit: cover;
        }

        /* ================= WHY ================= */

        .why {
          background: #111;
        }

        .why-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 25px;
          margin-top: 45px;
        }

        .why-grid b {
          color: #e50914;
          font: 900 25px "Barlow Condensed";
        }

        .why-grid h3 {
          font: 800 25px "Barlow Condensed";
        }

        .why-grid p {
          color: #888;
        }

        /* ================= BOOKING ================= */

        .booking {
          min-height: 75vh;
        }

        .booking h2 {
          font: 900 clamp(48px,7vw,90px)/.9 "Barlow Condensed";
        }

        .contact {
          color: #aaa;
        }

        /* ================= MODAL ================= */

        .modal {
          position: fixed;
          z-index: 200;
          inset: 0;
          display: grid;
          place-items: center;
          padding: 25px;
        }

        .modal-bg {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,.85);
        }

        .modal-card {
          position: relative;
          z-index: 2;
          width: min(700px, 100%);
          max-height: 90vh;
          overflow: auto;
          background: #111;
          border: 1px solid #333;
          padding: 35px;
        }

        .close {
          position: absolute;
          right: 15px;
          top: 10px;
          background: none;
          border: 0;
          color: #fff;
          font-size: 30px;
        }

        .modal-card h2 {
          font: 900 55px/.9 "Barlow Condensed";
          margin: 18px 0 30px;
        }

        .modal-card form label {
          display: block;
          color: #999;
          font: 800 10px "Barlow Condensed";
          letter-spacing: 1px;
          margin: 14px 0;
        }

        .modal-card input,
        .modal-card select,
        .modal-card textarea {
          width: 100%;
          margin-top: 7px;
          background: #090909;
          border: 1px solid #333;
          color: #fff;
          padding: 12px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .pay-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .pay-options button {
          background: #090909;
          border: 1px solid #333;
          color: #fff;
          padding: 15px;
          text-align: left;
        }

        .pay-options button.active {
          border-color: #e50914;
        }

        .pay-options b {
          font-size: 20px;
        }

        .due {
          display: flex;
          justify-content: space-between;
          padding: 18px 0;
          font: 800 12px "Barlow Condensed";
        }

        .due strong {
          font-size: 25px;
        }

        .submit {
          width: 100%;
        }

        .submit:disabled {
          opacity: .6;
          cursor: wait;
        }

        .error {
          color: #ff5a5a;
        }

        .success {
          text-align: center;
          padding: 35px 0;
        }

        .success-mark {
          font-size: 55px;
          color: #e50914;
        }

        .success .btn {
          margin-top: 20px;
        }

        /* ================= FOOTER ================= */

        footer {
          padding: 55px 7% 25px;
          border-top: 1px solid #222;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        footer strong {
          font-family: "Barlow Condensed";
          letter-spacing: 2px;
        }

        footer p {
          color: #777;
        }

        footer > div:nth-child(2) {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        footer small {
          grid-column: 1 / -1;
          color: #555;
          border-top: 1px solid #222;
          padding-top: 20px;
        }

        /* ================= TABLET ================= */

        @media (max-width: 1100px) {
          .nav-links {
            gap: 10px;
          }

          .nav-links a:nth-child(n+8) {
            display: none;
          }

          .cards,
          .pricing {
            grid-template-columns: repeat(2, 1fr);
          }

          .visual-pricing > div {
            grid-template-columns: 1fr;
          }

          .culture-cards {
            grid-template-columns: repeat(2, 1fr);
          }

          .why-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .promo-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* ================= MOBILE ================= */

        @media (max-width: 700px) {
          .nav {
            height: 68px;
          }

          .nav-cta {
            display: none;
          }

          .menu {
            display: block;
          }

          .nav-links {
            display: none;
            position: absolute;
            top: 68px;
            left: 0;
            right: 0;
            background: #080808;
            padding: 20px;
            flex-direction: column;
            gap: 15px;
          }

          .nav-links.open {
            display: flex;
          }

          .nav-links a {
            display: block !important;
          }

          section {
            padding: 80px 7%;
          }

          .hero-copy {
            padding: 130px 7% 80px;
          }

          .split {
            grid-template-columns: 1fr;
            gap: 35px;
          }

          .split img {
            height: 360px;
          }

          .cards,
          .pricing,
          .visual-pricing > div,
          .culture-cards,
          .form-grid,
          .pay-options {
            grid-template-columns: 1fr;
          }

          .visual-slider-image {
            height: 55vh;
            min-height: 350px;
          }

          .slider-info {
            display: block;
          }

          .slider-info h3 {
            font-size: 28px;
          }

          .slider-dots {
            justify-content: flex-start;
            margin-top: 20px;
          }

          .gallery {
            grid-template-columns: 1fr 1fr;
            grid-auto-rows: 220px;
          }

          .gallery img:first-child {
            grid-row: auto;
          }

          .why-grid {
            grid-template-columns: 1fr;
          }

          .promo-grid {
            grid-template-columns: 1fr 1fr;
          }

          .modal-card {
            padding: 25px;
          }

          .modal-card h2 {
            font-size: 45px;
          }

          footer {
            grid-template-columns: 1fr;
          }

          footer > div:nth-child(2) {
            justify-content: flex-start;
          }

          footer small {
            grid-column: auto;
          }
        }
      `}</style>
    </div>
  );
}
```
