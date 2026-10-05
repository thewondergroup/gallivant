(function(){
  var hdr=document.querySelector('.site-hdr'), dr=document.querySelector('.drawer');
  function onScroll(){ hdr.classList.toggle('scrolled', window.scrollY>10); }
  addEventListener('scroll',onScroll,{passive:true}); onScroll();
  var openB=document.querySelector('.site-hdr .burger'), closeB=dr.querySelector('.close');
  var slides=[].slice.call(dr.querySelectorAll('.slide')), cap=dr.querySelector('.cap'), capK=dr.querySelector('.cap-k'), capT=dr.querySelector('.cap-t');
  var loaded=false, current=(dr.querySelector('.slide.on')||slides[0]).getAttribute('data-k');
  function loadImages(){ if(loaded) return; loaded=true; slides.forEach(function(s){ s.style.backgroundImage='url("'+s.getAttribute('data-bg')+'")'; }); }
  function show(k){
    var t=slides.filter(function(s){return s.getAttribute('data-k')===k})[0]; if(!t || t.classList.contains('on')) return;
    slides.forEach(function(s){ s.classList.toggle('on', s===t); });
    capK.textContent=t.getAttribute('data-cap-k'); capT.textContent=t.getAttribute('data-cap-t');
    cap.classList.remove('swap'); void cap.offsetWidth; cap.classList.add('swap');
  }
  (function(){ var t=slides.filter(function(s){return s.getAttribute('data-k')===current})[0]; if(t){ capK.textContent=t.getAttribute('data-cap-k'); capT.textContent=t.getAttribute('data-cap-t'); } })();
  /* hover / focus on a menu item or a space swaps the big image */
  [].forEach.call(dr.querySelectorAll('[data-k]'),function(el){
    if(el.classList.contains('slide')) return;
    var k=el.getAttribute('data-k');
    var target=el.tagName==='LI'?el.querySelector('.ml'):el;
    ['mouseenter','focusin'].forEach(function(ev){ (el.tagName==='LI'?target:el).addEventListener(ev,function(){ show(k); }); });
  });
  dr.querySelector('.main').addEventListener('mouseleave',function(){ show(current); });
  function open(){ loadImages(); dr.classList.add('open'); dr.setAttribute('aria-hidden','false'); openB.setAttribute('aria-expanded','true'); document.documentElement.style.overflow='hidden'; setTimeout(function(){ closeB.focus({preventScroll:true}); },400); }
  function close(){ dr.classList.remove('open'); dr.setAttribute('aria-hidden','true'); openB.setAttribute('aria-expanded','false'); document.documentElement.style.overflow=''; show(current); openB.focus({preventScroll:true}); }
  /* Eat and Drink: the round + expands the spaces; the words still go to the main page */
  [].forEach.call(dr.querySelectorAll('.tog'),function(t){ t.addEventListener('click',function(){ var li=t.closest('li'), on=!li.classList.contains('open'); li.classList.toggle('open',on); t.setAttribute('aria-expanded',String(on)); }); });
  openB.addEventListener('click',open); closeB.addEventListener('click',close);
  addEventListener('keydown',function(e){ if(e.key==='Escape' && dr.classList.contains('open')) close(); });
  dr.querySelectorAll('a').forEach(function(a){ a.addEventListener('click',function(){ if(a.getAttribute('href').indexOf('#')>-1) close(); }); });
})();
