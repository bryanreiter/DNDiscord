async function fetchClasses(className) {
  const response = await fetch(
    `https://api.open5e.com/v1/classes/${className}`
  );
  const data = await response.json();
  console.log(data.name);
  console.log(data.desc);
  return data;
}

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
  //Gets all the actions of the monster
  const actions = dnd5eData.actions || open5eData.actions || [];
  const actionFields = actions.map((action) => ({
    name: action.name || "N/A",
    value: action.desc || "** **",
    damage_dice: action.damage_dice || "N/A",
  }));

  //Gets all the special abilities of the monster
  const specialAbilities =
    dnd5eData.special_abilities || open5eData.special_abilities || [];
  const specialAbilitiesFields = specialAbilities.map((special) => ({
    name: special.name || "N/A",
    value: special.desc || "No description available",
  }));

  return {
    name:
      (dnd5eData.name ? dnd5eData.name : undefined) ||
      (open5eData.name ? open5eData.name : undefined) ||
      "N/A",
    description: dnd5eData.desc || open5eData.desc || "** **",
    size:
      (dnd5eData.size ? dnd5eData.size : undefined) ||
      (open5eData.size ? open5eData.size : undefined) ||
      "N/A",
    type:
      (dnd5eData.type ? dnd5eData.type : undefined) ||
      (open5eData.type ? open5eData.type : undefined) ||
      "N/A",
    alignment:
      (dnd5eData.alignment ? dnd5eData.alignment : undefined) ||
      (open5eData.alignment ? open5eData.alignment : undefined) ||
      "N/A",
    ac:
      (dnd5eData.armor_class ? dnd5eData.armor_class.value : undefined) ||
      (open5eData.armor_class ? open5eData.armor_class.value : undefined) ||
      "N/A",
    hit_points:
      (dnd5eData.hit_points ? dnd5eData.hit_points : undefined) ||
      (open5eData.hit_points ? open5eData.hit_points : undefined) ||
      "N/A",
    hit_dice:
      (dnd5eData.hit_dice ? dnd5eData.hit_dice : undefined) ||
      (open5eData.hit_dice ? open5eData.hit_dice : undefined) ||
      "N/A",
    str:
      (dnd5eData.strength ? dnd5eData.strength : undefined) ||
      (open5eData.strength ? open5eData.strength : undefined) ||
      "N/A",
    dex:
      (dnd5eData.dexterity ? dnd5eData.dexterity : undefined) ||
      (open5eData.dexterity ? open5eData.dexterity : undefined) ||
      "N/A",
    cons:
      (dnd5eData.constitution ? dnd5eData.constitution : undefined) ||
      (open5eData.constitution ? open5eData.constitution : undefined) ||
      "N/A",
    intell:
      (dnd5eData.intelligence ? dnd5eData.intelligence : undefined) ||
      (open5eData.intelligence ? open5eData.intelligence : undefined) ||
      "N/A",
    wisdom:
      (dnd5eData.wisdom ? dnd5eData.wisdom : undefined) ||
      (open5eData.wisdom ? open5eData.wisdom : undefined) ||
      "N/A",
    charis:
      (dnd5eData.charisma ? dnd5eData.charisma : undefined) ||
      (open5eData.charisma ? open5eData.charisma : undefined) ||
      "N/A",
    cr:
      (dnd5eData.challenge_rating ? dnd5eData.challenge_rating : undefined) ||
      (open5eData.challenge_rating ? open5eData.challenge_rating : undefined) ||
      "N/A",
    actions: actionFields,
    specials: specialAbilitiesFields,
  };
}

module.exports = {
  fetchDnd5eMonster,
  fetchOpen5eMonster,
  getMonsterData,
  fetchClasses,
};
