(()=>{'use strict';
const c=window.HADO_CONFIG;if(!c)return;
const esc=s=>String(s??'').replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));window.hadoEscape=esc;
const fill=(sel,fn)=>document.querySelectorAll(sel).forEach(e=>e.textContent=fn(e));
fill('[data-rule]',e=>c.rules[e.dataset.rule]??'');
fill('[data-version]',()=>c.release.version);
fill('[data-size]',()=>c.release.size);
fill('[data-date]',()=>c.release.date||'배포일 미확정');
fill('[data-respawn]',()=>c.rules.respawn);
fill('[data-planned-date]',()=>c.release.plannedDate||'일정 미정');
const modes=document.querySelector('[data-modes]');
if(modes)modes.innerHTML=c.modes.map((m,i)=>`<article class="mode reveal" style="--accent:${m.color}"><span class="number">MODE / 0${i+1}</span><h3>${esc(m.name)}</h3><p>${esc(m.desc)}</p><span class="tag">기획 안내 · 제공 상태 확인 중</span></article>`).join('');
const ctrl=document.querySelector('#controls');
if(ctrl)ctrl.innerHTML=c.controls.map(x=>`<article class="card"><span class="key">${esc(x.key)}</span><h3>${esc(x.label)}</h3></article>`).join('');
const updates=document.querySelector('#update-list');
if(updates)updates.innerHTML=c.developmentHistory.map((x,i)=>`<article class="history-entry" id="history-${esc(x.id)}"><div class="history-rail"><span class="history-num">0${i+1}</span><span class="history-step">${esc(x.step)}</span></div><div class="history-story"><div class="history-meta"><span class="tag">${esc(x.status)}</span><span>${esc(x.stage)}</span></div><div class="history-version mono">${esc(x.version)}</div><h2>${esc(x.title)}</h2><p class="history-lead">${esc(x.lead)}</p><div class="history-paragraphs">${x.paragraphs.map(t=>`<p>${esc(t)}</p>`).join('')}</div><div class="history-work"><h3>${esc(x.listTitle)}</h3><ul>${x.items.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div>${x.contributors?.length?`<div class="history-contributors"><h3>함께 만든 사람들</h3><div class="contributor-names">${x.contributors.map(n=>`<span>${esc(n)}</span>`).join('')}</div>${x.id==='v1'?`<details class="history-team-details"><summary>제작진 역할과 소개 보기</summary><div class="team-grid">${c.team.map((t,i)=>`<article class="team-card"><span class="team-no mono">FORMETA / ${String(i+1).padStart(2,'0')}</span><h3>${esc(t.name)}</h3><div class="team-role">${esc(t.role)}</div><p>${esc(t.bio)}</p></article>`).join('')}</div><details class="team-posters"><summary>팀 소개 포스터 보기</summary><div class="poster-grid"><a href="assets/images/team-formeta-01.webp" target="_blank" rel="noopener"><img src="assets/images/team-formeta-01.webp" alt="FORMETA 포스터 1" loading="lazy"></a><a href="assets/images/team-formeta-02.webp" target="_blank" rel="noopener"><img src="assets/images/team-formeta-02.webp" alt="FORMETA 포스터 2" loading="lazy"></a></div></details></details>`:''}</div>`:''}${x.note?`<div class="notice history-note">${esc(x.note)}</div>`:''}</div></article>`).join('');
const patch=document.querySelector('#patch-note-list');
if(patch)patch.innerHTML='<div class="empty patch-empty"><span class="tag">AWAITING VERIFIED CHANGES</span><h3>확인된 변경 내역을 준비하고 있습니다.</h3><p>실제 변경 사항이 확인되면 업데이트합니다.</p></div>';
const menu=document.querySelector('.menu'),links=document.querySelector('.links');
if(menu&&links){const close=()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','메뉴 열기');links.classList.remove('open')};menu.addEventListener('click',()=>{const on=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(on));menu.setAttribute('aria-label',on?'메뉴 닫기':'메뉴 열기');links.classList.toggle('open',on)});links.addEventListener('click',close);document.addEventListener('keydown',e=>{if(e.key==='Escape')close()})}
if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('js-motion');const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('shown');obs.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(e=>obs.observe(e))}
function fitHero(){const h=document.querySelector('header')?.getBoundingClientRect().height||0,s=document.querySelector('.pretest-strip')?.getBoundingClientRect().height||0;document.documentElement.style.setProperty('--site-chrome-height',Math.ceil(h+s)+'px')}
fitHero();window.addEventListener('resize',fitHero,{passive:true});if('ResizeObserver'in window){const ro=new ResizeObserver(fitHero);document.querySelectorAll('header,.pretest-strip').forEach(e=>ro.observe(e))}
})();