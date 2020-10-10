import program from 'commander'
import fs from 'fs'
import path from 'path'
import ora from 'ora'
import chalk from 'chalk'
function makeMigration(file_name, cli){
    let file_path = path.resolve(process.cwd(), 'src', 'database', 'migrations' , file_name + '.js')
    if(fs.existsSync(path.resolve(file_path))){
        spinner.fail(chalk.bgRedBright('The file could not be created ! :c'))
        throw new Error('A controller file with that name already exists')
    }
    let content = 'const query = \'\'\n' + 'export default function ' + file_name 
    + '(conn, DB){\n' + '\tconn.query(query , (err)=>{\n' + '\t\tif(err){\n' 
    + '\t\t\tconsole.log(err)\n' + '\t\t}\n' + '\t})\n' + '}\n'
    fs.writeFile(file_path, content, (err)=>{
        if(err){
            spinner.fail(chalk.bgRedBright('The file could not be created ! :c '))
            throw new Error(err)
        }
        spinner.succeed(chalk.bgGreenBright('File created succesfully ! :)'))
    })
}
/**
 * Creates controller file if not file with such name and path found
 * 
 * @param {string} file_name 
 * @param {Command.program} cli 
 */
function makeController(file_name, cli){
    let file_path = path.resolve(process.cwd(), 'src', 'app',  'http', 'controllers' , file_name + '.js')
    if(fs.existsSync(path.resolve(file_path))){
        spinner.fail(chalk.bgRedBright('The file could not be created ! :c'))
        throw new Error('A controller file with that name already exists')
    }
    let data = ''
    data += 'class ' + file_name + '{\n'
    if(cli.resource){
        data = addControllerResource( data )
    }
    data += '}'
    fs.writeFile(file_path, data, (err)=>{
        if(err){ 
            spinner.fail(chalk.bgRedBright('The file could not be created ! :c'))
            throw err
        }
        spinner.succeed(chalk.bgGreenBright('File created succesfully ! :)'))
    })
}
/**
 * Returns data added text in controller model
 * 
 * @param {string} data 
 */
function addControllerResource( data ){
    const model_path = path.resolve(process.cwd(), 'src', 'app', 'commands', 'Controller.txt')
    data += fs.readFileSync(model_path, 'utf-8', err => {
        if(err){ 
            spinner.fail(chalk.bgRedBright(model_path + 'could not be readed ! :c'))
            throw err
        }
    })
    return data
}
const spinner = ora('Process of making file started...')
program
    .command('make:controller <file_name>')
    .description('creates a file of the type specified')
    .option('--model <model>', 'Used with --make=controller-- command ')
    .option('-r, --resource', 'Used with a --make=controller-- command, creates the file with regular methods')
    .action((file_name, cli)=>{
        spinner.start()
        makeController(file_name, cli)
    })
program
    .command('make:model')
    .option('--controller', 'Create a controller')
    .option('-m, --migration', 'Creates migration for table creation')
    .action((cli)=>{

    })
program
    .command('make:migration <file_name>')
    .option('--create <table>', 'Used with a --make=migration-- command, creates migration for table creation')
    .option('--table <table>', 'Used with a --make=migration-- command, creates migration for table update')
    .action((file_name, cli)=>{
        spinner.start()
        makeMigration(file_name, cli)
    })
program.parse(process.argv)