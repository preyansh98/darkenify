document.addEventListener('DOMContentLoaded', function () {
    runCollapsibleUISource(); 
    document.getElementById('toggle-switch').addEventListener('click', updateToggle);
    initToggle(); 
});

function runCollapsibleUISource(){
    var coll = document.getElementsByClassName("collapsible");
    var i;
    
    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        } 
      });
    }
}

//Toggle Switch
function updateToggle() {
	const isEnabled = document.getElementById('toggle-switch').checked;
	setEnabled(isEnabled);
}

function setEnabled(isEnabled) {
	chrome.storage.local.set({'enabled': isEnabled});
}

function initToggle() {
	chrome.storage.local.get('enabled', function(res) {
    let isEnabled = res.enabled; 

    if(isEnabled !== undefined) {
      document.getElementById('toggle-switch').checked = isEnabled; 
    } else {
      updateToggle();
    }
  }); 
}