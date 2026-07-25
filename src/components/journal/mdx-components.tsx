import Link from "next/link";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";

type MDXComponents = NonNullable<MDXRemoteProps["components"]>;

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      {...props}
      className="mt-14 scroll-mt-28 text-2xl font-medium tracking-tight text-fg md:text-3xl"
    />
  ),
  h3: (props) => (
    <h3 {...props} className="mt-10 scroll-mt-28 text-xl font-medium text-fg md:text-2xl" />
  ),
  p: (props) => <p {...props} className="mt-5 text-lg leading-relaxed text-fg-muted" />,
  a: ({ href, children, ...props }) => (
    <Link
      href={href ?? "#"}
      className="text-fg underline decoration-accent-soft/50 decoration-2 underline-offset-4 transition-colors hover:text-accent-soft"
      {...props}
    >
      {children}
    </Link>
  ),
  ul: (props) => (
    <ul
      {...props}
      className="mt-5 flex list-disc flex-col gap-2 pl-5 text-lg text-fg-muted marker:text-accent-soft"
    />
  ),
  ol: (props) => (
    <ol
      {...props}
      className="mt-5 flex list-decimal flex-col gap-2 pl-5 text-lg text-fg-muted marker:text-accent-soft"
    />
  ),
  li: (props) => <li {...props} className="pl-1 leading-relaxed" />,
  blockquote: (props) => (
    <blockquote
      {...props}
      className="font-display mt-8 border-l-2 border-accent pl-6 text-xl italic leading-snug text-fg"
    />
  ),
  strong: (props) => <strong {...props} className="font-semibold text-fg" />,
  code: (props) => (
    <code
      {...props}
      className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-[0.85em] text-accent-soft"
    />
  ),
  pre: (props) => (
    <pre
      {...props}
      className="mt-6 overflow-x-auto rounded-2xl border border-border-strong bg-bg-elevated p-5 text-sm leading-relaxed [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-fg"
    />
  ),
  hr: (props) => <hr {...props} className="my-14 border-border" />,
};
