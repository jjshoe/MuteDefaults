function simulateClick(item) {
  item.dispatchEvent(new PointerEvent('pointerdown', {bubbles: true}));
  item.dispatchEvent(new MouseEvent('mousedown', {bubbles: true}));
  item.dispatchEvent(new PointerEvent('pointerup', {bubbles: true}));
  item.dispatchEvent(new MouseEvent('mouseup', {bubbles: true}));
  item.dispatchEvent(new MouseEvent('mouseout', {bubbles: true}));
  item.dispatchEvent(new MouseEvent('click', {bubbles: true}));

  return true;
}

function findValidElements(elements) {
  for (var i=0; i < elements.length; i++) {
    if (document.querySelector(elements[i]['microphone']['startElement'])) {
      return elements[i]; 
    }
  }
}

function mute(muteMicrophone, muteCamera, validElements) {
  // Try to mute items now
  var mutedMicrophone = muteDevice('microphone', muteMicrophone, validElements);
  var mutedCamera = muteDevice('camera', muteCamera, validElements);
  
  if (mutedMicrophone == false || mutedCamera == false) {
    return false;
  }

  return true;
}

function muteDevice(device, mute, validElements) {
  if (mute == true) {
    var endElement = document.querySelector(validElements[device]['endElement']);
    var startElement = document.querySelector(validElements[device]['startElement']);

    if (endElement == null) {  
      simulateClick(startElement);
      return false;
    }
  }

  return true;
}

var elements = [
  {
    microphone: 
    {
      'startElement': '.IQ',
      'endElement': '.IQ[aria-pressed="true"]'
    },
    camera: 
    {
      'startElement': '.OQ',
      'endElement': '.OQ[aria-pressed="true"]'
    }
  },
  {
    microphone: 
    {
      'startElement': '[data-capture-type="mic"] > div[role="button"]',
      'endElement': '[data-capture-type="mic"] > .je'
    },
    camera: 
    {
      'startElement': '[data-capture-type="cam"] > div[role="button"]',
      'endElement': '[data-capture-type="cam"] > .je'
    }
  }
];

chrome.storage.sync.get(['muteMicrophone', 'muteCamera'], function (result) {
  // Only run if we want one of the inputs muted 
  if (result.muteMicrophone || result.muteCamera) {
    var elementsIntervalId;
    var mutesIntervalId;

    elementsIntervalId = setInterval(function() {
      // We have a list of possible elements, let's find which we should be using
      validElements = findValidElements(elements);

      if (validElements) {
        clearInterval(elementsIntervalId);
        mutesIntervalId = setInterval(function() {
          // Let's try muting devices now
          muteSuccess = mute(result.muteMicrophone, result.muteCamera, validElements);

          if (muteSuccess == true) {
            clearInterval(mutesIntervalId);
          }
        }, 500);
      }
    }, 500);
  }
});
