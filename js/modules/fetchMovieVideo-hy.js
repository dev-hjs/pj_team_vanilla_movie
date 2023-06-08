// "index.html"에서 선택한 영화 ID
import { urlParams, movieId } from "./detail-info.js";

// YouTube URL
const youtube_url = "https://www.youtube.com/embed/";

// vidio API 정보
const video_api = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=`;

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "",
  },
};

export function fetchMovieVideo() {
  fetch(video_api, options)
    .then((response) => response.json())
    .then(function (response) {
      const video = response.results;

      // type의 값이 "Trailer"인 배열
      let results = video.filter((value) => value.type === "Trailer");

      // 첫 번째를 mainVideos, 나머지를 restVideos로 선언
      const mainVideos = results[0];
      const restVideos = results.slice(1);

      // DOM 제어 - mainVideo
      const divMainVideo = document.createElement("div");
      const outputMainVideo = `<iframe src="${youtube_url}${mainVideos.key}">`;
      divMainVideo.innerHTML = outputMainVideo;
      mainVideo.appendChild(divMainVideo);

      // DOM 제어 - restVideo
      restVideos.forEach(function (data) {
        const divRestVideo = document.createElement("div");
        const outputRestVideo = `<iframe src="${youtube_url}${data.key}">`;
        divRestVideo.innerHTML = outputRestVideo;
        restVideo.appendChild(divRestVideo);
      });
    });
}

const mainVideo = document.querySelector(".main-video");
const restVideo = document.querySelector(".rest-video");
