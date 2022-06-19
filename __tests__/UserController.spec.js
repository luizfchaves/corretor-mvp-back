const request = require('supertest');
const server = require('../app');
const testDatabase = require('./db');

const user = {
  name: 'Luiz o mais brabo',
  email: 'emailbrabo@email.com',
  password: '123456',
};

describe('User router', ()=>{
  beforeAll(async () => {
    await testDatabase.connect();
  });
  afterAll(async () => {
    await testDatabase.closeDatabase();
  });

  describe('Creating user', ()=>{
    describe('should not let user create without', ()=>{
      it('name', async ()=>{
        const {status, text} = await request(server).post('/user').send({
          email: user.email,
          password: user.password,
        });

        expect(status).toBe(400);
        expect(JSON.parse(text).error).toContain('name');
      });
      it('email', async ()=>{
        const {status, text} = await request(server).post('/user').send({
          name: user.name,
          password: user.password,
        });

        expect(status).toBe(400);
        expect(JSON.parse(text).error).toContain('email');
      });
      it('password', async ()=>{
        const {status, text} = await request(server).post('/user').send({
          email: user.email,
          name: user.name,
        });

        expect(status).toBe(400);
        expect(JSON.parse(text).error).toContain('password');
      });
    });
    it('should let user create with all right variables', async ()=>{
      const {status, text} = await request(server).post('/user').send({
        name: user.name,
        email: user.email,
        password: user.password,
      });

      expect(status).toBe(200);
      expect(JSON.parse(text).id).toBeDefined();
    });
  });
  describe('Authenticating user', ()=>{
    describe('should not let user create without', ()=>{
      it('email', async ()=>{
        const {status, text} = await request(server).post('/user/login').send({
          password: user.password,
        });

        expect(status).toBe(400);
        expect(JSON.parse(text).error).toContain('email');
      });
      it('password', async ()=>{
        const {status, text} = await request(server).post('/user/login').send({
          email: user.email,
        });

        expect(status).toBe(400);
        expect(JSON.parse(text).error).toContain('password');
      });
    });
    it('should let user authenticate with all right variables', async ()=>{
      const {status, text} = await request(server).post('/user/login').send({
        email: user.email,
        password: user.password,
      });

      expect(status).toBe(200);
      expect(JSON.parse(text).id).toBeDefined();
      expect(1).toBe(2);
    });
  });
});
