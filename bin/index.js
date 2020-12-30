#!/usr/bin/env node

const generate = require("../generate");
const [
  nodePath,
  currentDirectory,
  ...[command, moduleType, path, type]
] = process.argv;

if (command === "version" || command === "v") {
  console.log("React-CMD v1.0");
  process.exit();
}

if (command === "generate" || command === "g") {
  generate(moduleType, process.cwd() + "/" + path, type);
}
