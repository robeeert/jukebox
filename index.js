var Mopidy = require('mopidy');

var mopidy = new Mopidy({
    webSocketUrl: "ws://localhost:6680/mopidy/ws/"
});

mopidy.on("state:online", function () {

    console.log("pre lookup")
    mopidy.library.lookup('spotify:user:126388824:playlist:0DTRXkqYrmvt6lHm3eKX2t')
        .then(printTypeAndName)
        .fold(get, 'tracks')
        .then(mopidy.tracklist.add)
        .fold(get, 0)
        .then(mopidy.playback.play)
        .then(printNowPlaying)
        .catch(console.error.bind(console))
        .done();

});

var get = function (key, object) {
    return object[key];
};

var printTypeAndName = function (model) {
    console.log(model.__model__ + ": " + model.name);
    // By returning the playlist, this function can be inserted
    // anywhere a model with a name is piped in the chain.
    return model;
};

var printNowPlaying = function () {
    // By returning any arguments we get, the function can be inserted
    // anywhere in the chain.
    var args = arguments;
    return mopidy.playback.getCurrentTrack()
        .then(function (track) {
            console.log("Now playing:", trackDesc(track));
            return args;
        });
};

var printCurrentTrack = function (track) {
    if (track) {
        console.log("Currently playing:", track.name, "by",
            track.artists[0].name, "from", track.album.name);
    } else {
        console.log("No current track");
    }
};
