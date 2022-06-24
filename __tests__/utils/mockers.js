const {faker} = require('@faker-js/faker');
const DatabaseClient = require('../../src/plugins/database/client');

const generateRandomUser = () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

const generateRandomUserAndSave = async () => {
  const user = generateRandomUser();
  const userPointer = await new DatabaseClient('User').create(user);
  return {...user, id: userPointer._id};
};

module.exports = {
  generateRandomUser,
  generateRandomUserAndSave,
};
