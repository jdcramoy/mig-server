var subString = "@hubspot.com";
var jsonData = {
	"email": "",
	"firstname": "",
	"portal_id": "",
	"domain": ""
}
function createCookie() {
	var now = new Date();
	var time = now.getTime();
	time += 3600 * 1000;
	now.setTime(time);
	document.cookie = 
	'username=' + "hslogin" + 
	'; expires=' + now.toUTCString() + 
	'; path=/';	
}
function createObject() {
	for(key in jsonData) {
	    if(jsonData.hasOwnProperty(key)) {
	        var value = jsonData[key];
	        if(key == "email") {value = userName; jsonData.email = value;}
	        if(key == "firstname") {value = firstName; jsonData.firstname = value;}
	        if(key == "portal_id") {value = portalId; jsonData.portal_id = value;}
	        if(key == "domain") {value = window.location.hostname; jsonData.domain = value;}
	    }
	}
	jQuery.ajax({
	    type: 'POST',
	    url: 'https://murmuring-bayou-58971.herokuapp.com/',
	    data: jsonData,
	    success: (function() {
			console.log("Successful")
		})()
	});
}
(function() {
	if(userName && userName.substring(userName.length-12, userName.length) != subString && document.cookie.indexOf("hslogin") == -1 ) {
		createObject();
		createCookie();
	}
})();