const {Schema, model} = require('mongoose');

const ImageSchema = new Schema(
    {
      name: String,
      img: {
        data: Buffer,
        contentType: String,
      },
    },
    {
      collection: 'Image',
      timestamps: true,
    },
);

const ImageModel = model('Image', ImageSchema);

module.exports = ImageModel;
