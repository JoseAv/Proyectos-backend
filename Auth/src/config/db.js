import { Sequelize } from "sequelize"

export const dbPostgre = new Sequelize('postgres', 'admin', 'admin', {
    host: 'localhost',
    dialect: 'postgres'
})


try {
    await dbPostgre.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}