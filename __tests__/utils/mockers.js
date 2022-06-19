const {faker} = require('@faker-js/faker');
const userModel = require('../../src/models/UserModel');

const generateRandomUser = () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

const generateRandomUserAndSave = async () => {
  const user = generateRandomUser();
  const userPointer = await userModel.create(user);
  return {...user, id: userPointer._id};
};

module.exports = {
  generateRandomUser,
  generateRandomUserAndSave,
};
