function getUrl(url, success, fail, error) {
  var resp = '';
  var request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      if (success) {
        success(this);
      }
    } else {
      // We reached our target server, but it returned an error
      if (fail) {
        fail(this);
      }
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    if (error) {
      error(this);
    }
  };

  request.send();
}

function loadChars (group) {

  function insertHTML (ajax) {
    var selector = '#' + group + ' .chars';
    var chars = document.querySelectorAll(selector);
    var html = ajax.response;
    chars[0].innerHTML = html;
  }

  getUrl('html/groups/' + group + '.html', insertHTML);
}

function onClickGroup (event) {
  event.target.removeEventListener('click', onClickGroup);
  loadChars(event.target.parentNode.id);
}

function initListeners () {
  var groupLinks = document.querySelectorAll('.js-load-chars:not(.loaded)');

  for (var i = 0; i < groupLinks.length; i++) {
    groupLinks[i].addEventListener('click', onClickGroup);
  }
}

(function init () {
  loadChars('fun');

  initListeners();
}());
