# The Gallivant – test site

Six pages, with a shared header and footer:

| Page | File | Address once live |
|---|---|---|
| Homepage | `index.html` | `/` |
| Eat and Drink (includes The Bar, The Terrace, The Snug and Private dining) | `eat-and-drink/index.html` | `/eat-and-drink/` |
| Harry's | `eat-and-drink/harrys/index.html` | `/eat-and-drink/harrys/` |
| Christmas 2026 | `christmas/index.html` | `/christmas/` |
| Corporate events | `corporate-events/index.html` | `/corporate-events/` (same address as the current page) |
| Gallivant Littlestone Beach | `gallivant-littlestone-beach/index.html` | `/gallivant-littlestone-beach/` (same address as the current page) |

The Bar, The Terrace, The Snug and Private dining open inside the Eat and Drink page, at `/eat-and-drink/#/bar`, `#/terrace`, `#/snug` and `#/private-dining`.

## Putting it on GitHub Pages

1. On GitHub (thewondergroup), click **New repository**. Name it, for example `gallivant-test`, set it to **Public** and click **Create repository**.
2. On the new repository page, click **uploading an existing file**, or use **Add file → Upload files**.
3. Drag in everything inside this folder: `index.html`, `404.html`, `README.md`, and the `assets`, `eat-and-drink`, `christmas`, `plan`, `corporate-events` and `gallivant-littlestone-beach` folders. Keep the folders as they are. `.nojekyll` is optional (it's hidden on a Mac, and the site works without it).
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

The form has two steps. Step 1 asks for name, email, number of guests and rough dates, and sends the lead straight away. Step 2 is optional (company, phone, nights, whole house, budget, notes) and adds to the same enquiry.

### Ad links

Each corporate ad links to the page with its own `utm_content`, and the page changes its headline to match the ad:

| Ad | Headline in the ad | Link |
|---|---|---|
| 1 | Your Team. Nobody Else But You | `/corporate-events/?utm_source=meta&utm_medium=paid&utm_campaign=corporate-offsites&utm_content=ad1` |
| 2 | Close Enough to Stay | `...&utm_content=ad2` (opens on the one-night schedule) |
| 3 | The Offsite That Doesn't Feel Like An Offsite | `...&utm_content=ad3` |
| 4 | A Full Day to Fill as You Choose | `...&utm_content=ad4` (opens on the two-night schedule) |
| 5 | Smaller Groups Get The Feeling of Exclusivity | `...&utm_content=ad5` (smaller-groups headline, and the form starts at "Up to 14") |

## Corporate walkthrough video

The corporate page plays the walkthrough as a silent loop behind the headline, and in full with sound from the "Watch the walkthrough" button. The files are in `corporate-events/media/`: a 1080p version (about 19MB) for desktop and a 720p version (about 10MB) for phones and data-saver mode, both cut down from the 400MB 4K original. When the page moves to WordPress, upload both files and the poster image to the media library and update the `media/` paths in the page.

## Littlestone page

Tells the story of Romney Bay House with the archive photos in `gallivant-littlestone-beach/media/`, counts down to opening day (1 July 2027) and signs people up as Friends. The Friends form works the same way as the corporate form: follow `gallivant-littlestone-beach/friends-form.gs` and paste the web app URL into `var GVED_FORM_ENDPOINT=''`. Until then it opens an email to enquiries@thegallivant.co.uk. Sign-ups fire a Google Analytics `sign_up` event and a Meta `CompleteRegistration` event.
