/*! mobile-slider - v0.1.0 - 2016-02-05
* Copyright (c) 2016 Angel Vladov; Licensed MIT */
(function ($) {
	'use strict';

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

			function readAttributeOptions() {
				var itemWidth = $container.attr('data-item-width') || $container.attr('item-width');
				var sliderWhen = $container.attr('data-slider-when') || $container.attr('slider-when');

				if (itemWidth) {
					opts.itemWidth = itemWidth;
				}

				if (sliderWhen) {
					opts.sliderWhen = sliderWhen;
				}
			}

			function initializeNav() {
				var navMarkup = '<div class="slider-dots-list">';

				$nodes.each(function(index) {
					var $node = $(this);

					$node.data('c-id', index);

					navMarkup += '<div class="slider-dot" data-node="' + index + '"></div>';
				});

				navMarkup += '</ul>';

				$nav.html(
					'<a href="" class="goto-prev"></a>' +
					'<a href="" class="goto-next"></a>' +
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

					var nodeIndex = $lastActiveNode.data('c-id');
					var nodeSelector = '[data-node="' + nodeIndex + '"]';

					$nodes.removeClass('active');
					$lastActiveNode.addClass('active');

					$nav.find('.slider-dot').removeClass('active').filter(nodeSelector).addClass('active');
				}
			}

			function scrollToNode($node) {
				$node = $($node);

				var widthDiff = ($viewPane.width() - $node.width()) / 2;
				var animConfig = {
					duration: '400ms'
				};

				$viewPane.animate({
					scrollLeft: $node.position().left + $viewPane.scrollLeft() - widthDiff
				}, animConfig);

				detectScrollPosition();
			}

			function handleNavButtons() {
				$nav.on('click', '.goto-prev', function(e) {
					e.preventDefault();

					var currentIndex = $lastActiveNode.data('c-id');
					var prevIndex = currentIndex - 1;

					if (prevIndex < 0) {
						prevIndex = $nodes.length - 1;
					}

					scrollToNode($nodes[prevIndex]);

					return false;
				});

				$nav.on('click', '.goto-next', function(e) {
					e.preventDefault();

					var currentIndex = $lastActiveNode.data('c-id');
					var nextIndex = (currentIndex + 1) % $nodes.length;

					scrollToNode($nodes[nextIndex]);

					return false;
				});
			}

			function handleOnResize() {
				var screenWidth = $(window).width();
				var sliderIsActive = $container.hasClass('slider-active');

				if (screenWidth <= opts.sliderWhen) {
					if (!sliderIsActive) {
						initialize();

						// Modify first/last node
						edgeOffset = ($viewPane.width() - $nodes.first().width()) / 2;
						$nodes.first().css('margin-left', edgeOffset + 'px');
						$nodes.last().css('margin-right', edgeOffset + 'px');

						$container.addClass('slider-active');
					}
				} else {
					if (sliderIsActive) {
						$nodes.first().css('margin-left', '0px');
						$nodes.last().css('margin-right', '0px');

						$container.removeClass('slider-active');
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
					var itemWidth = $container.attr('data-item-width') || $container.attr('item-width');

					if (itemWidth) {
						$nodes.width(itemWidth);
					}

					initializeNav();

					// Listen for scroll position changes and update initial value
					$viewPane.on('scroll', detectScrollPosition);
					detectScrollPosition();

					handleNavButtons();

					var midNode = $nodes[Math.ceil($nodes.length / 2) - 1];
					scrollToNode(midNode);
				}
			}

			readAttributeOptions();

			$(window).on('resize orientationchange', handleOnResize);
			handleOnResize();
		});
	};

	$.fn.mobileSlider.defaults = {
		itemWidth: null,
		sliderWhen: 1024
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
