(function() {
var sidebarEl = document.getElementsByClassName('sidebar')[0];
var containerEl = sidebarEl.getElementsByClassName('container')[0];

function getTermFitSize() {
    var viewportWidth = Math.max(document.documentElement.clientWidth,
                                 window.innerWidth || 0);
    // use 16px font when the width of viewport is smaller than 830px
    var charWidth = 11.4545;
    var lineHeight = 27;
    if (viewportWidth < 830) {
        charWidth *= (16.0/18);
        lineHeight *= (16.0/18);
    }

    var W = containerEl.clientWidth;
    var H = containerEl.clientHeight;
    var rows = Math.floor(H / lineHeight);
    var cols = Math.floor(W / charWidth);
    console.debug('rows=' + rows);
    return {rows: rows, cols: cols};
}

var initTermSize = getTermFitSize();
var term = new tateterm.Terminal(containerEl, {
    cols: initTermSize.cols,
    rows: initTermSize.rows,
    useStyle: true,
});
var shell = new tateterm.Shell(term, {
    promptTemplate: '%s$ ',
    welcomeMsg: 'Hey there, my name is Tate Tian.\r\n' +
            'I am a computer science Ph.D. candidate, ' +
            'and a full-stack developer ' +
            'who is passionate about building something useful (and fun as well).\r\n' +
            'This is my home on the Internet, where I share thoughts on programming, technology and startup.',
    urlMeta: {
        href: '#',
        onclick: 'alert("click"); return false;'
    }
});
shell.run('ls');

window.onresize = function() {
    var size = getTermFitSize();
    term.resize(size.cols, size.rows);
};

var shownWelcome = false;
var sidebarOpen = false;
var btnEl = document.getElementsByClassName('logo-btn')[0];
btnEl.addEventListener('click', function(event) {
    if (sidebarOpen) {
        sidebarEl.classList.remove('open');
        sidebarEl.classList.add('close');
        btnEl.classList.remove('clicked');
        sidebarOpen = false;
    }
    else {
        // run the terminal lazily util it is visible by user
        if (!shownWelcome) {
            /*term.welcome();
            term.run('ls');*/
            shownWelcome = true;
        }

        btnEl.classList.add('clicked');
        sidebarEl.classList.remove('close');
        sidebarEl.classList.add('open');
        sidebarOpen = true;
    }
});



// handle scrolling event to adjust opacity of topbar
/*window.addEventListener('scroll', function(event) {
    if (!closed) return;

    var offset = window.pageYOffset;
    var threashold = 64;
    var opacity = (threashold - offset) / threashold;
    if (opacity < 0.6) opacity = 0.6;

    var topbar = document.getElementsByClassName('sidebar')[0];
    topbar.style.opacity = opacity;
});*/

})();
