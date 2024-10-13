;(function () {
  'use strict'

  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i)
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i)
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i)
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i)
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i)
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      )
    }
  }

  var fullHeight = function () {
    if (!isMobile.any()) {
      $('.js-fullheight').css('height', $(window).height())
      $(window).resize(function () {
        $('.js-fullheight').css('height', $(window).height())
      })
    }
  }

  // Parallax
  var parallax = function () {
    $(window).stellar()
  }

  var contentWayPoint = function () {
    var i = 0
    $('.animate-box').waypoint(
      function (direction) {
        if (
          direction === 'down' &&
          !$(this.element).hasClass('animated-fast')
        ) {
          i++

          $(this.element).addClass('item-animate')
          setTimeout(function () {
            $('body .animate-box.item-animate').each(function (k) {
              var el = $(this)
              setTimeout(
                function () {
                  var effect = el.data('animate-effect')
                  if (effect === 'fadeIn') {
                    el.addClass('fadeIn animated-fast')
                  } else if (effect === 'fadeInLeft') {
                    el.addClass('fadeInLeft animated-fast')
                  } else if (effect === 'fadeInRight') {
                    el.addClass('fadeInRight animated-fast')
                  } else {
                    el.addClass('fadeInUp animated-fast')
                  }

                  el.removeClass('item-animate')
                },
                k * 100,
                'easeInOutExpo'
              )
            })
          }, 50)
        }
      },
      { offset: '85%' }
    )
  }

  var goToTop = function () {
    $('.js-gotop').on('click', function (event) {
      event.preventDefault()

      $('html, body').animate(
        {
          scrollTop: $('html').offset().top
        },
        500,
        'easeInOutExpo'
      )

      return false
    })

    $(window).scroll(function () {
      var $win = $(window)
      if ($win.scrollTop() > 200) {
        $('.js-top').addClass('active')
      } else {
        $('.js-top').removeClass('active')
      }
    })
  }

  var pieChart = function () {
    $('.chart').easyPieChart({
      scaleColor: false,
      lineWidth: 15,
      lineCap: 'butt',
      barColor: '#263959',
      trackColor: '#337ab78a',
      size: 160,
      animate: 1000
    })
  }

  var skillsWayPoint = function () {
    if ($('#skills').length > 0) {
      $('#skills').waypoint(
        function (direction) {
          if (direction === 'down' && !$(this.element).hasClass('animated')) {
            setTimeout(pieChart, 400)
            $(this.element).addClass('animated')
          }
        },
        { offset: '90%' }
      )
    }
  }

  // Loading page
  var loaderPage = function () {
    $('.loader').fadeOut('slow')
  }

  $(function () {
    contentWayPoint()
    goToTop()
    loaderPage()
    fullHeight()
    parallax()
    skillsWayPoint()
  })
})()

/**
 * Typing effect
 */
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate
  this.el = el
  this.loopNum = 0
  this.period = parseInt(period, 10) || 2000
  this.txt = ''
  this.tick()
  this.isDeleting = false
}

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length
  var fullTxt = this.toRotate[i]

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1)
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1)
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>'

  var that = this
  var delta = 200 - Math.random() * 100

  if (this.isDeleting) {
    delta /= 2
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period
    this.isDeleting = true
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false
    this.loopNum++
    delta = 500
  }

  setTimeout(function () {
    that.tick()
  }, delta)
}

window.onload = function () {
  var elements = document.getElementsByClassName('typewrite')
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type')
    var period = elements[i].getAttribute('data-period')
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period)
    }
  }
  // INJECT CSS
  var css = document.createElement('style')
  css.type = 'text/css'
  css.innerHTML = '.typewrite > .wrap { border-right: 0.08em solid #1D2738}'
  document.body.appendChild(css)
}
