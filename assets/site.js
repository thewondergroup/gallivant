(function(){
  var hdr=document.querySelector('.site-hdr'), dr=document.querySelector('.drawer');
  /* Header is see-through only while it sits over a page-top photo or film; anywhere else it is solid grey/green */
  function overHero(){
    var h=document.querySelector('main .hero, main [data-hero], main .intro.scr'); if(!h) return false;
    var r=h.getBoundingClientRect(); return r.top<40 && r.bottom>hdr.offsetHeight;
  }
  function onScroll(){ var sc=window.scrollY>10 || !overHero(); hdr.classList.toggle('scrolled', sc); document.body.classList.toggle('hdr-scrolled', sc); }
  addEventListener('scroll',onScroll,{passive:true}); addEventListener('resize',onScroll); onScroll();
  var mn=document.querySelector('main'); if(mn && 'MutationObserver' in window) new MutationObserver(function(){ requestAnimationFrame(onScroll); }).observe(mn,{childList:true,subtree:true});
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

/* Carousels: brush-stroke arrows (in the spirit of the logo lettering) and a count of where you are */
(function(){
  var R='<svg viewBox="0 0 60 24" aria-hidden="true"><path d="M2 13.6C14 12.3 29 11.5 49 11.7c.6 0 .9.5.9 1s-.4 1-1 1C30 13.9 15 14.6 2.4 15.6c-.8.1-1.3-.4-1.3-1s.3-1 .9-1z"/><path d="M40.5 4.2c4.6 3.2 9.6 6 15.8 8 .7.2.8 1.2.1 1.5-5.6 2.4-10.4 5.4-14.6 8.8-.6.5-1.4-.3-.9-.9 3.4-3.7 7.4-6.6 11.6-8.4-4.6-1.8-8.8-4.4-12.7-7.7-.6-.5.1-1.6.7-1.3z"/></svg>';
  var L=R.replace('<svg ','<svg style="transform:scaleX(-1)" ');
  var navs=document.querySelectorAll('.gved .rail-nav, .gved .yr-nav, .gved .p-nav, .gved .gal-nav, .gved .car-nav, .gved [data-carousel-nav]');
  [].forEach.call(navs,function(nav){
    var bs=nav.querySelectorAll('button[data-dir]'); if(bs.length<2) return;
    [].forEach.call(bs,function(b){ b.classList.add('brush'); b.innerHTML=(+b.getAttribute('data-dir')<0)?L:R; });
    /* find the scrolling row this nav controls: nearest section, element that scrolls sideways */
    var sec=nav.closest('section')||nav.parentNode, cand=[].slice.call(sec.querySelectorAll('*')).filter(function(el){ var o=getComputedStyle(el).overflowX; return (o==='auto'||o==='scroll') && el.children.length>1; });
    var row=cand[0]; if(!row) return;
    var c=document.createElement('span'); c.className='nav-count'; c.setAttribute('aria-live','polite'); bs[0].after(c);
    function upd(){ var kids=[].slice.call(row.children).filter(function(k){ return k.offsetWidth>0; }); if(!kids.length) return;
      var step=kids.length>1?(kids[1].offsetLeft-kids[0].offsetLeft):kids[0].offsetWidth; var i=Math.round(row.scrollLeft/Math.max(1,step));
      var vis=Math.max(1,Math.round(row.clientWidth/Math.max(1,step))); var last=Math.max(1,kids.length-vis+1);
      i=Math.min(Math.max(i,0),last-1); var pad=function(n){ return (n<10?'0':'')+n; };
      c.textContent=pad(i+1)+' / '+pad(kids.length);
      bs[0].disabled=row.scrollLeft<4; bs[bs.length-1].disabled=row.scrollLeft+row.clientWidth>=row.scrollWidth-4; }
    row.addEventListener('scroll',function(){ requestAnimationFrame(upd); },{passive:true}); addEventListener('resize',upd); setTimeout(upd,300); upd();
  });
})();
