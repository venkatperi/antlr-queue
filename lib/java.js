const { promisify } = require( 'util' );
const childProcess = require( 'child_process' );
const debug = require( 'debug' )( 'antlr-queue:java' );
const config = require( '../config' );

const execFile = promisify( childProcess.execFile );
const exec = promisify( childProcess.exec );

const JAVA = config.get( 'java.executable' );
const JAVAC = config.get( 'javac.executable' );

function compile( args, opts ) {
  debug( `compile: ${args}, ${opts}` );
  return exec( `${JAVAC} ${args}`, opts );
}

function javaClass( jvmOpts, klass, args, execOpts ) {
  let list = [];
  list = list.concat( jvmOpts || [] );
  list.push( klass );
  list = list.concat( args || [] );
  debug( `runClass: ${list}` );

  return execFile( JAVA, list, execOpts );
}

module.exports = {
  runClass: javaClass,
  compile: compile
}
