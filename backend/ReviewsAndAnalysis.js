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