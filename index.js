var Mopidy = require('mopidy');

var mopidy = new Mopidy({
    webSocketUrl: "ws://localhost:6680/mopidy/ws/"
});


mopidy.on(console.log.bind(console));

mopidy.on("state:online", function () {

    // console.log(mopidy.tracklist.add)

    // mopidy.tracklist.add([{'uri': 'spotify:track:2gmHWTVT3M598AfBmMD59k'}]);
    // mopidy.playlists.getPlaylists().then(pl=>console.log(pl))

    console.log("pre lookup")
    mopidy.library.lookup('spotify:user:126388824:playlist:0DTRXkqYrmvt6lHm3eKX2t').done(test=>{
        console.log(test)
        mopidy.tracklist.add(test.tracks)
    })

    // console.log("past lookup")
    mopidy.tracklist.nextTrack().done(test=>console.log(1,test))

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
