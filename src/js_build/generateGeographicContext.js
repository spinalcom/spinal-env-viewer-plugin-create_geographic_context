"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _spinalEnvViewerGraphService = require("spinal-env-viewer-graph-service");

var _spinalEnvViewerPluginBimobjectservice = _interopRequireDefault(require("spinal-env-viewer-plugin-bimobjectservice"));

var _createTmpTree = _interopRequireDefault(require("../js/createTmpTree"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _wrapAsyncGenerator(fn) { return function () { return new _AsyncGenerator(fn.apply(this, arguments)); }; }

function _AsyncGenerator(gen) { var front, back; function send(key, arg) { return new Promise(function (resolve, reject) { var request = { key: key, arg: arg, resolve: resolve, reject: reject, next: null }; if (back) { back = back.next = request; } else { front = back = request; resume(key, arg); } }); } function resume(key, arg) { try { var result = gen[key](arg); var value = result.value; var wrappedAwait = value instanceof _AwaitValue; Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) { if (wrappedAwait) { resume("next", arg); return; } settle(result.done ? "return" : "normal", arg); }, function (err) { resume("throw", err); }); } catch (err) { settle("throw", err); } } function settle(type, value) { switch (type) { case "return": front.resolve({ value: value, done: true }); break; case "throw": front.reject(value); break; default: front.resolve({ value: value, done: false }); break; } front = front.next; if (front) { resume(front.key, front.arg); } else { back = null; } } this._invoke = send; if (typeof gen.return !== "function") { this.return = undefined; } }

if (typeof Symbol === "function" && Symbol.asyncIterator) { _AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; }; }

_AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); };

_AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); };

_AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); };

function _awaitAsyncGenerator(value) { return new _AwaitValue(value); }

function _AwaitValue(value) { this.wrapped = value; }

