var HID = require('node-hid');

var Mopidy = require('mopidy');

var mopidy = new Mopidy({
    webSocketUrl: "ws://localhost:6680/mopidy/ws/"
});

console.log("start", HID.devices())

var ids = {
	'4288095348326438482906972160428809534832643628388371660834084860461056428809534832643848290697216036283883716608351843720888324068193022771243980465111040': {
		action: 'playlist',
		payload: 'spotify:user:126388824:playlist:0DTRXkqYrmvt6lHm3eKX2t'
		},
	'4288095348326438482906972160428809534832643518437208883241781441855488351843720888324068193022771242880953483264395824185999364288095348326443980465111040': {
		action: 'playlist',
		payload: 'spotify:album:7wGBvXA1TKtlqyJq6Mtsl5'}
};

// console.log(HID.devices())
mopidy.on("state:online", function () {


var device = new HID.HID(5050,24);

let combinedData = '';

device.on("data", function(data) {
  let parsedData = parseInt(data.toString('hex'),16);
  if (parsedData === 0) {
    test(combinedData);
    combinedData = '';
  } else {
    combinedData += parsedData;
  }
});


function test(combinedData) {
	console.log(ids[combinedData]);
	if (ids[combinedData]) {
		let data = ids[combinedData];
		if (data.action === 'playlist') {
			mopidy.library.lookup(data.payload)
				.done(tracks => {
					console.log("tracks.length:",tracks.length, tracks);
					mopidy.tracklist.clear().done(test=>console.log("clear tracklist:",test));
					// tracks.forEach(track => {
						mopidy.tracklist.add(tracks).done(tracks=>mopidy.playback.play());
					// });
				});
		}
	} else {
		console.log('new:', combinedData);
	}
}

    // console.log(mopidy.tracklist.add)

    // mopidy.tracklist.add([{'uri': 'spotify:track:2gmHWTVT3M598AfBmMD59k'}]);
    // mopidy.playlists.getPlaylists().then(pl=>console.log(pl))

    // mopidy.library.lookup('spotify:album:7wGBvXA1TKtlqyJq6Mtsl5')
		// .done(test=>{
			// console.log(test);
		// });
	
    // mopidy.tracklist.nextTrack().done(test=>console.log(test))

    mopidy.playback.getCurrentTrack()
        .done(printCurrentTrack);
});



var printCurrentTrack = function (track) {
    if (track) {
        console.log("Currently playing:", track.name, "by",
            track.artists[0].name, "from", track.album.name);
    } else {
        console.log("No current track");
    }
};
