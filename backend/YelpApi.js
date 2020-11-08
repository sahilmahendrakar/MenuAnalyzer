import {YELP_API_KEY} from "./api/config";

export const getRestaurantsFromYelp = (name) => {
    return fetch(`https://api.yelp.com/v3/businesses/search?term=${name}&categories=restaurants&location='New York City'`, {headers: {
        authorization: 'Bearer ' + YELP_API_KEY,
    }})
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
}

const getTopRestaurantIdfromRestaurants = (restaurants) => {
  return restaurants.businesses[0].id;
}

export const getAllReviewsFromRestaurantWithID = (id) => {
  return fetch(`https://api.yelp.com/v3/businesses/${id}/reviews`, {headers: {
        authorization: 'Bearer ' + YELP_API_KEY,
    }})
    .then((response) => response.json())
    .then((json) => {
      return json.reviews;
    })
    .catch((error) => {
      console.error(error);
    });
}

export const getAllReviewsFromRestaurant = (name) => {
  return getRestaurantsFromYelp(name)
  .then((response) => {return getAllReviewsFromRestaurantWithID(getTopRestaurantIdfromRestaurants(response))})
}

export const getRestaurantsFromLatLong = (lat, long) => {
  return fetch(`https://api.yelp.com/v3/businesses/search?categories=restaurants&latitude=${lat}&longitude=${long}`, {headers: {
        authorization: 'Bearer ' + YELP_API_KEY,
    }})
    .then((response) => response.json())
    .then((json) => {
      return json.businesses;
    })
    .catch((error) => {
      console.error(error);
    });
}