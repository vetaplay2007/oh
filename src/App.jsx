import {useEffect,useRef,useState} from 'react';
import {answers} from './data/survey.js';
import {stories} from './data/stories.js';

const Logo=({light})=>(<a href="#top" className="logo" aria-label="Love Is More Than We Think — back to top">
<svg viewBox="0 0 44 28" width="44" height="28" aria-hidden="true"><circle cx="15" cy="14" r="11" fill="none" stroke="currentColor" strokeWidth="1.4"/><circle cx="29" cy="14" r="11" fill="none" stroke="currentColor" strokeWidth="1.4" opacity=".55"/></svg>
<span><b>Love</b> is more<br/>than we think</span></a>);

const md=t=>t.split('*').map((s,i)=>i%2?<em key={i}>{s}</em>:s);

function Figure({s}){const[bad,setBad]=useState(false);
return <figure className="fig">{bad?<div className="ph">Place <code>{s.file}</code> in <code>public/images/</code></div>:
<img src={s.img} alt={s.alt} loading="lazy" onError={()=>setBad(true)}/>}<figcaption>{s.cap}</figcaption></figure>}

function Carousel(){const[i,setI]=useState(0);const x=useRef(null);const n=answers.length;
const go=d=>setI(v=>Math.min(n-1,Math.max(0,v+d)));
return <section className="survey" aria-label="Survey answers: I love…" tabIndex={0}
onKeyDown={e=>{if(e.key==='ArrowRight')go(1);if(e.key==='ArrowLeft')go(-1)}}
onTouchStart={e=>x.current=e.touches[0].clientX}
onTouchEnd={e=>{const d=e.changedTouches[0].clientX-x.current;if(Math.abs(d)>40)go(d<0?1:-1)}}>
<div className="row"><button className="arrow" onClick={()=>go(-1)} disabled={i===0} aria-label="Previous answer">‹</button>
<div className="card" aria-live="polite"><small>I LOVE…</small><p key={i}>{answers[i]}</p></div>
<button className="arrow" onClick={()=>go(1)} disabled={i===n-1} aria-label="Next answer">›</button></div>
<div className="prog"><i style={{width:`${(i+1)/n*100}%`}}/></div><div className="count">{i+1} / {n}</div>
<p className="note">An informal survey with more than 100 respondents. These 74 selected answers reflect individual expressions of affection and personal preference; they are not intended to represent a statistically representative sample.</p></section>}

export default function App(){
useEffect(()=>{const o=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('in')),{threshold:.1});
document.querySelectorAll('.rv').forEach(el=>o.observe(el));return()=>o.disconnect()},[]);
return <div id="top">
<header className="bar"><Logo/></header>
<section className="cover"><span className="blob b1"/><span className="blob b2"/>
<h1>LOVE IS MORE<br/>THAN WE THINK</h1>
<p className="sub">Four stories about whom we love, how we show it, and what we learn from one another.</p>
<p className="lede">A documentary longform about romantic relationships, self-acceptance, the bond between a person and an animal, and the friendships that make us feel at home.</p>
<a href="#prologue" className="scroll">Scroll to explore ↓</a></section>
<main>
<section id="prologue" className="text rv"><h2>I LOVE…</h2>
<p>Finishing this sentence turned out to be less simple than it first appeared. When people were asked what they love, their answers brought together people, animals, universities, music, food, hobbies, memories, and the smallest moments of an ordinary day.</p>
<p>For one respondent, love fitted into a single word: “Living.” Someone mentioned kittens; someone else named manti, cold Coca-Cola, strawberries, and peonies.</p></section>
<Carousel/>
<section className="text rv"><p>We are used to thinking of love as a story between two people. But these simple answers suggest that love is much more closely connected to everyday life. I spoke with four people. Their stories do not create one universal formula; each offers a different perspective on what it means to care, to feel close, and to love.</p></section>
{stories.map(s=><article key={s.id} id={s.id} className={'story rv'+(s.flip?' flip':'')+(s.wide?' wide':'')}>
<header><small>{s.kicker}</small><h2>{s.title}</h2></header>
<div className="grid"><Figure s={s}/><div className="body">{s.p.map((t,k)=><p key={k}>{md(t)}</p>)}</div></div>
<blockquote>“{s.q}”{s.who&&<cite>— {s.who}</cite>}</blockquote>
{s.flag&&<p className="flag">{s.flag}</p>}</article>)}
<section className="text rv"><h2>Everyone has their own way of finishing the sentence</h2>
<p>Love does not have to look the same to be real. For one person, it begins with a confession. For another, it is the ability to say no. For someone else, it is taking a cold, frightened kitten off the street. And for someone, it is a friend's embrace when there is nothing useful to say.</p>
<p>There are so many ways to continue “I love…” And each one can be someone's real story.</p></section>
</main>
<footer><Logo/><p>Credits & sources: interviews and survey by the project author. Photographs are personal documentary material from the interviewees. Research behind the planned science section: Babková & Repiská (2025); Prato-Previde et al. (2022), doi:10.3390/ani12202835; Dunbar (2025), doi:10.1111/nyas.15309.</p></footer></div>}
