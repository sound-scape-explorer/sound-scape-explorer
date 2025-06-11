import{r as i,f as a,b as c,w as d,s as l}from"./@ionic/vue-b78ab4d3.js";import"./vue-c72d3ab2.js";/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const p=()=>{const e=window;e.addEventListener("statusTap",()=>{i(()=>{const o=e.innerWidth,s=e.innerHeight,n=document.elementFromPoint(o/2,s/2);if(!n)return;const t=a(n);t&&new Promise(r=>c(t,r)).then(()=>{d(async()=>{t.style.setProperty("--overflow","hidden"),await l(t,300),t.style.removeProperty("--overflow")})})})})};export{p as startStatusTap};
