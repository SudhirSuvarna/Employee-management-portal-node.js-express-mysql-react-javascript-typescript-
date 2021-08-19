module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Tel@12345",
  DB: "myDatabase",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
