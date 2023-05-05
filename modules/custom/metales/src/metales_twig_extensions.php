<?php
namespace Drupal\metales;
use Drupal\metales\Controller\PrecioMetal;

/**
 * Class metales_twig_extensions
 *
 * @package Drupal\metales
 */
class metales_twig_extensions extends \Twig_Extension {

  public function getName() {
    return 'metales';
  }

  public function getFunctions() {
    return array(
      new \Twig_SimpleFunction( 'precio_de_metal',
        array($this, 'precio_de_metal')
      ),
    );
  }

  public function precio_de_metal($metal) {
    $PrecioMetal = new PrecioMetal();
    $precio = $PrecioMetal -> ObtenerDesdeBD($metal);
    return $precio[0]['precio'];;
  }

}
