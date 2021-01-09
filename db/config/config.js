const { env } = process;

module.exports = {
  development: {
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DB,
    host: 'postgres',
    dialect: 'postgres',
    migrationStorage: 'json',
    seederStorage: 'json',
  },
};
