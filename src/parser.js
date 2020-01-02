const optionNames = {
  '-r': 'reverse'
};

const isValidOption = function(option) {
  const options = Object.keys(optionNames);
  return options.includes(option);
};

const actOnEachArg = function(preProperties, currArg) {
  if(preProperties.areOptionsInvalid) {
    return preProperties;
  }
	
  if(!currArg.startsWith('-')){
    preProperties.filePath = currArg;
    return preProperties;
  }
	
  if(!isValidOption(currArg)) {
    return {areOptionsInvalid: true};
  }
	
  const optionName = optionNames[currArg];
  preProperties[optionName] = true;
  return preProperties;
};

const parse = function(userArgs) {
  const defaultProperties = {reverse: false, areOptionsInvalid: false};
  return userArgs.reduce(actOnEachArg, defaultProperties);
};

exports.parse = parse;
