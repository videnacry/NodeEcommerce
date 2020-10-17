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
            const bootstrapStyleRelativePathArray = process.env.BOOTSTRAP_CSS_RELATIVE_PATH.split(',')
            const bootstrapStylePath = pathFromArray(bootstrapStyleRelativePathArray)
            const bootstrapScriptRelativePathArray = process.env.BOOTSTRAP_JS_RELATIVE_PATH.split(',')
            const bootstrapScriptPath = pathFromArray(bootstrapScriptRelativePathArray)
            const jqueryRelativePathArray = process.env.JQUERY_RELATIVE_PATH.split(',')
            const jqueryPath = pathFromArray(jqueryRelativePathArray)
            // const controllersRelativePathArray = process.env.CONTROLLERS_RELATIVE_PATH.split(',')
            // const routingRelativePathArray = process.env.ROUTING_RELATIVE_PATH.split(',')
            // const controllersRelativeRouting = relativePathFromArrays(routingRelativePathArray, controllersRelativePathArray)
            const controllersRelativeRouting = process.env.CONTROLLERS_RELATIVE_ROUTING
            return {
                PORT: process.env.PORT,
                VIEWS_PATH: viewsPath,
                BOOTSTRAP_STYLE_PATH: bootstrapStylePath,
                BOOTSTRAP_SCRIPT_PATH: bootstrapScriptPath,
                JQUERY_PATH: jqueryPath,
                CONTROLLERS_RELATIVE_ROUTING: controllersRelativeRouting,
                JOIN: path.join
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
 * @returns {string}
 */
function pathFromArray(haystack){
    let resultPath = process.cwd()
    haystack.forEach(folderName => {
        resultPath = path.resolve(resultPath, folderName)
    })
    return resultPath
}

/**
 * 
 * It takes two array with folders name relative to the root, return a relative path between them
 * @param {array} cwd 
 * @param {array} target 
 * @returns {string}
 */
function relativePathFromArrays(cwd, target){
    let cwdPath = process.cwd()
    cwd.forEach(folderName => {
        cwdPath = path.resolve(cwdPath, folderName)
    })
    let targetPath = process.cwd()
    target.forEach(folderName => {
        targetPath = path.resolve(targetPath, folderName)
    })
    const resultRelativePath = path.relative(cwdPath, targetPath)
    return resultRelativePath
}