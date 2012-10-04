# jQuery Option Picker Plugin

The jQuery option picker plugin turns a normal select element into an increment / decrement option picker.

When invoked, the generated UI widget replaces the matched select elements, as the means for the user to interact with the data from the original select list.

## How it works

The option picker is a progressive enhancement UI component that delegates all user action back to the original select element. Incrementing or decrementing the option picker item changes the selected index for the select element.

When enhancing forms with an option picker, the server side and client side implementations for handling and validating the select element remains the same. The original select element remains in the form and is included when submitted.

## When to use

The option picker is practical for UI data entry scenarios that involve numbers, sequential items, or a list of options that makes sense to walk through incrementally. It is also useful for touch based interfaces.

# Instructions

## Setup

For a quick start on how to use the plugin, take a look at the demo file.

The HTML required to bootstrap the option picker is a standard select element, such as:

    <select>
        <option value="1" selected>1 item</option>
        <option value="2">2 items</option>
        <option value="3">3 items</option>
        <option value="4">4 items</option>
    </select>

Along with jQuery, include the `jquery.optionPicker.js` file in your page and some CSS styling for the option picker UI widget. For example styling, see the included `optionPicker.css` file in the demo.

## Usage

To create a standard option picker using default values, invoke the plugin on a set of one of more select elements:

    $('select').optionPicker();

To override specific options for a single instance, pass in an object of options:

    $('select').optionPicker({
        cssClass: 'my-picker'
    });

To set the global defaults for all new instances, override the plugin defaults object:

    $.fn.optionPicker.defaults = {
        cssClass: 'my-picker',
        incrementHTML: '<span>Add</span>',
        decrementHTML: '<span>Remove</span>'
    };

## Options

Configurable options are the CSS prefix that will be applied to all widget generated class names, and the HTML associated with the different parts of the rendered widget, including the increment / decrement buttons.

Configurable options and their default values:

* cssClass `option-picker`
* containerHTML `<div></div>`
* incrementHTML `<div>+</div>`
* decrementHTML `<div>-</div>`
* valueHTML  `<div></div>`

## Advanced usage

The instance object for an option picker element can be retrieved using the `.data()` method with the property name `sodaOptionPicker`.

For example, to return and store a reference:

    var myOptionPicker = $('.my-select').data('sodaOptionPicker');

Storing a reference allows you to call option picker methods programmatically, such as:

    // Increment the choice
    myOptionPicker.increment();

    // Decrement the choice
    myOptionPicker.decrement();

    // Set the third option as selected
    myOptionPicker.set(2);

Available methods (and their arguments), are as follows:

* increment `none`
* decrement `none`
* set `integer` - Specify the index of the item to set as selected 