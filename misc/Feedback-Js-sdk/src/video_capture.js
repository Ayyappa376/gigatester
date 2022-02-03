let Video_Capture = {
    device_list: {
        audioinput: [],
        videoinput: [],
        audiooutput: [],
        videooutput: []
    },
    recorded_blobs: [],
    recorder: null,
    audio_script_processor: null,
    screen_stream: null,
    voice_stream: null,
    combined_stream: null,
    options: {
        onSubmit: null,
        onCancel: null
    },
    timer_timeout: null,
    timer: 60,
    timer_total: 60,
    count_down_timeout: null,
    count_down: 0,
    is_muted: false,
    draw_mode: false,
    annotations: [],
    annotation_timeline: [],
    snap: null,
    mime_type: 'video/webm; codecs="vp8, opus"',
    isOpen: function() {
        return this.controls ? true : false
    },
    start: function(options) {
        this.options.onSubmit = options.onSubmit || null;
        this.options.onCancel = options.onCancel || null;
        this.timer = options.timer || 180;
        this.timer = Math.min(300, this.timer);
        this.timer = Math.max(60, this.timer);
        this.timer_total = this.timer;
        console.log('started video record')
        this.reset();
        this.getDevice(this.createControls.bind(this));
        this.startCapture()
    },
    reset: function() {
        this.recorded_blobs = [];
        this.recorder = null;
        this.audio_script_processor = null;
        this.screen_stream = null;
        this.voice_stream = null;
        this.combined_stream = null;
        this.is_muted = false;
        this.draw_mode = false;
        if (this.controls) {
            this.pause_btn.html(Svg_Icons.pause)
        }
        this.snap = null
    },
    getDevice: function(callback) {
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
            callback();
            return
        }
        navigator.mediaDevices.enumerateDevices().then(function(devices) {
            devices.forEach(function(device) {
                console.log(device.kind)
                switch (device.kind) {
                    case "audioinput":
                        this.device_list.audioinput.push(device);
                        break;
                    case "videoinput":
                        this.device_list.videoinput.push(device);
                        break;
                    case "audiooutput":
                        this.device_list.audiooutput.push(device);
                        break;
                    case "videooutput":
                        this.device_list.videooutput.push(device);
                        break
                }
            }.bind(this));
            callback()
        }.bind(this)).catch(function(error) {})
    },
    createControls: function() {
        this.controls_overlay = $("<gtdiv>").attr("id", "gigatester_video_container").appendTo($(document.body));
        this.controls = $("<gtvideotoolbar>").appendTo($(document.body));
        this.mute_btn = $("<btn>").addClass("gigatester-video-controls-mute gigatester-video-controls-active").html("<btn-tooltip>" + "<btn-name>" + Lang.get("recording_mute", true) + "</btn-name>" + "<btn-shortcut>Shift + M</btn-shortcut>" + "</btn-tooltip>" + "<btn-tooltip-arrow></btn-tooltip-arrow>" + Svg_Icons.mic).appendTo(this.controls);
        // this.draw_btn = $("<btn>").addClass("gigatester-video-controls-draw").html("<btn-tooltip>" + "<btn-name>" + Lang.get("recording_draw", true) + "</btn-name>" + "<btn-shortcut>Shift + D</btn-shortcut>" + "</btn-tooltip>" + "<btn-tooltip-arrow></btn-tooltip-arrow>" + Svg_Icons.highlighter).appendTo(this.controls);
        this.pause_btn = $("<btn>").addClass("gigatester-video-controls-pause").attr("disabled", true).html("<btn-tooltip>" + "<btn-name>" + Lang.get("recording_pause", true) + "</btn-name>" + "<btn-shortcut>Shift + P</btn-shortcut>" + "</btn-tooltip>" + "<btn-tooltip-arrow></btn-tooltip-arrow>" + Svg_Icons.pause).appendTo(this.controls);
        this.start_btn = $("<btn>").addClass("gigatester-video-controls-start").html("<btn-tooltip>" + "<btn-name>" + Lang.get("start_recording", true) + "</btn-name>" + "<btn-shortcut>Shift + S</btn-shortcut>" + "</btn-tooltip>" + "<btn-tooltip-arrow></btn-tooltip-arrow>" + "<btn-record></btn-record>").appendTo(this.controls);
        this.stop_btn = $("<btn>").addClass("gigatester-video-controls-stop").html("<btn-tooltip>" + "<btn-name>" + Lang.get("recording_finish", true) + "</btn-name>" + "<btn-shortcut>Shift + S</btn-shortcut>" + "</btn-tooltip>" + "<btn-tooltip-arrow></btn-tooltip-arrow>" + "<btn-timer><btn-timer-mask></btn-timer-mask></btn-timer>" + Svg_Icons.stop).appendTo(this.controls);
        this.timer_btn = $("<btn>").addClass("gigatester-video-controls-timer").text(this.getTimerText()).appendTo(this.controls);
        this.close_btn = $("<btn>").addClass("gigatester-video-controls-close").html("<btn-tooltip>" + "<btn-name>" + Lang.get("cancel", true) + "</btn-name>" + "<btn-shortcut>Esc</btn-shortcut>" + "</btn-tooltip>" + "<btn-tooltip-arrow></btn-tooltip-arrow>" + Svg_Icons.times).appendTo(this.controls);
        this.mic_volume = $("<gtvolume>" + "<gtdiv></gtdiv>" + "<gtdiv></gtdiv>" + "<gtdiv></gtdiv>" + "</gtvolume>").appendTo(this.mute_btn);
        if (!this.device_list.audioinput.length) {
            this.is_muted = true;
            this.mute_btn.removeClass("gigatester-video-controls-active").attr("disabled", true)
        }
        this.stop_btn.find("btn-timer, btn-timer-mask").css("animation-duration", this.timer + "s");
        this.start_btn.on("click", this.startCapture.bind(this));
        this.stop_btn.on("click", this.stopCapture.bind(this));
        this.close_btn.on("click", this.cancelCapture.bind(this));
        this.pause_btn.on("click", this.pauseRecording.bind(this));
        this.mute_btn.on("click", this.muteVoice.bind(this));
        // this.draw_btn.on("click", this.toggleDrawMode.bind(this));
        this.mute_btn.on("mouseenter", this.showBtnTooltip.bind(this));
        this.mute_btn.on("mouseleave", this.hideBtnTooltip.bind(this));
        this.draw_btn.on("mouseenter", this.showBtnTooltip.bind(this));
        this.draw_btn.on("mouseleave", this.hideBtnTooltip.bind(this));
        this.pause_btn.on("mouseenter", this.showBtnTooltip.bind(this));
        this.pause_btn.on("mouseleave", this.hideBtnTooltip.bind(this));
        this.start_btn.on("mouseenter", this.showBtnTooltip.bind(this));
        this.stop_btn.on("mouseleave", this.hideBtnTooltip.bind(this));
        this.stop_btn.on("mouseenter", this.showBtnTooltip.bind(this));
        this.start_btn.on("mouseleave", this.hideBtnTooltip.bind(this));
        this.close_btn.on("mouseenter", this.showBtnTooltip.bind(this));
        this.close_btn.on("mouseleave", this.hideBtnTooltip.bind(this));
        this.controls.on("mousedown.videodrag", this.events.toolbarMouseDown.bind(this));
        $(document).on("mousemove.videodrag", this.events.documentMouseMove.bind(this));
        $(document).on("mouseup.videodrag", this.events.documentMouseUp.bind(this));
        $(document).on("mousedown.video", this.events.documentMouseDown.bind(this));
        $(document).on("keydown.video", this.events.documentKeyDown.bind(this))
    },
    events: {
        toolbarMouseDown: function(e) {
            if ($(e.target).prop("tagName").toLowerCase() !== "gtvideotoolbar") {
                return
            }
            this.toolbar_drag_start = true;
            this.toolbar_drag_x = e.pageX;
            this.toolbar_drag_y = e.pageY;
            this.toolbar_left = parseInt(this.controls.css("left"), 10);
            console.log($(e.target).prop("tagName").toLowerCase(), 'left')
            this.toolbar_bottom = parseInt(this.controls.css("bottom"), 10)
        },
        documentMouseMove: function(e) {
            if (!this.toolbar_drag_start) {
                return
            }
            console.log(this.toolbar_drag_start, 'start drag')
            var left = this.toolbar_left + (e.pageX - this.toolbar_drag_x);
            var bottom = this.toolbar_bottom - (e.pageY - this.toolbar_drag_y);
            left = Math.max(12, left);
            left = Math.min($(window).width() - 12 - this.controls.innerWidth(), left);
            bottom = Math.max(12, bottom);
            bottom = Math.min($(window).height() - 12 - this.controls.innerHeight(), bottom);
            this.controls.css({
                left: left,
                bottom: bottom
            })
        },
        documentMouseDown: function(e) {
            if (!this.recorder) {
                return
            }
            if (this.draw_mode) {
                return
            }
            if ($(e.target).parents("gtvideotoolbar").length || $(e.target).prop("tagName").toLowerCase() === "gtvideotoolbar") {
                return
            }
            var mouse_click = $("<gtmouseclick>").appendTo($(document.body));
            mouse_click.css({
                top: e.pageY - $(window).scrollTop(),
                left: e.pageX - $(window).scrollLeft()
            });
            setTimeout(function() {
                mouse_click.remove()
            }, 500)
        },
        documentMouseUp: function(e) {
            this.toolbar_drag_start = false
        },
        documentKeyDown: function(e) {
            var tag_name = $(e.target).prop("tagName").toLowerCase();
            if (["input", "textarea"].indexOf(tag_name) !== -1) {
                return
            }
            switch (e.which) {
                case 27:
                    this.close_btn.trigger("click");
                    break;
                case 68:
                    if (e.shiftKey) {
                        this.draw_btn.trigger("click")
                    }
                    break;
                case 77:
                    if (e.shiftKey) {
                        this.mute_btn.trigger("click")
                    }
                    break;
                case 80:
                    if (e.shiftKey) {
                        this.pause_btn.trigger("click")
                    }
                    break;
                case 83:
                    if (e.shiftKey) {
                        if (this.start_btn.is(":visible")) {
                            this.start_btn.trigger("click")
                        } else {
                            this.stop_btn.trigger("click")
                        }
                    }
                    break
            }
        }
    },
    showBtnTooltip: function(e) {
        if (this.toolbar_drag_start) {
            return
        }
        $(e.currentTarget).find("btn-tooltip, btn-tooltip-arrow").show();
        var left = $(e.currentTarget).find("btn-tooltip").offset().left;
        var right = parseInt(left, 10) + parseInt($(e.currentTarget).find("btn-tooltip").outerWidth(), 10);
        if (left < 0) {
            $(e.currentTarget).find("btn-tooltip").css("margin-left", Math.ceil(left) * -1 + 5)
        } else if (right > $(window).width()) {
            $(e.currentTarget).find("btn-tooltip").css("margin-left", (right - $(window).width()) * -1 - 5)
        }
    },
    hideBtnTooltip: function(e) {
        $(e.currentTarget).find("btn-tooltip, btn-tooltip-arrow").hide();
        $(e.currentTarget).find("btn-tooltip").css("margin-left", "")
    },
    removeControls: function() {
        this.controls_overlay.remove();
        this.controls.remove();
        this.controls_overlay = null;
        this.controls = null;
        if (this.audio_script_processor && typeof this.audio_script_processor._disconnect !== "undefined") {
            this.audio_script_processor._disconnect()
        }
        $("gtmouseclick").remove();
        $(document).off("mousedown.video");
        $(document).off("keydown.video");
        $(document).off("mousedown.videodrag");
        $(document).off("mousemove.videodrag")
    },
    muteVoice: function() {
        if (this.mute_btn.attr("disabled")) {
            return
        }
        this.is_muted = !this.is_muted;
        if (this.is_muted) {
            this.mute_btn.removeClass("gigatester-video-controls-active");
            this.mute_btn.find("btn-name").text(Lang.get("recording_unmute", true))
        } else {
            this.mute_btn.addClass("gigatester-video-controls-active");
            this.mute_btn.find("btn-name").text(Lang.get("recording_mute", true))
        }
        this.toggleAudio()
    },
    toggleDrawMode: function() {
        if (this.draw_btn.attr("disabled")) {
            return
        }
        this.draw_mode = !this.draw_mode;
        this.draw_btn.toggleClass("gigatester-video-controls-active");
        if (this.draw_mode) {
            this.addOverlay()
        } else {
            this.removeOverlay()
        }
    },
    toggleAudio: function() {
        if (!this.combined_stream) {
            return
        }
        var audio_tracks = this.combined_stream.getAudioTracks();
        if (audio_tracks.length) {
            audio_tracks.forEach(function(audio_track) {
                audio_track.enabled = !this.is_muted
            }.bind(this))
        }
    },
    addOverlay: function() {
        var dpr = typeof window.devicePixelRatio === "undefined" ? 1 : window.devicePixelRatio;
        $("gtvideooverlay").remove();
        this.overlay = $("<gtvideooverlay>");
        this.overlay.attr({
            dpr: dpr.toFixed(2),
            recording: this.recorder ? "true" : "false"
        });
        this.overlay.append('<svg id="snap_svg_video" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"></svg>');
        this.overlay.css("height", $(document).height());
        this.overlay.appendTo($(document.body));
        this.snap = Snap("#snap_svg_video");
        this.snap.drag(this.dragMove.bind(this), this.dragStart.bind(this), this.dragStop.bind(this));
        this.snap.touchstart(this.dragStart.bind(this));
        this.snap.touchmove(this.dragMove.bind(this));
        this.snap.touchcancel(this.dragStop.bind(this));
        this.snap.touchend(this.dragStop.bind(this));
        $(window).on("resize.video", function() {
            if (this.overlay) {
                this.overlay.css("height", 0);
                this.overlay.css("height", $(document).height())
            }
        }.bind(this));
        $(window).on("scroll.video", function() {
            if (this.annotation_clear_timeout) {
                return
            }
            this.annotation_clear_timeout = setTimeout(function() {
                this.annotations.forEach(function(obj) {
                    obj.animate({
                        opacity: 0
                    }, 1e3)
                });
                this.annotations = [];
                this.annotation_clear_timeout = null
            }.bind(this), 2e3)
        }.bind(this))
    },
    removeOverlay: function() {
        $("gtvideooverlay").remove();
        $(window).off("scroll.video");
        $(window).off("resize.video")
    },
    dragStart: function() {
        if (!this.recorder) {
            return
        }
        if (this.draw_started) {
            return
        }
        clearTimeout(this.annotation_clear_timeout);
        this.annotation_clear_timeout = null;
        var x, y, event;
        if (typeof arguments[0] === "object") {
            event = arguments[0]
        } else {
            event = arguments[2]
        }
        x = parseInt(event.offsetX, 10);
        y = parseInt(event.offsetY, 10);
        this.draw_started = true;
        this.svg_obj_path = this.snap.path("M" + x + "," + y);
        this.svg_obj_path.attr({
            stroke: "#E80000",
            "stroke-width": 15,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            fill: "transparent",
            opacity: .8
        });
        this.stop_x = x;
        this.stop_y = y;
        this.annotation_timeline.push(this.timer_total - this.timer)
    },
    dragMove: function() {
        if (!this.recorder) {
            return
        }
        if (!this.draw_started) {
            return
        }
        var x, y, event;
        if (typeof arguments[0] === "object") {
            event = arguments[0]
        } else {
            event = arguments[4]
        }
        x = event.pageX - this.overlay.offset().left;
        y = event.pageY - this.overlay.offset().top;
        this.stop_x = x;
        this.stop_y = y;
        this.stop_x = Math.max(6, this.stop_x);
        this.stop_y = Math.max(6, this.stop_y);
        this.stop_x = Math.min(this.snap.node.clientWidth - 6, this.stop_x);
        this.stop_y = Math.min(this.snap.node.clientHeight - 6, this.stop_y);
        var current_path = this.svg_obj_path.attr("path");
        var new_path = current_path + "L" + this.stop_x + "," + this.stop_y;
        this.svg_obj_path.attr("path", new_path)
    },
    dragStop: function(event) {
        if (!this.recorder) {
            return
        }
        if (!this.draw_started) {
            return
        }
        var bbox = this.svg_obj_path.getBBox();
        if (bbox.width === 0 || bbox.height === 0) {
            this.annotation_timeline.pop()
        }
        this.annotations.push(this.svg_obj_path);
        this.draw_started = false;
        this.stop_x = 0;
        this.stop_y = 0;
        this.svg_obj_path = false
        // console.log('drag stopped')
    },
    startCapture: function() {
        var displayMediaOptions = {
            video: {
                cursor: "always"
            },
            audio: false
        };
        var userMediaOptions = {
            audio: true,
            video: false
        };
        try {
            var _afterGetVideoStream = function() {
                this.screen_stream.getTracks()[0].onended = function() {
                    this.stopCapture()
                }.bind(this);
                var count_down = this.count_down;
                var _timer = function() {
                    if (count_down === 0) {
                        this.controls_overlay.hide();
                        $(".gigatester-video-count-down").remove();
                        this.startRecording()
                    } else {
                        $("<gttimer>").addClass("gigatester-video-count-down").text(count_down).appendTo($(document.body));
                        count_down--;
                        this.count_down_timeout = setTimeout(_timer.bind(this), 1e3)
                    }
                };
                _timer.call(this);
                this.stop_btn.show();
                this.timer_btn.show();
                this.start_btn.hide();
                this.close_btn.hide()
            }.bind(this);
            var _afterGetVoiceStream = function() {
                if (this.voice_stream) {
                    navigator.mediaDevices.getDisplayMedia(displayMediaOptions).then(function(stream) {
                        this.screen_stream = stream;
                        var screen_tracks = this.screen_stream.getTracks();
                        var voice_tracks = this.voice_stream.getTracks();
                        this.combined_stream = new MediaStream(screen_tracks.concat(voice_tracks));
                        _afterGetVideoStream()
                    }.bind(this)).catch(this.handleCaptureError.bind(this))
                } else {
                    navigator.mediaDevices.getDisplayMedia(displayMediaOptions).then(function(stream) {
                        this.screen_stream = stream;
                        var screen_tracks = this.screen_stream.getTracks();
                        this.combined_stream = this.screen_stream;
                        this.is_muted = true;
                        this.mute_btn.removeClass("gigatester-video-controls-active").attr("disabled", true);
                        _afterGetVideoStream()
                    }.bind(this)).catch(this.handleCaptureError.bind(this))
                }
            }.bind(this);
            if (this.device_list.audioinput.length) {
                navigator.mediaDevices.getUserMedia(userMediaOptions).then(function(stream) {
                    this.voice_stream = stream;
                    _afterGetVoiceStream();
                    try {
                        var audio_context = new AudioContext;
                        var analyser = audio_context.createAnalyser();
                        var microphone = audio_context.createMediaStreamSource(stream);
                        this.audio_script_processor = audio_context.createScriptProcessor(2048, 1, 1);
                        analyser.smoothingTimeConstant = .8;
                        analyser.fftSize = 1024;
                        microphone.connect(analyser);
                        analyser.connect(this.audio_script_processor);
                        this.audio_script_processor.connect(audio_context.destination);
                        this.audio_script_processor._disconnect = function() {
                            this.audio_script_processor.disconnect(audio_context.destination)
                        }.bind(this);
                        this.audio_script_processor.onaudioprocess = function() {
                            var values = 0;
                            var array = new Uint8Array(analyser.frequencyBinCount);
                            analyser.getByteFrequencyData(array);
                            for (var i = 0; i < array.length; i++) {
                                values += array[i]
                            }
                            var average = values / array.length;
                            var volume = Math.floor(average / 150 * 10);
                            this.mic_volume.toggleClass("hasvolume", volume > 0)
                        }.bind(this)
                    } catch (e) {}
                }.bind(this)).catch(function() {
                    _afterGetVoiceStream()
                }.bind(this))
            } else {
                _afterGetVoiceStream()
            }
        } catch (e) {
            this.handleCaptureError(e)
        }
    },
    stopCapture: function() {
        if (this.recorder) {
            this.submitRecording()
        } else {
            this.stopRecording();
            this.removeControls();
            this.removeOverlay();
            this.reset();
            if (this.options.onCancel) {
                this.options.onCancel()
            }
        }
    },
    cancelCapture: function() {
        this.stopRecording();
        this.removeControls();
        this.removeOverlay();
        this.reset();
        if (this.options.onCancel) {
            this.options.onCancel()
        }
    },
    handleCaptureError: function(e) {
        if (typeof e.name !== "undefined" && e.name === "NotAllowedError") {
            this.stopCapture()
        } else {
            Feedback.modalConfirm('<div style="margin-bottom: 8px;"><b>Video recording is not supported in your browser</b></div><div class="gigatester-modal-info-text">Please download the latest version of <a href="https://www.google.com/chrome/">Chrome</a>, <a href="https://www.mozilla.org/firefox/download/thanks/">Firefox</a> or <a href="http://microsoft.com/en-us/edge">Microsoft Edge</a>.</div>', function() {
                Feedback.modalClose()
            }, "OK")
        }
    },
    getTimerText: function() {
        var min = Math.floor(this.timer / 60);
        var sec = this.timer - min * 60;
        if (min < 10) {
            min = "0" + min
        }
        if (sec < 10) {
            sec = "0" + sec
        }
        return min + ":" + sec
    },
    startTimer: function() {
        this.stop_btn.find("btn-timer, btn-timer-mask").css("animation-play-state", "running");
        this.timer_timeout = setInterval(function() {
            var timer_text = this.getTimerText();
            this.timer_btn.text(timer_text);
            this.timer--;
            if (timer_text === "00:00") {
                clearInterval(this.timer_timeout);
                this.submitRecording()
            }
        }.bind(this), 1e3)
    },
    stopTimer: function() {
        clearInterval(this.timer_timeout)
    },
    stopCountDown: function() {
        clearTimeout(this.count_down_timeout)
    },
    startRecording: function() {
        try {
            this.recorder = new MediaRecorder(this.combined_stream, {
                mimeType: this.mime_type
            })
        } catch (e) {
            return
        }
        this.toggleAudio();
        this.recorder.addEventListener("dataavailable", this.handleDataAvailable.bind(this));
        this.recorder.start(10);
        this.pause_btn.removeAttr("disabled");
        // this.draw_btn.removeAttr("disabled");
        if (this.overlay) {
            this.overlay.attr("recording", this.recorder ? "true" : "false")
        }
        this.startTimer();
        window.addEventListener("beforeunload", function(e) {
            if (!this.recorder) {
                return
            }
            e.preventDefault();
            e.returnValue = ""
        }.bind(this))
    },
    stopRecording: function() {
        if (this.recorder) {
            this.recorder.stop()
        }
        if (this.combined_stream) {
            this.combined_stream.getTracks().forEach(function(track) {
                track.stop()
            })
        }
        this.stopTimer();
        this.stopCountDown()
    },
    pauseRecording: function() {
        if (this.pause_btn.attr("disabled")) {
            return
        }
        if (!this.recorder) {
            return
        }
        switch (this.recorder.state) {
            case "recording":
                this.pause_btn.html("<btn-tooltip><btn-name>" + Lang.get("recording_resume", true) + "</btn-name><btn-shortcut>Shift + P</btn-shortcut></btn-tooltip><btn-tooltip-arrow></btn-tooltip-arrow>" + Svg_Icons.resume);
                this.recorder.pause();
                this.stop_btn.find("btn-timer, btn-timer-mask").css("animation-play-state", "paused");
                this.stopTimer();
                break;
            case "paused":
                this.pause_btn.html("<btn-tooltip><btn-name>" + Lang.get("recording_pause", true) + "</btn-name><btn-shortcut>Shift + P</btn-shortcut></btn-tooltip><btn-tooltip-arrow></btn-tooltip-arrow>" + Svg_Icons.pause);
                this.recorder.resume();
                this.stop_btn.find("btn-timer, btn-timer-mask").css("animation-play-state", "running");
                this.startTimer();
                break
        }
    },
    submitRecording: function() {
        this.stopRecording();
        if (this.options.onSubmit) {
            var video_blob = new Blob(this.recorded_blobs, {
                type: "video/webm"
            });
            this.options.onSubmit(video_blob, this.annotation_timeline)
        }
        this.removeControls();
        this.removeOverlay();
        this.reset()
    },
    handleDataAvailable: function(e) {
        if (e.data && e.data.size > 0) {
            this.recorded_blobs.push(e.data)
        }
    }
};

export default Video_Capture;