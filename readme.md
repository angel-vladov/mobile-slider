# Mobile Slider [![Build Status](https://travis-ci.org/angel-vladov/mobile-slider.svg?branch=master)](https://travis-ci.org/angel-vladov/mobile-slider)

> Converts a list of items into a slider (carousel) when viewed on mobile devices.


## Getting Started

Download the [production version][min] or the [development version][max]. Download the [styles][styles].

[min]: https://raw.githubusercontent.com/angel-vladov/mobile-slider/master/dist/jquery.mobile-slider.min.js
[max]: https://raw.githubusercontent.com/angel-vladov/mobile-slider/master/dist/jquery.mobile-slider.js
[styles]: https://raw.githubusercontent.com/angel-vladov/mobile-slider/master/dist/jquery.mobile-slider.css

In your web page import the javascript file and the stylesheet that come with the plugin:

```html
<link href="dist/jquery.mobile-slider.css" rel="stylesheet" type="text/css">

<script src="jquery.js"></script>
<script src="dist/jquery.mobile-slider.min.js"></script>

<script type="application/javascript">
  $(document).ready(function ($) {
    $('.my-slider').mobileSlider(); // "Attach the mobile slider"
  });
</script>
```

####Install with Bower
`bower install mobile-slider`

### Markup

Mobile Slider requires the following markup structure:

```html
<div class="mobile-slider">
    <ul>
        <li>...</li>
        <li>...</li>
        <li>...</li>
        ...
    </ul>
</div>
```

Where:
* The wrapper `div` is the element on which the slider will be applied.
* `ul` will be the viewport which will scroll horizontally.
* `li` are the items in the slider. They must have a fixed width. There are no limitation on the content.

You can find **examples** in the examples folder.

### Usage

* The plugin will be attached automatically on all elements that have `.mobile-slider` class. You can use attributes to set options values. 
Prefixing attributes with _"data-"_ is optional. All the options can be passed as attributes.
Example:  

```html
<div class="mobile-slider" data-item-width="220">
    <ul>
        <li>Slide 1</li>
        <li>Slide 2</li>
        <li>Slide 3</li>
        <li>Slide 4</li>
        <li>Slide 5</li>
    </ul>
</div>
```

* You can also attach the plugin manually using javascript. `.mobile-slider` class will be attached for you by the plugin.
Example:  

```html
<div id="my-slider">
    <ul>
        <li>Slide 1</li>
        <li>Slide 2</li>
        <li>Slide 3</li>
        <li>Slide 4</li>
        <li>Slide 5</li>
    </ul>
</div>

<script type="application/javascript">
    $('#my-slider').mobileSlider({
    	itemWidth: 220
    });
</script>
```

### Options

_All options can be passed as an html attribute by splitting the lowerCamelCase and adding a hyphen._

Supported options:
#### sliderWhen

Type: `number`  
Default: `1024`  

Min window width needed for the mobile slider to apply and change the layout of the element it's applied to. Nothing will happen if the browser window is wider than `sliderWhen` width _(1024px with default value)_.
You can use `sliderWhen` and change the breakpoint depending on your design. For example f you want the slider to apply only for mobilePhones and not tablets you can set the value to 480px.

#### itemWidth

Type: `number` or `string`  
Example: `260`, `"260px"`, `"4.2em"`, `"80%"`  

If you need a specific width to be set on each list item when the mobile slider is active you can use this option. Numeric values are in pixels. If you need a value in em or percents pass a string.

### startAt
Type: `number`, `string` or `function`
Default: `middle`

By default the slider start with the middle item center on screen. You can change that with this property. The matched item will be centered inside the slider.

* `"first"` - First item will be centered
* `"last"` - Last item will be centered
* `"middle"` - Middle element will be centered (_default value_)
* Numeric value - Item index
* `function(sliderOptions, itemsCount)` - Function with 2 params slider options and itemsCount. Should return a valid item index

#### container

Type: `jQuery`, `DOM Element`, a `string` selector    
Default: `window`  

The plugin will use this selector/element width and check it against `itemWidth` in order to determine when the slider should be active.



## License

MIT
