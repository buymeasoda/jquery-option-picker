var assert = buster.assert;

buster.testCase('jQuery optionPicker', {
    
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