const express = require('express');
var mysql = require('mysql');
const app = express();

//morgan is used to console log requests from client
const morgan = require('morgan'); 
//body-parser is used to parse json bodies from client requests
const bodyParser = require('body-parser'); 

//Connect database

const mysql_config = {
    host: '54.183.219.162',
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

global.DATABASE = new Database(mysql_config);

DATABASE.connection.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected! ");
  });

const apiRoutes = require('./src/routes/apiRoutes');

app.use('/api/', apiRoutes);

module.exports = app;