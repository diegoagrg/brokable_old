<?php
namespace Drupal\metales\Controller;
use Drupal\metales\Quandl;

class PrecioMetal {
    public $quandl;
    public $api_key;
    public $config;
    public $conn;

    public function __construct() {
        $this -> config     = \Drupal::config('metales.settings');
        $this -> conn       = \Drupal::database();
        $this -> api_key    = $this -> config -> get('api_key');
        $this -> quandl     = new Quandl($this -> api_key);
    }
    
    public function ObtenerDesdeBD($metal = false) {
        $conn = $this -> conn;
        $query = $conn -> select('precios_de_metales', 'p');
        $query -> fields('p', ['precio']);
        if ($metal) {
            $query -> condition('nombre_de_metal', $metal);
        }
        $result = $query->execute();
        $metales = array();
        foreach($result as $record) {
            $metales[] = array(
                id          => $record -> id,
                metal       => $metal,
                precio      => $record -> precio,
            );
        }
        return $metales;
    }
    
    public function InsertarEnBD($metal, $precio) {
        $conn = $this -> conn;
        $insert = $conn -> insert('precios_de_metales')
            ->fields([
                'nombre_de_metal'   => $metal,
                'precio'            => $precio,
            ])
        ->execute();
    }

    public function VaciarBD() {
        $conn = $this -> conn;
        $truncate = $conn -> truncate('precios_de_metales') -> execute();
    }

    public function ObtenerDesdeAPI($metal) {
        $symbol = $this -> config -> get($metal);
        $data = $this -> quandl -> getSymbol($symbol, [
            "trim_start" => "today-100 days",
            "trim_end"   => "today",
        ]);
        return $data -> dataset -> data[0][1];
    }

    public function ActualizarDesdeAPI($metal) {
        $precio = $this -> ObtenerDesdeAPI($metal);
        $this -> InsertarEnBD($metal, $precio);
    }

    public function ActualizarBD() {
        $config = $this -> config;
        $this -> VaciarBD();
        $this -> ActualizarDesdeAPI('cobre');
        $this -> ActualizarDesdeAPI('aluminio');
        $this -> ActualizarDesdeAPI('oro');
        $this -> ActualizarDesdeAPI('plata');
    }
}
