//All the strings that are displayed in the UI and may need to be internationalized
//Currently only 'en' locale is supported
const GigaTester_StringRes = {
    locale: "en",
    en: {
        report_bug: "Report Bug",
        report_bug_msg: "Tell us what failed",
        give_feedback: "Give Feedback",
        give_feedback_msg: "Tell what you liked or disliked",
        draw_hint: "Click & drag to draw or click to add a comment",
        capture_screen_recording: "Screen Recorder",
        capture_audio: "Capture audio",
        attach_screenshot: "Screenshot",
        attach_file: "Attach a file",
        attachment_msg: "Click the buttons below to include an attachment",
        your_email: "Your email",
        select_category: "Select a category *",
        select_severity: "Choose severity *",
        your_comment: "Provide your comments *",
        screenshot_attached: "Screenshot attached",
        send: "Send feedback",
        close: "Close",
        rectangle: "Draw Rectangle",
        blackout: "Blackout",
        capture: "Capture",
        capture_screenshot: "Capture screenshot",
        save: "Save",
        delete: "Delete",
        add_comment: "Type your comment",
        cancel: "Cancel",
        unsaved_changes: "You have unsaved changes",
        confirm_close: "Are you sure that you want to close?",
        discard: "Discard",
        start_recording: "Start recording",
        screen_recording: "Screen recording",
        recording_mute: "Turn off microphone",
        recording_unmute: "Turn on microphone",
        recording_pause: "Pause",
        recording_resume: "Resume",
        recording_finish: "Finish recording",
        remaining_time: "Remaining Time",
        ok: "OK",
        media_upload_success: "Media uploaded successfuly.",
        submitting_feedback: "Submitting feedback form.",
        upload_media_error: "Error uploading media. Please try again.",
        form_submit_error: "Error submitting feedback form. Please try again."
    },
    setLang: function(locale) {
        this.locale = locale
    },
    get: function(key, include_fallback) {
        if (!GigaTester_StringRes[GigaTester_StringRes.locale]) {
            GigaTester_StringRes.locale = "en"
        }
        if (GigaTester_StringRes[GigaTester_StringRes.locale][key]) {
            return GigaTester_StringRes[GigaTester_StringRes.locale][key]
        } else {
            if (include_fallback) {
                return GigaTester_StringRes["en"][key] || ""
            } else {
                return ""
            }
        }
    }
};

module.exports = GigaTester_StringRes;
