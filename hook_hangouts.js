var observer = new MutationObserver(function(mutations) {
  var elements = document.querySelectorAll('div[role=button]');

  var microphone = elements[0];
  var camera = elements[1];

  if (microphone && camera) {
    hookHangouts(microphone, camera);
  }
});

var observerConfig = {
  childList: true
};

function mute(muteMicrophone, muteCamera, validElements) {
  // Try to mute items now
  var mutedMicrophone = muteDevice('microphone', muteMicrophone, validElements);
  var mutedCamera = muteDevice('camera', muteCamera, validElements);
  
  if (mutedMicrophone == false || mutedCamera == false) {
    return false;
  }

function hookHangouts(microphone, camera) {
  chrome.storage.sync.get('muteMicrophone', function (result) {
    if (result.muteMicrophone && microphone.getAttribute('data-is-muted') != true) {
      microphone.click();

      // Initial modification of the element picked up by the mutation observer doesn't appear to be enough, don't stop observing until we're sure we've muted
      if (microphone.getAttribute('data-is-muted') == true) {
        observer.disconnect();
      }
    }
  });

  chrome.storage.sync.get('muteCamera', function (result) {
    if (result.muteCamera & camera.getAttribute('data-is-muted') != true) {
      camera.click();

      // Initial modification of the element picked up by the mutation observer doesn't appear to be enough, don't stop observing until we're sure we've muted
      if (camera.getAttribute('data-is-muted') == true) {
        observer.disconnect();
      }
    }
  });
};