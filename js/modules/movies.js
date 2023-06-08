let page = 1;
const key = "4e657bab9a1d4d7b73eb2631af49f6da";
const base_url = "https://image.tmdb.org/t/p/w500/";
const contain = document.querySelector(".contain");

//API 서버에서 데이터 가져오는 함수
export const fetchMovie = (page) => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`;

  fetch(url)
    .then((res) => res.json())
    .then(function (res) {
      const movies = res.results;
      movies.map(function (movie) {
        const div = document.createElement("div");
        div.classList.add("list");
        const output = `<div class="post-entry-alt">
                                <div class="items">
                                  <div class="img-link item">
                                    <img src="${
                                      base_url + movie.poster_path
                                    }" class="img-fluid" alt="" style="width:100%">
                                    <div class="caption">
                                      <a href="./detail-view.html?id=${
                                        movie.id
                                      }">View details</a>
                                    </div>
                                  </div>
                                </div>
                                <div class="excerpt">
                                  <h2><a class="tit-movie">${
                                    movie.title
                                  }</a></h2>
                                  <div class="post-meta align-items-center text-center clearfix">
                                  <span class="d-inline-block mt-1">평점</span>
                                  <span>${movie.vote_average}</span>
                                </div>
                              </div>`;
        div.innerHTML = output;
        contain.appendChild(div);
        div.setAttribute("data-id", movie.id);
      });
    })
    .catch((err) => console.log(err));
};