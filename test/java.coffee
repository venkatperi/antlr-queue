assert = require 'assert'
java = require '../lib/java'


describe 'run java class', ->

  it 'bad class', (done) ->
    java.runClass(['-Xmx500M'], 'xorg.antlr.v4.Tool')
      .then (res) ->
        console.log res
        done("Shouldn't get here")
      .catch (err) ->
        done()
    null

  it 'runs java', (done) ->
    java.runClass(['-Xmx500M'], 'org.antlr.v4.Tool')
      .then (res) ->
        done()
    null

