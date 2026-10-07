// Character and word splitting for the reveal animations. Each word is wrapped
// in an overflow mask (.wm) so its letters can slide up from below.

export function SplitChars({ text }: { text: string }) {
  let k = 0;
  const words = text.split(" ");
  return (
    <>
      {words.map((word, wi) => (
        <span key={wi}>
          <span className="wm">
            {[...word].map((c) => {
              const i = k++;
              return (
                <span key={i} className="ch" style={{ "--i": i } as React.CSSProperties}>
                  {c}
                </span>
              );
            })}
          </span>
          {wi < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

export function PlainChars({ text }: { text: string }) {
  return (
    <>
      {[...text].map((c, i) => (
        <span key={i} className="ch">
          {c}
        </span>
      ))}
    </>
  );
}

export function SplitWords({ text }: { text: string }) {
  const words = text.split(/\s+/);
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          <span className="w">{w}</span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}
