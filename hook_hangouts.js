var observer = new MutationObserver(function(mutations) {
  var elements = document.querySelectorAll('div[role=button]');

  var microphone = elements[0];
  var camera = elements[1];

  if (microphone && camera && microphone.getAttribute('data-is-muted') == "false" && camera.getAttribute('data-is-muted') == "false") {
    hookHangouts(microphone, camera);
  }
});

var observerConfig = {
  childList: true
};

var targetNode = document.body;
observer.observe(targetNode, observerConfig);

function hookHangouts(microphone, camera) {
  chrome.storage.sync.get('muteMicrophone', function (result) {
    microphone.click();
    observer.disconnect();
  });

  chrome.storage.sync.get('muteCamera', function (result) {
    camera.click();
    observer.disconnect();
  });
};
