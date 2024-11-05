export default {
  dbUrl: process.env.DATABASE_URL || "./database.sqlite",
  port: process.env.PORT || 5050,
  appHost: "http://localhost:",
  jwtSecret: process.env.JWT_SECRET || "tj67O==5H",
};
