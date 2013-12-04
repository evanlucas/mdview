#!/usr/bin/env node

var marked  = require('marked')
  , express = require('express')
  , program = require('commander')
  , fs      = require('fs')
  , hljs    = require('highlight.js')
  , path    = require('path')
  , pkg     = require('./package')
  , log     = require('npmlog')
  , cwd     = process.cwd()

var markedOpts = {
  gfm: true,
  highlight: function(code, lang) {
    if (lang === 'js') lang = 'javascript'
    if (hljs.LANGUAGES[lang]) {
      return hljs.highlight(lang, code).value
    }
  },
  tables: true
}

program
  .version(pkg.version)
  .option('-v, --verbose', 'Increase verbosity')
  .option('-p, --port <port>', 'Port on which to run the server')
  .option('-c, --css <style>', 'Customize css')
  .parse(process.argv)

var serveDir = program.args.shift() || process.env.MDVIEW_ENV_DIR || cwd

log.heading = 'mdview'
if (program.verbose) log.level = 'verbose'

var port = +program.port || 3000

var app = express()

log.verbose('serve', 'serving from', serveDir)

var exts = ['.md', '.markdown']
var styles = ['default', 'github', 'npm']

var stylesheet = ''
  , theme = 'default'
if (program.css) {
  if (~styles.indexOf(program.css)) {
    switch(program.css) {
      case 'default':
        stylesheet = '/css/style.css'
        break
      case 'npm':
        theme = 'npm'
        stylesheet = '/css/npm.css'
        break
      case 'github':
        theme = 'github'
        stylesheet = '/css/github.css'
        break
      default:
        theme = 'custom'
        stylesheet = program.css
        break
    }
  }
} else {
  stylesheet = '/css/style.css'
}

log.verbose('load', 'theme', theme)
log.verbose('load', 'stylesheet', stylesheet)


app.use(express.static(__dirname + '/public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.set('view options', { doctype: 'html', pretty: false })

if (program.verbose)
  app.use(express.logger('dev'))

app.use(function(req, res, next) {
  res.locals.cwd = serveDir
  res.locals.stylesheet = stylesheet
  res.locals.theme = theme
  fs.readdir(serveDir, function(err, files) {
    if (err) return next(err)
    files = files.filter(function(file) {
      return ~exts.indexOf(path.extname(file))
    })
    res.locals.files = files
    next()
  })
})

app.get('/', function(req, res) {
  res.render('files')
})

app.get('/:filename', function(req, res, next) {
  var pathname = req.params.filename
  req.filepath = pathname
  var fullPath = path.join(serveDir, pathname)
  fs.exists(fullPath, function(e) {
    res.locals.path = path.basename(pathname)
    if (!e) {
      res.status(404).render('404')
    } else {
      next()
    }
  })
})

app.get('/:filename', function(req, res) {
  var pathname = req.filepath
  var fullPath = path.join(serveDir, pathname)
  if (!(~exts.indexOf(path.extname(pathname)))) {
    res.status(500).render('invalid')
  } else {
    fs.readFile(fullPath, 'utf8', function(err, doc) {
      if (err) {
        res.status(500).render('invalid')
      } else {
        marked(doc, markedOpts, function(err, contents) {
          if (err) {
            res.status(500).render('invalid')
          } else {
            res.render('file', {
              title: path.basename(pathname),
              content: contents
            })
          }
        })
      }
    })
  }
})

app.listen(port)
log.info('listen', port)
log.info('listen', 'To view the page,', 'open http://localhost:'+port)