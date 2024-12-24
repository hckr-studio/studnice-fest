import { take } from "@thi.ng/transducers";
import pathConfig from "./path-config.mjs";
import { NewsRegistry } from "./news-registry.mjs";
import { processTypo } from "../src/esm/lib/texy.js";

function formatDate(s) {
  const formatter = new Intl.DateTimeFormat("cs", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  })
  return formatter.format(new Date(s));
}

function removeHashtags(s) {
  return s.replaceAll(/#\S+/g, "").trim();
}

export default {
  images: true,
  cloudflare: true,
  cloudinary: true,
  fonts: true,
  static: true,
  svgSprite: false,
  stylesheets: true,
  esbuild: true,

  generate: {
    exclude: ["artists.json", "news.json", "images.json"],
    json: [{
      collection: "artists",
      stripTitle: true,
      transform(data, file) {
        return Object.assign({ filename: file.basename, slug: file.stem }, data);
      },
      mergeOptions: {
        concatArrays: true,
        edit(json) {
          return { [json.slug]: json };
        }
      }
    }]
  },

  html: {
    dataFile: "global.mjs",
    collections: ["news", "artists", "images"],
    nunjucksRender: {
      filters: {
        take(arr, n) {
          return take(n, arr);
        },
        processTypo(string, locale) {
          return processTypo(string, { locale });
        },
        formatDate,
        removeHashtags
      }
    }
  },

  browserSync: {
    server: {
      baseDir: pathConfig.dest
    }
  },

  production: {
    rev: { exclude: ["favicon.ico", "_headers"] }
  },

  registries: [new NewsRegistry({}, pathConfig)],

  additionalTasks: {
    development: {
      prebuild: ["prepare-data"],
    },
    production: {
      prebuild: ["prepare-data"],
    },
  },

  watch: {
    tasks: []
  }
};
