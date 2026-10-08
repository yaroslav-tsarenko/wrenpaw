/**
 * Fills `Product.characteristics` with the filterable attributes parsed out of each
 * product's name and supplier spec dump. The importer does this for new rows; this
 * script catches up everything that was imported before.
 *
 *   npx tsx scripts/backfill-attributes.ts --dry-run
 *   npx tsx scripts/backfill-attributes.ts
 */
import "dotenv/config";
import pg from "pg";
import { ATTRIBUTE_KEYS, hasAttributes, parseProductAttributes, type AttributeKey } from "../src/lib/product-attributes";

const dryRun = process.argv.includes("--dry-run");
const BATCH = 500;

async function main() {
  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DIRECT_URL or DATABASE_URL must be set");

  const pool = new pg.Pool({ connectionString, max: 4 });
  const { rows } = await pool.query<{ id: string; name: string; shortDescription: string | null }>(
    `SELECT id, name, "shortDescription" FROM "Product"`,
  );
  console.log(`read ${rows.length} products`);

  const updates: [string, string][] = [];
  const tally = new Map<AttributeKey, Set<string>>(ATTRIBUTE_KEYS.map((k) => [k, new Set<string>()]));
  for (const row of rows) {
    const attributes = parseProductAttributes(row);
    if (!hasAttributes(attributes)) continue;
    for (const key of ATTRIBUTE_KEYS) for (const v of attributes[key] ?? []) tally.get(key)!.add(v);
    updates.push([row.id, JSON.stringify(attributes)]);
  }

  console.log(`parsed attributes for ${updates.length} products (${Math.round((updates.length / rows.length) * 100)}%)`);
  for (const key of ATTRIBUTE_KEYS) console.log(`  ${key}: ${tally.get(key)!.size} distinct values`);

  if (dryRun) {
    console.log("\n--dry-run: nothing written");
    await pool.end();
    return;
  }

  for (let i = 0; i < updates.length; i += BATCH) {
    const batch = updates.slice(i, i + BATCH);
    await pool.query(
      `UPDATE "Product" AS p SET characteristics = v.payload::jsonb
       FROM (SELECT * FROM unnest($1::text[], $2::text[]) AS t(id, payload)) AS v
       WHERE p.id = v.id`,
      [batch.map((b) => b[0]), batch.map((b) => b[1])],
    );
    process.stdout.write(`\r  written ${Math.min(i + BATCH, updates.length)}/${updates.length}`);
  }
  console.log("\ndone");
  await pool.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
