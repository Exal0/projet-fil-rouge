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

    card.addEventListener("click", () => {
  openModal(champ);
});


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


let searchInput = document.getElementById("search-champion");
searchInput.addEventListener("input", ()=> {
  const query = searchInput.value.toLowerCase();

  const filtered = allChampions.filter(champ =>
    champ.name.toLowerCase().includes(query)
  );
  displayChampions(filtered)
})


const modal = document.getElementById("champion-modal");
const modalOverlay = modal.querySelector(".modal-overlay");
const modalClose = document.getElementById("modal-close");

const modalSplash = document.getElementById("modal-splash");
const modalName = document.getElementById("modal-name");
const modalTitle = document.getElementById("modal-title");
const modalLore = document.getElementById("modal-lore");
const modalRoles = document.getElementById("modal-roles");
const modalSpells = document.getElementById("modal-spells");


function openModal(champ) {
  console.log("OPEN MODAL", champ.id);

  // Texte
  modalName.textContent = champ.name;
  modalTitle.textContent = champ.title;
  modalLore.textContent = champ.blurb;

  // Image splash
  modalSplash.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`;

  // Rôles
  modalRoles.innerHTML = "";
  champ.tags.forEach(tag => {
    const span = document.createElement("span");
    span.textContent = tag;
    modalRoles.appendChild(span);
  });

  // Spells (fetch ICI, pas ailleurs)
  modalSpells.innerHTML = "";

  fetch(`https://ddragon.leagueoflegends.com/cdn/16.1.1/data/en_US/champion/${champ.id}.json`)
    .then(res => res.json())
    .then(data => {
      const spells = data.data[champ.id].spells;

      spells.forEach(spell => {
        const img = document.createElement("img");
        img.src = `https://ddragon.leagueoflegends.com/cdn/16.1.1/img/spell/${spell.image.full}`;
        img.alt = spell.name;
        img.title = spell.name;

        modalSpells.appendChild(img);
      });
    });

  // Afficher la modal
  modal.classList.remove("hidden");
}


modalClose.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modalOverlay.addEventListener("click", () => {
  modal.classList.add("hidden");
});


const burger = document.getElementById("header-burger");
const nav = document.querySelector(".header-nav");

burger.addEventListener("click", () => {
  nav.classList.toggle("active");
});



