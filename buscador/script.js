const formSearch = document.getElementById('formSearch');
const search = document.getElementById('search');
const afterButton = document.getElementById('afterButton');
const nextButton = document.getElementById('nextButton');
const pageMenu = document.getElementById('pageMenu');
const optionsMenu = document.getElementById('options-menu');


const API_KEY = 'aeaa2a4339ffb122a72ee5bf75938913';
const API_URL_SEARCH = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=`;
const API_URL_SEARCH_SERIE = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=`;
const API_URL_FAVORITES = 'YOUR_FAVORITES_API_ENDPOINT';
let API_URL_SERIES = `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=${API_KEY}&page=`;
let API_URL_POPULAR = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=`;
 
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

let currentCategory = '';
let currentPage = ''; 

document.addEventListener('DOMContentLoaded', () => {
  PageNumber();
  getMovies(API_URL_POPULAR);
});

menu.addEventListener('click', (e) => {
  row.style.display = 'flex';
  const menuItem = e.target.innerText.toLowerCase();
  switch (menuItem) {
    case 'films' || '':
      currentPageNumberMovies = 1; 
      currentPage = 'films';
      getMovies(API_URL_POPULAR + `&page=${currentPageNumberMovies}`);
      PageNumber();
      break;
    case 'series':
      currentPageNumberSeries = 1; 
      currentPage = 'series';
      getSeries(API_URL_SERIES + `&page=${currentPageNumberSeries}`);
      PageNumber();
      break;
    case 'favorites':
      currentPage = 'favorites';
      showFavorites(); 
      break;
  }
});
  
/********************************************************
 ****************************NUM *********************
 ********************************************************/ 

const buttonNumber = document.getElementById('buttonNumber');
let currentPageNumberMovies = 1; 
let currentPageNumberSeries = 1;

afterButton.addEventListener('click', () => {
  if (currentPage === 'films' || currentPage === '') {
    if (currentPageNumberMovies <= 1){
      currentPageNumberMovies = 1; 
    } else if (currentPageNumberMovies >= 1){
      currentPageNumberMovies--;
    }
    getMovies(API_URL_POPULAR + `&page=${currentPageNumberMovies}`);
  } else if (currentPage === 'series') {
    if (currentPageNumberSeries <= 1){
      currentPageNumberSeries = 1; 
    } else if (currentPageNumberSeries >= 1){
      currentPageNumberSeries--;
    }
    getSeries(API_URL_SERIES + `&page=${currentPageNumberSeries}`);
  }
  PageNumber();
});
  
nextButton.addEventListener('click', () => {
  if (currentPage === 'films' || currentPage === '') {
    if (currentPageNumberMovies >= 100){
      currentPageNumberMovies = 100; 
    } else if (currentPageNumberMovies <= 100){
      currentPageNumberMovies++;
    }
    getMovies(API_URL_POPULAR + `&page=${currentPageNumberMovies}`);
  } else if (currentPage === 'series') {
    if (currentPageNumberSeries >= 100){
      currentPageNumberSeries = 100; 
    } else if (currentPageNumberSeries <= 100){
      currentPageNumberSeries++;
    }
    getSeries(API_URL_SERIES + `&page=${currentPageNumberSeries}`);
  }
  PageNumber();
});

function PageNumber() {
  currentPageNumberMovies = 1;
  currentPageNumberSeries = 1; 
 /* if (currentPage === '' || currentPage === 'films'){
    buttonNumber.textContent = `Página ${currentPageNumberMovies}`;
  } else if (currentPage === 'series'){
    buttonNumber.textContent = `Página ${currentPageNumberSeries}`;
  }*/
}

async function getMovies(url) {
  const res = await fetch(`${url}${currentPageNumberMovies}`);
  const data = await res.json();
  showMovies(data.results);
}

async function getSeries(url) {
  const res = await fetch(`${url}${currentPageNumberSeries}`);
  const data = await res.json();
  showMovies(data.results);
}

/********************************************************
 ****************************FILTROS*********************
 ********************************************************/ 
optionsMenu.addEventListener('click', async (e) => {
  const optionId = e.target.id;
    if (currentPage === 'films' || currentPage === ''){
      switch (optionId) {
        case 'recently-added':
          currentPageNumberMovies = 1; 
          API_URL_POPULAR = `https://api.themoviedb.org/3/discover/movie?sort_by=release_date.desc&api_key=${API_KEY}&page=${currentPageNumberMovies}`;
          const recentlyAddedURL = `https://api.themoviedb.org/3/discover/movie?sort_by=release_date.desc&api_key=${API_KEY}&page=${currentPageNumberMovies}`;
          const recentlyAddedData = await fetchData(recentlyAddedURL);
          PageNumber();
          showMovies(recentlyAddedData.results);
          break;
        case 'popular':
          currentPageNumberMovies = 1; 
          API_URL_POPULAR =  `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=${currentPageNumberMovies}`;
          const popularURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=${currentPageNumberMovies}`;
          const popularData = await fetchData(popularURL);
          PageNumber();
          showMovies(popularData.results);
          break;
        case 'action':
          currentPageOption = 'action';
          currentPageNumberMovies = 1; 
          API_URL_POPULAR = `https://api.themoviedb.org/3/discover/movie?with_genres=28&api_key=${API_KEY}&page=${currentPageNumberMovies}`;
          const actionMoviesURL = `https://api.themoviedb.org/3/discover/movie?with_genres=28&api_key=${API_KEY}&page=${currentPageNumberMovies}`;
          const actionMoviesData = await fetchData(actionMoviesURL);
          PageNumber();
          showMovies(actionMoviesData.results);
          break;
        case 'animation':
          currentPageNumberMovies = 1; 
          API_URL_POPULAR = `https://api.themoviedb.org/3/discover/movie?with_genres=16&sort_by=release_date.desc&api_key=${API_KEY}&page=${currentPageNumberMovies}`;
          const animationMoviesURL = `https://api.themoviedb.org/3/discover/movie?with_genres=16&sort_by=release_date.desc&api_key=${API_KEY}&page=${currentPageNumberMovies}`;
          const animationMoviesData = await fetchData(animationMoviesURL);
          showMovies(animationMoviesData.results);
          PageNumber();
          break;
          case 'adventure':
            currentPageNumberMovies = 1; 
            API_URL_POPULAR = `https://api.themoviedb.org/3/discover/movie?with_genres=12&api_key=${API_KEY}&page=${currentPageNumberMovies}`;
            const adventureMoviesURL = `https://api.themoviedb.org/3/discover/movie?with_genres=12&api_key=${API_KEY}&page=${currentPageNumberMovies}`;
            const adventureMoviesData = await fetchData(adventureMoviesURL);
            showMovies(adventureMoviesData.results);
            PageNumber();
            break;
          case 'comedy':
            currentPageNumberMovies = 1; 
            API_URL_POPULAR = `https://api.themoviedb.org/3/discover/movie?with_genres=35&api_key=${API_KEY}&page=${currentPageNumberMovies}`;
            const comedyMoviesURL = `https://api.themoviedb.org/3/discover/movie?with_genres=35&api_key=${API_KEY}&page=${currentPageNumberMovies}`;
            const comedyMoviesData = await fetchData(comedyMoviesURL);
            showMovies(comedyMoviesData.results);
            PageNumber();
            break;
          case 'documentary':
            currentPageNumberMovies = 1; 
            API_URL_POPULAR = `https://api.themoviedb.org/3/discover/movie?with_genres=99&api_key=${API_KEY}&page=${currentPageNumberMovies}`;
            const documentaryMoviesURL = `https://api.themoviedb.org/3/discover/movie?with_genres=99&api_key=${API_KEY}&page=${currentPageNumberMovies}`;
            const documentaryMoviesData = await fetchData(documentaryMoviesURL);
            showMovies(documentaryMoviesData.results);
            PageNumber();
            break;
          case 'drama':
            currentPageNumberMovies = 1; 
            API_URL_POPULAR = `https://api.themoviedb.org/3/discover/movie?with_genres=18&api_key=${API_KEY}&page=${currentPageNumberMovies}`;
            const dramaMoviesURL = `https://api.themoviedb.org/3/discover/movie?with_genres=18&api_key=${API_KEY}&page=${currentPageNumberMovies}`;
            const dramaMoviesData = await fetchData(dramaMoviesURL);
            showMovies(dramaMoviesData.results);
            PageNumber();
            break;
          case 'fantasy':
            currentPageNumberMovies = 1; 
            API_URL_POPULAR = `https://api.themoviedb.org/3/discover/movie?with_genres=14&api_key=${API_KEY}&page=${currentPageNumberMovies}`;
            const fantasyMoviesURL = `https://api.themoviedb.org/3/discover/movie?with_genres=14&api_key=${API_KEY}&page=${currentPageNumberMovies}`;
            const fantasyMoviesData = await fetchData(fantasyMoviesURL);
            showMovies(fantasyMoviesData.results);
            PageNumber();
            break;
          case 'science-fiction':
            currentPageNumberMovies = 1; 
            API_URL_POPULAR = `https://api.themoviedb.org/3/discover/movie?with_genres=878&api_key=${API_KEY}&page=${currentPageNumberMovies}`;
            const sciFiMoviesURL = `https://api.themoviedb.org/3/discover/movie?with_genres=878&api_key=${API_KEY}&page=${currentPageNumberMovies}`;
            const sciFiMoviesData = await fetchData(sciFiMoviesURL);
            showMovies(sciFiMoviesData.results);
            PageNumber();
            break;
          case 'musical':
            currentPageNumberMovies = 1; 
            API_URL_POPULAR = `https://api.themoviedb.org/3/discover/movie?with_genres=10402&api_key=${API_KEY}&page=${currentPageNumberMovies}`;
            const musicalMoviesURL = `https://api.themoviedb.org/3/discover/movie?with_genres=10402&api_key=${API_KEY}&page=${currentPageNumberMovies}`;
            const musicalMoviesData = await fetchData(musicalMoviesURL);
            showMovies(musicalMoviesData.results);
            PageNumber();
            break;
          case 'romance':
            currentPageNumberMovies = 1; 
            API_URL_POPULAR = `https://api.themoviedb.org/3/discover/movie?with_genres=10749&api_key=${API_KEY}&page=${currentPageNumberMovies}`;
            const romanceMoviesURL = `https://api.themoviedb.org/3/discover/movie?with_genres=10749&api_key=${API_KEY}&page=${currentPageNumberMovies}`;
            const romanceMoviesData = await fetchData(romanceMoviesURL);
            showMovies(romanceMoviesData.results);
            PageNumber();
            break;
          case 'horror':
            currentPageNumberMovies = 1; 
            API_URL_POPULAR = `https://api.themoviedb.org/3/discover/movie?with_genres=27&api_key=${API_KEY}&page=${currentPageNumberMovies}`;
            const horrorMoviesURL = `https://api.themoviedb.org/3/discover/movie?with_genres=27&api_key=${API_KEY}&page=${currentPageNumberMovies}`;
            const horrorMoviesData = await fetchData(horrorMoviesURL);
            showMovies(horrorMoviesData.results);
            PageNumber();
            break;
      }
    } else if (currentPage === 'series'){
        switch (optionId) {
            case 'recently-added':
              currentPageNumberSeries = 1; 
              API_URL_SERIES = `https://api.themoviedb.org/3/discover/tv?sort_by=release_date.desc&api_key=${API_KEY}&page=${currentPageNumberSeries}`;
              const recentlyAddedURL = `https://api.themoviedb.org/3/discover/tv?sort_by=release_date.desc&api_key=${API_KEY}&page=${currentPageNumberSeries}`;
              const recentlyAddedData = await fetchData(recentlyAddedURL);
              showMovies(recentlyAddedData.results);
              PageNumber();
              break;
            case 'popular':
              currentPageNumberSeries = 1; 
              API_URL_SERIES = `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=${API_KEY}&page=${currentPageNumberSeries}`;
              const popularURL = `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=${API_KEY}&page=${currentPageNumberSeries}`;
              const popularData = await fetchData(popularURL);
              showMovies(popularData.results);
              PageNumber();
              break;
            case 'all':
              currentPageNumberSeries = 1; 
              API_URL_SERIES = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&page=${currentPageNumberSeries}`;
              const allMoviesURL = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&page=${currentPageNumberSeries}`;
              const allMoviesData = await fetchData(allMoviesURL);
              showMovies(allMoviesData.results);
              PageNumber();
              break;
            case 'action':
              currentPageNumberSeries = 1; 
              API_URL_SERIES = `https://api.themoviedb.org/3/discover/tv?with_genres=10759&api_key=${API_KEY}&page=${currentPageNumberSeries}`;
              const actionMoviesURL = `https://api.themoviedb.org/3/discover/tv?with_genres=10759&api_key=${API_KEY}&page=${currentPageNumberSeries}`;
              const actionMoviesData = await fetchData(actionMoviesURL);
              showMovies(actionMoviesData.results);
              PageNumber();
              break;
            case 'animation':
              currentPageNumberSeries = 1; 
              API_URL_SERIES = `https://api.themoviedb.org/3/discover/tv?with_genres=16&api_key=${API_KEY}&page=${currentPageNumberSeries}`;
              const animationMoviesURL = `https://api.themoviedb.org/3/discover/tv?with_genres=16&api_key=${API_KEY}&page=${currentPageNumberSeries}`;
              const animationMoviesData = await fetchData(animationMoviesURL);
              showMovies(animationMoviesData.results);
              PageNumber();
              break;
              case 'adventure':
                currentPageNumberSeries = 1; 
                API_URL_SERIES = `https://api.themoviedb.org/3/discover/tv?with_genres=10759&api_key=${API_KEY}&page=${currentPageNumberSeries}`;
                const adventureMoviesURL = `https://api.themoviedb.org/3/discover/tv?with_genres=10759&api_key=${API_KEY}&page=${currentPageNumberSeries}`;
                const adventureMoviesData = await fetchData(adventureMoviesURL);
                showMovies(adventureMoviesData.results);
                PageNumber();
                break;
              case 'comedy':
                currentPageNumberSeries = 1; 
                API_URL_SERIES = `https://api.themoviedb.org/3/discover/tv?with_genres=35&api_key=${API_KEY}&page=${currentPageNumberSeries}`;
                const comedyMoviesURL = `https://api.themoviedb.org/3/discover/tv?with_genres=35&api_key=${API_KEY}&page=${currentPageNumberSeries}`;
                const comedyMoviesData = await fetchData(comedyMoviesURL);
                showMovies(comedyMoviesData.results);
                PageNumber();
                break;
              case 'documentary':
                currentPageNumberSeries = 1; 
                API_URL_SERIES = `https://api.themoviedb.org/3/discover/tv?with_genres=99&api_key=${API_KEY}&page=${currentPageNumberSeries}`;
                const documentaryMoviesURL = `https://api.themoviedb.org/3/discover/tv?with_genres=99&api_key=${API_KEY}&page=${currentPageNumberSeries}`;
                const documentaryMoviesData = await fetchData(documentaryMoviesURL);
                showMovies(documentaryMoviesData.results);
                PageNumber();
                break;
              case 'drama':
                currentPageNumberSeries = 1; 
                API_URL_SERIES = `https://api.themoviedb.org/3/discover/tv?with_genres=18&api_key=${API_KEY}&page=${currentPageNumberSeries}`;
                const dramaMoviesURL = `https://api.themoviedb.org/3/discover/tv?with_genres=18&api_key=${API_KEY}&page=${currentPageNumberSeries}`;
                const dramaMoviesData = await fetchData(dramaMoviesURL);
                showMovies(dramaMoviesData.results);
                PageNumber();
                break;
              case 'fantasy':
                currentPageNumberSeries = 1; 
                API_URL_SERIES =  `https://api.themoviedb.org/3/discover/tv?with_genres=10765&api_key=${API_KEY}&page=${currentPageNumberSeries}`;
                const fantasyMoviesURL = `https://api.themoviedb.org/3/discover/tv?with_genres=10765&api_key=${API_KEY}&page=${currentPageNumberSeries}`;
                const fantasyMoviesData = await fetchData(fantasyMoviesURL);
                showMovies(fantasyMoviesData.results);
                PageNumber();
                break;
              case 'science-fiction':
                currentPageNumberSeries = 1; 
                API_URL_SERIES =  `https://api.themoviedb.org/3/discover/tv?with_genres=10765&api_key=${API_KEY}&page=${currentPageNumberSeries}`;
                const sciFiMoviesURL = `https://api.themoviedb.org/3/discover/tv?with_genres=10765&api_key=${API_KEY}&page=${currentPageNumberSeries}`;
                const sciFiMoviesData = await fetchData(sciFiMoviesURL);
                showMovies(sciFiMoviesData.results);
                PageNumber();
                break;
              case 'musical':
                currentPageNumberSeries = 1; 
                API_URL_SERIES = `https://api.themoviedb.org/3/discover/tv?with_genres=10402&api_key=${API_KEY}&page=${currentPageNumberSeries}`;
                const musicalMoviesURL = `https://api.themoviedb.org/3/discover/tv?with_genres=10402&api_key=${API_KEY}&page=${currentPageNumberSeries}`;
                const musicalMoviesData = await fetchData(musicalMoviesURL);
                showMovies(musicalMoviesData.results);
                PageNumber();
                break;
              case 'romance':
                currentPageNumberSeries = 1; 
                API_URL_SERIES = `https://api.themoviedb.org/3/discover/tv?with_genres=10749&api_key=${API_KEY}&page=${currentPageNumberSeries}`;
                const romanceMoviesURL = `https://api.themoviedb.org/3/discover/tv?with_genres=10749&api_key=${API_KEY}&page=${currentPageNumberSeries}`;
                const romanceMoviesData = await fetchData(romanceMoviesURL);
                showMovies(romanceMoviesData.results);
                PageNumber();
                break;
              case 'horror':
                currentPageNumberSeries = 1; 
                API_URL_SERIES =  `https://api.themoviedb.org/3/discover/tv?with_genres=9648&api_key=${API_KEY}&page=${currentPageNumberSeries}`;
                const horrorMoviesURL = `https://api.themoviedb.org/3/discover/tv?with_genres=9648&api_key=${API_KEY}&page=${currentPageNumberSeries}`;
                const horrorMoviesData = await fetchData(horrorMoviesURL);
                showMovies(horrorMoviesData.results);
                PageNumber();
                break;
            }
        }


