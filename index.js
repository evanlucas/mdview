#!/usr/bin/env node

var marked  = require('marked')
  , express = require('express')
  , program = require('commander')
  , fs      = require('fs')
  , hljs    = require('highlight.js')
  , path    = require('path')
  , pkg     = { version: '0.0.1' }
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

log.heading = 'mdview'
if (program.verbose) log.level = 'verbose'

var port = +program.port || 3000

var app = express()


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




app.use(function(req, res, next) {
  res.locals.cwd = cwd
  res.locals.stylesheet = stylesheet
  res.locals.theme = theme
  fs.readdir(cwd, function(err, files) {
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

// ugh, fix...this is ugly
app.get('/:filename', function(req, res) {
  var pathname = req.params.filename
  var fullPath = path.join(cwd, pathname)
  fs.exists(fullPath, function(e) {
    if (!e) {
      res.render('404', {
        path: path.basename(pathname)
      })
    } else {
      if (!(~exts.indexOf(path.extname(pathname)))) {
        res.render('invalid', {
          path: path.basename(pathname)
        })
      } else {
        fs.readFile(fullPath, 'utf8', function(err, doc) {
          if (err) {
            res.render('invalid', {
              path: path.basename(pathname)
            })
          } else {
            marked(doc, markedOpts, function(err, contents) {
              if (err) {
                res.render('invalid', {
                  path: path.basename(pathname)
                })
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
    }
  })
})

app.listen(port)
log.info('listen', port)
log.info('help', 'To view the page,', 'open http://localhost:'+port)