const { IMAGE_BUCKET } = require("../config/imageToTextConfig")
const { IMAGE_TO_TEXT_ENDPOINT } = require("./config")

const getImageToTextURL = (bucket, filename) => {
    return `${IMAGE_TO_TEXT_ENDPOINT}?bucket=${bucket}&filename=${filename}`
}

export const imageToText = (uuid) => {
    return fetch(getImageToTextURL(IMAGE_BUCKET, uuid))
    .then((response) => response.json())
    .then((json) => {
        return json.text.split("\n");
      })
      .catch((error) => {
        console.error(error);
      });
}