# Mobile Slider

> Convert a list of items into a slider (carousel) when viewed on mobile devices.


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


### Options

You can pass options to the mobile slider by using html attributes or via an object.

_Using an object:_ 
```javascript
$('.my-slider').mobileSlider({
    itemWidth: 260,
    sliderWhen: 1024
});
```

_Using attributes:_
```html
<div class="mobile-slider" data-item-width="260" data-slider-when="1024">
```
Prefixing attributes with _"data-"_ is optional. 
All the options can be passed as attributes.

Supported options:
#### sliderWhen

Type: `number`  
Default: `1024`  

Min window width needed for the mobile slider to apply and change the layout of the element it's applied to. Nothing will happen if the browser window is wider than `sliderWhen` width _(1024px with default value)_.

#### itemWidth

Type: `number` or `string`  
Example: `260`, `"260px"`, `"4.2em"`, `"80%"`  

If you need a specific width to be set on each list item when the mobile slider is active you can use this option. Numeric values are in pixels. If you need a value in em or percents pass a string.

#### container

Type: `jQuery`, `DOM Element`, a `string` selector    
Default: `window`  

The plugin will use this selector/element width and check it against `itemWidth` in order to determine when the slider should be active.

### Usage

* The plugin will be attached automatically on all elements that have `.mobile-slider` class. You can use attributes to set options values.
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

* You can also attach the plugin manually using javascript. `.mobile-slider` will be attached for you by the plugin.
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


## License

MIT