async function fetchData(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}});



/********************************************************
 ****************************SEARCH **********************
 ********************************************************/ 
var row = document.querySelector('.row');
formSearch.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();
  if (searchTerm !== '') {
    row.style.display = 'none';
    if (currentPage === 'films') {
      searchMovies(searchTerm);
    } else if (currentPage === 'series') {
      searchSeries(searchTerm);
    } else {
      searchMovies(searchTerm); // Ajuste conforme necessário
    }
    search.value = '';
  } 

});

/********************************************************
 ****************************films**********************
 ********************************************************/ 
  
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
}

function searchMovies(query) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
  getMovies(url);
}
  
/********************************************************
 ****************************SERIES**********************
 ********************************************************/
  
async function getSeries(url) {    
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
}

function searchSeries(query) {
  const url = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${query}`;
  getSeries(url);
}
  
/********************************************************
 ****************************SERIES E films ************
 ********************************************************/
  

 function showMovies(movies) {
    main.innerHTML = '';
    movies.forEach((item) => {
      const { title, name, poster_path, vote_average, overview, media_type, platform, runtime, genre, director, actors, language, country, seasons } = item;
      
      if (!poster_path) {
        return; 
      }
  
      const movieEl = document.createElement('div');
      movieEl.classList.add('movie');
  
      const platformIcon = document.createElement('div');
      platformIcon.classList.add('platform-icon');
  
      const favoriteIcon = document.createElement('div');
      favoriteIcon.classList.add('favorite-icon');
      favoriteIcon.style.color = '#ffffff';
      favoriteIcon.textContent = '+';
      
  
      movieEl.innerHTML = `
        <div class="icons-container">
          <div class="platform-container" data-platform="${platform}">
            ${platformIcon.outerHTML}
          </div>
          <div class="favorite-container">
            ${favoriteIcon.outerHTML}
          </div>
        </div>
        <img src="${IMG_PATH + poster_path}" alt="${title || name}" class="movie-poster">
        <div class="movie-info">
          <h3 class="serie-title" data-platform="${platform}">${title || name}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="details" style="display: none;">
          <p>${overview}</p>
          <p>Rating: ${vote_average}</p>
          <p>Runtime: ${runtime || 'N/A'} min</p>
          <p>Genre: ${genre || 'N/A'}</p>
          ${media_type === 'movie' ? `<p>Director: ${director || 'N/A'}</p>` : `<p>Seasons: ${seasons || 'N/A'}</p>`}
          <p>Actors: ${actors || 'N/A'}</p>
          <p>Language: ${language || 'N/A'}</p>
          <p>Country: ${country || 'N/A'}</p>
        </div>
      `;
  
      main.appendChild(movieEl);
      const platformContainer = movieEl.querySelector('.platform-container');
      const favoriteContainer = movieEl.querySelector('.favorite-container');
      const moviePoster = movieEl.querySelector('.movie-poster');
      
      const detailsContainer = movieEl.querySelector('.details');
  
      platformContainer.addEventListener('click', () => {
        const platform = platformContainer.getAttribute('data-platform');
        redirectToPlatform(platform);
      });
  
      favoriteContainer.addEventListener('click', () => {
        toggleFavorite(movieEl);
      });
  
      moviePoster.addEventListener('click', () => {
        showDetails(item);
      });
    });
  }
  

async function getMovieDetails(movieID) {
  let detailsURL, creditsURL;

  if (currentPage === 'series') {
    detailsURL = `https://api.themoviedb.org/3/tv/${movieID}?api_key=${API_KEY}&page=${currentPageNumberMovies}`;
    creditsURL = `https://api.themoviedb.org/3/tv/${movieID}/credits?api_key=${API_KEY}&page=${currentPageNumberMovies}`;
  } else if (currentPage === 'films' || currentPage === '') {
    detailsURL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&page=${currentPageNumberSeries}`;
    creditsURL = `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${API_KEY}&page=${currentPageNumberSeries}`;
  } else{
      alert('nao tem');
  }

  const [detailsResponse, creditsResponse] = await Promise.all([
    fetch(detailsURL),
    fetch(creditsURL)
  ]);

  const [details, credits] = await Promise.all([detailsResponse.json(), creditsResponse.json()]);
  return { details, credits };
}
  

function hideDetails() {
  const modal = document.querySelector('.modal');
  if (modal) {
    document.body.removeChild(modal);
  }
}

async function showDetails(item) {
  const { details, credits } = await getMovieDetails(item.id);
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const closeModal = () => {
    document.body.removeChild(modal);
  };

  modalContent.innerHTML = `
    <button class="hide-button" onclick="hideDetails()"> x </button>
    <img src="${IMG_PATH + details.poster_path}" alt="${details.title || details.name}" class="modal-poster">
    <div class="modal-info">
      <h2>${details.title || details.name}</h2>
      <p>${details.overview}</p>
      <p>Rating: ${details.vote_average}</p>
      <p>${details.media_type === 'movie' ? 'Runtime' : 'Episode Runtime'}: ${details.runtime || (details.episode_run_time && details.episode_run_time[0]) || 'N/A'} min</p>
      <p>Genres: ${details.genres ? details.genres.map(genre => genre.name).join(', ') : 'N/A'}</p>
      ${details.media_type === 'movie' ? `<p>Director: ${getDirector(credits.crew) || 'N/A'}</p>` : details.media_type === 'tv' ? `<p>Seasons: ${details.number_of_seasons || 'N/A'}</p>` : ''}
      <p>Actors: ${getActorsList(credits.cast) || 'N/A'}</p>  
      <p>Language: ${details.original_language || 'N/A'}</p>
      <p>Country: ${details.production_countries ? details.production_countries.map(country => country.name).join(', ') : 'N/A'}</p>
    </div>
  `;

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

function getDirector(crew) {
  const director = crew.find(member => member.job === 'Director');
  return director ? director.name : 'N/A';
}

function getActorsList(cast) {
  if (!cast || cast.length === 0) {
    return 'N/A';
  }

  const visibleActors = cast.slice(0, 10);
  const actorsList = visibleActors.map(actor => actor.name).join(', ');

  return `${actorsList} ...`;
}



/********************************************************
****************************FAVORITOS *******************
*********************************************************/

let favorites = [];
function toggleFavorite(movie) {
  movie.classList.toggle('favorite');
  const isFavorite = movie.classList.contains('favorite');
  const icon = movie.querySelector('.favorite-icon');

  if (isFavorite) {
    icon.textContent = '-';
    addToFavorites(movie);
  } else {
    icon.textContent = '+';
    removeFromFavorites(movie);
  }
}

function addToFavorites(movie) {
  const isAlreadyInFavorites = favorites.includes(movie);

  if (!isAlreadyInFavorites) {
    favorites.push(movie);
  } else {
    removeFromFavorites(movie);
  }
}

function removeFromFavorites(movie) {
  favorites = favorites.filter((fav) => fav !== movie);
}

function showFavorites() {
  main.innerHTML = '';
  if (favorites.length === 0) {
    const noFavoritesMessage = document.createElement('p');
    noFavoritesMessage.textContent = "No media added";
    main.appendChild(noFavoritesMessage);
  } else {
    favorites.forEach((movie) => {
      const clonedMovie = movie.cloneNode(true);
      const favoriteButton = clonedMovie.querySelector('.favorite-icon');
      favoriteButton.addEventListener('click', () => {
        removeFromFavorites(movie);
        showFavorites(); 
      });

      main.appendChild(clonedMovie);
    });
  }
}

/*********************************************************
****************************CLASSIFICAÇÃO*****************
**********************************************************/

function getClassByRate(vote) {
  if (vote >= 8) {
    return 'white';
  } else if (vote >= 5) {
    return 'white';
  } else {
    return 'white';
  }
}

/*********************************************************
****************************MENU**************************
**********************************************************/

var optionsmenu = document.getElementById('options-menu');
var currentIndex = -3;
var optionWidth = document.querySelector('.option').offsetWidth + 80; 

var newPosition = -currentIndex * optionWidth;
optionsmenu.style.transform = 'translateX(' + newPosition + 'px)';
 
function scrollOptions(direction) {
  var numOptions = optionsmenu.children.length;
  var containerWidth = optionsmenu.offsetWidth;
  var maxIndex = numOptions - Math.floor(containerWidth / optionWidth);

  if (direction === 'left') {
    currentIndex = Math.max(-3 , currentIndex - 1);
  } else if (direction === 'right') {
    currentIndex = Math.min(maxIndex, currentIndex + 1);
  }

  newPosition = -currentIndex * optionWidth;
  optionsmenu.style.transform = 'translateX(' + newPosition + 'px)';
} 

