//upon loading the HTMl body, call the init fx <body onload="init();">
var sqlLite = {};
sqlLite.webdb = {};

sqlLite.webdb.db = null;


sqlLite.webdb.open = function() {
  var dbSize = 5 * 1024 * 1024; // 10MB
  //sqlLite.webdb.db = openDatabase("offlineSyncDb", "1", "GIS info db", dbSize);
    sqlLite.webdb.db = openDatabase("GISOffline", "1", "GIS offline SqlLite", []);
}

sqlLite.webdb.onError = function(tx, e) {
  alert("There has been an error: " + e.message);
}

sqlLite.webdb.onSuccess = function(tx, r) {
  // re-render the data.
  // loadItems is defined in Step 4a
  //sqlLite.webdb.getRecords(loadItems);
}

sqlLite.webdb.createTable = function() {
  var db = sqlLite.webdb.db;
  db.transaction(function(tx) {
   tx.executeSql("CREATE TABLE IF NOT EXISTS OfflineSync(logID TEXT,formData TEXT, postUrl TEXT)", []);
   tx.executeSql("CREATE TABLE IF NOT EXISTS OfflineLogin(UserName TEXT,Password TEXT)", []);
   });
}


sqlLite.webdb.OfflineSync_Insertxx = function(logID,formData,postUrl) {
  var db = sqlLite.webdb.db;
  db.transaction(function(tx){
	  alert("Inserting1111.");
    var addedOn = new Date();
    tx.executeSql("INSERT INTO OfflineSync(logID, formData, postUrl) VALUES (?,?,?)",
	[logID, formData, postUrl],
        sqlLite.webdb.onSuccess,
        sqlLite.webdb.onError);
       /* 
	    tx.executeSql("INSERT INTO forms(FrmID) VALUES (?)",["uniqueID"],
        sqlLite.webdb.onSuccess,
        sqlLite.webdb.onError);
		*/
		
   });
}


sqlLite.webdb.OfflineSync_Insert = function(logID,formData,postUrl) {
  var db = sqlLite.webdb.db;
  db.transaction(function(tx){
	  alert("Inserting0000.");
	  
    var addedOn = new Date();
    tx.executeSql("INSERT INTO OfflineSync(logID, formData, postUrl) VALUES (?,?,?)",
	[logID, formData, postUrl],
        sqlLite.webdb.onSuccess,
        sqlLite.webdb.onError);
	
       /* 
	    tx.executeSql("INSERT INTO forms(FrmID) VALUES (?)",["uniqueID"],
        sqlLite.webdb.onSuccess,
        sqlLite.webdb.onError);
		*/
		
   });
}



sqlLite.webdb.OfflineUser_Insert = function(usrNm,passwrd) {
  var db = sqlLite.webdb.db;
  db.transaction(function(tx){
   tx.executeSql("DELETE FROM OfflineLogin", [],
        sqlLite.webdb.onSuccess,
        sqlLite.webdb.onError);
		  
	tx.executeSql("INSERT INTO OfflineLogin(UserName,Password) VALUES (?,?)",
	   [usrNm, passwrd],
        sqlLite.webdb.onSuccess,
        sqlLite.webdb.onError);
		
    });
}




function displayForms(tx,rs)
{
		alert("filter fomr 2");
var rowOutput="";

  for (var i=0; i < rs.rows.length; i++) {
    //rowOutput += "<br>" + rs.rows.item(i).Question + ": <input type='" +  rs.rows.item(i).InputType + "' name='"+ rs.rows.item(i).qNum +"_" + rs.rows.item(i).FrmID +"' />" ;
    
	rowOutput += "<tr><td>"+ i +"</td><td>" + rs.rows.item(i).logID + "</td><td>" + rs.rows.item(i).formData  + "</td><td>" + rs.rows.item(i).postUrl + "</td></tr>"  ;
  }
  
  document.getElementById("formData").innerHTML=rowOutput;
}





sqlLite.webdb.deleteAll = function() {
  var db = sqlLite.webdb.db;
  db.transaction(function(tx){
    tx.executeSql("DELETE FROM OfflineSync", [],
        sqlLite.webdb.onSuccess,
        sqlLite.webdb.onError);
    });
}



sqlLite.webdb.filterForms = function() {
	alert("filter fomr 1");
	var db= sqlLite.webdb.db;
	db.transaction(function(tx){
		    tx.executeSql("SELECT * FROM `OfflineSync`", [],
        displayForms,
        sqlLite.webdb.onError);
	});	
}


sqlLite.webdb.userLogon = function(userName,passwrd) {
	alert("userLogon");
	var db= sqlLite.webdb.db;
	db.transaction(function(tx){
		   tx.executeSql("SELECT * FROM OfflineLogin WHERE UserName='" + userName  +"' AND Password='"+ passwrd +"'", [],
		passthrough,
        sqlLite.webdb.onError);
	});	
}

function passthrough(tx,rs)
  {
	if (rs.rows.length==1)
	{
		alert("Local Login successful");
		window.location="splash.html";	
	} else
	{		
		alert("Local login failed");
	}
	
 }


 sqlLite.webdb.loadCurrentUser = function() {
	alert("loading currnet user");
	var db= sqlLite.webdb.db;
	db.transaction(function(tx){
		   tx.executeSql("SELECT * FROM OfflineLogin WHERE UserName !=''", [],
		setCurrentUser,
        sqlLite.webdb.onError);
	});	
}

function setCurrentUser()
{
if (rs.rows.length==1)
	{
      currentUserID = rs.rows.item(0).UserName;
	}else
	{
		currentUserID="";
	}
}
 
function sqlLiteinit() {
	alert("init 223");
  sqlLite.webdb.open();
  sqlLite.webdb.createTable();
 // sqlLite.webdb.getRecords(loadItems);
}






