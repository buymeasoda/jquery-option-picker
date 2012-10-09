var assert = buster.assert;

buster.testCase('jQuery optionPicker', {
    
    setUp: function () {
        this.select = $('select');
        this.optionPicker = this.select.optionPicker().data('sodaOptionPicker');
    },

    'exists on the jQuery prototype': function () {
        assert.isFunction($.fn.optionPicker);
    },

    'returns an object when called via jQuery': function () {
        assert.isObject($().optionPicker());
    },

    '//is fully tested': function () {
        assert(false);
    }

});