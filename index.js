var Mopidy = require('mopidy');

var mopidy = new Mopidy({
    webSocketUrl: "ws://192.168.2.106:6680/mopidy/ws/"
});


mopidy.on("state:online", function () {
<<<<<<< HEAD
	console.log("state:online")
    mopidy.playlists.lookup('spotify:user:126388824:playlist:0DTRXkqYrmvt6lHm3eKX2t').done(test=>console.log(test))
=======

    // console.log(mopidy.tracklist.add)

    // mopidy.tracklist.add([{'uri': 'spotify:track:2gmHWTVT3M598AfBmMD59k'}]);
    // mopidy.playlists.getPlaylists().then(pl=>console.log(pl))

    mopidy.library.lookup('spotify:user:126388824:playlist:0DTRXkqYrmvt6lHm3eKX2t').done(test=>mopidy.tracklist.add(test.tracks))

    // mopidy.tracklist.nextTrack().done(test=>console.log(test))
>>>>>>> 5b57e4b75986f5fc3109983e64e1f1f8881b8651

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
