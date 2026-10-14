import { existsSync } from "node:fs";
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { logger } from "@hckr_/blendid/logger";
import projectPath from "@hckr_/blendid/project-path";
import { Registry } from "@hckr_/blendid/registry";
import globalData from "../src/data/global.mjs";

/** @typedef {import("@types/gulp").Gulp} Gulp */

/**
 * Pro kapely z posledních dvou ročníků a chystaného ročníku (artistPages
 * v src/data/global.mjs), které mají src/data/artists/<slug>.md, vygeneruje
 * stránku src/html/kapely/<slug>/index.njk (šablona layouts/artist.njk).
 * Vygenerované stránky nejsou v gitu – nová kapela = jen přidat .md soubor.
 */
export class ArtistRegistry extends Registry {
  constructor(config, pathConfig) {
    super();
    this.config = config;
    this.paths = {
      artists: projectPath(pathConfig.src, pathConfig.data.src, "artists"),
      pages: projectPath(pathConfig.src, pathConfig.html.src, "kapely")
    };
  }

  /** @param {Gulp} gulp */
  init({ task }) {
    task("prepare-artists", async () => {
      const slugs = existsSync(this.paths.artists)
        ? (await readdir(this.paths.artists))
            .filter((f) => f.endsWith(".md"))
            .map((f) => f.slice(0, -3))
            .filter((slug) => globalData.artistPages.includes(slug))
        : [];

      // smazat stránky kapel, které už nemají .md soubor
      if (existsSync(this.paths.pages)) {
        for (const d of await readdir(this.paths.pages, {
          withFileTypes: true
        })) {
          if (d.isDirectory() && !slugs.includes(d.name)) {
            await rm(join(this.paths.pages, d.name), { recursive: true });
          }
        }
      }

      for (const slug of slugs) {
        const dir = join(this.paths.pages, slug);
        await mkdir(dir, { recursive: true });
        await writeFile(
          join(dir, "index.njk"),
          `{# Vygenerováno z config/artist-registry.mjs – neupravovat. #}\n{% extends "layouts/artist.njk" %}\n{% set slug = "${slug}" %}\n`,
          { encoding: "utf-8" }
        );
      }
      logger.info(`Kapely: ${slugs.length} stránek`);
    });
  }
}
