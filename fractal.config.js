// https://fractal.build/guide/project-settings.html#project-settings-and-configuration

"use strict";

/* Create a new Fractal instance and export it for use elsewhere if required */
const fractal = (module.exports = require("@frctl/fractal").create());

/* Set the title of the project */
fractal.set("project.title", "Style Library");

/* Tell Fractal where the components will live */
fractal.components.set("path", __dirname + "/src/components");
fractal.components.set("ext", ".html");
fractal.components.set("default.preview", "@preview");

/* Tell Fractal where the documentation pages will live */
fractal.docs.set("path", __dirname + "/src/docs");

/* Specify a directory of static assets */
fractal.web.set("static.path", __dirname + "/src/components");

/* Set the static HTML build destination */
fractal.web.set("builder.dest", __dirname + "/guide-build");

fractal.web.set("server.sync", true);
fractal.web.set("server.syncOptions", { open: true });
