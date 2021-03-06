//All the strings that are displayed in the UI and may need to be internationalized
//Currently only 'en' locale is supported
const GigaTester_StringRes = {
    locale: "en",
    en: {
        report_bug: "Report Issue",
        report_bug_msg: "Tell us your concern",
        give_feedback: "Give Feedback",
        give_feedback_msg: "Tell us your experience",
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
        rectangle: "Mark an area in screenshot",
        blackout: "Hide an area in screenshot",
        color_palette: "choose color",
        capture: "Capture",
        capture_screenshot: "Attach annoted screenshot to feedback",
        discard_screenshot: "Discard screenshot",
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
        form_submit_error: "Error submitting feedback form. Please try again.",
        thank_you_text: "Thank You!",
        thank_you_bug_msg: "We will resolve your concern.",
        thank_you_feedback_msg: "We appreciate your feedback."
    },
    setLocale: function(locale) {
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
