/* ===== EDITABLE CONTENT ===== */
const BUSINESS_EMAIL='hello@your-domain.example'; // placeholder: replace with real email
// Placeholder artwork is generated; swap by setting url: 'photo.jpg' on any item (or data-img on .ph).
const SLIDES=[
 {eb:'Contemporary Villas',a:'Spaces That',b:'Move You.',s:'Exceptional properties. Distinctive lifestyles. Extraordinary possibilities.',loc:'Luxury Residences'},
 {eb:'Interior Architecture',a:'Light, shaped',b:'with intent.',s:'Interiors composed around light, proportion and quiet confidence.',loc:'Contemporary Interiors'},
 {eb:'Signature Facades',a:'Presence that',b:'stays with you.',s:'Distinctive residences with a character all their own.',loc:'Premium Facades'}];
const PROPS=[
 {n:'Residence One',l:'[Location placeholder]',c:'Villa',i:3},{n:'Residence Two',l:'[Location placeholder]',c:'Penthouse',i:4},
 {n:'Residence Three',l:'[Location placeholder]',c:'Villa',i:5},{n:'Residence Four',l:'[Location placeholder]',c:'Estate',i:6},
 {n:'Residence Five',l:'[Location placeholder]',c:'Apartment',i:7},{n:'Residence Six',l:'[Location placeholder]',c:'Villa',i:8}];
const SERV=[['Buying Properties','Guidance from shortlist to handover.'],['Selling Properties','Considered presentation for distinctive homes.'],['Property Consultation','Clear, independent advice on your options.'],['Investment Opportunities','Explore properties with long-term potential.'],['Premium Property Discovery','Access to exceptional homes, matched to you.']];
/* ===== IMAGES — replace these files in assets/images/ (keep names, or edit paths) ===== */
const IMAGES=['assets/images/hero-1.svg','assets/images/hero-2.svg','assets/images/hero-3.svg',
 'assets/images/property-1.svg','assets/images/property-2.svg','assets/images/property-3.svg',
 'assets/images/property-4.svg','assets/images/property-5.svg','assets/images/property-6.svg'];
