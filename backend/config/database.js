module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: `${process.env.DB_NAME}_development`,
        host: process.env.DB_HOST,
        dialect: "postgres",
    },
}