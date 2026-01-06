import { Sequelize } from "sequelize";

export const db = new Sequelize('postgres', 'admin', 'admin', {
    host: 'localhost',
    dialect: 'postgres'
})


try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}