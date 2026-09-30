LALITA METALS - WEBSITE
=======================

Structure
---------
index.html                  Main page (all content)
css/style.css               All styling / colours / layout
js/main.js                  Flame particle animation + footer year
assets/gallery/            PHOTO SLIDER - put your material photos here
assets/images/
    logo-icon.png           Header logo (LM icon)
    hero-watermark.png      Faded logo in the hero section
    favicon.png             Browser tab icon

How to put it online
--------------------
Upload the whole folder contents to your hosting (keep the folders as they are).
index.html must stay in the top folder. Then point your domain to it.

Things to update later
----------------------
- GST number: add in index.html (footer / contact section)
- Working hours: search "Mon" in index.html
- Phone / email: search 9824677051 and dvlnagar18@gmail.com in index.html
- Enquiry form: currently only dials the phone number; connect to email / WhatsApp later
- Logo: replace files in assets/images/ (keep same file names)

Photo slider (Material gallery)
-------------------------------
Put photos in assets/gallery/ and name them in number order:
    1.jpg   2.jpg   3.jpg   4.jpg ... 8.jpg   9.jpg
The website finds them by itself. To add a photo, save it as the NEXT number.
To remove one, delete the file (numbers can have small gaps, up to 2 in a row).
Allowed types: .jpg  .jpeg  .png  .webp
Tips:
- Resize photos to about 1400 px on the long side before adding (use squoosh.app),
  phone photos are 3-5 MB and will make the page slow.
- Portrait (upright) photos look best.
- Only use photos of your own material.
- If nothing is in the folder, the gallery section hides itself.

Contact form -> your email (Web3Forms)
---------------------------------------
The enquiry form on the Contact section now sends straight to your email,
using a free service called Web3Forms. No account, no server needed.

Status: DONE. The access key is already added in index.html, so the
form is live and ready to receive enquiries by email — nothing left to do.

(If you ever need to change which email receives enquiries, go to
https://web3forms.com, create a new key for the new email, then in
index.html find the line with name="access_key" and swap in the new key.)

Free plan: 250 submissions/month, which is far more than you'll need to
start. If the key is missing, the form shows a message asking the owner
to finish setup, instead of pretending to work.

Hosting on GitHub Pages (free, no hosting purchase needed)
------------------------------------------------------------
This site is fully static (HTML/CSS/JS + images only), so GitHub Pages
can host it for free — you do NOT need to buy web hosting.

1. Create a GitHub account (github.com) if you don't have one.
2. Create a new repository, e.g. "lalita-metals-website".
3. Upload everything INSIDE this folder (index.html, css/, js/, assets/,
   this README) to the root of that repository — not the outer folder
   itself.
4. Go to the repo's Settings -> Pages.
5. Under "Source", choose the "main" branch and "/ (root)", then Save.
6. GitHub gives you a live link in a minute or two, like:
   https://yourusername.github.io/lalita-metals-website/

To use your own domain (e.g. lalitametals.in) instead of that link:
1. In the same repo, add a file named exactly "CNAME" (no extension)
   containing just your domain, e.g.:
   lalitametals.in
2. In GoDaddy's DNS settings for your domain, add:
   - An A record for "@" pointing to each of these four addresses:
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
   - A CNAME record for "www" pointing to:
     yourusername.github.io
3. Back in GitHub -> Settings -> Pages, enter your domain under
   "Custom domain" and enable "Enforce HTTPS" once it's verified
   (can take up to a day).

With this setup, you only ever pay for the domain name itself
(if you want one) — never for hosting.
