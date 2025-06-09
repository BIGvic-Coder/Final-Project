(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const u="1e6d55e3",d="d734ead6b5b2fb87c2c6e2bb1e84a593",p=document.getElementById("searchBtn"),f=document.getElementById("searchInput"),h=document.getElementById("movieDetails"),l=document.getElementById("suggestions");p.addEventListener("click",async()=>{const s=f.value.trim();if(!s)return;const o=await(await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(s)}&apikey=${u}`)).json();h.innerHTML=`
    <h2>${o.Title} (${o.Year})</h2>
    <img src="${o.Poster}" alt="${o.Title}" />
    <p><strong>Plot:</strong> ${o.Plot}</p>
    <p><strong>Genre:</strong> ${o.Genre}</p>
    <p><strong>Rating:</strong> ${o.imdbRating}</p>
  `;const t=(await(await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${d}&query=${encodeURIComponent(s)}`)).json()).results[0];if(t){const m=await(await fetch(`https://api.themoviedb.org/3/movie/${t.id}/similar?api_key=${d}`)).json();l.innerHTML="<h3>Similar Movies</h3>",m.results.slice(0,5).forEach(c=>{var a;l.innerHTML+=`
        <p>${c.title} (${((a=c.release_date)==null?void 0:a.slice(0,4))||"N/A"})</p>
      `})}});
