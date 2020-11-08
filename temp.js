/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

 
// Imports the Google Cloud client library
const language = require('@google-cloud/language');
// import fuzzy search
const Fuse = require('fuse.js')
const fetch = require('node-fetch');
const cheerio = require('cheerio');

// exports.helloWorld = (req, res) => { 
//   const restaurantAlias = req.query.restaurant || req.body.restaurant || 'le-bernardin-new-york';
//   const dishName = req.query.dish || req.body.dish || 'chicken parm';
//   const sentiments = []
//   getReviews(restaurantAlias).then((reviews) => {
//     reviews.forEach(review => {
//       var document = {
//         content: review,
//         type: 'PLAIN_TEXT',
//       };
//       getSentences(document, dishName).then((sentences) => {
//         sentences.forEach(sentence => {
//           sentiments.push(sentence);
//         })
//       })
//     })
//     res.send({body: sentiments})
//   });
// }

exports.helloWorld = (req, res) => { 
  const restaurantAlias = req.query.restaurant || req.body.restaurant || 'le-bernardin-new-york';
  const dishName = req.query.dish || req.body.dish || 'chicken parm';
  return getSentiments(restaurantAlias, dishName).then((sentiments) => res.send({body: sentiments}));
}

async function getSentiments(restaurantAlias, dishName) {
  const sentiments = [];
  const reviews = getReviews(restaurantAlias);
  for (review in reviews) {
    var document = {
      content: review,
      type: 'PLAIN_TEXT',
    }
    const sentences = await getSentences(document, dishName);
    for(sentence in sentences) {
      sentiments.push(sentence);
    }
  }
  return sentiments
}

async function getReviews(restaurantAlias) {
  var count = 0;
  var reviews = [];
  while (count < 3) {
    console.log(`https://www.yelp.com/biz/${restaurantAlias}?start=${count*20}`)
    const response = await fetch(`https://www.yelp.com/biz/${restaurantAlias}?start=${count*20}`);
    const responseHTML = await response.text();
    const $ = cheerio.load(responseHTML);
    $('.lemon--span__373c0__3997G.raw__373c0__3rcx7').each(function() {
      reviews.push($(this).text());
    });
    
    // var reviewsOnPage = $('.lemon--span__373c0__3997G.raw__373c0__3rcx7').text();
    // reviews.push(reviewsOnPage);
    count++;
  }
  return (reviews);
}



// Instantiates a client
const client = new language.LanguageServiceClient();

const nAdjSent = 1;

// set up fuzzy search
const options = {
  // isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  //includeMatches: true,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  // threshold: 0.6,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  keys: [
    "text.content"
  ]
};

async function getSentences(document, dish) {
  // Detects the sentiment of the text
  const [result] = await client.analyzeSentiment({document: document});
  const overallSentiment = result.documentSentiment;
  const sentences = result.sentences;

  // var output = "";
  // output += `Text: ${text} \n`+ `Sentiment score: ${overallSentiment.score} \n` + `Sentiment magnitude: ${overallSentiment.magnitude}`;

  // output += getDishSentences(sentences);

  return(getDishSentences(sentences, dish));

}

getDishSentences = (sentences, dish) => {
  var dishSents = [];

  for (var i = 0; i < sentences.length; i++) {
      const words = sentences[i].text.content; 

      var arr = [];
      arr.push(sentences[i])

      const fuse = new Fuse(arr, options);

      var searchResults = fuse.search(dish);
      console.log("SEARCH RESULTS: " + searchResults.length);

      if (!(searchResults === undefined || searchResults.length == 0)) {
          // copy the sentence
          var newSent = JSON.parse(JSON.stringify(sentences[i]));

          // add the adjacent sentences
          var adjSents = words;

          for (var j = 1; j <= nAdjSent; j++) {
              if (i - j >= 0) {
                  adjSents = sentences[i - j].text.content + " " + adjSents;
              }
              if (i + j < sentences.length) {
                  adjSents += " " + sentences[i + j].text.content; 
              }
          }

          newSent.text.content = adjSents;
          dishSents.push(newSent);
      } 
  }
  return dishSents;
}
