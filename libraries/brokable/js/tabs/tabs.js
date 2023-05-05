var list_tabs = [];

list_tabs.init = function() {
  list_tabs.set_names();
  list_tabs.set_events();
}

list_tabs.set_names = function() {
  list_tabs.tabs          =   jQuery('.list-tabs');
  list_tabs.tab_index     =   jQuery('.list-tabs .tab_index');
  list_tabs.tab_targets   =   jQuery('.list-tabs .tab_target');
}

list_tabs.set_events = function() {
  list_tabs.tab_index.on('click', function() {
    list_tabs.switch_tab(this);
  });
}

list_tabs.switch_tab = function(tab_index) {
  tab_index = jQuery(tab_index);
  var parent_tab = tab_index.attr('parent-tab');
  var target_tab = tab_index.attr('target-tab');
  var selector_1 = '#' + parent_tab + ' .tab_target';
  var selector_2 = selector_1 + '[target-tab ="' + target_tab + '"]';

  list_tabs.tab_index.removeClass('active');
  tab_index.addClass('active');

  jQuery(selector_1).slideUp();
  jQuery(selector_2).slideDown();
}

jQuery(function() {
  list_tabs.init();
});
