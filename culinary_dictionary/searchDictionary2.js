import React from 'react';

function searchDictionary2(props) {
    const dictionary = JSON.parse("test.txt");
    const fuse = new Fuse(dictionary, options);

    var searchResults = fuse.search(props.name);
    console.log(searchResults)
    return searchResults[0]; // get best definition
    return (
        <div>
            
        </div>
    );
}

export default searchDictionary2;