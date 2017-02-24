export function tellPlayer(data) {
  console.log('📜', data.message);
}

export function collect(entity, item) {
  if (!entity.inventory) {
    entity.inventory = [];
  }
  entity.inventory.push(item.gameData);
  tellPlayer({ message: `You collected the ${item.gameData.displayName}` });
  item.destroy();
}

export function consume(entity, item) {
  tellPlayer({ message: `You consumed the ${item.gameData.displayName}` });
  item.destroy();
}

export function knockDoor(entity, door) {
  if (!door.gameData || !door.gameData.key) {
    console.warn(`door ${door.gameData.name} doesn't have no damn KEY`, door);
    return;
  }

  if (entity.inventory) {
    const item = entity.inventory.find(
      item => item.type === 'Key' && item.id === door.gameData.key
    );
    if (item) {
      door.destroy();
      tellPlayer({ message: `you used the ${item.displayName} key on the door and it opened` });
      return;
    }
  }
  tellPlayer({ message: 'need some key for this door idiot' });
}

export function gateCanOpen(gate) {
  return (
    gate.gameData.openDirection === 'north' && gate.body.touching.up
    || gate.gameData.openDirection === 'south' && gate.body.touching.down
    || gate.gameData.openDirection === 'west' && gate.body.touching.left
    || gate.gameData.openDirection === 'east' && gate.body.touching.right
  );
}

export function knockGate(entity, gate) {
  if (!gate.gameData || !gate.gameData.openDirection) {
    console.warn(`gate ${gate.gameData.name} ain't got no openDirection`, gate);
    return;
  }
  if (gateCanOpen(gate)) {
    gate.destroy();
    tellPlayer({ message: 'the gate has a handle on this side, you opened it' });
  } else {
    tellPlayer({ message: 'the gate does not open from this side' });
  }
}
