const container = document.getElementById('container');

function callApi() {
    

fetch('/assets/js/data/games-slides.json')
  .then(res => res.json())
  .then(games => {

    games.forEach(game => {

      const link = document.createElement('a');
    link.href = game.link; 
    link.classList.add("game-card__link");
    
      const article = document.createElement('article');
      article.classList.add('game-card');
      article.style.backgroundImage = `url(${game.imgUrl})`;

      
      const title = document.createElement('h2');
      title.textContent = game.title;

      const desc = document.createElement('p');
      desc.textContent = game.desc;


      link.appendChild(article);

      article.appendChild(title);
      article.appendChild(desc);

      container.appendChild(link);
    });

  })
  .catch(err => {
    console.error('Erreur lors du chargement du JSON :', err);
  });
}

callApi()


