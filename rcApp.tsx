warning: in the working copy of 'src/App.tsx', LF will be replaced by CRLF the next time Git touches it
[1mdiff --git a/src/App.tsx b/src/App.tsx[m
[1mindex f9629ed..9bbe4fe 100755[m
[1m--- a/src/App.tsx[m
[1m+++ b/src/App.tsx[m
[36m@@ -108,6 +108,7 @@[m [mexport default function App() {[m
   const [cultureActiveTab, setCultureActiveTab] = useState("home");[m
   const [cultureReaderStory, setCultureReaderStory] = useState<any | null>(null);[m
   const radioAudioRef = useRef<HTMLAudioElement | null>(null);[m
[32m+[m[32m  const RADIO_POSITION_KEY = "gfs-radio-track-position";[m
   const radioLoadedSrcRef = useRef<string>("");[m
   const radioRecoveryTimerRef = useRef<number | null>(null);[m
   const [radioPlaying, setRadioPlaying] = useState(false);[m
[36m@@ -150,7 +151,6 @@[m [mexport default function App() {[m
       // Media Session is progressive enhancement; native audio remains the source of truth.[m
     }[m
   };[m
[31m-[m
   const [radioClock, setRadioClock] = useState(() => new Date());[m
   const currentProgramme = getCurrentProgramme(radioClock);[m
   const nextProgramme = getNextProgramme(radioClock);[m
[36m@@ -178,13 +178,35 @@[m [mexport default function App() {[m
     // current track when the listener presses PLAY again. Reloading audio.src[m
     // resets currentTime to 0, which made PAUSE → PLAY restart the song.[m
     const sameTrackLoaded = radioLoadedSrcRef.current === src && audio.src === new URL(src, window.location.href).href;[m
[31m-    if (!sameTrackLoaded) {[m
[31m-      audio.pause();[m
[31m-      audio.src = src;[m
[31m-      radioLoadedSrcRef.current = src;[m
[31m-      audio.preload = "auto";[m
[31m-      audio.load();[m
[31m-    }[m
[32m+[m[32m   if (!sameTrackLoaded) {[m
[32m+[m[32m  audio.pause();[m
[32m+[m[32m  audio.src = src;[m
[32m+[m[32m  radioLoadedSrcRef.current = src;[m
[32m+[m[32m  audio.preload = "auto";[m
[32m+[m
[32m+[m[32m  const savedTrackIndex = Number(localStorage.getItem("gfs-radio-track-index") || "-1");[m
[32m+[m[32m  const savedPosition = Number(localStorage.getItem(RADIO_POSITION_KEY) || "0");[m
[32m+[m
[32m+[m[32m  audio.addEventListener([m
[32m+[m[32m    "loadedmetadata",[m
[32m+[m[32m    () => {[m
[32m+[m[32m      if ([m
[32m+[m[32m        savedTrackIndex === index &&[m
[32m+[m[32m        Number.isFinite(savedPosition) &&[m
[32m+[m[32m        savedPosition > 0 &&[m
[32m+[m[32m        Number.isFinite(audio.duration) &&[m
[32m+[m[32m        savedPosition < audio.duration - 2[m
[32m+[m[32m      ) {[m
[32m+[m[32m        try {[m
[32m+[m[32m          audio.currentTime = savedPosition;[m
[32m+[m[32m        } catch {}[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    { once: true }[m
[32m+[m[32m  );[m
[32m+[m
[32m+[m[32m  audio.load();[m
[32m+[m[32m}[m
 [m
     try {[m
       await audio.play();[m
[36m@@ -296,10 +318,16 @@[m [mexport default function App() {[m
         const tracks = playlist.tracks.filter((track: any) => typeof track?.src === "string" && track.src);[m
         if (!tracks.length) throw new Error("Radio playlist contains no playable tracks");[m
 [m
[31m-        const randomIndex = Math.floor(Math.random() * tracks.length);[m
[32m+[m[32m        let restoredIndex = 0;[m
[32m+[m[32m        try {[m
[32m+[m[32m          const storedIndex = Number(localStorage.getItem("gfs-radio-track-index") || "0");[m
[32m+[m[32m          if (Number.isInteger(storedIndex) && storedIndex >= 0 && storedIndex < tracks.length) {[m
[32m+[m[32m            restoredIndex = storedIndex;[m
[32m+[m[32m          }[m
[32m+[m[32m        } catch {}[m
         setRadioPlaylist(tracks);[m
[31m-        setRadioTrackIndex(randomIndex);[m
[31m-        try { localStorage.setItem("gfs-radio-track-index", String(randomIndex)); } catch {}[m
[32m+[m[32m        setRadioTrackIndex(restoredIndex);[m
[32m+[m[32m        try { localStorage.setItem("gfs-radio-track-index", String(restoredIndex)); } catch {}[m
       } catch (error) {[m
         if (cancelled || attempt >= 2) {[m
           console.info("FOR THE CULTURE RADIO playlist could not be loaded.", error);[m
