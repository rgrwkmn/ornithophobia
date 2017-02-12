export function randomCoords() {
  var areaWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var areaHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var offsetX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var offsetY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  return [Math.round(areaWidth * Math.random()) + offsetX, Math.round(areaHeight * Math.random()) + offsetY];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zY3JpcHRzL3V0aWxpdGllcy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyYW5kb21Db29yZHMiLCJhcmVhV2lkdGgiLCJhcmVhSGVpZ2h0Iiwib2Zmc2V0WCIsIm9mZnNldFkiLCJNYXRoIiwicm91bmQiLCJyYW5kb20iXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBU0EsWUFBVCxHQUErRTtBQUFBLE1BQXpEQyxTQUF5RCx1RUFBN0MsQ0FBNkM7QUFBQSxNQUExQ0MsVUFBMEMsdUVBQTdCLENBQTZCO0FBQUEsTUFBMUJDLE9BQTBCLHVFQUFoQixDQUFnQjtBQUFBLE1BQWJDLE9BQWEsdUVBQUgsQ0FBRzs7QUFDcEYsU0FBTyxDQUNMQyxLQUFLQyxLQUFMLENBQVdMLFlBQVlJLEtBQUtFLE1BQUwsRUFBdkIsSUFBd0NKLE9BRG5DLEVBRUxFLEtBQUtDLEtBQUwsQ0FBV0osYUFBYUcsS0FBS0UsTUFBTCxFQUF4QixJQUF5Q0gsT0FGcEMsQ0FBUDtBQUlEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbUNvb3JkcyhhcmVhV2lkdGggPSAwLCBhcmVhSGVpZ2h0ID0gMCwgb2Zmc2V0WCA9IDAsIG9mZnNldFkgPSAwKSB7XG4gIHJldHVybiBbXG4gICAgTWF0aC5yb3VuZChhcmVhV2lkdGggKiBNYXRoLnJhbmRvbSgpKSArIG9mZnNldFgsXG4gICAgTWF0aC5yb3VuZChhcmVhSGVpZ2h0ICogTWF0aC5yYW5kb20oKSkgKyBvZmZzZXRZXG4gIF07XG59XG4iXX0=