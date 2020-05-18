document.addEventListener('DOMContentLoaded', function () {
    runCollapsibleUISource(); 
    addEventHandlersForRatings(); 
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

function addEventHandlersForRatings() {
  const star_ids = ["one", "two", "three", "four", "five"];

  //Star Ratings Handlers
  star_ids.forEach(function(star) {
    const htmlNode = document.getElementById(star); 
    htmlNode.addEventListener("click", function() { 
      if(htmlNode.className.includes('unchecked')) {
        //make all from left checked. 
        for(var i = 0; i<star_ids.length; ++i) {
          document.getElementById(star_ids[i]).classList.remove("unchecked"); 
          document.getElementById(star_ids[i]).classList.add("checked"); 
          if(star_ids[i]==htmlNode.id) break;
        }
      } else {
        for(var i = star_ids.length-1; i>=0; --i) {
          if(star_ids[i]==htmlNode.id) break;
          document.getElementById(star_ids[i]).classList.remove("checked"); 
          document.getElementById(star_ids[i]).classList.add("unchecked"); 
        }
      }
    })
  }); 

  //Submit Button Handler. 
  let submitButton = document.getElementById('submit-rating-button'); 
  submitButton.addEventListener("click", function() {
    const onSubmitTextNode = document.getElementById('rating-onsubmit-text'); 
    const star_ids = ["one", "two", "three", "four", "five"];

    var isAnyChecked = false; 
    for(var i = 0; i<star_ids.length; ++i){
      const star = document.getElementById(star_ids[i]); 
      if(star.classList.contains("checked")) {
        isAnyChecked = true; 
        break;
      }
    }

    if(isAnyChecked) {
      onSubmitTextNode.innerText = 'Thank you for rating!';
      onSubmitTextNode.style.color = 'green';
    } else {
      onSubmitTextNode.innerText = 'Please select a rating first';
      onSubmitTextNode.style.color = 'red';
    }
    onSubmitTextNode.style.visibility = 'inherit'; 
  })
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