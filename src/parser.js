const selectOption = function(arg, optionSet) {
  const optionName = optionSet[arg];
  let option = {name: optionName, value: true};
  if(optionName === undefined) {
    const [, givenOption] = arg.match(/.(.*)/);
    option = {name: 'invalidOption', value: givenOption};
  }
  return option;
};

const readArg = function(optionSet, recordedOptions, currArg) {
  if(recordedOptions.invalidOption) {
    return recordedOptions;
  }
	
  if(!currArg.startsWith('-')){
    recordedOptions.filePath = currArg;
    return recordedOptions;
  }
	
  const option = selectOption(currArg, optionSet);
  recordedOptions[option.name] = option.value;
  return recordedOptions;
};

class Parser {
  constructor(optionSet) {
    this.optionSet = optionSet;
  }

  parse(userArgs) {
    return userArgs.reduce(readArg.bind(null, this.optionSet), {});
  }
}

module.exports = Parser;
