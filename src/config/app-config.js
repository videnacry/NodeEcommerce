import 'dotenv/config.js'
import path from 'path'

const envMode = process.env.ENV_MODE || 'development'

export const DB = getDB()
function getDB() {
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

export const EXPRESS = getExpress()
function getExpress(){
    switch(envMode){
        case 'development':
            const viewsRelativePath = process.env.VIEWS_RELATIVE_PATH.split(',')
            let viewsPath = path.resolve(process.cwd())
            viewsRelativePath.forEach(folderName => {
                viewsPath = path.resolve(viewsPath, folderName)
            })
            return {
                PORT: process.env.PORT,
                VIEWS_PATH: viewsPath
            }
        case 'production':
            break;
        default:
            break;
    } 
}