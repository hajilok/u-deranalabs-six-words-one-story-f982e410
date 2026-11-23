import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Final championship entry selected via blind pairwise Swiss + round-robin polish.
const STORY = "We forgave Dad. Nobody told him.";

function validateStory(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("Story must not be whitespace-only.");
  }
  if (/[\r\n\t]/.test(text)) {
    throw new Error("Story must be a single line with plain spaces only.");
  }
  const chars = [...text].length;
  const bytes = Buffer.byteLength(text, "utf8");
  if (chars < 1 || chars > 60 || bytes < 1 || bytes > 60) {
    throw new Error(`Story length (${chars} chars / ${bytes} bytes) outside 1..60 gate.`);
  }
  const words = text.trim().split(" ");
  if (words.length !== 6 || words.some((w) => !/^[A-Za-z]+[.,;:!?]?$/.test(w))) {
    throw new Error(`Expected exactly 6 unambiguous plain words, got: ${JSON.stringify(words)}`);
  }
}

function main(): void {
  validateStory(STORY);
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), STORY, { encoding: "utf8" });
}

main();
