import { Sequelize } from "sequelize";

export const dbPostgre = new Sequelize("database", "username", "password", {
	host: "localhost",
	dialect: "postgres",
});
