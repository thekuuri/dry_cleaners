//alert("loading");
document.getElementById("gps").addEventListener("click", getPosition);
document.getElementById("barcode").addEventListener("click", scan);


//alert("loading 2");

function getPosition() {
alert("Fetching GPS Coordinates -1");
var accuracy = 1;
var maxAge=2000;
//accuracy  = document.getElementById("accuracy").value;
//maxAge  = document.getElementById("maxAge").value;

//alert("accuracy:" + accuracy);
//alert("maxAge:" + maxAge);

accuracy=Boolean(accuracy);
maxAge=parseInt(maxAge);

		
  // var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError,  { enableHighAccuracy: true, maximumAge: maxAge });
   var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 3000, timeout: 30000, enableHighAccuracy: true });
  // var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 3000, timeout: 90000, enableHighAccuracy: false });

   function onSuccess(position) {

    /* var allT= 'Latitude: '      + position.coords.latitude          + '\n' +
         'Longitude: '         + position.coords.longitude         + '\n' +
         'Altitude: '          + position.coords.altitude          + '\n' +
         'Accuracy: '          + position.coords.accuracy          + '\n' +
         'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
         'Heading: '           + position.coords.heading           + '\n' +
         'Speed: '             + position.coords.speed             + '\n' +
         'Timestamp: '         + position.timestamp                + '\n';
		 
         alert(allT);
		*/
		
		//document.getElementById("speedMonitor").innerHTML=position.coords.speed;
			//document.getElementById("resetSplit").addEventListener("click", stopSplit);
		document.getElementById("gps").value=position.coords.latitude + "," + position.coords.longitude; 
	
		document.getElementById("LAT").value=position.coords.latitude; 
		document.getElementById("LON").value=position.coords.longitude; 
		document.getElementById("ALT").value=position.coords.altitude; 
		 
   };

   function onError(error) {
      alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
   }
}


function scan(){
 //console.log("Barcode Scan");
 //alert("Launching barcodeScanner");
 cordova.plugins.barcodeScanner.scan(function(result){
 //success callback
 document.getElementById("barcode").value= result.text;
   $.get(serverAddress + "/GisFiles/www/nameFetch.php?barcode=" + result.text,function(data)
   {
    $("#BARCODE_RETURN").html(data);
   });
 

 },function(error){
 //error callback
 //alert(JSON.stringify(error));
  document.getElementById("barcode").value="error:" + result.cancelled;

 });
 }
 
 