var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import TiledLevelState from '../engine/TiledLevelState';
import { tellPlayer } from '../engine/interactions';

var State = function (_TiledLevelState) {
  _inherits(State, _TiledLevelState);

  function State() {
    _classCallCheck(this, State);

    return _possibleConstructorReturn(this, (State.__proto__ || Object.getPrototypeOf(State)).apply(this, arguments));
  }

  _createClass(State, [{
    key: 'init',
    value: function init() {
      _get(State.prototype.__proto__ || Object.getPrototypeOf(State.prototype), 'init', this).call(this, {
        mapPath: '/assets/maps/larger/larger.json'
      });
    }
  }, {
    key: 'preload',
    value: function preload() {
      _get(State.prototype.__proto__ || Object.getPrototypeOf(State.prototype), 'preload', this).call(this);
    }
  }, {
    key: 'create',
    value: function create() {
      _get(State.prototype.__proto__ || Object.getPrototypeOf(State.prototype), 'create', this).call(this);

      tellPlayer({ message: 'you awaken in a rocky forest' });
      tellPlayer({ message: 'there are pixels around you that should probably be transparent' });
      tellPlayer({ message: 'you somehow know that in order to leave this place' });
      tellPlayer({ message: 'you will have to unlock some doors...' });
    }
  }, {
    key: 'update',
    value: function update() {
      _get(State.prototype.__proto__ || Object.getPrototypeOf(State.prototype), 'update', this).call(this);
    }
  }]);

  return State;
}(TiledLevelState);

export default State;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zY3JpcHRzL3Bvc3Nlc3Npb24vc3RhdGUuanMiXSwibmFtZXMiOlsiVGlsZWRMZXZlbFN0YXRlIiwidGVsbFBsYXllciIsIlN0YXRlIiwibWFwUGF0aCIsIm1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxlQUFQLE1BQTRCLDJCQUE1QjtBQUNBLFNBQVNDLFVBQVQsUUFBMkIsd0JBQTNCOztJQUVNQyxLOzs7Ozs7Ozs7OzsyQkFDRztBQUNMLHlHQUFXO0FBQ1RDLGlCQUFTO0FBREEsT0FBWDtBQUdEOzs7OEJBQ1M7QUFDUjtBQUNEOzs7NkJBQ1E7QUFDUDs7QUFFQUYsaUJBQVcsRUFBRUcsU0FBUyw4QkFBWCxFQUFYO0FBQ0FILGlCQUFXLEVBQUVHLFNBQVMsaUVBQVgsRUFBWDtBQUNBSCxpQkFBVyxFQUFFRyxTQUFTLG9EQUFYLEVBQVg7QUFDQUgsaUJBQVcsRUFBRUcsU0FBUyx1Q0FBWCxFQUFYO0FBQ0Q7Ozs2QkFDUTtBQUNQO0FBQ0Q7Ozs7RUFuQmlCSixlOztBQXNCcEIsZUFBZUUsS0FBZiIsImZpbGUiOiJzdGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUaWxlZExldmVsU3RhdGUgZnJvbSAnLi4vZW5naW5lL1RpbGVkTGV2ZWxTdGF0ZSc7XG5pbXBvcnQgeyB0ZWxsUGxheWVyIH0gZnJvbSAnLi4vZW5naW5lL2ludGVyYWN0aW9ucyc7XG5cbmNsYXNzIFN0YXRlIGV4dGVuZHMgVGlsZWRMZXZlbFN0YXRlIHtcbiAgaW5pdCgpIHtcbiAgICBzdXBlci5pbml0KHtcbiAgICAgIG1hcFBhdGg6ICcvYXNzZXRzL21hcHMvbGFyZ2VyL2xhcmdlci5qc29uJ1xuICAgIH0pO1xuICB9XG4gIHByZWxvYWQoKSB7XG4gICAgc3VwZXIucHJlbG9hZCgpO1xuICB9XG4gIGNyZWF0ZSgpIHtcbiAgICBzdXBlci5jcmVhdGUoKTtcblxuICAgIHRlbGxQbGF5ZXIoeyBtZXNzYWdlOiAneW91IGF3YWtlbiBpbiBhIHJvY2t5IGZvcmVzdCcgfSk7XG4gICAgdGVsbFBsYXllcih7IG1lc3NhZ2U6ICd0aGVyZSBhcmUgcGl4ZWxzIGFyb3VuZCB5b3UgdGhhdCBzaG91bGQgcHJvYmFibHkgYmUgdHJhbnNwYXJlbnQnIH0pO1xuICAgIHRlbGxQbGF5ZXIoeyBtZXNzYWdlOiAneW91IHNvbWVob3cga25vdyB0aGF0IGluIG9yZGVyIHRvIGxlYXZlIHRoaXMgcGxhY2UnIH0pO1xuICAgIHRlbGxQbGF5ZXIoeyBtZXNzYWdlOiAneW91IHdpbGwgaGF2ZSB0byB1bmxvY2sgc29tZSBkb29ycy4uLicgfSk7XG4gIH1cbiAgdXBkYXRlKCkge1xuICAgIHN1cGVyLnVwZGF0ZSgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YXRlO1xuIl19