import { writeFile } from "node:fs/promises";
import { basename } from "node:path";
import projectPath from "@hckr_/blendid/lib/projectPath.mjs";
import logger from "fancy-log";
import DefaultRegistry from "undertaker-registry";
import pathConfig from "./path-config.json" with { type: "json" };

class NewsRegistry extends DefaultRegistry {
  constructor(config, pathConfig) {
    super();
    this.config = config;
    this.dest = projectPath(
      pathConfig.src,
      pathConfig.data.src,
      "news.json",
    );
  }

  init({ task }) {
    async function getLatestNews() {
      logger.info("Loading latest news…");
      const resp = await fetch("https://studnice-fest.pages.dev/api/v1/news/latest");
      const data = await resp.json();
      if (!resp.ok) {
        logger.warn("blbý!");
      }
      return data.map(x => ({
        text: x.text,
        time: x.time,
        url: x.topLevelUrl,
        likes: x.likes,
        image: x.media.at(0)?.thumbnail
      }));
    }

    task("prepare-data", async () => {
      const news = await getLatestNews();
      return writeFile(
        this.dest,
        JSON.stringify(news, null, 2),
        { encoding: "utf-8" },
      );
    });
  }
}

export default {
  images: true,
  cloudinary: false,
  fonts: true,
  static: true,
  svgSprite: true,
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
    collections: ["news", "artists", "schedule"],
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
    rev: true
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
