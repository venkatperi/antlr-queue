const { promisify } = require( 'util' );
const fs = require( 'fs' );
const path = require( 'path' );
const java = require( './java' );
const arrayp = require( 'arrayp' );
const debug = require( 'debug' )( 'antlr-queue:antlr' );
const config = require( '../config' );
const tempdir = require( './tempdir' );

const writeFile = promisify( fs.writeFile );
const mkdirp = promisify( fs.writeFile );

const workingDir = config.get( 'workingDir' );
const antlrClass = config.get( 'antlr.class' );

const antlr = ( name, parser, lexer, opts = {} ) => {
  let cwd = opts.cwd || tempdir( workingDir );
  debug( `antlr: ${name}, ${cwd}` );

  let parserName = path.join( cwd, lexer ? `${name}Parser.g4` : `${name}.g4` );
  debug( `parserName: ${parserName}` );

  let p = writeFile( parserName, parser );

  if ( lexer ) {
    let lexerName = path.join( cwd, `${name}Lexer.g4` );
    debug( `lexerName: ${lexerName}` );
    p.then( () => writeFile( lexerName, lexer ) );
  }

  let result = { dir: cwd };

  return arrayp.chain( [
    p,
    () => java.runClass( null, antlrClass, [ parserName ], { cwd: cwd } ),
    ( res ) => result.build = res.stdout,
    () => java.compile( "*.java", { cwd: cwd } ),
    ( res ) => result.compile = res.stdout,
    () => result
  ] );
};

module.exports = {
  antlr: antlr
}
