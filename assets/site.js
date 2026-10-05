(function(){
  var hdr=document.querySelector('.site-hdr'), dr=document.querySelector('.drawer');
  function onScroll(){ hdr.classList.toggle('scrolled', window.scrollY>10); }
  addEventListener('scroll',onScroll,{passive:true}); onScroll();
  var openB=document.querySelector('.site-hdr .burger'), closeB=dr.querySelector('.close');
  function open(){ dr.classList.add('open'); dr.setAttribute('aria-hidden','false'); openB.setAttribute('aria-expanded','true'); closeB.focus(); document.documentElement.style.overflow='hidden'; }
  function close(){ dr.classList.remove('open'); dr.setAttribute('aria-hidden','true'); openB.setAttribute('aria-expanded','false'); document.documentElement.style.overflow=''; }
  openB.addEventListener('click',open); closeB.addEventListener('click',close);
  addEventListener('keydown',function(e){ if(e.key==='Escape' && dr.classList.contains('open')) close(); });
  dr.querySelectorAll('a').forEach(function(a){ a.addEventListener('click',close); });
})();
