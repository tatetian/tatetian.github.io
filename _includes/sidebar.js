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
        onclick: 'loadContent(event); return false;'
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

function ContentLoader() {
    var self = this;
    window.onpopstate = function(event) {
        var url = window.location;
        self.load(url, true);
    };
};

ContentLoader.prototype.load = function(url, backHistory) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = "document";

    xhr.onload = function () {
        // get the new content
        var resDoc = xhr.responseXML;
        var newPost = resDoc.getElementsByClassName('post')[0];

        // replace the old content with the new one
        var oldPost = document.getElementsByClassName('post')[0];
        var container = oldPost.parentNode;
        container.removeChild(oldPost);
        container.appendChild(newPost);

        // manipulate the browser history
        if (!backHistory)
            window.history.pushState(null, "", url);
    };

    xhr.send();
}

var contentLoader = new ContentLoader();
window.loadContent = function(e) {
    // prevent the default behaviour of browser when clicking <a> tag
    e.preventDefault();
    // load the url specified by the <a> tag
    var atag = (e.target) ? e.target : e.srcElement;
    var url = atag.dataset.url;
    if (!url) return;
    contentLoader.load(url);
};

})();
