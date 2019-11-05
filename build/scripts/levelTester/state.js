var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import TiledLevelState from '../engine/TiledLevelState';

var State = function (_TiledLevelState) {
  _inherits(State, _TiledLevelState);

  function State() {
    _classCallCheck(this, State);

    return _possibleConstructorReturn(this, (State.__proto__ || Object.getPrototypeOf(State)).apply(this, arguments));
  }

  _createClass(State, [{
    key: 'init',
    value: function init() {
      var map = window.location.search.match(/map=([^&]+)/);
      if (!map) {
        console.error('YO YO YO: can\'t load map from url path: ' + window.location.href + '. Looking for ?map=mapFolder/mapJson.json');
        console.error('Try http://localhost:8001/?map=larger/larger.json');
      }
      var mapPath = '/assets/maps/' + map[1];
      console.log('Loading map ' + mapPath);
      _get(State.prototype.__proto__ || Object.getPrototypeOf(State.prototype), 'init', this).call(this, { mapPath: mapPath });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zY3JpcHRzL2xldmVsVGVzdGVyL3N0YXRlLmpzIl0sIm5hbWVzIjpbIlRpbGVkTGV2ZWxTdGF0ZSIsIlN0YXRlIiwibWFwIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJtYXRjaCIsImNvbnNvbGUiLCJlcnJvciIsImhyZWYiLCJtYXBQYXRoIiwibG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBT0EsZUFBUCxNQUE0QiwyQkFBNUI7O0lBRU1DLEs7Ozs7Ozs7Ozs7OzJCQUNHO0FBQ0wsVUFBTUMsTUFBTUMsT0FBT0MsUUFBUCxDQUFnQkMsTUFBaEIsQ0FBdUJDLEtBQXZCLENBQTZCLGFBQTdCLENBQVo7QUFDQSxVQUFJLENBQUNKLEdBQUwsRUFBVTtBQUNSSyxnQkFBUUMsS0FBUiwrQ0FBeURMLE9BQU9DLFFBQVAsQ0FBZ0JLLElBQXpFO0FBQ0FGLGdCQUFRQyxLQUFSLENBQWMsbURBQWQ7QUFDRDtBQUNELFVBQU1FLDRCQUEwQlIsSUFBSSxDQUFKLENBQWhDO0FBQ0FLLGNBQVFJLEdBQVIsa0JBQTJCRCxPQUEzQjtBQUNBLHlHQUFXLEVBQUVBLGdCQUFGLEVBQVg7QUFDRDs7OzhCQUNTO0FBQ1I7QUFDRDs7OzZCQUNRO0FBQ1A7QUFDRDs7OzZCQUNRO0FBQ1A7QUFDRDs7OztFQW5CaUJWLGU7O0FBc0JwQixlQUFlQyxLQUFmIiwiZmlsZSI6InN0YXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRpbGVkTGV2ZWxTdGF0ZSBmcm9tICcuLi9lbmdpbmUvVGlsZWRMZXZlbFN0YXRlJztcblxuY2xhc3MgU3RhdGUgZXh0ZW5kcyBUaWxlZExldmVsU3RhdGUge1xuICBpbml0KCkge1xuICAgIGNvbnN0IG1hcCA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gubWF0Y2goL21hcD0oW14mXSspLyk7XG4gICAgaWYgKCFtYXApIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYFlPIFlPIFlPOiBjYW4ndCBsb2FkIG1hcCBmcm9tIHVybCBwYXRoOiAke3dpbmRvdy5sb2NhdGlvbi5ocmVmfS4gTG9va2luZyBmb3IgP21hcD1tYXBGb2xkZXIvbWFwSnNvbi5qc29uYCk7XG4gICAgICBjb25zb2xlLmVycm9yKCdUcnkgaHR0cDovL2xvY2FsaG9zdDo4MDAxLz9tYXA9bGFyZ2VyL2xhcmdlci5qc29uJyk7XG4gICAgfVxuICAgIGNvbnN0IG1hcFBhdGggPSBgL2Fzc2V0cy9tYXBzLyR7bWFwWzFdfWA7XG4gICAgY29uc29sZS5sb2coYExvYWRpbmcgbWFwICR7bWFwUGF0aH1gKTtcbiAgICBzdXBlci5pbml0KHsgbWFwUGF0aCB9KTtcbiAgfVxuICBwcmVsb2FkKCkge1xuICAgIHN1cGVyLnByZWxvYWQoKTtcbiAgfVxuICBjcmVhdGUoKSB7XG4gICAgc3VwZXIuY3JlYXRlKCk7XG4gIH1cbiAgdXBkYXRlKCkge1xuICAgIHN1cGVyLnVwZGF0ZSgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YXRlO1xuIl19