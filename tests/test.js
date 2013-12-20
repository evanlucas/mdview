var request = require('supertest')
var path = require('path')

process.env.MDVIEW_ENV_DIR = path.join(__dirname, 'testdir')

var server = require('../index')

request = request('http://localhost:3000')

describe('HTTP', function() {
  describe('Valid markdown document', function() {
    it('Should return 200', function(done) {
      request.get('/readme.md').expect(200, done)
    })
  })

  describe('Non-markdown document', function() {
    it('Should return 500', function(done) {
      request.get('/readme.mdf').expect(500, done)
    })
  })

  describe('Non-existent file', function() {
    it('Should return 404', function(done) {
      request.get('/test.md').expect(404, done)
    })
  })
})