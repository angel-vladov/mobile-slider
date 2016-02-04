/*! mobile-slider - v0.1.0 - 2016-02-04
* Copyright (c) 2016 Angel Vladov; Licensed MIT */
(function ($) {
	'use strict';

	$.fn.mobileSlider = function() {
		return this.each(function() {
			var $container = $(this);
			var $viewPane = null;
			var $nodes = null;
			var $nav = null;
			var $lastActiveNode = null;

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

			function listenScrollPosition() {
				$viewPane.on('scroll', detectScrollPosition);
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

			function initialize() {
				$viewPane = $container.find('.slider-content');
				$nodes = $viewPane.find('li');
				$nav = $('<div class="slider-nav"></div>').appendTo($container);

				if ($nodes.length > 0) {
					var liWidth = $container.attr('data-li-width') || $container.attr('li-width');

					if (liWidth) {
						$nodes.width(liWidth);
					}

					// Modify first/last node
					var edgeOffset = ($viewPane.width() - $nodes.first().width()) / 2;
					var midNode = $nodes[Math.ceil($nodes.length / 2) - 1];

					$nodes.first().css('margin-left', edgeOffset + 'px');
					$nodes.last().css('margin-right', edgeOffset + 'px');

					initializeNav();
					listenScrollPosition();
					detectScrollPosition();
					handleNavButtons();

					scrollToNode(midNode);
				}
			}

			initialize();
		});
	};

	//$.fn.mobileSlider = function () {
	//	return this.each(function (i) {
	//		// Do something to each selected element.
	//		$(this).html('mobileSlider' + i);
	//	});
	//};
}(jQuery));
