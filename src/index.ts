import { Elysia, t } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import fs from "fs";
import { cors } from "@elysiajs/cors";
import { tailwind } from "@gtramontina.com/elysia-tailwind";

const FILE_PATH =
  "C:/Users/chama/Downloads/[Judas] Bleach (Season 17 pt.3) [1080p][HEVC x265 10bit][Dual-Audio][Multi-Subs]v2";

const app = new Elysia()

  .use(
    staticPlugin({
      prefix: "/",
      alwaysStatic: true,
      indexHTML: true,
    })
  )
  .use(
    staticPlugin({
      prefix: "/download",
      assets: FILE_PATH,
      enableDecodeURI: true,
    })
  )
  .use(
    tailwind({
      path: "/public/output.css",
      source: "source/styles.css",
      config: "tailwind.config.js",
      options: {
        minify: true,
        map: true,
        autoprefixer: false,
      },
    })
  )
  .use(cors())
  .get("/", () => Bun.file("./public/index.html"))

  .get("/upload", () => {
    if (!fs.existsSync(FILE_PATH)) {
      return "";
    }
    const files = fs.readdirSync(FILE_PATH, { withFileTypes: true });
    return { files, folder: FILE_PATH.split("/").pop() };
  })
  .listen({ port: 8080, hostname: "localhost" });

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
