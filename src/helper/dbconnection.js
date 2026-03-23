import { Sequelize } from "sequelize";

let sequelize = null;

const getConnection = async () => {
  if (sequelize) return sequelize;

  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: "postgres",
    },
  );

  try {
    await sequelize.authenticate();
    console.log("DB connected");
  } catch (error) {
    console.error("DB error:", error.message);
  }

  return sequelize;
};

export default getConnection;
