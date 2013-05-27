(function ($) {

    function OptionPicker(select, settings) {
        this.settings = settings;
        this.el = {
            select: $(select),
            options: $('option', select)
        };
        this.size = this.el.options.length;
        if (this.settings && this.size) {
            this.init();
        }
    }

    $.extend(OptionPicker.prototype, {
        init: function () {
            var eventType = ('ontouchstart' in window) ? 'touchstart' : 'click';
            $.each(['container', 'decrement', 'increment', 'value'], $.proxy(function (i, name) {
                this.el[name] = $(this.settings.template[name]);
                this.el[name].addClass(this.settings.cssClass + '-' + name);
                if (name !== 'container') {
                    this.el.container.append(this.el[name]);
                }
            }, this));
            this.widget = this.el.container;
            this.el.increment.on(eventType, $.proxy(this.increment, this));
            this.el.decrement.on(eventType, $.proxy(this.decrement, this));
            this.update(this.el.select.prop('selectedIndex'));
            this.el.select.on('change', $.proxy(this.change, this));
            this.el.select.hide().after(this.el.container);
        },
        update: function (index) {
            this.el.decrement.toggleClass(this.settings.cssClass + '-disabled', index === 0);
            this.el.increment.toggleClass(this.settings.cssClass + '-disabled', index === this.size - 1);
            this.el.value.text(this.el.options.eq(index).text());
        },
        set: function (index) {
            if (index >= 0 && index < this.size) {
                this.el.select.prop('selectedIndex', index);
                this.update(index);
                this.optionPickerTriggered = true;
                this.el.select.trigger('change');
                this.optionPickerTriggered = false;
            }
        },
        increment: function () {
            this.set(this.el.select.prop('selectedIndex') + 1);
        },
        decrement: function () {
            this.set(this.el.select.prop('selectedIndex') - 1);
        },
        change: function () {
            if (!this.optionPickerTriggered) {
                this.update(this.el.select.prop('selectedIndex'));
            }
        }
    });

    $.fn.optionPicker = function (options) {
        var settings = $.extend({}, $.fn.optionPicker.defaults, options);
        return this.each(function () {
            if (!$.data(this, 'sodaOptionPicker')) {
                $.data(this, 'sodaOptionPicker', new OptionPicker(this, settings));
            }
        });
    };

    $.fn.optionPicker.defaults = {
        cssClass: 'option-picker',
        template: {
            container: '<div></div>',
            increment: '<div>+</div>',
            decrement: '<div>-</div>',
            value: '<div></div>'
        }
    };
    
}(jQuery));