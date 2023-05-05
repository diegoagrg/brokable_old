var ancla_scroll_to = [];

ancla_scroll_to.init = function () {
	ancla_scroll_to.set_names();
	ancla_scroll_to.set_events();
}

ancla_scroll_to.set_names = function () {
	ancla_scroll_to.ancla = jQuery('.scroll_to');
}

ancla_scroll_to.set_events = function () {
	ancla_scroll_to.ancla.on('click', function (e) {
		e.preventDefault();
		var id = jQuery(this).attr('href');
		ancla_scroll_to.scroll_to(id);
	});
}

ancla_scroll_to.scroll_to = function(id) {
	var offset = jQuery(id).offset();
	var top = offset.top - 64;
	window.scroll({
		top: top,
		left: 0,
		behavior: 'smooth'
	});
}

jQuery(function () {
	ancla_scroll_to.init();
});
