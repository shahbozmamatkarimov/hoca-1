import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
export const sequelize = new Sequelize({
  database: process.env.PG_DATABASE as string,
  username: process.env.PG_USER as string,
  password: process.env.PG_PASSWORD as string,
  host: process.env.PG_HOST as string, // Masalan: 'localhost' yoki boshqa manzil
  port: Number(process.env.PG_PORT), // PostgreSQL port (default: 5432)
  dialect: 'postgres', // PostgreSQL ma'lumotlar bazasi,
  logging: false
});
// import { associateModels } from "../models/Test/Associate/associate.js";
// associateModels(sequelize)
async function main() {
  try {
    // Ma'lumotlar bazasiga ulanamiz
    await sequelize.authenticate();
    console.log('Ma\'lumotlar bazasiga muvaffaqiyatli ulandik');
    // Modelni sinxronizatsiya qilamiz
    console.log('User modeli ma\'lumotlar bazasiga sinxronizatsiya qilindi');
  } catch (error) {
    console.error('Ma\'lumotlar bazasiga ulanishda xatolik:', error);
  }
}

main();