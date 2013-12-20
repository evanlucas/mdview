$(document).ready(function() {
  function setTheme(theme) {
    theme = theme.replace('#', '')
    switch (theme) {
      case 'github':
        $('link[rel=stylesheet]').attr('href', '/css/github.css')
        $('.theme-default').html('<a href="#default">default</a>')
        $('.theme-github').text('github')
        $('.theme-npm').html('<a href="#npm">npm</a>')
        $('.theme-gitlab').html('<a href="#gitlab">gitlab</a>')
        $('.theme-name').text('github')
        break
      case 'npm':
        $('link[rel=stylesheet]').attr('href', '/css/npm.css')
        $('.theme-default').html('<a href="#default">default</a>')
        $('.theme-github').html('<a href="#github">github</a>')
        $('.theme-npm').text('npm')
        $('.theme-gitlab').html('<a href="#gitlab">gitlab</a>')
        $('.theme-name').text('npm')
        break
      case 'gitlab':
        $('link[rel=stylesheet]').attr('href', '/css/gitlab.css')
        $('.theme-default').html('<a href="#default">default</a>')
        $('.theme-github').html('<a href="#github">github</a>')
        $('.theme-npm').html('<a href="#npm">npm</a>')
        $('.theme-gitlab').text('gitlab')
        $('.theme-name').text('gitlab')
        break
      case 'default':
      default:
        $('link[rel=stylesheet]').attr('href', '/css/style.css')
        $('.theme-default').text('default')
        $('.theme-github').html('<a href="#github">github</a>')
        $('.theme-npm').html('<a href="#npm">npm</a>')
        $('.theme-gitlab').html('<a href="#gitlab">gitlab</a>')
        $('.theme-name').text('default')
        break
    }
  }

  var themes = [
    { className: '.theme-default a', name: 'default' },
    { className: '.theme-github a', name: 'github' },
    { className: '.theme-npm a', name: 'npm' },
    { className: '.theme-gitlab a', name: 'gitlab' }
  ]
  themes.forEach(function(theme) {
    $('body').on('click', theme.className, function(e) {
      setTheme(theme.name)
    })
  })

  var hash = window.location.hash
  if (hash) {
    setTheme(hash)
  }
})