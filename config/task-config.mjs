import { texyTypography } from "@hckr_/blendid/texy";
import { take } from "@thi.ng/transducers";
import { defineLqipProperty } from "@hckr_/blendid/lib/cloudinary.mjs";
import pathConfig from "./path-config.mjs";
import { GalleryRegistry } from "./gallery-registry.mjs";
import { NewsRegistry } from "./news-registry.mjs";

/** @type {Promise<void> | undefined} */
let lqipFieldReady;

function formatDate(s) {
  const formatter = new Intl.DateTimeFormat("cs", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
  return formatter.format(new Date(s));
}

function removeHashtags(s) {
  return s.replaceAll(/#\S+/g, "").trim();
}

export default {
  images: true,
  cloudflare: true,
  cloudinary: {
    // Blendid volá setup() před KAŽDÝM uploadem a ten dělá dotaz na Cloudinary
    // Admin API (limit ~500 volání/hod). Při nahrání celého ročníku galerie
    // to build shodí na rate limitu – stačí pole „lqip“ ověřit jednou za build.
    setup(cloudinary) {
      lqipFieldReady ??= defineLqipProperty(cloudinary);
      return lqipFieldReady;
    }
  },
  fonts: true,
  static: true,
  svgSprite: false,
  stylesheets: true,
  esbuild: true,

  generate: {
    exclude: ["artists.json", "news.json", "images.json"],
    json: [
      {
        collection: "artists",
        stripTitle: true,
        transform(data, file) {
          return Object.assign(
            { filename: file.basename, slug: file.stem },
            data
          );
        },
        mergeOptions: {
          concatArrays: true,
          edit(json) {
            return { [json.slug]: json };
          }
        }
      }
    ]
  },

  html: {
    data: { collections: ["news", "artists", "images"] },
    markedExtensions: [texyTypography("cs")],
    nunjucksRender: {
      filters: {
        take(arr, n) {
          return take(n, arr);
        },
        formatDate,
        removeHashtags
      }
    }
  },

  production: {
    rev: { exclude: ["favicon.ico", "_headers"] }
  },

  registries: [
    new NewsRegistry({}, pathConfig),
    new GalleryRegistry({}, pathConfig)
  ],

  additionalTasks: {
    development: {
      prebuild: ["prepare-data", "prepare-galleries"]
    },
    production: {
      prebuild: ["prepare-data", "prepare-galleries"]
    }
  },

  watch: {
    tasks: []
  }
};