const scene=k=>`url("${IMAGES[k%IMAGES.length]}")`;
const FAIL='linear-gradient(135deg,#141414,#3a1620)';
document.querySelectorAll('.ph[data-i]').forEach(e=>{e.style.backgroundImage=scene(+e.dataset.i);if(e.dataset.p)e.style.backgroundPosition='50% '+e.dataset.p+'%';e.setAttribute('role','img');e.setAttribute('aria-label','Placeholder architectural artwork, '+(+e.dataset.i+1))});
/* ===== BUILD DOM ===== */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const R=matchMedia('(prefers-reduced-motion:reduce)').matches;if(R)document.body.classList.add('rm');
$('#slides').innerHTML=SLIDES.map((s,i)=>`<div class="slide${i?'':' on'}"><div class="ph" role="img" aria-label="Placeholder architecture, ${s.eb}" style="background-image:${scene(i)}"></div></div>`).join('');
$('#pg').innerHTML=SLIDES.map((s,i)=>`<button aria-label="Go to slide ${i+1}"></button>`).join('');
$('#svl').innerHTML=SERV.map((s,i)=>`<button class="sv"><div class="bg"><div class="ph" data-i="${i+3}" style="background-image:${scene(i+3)}"></div></div><span class="n">0${i+1}</span><h3 class="serif">${s[0]}</h3><p>${s[1]}</p><span aria-hidden="true">→</span></button>`).join('');
const cls=['g1','g2','g3','g4','g5','g6'];
$('#gr').innerHTML=PROPS.map((p,i)=>`<button class="pc ${cls[i]}" data-k="${i}"><div class="im"><div class="ph" role="img" aria-label="Demo property ${p.n}" style="background-image:${scene(p.i)}"></div></div><div class="m"><h3 class="serif">${p.n}</h3><span class="c">${p.c}</span></div><div class="lc">${p.l} · [Price placeholder]</div><span class="ex">Explore Property</span></button>`).join('');
$('#fpt').textContent='The Featured Residence — demo';$('#yr').textContent=new Date().getFullYear();
/* ===== THEME ===== */
const root=document.documentElement;
function setT(t,save){root.dataset.theme=t;$('#tp').setAttribute('d',t==='night'?'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z':'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4');if(save)try{localStorage.setItem('ep-theme',t)}catch(e){}}
setT(root.dataset.theme,false);
$('#theme').onclick=()=>setT(root.dataset.theme==='night'?'day':'night',true);
/* ===== SMOOTH SCROLL + GSAP ===== */
gsap.registerPlugin(ScrollTrigger);
let lenis;
if(!R&&window.Lenis){lenis=new Lenis({lerp:.1});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0)}
const goTo=h=>{const el=$(h);if(!el)return;lenis?lenis.scrollTo(el,{offset:h==='#home'?0:-0,duration:1.4}):el.scrollIntoView({behavior:R?'auto':'smooth'})};
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();closeM();goTo(a.getAttribute('href'))}));
$('#top').onclick=()=>goTo('#home');
/* nav state */
const nav=$('#nav');ScrollTrigger.create({start:60,end:'max',onToggle:s=>nav.classList.toggle('sc',s.isActive)});
$$('[data-sec]').forEach(s=>ScrollTrigger.create({trigger:s,start:'top 50%',end:'bottom 50%',onToggle:t=>{if(t.isActive){const id=s.id==='reveal'?'about':s.id;$$('.links a').forEach(a=>a.classList.toggle('on',a.dataset.s===id))}}}));
/* mobile menu */
const mm=$('#mm'),bg=$('#bg');
function closeM(){mm.classList.remove('open');bg.classList.remove('x');bg.setAttribute('aria-expanded','false');mm.setAttribute('aria-hidden','true');lenis&&lenis.start()}
bg.onclick=()=>{const o=!mm.classList.contains('open');mm.classList.toggle('open',o);bg.classList.toggle('x',o);bg.setAttribute('aria-expanded',o);mm.setAttribute('aria-hidden',!o);o?lenis&&lenis.stop():lenis&&lenis.start()};
/* ===== HERO ===== */
let cur=0,timer,paused=false;const sl=$$('.slide'),pb=$$('#pg button');
const txt=i=>{const s=SLIDES[i];$('#eb').textContent=s.eb;$('#h1').textContent=s.a;$('#h2').textContent=s.b;$('#sb').textContent=s.s;$('#loc').textContent=s.loc;$('#cn').textContent='0'+(i+1)};
$('#ct').textContent='0'+SLIDES.length;txt(0);pb[0].classList.add('on');
const heroEls=['#eb','#h1','#h2','#sb'];
function show(n,dir=1){n=(n+SLIDES.length)%SLIDES.length;if(n===cur)return;const old=cur;cur=n;
 sl[old].classList.remove('on');sl[n].classList.add('on');pb.forEach((b,i)=>b.classList.toggle('on',i===n));
 if(R){txt(n);return}
 gsap.timeline().to(heroEls,{yPercent:-110*dir,duration:.5,ease:'power3.in',stagger:.04}).add(()=>txt(n)).fromTo(heroEls,{yPercent:110*dir},{yPercent:0,duration:.9,ease:'expo.out',stagger:.07})}
