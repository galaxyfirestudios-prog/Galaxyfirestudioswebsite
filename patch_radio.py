from pathlib import Path

path = Path("src/App.tsx")
text = path.read_text(encoding="utf-8")

old = """        const randomIndex = Math.floor(Math.random() * tracks.length);
        setRadioPlaylist(tracks);
        setRadioTrackIndex(randomIndex);
        try { localStorage.setItem("gfs-radio-track-index", String(randomIndex)); } catch {}"""

new = """        let restoredIndex = 0;
        try {
          const storedIndex = Number(localStorage.getItem("gfs-radio-track-index") || "0");
          if (Number.isInteger(storedIndex) && storedIndex >= 0 && storedIndex < tracks.length) {
            restoredIndex = storedIndex;
          }
        } catch {}
        setRadioPlaylist(tracks);
        setRadioTrackIndex(restoredIndex);
        try { localStorage.setItem("gfs-radio-track-index", String(restoredIndex)); } catch {}"""

if old not in text:
    print("ERROR: Target radio block was not found.")
    print("NO CHANGES WERE MADE.")
    raise SystemExit(1)

path.write_text(text.replace(old, new, 1), encoding="utf-8", newline="")
print("SUCCESS: Radio track restoration patch applied.")