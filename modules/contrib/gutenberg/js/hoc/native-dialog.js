/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function (wp, $, drupalSettings, Drupal) {
  var withNativeDialog = function withNativeDialog(Component) {
    var onDialogInsert = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(element, props) {
        var onSelect, handlesMediaEntity, multiple, selectionData, selections, endpointUrl, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, selection, response;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                onSelect = props.onSelect, handlesMediaEntity = props.handlesMediaEntity, multiple = props.multiple;
                selectionData = [];
                selections = [].concat(_toConsumableArray(getDefaultMediaSelections()), _toConsumableArray(getSpecialMediaSelections()));

                selections = multiple ? selections : selections.slice(0, 1);

                endpointUrl = handlesMediaEntity ? drupalSettings.path.baseUrl + 'editor/media/render' : drupalSettings.path.baseUrl + 'editor/media/load-media';
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 8;
                _iterator = selections[Symbol.iterator]();

              case 10:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 23;
                  break;
                }

                selection = _step.value;
                _context.next = 14;
                return fetch(endpointUrl + '/' + encodeURIComponent(selection));

              case 14:
                response = _context.sent;
                _context.t0 = selectionData;
                _context.next = 18;
                return response.json();

              case 18:
                _context.t1 = _context.sent;

                _context.t0.push.call(_context.t0, _context.t1);

              case 20:
                _iteratorNormalCompletion = true;
                _context.next = 10;
                break;

              case 23:
                _context.next = 29;
                break;

              case 25:
                _context.prev = 25;
                _context.t2 = _context['catch'](8);
                _didIteratorError = true;
                _iteratorError = _context.t2;

              case 29:
                _context.prev = 29;
                _context.prev = 30;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 32:
                _context.prev = 32;

                if (!_didIteratorError) {
                  _context.next = 35;
                  break;
                }

                throw _iteratorError;

              case 35:
                return _context.finish(32);

              case 36:
                return _context.finish(29);

              case 37:

                if (handlesMediaEntity) {
                  selectionData = selectionData.map(function (selectionItem) {
                    return selectionItem.media_entity && selectionItem.media_entity.id;
                  });
                }

                onSelect(multiple ? selectionData : selectionData[0]);

              case 39:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[8, 25, 29, 37], [30,, 32, 36]]);
      }));

      return function onDialogInsert(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();

    var onDialogCreate = function onDialogCreate(element, multiple) {
      drupalSettings.media_library = drupalSettings.media_library || {};
      drupalSettings.media_library.selection_remaining = multiple ? 1000 : 1;

      setTimeout(function () {
        $('#media-library-wrapper li:first-child a').click();
      }, 0);
    };

    var getDefaultMediaSelections = function getDefaultMediaSelections() {
      return (Drupal.MediaLibrary.currentSelection || []).filter(function (selection) {
        return +selection;
      });
    };

    var getSpecialMediaSelections = function getSpecialMediaSelections() {
      return [].concat(_toConsumableArray(Drupal.SpecialMediaSelection.currentSelection || [])).map(function (selection) {
        return JSON.stringify(_defineProperty({}, selection.processor, selection.data));
      });
    };

    var onDialogClose = function onDialogClose() {
      var modal = document.getElementById('media-entity-browser-modal');
      if (modal) {
        modal.remove();
      }

      var nodes = document.querySelectorAll('[aria-describedby="media-entity-browser-modal"]');
      nodes.forEach(function (node) {
        return node.remove();
      });
    };

    var getDialog = function getDialog(_ref2) {
      var allowedTypes = _ref2.allowedTypes;

      return new Promise(function (resolve, reject) {
        wp.apiFetch({
          path: 'load-media-library-dialog',
          data: { allowedTypes: allowedTypes }
        }).then(function (result) {
          resolve({
            component: function component(props) {
              return React.createElement('div', _extends({}, props, { dangerouslySetInnerHTML: { __html: result.html } }));
            }
          });
        }).catch(function (reason) {
          reject(reason);
        });
      });
    };

    return function (props) {
      return React.createElement(Component, _extends({}, props, {
        onDialogCreate: onDialogCreate,
        onDialogInsert: onDialogInsert,
        onDialogClose: onDialogClose,
        getDialog: getDialog }));
    };
  };

  window.DrupalGutenberg = window.DrupalGutenberg || {};
  window.DrupalGutenberg.Components = window.DrupalGutenberg.Components || {};
  window.DrupalGutenberg.Components.withNativeDialog = withNativeDialog;
})(wp, jQuery, drupalSettings, Drupal);