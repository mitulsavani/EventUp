const mysql = require('mysql');

const mysql_config = {
    host: process.env.DB_IP,
    user: 'csc667',
    password: 'password',
    port: 3306,
    database: 'eventupdb',
  }; 

class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
} 

module.exports = new Database(mysql_config);