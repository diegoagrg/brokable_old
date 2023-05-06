<?php

namespace Drupal\simplemeta\Form;

use Drupal\Core\Entity\ContentEntityForm;
use Drupal\Core\Form\FormStateInterface;

/**
 * Form controller for SimpleMeta edit forms.
 *
 * @ingroup simplemeta
 */
class SimplemetaEntityForm extends ContentEntityForm {

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    /* @var $entity \Drupal\simplemeta\Entity\SimplemetaEntity */
    $form = parent::buildForm($form, $form_state);
    $entity = $this->entity;

    // Prefill current path for better UX.
    if (empty($form['url']['widget'][0]['value']['#default_value'])) {
      $current_path = \Drupal::service('path.current')->getPath();
      $form['url']['widget'][0]['value']['#default_value'] = $current_path;
    }

    $form['data'] = [
      '#tree' => TRUE,
    ];
    // Meta title.
    $form['data']['title'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Title'),
      '#maxlength' => 255,
      '#default_value' => $entity->data->title,
    ];
    // Meta description.
    $form['data']['description'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Description'),
      '#resizable' => FALSE,
      '#default_value' => $entity->data->description,
    ];
    $form['data']['keywords'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Keywords'),
      '#description' => $this->t('Comma-separated list of keywords.'),
      '#maxlength' => 255,
      '#default_value' => $entity->data->keywords,
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function save(array $form, FormStateInterface $form_state) {
    $entity = &$this->entity;

    $status = parent::save($form, $form_state);

    switch ($status) {
      case SAVED_NEW:
        \Drupal::messenger()->addMessage($this->t('Created the %label SimpleMeta.', [
          '%label' => $entity->label(),
        ]));
        break;

      default:
        \Drupal::messenger()->addMessage($this->t('Saved the %label SimpleMeta.', [
          '%label' => $entity->label(),
        ]));
    }
  }

}
