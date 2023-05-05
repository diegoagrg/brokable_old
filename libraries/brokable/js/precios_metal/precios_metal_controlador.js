var precios_metal = function(selector, metales = []) {
  this.container = jQuery(selector);
  this.metales = metales;
  this.lista();
}

precios_metal.prototype.plantilla_metal = function (metal, precio) {
  var plantilla = jQuery('<li/>', {
    class: 'precios_metal_item',
  });
  var span_1 = jQuery('<span/>', {
    class: 'nombre_metal',
    text: metal,
  }).appendTo(plantilla);
  plantilla.append(' : ');
  var span_2 = jQuery('<span/>', {
    class: 'precio_metal',
    text: precio,
  }).appendTo(plantilla);
  return plantilla;
};

precios_metal.prototype.lista = function () {
  var objeto = this;
  this.metales.map(function(metal) {
    var precios;
    var nombre;
    switch (metal) {
      case "cu":
        precios = new precio_cobre();
        nombre = "cobre";
      break;
    }
    var metal = objeto.plantilla_metal("Precio del " + nombre, precios.last);
    metal.appendTo(objeto.container);
  });
};


jQuery(function() {
  var metales_nav = new precios_metal('.precios_metales',['cu']);
});
