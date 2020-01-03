const optionNames = {
  '-r': 'reverse'
};

const selectOption = function(arg) {
  const optionName = optionNames[arg];
  let option = {name: optionName, value: true};
  if(optionName === undefined) {
    option = {name: 'invalidOption', value: arg[1]};
  }
  return option;
};

const actOnEachArg = function(preProperties, currArg) {
  if(preProperties.invalidOption) {
    return preProperties;
  }
	
  if(!currArg.startsWith('-')){
    preProperties.filePath = currArg;
    return preProperties;
  }
	
  const option = selectOption(currArg);
  preProperties[option.name] = option.value;
  return preProperties;
};

const parse = function(userArgs) {
  return userArgs.reduce(actOnEachArg, {});
};

exports.parse = parse;
