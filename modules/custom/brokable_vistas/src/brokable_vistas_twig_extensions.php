<?php
namespace Drupal\brokable_vistas;
use Drupal\brokable_vistas\Controller\vistas_Controller;

/**
 * Class brokable_vistas_twig_extensions
 *
 * @package Drupal\YT_functions
 */
class brokable_vistas_twig_extensions extends \Twig_Extension {

  public function getName() {
    return 'vista_de_brokable';
  }

  public function getFunctions() {
    return array(
      new \Twig_SimpleFunction( 'vista_de_brokable',
        array($this, 'vista_de_brokable')
      ),
    );
  }

  public function vista_de_brokable($id_vista, $id_presentacion) {
      $vista = vistas_Controller::obtener_vista($id_vista, $id_presentacion);
    return $vista;
  }

}
