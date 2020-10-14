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
            const viewsPath = pathFromArray(viewsRelativePath)
            const bootstrapStyleRelativePath = process.env.BOOTSTRAP_CSS_RELATIVE_PATH.split(',')
            const bootstrapStylePath = pathFromArray(bootstrapStyleRelativePath)
            const bootstrapScriptRelativePath = process.env.BOOTSTRAP_JS_RELATIVE_PATH.split(',')
            const bootstrapScriptPath = pathFromArray(bootstrapScriptRelativePath)
            const jqueryRelativePath = process.env.JQUERY_RELATIVE_PATH.split(',')
            const jqueryPath = pathFromArray(jqueryRelativePath)
            return {
                PORT: process.env.PORT,
                VIEWS_PATH: viewsPath,
                BOOTSTRAP_STYLE_PATH: bootstrapStylePath,
                BOOTSTRAP_SCRIPT_PATH: bootstrapScriptPath,
                JQUERY_PATH: jqueryPath
            }
        case 'production':
            break;
        default:
            break;
    } 
}

/**
 * 
 * It takes an array of folders in specific order and return absolute path string with them in that order
 * @param {array} haystack 
 * @returns {string} path
 */
function pathFromArray(haystack){
    let resultPath = process.cwd()
    haystack.forEach(folderName => {
        resultPath = path.resolve(resultPath, folderName)
    })
    return resultPath
}