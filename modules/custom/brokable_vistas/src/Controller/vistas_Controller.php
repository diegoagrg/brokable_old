<?php

namespace Drupal\brokable_vistas\Controller;
use Drupal\Core\Controller\ControllerBase;

/**
 * class vistas_Controller
 */
class vistas_Controller extends ControllerBase {

  public static function obtener_vista($id_vista, $id_presentacion) {
    $vista = views_embed_view($id_vista, $id_presentacion);
    return $vista;
  }
}
