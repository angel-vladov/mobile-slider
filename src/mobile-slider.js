/*
 *
 *
 * Copyright (c) 2016 Angel Vladov
 * Licensed under the MIT license.
 */
(function ($) {
	'use strict';

	function readAttributeOptions($element, opts) {
		var itemWidth = $element.attr('data-item-width') || $element.attr('item-width');
		var sliderWhen = $element.attr('data-slider-when') || $element.attr('slider-when');

		if (itemWidth) {
			opts.itemWidth = itemWidth;
		}

		if (sliderWhen) {
			opts.sliderWhen = sliderWhen;
		}
	}

	function normalizeOptions(opts) {
		if (typeof opts.itemWidth === 'string') {
			var lastChar = opts.itemWidth.charAt(opts.itemWidth.length  - 1);

			if (!isNaN(parseInt(lastChar))) {
				// Whole string is a number. Append px.
				opts.itemWidth += 'px';
			}
		}
	}

	$.fn.mobileSlider = function(options) {
		var opts = $.extend({}, $.fn.mobileSlider.defaults, options);

		return this.each(function() {
			var $container = $(this);
			var $viewPane = null;
			var $nodes = null;
			var $nav = null;
			var $lastActiveNode = null;
			var initialized = false;
			var edgeOffset = 0;

			function initializeNav() {
				var navMarkup = '<div class="slider-dots">';

				$nodes.each(function(index) {
					var $node = $(this);

					$node.data('slide-id', index);

					navMarkup += '<div class="slider-dot" data-node="' + index + '"></div>';
				});

				navMarkup += '</ul>';

				$nav.html(
					'<a href="" class="slider-prev"></a>' +
					'<a href="" class="slider-next"></a>' +
					navMarkup
				);

				$nav.on('click', '.slider-dot', function() {
					var nodeIndex = $(this).attr('data-node');

					scrollToNode($nodes[nodeIndex]);
				});
			}

			function detectScrollPosition() {
				//var scrollLeft = $viewPane.scrollLeft();
				var centerPoint = $viewPane.width() / 2;// + $viewPane.scrollLeft();
				var $lastMatched = null;

				for (var i = 0, len = $nodes.length; i < len; i++) {
					var $current = $($nodes[i]);

					if ($current.position().left <= centerPoint) {
						$lastMatched = $current;
					} else {
						break;
					}
				}

				if (!$lastActiveNode || $lastActiveNode[0] !== $lastMatched[0]) {
					$lastActiveNode = $lastMatched;

					var nodeIndex = $lastActiveNode.data('slide-id');
					var nodeSelector = '[data-node="' + nodeIndex + '"]';

					$nodes.removeClass('active');
					$lastActiveNode.addClass('active');

					$nav.find('.slider-dot').removeClass('active').filter(nodeSelector).addClass('active');
				}
			}

			/**
			 * Scrolls to a specific node.
			 * @param {*} $node
			 * @param {Boolean} [animate] Default is true
			 */
			function scrollToNode($node, animate) {
				$node = $($node);

				var nodeWidth = $node.width();
				var nodeMargin = $node.outerWidth(true) - nodeWidth;
				var widthDiff = ($viewPane.width() - nodeWidth) / 2;
				var scrollValue = $node.position().left + $viewPane.scrollLeft() - widthDiff + nodeMargin;
				var animConfig = {
					duration: '400ms'
				};

				if (animate !== false) {
					$viewPane.animate({
						scrollLeft: scrollValue
					}, animConfig);
				} else {
					$viewPane.scrollLeft(scrollValue);
				}

				detectScrollPosition();
			}

			function handleNavButtons() {
				$nav.on('click', '.slider-prev', function(e) {
					e.preventDefault();

					var currentIndex = $lastActiveNode.data('slide-id');
					var prevIndex = currentIndex - 1;

					if (prevIndex < 0) {
						prevIndex = $nodes.length - 1;
					}

					scrollToNode($nodes[prevIndex]);

					return false;
				});

				$nav.on('click', '.slider-next', function(e) {
					e.preventDefault();

					var currentIndex = $lastActiveNode.data('slide-id');
					var nextIndex = (currentIndex + 1) % $nodes.lenth;

					scrollToNode($nodes[nextIndex]);

					return false;
				});
			}

			function handleOnResize() {
				var screenWidth = $(opts.container).width();
				var sliderIsActive = $container.hasClass('mobile-slider-active');

				if (screenWidth <= opts.sliderWhen) {
					if (!sliderIsActive) {
						$container.addClass('mobile-slider-active');

						initialize();

						// Modify first/last node
						edgeOffset = ($viewPane.width() - $nodes.first().width()) / 2;
						$nodes.first().css('margin-left', edgeOffset + 'px');
						$nodes.last().css('margin-right', edgeOffset + 'px');

						// Center the slider on the middle node
						var midNode = $nodes[Math.ceil($nodes.length / 2)];
						scrollToNode(midNode, false);
					}
				} else {
					if (sliderIsActive) {
						$nodes.first().css('margin-left', '');
						$nodes.last().css('margin-right', '');

						$container.removeClass('mobile-slider-active');
					}
				}
			}

			/**
			 * Will be called on initialization
			 */
			function initialize() {
				if (initialized) {
					return;
				}

				initialized = true;
				$viewPane = $container.find('ul');
				$nodes = $viewPane.find('li');
				$nav = $('<div class="slider-nav"></div>').appendTo($container);

				// Makes styling easier
				$viewPane.addClass('slider-content');

				if ($nodes.length > 0) {
					if (opts.itemWidth) {
						$nodes.width(opts.itemWidth);
					}

					initializeNav();

					// Listen for scroll position changes and update initial value
					$viewPane.on('scroll', detectScrollPosition);
					detectScrollPosition();

					handleNavButtons();
				}
			}

			if (!$container.hasClass('mobile-slider')) {
				$container.addClass('mobile-slider');
			}

			readAttributeOptions($container, opts);
			normalizeOptions(opts);

			$(window).on('resize orientationchange', handleOnResize);
			handleOnResize();
		});
	};

	$.fn.mobileSlider.defaults = {
		itemWidth: null,
		sliderWhen: 1024,
		container: window
	};

	$(document).ready(function() {
		$('.mobile-slider').mobileSlider();
	});

	//$.fn.mobileSlider = function () {
	//	return this.each(function (i) {
	//		// Do something to each selected element.
	//		$(this).html('mobileSlider' + i);
	//	});
	//};
}(jQuery));
