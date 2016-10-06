export function randomCoords(areaWidth = 0, areaHeight = 0, offsetX = 0, offsetY = 0) {
  return [
    Math.round(areaWidth * Math.random()) + offsetX,
    Math.round(areaHeight * Math.random()) + offsetY
  ];
}

// if a true uuid is ever needed, look into node-uuid
// http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

