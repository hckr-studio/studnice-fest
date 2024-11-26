import { basename } from "node:path";
import pathConfig from "./path-config.mjs";
import { NewsRegistry } from "./news-registry.mjs";

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
    exclude: ["artists.json"],
    json: [{
      collection: "artists",
      stripTitle: true,
      transform(data, file) {
        return Object.assign({ filename: basename(file.path) }, data);
      },
      mergeOptions: {
        concatArrays: true,
        edit(json) {
          return { [json.filename.split(".").at(0)]: json };
        }
      }
    }]
  },

  html: {
    dataFile: "global.mjs",
    collections: ["news", "artists", "schedule", "images"],
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
