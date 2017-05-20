//Contains Global Variables
serverAddress = "";          //Logon Sever 192.168.43.58
serverAddress = localStorage.getItem("serverAddress");
newAddr="";

function changeServer()
{
	
    var serverAddress=prompt("Enter a new server address",localStorage.getItem("serverAddress"));
	
        localStorage.setItem("serverAddress",serverAddress);
	    showInfo("info","Address changed to [" + serverAddress  +"] ","Success");
}

serverAddress = localStorage.getItem("serverAddress");
	if (newAddr != null)
	{
			if (newAddr.length>5 && newAddr != "undefined")
			{
			 serverAddress=newAddr;
			}
			
	}


function switchNetworkIcon(status)
{
if (status==1)
 {
   	$("#connectionIcon").removeClass("connectionIconOFF");
    $("#connectionIcon").addClass("connectionIconON");
	}else
	{
	$("#connectionIcon").removeClass("connectionIconON");
    $("#connectionIcon").addClass("connectionIconOFF");
	
	}
	
}
