const images = [
  ['image-01.jfif','Bridal glow'],['image-02.jfif','Peach & champagne glam'],['image-03.jfif','Romantic waves'],['image-04.jfif','Statement bridal beauty'],
  ['image-05.jfif','Soft bridal finish'],['image-06.jfif','Timeless bridal glam'],['image-07.jfif','Evening bridal look'],['image-08.jfif','Rose-gold evening glam'],
  ['image-09.jfif','Beauty details'],['image-10.jfif','Bridal artistry'],['image-11.jfif','Fountain braid'],['image-12.jfif','Half-up bridal curls'],
  ['image-13.jfif','Reception hair'],['image-14.jfif','Mehndi hairstyle'],['image-15.jfif','Traditional hair artistry'],['image-16.jfif','Bridal portrait'],
  ['image-17.jfif','Romantic messy updo'],['image-18.jfif','Low ponytail elegance'],['image-19.jfif','Pearl updo'],['image-20.jfif','Classic bridal beauty'],
  ['image-21.jfif','Elegant glamour'],['image-22.jfif','Soft bridal romance'],['image-23.jfif','Luminous bridal look'],['image-24.jfif','Bridal excellence'],
  ['image-25.jfif','Golden bridal portrait'],['image-26.jfif','Bride portrait']
];

const gallery = document.querySelector('#galleryGrid');
images.forEach(([src,title],i)=>{
  const item=document.createElement('figure'); item.className='gallery-item reveal'; item.tabIndex=0; item.dataset.index=i;
  item.innerHTML=`<img src="assets/${src}" alt="${title}" loading="lazy"><figcaption class="gallery-overlay">${title}</figcaption>`;
  gallery.appendChild(item);
});

const lightbox=document.querySelector('#lightbox'), lbImg=document.querySelector('#lightboxImg'), lbCaption=document.querySelector('#lightboxCaption');
let current=0;
function openLightbox(index){ current=index; const [src,title]=images[current]; lbImg.src=`assets/${src}`; lbImg.alt=title; lbCaption.textContent=title; lightbox.classList.add('is-open'); lightbox.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
function closeLightbox(){ lightbox.classList.remove('is-open'); lightbox.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
function stepLightbox(delta){ current=(current+delta+images.length)%images.length; openLightbox(current); }
gallery.addEventListener('click',e=>{const item=e.target.closest('.gallery-item'); if(item) openLightbox(Number(item.dataset.index));});
gallery.addEventListener('keydown',e=>{const item=e.target.closest('.gallery-item'); if(item && (e.key==='Enter'||e.key===' ')){e.preventDefault();openLightbox(Number(item.dataset.index));}});
document.querySelector('.lightbox-close').onclick=closeLightbox; document.querySelector('.lightbox-prev').onclick=()=>stepLightbox(-1); document.querySelector('.lightbox-next').onclick=()=>stepLightbox(1);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});
document.addEventListener('keydown',e=>{if(!lightbox.classList.contains('is-open'))return; if(e.key==='Escape')closeLightbox(); if(e.key==='ArrowLeft')stepLightbox(-1); if(e.key==='ArrowRight')stepLightbox(1);});

const toggle=document.querySelector('.menu-toggle'), mobile=document.querySelector('.mobile-menu');
toggle.addEventListener('click',()=>{const open=mobile.classList.toggle('is-open'); toggle.setAttribute('aria-expanded',String(open)); mobile.setAttribute('aria-hidden',String(!open));});
mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');mobile.setAttribute('aria-hidden','true');}));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
