var precio_cobre = function() {
  this.api_url = 'https://www.quandl.com/api/v3';
  this.api_code = '/datasets/CHRIS/CME_HG1';
  this.dataset = [];
  this.actualizar();
  this.last = this.actual().Last;
}

precio_cobre.prototype.actualizar = function () {
  var data;
  var objeto = this;
  var _url = objeto.api_url + objeto.api_code + '/data.json';
  var settings = {
    "url": _url,
    "async": false,
    "crossDomain": true,
    "method": "GET",
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
      api_key: 'kPonhCNXHdUacJLLaBUV',
    }
  }
  jQuery.ajax(settings).done(function (response) {
    objeto.dataset = response.dataset_data;
  });
};

precio_cobre.prototype.actual = function () {
  var dataset = this.dataset;
  var precio = [];
  for(i in dataset.column_names) {
    var column_name = dataset.column_names[i];
    var column_data = dataset.data[0][i];
    precio[column_name] = column_data;
  }
  return precio;
};
