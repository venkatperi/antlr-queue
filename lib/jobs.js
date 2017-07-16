const debug = require( 'debug' )( 'antlr-queue:jobs' );
const kue = require( 'kue' );
const antlr = require( './antlr' );
const config = require( '../config' );

const queue = kue.createQueue( config.get( 'kue.queue' ) );

function addJob( name, opts ) {
  debug( `addJob: ${name}, ${opts}` );
  return new Promise( ( resolve, reject ) => {
    let job = queue
      .createJob( name, opts )
      .save( ( err ) => err ? reject( err ) : resolve( job ) );
  } )
}

function addAntlr( name, parser, lexer, opts ) {
  return addJob( 'antlr', {
    name: name,
    parser: parser,
    lexer: lexer,
    opts: opts
  } );
}

function addRig( opts ) {
  return addJob( 'rig', opts );
}

module.exports = {
  antlr: addAntlr,
  queue: queue
}
