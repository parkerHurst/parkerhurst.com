#!/usr/bin/env node
/**
 * Interactive photo importer for parkerhurst.com
 *
 * Usage:
 *   node scripts/import-photos.mjs
 *
 * The script will prompt you for a sport and photo locations.
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { createInterface } from "readline";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const SPORTS = [
  { key: "football", label: "Football", dir: "Football" },
  { key: "baseball", label: "Baseball", dir: "Baseball" },
  { key: "basketball", label: "Basketball", dir: "Basketball" },
  { key: "hockey", label: "Hockey", dir: "Hockey" },
  { key: "lacrosse", label: "Lacrosse", dir: "Lacrosse" },
  { key: "soccer", label: "Soccer", dir: "Soccer" },
];

const MAX_WIDTH = 2000;
const QUALITY = 85;

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(q) {
  return new Promise((resolve) => rl.question(q, resolve));
}

async function chooseSport() {
  console.log("\nWhich sport?");
  SPORTS.forEach((s, i) => console.log(`  ${i + 1}. ${s.label}`));

  while (true) {
    const input = await ask("Enter number: ");
    const idx = parseInt(input.trim(), 10) - 1;
    if (idx >= 0 && idx < SPORTS.length) {
      return SPORTS[idx];
    }
    console.log("Invalid choice. Try again.");
  }
}

async function gatherPaths() {
  const paths = [];
  console.log(
    "\nEnter paths to photos or folders. Leave blank when done."
  );

  while (true) {
    const line = await ask("Path (or press Enter to finish): ");
    const trimmed = line.trim();
    if (!trimmed) break;
    const resolved = path.resolve(trimmed.replace(/^~/, process.env.HOME));
    const stat = await fs.stat(resolved).catch(() => null);
    if (!stat) {
      console.log(`  ⚠️  Not found: ${trimmed}`);
      continue;
    }
    paths.push(resolved);
    if (stat.isDirectory()) {
      console.log(`  📁 Added folder: ${trimmed}`);
    } else {
      console.log(`  📄 Added file: ${trimmed}`);
    }
  }

  return paths;
}

async function gatherSources(rawPaths) {
  const files = [];
  for (const resolved of rawPaths) {
    const stat = await fs.stat(resolved);
    if (stat.isDirectory()) {
      const entries = await fs.readdir(resolved, { withFileTypes: true, recursive: true });
      for (const entry of entries) {
        if (!entry.isFile()) continue;
        if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
          files.push(path.join(entry.parentPath ?? resolved, entry.name));
        }
      }
    } else if (/\.(jpg|jpeg|png)$/i.test(resolved)) {
      files.push(resolved);
    } else {
      console.log(`  ⚠️  Skipping unsupported file: ${path.basename(resolved)}`);
    }
  }
  return files;
}

async function main() {
  console.log("╔══════════════════════════════════════════╗");
  console.log("║     Parker Hurst Photo Importer          ║");
  console.log("╚══════════════════════════════════════════╝");

  const sport = await chooseSport();
  const sourcePaths = await gatherPaths();

  if (sourcePaths.length === 0) {
    console.log("\n❌ No paths provided. Exiting.\n");
    rl.close();
    process.exit(1);
  }

  const sources = await gatherSources(sourcePaths);
  if (sources.length === 0) {
    console.log("\n❌ No valid image files found. Exiting.\n");
    rl.close();
    process.exit(1);
  }

  const outDir = path.join(ROOT, "public", "photos", sport.dir);
  await fs.mkdir(outDir, { recursive: true });

  console.log(
    `\n📂 Importing ${sources.length} image(s) into public/photos/${sport.dir}\n`
  );

  const results = [];
  const skipped = [];

  for (const src of sources) {
    const base = path.basename(src, path.extname(src));
    const outName = `${base}.jpg`;
    const outPath = path.join(outDir, outName);

    const existing = await fs.stat(outPath).catch(() => null);
    if (existing) {
      console.log(`⏭️  Skipped (already exists): ${outName}`);
      skipped.push(outName);
      continue;
    }

    const pipeline = sharp(src)
      .resize({
        width: MAX_WIDTH,
        height: MAX_WIDTH,
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({ quality: QUALITY, progressive: true })
      .withMetadata({ exif: {}, iptc: {}, xmp: {} });

    const buffer = await pipeline.toBuffer();
    await fs.writeFile(outPath, buffer);

    const inSize = (await fs.stat(src)).size;
    const outSize = buffer.length;
    const ratio = ((1 - outSize / inSize) * 100).toFixed(1);

    console.log(
      `✅ ${outName}  —  ${(inSize / 1024 / 1024).toFixed(1)}MB → ${(outSize / 1024 / 1024).toFixed(1)}MB (${ratio}% smaller)`
    );
    results.push(outName);
  }

  console.log(`\n────────────────────────────────────────`);
  console.log(`Done.  Imported: ${results.length}  |  Skipped: ${skipped.length}`);

  if (results.length > 0) {
    console.log(`\n📋 Copy these filenames into src/data/portfolio.ts:`);
    console.log(`\n  ${results.map((f) => `"${f}"`).join(",\n  ")},`);
  }

  if (skipped.length > 0) {
    console.log(`\n⏭️  Skipped (already exist):`);
    skipped.forEach((f) => console.log(`   ${f}`));
  }

  console.log("");
  rl.close();
}

main().catch((err) => {
  console.error(err);
  rl.close();
  process.exit(1);
});
