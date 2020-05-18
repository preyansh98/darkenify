const BACKEND_BASE_URI = "http://darkenify-pop.herokuapp.com";

document.addEventListener('DOMContentLoaded', function () {
    runCollapsibleUISource(); 
    addEventHandlersForRatings(); 
    addEventHandlersForIssues(); 
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
  let submitRatingButton = document.getElementById('submit-rating-button'); 
  submitRatingButton.addEventListener("click", function() {
    const onSubmitTextNode = document.getElementById('rating-onsubmit-text'); 
    const star_ids = ["one", "two", "three", "four", "five"];

    var isAnyChecked = false; 
    var ratingVal = 0; 
    for(var i = 0; i<star_ids.length; ++i){
      const star = document.getElementById(star_ids[i]); 
      if(star.classList.contains("checked")) {
        if(!isAnyChecked)
          isAnyChecked = true; 
        ratingVal++;       
      }
    }

    if(isAnyChecked) {
      onSubmitTextNode.innerText = 'Thank you for rating!';
      onSubmitTextNode.style.color = 'green';
      var obj = {"rating" : ratingVal}
      makePostRequest(BACKEND_BASE_URI+"/rating/create", obj); 
    } else {
      onSubmitTextNode.innerText = 'Please select a rating first';
      onSubmitTextNode.style.color = 'red';
    }
    onSubmitTextNode.style.visibility = 'inherit'; 
  })
}

function addEventHandlersForIssues(){
//Submit Issue Handler
  let submitIssueHandler = document.getElementById('submit-issue-button');
  submitIssueHandler.addEventListener("click", function() {
    const issueText = document.getElementById("comment_text"); 
    if(issueText && issueText.innerText) {
      const issue = issueText.innerText; 
      var obj = {"issue" : issue}; 
      makePostRequest(BACKEND_BASE_URI + "/issue/create", obj); 
    }
  });
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

//Post Request for popup api

function makePostRequest(endpoint, obj) { 
  chrome.storage.sync.get('userid', function(items) {
    var userid = items.userid;
    if (userid) {
        useToken(userid);
    } else {
        userid = getRandomToken();
        chrome.storage.sync.set({userid: userid}, function() {
            useToken(userid);
        });
    }
    function useToken(userid) {
        obj.id = userid; 
        const params = new URLSearchParams(obj).toString(); 

        var req = new XMLHttpRequest(); 
        req.open("POST", endpoint, true);
        req.setRequestHeader("Content-type", "application/json"); 
        req.setRequestHeader('Access-Control-Allow-Origin', '*');
        req.send(params); 
        
        req.onreadystatechange = function() {
          if(this.readyState === XMLHttpRequest.DONE && this.status == 200){
            console.log(this.statusText); 
          }
        }
    }
  });
}

//User identification
function getRandomToken() {
  // E.g. 8 * 32 = 256 bits token
  var randomPool = new Uint8Array(32);
  crypto.getRandomValues(randomPool);
  var hex = '';
  for (var i = 0; i < randomPool.length; ++i) {
      hex += randomPool[i].toString(16);
  }
  // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
  return hex;
}