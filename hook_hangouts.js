var observer = new MutationObserver(function(mutations) {
    var microphoneClass = 'IQ';
    var cameraClass = 'OQ';

    var microphone = document.getElementsByClassName(microphoneClass);
    var camera = document.getElementsByClassName(cameraClass);

    if (microphone && camera && microphone[0] && camera[0]) {
        hookHangouts(microphone[0], camera[0]);
    }
});

var observerConfig = {
    childList: true
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
};

function simulateClick(item) {
    item.dispatchEvent(new MouseEvent('mousedown'));
    item.dispatchEvent(new MouseEvent('mouseup'));
    item.dispatchEvent(new MouseEvent('mouseout'));
}
