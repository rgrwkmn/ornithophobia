export function randomCoords(areaWidth = 0, areaHeight = 0, offsetX = 0, offsetY = 0) {
  return [
    Math.round(areaWidth * Math.random()) + offsetX,
    Math.round(areaHeight * Math.random()) + offsetY
  ];
}
