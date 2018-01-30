let mymap = L.map('leafMapid').fitWorld();
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1IjoieW91Y2FuZGVsZXRldGhpcyIsImEiOiJjamN4bXRqbDMxbWMzMzJwZ204c3BrOXdoIn0.COM41OPsXdIcWezDTpwrIw',
            }).addTo(mymap);


let markers = [];


function onLocationFound(e) {
    let radius = e.accuracy / 2;
    // console.log(e.latlng);
    L.marker(e.latlng).addTo(mymap)
        .bindPopup('You are within ' + radius + ' meters from this point')
        .openPopup();

    L.circle(e.latlng, radius).addTo(mymap);

    getWiki(e.latlng.lat, e.latlng.lng);
    }

mymap.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
    }

mymap.on('locationerror', onLocationError);
mymap.locate({setView: true, maxZoom: 16});

function getWiki(lat, lng) {
    $.ajax({
        'method': 'GET',
        'url': 'http://api.geonames.org/findNearbyWikipediaJSON',
        'datatype': 'json',
        'data': {
            'username': 'donaldtrump',
            'style': 'full',
            'formatted': 'true',
            'lat': lat,
            'lng': lng,
        },
        'success': parseResponse,
    });
}


function parseResponse(data) {
    console.log(data.geonames[0]);
    data.geonames.forEach(function(o) {
        createPins(o.lng, o.lat, o.summary);
    });
}

function createPins(lng, lat, summary) {
    var marker = L.marker([lat, lng]).addTo(mymap)
        .bindPopup(summary).openPopup;
    markers.push(marker);
}

