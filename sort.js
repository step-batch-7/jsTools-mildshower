const { readFileSync, existsSync } = require("fs");
const { processContent, performSorting } = require("./src/sortLib");

const main = function() {
  const logger = function(msg) {
    console.log(msg);
  };
  const errorLogger = function(errorMsg) {
    console.error(errorMsg);
  };
  const helperFuncs = {
    contentProcessor: processContent.bind(null, logger),
    reader: readFileSync,
    errorLogger,
    doesExist: existsSync
  };
  const userArgs = process.argv.slice(2);
  performSorting(userArgs, helperFuncs);
};

main();
