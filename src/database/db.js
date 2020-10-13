import {DB} from '../config/app-config.js'
import mysql from 'mysql/index.js'
import fs from 'fs/promises'
import path from 'path'

export class Db{
    
    static injectOptions = {
        host: DB.HOST,
        database: DB.NAME,
        user: DB.USERNAME,
        password: DB.PASSWORD,
        multipleStatements: true
    }
    static options = {
        host: DB.HOST,
        database: DB.NAME,
        user: DB.USERNAME,
        password: DB.PASSWORD
    }

    
    /**
     * Returns connection for multiple statement query resolve
     */
    static injectConnect(){
        return mysql.createConnection(this.injectOptions)
    }

    /**
     * Returns connection for single statement query resolve
     */
    static connect(){
        return mysql.createConnection(this.options)
    }

    /**
     * Use migrations json to execute migrations in timeStamp order
     */
    static async createDatabase(){
        const migrationsArray = await this.getMigrationsArray()
        const conn = this.connect()
        conn.connect()
        for(let migration of migrationsArray){
            const migrationFile = await import('./migrations/' + migration)
            migrationFile.default(conn)
        }
        conn.end()
    }

    /**
     * Returns migrations json parsed to an object
     */
    static async getMigrationsArray(){
        const migrationsArrayPath = path.resolve(process.cwd(), 'src', 'database', 'migrations.json')
        const migrationsJson = await fs.readFile(migrationsArrayPath, 'utf-8')
        return JSON.parse(migrationsJson)
    }
}