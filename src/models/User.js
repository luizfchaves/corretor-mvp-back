const {Schema, model} = require('mongoose');
const {isEmail} = require('validator');
const bcryptjs = require('bcryptjs');

const UserSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        validate: [{validator: isEmail, msg: 'Invalid email', type: 'invalid'}],
      },
      password: {
        type: String,
        required: true,
      },
    },
);

const hashPassword = async (password) => {
  const salt = bcryptjs.genSaltSync(10);
  return bcryptjs.hash(password, salt);
};


// @ts-ignore
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await hashPassword(this.password);
});

const UserModel = model('User', UserSchema);


module.exports = UserModel;
