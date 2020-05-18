//Create a mock object for testing on a desktop browser
var mockPrecorWalkup = {
	complete: function () {
		console.log('Complete')
	}, 
	requestSignIn: function() {
		console.log('RequestSignIn')
	},
	getFitnessEquipmentInfo: function () {
        console.log('getFitnessEquipmentInfo');
        console.log('{\"serialNumber\":\"serial33333\", \"friendlyName\":\"MyPC\", \"ipAddress\":\"1.1.1.1\"}');
        return JSON.stringify({ "serialNumber": "serial33333", "friendlyName": "MyPC", "type": "developerPc", "consoleType": "P82", "ipAddress": "1.1.1.1" });
	},
  setItem: function (storeName, storeValue, globalBool) {
    localStorage.setItem(storeName, storeValue);
  },
  getItem: function (readName) {
    return localStorage.getItem(readName);
	},
		onShown: function() {

	}
};


//Use the injected precorWalkup object if it exists - if not, use the mocked object
var precorWalkup = precorWalkup != undefined ? precorWalkup : mockPrecorWalkup;

//A place to store the console type
var theFe = JSON.parse(precorWalkup.getFitnessEquipmentInfo());
var theConsoleType = theFe.consoleType;
//On successful sign-in triggered by the walk-up, hide the Walkup app
function myOnRequestSignInCompleted(success) {
  if (success) {
    precorWalkup.complete();
  }
}


//When a successful sign in is initiated by hardware (e.g. RFID) onSignedIn will be called
function myOnSignedIn() {
  // Check stored serviceState to see if console is available for use
  var consoleOnline = precorWalkup.getItem("serviceState");
  if (consoleOnline == "inService") {
    // console is in service, allow sign in
    precorWalkup.complete();
  } else {
    // console is out of service, block sign in
    // nothing to do, just ignore the sign in attempt
  }
}


function myComplete() {
  precorWalkup.complete();
}

function hideRects(){
  document.getElementById("white").style.display = "none";
  document.getElementById("black").style.display = "none";
  document.getElementById("white2").style.display = "none";
  document.getElementById("black2").style.display = "none";
  document.getElementById("selector").style.display = "none";
 precorWalkup.setItem("serviceState", "socialDistance", false);
}

var svcState = 0;
function screenState() {
  svcState += 1;
    document.getElementById("svcState").innerHTML = svcState;
    if (svcState == 1) {
    document.getElementById("inService").style.display = "block";
    document.getElementById("socialDistance").style.display = "none"; 
  precorWalkup.setItem("serviceState", "inService", false);
  /*failing here as the svsState variable isnt getting reset*/
    svcState = svcState - 2;
    } else {
    document.getElementById("selector").style.display = "block";
        }
}

function sdScreen() {
  document.getElementById("inService").style.display = "none";
  document.getElementById("socialDistance").style.display = "block"; 
  document.getElementById("selector").style.display = "none";
  precorWalkup.setItem("serviceState", "socialDistance", false);
}
function blueSelector() {
  document.getElementById("selector").style.display = "none";
  document.getElementById("colorBG").style.backgroundColor = '#00AACD';
}
function greenSelector() {
  document.getElementById("selector").style.display = "none";
  document.getElementById("colorBG").style.backgroundColor = '#99ca3b';
}
function orangeSelector() {
  document.getElementById("selector").style.display = "none";
  document.getElementById("colorBG").style.backgroundColor = 'orange';
}
function yellowSelector() {
  document.getElementById("selector").style.display = "none";
  document.getElementById("colorBG").style.backgroundColor = '#ffcc33';
}
function poppySelector() {
  document.getElementById("selector").style.display = "none";
  document.getElementById("colorBG").style.backgroundColor = 'orangered';
}


var selectorState = 0;
function selectorState() {
  document.getElementById("selector").style.display = "block";
}




var myCounter = 0;
var secCounter = 0;
var t1 = setInterval(mySecs, 1000);
var myLoop = 0;


function mySecs() {
  secCounter += 1;
 /* document.getElementById("mySecs").innerHTML = secCounter;*/
  if (secCounter > 180) {
      document.getElementById("white").style.display = "block";
      document.getElementById("white2").style.display = "block";
      var blueShown = 1;
      if (secCounter > 185) {
      document.getElementById("white").style.display = "none";
      document.getElementById("white2").style.display = "none";
      document.getElementById("black").style.display = "block";
      document.getElementById("black2").style.display = "block";
         if (secCounter > 187) {
           document.getElementById("black").style.display = "none";
           document.getElementById("black2").style.display = "none";
           secCounter = 0;
           /*document.getElementById("mySecs").innerHTML = secCounter;*/
           clearInterval(t1);
           myLoop = 1;
           /*document.getElementById("myLoop").innerHTML = myLoop;*/
           t1 = setInterval(mySecs, 1000);
        }
      }
  }
}

//Set the callbacks to listen for console sign in events
precorWalkup.onRequestSignInCompleted = myOnRequestSignInCompleted;
precorWalkup.onSignedIn = myOnSignedIn;


  