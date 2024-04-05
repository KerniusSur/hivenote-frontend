const path = require("node:path");
const { generateApi } = require("swagger-typescript-api");

generateApi({
  output: path.resolve(process.cwd(), "./src/api"),
  url: "http://localhost:8080/v3/api-docs",
  axios: true,
  modular: true,
  cleanOutput: true,
  unwrapResponseData: true,
  moduleNameIndex: 3,
  httpClientType: "axios",
  hooks: {
    // eslint-disable-next-line
    onCreateRouteName(nameInfo, rawInfo) {
      nameInfo.original = nameInfo.original.replace(/\d+$/, "");
      nameInfo.usage = nameInfo.usage.replace(/\d+$/, "");
    },
  },
});
