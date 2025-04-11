async function loadChars(group) {
  const selector = '#' + group + ' .chars';
  const chars = document.querySelectorAll(selector);

  const filename = 'html/groups/' + group + '.html';
  const fileURL = chrome.runtime.getURL(filename)
  const response = await fetch(fileURL);

  chars[0].innerHTML = await response.text();
}

async function onClickGroup(event) {
  event.target.removeEventListener('click', onClickGroup);
  await loadChars(event.target.parentNode["id"]);
}

function initListeners() {
  const groupLinks = document.querySelectorAll('.js-load-chars:not(.loaded)');

  groupLinks.forEach(link => {
    link.addEventListener('click', onClickGroup);
  })
}

document.addEventListener('DOMContentLoaded', async function () {
  await loadChars('fun');

  initListeners();
});
