var Mopidy = require('mopidy');

var mopidy = new Mopidy({
    webSocketUrl: "ws://192.168.2.119:6680/mopidy/ws/"
});


mopidy.on("state:online", function () {
	console.log("state:online")
    mopidy.playlists.lookup('spotify:user:126388824:playlist:0DTRXkqYrmvt6lHm3eKX2t').done(test=>console.log(test))

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
