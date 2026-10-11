from pathlib import Path
p=Path('index.html');s=p.read_text(encoding='utf-8-sig')
s=s.replace('<link rel="icon"', '''<script>document.documentElement.classList.add('motion-pending');window.motionFallback=setTimeout(()=>{document.documentElement.classList.remove('motion-pending');document.querySelector('.intro')?.remove();document.body.classList.remove('opening');},12000);</script>
  <link rel="icon"''')
s=s.replace('<script src="script.js" defer></script>','<script src="script.js" defer></script><script src="motion.js" defer></script>')
a=s.index('  <div class="intro"');b=s.index('\n  <a class="skip-link"',a)
s=s[:a]+'''  <div class="intro" aria-hidden="true"><div class="loader-food"><img class="loader-piece loader-bottom" src="assets/bottom.webp" alt=""><img class="loader-piece loader-middle" src="assets/middle.webp" alt=""><img class="loader-piece loader-top" src="assets/top.webp" alt=""></div><p class="loader-label">MENYIAPKAN DIMSUM JUARA...</p><div class="loader-track"><span></span></div></div>
  <button class="skip-intro" type="button">LEWATI INTRO ↗</button>'''+s[b:]
s=s.replace('<h1 id="hero-title">THE DIMSUM</h1>','<h1 id="hero-title" aria-label="THE DIMSUM">'+''.join('<span class="title-letter" aria-hidden="true">'+ ('&nbsp;' if c==' ' else c)+'</span>' for c in 'THE DIMSUM')+'</h1>')
s=s.replace('<img class="hero-exploded" src="assets/exploded.webp" alt="Dimsum mentai terbelah dengan saus melty dan isian gurih" fetchpriority="high">','<div class="hero-assembly" role="img" aria-label="Dimsum mentai dengan saus melty dan isian gurih">'+''.join(f'<img class="hero-piece hero-piece-{i}" src="assets/exploded.webp" alt="" fetchpriority="high">' for i in range(3))+'</div>')
s=s.replace('<a class="scroll-hint"','<button class="replay-intro" type="button" aria-label="Putar ulang animasi pembuka">↻ PUTAR ULANG INTRO</button>\n      <a class="scroll-hint"')
p.write_text(s,encoding='utf-8')
