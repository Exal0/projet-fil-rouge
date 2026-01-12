const roleIcons = {
  "Fighter"  : "/assets/images/roles_lol/Fighter_icon.png",
  "Mage"     : "/assets/images/roles_lol/Mage_icon.png",
  "Assassin" : "/assets/images/roles_lol/Slayer_icon.png",
  "Marksman" : "/assets/images/roles_lol/Marksman_icon.png",
  "Support"  : "/assets/images/roles_lol/Support_icon.png",
  "Tank"     : "/assets/images/roles_lol/Tank_icon.png"
};

async function displayChampions({ tagFilter = null, search = "" } = {}) {
  const res = await fetch('https://ddragon.leagueoflegends.com/cdn/13.23.1/data/en_US/champion.json');
  const data = await res.json();

  const container = document.getElementById('champions-container');
  container.innerHTML = '';


  let champions = Object.values(data.data);


  if (tagFilter) {
    champions = champions.filter(champ => champ.tags.includes(tagFilter));
  }


  if (search) {
    champions = champions.filter(champ =>
      champ.name.toLowerCase().includes(search.toLowerCase())
    );
  }


  champions.forEach(champ => {
    const tagsHTML = champ.tags.map(tag => 
      `<img src="${roleIcons[tag]}" alt="${tag}" class="role-icon">`
    ).join('');

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


  document.getElementById("filter-all").addEventListener("click", ()=> displayChampions());
  document.getElementById("filter-fighter").addEventListener("click", () => displayChampions("Fighter"));   
  document.getElementById("filter-mage").addEventListener("click", () => displayChampions("Mage"));
  document.getElementById("filter-assassin").addEventListener("click", () => displayChampions("Assassin"));
  document.getElementById("filter-marksman").addEventListener("click", () => displayChampions("Marksman"));
  document.getElementById("filter-support").addEventListener("click", () => displayChampions("Support"));
  document.getElementById("filter-tank").addEventListener("click", () => displayChampions("Tank"));
});


document.getElementById("search-champion").addEventListener("input", (e) => {
  const searchValue = e.target.value;
  displayChampions({ search: searchValue });
});

app.get('/champion/:id', async (req, res) => {
  const champId = req.params.id;
  const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/13.23.1/data/en_US/champion/${champId}.json`);
  const data = await response.json();
  res.json(data);
});

async function showChampionDetails(champId) {
  const res = await fetch(`/champion/${champId}`);
  const data = await res.json();
  const champ = data.data[champId];

  console.log(champ.name, champ.passive, champ.spells);
}


showChampionDetails()