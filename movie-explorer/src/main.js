const OMDB_API_KEY = "1e6d55e3";
const TMDB_API_KEY = "d734ead6b5b2fb87c2c6e2bb1e84a593";

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const movieDetails = document.getElementById("movieDetails");
const suggestions = document.getElementById("suggestions");

searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (!query) return;

  // 1. Get movie data from OMDb
  const omdbRes = await fetch(
    `https://www.omdbapi.com/?t=${encodeURIComponent(
      query
    )}&apikey=${OMDB_API_KEY}`
  );
  const omdbData = await omdbRes.json();

  // 2. Display OMDb movie data
  movieDetails.innerHTML = `
    <h2>${omdbData.Title} (${omdbData.Year})</h2>
    <img src="${omdbData.Poster}" alt="${omdbData.Title}" />
    <p><strong>Plot:</strong> ${omdbData.Plot}</p>
    <p><strong>Genre:</strong> ${omdbData.Genre}</p>
    <p><strong>Rating:</strong> ${omdbData.imdbRating}</p>
  `;

  // 3. Get TMDB movie ID
  const tmdbSearchRes = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const tmdbSearchData = await tmdbSearchRes.json();
  const tmdbMovie = tmdbSearchData.results[0];

  if (tmdbMovie) {
    // 4. Get similar movies
    const similarRes = await fetch(
      `https://api.themoviedb.org/3/movie/${tmdbMovie.id}/similar?api_key=${TMDB_API_KEY}`
    );
    const similarData = await similarRes.json();

    suggestions.innerHTML = `<h3>Similar Movies</h3>`;
    similarData.results.slice(0, 5).forEach((movie) => {
      suggestions.innerHTML += `
        <p>${movie.title} (${movie.release_date?.slice(0, 4) || "N/A"})</p>
      `;
    });
  }
});
