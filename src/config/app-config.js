import 'dotenv/config.js'

export const DB = getDB()
function getDB() {
    const envMode = process.env.ENV_MODE || 'development'
    switch (envMode) {
        case 'development':
            return {
                NAME: process.env.DB_NAME,
                HOST: process.env.DB_HOST,
                USERNAME: process.env.DB_USER,
                PASSWORD: process.env.DB_PASSWORD
            }
        case 'production':
            break;
        default:
            break;
    }
}

export const EXPRESS = {
    PORT: process.env.PORT
}