const nxt=()=>show(cur+1),prv=()=>show(cur-1,-1);
function start(){clearInterval(timer);timer=setInterval(()=>{if(!paused&&!document.hidden)nxt()},6500)}
$('#nx').onclick=()=>{nxt();start()};$('#pv').onclick=()=>{prv();start()};pb.forEach((b,i)=>b.onclick=()=>{show(i,i>cur?1:-1);start()});
const hero=$('#home');hero.addEventListener('mouseenter',()=>paused=true);hero.addEventListener('mouseleave',()=>paused=false);
let tx=null;hero.addEventListener('touchstart',e=>tx=e.touches[0].clientX,{passive:true});hero.addEventListener('touchend',e=>{if(tx==null)return;const d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50){d<0?nxt():prv();start()}tx=null},{passive:true});
start();
/* entrance */
if(!R){
 gsap.set(heroEls,{yPercent:110});gsap.set('.hc .cta,.hbar,.scrl,.loc',{autoAlpha:0});gsap.set('nav',{yPercent:-100,autoAlpha:0});
 gsap.timeline({defaults:{ease:'expo.out'}})
  .fromTo('#home .slide.on .ph',{scale:1.25},{scale:1,duration:3,ease:'power2.out'},0)
  .to('#cur',{clipPath:'inset(0 0 100% 0)',duration:1.4,ease:'power4.inOut'},0)
  .to('#eb',{yPercent:0,duration:1},.9).to(['#h1','#h2'],{yPercent:0,duration:1.3,stagger:.14},1)
  .to('#sb',{yPercent:0,duration:1},1.5).to('.hc .cta',{autoAlpha:1,y:0,duration:1},{y:0}&&1.7)
  .to('nav',{yPercent:0,autoAlpha:1,duration:1.2},1.8).to('.hbar,.loc,.scrl',{autoAlpha:1,duration:1.2},2);
}else gsap.set('#cur',{display:'none'});
/* ===== SCROLL STORIES ===== */
const mmq=gsap.matchMedia();
function lines(el){if(R)return;gsap.to(el.querySelectorAll('.ln>span'),{yPercent:0,duration:1.2,ease:'expo.out',stagger:.12,scrollTrigger:{trigger:el,start:'top 85%',once:true}})}
if(!R)gsap.set('#about .ln>span,#services .ln>span,#properties .ln>span,#contact .ln>span',{yPercent:110});
['#about .ab > div:last-child','#services .sh','#properties .sh','#contact .ct > div:first-child'].forEach(s=>lines($(s)));
if(!R){
 /* 1. immersive reveal: pinned, scrubbed frame expansion */
 const tl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:'#reveal',start:'top top',end:'+=220%',scrub:.6,pin:true,anticipatePin:1}});
 tl.to('#fr',{clipPath:'inset(0% 0% 0% 0%)',duration:3},0).to('#fr .ph',{scale:1,yPercent:-6,duration:4},0).to('.rtitle',{opacity:0,duration:1},0)
  .to('.rl',{opacity:1,duration:.4,stagger:.9},.8).to('#rb',{opacity:1,y:-20,duration:1},2.6).to('#fr .ph',{xPercent:-4,duration:1},3);
 /* 2. layered parallax */
 const par=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:'.stack',start:'top 90%',end:'bottom 20%',scrub:true}});
 par.to('.stack .l1 .ph',{yPercent:12},0).to('.stack .l2',{y:-50},0).to('#l3',{y:-110},0);
 ScrollTrigger.create({trigger:'.stack',start:'top 75%',once:true,onEnter:()=>{gsap.to('.l1',{clipPath:'inset(0 0% 0 0)',duration:1.6,ease:'power4.inOut'});gsap.to('.l2',{clipPath:'inset(0% 0 0 0)',duration:1.4,delay:.4,ease:'power4.inOut'})}});
 /* 3. horizontal editorial movement */
 gsap.to('#mqi',{x:()=>-Math.max(0,$('#mqi').scrollWidth-innerWidth),ease:'none',scrollTrigger:{trigger:'.mq',start:'top bottom',end:'bottom top',scrub:true,invalidateOnRefresh:true}});
 /* 4. services row slide */
 $$('.sv').forEach(r=>gsap.from(r,{opacity:0,x:-40,duration:1,ease:'expo.out',scrollTrigger:{trigger:r,start:'top 90%',once:true}}));
 /* 5. featured property clip scrub + image drift */
 gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:'#fp',start:'top 90%',end:'center 40%',scrub:.5}}).to('#fp',{clipPath:'inset(0% 0% 0% 0%)'},0);
 gsap.fromTo('#fp .ph',{yPercent:-8,scale:1.15},{yPercent:8,scale:1,ease:'none',scrollTrigger:{trigger:'#fp',start:'top bottom',end:'bottom top',scrub:true}});
 /* 6. property masks */
 $$('.pc .im').forEach(el=>ScrollTrigger.create({trigger:el,start:'top 88%',once:true,onEnter:()=>gsap.to(el,{clipPath:'inset(0 0 0% 0)',duration:1.5,ease:'power4.inOut'})}));
 /* 7. contact glow + footer wordmark */
 gsap.fromTo('.big',{xPercent:6},{xPercent:-4,ease:'none',scrollTrigger:{trigger:'footer',start:'top bottom',end:'bottom bottom',scrub:true}});
 gsap.fromTo('#contact',{'--g':0},{'--g':1});
 /* day/night lighting transition on reveal section background */
 gsap.fromTo('#about',{backgroundPositionY:'0%'},{ease:'none',scrollTrigger:{trigger:'#about',start:'top bottom',end:'bottom top',scrub:true}});
}
/* ===== MODAL ===== */
const mo=$('#mo');let lastF=null;
function openM(k){const p=PROPS[k];lastF=document.activeElement;$('#mi').style.backgroundImage=scene(p.i);$('#mt').textContent=p.n;$('#mc').textContent=p.c;$('#ml').textContent=p.l;
 mo.classList.add('open');mo.setAttribute('aria-hidden','false');lenis&&lenis.stop();document.body.style.overflow='hidden';$('#mx').focus()}
