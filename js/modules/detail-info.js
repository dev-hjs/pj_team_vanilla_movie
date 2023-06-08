export const urlParams = new URLSearchParams(window.location.search);
export const movieId = urlParams.get("id");

const key = "4e657bab9a1d4d7b73eb2631af49f6da";
const movieDetailsElement = document.getElementById("movieDetails");

export const detailInfo = () => {
  async function fetchMovieDetails(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&append_to_response=credits`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  async function showMovieDetails(movieId) {
    const movieDetails = await fetchMovieDetails(movieId);
    const directors = movieDetails.credits.crew.filter(
      (person) => person.job === "Director"
    );
    const directorNames = directors.map((director) => director.name).join(", ");
    const movieHTML = `
      <div class="box">
        <div class="box-img"><img src="https://image.tmdb.org/t/p/w500${movieDetails.poster_path}" alt="${movieDetails.title} Poster" class="box-size"></div>
        <div class="box-contents">
          <div class="title">
            <strong>${movieDetails.title}</strong>
          </div>
          <div class="vote-average">
            <p>Score&nbsp;<span>${movieDetails.vote_average}</span></p>
          </div>
          <div class="spec">
            <p>Director:&nbsp;<span>${directorNames}</span></p>
            <p>Genre:&nbsp;<span>${movieDetails.genres[0].name}</span></p>
            <p>Release Date:&nbsp;<span>${movieDetails.release_date}</span></p>
          </div>
          <div class="overview">${movieDetails.overview}</div>
        </div>
      </div>
    `;
    movieDetailsElement.innerHTML += movieHTML;
  }

  // 각각의 영화에 대한 상세 정보를 호출하여 표시
  showMovieDetails(movieId);
};
