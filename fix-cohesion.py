from pathlib import Path
import re
p=Path('index.html');s=p.read_text(encoding='utf-8-sig')
s=re.sub(r'<div class="loader-food">.*?</div><p class="loader-label">','<div class="loader-food"><div class="steam" aria-hidden="true"><i></i><i></i><i></i></div><img class="loader-whole" src="assets/menu-2.webp" alt=""></div><p class="loader-label">',s,count=1)
s=re.sub(r'<img class="hero-piece hero-piece-0".*?<img class="hero-piece hero-piece-1"[^>]+>','<img class="hero-piece hero-whole" src="assets/exploded.webp" alt="" fetchpriority="high">',s,count=1)
s=re.sub(r'<div class="layers-food">.*?</div>','<div class="layers-food"><img class="layer layer-whole" src="assets/menu-2.webp" alt="Satu porsi dimsum ayam mentai utuh dalam kukusan bambu"></div>',s,count=1)
s=s.replace('SETIAP LAPIS, BIKIN NAGIH','SATU PORSI, BIKIN NAGIH').replace('Scroll pelan-pelan.<br>Kenali tiap bagian favoritmu.','Mentai creamy. Isian gurih.<br>Semuanya dalam satu porsi.')
s=s.replace('<div class="header-actions">','<nav class="desktop-nav" aria-label="Navigasi desktop"><a href="#home" data-nav="home">Beranda</a><a href="#rasa" data-nav="rasa">Tentang</a><a href="#menu" data-nav="menu">Menu</a><a href="#kedai" data-nav="kedai">Kedai</a><a href="#kontak" data-nav="kontak">Kontak</a></nav><div class="header-actions">',1)
s=s.replace('PESAN SEKARANG <span>↗</span>','Pesan sekarang <span>↗</span>',1)
icons={'home':'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>','menu':'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>','kedai':'<path d="M4 10v11h16V10M3 10l2-7h14l2 7M3 10q3 4 6 0 3 4 6 0 3 4 6 0M9 21v-7h6v7"/>','kontak':'<path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-2 2v-9.5A8.5 8.5 0 1 1 21 11.5Z"/><path d="M7 10h9M7 14h5"/>'}
nav='<nav class="mobile-dock" aria-label="Navigasi bawah">'+''.join(f'<a href="#{id}" data-nav="{id}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{icons[id]}</svg><span>{label}</span></a>' for id,label in [('home','Beranda'),('menu','Menu'),('kedai','Kedai'),('kontak','Kontak')])+'</nav>'
s=s.replace('  <div class="toast"',nav+'\n  <div class="toast"')
s=s.replace('<script src="motion.js" defer></script>','<script src="motion.js" defer></script><script src="navigation.js" defer></script>')
p.write_text(s,encoding='utf-8')
p=Path('script.js');s=p.read_text(encoding='utf-8-sig');s=s.replace("layerTop=document.querySelector('.layer-top'),layerMiddle=document.querySelector('.layer-middle'),layerBottom=document.querySelector('.layer-bottom')","layerWhole=document.querySelector('.layer-whole')")
a=s.index('layerTop.style.transform=');b=s.index('\nwindow.addEventListener',a)
s=s[:a]+"layerWhole.style.transform=`translateY(${-progress*(mobile?18:30)}px) rotate(${-3+progress*6}deg) scale(${.94+progress*.08})`}\n"+s[b:]
s=s.replace('[heroFood,layerTop,layerMiddle,layerBottom]','[heroFood,layerWhole]').replace("layerMiddle.style.opacity='';",'')
p.write_text(s,encoding='utf-8')
p=Path('motion.js');s=p.read_text(encoding='utf-8-sig').replace("'.hero-piece, .loader-piece'","'.hero-piece, .loader-whole'")
a=s.index("    move(document.querySelector('.loader-bottom')");b=s.index("    move(document.querySelector('.loader-track span')",a)
s=s[:a]+'''    move(document.querySelector('.loader-whole'),[
      {transform:'translateY(65px) scale(.7) rotate(-12deg)',opacity:0,filter:'blur(8px)'},
      {transform:'translateY(-5px) scale(1.025) rotate(2deg)',opacity:1,filter:'blur(0)',offset:.8},
      {transform:'translateY(0) scale(1) rotate(0)',opacity:1,filter:'blur(0)'}
    ],0,1100);
'''+s[b:]
a=s.index('    const starts =');b=s.index("    document.querySelectorAll('.hero-sticker",a)
s=s[:a]+'''    move(document.querySelector('.hero-whole'),[
      {opacity:0,transform:'translateY(100px) rotate(-8deg) scale(.72)',filter:'blur(8px)'},
      {opacity:1,transform:'translateY(-7px) rotate(1deg) scale(1.025)',filter:'blur(0)',offset:.8},
      {opacity:1,transform:'translateY(0) rotate(0) scale(1)',filter:'blur(0)'}
    ],2650,1250);
'''+s[b:]
p.write_text(s,encoding='utf-8')
