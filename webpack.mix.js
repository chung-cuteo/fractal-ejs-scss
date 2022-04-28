/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const path = require("path");
const glob = require("glob");
const fs = require("fs");
const mix = require("laravel-mix");
require("laravel-mix-clean");
require("laravel-mix-ejs");
require("dotenv").config();

const srcDir = "src";
const staticDir = "static";
const distDir = "dist";

const contentsJson = require("./src/data/contents.json");
const globalData = {
  $data: contentsJson,
  $rootPath: path.resolve(__dirname, "src/views"),
  $partials: path.resolve(__dirname, "src/views/partials") + "/",
  $layouts: path.resolve(__dirname, "src/views/layouts") + "/",
  $components: path.resolve(__dirname, "src/components") + "/",
  $cacheRefresh: `?cr=${Date.now()}`,
};

Mix.manifest.refresh = (_) => void 0;

const ASSET_PATH = process.env.ASSET_PATH || "/";
mix
  .setPublicPath("dist/")
  .clean()
  .webpackConfig({
    module: {
      rules: [
        {
          test: /\.scss/,
          loader: "import-glob-loader",
        },
      ],
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: ASSET_PATH,
    },
  })
  .js(`${srcDir}/assets/js/app.js`, `${distDir}/assets/js/bundle.js`)
  .sass(
    `${srcDir}/assets/css/styles.scss`,
    `${distDir}/assets/css/styles.css`,
    {
      sassOptions: {
        outputStyle: "compressed",
      },
    }
  )
  .options({
    postCss: [
      require("postcss-flexbugs-fixes"),
      require("autoprefixer")({
        grid: true,
      }),
      require("css-mqpacker")(),
      require("css-declaration-sorter")({
        order: "smacss",
      }),
    ],
  })
  .ejs(`${srcDir}/views/**/*.ejs`, `${distDir}`, globalData, {
    base: `${srcDir}/views/pages`,
    partials: [`${srcDir}/views/partials`, `${srcDir}/views/layouts`],
  })
  .copy(`${distDir}/assets/css/styles.css`, `${srcDir}/components/styles.css`)
  .copyDirectory(glob.sync(`${staticDir}`), `${distDir}`)
  .alias({
    "~": path.resolve(__dirname, "src"),
    "@bootstrap": path.resolve(__dirname, "src/assets/css/base/_bootstrap.scss"),
  })
  .browserSync({
    open: true,
    proxy: false,
    server: "dist/",
    files: [`${distDir}/**/*.{css,js,html,php}`],
  });

if (mix.inProduction()) {
  mix.options({
    cssNano: {
      // discardComments: {removeAll: true},
    },
  });
}
