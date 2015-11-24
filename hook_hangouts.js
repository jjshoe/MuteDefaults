function hookHangouts () {
   var microphoneClass = 'IQ';
   var cameraClass = 'OQ';

   chrome.storage.sync.get('muteMicrophone', function (result) {
       if (result.muteMicrophone) {
           var microphone = document.getElementsByClassName(microphoneClass);
           microphone[0].dispatchEvent(new MouseEvent('mousedown'));
           microphone[0].dispatchEvent(new MouseEvent('mouseup'));
           microphone[0].dispatchEvent(new MouseEvent('mouseout'));
       }
   });

   chrome.storage.sync.get('muteCamera', function (result) {
       if (result.muteCamera) {
           var camera = document.getElementsByClassName(cameraClass);
           camera[0].dispatchEvent(new MouseEvent('mousedown'));
           camera[0].dispatchEvent(new MouseEvent('mouseup'));
           camera[0].dispatchEvent(new MouseEvent('mouseout'));
       }
   });
};

window.addEventListener('load', hookHangouts);
