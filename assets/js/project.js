const titles=['The Vertical City','Light & Volume','A Quiet Dialogue','Between the Lines','Material Matters','The Garden Pavilion','Courtyard Living','Framed Perspectives','An Open Threshold','Collective Ground','Rhythm & Repetition','Urban Mosaic','Beyond the Horizon'];
const categories=['Urban','Residential','Spaces','Residential','Spaces','Residential','Residential','Spaces','Spaces','Urban','Urban','Urban','Residential'];
const rawId=new URLSearchParams(location.search).get('id');
const id=Number(rawId);
const details=document.querySelector('#project-details');
if(!rawId||!Number.isInteger(id)||id<1||id>PROJECTS.length){
  document.title='Project not found | FORM';
  details.innerHTML='<h1>Project not found.</h1><p>Please choose a project from the portfolio.</p>';
}else{
  const i=id-1,project=PROJECTS[i];
  document.title=`${titles[i]} | FORM`;
  document.querySelector('.project-back').href=`index.html#project-${id}`;
  details.innerHTML=`<p class="eyebrow">${categories[i]} / PROJECT ${String(id).padStart(2,'0')} OF ${PROJECTS.length}</p><h1>${titles[i]}</h1><p class="project-description">Placeholder project title and description. Add the location, year, design concept, and your role here.</p><div class="project-images">${project.images.map((src,n)=>`<img src="${src}" alt="${titles[i]}, view ${n+1}" ${n===0?'fetchpriority="high"':'loading="lazy"'} decoding="async">`).join('')}</div><div class="project-pagination" role="navigation" aria-label="Project navigation">${id>1?`<a href="project.html?id=${id-1}">← Previous project</a>`:'<a href="index.html#projects">All projects</a>'}${id<PROJECTS.length?`<a href="project.html?id=${id+1}">Next project →</a>`:'<a href="index.html#projects">All projects →</a>'}</div>`;
  const related=PROJECTS.map((item,index)=>({item,index})).filter(entry=>entry.index!==i).sort((a,b)=>Number(categories[b.index]===categories[i])-Number(categories[a.index]===categories[i])).slice(0,6);
  const section=document.createElement('section');
  section.className='related-projects';
  section.setAttribute('aria-labelledby','related-title');
  section.innerHTML=`<div class="related-heading"><div><p class="eyebrow">CONTINUE EXPLORING</p><h2 id="related-title">More projects like this</h2></div><div class="related-controls"><button type="button" class="related-prev" aria-label="Scroll to previous projects" aria-controls="related-track">←</button><button type="button" class="related-next" aria-label="Scroll to next projects" aria-controls="related-track">→</button></div></div><div id="related-track" class="related-track" tabindex="0" role="region" aria-label="More projects, scroll horizontally">${related.map(({item,index})=>`<a class="card related-card" href="project.html?id=${index+1}"><span class="card-image"><img src="${item.cover}" alt="${titles[index]}, architectural project" loading="lazy" decoding="async"></span><span class="card-heading"><h3>${titles[index]}</h3><span aria-hidden="true">↗</span></span><p>${categories[index]}</p></a>`).join('')}</div>`;
  details.append(section);
  const track=section.querySelector('.related-track');
  // Buffer each end with a copy, then recenter on the identical middle set.
  const originals=Array.from(track.children);
  const dots=document.createElement('div');
  dots.className='related-dots';
  dots.setAttribute('role','group');
  dots.setAttribute('aria-label','Choose a related project');
  const dotButtons=related.map(({index},position)=>{
    const button=document.createElement('button');
    button.type='button';
    button.setAttribute('aria-label',`Show ${titles[index]}`);
    button.setAttribute('aria-controls','related-track');
    button.onclick=()=>{clearTimeout(settleTimer);recenter();const current=Math.round((track.scrollLeft+centerOffset)/step);const currentIndex=((current%originals.length)+originals.length)%originals.length;let distance=position-currentIndex;if(distance>originals.length/2)distance-=originals.length;if(distance<-originals.length/2)distance+=originals.length;track.scrollTo({left:(current+distance)*step-centerOffset,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})};
    dots.append(button);
    return button;
  });
  section.append(dots);
  function updateDots(){
    const cards=Array.from(track.children);
    const bounds=track.getBoundingClientRect();
    const center=bounds.left+track.clientWidth/2;
    let centered=0,nearest=Infinity;
    cards.forEach((card,index)=>{const rect=card.getBoundingClientRect();const distance=Math.abs(rect.left+rect.width/2-center);if(distance<nearest){nearest=distance;centered=index}});
    cards.forEach((card,index)=>{card.classList.toggle('is-centered',index===centered);card.classList.toggle('is-side',index!==centered)});
    const active=centered%originals.length;
    dotButtons.forEach((button,index)=>{button.classList.toggle('active',index===active);if(index===active)button.setAttribute('aria-current','true');else button.removeAttribute('aria-current')});
  }
  function makeCopy(card){const copy=card.cloneNode(true);copy.setAttribute('aria-hidden','true');copy.tabIndex=-1;copy.dataset.motionReady='true';return copy}
  track.prepend(...originals.map(makeCopy));
  track.append(...originals.map(makeCopy));
  let step=0,cycle=0,centerOffset=0,settleTimer;
  function measureTrack(){const gap=parseFloat(getComputedStyle(track).columnGap)||0;const position=step?(((track.scrollLeft+centerOffset)/step)%originals.length):0;const width=originals[0].getBoundingClientRect().width;step=width+gap;centerOffset=(track.clientWidth-width)/2;cycle=step*originals.length;track.scrollTo({left:cycle+position*step-centerOffset,behavior:'instant'});updateDots()}
  function recenter(){if(!cycle)return;const left=track.scrollLeft+centerOffset;if(left<cycle-1||left>=cycle*2-1){const position=((left-cycle)%cycle+cycle)%cycle;track.scrollTo({left:cycle+position-centerOffset,behavior:'instant'});updateDots()}}
  function scrollRelated(direction){clearTimeout(settleTimer);recenter();track.scrollBy({left:direction*step,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}
  section.querySelector('.related-prev').onclick=()=>scrollRelated(-1);
  section.querySelector('.related-next').onclick=()=>scrollRelated(1);
  track.addEventListener('scroll',()=>{updateDots();clearTimeout(settleTimer);settleTimer=setTimeout(recenter,180)},{passive:true});
  track.addEventListener('scrollend',recenter);
  track.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();scrollRelated(event.key==='ArrowLeft'?-1:1)}});
  window.addEventListener('resize',measureTrack);
  requestAnimationFrame(measureTrack);
}
const menu=document.querySelector('#menu'),navigation=document.querySelector('#navigation');
function closeMenu(){navigation.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='Menu +'}
menu.onclick=()=>{const open=menu.getAttribute('aria-expanded')!=='true';navigation.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'Close −':'Menu +'};
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
