const stateToAbbrev = {
  'arizona': 'az',
  'california': 'ca',
  'connecticut': 'ct',
  'florida': 'fl',
  'georgia': 'ga',
  'iowa': 'ia',
  'illinois': 'il',
  'kansas': 'ks',
  'michigan': 'mi',
  'montana': 'mt',
  'north carolina': 'nc',
  'new jersey': 'nj',
  'oregon': 'or',
  'rhode island': 'ri',
  'south carolina': 'sc',
  'texas': 'tx',
  'virginia': 'va',
  'wisconsin' : 'wi'
};

const getFiltered = (data, input) => {
  if (input.length < 1) return [];
  else return data.filter((item) => item.name.toLowerCase().includes(input.toLowerCase()));
}

export { getFiltered, stateToAbbrev };