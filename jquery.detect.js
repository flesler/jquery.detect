/**
 * Detect jQuery version and plugins on the page
 * Copyright (c) 2013 Ariel Flesler - aflesler[a]gmail[d]com
 * @author Ariel Flesler
 * @version 0.9.0
 */
javascript:(function(){
	var $ = window.jQuery;
	if (!$) return alert('jQuery not included');

	var version = $.fn.jquery,
		script = document.createElement('script');

	script.type = 'text/javascript';
	script.src = 'https://code.jquery.com/jquery-'+version+'.min.js';
	script.onload = function() {
		var plugins = [''];
		compare(plugins, $, jQuery);
		compare(plugins, $.fn, jQuery.fn);
		jQuery = $;

		alert('Found jQuery '+version +'\nPlugins:'+plugins.sort().join('\n * '));
	};
	script.onerror = function(){
		alert('Could not load jQuery '+version);
	};
	document.documentElement.lastChild.appendChild(script);

	function compare(list, lib, base) {
		for (var key in lib) {
			if (!base[key] && typeof lib[key] === 'function' && list.indexOf(key) === -1) {
				list.push(key);
			}
		}
	}
})();