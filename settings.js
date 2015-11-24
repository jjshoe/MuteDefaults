function loadSettings() {
    chrome.storage.sync.get('muteMicrophone', function (result) {
        document.getElementById('muteMicrophone').checked = result.muteMicrophone;
    });

    chrome.storage.sync.get('muteCamera', function (result) {
        document.getElementById('muteCamera').checked = result.muteCamera;
    });

    document.getElementById('muteCamera').addEventListener('click', saveSettings);
    document.getElementById('muteMicrophone').addEventListener('click', saveSettings);
}

function saveSettings() {
    muteMicrophone = document.getElementById('muteMicrophone').checked
    muteCamera = document.getElementById('muteCamera').checked

    chrome.storage.sync.set({'muteMicrophone': muteMicrophone});
    chrome.storage.sync.set({'muteCamera': muteCamera});
}

window.addEventListener('load', loadSettings);
