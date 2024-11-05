export default {
  dbHost: process.env.DB_HOST || "mysql",
  dbPort: 3306,
  dbUser: process.env.DB_USER || "root",
  dbPassword: process.env.DB_PASSWORD || "123",
  dbName: process.env.DB_NAME || "bank",
  port: process.env.PORT || 5050,
  appHost: "http://localhost:",
  jwtSecret: process.env.JWT_SECRET || "tj67O==5H",
};
