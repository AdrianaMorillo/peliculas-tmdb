(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`a7e7e5623e8e1ff54e293a8ec386121c`,t=`https://api.themoviedb.org/3`,n=document.getElementById(`movies`),r=document.getElementById(`searchInput`),i=document.getElementById(`suggestions`),a=document.getElementById(`prevBtn`),o=document.getElementById(`nextBtn`),s=document.getElementById(`pageInfo`),c=1,l=``;async function u(){let n=l?`${t}/search/movie?api_key=${e}&language=es-ES&query=${l}&page=${c}`:`${t}/movie/popular?api_key=${e}&language=es-ES&page=${c}`;d((await(await fetch(n)).json()).results),s.textContent=`Página ${c}`}function d(e){n.innerHTML=``,e.forEach(e=>{n.innerHTML+=`
      <div class="col-md-3">
        <div class="card">
          <img src="https://image.tmdb.org/t/p/w500${e.poster_path}" />
          <div class="card-body">
            <h5>${e.title}</h5>
            <p>⭐ ${e.vote_average}</p>
            <p>${e.overview.slice(0,80)}...</p>
          </div>
        </div>
      </div>
    `})}r.addEventListener(`input`,async n=>{if(l=n.target.value,l.length<2){i.innerHTML=``;return}i.innerHTML=(await(await fetch(`${t}/search/movie?api_key=${e}&language=es-ES&query=${l}`)).json()).results.slice(0,5).map(e=>`
    <div class="list-group-item bg-dark text-white" onclick="selectMovie('${e.title}')">
      ${e.title}
    </div>
  `).join(``)}),window.selectMovie=e=>{r.value=e,l=e,i.innerHTML=``,c=1,u()},a.addEventListener(`click`,()=>{c>1&&(c--,u())}),o.addEventListener(`click`,()=>{c++,u()}),u();