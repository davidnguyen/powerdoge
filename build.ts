import * as esbuild from "https://deno.land/x/esbuild@v0.24.0/mod.js"

esbuild.build({
  entryPoints: [
    "src/solution1/webResources/index.ts"
  ],
  outdir: "src/solution1/dist/webResources/",
  bundle: true,
  platform: "browser",
  format: "esm",
  target: "esnext",
  minify: true,
  sourcemap: false,
  treeShaking: true,
})

await esbuild.stop()
