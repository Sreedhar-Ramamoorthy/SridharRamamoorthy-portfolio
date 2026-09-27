import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

// Types each word, pauses, deletes it, then moves on to the next.
export default function Typewriter({ words }: { words: string[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const word = words[index % words.length];
    const done = !deleting && text === word;
    const cleared = deleting && text === "";

    const timeout = setTimeout(
      () => {
        if (done) setDeleting(true);
        else if (cleared) {
          setDeleting(false);
          setIndex((i) => i + 1);
        } else {
          setText(word.slice(0, text.length + (deleting ? -1 : 1)));
        }
      },
      done ? 1800 : deleting ? 35 : 70,
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, reduce]);

  if (reduce) return <span>{words[0]}</span>;

  return (
    <span aria-label={words[index % words.length]}>
      <span aria-hidden>{text}</span>
      <span aria-hidden className="animate-blink ml-0.5 inline-block w-[2px] bg-brand align-middle" style={{ height: "1em" }} />
    </span>
  );
}
