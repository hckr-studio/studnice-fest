# studnice-fest

Website studnicefest.cz

## Development

Site uses [`@hckr_/blendid`](https://github.com/hckr-studio/blendid) for development and building.

To run the site in development mode with hot reloading run:

```bash
op run --env-file=.env --no-masking -- yarn start
```

We store secrets in 1password and use 1password CLI to read them.

## Content Management

Site is staticaly generated from data and Nunjucks templates. The goal is to have the editable stuff in Markdown files
and a few JSON/MJS files, so there is minimal need to edit the templates.

Main info about event is in [`src/data/global.mjs`](tree/main/src/data/global.mjs). You can change the metadata, 
event info and tickets here.

### Artists

Artists database is in [`src/data/artists`](tree/main/src/data/artists) directory. Each artist is in separate markdown file. 
Name of the file without extension is `slug`/`id` used in `event.artists` collection in `global.mjs` file.
The file contains frontmatter yaml data island (currently only `image` property, but can be extended as needed).
The `h1` of the file is name of the artists that is presented on the site. There can be more text, but it is not
used yet. The database can grow, there is no need to delete old artists, as the list presented to users is defined
in the `global.mjs` file.

Artists images are in [`src/cloudinary/artists`](tree/main/src/cloudinary/artists). The should have the same slug as the `.md`
file, but it is not mandatory. The image file name is referenced in the data island. The image can be any format and 
the better quiality the better. Cloudinary is used to crop and optimize images as necessary (mobile, desktop, retina, etc.).

### Tickets

You can change the `url` of the event sale page, You can define waves of tickets and explicitly select `currentWave`. 
You can define waves upfront and only waves up to `currentWave` will be rendered to users.

### Schedule

Schedule is in the [`src/data/schedule.json`](tree/main/src/data/schedule.json). Slug of the artist should correspond to `.md` file name.
