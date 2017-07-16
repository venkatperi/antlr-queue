const convict = require( 'convict' );
const path = require( 'path' );

const config = convict( {
  env: {
    doc: "The applicaton environment.",
    format: [ "production", "development", "test" ],
    default: "development",
    env: "NODE_ENV"
  },
  kue: {
    queue: {
      doc: "queue creation options",
      prefix: {
        default: 'q',
        format: String
      },
      redis: {
        doc: "Kue Redis Config",
        port: {
          format: "port",
          default: 6379,
        },
        host: {
          format: "*",
          default: "localhost"
        }
      },
    },
    process: {
      doc: "processing options",
      antlr: {
        concurrency: {
          default: 1
        }
      },
      rig: {
        concurrency: {
          default: 1
        }
      }
    }
  },
  workingDir: {
    doc: "base dir for building antlr /  compiling",
    default: path.join( __dirname, '../working' )
  },
  antlr: {
    "class": {
      doc: "Java class name",
      default: "org.antlr.v4.Tool"
    }
  },
  java: {
    executable: {
      default: "/usr/bin/java"
    }
  },
  javac: {
    executable: {
      default: "/usr/bin/javac"
    }
  }
} );

// Load environment dependent configuration
//const env = config.get( 'env' );
//config.loadFile( './config/' + env + '.json' );

// Perform validation
config.validate( { allowed: 'strict' } );

module.exports = config;
