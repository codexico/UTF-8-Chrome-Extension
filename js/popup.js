// http://developer.chrome.com/extensions/examples/tutorials/analytics/popup.js
var _AnalyticsCode = 'UA-48518492-1';

/**
 * Below is a modified version of the Google Analytics asynchronous tracking
 * code snippet.  It has been modified to pull the HTTPS version of ga.js
 * instead of the default HTTP version.  It is recommended that you use this
 * snippet instead of the standard tracking snippet provided when setting up
 * a Google Analytics account.
 */
var _gaq = _gaq || [];
_gaq.push(['_setAccount', _AnalyticsCode]);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();




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

  _gaq.push(['_trackEvent', event.target.parentNode.id, 'clicked']);
}

function initListeners () {
  var groupLinks = document.querySelectorAll('.js-load-chars:not(.loaded)');

  for (var i = 0; i < groupLinks.length; i++) {
    groupLinks[i].addEventListener('click', onClickGroup);
  }
}


document.addEventListener('DOMContentLoaded', function () {
  loadChars('fun');

  initListeners();
});
