import { RevealText } from "@/components/ui/RevealText";

export function Manifesto() {
  return (
    <section className="relative overflow-hidden py-36 md:py-52">
      <span
        aria-hidden
        className="font-display pointer-events-none absolute -top-6 right-0 select-none text-[32vw] italic leading-none text-fg/[0.035] md:-top-16 md:text-[20vw]"
      >
        01
      </span>

      <div className="container-premium relative">
        <div className="max-w-4xl">
          <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
            Manifesto
          </p>

          <h2 className="text-4xl font-medium leading-[1.1] tracking-tight text-fg sm:text-5xl md:text-6xl lg:text-7xl">
            <RevealText text="I don't chase trends." />
          </h2>
          <h2 className="font-display mt-1 text-4xl italic leading-[1.1] text-accent-soft sm:text-5xl md:text-6xl lg:text-7xl">
            <RevealText text="I chase clarity." delay={0.3} />
          </h2>

          <p className="mt-10 max-w-xl text-lg text-fg-muted md:text-xl">
            Every project starts by removing what doesn&apos;t need to be there - then
            rebuilding what&apos;s left until it feels inevitable.
          </p>
        </div>
      </div>
    </section>
  );
}
