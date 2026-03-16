var $e=Object.defineProperty;var me=Object.getPrototypeOf;var ye=Reflect.get;var Ae=(r,e,t)=>e in r?$e(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var J=(r,e,t)=>Ae(r,typeof e!="symbol"?e+"":e,t);var Q=(r,e,t)=>ye(me(r),t,e);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const I=globalThis,F=I.ShadowRoot&&(I.ShadyCSS===void 0||I.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,K=Symbol(),X=new WeakMap;let ce=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==K)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(F&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=X.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&X.set(t,e))}return e}toString(){return this.cssText}};const Ee=r=>new ce(typeof r=="string"?r:r+"",void 0,K),ue=(r,...e)=>{const t=r.length===1?r[0]:e.reduce((s,i,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[o+1],r[0]);return new ce(t,r,K)},xe=(r,e)=>{if(F)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),i=I.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,r.appendChild(s)}},Y=F?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return Ee(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Se,defineProperty:we,getOwnPropertyDescriptor:Te,getOwnPropertyNames:Ce,getOwnPropertySymbols:ke,getPrototypeOf:Pe}=Object,b=globalThis,ee=b.trustedTypes,Ue=ee?ee.emptyScript:"",L=b.reactiveElementPolyfillSupport,T=(r,e)=>r,B={toAttribute(r,e){switch(e){case Boolean:r=r?Ue:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},G=(r,e)=>!Se(r,e),te={attribute:!0,type:String,converter:B,reflect:!1,useDefault:!1,hasChanged:G};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),b.litPropertyMetadata??(b.litPropertyMetadata=new WeakMap);let A=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=te){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&we(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:o}=Te(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:i,set(n){const l=i==null?void 0:i.call(this);o==null||o.call(this,n),this.requestUpdate(e,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??te}static _$Ei(){if(this.hasOwnProperty(T("elementProperties")))return;const e=Pe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(T("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(T("properties"))){const t=this.properties,s=[...Ce(t),...ke(t)];for(const i of s)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const i of s)t.unshift(Y(i))}else e!==void 0&&t.push(Y(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return xe(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostConnected)==null?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostDisconnected)==null?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){var o;const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){const n=(((o=s.converter)==null?void 0:o.toAttribute)!==void 0?s.converter:B).toAttribute(t,s.type);this._$Em=e,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(e,t){var o,n;const s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const l=s.getPropertyOptions(i),a=typeof l.converter=="function"?{fromAttribute:l.converter}:((o=l.converter)==null?void 0:o.fromAttribute)!==void 0?l.converter:B;this._$Em=i;const d=a.fromAttribute(t,l.type);this[i]=d??((n=this._$Ej)==null?void 0:n.get(i))??d,this._$Em=null}}requestUpdate(e,t,s,i=!1,o){var n;if(e!==void 0){const l=this.constructor;if(i===!1&&(o=this[e]),s??(s=l.getPropertyOptions(e)),!((s.hasChanged??G)(o,t)||s.useDefault&&s.reflect&&o===((n=this._$Ej)==null?void 0:n.get(e))&&!this.hasAttribute(l._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[o,n]of i){const{wrapped:l}=n,a=this[o];l!==!0||this._$AL.has(o)||a===void 0||this.C(o,void 0,n,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(s=this._$EO)==null||s.forEach(i=>{var o;return(o=i.hostUpdate)==null?void 0:o.call(i)}),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[T("elementProperties")]=new Map,A[T("finalized")]=new Map,L==null||L({ReactiveElement:A}),(b.reactiveElementVersions??(b.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C=globalThis,se=r=>r,z=C.trustedTypes,ie=z?z.createPolicy("lit-html",{createHTML:r=>r}):void 0,pe="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,fe="?"+_,De=`<${fe}>`,m=document,P=()=>m.createComment(""),U=r=>r===null||typeof r!="object"&&typeof r!="function",Z=Array.isArray,Oe=r=>Z(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",q=`[ 	
\f\r]`,w=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,re=/-->/g,oe=/>/g,v=RegExp(`>|${q}(?:([^\\s"'>=/]+)(${q}*=${q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ne=/'/g,ae=/"/g,_e=/^(?:script|style|textarea|title)$/i,Me=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),R=Me(1),E=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),le=new WeakMap,g=m.createTreeWalker(m,129);function be(r,e){if(!Z(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return ie!==void 0?ie.createHTML(e):e}const He=(r,e)=>{const t=r.length-1,s=[];let i,o=e===2?"<svg>":e===3?"<math>":"",n=w;for(let l=0;l<t;l++){const a=r[l];let d,u,h=-1,p=0;for(;p<a.length&&(n.lastIndex=p,u=n.exec(a),u!==null);)p=n.lastIndex,n===w?u[1]==="!--"?n=re:u[1]!==void 0?n=oe:u[2]!==void 0?(_e.test(u[2])&&(i=RegExp("</"+u[2],"g")),n=v):u[3]!==void 0&&(n=v):n===v?u[0]===">"?(n=i??w,h=-1):u[1]===void 0?h=-2:(h=n.lastIndex-u[2].length,d=u[1],n=u[3]===void 0?v:u[3]==='"'?ae:ne):n===ae||n===ne?n=v:n===re||n===oe?n=w:(n=v,i=void 0);const f=n===v&&r[l+1].startsWith("/>")?" ":"";o+=n===w?a+De:h>=0?(s.push(d),a.slice(0,h)+pe+a.slice(h)+_+f):a+_+(h===-2?l:f)}return[be(r,o+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class D{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let o=0,n=0;const l=e.length-1,a=this.parts,[d,u]=He(e,t);if(this.el=D.createElement(d,s),g.currentNode=this.el.content,t===2||t===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=g.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const h of i.getAttributeNames())if(h.endsWith(pe)){const p=u[n++],f=i.getAttribute(h).split(_),H=/([.?@])?(.*)/.exec(p);a.push({type:1,index:o,name:H[2],strings:f,ctor:H[1]==="."?Re:H[1]==="?"?Be:H[1]==="@"?ze:N}),i.removeAttribute(h)}else h.startsWith(_)&&(a.push({type:6,index:o}),i.removeAttribute(h));if(_e.test(i.tagName)){const h=i.textContent.split(_),p=h.length-1;if(p>0){i.textContent=z?z.emptyScript:"";for(let f=0;f<p;f++)i.append(h[f],P()),g.nextNode(),a.push({type:2,index:++o});i.append(h[p],P())}}}else if(i.nodeType===8)if(i.data===fe)a.push({type:2,index:o});else{let h=-1;for(;(h=i.data.indexOf(_,h+1))!==-1;)a.push({type:7,index:o}),h+=_.length-1}o++}}static createElement(e,t){const s=m.createElement("template");return s.innerHTML=e,s}}function x(r,e,t=r,s){var n,l;if(e===E)return e;let i=s!==void 0?(n=t._$Co)==null?void 0:n[s]:t._$Cl;const o=U(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==o&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),o===void 0?i=void 0:(i=new o(r),i._$AT(r,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=i:t._$Cl=i),i!==void 0&&(e=x(r,i._$AS(r,e.values),i,s)),e}class Ie{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=((e==null?void 0:e.creationScope)??m).importNode(t,!0);g.currentNode=i;let o=g.nextNode(),n=0,l=0,a=s[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new O(o,o.nextSibling,this,e):a.type===1?d=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(d=new Ne(o,this,e)),this._$AV.push(d),a=s[++l]}n!==(a==null?void 0:a.index)&&(o=g.nextNode(),n++)}return g.currentNode=m,i}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class O{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=x(this,e,t),U(e)?e===c||e==null||e===""?(this._$AH!==c&&this._$AR(),this._$AH=c):e!==this._$AH&&e!==E&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Oe(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==c&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(m.createTextNode(e)),this._$AH=e}$(e){var o;const{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=D.createElement(be(s.h,s.h[0]),this.options)),s);if(((o=this._$AH)==null?void 0:o._$AD)===i)this._$AH.p(t);else{const n=new Ie(i,this),l=n.u(this.options);n.p(t),this.T(l),this._$AH=n}}_$AC(e){let t=le.get(e.strings);return t===void 0&&le.set(e.strings,t=new D(e)),t}k(e){Z(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const o of e)i===t.length?t.push(s=new O(this.O(P()),this.O(P()),this,this.options)):s=t[i],s._$AI(o),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,t);e!==this._$AB;){const i=se(e).nextSibling;se(e).remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class N{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,o){this.type=1,this._$AH=c,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=c}_$AI(e,t=this,s,i){const o=this.strings;let n=!1;if(o===void 0)e=x(this,e,t,0),n=!U(e)||e!==this._$AH&&e!==E,n&&(this._$AH=e);else{const l=e;let a,d;for(e=o[0],a=0;a<o.length-1;a++)d=x(this,l[s+a],t,a),d===E&&(d=this._$AH[a]),n||(n=!U(d)||d!==this._$AH[a]),d===c?e=c:e!==c&&(e+=(d??"")+o[a+1]),this._$AH[a]=d}n&&!i&&this.j(e)}j(e){e===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Re extends N{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===c?void 0:e}}class Be extends N{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==c)}}class ze extends N{constructor(e,t,s,i,o){super(e,t,s,i,o),this.type=5}_$AI(e,t=this){if((e=x(this,e,t,0)??c)===E)return;const s=this._$AH,i=e===c&&s!==c||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==c&&(s===c||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Ne{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){x(this,e)}}const j=C.litHtmlPolyfillSupport;j==null||j(D,O),(C.litHtmlVersions??(C.litHtmlVersions=[])).push("3.3.2");const Le=(r,e,t)=>{const s=(t==null?void 0:t.renderBefore)??e;let i=s._$litPart$;if(i===void 0){const o=(t==null?void 0:t.renderBefore)??null;s._$litPart$=i=new O(e.insertBefore(P(),o),o,void 0,t??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $=globalThis;class k extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Le(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return E}}var de;k._$litElement$=!0,k.finalized=!0,(de=$.litElementHydrateSupport)==null||de.call($,{LitElement:k});const W=$.litElementPolyfillSupport;W==null||W({LitElement:k});($.litElementVersions??($.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const qe=r=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(r,e)}):customElements.define(r,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const je={attribute:!0,type:String,converter:B,reflect:!1,hasChanged:G},We=(r=je,e,t)=>{const{kind:s,metadata:i}=t;let o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),o.set(t.name,r),s==="accessor"){const{name:n}=t;return{set(l){const a=e.get.call(this);e.set.call(this,l),this.requestUpdate(n,a,r,!0,l)},init(l){return l!==void 0&&this.C(n,void 0,r,l),l}}}if(s==="setter"){const{name:n}=t;return function(l){const a=this[n];e.call(this,l),this.requestUpdate(n,a,r,!0,l)}}throw Error("Unsupported decorator location: "+s)};function M(r){return(e,t)=>typeof t=="object"?We(r,e,t):((s,i,o)=>{const n=i.hasOwnProperty(o);return i.constructor.createProperty(o,s),n?Object.getOwnPropertyDescriptor(i,o):void 0})(r,e,t)}const ve=new WeakMap;function Ve(r,e){let t=e;for(;t;){if(ve.get(t)===r)return!0;t=Object.getPrototypeOf(t)}return!1}function ge(r){return e=>{if(Ve(r,e))return e;const t=r(e);return ve.set(t,r),t}}const Fe=r=>class extends r{static get properties(){return{disabled:{type:Boolean,reflect:!0}}}constructor(){super(),this._requestedToBeDisabled=!1,this.__isUserSettingDisabled=!0,this.__restoreDisabledTo=!1,this.disabled=!1}makeRequestToBeDisabled(){this._requestedToBeDisabled===!1&&(this._requestedToBeDisabled=!0,this.__restoreDisabledTo=this.disabled,this.__internalSetDisabled(!0))}retractRequestToBeDisabled(){this._requestedToBeDisabled===!0&&(this._requestedToBeDisabled=!1,this.__internalSetDisabled(this.__restoreDisabledTo))}__internalSetDisabled(e){this.__isUserSettingDisabled=!1,this.disabled=e,this.__isUserSettingDisabled=!0}requestUpdate(e,t,s){super.requestUpdate(e,t,s),e==="disabled"&&(this.__isUserSettingDisabled&&(this.__restoreDisabledTo=this.disabled),this.disabled===!1&&this._requestedToBeDisabled===!0&&this.__internalSetDisabled(!0))}click(){this.disabled||super.click()}},Ke=ge(Fe),Ge=r=>{var e,t;return t=class extends Ke(r){static get properties(){return{tabIndex:{type:Number,reflect:!0,attribute:"tabindex"}}}constructor(){super(),this.__isUserSettingTabIndex=!0,this.__restoreTabIndexTo=0,this.__internalSetTabIndex(0)}makeRequestToBeDisabled(){super.makeRequestToBeDisabled(),this._requestedToBeDisabled===!1&&this.tabIndex!=null&&(this.__restoreTabIndexTo=this.tabIndex)}retractRequestToBeDisabled(){super.retractRequestToBeDisabled(),this._requestedToBeDisabled===!0&&this.__internalSetTabIndex(this.__restoreTabIndexTo)}__internalSetTabIndex(i){this.__isUserSettingTabIndex=!1,this.tabIndex=i,this.__isUserSettingTabIndex=!0}requestUpdate(i,o,n){super.requestUpdate(i,o,n),i==="disabled"&&(this.disabled?this.__internalSetTabIndex(-1):this.__internalSetTabIndex(this.__restoreTabIndexTo)),i==="tabIndex"&&(this.__isUserSettingTabIndex&&this.tabIndex!=null&&(this.__restoreTabIndexTo=this.tabIndex),this.tabIndex!==-1&&this._requestedToBeDisabled===!0&&this.__internalSetTabIndex(-1))}firstUpdated(i){super.firstUpdated(i),this.disabled&&this.__internalSetTabIndex(-1)}},J(t,"enabledWarnings",((e=Q(t,t,"enabledWarnings"))==null?void 0:e.filter(i=>i!=="change-in-update"))||[]),t},Ze=ge(Ge),V=r=>r.key===" "||r.key==="Enter",he=r=>r.key===" ";class Je extends Ze(k){static get properties(){return{active:{type:Boolean,reflect:!0},type:{type:String,reflect:!0}}}render(){return R` <div class="button-content"><slot></slot></div> `}static get styles(){return[ue`
        :host {
          position: relative;
          display: inline-flex;
          box-sizing: border-box;
          vertical-align: middle;
          line-height: 24px;
          background-color: #eee; /* minimal styling to make it recognizable as btn */
          padding: 8px; /* padding to fix with min-height */
          outline: none; /* focus style handled below */
          cursor: default; /* we should always see the default arrow, never a caret */
          /* TODO: remove, native button also allows selection. Could be usability concern... */
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }

        :host::before {
          content: '';

          /* center vertically and horizontally */
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          /* Minimum click area to meet [WCAG Success Criterion 2.5.5 Target Size (Enhanced)](https://www.w3.org/TR/WCAG22/#target-size-enhanced) */
          min-height: 44px;
          min-width: 44px;
          width: 100%;
          height: 100%;
        }

        .button-content {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Show focus styles on keyboard focus. */
        :host(:focus:not([disabled])),
        :host(:focus-visible) {
          /* if you extend, please overwrite */
          outline: 2px solid #bde4ff;
        }

        /* Hide focus styles if they're not needed, for example,
        when an element receives focus via the mouse. */
        :host(:focus:not(:focus-visible)) {
          outline: 0;
        }

        :host(:hover) {
          /* if you extend, please overwrite */
          background: #f4f6f7;
        }

        :host(:active), /* keep native :active to render quickly where possible */
        :host([active]) /* use custom [active] to fix IE11 */ {
          /* if you extend, please overwrite */
          background: gray;
        }

        :host([hidden]) {
          display: none;
        }

        :host([disabled]) {
          pointer-events: none;
          /* if you extend, please overwrite */
          background: lightgray;
          color: #adadad;
          fill: #adadad;
        }
      `]}constructor(){super(),this.type="button",this.active=!1,this.__setupEvents()}connectedCallback(){super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role","button")}updated(e){super.updated(e),e.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.getAttribute("aria-disabled")!==null&&this.removeAttribute("aria-disabled"))}__setupEvents(){this.addEventListener("mousedown",this.__mousedownHandler),this.addEventListener("keydown",this.__keydownHandler),this.addEventListener("keyup",this.__keyupHandler)}__mousedownHandler(){this.active=!0;const e=()=>{this.active=!1,document.removeEventListener("mouseup",e),this.removeEventListener("mouseup",e)};document.addEventListener("mouseup",e),this.addEventListener("mouseup",e)}__keydownHandler(e){if(this.active||!V(e)){he(e)&&e.preventDefault();return}he(e)&&e.preventDefault(),this.active=!0;const t=s=>{V(s)&&(this.active=!1,document.removeEventListener("keyup",t,!0))};document.addEventListener("keyup",t,!0)}__keyupHandler(e){if(V(e)){if(e.target&&e.target!==this)return;this.click()}}}const Qe=ue`
/* ── Base ── */
:host {
  display: inline-block;
  font-family: var(--co-font-family-sans);
  font-weight: var(--co-font-weight-medium);
  line-height: var(--co-font-line-height-tight);
  border-radius: var(--co-radius-md);
  border: 1px solid transparent;
  cursor: pointer;
  transition:
    background var(--co-transition-duration-fast) var(--co-transition-easing-default),
    color var(--co-transition-duration-fast) var(--co-transition-easing-default),
    border-color var(--co-transition-duration-fast) var(--co-transition-easing-default),
    box-shadow var(--co-transition-duration-fast) var(--co-transition-easing-default);
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--co-spacing-2);
}

/* ── Sizes ── */
:host([size='sm']) {
  font-size: var(--co-font-size-sm);
  padding: var(--co-spacing-1) var(--co-spacing-3);
}

:host,
:host([size='md']) {
  font-size: var(--co-font-size-md);
  padding: var(--co-spacing-2) var(--co-spacing-4);
}

:host([size='lg']) {
  font-size: var(--co-font-size-lg);
  padding: var(--co-spacing-3) var(--co-spacing-6);
}

/* ── Primary variant (default) ── */
:host,
:host([variant='primary']) {
  background: var(--co-color-primary-600);
  color: var(--co-color-foreground-on-primary);
}
:host([variant='primary']:hover),
:host(:not([variant]):hover) {
  background: var(--co-color-primary-700);
}
:host([variant='primary']:active),
:host(:not([variant]):active) {
  background: var(--co-color-primary-800);
}

/* ── Secondary variant ── */
:host([variant='secondary']) {
  background: var(--co-color-background-default);
  color: var(--co-color-foreground-default);
  border-color: var(--co-color-border-default);
}
:host([variant='secondary']:hover) {
  background: var(--co-color-background-subtle);
  border-color: var(--co-color-border-strong);
}
:host([variant='secondary']:active) {
  background: var(--co-color-neutral-100);
}

/* ── Danger variant ── */
:host([variant='danger']) {
  background: var(--co-color-danger-600);
  color: var(--co-color-foreground-on-primary);
}
:host([variant='danger']:hover) {
  background: var(--co-color-danger-700);
}
:host([variant='danger']:active) {
  background: var(--co-color-danger-800);
}

/* ── Ghost variant ── */
:host([variant='ghost']) {
  background: transparent;
  color: var(--co-color-primary-600);
}
:host([variant='ghost']:hover) {
  background: var(--co-color-primary-50);
}
:host([variant='ghost']:active) {
  background: var(--co-color-primary-100);
}

/* ── Focus ── */
:host(:focus-visible) {
  outline: 2px solid var(--co-color-primary-500);
  outline-offset: 2px;
}

/* ── Disabled ── */
:host([disabled]) {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* ── Loading ── */
:host([loading]) {
  cursor: wait;
  pointer-events: none;
}

.spinner {
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: var(--co-radius-full);
  animation: co-spin 600ms linear infinite;
}

@keyframes co-spin {
  to {
    transform: rotate(360deg);
  }
}
`;var S=function(r,e,t,s){var i=arguments.length,o=i<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,t):s,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(r,e,t,s);else for(var l=r.length-1;l>=0;l--)(n=r[l])&&(o=(i<3?n(o):i>3?n(e,t,o):n(e,t))||o);return i>3&&o&&Object.defineProperty(e,t,o),o};let y=class extends Je{constructor(){super(...arguments),this.variant="primary",this.size="md",this.loading=!1,this._handleFocus=()=>{this.dispatchEvent(new CustomEvent("co-focus",{bubbles:!0,composed:!0}))},this._handleBlur=()=>{this.dispatchEvent(new CustomEvent("co-blur",{bubbles:!0,composed:!0}))}}static get styles(){return[...super.styles,Qe]}connectedCallback(){super.connectedCallback(),this.addEventListener("focus",this._handleFocus),this.addEventListener("blur",this._handleBlur)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("focus",this._handleFocus),this.removeEventListener("blur",this._handleBlur)}render(){return this.href?R`
        <a
          part="base"
          class="button"
          href=${this.href}
          target=${this.target??"_self"}
          rel=${this.target==="_blank"?"noopener noreferrer":""}
          tabindex=${this.disabled?-1:0}
          aria-disabled=${this.disabled}
        >
          <slot name="prefix" part="prefix"></slot>
          <slot part="label"></slot>
          <slot name="suffix" part="suffix"></slot>
        </a>
      `:R`
      <div part="base" class="button">
        <slot name="prefix" part="prefix"></slot>
        <slot part="label"></slot>
        <slot name="suffix" part="suffix"></slot>
        ${this.loading?R`<span part="spinner" class="spinner"></span>`:""}
      </div>
    `}};S([M({reflect:!0})],y.prototype,"variant",void 0);S([M({reflect:!0})],y.prototype,"size",void 0);S([M({type:Boolean,reflect:!0})],y.prototype,"loading",void 0);S([M()],y.prototype,"href",void 0);S([M()],y.prototype,"target",void 0);y=S([qe("co-button")],y);export{y as CoButton};
