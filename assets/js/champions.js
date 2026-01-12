const roleIcons = {
  "Fighter"  : "/assets/images/roles_lol/Fighter_icon.png",
  "Mage"     : "/assets/images/roles_lol/Mage_icon.png",
  "Assassin" : "/assets/images/roles_lol/Slayer_icon.png",
  "Marksman" : "/assets/images/roles_lol/Marksman_icon.png",
  "Support"  : "/assets/images/roles_lol/Support_icon.png",
  "Tank"     : "/assets/images/roles_lol/Tank_icon.png"
};

async function displayChampions(tagFilter = null) {
  const res = await fetch('https://ddragon.leagueoflegends.com/cdn/13.23.1/data/en_US/champion.json');
  const data = await res.json();

  const container = document.getElementById('champions-container');
  container.innerHTML = '';

  Object.values(data.data).forEach(champ => {
    const tags = champ.tags || [];

    if (tagFilter && !tags.includes(tagFilter)) return;

    const tagsHTML = tags.map(tag => `<img src="${roleIcons[tag]}" alt="${tag}" class="role-icon">`).join('');

    const card = document.createElement('div');
    card.className = 'champion-card';
    card.innerHTML = `
      <div class="champion-roles">${tagsHTML}</div>
      <img class="champion-img" src="https://ddragon.leagueoflegends.com/cdn/13.23.1/img/champion/${champ.id}.png" alt="${champ.name}">
      <h3>${champ.name}</h3>
    `;
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayChampions();   //ICI affiche tous les champions 

  document.getElementById("filter-fighter").addEventListener("click", () => displayChampions("Fighter"));   
  document.getElementById("filter-mage").addEventListener("click", () => displayChampions("Mage"));
  document.getElementById("filter-assassin").addEventListener("click", () => displayChampions("Assassin"));
  document.getElementById("filter-marksman").addEventListener("click", () => displayChampions("Marksman"));
  document.getElementById("filter-support").addEventListener("click", () => displayChampions("Support"));
  document.getElementById("filter-tank").addEventListener("click", () => displayChampions("Tank"));
});