function _asyncIterator(iterable) { var method; if (typeof Symbol === "function") { if (Symbol.asyncIterator) { method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { method = iterable[Symbol.iterator]; if (method != null) return method.call(iterable); } } throw new TypeError("Object is not async iterable"); }

function _asyncGeneratorDelegate(inner, awaitWrap) { var iter = {}, waiting = false; function pump(key, value) { waiting = true; value = new Promise(function (resolve) { resolve(inner[key](value)); }); return { done: false, value: awaitWrap(value) }; } ; if (typeof Symbol === "function" && Symbol.iterator) { iter[Symbol.iterator] = function () { return this; }; } iter.next = function (value) { if (waiting) { waiting = false; return value; } return pump("next", value); }; if (typeof inner.throw === "function") { iter.throw = function (value) { if (waiting) { waiting = false; throw value; } return pump("throw", value); }; } if (typeof inner.return === "function") { iter.return = function (value) { return pump("return", value); }; } return iter; }

const PROGRESS_BAR_SIZE_GET_PROPS = 10;
const PROGRESS_BAR_SIZE_CREATE_TREE = 10;
const PROGRESS_BAR_SIZE_CREATE_GRAPH = 80;
const MAX_NON_SYNCHRONIZED_NODES = 300;
/**
 * Finds the children in the node with the given names.
 * @param {SpinalNode} parent Parent node from which to get the child
 * @param {Iterator<String>} nodeNames Iterator over the names of the nodes
 * @param {String} relationName Relation in which to search
 * @returns {Array<SpinalNode | null} An array of the children that were found and of undefined
 */

function getChildrenByNames(_x6, _x7, _x8) {
  return _getChildrenByNames.apply(this, arguments);
}
/**
 * Recursively builds the geographic context from the given layout and
 * the temporary tree made of maps (nodes) and arrays (leafs), yielding every it adds a node.
 * @param {SpinalContext} context Context to which the nodes must belong
 * @param {SpinalNode} parent Parent to which the children must be added
 * @param {Map<string> | Array<String>} children Children to add to the parent
 * @param {Object} layout Object containing the types of the nodes and names of the relations
 * @param {Number} depth Depth of the recursion; determines what node type and relation name to use
 * @yields {Promise<SpinalNode>} A promise of the last node that was added to the graph
 */


function _getChildrenByNames() {
  _getChildrenByNames = _asyncToGenerator(function* (parent, nodeNames, relationName) {
    const children = yield _spinalEnvViewerGraphService.SpinalGraphService.getChildren(parent.id, relationName);
    const found = [];
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = nodeNames[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        let name = _step4.value;
        found.push(children.find(child => {
          return child.name.get() === name;
        }));
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    return found;
  });
  return _getChildrenByNames.apply(this, arguments);
}

function generateGeoContextRec(_x, _x2, _x3, _x4, _x5) {
  return _generateGeoContextRec.apply(this, arguments);
}
/**
 * Waits for the nodes to be in the FileSystem.
 * @param {Array<Promise>} promises Array of promises containing the nodes
 * @returns {Promise<nothing>} An empty promise
 */


function _generateGeoContextRec() {
  _generateGeoContextRec = _wrapAsyncGenerator(function* (context, parent, children, layout, depth) {
    if (children instanceof Map) {
      const foundChildren = yield _awaitAsyncGenerator(getChildrenByNames(parent, children.keys(), layout.relations[depth]));
      const entries = children.entries();
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = foundChildren[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          let child = _step2.value;

          let _entries$next$value = _slicedToArray(entries.next().value, 2),
              name = _entries$next$value[0],
              value = _entries$next$value[1];

          if (child === undefined) {
            child = _spinalEnvViewerGraphService.SpinalGraphService.createNode({
              name,
              type: layout.types[depth]
            });
            yield _spinalEnvViewerGraphService.SpinalGraphService.addChildInContext(parent.id.get(), child, context.id.get(), layout.relations[depth], _spinalEnvViewerGraphService.SPINAL_RELATION_TYPE);
            child = _spinalEnvViewerGraphService.SpinalGraphService.getInfo(child);
          }

          yield* _asyncGeneratorDelegate(_asyncIterator(generateGeoContextRec(context, child, value, layout, depth + 1)), _awaitAsyncGenerator);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    } else {
      context = _spinalEnvViewerGraphService.SpinalGraphService.getRealNode(context.id.get());
      parent = _spinalEnvViewerGraphService.SpinalGraphService.getRealNode(parent.id.get());
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          let child = _step3.value;

          try {
            // Will throw error if we try to add the same node twice
            yield _spinalEnvViewerPluginBimobjectservice.default.addBIMObject(context, parent, child.dbId, child.name);
          } catch (_unused) {}
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  });
  return _generateGeoContextRec.apply(this, arguments);
}

function waitForFileSystem(_x9) {
  return _waitForFileSystem.apply(this, arguments);
}
/**
 * Generates a geographic context using the autodesk forge object tree.
 * @param {SpinalContext} context Context to fill
 * @param {Object} layout Object containing the types, keys and relation names necessary to generate the context
 * @param {Array<Object>} props Properties to use
 * @param {Object<value: Number>} progression Object containing the progression of the generation
 * @returns {SpinalContext} The geographic context
 */


function _waitForFileSystem() {
  _waitForFileSystem = _asyncToGenerator(function* (promises) {
    let nodes = yield Promise.all(promises);
    return new Promise(resolve => {
      let inter = setInterval(() => {
        nodes = nodes.filter(node => {
          return FileSystem._objects[node._server_id] === undefined;
        });

        if (nodes.length === 0) {
          clearInterval(inter);
          resolve();
        }
      }, 500);
    });
  });
  return _waitForFileSystem.apply(this, arguments);
}

function generateGeoContext(_x10, _x11, _x12, _x13) {
  return _generateGeoContext.apply(this, arguments);
}

function _generateGeoContext() {
  _generateGeoContext = _asyncToGenerator(function* (context, layout, props, progression) {
    progression.value = PROGRESS_BAR_SIZE_GET_PROPS;
    const tmpTree = layout.types.length > 0 ? (0, _createTmpTree.default)(props) : props;
    const incrProg = PROGRESS_BAR_SIZE_CREATE_GRAPH * MAX_NON_SYNCHRONIZED_NODES / props.length;
    let promises = [];
    progression.value += PROGRESS_BAR_SIZE_CREATE_TREE;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;

    var _iteratorError;

    try {
      for (var _iterator = _asyncIterator(generateGeoContextRec(context, context, tmpTree, layout, 0)), _step, _value; _step = yield _iterator.next(), _iteratorNormalCompletion = _step.done, _value = yield _step.value, !_iteratorNormalCompletion; _iteratorNormalCompletion = true) {
        let promise = _value;
        promises.push(promise);

        if (promises.length === MAX_NON_SYNCHRONIZED_NODES) {
          progression.value += incrProg; // eslint-disable-next-line no-await-in-loop

          yield waitForFileSystem(promises);
          promises = [];
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          yield _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (promises.length !== 0) {
      yield waitForFileSystem(promises);
    }

    progression.value = 100;
  });
  return _generateGeoContext.apply(this, arguments);
}

var _default = generateGeoContext;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2pzL2dlbmVyYXRlR2VvZ3JhcGhpY0NvbnRleHQuanMiXSwibmFtZXMiOlsiUFJPR1JFU1NfQkFSX1NJWkVfR0VUX1BST1BTIiwiUFJPR1JFU1NfQkFSX1NJWkVfQ1JFQVRFX1RSRUUiLCJQUk9HUkVTU19CQVJfU0laRV9DUkVBVEVfR1JBUEgiLCJNQVhfTk9OX1NZTkNIUk9OSVpFRF9OT0RFUyIsImdldENoaWxkcmVuQnlOYW1lcyIsInBhcmVudCIsIm5vZGVOYW1lcyIsInJlbGF0aW9uTmFtZSIsImNoaWxkcmVuIiwiU3BpbmFsR3JhcGhTZXJ2aWNlIiwiZ2V0Q2hpbGRyZW4iLCJpZCIsImZvdW5kIiwibmFtZSIsInB1c2giLCJmaW5kIiwiY2hpbGQiLCJnZXQiLCJnZW5lcmF0ZUdlb0NvbnRleHRSZWMiLCJjb250ZXh0IiwibGF5b3V0IiwiZGVwdGgiLCJNYXAiLCJmb3VuZENoaWxkcmVuIiwia2V5cyIsInJlbGF0aW9ucyIsImVudHJpZXMiLCJuZXh0IiwidmFsdWUiLCJ1bmRlZmluZWQiLCJjcmVhdGVOb2RlIiwidHlwZSIsInR5cGVzIiwiYWRkQ2hpbGRJbkNvbnRleHQiLCJTUElOQUxfUkVMQVRJT05fVFlQRSIsImdldEluZm8iLCJnZXRSZWFsTm9kZSIsImJpbU9iamVjdFNlcnZpY2UiLCJhZGRCSU1PYmplY3QiLCJkYklkIiwid2FpdEZvckZpbGVTeXN0ZW0iLCJwcm9taXNlcyIsIm5vZGVzIiwiUHJvbWlzZSIsImFsbCIsInJlc29sdmUiLCJpbnRlciIsInNldEludGVydmFsIiwiZmlsdGVyIiwibm9kZSIsIkZpbGVTeXN0ZW0iLCJfb2JqZWN0cyIsIl9zZXJ2ZXJfaWQiLCJsZW5ndGgiLCJjbGVhckludGVydmFsIiwiZ2VuZXJhdGVHZW9Db250ZXh0IiwicHJvcHMiLCJwcm9ncmVzc2lvbiIsInRtcFRyZWUiLCJpbmNyUHJvZyIsInByb21pc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUF3QkE7O0FBS0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLE1BQU1BLDJCQUEyQixHQUFHLEVBQXBDO0FBQ0EsTUFBTUMsNkJBQTZCLEdBQUcsRUFBdEM7QUFDQSxNQUFNQyw4QkFBOEIsR0FBRyxFQUF2QztBQUNBLE1BQU1DLDBCQUEwQixHQUFHLEdBQW5DO0FBRUE7Ozs7Ozs7O1NBT2VDLGtCOzs7QUFpQmY7Ozs7Ozs7Ozs7Ozs7MENBakJBLFdBQWtDQyxNQUFsQyxFQUEwQ0MsU0FBMUMsRUFBcURDLFlBQXJELEVBQW1FO0FBQ2pFLFVBQU1DLFFBQVEsU0FBU0MsZ0RBQW1CQyxXQUFuQixDQUErQkwsTUFBTSxDQUFDTSxFQUF0QyxFQUEwQ0osWUFBMUMsQ0FBdkI7QUFDQSxVQUFNSyxLQUFLLEdBQUcsRUFBZDtBQUZpRTtBQUFBO0FBQUE7O0FBQUE7QUFJakUsNEJBQWlCTixTQUFqQixtSUFBNEI7QUFBQSxZQUFuQk8sSUFBbUI7QUFDMUJELFFBQUFBLEtBQUssQ0FBQ0UsSUFBTixDQUNFTixRQUFRLENBQUNPLElBQVQsQ0FDRUMsS0FBSyxJQUFJO0FBQ1AsaUJBQU9BLEtBQUssQ0FBQ0gsSUFBTixDQUFXSSxHQUFYLE9BQXFCSixJQUE1QjtBQUNELFNBSEgsQ0FERjtBQU9EO0FBWmdFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBY2pFLFdBQU9ELEtBQVA7QUFDRCxHOzs7O1NBWWVNLHFCOzs7QUF3Q2hCOzs7Ozs7OzsrQ0F4Q0EsV0FBc0NDLE9BQXRDLEVBQStDZCxNQUEvQyxFQUF1REcsUUFBdkQsRUFBaUVZLE1BQWpFLEVBQXlFQyxLQUF6RSxFQUFnRjtBQUM5RSxRQUFJYixRQUFRLFlBQVljLEdBQXhCLEVBQTZCO0FBQzNCLFlBQU1DLGFBQWEsOEJBQVNuQixrQkFBa0IsQ0FBQ0MsTUFBRCxFQUFTRyxRQUFRLENBQUNnQixJQUFULEVBQVQsRUFBMEJKLE1BQU0sQ0FBQ0ssU0FBUCxDQUFpQkosS0FBakIsQ0FBMUIsQ0FBM0IsQ0FBbkI7QUFDQSxZQUFNSyxPQUFPLEdBQUdsQixRQUFRLENBQUNrQixPQUFULEVBQWhCO0FBRjJCO0FBQUE7QUFBQTs7QUFBQTtBQUkzQiw4QkFBa0JILGFBQWxCLG1JQUFpQztBQUFBLGNBQXhCUCxLQUF3Qjs7QUFBQSxtREFDWFUsT0FBTyxDQUFDQyxJQUFSLEdBQWVDLEtBREo7QUFBQSxjQUMxQmYsSUFEMEI7QUFBQSxjQUNwQmUsS0FEb0I7O0FBRy9CLGNBQUlaLEtBQUssS0FBS2EsU0FBZCxFQUF5QjtBQUN2QmIsWUFBQUEsS0FBSyxHQUFHUCxnREFBbUJxQixVQUFuQixDQUE4QjtBQUNwQ2pCLGNBQUFBLElBRG9DO0FBRXBDa0IsY0FBQUEsSUFBSSxFQUFFWCxNQUFNLENBQUNZLEtBQVAsQ0FBYVgsS0FBYjtBQUY4QixhQUE5QixDQUFSO0FBS0Esa0JBQU1aLGdEQUFtQndCLGlCQUFuQixDQUNKNUIsTUFBTSxDQUFDTSxFQUFQLENBQVVNLEdBQVYsRUFESSxFQUVKRCxLQUZJLEVBR0pHLE9BQU8sQ0FBQ1IsRUFBUixDQUFXTSxHQUFYLEVBSEksRUFJSkcsTUFBTSxDQUFDSyxTQUFQLENBQWlCSixLQUFqQixDQUpJLEVBS0phLGlEQUxJLENBQU47QUFRQWxCLFlBQUFBLEtBQUssR0FBR1AsZ0RBQW1CMEIsT0FBbkIsQ0FBMkJuQixLQUEzQixDQUFSO0FBQ0Q7O0FBRUQsd0RBQU9FLHFCQUFxQixDQUFDQyxPQUFELEVBQVVILEtBQVYsRUFBaUJZLEtBQWpCLEVBQXdCUixNQUF4QixFQUFnQ0MsS0FBSyxHQUFHLENBQXhDLENBQTVCO0FBQ0Q7QUF6QjBCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUEwQjVCLEtBMUJELE1BMEJPO0FBQ0xGLE1BQUFBLE9BQU8sR0FBR1YsZ0RBQW1CMkIsV0FBbkIsQ0FBK0JqQixPQUFPLENBQUNSLEVBQVIsQ0FBV00sR0FBWCxFQUEvQixDQUFWO0FBQ0FaLE1BQUFBLE1BQU0sR0FBR0ksZ0RBQW1CMkIsV0FBbkIsQ0FBK0IvQixNQUFNLENBQUNNLEVBQVAsQ0FBVU0sR0FBVixFQUEvQixDQUFUO0FBRks7QUFBQTtBQUFBOztBQUFBO0FBSUwsOEJBQWtCVCxRQUFsQixtSUFBNEI7QUFBQSxjQUFuQlEsS0FBbUI7O0FBQzFCLGNBQUk7QUFDRjtBQUNBLGtCQUFNcUIsK0NBQWlCQyxZQUFqQixDQUE4Qm5CLE9BQTlCLEVBQXVDZCxNQUF2QyxFQUErQ1csS0FBSyxDQUFDdUIsSUFBckQsRUFBMkR2QixLQUFLLENBQUNILElBQWpFLENBQU47QUFDRCxXQUhELENBR0UsZ0JBQU0sQ0FBRTtBQUNYO0FBVEk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVVOO0FBQ0YsRzs7OztTQU9jMkIsaUI7OztBQWlCZjs7Ozs7Ozs7Ozs7eUNBakJBLFdBQWlDQyxRQUFqQyxFQUEyQztBQUN6QyxRQUFJQyxLQUFLLFNBQVNDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZSCxRQUFaLENBQWxCO0FBRUEsV0FBTyxJQUFJRSxPQUFKLENBQVlFLE9BQU8sSUFBSTtBQUM1QixVQUFJQyxLQUFLLEdBQUdDLFdBQVcsQ0FBQyxNQUFNO0FBQzVCTCxRQUFBQSxLQUFLLEdBQUdBLEtBQUssQ0FBQ00sTUFBTixDQUFhQyxJQUFJLElBQUk7QUFDM0IsaUJBQU9DLFVBQVUsQ0FBQ0MsUUFBWCxDQUFvQkYsSUFBSSxDQUFDRyxVQUF6QixNQUF5Q3ZCLFNBQWhEO0FBQ0QsU0FGTyxDQUFSOztBQUlBLFlBQUlhLEtBQUssQ0FBQ1csTUFBTixLQUFpQixDQUFyQixFQUF3QjtBQUN0QkMsVUFBQUEsYUFBYSxDQUFDUixLQUFELENBQWI7QUFDQUQsVUFBQUEsT0FBTztBQUNSO0FBQ0YsT0FUc0IsRUFTcEIsR0FUb0IsQ0FBdkI7QUFVRCxLQVhNLENBQVA7QUFZRCxHOzs7O1NBVWNVLGtCOzs7OzswQ0FBZixXQUFrQ3BDLE9BQWxDLEVBQTJDQyxNQUEzQyxFQUFtRG9DLEtBQW5ELEVBQTBEQyxXQUExRCxFQUF1RTtBQUNyRUEsSUFBQUEsV0FBVyxDQUFDN0IsS0FBWixHQUFvQjVCLDJCQUFwQjtBQUVBLFVBQU0wRCxPQUFPLEdBQUd0QyxNQUFNLENBQUNZLEtBQVAsQ0FBYXFCLE1BQWIsR0FBc0IsQ0FBdEIsR0FBMEIsNEJBQWNHLEtBQWQsQ0FBMUIsR0FBaURBLEtBQWpFO0FBQ0EsVUFBTUcsUUFBUSxHQUFHekQsOEJBQThCLEdBQUdDLDBCQUFqQyxHQUE4RHFELEtBQUssQ0FBQ0gsTUFBckY7QUFDQSxRQUFJWixRQUFRLEdBQUcsRUFBZjtBQUVBZ0IsSUFBQUEsV0FBVyxDQUFDN0IsS0FBWixJQUFxQjNCLDZCQUFyQjtBQVBxRTtBQUFBOztBQUFBOztBQUFBO0FBU3JFLDBDQUEwQmlCLHFCQUFxQixDQUFDQyxPQUFELEVBQVVBLE9BQVYsRUFBbUJ1QyxPQUFuQixFQUE0QnRDLE1BQTVCLEVBQW9DLENBQXBDLENBQS9DLG9MQUF1RjtBQUFBLFlBQXhFd0MsT0FBd0U7QUFDckZuQixRQUFBQSxRQUFRLENBQUMzQixJQUFULENBQWM4QyxPQUFkOztBQUVBLFlBQUluQixRQUFRLENBQUNZLE1BQVQsS0FBb0JsRCwwQkFBeEIsRUFBb0Q7QUFDbERzRCxVQUFBQSxXQUFXLENBQUM3QixLQUFaLElBQXFCK0IsUUFBckIsQ0FEa0QsQ0FFbEQ7O0FBQ0EsZ0JBQU1uQixpQkFBaUIsQ0FBQ0MsUUFBRCxDQUF2QjtBQUNBQSxVQUFBQSxRQUFRLEdBQUcsRUFBWDtBQUNEO0FBQ0Y7QUFsQm9FO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBb0JyRSxRQUFJQSxRQUFRLENBQUNZLE1BQVQsS0FBb0IsQ0FBeEIsRUFBMkI7QUFDekIsWUFBTWIsaUJBQWlCLENBQUNDLFFBQUQsQ0FBdkI7QUFDRDs7QUFFRGdCLElBQUFBLFdBQVcsQ0FBQzdCLEtBQVosR0FBb0IsR0FBcEI7QUFDRCxHOzs7O2VBRWMyQixrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxOCBTcGluYWxDb20gLSB3d3cuc3BpbmFsY29tLmNvbVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFNwaW5hbENvcmUuXG4gKlxuICogUGxlYXNlIHJlYWQgYWxsIG9mIHRoZSBmb2xsb3dpbmcgdGVybXMgYW5kIGNvbmRpdGlvbnNcbiAqIG9mIHRoZSBGcmVlIFNvZnR3YXJlIGxpY2Vuc2UgQWdyZWVtZW50IChcIkFncmVlbWVudFwiKVxuICogY2FyZWZ1bGx5LlxuICpcbiAqIFRoaXMgQWdyZWVtZW50IGlzIGEgbGVnYWxseSBiaW5kaW5nIGNvbnRyYWN0IGJldHdlZW5cbiAqIHRoZSBMaWNlbnNlZSAoYXMgZGVmaW5lZCBiZWxvdykgYW5kIFNwaW5hbENvbSB0aGF0XG4gKiBzZXRzIGZvcnRoIHRoZSB0ZXJtcyBhbmQgY29uZGl0aW9ucyB0aGF0IGdvdmVybiB5b3VyXG4gKiB1c2Ugb2YgdGhlIFByb2dyYW0uIEJ5IGluc3RhbGxpbmcgYW5kL29yIHVzaW5nIHRoZVxuICogUHJvZ3JhbSwgeW91IGFncmVlIHRvIGFiaWRlIGJ5IGFsbCB0aGUgdGVybXMgYW5kXG4gKiBjb25kaXRpb25zIHN0YXRlZCBvciByZWZlcmVuY2VkIGhlcmVpbi5cbiAqXG4gKiBJZiB5b3UgZG8gbm90IGFncmVlIHRvIGFiaWRlIGJ5IHRoZXNlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucywgZG8gbm90IGRlbW9uc3RyYXRlIHlvdXIgYWNjZXB0YW5jZSBhbmQgZG9cbiAqIG5vdCBpbnN0YWxsIG9yIHVzZSB0aGUgUHJvZ3JhbS5cbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIGxpY2Vuc2UgYWxvbmdcbiAqIHdpdGggdGhpcyBmaWxlLiBJZiBub3QsIHNlZVxuICogPGh0dHA6Ly9yZXNvdXJjZXMuc3BpbmFsY29tLmNvbS9saWNlbnNlcy5wZGY+LlxuICovXG5cbmltcG9ydCB7XG4gIFNQSU5BTF9SRUxBVElPTl9UWVBFLFxuICBTcGluYWxOb2RlLFxuICBTcGluYWxHcmFwaFNlcnZpY2Vcbn0gZnJvbSBcInNwaW5hbC1lbnYtdmlld2VyLWdyYXBoLXNlcnZpY2VcIjtcbmltcG9ydCBiaW1PYmplY3RTZXJ2aWNlIGZyb20gXCJzcGluYWwtZW52LXZpZXdlci1wbHVnaW4tYmltb2JqZWN0c2VydmljZVwiO1xuXG5pbXBvcnQgY3JlYXRlVG1wVHJlZSBmcm9tIFwiLi4vanMvY3JlYXRlVG1wVHJlZVwiO1xuXG5jb25zdCBQUk9HUkVTU19CQVJfU0laRV9HRVRfUFJPUFMgPSAxMDtcbmNvbnN0IFBST0dSRVNTX0JBUl9TSVpFX0NSRUFURV9UUkVFID0gMTA7XG5jb25zdCBQUk9HUkVTU19CQVJfU0laRV9DUkVBVEVfR1JBUEggPSA4MDtcbmNvbnN0IE1BWF9OT05fU1lOQ0hST05JWkVEX05PREVTID0gMzAwO1xuXG4vKipcbiAqIEZpbmRzIHRoZSBjaGlsZHJlbiBpbiB0aGUgbm9kZSB3aXRoIHRoZSBnaXZlbiBuYW1lcy5cbiAqIEBwYXJhbSB7U3BpbmFsTm9kZX0gcGFyZW50IFBhcmVudCBub2RlIGZyb20gd2hpY2ggdG8gZ2V0IHRoZSBjaGlsZFxuICogQHBhcmFtIHtJdGVyYXRvcjxTdHJpbmc+fSBub2RlTmFtZXMgSXRlcmF0b3Igb3ZlciB0aGUgbmFtZXMgb2YgdGhlIG5vZGVzXG4gKiBAcGFyYW0ge1N0cmluZ30gcmVsYXRpb25OYW1lIFJlbGF0aW9uIGluIHdoaWNoIHRvIHNlYXJjaFxuICogQHJldHVybnMge0FycmF5PFNwaW5hbE5vZGUgfCBudWxsfSBBbiBhcnJheSBvZiB0aGUgY2hpbGRyZW4gdGhhdCB3ZXJlIGZvdW5kIGFuZCBvZiB1bmRlZmluZWRcbiAqL1xuYXN5bmMgZnVuY3Rpb24gZ2V0Q2hpbGRyZW5CeU5hbWVzKHBhcmVudCwgbm9kZU5hbWVzLCByZWxhdGlvbk5hbWUpIHtcbiAgY29uc3QgY2hpbGRyZW4gPSBhd2FpdCBTcGluYWxHcmFwaFNlcnZpY2UuZ2V0Q2hpbGRyZW4ocGFyZW50LmlkLCByZWxhdGlvbk5hbWUpO1xuICBjb25zdCBmb3VuZCA9IFtdO1xuXG4gIGZvciAobGV0IG5hbWUgb2Ygbm9kZU5hbWVzKSB7XG4gICAgZm91bmQucHVzaChcbiAgICAgIGNoaWxkcmVuLmZpbmQoXG4gICAgICAgIGNoaWxkID0+IHtcbiAgICAgICAgICByZXR1cm4gY2hpbGQubmFtZS5nZXQoKSA9PT0gbmFtZVxuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBmb3VuZDtcbn1cblxuLyoqXG4gKiBSZWN1cnNpdmVseSBidWlsZHMgdGhlIGdlb2dyYXBoaWMgY29udGV4dCBmcm9tIHRoZSBnaXZlbiBsYXlvdXQgYW5kXG4gKiB0aGUgdGVtcG9yYXJ5IHRyZWUgbWFkZSBvZiBtYXBzIChub2RlcykgYW5kIGFycmF5cyAobGVhZnMpLCB5aWVsZGluZyBldmVyeSBpdCBhZGRzIGEgbm9kZS5cbiAqIEBwYXJhbSB7U3BpbmFsQ29udGV4dH0gY29udGV4dCBDb250ZXh0IHRvIHdoaWNoIHRoZSBub2RlcyBtdXN0IGJlbG9uZ1xuICogQHBhcmFtIHtTcGluYWxOb2RlfSBwYXJlbnQgUGFyZW50IHRvIHdoaWNoIHRoZSBjaGlsZHJlbiBtdXN0IGJlIGFkZGVkXG4gKiBAcGFyYW0ge01hcDxzdHJpbmc+IHwgQXJyYXk8U3RyaW5nPn0gY2hpbGRyZW4gQ2hpbGRyZW4gdG8gYWRkIHRvIHRoZSBwYXJlbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBsYXlvdXQgT2JqZWN0IGNvbnRhaW5pbmcgdGhlIHR5cGVzIG9mIHRoZSBub2RlcyBhbmQgbmFtZXMgb2YgdGhlIHJlbGF0aW9uc1xuICogQHBhcmFtIHtOdW1iZXJ9IGRlcHRoIERlcHRoIG9mIHRoZSByZWN1cnNpb247IGRldGVybWluZXMgd2hhdCBub2RlIHR5cGUgYW5kIHJlbGF0aW9uIG5hbWUgdG8gdXNlXG4gKiBAeWllbGRzIHtQcm9taXNlPFNwaW5hbE5vZGU+fSBBIHByb21pc2Ugb2YgdGhlIGxhc3Qgbm9kZSB0aGF0IHdhcyBhZGRlZCB0byB0aGUgZ3JhcGhcbiAqL1xuYXN5bmMgZnVuY3Rpb24qIGdlbmVyYXRlR2VvQ29udGV4dFJlYyhjb250ZXh0LCBwYXJlbnQsIGNoaWxkcmVuLCBsYXlvdXQsIGRlcHRoKSB7XG4gIGlmIChjaGlsZHJlbiBpbnN0YW5jZW9mIE1hcCkge1xuICAgIGNvbnN0IGZvdW5kQ2hpbGRyZW4gPSBhd2FpdCBnZXRDaGlsZHJlbkJ5TmFtZXMocGFyZW50LCBjaGlsZHJlbi5rZXlzKCksIGxheW91dC5yZWxhdGlvbnNbZGVwdGhdKTtcbiAgICBjb25zdCBlbnRyaWVzID0gY2hpbGRyZW4uZW50cmllcygpO1xuXG4gICAgZm9yIChsZXQgY2hpbGQgb2YgZm91bmRDaGlsZHJlbikge1xuICAgICAgbGV0IFtuYW1lLCB2YWx1ZV0gPSBlbnRyaWVzLm5leHQoKS52YWx1ZTtcblxuICAgICAgaWYgKGNoaWxkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2hpbGQgPSBTcGluYWxHcmFwaFNlcnZpY2UuY3JlYXRlTm9kZSh7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICB0eXBlOiBsYXlvdXQudHlwZXNbZGVwdGhdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHlpZWxkIFNwaW5hbEdyYXBoU2VydmljZS5hZGRDaGlsZEluQ29udGV4dChcbiAgICAgICAgICBwYXJlbnQuaWQuZ2V0KCksXG4gICAgICAgICAgY2hpbGQsXG4gICAgICAgICAgY29udGV4dC5pZC5nZXQoKSxcbiAgICAgICAgICBsYXlvdXQucmVsYXRpb25zW2RlcHRoXSxcbiAgICAgICAgICBTUElOQUxfUkVMQVRJT05fVFlQRVxuICAgICAgICApO1xuXG4gICAgICAgIGNoaWxkID0gU3BpbmFsR3JhcGhTZXJ2aWNlLmdldEluZm8oY2hpbGQpO1xuICAgICAgfVxuXG4gICAgICB5aWVsZCogZ2VuZXJhdGVHZW9Db250ZXh0UmVjKGNvbnRleHQsIGNoaWxkLCB2YWx1ZSwgbGF5b3V0LCBkZXB0aCArIDEpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb250ZXh0ID0gU3BpbmFsR3JhcGhTZXJ2aWNlLmdldFJlYWxOb2RlKGNvbnRleHQuaWQuZ2V0KCkpO1xuICAgIHBhcmVudCA9IFNwaW5hbEdyYXBoU2VydmljZS5nZXRSZWFsTm9kZShwYXJlbnQuaWQuZ2V0KCkpO1xuXG4gICAgZm9yIChsZXQgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFdpbGwgdGhyb3cgZXJyb3IgaWYgd2UgdHJ5IHRvIGFkZCB0aGUgc2FtZSBub2RlIHR3aWNlXG4gICAgICAgIHlpZWxkIGJpbU9iamVjdFNlcnZpY2UuYWRkQklNT2JqZWN0KGNvbnRleHQsIHBhcmVudCwgY2hpbGQuZGJJZCwgY2hpbGQubmFtZSk7XG4gICAgICB9IGNhdGNoIHt9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogV2FpdHMgZm9yIHRoZSBub2RlcyB0byBiZSBpbiB0aGUgRmlsZVN5c3RlbS5cbiAqIEBwYXJhbSB7QXJyYXk8UHJvbWlzZT59IHByb21pc2VzIEFycmF5IG9mIHByb21pc2VzIGNvbnRhaW5pbmcgdGhlIG5vZGVzXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxub3RoaW5nPn0gQW4gZW1wdHkgcHJvbWlzZVxuICovXG5hc3luYyBmdW5jdGlvbiB3YWl0Rm9yRmlsZVN5c3RlbShwcm9taXNlcykge1xuICBsZXQgbm9kZXMgPSBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgIGxldCBpbnRlciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIG5vZGVzID0gbm9kZXMuZmlsdGVyKG5vZGUgPT4ge1xuICAgICAgICByZXR1cm4gRmlsZVN5c3RlbS5fb2JqZWN0c1tub2RlLl9zZXJ2ZXJfaWRdID09PSB1bmRlZmluZWQ7XG4gICAgICB9KTtcblxuICAgICAgaWYgKG5vZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjbGVhckludGVydmFsKGludGVyKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0sIDUwMCk7XG4gIH0pO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlcyBhIGdlb2dyYXBoaWMgY29udGV4dCB1c2luZyB0aGUgYXV0b2Rlc2sgZm9yZ2Ugb2JqZWN0IHRyZWUuXG4gKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgQ29udGV4dCB0byBmaWxsXG4gKiBAcGFyYW0ge09iamVjdH0gbGF5b3V0IE9iamVjdCBjb250YWluaW5nIHRoZSB0eXBlcywga2V5cyBhbmQgcmVsYXRpb24gbmFtZXMgbmVjZXNzYXJ5IHRvIGdlbmVyYXRlIHRoZSBjb250ZXh0XG4gKiBAcGFyYW0ge0FycmF5PE9iamVjdD59IHByb3BzIFByb3BlcnRpZXMgdG8gdXNlXG4gKiBAcGFyYW0ge09iamVjdDx2YWx1ZTogTnVtYmVyPn0gcHJvZ3Jlc3Npb24gT2JqZWN0IGNvbnRhaW5pbmcgdGhlIHByb2dyZXNzaW9uIG9mIHRoZSBnZW5lcmF0aW9uXG4gKiBAcmV0dXJucyB7U3BpbmFsQ29udGV4dH0gVGhlIGdlb2dyYXBoaWMgY29udGV4dFxuICovXG5hc3luYyBmdW5jdGlvbiBnZW5lcmF0ZUdlb0NvbnRleHQoY29udGV4dCwgbGF5b3V0LCBwcm9wcywgcHJvZ3Jlc3Npb24pIHtcbiAgcHJvZ3Jlc3Npb24udmFsdWUgPSBQUk9HUkVTU19CQVJfU0laRV9HRVRfUFJPUFM7XG5cbiAgY29uc3QgdG1wVHJlZSA9IGxheW91dC50eXBlcy5sZW5ndGggPiAwID8gY3JlYXRlVG1wVHJlZShwcm9wcykgOiBwcm9wcztcbiAgY29uc3QgaW5jclByb2cgPSBQUk9HUkVTU19CQVJfU0laRV9DUkVBVEVfR1JBUEggKiBNQVhfTk9OX1NZTkNIUk9OSVpFRF9OT0RFUyAvIHByb3BzLmxlbmd0aDtcbiAgbGV0IHByb21pc2VzID0gW107XG5cbiAgcHJvZ3Jlc3Npb24udmFsdWUgKz0gUFJPR1JFU1NfQkFSX1NJWkVfQ1JFQVRFX1RSRUU7XG5cbiAgZm9yIGF3YWl0IChsZXQgcHJvbWlzZSBvZiBnZW5lcmF0ZUdlb0NvbnRleHRSZWMoY29udGV4dCwgY29udGV4dCwgdG1wVHJlZSwgbGF5b3V0LCAwKSkge1xuICAgIHByb21pc2VzLnB1c2gocHJvbWlzZSk7XG5cbiAgICBpZiAocHJvbWlzZXMubGVuZ3RoID09PSBNQVhfTk9OX1NZTkNIUk9OSVpFRF9OT0RFUykge1xuICAgICAgcHJvZ3Jlc3Npb24udmFsdWUgKz0gaW5jclByb2c7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuICAgICAgYXdhaXQgd2FpdEZvckZpbGVTeXN0ZW0ocHJvbWlzZXMpO1xuICAgICAgcHJvbWlzZXMgPSBbXTtcbiAgICB9XG4gIH1cblxuICBpZiAocHJvbWlzZXMubGVuZ3RoICE9PSAwKSB7XG4gICAgYXdhaXQgd2FpdEZvckZpbGVTeXN0ZW0ocHJvbWlzZXMpO1xuICB9XG5cbiAgcHJvZ3Jlc3Npb24udmFsdWUgPSAxMDA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdlbmVyYXRlR2VvQ29udGV4dDtcbiJdfQ==