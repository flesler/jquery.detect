/**
 * Detect jQuery version and plugins on the page
 * Copyright (c) 2013 Ariel Flesler - aflesler[a]gmail[d]com
 * @author Ariel Flesler
 * @version 1.0.1
 */
javascript:(function($){
	if (!$) return alert('jQuery not included');

	function load(url, success) {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;
		script.onload = success;
		script.onerror = function(){
			alert('Could not load '+url);
		};
		document.documentElement.lastChild.appendChild(script);
	}

	var jQv = $.fn.jquery, UIv;

	load('https://code.jquery.com/jquery-'+jQv+'.min.js', function() {
		if ($.ui) {
			UIv = $.ui.version;
			load('https://code.jquery.com/ui/'+UIv+'/jquery-ui.min.js', check);
		} else {
			check();
		}
	});

	function check() {
		var plugins = [''];
		compare(plugins, $, jQuery);
		compare(plugins, $.fn, jQuery.fn);
		window.$ = jQuery = $;

		alert('Found jQuery '+ jQv + (UIv ? ' and UI '+UIv : '') +'\nPlugins:'+plugins.sort().join('\n * '));
	}

	function compare(list, lib, base) {
		for (var key in lib) {
			if (key.charAt(0) !== '_' && !base[key] && typeof lib[key] === 'function' && list.indexOf(key) === -1) {
				list.push(key);
			}
		}
	}
})(window.jQuery);