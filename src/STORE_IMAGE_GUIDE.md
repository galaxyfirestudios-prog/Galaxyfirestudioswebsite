# Galaxy Fire Studios — Store Image Guide

The Store is wired into `App.tsx` with product data, categories, cart state and WhatsApp order handoff.

Each product currently uses an existing Galaxy Fire studio photo as a fast-loading visual fallback. Before production launch, replace the `image` field for each product with a locally hosted product photo from the manufacturer or an authorized distributor. This avoids hotlinking and avoids using unlicensed random Google images.

Recommended asset path:
`src/assets/store/<product-slug>.webp`

Recommended size:
- 1200 x 1200 px
- WebP
- 80–150 KB where possible
- Clean product-only background

The product data already contains the exact product name, category, market benchmark, Galaxy Fire price, stock level and badge so image replacement only requires changing the `image` field.
