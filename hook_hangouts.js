var observer = new MutationObserver(function(mutations) {
    var microphoneSelectors = [
        '.IQ', 
        '[data-capture-type="mic"] > div[role="button"]'
    ];
    var cameraSelectors = [
        '.OQ', 
        '[data-capture-type="cam"] > div[role="button"]'
    ];

    for (var i=0; i < microphoneSelectors.length; i++) {
        var microphone = document.querySelector(microphoneSelectors[i]);
        var camera = document.querySelector(cameraSelectors[i]);
console.log(microphone); 
console.log(camera); 
        if (microphone && camera) {
            hookHangouts(microphone, camera);
        }
    }
});

var observerConfig = {
    childList: true,
    attributes: true
};

var targetNode = document.body;
observer.observe(targetNode, observerConfig);

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
    console.log('click')
    item.dispatchEvent(new PointerEvent('pointerdown', {bubbles: true}));
    item.dispatchEvent(new MouseEvent('mousedown', {bubbles: true}));
    item.dispatchEvent(new PointerEvent('pointerup', {bubbles: true}));
    item.dispatchEvent(new MouseEvent('mouseup', {bubbles: true}));
    item.dispatchEvent(new MouseEvent('mouseout', {bubbles: true}));
    item.dispatchEvent(new MouseEvent('click', {bubbles: true}));
}
