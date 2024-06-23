// ==UserScript==
// @name			Pokebin Extension
// @version		1.0.0
// @description	Import and Export teams to & from PokeBin!
// @author		malaow3
// @match			https://play.pokemonshowdown.com/*
// @icon			data:image/png;base64,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
// @grant			unsafeWindow
// ==/UserScript==

var At=Object.defineProperty;var It=(e,t,n)=>t in e?At(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var et=(e,t,n)=>(It(e,typeof t!="symbol"?t+"":t,n),n);function x(){}function kt(e){return e()}function wt(){return Object.create(null)}function W(e){e.forEach(kt)}function $t(e){return typeof e=="function"}function ct(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function Nt(e){return Object.keys(e).length===0}function d(e,t){e.appendChild(t)}function lt(e,t,n){e.insertBefore(t,n||null)}function G(e){e.parentNode&&e.parentNode.removeChild(e)}function y(e){return document.createElement(e)}function Ct(e){return document.createTextNode(e)}function b(){return Ct(" ")}function F(e,t,n,r){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)}function m(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function jt(e){return Array.from(e.childNodes)}let dt;function V(e){dt=e}const K=[],bt=[];let M=[];const _t=[],Lt=Promise.resolve();let rt=!1;function Pt(){rt||(rt=!0,Lt.then(St))}function ot(e){M.push(e)}const nt=new Set;let U=0;function St(){if(U!==0)return;const e=dt;do{try{for(;U<K.length;){const t=K[U];U++,V(t),Ut(t.$$)}}catch(t){throw K.length=0,U=0,t}for(V(null),K.length=0,U=0;bt.length;)bt.pop()();for(let t=0;t<M.length;t+=1){const n=M[t];nt.has(n)||(nt.add(n),n())}M.length=0}while(K.length);for(;_t.length;)_t.pop()();rt=!1,nt.clear(),V(e)}function Ut(e){if(e.fragment!==null){e.update(),W(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(ot)}}function Kt(e){const t=[],n=[];M.forEach(r=>e.indexOf(r)===-1?t.push(r):n.push(r)),n.forEach(r=>r()),M=t}const Ft=new Set;function Mt(e,t){e&&e.i&&(Ft.delete(e),e.i(t))}function Wt(e,t,n){const{fragment:r,after_update:i}=e.$$;r&&r.m(t,n),ot(()=>{const o=e.$$.on_mount.map(kt).filter($t);e.$$.on_destroy?e.$$.on_destroy.push(...o):W(o),e.$$.on_mount=[]}),i.forEach(ot)}function Dt(e,t){const n=e.$$;n.fragment!==null&&(Kt(n.after_update),W(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function Ht(e,t){e.$$.dirty[0]===-1&&(K.push(e),Pt(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function mt(e,t,n,r,i,o,s=null,l=[-1]){const a=dt;V(e);const u=e.$$={fragment:null,ctx:[],props:o,update:x,not_equal:i,bound:wt(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(a?a.$$.context:[])),callbacks:wt(),dirty:l,skip_bound:!1,root:t.target||a.$$.root};s&&s(u.root);let c=!1;if(u.ctx=n?n(e,t.props||{},(p,f,..._)=>{const w=_.length?_[0]:f;return u.ctx&&i(u.ctx[p],u.ctx[p]=w)&&(!u.skip_bound&&u.bound[p]&&u.bound[p](w),c&&Ht(e,p)),f}):[],u.update(),c=!0,W(u.before_update),u.fragment=r?r(u.ctx):!1,t.target){if(t.hydrate){const p=jt(t.target);u.fragment&&u.fragment.l(p),p.forEach(G)}else u.fragment&&u.fragment.c();t.intro&&Mt(e.$$.fragment),Wt(e,t.target,t.anchor),St()}V(a)}class ft{constructor(){et(this,"$$");et(this,"$$set")}$destroy(){Dt(this,1),this.$destroy=x}$on(t,n){if(!$t(n))return x;const r=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return r.push(n),()=>{const i=r.indexOf(n);i!==-1&&r.splice(i,1)}}$set(t){this.$$set&&!Nt(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const qt="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(qt);function it(e){return{type:"ok",value:e,unwrap:()=>e,unwrapOr:()=>e,unwrapOrElse:()=>e,isErr:()=>!1,isOk:()=>!0,toOption:()=>Vt(e)}}function st(e){return{type:"error",error:e,unwrap:()=>{throw e},unwrapOr:t=>t,unwrapOrElse:t=>t(e),isErr:()=>!0,isOk:()=>!1,toOption:()=>Y}}function Ot(e){if(e==null)throw new Error("Some() cannot be called with null or undefined");return{type:"some",value:e,unwrap:()=>e,unwrapOr:()=>e,unwrapOrElse:()=>e,isSome:()=>!0,isNone:()=>!1,map:t=>Ot(t(e)),flatMap:t=>t(e),okOr(t){return it(e)},okOrElse(t){return it(e)}}}const Y={type:"none",unwrap:()=>{throw new Error("Cannot unwrap None")},unwrapOr:e=>e,unwrapOrElse:e=>e(),isSome:()=>!1,isNone:()=>!0,map:()=>Y,flatMap:e=>Y,okOr:e=>st(e),okOrElse:e=>st(e())};function Vt(e){return e==null?Y:Ot(e)}const T=Symbol.for("@ts-pattern/matcher"),Rt=Symbol.for("@ts-pattern/isVariadic"),X="@ts-pattern/anonymous-select-key",at=e=>!!(e&&typeof e=="object"),J=e=>e&&!!e[T],O=(e,t,n)=>{if(J(e)){const r=e[T](),{matched:i,selections:o}=r.match(t);return i&&o&&Object.keys(o).forEach(s=>n(s,o[s])),i}if(at(e)){if(!at(t))return!1;if(Array.isArray(e)){if(!Array.isArray(t))return!1;let r=[],i=[],o=[];for(const s of e.keys()){const l=e[s];J(l)&&l[Rt]?o.push(l):o.length?i.push(l):r.push(l)}if(o.length){if(o.length>1)throw new Error("Pattern error: Using `...P.array(...)` several times in a single pattern is not allowed.");if(t.length<r.length+i.length)return!1;const s=t.slice(0,r.length),l=i.length===0?[]:t.slice(-i.length),a=t.slice(r.length,i.length===0?1/0:-i.length);return r.every((u,c)=>O(u,s[c],n))&&i.every((u,c)=>O(u,l[c],n))&&(o.length===0||O(o[0],a,n))}return e.length===t.length&&e.every((s,l)=>O(s,t[l],n))}return Object.keys(e).every(r=>{const i=e[r];return(r in t||J(o=i)&&o[T]().matcherType==="optional")&&O(i,t[r],n);var o})}return Object.is(t,e)},N=e=>{var t,n,r;return at(e)?J(e)?(t=(n=(r=e[T]()).getSelectionKeys)==null?void 0:n.call(r))!=null?t:[]:Array.isArray(e)?R(e,N):R(Object.values(e),N):[]},R=(e,t)=>e.reduce((n,r)=>n.concat(t(r)),[]);function E(e){return Object.assign(e,{optional:()=>Jt(e),and:t=>g(e,t),or:t=>Yt(e,t),select:t=>t===void 0?vt(e):vt(t,e)})}function Jt(e){return E({[T]:()=>({match:t=>{let n={};const r=(i,o)=>{n[i]=o};return t===void 0?(N(e).forEach(i=>r(i,void 0)),{matched:!0,selections:n}):{matched:O(e,t,r),selections:n}},getSelectionKeys:()=>N(e),matcherType:"optional"})})}function g(...e){return E({[T]:()=>({match:t=>{let n={};const r=(i,o)=>{n[i]=o};return{matched:e.every(i=>O(i,t,r)),selections:n}},getSelectionKeys:()=>R(e,N),matcherType:"and"})})}function Yt(...e){return E({[T]:()=>({match:t=>{let n={};const r=(i,o)=>{n[i]=o};return R(e,N).forEach(i=>r(i,void 0)),{matched:e.some(i=>O(i,t,r)),selections:n}},getSelectionKeys:()=>R(e,N),matcherType:"or"})})}function h(e){return{[T]:()=>({match:t=>({matched:!!e(t)})})}}function vt(...e){const t=typeof e[0]=="string"?e[0]:void 0,n=e.length===2?e[1]:typeof e[0]=="string"?void 0:e[0];return E({[T]:()=>({match:r=>{let i={[t??X]:r};return{matched:n===void 0||O(n,r,(o,s)=>{i[o]=s}),selections:i}},getSelectionKeys:()=>[t??X].concat(n===void 0?[]:N(n))})})}function $(e){return typeof e=="number"}function C(e){return typeof e=="string"}function A(e){return typeof e=="bigint"}E(h(function(e){return!0}));const j=e=>Object.assign(E(e),{startsWith:t=>{return j(g(e,(n=t,h(r=>C(r)&&r.startsWith(n)))));var n},endsWith:t=>{return j(g(e,(n=t,h(r=>C(r)&&r.endsWith(n)))));var n},minLength:t=>j(g(e,(n=>h(r=>C(r)&&r.length>=n))(t))),maxLength:t=>j(g(e,(n=>h(r=>C(r)&&r.length<=n))(t))),includes:t=>{return j(g(e,(n=t,h(r=>C(r)&&r.includes(n)))));var n},regex:t=>{return j(g(e,(n=t,h(r=>C(r)&&!!r.match(n)))));var n}});j(h(C));const S=e=>Object.assign(E(e),{between:(t,n)=>S(g(e,((r,i)=>h(o=>$(o)&&r<=o&&i>=o))(t,n))),lt:t=>S(g(e,(n=>h(r=>$(r)&&r<n))(t))),gt:t=>S(g(e,(n=>h(r=>$(r)&&r>n))(t))),lte:t=>S(g(e,(n=>h(r=>$(r)&&r<=n))(t))),gte:t=>S(g(e,(n=>h(r=>$(r)&&r>=n))(t))),int:()=>S(g(e,h(t=>$(t)&&Number.isInteger(t)))),finite:()=>S(g(e,h(t=>$(t)&&Number.isFinite(t)))),positive:()=>S(g(e,h(t=>$(t)&&t>0))),negative:()=>S(g(e,h(t=>$(t)&&t<0)))});S(h($));const I=e=>Object.assign(E(e),{between:(t,n)=>I(g(e,((r,i)=>h(o=>A(o)&&r<=o&&i>=o))(t,n))),lt:t=>I(g(e,(n=>h(r=>A(r)&&r<n))(t))),gt:t=>I(g(e,(n=>h(r=>A(r)&&r>n))(t))),lte:t=>I(g(e,(n=>h(r=>A(r)&&r<=n))(t))),gte:t=>I(g(e,(n=>h(r=>A(r)&&r>=n))(t))),positive:()=>I(g(e,h(t=>A(t)&&t>0))),negative:()=>I(g(e,h(t=>A(t)&&t<0)))});I(h(A));E(h(function(e){return typeof e=="boolean"}));E(h(function(e){return typeof e=="symbol"}));E(h(function(e){return e==null}));const ut={matched:!1,value:void 0};function Xt(e){return new z(e,ut)}class z{constructor(t,n){this.input=void 0,this.state=void 0,this.input=t,this.state=n}with(...t){if(this.state.matched)return this;const n=t[t.length-1],r=[t[0]];let i;t.length===3&&typeof t[1]=="function"?i=t[1]:t.length>2&&r.push(...t.slice(1,t.length-1));let o=!1,s={};const l=(u,c)=>{o=!0,s[u]=c},a=!r.some(u=>O(u,this.input,l))||i&&!i(this.input)?ut:{matched:!0,value:n(o?X in s?s[X]:s:this.input,this.input)};return new z(this.input,a)}when(t,n){if(this.state.matched)return this;const r=!!t(this.input);return new z(this.input,r?{matched:!0,value:n(this.input,this.input)}:ut)}otherwise(t){return this.state.matched?this.state.value:t(this.input)}exhaustive(){if(this.state.matched)return this.state.value;let t;try{t=JSON.stringify(this.input)}catch{t=this.input}throw new Error(`Pattern matching error: no pattern matches value ${t}`)}run(){return this.exhaustive()}returnType(){return this}}function zt(e){return new Uint8Array(e).reduce((t,n)=>t+String.fromCharCode(n),"")}async function Bt(e){const t=new TextEncoder,n=await window.crypto.subtle.importKey("raw",t.encode(e),{name:"PBKDF2"},!1,["deriveKey"]);return window.crypto.subtle.deriveKey({name:"PBKDF2",salt:t.encode("a-unique-salt"),iterations:1e5,hash:"SHA-256"},n,{name:"AES-CBC",length:256},!1,["encrypt","decrypt"])}async function Gt(e,t){const n=await Bt(e),r=window.crypto.getRandomValues(new Uint8Array(16)),i=new TextEncoder,o=await window.crypto.subtle.encrypt({name:"AES-CBC",iv:r},n,i.encode(t)),s=Et(o);return`${Et(r)}:${s}`}function xt(e){if(e.length%2!==0)throw new Error("Hex string must have an even length");const t=e.length/2,n=new ArrayBuffer(t),r=new Uint8Array(n);for(let i=0;i<t;i++){const o=e.substring(i*2,i*2+2);r[i]=Number.parseInt(o,16)}return n}async function Qt(e,t){const n=t.split(":")[0],r=t.split(":")[1],i=xt(n),o=xt(r),s=await Bt(e);try{const l=await window.crypto.subtle.decrypt({name:"AES-CBC",iv:i},s,o);return it(zt(l))}catch(l){return console.error(l),st("Unable to decrypt data")}}function Et(e){return new Uint8Array(e).reduce((n,r)=>n+r.toString(16).padStart(2,"0"),"")}function Zt(e){let t,n,r,i,o,s,l,a,u,c,p,f,_,w,k,v,D,B,L,H,pt,q,ht,P,yt,Q,Z,gt;return{c(){t=y("main"),n=y("br"),r=b(),i=y("div"),o=y("form"),s=y("button"),s.textContent="Upload to PokeBin",l=b(),a=y("label"),a.innerHTML=`<input type="checkbox" id="ots"/>
				OTS`,u=b(),c=y("input"),p=b(),f=y("input"),_=b(),w=y("input"),k=b(),v=y("input"),D=b(),B=y("textarea"),L=b(),H=y("input"),pt=b(),q=y("input"),ht=b(),P=y("input"),yt=b(),Q=y("style"),Q.textContent=`.group {
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		.form-row {
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		.form-row > * {
			margin-right: 10px;
		}

		.custom-input {
			border-radius: 5px;
		}`,m(s,"class","button"),m(s,"type","submit"),m(a,"for","ots"),m(c,"class","custom-input"),m(c,"type","password"),m(c,"id","password"),m(c,"placeholder","Enter a password"),m(f,"name","title"),m(f,"id","title"),f.hidden=!0,m(w,"name","format"),m(w,"id","format"),w.hidden=!0,m(v,"name","author"),m(v,"id","author"),v.hidden=!0,m(B,"name","paste"),m(B,"id","paste"),B.hidden=!0,m(H,"name","notes"),H.value="",H.hidden=!0,m(q,"name","rental"),q.value="",q.hidden=!0,m(P,"name","encrypted_data"),m(P,"id","encrypted_data"),P.value="",P.hidden=!0,m(o,"id","PokeBinForm"),m(o,"method","post"),m(o,"action","https://pokebin.com/create"),m(o,"target","_blank"),m(o,"class","form-row"),m(i,"class","group")},m(tt,Tt){lt(tt,t,Tt),d(t,n),d(t,r),d(t,i),d(i,o),d(o,s),d(o,l),d(o,a),d(o,u),d(o,c),d(o,p),d(o,f),d(o,_),d(o,w),d(o,k),d(o,v),d(o,D),d(o,B),d(o,L),d(o,H),d(o,pt),d(o,q),d(o,ht),d(o,P),d(t,yt),d(t,Q),Z||(gt=[F(c,"keydown",e[0]),F(o,"submit",e[2])],Z=!0)},p:x,i:x,o:x,d(tt){tt&&G(t),Z=!1,W(gt)}}}function te(e){const t=unsafeWindow;async function n(o){o.key==="Enter"&&await r()}async function r(o=null){const l=document.getElementById("ots").checked;if(o&&o.preventDefault(),console.info(t.room),console.info(t.room.curTeam),t.room.curTeam.team.length===0){alert("No team selected.");return}const a=t.room.curTeam.name,u=t.room.curTeam.format,c=t.room.curTeam.gen,p=t.Storage.exportTeam(t.room.curTeam.team,c,l),f=t.app.user.attributes.name,w=document.getElementById("password").value,k=document.getElementById("PokeBinForm");if(w!==""){let v=p.replaceAll("\\n",`
`);v=`${JSON.stringify({title:a,author:f,notes:"",format:u,rental:""})}
-----
${v}`;const B=await Gt(w,v),L=document.getElementById("encrypted_data");L.value=B,k.submit()}else{const v=document.getElementById("title"),D=document.getElementById("format"),B=document.getElementById("author"),L=document.getElementById("paste");v.value=a,D.value=u,B.value=f,L.value=p.replaceAll("\\n",`
`),k.submit()}}return[n,r,o=>r(o)]}class ee extends ft{constructor(t){super(),mt(this,t,te,Zt,ct,{})}}function ne(e){let t,n,r,i,o,s,l,a,u,c;return{c(){t=y("main"),n=y("input"),r=b(),i=y("input"),o=b(),s=y("button"),s.textContent="Import from PokeBin",l=b(),a=y("style"),a.textContent=`.custom-input-import {
			width: 250px;
		}`,m(n,"id","import-url"),m(n,"class","custom-input custom-input-import"),m(n,"type","url"),m(n,"placeholder","Enter PokeBin URL"),m(i,"class","custom-input custom-password"),m(i,"type","password"),m(i,"id","password-import"),m(i,"placeholder","Enter a password"),m(s,"class","button")},m(p,f){lt(p,t,f),d(t,n),d(t,r),d(t,i),d(t,o),d(t,s),d(t,l),d(t,a),u||(c=[F(n,"keydown",e[0]),F(i,"keydown",e[0]),F(s,"click",e[1])],u=!0)},p:x,i:x,o:x,d(p){p&&G(t),u=!1,W(c)}}}function re(e){const t=e.match(/^https?:\/\/(pokebin\.com)\/(.*)\s*$/);return t?`https://pokebin.com/${t[2].replace(/\/.*/,"")}/json`:""}function oe(e){const t=unsafeWindow;async function n(i){i.key==="Enter"&&await r()}async function r(){const i=document.getElementById("import-url").value;if(i===""){alert("You must enter some text to import.");return}const o=re(i);if(o===""){alert("Not a valid PokeBin URL");return}const s=document.getElementById("password-import").value,a=await(await fetch(o)).json();if(a.encrypted_data&&s===""){alert("You need to enter a password to import.");return}if(a.encrypted_data&&s!==""){const p=await Qt(s,a.encrypted_data);let f="";Xt(p).with({type:"error"},async()=>{alert("Incorrect password.")}).with({type:"ok"},({unwrap:k})=>{f=k()});const _=f.split(`
-----
`),w=JSON.parse(_[0]);f=_[1],a.title=w.title,a.paste=f,a.notes=`${w.format}
${w.notes}`}const u=a.notes.split(`
`);if(u[0].startsWith("Format: ")){const p=t.toID(u[0].slice(8)),f=t.BattleFormats[p];f&&t.room.changeFormat(f.id),u.shift()}let c=a.title;c&&!c.startsWith("Untitled")&&(c=c.replace(/[\|\\\/]/g,""),t.$(".teamnameedit").val(c).change()),t.Storage.activeSetList=t.room.curSetList=t.Storage.importTeam(a.paste),t.room.updateTeamView()}return[n,r]}class ie extends ft{constructor(t){super(),mt(this,t,oe,ne,ct,{})}}function se(e){let t,n,r,i,o,s,l,a,u,c,p;return{c(){t=y("main"),n=y("br"),r=b(),i=y("div"),o=y("form"),o.innerHTML='<button class="button" type="submit">Upload to PokeBin</button> <input name="title" id="title" hidden=""/> <input name="format" id="format" hidden=""/> <input name="author" id="author" hidden=""/> <textarea name="paste" id="paste" hidden=""></textarea> <input name="notes" value="" hidden=""/> <input name="rental" value="" hidden=""/> <input name="encrypted_data" id="encrypted_data" value="" hidden=""/>',s=b(),l=y("style"),l.textContent=`.group {
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		.form-row {
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		.form-row > * {
			margin-right: 10px;
		}

		.custom-input {
			border-radius: 5px;
		}`,a=b(),u=y("br"),m(o,"id","OTSPokeBinForm"),m(o,"method","post"),m(o,"action","https://pokebin.com/create"),m(o,"target","_blank"),m(o,"class","form-row"),m(i,"class","group")},m(f,_){lt(f,t,_),d(t,n),d(t,r),d(t,i),d(i,o),d(t,s),d(t,l),d(t,a),d(t,u),c||(p=F(o,"submit",e[3]),c=!0)},p:x,i:x,o:x,d(f){f&&G(t),c=!1,p()}}}function ae(e,t,n){let{text:r}=t,{author:i}=t;async function o(l){if(l.preventDefault(),!r||!i){console.warn("Missing text or author information. Cannot submit form.");return}let a=document.getElementById("OTSPokeBinForm"),u=a.elements.namedItem("title");u.value=`${i}'s OTS`;let c=a.elements.namedItem("paste");c.value=r;let p=a.elements.namedItem("author");p.value=i;let f=a.elements.namedItem("format");f.value="";let _=a.elements.namedItem("rental");_.value="";let w=a.elements.namedItem("notes");w.value="";let k=a.elements.namedItem("encrypted_data");k.value="",a.submit()}const s=l=>o(l);return e.$$set=l=>{"text"in l&&n(1,r=l.text),"author"in l&&n(2,i=l.author)},[o,r,i,s]}class ue extends ft{constructor(t){super(),mt(this,t,ae,se,ct,{text:1,author:2})}}function ce(e){let t="";for(const n of e.childNodes)n.nodeName.toLowerCase()!=="summary"&&(n.nodeType===Node.TEXT_NODE&&(t+=n.nodeValue),n.nodeName.toLowerCase()==="br"&&(t+=`
`));return t}function le(e){var t,n,r;for(const i of e)if(i.type==="childList"){const o=i.addedNodes;for(const s of o)if(s.nodeType===Node.ELEMENT_NODE){const l=s.querySelector('button[name="validate"]');if(l&&!((t=l.nextElementSibling)!=null&&t.id.includes("pokebin-upload"))){const c=document.createElement("div");c.id="pokebin-upload",new ee({target:c}),l.insertAdjacentElement("afterend",c)}const a=s.querySelector('li[class="format-select"]');if(a&&!((n=a.previousElementSibling)!=null&&n.id.includes("pokebin-import"))){const c=document.createElement("div");c.id="pokebin-import",new ie({target:c}),a.insertAdjacentElement("beforebegin",c)}const u=s.querySelectorAll("div.battle-log details");for(const c of u){const p=ce(c),f=c.querySelector("summary");if(f){const _=(r=f.textContent)==null?void 0:r.slice(20),w=`${_}`;if(!c.querySelector(`#${w}`)){const v=document.createElement("div");v.id=w,new ue({target:v,props:{author:_,text:p}}),f.insertAdjacentElement("afterend",v)}}}}}}const de=new MutationObserver(le),me={childList:!0,subtree:!0};de.observe(document.body,me);
