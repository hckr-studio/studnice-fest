import { writeFile, mkdir } from "node:fs/promises";
import { basename, join, dirname } from "node:path";
import projectPath from "@hckr_/blendid/lib/projectPath.mjs";
import logger from "fancy-log";
import DefaultRegistry from "undertaker-registry";
import pathConfig from "./path-config.json" with { type: "json" };

class NewsRegistry extends DefaultRegistry {
  constructor(config, pathConfig) {
    super();
    this.config = config;
    this.paths = {
      dest: projectPath(
        pathConfig.src,
        pathConfig.data.src,
        "news.json",
      ),
      imagesDest: projectPath(
        pathConfig.src,
        pathConfig.cloudinary.src,
      )
    };
  }

  init({ task }) {
    async function getLatestNews() {
      logger.info("Loading latest news…");
      const resp = await fetch("https://studnice-fest.pages.dev/api/v1/news/latest");
      try {
        const data = await resp.json();
        if (!resp.ok) {
          logger.warn("blbý!");
        }
        return data.map(x => ({
          text: x.text,
          time: x.time,
          url: x.topLevelUrl,
          likes: x.likes,
          comments: x.comments,
          image: x.media?.at(0)?.thumbnail
        }));
      } catch (err) {
        return [];
      }
    }

    task("prepare-data", async () => {
      const news = await getLatestNews();
      const newsImgDir = join(this.paths.imagesDest, "news")
      await mkdir(newsImgDir, { recursive: true });
      for (const item of news.filter(x => x.image)) {
        const resp = await fetch(item.image);
        const url = new URL(item.image);
        const fileName = url.pathname.split("/").pop();
        item.image = `news/${fileName}`;
        const data = Buffer.from(await resp.arrayBuffer());
        const file = join(newsImgDir, fileName);
        await writeFile(file, data);
      }
      return writeFile(
        this.paths.dest,
        JSON.stringify(news, null, 2),
        { encoding: "utf-8" },
      );
    });
  }
}

export default {
  images: true,
  cloudinary: true,
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
