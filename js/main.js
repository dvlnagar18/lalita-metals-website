try{
    document.getElementById('yr').textContent = new Date().getFullYear();
  }catch(e){}

(function(){
  var canvas = document.getElementById('heroCanvas');
  if(!canvas) return;
  var ctx = canvas.getContext('2d');
  if(!ctx) return;
  var ctx = canvas.getContext('2d');
  if(!ctx) return;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var particles = [];
  var colors = ['#FF6A1A', '#FF9142', '#FFC46B'];
  var W, H, dpr, t = 0;
  var mouse = { x:-9999, y:-9999, active:false };
  var GLOW_RADIUS = 190;

  function size(){
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.max(1, W * dpr);
    canvas.height = Math.max(1, H * dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }

  function init(){
    size();
    var count = W < 700 ? 45 : 90;
    particles = [];
    for(var i=0;i<count;i++){
      particles.push({
        x: Math.random()*W,
        y: Math.random()*H,
        vx: (Math.random()-0.5) * (reduceMotion ? 0.05 : 0.22),
        vy: (Math.random()-0.5) * (reduceMotion ? 0.05 : 0.22),
        r: Math.random()*1.8 + 1.2,
        c: colors[i % colors.length]
      });
    }
  }

  function heatAt(x, y){
    if(!mouse.active) return 0;
    var dx = x - mouse.x, dy = y - mouse.y;
    var dist = Math.sqrt(dx*dx + dy*dy);
    if(dist > GLOW_RADIUS) return 0;
    return 1 - dist / GLOW_RADIUS;
  }

  function drawCursorGlow(){
    if(!mouse.active) return;
    var grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, GLOW_RADIUS);
    grad.addColorStop(0, 'rgba(255,150,60,0.30)');
    grad.addColorStop(0.5, 'rgba(255,100,30,0.12)');
    grad.addColorStop(1, 'rgba(255,80,20,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, GLOW_RADIUS, 0, Math.PI*2);
    ctx.fill();
  }

  function drawNetwork(){
    for(var i=0;i<particles.length;i++){
      var p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if(p.x < 0 || p.x > W) p.vx *= -1;
      if(p.y < 0 || p.y > H) p.vy *= -1;
    }
    for(var i=0;i<particles.length;i++){
      for(var j=i+1;j<particles.length;j++){
        var a = particles[i], b = particles[j];
        var dx = a.x-b.x, dy = a.y-b.y;
        var dist = Math.sqrt(dx*dx+dy*dy);
        if(dist < 150){
          var mx = (a.x+b.x)/2, my = (a.y+b.y)/2;
          var heat = heatAt(mx, my);
          var baseAlpha = 0.22 * (1 - dist/150);
          if(heat > 0){
            ctx.strokeStyle = 'rgba(255,' + Math.round(120 + heat*100) + ',' + Math.round(40 + heat*60) + ',' + Math.min(1, baseAlpha + heat*0.6) + ')';
          } else {
            ctx.strokeStyle = 'rgba(239,234,224,' + baseAlpha + ')';
          }
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    for(var i=0;i<particles.length;i++){
      var p = particles[i];
      var heat = heatAt(p.x, p.y);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r + heat*3.5, 0, Math.PI*2);
      ctx.fillStyle = heat > 0.15 ? '#FFDD9E' : p.c;
      if(heat > 0){
        ctx.shadowColor = '#FF9142';
        ctx.shadowBlur = heat * 22;
      } else {
        ctx.shadowBlur = 0;
      }
      ctx.fill();
    }
    ctx.shadowBlur = 0;
  }

  function drawComet(){
    for(var k=6; k>=0; k--){
      var lag = k * 5.5;
      var px = W * (0.55 + 0.35 * Math.sin((t-lag) * 0.006));
      var py = H * (0.28 + 0.16 * Math.cos((t-lag) * 0.009));
      var alpha = 1 - k/7;
      var rad = 5 - k*0.55;
      ctx.beginPath();
      ctx.arc(px, py, Math.max(rad,0.6), 0, Math.PI*2);
      ctx.fillStyle = colors[k % colors.length];
      ctx.globalAlpha = alpha * 0.9;
      ctx.shadowColor = colors[0];
      ctx.shadowBlur = k===0 ? 18 : 0;
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }

  function step(){
    ctx.clearRect(0,0,W,H);
    drawCursorGlow();
    drawNetwork();
    drawComet();
    t += 1;
    requestAnimationFrame(step);
  }

  window.addEventListener('mousemove', function(e){
    mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true;
  });
  document.addEventListener('mouseleave', function(){ mouse.active = false; });
  window.addEventListener('touchmove', function(e){
    if(e.touches && e.touches[0]){
      mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; mouse.active = true;
    }
  }, {passive:true});
  window.addEventListener('touchend', function(){ mouse.active = false; });

  try{
    init();
    requestAnimationFrame(step);
    var resizeTimer;
    window.addEventListener('resize', function(){
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 200);
    });
  }catch(e){}
})();

/* ---------- Gallery slider ----------
   Photos are read from assets/gallery/ named 1.jpg, 2.jpg, 3.jpg ...
   Add a new photo = save it as the next number. No code changes needed. */
(function(){
  var section = document.getElementById('gallery');
  var track = document.getElementById('galleryTrack');
  if(!section || !track) return;

  var DIR = 'assets/gallery/';
  var EXTS = ['jpg','jpeg','png','webp','JPG','JPEG','PNG'];
  var MAX_GAP = 2;      // stops after this many missing numbers in a row
  var MAX_PHOTOS = 100;

  var urls = [];
  var bar = document.getElementById('galBar');
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbIdx = 0, paused = false, visible = true;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function probe(url){
    return new Promise(function(resolve){
      var img = new Image();
      img.onload = function(){ resolve(url); };
      img.onerror = function(){ resolve(null); };
      img.src = url;
    });
  }
  function findPhoto(n){
    return Promise.all(EXTS.map(function(e){ return probe(DIR + n + '.' + e); }))
      .then(function(r){ for(var k=0;k<r.length;k++){ if(r[k]) return r[k]; } return null; });
  }
  function scan(n, gap){
    if(n > MAX_PHOTOS || gap > MAX_GAP) return Promise.resolve();
    return findPhoto(n).then(function(u){
      if(u){ addSlide(u); return scan(n+1, 0); }
      return scan(n+1, gap+1);
    });
  }

  function addSlide(url){
    var i = urls.length;
    urls.push(url);
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'slide';
    b.setAttribute('aria-label', 'Open photo ' + (i+1));
    var img = document.createElement('img');
    img.src = url; img.alt = 'Material photo ' + (i+1); img.decoding = 'async';
    b.appendChild(img);
    b.addEventListener('click', function(){ openLb(i); });
    track.appendChild(b);
    section.hidden = false;
    updateBar();
  }

  function slideStep(){
    var s = track.querySelector('.slide');
    return s ? s.getBoundingClientRect().width + 16 : 300;
  }
  function move(dir){ track.scrollBy({ left: dir * slideStep(), behavior: 'smooth' }); }
  function atEnd(){ return track.scrollLeft + track.clientWidth >= track.scrollWidth - 4; }
  function updateBar(){
    if(!bar || !track.scrollWidth) return;
    bar.style.width = Math.min(100, track.clientWidth / track.scrollWidth * 100) + '%';
    bar.style.marginLeft = (track.scrollLeft / track.scrollWidth * 100) + '%';
  }

  document.getElementById('galPrev').addEventListener('click', function(){ move(-1); });
  document.getElementById('galNext').addEventListener('click', function(){ move(1); });
  track.addEventListener('scroll', updateBar, {passive:true});
  window.addEventListener('resize', updateBar);
  track.addEventListener('keydown', function(e){
    if(e.key === 'ArrowRight'){ move(1); e.preventDefault(); }
    if(e.key === 'ArrowLeft'){ move(-1); e.preventDefault(); }
  });

  /* autoplay (pauses on hover/touch/focus, off if reduced motion) */
  var box = document.getElementById('slider');
  ['mouseenter','focusin','touchstart'].forEach(function(ev){ box.addEventListener(ev, function(){ paused = true; }, {passive:true}); });
  ['mouseleave','focusout','touchend'].forEach(function(ev){ box.addEventListener(ev, function(){ paused = false; }, {passive:true}); });
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(en){ visible = en[0].isIntersecting; }).observe(section);
  }
  if(!reduce){
    setInterval(function(){
      if(paused || !visible || document.hidden || !lb.hidden || track.children.length < 2) return;
      if(atEnd()){ track.scrollTo({ left: 0, behavior: 'smooth' }); } else { move(1); }
    }, 4500);
  }

  /* lightbox */
  function showLb(i){
    lbIdx = (i + urls.length) % urls.length;
    lbImg.src = urls[lbIdx];
  }
  function openLb(i){
    showLb(i);
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeLb(){
    lb.hidden = true;
    document.body.style.overflow = '';
  }
  document.getElementById('lbClose').addEventListener('click', closeLb);
  document.getElementById('lbPrev').addEventListener('click', function(){ showLb(lbIdx - 1); });
  document.getElementById('lbNext').addEventListener('click', function(){ showLb(lbIdx + 1); });
  lb.addEventListener('click', function(e){ if(e.target === lb) closeLb(); });
  document.addEventListener('keydown', function(e){
    if(lb.hidden) return;
    if(e.key === 'Escape') closeLb();
    if(e.key === 'ArrowRight') showLb(lbIdx + 1);
    if(e.key === 'ArrowLeft') showLb(lbIdx - 1);
  });

  /* start: use preset list if given (preview build), else scan the folder */
  try{
    if(window.LM_GALLERY_PRESET && window.LM_GALLERY_PRESET.length){
      window.LM_GALLERY_PRESET.forEach(addSlide);
    } else {
      scan(1, 0);
    }
  }catch(e){}
})();
