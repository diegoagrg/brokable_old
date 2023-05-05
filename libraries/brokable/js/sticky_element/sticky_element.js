class sticky_element {
    constructor(selector, start = 0, end = null, t = 0, l = 0) {
        this.top        = t;
        this.left       = l;
        this.element    = jQuery(selector);
        this.start      = start;
        this.end        = end;
        this.set_events();
    }

    set_events = function () {
        var entity = this;
        jQuery(window).scroll(function () {
            entity.toggle_fix();
        });
    }

    toggle_fix = function () {
        var position = jQuery(window).scrollTop();
        var start    = this.start;
        var end      = this.end;
        if (end == null) {
            end = jQuery('body').height();
        }
        if (position > start && position < end) {
            this.position('fixed', this.top, this.left);
        }
        else {
            this.position();
        }
    }

    position = function (p = '', t = '', l = '') {
        this.element.css({
            position:   p,
            top:        t,
            left:       l
        });
    }
}

