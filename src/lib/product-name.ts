const FODDER = /^fodder\b/i;

const CLOTHING_SIZE = /^(?:XXXS|XXS|XS|S|M|L|XL|XXL|XXXL|2XL|3XL|4XL)(?:\/(?:XXXS|XXS|XS|S|M|L|XL|XXL|XXXL))?$/;

const MEASURE = /^\d+(?:[.,]\d+)?\s*(?:kg|g|mg|l|ml|cl|cm|mm|m)$/i;

const RANGE = /^(\d+(?:[.,]\d+)?)\s*[-–]\s*(\d+(?:[.,]\d+)?)$/;

const LOOSE_CODE = /\s\d{8,}(?=\s|$)/g;

const MEASURE_JOINED = /^(\d+(?:[.,]\d+)?)\s*(kg|g|mg|l|ml|cl|cm|mm|m)$/i;

const MODEL_CODE = /^(?:\d{6,}|[A-Z0-9]{4,})$/;

const DIMENSIONS = /\s\d+(?:[.,]\d+)?(?:\s*[x×]\s*\d+(?:[.,]\d+)?)+(?:\s*[x×])?(?:\s*(?:cm|mm|m))?$/i;

const SIZE_WORD = /^(?:size|talla|taille)$/i;

const SPEC_LABEL = /\b[A-Z][A-Za-z/ ]{2,24}:/g;

const VOWEL = /[AEIOUaeiou]/;

function tidy(value: string): string {
  return value
    .replace(/\s+/g, " ")
    .replace(/\s+[x×]$/i, "")
    .replace(/[\s,;:\-–—|/]+$/g, "")
    .trim();
}

function normaliseMeasure(token: string): string {
  const match = token.match(MEASURE_JOINED);
  if (!match) return token;
  return `${match[1].replace(",", ".")} ${match[2].toLowerCase() === "l" ? "L" : match[2].toLowerCase()}`;
}

export interface ProductDisplay {
  title: string;
  size: string | null;
}

export function productDisplay(raw: string | null | undefined): ProductDisplay {
  const source = tidy(raw ?? "");
  if (source.length < 3) return { title: source, size: null };

  let title = FODDER.test(source) ? source.replace(FODDER, "Dry food") : source;
  title = tidy(title.replace(LOOSE_CODE, ""));

  let size: string | null = null;

  const dims = title.match(DIMENSIONS);
  if (dims && tidy(title.slice(0, dims.index)).length >= 3) {
    size = tidy(dims[0]).replace(/[x×]/g, "×").replace(/\s*×\s*$/, "").replace(/\s*×\s*/g, " × ");
    title = tidy(title.slice(0, dims.index));
  }

  let words = title.split(" ");

  for (let pass = 0; pass < 3; pass += 1) {
    const unit = words[words.length - 1] ?? "";
    const amount = (words[words.length - 2] ?? "").replace(/^\(/, "").replace(/\)$/, "");
    const range = amount.match(RANGE);
    if (words.length > 3 && /^(?:kg|g|mg|l|ml|cl|cm|mm|m)\)?$/i.test(unit) && range) {
      size ??= `${range[1].replace(",", ".")}–${range[2].replace(",", ".")} ${unit.replace(")", "").toLowerCase()}`;
      words = words.slice(0, -2);
    } else if (words.length > 3 && /^(?:kg|g|mg|l|ml|cl|cm|mm|m)$/i.test(unit) && /^\d+(?:[.,]\d+)?$/.test(amount)) {
      size ??= normaliseMeasure(`${amount} ${unit}`);
      words = words.slice(0, -2);
    } else if (words.length > 2) {
      const last = unit.replace(/[()]/g, "");
      if (CLOTHING_SIZE.test(last)) {
        size ??= last.toUpperCase();
        words = words.slice(0, -1);
      } else if (MEASURE.test(last)) {
        size ??= normaliseMeasure(last);
        words = words.slice(0, -1);
      } else break;
    } else break;
    if (words.length > 2 && SIZE_WORD.test(words[words.length - 1])) words = words.slice(0, -1);
  }

  if (words.length > 2) {
    const last = words[words.length - 1];
    if (MODEL_CODE.test(last) && !VOWEL.test(last) && !/^\d+(?:[.,]\d+)?$/.test(last.slice(0, 2))) {
      words = words.slice(0, -1);
    } else if (/^\d{6,}$/.test(last)) {
      words = words.slice(0, -1);
    }
  }

  title = tidy(words.join(" "));
  if (title.length < 3) return { title: tidy(FODDER.test(source) ? source.replace(FODDER, "Dry food") : source), size: null };
  return { title, size };
}

export function productTitle(raw: string | null | undefined): string {
  return productDisplay(raw).title;
}

export function productStandfirst(raw: string | null | undefined): string | null {
  const text = tidy(raw ?? "");
  if (text.length < 24) return null;
  const labels = text.match(SPEC_LABEL);
  if (labels && labels.length >= 2) return null;
  return text;
}
