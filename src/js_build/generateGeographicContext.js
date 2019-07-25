"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _spinalEnvViewerGraphService = require("spinal-env-viewer-graph-service");

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

function _asyncIterator(iterable) { var method; if (typeof Symbol !== "undefined") { if (Symbol.asyncIterator) { method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { method = iterable[Symbol.iterator]; if (method != null) return method.call(iterable); } } throw new TypeError("Object is not async iterable"); }

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

function getChildrenByNames(_x7, _x8, _x9) {
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

function generateGeoContextRec(_x, _x2, _x3, _x4, _x5, _x6) {
  return _generateGeoContextRec.apply(this, arguments);
}
/**
 * Waits for the nodes to be in the FileSystem.
 * @param {Array<Promise>} promises Array of promises containing the nodes
 * @returns {Promise<nothing>} An empty promise
 */


function _generateGeoContextRec() {
  _generateGeoContextRec = _wrapAsyncGenerator(function* (context, parent, children, layout, depth, ref) {
    console.log(children);

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

          yield* _asyncGeneratorDelegate(_asyncIterator(generateGeoContextRec(context, child, value, layout, depth + 1, ref)), _awaitAsyncGenerator);
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
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          let child = _step3.value;

          // Will throw error if we try to add the same node twice
          try {
            if (ref) {
              console.log("ref", child, parent, context);
              yield window.spinal.BimObjectService.addReferenceObject(parent.id.get(), child.dbId, child.name);
            } else {
              console.log("addMin", child, parent, context);
              yield window.spinal.BimObjectService.addBIMObject(context.id.get(), parent.id.get(), child.dbId, child.name);
            }
          } catch (e) {
            console.error(e);
          }
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

function waitForFileSystem(_x10) {
  return _waitForFileSystem.apply(this, arguments);
}
/**
 * Generates a geographic context using the autodesk forge object tree.
 * @param {SpinalContext} context Context to fill
 * @param {Object} layout Object containing the types, keys and relation names necessary to generate the context
 * @param {Array<Object>} props Properties to use
 * @param {Object<value: Number>} progression Object containing the progression of the generation
 * @param {Boolean} ref True if the objects must be reference objects
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

function generateGeoContext(_x11, _x12, _x13, _x14, _x15) {
  return _generateGeoContext.apply(this, arguments);
}

function _generateGeoContext() {
  _generateGeoContext = _asyncToGenerator(function* (context, layout, props, progression, ref) {
    progression.value = PROGRESS_BAR_SIZE_GET_PROPS;
    const tmpTree = layout.types.length > 0 ? (0, _createTmpTree.default)(props) : props;
    const incrProg = PROGRESS_BAR_SIZE_CREATE_GRAPH * MAX_NON_SYNCHRONIZED_NODES / props.length;
    let promises = [];
    progression.value += PROGRESS_BAR_SIZE_CREATE_TREE;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;

    var _iteratorError;

    try {
      for (var _iterator = _asyncIterator(generateGeoContextRec(context, context, tmpTree, layout, 0, ref)), _step, _value; _step = yield _iterator.next(), _iteratorNormalCompletion = _step.done, _value = yield _step.value, !_iteratorNormalCompletion; _iteratorNormalCompletion = true) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2pzL2dlbmVyYXRlR2VvZ3JhcGhpY0NvbnRleHQuanMiXSwibmFtZXMiOlsiUFJPR1JFU1NfQkFSX1NJWkVfR0VUX1BST1BTIiwiUFJPR1JFU1NfQkFSX1NJWkVfQ1JFQVRFX1RSRUUiLCJQUk9HUkVTU19CQVJfU0laRV9DUkVBVEVfR1JBUEgiLCJNQVhfTk9OX1NZTkNIUk9OSVpFRF9OT0RFUyIsImdldENoaWxkcmVuQnlOYW1lcyIsInBhcmVudCIsIm5vZGVOYW1lcyIsInJlbGF0aW9uTmFtZSIsImNoaWxkcmVuIiwiU3BpbmFsR3JhcGhTZXJ2aWNlIiwiZ2V0Q2hpbGRyZW4iLCJpZCIsImZvdW5kIiwibmFtZSIsInB1c2giLCJmaW5kIiwiY2hpbGQiLCJnZXQiLCJnZW5lcmF0ZUdlb0NvbnRleHRSZWMiLCJjb250ZXh0IiwibGF5b3V0IiwiZGVwdGgiLCJyZWYiLCJjb25zb2xlIiwibG9nIiwiTWFwIiwiZm91bmRDaGlsZHJlbiIsImtleXMiLCJyZWxhdGlvbnMiLCJlbnRyaWVzIiwibmV4dCIsInZhbHVlIiwidW5kZWZpbmVkIiwiY3JlYXRlTm9kZSIsInR5cGUiLCJ0eXBlcyIsImFkZENoaWxkSW5Db250ZXh0IiwiU1BJTkFMX1JFTEFUSU9OX1RZUEUiLCJnZXRJbmZvIiwid2luZG93Iiwic3BpbmFsIiwiQmltT2JqZWN0U2VydmljZSIsImFkZFJlZmVyZW5jZU9iamVjdCIsImRiSWQiLCJhZGRCSU1PYmplY3QiLCJlIiwiZXJyb3IiLCJ3YWl0Rm9yRmlsZVN5c3RlbSIsInByb21pc2VzIiwibm9kZXMiLCJQcm9taXNlIiwiYWxsIiwicmVzb2x2ZSIsImludGVyIiwic2V0SW50ZXJ2YWwiLCJmaWx0ZXIiLCJub2RlIiwiRmlsZVN5c3RlbSIsIl9vYmplY3RzIiwiX3NlcnZlcl9pZCIsImxlbmd0aCIsImNsZWFySW50ZXJ2YWwiLCJnZW5lcmF0ZUdlb0NvbnRleHQiLCJwcm9wcyIsInByb2dyZXNzaW9uIiwidG1wVHJlZSIsImluY3JQcm9nIiwi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QUFBQSxZQUE3RTZDLE9BQTZFO0FBQzFGbkIsUUFBQUEsUUFBUSxDQUFDbEMsSUFBVCxDQUFjcUQsT0FBZDs7QUFFQSxZQUFJbkIsUUFBUSxDQUFDWSxNQUFULEtBQW9CekQsMEJBQXhCLEVBQW9EO0FBQ2xENkQsVUFBQUEsV0FBVyxDQUFDakMsS0FBWixJQUFxQm1DLFFBQXJCLENBRGtELENBRWxEOztBQUNBLGdCQUFNbkIsaUJBQWlCLENBQUNDLFFBQUQsQ0FBdkI7QUFDQUEsVUFBQUEsUUFBUSxHQUFHLEVBQVg7QUFDRDtBQUNGO0FBbEJ5RTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQW9CMUUsUUFBSUEsUUFBUSxDQUFDWSxNQUFULEtBQW9CLENBQXhCLEVBQTJCO0FBQ3pCLFlBQU1iLGlCQUFpQixDQUFDQyxRQUFELENBQXZCO0FBQ0Q7O0FBRURnQixJQUFBQSxXQUFXLENBQUNqQyxLQUFaLEdBQW9CLEdBQXBCO0FBQ0QsRzs7OztlQUVjK0Isa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTggU3BpbmFsQ29tIC0gd3d3LnNwaW5hbGNvbS5jb21cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBTcGluYWxDb3JlLlxuICpcbiAqIFBsZWFzZSByZWFkIGFsbCBvZiB0aGUgZm9sbG93aW5nIHRlcm1zIGFuZCBjb25kaXRpb25zXG4gKiBvZiB0aGUgRnJlZSBTb2Z0d2FyZSBsaWNlbnNlIEFncmVlbWVudCAoXCJBZ3JlZW1lbnRcIilcbiAqIGNhcmVmdWxseS5cbiAqXG4gKiBUaGlzIEFncmVlbWVudCBpcyBhIGxlZ2FsbHkgYmluZGluZyBjb250cmFjdCBiZXR3ZWVuXG4gKiB0aGUgTGljZW5zZWUgKGFzIGRlZmluZWQgYmVsb3cpIGFuZCBTcGluYWxDb20gdGhhdFxuICogc2V0cyBmb3J0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgdGhhdCBnb3Zlcm4geW91clxuICogdXNlIG9mIHRoZSBQcm9ncmFtLiBCeSBpbnN0YWxsaW5nIGFuZC9vciB1c2luZyB0aGVcbiAqIFByb2dyYW0sIHlvdSBhZ3JlZSB0byBhYmlkZSBieSBhbGwgdGhlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucyBzdGF0ZWQgb3IgcmVmZXJlbmNlZCBoZXJlaW4uXG4gKlxuICogSWYgeW91IGRvIG5vdCBhZ3JlZSB0byBhYmlkZSBieSB0aGVzZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMsIGRvIG5vdCBkZW1vbnN0cmF0ZSB5b3VyIGFjY2VwdGFuY2UgYW5kIGRvXG4gKiBub3QgaW5zdGFsbCBvciB1c2UgdGhlIFByb2dyYW0uXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFsb25nXG4gKiB3aXRoIHRoaXMgZmlsZS4gSWYgbm90LCBzZWVcbiAqIDxodHRwOi8vcmVzb3VyY2VzLnNwaW5hbGNvbS5jb20vbGljZW5zZXMucGRmPi5cbiAqL1xuXG5pbXBvcnQge1xuICBTUElOQUxfUkVMQVRJT05fVFlQRSxcbiAgU3BpbmFsTm9kZSxcbiAgU3BpbmFsR3JhcGhTZXJ2aWNlXG59IGZyb20gXCJzcGluYWwtZW52LXZpZXdlci1ncmFwaC1zZXJ2aWNlXCI7XG5cblxuaW1wb3J0IGNyZWF0ZVRtcFRyZWUgZnJvbSBcIi4uL2pzL2NyZWF0ZVRtcFRyZWVcIjtcblxuY29uc3QgUFJPR1JFU1NfQkFSX1NJWkVfR0VUX1BST1BTID0gMTA7XG5jb25zdCBQUk9HUkVTU19CQVJfU0laRV9DUkVBVEVfVFJFRSA9IDEwO1xuY29uc3QgUFJPR1JFU1NfQkFSX1NJWkVfQ1JFQVRFX0dSQVBIID0gODA7XG5jb25zdCBNQVhfTk9OX1NZTkNIUk9OSVpFRF9OT0RFUyA9IDMwMDtcblxuLyoqXG4gKiBGaW5kcyB0aGUgY2hpbGRyZW4gaW4gdGhlIG5vZGUgd2l0aCB0aGUgZ2l2ZW4gbmFtZXMuXG4gKiBAcGFyYW0ge1NwaW5hbE5vZGV9IHBhcmVudCBQYXJlbnQgbm9kZSBmcm9tIHdoaWNoIHRvIGdldCB0aGUgY2hpbGRcbiAqIEBwYXJhbSB7SXRlcmF0b3I8U3RyaW5nPn0gbm9kZU5hbWVzIEl0ZXJhdG9yIG92ZXIgdGhlIG5hbWVzIG9mIHRoZSBub2Rlc1xuICogQHBhcmFtIHtTdHJpbmd9IHJlbGF0aW9uTmFtZSBSZWxhdGlvbiBpbiB3aGljaCB0byBzZWFyY2hcbiAqIEByZXR1cm5zIHtBcnJheTxTcGluYWxOb2RlIHwgbnVsbH0gQW4gYXJyYXkgb2YgdGhlIGNoaWxkcmVuIHRoYXQgd2VyZSBmb3VuZCBhbmQgb2YgdW5kZWZpbmVkXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGdldENoaWxkcmVuQnlOYW1lcyhwYXJlbnQsIG5vZGVOYW1lcywgcmVsYXRpb25OYW1lKSB7XG4gIGNvbnN0IGNoaWxkcmVuID0gYXdhaXQgU3BpbmFsR3JhcGhTZXJ2aWNlLmdldENoaWxkcmVuKHBhcmVudC5pZCwgcmVsYXRpb25OYW1lKTtcbiAgY29uc3QgZm91bmQgPSBbXTtcblxuICBmb3IgKGxldCBuYW1lIG9mIG5vZGVOYW1lcykge1xuICAgIGZvdW5kLnB1c2goXG4gICAgICBjaGlsZHJlbi5maW5kKFxuICAgICAgICBjaGlsZCA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNoaWxkLm5hbWUuZ2V0KCkgPT09IG5hbWVcbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gZm91bmQ7XG59XG5cbi8qKlxuICogUmVjdXJzaXZlbHkgYnVpbGRzIHRoZSBnZW9ncmFwaGljIGNvbnRleHQgZnJvbSB0aGUgZ2l2ZW4gbGF5b3V0IGFuZFxuICogdGhlIHRlbXBvcmFyeSB0cmVlIG1hZGUgb2YgbWFwcyAobm9kZXMpIGFuZCBhcnJheXMgKGxlYWZzKSwgeWllbGRpbmcgZXZlcnkgaXQgYWRkcyBhIG5vZGUuXG4gKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgQ29udGV4dCB0byB3aGljaCB0aGUgbm9kZXMgbXVzdCBiZWxvbmdcbiAqIEBwYXJhbSB7U3BpbmFsTm9kZX0gcGFyZW50IFBhcmVudCB0byB3aGljaCB0aGUgY2hpbGRyZW4gbXVzdCBiZSBhZGRlZFxuICogQHBhcmFtIHtNYXA8c3RyaW5nPiB8IEFycmF5PFN0cmluZz59IGNoaWxkcmVuIENoaWxkcmVuIHRvIGFkZCB0byB0aGUgcGFyZW50XG4gKiBAcGFyYW0ge09iamVjdH0gbGF5b3V0IE9iamVjdCBjb250YWluaW5nIHRoZSB0eXBlcyBvZiB0aGUgbm9kZXMgYW5kIG5hbWVzIG9mIHRoZSByZWxhdGlvbnNcbiAqIEBwYXJhbSB7TnVtYmVyfSBkZXB0aCBEZXB0aCBvZiB0aGUgcmVjdXJzaW9uOyBkZXRlcm1pbmVzIHdoYXQgbm9kZSB0eXBlIGFuZCByZWxhdGlvbiBuYW1lIHRvIHVzZVxuICogQHlpZWxkcyB7UHJvbWlzZTxTcGluYWxOb2RlPn0gQSBwcm9taXNlIG9mIHRoZSBsYXN0IG5vZGUgdGhhdCB3YXMgYWRkZWQgdG8gdGhlIGdyYXBoXG4gKi9cbmFzeW5jIGZ1bmN0aW9uKiBnZW5lcmF0ZUdlb0NvbnRleHRSZWMoY29udGV4dCwgcGFyZW50LCBjaGlsZHJlbiwgbGF5b3V0LCBkZXB0aCwgcmVmKSB7XG4gIGNvbnNvbGUubG9nKGNoaWxkcmVuKTtcbiAgaWYgKGNoaWxkcmVuIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgY29uc3QgZm91bmRDaGlsZHJlbiA9IGF3YWl0IGdldENoaWxkcmVuQnlOYW1lcyhwYXJlbnQsIGNoaWxkcmVuLmtleXMoKSwgbGF5b3V0LnJlbGF0aW9uc1tkZXB0aF0pO1xuICAgIGNvbnN0IGVudHJpZXMgPSBjaGlsZHJlbi5lbnRyaWVzKCk7XG5cbiAgICBmb3IgKGxldCBjaGlsZCBvZiBmb3VuZENoaWxkcmVuKSB7XG4gICAgICBsZXQgW25hbWUsIHZhbHVlXSA9IGVudHJpZXMubmV4dCgpLnZhbHVlO1xuXG4gICAgICBpZiAoY2hpbGQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjaGlsZCA9IFNwaW5hbEdyYXBoU2VydmljZS5jcmVhdGVOb2RlKHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIHR5cGU6IGxheW91dC50eXBlc1tkZXB0aF1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgeWllbGQgU3BpbmFsR3JhcGhTZXJ2aWNlLmFkZENoaWxkSW5Db250ZXh0KFxuICAgICAgICAgIHBhcmVudC5pZC5nZXQoKSxcbiAgICAgICAgICBjaGlsZCxcbiAgICAgICAgICBjb250ZXh0LmlkLmdldCgpLFxuICAgICAgICAgIGxheW91dC5yZWxhdGlvbnNbZGVwdGhdLFxuICAgICAgICAgIFNQSU5BTF9SRUxBVElPTl9UWVBFXG4gICAgICAgICk7XG5cbiAgICAgICAgY2hpbGQgPSBTcGluYWxHcmFwaFNlcnZpY2UuZ2V0SW5mbyhjaGlsZCk7XG4gICAgICB9XG5cbiAgICAgIHlpZWxkKiBnZW5lcmF0ZUdlb0NvbnRleHRSZWMoY29udGV4dCwgY2hpbGQsIHZhbHVlLCBsYXlvdXQsIGRlcHRoICsgMSwgcmVmKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9yIChsZXQgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgIFxuICAgICAgLy8gV2lsbCB0aHJvdyBlcnJvciBpZiB3ZSB0cnkgdG8gYWRkIHRoZSBzYW1lIG5vZGUgdHdpY2VcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChyZWYpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyggXCJyZWZcIiwgY2hpbGQsIHBhcmVudCwgY29udGV4dCk7XG4gICAgICAgICAgeWllbGQgd2luZG93LnNwaW5hbC5CaW1PYmplY3RTZXJ2aWNlLmFkZFJlZmVyZW5jZU9iamVjdChwYXJlbnQuaWQuZ2V0KCksIGNoaWxkLmRiSWQsIGNoaWxkLm5hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCBcImFkZE1pblwiLCBjaGlsZCwgcGFyZW50LCBjb250ZXh0KTtcbiAgICAgICAgICB5aWVsZCB3aW5kb3cuc3BpbmFsLkJpbU9iamVjdFNlcnZpY2UuYWRkQklNT2JqZWN0KGNvbnRleHQuaWQuZ2V0KCksIHBhcmVudC5pZC5nZXQoKSwgY2hpbGQuZGJJZCwgY2hpbGQubmFtZSk7XG4gICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHsgY29uc29sZS5lcnJvcihlKX1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBXYWl0cyBmb3IgdGhlIG5vZGVzIHRvIGJlIGluIHRoZSBGaWxlU3lzdGVtLlxuICogQHBhcmFtIHtBcnJheTxQcm9taXNlPn0gcHJvbWlzZXMgQXJyYXkgb2YgcHJvbWlzZXMgY29udGFpbmluZyB0aGUgbm9kZXNcbiAqIEByZXR1cm5zIHtQcm9taXNlPG5vdGhpbmc+fSBBbiBlbXB0eSBwcm9taXNlXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHdhaXRGb3JGaWxlU3lzdGVtKHByb21pc2VzKSB7XG4gIGxldCBub2RlcyA9IGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcblxuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgbGV0IGludGVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgbm9kZXMgPSBub2Rlcy5maWx0ZXIobm9kZSA9PiB7XG4gICAgICAgIHJldHVybiBGaWxlU3lzdGVtLl9vYmplY3RzW25vZGUuX3NlcnZlcl9pZF0gPT09IHVuZGVmaW5lZDtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAobm9kZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXIpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSwgNTAwKTtcbiAgfSk7XG59XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgZ2VvZ3JhcGhpYyBjb250ZXh0IHVzaW5nIHRoZSBhdXRvZGVzayBmb3JnZSBvYmplY3QgdHJlZS5cbiAqIEBwYXJhbSB7U3BpbmFsQ29udGV4dH0gY29udGV4dCBDb250ZXh0IHRvIGZpbGxcbiAqIEBwYXJhbSB7T2JqZWN0fSBsYXlvdXQgT2JqZWN0IGNvbnRhaW5pbmcgdGhlIHR5cGVzLCBrZXlzIGFuZCByZWxhdGlvbiBuYW1lcyBuZWNlc3NhcnkgdG8gZ2VuZXJhdGUgdGhlIGNvbnRleHRcbiAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gcHJvcHMgUHJvcGVydGllcyB0byB1c2VcbiAqIEBwYXJhbSB7T2JqZWN0PHZhbHVlOiBOdW1iZXI+fSBwcm9ncmVzc2lvbiBPYmplY3QgY29udGFpbmluZyB0aGUgcHJvZ3Jlc3Npb24gb2YgdGhlIGdlbmVyYXRpb25cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gcmVmIFRydWUgaWYgdGhlIG9iamVjdHMgbXVzdCBiZSByZWZlcmVuY2Ugb2JqZWN0c1xuICogQHJldHVybnMge1NwaW5hbENvbnRleHR9IFRoZSBnZW9ncmFwaGljIGNvbnRleHRcbiAqL1xuYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVHZW9Db250ZXh0KGNvbnRleHQsIGxheW91dCwgcHJvcHMsIHByb2dyZXNzaW9uLCByZWYpIHtcbiAgcHJvZ3Jlc3Npb24udmFsdWUgPSBQUk9HUkVTU19CQVJfU0laRV9HRVRfUFJPUFM7XG5cbiAgY29uc3QgdG1wVHJlZSA9IGxheW91dC50eXBlcy5sZW5ndGggPiAwID8gY3JlYXRlVG1wVHJlZShwcm9wcykgOiBwcm9wcztcbiAgY29uc3QgaW5jclByb2cgPSBQUk9HUkVTU19CQVJfU0laRV9DUkVBVEVfR1JBUEggKiBNQVhfTk9OX1NZTkNIUk9OSVpFRF9OT0RFUyAvIHByb3BzLmxlbmd0aDtcbiAgbGV0IHByb21pc2VzID0gW107XG5cbiAgcHJvZ3Jlc3Npb24udmFsdWUgKz0gUFJPR1JFU1NfQkFSX1NJWkVfQ1JFQVRFX1RSRUU7XG5cbiAgZm9yIGF3YWl0IChsZXQgcHJvbWlzZSBvZiBnZW5lcmF0ZUdlb0NvbnRleHRSZWMoY29udGV4dCwgY29udGV4dCwgdG1wVHJlZSwgbGF5b3V0LCAwLCByZWYpKSB7XG4gICAgcHJvbWlzZXMucHVzaChwcm9taXNlKTtcblxuICAgIGlmIChwcm9taXNlcy5sZW5ndGggPT09IE1BWF9OT05fU1lOQ0hST05JWkVEX05PREVTKSB7XG4gICAgICBwcm9ncmVzc2lvbi52YWx1ZSArPSBpbmNyUHJvZztcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG4gICAgICBhd2FpdCB3YWl0Rm9yRmlsZVN5c3RlbShwcm9taXNlcyk7XG4gICAgICBwcm9taXNlcyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIGlmIChwcm9taXNlcy5sZW5ndGggIT09IDApIHtcbiAgICBhd2FpdCB3YWl0Rm9yRmlsZVN5c3RlbShwcm9taXNlcyk7XG4gIH1cblxuICBwcm9ncmVzc2lvbi52YWx1ZSA9IDEwMDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2VuZXJhdGVHZW9Db250ZXh0O1xuIl19