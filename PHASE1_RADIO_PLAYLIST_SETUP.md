# FOR THE CULTURE RADIO — Phase 1

This version uses a simple browser playlist engine rather than a hosted streaming service.

- Playlist source: `public/radio-playlist.json`
- Audio files: existing Galaxy Fire beat assets in `public/beats/`
- Host: DJ NEBULAE
- Tracks advance automatically when the current audio ends.
- The selected track and recently played list persist in localStorage.
- The audio element remains at application level, so navigation inside the SPA does not stop playback.
- Audible autoplay remains subject to browser autoplay policies. A first user gesture can start playback when autoplay is blocked.

To replace the demo rotation, edit `public/radio-playlist.json` and add audio files that Galaxy Fire Studios is authorized to broadcast. Do not use Spotify/SoundCloud/Audiomack streams as a rebroadcast source without the platform and rights-holder permissions needed for that use.
