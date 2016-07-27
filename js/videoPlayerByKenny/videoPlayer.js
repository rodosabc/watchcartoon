$(document).ready(function() {
    var controls = {
        video: $("#video"),
        playpause: $("#playpause"),
        togglePlayback: function() {
            (video.paused) ? video.play(): video.pause();
        },
        total: $("#total"),
        buffered: $("#buffered"),
        progress: $("#current"),
        duration: $("#duration"),
        currentTime: $("#currenttime"),
        dynamic: $("#dynamic"),
        currentBtn: $("#currentBtn"),
        hasHours: false,
        unlock: false
    };

    var video = controls.video[0];

    controls.video.click(function() {
        controls.togglePlayback();
    });

    controls.playpause.click(function() {
        controls.togglePlayback();
    });

    video.addEventListener("ended", function() {
        video.pause();
        controls.playpause.html('<img src="js/videoPlayerByKenny/media-play-symbol.svg">');
        controls.playpause.toggleClass("paused");
    });

    video.addEventListener("play", function() {
        controls.playpause.html('<img src="js/videoPlayerByKenny/pause-bars.svg">');
        controls.playpause.toggleClass("paused");
    });

    video.addEventListener("pause", function() {
        controls.playpause.html('<img src="js/videoPlayerByKenny/media-play-symbol.svg">');
        controls.playpause.toggleClass("paused");
    });

    video.addEventListener("canplay", function() {
        controls.hasHours = (video.duration / 3600) >= 1.0;
        controls.duration.text(formatTime(video.duration, controls.hasHours));
        controls.currentTime.text(formatTime(0), controls.hasHours);
    }, false);

    video.addEventListener("timeupdate", function() {
        controls.currentTime.text(formatTime(video.currentTime, controls.hasHours));

        var progress = Math.floor(video.currentTime) / Math.floor(video.duration);
        controls.progress[0].style.width = Math.floor(progress * controls.total.width()) + "px";
    }, false);

    video.addEventListener("progress", function() {
        var buffered = Math.floor(video.buffered.end(0)) / Math.floor(video.duration);
        controls.buffered[0].style.width = Math.floor(buffered * controls.total.width()) + "px";
    }, false);

    controls.total.click(function(e) {
        var x = (e.pageX - pageX(this)) / $(this).width();
        video.currentTime = x * video.duration;
    });


    function formatTime(time, hours) {
        if (hours) {
            var h = Math.floor(time / 3600);
            time = time - h * 3600;

            var m = Math.floor(time / 60);
            var s = Math.floor(time % 60);

            return h.lead0(2) + ":" + m.lead0(2) + ":" + s.lead0(2);
        } else {
            var m = Math.floor(time / 60);
            var s = Math.floor(time % 60);

            return m.lead0(2) + ":" + s.lead0(2);
        }
    }

    Number.prototype.lead0 = function(n) {
        var nz = "" + this;
        while (nz.length < n) {
            nz = "0" + nz;
        }
        return nz;
    };

    function pageX(elem) {
        return elem.offsetParent ?
            elem.offsetLeft + pageX(elem.offsetParent) :
            elem.offsetLeft;
    }
});