function closeMo(){mo.classList.remove('open');mo.setAttribute('aria-hidden','true');lenis&&lenis.start();document.body.style.overflow='';lastF&&lastF.focus()}
$$('.pc,#fp').forEach(b=>b.onclick=()=>openM(+b.dataset.k));
$('#mx').onclick=closeMo;mo.addEventListener('click',e=>{if(e.target===mo)closeMo()});
$('#mq').addEventListener('click',()=>{closeMo()});
addEventListener('keydown',e=>{if(e.key==='Escape'){if(mo.classList.contains('open'))closeMo();else closeM()}
 if(e.key==='Tab'&&mo.classList.contains('open')){const f=$$('#md button,#md a');const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
/* services click -> contact */
$$('.sv').forEach(s=>s.onclick=()=>{$('#fm').value='I am interested in: '+s.querySelector('h3').textContent+'.';goTo('#contact')});
/* ===== FORM ===== */
const cf=$('#cf');
cf.addEventListener('submit',e=>{e.preventDefault();const v=n=>cf.elements[n].value.trim(),set=(n,m)=>{const f=cf.elements[n].closest('.f');f.classList.toggle('bad',!!m);f.querySelector('.er').textContent=m||'';return!m};
 const ok=[set('name',v('name').length<2?'Please enter your name.':''),set('email',/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v('email'))?'':'Enter a valid email address.'),set('phone',/^[+\d][\d\s\-()]{6,17}$/.test(v('phone'))?'':'Enter a valid phone number.'),set('message',v('message').length<10?'Message should be at least 10 characters.':'')];
 const fs=$('#fs');if(ok.includes(false)){fs.textContent='Please correct the highlighted fields.';return}
 const body=`Name: ${v('name')}\nEmail: ${v('email')}\nPhone: ${v('phone')}\n\n${v('message')}`;
 fs.textContent='Opening your email app… if nothing opens, please call or email '+BUSINESS_EMAIL+' directly.';
 location.href=`mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent('Enquiry from website')}&body=${encodeURIComponent(body)}`});
addEventListener('load',()=>ScrollTrigger.refresh());
