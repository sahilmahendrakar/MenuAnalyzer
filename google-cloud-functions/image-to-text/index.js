/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.helloWorld = (req, res) => {
    let message = req.query.message || req.body.message || 'Hello World!';
    const bucket = req.query.bucket || req.body.bucket || 'ma-images';
    const filename = req.query.filename || req.body.filename;
    return processImage(bucket, filename).then((text) => res.send({
      bucket: bucket,
      filename: filename,
      text: text,
    }))
    res.status(200).send(message);
  };
  
  
  /**
   * Triggered from a change to a Cloud Storage bucket.
   *
   * @param {!Object} event Event payload.
   * @param {!Object} context Metadata for the event.
   */
  
  const {PubSub} = require('@google-cloud/pubsub');
  const pubsub = new PubSub();
  // Get a reference to the Cloud Storage component
  const {Storage} = require('@google-cloud/storage');
  const storage = new Storage();
  
  // Get a reference to the Cloud Vision API component
  const Vision = require('@google-cloud/vision');
  const vision = new Vision.ImageAnnotatorClient();
  
  // Get a reference to the Translate API component
  const {Translate} = require('@google-cloud/translate').v2;
  const translate = new Translate();
  
  // [START functions_ocr_detect]
  /**
   * Detects the text in an image using the Google Vision API.
   *
   * @param {string} bucketName Cloud Storage bucket name.
   * @param {string} filename Cloud Storage file name.
   * @returns {Promise}
   */
  const detectText = async (bucketName, filename) => {
    console.log(`Looking for text in image ${filename}`);
    const [textDetections] = await vision.textDetection(
      `gs://${bucketName}/${filename}`
    );
    const [annotation] = textDetections.textAnnotations;
    const text = annotation ? annotation.description : '';
    console.log('Extracted text from image:', text);
    return text;
  };
  
  const processImage = async (bucket, name) => {
  
    if (!bucket) {
      throw new Error(
        'Bucket not provided. Make sure you have a "bucket" property in your request'
      );
    }
    if (!name) {
      throw new Error(
        'Filename not provided. Make sure you have a "name" property in your request'
      );
    }
  
    const text = await detectText(bucket, name);
    console.log(`File ${name} processed.`);
    return text;
  };
  // [END functions_ocr_process]
  
  // [START functions_ocr_translate]
  /**
   * This function is exported by index.js, and is executed when
   * a message is published to the Cloud Pub/Sub topic specified
   * by the TRANSLATE_TOPIC environment variable. The function
   * translates text using the Google Translate API.
   *
   * @param {object} event The Cloud Pub/Sub Message object.
   * @param {string} {messageObject}.data The "data" property of the Cloud Pub/Sub
   * Message. This property will be a base64-encoded string that you must decode.
   */
  exports.translateText = async event => {
    const pubsubData = event.data;
    const jsonStr = Buffer.from(pubsubData, 'base64').toString();
    const {text, filename, lang} = JSON.parse(jsonStr);
  
    if (!text) {
      throw new Error(
        'Text not provided. Make sure you have a "text" property in your request'
      );
    }
    if (!filename) {
      throw new Error(
        'Filename not provided. Make sure you have a "filename" property in your request'
      );
    }
    if (!lang) {
      throw new Error(
        'Language not provided. Make sure you have a "lang" property in your request'
      );
    }
  
    console.log(`Translating text into ${lang}`);
    const [translation] = await translate.translate(text, lang);
  
    console.log('Translated text:', translation);
  
    const messageData = {
      text: translation,
      filename: filename,
      lang: lang,
    };
  
    await publishResult(process.env.RESULT_TOPIC, messageData);
    console.log(`Text translated to ${lang}`);
  };
  // [END functions_ocr_translate]
  
  // [START functions_ocr_save]
  /**
   * This function is exported by index.js, and is executed when
   * a message is published to the Cloud Pub/Sub topic specified
   * by the RESULT_TOPIC environment variable. The function saves
   * the data packet to a file in GCS.
   *
   * @param {object} event The Cloud Pub/Sub Message object.
   * @param {string} {messageObject}.data The "data" property of the Cloud Pub/Sub
   * Message. This property will be a base64-encoded string that you must decode.
   */
  exports.saveResult = async event => {
    const pubsubData = event.data;
    const jsonStr = Buffer.from(pubsubData, 'base64').toString();
    const {text, filename, lang} = JSON.parse(jsonStr);
  
    if (!text) {
      throw new Error(
        'Text not provided. Make sure you have a "text" property in your request'
      );
    }
    if (!filename) {
      throw new Error(
        'Filename not provided. Make sure you have a "filename" property in your request'
      );
    }
    if (!lang) {
      throw new Error(
        'Language not provided. Make sure you have a "lang" property in your request'
      );
    }
  
    console.log(`Received request to save file ${filename}`);
  
    const bucketName = 'ma-text';
    const newFilename = renameImageForSave(filename, lang);
    const file = storage.bucket(bucketName).file(newFilename);
  
    console.log(`Saving result to ${newFilename} in bucket ${bucketName}`);
  
    await file.save(text);
    console.log('File saved.');
  };
  
  exports.helloGCS = (event, context) => {
    const gcsEvent = event;
    console.log(`Processing file: ${gcsEvent.name}`);
  };
  