import { Elysia, t } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import fs from "fs";
import { cors } from "@elysiajs/cors";

const FILE_PATH = "./val";

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
      prefix: "/val",
      assets: FILE_PATH,
      enableDecodeURI: true,
    })
  )
  .use(cors())
  .get("/", () => Bun.file("./public/index.html"))

  .get("/upload", () => {
    if (!fs.existsSync(FILE_PATH)) {
      return "";
    }
    const files = fs.readdirSync(FILE_PATH, { withFileTypes: true });
    console.log(files);
    return files;
  })
  .listen({ port: 8080, hostname: "localhost" });

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
