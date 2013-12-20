$(document).ready(function() {
  function setTheme(theme) {
    switch (theme) {
      case 'github':
        $('link[rel=stylesheet]').attr('href', '/css/github.css')
        $('.theme-default').html('<a href="#">default</a>')
        $('.theme-github').text('github')
        $('.theme-npm').html('<a href="#">npm</a>')
        $('.theme-gitlab').html('<a href="#">gitlab</a>')
        $('.theme-name').text('github')
        break
      case 'npm':
        $('link[rel=stylesheet]').attr('href', '/css/npm.css')
        $('.theme-default').html('<a href="#">default</a>')
        $('.theme-github').html('<a href="#">github</a>')
        $('.theme-npm').text('npm')
        $('.theme-gitlab').html('<a href="#">gitlab</a>')
        $('.theme-name').text('npm')
        break
      case 'gitlab':
        $('link[rel=stylesheet]').attr('href', '/css/gitlab.css')
        $('.theme-default').html('<a href="#">default</a>')
        $('.theme-github').html('<a href="#">github</a>')
        $('.theme-npm').html('<a href="#">npm</a>')
        $('.theme-gitlab').text('gitlab')
        $('.theme-name').text('gitlab')
        break
      case 'default':
      default:
        $('link[rel=stylesheet]').attr('href', '/css/style.css')
        $('.theme-default').text('default')
        $('.theme-github').html('<a href="#">github</a>')
        $('.theme-npm').html('<a href="#">npm</a>')
        $('.theme-gitlab').html('<a href="#">gitlab</a>')
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
      e.preventDefault()
      setTheme(theme.name)
      return false
    })
  })
})