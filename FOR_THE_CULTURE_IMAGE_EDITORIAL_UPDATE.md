# FOR THE CULTURE — Editorial Images + Longer Stories

This update preserves the working Gemini editorial engine and adds an automated visual enrichment layer.

## Image selection order
1. Image already supplied by the source RSS/Atom feed.
2. `og:image` from the original source article page.
3. `twitter:image` from the original source article page.
4. Wikimedia Commons search as a fallback, with image credit/source URL recorded.
5. Branded visual fallback in the FOR THE CULTURE UI when no suitable image is available.

The system does not use Google Images scraping. Source imagery remains attributed to the originating publication, and Wikimedia fallback imagery records its credit and source page.

## Editorial length
Gemini now targets roughly 450–700 words per story in 5–7 concise paragraphs. The supplied source material remains the factual boundary: the model is instructed not to invent facts or quotes.

## Visual presentation
Editorial images now receive cinematic crops, subtle saturation/contrast, gradient blending, hover motion, and dark overlays so photography integrates with the FOR THE CULTURE visual language instead of appearing as disconnected thumbnails.
