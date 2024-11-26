import DefaultRegistry from "undertaker-registry";
import projectPath from "@hckr_/blendid/lib/projectPath.mjs.mjs";
import logger from "fancy-log";
import { join } from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

export class NewsRegistry extends DefaultRegistry {
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
      const query = new URLSearchParams({ pageSize: 15 });
      const resp = await fetch(`https://studnice-fest.pages.dev/api/v1/news/latest?${query}`);
      try {
        const data = await resp.json();
        if (!resp.ok) {
          logger.warn("blbý!");
        }
        // TODO: move this to backend
        const supportedMediaTypes = new Set(["Photo", "Video", "GenericAttachmentMedia"]);
        return data.map(x => ({
          text: x.text,
          time: x.time,
          url: x.topLevelUrl,
          likes: x.likes,
          comments: x.comments,
          image: x.media?.filter(x => supportedMediaTypes.has(x["__typename"]))?.at(0)?.thumbnail
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
        try {
          const resp = await fetch(item.image);
          const url = new URL(item.image);
          const fileName = url.pathname.split("/").at(-1);
          item.image = `news/${fileName}`;
          const data = Buffer.from(await resp.arrayBuffer());
          if (data.toString() == "URL signature expired") {
            // skip expired images
            continue;
          }
          const file = join(newsImgDir, fileName);
          if (!existsSync(file)) {
            // do not override existing images
            await writeFile(file, data);
          }
        } catch (err) {
        }
      }
      return writeFile(
        this.paths.dest,
        JSON.stringify(news, null, 2),
        { encoding: "utf-8" },
      );
    });
  }
}
