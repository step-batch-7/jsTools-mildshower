const optionNames = {
  '-r': 'reverse'
};

const actOnEachArg = function(preProperties, currArg) {
  if(!/^-/.test(currArg)){
    preProperties.filePath = currArg;
    return preProperties;
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
