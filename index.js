var Mopidy = require('mopidy');

var mopidy = new Mopidy({
    webSocketUrl: "ws://localhost:6680/mopidy/ws/"
});


mopidy.on("state:online", function () {
    mopidy.playback.next();
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
