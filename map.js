/**
 * Created by oleksandrstudenyak on 12.06.17.
 */
var map;
function initialize() {
    var sanFrancisco = new google.maps.LatLng(42.719287, 12.112846);
    var myOptions = {
        center: sanFrancisco,
        zoom: 13,
        mapTypeId: 'satellite'
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    google.maps.event.addListener(map, 'zoom_changed', function() {
		zoomLevel = map.getZoom();
	    initialBounds = map.getBounds();
	    console.log(initialBounds);
		console.log(zoomLevel)
	});

	// google.maps.event.addListener(map, 'bounds_changed', function() {
	// 	initialBounds = map.getBounds();
	// 	console.log(initialBounds);
	// });

    setHeatmapOverlay();
    test_google_plcases();
}

function set_marker(lat) {
    var marker = new google.maps.Marker({
        position: lat,
        map: map,
        title:"Hello World!"
    });
}

function setHeatmapOverlay(){
    var heatmapData = getData();
    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData
    });
    heatmap.setMap(map);
}

function test_panoramio() {
    try {
        var myRequest = new panoramio.PhotoRequest({
            rect: {
                sw: {lat: 45.42, lng: 12.29},
                ne: {lat: 45.44, lng: 12.33}
            }
        });
    }
    catch (j) {
        console.log(j);
    }


    var myOptions = {
        'width': 300,
        'height': 300
    };

    var widget = new panoramio.PhotoWidget('photo_set', myRequest, myOptions);
    widget.setRequest(myRequest);
    widget.setPosition(0);

    var pos = widget.getPosition();
    var photo = widget.getPhoto();
    console.log(photo);

    var h = widget.getAtEnd();
    console.log(h);

    h = widget.getAtStart();
    console.log(h);

}


function test_google_plcases(callback) {
    var GOOGLE_API_KEY = "AIzaSyA75X0ZZiD-UZ4m2OAaEctAXJZS9rd_Vcc";
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            console.log(xmlHttp.responseText);
            // callback(xmlHttp.responseText);
    };

    var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key="+GOOGLE_API_KEY+"&location=37.774546,-122.433523&radius=10000";
    xmlHttp.open("GET", url, true); // true for asynchronous
    // xmlHttp.setRequestHeader("Access-Control-Allow-Headers", "X-Requested-With");
    // xmlHttp.setRequestHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    // xmlHttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xmlHttp.send(null);
}


function getData() {

	return db.map((item, index) => ({location: new google.maps.LatLng(item.lat, item.lon), weight: item.weight}));
}

initialize();