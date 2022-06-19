const FakeDatabase = require('./utils/FakeDatabase');
const FakeServer = require('./utils/FakeServer');
const {generateRandomUser, generateRandomUserAndSave} = require('./utils/mockers');


describe('User router', ()=>{
  beforeAll(async () => {
    await FakeDatabase.connect();
  });
  afterAll(async () => {
    await FakeDatabase.closeDatabase();
  });

  describe('Creating user', ()=>{
    describe('should not let user create without', ()=>{
      it('name', async ()=>{
        const user = generateRandomUser();
        delete user.name;

        const {status, text} = await FakeServer.post('/user').send(user);

        expect(status).toBe(400);
        expect(JSON.parse(text).error).toContain('name');
      });
      it('email', async ()=>{
        const user = generateRandomUser();
        delete user.email;

        const {status, text} = await FakeServer.post('/user').send(user);

        expect(status).toBe(400);
        expect(JSON.parse(text).error).toContain('email');
      });
      it('password', async ()=>{
        const user = generateRandomUser();
        delete user.password;

        const {status, text} = await FakeServer.post('/user').send(user);

        expect(status).toBe(400);
        expect(JSON.parse(text).error).toContain('password');
      });
    });
    describe('should not let user create if', ()=>{
      it('email is invalid', async ()=>{
        const user = generateRandomUser();
        user.email = 'emailbrabo';

        const {status, text} = await FakeServer.post('/user').send(user);

        expect(status).toBe(400);
        expect(JSON.parse(text).error).toContain('invalid');
      });
      it('email already exists', async ()=>{
        const user = await generateRandomUserAndSave();

        const {status, text} = await FakeServer.post('/user').send(user);

        expect(status).toBe(400);
        expect(JSON.parse(text).error).toContain('exists');
      });
    });
    it('should let user create with all right variables', async ()=>{
      const user = generateRandomUser();

      const {status, text} = await FakeServer.post('/user').send(user);

      expect(status).toBe(200);
      expect(JSON.parse(text).id).toBeDefined();
    });
  });
  describe('Authenticating user', ()=>{
    describe('should not let user authenticate without', ()=>{
      it('email', async ()=>{
        const user = await generateRandomUserAndSave();
        const {status, text} = await FakeServer.post('/user/login').send({
          password: user.password,
        });

        expect(status).toBe(400);
        expect(JSON.parse(text).error).toContain('email');
      });
      it('password', async ()=>{
        const user = await generateRandomUserAndSave();
        const {status, text} = await FakeServer.post('/user/login').send({
          email: user.email,
        });

        expect(status).toBe(400);
        expect(JSON.parse(text).error).toContain('password');
      });
    });
    describe('should not let user authenticate with wrong', ()=>{
      it('password', async ()=>{
        const user = await generateRandomUserAndSave();

        const {status, text} = await FakeServer.post('/user/login').send({
          email: user.email,
          password: 'wrong password',
        });

        expect(status).toBe(404);
        expect(JSON.parse(text).error).toContain('incorrect');
      });
      it('email', async ()=>{
        const user = await generateRandomUserAndSave();

        const {status, text} = await FakeServer.post('/user/login').send({
          email: 'wrong email',
          password: user.password,
        });

        expect(status).toBe(404);
        expect(JSON.parse(text).error).toContain('incorrect');
      });
    });
    it('should let user authenticate with all right variables', async ()=>{
      const user = await generateRandomUserAndSave();
      const {status, text} = await FakeServer.post('/user/login').send(user);
      expect(status).toBe(200);
      expect(JSON.parse(text).id).toBeDefined();
    });
  });
});
