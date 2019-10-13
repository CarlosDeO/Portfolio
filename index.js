let highlighed = null;

function handleNav() {

    var isMobile;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }

    

    var navPos = $('nav').position().top;
    var lastPos = 0;
    var lockTimer

    // clearTimeout(lockTimer);
    // if (!$('body').hasClass('disable-hover')) {
    //     $('body').addClass('disable-hover')
    // }

    // lockTimer = setTimeout(function () {
    //     $('body').removeClass('disable-hover')
    // }, 500);


    function highlightLink(anchor) {
        console.log(anchor);
        if (anchor !== highlighed) {
            highlighed = anchor
        }
        else {
            return
        }
        $('nav .active').removeClass('active');
        $("nav").find('[href="#' + anchor + '"]').addClass('active');
    }

    $(window).on('scroll', function () {
        console.log('run');
        var pos = $(window).scrollTop();
        var pos2 = pos + 50;
        var scrollBottom = pos + $(window).height();

        if (!isMobile) {
            if (pos >= navPos + $('nav').height() && lastPos < pos) {
                $('nav').addClass('fixed');
            }
            if (pos < navPos && lastPos > pos) {
                $('nav').removeClass('fixed');
            }
            lastPos = pos;
        }
        if (pos2 > $('#home').offset().top) { highlightLink('home'); }
        if (pos2 > $('#about').offset().top) { highlightLink('about'); }
        if (pos2 > $('#projects').offset().top) { highlightLink('projects'); }
        if (pos2 > $('#contact').offset().top ||
            pos + $(window).height() === $(document).height()) {
            highlightLink('contact');
        }
    })
}



// CONTACT FORM
function contactForm() {
    $('#contact-form').submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: "https://formspree.io/xeyrwnrx",
            method: "POST",
            data: { message: $('form').serialize() },
            dataType: "json"
        }).done(function (response) {
            console.log("submit")
            $('#success').addClass('expand');
            $('#contact-form').find("input[type=text], input[type=email], textarea").val("");
        });
    });

    $('#close').click(function () {
        $('#success').removeClass('expand');
    })
}


function handleApp() {
    handleNav();
    contactForm();
}

$(handleApp);