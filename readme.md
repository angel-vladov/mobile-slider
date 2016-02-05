# Mobile Slider

> Convert a list of items into a slider (carousel) when viewed on mobile devices.


## Getting Started

Download the [production version][min] or the [development version][max]. Download the [styles][styles].

[min]: https://raw.githubusercontent.com/angel-vladov/mobile-slider/master/dist/jquery.mobile-slider.min.js
[max]: https://raw.githubusercontent.com/angel-vladov/mobile-slider/master/dist/jquery.mobile-slider.js
[styles]: https://raw.githubusercontent.com/angel-vladov/mobile-slider/master/dist/jquery.mobile-slider.css

In your web page:

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
Prefixing attributes with _"data-"_ is optional. All the options can be passed as attributes.

Supported options:
#### sliderWhen

Type: `number`
Default: `1024`

Min window width needed for the mobile slider to apply and change the layout of the element it's applied to. Nothing will happen if the browser window is wider than `sliderWhen` width _(1024px with default value)_.

#### itemWidth

Type: `number` or `string`

If you need a specific width to be set on each list item when the mobile slider is active you can use this option. Numeric values are in pixels. If you need a value in em or percents pass a string.

Example: `260px`, `4.2em`, `80%`


## License

MIT
