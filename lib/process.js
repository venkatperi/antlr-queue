const debug = require('debug')('antlr-queue:process');
const {queue} = require('./jobs');
const antlr = require('./antlr');
const config = require('../config');

                                                                                  
function processAntlr( job, done ) {                                              
  debug( `antlr: ${job.data.name}` );                                      
  antlr                                                                           
    .antlr( job.data.name, job.data.parser, job.data.lexer, job.data.opts )       
    .then( ( res ) => done( null, res ) )                                         
    .catch( ( err ) => done( err instanceof Error ? err : new Error( err ) ) );   
}                                                                                 
                                                                                  

queue.process( 'antlr', config.get( 'kue.process.antlr.concurrency' ), processAntlr );
