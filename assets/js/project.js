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
}
const menu=document.querySelector('#menu'),navigation=document.querySelector('#navigation');
function closeMenu(){navigation.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='Menu +'}
menu.onclick=()=>{const open=menu.getAttribute('aria-expanded')!=='true';navigation.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'Close −':'Menu +'};
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
