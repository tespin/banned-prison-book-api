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

const sortBy = (a, b, sortType = 1) => {
    if (sortType === 'ascending' ||
        sortType === 'asc' ||
        sortType == 1) {
        if (Number.isNaN(a[filterParams.sort])) {
            return ( 
                a[filterParams.sort].localeCompare(b[filterParams.sort])
            );
        } else {
            if (a[filterParams.sort] > b[filterParams.sort]) {
                return 1;
            }
            if (a[filterParams.sort] < b[filterParams.sort]) {
                return -1;
            }
            return 0;
        }
        
    } else if (sortType === 'descending' ||
        sortType === 'desc' ||
        sortType == 1) {
        if (Number.isNaN(a[filterParams.sort])) {
            return ( 
                b[filterParams.sort].localeCompare(a[filterParams.sort])
            );
        } else {
            if (a[filterParams.sort] > b[filterParams.sort]) {
                return -1;
            }
            if (a[filterParams.sort] < b[filterParams.sort]) {
                return 1;
            }
            return 0;
        }
    }
}

module.exports = { stateToAbbrev, sortBy };