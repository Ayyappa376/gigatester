const Lang = {
    language: "en",
    en: {
        draw_on_the_screen: "Draw on screen",
        draw_on_the_screen_help: "Give feedback with a screenshot",
        capture_video: "Capture video",
        capture_audio: "Capture audio",
        capture_video_help: "Give feedback with a screen recording",
        stop_video_recording: " Stop Video Recording ",
        general_feedback: "General feedback",
        general_feedback_help: "Give general feedback of this page",
        report_bug: "Report a bug",
        report_bug_help: "Let us know what's broken",
        feature_request: "Feature request",
        feature_request_help: "Tell us how we can improve",
        contact_us: "Contact us",
        contact_us_help: "Get in touch with us",
        view_other_feedback: "View existing feedback",
        view_other_feedback_help: "See what's already been submitted",
        your_name: "Your name",
        your_email_address: "Your email address *",
        feedback_title: "Add a title",
        select_a_category: "Select a category *",
        select_a_reason: "Select a reason *",
        select_a_severity: "Choose severity *",
        assign_to: "Assign to",
        leave_us_your_comment: "Leave us your comment *",
        attach_a_screenshot: "Screenshot",
        screenshot_attached: "screenshot",
        send: "Send feedback",
        back: "back",
        remove: "Remove",
        close: "Close",
        next: "Next",
        capture: "Capture",
        send_success: "Thanks for the feedback!",
        highlight: "Highlight",
        blackout: "Blackout",
        pencil: "Pencil",
        line: "Line",
        arrow: "Arrow",
        add_a_comment: "Add a comment",
        capture_screenshot: "Capture screenshot",
        save: "Save",
        delete: "delete",
        add_your_comment_here: "Enter your comment...",
        attach_a_file: "Attach a file",
        file_format_not_supported: "File format not supported",
        max: "Max",
        open_feedback: "feedback",
        search: "Search...",
        cancel: "Cancel",
        feedback_not_found: "Oops, no feedback could be found.",
        feedback_type_all: "All",
        feedback_type_general: "General",
        feedback_type_screenshot: "Screenshot",
        feedback_type_video: "Video",
        this_page_only: "This page only",
        want_to_leave: "You have unsaved changes",
        changes_not_saved: "Are you sure that you want to close?",
        discard: "Discard",
        start_recording: "Start recording",
        screen_recording: "Screen recording",
        recording_mute: "Turn off microphone",
        recording_unmute: "Turn on microphone",
        recording_pause: "Pause",
        recording_resume: "Resume",
        recording_draw: "Draw",
        recording_finish: "Finish recording",
        video_not_supported: "Video recording is not supported",
        video_requires_https: "A secure HTTPS connection is required for video recording.",
        ok: "OK"            
    },
    setLang: function(language) {
        this.language = language
    },
    get: function(key, include_fallback) {
        if (!Lang[Lang.language]) {
            Lang.language = "en"
        }
        if (Lang[Lang.language][key]) {
            return Lang[Lang.language][key]
        } else {
            if (include_fallback) {
                return Lang["en"][key] || ""
            } else {
                return ""
            }
        }
    }
};

export default Lang;