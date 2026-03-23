import { Sequelize } from "sequelize";

let sequelize = null;

const getConnection = async () => {
  try {
    if (sequelize) return sequelize;

    const dbName = process.env.DB_NAME || "Practice_1";
    const dbUser = process.env.DB_USER || "postgres";
    const dbPassword = String(process.env.DB_PASSWORD || "1947");
    const dbHost = process.env.DB_HOST || "localhost";

    console.log("DB CONFIG:", dbName, dbUser, dbPassword, dbHost);

    sequelize = new Sequelize(dbName, dbUser, dbPassword, {
      host: dbHost,
      dialect: "postgres",
      logging: false,
    });

    await sequelize.authenticate();
    console.log("DB connected successfully");

    return sequelize;
  } catch (error) {
    console.error("DB connection error:", error.message);
    throw error;
  }
};

export default getConnection;
