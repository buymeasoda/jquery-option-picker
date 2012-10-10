var assert = buster.assert;

buster.testCase('jQuery optionPicker', {
    
    'Single optionPicker': {

        setUp: function () {
            this.select = $('select').eq(1);
            this.options = this.select.find('option');
            this.optionPicker = this.select.optionPicker().data('sodaOptionPicker');
        },

        'exists on the jQuery prototype': function () {
            assert.defined($.fn.optionPicker);
            assert.isFunction($.fn.optionPicker);
        },

        'returns an optionPicker instance object when called via jQuery': function () {
            assert.isObject(this.optionPicker);
            assert(this.optionPicker instanceof this.optionPicker.constructor);
        },

        'only creates one optionPicker instance when called multiple times': function () {
            assert.same(this.optionPicker, this.select.data('sodaOptionPicker'));
            assert.same(this.optionPicker, this.select.optionPicker().data('sodaOptionPicker'));
            assert.same(this.select.data('sodaOptionPicker'), this.select.optionPicker().data('sodaOptionPicker'));
        },

        'calling the set method selects the correct option': function () {
            this.optionPicker.set(0);
            assert.equals(this.select.prop('selectedIndex'), 0);
            this.optionPicker.set(2);
            assert.equals(this.select.prop('selectedIndex'), 2);
            this.optionPicker.set(this.options.length - 1);
            assert.equals(this.select.prop('selectedIndex'), 4);
        },

        'calling set with out of bounds numbers does not change selected option': function () {
            this.optionPicker.set(2);
            assert.equals(this.select.prop('selectedIndex'), 2);
            this.optionPicker.set(22);
            assert.equals(this.select.prop('selectedIndex'), 2);
            this.optionPicker.set(-15);
            assert.equals(this.select.prop('selectedIndex'), 2);
            this.optionPicker.set('fail');
            assert.equals(this.select.prop('selectedIndex'), 2);
        },

        'label text matches the selected option text': function () {
            assert.equals(this.optionPicker.el.value.text(), 'Apple');
            this.optionPicker.increment();
            assert.equals(this.optionPicker.el.value.text(), 'Orange');
            this.optionPicker.el.increment.trigger('touchstart').trigger('click');
            assert.equals(this.optionPicker.el.value.text(), 'Banana');
            this.optionPicker.el.decrement.trigger('touchstart').trigger('click');
            assert.equals(this.optionPicker.el.value.text(), 'Orange');
            this.optionPicker.decrement();
            assert.equals(this.optionPicker.el.value.text(), 'Apple');
        },

        'decrementing the first option keeps the first option selected': function () {
            this.optionPicker.set(0);
            assert.equals(this.select.val(), 'apple');
            this.optionPicker.decrement();
            assert.equals(this.select.val(), 'apple');
            this.optionPicker.el.decrement.trigger('touchstart').trigger('click');
            assert.equals(this.select.val(), 'apple');
        },

        'incrementing the last option keeps the last option selected': function () {
            this.optionPicker.set(this.options.length - 1);
            assert.equals(this.select.val(), 'strawberry');
            this.optionPicker.increment();
            assert.equals(this.select.val(), 'strawberry');
            this.optionPicker.el.increment.trigger('touchstart').trigger('click');
            assert.equals(this.select.val(), 'strawberry');
        },

        'buttons have disabled class when first and last options are reached': function () {
            this.optionPicker.set(0);
            assert(this.optionPicker.el.decrement.hasClass('option-picker-disabled'));
            refute(this.optionPicker.el.increment.hasClass('option-picker-disabled'));
            this.optionPicker.increment();
            refute(this.optionPicker.el.increment.hasClass('option-picker-disabled'));
            refute(this.optionPicker.el.decrement.hasClass('option-picker-disabled'));
            this.optionPicker.set(this.options.length - 1);
            refute(this.optionPicker.el.decrement.hasClass('option-picker-disabled'));
            assert(this.optionPicker.el.increment.hasClass('option-picker-disabled'));
        },

        'the widget HTML is created correctly': function () {
            assert.equals(this.optionPicker.widget.html(), '<div class="option-picker-decrement option-picker-disabled">-</div><div class="option-picker-increment">+</div><div class="option-picker-value">Apple</div>');
        },

        '//is fully tested': function () {
            assert(false);
        }

    }

});