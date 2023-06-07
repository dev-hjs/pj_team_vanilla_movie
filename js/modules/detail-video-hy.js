import { urlParams, movieId } from "./detail-info.js";

const video_api = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=`;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDE1MzY1OGE1NTViYTk1ZjI0NjRhNmRiZDFiN2U3ZiIsInN1YiI6IjY0NzU2NTUyOTYzODY0MDBkZTcxN2Y5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I7BGy5Xgx5GCkWw-SPFzO44oDiANX7h7mshYNLZkguI",
  },
};

export function fetchMovieVideo() {
  fetch(video_api, options)
    .then((response) => response.json())
    .then(function (response) {
      const video = response.results;
      video.forEach(function (data) {
        const type = data["type"];
        if (type === "Trailer") {
          const div = document.createElement("div");
          const output = `<iframe src="https://www.youtube.com/embed/${data.key}" frameborder="0" class="video">`;
          div.innerHTML = output;
          videos.appendChild(div);
        }
      });
    })
    .catch((err) => console.log(err));
}

const videos = document.querySelector(".video");

// export function fetchMovieVideo() {
//   fetch(video_api, options)
//     .then((response) => response.json())
//     .then((response) => {
//       let video = response["results"];
//       let type = response["results"]["type"];
//       console.log(type);
//       video.forEach((data) => {
//         // if (type === "Trailer") {
//         const div = document.createElement("div");
//         const output = `<iframe src="https://www.youtube.com/embed/${data.key}" frameborder="0" class="video">`;
//         div.innerHTML = output;
//         videos.appendChild(div);
//         // }
//       });
//     })
//     .catch((err) => console.log(err));
// }
