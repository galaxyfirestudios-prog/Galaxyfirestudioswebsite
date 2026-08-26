FOR THE CULTURE — RADIO MOBILE/LOUDNESS PATCH

This patch is based on:
GalaxyFireStudios-FOR-THE-CULTURE-SINGLE-DESTINATION.zip

Changes:
1. Removes the FOR THE CULTURE RADIO auto-loudness / Web Audio processing completely.
2. Keeps the normal volume control.
3. Uses native HTML5 audio for radio playback.
4. Adds Media Session metadata and lock-screen play/pause/next-track controls where supported.
5. Does not pause radio when the page becomes hidden.
6. Attempts to recover playback when the browser returns from background suspension.

TERMINAL STEPS (from the project root):

Windows PowerShell:
  Copy-Item src\App.tsx src\App.tsx.before-radio-fix.tsx
  Copy-Item src\index.css src\index.css.before-radio-fix.css
  Expand-Archive -Force .\FOR-THE-CULTURE-RADIO-MOBILE-FIX-PATCH.zip .\radio-patch-temp
  Copy-Item .\radio-patch-temp\src\App.tsx .\src\App.tsx -Force
  Copy-Item .\radio-patch-temp\src\index.css .\src\index.css -Force
  Remove-Item .\radio-patch-temp -Recurse -Force
  npm install
  npm run build

IMPORTANT:
- Do not replace any other files from the patch.
- This patch does NOT create a real server-side radio stream. The current project still uses the generated MP3 playlist unless VITE_RADIO_STREAM_URL / public/radio-config.json points to a real stream.
- Browser/OS background policies still vary. Media Session + native audio is the correct web architecture, but a true 24/7 radio stream is the most reliable solution for uninterrupted lock-screen playback.
