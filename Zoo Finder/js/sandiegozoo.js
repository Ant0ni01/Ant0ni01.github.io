$(document).ready(function () {
    $.getJSON("https://api.openweathermap.org/data/2.5/weather?id=5391811&units=metric&appid=03e4c77b5a50a7bcbd540fb044c1e2d1", function(data) {

    //pull out the values here
    cityName = data["name"];
    lon = data ["coord"]["lon"];
    lat = data ["coord"]["lat"];
    weatherDescription = data["weather"][0]["description"];
    temp = data["main"]["temp"];
    feels = data["main"]["feels_like"];
    

    //output to browser here
    $("#weather").html(cityName+" : "+weatherDescription);
    $("#temperature").html("Current Temperature: "+temp+" °C  but feels like "+feels+" °C");
    //pass data to getNearestAirport function
    getTheNearestAirport(lat,lon);	
    });

function getTheNearestAirport(lat,lon){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://aerodatabox.p.rapidapi.com/airports/search/location/"+lat+"/"+lon+"/km/100/1?withFlightInfoOnly=false",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "aerodatabox.p.rapidapi.com",
            "x-rapidapi-key": "0cfe8e308dmsh5f27ab2bdbf9f33p1f9305jsn11d2df2cff47"
        }
    }
   
        $.ajax(settings).done(function (response) {
        console.log(response);
        //just for now, output Airport code to browser        
        //$("#airport").html(airportText);
        getAirportDetails(response.items[0].iata)
        });
  
   };

   //next part of airport stuff goes here i.e. airport details
   function getAirportDetails(airportCode){
       var settings = {
       "async": true,
       "crossDomain": true,
       "url": "https://airport-info.p.rapidapi.com/airport?iata="+airportCode+"&icao="+airportCode+"",
       "method": "GET",
       "headers": {
           "x-rapidapi-host": "airport-info.p.rapidapi.com", 
           "x-rapidapi-key": "df906ab585msh2d92c17e2c9e87fp12d66fjsncc04a480b7c3"
       }
}

$.ajax(settings).done(function (response) {
    console.log(response);
    
    var airportText = "";
    airportText += "Airport Name: " +response.name+" <br /> <br />" ; 
    airportText += "Airport IATA Code: " +response.iata+" <br /> <br />";
    airportText += "Airport Location: " +response.location+" <br /> <br />";
    airportText += "Phone Number: " +response.phone+" <br /> <br />";
    airportText += "Website: <a href='"+response.website+"' target='_blank'>"+ response.website+" </a><br />";
    
    $("#airport").html(airportText);


});
};

   // Get time for zoo location
   var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://world-time2.p.rapidapi.com/timezone/America/Los_Angeles",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "world-time2.p.rapidapi.com",
		"x-rapidapi-key": "106bf7b36amsh4d86d361783c3bep1dfb1ajsnbb07544445f3"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);


    var timeInfo = "";
    timeInfo += "Current Time: "+response.datetime+" <br/> <br/>";
    timeInfo += "Timezone: "+response.timezone+"<br/> <br/>";
    timeInfo += "UTC offset: "+response.utc_offset+"<br/> <br/>";

    $("#time").html(timeInfo);        
});

// Get Images from Imgur
var settings = {
    "url": "https://api.imgur.com/3/album/VSmwCB7/images",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Authorization": "Bearer 76b0b662ae89429c8b066492d2b3ff21099328c3",
    },
  };

  		//code for row fix on showing images
          $.ajax(settings).done(function (response) {
            var photoHTML = "";
            //Loop through JSON data
            var loopCount = 0;
            $.each(response.data, function(i,images) {
                photoHTML += '<div class="col-sm-4"><img src="'+images.link+'"class="img-responsive" title="'+images.description+'"/><br/></div>';
                {
                loopCount++;
                if(loopCount == 3)
                    photoHTML += '<div style="clear:both"></div>'
                    loopCount = 0;
                }
            }); //end each
            
        $("#imgur-images").html(photoHTML);
        // To double check 
        console.log(response);
        });

//don't go past this
});
