(function() {

var sidebarEl = document.getElementsByClassName('sidebar')[0];
var containerEl = sidebarEl.getElementsByClassName('container')[0];
var term = new Terminal(containerEl, {
    cols: 60,
    rows: 20,
    useStyle: true
});

var sidebarOpen = false;
var btnEl = document.getElementsByClassName('sidebar-btn')[0];
btnEl.addEventListener('click', function(event) {
    if (sidebarOpen) {
        sidebarEl.classList.remove('open');
        btnEl.innerText = 'T';
        sidebarOpen = false;
    }
    else {
        sidebarEl.classList.add('open');
        btnEl.innerText = 'X';
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
