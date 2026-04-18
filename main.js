const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const moviesContainer = document.getElementById("movies");
const searchInput = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

let page = 1;
let query = "";

// 🔥 OBTENER PELÍCULAS
async function getMovies() {
  const url = query
    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&language=es-ES&query=${query}&page=${page}`
    : `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=${page}`;

  const res = await fetch(url);
  const data = await res.json();

  renderMovies(data.results);
  pageInfo.textContent = `Página ${page}`;
}

// 🎬 RENDER CARDS
function renderMovies(movies) {
  moviesContainer.innerHTML = "";

  movies.forEach(movie => {
    moviesContainer.innerHTML += `
      <div class="col-md-3">
        <div class="card">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" />
          <div class="card-body">
            <h5>${movie.title}</h5>
            <p>⭐ ${movie.vote_average}</p>
            <p>${movie.overview.slice(0, 80)}...</p>
          </div>
        </div>
      </div>
    `;
  });
}

// 🔎 BUSCADOR DINÁMICO
searchInput.addEventListener("input", async (e) => {
  query = e.target.value;

  if (query.length < 2) {
    suggestions.innerHTML = "";
    return;
  }

 const res = await fetch(
  `${BASE_URL}/search/movie?api_key=${API_KEY}&language=es-ES&query=${query}`
);

  const data = await res.json();

  suggestions.innerHTML = data.results.slice(0, 5).map(movie => `
    <div class="list-group-item bg-dark text-white" onclick="selectMovie('${movie.title}')">
      ${movie.title}
    </div>
  `).join("");
});

// seleccionar sugerencia
window.selectMovie = (title) => {
  searchInput.value = title;
  query = title;
  suggestions.innerHTML = "";
  page = 1;
  getMovies();
};

// PAGINACIÓN
prevBtn.addEventListener("click", () => {
  if (page > 1) {
    page--;
    getMovies();
  }
});

nextBtn.addEventListener("click", () => {
  page++;
  getMovies();
});

// INIT
getMovies();