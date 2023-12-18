async function fetchDnd5eMonster(monster) {
  const response = await fetch(
    `https://www.dnd5eapi.co/api/monsters/${monster}`
  );
  const data = await response.json();
  console.log(data.desc);
  return data;
}

async function fetchOpen5eMonster(monster) {
  const response = await fetch(
    `https://api.open5e.com/v1/monsters/?name=${monster}`
  );
  const data = await response.json();
  console.log(data.desc);
  return data;
}

function getMonsterData(dnd5eData, open5eData) {
  const actions = dnd5eData.actions || open5eData.actions || [];
  const actionFields = actions.map((action) => ({
    name: action.name || "N/A",
    value: action.desc || "No description available",
    damage_dice: action.damage_dice || "N/A",
  }));
  return {
    name: dnd5eData.name || open5eData.name || "N/A",
    description: dnd5eData.desc || open5eData.desc || "No Description",
    size: dnd5eData.size || open5eData.size || "N/A",
    type: dnd5eData.type || open5eData.type || "N/A",
    alignment: dnd5eData.alignment || open5eData.alignment || "N/A",
    ac: dnd5eData.armor_class.value || open5eData.armor_class || "N/A",
    hit_points: dnd5eData.hit_points || open5eData.hit_points || "N/A",
    hit_dice: dnd5eData.hit_dice || open5eData.hit_dice || "N/A",
    str: dnd5eData.strength || open5eData.strength || "N/A",
    dex: dnd5eData.dexterity || open5eData.dexterity || "N/A",
    cons: dnd5eData.constitution || open5eData.constitution || "N/A",
    intell: dnd5eData.intelligence || open5eData.intelligence || "N/A",
    wisdom: dnd5eData.wisdom || open5eData.wisdom || "N/A",
    charis: dnd5eData.charisma || open5eData.charisma || "N/A",
    cr: dnd5eData.challenge_rating || open5eData.challenge_rating || "N/A",
    actions: actionFields,
  };
}

module.exports = { fetchDnd5eMonster, fetchOpen5eMonster, getMonsterData };
