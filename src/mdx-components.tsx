import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

// Global MDX element styling for blog posts — matches the v3 aesthetic and the
// site's readable-column measure. App Router auto-applies this via @next/mdx.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props: ComponentPropsWithoutRef<"h2">) => (
      <h2 className="text-gradient mt-12 text-2xl font-bold tracking-tight sm:text-3xl" {...props} />
    ),
    h3: (props: ComponentPropsWithoutRef<"h3">) => (
      <h3 className="mt-8 text-xl font-bold text-paper" {...props} />
    ),
    p: (props: ComponentPropsWithoutRef<"p">) => (
      <p className="mt-5 text-lg leading-relaxed text-paper/75" {...props} />
    ),
    ul: (props: ComponentPropsWithoutRef<"ul">) => (
      <ul
        className="mt-5 list-disc space-y-2 pl-6 text-lg leading-relaxed text-paper/75 marker:text-azure"
        {...props}
      />
    ),
    ol: (props: ComponentPropsWithoutRef<"ol">) => (
      <ol
        className="mt-5 list-decimal space-y-2 pl-6 text-lg leading-relaxed text-paper/75 marker:text-azure"
        {...props}
      />
    ),
    a: (props: ComponentPropsWithoutRef<"a">) => (
      <a
        className="text-azure underline underline-offset-4 transition-colors hover:text-paper"
        {...props}
      />
    ),
    strong: (props: ComponentPropsWithoutRef<"strong">) => (
      <strong className="font-semibold text-paper" {...props} />
    ),
    blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
      <blockquote className="mt-6 border-l-2 border-azure/60 pl-5 text-lg italic text-paper/70" {...props} />
    ),
    code: (props: ComponentPropsWithoutRef<"code">) => (
      <code className="rounded bg-paper/10 px-1.5 py-0.5 font-mono text-[0.85em] text-amber" {...props} />
    ),
    hr: () => <hr className="my-10 border-paper/10" />,
    ...components,
  };
}
