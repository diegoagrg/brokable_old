<?php

namespace Drupal\blazy;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\Render\RendererInterface;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Cache\Cache;
use Drupal\Core\Cache\CacheBackendInterface;
use Drupal\Component\Utility\NestedArray;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Implements BlazyManagerInterface.
 */
abstract class BlazyManagerBase implements BlazyManagerInterface {

  /**
   * The entity type manager service.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * The module handler service.
   *
   * @var \Drupal\Core\Extension\ModuleHandlerInterface
   */
  protected $moduleHandler;

  /**
   * The renderer.
   *
   * @var \Drupal\Core\Render\RendererInterface
   */
  protected $renderer;

  /**
   * The config factory.
   *
   * @var \Drupal\Core\Config\ConfigFactoryInterface
   */
  protected $configFactory;

  /**
   * The cache backend.
   *
   * @var \Drupal\Core\Cache\CacheBackendInterface
   */
  protected $cache;

  /**
   * The supported lightboxes.
   *
   * @var array
   */
  protected $lightboxes = [];

  /**
   * CHecks if the image style contains crop in the effect name.
   *
   * @var array
   */
  private $isCrop;

  /**
   * Constructs a BlazyManager object.
   */
  public function __construct(EntityTypeManagerInterface $entity_type_manager, ModuleHandlerInterface $module_handler, RendererInterface $renderer, ConfigFactoryInterface $config_factory, CacheBackendInterface $cache) {
    $this->entityTypeManager = $entity_type_manager;
    $this->moduleHandler     = $module_handler;
    $this->renderer          = $renderer;
    $this->configFactory     = $config_factory;
    $this->cache             = $cache;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity_type.manager'),
      $container->get('module_handler'),
      $container->get('renderer'),
      $container->get('config.factory'),
      $container->get('cache.default')
    );
  }

  /**
   * Returns the entity type manager.
   */
  public function getEntityTypeManager() {
    return $this->entityTypeManager;
  }

  /**
   * Returns the module handler.
   */
  public function getModuleHandler() {
    return $this->moduleHandler;
  }

  /**
   * Returns the renderer.
   */
  public function getRenderer() {
    return $this->renderer;
  }

  /**
   * Returns the config factory.
   */
  public function getConfigFactory() {
    return $this->configFactory;
  }

  /**
   * Returns the cache.
   */
  public function getCache() {
    return $this->cache;
  }

  /**
   * Returns any config, or keyed by the $setting_name.
   */
  public function configLoad($setting_name = '', $settings = 'blazy.settings') {
    $config  = $this->configFactory->get($settings);
    $configs = $config->get();
    unset($configs['_core']);
    return empty($setting_name) ? $configs : $config->get($setting_name);
  }

  /**
   * Returns a shortcut for loading a config entity: image_style, slick, etc.
   */
  public function entityLoad($id, $entity_type = 'image_style') {
    return $this->entityTypeManager->getStorage($entity_type)->load($id);
  }

  /**
   * Returns a shortcut for loading multiple configuration entities.
   */
  public function entityLoadMultiple($entity_type = 'image_style', $ids = NULL) {
    return $this->entityTypeManager->getStorage($entity_type)->loadMultiple($ids);
  }

  /**
   * Returns array of needed assets suitable for #attached property.
   */
  public function attach($attach = []) {
    $load   = [];
    $switch = empty($attach['media_switch']) ? '' : $attach['media_switch'];

    if ($switch && $switch != 'content') {
      $attach[$switch] = $switch;

      if (in_array($switch, $this->getLightboxes())) {
        $load['library'][] = 'blazy/lightbox';
      }
    }

    // Allow both variants of grid or column to co-exist for different fields.
    if (!empty($attach['style'])) {
      foreach (['column', 'grid'] as $grid) {
        $attach[$grid] = $attach['style'];
      }
    }

    foreach (['column', 'filter', 'grid', 'media', 'photobox', 'ratio'] as $component) {
      if (!empty($attach[$component])) {
        $load['library'][] = 'blazy/' . $component;
      }
    }

    // Core Blazy libraries.
    if (!empty($attach['blazy'])) {
      $load['library'][] = 'blazy/load';
      $load['drupalSettings']['blazy'] = $this->configLoad()['blazy'];
    }

    $this->moduleHandler->alter('blazy_attach', $load, $attach);
    return $load;
  }

  /**
   * Collects defined skins as registered via hook_MODULE_NAME_skins_info().
   */
  public function buildSkins($namespace, $skin_class, $methods = []) {
    $cid = $namespace . ':skins';

    if ($cache = $this->cache->get($cid)) {
      return $cache->data;
    }

    $classes = $this->moduleHandler->invokeAll($namespace . '_skins_info');
    $classes = array_merge([$skin_class], $classes);
    $items   = $skins = [];
    foreach ($classes as $class) {
      if (class_exists($class)) {
        $reflection = new \ReflectionClass($class);
        if ($reflection->implementsInterface($skin_class . 'Interface')) {
          $skin = new $class();
          if (empty($methods) && method_exists($skin, 'skins')) {
            $items = $skin->skins();
          }
          else {
            foreach ($methods as $method) {
              $items[$method] = method_exists($skin, $method) ? $skin->{$method}() : [];
            }
          }
        }
      }
      $skins = NestedArray::mergeDeep($skins, $items);
    }

    $count = isset($items['skins']) ? count($items['skins']) : count($items);
    $tags  = Cache::buildTags($cid, ['count:' . $count]);

    $this->cache->set($cid, $skins, Cache::PERMANENT, $tags);

    return $skins;
  }

  /**
   * {@inheritdoc}
   */
  public function getLightboxes() {
    $boxes = $this->lightboxes + ['colorbox', 'photobox'];

    $lightboxes = [];
    foreach (array_unique($boxes) as $lightbox) {
      if (function_exists($lightbox . '_theme')) {
        $lightboxes[] = $lightbox;
      }
    }

    $this->moduleHandler->alter('blazy_lightboxes', $lightboxes);
    return array_unique($lightboxes);
  }

  /**
   * {@inheritdoc}
   */
  public function setLightboxes($lightbox) {
    $this->lightboxes[] = $lightbox;
  }

  /**
   * {@inheritdoc}
   */
  public function cleanUpBreakpoints(array &$settings = []) {
    if (!empty($settings['breakpoints'])) {
      $settings['breakpoints'] = array_filter(array_map('array_filter', $settings['breakpoints']));
      if (!empty($settings['breakpoints'])) {
        foreach ($settings['breakpoints'] as $key => $breakpoint) {
          if (empty($breakpoint['width']) || empty($breakpoint['image_style'])) {
            unset($settings['breakpoints'][$key]);
          }
        }

        // Identify that Blazy can be activated only by breakpoints.
        if (empty($settings['blazy'])) {
          $settings['blazy'] = !empty($settings['breakpoints']);
        }
      }
    }
  }

  /**
   * Checks if an image style contains crop effect.
   */
  public function isCrop($style) {
    if (!isset($this->isCrop[$style->getName()])) {
      $this->isCrop[$style->getName()] = FALSE;

      foreach ($style->getEffects() as $effect) {
        if (strpos($effect->getPluginId(), 'crop') !== FALSE) {
          $this->isCrop[$style->getName()] = TRUE;
          break;
        }
      }
    }

    return $this->isCrop[$style->getName()];
  }

  /**
   * {@inheritdoc}
   */
  public function isBlazy(array &$settings, array $item = []) {
    // Retrieves Blazy formatter related settings from within Views style.
    $content = !empty($settings['item_id']) && isset($item[$settings['item_id']]) ? $item[$settings['item_id']] : $item;

    // 1. Blazy formatter within Views fields by supported modules.
    if (isset($item['settings'])) {
      // Prevents edge case with unexpected flattened Views results which is
      // normally triggered by checking "Use field template" option.
      $blazy = is_array($content) && isset($content['#build']['settings']) ? $content['#build']['settings'] : [];

      // Allows breakpoints overrides such as multi-styled images by GridStack.
      if (empty($settings['breakpoints']) && isset($blazy['breakpoints'])) {
        $settings['breakpoints'] = $blazy['breakpoints'];
      }

      $cherries = [
        'blazy',
        'box_style',
        'image_style',
        'lazy',
        'media_switch',
        'ratio',
        'uri',
      ];

      foreach ($cherries as $key) {
        $fallback = isset($settings[$key]) ? $settings[$key] : '';
        $settings[$key] = isset($blazy[$key]) && empty($fallback) ? $blazy[$key] : $fallback;
      }
    }

    // 2. Blazy Views fields by supported modules.
    if (is_array($content) && isset($content['#view']) && ($view = $content['#view'])) {
      if ($blazy_field = BlazyViews::viewsField($view)) {
        $settings = array_merge(array_filter($blazy_field->mergedViewsSettings()), array_filter($settings));
      }
    }

    // Provides data for the [data-blazy] attribute at the containing element.
    $this->cleanUpBreakpoints($settings);
    if (!empty($settings['breakpoints'])) {
      $image = isset($item['item']) ? $item['item'] : NULL;
      $this->buildDataBlazy($settings, $image);
    }
  }

  /**
   * {@inheritdoc}
   */
  public function buildDataBlazy(array &$settings, $item = NULL) {
    // Identify that Blazy can be activated by breakpoints, regardless results.
    $settings['blazy'] = TRUE;

    // Bail out if blazy_data has been defined at self::setDimensionsOnce().
    // Blazy doesn't always deal with image formatters, see self::isBlazy().
    if (!empty($settings['blazy_data'])) {
      return;
    }

    // This may be set at self::setDimensionsOnce() if using formatters, yet it
    // is not set from non-formatters like views fields, see self::isBlazy().
    if (empty($settings['original_width'])) {
      $settings['original_width'] = isset($item->width) ? $item->width : NULL;
      $settings['original_height'] = isset($item->height) ? $item->height : NULL;
    }

    $json = $sources = $styles = [];
    $end = end($settings['breakpoints']);

    // Check for cropped images at the 5 given styles before any hard work.
    // Ok as run once at the top container regardless of thousand of images.
    foreach ($settings['breakpoints'] as $key => $breakpoint) {
      $style = $this->entityLoad($breakpoint['image_style']);
      if ($style && $this->isCrop($style)) {
        $styles[$key] = $style;
      }
    }

    // Bail out if not all images are cropped at all breakpoints.
    // The site builder just don't read the performance tips section.
    if (count($styles) != count($settings['breakpoints'])) {
      return;
    }

    // We have all images cropped here.
    foreach ($settings['breakpoints'] as $key => $breakpoint) {
      if ($width = Blazy::widthFromDescriptors($breakpoint['width'])) {
        // If contains crop, sets dimension once, and let all images inherit.
        if (!empty($settings['uri']) && !empty($settings['ratio'])) {
          $dimensions['width'] = $settings['original_width'];
          $dimensions['height'] = $settings['original_height'];

          if ($style = $styles[$key]) {
            $style->transformDimensions($dimensions, $settings['uri']);
            $padding = round((($dimensions['height'] / $dimensions['width']) * 100), 2);
            $json['dimensions'][$width] = $padding;

            // Only set padding-bottom for the last breakpoint to avoid FOUC.
            if ($end['width'] == $breakpoint['width']) {
              $settings['padding_bottom'] = $padding;
            }
          }
        }

        // If BG, provide [data-src-BREAKPOINT], regardless uri or ratio.
        if (!empty($settings['background'])) {
          $sources[] = ['width' => (int) $width, 'src' => 'data-src-' . $key];
        }
      }
    }

    // As of Blazy v1.6.0 applied to BG only.
    if ($sources) {
      $json['breakpoints'] = $sources;
    }

    // Supported modules can add blazy_data as [data-blazy] to the container.
    // This also informs individual images to not work with dimensions any more
    // as _all_ breakpoint image styles contain 'crop'.
    if ($json) {
      $settings['blazy_data'] = $json;
    }
  }

  /**
   * {@inheritdoc}
   */
  public function getResponsiveImageCacheTags($responsive) {
    $cache_tags = [];
    $image_styles_to_load = [];
    if ($responsive) {
      $cache_tags = Cache::mergeTags($cache_tags, $responsive->getCacheTags());
      $image_styles_to_load = $responsive->getImageStyleIds();
    }

    $image_styles = $this->entityLoadMultiple('image_style', $image_styles_to_load);
    foreach ($image_styles as $image_style) {
      $cache_tags = Cache::mergeTags($cache_tags, $image_style->getCacheTags());
    }
    return $cache_tags;
  }

}
