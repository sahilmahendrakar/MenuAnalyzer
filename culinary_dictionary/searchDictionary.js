import Fuse from 'fuse.js';

// set up fuzzy search
const options = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: true,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
  };

export const searchDictionary = (term) => {
    const dictionary = JSON.parse("test.txt");
    const fuse = new Fuse(dictionary, options);

    var searchResults = fuse.search(term);
    console.log(searchResults)
    return searchResults[0]; // get best definition
}