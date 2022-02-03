let Comment = function(options) {
    "use strict";
    this.x = options.x;
    this.y = options.y;
    this.scroll_t = options.scroll_t;
    this.scroll_l = options.scroll_l;
    this.offset_x = options.offset_x;
    this.offset_y = options.offset_y;
    this.counter = options.counter;
    this.screenshot_num = options.screenshot_num;
    this.onDelete = options.onDelete;
    this.onOpen = options.onOpen;
    this.is_new = true;
    var element = $("<div>").addClass("gigatester-comment")
    // .attr("data-html2canvas-ignore", "true");
    var comment_message = "";
    element.on("click mouseup mousedown", function(e) {
        e.stopPropagation()
    });
    this._getHTML = function() {
        return '<div class="gigatester-comment-pin"><span>' + (this.counter + 1) + "</span></div>" + '<form class="gigatester-comment-form">' + '<gtcomment class="gtmousescroll" contenteditable="true" data-ph="' + Lang.get("add_your_comment_here") + '" gramm_editor="false"></gtcomment>' + '<btn class="gigatester-button-input gigatester-button-input-save">' + Lang.get("save") + "</btn>" + '<btn class="gigatester-comment-form-delete" title="' + Lang.get("delete") + '">' + Svg_Icons.trash + "</btn>" + '<btn class="gigatester-comment-form-close" title="' + Lang.get("close") + '">' + Svg_Icons.times + "</btn>" + "</form>"
    };
    this.isOpen = function() {
        return element.find(".gigatester-comment-form").is(":visible")
    };
    this.isEmpty = function() {
        return comment_message ? false : true
    };
    this.setCounter = function(counter) {
        this.counter = counter;
        element.find(".gigatester-comment-pin > span").text(counter + 1)
    };
    this.submit = function() {
        element.find(".gigatester-button-input").click()
    }, this.show = function() {
        element.show()
    };
    this.hide = function() {
        element.hide()
    };
    this.showForm = function() {
        element.find(".gigatester-comment-form").show();
        element.find("gtcomment").html(Lib.htmlEntities(comment_message, true)).focus()
    };
    this.hideForm = function() {
        element.find(".gigatester-comment-form-delete").show();
        element.find(".gigatester-comment-form").hide()
    };
    this.setPosition = function(x, y) {
        element.find(".gigatester-button-input-save").trigger('click');
        // this.x = x;
        // this.y = y;
        // this.setFormDirection();
        // element.css({
        //     top: this.y,
        //     left: this.x
        // })
        console.log('set position')
       
    };
    this.setFormDirection = function() {
        var is_mobile = false;
        // Feedback.isMobile();
        var form_width = is_mobile ? 210 : 430;
        var form_height = is_mobile ? 150 : 200;
        if (is_mobile) {
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
        element.html(this._getHTML());
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
                var text = (e.originalEvent || e).clipboardData.getData("text/plain");
                document.execCommand("insertText", false, text)
            } catch (e) {}
        });
        element.find(".gigatester-button-input-save").on("click", function(e) {
            comment_message = element.find("gtcomment").html();
            comment_message = comment_message.replace(/<br\/?>/gi, "\n");
            comment_message = comment_message.replace(/(<([^>]+)>)/gi, "");
            comment_message = comment_message.replace(/&nbsp;/gi, " ");
            comment_message = comment_message.replace(/&lt;/gi, "<");
            comment_message = comment_message.replace(/&gt;/gi, ">");
            comment_message = comment_message.replace(/&amp;/gi, "&");
            comment_message = comment_message.replace(/&quot;/gi, '"');
            comment_message = comment_message.trim();
            if (!comment_message) {
                return
            }
            this.is_new = false;
            this.hideForm()
        }.bind(this));
        element.appendTo($(document.body));
        // element.find("gtcomment").on('mouseleave', function(){
            if(element.find("gtcomment").text()){
                console.log(element.find("gtcomment").text())
            element.find(".gigatester-button-input-save").trigger('click');
            }
        // })
        element.find("gtcomment").val('').trigger('focus').val(comment_message);
    };
    this.getData = function() {
        var screen_x = parseInt(this.x - this.scroll_l - this.offset_x, 10);
        var screen_y = parseInt(this.y - this.scroll_t - this.offset_y, 10);
        return {
            screen_x: screen_x,
            screen_y: screen_y,
            screen_number: this.counter + 1,
            screenshot_num: this.screenshot_num,
            message: comment_message
        }
    };
    this.destroy = function() {
        element.remove();
        element = undefined;
        comment_message = ""
    }
};

export default Comment;