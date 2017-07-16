const fs = require( 'fs' );
const path = require( 'path' );
const uniqueString = require( 'unique-string' );
const tempDir = require( 'temp-dir' );

module.exports = ( baseDir ) => {
  baseDir = baseDir || tempDir;
  let dir = path.join( baseDir, uniqueString() );
  fs.mkdirSync(dir);
  return dir;
};

