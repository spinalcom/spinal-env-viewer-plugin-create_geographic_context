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
      context = _spinalEnvViewerGraphService.SpinalGraphService.getRealNode(context.id.get());
      parent = _spinalEnvViewerGraphService.SpinalGraphService.getRealNode(parent.id.get());
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          let child = _step3.value;

          // Will throw error if we try to add the same node twice
          try {
            if (ref) {
              console.log("1 ref:", ref);
              yield _spinalEnvViewerPluginBimobjectservice.default.addReferenceObject(parent, child.dbId, child.name);
            } else {
              console.log("2 ref:", ref);
              yield _spinalEnvViewerPluginBimobjectservice.default.addBIMObject(context, parent, child.dbId, child.name);
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
    console.log("in generate geo context, ref:", ref);
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
      console.log("in generate geo context2, ref:", ref);
      yield waitForFileSystem(promises);
    }

    progression.value = 100;
  });
  return _generateGeoContext.apply(this, arguments);
}

var _default = generateGeoContext;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2pzL2dlbmVyYXRlR2VvZ3JhcGhpY0NvbnRleHQuanMiXSwibmFtZXMiOlsiUFJPR1JFU1NfQkFSX1NJWkVfR0VUX1BST1BTIiwiUFJPR1JFU1NfQkFSX1NJWkVfQ1JFQVRFX1RSRUUiLCJQUk9HUkVTU19CQVJfU0laRV9DUkVBVEVfR1JBUEgiLCJNQVhfTk9OX1NZTkNIUk9OSVpFRF9OT0RFUyIsImdldENoaWxkcmVuQnlOYW1lcyIsInBhcmVudCIsIm5vZGVOYW1lcyIsInJlbGF0aW9uTmFtZSIsImNoaWxkcmVuIiwiU3BpbmFsR3JhcGhTZXJ2aWNlIiwiZ2V0Q2hpbGRyZW4iLCJpZCIsImZvdW5kIiwibmFtZSIsInB1c2giLCJmaW5kIiwiY2hpbGQiLCJnZXQiLCJnZW5lcmF0ZUdlb0NvbnRleHRSZWMiLCJjb250ZXh0IiwibGF5b3V0IiwiZGVwdGgiLCJyZWYiLCJNYXAiLCJmb3VuZENoaWxkcmVuIiwia2V5cyIsInJlbGF0aW9ucyIsImVudHJpZXMiLCJuZXh0IiwidmFsdWUiLCJ1bmRlZmluZWQiLCJjcmVhdGVOb2RlIiwidHlwZSIsInR5cGVzIiwiYWRkQ2hpbGRJbkNvbnRleHQiLCJTUElOQUxfUkVMQVRJT05fVFlQRSIsImdldEluZm8iLCJnZXRSZWFsTm9kZSIsImNvbnNvbGUiLCJsb2ciLCJiaW1PYmplY3RTZXJ2aWNlIiwiYWRkUmVmZXJlbmNlT2JqZWN0IiwiZGJJZCIsImFkZEJJTU9iamVjdCIsImUiLCJlcnJvciIsIndhaXRGb3JGaWxlU3lzdGVtIiwicHJvbWlzZXMiLCJub2RlcyIsIlByb21pc2UiLCJhbGwiLCJyZXNvbHZlIiwiaW50ZXIiLCJzZXRJbnRlcnZhbCIsImZpbHRlciIsIm5vZGUiLCJGaWxlU3lzdGVtIiwiX29iamVjdHMiLCJfc2VydmVyX2lkIiwibGVuZ3RoIiwiY2xlYXJJbnRlcnZhbCIsImdlbmVyYXRlR2VvQ29udGV4dCIsInByb3BzIiwicHJvZ3Jlc3Npb24iLCJ0bXBUcmVlIiwiaW5jclByb2ciLCJwcm9t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QTdFNEMsT0FBNkU7QUFDMUZuQixRQUFBQSxRQUFRLENBQUNqQyxJQUFULENBQWNvRCxPQUFkOztBQUVBLFlBQUluQixRQUFRLENBQUNZLE1BQVQsS0FBb0J4RCwwQkFBeEIsRUFBb0Q7QUFDbEQ0RCxVQUFBQSxXQUFXLENBQUNsQyxLQUFaLElBQXFCb0MsUUFBckIsQ0FEa0QsQ0FFbEQ7O0FBQ0EsZ0JBQU1uQixpQkFBaUIsQ0FBQ0MsUUFBRCxDQUF2QjtBQUNBQSxVQUFBQSxRQUFRLEdBQUcsRUFBWDtBQUNEO0FBQ0Y7QUFwQnlFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBc0IxRSxRQUFJQSxRQUFRLENBQUNZLE1BQVQsS0FBb0IsQ0FBeEIsRUFBMkI7QUFDekJyQixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxnQ0FBWixFQUE4Q2pCLEdBQTlDO0FBQ0EsWUFBTXdCLGlCQUFpQixDQUFDQyxRQUFELENBQXZCO0FBQ0Q7O0FBRURnQixJQUFBQSxXQUFXLENBQUNsQyxLQUFaLEdBQW9CLEdBQXBCO0FBQ0QsRzs7OztlQUVjZ0Msa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTggU3BpbmFsQ29tIC0gd3d3LnNwaW5hbGNvbS5jb21cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBTcGluYWxDb3JlLlxuICpcbiAqIFBsZWFzZSByZWFkIGFsbCBvZiB0aGUgZm9sbG93aW5nIHRlcm1zIGFuZCBjb25kaXRpb25zXG4gKiBvZiB0aGUgRnJlZSBTb2Z0d2FyZSBsaWNlbnNlIEFncmVlbWVudCAoXCJBZ3JlZW1lbnRcIilcbiAqIGNhcmVmdWxseS5cbiAqXG4gKiBUaGlzIEFncmVlbWVudCBpcyBhIGxlZ2FsbHkgYmluZGluZyBjb250cmFjdCBiZXR3ZWVuXG4gKiB0aGUgTGljZW5zZWUgKGFzIGRlZmluZWQgYmVsb3cpIGFuZCBTcGluYWxDb20gdGhhdFxuICogc2V0cyBmb3J0aCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnMgdGhhdCBnb3Zlcm4geW91clxuICogdXNlIG9mIHRoZSBQcm9ncmFtLiBCeSBpbnN0YWxsaW5nIGFuZC9vciB1c2luZyB0aGVcbiAqIFByb2dyYW0sIHlvdSBhZ3JlZSB0byBhYmlkZSBieSBhbGwgdGhlIHRlcm1zIGFuZFxuICogY29uZGl0aW9ucyBzdGF0ZWQgb3IgcmVmZXJlbmNlZCBoZXJlaW4uXG4gKlxuICogSWYgeW91IGRvIG5vdCBhZ3JlZSB0byBhYmlkZSBieSB0aGVzZSB0ZXJtcyBhbmRcbiAqIGNvbmRpdGlvbnMsIGRvIG5vdCBkZW1vbnN0cmF0ZSB5b3VyIGFjY2VwdGFuY2UgYW5kIGRvXG4gKiBub3QgaW5zdGFsbCBvciB1c2UgdGhlIFByb2dyYW0uXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBsaWNlbnNlIGFsb25nXG4gKiB3aXRoIHRoaXMgZmlsZS4gSWYgbm90LCBzZWVcbiAqIDxodHRwOi8vcmVzb3VyY2VzLnNwaW5hbGNvbS5jb20vbGljZW5zZXMucGRmPi5cbiAqL1xuXG5pbXBvcnQge1xuICBTUElOQUxfUkVMQVRJT05fVFlQRSxcbiAgU3BpbmFsTm9kZSxcbiAgU3BpbmFsR3JhcGhTZXJ2aWNlXG59IGZyb20gXCJzcGluYWwtZW52LXZpZXdlci1ncmFwaC1zZXJ2aWNlXCI7XG5pbXBvcnQgYmltT2JqZWN0U2VydmljZSBmcm9tIFwic3BpbmFsLWVudi12aWV3ZXItcGx1Z2luLWJpbW9iamVjdHNlcnZpY2VcIjtcblxuaW1wb3J0IGNyZWF0ZVRtcFRyZWUgZnJvbSBcIi4uL2pzL2NyZWF0ZVRtcFRyZWVcIjtcblxuY29uc3QgUFJPR1JFU1NfQkFSX1NJWkVfR0VUX1BST1BTID0gMTA7XG5jb25zdCBQUk9HUkVTU19CQVJfU0laRV9DUkVBVEVfVFJFRSA9IDEwO1xuY29uc3QgUFJPR1JFU1NfQkFSX1NJWkVfQ1JFQVRFX0dSQVBIID0gODA7XG5jb25zdCBNQVhfTk9OX1NZTkNIUk9OSVpFRF9OT0RFUyA9IDMwMDtcblxuLyoqXG4gKiBGaW5kcyB0aGUgY2hpbGRyZW4gaW4gdGhlIG5vZGUgd2l0aCB0aGUgZ2l2ZW4gbmFtZXMuXG4gKiBAcGFyYW0ge1NwaW5hbE5vZGV9IHBhcmVudCBQYXJlbnQgbm9kZSBmcm9tIHdoaWNoIHRvIGdldCB0aGUgY2hpbGRcbiAqIEBwYXJhbSB7SXRlcmF0b3I8U3RyaW5nPn0gbm9kZU5hbWVzIEl0ZXJhdG9yIG92ZXIgdGhlIG5hbWVzIG9mIHRoZSBub2Rlc1xuICogQHBhcmFtIHtTdHJpbmd9IHJlbGF0aW9uTmFtZSBSZWxhdGlvbiBpbiB3aGljaCB0byBzZWFyY2hcbiAqIEByZXR1cm5zIHtBcnJheTxTcGluYWxOb2RlIHwgbnVsbH0gQW4gYXJyYXkgb2YgdGhlIGNoaWxkcmVuIHRoYXQgd2VyZSBmb3VuZCBhbmQgb2YgdW5kZWZpbmVkXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGdldENoaWxkcmVuQnlOYW1lcyhwYXJlbnQsIG5vZGVOYW1lcywgcmVsYXRpb25OYW1lKSB7XG4gIGNvbnN0IGNoaWxkcmVuID0gYXdhaXQgU3BpbmFsR3JhcGhTZXJ2aWNlLmdldENoaWxkcmVuKHBhcmVudC5pZCwgcmVsYXRpb25OYW1lKTtcbiAgY29uc3QgZm91bmQgPSBbXTtcblxuICBmb3IgKGxldCBuYW1lIG9mIG5vZGVOYW1lcykge1xuICAgIGZvdW5kLnB1c2goXG4gICAgICBjaGlsZHJlbi5maW5kKFxuICAgICAgICBjaGlsZCA9PiB7XG4gICAgICAgICAgcmV0dXJuIGNoaWxkLm5hbWUuZ2V0KCkgPT09IG5hbWVcbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gZm91bmQ7XG59XG5cbi8qKlxuICogUmVjdXJzaXZlbHkgYnVpbGRzIHRoZSBnZW9ncmFwaGljIGNvbnRleHQgZnJvbSB0aGUgZ2l2ZW4gbGF5b3V0IGFuZFxuICogdGhlIHRlbXBvcmFyeSB0cmVlIG1hZGUgb2YgbWFwcyAobm9kZXMpIGFuZCBhcnJheXMgKGxlYWZzKSwgeWllbGRpbmcgZXZlcnkgaXQgYWRkcyBhIG5vZGUuXG4gKiBAcGFyYW0ge1NwaW5hbENvbnRleHR9IGNvbnRleHQgQ29udGV4dCB0byB3aGljaCB0aGUgbm9kZXMgbXVzdCBiZWxvbmdcbiAqIEBwYXJhbSB7U3BpbmFsTm9kZX0gcGFyZW50IFBhcmVudCB0byB3aGljaCB0aGUgY2hpbGRyZW4gbXVzdCBiZSBhZGRlZFxuICogQHBhcmFtIHtNYXA8c3RyaW5nPiB8IEFycmF5PFN0cmluZz59IGNoaWxkcmVuIENoaWxkcmVuIHRvIGFkZCB0byB0aGUgcGFyZW50XG4gKiBAcGFyYW0ge09iamVjdH0gbGF5b3V0IE9iamVjdCBjb250YWluaW5nIHRoZSB0eXBlcyBvZiB0aGUgbm9kZXMgYW5kIG5hbWVzIG9mIHRoZSByZWxhdGlvbnNcbiAqIEBwYXJhbSB7TnVtYmVyfSBkZXB0aCBEZXB0aCBvZiB0aGUgcmVjdXJzaW9uOyBkZXRlcm1pbmVzIHdoYXQgbm9kZSB0eXBlIGFuZCByZWxhdGlvbiBuYW1lIHRvIHVzZVxuICogQHlpZWxkcyB7UHJvbWlzZTxTcGluYWxOb2RlPn0gQSBwcm9taXNlIG9mIHRoZSBsYXN0IG5vZGUgdGhhdCB3YXMgYWRkZWQgdG8gdGhlIGdyYXBoXG4gKi9cbmFzeW5jIGZ1bmN0aW9uKiBnZW5lcmF0ZUdlb0NvbnRleHRSZWMoY29udGV4dCwgcGFyZW50LCBjaGlsZHJlbiwgbGF5b3V0LCBkZXB0aCwgcmVmKSB7XG4gIGlmIChjaGlsZHJlbiBpbnN0YW5jZW9mIE1hcCkge1xuICAgIGNvbnN0IGZvdW5kQ2hpbGRyZW4gPSBhd2FpdCBnZXRDaGlsZHJlbkJ5TmFtZXMocGFyZW50LCBjaGlsZHJlbi5rZXlzKCksIGxheW91dC5yZWxhdGlvbnNbZGVwdGhdKTtcbiAgICBjb25zdCBlbnRyaWVzID0gY2hpbGRyZW4uZW50cmllcygpO1xuXG4gICAgZm9yIChsZXQgY2hpbGQgb2YgZm91bmRDaGlsZHJlbikge1xuICAgICAgbGV0IFtuYW1lLCB2YWx1ZV0gPSBlbnRyaWVzLm5leHQoKS52YWx1ZTtcblxuICAgICAgaWYgKGNoaWxkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2hpbGQgPSBTcGluYWxHcmFwaFNlcnZpY2UuY3JlYXRlTm9kZSh7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICB0eXBlOiBsYXlvdXQudHlwZXNbZGVwdGhdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHlpZWxkIFNwaW5hbEdyYXBoU2VydmljZS5hZGRDaGlsZEluQ29udGV4dChcbiAgICAgICAgICBwYXJlbnQuaWQuZ2V0KCksXG4gICAgICAgICAgY2hpbGQsXG4gICAgICAgICAgY29udGV4dC5pZC5nZXQoKSxcbiAgICAgICAgICBsYXlvdXQucmVsYXRpb25zW2RlcHRoXSxcbiAgICAgICAgICBTUElOQUxfUkVMQVRJT05fVFlQRVxuICAgICAgICApO1xuXG4gICAgICAgIGNoaWxkID0gU3BpbmFsR3JhcGhTZXJ2aWNlLmdldEluZm8oY2hpbGQpO1xuICAgICAgfVxuXG4gICAgICB5aWVsZCogZ2VuZXJhdGVHZW9Db250ZXh0UmVjKGNvbnRleHQsIGNoaWxkLCB2YWx1ZSwgbGF5b3V0LCBkZXB0aCArIDEsIHJlZik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnRleHQgPSBTcGluYWxHcmFwaFNlcnZpY2UuZ2V0UmVhbE5vZGUoY29udGV4dC5pZC5nZXQoKSk7XG4gICAgcGFyZW50ID0gU3BpbmFsR3JhcGhTZXJ2aWNlLmdldFJlYWxOb2RlKHBhcmVudC5pZC5nZXQoKSk7XG5cbiAgICBmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgLy8gV2lsbCB0aHJvdyBlcnJvciBpZiB3ZSB0cnkgdG8gYWRkIHRoZSBzYW1lIG5vZGUgdHdpY2VcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChyZWYpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIjEgcmVmOlwiLCByZWYpXG4gICAgICAgICAgeWllbGQgYmltT2JqZWN0U2VydmljZS5hZGRSZWZlcmVuY2VPYmplY3QocGFyZW50LCBjaGlsZC5kYklkLCBjaGlsZC5uYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIjIgcmVmOlwiLCByZWYpXG4gICAgICAgICAgeWllbGQgYmltT2JqZWN0U2VydmljZS5hZGRCSU1PYmplY3QoY29udGV4dCwgcGFyZW50LCBjaGlsZC5kYklkLCBjaGlsZC5uYW1lKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFdhaXRzIGZvciB0aGUgbm9kZXMgdG8gYmUgaW4gdGhlIEZpbGVTeXN0ZW0uXG4gKiBAcGFyYW0ge0FycmF5PFByb21pc2U+fSBwcm9taXNlcyBBcnJheSBvZiBwcm9taXNlcyBjb250YWluaW5nIHRoZSBub2Rlc1xuICogQHJldHVybnMge1Byb21pc2U8bm90aGluZz59IEFuIGVtcHR5IHByb21pc2VcbiAqL1xuYXN5bmMgZnVuY3Rpb24gd2FpdEZvckZpbGVTeXN0ZW0ocHJvbWlzZXMpIHtcbiAgbGV0IG5vZGVzID0gYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICBsZXQgaW50ZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBub2RlcyA9IG5vZGVzLmZpbHRlcihub2RlID0+IHtcbiAgICAgICAgcmV0dXJuIEZpbGVTeXN0ZW0uX29iamVjdHNbbm9kZS5fc2VydmVyX2lkXSA9PT0gdW5kZWZpbmVkO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChub2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcik7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9LCA1MDApO1xuICB9KTtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBnZW9ncmFwaGljIGNvbnRleHQgdXNpbmcgdGhlIGF1dG9kZXNrIGZvcmdlIG9iamVjdCB0cmVlLlxuICogQHBhcmFtIHtTcGluYWxDb250ZXh0fSBjb250ZXh0IENvbnRleHQgdG8gZmlsbFxuICogQHBhcmFtIHtPYmplY3R9IGxheW91dCBPYmplY3QgY29udGFpbmluZyB0aGUgdHlwZXMsIGtleXMgYW5kIHJlbGF0aW9uIG5hbWVzIG5lY2Vzc2FyeSB0byBnZW5lcmF0ZSB0aGUgY29udGV4dFxuICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSBwcm9wcyBQcm9wZXJ0aWVzIHRvIHVzZVxuICogQHBhcmFtIHtPYmplY3Q8dmFsdWU6IE51bWJlcj59IHByb2dyZXNzaW9uIE9iamVjdCBjb250YWluaW5nIHRoZSBwcm9ncmVzc2lvbiBvZiB0aGUgZ2VuZXJhdGlvblxuICogQHBhcmFtIHtCb29sZWFufSByZWYgVHJ1ZSBpZiB0aGUgb2JqZWN0cyBtdXN0IGJlIHJlZmVyZW5jZSBvYmplY3RzXG4gKiBAcmV0dXJucyB7U3BpbmFsQ29udGV4dH0gVGhlIGdlb2dyYXBoaWMgY29udGV4dFxuICovXG5hc3luYyBmdW5jdGlvbiBnZW5lcmF0ZUdlb0NvbnRleHQoY29udGV4dCwgbGF5b3V0LCBwcm9wcywgcHJvZ3Jlc3Npb24sIHJlZikge1xuICBwcm9ncmVzc2lvbi52YWx1ZSA9IFBST0dSRVNTX0JBUl9TSVpFX0dFVF9QUk9QUztcblxuICBjb25zdCB0bXBUcmVlID0gbGF5b3V0LnR5cGVzLmxlbmd0aCA+IDAgPyBjcmVhdGVUbXBUcmVlKHByb3BzKSA6IHByb3BzO1xuICBjb25zdCBpbmNyUHJvZyA9IFBST0dSRVNTX0JBUl9TSVpFX0NSRUFURV9HUkFQSCAqIE1BWF9OT05fU1lOQ0hST05JWkVEX05PREVTIC8gcHJvcHMubGVuZ3RoO1xuICBsZXQgcHJvbWlzZXMgPSBbXTtcblxuICBwcm9ncmVzc2lvbi52YWx1ZSArPSBQUk9HUkVTU19CQVJfU0laRV9DUkVBVEVfVFJFRTtcblxuICBjb25zb2xlLmxvZyhcImluIGdlbmVyYXRlIGdlbyBjb250ZXh0LCByZWY6XCIsIHJlZilcblxuICBmb3IgYXdhaXQgKGxldCBwcm9taXNlIG9mIGdlbmVyYXRlR2VvQ29udGV4dFJlYyhjb250ZXh0LCBjb250ZXh0LCB0bXBUcmVlLCBsYXlvdXQsIDAsIHJlZikpIHtcbiAgICBwcm9taXNlcy5wdXNoKHByb21pc2UpO1xuXG4gICAgaWYgKHByb21pc2VzLmxlbmd0aCA9PT0gTUFYX05PTl9TWU5DSFJPTklaRURfTk9ERVMpIHtcbiAgICAgIHByb2dyZXNzaW9uLnZhbHVlICs9IGluY3JQcm9nO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3BcbiAgICAgIGF3YWl0IHdhaXRGb3JGaWxlU3lzdGVtKHByb21pc2VzKTtcbiAgICAgIHByb21pc2VzID0gW107XG4gICAgfVxuICB9XG5cbiAgaWYgKHByb21pc2VzLmxlbmd0aCAhPT0gMCkge1xuICAgIGNvbnNvbGUubG9nKFwiaW4gZ2VuZXJhdGUgZ2VvIGNvbnRleHQyLCByZWY6XCIsIHJlZilcbiAgICBhd2FpdCB3YWl0Rm9yRmlsZVN5c3RlbShwcm9taXNlcyk7XG4gIH1cblxuICBwcm9ncmVzc2lvbi52YWx1ZSA9IDEwMDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2VuZXJhdGVHZW9Db250ZXh0O1xuIl19