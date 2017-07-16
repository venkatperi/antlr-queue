assert = require 'assert'
jobs = require '../lib/jobs'
util = require 'util'

grammar = """
// Define a grammar called Hello
grammar Hello;
r  : 'hello' ID ;         // match keyword hello followed by an identifier
ID : [a-z]+ ;             // match lower-case identifiers
WS : [ \\t\\r\\n]+ -> skip ; // skip spaces, tabs, newlines
"""


describe 'antlr job', ->

  it 'builds a grammar', (done) ->
    jobs.antlr("Hello",  grammar)
      .then (job) ->
        job.on 'complete', (res) ->
          console.log 'complete: ' + util.inspect(res)
          done()
        .on 'failed attempt', console.log
        .on 'failed', console.log
        .on 'progress', console.log
    null

  it 'grammar error', (done) ->
    jobs.antlr("hello",  grammar)
      .then (job) ->
        job.on 'complete', (res) ->
          done("shouldn't get here")
        .on 'failed attempt', console.log
        .on 'failed', (err) ->
          assert.isPrototypeOf err, Error
          console.log "failed: #{err}"
          done()
        .on 'progress', console.log
    null

