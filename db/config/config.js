module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: 'postgres',
    dialect: 'postgres',
    migrationStorage: 'json',
    seederStorage: 'json',
  },
};
