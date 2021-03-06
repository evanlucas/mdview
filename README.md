# mdview

[![Build Status](https://travis-ci.org/evanlucas/mdview.png?branch=master)](https://travis-ci.org/evanlucas/mdview)

A very simple markdown viewer that allows one to test his or her readme prior to pushing to GitHub, GitLab, or publishing to the npm registry.

## Install

```
$ npm install -g mdview
```

## Test

Requires `grunt`

```
$ npm install -g grunt-cli
$ grunt test
```

## Usage

```
  Usage: mdview [options]

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -v, --verbose        Increase verbosity
    -p, --port <port>    Port on which to run the server (3000)
    -c, --css <style>    Customize css
    -o, --open           Open in default browser

```

## Styles

Currently, the following styles are available by default

- default
- npm
- github
- gitlab

One can pass in the path to another css file that will be used

## License

MIT
