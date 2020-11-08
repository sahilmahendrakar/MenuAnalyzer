const { REVIEW_ENDPOINT } = require("./config")

const getReviewURL = (restaurant, dish) => {
    return `${REVIEW_ENDPOINT}?restaurant=${restaurant}&dish=${dish}`
}

export const getReviewsAndAnalysis = (restaurant, dish) => {
    return fetch(getReviewURL(restaurant, dish))
    .then((response) => response.json())
    .then((json) => {
      return json.body;
      })
      .catch((error) => {
        console.error(error);
      });
}

export const sortReviews = (fileName, revNum) => {
  var topOut = [];
  var bottomOut = [];
  var output = [];
  var reviews = JSON.parse(fileName);
  for (var i = 0; i < reviews.length; i ++) {
    output.push([reviews[i].sentiment.score, reviews[i].text.content]);
  }
  output.sort();
  for (i = 0; i < revNum; i ++){
    topOut.push(output[i][1]);
  }
  for (i = output.length - 1; i > 0; i --){
    bottomOut.push(output[i][1]);
  }
  return topOut, bottomOut
}




