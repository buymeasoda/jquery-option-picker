(function ($) {

    function OptionPicker(selectElement, settings) {
        this.settings = settings;
        this.selectElement = $(selectElement);
        this.optionElements = $('option', this.selectElement);
        this.selectSize = this.optionElements.length;
        if (this.settings && this.selectElement && this.selectSize > 0) {
            this.init();
        }
    }

    $.extend(OptionPicker.prototype, {
        init: function () {
            this.nodes = {};
            $.each(['container', 'increment', 'value', 'decrement'], $.proxy(function (i, name) {
                this.nodes[name] = $(this.settings[name + 'HTML']);
                this.nodes[name].addClass(this.settings.cssClass + '-' + name);
                if (name !== 'container') {
                    this.nodes.container.append(this.nodes[name]);
                }
            }, this));
            this.nodes.increment.on('click', $.proxy(this.increment, this));
            this.nodes.decrement.on('click', $.proxy(this.decrement, this));
            this.set(this.selectElement.prop('selectedIndex'));
            this.selectElement.hide().after(this.nodes.container);
        },
        set: function (index) {
            if (index >= 0 && index < this.selectSize) {
                this.selectElement.prop('selectedIndex', index);
                this.nodes.decrement.toggleClass(this.settings.cssClass + '-disabled', index === 0);
                this.nodes.increment.toggleClass(this.settings.cssClass + '-disabled', index === this.selectSize - 1);
                this.nodes.value.text(this.optionElements.eq(index).text());
            }
        },
        increment: function () {
            this.set(this.selectElement.prop('selectedIndex') + 1);
        },
        decrement: function () {
            this.set(this.selectElement.prop('selectedIndex') - 1);
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
        containerHTML: '<div></div>',
        incrementHTML: '<div>+</div>',
        decrementHTML: '<div>-</div>',
        valueHTML: '<div></div>'
    };
    
}(jQuery));