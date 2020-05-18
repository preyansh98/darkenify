//Enabled Switch Settings: 

// on init:
chrome.storage.local.get('enabled', function(res){
    if(res['enabled'] !== undefined){
        setIcon(res['enabled']);
    } else {
        chrome.storage.local.set({'enabled' : true});
    }
});

//on change
chrome.storage.onChanged.addListener(function (actions, _) {
    for (var action in actions){
        if(action === 'enabled'){
            setIcon(actions[action].newValue);
        }
    }
});

function setIcon(isEnabled) {
    const enabledSuffix = isEnabled ? '' : '-disabled';
    const path = `static/icons/martlet-128x128${enabledSuffix}.png`;
    chrome.browserAction.setIcon({'path' : path});
}