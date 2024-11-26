import { basename } from "node:path";
import pathConfig from "./path-config.mjs";
import { NewsRegistry } from "./news-registry.mjs";

export default {
  images: true,
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
          return { [json.filename.split(".").shift()]: json };
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

  workboxBuild: {
    globDirectory: pathConfig.dest,
    globPatterns: ["**/*.{html,json,js,css,png,jpg,gif,svg}"],
    // Create service-worker.js source file and define `swSrc` to use `injectManifest` method
    // swSrc: `${pathConfig.src}/sw.js`,
    swDest: `${pathConfig.dest}/sw.prod.js`
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
