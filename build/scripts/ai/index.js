function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { uuid } from 'ornithophobia/utilities';

export function createState() {
  return {};
}

export function addSpriteToState(state, entity, behavior) {
  if (!entity.data) {
    console.error(entity);
    throw new Error('addSpriteToState: Cannot controll behavior of an entity that doesn\'t have a data key');
  }
  if (entity.data.uuid) {
    console.error(entity);
    throw new Error('addSpriteToState: This entity already has a uuid.');
  }
  entity.data.uuid = uuid();
  return Object.assign({}, state, _defineProperty({}, entity.data.uuid, behavior));
}

export function addGroupToState() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? createState() : arguments[0];
  var sprites = arguments[1];
  var behavior = arguments[2];

  return sprites.reduce(function (state, sprite) {
    return addSpriteToState(state, sprite, behavior);
  }, state);
}

// run behaviors on sprites
export function updateAiState(state, sprites) {}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zY3JpcHRzL2FpL2luZGV4LmpzIl0sIm5hbWVzIjpbInV1aWQiLCJjcmVhdGVTdGF0ZSIsImFkZFNwcml0ZVRvU3RhdGUiLCJzdGF0ZSIsImVudGl0eSIsImJlaGF2aW9yIiwiZGF0YSIsImNvbnNvbGUiLCJlcnJvciIsIkVycm9yIiwiT2JqZWN0IiwiYXNzaWduIiwiYWRkR3JvdXBUb1N0YXRlIiwic3ByaXRlcyIsInJlZHVjZSIsInNwcml0ZSIsInVwZGF0ZUFpU3RhdGUiXSwibWFwcGluZ3MiOiI7O0FBQUEsU0FBU0EsSUFBVCxRQUFxQix5QkFBckI7O0FBRUEsT0FBTyxTQUFTQyxXQUFULEdBQXVCO0FBQzVCLFNBQU8sRUFBUDtBQUNEOztBQUVELE9BQU8sU0FBU0MsZ0JBQVQsQ0FBMEJDLEtBQTFCLEVBQWlDQyxNQUFqQyxFQUF5Q0MsUUFBekMsRUFBbUQ7QUFDeEQsTUFBSSxDQUFDRCxPQUFPRSxJQUFaLEVBQWtCO0FBQ2hCQyxZQUFRQyxLQUFSLENBQWNKLE1BQWQ7QUFDQSxVQUFNLElBQUlLLEtBQUosQ0FBVSx1RkFBVixDQUFOO0FBQ0Q7QUFDRCxNQUFJTCxPQUFPRSxJQUFQLENBQVlOLElBQWhCLEVBQXNCO0FBQ3BCTyxZQUFRQyxLQUFSLENBQWNKLE1BQWQ7QUFDQSxVQUFNLElBQUlLLEtBQUosQ0FBVSxtREFBVixDQUFOO0FBQ0Q7QUFDREwsU0FBT0UsSUFBUCxDQUFZTixJQUFaLEdBQW1CQSxNQUFuQjtBQUNBLFNBQU9VLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCUixLQUFsQixzQkFDSkMsT0FBT0UsSUFBUCxDQUFZTixJQURSLEVBQ2VLLFFBRGYsRUFBUDtBQUdEOztBQUVELE9BQU8sU0FBU08sZUFBVCxHQUFtRTtBQUFBLE1BQTFDVCxLQUEwQyx5REFBbENGLGFBQWtDO0FBQUEsTUFBbkJZLE9BQW1CO0FBQUEsTUFBVlIsUUFBVTs7QUFDeEUsU0FBT1EsUUFBUUMsTUFBUixDQUFlLFVBQUNYLEtBQUQsRUFBUVksTUFBUjtBQUFBLFdBQ3BCYixpQkFBaUJDLEtBQWpCLEVBQXdCWSxNQUF4QixFQUFnQ1YsUUFBaEMsQ0FEb0I7QUFBQSxHQUFmLEVBRUpGLEtBRkksQ0FBUDtBQUdEOztBQUVEO0FBQ0EsT0FBTyxTQUFTYSxhQUFULENBQXVCYixLQUF2QixFQUE4QlUsT0FBOUIsRUFBdUMsQ0FFN0MiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1dWlkIH0gZnJvbSAnb3JuaXRob3Bob2JpYS91dGlsaXRpZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3RhdGUoKSB7XG4gIHJldHVybiB7fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNwcml0ZVRvU3RhdGUoc3RhdGUsIGVudGl0eSwgYmVoYXZpb3IpIHtcbiAgaWYgKCFlbnRpdHkuZGF0YSkge1xuICAgIGNvbnNvbGUuZXJyb3IoZW50aXR5KTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2FkZFNwcml0ZVRvU3RhdGU6IENhbm5vdCBjb250cm9sbCBiZWhhdmlvciBvZiBhbiBlbnRpdHkgdGhhdCBkb2VzblxcJ3QgaGF2ZSBhIGRhdGEga2V5Jyk7XG4gIH1cbiAgaWYgKGVudGl0eS5kYXRhLnV1aWQpIHtcbiAgICBjb25zb2xlLmVycm9yKGVudGl0eSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdhZGRTcHJpdGVUb1N0YXRlOiBUaGlzIGVudGl0eSBhbHJlYWR5IGhhcyBhIHV1aWQuJyk7XG4gIH1cbiAgZW50aXR5LmRhdGEudXVpZCA9IHV1aWQoKTtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgW2VudGl0eS5kYXRhLnV1aWRdOiBiZWhhdmlvclxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEdyb3VwVG9TdGF0ZShzdGF0ZSA9IGNyZWF0ZVN0YXRlKCksIHNwcml0ZXMsIGJlaGF2aW9yKSB7XG4gIHJldHVybiBzcHJpdGVzLnJlZHVjZSgoc3RhdGUsIHNwcml0ZSkgPT4gKFxuICAgIGFkZFNwcml0ZVRvU3RhdGUoc3RhdGUsIHNwcml0ZSwgYmVoYXZpb3IpXG4gICksIHN0YXRlKTtcbn1cblxuLy8gcnVuIGJlaGF2aW9ycyBvbiBzcHJpdGVzXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQWlTdGF0ZShzdGF0ZSwgc3ByaXRlcykge1xuXG59XG4iXX0=