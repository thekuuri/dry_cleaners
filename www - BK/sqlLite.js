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


sqlLite.webdb.OfflineSync_Insert = function(logID,formData,postUrl) {
  var db = sqlLite.webdb.db;
  db.transaction(function(tx){
    tx.executeSql("INSERT INTO OfflineSync(logID, formData, postUrl) VALUES (?,?,?)",
	[logID, formData, postUrl],
        sqlLite.webdb.onSuccess,
        sqlLite.webdb.onError);
		
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


sqlLite.webdb.userLogon = function(userName,passwrd) {
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



 sqlLite.webdb.CountOfflineRecords = function() {
    var db= sqlLite.webdb.db;
	db.transaction(function(tx){
		   tx.executeSql("SELECT * FROM OfflineSync", [],
		passCount,
        sqlLite.webdb.onError);
	});	
}

function passCount(tx,rs)
 {
   
    OfflineRecords = rs.rows.length;
	window.localStorage.setItem("OfflineRecords", OfflineRecords);
	uploadAndDelete(rs);
 }

 function uploadAndDelete(rs)
 {
	 //alert("upload and delete");
	// alert("rs.rows.length:" +rs.rows.length);
	 for (i=0;i<rs.rows.length;i++)
	 {
		 
		 urlPost =rs.rows.item(i).postUrl;
		 dataPost =rs.rows.item(i).formData;
		 log_Id =rs.rows.item(i).logID;
		// alert("loop:" + i + urlPost);
		   $.post(urlPost,dataPost,function(data)
				   {
					   //if server respondes with OK, then delete locally saved data
					 if (data=="OK")
					 {
					 deleteSql ="delete from offlinesync where logID ='" + log_Id + "'";
				     var db= sqlLite.webdb.db;
				     db.transaction(function(tx){
								  tx.executeSql(deleteSql, [],
								   sqlLite.webdb.onSuccess,
								   sqlLite.webdb.onError);
								 });
					 }
			   
				});
				
       }
	 
	 
 }
  
 
function sqlLiteinit() {

  sqlLite.webdb.open();
  sqlLite.webdb.createTable();

}






