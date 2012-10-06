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
            $.each(['container', 'increment', 'value', 'decrement'], $.proxy(function (i, name) {
                this.el[name] = $(this.settings.template[name]);
                this.el[name].addClass(this.settings.cssClass + '-' + name);
                if (name !== 'container') {
                    this.el.container.append(this.el[name]);
                }
            }, this));
            this.el.increment.on('click', $.proxy(this.increment, this));
            this.el.decrement.on('click', $.proxy(this.decrement, this));
            this.set(this.el.select.prop('selectedIndex'));
            this.el.select.hide().after(this.el.container);
        },
        set: function (index) {
            if (index >= 0 && index < this.size) {
                this.el.select.prop('selectedIndex', index);
                this.el.decrement.toggleClass(this.settings.cssClass + '-disabled', index === 0);
                this.el.increment.toggleClass(this.settings.cssClass + '-disabled', index === this.size - 1);
                this.el.value.text(this.el.options.eq(index).text());
            }
        },
        increment: function () {
            this.set(this.el.select.prop('selectedIndex') + 1);
        },
        decrement: function () {
            this.set(this.el.select.prop('selectedIndex') - 1);
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