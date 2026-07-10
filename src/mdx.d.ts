// Type shape for imported MDX files (compiled to a React component by
// @next/mdx). Lets `import Post from "./x.mdx"` typecheck.
declare module "*.mdx" {
  import type { ComponentType } from "react";
  const MDXComponent: ComponentType;
  export default MDXComponent;
}
