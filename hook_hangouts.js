var isMeet = window.location.hostname === 'meet.google.com';

var observer = new MutationObserver(function(mutations) {
    var elements = getElements();
    var microphone = elements.microphone;
    var camera = elements.camera;

    if (microphone && camera) {
        hookHangouts(microphone, camera);
    }
});

var observerConfig = {
    attributes: true,
    childList: true
};

var targetNode = document.body;
observer.observe(targetNode, observerConfig);

function getElements() {
    var camera;
    var microphone;
    var elements = {
      camera: undefined,
      microphone: undefined
    };

    if (isMeet) {
      camera = document.querySelector('[data-capture-type="cam"]');
      microphone = document.querySelector('[data-capture-type="mic"]');
      elements.camera = camera && camera.querySelector('div[role="button"]');
      elements.microphone = microphone && microphone.querySelector('div[role="button"]');
    } else {
      camera = document.getElementsByClassName('OQ');
      microphone = document.getElementsByClassName('IQ');
      elements.camera = camera && camera[0];
      elements.microphone = microphone && microphone[0];
    }

    return elements;
}

function hookHangouts(microphone, camera) {
   chrome.storage.sync.get('muteMicrophone', function (result) {
       if (result.muteMicrophone) {
           simulateClick(microphone);
       }
   });

   chrome.storage.sync.get('muteCamera', function (result) {
       if (result.muteCamera) {
           simulateClick(camera);
       }
   });

   observer.disconnect();
}

function simulateClick(item) {
    if (isMeet) {
        setTimeout(function() {
          item.click();
        }, 100);
    } else {
      item.dispatchEvent(new MouseEvent('mousedown'));
      item.dispatchEvent(new MouseEvent('mouseup'));
      item.dispatchEvent(new MouseEvent('mouseout'));
    }
}
