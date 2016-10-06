export function randomCoords() {
  var areaWidth = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  var areaHeight = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
  var offsetX = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
  var offsetY = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

  return [Math.round(areaWidth * Math.random()) + offsetX, Math.round(areaHeight * Math.random()) + offsetY];
}

// if a true uuid is ever needed, look into node-uuid
// http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zY3JpcHRzL3V0aWxpdGllcy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyYW5kb21Db29yZHMiLCJhcmVhV2lkdGgiLCJhcmVhSGVpZ2h0Iiwib2Zmc2V0WCIsIm9mZnNldFkiLCJNYXRoIiwicm91bmQiLCJyYW5kb20iLCJ1dWlkIiwicmVwbGFjZSIsInIiLCJ2IiwiYyIsInRvU3RyaW5nIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVNBLFlBQVQsR0FBK0U7QUFBQSxNQUF6REMsU0FBeUQseURBQTdDLENBQTZDO0FBQUEsTUFBMUNDLFVBQTBDLHlEQUE3QixDQUE2QjtBQUFBLE1BQTFCQyxPQUEwQix5REFBaEIsQ0FBZ0I7QUFBQSxNQUFiQyxPQUFhLHlEQUFILENBQUc7O0FBQ3BGLFNBQU8sQ0FDTEMsS0FBS0MsS0FBTCxDQUFXTCxZQUFZSSxLQUFLRSxNQUFMLEVBQXZCLElBQXdDSixPQURuQyxFQUVMRSxLQUFLQyxLQUFMLENBQVdKLGFBQWFHLEtBQUtFLE1BQUwsRUFBeEIsSUFBeUNILE9BRnBDLENBQVA7QUFJRDs7QUFFRDtBQUNBO0FBQ0EsT0FBTyxTQUFTSSxJQUFULEdBQWdCO0FBQ3JCLFNBQU8sdUNBQXVDQyxPQUF2QyxDQUErQyxPQUEvQyxFQUF3RCxhQUFLO0FBQ2xFLFFBQUlDLElBQUlMLEtBQUtFLE1BQUwsS0FBZ0IsRUFBaEIsR0FBcUIsQ0FBN0I7QUFBQSxRQUFnQ0ksSUFBSUMsTUFBTSxHQUFOLEdBQVlGLENBQVosR0FBaUJBLElBQUksR0FBSixHQUFVLEdBQS9EO0FBQ0EsV0FBT0MsRUFBRUUsUUFBRixDQUFXLEVBQVgsQ0FBUDtBQUNELEdBSE0sQ0FBUDtBQUlEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbUNvb3JkcyhhcmVhV2lkdGggPSAwLCBhcmVhSGVpZ2h0ID0gMCwgb2Zmc2V0WCA9IDAsIG9mZnNldFkgPSAwKSB7XG4gIHJldHVybiBbXG4gICAgTWF0aC5yb3VuZChhcmVhV2lkdGggKiBNYXRoLnJhbmRvbSgpKSArIG9mZnNldFgsXG4gICAgTWF0aC5yb3VuZChhcmVhSGVpZ2h0ICogTWF0aC5yYW5kb20oKSkgKyBvZmZzZXRZXG4gIF07XG59XG5cbi8vIGlmIGEgdHJ1ZSB1dWlkIGlzIGV2ZXIgbmVlZGVkLCBsb29rIGludG8gbm9kZS11dWlkXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwNTAzNC9jcmVhdGUtZ3VpZC11dWlkLWluLWphdmFzY3JpcHRcbmV4cG9ydCBmdW5jdGlvbiB1dWlkKCkge1xuICByZXR1cm4gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBjID0+IHtcbiAgICB2YXIgciA9IE1hdGgucmFuZG9tKCkgKiAxNiB8IDAsIHYgPSBjID09PSAneCcgPyByIDogKHIgJiAweDMgfCAweDgpO1xuICAgIHJldHVybiB2LnRvU3RyaW5nKDE2KTtcbiAgfSk7XG59XG5cbiJdfQ==