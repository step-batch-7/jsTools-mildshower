const optionNames = {
  '-r': 'reverse'
};

const actOnEachArg = function(preProperties, currArg) {
  if(preProperties.areOptionsInvalid) {
    return preProperties;
  }
	
  if(!currArg.startsWith('-')){
    preProperties.filePath = currArg;
    return preProperties;
  }
	
  const optionToUpdate = optionNames[currArg] || 'areOptionsInvalid';
  preProperties[optionToUpdate] = true;
  return preProperties;
};

const parse = function(userArgs) {
  const defaultProperties = {reverse: false, areOptionsInvalid: false};
  return userArgs.reduce(actOnEachArg, defaultProperties);
};

exports.parse = parse;
