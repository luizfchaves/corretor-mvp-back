const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

const ImageModel = require('../models/ImageModel');
const Logger = require('../plugins/logger');

const ImageController = {
  upload: async function(req, res) {
    const {name} = req.body;
    const file = req.files.file;


    if (!file) {
      Logger.debug('No file uploaded');
      return res.status(400).json({error: 'No file received'});
    }

    if (!name) {
      Logger.debug('No name provided');
      return res.status(400).json({error: 'No name received'});
    }

    const fileSize = file.size / 1024;
    if (fileSize > 512) {
      Logger.debug('File size is too big');
      return res.status(400).json({error: `File too large: ${fileSize}KB (max 512KB)`});
    }

    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      Logger.debug('File type is not supported');
      return res .status(400) .json({error: `File type not supported: ${file.mimetype} (only jpeg and png)`});
    }


    try {
      // Depois eu coloco salvando na nuvem direito, agora não importa
      const imagePointer = await ImageModel.create({
        name: `${name}-${dayjs().utc().format()}`,
        img: {
          data: file.data,
          contentType: file.mimetype,
        },
      });
      return res.status(200).json({id: imagePointer._id});
    } catch (err) {
      Logger.error('err: ', err);
      return res.status(500).send('File upload failed');
    }
  },

  get: async function(req, res) {
    const id = req.params.id;
    if (!id) {
      Logger.debug('No id provided');
      return res.status(400).json({error: 'No id received'});
    }

    let image;
    try {
      image = await ImageModel.findOne({_id: id});
    } catch (e) {
      Logger.error('Error searching image: ', e);
      return res.status(404).json({error: 'No image found'});
    }

    if (!image) {
      Logger.debug('Image not found');
      return res.status(404).json({error: 'No image found'});
    }

    const blob = Buffer.from(image.img.data, 'base64');
    res.set('Content-Type', image.img.contentType);
    res.send(blob);
  },
};

module.exports = ImageController;
