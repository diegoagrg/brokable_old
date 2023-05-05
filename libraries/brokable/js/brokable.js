jQuery(function() {
	jQuery('.loading_page').animate({
		opacity: 0
    }, 500, function() {
		jQuery('.loading_page').hide();
    });
});
