//REVIEW - Si besoin de reutiliser 
const VERSION = '16.1.1'; //Version du patch 
const LANG = 'fr_FR';  //langage de la recuperation des donnees de l'api

// NOTE - Premiere ETAPE AFFicher les Noms de champions dans la page 

console.log("JS chargé"); //NOTE - test link Test Ok

console.log("avant le fetch");

let allChampions = [];

const championContainer = document.getElementById("champions");

// FETCH des champions
fetch(`https://ddragon.leagueoflegends.com/cdn/${VERSION}/data/${LANG}/champion.json`)
  .then(response => response.json())
  .then(data => {
    allChampions = Object.values(data.data); // NOTE - Stocke tous les champions
    console.log(data);
    
    displayChampions(allChampions); // NOTE - Affiche tout au chargement
  });


// FONCTION D’AFFICHAGE
function displayChampions(champions) {
  championContainer.innerHTML = ""; // NOTE - Vide le container avant d’afficher

  champions.forEach(champ => {

    const card = document.createElement('div'); 
    card.classList.add('champ-card');

    const img = document.createElement('img');
    img.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg`;
    img.alt = champ.name;

    const name = document.createElement('span');
    name.textContent = champ.name;

    card.appendChild(img);
    card.appendChild(name);

    championContainer.appendChild(card);
  });
}

const allFilter = document.getElementById("filter-all");

allFilter.addEventListener("click", () => {
  displayChampions(allChampions);
});

const fighterFilter = document.getElementById("filter-fighter");

fighterFilter.addEventListener("click", () => {
  const filtered = allChampions.filter(champ => champ.tags.includes("Fighter"));
  displayChampions(filtered);
});

const mageFilter = document.getElementById("filter-mage");

mageFilter.addEventListener("click", () => {
  const filtered = allChampions.filter(champ => champ.tags.includes("Mage"));
  displayChampions(filtered);
});

const marksmanFilter = document.getElementById("filter-marksman");

marksmanFilter.addEventListener("click", () => {
  const filtered = allChampions.filter(champ => champ.tags.includes("Marksman"));
  displayChampions(filtered);
});


const assassinFilter = document.getElementById("filter-assassin");

assassinFilter.addEventListener("click", () => {
  const filtered = allChampions.filter(champ => champ.tags.includes("Assassin"));
  displayChampions(filtered);
});

const supportFilter = document.getElementById("filter-support");

supportFilter.addEventListener("click", () => {
  const filtered = allChampions.filter(champ => champ.tags.includes("Support"));
  displayChampions(filtered);
});
const tankFilter = document.getElementById("filter-tank");

tankFilter.addEventListener("click", () => {
  const filtered = allChampions.filter(champ => champ.tags.includes("Tank"));
  displayChampions(filtered);
});
