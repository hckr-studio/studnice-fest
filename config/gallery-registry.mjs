import { existsSync } from "node:fs";
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { logger } from "@hckr_/blendid/logger";
import projectPath from "@hckr_/blendid/project-path";
import { Registry } from "@hckr_/blendid/registry";

/** @typedef {import("@types/gulp").Gulp} Gulp */

/**
 * Pro každou složku src/cloudinary/gallery/<rok>/ vygeneruje stránku
 * src/html/galerie/<rok>/index.njk (šablona layouts/gallery-year.njk).
 * Vygenerované stránky nejsou v gitu – nový ročník = jen nahrát fotky.
 */
export class GalleryRegistry extends Registry {
  constructor(config, pathConfig) {
    super();
    this.config = config;
    this.paths = {
      photos: projectPath(pathConfig.src, pathConfig.cloudinary.src, "gallery"),
      pages: projectPath(pathConfig.src, pathConfig.html.src, "galerie")
    };
  }

  /** @param {Gulp} gulp */
  init({ task }) {
    task("prepare-galleries", async () => {
      const years = existsSync(this.paths.photos)
        ? (await readdir(this.paths.photos, { withFileTypes: true }))
            .filter((d) => d.isDirectory() && /^\d{4}$/.test(d.name))
            .map((d) => d.name)
        : [];

      // smazat stránky ročníků, ke kterým už fotky nejsou
      if (existsSync(this.paths.pages)) {
        for (const d of await readdir(this.paths.pages, {
          withFileTypes: true
        })) {
          if (
            d.isDirectory() &&
            /^\d{4}$/.test(d.name) &&
            !years.includes(d.name)
          ) {
            await rm(join(this.paths.pages, d.name), { recursive: true });
          }
        }
      }

      for (const year of years) {
        const dir = join(this.paths.pages, year);
        await mkdir(dir, { recursive: true });
        await writeFile(
          join(dir, "index.njk"),
          `{# Vygenerováno z config/gallery-registry.mjs – neupravovat. #}\n{% extends "layouts/gallery-year.njk" %}\n{% set year = ${year} %}\n`,
          { encoding: "utf-8" }
        );
      }
      logger.info(`Galerie: ${years.join(", ") || "žádné ročníky"}`);
    });
  }
}
