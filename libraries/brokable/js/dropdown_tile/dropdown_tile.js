var dropdown_tile = function(parent, child) {
  this.parent = jQuery(parent);
  this.child = jQuery(child);

  this.parent.addClass('dropdown_tile_inactive_parent');
  this.child.addClass('dropdown_tile_inactive_child');

  var tile = this;

  this.parent.on('click', function() {
    tile.toggle();
  });

  this.child.on('click', function(e) {
    e.stopPropagation();
  });

  this.child.toggle();
}

dropdown_tile.prototype.toggle = function () {
  this.parent.toggleClass('dropdown_tile_active_parent');
  this.parent.toggleClass('dropdown_tile_inactive_parent');
  this.child.toggleClass('dropdown_tile_active_child');
  this.child.toggleClass('dropdown_tile_inactive_child');

  this.child.slideToggle();
};

var casos = [];
jQuery('.caso-de-exito').each(function() {
	var id = jQuery(this).attr('id');
	var parent = '#' + id + '.caso-de-exito';
	var child = '#' + id + ' .caso-de-exito-detalle';
	casos[id] = new dropdown_tile(parent, child);
});
