import { useEffect, useRef, useState } from "react";

import logoImg from "@/imports/galaxy_studio_logo_for_video_without_background.webp";
import heroImg from "@/imports/bcff0804-5388-404a-8e04-15f201fad894.webp";
import deskImg from "@/imports/3fdd97c2-2891-4094-9214-196df630473f.webp";
import micCloseImg from "@/imports/9b6f958a-50ea-406b-b280-731a77251cd2.webp";
import micWideImg from "@/imports/2dad0e2f-97cd-4bc5-8a40-6d2ca428cee7.webp";
import monitorsImg from "@/imports/c896af71-ea06-4d96-9f86-afc747ae9b1f.webp";
import mpcLitImg from "@/imports/5f761b8a-db00-4f37-be3f-8a9cf9ced4ba.webp";
import mpcDemoImg from "@/imports/e2706307-4e0c-4c81-8ad8-c2b703520b7a.webp";
import interfaceImg from "@/imports/e508b057-4fc6-4354-b78c-ed237765bde3.webp";
import keyboardImg from "@/imports/b58464ee-8826-4dcf-82c2-e782d895a5eb.webp";
import speakerImg from "@/imports/7aa7a4d2-c05f-4d17-ace1-204719c82c51.webp";
import promoStudioTimeImg from "@/imports/IMG_3312.webp";
import promoBeatsImg from "@/imports/IMG_3365.webp";
import promoSuperstarsImg from "@/imports/IMG_3360.webp";
import promoMixMasterImg from "@/imports/IMG_3359.webp";
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
import cultureArt from "@/imports/for-the-culture.webp";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visualSlide, setVisualSlide] = useState(0);
  const [visualPaused, setVisualPaused] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
  const [cultureStories, setCultureStories] = useState([]);
  const [cultureFeedStatus, setCultureFeedStatus] = useState("loading");
  const [cultureActiveTab, setCultureActiveTab] = useState("home");
  const [cultureReaderStory, setCultureReaderStory] = useState<any | null>(null);
  const radioAudioRef = useRef<HTMLAudioElement | null>(null);
  const radioLoadedSrcRef = useRef<string>("");
  const [radioPlaying, setRadioPlaying] = useState(false);
  const [radioVolume, setRadioVolume] = useState(0.85);
  const [radioPlayerOpen, setRadioPlayerOpen] = useState(false);
  const [radioStreamReady, setRadioStreamReady] = useState(false);
  // A user pause only affects the current page session. A fresh visit should
  // attempt to start the station again, just like entering a traditional radio site.
  const [radioPausedByUser, setRadioPausedByUser] = useState(false);
  const [radioStreamUrl, setRadioStreamUrl] = useState((import.meta.env.VITE_RADIO_STREAM_URL || "").trim());
  const [radioPlaylist, setRadioPlaylist] = useState<any[]>([]);
  const [radioTrackIndex, setRadioTrackIndex] = useState(() => {
    try { return Number(localStorage.getItem("gfs-radio-track-index") || "0"); } catch { return 0; }
  });
  const [radioHistory, setRadioHistory] = useState<any[]>([]);
  const radioTrack = radioPlaylist[radioTrackIndex] || { artist: "FOR THE CULTURE RADIO", title: "DJ NEBULAE TEST ROTATION", show: "FOR THE CULTURE LIVE", host: "DJ NEBULAE", src: "" };
  const radioRecentlyPlayed = radioHistory.length ? radioHistory : [
    { artist: "FOR THE CULTURE RADIO", title: "Waiting for the first track…" },
  ];
  const radioSchedule = [
    ["00:00 – 04:00", "SOUND OF THE DIASPORA", "DJ NEBULAE", "Diaspora sounds. Global connection."],
    ["04:00 – 07:00", "THE CULTURE DRIVE", "DJ NEBULAE", "Music. Culture. Conversation."],
    ["07:00 – 10:00", "AFRICA NOW", "DJ NEBULAE", "The best African sounds and stories."],
    ["10:00 – 13:00", "THE NIGHT SHIFT", "DJ NEBULAE", "Deep vibes. Late-night records."],
    ["13:00 – 16:00", "BEATS & RHYMES", "DJ NEBULAE", "Hip hop. Bars. Classics. New school."],
  ];

  const playRadioTrack = async (index: number, fromUser = false) => {
    const audio = radioAudioRef.current;
    const track = radioPlaylist[index];
    if (!audio || !track?.src) { setRadioPlayerOpen(true); return false; }
    setRadioTrackIndex(index);
    try { localStorage.setItem("gfs-radio-track-index", String(index)); } catch {}
    const base = import.meta.env.BASE_URL || "/";
    const src = `${base.replace(/\/$/, "")}/${String(track.src).replace(/^\//, "")}`;
    audio.volume = radioVolume;
    if (track.poster) audio.dataset.poster = track.poster;
    if (fromUser) {
      setRadioPausedByUser(false);
    }

    // A radio pause/resume must behave like a real broadcast: do not reload the
    // current track when the listener presses PLAY again. Reloading audio.src
    // resets currentTime to 0, which made PAUSE → PLAY restart the song.
    const sameTrackLoaded = radioLoadedSrcRef.current === src && audio.src === new URL(src, window.location.href).href;
    if (!sameTrackLoaded) {
      audio.src = src;
      radioLoadedSrcRef.current = src;
    }

    try {
      await audio.play();
      setRadioPlaying(true);
      setRadioStreamReady(true);
      setRadioPlayerOpen(true);
      return true;
    } catch (error) {
      console.info("FOR THE CULTURE RADIO playback was blocked until the browser receives a user gesture.", error);
      setRadioPlayerOpen(true);
      return false;
    }
  };

  const startRadio = async (fromUser = false) => {
    if (radioPlaylist.length) return playRadioTrack(radioTrackIndex, fromUser);
    const audio = radioAudioRef.current;
    if (!audio || !radioStreamUrl) { setRadioPlayerOpen(true); return false; }
    audio.volume = radioVolume;
    if (fromUser) {
      setRadioPausedByUser(false);
    }
    // Preserve the position of a real stream when toggling pause/play.
    if (radioLoadedSrcRef.current !== radioStreamUrl || !audio.src) {
      audio.src = radioStreamUrl;
      radioLoadedSrcRef.current = radioStreamUrl;
    }
    try {
      await audio.play();
      setRadioPlaying(true);
      setRadioStreamReady(true);
      setRadioPlayerOpen(true);
      return true;
    } catch (error) {
      console.info("FOR THE CULTURE RADIO autoplay was blocked until the browser receives a user gesture.", error);
      setRadioPlayerOpen(true);
      return false;
    }
  };

  const pauseRadio = () => {
    const audio = radioAudioRef.current;
    audio?.pause();
    setRadioPlaying(false);
    // Keep the station paused for the current visit only. Reloading the site
    // should make a fresh autoplay attempt rather than permanently muting radio.
    setRadioPausedByUser(true);
  };

  const toggleRadio = () => {
    if (radioPlaying) pauseRadio();
    else startRadio(true);
  };

  useEffect(() => {
    let cancelled = false;
    const base = import.meta.env.BASE_URL || "./";
    const configUrl = `${base.replace(/\/$/, "")}/radio-config.json?ts=${Date.now()}`;
    fetch(configUrl, { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((config) => {
        if (cancelled || !config) return;
        if (typeof config.streamUrl === "string") setRadioStreamUrl(config.streamUrl.trim());
      })
      .catch(() => { /* Environment configuration remains the fallback. */ });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const base = import.meta.env.BASE_URL || "./";
    const playlistUrl = `${base.replace(/\/$/, "")}/radio-playlist.json?ts=${Date.now()}`;
    fetch(playlistUrl, { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((playlist) => {
        if (cancelled || !Array.isArray(playlist?.tracks)) return;
        setRadioPlaylist(playlist.tracks.filter((track: any) => typeof track?.src === "string" && track.src));
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("gfs-radio-history") || "[]");
      if (Array.isArray(stored)) setRadioHistory(stored.slice(0, 8));
    } catch {}
  }, []);

  useEffect(() => {
    const audio = radioAudioRef.current;
    if (!audio) return;
    audio.volume = radioVolume;
  }, [radioVolume]);

  const advanceRadioTrack = () => {
    if (!radioPlaylist.length) return;
    const nextIndex = (radioTrackIndex + 1) % radioPlaylist.length;
    const historyEntry = { artist: radioTrack.artist, title: radioTrack.title };
    const nextHistory = [historyEntry, ...radioHistory.filter((item) => `${item.artist}-${item.title}` !== `${historyEntry.artist}-${historyEntry.title}`)].slice(0, 8);
    setRadioHistory(nextHistory);
    try { localStorage.setItem("gfs-radio-history", JSON.stringify(nextHistory)); } catch {}
    playRadioTrack(nextIndex, false);
  };

  useEffect(() => {
    if ((!radioStreamUrl && !radioPlaylist.length) || radioPausedByUser) return;
    const tryStart = () => { startRadio(false); };
    tryStart();
    const onFirstGesture = () => {
      if (!radioPausedByUser && !radioPlaying) startRadio(false);
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
    };
    window.addEventListener("pointerdown", onFirstGesture, { once: true });
    window.addEventListener("keydown", onFirstGesture, { once: true });
    return () => {
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
    };
  }, [radioStreamUrl, radioPlaylist, radioPausedByUser]);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setInterval> | undefined;

    async function loadCultureStories(showLoading = false) {
      if (showLoading) setCultureFeedStatus("loading");
      const base = import.meta.env.BASE_URL || "./";
      const staticFeedCandidates = Array.from(new Set([
        `${base.replace(/\/$/, "")}/editorial-feed.json?ts=${Date.now()}`,
        `./editorial-feed.json?ts=${Date.now()}`,
        `editorial-feed.json?ts=${Date.now()}`,
      ]));
      const endpoints = [
        ...staticFeedCandidates,
        "/api/editorial-feed?limit=12",
      ];

      let validEmptyFeedSeen = false;
      const collectedStories: any[] = [];

      // Read every available feed instead of stopping at the first successful
      // endpoint. GitHub Pages normally serves the static feed, while a
      // connected backend may have fresher stories. Merge both safely and let
      // the static feed remain the reliable fallback.
      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, {
            headers: { Accept: "application/json" },
            cache: "no-store",
          });
          if (!response.ok) continue;
          const data = await response.json();
          if (!Array.isArray(data.stories)) continue;

          if (data.stories.length === 0) {
            validEmptyFeedSeen = true;
            continue;
          }

          collectedStories.push(...data.stories);
        } catch (error) {
          console.warn("FOR THE CULTURE editorial feed endpoint unavailable:", endpoint, error);
        }
      }

      const mergedStories = Array.from(
        new Map(
          collectedStories.map((story: any, index: number) => [
            story?.source_url || story?.id || `story-${index}`,
            story,
          ])
        ).values()
      )
        .sort((a: any, b: any) => {
          const aTime = Date.parse(a?.published_at || a?.source_published_at || "") || 0;
          const bTime = Date.parse(b?.published_at || b?.source_published_at || "") || 0;
          return bTime - aTime;
        })
        .slice(0, 12);

      if (!cancelled && mergedStories.length) {
        setCultureStories(mergedStories);
        setCultureFeedStatus("ready");
        return;
      }

      if (!cancelled) {
        setCultureFeedStatus(validEmptyFeedSeen ? "empty" : "error");
      }
    }

    const refresh = () => {
      if (document.visibilityState === "visible") loadCultureStories(false);
    };

    loadCultureStories(true);
    timer = setInterval(refresh, 5 * 60 * 1000);
    document.addEventListener("visibilitychange", refresh);

    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  useEffect(() => {
    const sections = cultureTabs.map(([, , href]) => document.querySelector(href)).filter(Boolean) as Element[];
    if (!sections.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const match = cultureTabs.find(([, , href]) => document.querySelector(href) === visible.target);
      if (match) setCultureActiveTab(match[0]);
    }, { rootMargin: "-25% 0px -55% 0px", threshold: [0.1, 0.35, 0.6] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [cultureStories]);

  useEffect(() => {
    if (!cultureReaderStory) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCultureStory();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cultureReaderStory]);

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
  const editorialStories = Array.isArray(cultureStories) ? cultureStories : [];
  const storyAt = (index: number) => editorialStories[index];
  const storyKey = (story: any) => story?.source_url || story?.id || story?.headline || story?.source_title;
  const storiesBy = (term: RegExp) => editorialStories.filter((story: any) => term.test(`${story.category || ""} ${story.headline || ""} ${story.dek || ""}`));
  const heroStory = storyAt(0);
  const heroKey = heroStory ? storyKey(heroStory) : null;
  // The hero already owns the newest story. Every lower module explicitly
  // excludes content already used above, so one source item can only appear
  // once on the FOR THE CULTURE landing page.
  const latestStories = editorialStories.slice(1, 4);
  const latestKeys = new Set(latestStories.map(storyKey));
  const heroAndLatestKeys = new Set([heroKey, ...latestKeys].filter(Boolean));
  const musicStories = storiesBy(/music|artist|album|single|afrobeats|hip-hop|ep|song/i).filter((story: any) => !heroAndLatestKeys.has(storyKey(story)));
  const cultureStoriesOnly = storiesBy(/culture|art|style|film|visual|creative|entertainment|media/i).filter((story: any) => !heroAndLatestKeys.has(storyKey(story)));
  const deskMusicStories = musicStories.slice(0, 2);
  const usedDeskKeys = new Set([heroKey, ...latestKeys, ...deskMusicStories.map(storyKey)].filter(Boolean));
  const deskCultureStory = cultureStoriesOnly.find((story: any) => !usedDeskKeys.has(storyKey(story))) || editorialStories.find((story: any) => !usedDeskKeys.has(storyKey(story)));
  const usedKeys = new Set([...usedDeskKeys, ...(deskCultureStory ? [storyKey(deskCultureStory)] : [])]);
  const moreStories = editorialStories.filter((story: any) => !usedKeys.has(storyKey(story))).slice(0, 3);
  const hasMoreStories = moreStories.length > 0;
  const storyUrl = (story: any) => story?.source_url || "#";
  const storyImage = (story: any) => story?.image_url || story?.source_image_url || "";
  const storyTitle = (story: any) => story?.headline || story?.title || "Latest from the culture";
  const storyDek = (story: any) => story?.dek || story?.source_excerpt || "The FOR THE CULTURE editorial desk is following the story.";
  const storyDate = (story: any) => story?.published_at ? new Date(story.published_at).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" }) : "Latest";
  const handleStoryImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    if (image.dataset.ftcFallback === "true") return;
    image.dataset.ftcFallback = "true";
    image.src = cultureArt;
    image.classList.add("culture-image-fallback");
  };
  const openCultureStory = (story: any) => {
    setCultureReaderStory(story || null);
    if (story) {
      document.body.style.overflow = "hidden";
    }
  };
  const closeCultureStory = () => {
    setCultureReaderStory(null);
    document.body.style.overflow = "";
  };
  const storyLinkProps = (story: any) => ({
    href: "#culture-story-reader",
    onClick: (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      openCultureStory(story);
    },
  });
  const cultureTabs = [
    ["home", "HOME", "#culture-home"], ["stories", "STORIES", "#culture-stories"],
    ["discover", "DISCOVER", "#culture-discover"]
  ] as const;

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
            { display_name: "Order Type", variable_name: "order_type", value: "Galaxy Fire Studio Booking" },
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

  useEffect(() => {
    if (visualPaused) return;
    const timer = window.setInterval(() => {
      setVisualSlide((current) => (current + 1) % visualSlides.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [visualPaused, visualSlides.length]);

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
  const [beatDropdownOpen, setBeatDropdownOpen] = useState(false);
  const [vinylRotation, setVinylRotation] = useState(0);
  const [vinylState, setVinylState] = useState<"stopped" | "playing" | "slowing">("stopped");
  const beatAudioRef = useRef<HTMLAudioElement | null>(null);
  const vinylFrameRef = useRef<number | null>(null);
  const vinylLastFrameRef = useRef<number | null>(null);
  const stopTimerRef = useRef<number | null>(null);
  const [beatSoldMap, setBeatSoldMap] = useState<Record<string, boolean>>({});
  const [beatCheckoutOpen, setBeatCheckoutOpen] = useState(false);
  const [beatPurchaseProcessing, setBeatPurchaseProcessing] = useState(false);
  const [beatPurchaseError, setBeatPurchaseError] = useState("");
  const [beatPurchaseSuccess, setBeatPurchaseSuccess] = useState("");
  const [selectedLicense, setSelectedLicense] = useState<"Basic" | "Premium" | "Unlimited" | "Exclusive">("Unlimited");
  const [beatCustomer, setBeatCustomer] = useState({ name: "", email: "", phone: "" });

  const licenseOptions = [
    { name: "Basic" as const, price: 20000, detail: "MP3 Lease" },
    { name: "Premium" as const, price: 40000, detail: "WAV Lease" },
    { name: "Unlimited" as const, price: 80000, detail: "Unlimited Use" },
    { name: "Exclusive" as const, price: 150000, detail: "Exclusive Rights" },
  ];

  const loadBeatAvailability = async () => {
    try {
      const response = await fetch("/api/beat-status");
      if (!response.ok) return;
      const result = await response.json();
      setBeatSoldMap(result.sold || {});
    } catch (error) {
      console.error("Beat availability check failed:", error);
    }
  };

  useEffect(() => {
    loadBeatAvailability();
  }, []);

  const openBeatCheckout = (license: typeof licenseOptions[number]) => {
    if (beatSoldMap[selectedBeat.id]) {
      setBeatPurchaseError("This beat has already been sold exclusively. You can still preview it, but it is no longer available for purchase.");
      return;
    }
    setSelectedLicense(license.name);
    setBeatPurchaseError("");
    setBeatPurchaseSuccess("");
    setBeatCheckoutOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeBeatCheckout = () => {
    if (beatPurchaseProcessing) return;
    setBeatCheckoutOpen(false);
    document.body.style.overflow = "";
  };

  const checkoutBeat = () => {
    setBeatPurchaseError("");
    setBeatPurchaseSuccess("");
    if (!beatCustomer.name || !beatCustomer.email || !beatCustomer.phone) {
      setBeatPurchaseError("Please enter your name, email and phone number.");
      return;
    }
    if (beatSoldMap[selectedBeat.id]) {
      setBeatPurchaseError("This beat has already been sold exclusively and cannot be purchased.");
      return;
    }
    const license = licenseOptions.find((item) => item.name === selectedLicense)!;
    setBeatPurchaseProcessing(true);
    const reference = `GFS-BEAT-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "pk_test_f350611c4c768b941d8725e73b122d3d37c9e5d7";

    const launch = () => {
      const PaystackPop = (window as any).PaystackPop;
      if (!PaystackPop) {
        setBeatPurchaseProcessing(false);
        setBeatPurchaseError("Paystack could not load. Please refresh and try again.");
        return;
      }
      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: publicKey,
        email: beatCustomer.email,
        amount: license.price * 100,
        currency: "NGN",
        reference,
        firstName: beatCustomer.name.trim().split(/\s+/)[0],
        phone: beatCustomer.phone,
        metadata: {
          custom_fields: [
            { display_name: "Order Type", variable_name: "order_type", value: "Galaxy Fire Beats Marketplace" },
            { display_name: "Beat", variable_name: "beat_id", value: selectedBeat.id },
            { display_name: "Beat Title", variable_name: "beat_title", value: selectedBeat.title },
            { display_name: "License", variable_name: "license", value: selectedLicense },
          ],
        },
        onSuccess: async (transaction: { reference: string }) => {
          try {
            const response = await fetch("/api/verify-beat-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                reference: transaction.reference,
                expectedAmount: license.price * 100,
                beat: { id: selectedBeat.id, title: selectedBeat.title, bpm: selectedBeat.bpm, key: selectedBeat.key },
                license: selectedLicense,
                customer: beatCustomer,
              }),
            });
            const result = await response.json();
            if (!response.ok || !result.verified) throw new Error(result.message || "Payment verification failed.");
            if (result.exclusiveSold) {
              setBeatSoldMap((current) => ({ ...current, [selectedBeat.id]: true }));
            }
            setBeatPurchaseSuccess(`Payment confirmed. Your Galaxy Fire order reference is ${result.orderReference || transaction.reference}.`);
            setBeatPurchaseError("");
          } catch (error) {
            console.error(error);
            setBeatPurchaseError("Payment was completed, but verification is pending. Please keep your Paystack reference: " + transaction.reference);
          } finally {
            setBeatPurchaseProcessing(false);
          }
        },
        onCancel: () => setBeatPurchaseProcessing(false),
      });
    };

    if ((window as any).PaystackPop) launch();
    else {
      const timer = window.setInterval(() => {
        if ((window as any).PaystackPop) {
          window.clearInterval(timer);
          launch();
        }
      }, 150);
      window.setTimeout(() => {
        window.clearInterval(timer);
        if (!(window as any).PaystackPop) {
          setBeatPurchaseProcessing(false);
          setBeatPurchaseError("Paystack could not load. Please refresh and try again.");
        }
      }, 8000);
    }
  };

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

  const selectBeatFromMenu = (beat: typeof beats[number]) => {
    stopBeatPreview(false);
    const audio = beatAudioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setSelectedBeat(beat);
    setBeatProgress(0);
    setBeatDropdownOpen(false);
    requestAnimationFrame(() => {
      const active = document.activeElement as HTMLElement | null;
      if (active?.tagName === "INPUT") active.blur();
      window.scrollTo({ top: window.scrollY, behavior: "auto" });
    });
  };

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
        <img src={heroImg} alt="Galaxy Studios control room" className="hero-photo" fetchPriority="high" />
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

        <div
          className={`visual-slider ${visualPaused ? "paused" : ""}`}
          onPointerEnter={() => setVisualPaused(true)}
          onPointerLeave={() => setVisualPaused(false)}
          onPointerDown={() => setVisualPaused(true)}
          onPointerUp={() => setVisualPaused(false)}
          onPointerCancel={() => setVisualPaused(false)}
        >
          <div className="visual-grid">
            {visualSlides[visualSlide].map((image, index) => (
              <div className={`visual-grid-item visual-grid-item-${index + 1}`} key={`${visualSlide}-${index}`}>
                <img
                  src={image}
                  alt={`Galaxy Fire Studios photography and visual production ${visualSlide * 10 + index + 1}`}
                  loading={visualSlide === 0 && index < 2 ? "eager" : "lazy"}
                  decoding="async"
                  width="1600"
                  height="1067"
                />
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
          <div className="visual-slider-status" aria-live="polite">{visualPaused ? "PAUSED · RELEASE TO CONTINUE" : "AUTO PLAY · HOLD TO PAUSE"}</div>
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
      <section className="culture-platform" id="culture">
        <div className="culture-platform-topline">
          <span>MUSIC. CULTURE. ENTERTAINMENT. COMMUNITY.</span>
          <span className="culture-platform-live">● LIVE EDITORIAL RADAR &nbsp; / &nbsp; FOR THE CULTURE</span>
        </div>

        <div className="culture-platform-shell">
          <div className="culture-brand-rail">
            <img src={cultureArt} alt="FOR THE CULTURE" className="culture-brand-art" />
            <div className="culture-brand-kicker">BY GALAXY FIRE STUDIOS</div>
            <p>Original editorial coverage powered by the FOR THE CULTURE newsroom.</p>
          </div>

          <div className="culture-platform-main">
            <nav className="culture-platform-nav" aria-label="FOR THE CULTURE sections">
              {cultureTabs.map(([key, label, href]) => (
                <a
                  key={key}
                  className={cultureActiveTab === key ? "active" : ""}
                  href={href}
                  onClick={(event) => {
                    event.preventDefault();
                    setCultureActiveTab(key);
                    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  {label}
                </a>
              ))}
            </nav>

            {cultureFeedStatus === "ready" && heroStory ? (
              <article className="culture-hero-story" id="culture-home">
                <div className="culture-hero-copy">
                  <span className="culture-label">{heroStory.category || "FEATURED STORY"}</span>
                  <h2>{storyTitle(heroStory)}</h2>
                  <p>{storyDek(heroStory)}</p>
                  <a {...storyLinkProps(heroStory)} className="culture-action">READ THE STORY <span>→</span></a>
                  <small className="culture-story-byline">{heroStory.source_name || "FOR THE CULTURE"} · {storyDate(heroStory)}</small>
                </div>
                <div className="culture-hero-image-wrap">
                  {storyImage(heroStory) ? (
                    <img src={storyImage(heroStory)} alt={storyTitle(heroStory)} className="culture-hero-image" loading="eager" decoding="async" referrerPolicy="no-referrer" onError={handleStoryImageError} />
                  ) : (
                    <div className="culture-editorial-visual-fallback"><span>FOR THE<br />CULTURE</span></div>
                  )}
                  <div className="culture-hero-stamp">CULTURE<br />OVER<br />EVERYTHING.</div>
                </div>
                <div className="culture-hero-controls"><span className="active"></span><span></span><span></span></div>
              </article>
            ) : (
              <article className="culture-hero-story culture-editorial-empty" id="culture-home">
                <div className="culture-hero-copy">
                  <span className="culture-label">FOR THE CULTURE EDITORIAL DESK</span>
                  <h2>THE CULTURE<br /><em>IS MOVING.</em></h2>
                  <p>The newsroom is waiting for its first published stories. Once the editorial engine connects, every image, headline and write-up on this platform will be driven by the live culture radar.</p>
                </div>
                <div className="culture-hero-image-wrap"><div className="culture-editorial-visual-fallback"><span>EDITORIAL<br />RADAR</span></div></div>
              </article>
            )}

            <div className="culture-content-grid">
              <section className="culture-stories-block culture-stories-block-wide" id="culture-stories">
                <div className="culture-section-head"><h3>LATEST STORIES</h3><span>FRESH FROM THE CULTURE RADAR</span></div>
                {cultureFeedStatus === "ready" && latestStories.length ? (
                  <div className="culture-story-grid">
                    {latestStories.map((story: any) => (
                      <a {...storyLinkProps(story)} className="culture-story-card culture-live-story-card" key={storyKey(story)}>
                        {storyImage(story) ? <img src={storyImage(story)} alt={storyTitle(story)} loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={handleStoryImageError} /> : <div className="culture-story-no-image">FOR THE CULTURE</div>}
                        <div>
                          <span>{story.category || "CULTURE"}</span>
                          <h4>{storyTitle(story)}</h4>
                          <p>{storyDek(story)}</p>
                          <small>{story.source_name || "FOR THE CULTURE"} · {storyDate(story)}</small>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className={`culture-editorial-state ${cultureFeedStatus}`}>
                    <div className="culture-editorial-state-mark">●</div>
                    <div>
                      <strong>{cultureFeedStatus === "loading" ? "LOADING THE CULTURE RADAR" : cultureFeedStatus === "error" ? "EDITORIAL FEED UNAVAILABLE" : "EDITORIAL RADAR INITIALIZING"}</strong>
                      <p>{cultureFeedStatus === "loading" ? "Checking the latest stories from the editorial sources." : cultureFeedStatus === "error" ? "The live editorial feed could not be reached. The newsroom will retry automatically." : "The editorial feed is empty. Once the editorial engine publishes stories, this space will update automatically."}</p>
                    </div>
                  </div>
                )}
              </section>
            </div>

            <div className="culture-platform-columns culture-desk-grid" id="culture-discover">
              <section className="culture-panel music-panel" id="culture-music">
                <div className="culture-section-head"><h3>NEW MUSIC</h3><span>ONLY STORIES NOT SHOWN ABOVE</span></div>
                {deskMusicStories.length ? deskMusicStories.map((story: any) => (
                  <a {...storyLinkProps(story)} className="culture-music-row" key={storyKey(story)}>
                    {storyImage(story) ? <img src={storyImage(story)} alt={storyTitle(story)} loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={handleStoryImageError} /> : <div className="culture-music-no-image">FTC</div>}
                    <div><strong>{storyTitle(story)}</strong><small>{storyDek(story)}</small><em>{story.source_name || "FOR THE CULTURE"}</em></div><span className="culture-play">→</span>
                  </a>
                )) : <div className="culture-panel-empty">NO ADDITIONAL MUSIC STORIES YET. THE DESK WILL FILL THIS SPACE AS NEW REPORTS ARRIVE.</div>}
              </section>

              {deskCultureStory && (
                <section className="culture-panel culture-feature-panel" id="culture-culture">
                  <div className="culture-section-head"><h3>CULTURE DESK</h3><span>POINT OF VIEW</span></div>
                  <a {...storyLinkProps(deskCultureStory)} className="culture-feature-link">
                    <div className="culture-feature-image">{storyImage(deskCultureStory) ? <img src={storyImage(deskCultureStory)} alt={storyTitle(deskCultureStory)} loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={handleStoryImageError} /> : <div className="culture-editorial-visual-fallback"><span>CULTURE</span></div>}<span>{deskCultureStory.category || "CULTURE"}</span></div>
                    <h4>{storyTitle(deskCultureStory)}</h4><p>{storyDek(deskCultureStory)}</p><small>{deskCultureStory.source_name || "FOR THE CULTURE"} · {storyDate(deskCultureStory)}</small>
                  </a>
                </section>
              )}

              <aside className="culture-panel culture-idea-panel">
                <span>THE IDEA</span>
                <h3>STORIES.<br />SOUNDS.<br /><em>IDENTITY.</em></h3>
                <p>Music and culture belong in the same conversation. FOR THE CULTURE brings releases, voices, scenes and ideas together without forcing the same story into every panel.</p>
                <div className="culture-source-strip">
                  <small>EDITORIAL RADAR</small>
                  <strong>THE NATIVE · NOTJUSTOK · TOO XCLUSIVE · NAIJALOADED</strong>
                </div>
              </aside>
            </div>

            {hasMoreStories && (
              <section className="culture-more" id="culture-more">
                <div className="culture-section-head"><h3>MORE FROM THE CULTURE</h3><span>OLDER / DISTINCT STORIES</span></div>
                <div className="culture-more-grid">
                  {moreStories.map((story: any) => (
                    <a {...storyLinkProps(story)} className="culture-more-card" key={storyKey(story)}>
                      {storyImage(story) ? <img src={storyImage(story)} alt={storyTitle(story)} loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={handleStoryImageError} /> : <div className="culture-story-no-image">FTC</div>}
                      <div><span>{story.category || "CULTURE"}</span><h4>{storyTitle(story)}</h4><p>{storyDek(story)}</p><small>{story.source_name || "FOR THE CULTURE"}</small></div>
                    </a>
                  ))}
                </div>
              </section>
            )}

            <section className="culture-manifesto" id="culture-community">
              <div><span>FOR THE CULTURE</span><h3>WE ARE<br /><em>THE CULTURE.</em></h3></div>
              <p>One newsroom. One live feed. Music, stories, ideas and people connected without unnecessary repetition. When there is nothing new to say, the platform stays quiet rather than filling space for the sake of filling it.</p>
              <a href="#culture-stories" className="culture-action">EXPLORE THE LATEST →</a>
            </section>
          </div>
        </div>
      </section>

      {/* FOR THE CULTURE RADIO */}
      <section className="radio-station" id="radio">
        <div className="radio-station-topline">
          <span>FOR THE CULTURE RADIO</span>
          <span className="radio-live-line">● LIVE INTERNET RADIO</span>
          <span className="radio-topline-right">LIVE · GLOBAL · ALWAYS CULTURE</span>
        </div>

        <div className="radio-hero-grid">
          <div className="radio-intro">
            <div className="section-number">09 / RADIO</div>
            <h2>FOR THE<br /><span>CULTURE.</span><br />LIVE<span>.</span></h2>
            <p>The soundtrack of the culture. Music, conversation, new voices and sounds from Africa and the diaspora.</p>
            <div className="radio-actions">
              <button type="button" className="button red" onClick={toggleRadio}>{radioPlaying ? "PAUSE STREAM" : "PLAY RADIO →"}</button>
              <button type="button" className="button outline" onClick={() => setRadioPlayerOpen(true)}>OPEN PLAYER</button>
            </div>
            <div className="radio-status-note">
              <span className={radioPlaying ? "radio-dot live" : "radio-dot"}></span>
              {radioPlaying ? "ON AIR · STREAM LIVE" : radioStreamUrl ? "READY TO BROADCAST" : "RADIO ENGINE READY · STREAM URL TO BE CONNECTED"}
            </div>
          </div>

          <div className="radio-main-player">
            <div className="radio-player-glow"></div>
            <div className="radio-player-badge">{radioPlaying ? "ON AIR" : "FOR THE CULTURE RADIO"}</div>
            <div className="radio-player-body">
              <div className="radio-art-wrap">
                <img src={cultureArt} alt="For the Culture Radio artwork" />
                <div className="radio-art-overlay">{radioPlaying ? "LIVE" : "FTC"}</div>
              </div>
              <div className="radio-now-playing">
                <span>NOW PLAYING</span>
                <h3>{radioTrack.artist}</h3>
                <strong>{radioTrack.title}</strong>
                <div className="radio-waveform" aria-hidden="true">{Array.from({ length: 48 }, (_, i) => <i key={i} style={{ height: `${18 + ((i * 17) % 44)}%` }} />)}</div>
                <div className="radio-meta"><span>{radioPlaying ? "LIVE" : "STANDBY"} <b>●</b></span><span>128 KBPS</span></div>
              </div>
              <button type="button" className={`radio-big-play ${radioPlaying ? "playing" : ""}`} onClick={toggleRadio} aria-label={radioPlaying ? "Pause radio" : "Play radio"}>{radioPlaying ? "Ⅱ" : "▶"}</button>
            </div>
            <div className="radio-player-footer">
              <div><span>HOST</span><strong>{radioTrack.host}</strong></div>
              <div><span>CURRENT SHOW</span><strong>{radioTrack.show}</strong><small>LIVE · FOR THE CULTURE</small></div>
              <div><span>NEXT</span><strong>AFRICA NOW</strong><small>UP NEXT</small></div>
              <div className="radio-volume"><span>VOLUME</span><input type="range" min="0" max="1" step="0.01" value={radioVolume} onChange={(e) => setRadioVolume(Number(e.target.value))} /></div>
            </div>
          </div>
        </div>

        <div className="radio-content-grid">
          <section className="radio-panel recently-played">
            <div className="radio-panel-head"><h3>RECENTLY PLAYED</h3><span>VIEW ALL</span></div>
            {radioRecentlyPlayed.map((item: any, index) => (
              <div className="radio-track-row" key={`${item.artist}-${item.title}-${index}`}>
                <img src={cultureArt} alt="" />
                <div><strong>{item.artist}</strong><small>{item.title}</small></div>
                <span>{index === 0 && radioPlaying ? "NOW" : `${4 + index}:${String(32 - index * 2).padStart(2, "0")} PM`}</span>
              </div>
            ))}
            <button type="button" className="radio-panel-button">VIEW FULL PLAYLIST →</button>
          </section>

          <section className="radio-panel radio-schedule">
            <div className="radio-panel-head"><h3>PROGRAM SCHEDULE</h3><span>VIEW FULL SCHEDULE</span></div>
            {radioSchedule.map(([time, show, host, desc], index) => (
              <div className={`radio-schedule-row ${index === 1 ? "current" : ""}`} key={show}>
                <span className="schedule-time">{time}</span><div><strong>{show}</strong><small>{host}</small></div><p>{desc}</p><span className="schedule-state">{index === 1 && radioPlaying ? "ON AIR" : "○"}</span>
              </div>
            ))}
          </section>

          <aside className="radio-panel radio-connect">
            <div className="radio-panel-head"><h3>THE STATION</h3><span>DJ NEBULAE</span></div>
            <h4>MUSIC.<br />CULTURE.<br /><em>CONNECTION.</em></h4>
            <p>FOR THE CULTURE RADIO is the live audio layer of the Galaxy Fire ecosystem — built for records, stories, artists, conversations and the sounds moving the culture.</p>
            <div className="radio-source-note"><span>RADIO ENGINE</span><strong>{radioPlaylist.length ? `${radioPlaylist.length} TRACK ROTATION READY` : (radioStreamUrl ? "STREAM CONFIGURED" : "PLAYLIST READYING")}</strong></div>
          </aside>
        </div>

        <audio ref={radioAudioRef} preload="none" onPlaying={() => setRadioPlaying(true)} onPause={() => setRadioPlaying(false)} onEnded={advanceRadioTrack} onCanPlay={() => setRadioStreamReady(true)} onError={() => setRadioStreamReady(false)} aria-label="For the Culture Radio" />
      </section>

      {radioPlayerOpen && (
        <div className="radio-player-drawer">
          <div className="radio-drawer-art"><img src={cultureArt} alt="For the Culture Radio" /></div>
          <div className="radio-drawer-track"><span>{radioPlaying ? "● LIVE" : "FOR THE CULTURE RADIO"}</span><strong>{radioTrack.artist}</strong><small>{radioTrack.title} · {radioTrack.host}</small></div>
          <button type="button" className="radio-drawer-control" onClick={toggleRadio}>{radioPlaying ? "Ⅱ" : "▶"}</button>
          <input type="range" min="0" max="1" step="0.01" value={radioVolume} onChange={(e) => setRadioVolume(Number(e.target.value))} aria-label="Radio volume" />
          <span className="radio-drawer-quality">128 KBPS</span>
          <button type="button" className="radio-drawer-close" onClick={() => setRadioPlayerOpen(false)} aria-label="Close radio player">×</button>
        </div>
      )}

      <section className="ecosystem-preview dark" id="culture-blog-preview">
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
            <div className="beats-heading-note">
              <span>VINYL PREVIEW PLAYER</span>
              <small>SELECT A BEAT FROM THE PLAYER</small>
            </div>
          </div>

          <div className="beat-feature">
            <div className={`vinyl-player ${vinylState}`}>
              <div className="vinyl-platter" style={{ transform: `rotate(${vinylRotation}deg)` }}>
                <div className="vinyl-grooves" />
                <img src={beatArt} alt="Galaxy Records Limited artwork" className="vinyl-label" />
                <div className="vinyl-shine" />
              </div>
              <div className={`tonearm ${vinylState}`}><div className="tonearm-head" /></div>

              <div className="turntable-control">
                <span>33⅓ RPM</span>
                <span>{vinylState === "playing" ? "PLAYING" : vinylState === "slowing" ? "STOPPING" : "READY"}</span>
              </div>

              <button className="vinyl-play" onClick={() => playBeat(selectedBeat)} aria-label={beatPlaying ? "Pause preview" : "Play preview"}>
                {beatPlaying ? "Ⅱ" : "▶"}
              </button>
            </div>

            <div className="beat-feature-info">
              <div className={`beat-selector ${beatDropdownOpen ? "open" : ""}`}>
                <button
                  type="button"
                  className="beat-selector-trigger"
                  onClick={() => setBeatDropdownOpen((open) => !open)}
                  aria-expanded={beatDropdownOpen}
                  aria-haspopup="listbox"
                >
                  <span className="beat-selector-icon">♪</span>
                  <span className="beat-selector-current">
                    <small>SELECT BEAT</small>
                    <strong>{selectedBeat.title}</strong>
                  </span>
                  <span className="beat-selector-meta">{selectedBeat.key} · {selectedBeat.bpm} BPM</span>
                  <span className="beat-selector-chevron">{beatDropdownOpen ? "⌃" : "⌄"}</span>
                </button>

                {beatDropdownOpen && (
                  <div className="beat-selector-menu" role="listbox" aria-label="Galaxy Fire beats">
                    <div className="beat-selector-tools">
                      <input
                        value={beatSearch}
                        onChange={(event) => setBeatSearch(event.target.value)}
                        placeholder="SEARCH BEATS..."
                        aria-label="Search beats"
                        autoFocus
                      />
                      <div className="beat-selector-filters">
                        {["ALL", "MAJOR", "MINOR"].map((filter) => (
                          <button
                            type="button"
                            key={filter}
                            className={beatFilter === filter ? "active" : ""}
                            onClick={() => setBeatFilter(filter)}
                          >
                            {filter}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="beat-selector-list">
                      {filteredBeats.length > 0 ? filteredBeats.map((beat) => (
                        <button
                          type="button"
                          key={beat.id}
                          className={`beat-selector-option ${selectedBeat.id === beat.id ? "selected" : ""}`}
                          onClick={() => selectBeatFromMenu(beat)}
                          role="option"
                          aria-selected={selectedBeat.id === beat.id}
                        >
                          <span className="beat-selector-option-icon">{selectedBeat.id === beat.id ? "●" : "›"}</span>
                          <span className="beat-selector-option-title">{beat.title}</span>
                          <span className="beat-selector-option-meta">{beat.key}</span>
                          <span className="beat-selector-option-bpm">{beat.bpm}</span>
                        </button>
                      )) : (
                        <div className="beat-selector-empty">NO BEATS MATCH YOUR SEARCH.</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

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
                {licenseOptions.map((license) => {
                  const exclusiveUnavailable = !!beatSoldMap[selectedBeat.id];
                  return (
                    <div key={license.name} className={`${license.name === "Unlimited" ? "featured " : ""}${selectedLicense === license.name ? "chosen" : ""}${exclusiveUnavailable ? " sold" : ""}`}>
                      <small>{license.name.toUpperCase()}</small>
                      <strong>{formatNaira(license.price)}</strong>
                      <span>{exclusiveUnavailable ? "SOLD — PREVIEW ONLY" : license.detail}</span>
                      <button disabled={!!exclusiveUnavailable} onClick={() => openBeatCheckout(license)}>{exclusiveUnavailable ? "SOLD" : "BUY LICENSE"}</button>
                    </div>
                  );
                })}
              </div>
              {beatSoldMap[selectedBeat.id] && <div className="beat-sold-banner">SOLD · THIS BEAT REMAINS AVAILABLE TO PREVIEW BUT CANNOT BE PURCHASED.</div>}
              {beatPurchaseSuccess && <div className="beat-purchase-success">{beatPurchaseSuccess}</div>}
              {beatPurchaseError && <div className="beat-purchase-error">{beatPurchaseError}</div>}
              <div className="beat-license-note">Payments are verified server-side through Paystack. Exclusive purchases are recorded so the beat can remain visible and playable while being blocked from future purchase.</div>
            </div>
          </div>

          <audio ref={beatAudioRef} preload="none" aria-hidden="true" />
        </div>
      </section>

      {beatCheckoutOpen && (
        <div className="beat-checkout-overlay" onClick={() => !beatPurchaseProcessing && closeBeatCheckout()}>
          <div className="beat-checkout-modal" onClick={(event) => event.stopPropagation()}>
            <button className="store-close" onClick={closeBeatCheckout} disabled={beatPurchaseProcessing}>×</button>
            <div className="section-number">GALAXY FIRE BEATS · SECURE CHECKOUT</div>
            <h3>{selectedBeat.title}</h3>
            <p className="beat-checkout-license">{selectedLicense.toUpperCase()} LICENSE · {formatNaira(licenseOptions.find((item) => item.name === selectedLicense)?.price || 0)}</p>
            <div className="beat-checkout-form">
              <label>FULL NAME<input value={beatCustomer.name} onChange={(e) => setBeatCustomer({ ...beatCustomer, name: e.target.value })} /></label>
              <label>EMAIL<input type="email" value={beatCustomer.email} onChange={(e) => setBeatCustomer({ ...beatCustomer, email: e.target.value })} /></label>
              <label className="wide">PHONE<input value={beatCustomer.phone} onChange={(e) => setBeatCustomer({ ...beatCustomer, phone: e.target.value })} /></label>
            </div>
            <div className="beat-checkout-summary"><span>PAYMENT</span><strong>{formatNaira(licenseOptions.find((item) => item.name === selectedLicense)?.price || 0)}</strong></div>
            {beatPurchaseError && <div className="store-error">{beatPurchaseError}</div>}
            {beatPurchaseSuccess && <div className="store-success">{beatPurchaseSuccess}</div>}
            <button className="button red full" disabled={beatPurchaseProcessing || !!beatPurchaseSuccess} onClick={checkoutBeat}>{beatPurchaseProcessing ? "OPENING SECURE PAYMENT..." : beatPurchaseSuccess ? "PAYMENT CONFIRMED" : "PAY WITH PAYSTACK →"}</button>
            <p className="checkout-note">Your payment is verified on the server before the order is recorded. Do not close the payment window until Paystack confirms your transaction.</p>
          </div>
        </div>
      )}

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

      {cultureReaderStory && (
        <div className="culture-story-reader" id="culture-story-reader" role="dialog" aria-modal="true" aria-labelledby="culture-story-reader-title">
          <div className="culture-story-reader-backdrop" onClick={closeCultureStory} />
          <article className="culture-story-reader-card">
            <button type="button" className="culture-story-reader-close" onClick={closeCultureStory} aria-label="Close story reader">×</button>
            {storyImage(cultureReaderStory) && (
              <img
                className="culture-story-reader-image"
                src={storyImage(cultureReaderStory)}
                alt={storyTitle(cultureReaderStory)}
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={handleStoryImageError}
              />
            )}
            <div className="culture-story-reader-content">
              <div className="culture-story-reader-meta">
                <span>{cultureReaderStory.category || "CULTURE"}</span>
                <span>{cultureReaderStory.source_name || "FOR THE CULTURE"}</span>
                <span>{storyDate(cultureReaderStory)}</span>
              </div>
              <h2 id="culture-story-reader-title">{storyTitle(cultureReaderStory)}</h2>
              <p className="culture-story-reader-dek">{storyDek(cultureReaderStory)}</p>
              <div className="culture-story-reader-body">
                {(cultureReaderStory.body || cultureReaderStory.source_excerpt || "The FOR THE CULTURE editorial desk is following this story.")
                  .split(/\n\s*\n|(?<=\.)\s{2,}/)
                  .map((paragraph: string, index: number) => paragraph.trim() ? <p key={index}>{paragraph.trim()}</p> : null)}
              </div>
              {storyUrl(cultureReaderStory) !== "#" && (
                <a className="culture-story-reader-source" href={storyUrl(cultureReaderStory)} target="_blank" rel="noreferrer">READ THE ORIGINAL SOURCE ↗</a>
              )}
            </div>
          </article>
        </div>
      )}

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
              <a href="#radio">Radio</a>
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
        .culture-story-reader { position: fixed; inset: 0; z-index: 12000; display: grid; place-items: center; padding: 24px; }
        .culture-story-reader-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,.9); backdrop-filter: blur(12px); }
        .culture-story-reader-card { position: relative; z-index: 1; width: min(980px, 100%); max-height: 94vh; overflow-y: auto; background: #080808; border: 1px solid #2a2a2a; box-shadow: 0 40px 140px rgba(0,0,0,.75); }
        .culture-story-reader-close { position: absolute; z-index: 3; top: 16px; right: 16px; width: 44px; height: 44px; border: 1px solid rgba(255,255,255,.25); background: rgba(0,0,0,.72); color: #fff; font-size: 32px; line-height: 1; cursor: pointer; }
        .culture-story-reader-image { display: block; width: 100%; max-height: 430px; object-fit: cover; border-bottom: 1px solid #242424; background: radial-gradient(circle at 70% 20%, rgba(143,53,220,.25), transparent 42%), #090909; mask-image: linear-gradient(to bottom, #000 86%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, #000 86%, transparent 100%); }
        .culture-story-reader-content { padding: clamp(28px, 5vw, 58px); }
        .culture-story-reader-meta { display: flex; flex-wrap: wrap; gap: 12px 22px; color: #a86cff; font-size: 11px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; }
        .culture-story-reader-content h2 { margin: 18px 0 16px; max-width: 850px; font-family: 'Barlow Condensed', sans-serif; font-size: clamp(46px, 7vw, 88px); line-height: .9; text-transform: uppercase; }
        .culture-story-reader-dek { max-width: 760px; margin: 0 0 30px; color: #aaa; font-size: 18px; line-height: 1.6; }
        .culture-story-reader-body { max-width: 760px; color: #e1e1e1; font-size: 17px; line-height: 1.8; }
        .culture-story-reader-body p { margin: 0 0 22px; }
        .culture-story-reader-source { display: inline-flex; margin-top: 12px; padding: 14px 18px; background: #9d43f5; color: #fff; text-decoration: none; font-size: 11px; font-weight: 900; letter-spacing: .12em; }

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
          .beat-license-grid > div.chosen { border-color:#e50914; background:#130606; }
        .beat-license-grid > div.sold { opacity:.58; }
        .beat-license-grid button:disabled { cursor:not-allowed; border-color:#333; background:#090909; color:#555; }
        .beat-sold-banner { margin-top:14px; padding:12px 14px; border:1px solid #4b1a1a; background:#120606; color:#d66; font-size:9px; letter-spacing:.1em; line-height:1.6; }
        .beat-purchase-success,.beat-purchase-error { margin-top:14px; padding:12px 14px; font-size:10px; line-height:1.6; }
        .beat-purchase-success { border:1px solid #285f35; background:#07140a; color:#7ee69a; }
        .beat-purchase-error { border:1px solid #6a2222; background:#170707; color:#ff8585; }
        .beat-checkout-overlay { position:fixed; inset:0; z-index:10000; display:grid; place-items:center; padding:24px; background:rgba(0,0,0,.82); backdrop-filter:blur(12px); }
        .beat-checkout-modal { position:relative; width:min(680px,100%); max-height:90vh; overflow:auto; padding:44px; border:1px solid #2a2a2a; background:#080808; box-shadow:0 40px 120px rgba(0,0,0,.65); }
        .beat-checkout-modal h3 { font-size:clamp(34px,5vw,58px); line-height:1; margin:14px 0 8px; }
        .beat-checkout-license { color:#e50914; font-size:11px; letter-spacing:.12em; font-weight:700; }
        .beat-checkout-form { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin:28px 0; }
        .beat-checkout-form label { display:flex; flex-direction:column; gap:7px; color:#777; font-size:9px; letter-spacing:.12em; }
        .beat-checkout-form label.wide { grid-column:1 / -1; }
        .beat-checkout-form input { width:100%; box-sizing:border-box; background:#0d0d0d; border:1px solid #292929; color:#fff; padding:14px; outline:none; }
        .beat-checkout-form input:focus { border-color:#e50914; }
        .beat-checkout-summary { display:flex; justify-content:space-between; align-items:center; padding:18px 0; border-top:1px solid #242424; border-bottom:1px solid #242424; margin-bottom:18px; color:#777; font-size:9px; letter-spacing:.12em; }
        .beat-checkout-summary strong { color:#fff; font-size:22px; letter-spacing:0; }
        .store-section { padding:80px 6%; }
          .cart-drawer { padding:45px 22px 25px; }
          .culture-grid { grid-template-columns: 1fr; }
          .culture-card { min-height: 360px; }
          .culture-statement { padding: 25px; }
          .ecosystem-preview, .about-preview { padding: 90px 6%; }
          .ecosystem-status { width: 100%; min-width: 0; }
          .stats { gap: 25px; }
          .contact-details { flex-direction: column; gap: 25px; align-items: center; }
          .culture-story-reader { padding: 10px; }
          .culture-story-reader-card { max-height: 96vh; }
          .culture-story-reader-image { max-height: 260px; }
          .culture-story-reader-content { padding: 28px 20px 34px; }
          .culture-story-reader-content h2 { font-size: clamp(40px, 14vw, 68px); }
          .culture-story-reader-dek { font-size: 16px; }
          .culture-story-reader-body { font-size: 16px; line-height: 1.7; }

          .booking-modal { padding: 10px; }
          .booking-modal-card { padding: 35px 20px 25px; max-height: 96vh; }
          .booking-form-grid, .payment-options { grid-template-columns: 1fr; }
          .booking-total strong { font-size: 22px; }
          .footer-bottom { flex-direction: column; gap: 12px; }
        }

        /* COMPACT VINYL BEAT SELECTOR */
        .beats-heading-note { min-width:200px; display:flex; flex-direction:column; align-items:flex-end; gap:7px; color:#e50914; font-size:9px; letter-spacing:.18em; font-weight:700; text-align:right; }
        .beats-heading-note small { color:#555; font-size:8px; letter-spacing:.13em; font-weight:500; }
        .beat-selector { position:relative; z-index:20; width:100%; margin:0 0 24px; }
        .beat-selector-trigger { width:100%; display:flex; align-items:center; gap:12px; min-height:50px; padding:7px 11px; border:1px solid #333; border-radius:10px; background:rgba(8,8,8,.96); color:#fff; box-shadow:0 14px 35px rgba(0,0,0,.42); cursor:pointer; text-align:left; backdrop-filter:blur(10px); }
        .beat-selector-trigger:hover,.beat-selector.open .beat-selector-trigger { border-color:#e50914; box-shadow:0 0 28px rgba(229,9,20,.13),0 14px 35px rgba(0,0,0,.42); }
        .beat-selector-icon { display:grid; place-items:center; width:28px; height:28px; border:1px solid #e50914; border-radius:8px; color:#e50914; font-size:13px; flex:none; }
        .beat-selector-current { min-width:0; display:flex; flex:1; flex-direction:column; gap:4px; }
        .beat-selector-current small { color:#555; font-size:7px; letter-spacing:.16em; }
        .beat-selector-current strong { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:10px; letter-spacing:.03em; }
        .beat-selector-meta { color:#777; white-space:nowrap; font-size:8px; letter-spacing:.06em; }
        .beat-selector-chevron { width:20px; color:#e50914; text-align:center; font-size:17px; flex:none; }
        .beat-selector-menu { position:absolute; z-index:30; left:0; right:0; top:calc(100% + 8px); border:1px solid #333; border-radius:10px; background:rgba(7,7,7,.98); box-shadow:0 20px 55px rgba(0,0,0,.65); overflow:hidden; backdrop-filter:blur(14px); }
        .beat-selector-tools { padding:10px; border-bottom:1px solid #202020; background:#0a0a0a; }
        .beat-selector-tools input { width:100%; box-sizing:border-box; padding:8px 10px; border:1px solid #292929; outline:none; background:#111; color:#fff; font-size:9px; letter-spacing:.11em; text-transform:uppercase; }
        .beat-selector-tools input:focus { border-color:#e50914; }
        .beat-selector-filters { display:flex; gap:6px; margin-top:7px; }
        .beat-selector-filters button { flex:1; padding:7px 6px; border:1px solid #242424; background:#101010; color:#666; font-size:7px; letter-spacing:.14em; cursor:pointer; }
        .beat-selector-filters button:hover,.beat-selector-filters button.active { color:#fff; border-color:#e50914; background:#160606; }
        .beat-selector-list { max-height:190px; overflow-y:auto; }
        .beat-selector-option { width:100%; min-height:40px; display:grid; grid-template-columns:22px minmax(0,1fr) 72px 52px; align-items:center; gap:8px; padding:8px 12px; border:0; border-bottom:1px solid #181818; background:#090909; color:#777; cursor:pointer; text-align:left; }
        .beat-selector-option:last-child { border-bottom:0; }
        .beat-selector-option:hover,.beat-selector-option.selected { background:linear-gradient(90deg,#160606,#090909); color:#fff; }
        .beat-selector-option-icon { color:#555; font-size:9px; }
        .beat-selector-option.selected .beat-selector-option-icon { color:#e50914; }
        .beat-selector-option-title { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:#ddd; font-size:9px; }
        .beat-selector-option-meta,.beat-selector-option-bpm { color:#666; font-size:8px; text-align:right; white-space:nowrap; }
        .beat-selector-option.selected .beat-selector-option-meta,.beat-selector-option.selected .beat-selector-option-bpm { color:#aaa; }
        .beat-selector-empty { padding:20px 12px; color:#555; text-align:center; font-size:8px; letter-spacing:.13em; }

        /* COMPACT VINYL BEAT SELECTOR */
        .beats-heading-note { min-width:200px; display:flex; flex-direction:column; align-items:flex-end; gap:7px; color:#e50914; font-size:9px; letter-spacing:.18em; font-weight:700; text-align:right; }
        .beats-heading-note small { color:#555; font-size:8px; letter-spacing:.13em; font-weight:500; }
        .beat-selector { position:relative; z-index:20; width:100%; margin:0 0 24px; }
        .beat-selector-trigger { width:100%; display:flex; align-items:center; gap:12px; min-height:50px; padding:7px 11px; border:1px solid #333; border-radius:10px; background:rgba(8,8,8,.96); color:#fff; box-shadow:0 14px 35px rgba(0,0,0,.42); cursor:pointer; text-align:left; backdrop-filter:blur(10px); }
        .beat-selector-trigger:hover,.beat-selector.open .beat-selector-trigger { border-color:#e50914; box-shadow:0 0 28px rgba(229,9,20,.13),0 14px 35px rgba(0,0,0,.42); }
        .beat-selector-icon { display:grid; place-items:center; width:28px; height:28px; border:1px solid #e50914; border-radius:8px; color:#e50914; font-size:13px; flex:none; }
        .beat-selector-current { min-width:0; display:flex; flex:1; flex-direction:column; gap:4px; }
        .beat-selector-current small { color:#555; font-size:7px; letter-spacing:.16em; }
        .beat-selector-current strong { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:10px; letter-spacing:.03em; }
        .beat-selector-meta { color:#777; white-space:nowrap; font-size:8px; letter-spacing:.06em; }
        .beat-selector-chevron { width:20px; color:#e50914; text-align:center; font-size:17px; flex:none; }
        .beat-selector-menu { position:absolute; z-index:30; left:0; right:0; top:calc(100% + 8px); border:1px solid #333; border-radius:10px; background:rgba(7,7,7,.98); box-shadow:0 20px 55px rgba(0,0,0,.65); overflow:hidden; backdrop-filter:blur(14px); }
        .beat-selector-tools { padding:10px; border-bottom:1px solid #202020; background:#0a0a0a; }
        .beat-selector-tools input { width:100%; box-sizing:border-box; padding:8px 10px; border:1px solid #292929; outline:none; background:#111; color:#fff; font-size:9px; letter-spacing:.11em; text-transform:uppercase; }
        .beat-selector-tools input:focus { border-color:#e50914; }
        .beat-selector-filters { display:flex; gap:6px; margin-top:7px; }
        .beat-selector-filters button { flex:1; padding:7px 6px; border:1px solid #242424; background:#101010; color:#666; font-size:7px; letter-spacing:.14em; cursor:pointer; }
        .beat-selector-filters button:hover,.beat-selector-filters button.active { color:#fff; border-color:#e50914; background:#160606; }
        .beat-selector-list { max-height:190px; overflow-y:auto; }
        .beat-selector-option { width:100%; min-height:40px; display:grid; grid-template-columns:22px minmax(0,1fr) 72px 52px; align-items:center; gap:8px; padding:8px 12px; border:0; border-bottom:1px solid #181818; background:#090909; color:#777; cursor:pointer; text-align:left; }
        .beat-selector-option:last-child { border-bottom:0; }
        .beat-selector-option:hover,.beat-selector-option.selected { background:linear-gradient(90deg,#160606,#090909); color:#fff; }
        .beat-selector-option-icon { color:#555; font-size:9px; }
        .beat-selector-option.selected .beat-selector-option-icon { color:#e50914; }
        .beat-selector-option-title { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:#ddd; font-size:9px; }
        .beat-selector-option-meta,.beat-selector-option-bpm { color:#666; font-size:8px; text-align:right; white-space:nowrap; }
        .beat-selector-option.selected .beat-selector-option-meta,.beat-selector-option.selected .beat-selector-option-bpm { color:#aaa; }
        .beat-selector-empty { padding:20px 12px; color:#555; text-align:center; font-size:8px; letter-spacing:.13em; }

        /* GALAXY FIRE BEATS MARKETPLACE */
        .beats-marketplace { background:#050505; padding:90px 5%; border-top:1px solid #1b1b1b; overflow:hidden; }
        .beats-shell { max-width:1320px; margin:0 auto; }
        .beats-heading { display:flex; justify-content:space-between; align-items:flex-end; gap:40px; margin-bottom:38px; }
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
        .vinyl-player.playing .vinyl-platter { box-shadow:0 0 0 8px #111,0 0 0 11px #2a2a2a,0 0 90px rgba(229,9,20,.38); }
        .tonearm { transition:transform .65s cubic-bezier(.22,.61,.36,1), filter .3s ease; }
        .tonearm.playing, .tonearm.slowing { transform:rotate(58deg); filter:brightness(1.08); }
        .tonearm.stopped { transform:rotate(43deg); }
        .beat-feature-info { padding:44px 42px 38px; display:flex; flex-direction:column; justify-content:center; }
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
        .beat-sold-tag { color:#e50914; border:1px solid #5c1a1a; padding:4px 6px; font-style:normal; font-size:7px; letter-spacing:.1em; }
        .beat-row-title i { display:grid; place-items:center; width:30px; height:30px; border:1px solid #292929; border-radius:50%; background:#101010; color:#fff; font-style:normal; font-size:9px; }
        .beat-row.selected .beat-row-title i { border-color:#e50914; color:#e50914; }
        .beat-row > span:not(.beat-row-title) { font-size:9px; }
        .beat-row-action { justify-self:end; background:none; border:0; cursor:pointer; padding:8px 0; color:#e50914 !important; font-size:8px !important; letter-spacing:.12em; font-weight:700; }
        @media (max-width: 1000px) {
          .beat-checkout-modal { padding:30px 22px; }
          .beat-checkout-form { grid-template-columns:1fr; }
          .beat-checkout-form label.wide { grid-column:auto; }
          .beats-heading { flex-direction:column; align-items:flex-start; }
          .beats-search-wrap { width:100%; }
          .beat-feature { grid-template-columns:1fr; }
          .vinyl-player { min-height:520px; border-right:0; border-bottom:1px solid #222; }
          .beat-feature-info { padding:40px 30px; }
          .beat-license-grid { grid-template-columns:repeat(2,1fr); }
        }
        @media (max-width: 700px) {
          .beats-marketplace { padding:90px 6%; }
          .beats-heading-note { width:100%; align-items:flex-start; text-align:left; }
          .vinyl-player { min-height:520px; }
          .vinyl-platter { width:74%; }
          .tonearm { width:130px; right:2%; top:13%; }
          .beat-selector { width:100%; margin-bottom:22px; }
          .beat-selector-meta { display:none; }
          .beat-selector-option { grid-template-columns:20px minmax(0,1fr) 58px; }
          .beat-selector-option-bpm { display:none; }
          .beat-selector-list { max-height:175px; }
          .beat-feature-info { padding:32px 20px; }
          .beat-meta { grid-template-columns:repeat(2,1fr); }
          .beat-license-grid { grid-template-columns:1fr 1fr; }
        }

        /* GALAXY FIRE PRO AUDIO STORE */
        .beat-license-grid > div.chosen { border-color:#e50914; background:#130606; }
        .beat-license-grid > div.sold { opacity:.58; }
        .beat-license-grid button:disabled { cursor:not-allowed; border-color:#333; background:#090909; color:#555; }
        .beat-sold-banner { margin-top:14px; padding:12px 14px; border:1px solid #4b1a1a; background:#120606; color:#d66; font-size:9px; letter-spacing:.1em; line-height:1.6; }
        .beat-purchase-success,.beat-purchase-error { margin-top:14px; padding:12px 14px; font-size:10px; line-height:1.6; }
        .beat-purchase-success { border:1px solid #285f35; background:#07140a; color:#7ee69a; }
        .beat-purchase-error { border:1px solid #6a2222; background:#170707; color:#ff8585; }
        .beat-checkout-overlay { position:fixed; inset:0; z-index:10000; display:grid; place-items:center; padding:24px; background:rgba(0,0,0,.82); backdrop-filter:blur(12px); }
        .beat-checkout-modal { position:relative; width:min(680px,100%); max-height:90vh; overflow:auto; padding:44px; border:1px solid #2a2a2a; background:#080808; box-shadow:0 40px 120px rgba(0,0,0,.65); }
        .beat-checkout-modal h3 { font-size:clamp(34px,5vw,58px); line-height:1; margin:14px 0 8px; }
        .beat-checkout-license { color:#e50914; font-size:11px; letter-spacing:.12em; font-weight:700; }
        .beat-checkout-form { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin:28px 0; }
        .beat-checkout-form label { display:flex; flex-direction:column; gap:7px; color:#777; font-size:9px; letter-spacing:.12em; }
        .beat-checkout-form label.wide { grid-column:1 / -1; }
        .beat-checkout-form input { width:100%; box-sizing:border-box; background:#0d0d0d; border:1px solid #292929; color:#fff; padding:14px; outline:none; }
        .beat-checkout-form input:focus { border-color:#e50914; }
        .beat-checkout-summary { display:flex; justify-content:space-between; align-items:center; padding:18px 0; border-top:1px solid #242424; border-bottom:1px solid #242424; margin-bottom:18px; color:#777; font-size:9px; letter-spacing:.12em; }
        .beat-checkout-summary strong { color:#fff; font-size:22px; letter-spacing:0; }
        .store-section { background:#080808; padding:110px 6%; border-top:1px solid #1d1d1d; }
        .store-shell { max-width:1400px; margin:0 auto; }
        .store-heading { max-width:780px; margin-bottom:45px; }
        .store-heading p { max-width:650px; color:#888; line-height:1.8; margin-top:20px; }
        .store-topbar { display:flex; justify-content:space-between; gap:20px; align-items:flex-start; margin-bottom:30px; }
        .store-categories { display:flex; gap:8px; flex-wrap:wrap; }
        .store-filter,.cart-button { background:#111; color:#aaa; border:1px solid #292929; padding:11px 14px; text-transform:uppercase; font-size:10px; letter-spacing:.12em; cursor:pointer; }
        .store-filter:hover,.store-filter.active { color:#fff; border-color:#e50914; }
        .cart-button { color:#fff; min-width:120px; }
        .cart-button span { display:inline-grid; place-items:center; width:22px; height:22px; margin-left:7px; border-radius:50%; background:#e50914; font-size:9px; }
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

        /* CURRENT PHASE REFINEMENTS */
        .nav { height: 94px; padding: 0 4.5%; }
        .logo { gap: 15px; }
        .logo-img { width: 60px; height: 60px; }
        .logo-title { font-size: 18px; letter-spacing: 2.2px; }
        .logo-sub { font-size: 9px; letter-spacing: 2.2px; }
        .nav-links { gap: 30px; font-size: 12px; }
        .nav-button { padding: 14px 24px; }

        /* Photography autoplay / touch-hold */
        .visual-slider { position: relative; }
        .visual-slider-status { margin-top: 12px; text-align: center; color: #555; font-family: 'Barlow Condensed', sans-serif; font-size: 8px; font-weight: 700; letter-spacing: .18em; transition: color .2s; }
        .visual-slider.paused .visual-slider-status { color: #aaa; }
        .visual-grid { user-select: none; -webkit-user-select: none; }
        .visual-grid img { -webkit-user-drag: none; }

        /* Realistic vinyl deck motion */
        .vinyl-player { perspective: 900px; }
        .vinyl-platter { will-change: transform; }
        .vinyl-grooves::after { content: ""; position: absolute; left: 50%; top: 50%; width: 10px; height: 10px; transform: translate(-50%,-50%); border-radius: 50%; background: radial-gradient(circle,#d8d8d8 0 18%,#555 19% 40%,#111 41% 100%); box-shadow: 0 0 0 2px #090909, 0 0 0 3px #555; }
        .tonearm { transition: transform 1s cubic-bezier(.22,.61,.36,1), filter .3s; }
        .tonearm.stopped { transform: rotate(43deg); }
        .tonearm.playing { transform: rotate(20deg); filter: brightness(1.12); }
        .tonearm.slowing { transform: rotate(32deg); }
        .vinyl-player.playing .vinyl-label { box-shadow: 0 0 0 5px #090909,0 0 32px rgba(229,9,20,.24); }
        .vinyl-play { transition: transform .2s, background .2s, border-color .2s; }
        .vinyl-play:hover { transform: scale(1.06); }

        /* FOR THE CULTURE visual language */
        .culture { position: relative; isolation: isolate; overflow: hidden; background: radial-gradient(circle at 12% 20%, rgba(120,35,150,.22), transparent 34%), radial-gradient(circle at 88% 75%, rgba(75,25,115,.18), transparent 38%), #0a0a0a; }
        .culture-artwork { position: absolute; z-index: 0; top: 0; right: -80px; width: min(48vw, 650px); height: min(48vw, 650px); background-position: center; background-size: cover; background-repeat: no-repeat; opacity: .10; filter: saturate(1.2) contrast(1.05); mask-image: radial-gradient(circle, #000 35%, transparent 75%); -webkit-mask-image: radial-gradient(circle, #000 35%, transparent 75%); pointer-events: none; }
        .culture > *:not(.culture-artwork) { position: relative; z-index: 1; }
        .culture .section-number, .culture .eyebrow { color: #b66cff; }
        .culture h2 span { color: #b66cff; }
        .culture-card { background: linear-gradient(145deg, rgba(24,18,30,.96), rgba(12,12,12,.96)); border-color: #30243a; }
        .culture-card::after { background: rgba(155,70,210,.14); }
        .culture-card:hover { border-color: #9d4edd; background: linear-gradient(145deg,#1d1524,#111); }
        .culture-card-featured { border-color: #9d4edd; background: linear-gradient(145deg,rgba(42,20,55,.96),rgba(13,10,16,.96)); }
        .culture-card-number, .culture-card strong { color: #b66cff; }
        .culture-statement { border-color: #30243a; background: linear-gradient(135deg,rgba(24,18,30,.94),#111); }
        #radio { background: radial-gradient(circle at 82% 35%, rgba(130,45,175,.20), transparent 32%), #0b0b0b; }
        #radio .section-number { color: #b66cff; }
        #radio h2 span { color: #b66cff; }
        #blog { background: radial-gradient(circle at 18% 65%, rgba(95,35,140,.16), transparent 32%), #080808; }
        #blog .section-number { color: #b66cff; }
        #blog h2 span { color: #b66cff; }
        .beats-marketplace { background: radial-gradient(circle at 50% 0%, rgba(95,30,125,.10), transparent 35%), #050505; }
        .beats-marketplace .section-number { color: #b66cff; }

        /* More compact PRO AUDIO store without shrinking usability */
        .store-section { padding: 78px 5%; }
        .store-heading { margin-bottom: 30px; }
        .store-heading p { margin-top: 14px; line-height: 1.65; }
        .store-topbar { margin-bottom: 22px; }
        .store-categories { gap: 6px; }
        .store-filter, .cart-button { padding: 9px 11px; font-size: 9px; }
        .store-grid { gap: 12px; }
        .product-image-wrap { aspect-ratio: 1.12 / 1; }
        .product-info { padding: 14px; }
        .product-category { margin-bottom: 6px; font-size: 8px; }
        .product-info h3 { font-size: 17px; margin-bottom: 7px; }
        .product-info p { font-size: 11px; line-height: 1.45; min-height: 48px; margin-bottom: 12px; }
        .product-bottom strong { font-size: 16px; }
        .add-button { padding: 9px 10px; font-size: 8px; }
        .product-info small { margin-top: 9px; font-size: 8px; }

        /* Prevent mobile browser input zoom and keep beat selection comfortable */
        @media (max-width: 900px) {
          .nav { height: 88px; }
          .nav-links { top: 88px; max-height: calc(100vh - 88px); }
          .logo-img { width: 56px; height: 56px; }
          .logo-title { font-size: 17px; }
        }
        @media (max-width: 700px) {
          .beat-selector-tools input, .beat-selector-trigger { font-size: 16px; }
          .beat-selector-trigger { min-height: 56px; }
          .beat-selector-current small, .beat-selector-option-title, .beat-selector-option-meta, .beat-selector-option-bpm { font-size: 11px; }
          .beat-selector-option { min-height: 48px; }
          .beat-selector-tools input { min-height: 44px; }
          .store-section { padding: 70px 5%; }
          .store-heading { margin-bottom: 24px; }
          .store-topbar { gap: 12px; margin-bottom: 18px; }
          .store-filter, .cart-button { padding: 8px 9px; font-size: 8px; }
          .product-info { padding: 12px; }
          .product-info h3 { font-size: 16px; }
          .product-info p { min-height: 0; }
          .product-bottom { align-items: flex-end; flex-direction: column; }
          .add-button { width: 100%; }
          .culture-artwork { right: -170px; width: 500px; height: 500px; opacity: .08; }
        }
        @media (min-width: 1400px) {
          .store-grid { grid-template-columns: repeat(5,1fr); }
        }
        .culture-live-story-card { min-height: 100%; }
        .culture-live-story-card { position:relative; overflow:hidden; }
        .culture-live-story-card::after { content:""; position:absolute; inset:0; pointer-events:none; background:linear-gradient(180deg, transparent 44%, rgba(8,5,12,.22) 72%, rgba(8,5,12,.72) 100%); opacity:.72; transition:opacity .35s ease; }
        .culture-live-story-card:hover::after { opacity:.48; }
        .culture-live-story-card img { width:100%; aspect-ratio: 16 / 10; object-fit:cover; display:block; background:#111; }
        .culture-live-story-card img { mask-image: linear-gradient(to bottom, #000 76%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, #000 76%, transparent 100%); transition: transform .35s ease, filter .35s ease, opacity .35s ease; }
        .culture-live-story-card:hover img { transform: scale(1.025); filter: saturate(.92) contrast(1.08); }
        .culture-image-fallback { object-fit: cover !important; filter: saturate(.55) contrast(1.08) !important; opacity: .9; }
        .culture-story-no-image { width:100%; aspect-ratio:16 / 10; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,#130d1b,#050505); color:#a96cff; font-size:12px; font-weight:800; letter-spacing:.16em; }
        .culture-story-card p,.culture-feature-panel p,.culture-radio-card p,.culture-video-copy small,.culture-event-row small,.culture-music-row small { color:#777; font-size:10px; line-height:1.5; margin:6px 0 0; display:block; }
        .culture-story-byline { display:block; color:#555; margin-top:10px; font-size:9px; letter-spacing:.4px; }
        .culture-radio-story-image { width:100%; height:150px; object-fit:cover; display:block; margin-bottom:14px; filter:saturate(.75) contrast(1.05); mask-image: linear-gradient(to bottom, #000 80%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, #000 80%, transparent 100%); }
        .culture-radio-promo { position:relative; overflow:hidden; min-height:300px; }
        .culture-radio-promo-image { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:saturate(.55) contrast(1.15); opacity:.5; }
        .culture-radio-promo::after { content:""; position:absolute; inset:0; background:linear-gradient(90deg,rgba(0,0,0,.96),rgba(0,0,0,.45),rgba(30,0,45,.25)); }
        .culture-radio-promo-copy { position:relative; z-index:2; padding:28px; max-width:420px; }
        .culture-feature-link { display:block; }
        .culture-video-feature { display:block; min-height:260px; background:#090909; }
        .culture-video-feature .culture-editorial-visual-fallback { position:absolute; inset:0; }
        .culture-video-copy { position:absolute; z-index:2; left:14px; right:14px; bottom:13px; padding:14px; background:linear-gradient(transparent,rgba(0,0,0,.94)); padding-top:50px; }
        .culture-video-copy strong { display:block; font-family:'Barlow Condensed',sans-serif; font-size:22px; line-height:.95; }
        .culture-video-copy small { color:#bbb; }
        .culture-editorial-visual-fallback { width:100%; height:100%; min-height:150px; display:grid; place-items:center; background:radial-gradient(circle at 65% 35%,rgba(155,92,255,.35),transparent 32%),linear-gradient(135deg,#080808,#160d20 55%,#050505); color:#b66cff; font-family:'Barlow Condensed',sans-serif; font-size:30px; line-height:.82; font-weight:900; letter-spacing:1px; text-align:center; }
        .culture-editorial-empty .culture-editorial-visual-fallback { min-height:570px; }
        .culture-panel-empty { min-height:130px; display:grid; place-items:center; padding:24px; border:1px dashed #29212f; color:#666; text-align:center; font-size:10px; letter-spacing:1px; line-height:1.5; }
        .culture-music-no-image { width:52px; height:52px; display:grid; place-items:center; background:#140d1b; color:#b66cff; font-size:11px; font-weight:900; }
        .culture-editorial-row { min-height:76px; }
        .culture-editorial-row b { width:42px; height:42px; display:grid; place-items:center; border:1px solid #3a214c; color:#b66cff; font-size:9px; }
        .culture-editorial-row span { color:#b66cff; font-size:9px; font-weight:900; }
        .culture-editorial-state { grid-column:1 / -1; min-height:190px; display:flex; align-items:center; gap:18px; padding:28px; border:1px solid #25202b; background:#090909; }
        .culture-editorial-state-mark { width:34px; height:34px; border-radius:50%; display:grid; place-items:center; color:#9b5cff; background:#1a1026; box-shadow:0 0 24px rgba(155,92,255,.2); }
        .culture-editorial-state.loading .culture-editorial-state-mark { animation:culturePulse 1.2s ease-in-out infinite; }
        .culture-editorial-state strong { font-size:13px; letter-spacing:.12em; }
        .culture-editorial-state p { margin:7px 0 0; color:#888; font-size:13px; line-height:1.6; max-width:620px; }
        @keyframes culturePulse { 50% { transform:scale(.72); opacity:.45; } }

        /* FOR THE CULTURE — editorial platform homepage */
        .culture-platform { background:#050505; color:#fff; overflow:hidden; border-top:1px solid #171717; }
        .culture-platform-topline { min-height:38px; padding:0 4.5%; display:flex; align-items:center; justify-content:space-between; gap:20px; border-bottom:1px solid #1d1d1d; color:#9f9f9f; font-family:'Barlow Condensed',sans-serif; font-size:9px; font-weight:900; letter-spacing:1.5px; }
        .culture-platform-live { color:#fff; }
        .culture-platform-live::first-letter { color:#e50914; }
        .culture-platform-shell { display:grid; grid-template-columns:250px minmax(0,1fr); max-width:1500px; margin:0 auto; }
        .culture-brand-rail { padding:38px 26px 45px 4.5%; border-right:1px solid #222; background:linear-gradient(180deg,#090909,#050505); position:relative; }
        .culture-brand-art { width:100%; aspect-ratio:1; object-fit:cover; object-position:center; display:block; filter:contrast(1.05) saturate(1.05); mix-blend-mode:screen; opacity:.92; }
        .culture-brand-kicker { margin-top:14px; color:#b66cff; font-family:'Barlow Condensed',sans-serif; font-weight:900; font-size:11px; letter-spacing:1.8px; }
        .culture-brand-rail p { color:#6d6d6d; font-size:12px; line-height:1.7; margin:15px 0 0; max-width:190px; }
        .culture-platform-main { min-width:0; padding:0 4.5% 55px; }
        .culture-platform-nav { height:70px; display:flex; align-items:center; gap:24px; overflow:auto; white-space:nowrap; border-bottom:1px solid #1c1c1c; scrollbar-width:none; }
        .culture-platform-nav::-webkit-scrollbar { display:none; }
        .culture-platform-nav a { color:#a2a2a2; font-family:'Barlow Condensed',sans-serif; font-size:11px; font-weight:900; letter-spacing:1.2px; padding:27px 0 24px; border-bottom:2px solid transparent; transition:color .2s,border-color .2s; }
        .culture-platform-nav a:hover,.culture-platform-nav a.active { color:#fff; border-color:#b66cff; }
        .culture-hero-story { position:relative; display:grid; grid-template-columns:.88fr 1.5fr; min-height:570px; border-bottom:1px solid #242424; overflow:hidden; background:#090909; }
        .culture-hero-copy { align-self:center; padding:65px 35px 65px 0; position:relative; z-index:2; }
        .culture-label,.culture-story-card span,.culture-feature-image span,.culture-radio-promo-copy>span,.culture-manifesto>div>span { color:#b66cff; font-family:'Barlow Condensed',sans-serif; font-size:9px; font-weight:900; letter-spacing:2px; }
        .culture-hero-copy h2 { margin:16px 0 22px; font-family:'Barlow Condensed',sans-serif; font-size:clamp(58px,6.4vw,102px); line-height:.82; letter-spacing:-2px; font-weight:900; }
        .culture-hero-copy h2 em { color:#b66cff; font-style:normal; }
        .culture-hero-copy p { max-width:430px; color:#999; font-size:14px; line-height:1.7; margin:0 0 27px; }
        .culture-action { display:inline-flex; align-items:center; gap:14px; padding:12px 17px; background:#8f35dc; color:#fff; font-family:'Barlow Condensed',sans-serif; font-size:10px; font-weight:900; letter-spacing:1.1px; transition:transform .2s,background .2s; }
        .culture-action:hover { background:#b66cff; transform:translateY(-2px); }
        .culture-hero-image-wrap { position:relative; min-width:0; overflow:hidden; }
        .culture-hero-image { width:100%; height:100%; min-height:570px; object-fit:cover; object-position:center; display:block; filter:saturate(.78) contrast(1.12); transition: transform .6s ease, filter .4s ease; }
        .culture-hero-story:hover .culture-hero-image { transform: scale(1.018); filter:saturate(.9) contrast(1.08); }
        .culture-hero-image-wrap::after { content:""; position:absolute; inset:0; background:linear-gradient(90deg,#090909 0%,rgba(9,9,9,.12) 38%,rgba(10,4,16,.08) 100%),linear-gradient(0deg,rgba(0,0,0,.45),transparent 45%); }
        .culture-hero-stamp { position:absolute; z-index:2; right:25px; bottom:27px; color:#b66cff; font-family:'Barlow Condensed',sans-serif; font-size:27px; line-height:.83; font-weight:900; font-style:italic; letter-spacing:-1px; transform:rotate(-7deg); text-align:right; text-shadow:0 4px 20px #000; }
        .culture-hero-controls { position:absolute; z-index:3; bottom:22px; left:0; display:flex; gap:7px; }
        .culture-hero-controls span { width:24px; height:2px; background:#555; }
        .culture-hero-controls span.active { background:#b66cff; width:44px; }
        .culture-content-grid { display:grid; grid-template-columns:minmax(0,2fr) minmax(280px,1fr); gap:18px; padding-top:20px; }
        .culture-stories-block,.culture-radio-card,.culture-panel { border:1px solid #242424; background:#090909; }
        .culture-stories-block { padding:18px; }
        .culture-section-head { display:flex; align-items:center; justify-content:space-between; gap:15px; margin-bottom:16px; }
        .culture-section-head h3 { margin:0; font-family:'Barlow Condensed',sans-serif; font-size:17px; letter-spacing:1px; font-weight:900; }
        .culture-section-head a { color:#b66cff; font-family:'Barlow Condensed',sans-serif; font-size:8px; font-weight:900; letter-spacing:1.4px; }
        .culture-story-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
        .culture-story-card { background:#101010; border:1px solid #1e1e1e; min-width:0; transition:transform .2s,border-color .2s; }
        .culture-story-card:hover { transform:translateY(-3px); border-color:#6e3c90; }
        .culture-story-card img { width:100%; aspect-ratio:1.25/1; object-fit:cover; display:block; filter:saturate(.75) contrast(1.05); }
        .culture-story-card div { position:relative; z-index:1; padding:12px; background:linear-gradient(180deg, rgba(16,16,16,.94), #101010); }
        .culture-story-card h4 { margin:7px 0 12px; font-family:'Barlow Condensed',sans-serif; font-size:18px; line-height:.95; letter-spacing:.2px; }
        .culture-story-card small { color:#555; font-size:9px; }
        .culture-radio-card { padding:18px; background:radial-gradient(circle at 85% 10%,rgba(143,53,220,.18),transparent 35%),#090909; }
        .culture-on-air { display:flex; align-items:center; justify-content:space-between; padding:9px 10px; margin:4px 0 25px; background:#151515; border-left:2px solid #e50914; }
        .culture-on-air span { color:#ff4a52; font-family:'Barlow Condensed',sans-serif; font-size:8px; font-weight:900; letter-spacing:1.4px; }
        .culture-on-air small { color:#555; font-size:8px; }
        .culture-radio-card h4 { margin:0 0 12px; font-family:'Barlow Condensed',sans-serif; font-size:40px; line-height:.82; }
        .culture-radio-card p { color:#777; font-size:12px; line-height:1.6; }
        .culture-waveform { height:48px; display:flex; align-items:center; justify-content:center; gap:4px; margin:20px 0; }
        .culture-waveform i { display:block; width:3px; height:20px; background:#9d4edd; opacity:.8; animation:culturePulse 1.1s ease-in-out infinite alternate; }
        .culture-waveform i:nth-child(2n){height:34px;animation-delay:.12s}.culture-waveform i:nth-child(3n){height:12px;animation-delay:.22s}.culture-waveform i:nth-child(5n){height:43px;animation-delay:.3s}
        @keyframes culturePulse { from{transform:scaleY(.55);opacity:.35} to{transform:scaleY(1);opacity:1} }
        .culture-radio-button { display:flex; align-items:center; justify-content:space-between; padding:13px 15px; background:#8f35dc; color:#fff; font-family:'Barlow Condensed',sans-serif; font-size:10px; font-weight:900; letter-spacing:1.2px; }
        .culture-next { margin-top:18px; border-top:1px solid #202020; padding-top:15px; display:grid; gap:4px; }
        .culture-next span { color:#555; font-family:'Barlow Condensed',sans-serif; font-size:8px; letter-spacing:1.5px; }
        .culture-next strong { font-size:11px; }.culture-next small{color:#555;font-size:9px}
        .culture-platform-columns { display:grid; grid-template-columns:1fr 1.35fr 1fr; gap:18px; margin-top:18px; }
        .culture-platform-columns.lower { grid-template-columns:1.15fr 1fr 1.1fr; }
        .culture-panel { padding:18px; min-width:0; }
        .culture-music-row { display:grid; grid-template-columns:52px 1fr 28px; align-items:center; gap:11px; padding:10px 0; border-bottom:1px solid #1b1b1b; }
        .culture-music-row img { width:52px; height:52px; object-fit:cover; }.culture-music-row strong{display:block;font-size:11px;line-height:1.15}.culture-music-row small{display:block;color:#555;font-size:8px;margin-top:5px}.culture-play{width:27px;height:27px;border:1px solid #393939;border-radius:50%;display:grid;place-items:center;font-size:8px;color:#b66cff}
        .culture-panel-link { display:block; margin-top:16px; color:#b66cff; font-family:'Barlow Condensed',sans-serif; font-size:9px; font-weight:900; letter-spacing:1.4px; }
        .culture-feature-image { position:relative; margin-bottom:13px; }.culture-feature-image img{width:100%;height:190px;object-fit:cover;display:block;filter:saturate(.72)}.culture-feature-image span{position:absolute;left:10px;bottom:9px;background:#8f35dc;color:#fff;padding:5px 7px}
        .culture-feature-panel h4 { font-family:'Barlow Condensed',sans-serif; font-size:25px; line-height:.9; margin:0 0 10px; }.culture-feature-panel p{color:#777;font-size:11px;line-height:1.55;margin:0}
        .culture-radio-promo { padding:0; min-height:330px; position:relative; overflow:hidden; background:#0b0b0b; }.culture-radio-promo-art{position:absolute;inset:0}.culture-radio-promo-art img{width:100%;height:100%;object-fit:cover;opacity:.25;filter:contrast(1.2) saturate(1.2)}.culture-radio-promo-art::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#0a0710 5%,rgba(10,7,16,.55),rgba(10,7,16,.2))}.culture-radio-promo-copy{position:relative;z-index:1;padding:22px;display:flex;flex-direction:column;justify-content:flex-end;height:100%;box-sizing:border-box}.culture-radio-promo-copy h3{font-family:'Barlow Condensed',sans-serif;font-size:49px;line-height:.78;margin:15px 0 22px}.culture-radio-promo-copy em{color:#b66cff;font-style:normal}.culture-radio-promo-copy .culture-action{align-self:flex-start}
        .culture-video-feature { position:relative; overflow:hidden; }.culture-video-feature img{width:100%;height:260px;object-fit:cover;filter:saturate(.75)}.culture-video-feature button{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:54px;height:54px;border-radius:50%;border:1px solid #fff;background:rgba(0,0,0,.45);color:#fff;cursor:pointer}.culture-video-feature span{position:absolute;left:12px;bottom:12px;color:#b66cff;font-family:'Barlow Condensed',sans-serif;font-size:9px;font-weight:900;letter-spacing:1.5px}
        .culture-event-row { display:grid; grid-template-columns:48px 1fr auto; gap:10px; align-items:center; padding:15px 0; border-bottom:1px solid #1d1d1d; }.culture-event-row>b{color:#b66cff;font-family:'Barlow Condensed',sans-serif;font-size:9px;line-height:1}.culture-event-row>b strong{font-size:23px}.culture-event-row div strong,.culture-event-row div small{display:block}.culture-event-row div strong{font-size:11px}.culture-event-row div small{color:#555;font-size:8px;margin-top:4px}.culture-event-row>a{color:#b66cff;font-family:'Barlow Condensed',sans-serif;font-size:8px;font-weight:900}
        .culture-artist-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; }.culture-artist-grid a{position:relative;overflow:hidden;aspect-ratio:1/1}.culture-artist-grid img{width:100%;height:100%;object-fit:cover;filter:saturate(.65);transition:transform .3s}.culture-artist-grid a:hover img{transform:scale(1.06)}.culture-artist-grid span{position:absolute;left:6px;bottom:6px;color:#fff;font-family:'Barlow Condensed',sans-serif;font-size:7px;font-weight:900;letter-spacing:.8px;text-shadow:0 2px 8px #000}
        .culture-manifesto { margin-top:18px; padding:35px; display:grid; grid-template-columns:1fr 1.2fr auto; gap:35px; align-items:center; background:linear-gradient(105deg,#140d1a,#080808); border:1px solid #30243a; position:relative; overflow:hidden; }.culture-manifesto::before{content:"";position:absolute;right:-100px;top:-100px;width:300px;height:300px;border-radius:50%;background:rgba(143,53,220,.13);filter:blur(10px)}.culture-manifesto>div,.culture-manifesto>p,.culture-manifesto>a{position:relative;z-index:1}.culture-manifesto h3{font-family:'Barlow Condensed',sans-serif;font-size:52px;line-height:.8;margin:12px 0 0}.culture-manifesto h3 em{color:#b66cff;font-style:normal}.culture-manifesto p{color:#777;font-size:12px;line-height:1.7;margin:0}
        /* Performance: keep below-the-fold editorial work out of the initial paint. */
        .culture-platform-columns,.culture-platform-columns.lower,.culture-manifesto { content-visibility:auto; contain-intrinsic-size:420px; }
        .culture-story-card img,.culture-music-row img,.culture-feature-image img,.culture-video-feature img,.culture-artist-grid img { content-visibility:auto; }
        @media (max-width:1100px){.culture-platform-shell{grid-template-columns:190px minmax(0,1fr)}.culture-brand-rail{padding-left:25px}.culture-platform-columns{grid-template-columns:1fr 1fr}.culture-radio-promo{grid-column:1/-1;min-height:260px}.culture-platform-columns.lower{grid-template-columns:1fr 1fr}.culture-artist-grid{grid-template-columns:repeat(4,1fr)}.culture-manifesto{grid-template-columns:1fr 1fr}.culture-manifesto .culture-action{justify-self:start}}
        @media (max-width:800px){.culture-platform-topline{padding:0 5%;font-size:8px}.culture-platform-live{display:none}.culture-platform-shell{display:block}.culture-brand-rail{padding:20px 5%;border-right:0;border-bottom:1px solid #222;display:grid;grid-template-columns:85px 1fr;column-gap:16px;align-items:center}.culture-brand-art{width:85px;height:85px}.culture-brand-kicker{margin:0}.culture-brand-rail p{grid-column:2;margin:7px 0 0}.culture-platform-main{padding:0 5% 45px}.culture-platform-nav{height:56px;gap:20px}.culture-platform-nav a{padding:20px 0 17px}.culture-hero-story{grid-template-columns:1fr;min-height:0}.culture-hero-copy{padding:40px 0 20px;order:2}.culture-hero-image-wrap{order:1}.culture-hero-image{height:390px;min-height:390px}.culture-hero-copy h2{font-size:clamp(52px,15vw,82px)}.culture-hero-controls{left:0;bottom:auto;top:365px}.culture-content-grid,.culture-platform-columns,.culture-platform-columns.lower{grid-template-columns:1fr}.culture-story-grid{grid-template-columns:1fr 1fr}.culture-radio-promo{grid-column:auto}.culture-manifesto{grid-template-columns:1fr;gap:20px;padding:25px}.culture-manifesto h3{font-size:45px}}
        @media (max-width:520px){.culture-story-grid{grid-template-columns:1fr}.culture-story-card{display:grid;grid-template-columns:105px 1fr}.culture-story-card img{height:100%;min-height:130px}.culture-story-card h4{font-size:16px}.culture-story-card div{padding:10px}.culture-platform-nav{gap:17px}.culture-platform-nav a{font-size:10px}.culture-hero-image{height:320px;min-height:320px}.culture-hero-controls{top:295px}.culture-hero-stamp{font-size:20px}.culture-event-row{grid-template-columns:42px 1fr}.culture-event-row>a{display:none}.culture-artist-grid{grid-template-columns:repeat(2,1fr)}.culture-radio-promo-copy h3{font-size:43px}}
        /* FOR THE CULTURE — reduced, non-repetitive editorial layout */
        .culture-stories-block-wide { grid-column:1 / -1; }
        .culture-stories-block-wide .culture-section-head span, .culture-section-head > span { color:#555; font-family:'Barlow Condensed',sans-serif; font-size:8px; font-weight:900; letter-spacing:1.4px; }
        .culture-story-grid { grid-template-columns:repeat(3,minmax(0,1fr)); }
        .culture-story-card h4 { font-size:20px; }
        .culture-story-card p { min-height:44px; }
        .culture-desk-grid { grid-template-columns:1fr 1.35fr 1fr; align-items:stretch; }
        .culture-music-row div { min-width:0; }
        .culture-music-row em { display:block; color:#4d4d4d; font-style:normal; font-family:'Barlow Condensed',sans-serif; font-size:7px; font-weight:900; letter-spacing:1px; margin-top:6px; text-transform:uppercase; }
        .culture-feature-panel { display:flex; flex-direction:column; }
        .culture-feature-link { display:block; height:100%; }
        .culture-feature-link > small { color:#555; font-size:8px; }
        .culture-idea-panel { display:flex; flex-direction:column; justify-content:space-between; background:linear-gradient(145deg,#100a16,#080808); }
        .culture-idea-panel > span { color:#555; font-family:'Barlow Condensed',sans-serif; font-size:8px; font-weight:900; letter-spacing:2px; }
        .culture-idea-panel h3 { margin:28px 0 18px; font-family:'Barlow Condensed',sans-serif; font-size:44px; line-height:.78; letter-spacing:-1px; }
        .culture-idea-panel h3 em { color:#b66cff; font-style:normal; }
        .culture-idea-panel p { color:#777; font-size:11px; line-height:1.65; margin:0; }
        .culture-source-strip { margin-top:25px; padding-top:14px; border-top:1px solid #25202b; }
        .culture-source-strip small { display:block; color:#555; font-family:'Barlow Condensed',sans-serif; font-size:7px; font-weight:900; letter-spacing:1.5px; margin-bottom:6px; }
        .culture-source-strip strong { display:block; color:#8d8d8d; font-family:'Barlow Condensed',sans-serif; font-size:8px; line-height:1.4; letter-spacing:.7px; }
        .culture-more { margin-top:18px; padding:18px; border:1px solid #242424; background:#090909; }
        .culture-more-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; }
        .culture-more-card { display:grid; grid-template-columns:105px 1fr; min-width:0; background:#101010; border:1px solid #1e1e1e; transition:transform .2s,border-color .2s; }
        .culture-more-card:hover { transform:translateY(-2px); border-color:#6e3c90; }
        .culture-more-card img { width:105px; height:100%; min-height:145px; object-fit:cover; }
        .culture-more-card > div { padding:12px; }
        .culture-more-card span { color:#b66cff; font-family:'Barlow Condensed',sans-serif; font-size:8px; font-weight:900; letter-spacing:1.5px; }
        .culture-more-card h4 { margin:7px 0 8px; font-family:'Barlow Condensed',sans-serif; font-size:16px; line-height:.95; }
        .culture-more-card p { color:#666; font-size:9px; line-height:1.45; margin:0 0 9px; }
        .culture-more-card small { color:#444; font-size:7px; }
        @media (max-width:1100px){.culture-story-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.culture-desk-grid{grid-template-columns:1fr 1fr}.culture-idea-panel{grid-column:1/-1;min-height:240px}.culture-more-grid{grid-template-columns:1fr 1fr}}
        @media (max-width:800px){.culture-story-grid{grid-template-columns:1fr 1fr}.culture-desk-grid{grid-template-columns:1fr}.culture-idea-panel{grid-column:auto}.culture-more-grid{grid-template-columns:1fr}.culture-more-card{grid-template-columns:95px 1fr}.culture-more-card img{width:95px;min-height:125px}}
        @media (max-width:520px){.culture-story-grid{grid-template-columns:1fr}.culture-story-card{display:grid;grid-template-columns:105px 1fr}.culture-story-card img{height:100%;min-height:130px}.culture-story-card h4{font-size:16px}.culture-story-card div{padding:10px}.culture-idea-panel h3{font-size:39px}}

        /* FOR THE CULTURE RADIO — live station interface */
        .radio-station { background:#050505; color:#fff; padding:0 5% 105px; border-top:1px solid #171717; position:relative; overflow:hidden; }
        .radio-station::before { content:""; position:absolute; width:760px; height:520px; right:-260px; top:80px; background:radial-gradient(circle,rgba(229,9,20,.17),transparent 65%); pointer-events:none; }
        .radio-station-topline { min-height:58px; border-bottom:1px solid #1b1b1b; display:grid; grid-template-columns:auto auto 1fr; align-items:center; gap:18px; font-family:'Barlow Condensed',sans-serif; font-size:10px; font-weight:900; letter-spacing:1.7px; position:relative; z-index:1; }
        .radio-live-line { color:#e50914; }
        .radio-topline-right { text-align:right; color:#777; }
        .radio-hero-grid { max-width:1440px; margin:0 auto; padding:54px 0 30px; display:grid; grid-template-columns:minmax(260px,.58fr) minmax(620px,1.42fr); gap:55px; align-items:center; position:relative; z-index:1; }
        .radio-intro .section-number { color:#e50914; }
        .radio-intro h2 { font-family:'Barlow Condensed',sans-serif; font-size:clamp(72px,7vw,118px); line-height:.78; letter-spacing:-2px; margin:22px 0 26px; }
        .radio-intro h2 span { color:#e50914; }
        .radio-intro p { max-width:430px; color:#8a8a8a; font-size:15px; line-height:1.7; margin:0; }
        .radio-actions { display:flex; gap:12px; margin-top:28px; flex-wrap:wrap; }
        .radio-actions .button { cursor:pointer; }
        .radio-status-note { margin-top:18px; color:#555; font-family:'Barlow Condensed',sans-serif; font-size:8px; font-weight:900; letter-spacing:1.5px; }
        .radio-dot { display:inline-block; width:6px; height:6px; margin-right:8px; border-radius:50%; background:#555; }
        .radio-dot.live { background:#e50914; box-shadow:0 0 10px rgba(229,9,20,.7); }
        .radio-main-player { position:relative; overflow:hidden; border:1px solid #252525; border-radius:13px; background:linear-gradient(145deg,#161616,#090909 62%); box-shadow:0 25px 80px rgba(0,0,0,.42); }
        .radio-player-glow { position:absolute; width:500px; height:240px; left:35%; top:-140px; background:radial-gradient(circle,rgba(229,9,20,.32),transparent 68%); filter:blur(8px); pointer-events:none; }
        .radio-player-badge { position:relative; z-index:1; display:inline-block; margin:25px 25px 0; padding:7px 10px; background:#e50914; color:#fff; font-family:'Barlow Condensed',sans-serif; font-size:9px; font-weight:900; letter-spacing:1.4px; }
        .radio-player-body { position:relative; z-index:1; display:grid; grid-template-columns:245px 1fr 112px; gap:24px; align-items:center; padding:16px 25px 25px; }
        .radio-art-wrap { position:relative; aspect-ratio:1/1; overflow:hidden; background:#111; border:1px solid #282828; }
        .radio-art-wrap img { width:100%; height:100%; object-fit:cover; filter:saturate(.8) contrast(1.15); }
        .radio-art-overlay { position:absolute; left:12px; bottom:12px; padding:6px 8px; background:#e50914; font-family:'Barlow Condensed',sans-serif; font-size:9px; font-weight:900; letter-spacing:1px; }
        .radio-now-playing > span,.radio-player-footer span,.radio-panel-head span,.radio-source-note span { display:block; color:#e50914; font-family:'Barlow Condensed',sans-serif; font-size:8px; font-weight:900; letter-spacing:1.6px; }
        .radio-now-playing h3 { margin:12px 0 4px; font-family:'Barlow Condensed',sans-serif; font-size:45px; line-height:.9; letter-spacing:.5px; }
        .radio-now-playing > strong { color:#888; font-size:20px; font-weight:500; }
        .radio-waveform { height:55px; display:flex; align-items:center; gap:3px; margin:28px 0 12px; overflow:hidden; }
        .radio-waveform i { display:block; width:3px; min-height:7px; background:#e50914; opacity:.8; animation:radioWave 1.05s ease-in-out infinite alternate; transform-origin:center; }
        .radio-waveform i:nth-child(2n){animation-delay:.09s}.radio-waveform i:nth-child(3n){animation-delay:.18s}.radio-waveform i:nth-child(5n){animation-delay:.3s}
        .radio-waveform i:nth-child(4n){opacity:.45}
        @keyframes radioWave { from{transform:scaleY(.55)} to{transform:scaleY(1)} }
        .radio-meta { display:flex; gap:22px; color:#666; font-family:'Barlow Condensed',sans-serif; font-size:9px; font-weight:900; letter-spacing:1.4px; }
        .radio-meta b { color:#e50914; }
        .radio-big-play { width:112px; height:112px; border-radius:50%; border:1px solid #e50914; background:transparent; color:#fff; font-size:31px; cursor:pointer; transition:transform .2s,background .2s,box-shadow .2s; }
        .radio-big-play:hover { transform:scale(1.04); background:rgba(229,9,20,.08); box-shadow:0 0 35px rgba(229,9,20,.12); }
        .radio-player-footer { border-top:1px solid #282828; display:grid; grid-template-columns:1fr 1.35fr 1fr 1fr; gap:20px; padding:18px 25px; background:rgba(0,0,0,.22); }
        .radio-player-footer strong,.radio-player-footer small { display:block; }
        .radio-player-footer strong { margin-top:6px; font-family:'Barlow Condensed',sans-serif; font-size:16px; letter-spacing:.5px; }
        .radio-player-footer small { margin-top:2px; color:#666; font-size:9px; }
        .radio-volume { display:flex; align-items:center; gap:10px; justify-content:flex-end; }
        .radio-volume input { width:100px; accent-color:#e50914; }
        .radio-content-grid { max-width:1440px; margin:0 auto; display:grid; grid-template-columns:1fr 1.45fr 1fr; gap:12px; position:relative; z-index:1; }
        .radio-panel { min-width:0; border:1px solid #232323; background:#0b0b0b; padding:18px; }
        .radio-panel-head { display:flex; justify-content:space-between; align-items:center; gap:12px; padding-bottom:14px; border-bottom:1px solid #222; }
        .radio-panel-head h3 { margin:0; font-family:'Barlow Condensed',sans-serif; font-size:18px; letter-spacing:.7px; }
        .radio-track-row { display:grid; grid-template-columns:45px 1fr auto; gap:10px; align-items:center; padding:10px 0; border-bottom:1px solid #1d1d1d; }
        .radio-track-row img { width:45px; height:45px; object-fit:cover; filter:saturate(.7); }
        .radio-track-row strong,.radio-track-row small { display:block; }
        .radio-track-row strong { font-family:'Barlow Condensed',sans-serif; font-size:13px; }
        .radio-track-row small { color:#666; margin-top:3px; font-size:10px; }
        .radio-track-row > span { color:#555; font-family:'Barlow Condensed',sans-serif; font-size:8px; font-weight:900; letter-spacing:1px; }
        .radio-panel-button { width:100%; margin-top:14px; padding:12px; background:transparent; color:#fff; border:1px solid #2b2b2b; cursor:pointer; font-family:'Barlow Condensed',sans-serif; font-size:9px; font-weight:900; letter-spacing:1.3px; }
        .radio-schedule-row { display:grid; grid-template-columns:95px 1fr 1.2fr 42px; gap:12px; align-items:center; padding:14px 0; border-bottom:1px solid #1d1d1d; }
        .radio-schedule-row.current { margin:0 -8px; padding-left:8px; padding-right:8px; border:1px solid #651016; background:rgba(229,9,20,.04); }
        .schedule-time { color:#aaa; font-family:'Barlow Condensed',sans-serif; font-size:10px; font-weight:900; }
        .radio-schedule-row strong,.radio-schedule-row small { display:block; }
        .radio-schedule-row strong { font-family:'Barlow Condensed',sans-serif; font-size:13px; }
        .radio-schedule-row small,.radio-schedule-row p { color:#666; font-size:8px; margin:3px 0 0; line-height:1.35; }
        .schedule-state { color:#555; font-family:'Barlow Condensed',sans-serif; font-size:8px; font-weight:900; }
        .radio-schedule-row.current .schedule-state { color:#e50914; }
        .radio-connect { background:radial-gradient(circle at 85% 15%,rgba(229,9,20,.13),transparent 40%),#0b0b0b; }
        .radio-connect h4 { margin:28px 0 18px; font-family:'Barlow Condensed',sans-serif; font-size:43px; line-height:.8; }
        .radio-connect h4 em { color:#e50914; font-style:normal; }
        .radio-connect p { color:#777; font-size:11px; line-height:1.7; }
        .radio-source-note { margin-top:25px; padding-top:15px; border-top:1px solid #222; }
        .radio-source-note strong { display:block; margin-top:6px; font-family:'Barlow Condensed',sans-serif; font-size:12px; letter-spacing:.7px; }
        .radio-player-drawer { position:fixed; z-index:9998; left:0; right:0; bottom:0; min-height:72px; display:grid; grid-template-columns:58px minmax(170px,1fr) 52px minmax(120px,260px) 85px 34px; gap:15px; align-items:center; padding:8px 24px; border-top:1px solid #2b2b2b; background:rgba(7,7,7,.97); box-shadow:0 -10px 35px rgba(0,0,0,.35); backdrop-filter:blur(12px); }
        .radio-drawer-art img { width:55px; height:55px; object-fit:cover; }
        .radio-drawer-track span,.radio-drawer-track strong,.radio-drawer-track small { display:block; }
        .radio-drawer-track span { color:#e50914; font-family:'Barlow Condensed',sans-serif; font-size:7px; font-weight:900; letter-spacing:1.2px; }
        .radio-drawer-track strong { font-family:'Barlow Condensed',sans-serif; font-size:14px; margin-top:2px; }
        .radio-drawer-track small { color:#666; font-size:9px; margin-top:2px; }
        .radio-drawer-control { width:42px; height:42px; border-radius:50%; border:1px solid #e50914; background:transparent; color:#fff; cursor:pointer; }
        .radio-player-drawer input { width:100%; accent-color:#e50914; }
        .radio-drawer-quality { color:#666; font-family:'Barlow Condensed',sans-serif; font-size:9px; font-weight:900; letter-spacing:1px; }
        .radio-drawer-close { border:0; background:transparent; color:#666; font-size:25px; cursor:pointer; }
        @media (max-width:1100px){.radio-hero-grid{grid-template-columns:1fr;gap:30px}.radio-content-grid{grid-template-columns:1fr 1fr}.radio-connect{grid-column:1/-1}.radio-player-body{grid-template-columns:190px 1fr 90px}.radio-big-play{width:90px;height:90px}.radio-schedule-row{grid-template-columns:82px 1fr 1fr 40px}.radio-player-drawer{grid-template-columns:50px 1fr 45px 180px 70px 30px}}
        @media (max-width:800px){.radio-station{padding:0 5% 95px}.radio-station-topline{grid-template-columns:1fr auto}.radio-topline-right{display:none}.radio-hero-grid{padding-top:38px}.radio-intro h2{font-size:clamp(64px,16vw,100px)}.radio-player-body{grid-template-columns:145px 1fr;gap:18px}.radio-big-play{position:absolute;right:18px;top:18px;width:62px;height:62px;font-size:21px}.radio-now-playing{padding-right:55px}.radio-now-playing h3{font-size:34px}.radio-player-footer{grid-template-columns:1fr 1fr;gap:15px}.radio-volume{justify-content:flex-start}.radio-content-grid{grid-template-columns:1fr}.radio-connect{grid-column:auto}.radio-schedule-row{grid-template-columns:80px 1fr 42px}.radio-schedule-row p{display:none}.radio-player-drawer{grid-template-columns:45px 1fr 44px 100px 28px;gap:10px;padding:8px 12px}.radio-drawer-quality{display:none}.radio-drawer-art img{width:44px;height:44px}.radio-drawer-close{display:none}}
        @media (max-width:520px){.radio-station-topline{font-size:8px}.radio-player-body{grid-template-columns:1fr}.radio-art-wrap{max-width:260px}.radio-now-playing{padding-right:0}.radio-big-play{top:auto;bottom:20px;right:20px}.radio-player-footer{grid-template-columns:1fr}.radio-schedule-row{grid-template-columns:1fr 42px}.schedule-time{grid-column:1/-1}.radio-actions{flex-direction:column}.radio-actions .button{width:100%;text-align:center}.radio-player-drawer{grid-template-columns:42px 1fr 42px;padding:7px 10px}.radio-player-drawer input{display:none}}
      `}</style>
    </div>
  );
}
