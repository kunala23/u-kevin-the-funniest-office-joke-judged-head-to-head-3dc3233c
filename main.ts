// The Funniest Office Joke, Judged Head to Head
// Entry program: writes a single one-line office joke to /output/entry.txt.
// The joke must be 1-200 UTF-8 characters, one line, setup first and
// punchline last. It is built here as a small list of word-groups so the
// final line is assembled from parts, then validated before it is written.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke, in three beats: the setup, the turn, and the punchline.
// Beat 1 (setup): a calendar finally shows a free hour — every office
// worker knows the relief of an empty slot.
// Beat 2 (turn): the calendar app itself takes the hour away.
// Beat 3 (punchline): the meeting is about protecting focus time — the
// very thing it destroys.
const BEATS: string[] = [
  "My calendar finally showed one free hour,",
  "so Outlook booked it for a mandatory meeting",
  "about protecting focus time.",
];

const JOKE: string = BEATS.join(" ");

// Gate check, mirroring the competition gate: UTF-8 text, 1 to 200
// characters, not only whitespace, and a single line.
function validate(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry is ${chars.length} characters, must be 1-200`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validate(JOKE);
  // The grader mounts the output directory at /output; fall back to a
  // local ./output directory when run by hand so the same code can be
  // checked locally without privileges.
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  let target = join(outDir, "entry.txt");
  try {
    mkdirSync(outDir, { recursive: true });
  } catch {
    // /output is not writable here (local run): use ./output instead.
    mkdirSync("output", { recursive: true });
    target = join("output", "entry.txt");
  }
  writeFileSync(target, JOKE, "utf8");
  console.log(`wrote ${[...JOKE].length} characters to ${target}`);
  console.log(JOKE);
}

main();
