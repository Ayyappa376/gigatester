// @ts-nocheck
const GigaTester_StringRes = require('./js/stringRes');
const GigaTester_Icons = require('./js/icons');
const GigaTester_StringUtils = require('./js/stringUtils');

(function() {
    if(typeof window.jQuery === "undefined"){
        (function(d) {
            let s = d.createElement('script');s.async = true;
            s.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
            (d.head || d.body).appendChild(s);
        })(document);
    }
    if(typeof window.platform === "undefined"){
        (function(d) {
            let s = d.createElement('script');s.async = true;
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/platform/1.3.6/platform.min.js';
            (d.head || d.body).appendChild(s);
        })(document);
     }
    if(typeof window.Snap === "undefined"){
        (function(d) {
            let s = d.createElement('script');s.async = true;
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/snap.svg/0.5.1/snap.svg-min.js';
            (d.head || d.body).appendChild(s);
        })(document);
     }
     if(typeof window.html2canvas === "undefined"){
        (function(d) {
            let s = d.createElement('script');s.async = true;
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.3.3/html2canvas.min.js';
            (d.head || d.body).appendChild(s);
        })(document);
     }

    console.log('GigaTester: dependency loading');


    function gigatester(){
    if(typeof window.jQuery === "undefined" || typeof window.html2canvas === "undefined"  || typeof window.platform === "undefined" ||  typeof window.Snap === "undefined"){
        console.log('GigaTester: inside giga timeout')
    }
    else{
        try{
        let JQ = jQuery.noConflict(true);
        (function($) {
            "use strict";
            console.log('GigaTester: inside main function');
            if (typeof window.GigaTester === "undefined") {
                window.GigaTester = {}
            }
            window.GigaTester.hide = function(){
                $(document.getElementById("gigatester_ctrls_container")).css('display', 'none')
            }

            //this is the object that deals with the comments provided on the screenshot object
            let GigaTester_ScreenshotComment = function(options) {
                this.is_new = true;
                this.x = options.x;
                this.y = options.y;
                this.counter = options.counter;
                this.screenshot_num = options.screenshot_num;
                this.onDelete = options.onDelete;
                this.onOpen = options.onOpen;
                this.scroll_t = options.scroll_t;
                this.scroll_l = options.scroll_l;
                this.offset_x = options.offset_x;
                this.offset_y = options.offset_y;
                this.is_mobile = options.is_mobile;
                let element = $("<div>").addClass("gigatester-comment");
                let canvas_comment_message = "";
                element.on("click mouseup mousedown", function(e) {
                    e.stopPropagation()
                });
                element.on("keydown keyup", function(e) {
                    e.stopPropagation()
                });
                this.setHTML = function() {
                    return '<div class="gigatester-comment-pin"><span>' + (this.counter + 1) + "</span></div>" + '<form class="gigatester-comment-form">' + '<gtcomment class="gtmousescroll" contenteditable="true" data-ph="' + GigaTester_StringRes.get("add_comment") + '" gramm_editor="false"></gtcomment>' + '<btn class="gigatester-input-btn gigatester-btn-save">' + GigaTester_StringRes.get("save") + "</btn>" + '<btn class="gigatester-comment-form-delete" title="' + GigaTester_StringRes.get("delete") + '">' + GigaTester_Icons.trash_bin_icon + "</btn>" + '<btn class="gigatester-comment-form-close" title="' + GigaTester_StringRes.get("close") + '">' + GigaTester_Icons.cross_icon + "</btn>" + "</form>"
                };
                this.isOpen = function() {
                    return element.find(".gigatester-comment-form").is(":visible")
                };
                this.isEmpty = function() {
                    return canvas_comment_message ? false : true
                };
                this.setCounter = function(counter) {
                    this.counter = counter;
                    element.find(".gigatester-comment-pin > span").text(counter + 1)
                };
                this.submit = function() {
                    element.find(".gigatester-input-btn").click();
                };
                this.show = function() {
                    element.show()
                };
                this.hide = function() {
                    element.hide()
                };
                this.showForm = function() {
                    element.find(".gigatester-comment-form").show();
                    element.find("gtcomment").html(GigaTester_StringUtils.escapeSpecialChars(canvas_comment_message, true)).focus()
                };
                this.hideForm = function() {
                    element.find(".gigatester-comment-form-delete").show();
                    element.find(".gigatester-comment-form").hide()
                };
                this.saveComment = function(){
                    element.find(".gigatester-btn-save").trigger('click');
                }
                this.saveCanvasComments = function() {
                    element.find(".gigatester-btn-save").trigger('click');
                    console.log('set position')
                };
                this.setFormDirection = function() {
                    let form_width = this.is_mobile ? 210 : 430;
                    let form_height = this.is_mobile ? 150 : 200;
                    if (this.is_mobile) {
                        if (this.x > $(window).width() / 2) {
                            element.find(".gigatester-comment-form").attr("xdirection", "left")
                        } else {
                            element.find(".gigatester-comment-form").attr("xdirection", "right")
                        }
                        if (this.y > 140) {
                            element.find(".gigatester-comment-form").attr("ydirection", "top")
                        } else {
                            element.find(".gigatester-comment-form").attr("ydirection", "down")
                        }
                    } else {
                        if ($(window).scrollLeft() + $(window).width() - this.x >= form_width) {
                            element.find(".gigatester-comment-form").attr("xdirection", "right")
                        } else {
                            element.find(".gigatester-comment-form").attr("xdirection", "left")
                        }
                        if ($(window).scrollTop() + $(window).height() - this.y >= form_height) {
                            element.find(".gigatester-comment-form").attr("ydirection", "down")
                        } else {
                            element.find(".gigatester-comment-form").attr("ydirection", "top")
                        }
                    }
                };
                this.add = function() {
                    element.css({
                        top: this.y,
                        left: this.x
                    });
                    element.html(this.setHTML());
                    this.setFormDirection();
                    element.find(".gigatester-comment-pin").on("click", function(e) {
                        this.showForm();
                        this.onOpen(this.counter)
                    }.bind(this));
                    element.find(".gigatester-comment-form-close").on("click", function(e) {
                        e.stopPropagation();
                        if (this.is_new) {
                            this.destroy();
                            this.onDelete(this.counter);
                            return
                        }
                        this.hideForm()
                    }.bind(this));
                    element.find(".gigatester-comment-form-delete").on("click", function(e) {
                        e.stopPropagation();
                        this.destroy();
                        this.onDelete(this.counter)
                    }.bind(this));
                    element.find("gtcomment").on("keydown", function(e) {
                        if (e.which === 13) {
                            if (e.ctrlKey || e.metaKey) {
                                element.find('button[type="submit"]').on('click')
                            }
                        }
                    });
                    element.find("gtcomment").on("keyup", function(e) {
                        if ($(this).html() === "<br>") {
                            $(this).html("")
                        }
                    });
                    element.find("gtcomment").on("paste", function(e) {
                        e.preventDefault();
                        try {
                            let text = (e.originalEvent || e).clipboardData.getGigaData("text/plain");
                            document.execCommand("insertText", false, text)
                        } catch (e) {}
                    });
                    element.find(".gigatester-btn-save").on("click", function(e) {
                        canvas_comment_message = element.find("gtcomment").html();
                        canvas_comment_message = canvas_comment_message.replace(/<br\/?>/gi, "\n");
                        canvas_comment_message = canvas_comment_message.replace(/(<([^>]+)>)/gi, "");
                        canvas_comment_message = canvas_comment_message.replace(/&nbsp;/gi, " ");
                        canvas_comment_message = canvas_comment_message.replace(/&lt;/gi, "<");
                        canvas_comment_message = canvas_comment_message.replace(/&gt;/gi, ">");
                        canvas_comment_message = canvas_comment_message.replace(/&amp;/gi, "&");
                        canvas_comment_message = canvas_comment_message.replace(/&quot;/gi, '"');
                        canvas_comment_message = canvas_comment_message.trim();
                        if (!canvas_comment_message) {
                            return
                        }
                        this.is_new = false;
                        this.hideForm()
                    }.bind(this));
                    element.appendTo($(document.getElementById('gigatester_screencapture_area')));
                        if(element.find("gtcomment").text()){
                            console.log(element.find("gtcomment").text())
                        element.find(".gigatester-btn-save").trigger('click');
                        }
                    element.find("gtcomment").val('').trigger('focus').val(canvas_comment_message);
                };
                this.getGigaData = function() {
                    let screen_x = parseInt(this.x - this.scroll_l - this.offset_x, 10);
                    let screen_y = parseInt(this.y - this.scroll_t - this.offset_y, 10);
                    return {
                        screen_x: screen_x,
                        screen_y: screen_y,
                        screen_number: this.counter + 1,
                        screenshot_num: this.screenshot_num,
                        message: canvas_comment_message
                    }
                };
                this.destroy = function() {
                    element.remove();
                    element = undefined;
                    canvas_comment_message = ""
                }
            };

            let Screen_Recorder = {
                recorded_blobs: [],
                recorder: null,
                display_stream: null,
                audio_stream: null,
                combo_stream: null,
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
                mime_type: 'video/webm; codecs="vp8, opus"',
                device_list: {
                    audioinput: [],
                    screeninput: [],
                },
                isOpen: function() {
                    return this.controls ? true : false
                },
                start: function(options) {
                    this.options.onSubmit = options.onSubmit || null;
                    this.options.onCancel = options.onCancel || null;
                    this.timer = options.timer || 180;
                    this.timer = Math.min(300, this.timer);
                    this.timer = Math.max(30, this.timer);
                    this.timer_total = this.timer;
                    console.log('started screen record')
                    this.reset();
                    this.getGigaDevice(this.createNewControls.bind(this));
                },
                reset: function() {
                    this.recorded_blobs = [];
                    this.recorder = null;
                    this.display_stream = null;
                    this.audio_stream = null;
                    this.combo_stream = null;
                    this.is_muted = false;
                    if (this.controls) {
                        this.pause_button.html(GigaTester_Icons.pause_icon)
                    }
                },
                getGigaDevice: async function(callback) {
                    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                        callback();
                        return
                    }
                    await navigator.mediaDevices.enumerateDevices().then(function(devices) {
                        devices.forEach(function(device) {
                            console.log(device)
                            switch (device.kind) {
                                case "audioinput":
                                    this.device_list.audioinput.push(device);
                                    break;
                                case "screeninput":
                                    this.device_list.screeninput.push(device);
                                    break;
                            }
                        }.bind(this));
                        if(this.device_list.audioinput.length || this.device_list.screeninput.length){
                            this.startVideoCapture()
                        callback();
                        }
                    }.bind(this)).catch(function(error) {})
                },
                createNewControls: function() {
                    this.screen_recorder_overlay = $("<gtdiv>").attr("id", "gigatester_video_container").appendTo($(document.body));
                    this.controls = $("<gtvideotoolbar>").appendTo($(document.body));
                    this.mute_button = $("<btn>").addClass("gigatester-video-controls-mute gigatester-video-controls-active").html("<btn-tooltip>" + "<btn-name>" + GigaTester_StringRes.get("recording_mute", true) + "</btn-name>" + "</btn-tooltip>" + "<btn-tooltip-arrow></btn-tooltip-arrow>" + GigaTester_Icons.mic_icon).appendTo(this.controls);
                    this.pause_button = $("<btn>").addClass("gigatester-video-controls-pause").attr("disabled", true).html("<btn-tooltip>" + "<btn-name>" + GigaTester_StringRes.get("recording_pause", true) + "</btn-name>" +  "</btn-tooltip>" + "<btn-tooltip-arrow></btn-tooltip-arrow>" + GigaTester_Icons.pause_icon).appendTo(this.controls);
                    // this.start_button = $("<btn>").addClass("gigatester-video-controls-start").html("<btn-tooltip>" + "<btn-name>" + GigaTester_StringRes.get("start_recording", true) + "</btn-name>"  + "</btn-tooltip>" + "<btn-tooltip-arrow></btn-tooltip-arrow>" + "<btn-record></btn-record>").appendTo(this.controls);
                    this.stp_btn = $("<btn>").addClass("gigatester-video-controls-stop").html("<btn-tooltip>" + "<btn-name>" + GigaTester_StringRes.get("recording_finish", true) + "</btn-name>"  + "</btn-tooltip>" + GigaTester_Icons.stop_icon).appendTo(this.controls);
                    this.stop_button = $("<btn>").addClass("gigatester-video-controls-stop").html("<btn-tooltip>" + "<btn-name>" + GigaTester_StringRes.get("remaining_time", true) + "</btn-name>"  + "</btn-tooltip>" + "<btn-tooltip-arrow></btn-tooltip-arrow>" + "<btn-timer><btn-timer-mask></btn-timer-mask></btn-timer>").appendTo(this.controls);
                    this.timer_button = $("<btn>").addClass("gigatester-video-controls-timer").text(this.getTimerStr()).appendTo(this.controls);
                    this.close_button = $("<btn>").addClass("gigatester-video-controls-close").html("<btn-tooltip>" + "<btn-name>" + GigaTester_StringRes.get("cancel", true) + "</btn-name>"  + "</btn-tooltip>" + "<btn-tooltip-arrow></btn-tooltip-arrow>" + GigaTester_Icons.cross_icon).appendTo(this.controls);
                    // this.mic_volume = $("<gtvolume>" + "<gtdiv></gtdiv>" + "<gtdiv></gtdiv>" + "<gtdiv></gtdiv>" + "</gtvolume>").appendTo(this.mute_button);
                    if (!this.device_list.audioinput.length) {
                        this.is_muted = true;
                        this.mute_button.removeClass("gigatester-video-controls-active").attr("disabled", true)
                    }
                    this.stop_button.find("btn-timer, btn-timer-mask").css("animation-duration", this.timer + "s");
                    // this.start_button.on("click", this.startVideoCapture.bind(this));
                    this.stp_btn.on("click", this.stopGTcapture.bind(this));
                    this.close_button.on("click", this.cancelGTcapture.bind(this));
                    this.pause_button.on("click", this.recordingPause.bind(this));
                    this.mute_button.on("click", this.voiceMute.bind(this));
                    this.stop_button.on("mouseenter", function(){
                       $(document.getElementsByClassName('gigatester-video-controls-timer')).addClass('gigatester-video-controls-timer-show')
                        console.log('on')
                    });
                    this.stop_button.on("mouseleave", function(){
                        $(document.getElementsByClassName('gigatester-video-controls-timer')).removeClass('gigatester-video-controls-timer-show')
                    });
                },
                removeGTControls: function() {
                    this.screen_recorder_overlay.remove();
                    this.controls.remove();
                    this.screen_recorder_overlay = null;
                    this.controls = null;
                    $("gtmouseclick").remove();
                },
                voiceMute: function() {
                    if (this.mute_button.attr("disabled")) {
                        return
                    }
                    this.is_muted = !this.is_muted;
                    if (this.is_muted) {
                        this.mute_button.removeClass("gigatester-video-controls-active");
                        this.mute_button.find("btn-name").text(GigaTester_StringRes.get("recording_unmute", true))
                    } else {
                        this.mute_button.addClass("gigatester-video-controls-active");
                        this.mute_button.find("btn-name").text(GigaTester_StringRes.get("recording_mute", true))
                    }
                    this.audioToggle()
                },
                audioToggle: function() {
                    if (!this.combo_stream) {
                        return
                    }
                    let audio_tracks = this.combo_stream.getAudioTracks();
                    if (audio_tracks.length) {
                        audio_tracks.forEach(function(audio_track) {
                            audio_track.enabled = !this.is_muted
                        }.bind(this))
                    }
                },
                startVideoCapture: function() {
                    let displayMediaOptions = {
                        video: {
                            cursor: "always"
                        },
                        audio: false,
                        preferCurrentTab:false
                    };
                    let userMediaOptions = {
                        audio: true,
                        video: false
                    };
                    try {
                        let afterGetVideoStream = function() {
                            this.display_stream.getTracks()[0].onended = function() {
                                this.stopGTcapture()
                            }.bind(this);
                            let count_down = this.count_down;
                            let timer = function() {
                                if (count_down === 0) {
                                    this.screen_recorder_overlay.hide();
                                    $(".gigatester-video-count-down").remove();
                                    this.startRecording()
                                } else {
                                    $("<gttimer>").addClass("gigatester-video-count-down").text(count_down).appendTo($(document.body));
                                    count_down--;
                                    this.count_down_timeout = setTimeout(timer.bind(this), 1e3)
                                }
                            };
                            timer.call(this);
                            this.stop_button.show();
                            // this.timer_button.show();
                            // this.start_button.hide();
                            this.close_button.show()
                        }.bind(this);
                        let afterGetAudioStream = function() {
                            if (this.audio_stream) {
                                navigator.mediaDevices.getDisplayMedia(displayMediaOptions).then(function(stream) {
                                    this.display_stream = stream;
                                    let display_tracks = this.display_stream.getTracks();
                                    let audio_tracks = this.audio_stream.getTracks();
                                    this.combo_stream = new MediaStream(display_tracks.concat(audio_tracks));
                                    afterGetVideoStream()
                                }.bind(this)).catch(this.handleStreamCaptureError.bind(this))
                            } else {
                                navigator.mediaDevices.getDisplayMedia(displayMediaOptions).then(function(stream) {
                                    this.display_stream = stream;
                                    let display_tracks = this.display_stream.getTracks();
                                    this.combo_stream = this.display_stream;
                                    this.is_muted = true;
                                    this.mute_button.removeClass("gigatester-video-controls-active").attr("disabled", true);
                                    afterGetVideoStream()
                                }.bind(this)).catch(this.handleStreamCaptureError.bind(this))
                            }
                        }.bind(this);
                        console.log(this.device_list.audioinput.length);
                        if (this.device_list.audioinput.length >= 0) {
                            navigator.mediaDevices.getUserMedia(userMediaOptions).then(function(stream) {
                                this.audio_stream = stream;
                                afterGetAudioStream();
                            }.bind(this)).catch(function() {
                                afterGetAudioStream()
                            }.bind(this))
                        } else {
                            afterGetAudioStream()
                        }
                    } catch (e) {
                        this.handleStreamCaptureError(e)
                    }
                },
                stopGTcapture: function() {
                    if (this.recorder) {
                        this.submitRecording()
                    } else {
                        this.recordingStop();
                        this.removeGTControls();
                        this.reset();
                        if (this.options.onCancel) {
                            this.options.onCancel()
                        }
                    }
                },
                cancelGTcapture: function() {
                    this.recordingStop();
                    this.removeGTControls();
                    this.reset();
                    if (this.options.onCancel) {
                        this.options.onCancel()
                    }
                },
                handleStreamCaptureError: function(e) {
                    if (typeof e.name !== "undefined" && e.name === "NotAllowedError") {
                        this.stopGTcapture()
                    } else {
                        GigaTester_modal.setNotifyStatus("Screen Recorder Error");
                        setTimeout(()=> {GigaTester_modal.clearNotifyStatus()},3000);
                    }
                },
                getTimerStr: function() {
                    let min = Math.floor(this.timer / 60);
                    let sec = this.timer - min * 60;
                    if (min < 10) {
                        min = "0" + min
                    }
                    if (sec < 10) {
                        sec = "0" + sec
                    }
                    return min + ":" + sec
                },
                startTimer: function() {
                    this.stop_button.find("btn-timer, btn-timer-mask").css("animation-play-state", "running");
                    this.timer_timeout = setInterval(function() {
                        let timer_text = this.getTimerStr();
                        this.timer_button.text(timer_text);
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
                countDownStop: function() {
                    clearTimeout(this.count_down_timeout)
                },
                startRecording: function() {
                    try {
                        this.recorder = new MediaRecorder(this.combo_stream, {
                            mimeType: this.mime_type
                        })
                    } catch (e) {
                        return
                    }
                    this.audioToggle();
                    this.recorder.addEventListener("dataavailable", this.dataHandler.bind(this));
                    this.recorder.start(10);
                    this.pause_button.removeAttr("disabled");
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
                recordingStop: function() {
                    if (this.recorder) {
                        this.recorder.stop()
                    }
                    if (this.combo_stream) {
                        this.combo_stream.getTracks().forEach(function(track) {
                            track.stop()
                        })
                    }
                    else if(this.audio_stream){
                        this.audio_stream.getTracks().forEach(function(track) {
                            track.stop()
                        })
                    }
                    console.log('stop recording')
                    this.stopTimer();
                    this.countDownStop()
                },
                recordingPause: function() {
                    if (this.pause_button.attr("disabled")) {
                        return
                    }
                    if (!this.recorder) {
                        return
                    }
                    switch (this.recorder.state) {
                        case "recording":
                            this.pause_button.html("<btn-tooltip><btn-name>" + GigaTester_StringRes.get("recording_resume", true) + "</btn-name></btn-tooltip><btn-tooltip-arrow></btn-tooltip-arrow>" + GigaTester_Icons.play_icon);
                            this.recorder.pause();
                            this.stop_button.find("btn-timer, btn-timer-mask").css("animation-play-state", "paused");
                            this.stopTimer();
                            break;
                        case "paused":
                            this.pause_button.html("<btn-tooltip><btn-name>" + GigaTester_StringRes.get("recording_pause", true) + "</btn-name></btn-tooltip><btn-tooltip-arrow></btn-tooltip-arrow>" + GigaTester_Icons.pause_icon);
                            this.recorder.resume();
                            this.stop_button.find("btn-timer, btn-timer-mask").css("animation-play-state", "running");
                            this.startTimer();
                            break
                    }
                },
                submitRecording: function() {
                    this.recordingStop();
                    if (this.options.onSubmit) {
                        let video_blob = new Blob(this.recorded_blobs, {
                            type: "video/webm"
                        });
                        this.options.onSubmit(video_blob)
                    }
                    this.removeGTControls();
                    this.reset()
                },
                dataHandler: function(e) {
                    if (e.data && e.data.size > 0) {
                        this.recorded_blobs.push(e.data)
                    }
                }
            };

            //the main object that stores all the data and controls all the flow.
            let GigaTester_modal = {
                canvas_mode: false,
//                canvas_target: false,
                controls_step: 0,
                form_type: "FEEDBACK",
                timer: 180,
                user_detail: {},
                set_screen_default_category: true,
                configs: {
                    has_video: true,
                    categories:  ['Video', 'Screen', 'Audio', 'Images', 'Other'],
                    severities: ['Critical', 'High', 'Medium', 'Low'],
                    locale: 'en',
                    display_powered_by: true,
                    config_data: [],
                    selected_category: [],
                    rating_limit: 2,
                    title: "GigaTester",
                    screen_record_time: 120,
                    main_button_text: "FEEDBACK",
                    main_button_text_color: "#FFFFFF",
                    main_button_background_color: "#042e5b",
                    audio_time: 10,
                    feedback_default_category: "",
                    bugs_default_category:"",
                    max_file_size: 20,
                },
                form_settings_default: {
                    BUGS: {
                        allow_screenshot: true,
                        allow_audio: true,
                        allow_video: true,
                        allow_attachment: true,
                        rating_type: "",
                        rating_title_message: "",
                        bug_title_message: "",
                        rating_mandatory: false,
                        name_field: false,
                        name_field_mandatory: false,
                        email_field: true,
                        email_field_mandatory: false,
                        title_field: false,
                        title_field_mandatory: false,
                        title_field_placeholder: "",
                        comment_field: true,
                        comment_field_mandatory: true,
                        comment_field_placeholder: "",
                        display_category: true,
                        display_severity: true,
                        category_field_mandatory: true,
                        severity_field_mandatory: true,
                        completed_dialog_icon: 0,
                        completed_dialog_headline: "Thank you!",
                        completed_dialog_paragraph: "We appreciate your feedback."
                    },
                    FEEDBACK: {
                        allow_screenshot: true,
                        allow_audio: true,
                        allow_video: true,
                        allow_attachment: true,
                        rating_type: "STAR",
                        rating_title_message: "Provide your rating",
                        rating_mandatory: true,
//                        send_button_text: "",
                        name_field: false,
                        name_field_mandatory: false,
                        email_field: true,
                        email_field_mandatory: false,
                        title_field: false,
                        title_field_mandatory: false,
                        title_field_placeholder: "",
                        comment_field: true,
                        comment_field_mandatory: true,
                        comment_field_placeholder: "",
                        display_category: true,
                        display_severity: false,
                        category_field_mandatory: true,
                        severity_field_mandatory: false,
                        completed_dialog_icon: 0,
                        completed_dialog_headline: "Thank you!",
                        completed_dialog_paragraph: "We appreciate your feedback."
                    }
                },
                custom_ui: {
                    element: null,
                    button: null,
                    overlay: null,
                    events: null,
                    feedback_view: null
                },
                overlay_hint_tooltip_added: false,
                categories: "",
                video_blob: null,
                recording: false,
                form_data: {
                    rating: 0,
                    name: "",
                    email: "",
                    title: "",
                    description: "",
                    category: "",
                    severity: "",
                    audio_file: "",
                    video_file: "",
                    image_file:"",
                    external_file:"",
                },
                comments: [],
                init: function() {
                    this.configs.form_settings = this.form_settings_default;
                    this.loadApi()
                },
                loadApi: function() {
                    console.log('GigaTester: load configs')
                    window.GigaTester.isLoaded();
                    this.checkSessionStorage();
                },
                addFeedbackButton: function() {
                    if (this.custom_ui.button) {
                        return
                    }
                    const root = $(document.getElementById('root'));
                    if(root){
                    root.attr({"data-html2canvas-ignore": "true"})
                    }
                    this.custom_ui.element = $("<gtdiv>").addClass("gigatester-ctrls-container").attr({
                        id: "gigatester_ctrls_container",
                        // "data-html2canvas-ignore": "true"
                    }).appendTo($(document.body));
                    this.configs.position = 'r';
                    this.custom_ui.button = $("<gtdiv>").addClass("gigatester-btn gigatester-btn-" + this.configs.position);
                    this.custom_ui.button.text(this.configs.main_button_text)
                    this.custom_ui.button.appendTo(this.custom_ui.element);
                    this.custom_ui.button.on("click", this.popOutDialog.bind(this));
                    this.custom_ui.button.on("click mouseup mousedown", function(e) {
                        // console.log(e,'mouse event')
                        e.stopPropagation()
                    });
                    this.custom_ui.element.on("keydown keyup", (e) => {
                        e.stopPropagation()
                    });
                },
                setNotifyStatus: function(message) {
                    if (!this.custom_ui.screen_status) {
                        this.custom_ui.screen_status = $("<gtdiv>").addClass("gigatester-screen-status").attr("data-html2canvas-ignore", "true");
                        this.custom_ui.screen_status.appendTo($(document.body));
                    }
                    this.custom_ui.screen_status.text(message);
                },
                clearNotifyStatus: function() {
                    if (this.custom_ui.screen_status) {
                        this.custom_ui.screen_status.remove();
                        this.custom_ui.screen_status = false
                    }
                },
                autoHide: function() {
                    if (this.canvas_mode) {
                        return true
                    }
                    return false
                },
                getFormSettings: function(form_type) {
                    return this.form_settings_default[form_type]
                },
                checkSessionStorage: function(){
                    if(sessionStorage){
                    for(let i=0; i<sessionStorage.length;i++){
                        const key = sessionStorage.key(i);
                        console.log(` GigaTester: ${key} => ${sessionStorage.getItem(key)}`)
                        if(key === 'gigatesterDefaultFeedbackCategory'){
                            GigaTester_modal.configs.feedback_default_category = sessionStorage.getItem(key).trim()
                        }
                        if(key === 'gigatesterDefaultBugsCategory'){
                            GigaTester_modal.configs.bugs_default_category = sessionStorage.getItem(key).trim()
                        }
                        if(key === 'gigatesterDefaultUserDetails'){
                            let userDetails = JSON.parse(sessionStorage.getItem(key))
                            Object.entries(userDetails).forEach(([key, val]) => {
                                if(key.trim().toLowerCase() == "email"){
                                    GigaTester.setEmail(val)
                                }
                                console.log('GigaTester : userDetails ', key, val);
                              });
                        }
                    }
                }
                },
                addCanvas: function() {
                    if (this.custom_ui.overlay) {
                        return
                    }
                    this.custom_ui.element.attr("drawing", "true");
                    this.hideControls();
                    let dpr = typeof window.devicePixelRatio === "undefined" ? 1 : window.devicePixelRatio;
                    this.custom_ui.overlay = $("<gtdiv>").addClass("gigatester-overlay")
                    // .html('<gtdiv class="gigatester-overlay-boundary-top"></gtdiv>' + '<gtdiv class="gigatester-overlay-boundary-bottom"></gtdiv>' + '<gtdiv class="gigatester-overlay-boundary-left"></gtdiv>' + '<gtdiv class="gigatester-overlay-boundary-right"></gtdiv>').attr("dpr", dpr.toFixed(2)).attr("GigaTester_StringRes", GigaTester_modal.configs.locale).attr("tooltype", this.Draw_Tools.type);
                    // .attr("data-html2canvas-ignore", "true");
//                    if (this.canvas_mode) {
//                        this.custom_ui.overlay.attr("canvas", "true")
//                    }
                    this.custom_ui.overlay.appendTo($(document.getElementById('gigatester_screencapture_area')));
//                    this.setGToverlaySize();
                    this.custom_ui.overlay.append('<svg id="snap_svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"></svg>');
                    this.Draw_Tools.init();
                    this.custom_ui.overlay.on("click mouseup mousedown mouseout mousemove mouseenter mouseleave touchstart touchmove touchcancel touchend", $.proxy(function(e) {
                        if (this.Draw_Tools.dragging_obj || this.Draw_Tools.draw_started) {
                            return
                        }
                        e.stopPropagation()
                    }, this));
                    this.overlay_hint_tooltip_added = false;
                    let setTooltipPos = function(e) {
                        if (!this.custom_ui.overlay_hint_tooltip) {
                            return
                        }
                        if (this.canvas_mode) {
                            this.custom_ui.overlay_hint_tooltip.css({
                                top: e.offsetY,
                                left: e.offsetX - 10
                            })
                        } else {
                            this.custom_ui.overlay_hint_tooltip.css({
                                top: e.clientY,
                                left: e.clientX - 10
                            })
                        }
                    }.bind(this);
                    this.custom_ui.overlay.on("mouseenter", function(e) {
                        if (!this.custom_ui.overlay_hint_tooltip && !this.overlay_hint_tooltip_added) {
                            console.log('GigaTester: overlay hint');
                            this.custom_ui.overlay_hint_tooltip = $("<div>").addClass("gigatester-overlay-hint-cursor").text(GigaTester_StringRes.get("draw_hint"));
                            setTooltipPos(e);
                            this.custom_ui.overlay_hint_tooltip.appendTo(this.custom_ui.overlay)
                        }
                    }.bind(this));
                    this.custom_ui.overlay.on("mousemove", function(e) {
                        setTooltipPos(e)
                    }.bind(this));
                    this.custom_ui.overlay.on("mouseleave", function() {
                        if (this.custom_ui.overlay_hint_tooltip) {
                            this.custom_ui.overlay_hint_tooltip.remove()
                        }
                        this.custom_ui.overlay_hint_tooltip = false
                    }.bind(this));
                    $(window).on("resize", $.proxy(this.resizeWindow, this))
                },
                setGToverlaySize: function() {
                    if (!this.canvas_mode) {
                        return
                    }
                    if (!this.custom_ui.overlay) {
                        return
                    }
                    let captureArea = $("gtdiv#gigatester_screencapture_area");
                    this.custom_ui.overlay.css({
                        top: captureArea.offset().top,
                        left: captureArea.offset().left,
                        // width: canvas_target.width(),
                        // height: canvas_target.height()
                    })
                },
                removeGToverlay: function() {
                    if (!this.custom_ui.overlay) {
                        return
                    }
                    $(document.getElementById('gigatester_screencapture_area')).remove()
                    this.custom_ui.element.removeAttr("drawing");
                    if (this.custom_ui.overlay.overlay_hint_tooltip) {
                        this.custom_ui.overlay.overlay_hint_tooltip.remove();
                        this.custom_ui.overlay.overlay_hint_tooltip = null
                    }
                    this.custom_ui.overlay.remove();
                    this.custom_ui.overlay = null;
                    this.canvas_mode = false;
                    $(document.getElementById('gigatester_screencapture_dialog')).remove()
                    $(window).off("resize", $.proxy(this.resizeWindow, this))
                },
                Draw_Tools: {
                    start_x: 0,
                    start_y: 0,
                    stop_x: 0,
                    stop_y: 0,
                    path_min_x: 0,
                    path_min_y: 0,
                    path_max_x: 0,
                    path_max_y: 0,
                    svg_delete_icons: [],
                    annotation_count: 0,
                    svg_user_draw: [],
                    type: "square",
                    color: {
                        options: ["#cc0000", "#ff7700", "#ffdd00", "#66ee00", "#00aa00",
                         "#00dddd", "#0077ff", "#0000aa", "#ff00dd", "#777777", "#000000"],
                        value:  "#ff7700"
                    },
                    svg_obj_initial: false,
                    svg_obj_arrow_group: false,
                    svg_obj_new_arrow: false,
                    svg_obj_new_arrow_top: false,
                    svg_obj_line: false,
                    svg_obj_rectangular: false,
                    svg_obj_path: false,
                    draw_started: false,
                    dragging_obj: false,
                    image_capture: false,
                    toolbar: null,
                    min_drag_distance: 10,
                    toolbar_is_hidden: false,
                    init: function() {
                        this.snap = Snap("#snap_svg");
                        this.svg_obj_initial = this.snap.path();
                        this.svg_obj_initial.attr({
                            "fill-opacity": GigaTester_modal.canvas_mode ? 0 : .01,
                            "fill-rule": "evenodd"
                        });
//                        $(this.svg_obj_initial).css("outline","5px solid black");
//                        $(this.svg_obj_initial).css("outline-offset", "-5px");
                        this.setBaseSize();
                        this.snap.drag(this.onDragMove.bind(this), this.isDragStart.bind(this), this.onDragStop.bind(this));
                        this.snap.touchstart(this.isDragStart.bind(this));
                        this.snap.touchmove(this.onDragMove.bind(this));
                        this.snap.touchcancel(this.onDragStop.bind(this));
                        this.snap.touchend(this.onDragStop.bind(this));
                        this.addTools()
                    },
                    setBaseSize: function() {
                        if (!this.svg_obj_initial) {
                            return
                        }
                        let base_width = $("#snap_svg").width();
                        let base_height = $("#snap_svg").height();
                        let path = "M0 0 h" + base_width + " v" + base_height + " h-" + base_width + " Z";
                        for (let i = 0; i < this.svg_user_draw.length; i++) {
                            path += " M" + this.svg_user_draw[i].x + " " + this.svg_user_draw[i].y + " h" + this.svg_user_draw[i].w + " v" + this.svg_user_draw[i].h + " h-" + this.svg_user_draw[i].w + " Z"
                        }
                        this.svg_obj_initial.attr("path", path)
                    },
                    addTools: function() {
                        if (GigaTester_modal.is_touch) {
                            GigaTester_modal.scrollDisable()
                        }
                        if (this.toolbar) {
                            return
                        }
                        let tool_color_indicator = "";
                        tool_color_indicator += '<gtdiv class="gigatester-toolbar-tool-color-indicator">';
                        tool_color_indicator += "<gtcolorpicker>";
                        $.each(this.color.options, function(index, color) {
                            tool_color_indicator += '<gtdiv class="gigatester-toolbar-tool-color-indicator-option" data-color="' + color + '">' + '<span style="background-color:' + color + ';"' + (color === "#FFFFFF" ? ' hasborder="1"' : "") + "></span>" + "</gtdiv>"
                        });
                        tool_color_indicator += "</gtcolorpicker>";
                        tool_color_indicator += "</gtdiv>";
                        let tools = '<btn class="gigatester-toolbar-tool gigatester-toolbar-tool-square" data-type="square"">' + GigaTester_Icons.square_outline_icon +"<btn-tooltip>" + "<btn-name>" + GigaTester_StringRes.get("rectangle") + "</btn-name>" + "</btn-tooltip>" + "</btn>"
                         + '<btn class="gigatester-toolbar-tool gigatester-toolbar-tool-blackout" data-type="blackout" ">' + GigaTester_Icons.square_filled_icon + "<btn-tooltip>" + "<btn-name>" + GigaTester_StringRes.get("blackout") + "</btn-name>" + "</btn-tooltip>" +"</btn>"
                         + '<btn class="gigatester-toolbar-tool gigatester-toolbar-tool-color" data-type="color">' + tool_color_indicator + "<btn-tooltip>" + "<btn-name>" + GigaTester_StringRes.get("color_palette") + "</btn-name>" + "</btn-tooltip>" + "</btn>"
                         + '<btn class="gigatester-toolbar-tool-done gigatester-toolbar-tool-done-active">' + GigaTester_StringRes.get("capture") + "<btn-tooltip>" + "<btn-name>" + GigaTester_StringRes.get("capture_screenshot") + "</btn-name>" + "</btn-tooltip>" + "</btn>"
                         + '<btn class="gigatester-toolbar-close">' +  GigaTester_Icons.cross_icon + "<btn-tooltip>" + "<btn-name>" + GigaTester_StringRes.get("discard_screenshot") + "</btn-name>" + "</btn-tooltip>" + "</btn>";
                        this.toolbar = $("<gttoolbar>").attr("lang", GigaTester_modal.configs.locale).attr("data-html2canvas-ignore", "true");
                        this.toolbar.html(tools);
                        this.setToolsColor();
//                        this.toolbar.appendTo($(document.getElementsByClassName('gigatester-overlay')));
                        this.toolbar.insertBefore($('gtdiv#gigatester_screencapture_area'));
                        this.toolbar.on("mouseenter", $.proxy(function() {
                            if (this.draw_started || this.dragging_obj) {
                                this.toolbar.css("opacity", "0.2")
                            }
                        }, this));
                        this.toolbar.on("mouseleave", $.proxy(function() {
                            this.toolbar.css("opacity", "")
                        }, this));
                        this.toolbar.find('.gigatester-toolbar-tool[data-type="' + this.type + '"]').addClass("gigatester-toolbar-tool-active");
                        this.toolbar.find(".gigatester-toolbar-tool").on("click", $.proxy(function(e) {
                            let tool_type = $(e.currentTarget).data("type");
                            if (tool_type === "color") {
                                return
                            }
                            this.type = tool_type;
                            this.toolbar.find(".gigatester-toolbar-tool").removeClass("gigatester-toolbar-tool-active");
                            $(e.currentTarget).addClass("gigatester-toolbar-tool-active");
                            GigaTester_modal.custom_ui.overlay.attr("tooltype", this.type)
                        }, this));
                        this.toolbar.find(".gigatester-toolbar-tool-done").on("click", function(e) {
                            e.stopPropagation();
                            e.preventDefault();
                            GigaTester_modal.hideCommentForm();
                            GigaTester_modal.finalScreenshot();
                        }.bind(this));
                        this.toolbar.find(".gigatester-toolbar-close").on("click", function(e) {
                            e.stopPropagation();
                            e.preventDefault();
                            this.cancelGTcapture();
                            GigaTester_modal.removeComments();
                            GigaTester_modal.Draw_Tools.image_capture = false;
                        }.bind(this));
                        this.toolbar.find(".gigatester-toolbar-tool-color-indicator-option").on("click", $.proxy(function(e) {
                            let color = $(e.currentTarget).data("color");
                            let tool_type = $(e.currentTarget).parents(".gigatester-toolbar-tool:first").data("type");
                            this.color.value = color;
                            this.setToolsColor()
                        }, this));
                        this.toolbar.on("click", function(e) {
                            e.stopPropagation()
                        })
                    },
                    cancelGTcapture: function() {
                            GigaTester_modal.form_data.rating = GigaTester_modal.form_data.rating;
                            GigaTester_modal.form_data.comment_field =  GigaTester_modal.form_data.comment_field;
                            GigaTester_modal.form_data.category = GigaTester_modal.form_data.category;
                            GigaTester_modal.set_screen_default_category = false;
                            GigaTester_modal.saveCheckedCategory();
                            GigaTester_modal.setDialogForm();
                            console.log('GigaTester : cancel annotation')
                            GigaTester_modal.showControls();
                            if(GigaTester_modal.form_data.rating){
                                GigaTester_modal.selectedRating();
                            }

                            GigaTester_modal.saveSubCategory();
                            GigaTester_modal.removeGToverlay();
                            this.removeTools()
                        // if (GigaTester_modal.on_toolbar_close) {
                        //     GigaTester_modal.on_toolbar_close()
                        // }
                    },
                    removeTools: function() {
                        GigaTester_modal.scrollEnable();
                        if (!this.toolbar) {
                            return
                        }
                        this.toolbar.remove();
                        this.toolbar = null;
                        this.svg_obj_initial = null;
                        this.svg_user_draw = []
                    },
                    removeTrashIcons: function() {
                        $(this.svg_delete_icons).each(function() {
                            this.remove()
                        });
                        this.svg_delete_icons = []
                    },
                    setToolsColor: function() {
                        this.toolbar.find(".gigatester-toolbar-tool-color-indicator").css("background-color", this.color.value);
                        if (this.color.value === "#FFFFFF") {
                            this.toolbar.find(".gigatester-toolbar-tool-color-indicator").attr("hasborder", 1)
                        } else {
                            this.toolbar.find(".gigatester-toolbar-tool-color-indicator").removeAttr("hasborder")
                        }
                    },
                    isDragStart: function() {
                        let x, y, event;
                        if (typeof arguments[0] === "object") {
                            event = arguments[0]
                        } else {
                            event = arguments[2]
                        }
                            x = event.clientX -10;
                            y = event.clientY -10;
                        if (GigaTester_modal.canvas_mode) {
                            x = event.offsetX;
                            y = event.offsetY
                        }
                        x = parseInt(x, 10);
                        y = parseInt(y, 10);
                        if (this.dragging_obj) {
                            if (this.dragging_obj.data("drag_started")) {
                                return
                            }
                            this.dragging_obj.appendTo(self.snap);
                            this.dragging_obj.data("drag_started", true);
                            this.dragging_obj.data("original_x", x);
                            this.dragging_obj.data("original_y", y);
                            if (!this.dragging_obj.data("transform_x")) {
                                this.dragging_obj.data("transform_x", 0);
                                this.dragging_obj.data("transform_y", 0)
                            }
                            if (this.dragging_obj.data("type") === "square") {
                                let cut_out_x = this.dragging_obj[0].attr("x");
                                let cut_out_y = this.dragging_obj[0].attr("y");
                                let user_draw_count = false;
                                for (let i = 0; i < this.svg_user_draw.length; i++) {
                                    if (this.svg_user_draw[i].x == cut_out_x && this.svg_user_draw[i].y == cut_out_y) {
                                        user_draw_count = i;
                                        break
                                    }
                                }
                                if (user_draw_count !== false) {
                                    this.dragging_obj.data("user_draw_count", user_draw_count);
                                    this.dragging_obj.data("cut_out_original_x", this.svg_user_draw[user_draw_count].x);
                                    this.dragging_obj.data("cut_out_original_y", this.svg_user_draw[user_draw_count].y)
                                }
                            }
                        } else {
                            if (this.draw_started) {
                                console.log(this.image_capture, 'img capture')
                                return
                            }
                            this.draw_started = true;
                            let cut_out_id = (new Date).getTime();
                            switch (this.type) {
                                case "square":
                                    this.svg_obj_rectangular = this.snap.rect(x, y, 1, 1, 3, 3);
                                    this.svg_obj_rectangular.attr({
                                        stroke: this.color.value,
                                        "stroke-width": 3,
                                        "stroke-linecap": "square",
                                        "stroke-linejoin": "square",
                                        fill: "transparent",
                                        opacity: .6
                                    });
                                    this.svg_user_draw.push({
                                        id: cut_out_id,
                                        x: x,
                                        y: y,
                                        w: 0,
                                        h: 0
                                    });
                                    break;
                                case "blackout":
                                    this.svg_obj_rectangular = this.snap.rect(x, y, 1, 1, 3, 3);
                                    this.svg_obj_rectangular.attr({
                                        fill: this.color.value,
                                        class: "blackout",
                                        opacity: .5
                                    });
                                    break;
                            }
                        }
                        this.start_x = x;
                        this.start_y = y;
                        this.stop_x = x;
                        this.stop_y = y;
                        this.path_min_x = x;
                        this.path_min_y = y;
                        this.path_max_x = x;
                        this.path_max_y = y;
                        this.toolbar_left = this.toolbar.offset().left - 30;
                        this.toolbar_right = this.toolbar_left + this.toolbar.outerWidth() + 60;
                        this.toolbar_top = this.toolbar.position().top - 30;
                        this.toolbar_bottom = this.toolbar_top + this.toolbar.outerHeight() + 60
                    },
                    onDragStop: function(event) {
                        let x, y;
                            x = event.clientX;
                            y = event.clientY
                        if (GigaTester_modal.canvas_mode) {
                            x = event.pageX - GigaTester_modal.custom_ui.overlay.offset().left;
                            y = event.pageY - GigaTester_modal.custom_ui.overlay.offset().top
                        }
                        if (this.dragging_obj) {
                            if (!this.dragging_obj.data("drag_started")) {
                                return
                            }
                            this.dragging_obj.data("drag_started", false);
                            // this.dragging_obj.data("transform_x", this.dragging_obj.data("transform_x_temp"));
                            // this.dragging_obj.data("transform_y", this.dragging_obj.data("transform_y_temp"));
                            let movement_x = Math.abs(this.start_x - x);
                            let movement_y = Math.abs(this.start_y - y);
                            if (!$(event.target).hasClass("gigatester-svg-delete") && movement_x <= 2 && movement_y <= 2) {
                                GigaTester_modal.canvasCommentStart.call(GigaTester_modal, event)
                            }
                            this.dragging_obj = false;
                            this.start_x = 0;
                            this.start_y = 0;
                            this.stop_x = 0;
                            this.stop_y = 0;
                            this.path_min_x = 0;
                            this.path_min_y = 0;
                            this.path_max_x = 0;
                            this.path_max_y = 0
                        } else {
                            if (!this.draw_started) {
                                return
                            }
                            this.toolbar.removeClass("gigatester-toolbar-slide-out");
                            if (this.type === "text" || Math.abs(this.path_max_x - this.path_min_x) < this.min_drag_distance && Math.abs(this.path_max_y - this.path_min_y) < this.min_drag_distance) {
                                switch (this.type) {
                                    case "square":
                                    case "blackout":
                                        this.svg_obj_rectangular.remove();
                                        break;
                                }
                                if (this.svg_user_draw.length) {
                                    let last_cut_out = this.svg_user_draw[this.svg_user_draw.length - 1];
                                    if (last_cut_out.w < this.min_drag_distance && last_cut_out.h < this.min_drag_distance) {
                                        this.svg_user_draw.splice(this.svg_user_draw.length - 1, 1)
                                    }
                                }
                                this.setBaseSize();
                                GigaTester_modal.canvasCommentStart.call(GigaTester_modal, event);
                                GigaTester_modal.custom_ui.overlay.trigger("mouseleave")
                            } else {
                                let icon_x = x - 12;
                                let icon_y = y - 12;
                                if (this.type === "square" || this.type === "blackout") {
                                    icon_x = parseInt(this.svg_obj_rectangular.attr("x"), 10) + parseInt(this.svg_obj_rectangular.attr("width"), 10) - 12;
                                    icon_y = parseInt(this.svg_obj_rectangular.attr("y"), 10) - 12
                                }
                                let icon = this.snap.image(GigaTester_Icons.delete_image, icon_x, icon_y, 24, 24).attr({
                                    cursor: "pointer",
                                }).addClass("gigatester-svg-delete");
                                this.svg_delete_icons.push(icon);
                                GigaTester_modal.canvasCommentStart.call(GigaTester_modal, event);
                                switch (this.type) {
                                    case "square":
                                        this.svg_obj_rectangular.attr({
                                            opacity: 1
                                        });
                                        this.svg_obj_rectangular = this.snap.group(this.svg_obj_rectangular, icon);
                                        this.isHoverable(this.svg_obj_rectangular, icon, this.type, this.svg_user_draw[this.svg_user_draw.length - 1].id);
                                        this.isDraggable(this.svg_obj_rectangular, this.type);
                                        break;
                                    case "blackout":
                                        this.svg_obj_rectangular.attr({
                                            opacity: 1
                                        });
                                        this.svg_obj_rectangular = this.snap.group(this.svg_obj_rectangular, icon);
                                        this.isHoverable(this.svg_obj_rectangular, icon, this.type);
                                        this.isDraggable(this.svg_obj_rectangular, this.type);
                                        break;
                                }
                            }
                            this.draw_started = false;
                            this.start_x = 0;
                            this.start_y = 0;
                            this.stop_x = 0;
                            this.stop_y = 0;
                            this.svg_obj_arrow_group = false;
                            this.svg_obj_new_arrow_top = false;
                            this.svg_obj_new_arrow = false;
                            this.svg_obj_line = false;
                            this.svg_obj_rectangular = false;
                            this.svg_obj_path = false;
                            this.toolbar.find(".gigatester-toolbar-tool-done").addClass("gigatester-toolbar-tool-done-active")
                        }
                        GigaTester_modal.overlay_hint_tooltip_added = true;
                        if (GigaTester_modal.custom_ui.overlay_hint_tooltip) {
                            GigaTester_modal.custom_ui.overlay_hint_tooltip.remove();
                            GigaTester_modal.custom_ui.overlay_hint_tooltip = false
                        }
                        console.log('GigaTester: drag stopped')
                        $(document.getElementsByClassName('.gigatester-btn-save')).trigger('click')
                        GigaTester_modal.scrollDisable()
                    },
                    onDragMove: function() {
                        let x, y, event;
                        if (typeof arguments[0] === "object") {
                            event = arguments[0]
                        } else {
                            event = arguments[4]
                        }
                            x = event.clientX;
                            y = event.clientY
                        if (GigaTester_modal.canvas_mode) {
                            x = event.pageX - GigaTester_modal.custom_ui.overlay.offset().left;
                            y = event.pageY - GigaTester_modal.custom_ui.overlay.offset().top
                        }
                        if (this.dragging_obj) {
                            if (!this.dragging_obj.data("drag_started")) {
                                return
                            }
                            let hovered = new Snap.Matrix;
                            let mouse_movement_x = x - this.dragging_obj.data("original_x");
                            let mouse_movement_y = y - this.dragging_obj.data("original_y");
                            let transform_x = mouse_movement_x + this.dragging_obj.data("transform_x");
                            let transform_y = mouse_movement_y + this.dragging_obj.data("transform_y");
                            this.dragging_obj.data("transform_x_temp", transform_x);
                            this.dragging_obj.data("transform_y_temp", transform_y);
                            hovered.translate(transform_x, transform_y);
                            this.dragging_obj.transform(hovered);
                            if (this.dragging_obj.data("type") === "square") {
                                let user_draw_count = this.dragging_obj.data("user_draw_count");
                                this.svg_user_draw[user_draw_count].x = this.dragging_obj.data("cut_out_original_x") + transform_x;
                                this.svg_user_draw[user_draw_count].y = this.dragging_obj.data("cut_out_original_y") + transform_y;
                                this.setBaseSize()
                            }
                        } else {
                            if (!this.draw_started) {
                                return
                            }
                            let direction_x = x - this.start_x > 0 ? "right" : "left";
                            let direction_y = y - this.start_y > 0 ? "down" : "up";
                            this.stop_x = x;
                            this.stop_y = y;
                            this.stop_x = Math.max(6, this.stop_x);
                            this.stop_y = Math.max(6, this.stop_y);
                            this.stop_x = Math.min(this.snap.node.clientWidth - 6, this.stop_x);
                            this.stop_y = Math.min(this.snap.node.clientHeight - 6, this.stop_y);
                            this.path_min_x = Math.min(this.path_min_x, x);
                            this.path_min_y = Math.min(this.path_min_y, y);
                            this.path_max_x = Math.max(this.path_max_x, x);
                            this.path_max_y = Math.max(this.path_max_y, y);
                            switch (this.type) {
                                case "square":
                                    let square_x = direction_x === "right" ? this.start_x : this.stop_x;
                                    let square_y = direction_y === "down" ? this.start_y : this.stop_y;
                                    let square_w = Math.abs(this.stop_x - this.start_x);
                                    let square_h = Math.abs(this.stop_y - this.start_y);
                                    this.svg_obj_rectangular.attr({
                                        x: square_x,
                                        y: square_y,
                                        width: square_w,
                                        height: square_h
                                    });
                                    this.svg_user_draw[this.svg_user_draw.length - 1].x = square_x;
                                    this.svg_user_draw[this.svg_user_draw.length - 1].y = square_y;
                                    this.svg_user_draw[this.svg_user_draw.length - 1].w = square_w;
                                    this.svg_user_draw[this.svg_user_draw.length - 1].h = square_h;
                                    this.setBaseSize();
                                    break;
                                case "blackout":
                                    this.svg_obj_rectangular.attr({
                                        x: direction_x === "right" ? this.start_x : this.stop_x,
                                        y: direction_y === "down" ? this.start_y : this.stop_y,
                                        width: Math.abs(this.stop_x - this.start_x),
                                        height: Math.abs(this.stop_y - this.start_y)
                                    });
                                    break;
                            }
                            if (Math.abs(this.stop_x - this.start_x) > this.min_drag_distance || Math.abs(this.stop_y - this.start_y) > this.min_drag_distance) {
                                if (this.stop_x > this.toolbar_left && this.stop_x < this.toolbar_right && this.stop_y > this.toolbar_top && this.stop_y < this.toolbar_bottom) {
                                    this.toolbar.addClass("gigatester-toolbar-slide-out");
                                    this.toolbar_is_hidden = true
                                } else if (this.toolbar_is_hidden) {
                                    this.toolbar.removeClass("gigatester-toolbar-slide-out");
                                    this.toolbar_is_hidden = false
                                }
                            }
                        }
                    },
                    isHoverable: function(obj, delete_icon, type, cut_out_id) {
                        let timeout_id = false;
                        let self = this;
                        this.annotation_count++;
                        let _doRemove = function() {
                            obj.remove();
                            if (type === "square") {
                                let user_draw_count = false;
                                for (let i = 0; i < self.svg_user_draw.length; i++) {
                                    if (self.svg_user_draw[i].id === cut_out_id) {
                                        user_draw_count = i;
                                        break
                                    }
                                }
                                if (user_draw_count !== false) {
                                    self.svg_user_draw.splice(user_draw_count, 1);
                                    self.setBaseSize()
                                }
                            }
                        };
                        delete_icon.click(function(e) {
                            _doRemove();
                            this.annotation_count--;
                            if (this.annotation_count === 0) {
                                GigaTester_modal.scrollEnable()
                            }
                        }.bind(this));
                        obj.mouseover(function() {
                            GigaTester_modal.custom_ui.overlay.attr("hidecursor", "true");
                            if (self.draw_started) {
                                return
                            }
                            clearTimeout(timeout_id);
                            delete_icon.attr("display", "");
                        });
                        obj.mouseout(function() {
                            GigaTester_modal.custom_ui.overlay.removeAttr("hidecursor");
                            timeout_id = setTimeout(function() {
                                delete_icon.attr("display", "none");
                            }.bind(this), 200)
                        });
                    },
                    isDraggable: function(obj, type) {
                        let isDragStart = $.proxy(function(event, x, y) {
                            this.dragging_obj = obj;
                            this.dragging_obj.data("type", type)
                        }, this);
                        obj.attr({
                            cursor: "move"
                        });
                        obj.mousedown($.proxy(isDragStart, this));
                        obj.touchstart($.proxy(isDragStart, this))
                    }
                },
                resizeWindow: function(e) {
                    if (this.custom_ui.overlay) {
                        this.setGToverlaySize();
                        this.Draw_Tools.setBaseSize.call(this.Draw_Tools)
                    }
                },
                _mouseScroll: function(e) {
                    if ($(e.target).hasClass("gtmousescroll")) {} else {
                        e.preventDefault()
                    }
                },
                _scrollKeyDown: function(e) {
                    if ($(e.target).hasClass("gtmousescroll")) {
                        return
                    }
                    if ($(e.target).prop("tagName") === "TEXTAREA") {
                        return
                    }
                    let keys = {
                        37: 1,
                        38: 1,
                        39: 1,
                        40: 1
                    };
                    if (keys[e.keyCode]) {
                        e.preventDefault()
                    }
                },
                _scrollWindow: function(e) {
                    $(window).scrollTop(this._scroll_top)
                },
                scrollDisable: function() {
                    if (this.canvas_mode) {
                        return
                    }
                    if (this._scroll_disabled) {
                        return
                    }
                    this._scroll_top = $(window).scrollTop();
                    this._scroll_disabled = true;
                    $("html").addClass("gt-noscroll");
                    $(window).on("scroll", $.proxy(this._scrollWindow, this));
                    window.addEventListener("DOMMouseScroll", this._mouseScroll, {
                        passive: false
                    });
                    window.addEventListener("touchmove", this._mouseScroll, {
                        passive: false
                    });
                    window.addEventListener("wheel", this._mouseScroll, {
                        passive: false
                    });
                    window.addEventListener("mousewheel", this._mouseScroll, {
                        passive: false
                    });
                    $(document).on("keydown", this._scrollKeyDown)
                },
                scrollEnable: function() {
                    this._scroll_disabled = false;
                    $("html").removeClass("gt-noscroll");
                    $(window).off("scroll", $.proxy(this._scrollWindow, this));
                    window.removeEventListener("DOMMouseScroll", this._mouseScroll, {
                        passive: false
                    });
                    window.removeEventListener("touchmove", this._mouseScroll, {
                        passive: false
                    });
                    window.removeEventListener("wheel", this._mouseScroll, {
                        passive: false
                    });
                    window.removeEventListener("mousewheel", this._mouseScroll, {
                        passive: false
                    });
                    $(document).off("keydown", this._scrollKeyDown)
                },
                addCanvasComment: function(x, y) {
                    this.closeEmptyCanvasComment();
                    let screenshot_num = 0;
                    let counter = 0;
                    $.each(this.comments, function(index, comment) {
                        if (comment.screenshot_num === screenshot_num) {
                            counter++
                        }
                    });
                    let comment = new GigaTester_ScreenshotComment({
                        x: x,
                        y: y,
                        scroll_l: this.canvas_mode ? 0 : $(window).scrollLeft(),
                        scroll_t: this.canvas_mode ? 0 : $(window).scrollTop(),
                        offset_x: this.canvas_mode ? this.custom_ui.overlay.offset().left : 0,
                        offset_y: this.canvas_mode ? this.custom_ui.overlay.offset().top : 0,
                        is_mobile: this.is_mobile,
                        screenshot_num: screenshot_num,
                        counter: counter,
                        onOpen: $.proxy(function(counter) {
                            $.each(this.comments, function(comment) {
                                if (comment.screenshot_num === screenshot_num && comment.counter !== counter) {
                                    comment.hideForm()
                                    console.log('GigaTester: comment form open')
                                }
                            })
                        }, this),
                        onDelete: $.proxy(function(counter) {
                            let index_lookup = false;
                            $.each(this.comments, function(index, comment) {
                                if (comment.screenshot_num === screenshot_num && counter === comment.counter) {
                                    index_lookup = index
                                }
                            });
                            if (index_lookup !== false) {
                                this.comments.splice(index_lookup, 1)
                            }
                            let new_counter = 0;
                            $.each(this.comments, function(index, comment) {
                                if (comment.screenshot_num === screenshot_num) {
                                    comment.setCounter(new_counter);
                                    new_counter++
                                }
                            })
                        }, this)
                    });
                    comment.add();
                    this.comments.push(comment)
                },
                hideComments: function() {
                    $.each(this.comments, function(index, comment) {
                        comment.hide()
                    })
                },
                hideCommentForm: function() {
                    // console.log(GigaTester_modal.comments[])
                    $.each(this.comments, function(index, comment) {
                        comment.saveComment()
                    })
                    $.each(this.comments, function(index, comment) {
                        comment.hideForm()
                    })
                },
                removeComments: function() {
                    let screenshot_num = 0;
                    let new_comments = [];
                    $.each(this.comments, function(index, comment) {
                        if (comment.screenshot_num === screenshot_num) {
                            comment.destroy()
                        } else {
                            new_comments.push(comment)
                        }
                    });
                    this.comments = new_comments
                },
                removeFeedbckView: function() {
                    if (!this.custom_ui.feedback_view) {
                        return
                    }
                    this.custom_ui.feedback_view.remove();
                    this.custom_ui.feedback_view = null
                },
                addControls: function() {
                    if (this.custom_ui.events) {
                        return
                    }
                    this.custom_ui.events = $("<div>").addClass("gigatester-ctrl-item gigatester-ctrl-item-" + this.configs.position);
                    this.setRoutings();
                    this.custom_ui.events.appendTo(this.custom_ui.element);
                    this.custom_ui.events.on("click", ".gigatester-ctrl-item-close", this.closeDialog.bind(this));
                    this.custom_ui.events.on("click", ".gigatester-ctrl-item-add-attachment", this.selectAttachment.bind(this));
                    this.custom_ui.events.on("click", "gtrating > gtdiv", this.selectRating.bind(this));
                    this.custom_ui.events.on("mouseenter", "gtrating > gtdiv", this.ratingPreview.bind(this));
                    this.custom_ui.events.on("mouseleave", "gtrating > gtdiv", this.unRatingPreview.bind(this));
                    this.custom_ui.events.on("change", ".gigatester-ctrl-item-attachment", this.uploadAttachment.bind(this));
                    this.custom_ui.events.on("submit", ".gigatester-ctrl-item-options", this.validateFields.bind(this));
                    this.custom_ui.events.on("change", 'select[name="category"]', this.changeCategory.bind(this));
                    this.custom_ui.events.on("change", 'select[name="severity"]', this.changeSeverity.bind(this));
                    this.custom_ui.events.on("click", ".gigatester-ctrl-item-video", this.startScreenRecorder.bind(this));
                    this.custom_ui.events.on("click", ".gigatester-ctrl-item-audio", this.recordAudio.bind(this));
                    this.custom_ui.events.on("click", ".gigatester-ctrl-item-screenshot", this.recordImage.bind(this));
                    this.custom_ui.events.on("click", ".gigatester-checkbox-container > gtdiv", this.toggleCheckbox.bind(this));
                    this.custom_ui.events.on("keyup", 'textarea[name="description"]', this.storeFormData.bind(this));
                    this.custom_ui.events.on("keyup", 'input[name="name"]', this.storeFormData.bind(this));
                    this.custom_ui.events.on("keyup", 'input[name="email"]', this.storeFormData.bind(this));
                    this.custom_ui.events.on("keyup", 'input[name="title"]', this.storeFormData.bind(this));
                    this.custom_ui.events.on("change", 'select[name="category"]', this.storeFormData.bind(this));
                    this.custom_ui.events.on("change", 'select[name="severity"]', this.storeFormData.bind(this));
                    this.custom_ui.events.on("click mouseup mousedown", function(e) {
                        e.stopPropagation()
                    })
                },
                storeFormData: function(e) {
                    let field_name = $(e.currentTarget).attr("name");
                    if (field_name && typeof this.form_data[field_name] !== "undefined") {
                        this.form_data[field_name] = $(e.currentTarget).val()
                        // console.log( field_name,  $(e.currentTarget).val())
                        if(field_name === 'category'){
                        if($(document.getElementsByClassName('gigatester-reason-checkboxes'))){
                            $(document.getElementsByClassName('gigatester-reason-checkboxes')).remove();
                            $(document.getElementsByClassName('gigatester-reason-labels')).next().remove("br");
                            $(document.getElementsByClassName('gigatester-reason-labels')).remove();
                        }
                        console.log(GigaTester_modal.form_type, "form type");
                        if(GigaTester_modal.form_type === "BUGS"){
                            GigaTester_modal.configs.config_data[0].bugSettings.categories.map(items => {
                                if(items.name.trim() == $(e.currentTarget).val().trim()){
                                    items.feedbacks.forEach( function(value){
                                    let feedback_reason = ' <input id="'+ value +'" class="gigatester-reason-checkboxes" type="checkbox"> <label for="' + value +'" class="gigatester-reason-labels" id="gigatester-reason-label">' + value + '</label> <br>'
                                    $(feedback_reason).insertAfter($(document.getElementById('category')))
                                    })
                                }
                            })
                        }
                        else if(GigaTester_modal.form_type === "FEEDBACK"){
                            GigaTester_modal.configs.config_data[0].feedbackSettings.categories.map(items => {
                                if(items.name.trim() == $(e.currentTarget).val().trim()){
                                    items.feedbacks.forEach( function(value){
                                    let feedback_reason = ' <input id="'+ value +'" class="gigatester-reason-checkboxes" type="checkbox"> <label for="' + value + '"  class="gigatester-reason-labels" id="gigatester-reason-label">' + value + '</label> <br>'
                                    $(feedback_reason).insertAfter($(document.getElementById('category')))
                                    })
                                }
                            })
                        }

                    }
                    }
                },
                setCategory: function(){
                    if(GigaTester_modal.form_type === "BUGS"){
                        GigaTester_modal.configs.categories = [];
                        let category = GigaTester_modal.configs.config_data[0].bugSettings.categories;
                        category.map(item => {
                            console.log('GigaTester: ', item.name)
                        GigaTester_modal.configs.categories.push(item.name.trim())
                        })
                        console.log('GigaTester: Default Category ', GigaTester_modal.configs.bugs_default_category)
                        if(GigaTester_modal.configs.bugs_default_category){
                            GigaTester.setDefaultCategory(GigaTester_modal.configs.bugs_default_category.trim(), "BUGS")
                        }
                        else{
                            GigaTester_modal.form_data['category'] = 'category';
                        }
                    }
                    else if(GigaTester_modal.form_type === "FEEDBACK"){
                        GigaTester_modal.configs.categories = [];
                        let category = GigaTester_modal.configs.config_data[0].feedbackSettings.categories;
                        category.map(item => {
                        GigaTester_modal.configs.categories.push(item.name.trim())
                        })
                        if(GigaTester_modal.configs.feedback_default_category){
                            GigaTester.setDefaultCategory(GigaTester_modal.configs.feedback_default_category, "FEEDBACK")
                        }
                        else{
                            GigaTester_modal.form_data['category'] = 'category';
                        }
                    }
                    this.showSubCategory();
                },
                saveCheckedCategory: function(){
                    GigaTester_modal.configs.selected_category = [];
                    $('.gigatester-reason-checkboxes:checked').each(function () {
                        GigaTester_modal.configs.selected_category.push($(this).next("label").text());
                        console.log(GigaTester_modal.configs.selected_category, 'data push')
                    });
                },
                showSubCategory: function(){
                    if(GigaTester_modal.form_type === "BUGS"){
                        GigaTester_modal.configs.config_data[0].bugSettings.categories.map(items => {
                            console.log(items.name)
                            if($(document.getElementById('category')).val()){
                            if(items.name.trim() == $(document.getElementById('category')).val().trim()){
                            items.feedbacks.forEach( function(value){
                            let feedback_reason = ' <input id="' + value + '" class="gigatester-reason-checkboxes" type="checkbox"> <label class="gigatester-reason-labels" id="gigatester-reason-label">' + value + '</label> <br>'
                            $(feedback_reason).insertAfter($(document.getElementById('category')))
                            })
                        }
                        }
                    })
                    }
                    else if(GigaTester_modal.form_type === "FEEDBACK"){
                        GigaTester_modal.configs.config_data[0].feedbackSettings.categories.map(items => {
                         if($(document.getElementById('category')).val()){
                            if(items.name.trim() == $(document.getElementById('category')).val().trim()){
                            items.feedbacks.forEach( function(value){
                            let feedback_reason = ' <input id="' + value +'" class="gigatester-reason-checkboxes" type="checkbox"> <label class="gigatester-reason-labels" id="gigatester-reason-label">' + value + '</label> <br>'
                            $(feedback_reason).insertAfter($(document.getElementById('category')))
                            })
                        }
                        }
                    })
                    }
                },
                saveSubCategory: function() {
                        if($(document.getElementsByClassName('gigatester-reason-checkboxes'))){
                            $(document.getElementsByClassName('gigatester-reason-checkboxes')).remove();
                            $(document.getElementsByClassName('gigatester-reason-labels')).next().remove("br");
                            $(document.getElementsByClassName('gigatester-reason-labels')).remove();
                        }
                        if(GigaTester_modal.form_type === "BUGS"){
                            GigaTester_modal.configs.config_data[0].bugSettings.categories.map(items => {
                             if($(document.getElementById('category')).val()){
                                if(items.name.trim() == $(document.getElementById('category')).val().trim()){
                                items.feedbacks.forEach( function(value){
                                let feedback_reason = ' <input id="' + value + '" class="gigatester-reason-checkboxes" type="checkbox"> <label for="' + value + '"  class="gigatester-reason-labels" id="gigatester-reason-label">' + value + '</label> <br>'
                                $(feedback_reason).insertAfter($(document.getElementById('category')))
                                })
                            }
                            }
                        })
                        }
                        else if(GigaTester_modal.form_type === "FEEDBACK"){
                            GigaTester_modal.configs.config_data[0].feedbackSettings.categories.map(items => {
                                console.log(items.name, "inside save sub")
                                console.log((document.getElementById('category')))
                                console.log(this.custom_ui.events.find('.gigatester-ctrl-item-step').find('select[name="category"]').val(), 'selected')
                             if(this.custom_ui.events.find('.gigatester-ctrl-item-step').find('select[name="category"]').val()){
                                if(items.name.trim() == (this.custom_ui.events.find('.gigatester-ctrl-item-step').find('select[name="category"]').val()).trim()){
                                items.feedbacks.forEach( function(value){
                                console.log(value, 'value')
                                // console.log($(document.getElementById('category')).val(), 'selected')
                                let feedback_reason = ' <input id="' + value + '" class="gigatester-reason-checkboxes" type="checkbox"> <label for="' + value +  '" class="gigatester-reason-labels" id="gigatester-reason-label">' + value + '</label> <br>'
                                
                                $(feedback_reason).insertAfter($(document.getElementById('category')))
                                })
                            }
                            }
                        })
                        }
                    GigaTester_modal.configs.selected_category.map(function (value){
                                $('.gigatester-reason-checkboxes').each(function () {
                                if($(this).next("label").text() == value){
                                // console.log($(this).next("label").text(), 'label');
                                $(this).attr('checked', 'true')
                                // console.log(GigaTester_modal.configs.selected_category, 'data publish')
                                }
                            })
                        });
                    },

                removeGTControls: function() {
                    if (!this.custom_ui.events) {
                        return
                    }
                    this.custom_ui.events.remove();
                    this.custom_ui.events = null
                },
                setRoutings: function() {
                    let html = '<gtclose class="gigatester-ctrl-item-close" title="' + GigaTester_StringRes.get("close") + '">' + GigaTester_Icons.close_icon + "</gtclose>";
                    html += '<gtdiv class="gigatester-dialog-scroll">';
                    html += '<gtheader class="gigatester-ctrl-item-header" title="GigaTester">'+ GigaTester_StringUtils.escapeSpecialChars(this.configs.title) + '</gtheader>'
                    html += this.configs.logo ? '<img class="gigatester-ctrl-item-logo" src="' + GigaTester_StringUtils.escapeSpecialChars(this.configs.logo) + '">' : "";
                    html += '<gtdiv class="gigatester-ctrl-item-step" data-step="2"></gtdiv>';
                    html += "<gtfooter>" + "<span>Powered by</span>" + "<span class='gigatester-footer'>" + " GigaTester" + "</span>" + "</a>" + "</gtfooter>";
                    html += '</gtdiv>';
                    this.custom_ui.events.html(html);
                    this.setDialogForm();
                },
                setDialogForm: function() {
                    let form_settings = this.getFormSettings(this.form_type);
                    this.checkSessionStorage();
                    console.log(this.form_type, 'form type')
                    console.log('GigaTester : form settings ', form_settings);
                    console.log('GigaTester : dialog refresh mode', GigaTester_modal.set_screen_default_category)
                    if(GigaTester_modal.set_screen_default_category){
                        GigaTester_modal.setCategory();
                    }
                    let display_screenshot = form_settings.allow_screenshot;
                    let display_audio = form_settings.allow_audio;
                    let display_video = form_settings.allow_video && this.configs.has_video && !GigaTester_modal.is_mobile;
                    let display_attachment = form_settings.allow_attachment  && typeof FileReader !== "undefined";
                    let data_item = 0;
                    let details = navigator.userAgent;
                    let regexp = /android|iphone|kindle|ipad/i;
                    let isMobileDevice = regexp.test(details);
                    if (isMobileDevice) {
                        console.log("You are using a Mobile Device : " + navigator.userAgent);
                        display_screenshot = false;
                        display_video = false;
                    }
                    data_item += display_screenshot ? 1 : 0;
                    data_item += display_video ? 1 : 0;
                    data_item += display_audio ? 1 : 0;
                    data_item += display_attachment ? 1 : 0;
                    let default_name = this.form_data.name || GigaTester.name || GigaTester_modal.name
                    let default_email = this.form_data.email || GigaTester.email
                    let default_title = this.form_data.title || "";
                    let default_description = this.form_data.description || "";
                    let default_category = this.form_data.category || GigaTester.category || GigaTester_modal.categories || "";
                    let default_severity = this.form_data.severity || GigaTester.severity || GigaTester_modal.severity || "";
                    let default_rating = this.form_data.rating || 0;
                    let severity_options = '<option value="critical">Critical</option>' + '<option value="high">High</option>' + '<option value="medium">Medium</option>' + '<option value="low">Low</option>';
                    let category_options = "";
                    if (form_settings.display_category) {
                        this.configs.categories.forEach(function(category) {
                            category_options += "<option>" + category + "</option>"
                        }.bind(this))
                    }
                    if (form_settings.severity_options) {
                        this.configs.severities.forEach(function(reason) {
                            reason_options += "<option>" + reason + "</option>"
                        }.bind(this))
                    }

                    let html = "";
                    html += '<form class="gigatester-ctrl-item-options">'
                     + (form_settings.rating_title_message ? '<div class="gigatester-ctrl-item-help-message">' + GigaTester_StringUtils.escapeSpecialChars(form_settings.rating_title_message) + "</div>" : "")
                     + (form_settings.rating_type ? "<gtrating>" + '<gtdiv data-rating="star_1" class="inactive">' + GigaTester_Icons.star_icon + "</gtdiv>" + '<gtdiv data-rating="star_2" class="inactive">' + GigaTester_Icons.star_icon + "</gtdiv>" + '<gtdiv data-rating="star_3" class="inactive">' + GigaTester_Icons.star_icon + "</gtdiv>" + '<gtdiv data-rating="star_4" class="inactive">' + GigaTester_Icons.star_icon + "</gtdiv>" + '<gtdiv data-rating="star_5" class="inactive">' + GigaTester_Icons.star_icon + "</gtdiv>" + "</gtrating>"
                     + "<gtdiv class='gigatester-ctrl-item-loader-toggle'><gtloader id='gigatester-loader'></gtloader></gtdiv>" : "")
                     + '<gtdiv class="gigatester-ctrl-item-form"' + (form_settings.rating_type && form_settings.rating_mandatory ? ' style="display:none;"' : "") + ">"
                     + (form_settings.bug_title_message ? '<gtheader class="gigatester-bug-help-message"> ' + form_settings.bug_title_message + '</gtheader>' : "")
                     + '<gtdiv class="gigatester-ctrl-item-form-full"><gtdiv class="gigatester-ctrl-item-form-left">'
                     + (form_settings.name_field ? '<input type="text" name="name" placeholder="' + GigaTester_StringRes.get("your_name") + '"' + (form_settings.name_field_mandatory ? " required" : "") + ">" : "")
                     + (form_settings.email_field ? '<input type="email" name="email" placeholder="' + GigaTester_StringRes.get("your_email") + '"' + (form_settings.email_field_mandatory ? " required" : "") + (form_settings.email_field_disable ? " disabled" : "") + ">" : "")
                     + (form_settings.display_category ? '<select id="category" name="category"' + (form_settings.category_field_mandatory ? " required" : "") + ">"
                     + '<option id="category" value="category" selected disabled>' + GigaTester_StringRes.get("select_category") + "</option>" + category_options + "</select>" : "")
                     + (form_settings.display_category ? '<gtdiv id="category_standard_feedback"></gtdiv>' : '')
                     + (form_settings.display_severity ? '<select id="severity" name="severity"' + (form_settings.severity_field_mandatory ? " required" : "") + ">"
                     + '<option value="severity" selected disabled>' + GigaTester_StringRes.get("select_severity") + "</option>" + severity_options + "</select>" : "")
                     + (form_settings.title_field ? '<input type="text" name="title" maxlength="80" data-gramm_editor="false" placeholder="' + (GigaTester_StringUtils.escapeSpecialChars(form_settings.title_field_placeholder) || GigaTester_StringRes.get("feedback_title", true)) + '"' + (form_settings.title_field_mandatory ? " required" : "") + ">" : "")
                     + (form_settings.comment_field ? '<textarea name="description" data-gramm_editor="false" placeholder="' + (GigaTester_StringUtils.escapeSpecialChars(form_settings.comment_field_placeholder) || GigaTester_StringRes.get("your_comment")) + '"' + (form_settings.comment_field_mandatory ? " required" : "") + "></textarea>" : "")
                     + '</gtdiv><gtdiv class="gigatester-ctrl-item-form-right">'
                     + '<gtdiv class="gigatester-ctrl-item-preview-placeholder">' + GigaTester_StringRes.get("attachment_msg") + '</gtdiv>'
                     + (display_screenshot || display_audio || display_video || display_attachment ?
                        //  GigaTester_modal.recording ? '<gtdiv class="gigatester-ctrl-item-attach-actions" >' + "<gtdiv>" :
                        '<gtdiv class="gigatester-ctrl-item-attach-actions" data-item="' + data_item + '">' + "<gtdiv>"
                     + (display_screenshot ? '<btn class="gigatester-ctrl-item-screenshot">' + GigaTester_Icons.screenshot_icon + "<gtdiv>" + GigaTester_StringRes.get("attach_screenshot") + "</gtdiv>"
                     + "<gttooltip>" + GigaTester_StringRes.get("attach_screenshot") + "</gttooltip>" + '<div class="gigatester-screenshot-preview-checkmark">' + GigaTester_Icons.checkmark + "</div>" + "</btn>" : "")
                     + (display_audio ? '<btn class="gigatester-ctrl-item-audio">' + GigaTester_Icons.mic_icon + "<gtdiv>" + GigaTester_StringRes.get("capture_audio") + "</gtdiv>"
                     + "<gttooltip>" + GigaTester_StringRes.get("capture_audio") + "</gttooltip>" + '<div class="gigatester-screenshot-preview-checkmark">' + GigaTester_Icons.checkmark + "</div>" + "</btn>" : "")
                     + (display_video ?  '<btn class="gigatester-ctrl-item-video">' + GigaTester_Icons.video_icon + "<gtdiv>" + GigaTester_StringRes.get("capture_screen_recording") + "</gtdiv>"
                     + "<gttooltip>" + GigaTester_StringRes.get("capture_screen_recording") + "</gttooltip>" + '<div class="gigatester-screenshot-preview-checkmark">' + GigaTester_Icons.checkmark + "</div>" + "</btn>" : "")
                     + (display_attachment ?'<btn class="gigatester-ctrl-item-add-attachment">' + GigaTester_Icons.paperclip_icon + "<gtdiv>" + GigaTester_StringRes.get("attach_file") + "</gtdiv>"
                     + "<gttooltip>" + GigaTester_StringRes.get("attach_file") + "</gttooltip>" + '<div class="gigatester-screenshot-preview-checkmark">' + GigaTester_Icons.checkmark + "</div>" + "</btn>" : "")
                     + "</gtdiv>" + '<input type="file" class="gigatester-ctrl-item-attachment">' + "</gtdiv>" : "")
                     + (form_settings.custom_field_1_type === "disclaimer" && form_settings.custom_field_1_label ? '<gtdiv class="gigatester-disclaimer">' + Lib.htmlEntitiesWithA(form_settings.custom_field_1_label, true) + "</gtdiv>" : "")
                     + (form_settings.custom_field_1_type === "checkbox" ? '<gtdiv class="gigatester-checkbox-container">' + '<input type="checkbox"' + (form_settings.custom_field_1_mandatory ? " required" : "") + ">"
                     + "<gtdiv>" + '<gtdiv class="gigatester-checkbox">' + GigaTester_Icons.check_mark_icon + "</gtdiv>" + '<gtdiv class="gigatester-checkbox-label">' + Lib.htmlEntitiesWithA(form_settings.custom_field_1_label, true) + "</gtdiv>" + "</gtdiv>" + "</gtdiv>" : "")
                     + '<button class="gigatester-ctrl-item-send gigatester-input-btn">' + '<span class="gigatester-ctrl-item-send-progress"></span>' + '<span class="gigatester-ctrl-item-send-text">' +  GigaTester_StringRes.get("send") + "</span>" + "</button>"
                     + '</gtdiv></gtdiv>'
                     + "</gtdiv>"
                     + "</form>";
                   this.custom_ui.events.find('.gigatester-ctrl-item-step').html(html);
                    if(GigaTester_modal.configs.rating_limit > 4){
                        this.custom_ui.events.find(".gigatester-ctrl-item-form").show();
                        this.focusControls();
                    }
                    if (default_rating) {
                        this.custom_ui.events.find('gtrating gtdiv[data-rating="' + default_rating + '"]').click()
                    }
                    if (default_name) {
                        this.custom_ui.events.find('.gigatester-ctrl-item-step').find('input[name="name"]').val(default_name)
                    }
                    if (default_email) {
                        this.custom_ui.events.find('.gigatester-ctrl-item-step').find('input[name="email"]').val(default_email)
                    }
                    if (default_title) {
                        this.custom_ui.events.find('.gigatester-ctrl-item-step').find('input[name="title"]').val(default_title)
                    }
                    if (default_description) {
                        this.custom_ui.events.find('.gigatester-ctrl-item-step').find('textarea[name="description"]').val(default_description)
                    }

                    if (default_category) {
                        this.custom_ui.events.find('.gigatester-ctrl-item-step').find('select[name="category"]').val(default_category)
                        console.log(default_category, "form defaults")
                        var select = document.getElementById('category');
                        console.log(this.custom_ui.events.find('.gigatester-ctrl-item-step').find('select[name="category"]').val())
                        // var value = select.options[select.selectedIndex].value;
                        // console.log(value);
                    }
                    if (default_severity) {
                        this.custom_ui.events.find('.gigatester-ctrl-item-step').find('select[name="severity"]').val(default_severity)
                    }
                    console.log(default_email, "default email");
                    setTimeout(()=>{
                        GigaTester_modal.saveSubCategory();
                    },10);

                    // GigaTester_modal.showSubCategory();

                },
                openForm: function(form_type) {
                    this.form_type = form_type;
                    this.setDialogForm();
                    this.custom_ui.events.find('.gigatester-ctrl-item-step').show();
                    if(GigaTester_modal.configs.rating_limit > 4){
                        this.custom_ui.events.find(".gigatester-ctrl-item-form").show();
                        this.focusControls();
                    }
                    this.focusControls();
                },
                recordImage: async function(e){
                    GigaTester_modal.canvas_mode = true;
                    GigaTester_modal.saveCheckedCategory();
                    GigaTester_modal.set_screen_default_category = false;
                    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                        console.log("GigaTester: This browser does not support media capture API");
                        //callback();
                    } else {
                        GigaTester_modal.hideControls();
                        navigator.mediaDevices.getDisplayMedia({
                            audio: false,
                            video: true,
                            preferCurrentTab: true,
                            oneway: true,
                            displaySurface: ['application', 'browser', 'monitor', 'window'],
                        }).then(function(stream){
                            GigaTester_modal.Draw_Tools.image_capture = 'true';
                            GigaTester_modal.Draw_Tools.removeTools()
                            stream.onended = () => {
                                console.info("GigaTester: Recording has ended");
                            };

                            stream.onerror = () => {
                                console.log('GigaTester: Error occuring during stream');
                            }
                            const recorder = new MediaRecorder(stream);
                            const chunks = [];
                            recorder.ondataavailable = e => {
                                chunks.push(e.data);
                                console.log('GigaTester: image recorder state ',recorder.state)
                            }
                            if(stream){
                                recorder.start();
                                const videoTracks = stream.getVideoTracks();
                                if (videoTracks && videoTracks[0]) {
                                    const track = videoTracks[0];
                                    track.addEventListener('ended', () => console.log('GigaTester: screensharing has ended'))
                                    // Wrapping in a try catch to preform most optimal solution first
                                    // before attempting less optimal solution
                                    try {
                                        const imageCapture = new ImageCapture(track);
                                        setTimeout(() => { imageCapture.grabFrame()
                                            .then((screenshot) => {
                                                GigaTester_modal.custom_ui.element.attr("drawing", "false");
                                                GigaTester_modal.Draw_Tools.image_capture = 'false';
                                                GigaTester_modal.screenshotImage(screenshot);
                                            })
                                            .catch((error) => console.error(error));
                                        },200);
                                    } catch(error) {
                                        console.warn('GigaTester: ImageCapture not supported on this browser');
                                        recorder.onstop = e => {
                                            GigaTester_modal.custom_ui.element.attr("drawing", "false");
                                            const completeBlob = new Blob(chunks, { type: "video/mp4" });
                                            const src = URL.createObjectURL(completeBlob);
                                            GigaTester_modal.Draw_Tools.image_capture = 'false';
                                            console.log('GigaTester: Image blob url',src);
                                            const image_overlay = $('<gtdiv id="gigatester_video_player"><gtdiv></gtdiv></gtdiv>');
                                            const video = $('<video width="0" height="0" id="gigatester_image_preview_player" preload="auto" src="' + src + '"></video>');
                                            const video_close = $('<btn id="gigatester_video_player_close">').html(GigaTester_Icons.close_icon);
                                            video_close.appendTo(image_overlay);
                                            video.insertAfter($(document.getElementsByClassName('gigatester-ctrl-item-attach-actions')));
                                            setTimeout(()=> (GigaTester_modal.screenshotImage(video.get(0))), 700);
                                        };
                                    }
                                } else {
                                    // TODO: add logic for if failure to capture video
                                }
                                setTimeout(()=> {
                                    recorder.stop(),
                                    stream.getTracks().forEach(track => track.stop());  // Stop all tracks from the MediaStream
                                }, 700);
                            }
                            console.log('GigaTester: image recording started')
                        })
                        .catch(function(err) {
                            console.log(err , 'err')
                            GigaTester_modal.set_screen_default_category = false;
                            GigaTester_modal.recording = false;
                            GigaTester_modal.showControls();
                            GigaTester_modal.setDialogForm();
                            GigaTester_modal.saveCheckedCategory();
                            if(GigaTester_modal.form_data.rating){
                                GigaTester_modal.selectedRating();
                            }
                            /* handle the error */
                        })
                    }
                },
                screenshotImage: function(rawImage){
                    const final_width = Math.round(window.innerWidth * 0.95); //95% of viewport width
                    const final_height = Math.round(window.innerHeight * 0.95); //95% of viewport height
                    console.log("image [width, height] = [" + final_width + ", " + final_height + "]" );
                    const canvas = document.createElement("canvas");
                    const context = canvas.getContext("2d");
                    canvas.width = final_width;
                    canvas.height = final_height;
                    if(rawImage && context){
                        context.drawImage(rawImage, 0, 0, final_width, final_height);
                        const frame = canvas.toDataURL("image/jpeg");
                        console.log('GigaTester: [Info] Img base64 value ', frame);
                        const image_overlay = $('<gtdiv id="gigatester_screencapture_area"></gtdiv>');
                        image_overlay.css({width: final_width, height: final_height});
                        const image =  $('<image id="gigatester_image_preview" preload="auto" src="' + frame + '"></image>');
                        image.appendTo(image_overlay);
//                        this.canvas_target = canvas;
                        const screencapture_dialog = $('<gtdiv id="gigatester_screencapture_dialog"></gtdiv>');
                        image_overlay.appendTo(screencapture_dialog);
                        screencapture_dialog.appendTo(document.body);
                        this.addCanvas();
                        GigaTester_modal.scrollDisable();
                    }
                },
                finalScreenshot: async function(){
                    GigaTester_modal.setNotifyStatus("Taking screenshot...");
                    const annoted = document.getElementById('gigatester_screencapture_area')
                    html2canvas(annoted , {
                        useCORS: true,
                        allowTaint : true,
                        width: annoted.width,
                        height: annoted.height,
                    } ).then(function(canvas) {
                        if(canvas){
                            const image = new Image();
                            const base64Image = canvas.toDataURL();
                            image.onload = () => {
                                GigaTester_modal.removeGToverlay();
                                GigaTester_modal.hideComments();
                                GigaTester_modal.Draw_Tools.removeTools();
                                GigaTester_modal.showControls();
                                GigaTester_modal.recording = true;
                                GigaTester_modal.form_data.categories = GigaTester_modal.form_data.categories;
                                GigaTester_modal.form_data.rating =  GigaTester_modal.form_data.rating;
                                GigaTester_modal.setDialogForm();
                                GigaTester_modal.set_screen_default_category = true;
                                if(GigaTester_modal.form_data.rating){
                                    GigaTester_modal.selectedRating();
                                }
                                GigaTester_modal.clearNotifyStatus();
                                const image_overlay = $('<gtdiv id="gigatester_images_player"><gtdiv></gtdiv></gtdiv>');
                                const image = $('<image id="gigatester_images_preview_player" width=300 height=225 src="' + base64Image + '"></image>');
                                const image_close = $('<button id="gigatester_remove_attachment_btn">').html(GigaTester_Icons.trash_bin_icon);
                                $(document.getElementsByClassName('gigatester-ctrl-item-preview-placeholder')).text("");
                                image.appendTo($(document.getElementsByClassName('gigatester-ctrl-item-preview-placeholder')));
                                image_close.insertAfter(image);
                                GigaTester_modal.loadImage(base64Image);
                                image_close.on("click", function() {
                                    image.remove();
                                    GigaTester_modal.removeComments();
                                    GigaTester_modal.form_data.image_file = '';
                                    GigaTester_modal.set_screen_default_category = false;
                                    GigaTester_modal.recording = false;
                                    GigaTester_modal.saveCheckedCategory();
                                    image_close.remove();
                                    GigaTester_modal.setDialogForm();
                                    GigaTester_modal.saveSubCategory();
                                    if(GigaTester_modal.form_data.rating){
                                        GigaTester_modal.selectedRating();
                                    }
                                })
                                console.log(base64Image, 'final screenshot');
                            };
                            image.src = base64Image;
                        }
                    });
                },
                 getTimerStr: function() {
                    console.log(GigaTester_modal.configs.audio_time)
                    let min = Math.floor(GigaTester_modal.configs.audio_time / 60);
                    let sec = GigaTester_modal.configs.audio_time - min * 60;
                    if (min < 10) {
                        min = "0" + min
                    }
                    if (sec < 10) {
                        sec = "0" + sec
                    }
                    return min + ":" + sec
                },
                startTimer: function() {
                    let timer_button = $(document.getElementById('gigatester-audio-timer-btn'))
                    console.log(timer_button.text())
                    this.timer_timeout = setInterval(function() {
                        let timer_text = this.getTimerStr();
                        timer_button.text(timer_text);
                        GigaTester_modal.configs.audio_time--;
                        if (timer_text === "00:00") {
                            clearInterval(this.timer_timeout);
                            $(document.getElementById('gigatester_audio_record_player_stop')).trigger('click')
                        }
                    }.bind(this), 1e3)
                },
                stopTimer: function() {
                    clearInterval(this.timer_timeout)
                },
                countDownStop: function() {
                    clearTimeout(this.count_down_timeout)
                },
                resetTimer: function() {
                    GigaTester_modal.configs.audio_time = GigaTester_modal.configs.config_data[0].videoAudioMaxDuration * 60 || 180;
                },
                recordAudio: async function(e){
                    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                        console.log("This browser does not support the API yet");
                      }
                    else{
                        navigator.mediaDevices.getUserMedia({
                            audio: true,
                            video: false
                        }).then(function(stream){
                        GigaTester_modal.recording = true;
                        GigaTester_modal.set_screen_default_category = false;
                        let audio_record_overlay = $('<div id="gigatester_audio_record_player"></div>');
                        let audio_record_text = $('<gtdiv id="gigatester_audio_record_player_text"></gtdiv>').html('Please click on Mic icon to stop audio recording.')
                        let timer_button = $("<btn id='gigatester-audio-timer-btn'>").addClass("gigatester-video-controls-timer").text(GigaTester_modal.getTimerStr());
                        let timer_info_text = $('<gtlabel class="gigatester-audio-timer-label">Remaining Record Time</gtlabel>')
                        let audio_record_stop = $('<btn id="gigatester_audio_record_player_stop">').html(GigaTester_Icons.mic_icon);
                        let audio_record_close = $('<btn id="gigatester_audio_record_player_close">').html(GigaTester_Icons.close_icon);
                        audio_record_close.appendTo(audio_record_overlay);
                        audio_record_stop.appendTo(audio_record_overlay);
                        timer_button.appendTo(audio_record_stop);
                        timer_info_text.appendTo(audio_record_stop);
                        audio_record_text.appendTo(audio_record_overlay);
                        audio_record_overlay.appendTo($(document.getElementsByClassName('gigatester-ctrl-item gigatester-ctrl-item-r')));
                        // let mic_volume = $("<gtvideotoolbar id='gigatester-audio-volume-control'> <gtvolume class='hasvolume'>" + "<gtdiv></gtdiv>" + "<gtdiv></gtdiv>" + "<gtdiv></gtdiv>" + "</gtvolume> </gtvideotoolbar>").appendTo(audio_record_stop);
                        const recorder = new MediaRecorder(stream);
                        GigaTester_modal.startTimer();
                        const chunks = [];
                        console.log('recording')
                        recorder.ondataavailable = e => chunks.push(e.data);
                        recorder.start();
                        audio_record_close.on('click', function(){
                            GigaTester_modal.recording = false;
                            recorder.stop()
                            stream.getTracks() // get all tracks from the MediaStream
                            .forEach( track => track.stop());
                            GigaTester_modal.stopTimer();
                            GigaTester_modal.countDownStop();
                            GigaTester_modal.resetTimer();
                            GigaTester_modal.set_screen_default_category = false;
                            GigaTester_modal.recording = false;
                            GigaTester_modal.saveCheckedCategory();
                            audio_record_overlay.remove();
                            GigaTester_modal.setDialogForm();
                            GigaTester_modal.saveSubCategory();
                            if(GigaTester_modal.form_data.rating){
                                GigaTester_modal.selectedRating();
                            }
                        })
                        audio_record_stop.on('click',function () {
                        recorder.stop()
                        stream.getTracks() // get all tracks from the MediaStream
                        .forEach( track => track.stop());
                        console.log('audio stopped')})
                        recorder.onstop = e => {
                            if(!GigaTester_modal.recording){
                                return
                            }
                            else{
                            GigaTester_modal.stopTimer();
                            GigaTester_modal.countDownStop();
                            GigaTester_modal.resetTimer();
                            $(audio_record_overlay).remove();
                            GigaTester_modal.form_data.rating =  GigaTester_modal.form_data.rating;
                            GigaTester_modal.form_data.comment_field =  GigaTester_modal.form_data.comment_field
                            GigaTester_modal.form_data.category = GigaTester_modal.form_data.category
                            GigaTester_modal.saveCheckedCategory();
                            GigaTester_modal.setDialogForm();
                            GigaTester_modal.saveSubCategory();
                            if(GigaTester_modal.form_data.rating){
                                GigaTester_modal.selectedRating();
                            }
                            GigaTester_modal.set_screen_default_category = true;
                            const completeBlob = new Blob(chunks, { type: "audio/wav" });
                            let src = URL.createObjectURL(completeBlob);
                            console.log(src, 'audio blob')
                            let audio_overlay = $('<div id="gigatester_audio_player"><div></div></div>');
                            let audio = $('<audio id="gigatester_audio_preview_player" controls loop autoplay preload="auto" src="' + src + '"></audio>');
                            let audio_close = $('<button id="gigatester_audio_player_close">').html(GigaTester_Icons.trash_bin_icon);
                            $(document.getElementsByClassName('gigatester-ctrl-item-preview-placeholder')).text("");
                            audio.appendTo($(document.getElementsByClassName('gigatester-ctrl-item-preview-placeholder')));
                            audio_close.insertAfter(audio);
                            GigaTester_modal.loadAudio(src);
                            audio_close.on("click", function() {
                                audio.remove();
                                GigaTester_modal.form_data.audio_file = '';
                                GigaTester_modal.recording = false;
                                GigaTester_modal.set_screen_default_category = false;
                                GigaTester_modal.saveCheckedCategory();
                                audio_close.remove();
                                GigaTester_modal.setDialogForm();
                                GigaTester_modal.saveSubCategory();
                                if(GigaTester_modal.form_data.rating){
                                    GigaTester_modal.selectedRating();
                                }
                            })
                          };
                        }
                        })
                        .catch(function(err){
                            console.log(err , 'audio err')
                        })

                    }
                },
                UUIDv4: function() {
                        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                            return v.toString(16);
                        });
                },
                loadAudio: async function(src) {
                    GigaTester_modal.form_data.audio_file = await fetch(src)
                    .then(r => r.blob()).then(blobFile => new File([blobFile], 'gt_audio_' + GigaTester_modal.UUIDv4() +'.wav', { type: 'audio/wav' }));
                    console.log(GigaTester_modal.form_dataaudio_file, 'audio file loaded');
                    this.custom_ui.events.find(".gigatester-ctrl-item-screenshot").attr('disabled', 'true');
                    this.custom_ui.events.find(".gigatester-ctrl-item-video").attr('disabled', 'true');
                    this.custom_ui.events.find(".gigatester-ctrl-item-audio").attr('disabled', 'true');
                    this.custom_ui.events.find(".gigatester-ctrl-item-add-attachment").attr('disabled', 'true');
                    this.custom_ui.events.find(".gigatester-ctrl-item-attach-actions").attr('disabled', 'true');
                },
                loadImage: async function(src) {
                    GigaTester_modal.form_data.image_file = await fetch(src)
                    .then(r => r.blob()).then(blobFile => new File([blobFile], 'gt_image_' + GigaTester_modal.UUIDv4() +'.jpeg', { type: 'image/jpeg' }));
                    console.log(GigaTester_modal.form_data.image_file, 'image file loaded');
                    this.custom_ui.events.find(".gigatester-ctrl-item-screenshot").attr('disabled', 'true');
                    this.custom_ui.events.find(".gigatester-ctrl-item-video").attr('disabled', 'true');
                    this.custom_ui.events.find(".gigatester-ctrl-item-audio").attr('disabled', 'true');
                    this.custom_ui.events.find(".gigatester-ctrl-item-add-attachment").attr('disabled', 'true');
                    this.custom_ui.events.find(".gigatester-ctrl-item-attach-actions").attr('disabled', 'true');
                },
                submitVidCapture: function(video_blob) {
                    GigaTester_modal.video_blob = video_blob;
                    let src = window.URL.createObjectURL(video_blob);
                    GigaTester_modal.showControls();
                    setTimeout( function() {
                        GigaTester_modal.recording = true;
                        GigaTester_modal.form_data.rating =  GigaTester_modal.form_data.rating;
                        GigaTester_modal.setDialogForm();
                        GigaTester_modal.saveSubCategory();
                        if(GigaTester_modal.form_data.rating){
                            GigaTester_modal.selectedRating();
                        }
                        let video_overlay = $('<div id="gigatester_video_player"><div></div></div>');
                        let video = $('<video id="gigatester_video_preview_player" controls loop autoplay preload="auto" src="' + src + '"></video>');
                        let video_close = $('<button id="gigatester_video_player_close">').html(GigaTester_Icons.trash_bin_icon);
                        $(document.getElementsByClassName('gigatester-ctrl-item-preview-placeholder')).text("");
                        video.appendTo($(document.getElementsByClassName('gigatester-ctrl-item-preview-placeholder')));
                        video_close.insertAfter(video);
                        video_close.on("click", function() {
                            video_overlay.remove()
                            video.remove();
                            GigaTester_modal.form_data.video_file = '';
                            GigaTester_modal.recording = false;
                            GigaTester_modal.saveCheckedCategory();
                            video_close.remove();
                            GigaTester_modal.setDialogForm();
                            GigaTester_modal.saveSubCategory();
                            if(GigaTester_modal.form_data.rating){
                                GigaTester_modal.selectedRating();
                            }
                            })
                        }, 100);
                        GigaTester_modal.showControls();
                        GigaTester_modal.loadVideo(src);
            },

                startScreenRecorder: function(e) {
                    if (typeof e !== "undefined" && $(e.currentTarget).attr("disabled")) {
                        return
                    }
                    GigaTester_modal.saveCheckedCategory();
                    this.hideControls();
                    console.log('video recorder started')
                    Screen_Recorder.start({
                        onSubmit: GigaTester_modal.submitVidCapture,
                        onCancel: this.Draw_Tools.cancelGTcapture.bind(this.Draw_Tools),
                        timer: this.configs.screen_record_time
                    })
                },
                loadVideo: async function(src) {
                    GigaTester_modal.form_data.video_file = await fetch(src)
                    .then(r => r.blob()).then(blobFile => new File([blobFile], 'gt_video_' + GigaTester_modal.UUIDv4() +'.mp4', { type: 'video/mp4' }));
                    console.log(GigaTester_modal.form_data.video_file, 'video file loaded');
                    this.custom_ui.events.find(".gigatester-ctrl-item-screenshot").attr('disabled', 'true');
                    this.custom_ui.events.find(".gigatester-ctrl-item-video").attr('disabled', 'true');
                    this.custom_ui.events.find(".gigatester-ctrl-item-audio").attr('disabled', 'true');
                    this.custom_ui.events.find(".gigatester-ctrl-item-add-attachment").attr('disabled', 'true');
                    this.custom_ui.events.find(".gigatester-ctrl-item-attach-actions").attr('disabled', 'true');
                },
                toggleAttachButtons: function() {
                    this.custom_ui.events.find(".gigatester-ctrl-item-attach-actions").toggle(this.custom_ui.events.find(".gigatester-ctrl-item-attach-actions btn[disabled]").length !== this.custom_ui.events.find(".gigatester-ctrl-item-attach-actions btn").length)
                },
                popOutDialog: function(){
                    if($(document.getElementsByClassName("gigatester-popup-dialog"))){
                        $(document.getElementsByClassName("gigatester-popup-dialog")).remove();
                    }
                    let popup_dialog = $('<gtdiv class="gigatester-popup-dialog"></gtdiv>')
                    popup_dialog.appendTo($(document.getElementsByClassName("gigatester-btn-r")));
                    let popup_dialog_close = $('<btn id="gigatester-popup-dialog-close">').html(GigaTester_Icons.close_icon);
                    let popup_bug_icon = $('<popupbtn><gtdiv>' + GigaTester_Icons.bug_icon + GigaTester_StringRes.get('report_bug') + '</gtdiv></popupbtn>');
                    let popup_bug_icon_tooltip = $('<popuptooltip></popuptooltip').html(GigaTester_StringRes.get('report_bug_msg'));
                    let popup_feedback_icon = $('<popupbtn><gtdiv>' + GigaTester_Icons.feedback_icon + GigaTester_StringRes.get('give_feedback') + '</gtdiv></popupbtn>');
                    let popup_feedback_icon_tooltip = $('<popuptooltip></popuptooltip').html(GigaTester_StringRes.get('give_feedback_msg'));
                    popup_bug_icon.appendTo(popup_dialog);
                    popup_bug_icon_tooltip.appendTo(popup_bug_icon);
                    popup_feedback_icon.appendTo(popup_dialog);
                    popup_feedback_icon_tooltip.appendTo(popup_feedback_icon);
                    popup_dialog_close.appendTo(popup_dialog);
                    popup_bug_icon.on("click", function(e){
                        GigaTester_modal.form_type = "BUGS";
                        window.GigaTester.open("BUGS");
                        popup_dialog.remove();
                        e.stopPropagation();
                        e.preventDefault();
                    })
                    popup_feedback_icon.on("click", function(e){
                        GigaTester_modal.form_type = "FEEDBACK";
                        window.GigaTester.open("FEEDBACK");
                        popup_dialog.remove();
                        e.stopPropagation();
                        e.preventDefault();
                    })
                    popup_dialog_close.on("click", function(e) {
                        popup_dialog.remove();
                        e.stopPropagation();
                        e.preventDefault();
                    })
                },
                hideControls: function() {
                    this.custom_ui.button.hide();
                    this.custom_ui.events.hide();
                    this.custom_ui.element.removeAttr("isopen")
                },
                showControls: function(force_show_form) {
                    if (!this.autoHide()) {
                        this.custom_ui.button.show()
                    }
                        this.setDialogForm();
                        this.custom_ui.events.find('.gigatester-ctrl-item-step').show();
                        if (force_show_form) {
                            this.custom_ui.events.find(".gigatester-ctrl-item-form").show()
                        }
                    this.custom_ui.events.show();
                    this.focusControls();
                    this.custom_ui.element.attr("isopen", "true")
                },
                openControls: function() {
                    this.addControls();
                    if($(document.getElementsByClassName("gigatester-popup-dialog"))){
                        $(document.getElementsByClassName("gigatester-popup-dialog")).remove();
                    }
                    let open_tool = false;
                    this.controls_step = 2;
                    if (!open_tool) {
                        this.custom_ui.element.attr("isopen", "true")
                    }
                },
                focusControls: function(e) {
                    this.custom_ui.events.find('input[type="text"],input[type="email"],textarea').filter(":visible").each(function() {
                        if ($(this).val() === "") {
                            $(this).focus();
                            return false
                        }
                    })
                },
                changeCategory: function(e) {
                    this.categories = this.custom_ui.events.find('select[name="category"]').val()
                },
                changeSeverity: function(e) {
                    this.severity = this.custom_ui.events.find('select[name="severity"]').val()
                },
                toggleCheckbox: function(e) {
                    if ($(e.currentTarget).attr("disabled")) {
                        return
                    }
                    let is_checked = this.custom_ui.events.find('.gigatester-checkbox-container input[type="checkbox"]').prop("checked");
                    if (is_checked) {
                        this.custom_ui.events.find('.gigatester-checkbox-container input[type="checkbox"]').prop("checked", false);
                        this.custom_ui.events.find(".gigatester-checkbox-container svg").hide()
                    } else {
                        this.custom_ui.events.find('.gigatester-checkbox-container input[type="checkbox"]').prop("checked", true);
                        this.custom_ui.events.find(".gigatester-checkbox-container svg").show()
                    }
                },
                selectAttachment: function(e) {
                    if ($(e.currentTarget).attr("disabled")) {
                        return
                    }
                    this.custom_ui.events.find(".gigatester-ctrl-item-attachment").click()
                },
                selectedRating: function(){
                    let form_settings = this.getFormSettings(this.form_type);
                    let rating = this.form_data.rating || 0;
                    console.log('ratings', rating)
                    if (form_settings.rating_type) {
                        let selected_icon = this.custom_ui.events.find("gtrating > gtdiv:not(.inactive):last");
                        for(let i=0; i<rating; i++){
                        this.custom_ui.events.find("gtrating > gtdiv:not(.active):first").removeClass("inactive").addClass("active")
                        }
                        if (selected_icon.length) {
                            rating = selected_icon.data("rating")
                            console.log(rating)
                        }
                        this.form_data.rating = rating.slice(rating.length -1, rating.length)
                        console.log(GigaTester_modal.configs.rating_limit, 'form data')
                    }
                    if(this.form_data.rating <= GigaTester_modal.configs.rating_limit){
                    this.custom_ui.events.find(".gigatester-ctrl-item-form").show();
                    this.custom_ui.events.off("click", "gtrating > gtdiv");
                    this.custom_ui.events.off("mouseenter", "gtrating > gtdiv");
                    this.custom_ui.events.off("mouseleave", "gtrating > gtdiv");
                    this.focusControls()
                    }
                },
                selectRating: function(e) {
                    let form_settings = this.getFormSettings(this.form_type);
                    this.custom_ui.events.find("gtrating > gtdiv").addClass("inactive");
                    if (form_settings.rating_type === "EMOJI" || form_settings.rating_type === "THUMB") {
                        $(e.currentTarget).removeClass("inactive")
                    } else if (form_settings.rating_type === "STAR" || form_settings.rating_type === "HEART") {
                        $(e.currentTarget).prevAll().removeClass("inactive");
                        $(e.currentTarget).removeClass("inactive")
                    }
                    let rating = this.form_data.rating || "";

                    if (form_settings.rating_type) {
                        let selected_icon = this.custom_ui.events.find("gtrating > gtdiv:not(.inactive):last");
                        if (selected_icon.length) {
                            rating = selected_icon.data("rating")
                            console.log('GigaTester: ratings type ', rating)
                        }
                        this.form_data.rating = rating.slice(rating.length -1, rating.length)
                        // console.log(this.form_data.rating, 'form data')
                        console.log('GigaTester : max commented rating limit', GigaTester_modal.configs.rating_limit)
                    }
                    if(this.form_data.rating <= GigaTester_modal.configs.rating_limit){
                    this.custom_ui.events.find(".gigatester-ctrl-item-form").show();
                    this.custom_ui.events.off("click", "gtrating > gtdiv");
                    this.custom_ui.events.off("mouseenter", "gtrating > gtdiv");
                    this.custom_ui.events.off("mouseleave", "gtrating > gtdiv");
                    this.focusControls()
                    }
                    else{
                        this.post();
                    }
                },
                ratingPreview: function(e) {
                    let form_settings = this.getFormSettings(this.form_type);
                    if (form_settings.rating_type === "STAR" || form_settings.rating_type === "HEART") {
                        this.custom_ui.events.find("gtrating > gtdiv").removeClass("highlight").addClass("preview");
                        $(e.currentTarget).prevAll().addClass("highlight");
                        $(e.currentTarget).addClass("highlight")
                    } else if (form_settings.rating_type === "EMOJI" || form_settings.rating_type === "THUMB") {
                        this.custom_ui.events.find("gtrating > gtdiv").removeClass("highlight").addClass("preview");
                        $(e.currentTarget).addClass("highlight")
                    }
                },
                unRatingPreview: function(e) {
                    this.custom_ui.events.find("gtrating > gtdiv").removeClass("highlight preview")
                },
                uploadAttachment: function(e) {
                    console.log(e.target, 'file upload')
                    if (!e.target.files || !e.target.files.length) {
                        return
                    }
                    GigaTester_modal.form_data.external_file = e.target.files[0];
                    let external_file_overlay = $('<div id="gigatester_external_file_loader"><div></div></div>');
                    let external_file = $('<div id="gigatester_external_file_preview">' + GigaTester_modal.form_data.external_file.name + '</div>').html(GigaTester_modal.form_data.external_file.fileName);
                    let external_file_close = $('<button id="gigatester_external_file_close">').html(GigaTester_Icons.trash_bin_icon);
                    const size_limit = GigaTester_modal.configs.attachment_size || 1;
                    $(document.getElementsByClassName('gigatester-ctrl-item-preview-placeholder')).text("");
                    external_file.appendTo($(document.getElementsByClassName('gigatester-ctrl-item-preview-placeholder')));
                    external_file_close.insertAfter(external_file);
                    external_file_close.on("click", function() {
                        external_file.remove();
                        GigaTester_modal.form_data.external_file = '';
                        GigaTester_modal.recording = false;
                        GigaTester_modal.saveCheckedCategory();
                        external_file_close.remove();
                        GigaTester_modal.setDialogForm();
                        GigaTester_modal.saveSubCategory();
                        if(GigaTester_modal.form_data.rating){
                            GigaTester_modal.selectedRating();
                        }
                        })
                        const filesize = Math.round((GigaTester_modal.form_data.external_file.size / 1024));
                        console.log(filesize + 'KB')
                        if (GigaTester_modal.form_data.external_file.size > size_limit * 1024 * 1024) {
                            console.log(Math.ceil(GigaTester_modal.form_data.external_file.size / 1024 / 1024) + 'MB')
                            console.log( size_limit + "MB")

                        }
                        this.custom_ui.events.find(".gigatester-ctrl-item-screenshot").attr('disabled', 'true');
                        this.custom_ui.events.find(".gigatester-ctrl-item-video").attr('disabled', 'true');
                        this.custom_ui.events.find(".gigatester-ctrl-item-audio").attr('disabled', 'true');
                        this.custom_ui.events.find(".gigatester-ctrl-item-add-attachment").attr('disabled', 'true');
                        this.custom_ui.events.find(".gigatester-ctrl-item-attach-actions").attr('disabled', 'true');
                },
                closeDialog: function(e) {
                    let _doClose = function() {
                        clearTimeout(this.close_timeout);
                        this.reset();
                    }.bind(this);
                        _doClose()
                },
                reset: function(e) {
                    if (e && e.type === "click") {
                        e.preventDefault()
                    }
                    if (!this.autoHide()) {
                        this.custom_ui.button.show()
                    }
                    this.custom_ui.element.removeAttr("isopen");
                    this.comments = [];
                    this.video_blob = null;
                    this.form_data.audio_file = '';
                    this.form_data.video_file='';
                    this.form_data.external_file='';
                    this.form_data.image_file='';
                    this.form_data = {
                        rating: "",
                        name: "",
                        email: "",
                        title: "",
                        description: "",
                        category: "",
                        severity: "",
                    };
                    this.recording = false;
                    this.canvas_mode = false;
                    this.removeGToverlay();
                    this.removeGTControls();
                    this.removeComments();
                    GigaTester_modal.set_screen_default_category = true;
                    this.form_data['category'] = GigaTester.category || "category";
                    GigaTester_modal.configs.selected_category = []
                    this.form_data['severity'] = "severity";
                    this.controls_step = 0
                },
                postMedia: function(fileSelected){
                    console.log(fileSelected,'postMedia')
                    console.log(fileSelected.name, 'name')
                    console.log('postMedia')
                    let formUpload = new FormData();
                    formUpload.append('file', fileSelected);
                    formUpload.append('fileName', fileSelected.name);
                    const reader = new FileReader();
                    console.log(formUpload.entries(),'formuplod')
                    reader.onloadend = () => {
                        console.log('inside reader')
                        const base64String = String(reader.result).split('base64,')[1];
                        const dataInfo = {
                            fileType: fileSelected.type,
                            fileName: fileSelected.name,
                        };
                        this.postMediaContent(dataInfo, fileSelected);
                    }
                    reader.readAsDataURL(fileSelected);
                },
                validateFields: function(e){
                    // console.log(e);
                    e.preventDefault();
                    console.log(GigaTester_modal.form_type)
                    if(GigaTester_modal.form_data.audio_file || GigaTester_modal.form_data.external_file || GigaTester_modal.form_data.video_file || GigaTester_modal.form_data.image_file){
                        let size_limit = GigaTester_modal.configs.max_file_size;
                        const file = GigaTester_modal.form_data.audio_file || GigaTester_modal.form_data.external_file || GigaTester_modal.form_data.video_file || GigaTester_modal.form_data.image_file;
                        const filesize = Math.round((file.size / 1024));
                        console.log('GigaTester: uploaded file size ', Math.ceil(file.size / 1024 / 1024) + 'MB')
                        if (file.size > size_limit * 1024 * 1024) {
                            console.log('GigaTester: Max upload file size ', size_limit + "MB")
                            GigaTester_modal.setNotifyStatus(`${'Media size is greater than ' + GigaTester_modal.configs.max_file_size + 'MB, Kindly delete and retry again'}`)
                            setTimeout(()=> GigaTester_modal.clearNotifyStatus(), 4000);
                        }
                        else{
                            this.submitPost(e);
                        }
                        }
                    else if(GigaTester_modal.form_type === "BUGS"){
                    if(this.form_data['category'] === 'category' || this.form_data['category'] === ''){
                        console.log('category')
                        GigaTester_modal.setNotifyStatus('Please select a category')
                        setTimeout(()=> GigaTester_modal.clearNotifyStatus(), 4000);
                    }
                    else if(this.form_data['severity'] === 'severity' || this.form_data['severity'] === ''){
                        console.log('severity')
                        GigaTester_modal.setNotifyStatus('Please select bug severity')
                        setTimeout(()=> GigaTester_modal.clearNotifyStatus(), 4000);
                    }
                    else{
                        this.submitPost(e);
                        }
                }
                 else if(GigaTester_modal.form_type === "FEEDBACK"){
                    if(this.form_data.rating < 1){
                        console.log('rating')
                        GigaTester_modal.setNotifyStatus('Please provide your rating')
                        setTimeout(()=> GigaTester_modal.clearNotifyStatus(), 4000);
                    }
                    else if(this.form_data['category'] === 'category' || this.form_data['category'] === ''){
                        console.log('category')
                        GigaTester_modal.setNotifyStatus('Please select a category')
                        setTimeout(()=> GigaTester_modal.clearNotifyStatus(), 4000);
                    }
                    else{
                        this.submitPost(e);
                        }
                    }
                },
                postMediaContent: function(dataInfo, fileSelected){
                    if($('gtdiv').hasClass('gigatester-ctrl-item-send-error')){
                        $(document.getElementsByClassName('gigatester-ctrl-item-send-error')).remove();
                    }
                    let send_button = this.custom_ui.events.find(".gigatester-ctrl-item-send");
                    send_button.addClass("gigatester-ctrl-item-send-loading")
                    console.log(dataInfo, 'dataInfo');
                    fetch(`${GigaTester.endpoint}/feedbackMedia/`, {
                        method: 'POST',
                        body:  JSON.stringify(dataInfo),
                        headers: { 'Content-Type': 'application/json' },
                      })
                        .then(res => res.json())
                        .then(data => {
                          let xhr = new XMLHttpRequest();
                          console.log('Success:', data);
                          xhr.onreadystatechange = function() {
                            if (xhr.readyState === 4) {
                              if (xhr.status === 200) {
                                console.log("UPLOAD SUCCESSFUL");
                                $("<gtdiv>").addClass("gigatester-ctrl-item-send-msg").text(GigaTester_StringRes.get("media_upload_success") + " " + GigaTester_StringRes.get("submitting_feedback")).insertAfter(send_button);
                                console.log('GigaTester: ', xhr.responseURL);
                                // send_button.addClass("gigatester-ctrl-item-send-loading")
                                if(xhr.responseURL.slice(56,64) === 'gt_image'){
                                // console.log(data.Key, "img");
                                GigaTester_modal.form_data.image_file = xhr.responseURL.split('?')[0];
                                console.log(xhr.responseURL.split('?')[0], 'img data')
                                GigaTester_modal.post();
                                }
                                else if(xhr.responseURL.slice(56,64) === 'gt_video'){
                                // console.log(data.Key, "vid");
                                GigaTester_modal.form_data.video_file = xhr.responseURL.split('?')[0]
                                GigaTester_modal.post();
                                }
                                else if(xhr.responseURL.slice(56,64) === 'gt_audio'){
                                // console.log(data.Key, "vid");
                                GigaTester_modal.form_data.audio_file = xhr.responseURL.split('?')[0]
                                GigaTester_modal.post();
                                }
                                else{
                                // console.log(data.Key, "file");
                                GigaTester_modal.form_data.external_file = xhr.responseURL.split('?')[0]
                                GigaTester_modal.post();
                                }
                              }
                            }
                            else {
                                console.log(xhr.status, 'GigaTester: Media post api error');
                                if (this.controls_step === 2) {
                                    send_button.removeClass("gigatester-ctrl-item-send-loading");
                                    send_button.removeClass("gigatester-ctrl-item-send-uploading");
                                    send_button.prop("disabled", false);
                                    $("<gtdiv>").addClass("gigatester-ctrl-item-send-error").text(GigaTester_StringRes.get("upload_media_error")).insertAfter(send_button)
                                }
                            }
                          };
                          xhr.onerror = function(){
                              console.log(xhr.status)
                              if (this.controls_step === 2) {
                                send_button.removeClass("gigatester-ctrl-item-send-loading");
                                send_button.removeClass("gigatester-ctrl-item-send-uploading");
                                send_button.prop("disabled", false);
                                $("<gtdiv>").addClass("gigatester-ctrl-item-send-error").text(GigaTester_StringRes.get("upload_media_error")).insertAfter(send_button)
                            }
                          }
                          xhr.upload.addEventListener("progress", function(evt) {
                            if (evt.lengthComputable) {
                                send_button.removeClass("gigatester-ctrl-item-send-loading");
                                send_button.width(send_button.width());
                                let percent = parseInt(evt.loaded / evt.total * 100, 10);
                                console.log(percent, evt)
                                send_button.find(".gigatester-ctrl-item-send-text").text(percent + "%");
                                send_button.find(".gigatester-ctrl-item-send-progress").width(percent + "%")
                            }
                        }, false)

                          xhr.open("PUT", data);
                          xhr.send(fileSelected);
                        })
                        .catch(error => {
                            console.log(error, 'post api error');
                            if (this.controls_step === 2) {
                                send_button.removeClass("gigatester-ctrl-item-send-loading");
                                send_button.removeClass("gigatester-ctrl-item-send-uploading");
                                send_button.prop("disabled", false);
                                $("<gtdiv>").addClass("gigatester-ctrl-item-send-error").text(GigaTester_StringRes.get("upload_media_error")).insertAfter(send_button)
                            }
                        })
                },
                post: function(){
                    let finalRating = 0;
                    let feedbackType='';
                    let form_settings = this.getFormSettings(this.form_type);
                    let comments = [];
                    let standardFeedback = [];
                    $.each(this.comments, function(key, comment) {
                        comments.push(comment.getGigaData())
                    });
                    console.log(comments, 'canvas comments')
                    let send_button = this.custom_ui.events.find(".gigatester-ctrl-item-send");
                    send_button.addClass("gigatester-ctrl-item-send-loading")
                    $(document.getElementById('gigatester-loader')).addClass("gigatester-ctrl-item-loader")
                    let completed_dialog_icon = ''
                    $('.gigatester-reason-checkboxes:checked').each(function () {
                        standardFeedback.push($(this).next("label").text());
                        console.log(standardFeedback);
                    });
                    if(parseInt(this.form_data.rating) > 0){
                        finalRating = parseInt(this.form_data.rating)
                        feedbackType = 'FEEDBACK'
                    }
                    else{
                        finalRating = 0;
                        feedbackType = 'BUG_REPORT'
                    }
                    if(this.form_data['category'] === "category"){
                        this.form_data['category'] = ''
                    }
                    if(this.form_data['severity'] === "severity"){
                        this.form_data['severity'] = ''
                    }
                    const postData = {
                        productRating: finalRating,
                        userName: this.custom_ui.events.find('input[name="email"]').val() ,
                        feedbackType: feedbackType,
                        feedbackCategory: this.form_data['category'],
                        bugPriority: this.form_data['severity'],
                        productVersion: GigaTester.productVersion,
                        platformName: platform.name,
                        platformVersion: platform.version,
                        platformOs: platform.os,
                        feedbackMedia: {
                          image: GigaTester_modal.form_data.image_file,
                          video: GigaTester_modal.form_data.video_file,
                          file: GigaTester_modal.form_data.external_file,
                          audio: GigaTester_modal.form_data.audio_file,
                        },
                          feedbackComments: { "generalComment" : this.form_data['description'], "standardFeedback" : standardFeedback , ...comments },
                          productKey: GigaTester.apiKey,
                          userDetails: GigaTester_modal.user_detail
                      }
                      console.log(postData, 'post Data')
                      fetch(`${GigaTester.endpoint}/feedback/`, {
                        method: 'POST',
                        body:  JSON.stringify(postData),
                        headers: { 'Content-Type': 'application/json' },
                      })
                        .then(res => res.json())
                        .then(data => {console.log(data)
                            let success_icon = $('<gtdiv class="gigatester-ctrl-item-send-success">').html('<gtdiv>' + "<gtspan>" + GigaTester_StringUtils.escapeSpecialChars(form_settings.completed_dialog_headline) + "</gtspan>" + "<p>" + GigaTester_StringUtils.escapeSpecialChars(form_settings.completed_dialog_paragraph, true) + "</p>" + "</gtdiv>" + (this.configs.display_powered_by ? "<gtfooter>" + "<span>Powered by</span>" + "<span>" + " Gigatester" + "</span>"  + "</gtfooter>" : ""));
                            this.custom_ui.events.append(success_icon);
                            this.controls_step = 3;
                            send_button.find(".gigatester-ctrl-item-send-text").text('Send feedback');
                            send_button.removeClass("gigatester-ctrl-item-send-loading");
                            this.recording = false;
                            $(document.getElementsByClassName('gigatester-dialog-scroll')).css('display', 'none');
                            let close_icon = $(document.getElementsByClassName('gigatester-ctrl-item-close'));
                            $(document.getElementsByClassName('gigatester-ctrl-item-r')).css('width','355px');
                            setTimeout(function () {
                                $(document.getElementsByClassName('gigatester-dialog-scroll')).css('display', 'block');
                                $(document.getElementById('gigatester-loader')).removeClass("gigatester-ctrl-item-loader")
                                close_icon.trigger("click")
                            }, 3000);
                        })
                        .catch(error => {
                            console.log(error, 'post api error');
                            if (this.controls_step === 2) {
                                send_button.removeClass("gigatester-ctrl-item-send-loading");
                                send_button.removeClass("gigatester-ctrl-item-send-uploading");
                                send_button.prop("disabled", false);
                                $("<gtdiv>").addClass("gigatester-ctrl-item-send-error").text(GigaTester_StringRes.get("form_submit_error")).insertAfter(send_button);
                            } else if (this.controls_step === 3) {
                                $("<gtdiv>").addClass("gigatester-ctrl-item-send-msg").text(GigaTester_StringRes.get("form_submit_error")).appendTo($('.gigatester-ctrl-item-send-success'));
                            }
                        })
                },
                submitPost: function(e){
                    e.preventDefault();
                    console.log('submit post')
                    if(GigaTester_modal.form_data.video_file){
                        GigaTester_modal.postMedia(GigaTester_modal.form_data.video_file);
                    }
                    else if(GigaTester_modal.form_data.audio_file){
                        GigaTester_modal.postMedia(GigaTester_modal.form_data.audio_file)
                    }
                    else if(GigaTester_modal.form_data.image_file){
                        GigaTester_modal.postMedia(GigaTester_modal.form_data.image_file)
                    }
                    else if(GigaTester_modal.form_data.external_file){
                        GigaTester_modal.postMedia(GigaTester_modal.form_data.external_file)
                    }
                    else{
                        GigaTester_modal.post()
                    }
                },
                closeEmptyCanvasComment: function() {
                    if (this.comments.length && this.comments[this.comments.length - 1].isEmpty()) {
                        this.comments[this.comments.length - 1].destroy();
                        this.comments.splice(this.comments.length - 1, 1)
                    }
                },
                canvasCommentStart: function(e) {
                    let pin_x, pin_y;
                    if (e.changedTouches && e.changedTouches.length) {
                        pin_x = e.changedTouches[0].offsetX; //e.changedTouches[0].pageX;
                        pin_y = e.changedTouches[0].offsetX; //e.changedTouches[0].pageY
                    } else {
                        pin_x = e.offsetX; //e.clientX;
                        pin_y = e.offsetY; //e.clientY;
                    }
                    if (this.comments.length && this.comments[this.comments.length - 1].isOpen()) {
                        this.comments[this.comments.length - 1].saveCanvasComments();
                        $.each(this.comments, function(index, comment) {
                            comment.hideForm()
                        });
                        this.addCanvasComment(pin_x, pin_y);
                        // console.log('add new comment')
                        GigaTester_modal.scrollDisable();
                    } else {
                        $.each(this.comments, function(index, comment) {
                            comment.hideForm()
                        });
                        this.addCanvasComment(pin_x, pin_y);
                        GigaTester_modal.scrollDisable();
                    }
                },
            }

        let GigaTester_Api = {
            isLoaded: function() {
                console.log('GigaTester: gigatester api call')
                fetch(`${GigaTester.endpoint}/feedbackConfig?apiKey=${GigaTester.apiKey}&version=${GigaTester.productVersion}`, {
                    method: 'GET',
                  })
                    .then(res => res.json())
                    .then(data => {
                        console.log('GigaTester: api data ', data);
                        GigaTester_modal.configs.categories = [];
                        GigaTester_modal.configs.severities = [];
                        GigaTester_modal.configs.workflow_type = "";
                        GigaTester_modal.configs.rating_limit = data[0].feedbackSettings.ratingLimit;
                        GigaTester_modal.configs.main_button_background_color = data[0].widgetLookAndFeel.bgColor;
                        GigaTester_modal.configs.main_button_text_color = data[0].widgetLookAndFeel.fgColor;
                        GigaTester_modal.configs.main_button_text = data[0].widgetLookAndFeel.text;
                        GigaTester_modal.form_settings_default['FEEDBACK'].rating_type= data[0].feedbackSettings.ratingIcon;
                        GigaTester_modal.form_settings_default['BUGS'].bug_title_message = data[0].bugSettings.title;
                        GigaTester_modal.form_settings_default['FEEDBACK'].rating_title_message = data[0].feedbackSettings.title;
                        GigaTester_modal.configs.title = data[0].title;
                        GigaTester_modal.configs.screen_record_time = data[0].videoAudioMaxDuration * 60;
                        GigaTester_modal.configs.audio_time = data[0].videoAudioMaxDuration * 60;
                        GigaTester_modal.configs.max_file_size = data[0].uploadFileMaxSize;
                        // data[0].feedbackTypes.map(item => {
                        //         GigaTester_modal.configs.workflow_type += item
                        //         GigaTester_modal.configs.workflow_type + ','

                        // })
                        if(data[0].invokeOn[0] === "AFTER_DELAY"){
                            setTimeout(() => {
                                GigaTester_modal.popOutDialog();
                            }, data[0].invokeDelay * 60 * 1000)
                        }
                        GigaTester_modal.configs.config_data = data;
                        if(GigaTester_modal.form_type === "BUGS"){
                            let category = data[0].bugSettings.categories;
                            category.map(item => {
                                console.log(item.name)
                            GigaTester_modal.configs.categories.push(item.name.trim())
                            // console.log(item.feedbacks)
                            })
                        }
                        else if(GigaTester_modal.form_type === "FEEDBACK"){
                            let category = data[0].feedbackSettings.categories;
                            category.map(item => {
                                // console.log(item.name)
                            GigaTester_modal.configs.categories.push(item.name.trim());
                            // console.log(item.feedbacks)
                            })
                        }
                        data[0].bugSettings.severities.map(item => {
                            GigaTester_modal.configs.severities.push(item);
                        })
                        GigaTester_modal.addFeedbackButton();
                        })
                        .catch(function(err) {
                            console.log(err , 'err')
                            /* handle the error */
                        })
                return true
            },
            start: function() {
                GigaTester_modal.init.call(GigaTester_modal);
                console.log('js api');
            },
            destroy: function() {
                if (GigaTester_modal.custom_ui && GigaTester_modal.custom_ui.element) {
                    GigaTester_modal.custom_ui.element.remove()
                }
                GigaTester.Event_Recorder.stop();
                GigaTester.Console_Recorder.stop();
                $("link.gigatester-css").remove();
                $("script#gigatester-sdk").remove();
                delete window.GigaTester
            },
            open: function(mode) {
                console.log('js api open');
                console.log(mode)
                GigaTester_modal.openControls();
            },
            close: function() {
                GigaTester_modal.reset();
            },
            show: function() {
                GigaTester_modal.custom_ui.element.css("display", "")
            },
            hide: function() {
                GigaTester_modal.reset();
                GigaTester_modal.custom_ui.element.hide()
            },
            setEmail: function(email) {
                console.log(email);
                if (typeof email === "string") {
                    GigaTester_modal.form_data.email = $.trim(email)
                    console.log(email);
                    // GigaTester_modal.form_settings_default.BUGS.email_field_disable = true;
                    // GigaTester_modal.form_settings_default.FEEDBACK.email_field_disable = true;
                }
            },
            setUserDetails: function(userData){
                console.log(userData)
                if(typeof userData === "object"){
                console.log('gigatester userdetails ' + userData)
                Object.entries(userData).forEach(([key, val]) => {
                    if(key.trim().toLowerCase() == "email"){
                        GigaTester.setEmail(val)
                    }
                    console.log(key.trim().toLowerCase(), val);
                  });
                GigaTester_modal.user_detail = userData
                sessionStorage.setItem('gigatesterDefaultUserDetails', JSON.stringify(userData))
                }
            },
            setName: function(name) {
                if (typeof name === "string") {
                    GigaTester_modal.name = $.trim(name)
                }
            },
            setDefaultCategory: function(category, params) {
                if (typeof category === "string" && typeof params === "string") {
                    let defaultCategory = category;
                    console.log('GigaTester: defaultCategory ', defaultCategory)
                    console.log('GigaTester: defaultCategory ', params.trim())
                    let category_feedback_counter = false;
                    let category_bug_counter = false;
                    if(params.trim().toUpperCase() === "BUGS"){
                        GigaTester_modal.configs.config_data[0].bugSettings.categories.map(value => {
                            // console.log('GigaTester: bug category api value', value)
                            if(value.name.trim() === defaultCategory.trim()){
                                category_feedback_counter = true;
                                console.log('GigaTester: category selected ' + defaultCategory);
                                GigaTester_modal.configs.bugs_default_category = defaultCategory;
                                GigaTester_modal.form_data['category'] = defaultCategory;
                                sessionStorage.setItem('gigatesterDefaultBugsCategory', defaultCategory)
                            }
                        })
                        if(!category_feedback_counter){
                            GigaTester_modal.form_data['category'] = 'category';
                        }
                    }
                    else if(params.trim().toUpperCase() === "FEEDBACK"){
                        GigaTester_modal.configs.config_data[0].feedbackSettings.categories.map(value => {
                            if(value.name.trim() === defaultCategory.trim()){
                                category_bug_counter = true;
                                console.log('GigaTester: category selected ' + defaultCategory);
                                GigaTester_modal.configs.feedback_default_category = defaultCategory;
                                GigaTester_modal.form_data['category'] = defaultCategory;
                                sessionStorage.setItem('gigatesterDefaultFeedbackCategory', defaultCategory)
                            }
                        })
                        if(!category_bug_counter){
                            GigaTester_modal.form_data['category'] = 'category';
                        }
                    }
                    else{
                        console.log('GigaTester: Error at parameter string match');
                        GigaTester_modal.form_data['category'] = 'category';
                        }
                }
            },
            // unSavedChanges: function() {
            //     return GigaTester_modal.unSavedChanges()
            // },
            }
        window.GigaTester = $.extend(window.GigaTester, GigaTester_Api);
        $(document).ready($.proxy(GigaTester_modal.init, GigaTester_modal))
    })(JQ);
    }catch(err){
            console.log(err, 'err')
        }
}
}
function checkgigatester(){
    if(typeof window.jQuery === "undefined" || typeof window.html2canvas === "undefined" || typeof window.platform === "undefined" ||  typeof window.Snap === "undefined"){
        setTimeout(() => {
            checkgigatester();
            console.log('GigaTester: inside giga timeout function')
        }, 200);
    }
    else{
        console.log('inside giga timeout outside')
        gigatester();
    }
}
checkgigatester()

if (typeof _temp_$ !== "undefined" && _temp_$) {
    window.$ = _temp_$
}
if (typeof _temp_jQuery !== "undefined" && _temp_jQuery) {
    window.jQuery = _temp_jQuery
}
})();