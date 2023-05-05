/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function (wp, $, Drupal, drupalSettings) {
  var data = wp.data;
  var _window$DrupalGutenbe = window.DrupalGutenberg.Components,
      DrupalIcon = _window$DrupalGutenbe.DrupalIcon,
      DrupalBlock = _window$DrupalGutenbe.DrupalBlock;


  var providerIcons = {
    system: DrupalIcon,
    user: 'admin-users',
    views: 'media-document',
    core: DrupalIcon
  };

  function isBlackListed(definition, blackList) {
    for (var key in blackList) {
      if (blackList.hasOwnProperty(key)) {
        var values = blackList[key];

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var value = _step.value;

            if (definition[key] === value) {
              return true;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }

    return false;
  }

  function filterBlackList(definitions, blackList) {
    var result = {};

    for (var key in definitions) {
      if (definitions.hasOwnProperty(key)) {
        var definition = definitions[key];

        if (!isBlackListed(definition, blackList)) {
          result[key] = definition;
        }
      }
    }

    return result;
  }

  function registerDrupalBlocks(blocks, editor, contentType) {
    return new Promise(function (resolve) {
      var BlockAlignmentToolbar = editor.BlockAlignmentToolbar,
          BlockControls = editor.BlockControls;
      var Fragment = wp.element.Fragment;


      $.ajax(drupalSettings.path.baseUrl + 'editor/blocks/load_by_type/' + contentType).done(function (definitions) {
        var category = {
          slug: 'drupal',
          title: Drupal.t('Drupal Blocks')
        };

        var categories = [].concat(_toConsumableArray(data.select('core/blocks').getCategories()), [category]);

        data.dispatch('core/blocks').setCategories(categories);

        var _loop = function _loop(id) {
          if ({}.hasOwnProperty.call(definitions, id)) {
            var definition = definitions[id];
            var blockId = 'drupalblock/' + id;
            blockId = blockId.replace(/_/g, '-');
            blockId = blockId.replace(/:/g, '-');

            blocks.registerBlockType(blockId, {
              title: definition.admin_label + ' [' + definition.category + ']',
              icon: providerIcons[definition.provider] || DrupalIcon,
              category: 'drupal',
              supports: {
                html: false,
                reusable: false
              },
              attributes: {
                blockId: {
                  type: 'string'
                },
                align: {
                  type: 'string'
                }
              },
              edit: function edit(_ref) {
                var attributes = _ref.attributes,
                    className = _ref.className,
                    setAttributes = _ref.setAttributes;
                var align = attributes.align;

                setAttributes({ blockId: id });

                return React.createElement(
                  Fragment,
                  null,
                  React.createElement(
                    BlockControls,
                    null,
                    React.createElement(BlockAlignmentToolbar, {
                      value: align,
                      onChange: function onChange(nextAlign) {
                        setAttributes({ align: nextAlign });
                      },
                      controls: ['left', 'right', 'center', 'wide', 'full']
                    })
                  ),
                  React.createElement(DrupalBlock, {
                    className: className,
                    id: id,
                    url: drupalSettings.path.baseUrl + 'editor/blocks/load/' + id
                  })
                );
              },
              save: function save() {
                return null;
              }
            });
          }
        };

        for (var id in definitions) {
          _loop(id);
        }
        resolve();
      });
    });
  }

  window.DrupalGutenberg = window.DrupalGutenberg || {};
  window.DrupalGutenberg.registerDrupalBlocks = registerDrupalBlocks;
})(wp, jQuery, Drupal, drupalSettings);