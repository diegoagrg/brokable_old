var conector= [];

conector.init = function() {
  conector.set_names();
  conector.set_events();
}

conector.set_names = function() {
  conector.title_trigger    = jQuery('.conector .section-title .h2');
  conector.subtitle_trigger = jQuery('.conector .conector-techdata .h3');
  conector.anchor_trigger   = jQuery('.conector .conector-anchors a');
}

conector.set_events = function() {
    conector.title_trigger.on('click', function() {
      conector.toggleContainerContent(this);
    });

    conector.subtitle_trigger.on('click', function() {
      conector.toggleSubcontainerContent(this);
    });

    conector.anchor_trigger.on('click', function() {
      conector.scrollTo(event, this);
    });
}

conector.toggleContainerContent = function(title) {
  title_parent = jQuery(title).parent().parent();
  title_parent.toggleClass("closed-section");
}

conector.toggleSubcontainerContent = function(subtitle) {
  subtitle_parent = jQuery(subtitle).parent()
  subtitle_parent.toggleClass("closed-section");
}

conector.scrollTo = function(event, element) {
  event.preventDefault();
  var go_to = jQuery(element).attr("href");
  jQuery("html, body").animate({
      scrollTop: jQuery(go_to).offset().top - 100
  }, 500);
}

jQuery(function() {
  conector.init();
});
