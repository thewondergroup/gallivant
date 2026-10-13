# The Gallivant – test site

Five pages, with a shared header and footer:

| Page | File | Address once live |
|---|---|---|
| Homepage | `index.html` | `/` |
| Eat and Drink (includes The Bar, The Terrace, The Snug and Private dining) | `eat-and-drink/index.html` | `/eat-and-drink/` |
| Harry's | `eat-and-drink/harrys/index.html` | `/eat-and-drink/harrys/` |
| Christmas 2026 | `christmas/index.html` | `/christmas/` |
| Corporate events | `corporate-events/index.html` | `/corporate-events/` (same address as the current page) |

The Bar, The Terrace, The Snug and Private dining open inside the Eat and Drink page, at `/eat-and-drink/#/bar`, `#/terrace`, `#/snug` and `#/private-dining`.

## Putting it on GitHub Pages

1. On GitHub (thewondergroup), click **New repository**. Name it, for example `gallivant-test`, set it to **Public** and click **Create repository**.
2. On the new repository page, click **uploading an existing file**, or use **Add file → Upload files**.
3. Drag in everything inside this folder: `index.html`, `404.html`, `README.md`, and the `assets`, `eat-and-drink`, `christmas`, `plan` and `corporate-events` folders. Keep the folders as they are. `.nojekyll` is optional (it's hidden on a Mac, and the site works without it).
4. Click **Commit changes**.
5. Go to **Settings → Pages**. Under "Build and deployment", choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then click **Save**.
6. After a minute or two the site is live at `https://thewondergroup.github.io/gallivant-test/`, or whatever you named the repository.

To update a page later, upload the new file to the same place in the repository. It replaces the old one.

## Good to know

- **Hidden from Google:** every page is set to "noindex", so this test copy won't compete with the real site in search.
- **Hosted elsewhere:** photos, videos and the SangBleu and Euclid fonts load from the hotel's own website, so nothing extra needs uploading. The produce photos on the Harry's page come from Unsplash.
- **Font licences:** using the hotel's licensed fonts on a test domain is worth checking with whoever holds the licence before sharing the link widely.
- **Links:** every link between these pages works. Anything else, such as rooms, offers, gift cards and booking, goes to the hotel's live website or booking system.

## Corporate enquiry form

The enquiry form on `/corporate-events/` records which ad each enquiry came from (the `utm_campaign` tag, e.g. `corporate-offsites`) and fires a Meta `Lead` event and a Google Analytics `generate_lead` event when it's sent, if the Pixel and Analytics are on the page.

To make it save enquiries to a Google Sheet and email Holly, follow the steps at the top of `corporate-events/enquiry-form.gs`, then paste the web app URL into `var GVED_FORM_ENDPOINT=''` in `corporate-events/index.html`. Until then, sending the form opens an email to enquiries@thegallivant.co.uk with the details filled in.

Meta ads should link to the page with the campaign tag, for example:
`/corporate-events/?utm_source=meta&utm_medium=paid&utm_campaign=corporate-offsites&utm_content=ad1`

## Corporate walkthrough video

The corporate page plays the walkthrough as a silent loop behind the headline, and in full with sound from the "Watch the walkthrough" button. The files are in `corporate-events/media/`: a 1080p version (about 19MB) for desktop and a 720p version (about 10MB) for phones and data-saver mode, both cut down from the 400MB 4K original. When the page moves to WordPress, upload both files and the poster image to the media library and update the `media/` paths in the page.
