import { Elysia, t } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import fs from "fs";
import { cors } from "@elysiajs/cors";
import { tailwind } from "@gtramontina.com/elysia-tailwind";
import archiver from "archiver";
import os from "node:os";

const FILE_PATH = "C:/Users/chama/Downloads/Test Folder";

const IpV4 = Object.values(os.networkInterfaces())
  .flat()
  .find((net: any) =>
    typeof net.family === "string" ? net.family === "IPv4" : net.family === 4
  )?.address;

const app = new Elysia()
  .onBeforeHandle(async (ctx) => {})
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
  .get("/", () => Bun.file("./public/index.html")) // serve static html

  .get("/upload", () => {
    if (!fs.existsSync(FILE_PATH)) {
      return "";
    }

    // read files in given location
    const files = fs.readdirSync(FILE_PATH, { withFileTypes: true });

    // creating zip downloader
    const output = fs.createWriteStream(
      `temp/${FILE_PATH.split("/").pop()}.zip`
    );
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", function () {
      console.log(archive.pointer() + " total bytes");
      console.log(
        "archiver has been finalized and the output file descriptor has closed."
      );
    });

    archive.on("warning", function (err: any) {
      if (err.code === "ENOENT") {
        console.log(err);
      } else {
        throw err;
      }
    });

    // saving files to zip
    archive.pipe(output);
    files.forEach((file) => {
      archive.append(fs.createReadStream(FILE_PATH + "/" + file.name), {
        name: file.name,
      });
    });
    archive.finalize();

    return { files, folder: FILE_PATH.split("/").pop() };
  })
  .get("temp/:name", (ctx) => {
    return Bun.file(`temp/${ctx.params.name}`); // serve static zip file
  })
  .listen({ port: 8080, hostname: IpV4 });

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
