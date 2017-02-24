import TiledLevelState from '../engine/TiledLevelState';

class State extends TiledLevelState {
  init() {
    const map = window.location.search.match(/map=([^&]+)/);
    if (!map) {
      console.error(`Can't load map from url path: ${window.location.href}. Looking for ?map=mapFolder/mapJson.json`);
    }
    const mapPath = `/assets/maps/${map[1]}`;
    console.log(`Loading map ${mapPath}`);
    super.init({ mapPath });
  }
  preload() {
    super.preload();
  }
  create() {
    super.create();
  }
  update() {
    super.update();
  }
}

export default State;
