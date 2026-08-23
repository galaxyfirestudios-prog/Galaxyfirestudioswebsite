# FOR THE CULTURE RADIO — initial station setup

The site now contains the live-radio interface and a persistent mini-player. The player is mounted at the application level, so navigation to Studio, Services, Visuals, For the Culture, Beats, Shop, etc. does not stop the radio stream.

## Default host

**DJ NEBULAE**

## Stream connection

The browser player reads `public/radio-config.json` at runtime. Put the final Icecast/Shoutcast/HLS-compatible stream URL in:

```json
{
  "streamUrl": "https://YOUR-RADIO-STREAM-URL",
  "host": "DJ NEBULAE",
  "bitrate": "128 KBPS",
  "autoplay": true
}
```

The current `streamUrl` is intentionally blank until the actual station stream exists. This keeps the interface functional without making the site request a nonexistent stream.

## Autoplay behavior

The player attempts to start automatically when a stream URL is configured. Modern browsers may block audible autoplay until the visitor interacts with the page. The implementation therefore also starts the stream on the first permitted user gesture, while remembering an explicit user pause in local storage.

## Next station phase

Once the stream provider/endpoint is chosen, connect it in `public/radio-config.json`. Then the next build can add live metadata (current song, artist artwork, show, recently played history), program scheduling, and optional chat without changing the persistent-player architecture.
