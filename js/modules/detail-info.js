export const detailInfo = () => {
  // api key
  const key = config.apikey;
  const movieDetailsElement = document.getElementById("movieDetails");

  // url에서 쿼리 id 가져오기 : ?id=영화id
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  // 영화 상세 정보 가져오기 : 기존 fetch에서 async로 변경
  async function fetchMovieDetails(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&append_to_response=credits`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  // 실시간 날짜 추가
  function displayDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const weekday = ["일", "월", "화", "수", "목", "금", "토"];
    const currentWeekday = weekday[now.getDay()];
    const dateTimeString = `${year}년 ${month}월 ${day}일 ${currentWeekday}요일 ${getAmPm(hours)} ${padZero(hours)}:${padZero(minutes)}`;
    const datetimeElement = document.getElementById("datetime");
    datetimeElement.textContent = dateTimeString;
    setTimeout(displayDateTime, 1000);
  }

  // 시간 오전, 오후 표시
  function getAmPm(hours) {
    return hours >= 12 ? "오후" : "오전";
  }

  // 숫자 두 자리
  function padZero(number) {
    return number < 10 ? "0" + number : number;
  }

  // 영화 상세 정보 화면에 보여주기
  function showMovieDetails(movieDetails) {
    // 감독 불러오기
    const directors = movieDetails.credits.crew.filter(
      (person) => person.job === "Director"
    );
    const directorNames = directors.map((director) => director.name).join(", ");

    // 평점 소수점 첫째 자리까지
    const voteAverage = movieDetails.vote_average.toFixed(1);

    const movieHTML = `
      <div class="box">
        <div class="box-img"><img src="https://image.tmdb.org/t/p/w500${movieDetails.poster_path}" alt="${movieDetails.title} Poster" class="box-size"></div>
        <div class="box-contents">
          <div class="title">
            <strong>${movieDetails.title}</strong>
          </div>
          <div class="vote-average">
            <p><span class="tit-spec">Score</span><span><i class="rate">⭐</i>${voteAverage}</span></p>
          </div>
          <div class="spec">
            <p><span class="tit-spec">Director:</span><span>${directorNames}</span></p>
            <p><span class="tit-spec">Genre:</span><span>${movieDetails.genres[0].name}</span></p>
            <p><span class="tit-spec">Release Date:</span><span>${movieDetails.release_date}</span></p>
          </div>
          <div class="overview">${movieDetails.overview}</div>      
        </div>
        <div class="detail-banner">
            <p class="tit">영화 실시간 순위</p>
            <p class="desc">현재 기준 사용자가 가장 많이 시청하는 순위입니다.</p>
            <p id="datetime" class="realtime">2023년 6월 7일 수요일 오후 3:00</p>
            <ul id="movie-list" class="rank"></ul>
        </div>
      </div>
    `;
    movieDetailsElement.innerHTML += movieHTML;
  }

  // 영화 상세 정보를 가져와서 화면에 보여주기
  fetchMovieDetails(movieId)
    .then(function (movieDetails) {
      // 영화 상세 정보 보여주기
      showMovieDetails(movieDetails);

      // 실시간 시간 보여주기
      displayDateTime();

      // 인기 영화 목록 가져오기
      const url = "https://api.themoviedb.org/3/movie/popular?api_key=4e657bab9a1d4d7b73eb2631af49f6da";
      const movieList = document.getElementById("movie-list");

      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          const movies = data.results.slice(0, 10);
          movies.forEach(function (movie, index) {
            const listItem = document.createElement("li");
            const rank = document.createElement("b");
            rank.textContent = index + 1;
            const title = document.createElement("span");
            title.textContent = movie.title;
            listItem.appendChild(rank);
            listItem.appendChild(title);
            movieList.appendChild(listItem);
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
    });
};