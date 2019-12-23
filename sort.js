const { readFile, existsSync } = require("fs");
const { performSort: performSorting } = require("./src/sortLib");

const main = function() {
  const logger = function(msg) {
    console.log(msg);
  };
  const errorLogger = function(errorMsg) {
    console.error(errorMsg);
  };
  const helperFuncs = {
    logger,
    reader: readFile,
    errorLogger,
    doesExist: existsSync
  };
  const userArgs = process.argv.slice(2);
  performSorting(userArgs, helperFuncs);
};

main();
