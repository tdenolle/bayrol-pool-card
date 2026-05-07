/* bayrol-pool-card v2026.4.2 */
function t(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,f=globalThis,_=f.trustedTypes,g=_?_.emptyScript:"",m=f.reactiveElementPolyfillSupport,v=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!l(t,e),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);o?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const r=o.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const r=this.constructor;if(!1===s&&(o=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??$)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[v("elementProperties")]=new Map,x[v("finalized")]=new Map,m?.({ReactiveElement:x}),(f.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,C=t=>t,A=w.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+k,H=`<${P}>`,O=document,M=()=>O.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,j="[ \t\n\f\r]",q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,U=/>/g,N=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,V=/"/g,B=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),L=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),W=new WeakMap,J=O.createTreeWalker(O,129);function G(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":3===e?"<math>":"",n=q;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(n.lastIndex=h,l=n.exec(i),null!==l);)h=n.lastIndex,n===q?"!--"===l[1]?n=z:void 0!==l[1]?n=U:void 0!==l[2]?(B.test(l[2])&&(o=RegExp("</"+l[2],"g")),n=N):void 0!==l[3]&&(n=N):n===N?">"===l[0]?(n=o??q,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?N:'"'===l[3]?V:D):n===V||n===D?n=N:n===z||n===U?n=q:(n=N,o=void 0);const d=n===N&&t[e+1].startsWith("/>")?" ":"";r+=n===q?i+H:c>=0?(s.push(a),i.slice(0,c)+S+i.slice(c)+k+d):i+k+(-2===c?e:d)}return[G(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[l,c]=K(t,e);if(this.el=Z.createElement(l,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=J.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=c[r++],i=s.getAttribute(t).split(k),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?et:"?"===n[1]?it:"@"===n[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(k),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],M()),J.nextNode(),a.push({type:2,index:++o});s.append(t[e],M())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(k,t+1));)a.push({type:7,index:o}),t+=k.length-1}o++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,s){if(e===L)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const r=T(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=Y(t,o._$AS(t,e.values),o,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??O).importNode(e,!0);J.currentNode=s;let o=J.nextNode(),r=0,n=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new X(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new ot(o,this,t)),this._$AV.push(e),a=i[++n]}r!==a?.index&&(o=J.nextNode(),r++)}return J.currentNode=O,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),T(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==L&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>R(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new Z(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new X(this.O(M()),this.O(M()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=C(t).nextSibling;C(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=Y(this,t,e,0),r=!T(t)||t!==this._$AH&&t!==L,r&&(this._$AH=t);else{const s=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=Y(this,s[i+n],e,n),a===L&&(a=this._$AH[n]),r||=!T(a)||a!==this._$AH[n],a===F?t=F:t!==F&&(t+=(a??"")+o[n+1]),this._$AH[n]=a}r&&!s&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class st extends tt{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??F)===L)return;const i=this._$AH,s=t===F&&i!==F||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==F&&(i===F||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const rt=w.litHtmlPolyfillSupport;rt?.(Z,X),(w.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;class at extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new X(e.insertBefore(M(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}}at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const lt=nt.litElementPolyfillSupport;lt?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:$},dt=(t=ht,e,i)=>{const{kind:s,metadata:o}=i;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function pt(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return pt({...t,state:!0,attribute:!1})}const ft=n`
  :host {
    --pool-bg: var(--ha-card-background, var(--card-background-color, white));
    --pool-text: var(--primary-text-color, #212121);
    --pool-text-secondary: var(--secondary-text-color, #727272);
    --pool-border: var(--divider-color, #e0e0e0);
    --pool-accent: var(--primary-color, #03a9f4);
  }

  ha-card {
    padding: 16px;
    overflow: hidden;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .header .title {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--pool-text);
  }

  .header .subtitle {
    font-size: 0.8rem;
    color: var(--pool-text-secondary);
  }

  .header .status-badge {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 2px 10px;
    border-radius: 12px;
    text-transform: uppercase;
  }

  .status-badge.online {
    background: var(--success-color, #4caf50);
    color: white;
  }

  .status-badge.offline {
    background: var(--error-color, #f44336);
    color: white;
  }

  /* Metrics Grid */
  .metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 12px;
    margin-bottom: 16px;
  }

  .metric {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 8px;
    border-radius: 12px;
    background: var(--pool-border);
    background: color-mix(in srgb, var(--pool-text) 5%, transparent);
  }

  .metric .icon {
    font-size: 1.5rem;
    margin-bottom: 4px;
  }

  .metric .label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: var(--pool-text-secondary);
    margin-bottom: 2px;
  }

  .metric .value {
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1.1;
  }

  .metric .unit {
    font-size: 0.7rem;
    color: var(--pool-text-secondary);
  }

  .metric .range {
    font-size: 0.65rem;
    color: var(--pool-text-secondary);
    margin-top: 4px;
  }

  /* Equipment Section */
  .equipment {
    border-top: 1px solid var(--pool-border);
    padding-top: 12px;
  }

  .equipment .section-title {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--pool-text-secondary);
    margin-bottom: 8px;
  }

  .eq-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 6px;
  }

  .eq-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 10px;
    border-radius: 8px;
    background: color-mix(in srgb, var(--pool-text) 5%, transparent);
  }

  .eq-item .eq-label {
    font-size: 0.8rem;
    color: var(--pool-text-secondary);
  }

  .eq-item .eq-value {
    font-size: 0.8rem;
    font-weight: 600;
  }

  .eq-item .eq-value.on {
    color: var(--success-color, #4caf50);
  }

  .eq-item .eq-value.off {
    color: var(--pool-text-secondary);
  }

  /* Unavailable state */
  .unavailable {
    color: var(--pool-text-secondary);
    opacity: 0.6;
  }
`,_t=n`
  :host {
    --pool-text: var(--primary-text-color, #212121);
    --pool-text-secondary: var(--secondary-text-color, #727272);
    --pool-border: var(--divider-color, #e0e0e0);
    --pool-accent: var(--primary-color, #03a9f4);
  }

  ha-card {
    padding: 16px;
    overflow: hidden;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .header .title {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--pool-text);
  }

  .period-selector {
    display: flex;
    gap: 4px;
  }

  .period-btn {
    font-size: 0.75rem;
    padding: 4px 10px;
    border: 1px solid var(--pool-border);
    border-radius: 16px;
    background: transparent;
    color: var(--pool-text-secondary);
    cursor: pointer;
    transition: all 0.2s;
  }

  .period-btn.active {
    background: var(--pool-accent);
    color: white;
    border-color: var(--pool-accent);
  }

  .current-value {
    display: flex;
    align-items: baseline;
    gap: 6px;
    margin-bottom: 12px;
  }

  .current-value .value {
    font-size: 2rem;
    font-weight: 700;
  }

  .current-value .unit {
    font-size: 0.9rem;
    color: var(--pool-text-secondary);
  }

  .current-value .min-max {
    font-size: 0.75rem;
    color: var(--pool-text-secondary);
    margin-left: auto;
  }

  .chart-wrapper {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
  }

  .chart-wrapper canvas {
    width: 100% !important;
    height: 100% !important;
  }

  .no-data {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    color: var(--pool-text-secondary);
    font-size: 0.9rem;
  }
`;function gt(t){return t.replace(/[\W_]/g,"").toLowerCase()}function mt(t,e,i,s="sensor"){const o=function(t,e,i="sensor"){return`${i}.${gt("Bayrol")}_${gt(t)}_${e}`}(e,i,s);if(t[o])return o;const r=gt(e);for(const e of Object.keys(t))if(e.startsWith(`${s}.`)&&e.includes(r)&&e.endsWith(`_${i}`))return e}function vt(t){if(void 0===t||"unknown"===t||"unavailable"===t)return null;const e=parseFloat(t);return isNaN(e)?null:e}function yt(t,e,i,s,o){return t>=s&&t<=o?"var(--success-color, #4caf50)":t>=e&&t<=i?"var(--warning-color, #ff9800)":"var(--error-color, #f44336)"}function $t(t){return yt(t,6.8,7.8,7,7.4)}function bt(t){return yt(t,550,900,650,750)}const xt=/^sensor\.(.+?)_(\d{5,})_(temperature|ph|mv_se|salt|status)$/;function wt(t){const e=new Map;for(const i of Object.keys(t.states)){const t=i.match(xt);if(t){const i=t[1],s=t[2];e.has(s)||e.set(s,{serial:s,prefix:i,label:`${i} – ${s}`})}}return Array.from(e.values())}class Ct extends HTMLElement{static getCreateSuggestions(t){return{title:"Bayrol Poolaccess",icon:"mdi:pool"}}static async generate(t,e){const i=wt(e),s=t.device_serial||(i.length>0?i[0].serial:""),o=t.entity_prefix,r=!1!==t.show_equipment,n=!1!==t.show_charts,a=[{type:"custom:bayrol-pool-dashboard-card",device_serial:s,...o?{entity_prefix:o}:{},show_equipment:r}];!1!==t.show_messages&&a.push({type:"custom:bayrol-pool-messages-card",device_serial:s,...o?{entity_prefix:o}:{}});const l=[{title:"Vue d'ensemble",path:"overview",icon:"mdi:pool",cards:a}];return n&&l.push({title:"Historique",path:"history",icon:"mdi:chart-line",cards:[{type:"custom:bayrol-pool-temp-chart-card",title:"Température",device_serial:s,...o?{entity_prefix:o}:{}},{type:"custom:bayrol-pool-chart-card",title:"pH",device_serial:s,entity_key:"ph",unit:"pH",color:"#ff9800",...o?{entity_prefix:o}:{}},{type:"custom:bayrol-pool-chart-card",title:"ORP",device_serial:s,entity_key:"mv_se",unit:"mV",color:"#4caf50",...o?{entity_prefix:o}:{}}]}),{title:t.title||"Bayrol Pool Access",views:l}}}customElements.define("ll-strategy-dashboard-bayrol-pool",Ct);const At=window;Array.isArray(At.customStrategies)||(At.customStrategies=[]),At.customStrategies.push({type:"bayrol-pool",name:"Bayrol Pool Access",description:"Génère automatiquement un tableau de bord complet pour Bayrol Pool Access.",strategyType:"dashboard"});const Et=[{key:"temperature",label:"Température",icon:"mdi:thermometer-water",unit:"°C"},{key:"ph",label:"pH",icon:"mdi:ph",unit:"pH",color_fn:$t},{key:"mv_se",label:"ORP",icon:"mdi:water-opacity",unit:"mV",color_fn:bt},{key:"salt",label:"Sel",icon:"mdi:shaker-outline",unit:"g/L"}],St=[{key:"se_on_off",label:"Électrolyse",domain:"switch"},{key:"ph_on_off",label:"Régulation pH",domain:"switch"},{key:"mv_on_off",label:"Régulation ORP",domain:"switch"},{key:"se_activate_boost",label:"Boost",domain:"switch"},{key:"filtration_mode",label:"Filtration",domain:"select"}];let kt=class extends at{setConfig(t){if(!t.device_serial)throw new Error("Configuration requise : 'device_serial'");this._config={show_equipment:!0,...t}}getCardSize(){return this._config?.show_equipment?5:3}_getEntity(t,e="sensor"){if(!this.hass||!this._config)return;const i=this._config.entities;if(i&&i[t])return this.hass.states[i[t]];const s=this._config.entity_prefix;if(s)return this.hass.states[`${e}.${s}_${t}`];const o=mt(this.hass.states,this._config.device_serial,t,e);return o?this.hass.states[o]:void 0}_isOnline(){const t=this._getEntity("status");return!!t&&"Online"===t.state}_renderMetric(t){const e=this._getEntity(t.key,t.domain||"sensor"),i=e?vt(e.state):null,s=null!==i,o=s?i.toString():"--",r=s&&t.color_fn?t.color_fn(i):"var(--pool-text)",n=e?.attributes.min,a=e?.attributes.max,l=void 0!==n&&void 0!==a?`${n} — ${a}`:"";return I`
      <div class="metric">
        <ha-icon class="icon" icon="${t.icon}"></ha-icon>
        <span class="label">${t.label}</span>
        <span class="value ${s?"":"unavailable"}" style="color: ${r}">${o}</span>
        ${t.unit?I`<span class="unit">${t.unit}</span>`:F}
        ${l?I`<span class="range">${l}</span>`:F}
      </div>
    `}_renderEquipmentItem(t){const e=this._getEntity(t.key,t.domain);let i="--",s="";if(e){const t=e.state;"on"===t||"ON"===t?(i="ON",s="on"):"off"===t||"OFF"===t?(i="OFF",s="off"):i=t}return I`
      <div class="eq-item">
        <span class="eq-label">${t.label}</span>
        <span class="eq-value ${s}">${i}</span>
      </div>
    `}render(){if(!this._config||!this.hass)return I`<ha-card><div>Chargement...</div></ha-card>`;const t=this._config.title||"Bayrol Pool Access",e=this._isOnline();return I`
      <ha-card>
        <div class="header">
          <div>
            <div class="title">${t}</div>
            <div class="subtitle">${this._config.device_serial}</div>
          </div>
          <span class="status-badge ${e?"online":"offline"}">
            ${e?"En ligne":"Hors ligne"}
          </span>
        </div>

        <div class="metrics">
          ${Et.map(t=>this._renderMetric(t))}
        </div>

        ${this._config.show_equipment?I`
              <div class="equipment">
                <div class="section-title">Équipements</div>
                <div class="eq-grid">
                  ${St.map(t=>this._renderEquipmentItem(t))}
                </div>
              </div>
            `:F}
      </ha-card>
    `}static getConfigElement(){return document.createElement("bayrol-pool-dashboard-editor")}static getStubConfig(){return{device_serial:"",show_equipment:!0}}};kt.styles=ft,t([pt({attribute:!1})],kt.prototype,"hass",void 0),t([ut()],kt.prototype,"_config",void 0),kt=t([ct("bayrol-pool-dashboard-card")],kt);let Pt=class extends at{constructor(){super(...arguments),this._devices=[],this._manualSerial=!1}setConfig(t){this._config=t,this._refreshDevices()}updated(t){t.has("hass")&&this._refreshDevices()}_refreshDevices(){this.hass&&(this._devices=wt(this.hass),this._config?.device_serial&&!this._devices.some(t=>t.serial===this._config.device_serial)&&(this._manualSerial=!0))}_dispatchChanged(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t}}))}_deviceSelected(t){if(!this._config)return;const e=t.target.value;if("__manual__"===e)return void(this._manualSerial=!0);this._manualSerial=!1;const i={...this._config,device_serial:e};this._dispatchChanged(i)}_valueChanged(t){if(!this._config)return;const e=t.target,i=e.configValue,s="checkbox"===e.type?e.checked:e.value,o={...this._config,[i]:s};this._dispatchChanged(o)}render(){if(!this._config)return I``;const t=this._config.device_serial||"",e=this._devices.length>0;return I`
      <div style="padding: 16px;">
        <ha-textfield
          label="Titre (optionnel)"
          .value="${this._config.title||""}"
          .configValue="${"title"}"
          @input="${this._valueChanged}"
        ></ha-textfield>

        ${e?I`
              <ha-select
                label="Appareil Bayrol"
                .value="${this._manualSerial?"__manual__":t}"
                @selected="${this._deviceSelected}"
                @closed="${t=>t.stopPropagation()}"
                fixedMenuPosition
                style="width: 100%; margin-top: 8px;"
              >
                ${this._devices.map(t=>I`<ha-list-item .value="${t.serial}">${t.label}</ha-list-item>`)}
                <ha-list-item value="__manual__">Saisie manuelle…</ha-list-item>
              </ha-select>
              ${this._manualSerial?I`
                    <ha-textfield
                      label="Numéro de série"
                      .value="${t}"
                      .configValue="${"device_serial"}"
                      @input="${this._valueChanged}"
                      style="margin-top: 8px;"
                    ></ha-textfield>
                  `:F}
            `:I`
              <ha-textfield
                label="Numéro de série du device (requis)"
                .value="${t}"
                .configValue="${"device_serial"}"
                @input="${this._valueChanged}"
                required
              ></ha-textfield>
            `}

        <ha-textfield
          label="Préfixe entité (optionnel)"
          .value="${this._config.entity_prefix||""}"
          .configValue="${"entity_prefix"}"
          @input="${this._valueChanged}"
        ></ha-textfield>
        <ha-formfield label="Afficher les équipements">
          <ha-switch
            .checked="${!1!==this._config.show_equipment}"
            .configValue="${"show_equipment"}"
            @change="${this._valueChanged}"
          ></ha-switch>
        </ha-formfield>
      </div>
    `}};t([pt({attribute:!1})],Pt.prototype,"hass",void 0),t([ut()],Pt.prototype,"_config",void 0),t([ut()],Pt.prototype,"_devices",void 0),t([ut()],Pt.prototype,"_manualSerial",void 0),Pt=t([ct("bayrol-pool-dashboard-editor")],Pt);const Ht={"6h":6,"24h":24,"7d":168,"30d":720};let Ot=class extends at{constructor(){super(...arguments),this._period="24h",this._history=[],this._loading=!1}setConfig(t){if(!t.device_serial||!t.entity_key)throw new Error("Configuration requise : 'device_serial' et 'entity_key'");this._config={hours_to_show:24,...t}}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),this._fetchHistory(),this._fetchTimer=window.setInterval(()=>this._fetchHistory(),3e5)}disconnectedCallback(){super.disconnectedCallback(),this._fetchTimer&&clearInterval(this._fetchTimer)}_getEntityId(){if(!this._config||!this.hass)return"";if(this._config.entity_id)return this._config.entity_id;const t=this._config.entity_prefix,e=this._config.entity_domain||"sensor";return t?`${e}.${t}_${this._config.entity_key}`:mt(this.hass.states,this._config.device_serial,this._config.entity_key,e)||""}_getEntity(){if(!this.hass)return;const t=this._getEntityId();return t?this.hass.states[t]:void 0}async _fetchHistory(){if(!this.hass||!this._config)return;const t=this._getEntityId(),e=Ht[this._period],i=new Date(Date.now()-36e5*e).toISOString();this._loading=!0;try{const e=`history/period/${i}?filter_entity_id=${t}&minimal_response&no_attributes`,s=await this.hass.callApi("GET",e);if(s&&s.length>0&&s[0]){const t=s[0];this._history=t.filter(t=>"unknown"!==t.state&&"unavailable"!==t.state).map(t=>({x:new Date(t.last_changed).getTime(),y:parseFloat(t.state)})).filter(t=>!isNaN(t.y))}else this._history=[]}catch(t){this._history=[]}this._loading=!1,this._renderChart()}_setPeriod(t){this._period=t,this._fetchHistory()}async _renderChart(){if(await this.updateComplete,this._canvas=this.shadowRoot?.querySelector("canvas"),!this._canvas||0===this._history.length)return;const t=this._config?.color||"var(--primary-color, #03a9f4)";window.Chart||await this._loadChartJs();const e=window.Chart;if(!e)return;const i=e;this._chart&&this._chart.destroy(),this._chart=new i(this._canvas,{type:"line",data:{datasets:[{data:this._history,borderColor:t,backgroundColor:`${t}22`,borderWidth:1.5,fill:!1,tension:0,stepped:"before",pointRadius:0,pointHitRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{display:!1},zoom:{pan:{enabled:!0,mode:"x"},zoom:{wheel:{enabled:!0,modifierKey:void 0},pinch:{enabled:!0},mode:"x"}}},scales:{x:{type:"time",time:{tooltipFormat:"dd/MM HH:mm",displayFormats:{minute:"HH:mm",hour:"HH:mm",day:"dd/MM"}},grid:{display:!1},ticks:{maxTicksLimit:8,color:"#999"}},y:{grid:{color:"rgba(0,0,0,0.06)"},ticks:{color:"#999"}}}}}),this._canvas.addEventListener("dblclick",()=>{this._chart?.resetZoom()})}_loadChartJs(){return new Promise((t,e)=>{const i=document.createElement("script");i.src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js",i.onload=()=>{const i=document.createElement("script");i.src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns@3/dist/chartjs-adapter-date-fns.bundle.min.js",i.onload=()=>{const e=document.createElement("script");e.src="https://cdn.jsdelivr.net/npm/chartjs-plugin-zoom@2/dist/chartjs-plugin-zoom.min.js",e.onload=()=>t(),e.onerror=()=>{t()},document.head.appendChild(e)},i.onerror=()=>e(new Error("Failed to load chart adapter")),document.head.appendChild(i)},i.onerror=()=>e(new Error("Failed to load Chart.js")),document.head.appendChild(i)})}render(){if(!this._config||!this.hass)return I`<ha-card><div>Chargement...</div></ha-card>`;const t=this._getEntity(),e=t?vt(t.state):null,i=this._config.title||this._config.entity_key,s=this._config.unit||t?.attributes.unit_of_measurement||"";let o="var(--pool-text)";null!==e&&("ph"===this._config.entity_key?o=$t(e):"mv_se"===this._config.entity_key&&(o=bt(e)));const r=this._history.length>0?Math.min(...this._history.map(t=>t.y)).toFixed(1):void 0,n=this._history.length>0?Math.max(...this._history.map(t=>t.y)).toFixed(1):void 0;return I`
      <ha-card>
        <div class="header">
          <span class="title">${i}</span>
          <div class="period-selector">
            ${["6h","24h","7d","30d"].map(t=>I`
                <button
                  class="period-btn ${this._period===t?"active":""}"
                  @click="${()=>this._setPeriod(t)}"
                >
                  ${t}
                </button>
              `)}
          </div>
        </div>

        <div class="current-value">
          <span class="value" style="color: ${o}">
            ${null!==e?e:"--"}
          </span>
          ${s?I`<span class="unit">${s}</span>`:F}
          ${void 0!==r&&void 0!==n?I`<span class="min-max">Min: ${r} — Max: ${n}</span>`:F}
        </div>

        ${this._history.length>0?I`<div class="chart-wrapper"><canvas></canvas></div>`:I`<div class="no-data">${this._loading?"Chargement...":"Aucune donnée"}</div>`}
      </ha-card>
    `}static getConfigElement(){return document.createElement("bayrol-pool-chart-editor")}static getStubConfig(){return{device_serial:"",entity_key:"temperature",hours_to_show:24}}};Ot.styles=_t,t([pt({attribute:!1})],Ot.prototype,"hass",void 0),t([ut()],Ot.prototype,"_config",void 0),t([ut()],Ot.prototype,"_period",void 0),t([ut()],Ot.prototype,"_history",void 0),t([ut()],Ot.prototype,"_loading",void 0),Ot=t([ct("bayrol-pool-chart-card")],Ot);let Mt=class extends at{setConfig(t){this._config=t}_valueChanged(t){if(!this._config)return;const e=t.target,i=e.configValue,s={...this._config,[i]:e.value};this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:s}}))}render(){return this._config?I`
      <div style="padding: 16px;">
        <ha-textfield
          label="Titre (optionnel)"
          .value="${this._config.title||""}"
          .configValue="${"title"}"
          @input="${this._valueChanged}"
        ></ha-textfield>
        <ha-textfield
          label="Numéro de série du device (requis)"
          .value="${this._config.device_serial||""}"
          .configValue="${"device_serial"}"
          @input="${this._valueChanged}"
          required
        ></ha-textfield>
        <ha-textfield
          label="Clé entité (ex: temperature, ph, mv_se)"
          .value="${this._config.entity_key||""}"
          .configValue="${"entity_key"}"
          @input="${this._valueChanged}"
          required
        ></ha-textfield>
        <ha-textfield
          label="Unité (optionnel)"
          .value="${this._config.unit||""}"
          .configValue="${"unit"}"
          @input="${this._valueChanged}"
        ></ha-textfield>
        <ha-textfield
          label="Couleur (optionnel, ex: #4fc3f7)"
          .value="${this._config.color||""}"
          .configValue="${"color"}"
          @input="${this._valueChanged}"
        ></ha-textfield>
      </div>
    `:I``}};t([pt({attribute:!1})],Mt.prototype,"hass",void 0),t([ut()],Mt.prototype,"_config",void 0),Mt=t([ct("bayrol-pool-chart-editor")],Mt);const Tt={"6h":6,"24h":24,"7d":168,"30d":720};let Rt=class extends at{constructor(){super(...arguments),this._period="24h",this._tempHistory=[],this._filtrationOffRanges=[],this._loading=!1}setConfig(t){if(!t.device_serial)throw new Error("Configuration requise : 'device_serial'");this._config=t}getCardSize(){return 4}connectedCallback(){super.connectedCallback(),this._fetchHistory(),this._fetchTimer=window.setInterval(()=>this._fetchHistory(),3e5)}disconnectedCallback(){super.disconnectedCallback(),this._fetchTimer&&clearInterval(this._fetchTimer)}_getEntityId(t,e="sensor"){if(!this._config||!this.hass)return"";const i=this._config.entity_prefix;return i?`${e}.${i}_${t}`:mt(this.hass.states,this._config.device_serial,t,e)||""}_getTempEntity(){if(!this.hass)return;const t=this._getEntityId("temperature");return t?this.hass.states[t]:void 0}async _fetchHistory(){if(!this.hass||!this._config)return;const t=this._getEntityId("temperature"),e=this._getEntityId("flow_in"),i=Tt[this._period],s=new Date(Date.now()-36e5*i).toISOString();this._loading=!0;const o=this.hass.callApi.bind(this.hass);try{const i=`history/period/${s}?filter_entity_id=${e?`${t},${e}`:t}&minimal_response&no_attributes`,r=await o("GET",i);if(r&&r.length>0){const t=r.find(t=>{const e=t;return e.length>0&&e[0].entity_id?.includes("temperature")});this._tempHistory=t?t.filter(t=>"unknown"!==t.state&&"unavailable"!==t.state).map(t=>({x:new Date(t.last_changed).getTime(),y:parseFloat(t.state)})).filter(t=>!isNaN(t.y)):[];const e=r.find(t=>{const e=t;return e.length>0&&e[0].entity_id?.includes("flow_in")});this._filtrationOffRanges=e?this._computeOffRanges(e):[]}}catch(t){this._tempHistory=[],this._filtrationOffRanges=[]}this._loading=!1,this._renderChart()}_computeOffRanges(t){const e=[];let i=null;const s=Date.now();for(const s of t){const t=new Date(s.last_changed).getTime(),o=s.state?.toLowerCase();"off"===o||"unavailable"===o||"unknown"===o?null===i&&(i=t):"on"===o&&null!==i&&(e.push({start:i,end:t}),i=null)}return null!==i&&e.push({start:i,end:s}),e}_setPeriod(t){this._period=t,this._fetchHistory()}async _renderChart(){if(await this.updateComplete,this._canvas=this.shadowRoot?.querySelector("canvas"),!this._canvas||0===this._tempHistory.length)return;const t=this._config?.color||"#03a9f4",e=this._config?.filtration_off_color||"rgba(244, 67, 54, 0.15)";window.Chart||await this._loadChartJs();const i=window.Chart;if(!i)return;const s=i;this._chart&&this._chart.destroy();const o={};this._filtrationOffRanges.forEach((t,i)=>{o[`offRange${i}`]={type:"box",xMin:t.start,xMax:t.end,backgroundColor:e,borderWidth:0,label:{display:!1}}});const r=window.ChartAnnotation;r&&s.register(r),this._chart=new s(this._canvas,{type:"line",data:{datasets:[{label:"Température",data:this._tempHistory,borderColor:t,backgroundColor:`${t}22`,borderWidth:1.5,fill:!1,tension:0,stepped:"before",pointRadius:0,pointHitRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{display:!1},tooltip:{callbacks:{afterBody:t=>{if(!t.length)return"";const e=t[0].parsed.x,i=this._filtrationOffRanges.some(t=>e>=t.start&&e<=t.end);return i?"⚠ Filtration arrêtée":"✓ Filtration active"}}},annotation:{annotations:o},zoom:{pan:{enabled:!0,mode:"x"},zoom:{wheel:{enabled:!0,modifierKey:void 0},pinch:{enabled:!0},mode:"x"}}},scales:{x:{type:"time",time:{tooltipFormat:"dd/MM HH:mm",displayFormats:{minute:"HH:mm",hour:"HH:mm",day:"dd/MM"}},grid:{display:!1},ticks:{maxTicksLimit:8,color:"#999"}},y:{grid:{color:"rgba(0,0,0,0.06)"},ticks:{color:"#999",callback:t=>`${t}°C`}}}}}),this._canvas.addEventListener("dblclick",()=>{this._chart?.resetZoom()})}_loadChartJs(){return new Promise((t,e)=>{const i=document.createElement("script");i.src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js",i.onload=()=>{const i=document.createElement("script");i.src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns@3/dist/chartjs-adapter-date-fns.bundle.min.js",i.onload=()=>{const e=document.createElement("script");e.src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@3/dist/chartjs-plugin-annotation.min.js",e.onload=()=>{const e=window;e["chartjs-plugin-annotation"]&&(e.ChartAnnotation=e["chartjs-plugin-annotation"]);const i=document.createElement("script");i.src="https://cdn.jsdelivr.net/npm/chartjs-plugin-zoom@2/dist/chartjs-plugin-zoom.min.js",i.onload=()=>t(),i.onerror=()=>{t()},document.head.appendChild(i)},e.onerror=()=>{t()},document.head.appendChild(e)},i.onerror=()=>e(new Error("Failed to load chart adapter")),document.head.appendChild(i)},i.onerror=()=>e(new Error("Failed to load Chart.js")),document.head.appendChild(i)})}render(){if(!this._config||!this.hass)return I`<ha-card><div>Chargement...</div></ha-card>`;const t=this._getTempEntity(),e=t?vt(t.state):null,i=this._config.title||"Température",s=t?.attributes.unit_of_measurement||"°C",o=this._tempHistory.length>0?Math.min(...this._tempHistory.map(t=>t.y)).toFixed(1):void 0,r=this._tempHistory.length>0?Math.max(...this._tempHistory.map(t=>t.y)).toFixed(1):void 0,n=this._getEntityId("flow_in"),a=n?this.hass.states[n]:void 0,l="on"===a?.state?.toLowerCase();return I`
      <ha-card>
        <div class="header">
          <span class="title">${i}</span>
          <div class="period-selector">
            ${["6h","24h","7d","30d"].map(t=>I`
                <button
                  class="period-btn ${this._period===t?"active":""}"
                  @click="${()=>this._setPeriod(t)}"
                >
                  ${t}
                </button>
              `)}
          </div>
        </div>

        <div class="current-value">
          <span class="value" style="color: ${l?"var(--pool-text)":"var(--warning-color, #ff9800)"}">
            ${null!==e?e:"--"}
          </span>
          ${I`<span class="unit">${s}</span>`}
          ${l||null===e?F:I`<span class="min-max" style="color: var(--warning-color, #ff9800)">⚠ Filtration arrêtée</span>`}
          ${void 0!==o&&void 0!==r?I`<span class="min-max">Min: ${o} — Max: ${r}</span>`:F}
        </div>

        ${this._tempHistory.length>0?I`<div class="chart-wrapper"><canvas></canvas></div>`:I`<div class="no-data">${this._loading?"Chargement...":"Aucune donnée"}</div>`}

        <div class="legend">
          <div class="legend-item">
            <div class="legend-swatch" style="background: ${this._config.color||"#03a9f4"}"></div>
            <span>Température</span>
          </div>
          <div class="legend-item">
            <div class="legend-swatch" style="background: ${this._config.filtration_off_color||"rgba(244, 67, 54, 0.3)"}"></div>
            <span>Filtration arrêtée</span>
          </div>
        </div>
      </ha-card>
    `}static getStubConfig(){return{device_serial:"",title:"Température"}}};Rt.styles=n`
    :host {
      --pool-text: var(--primary-text-color, #212121);
      --pool-text-secondary: var(--secondary-text-color, #727272);
    }

    ha-card {
      padding: 16px;
      overflow: hidden;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .title {
      font-size: 1.1rem;
      font-weight: 500;
      color: var(--pool-text);
    }

    .period-selector {
      display: flex;
      gap: 4px;
    }

    .period-btn {
      background: none;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 12px;
      padding: 4px 10px;
      font-size: 0.75rem;
      cursor: pointer;
      color: var(--pool-text-secondary);
      transition: all 0.2s;
    }

    .period-btn.active {
      background: var(--primary-color, #03a9f4);
      color: white;
      border-color: var(--primary-color, #03a9f4);
    }

    .current-value {
      display: flex;
      align-items: baseline;
      gap: 6px;
      margin-bottom: 12px;
    }

    .value {
      font-size: 2rem;
      font-weight: 600;
    }

    .unit {
      font-size: 1rem;
      color: var(--pool-text-secondary);
    }

    .min-max {
      font-size: 0.8rem;
      color: var(--pool-text-secondary);
      margin-left: 8px;
    }

    .chart-wrapper {
      position: relative;
      height: 200px;
    }

    .no-data {
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--pool-text-secondary);
    }

    .legend {
      display: flex;
      gap: 16px;
      margin-top: 8px;
      font-size: 0.75rem;
      color: var(--pool-text-secondary);
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .legend-swatch {
      width: 12px;
      height: 12px;
      border-radius: 2px;
    }
  `,t([pt({attribute:!1})],Rt.prototype,"hass",void 0),t([ut()],Rt.prototype,"_config",void 0),t([ut()],Rt.prototype,"_period",void 0),t([ut()],Rt.prototype,"_tempHistory",void 0),t([ut()],Rt.prototype,"_filtrationOffRanges",void 0),t([ut()],Rt.prototype,"_loading",void 0),Rt=t([ct("bayrol-pool-temp-chart-card")],Rt);let jt=class extends at{setConfig(t){if(!t.device_serial&&!t.entity_id)throw new Error("Configuration requise : 'device_serial' ou 'entity_id'");this._config=t}getCardSize(){return 3}_getEntity(){if(!this.hass||!this._config)return;if(this._config.entity_id)return this.hass.states[this._config.entity_id];const t=this._config.entity_prefix;if(t)return this.hass.states[`sensor.${t}_messages`];const e=mt(this.hass.states,this._config.device_serial,"messages","sensor");return e?this.hass.states[e]:void 0}_getMessages(){const t=this._getEntity();if(!t)return[];const e=t.attributes.data;return e&&Array.isArray(e)?e:[]}_renderMessage(t){const e=t.type||"info";return I`<ha-alert alert-type="${e}">${t.message}</ha-alert>`}render(){if(!this._config||!this.hass)return I`<ha-card><div>Chargement...</div></ha-card>`;const t=this._config.title||"Messages",e=this._getMessages();return I`
      <ha-card>
        <div class="header">
          <span class="title">${t}</span>
          ${e.length>0?I`<span class="count">${e.length}</span>`:F}
        </div>
        ${e.length>0?I`<div class="messages">${e.map(t=>this._renderMessage(t))}</div>`:I`
              <div class="empty">
                <ha-icon icon="mdi:check-circle-outline"></ha-icon>
                Aucun message
              </div>
            `}
      </ha-card>
    `}static getConfigElement(){return document.createElement("bayrol-pool-messages-editor")}static getStubConfig(){return{device_serial:""}}};jt.styles=n`
    :host {
      --pool-text: var(--primary-text-color, #212121);
      --pool-text-secondary: var(--secondary-text-color, #727272);
    }

    ha-card {
      padding: 16px;
      overflow: hidden;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .header .title {
      font-size: 1.1rem;
      font-weight: 500;
      color: var(--pool-text);
    }

    .header .count {
      font-size: 0.8rem;
      color: var(--pool-text-secondary);
      background: color-mix(in srgb, var(--pool-text) 8%, transparent);
      padding: 2px 10px;
      border-radius: 12px;
    }

    .messages {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .empty {
      text-align: center;
      color: var(--pool-text-secondary);
      font-size: 0.9rem;
      padding: 16px;
    }

    .empty ha-icon {
      display: block;
      margin-bottom: 8px;
      --mdc-icon-size: 32px;
      color: var(--success-color, #4caf50);
    }
  `,t([pt({attribute:!1})],jt.prototype,"hass",void 0),t([ut()],jt.prototype,"_config",void 0),jt=t([ct("bayrol-pool-messages-card")],jt);let qt=class extends at{setConfig(t){this._config=t}_valueChanged(t){if(!this._config)return;const e=t.target,i=e.configValue,s={...this._config,[i]:e.value};this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:s}}))}render(){return this._config?I`
      <div style="padding: 16px;">
        <ha-textfield
          label="Titre (optionnel)"
          .value="${this._config.title||""}"
          .configValue="${"title"}"
          @input="${this._valueChanged}"
        ></ha-textfield>
        <ha-textfield
          label="Numéro de série du device"
          .value="${this._config.device_serial||""}"
          .configValue="${"device_serial"}"
          @input="${this._valueChanged}"
        ></ha-textfield>
        <ha-textfield
          label="Entity ID (optionnel, override)"
          .value="${this._config.entity_id||""}"
          .configValue="${"entity_id"}"
          @input="${this._valueChanged}"
        ></ha-textfield>
      </div>
    `:I``}};t([pt({attribute:!1})],qt.prototype,"hass",void 0),t([ut()],qt.prototype,"_config",void 0),qt=t([ct("bayrol-pool-messages-editor")],qt);let zt=class extends at{constructor(){super(...arguments),this._config={type:"custom:bayrol-pool"},this._devices=[],this._manualSerial=!1}setConfig(t){this._config=t,this._refreshDevices()}updated(t){t.has("hass")&&this._refreshDevices()}_refreshDevices(){this.hass&&(this._devices=wt(this.hass),this._config.device_serial&&!this._devices.some(t=>t.serial===this._config.device_serial)&&(this._manualSerial=!0))}_dispatchChanged(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0}))}_deviceSelected(t){const e=t.target.value;"__manual__"!==e?(this._manualSerial=!1,this._config={...this._config,device_serial:e},this._dispatchChanged()):this._manualSerial=!0}_valueChanged(t){const e=t.target,i=e.configValue;if(!i)return;const s="checkbox"===e.type?e.checked:e.value;this._config={...this._config,[i]:s},this._dispatchChanged()}_switchChanged(t){const e=t.target,i=e.configValue;i&&(this._config={...this._config,[i]:e.checked},this._dispatchChanged())}_renderDevicePicker(){const t=this._config.device_serial||"";return 0===this._devices.length?I`
        <div class="row">
          <ha-textfield
            label="Numéro de série du device"
            .value="${t}"
            .configValue="${"device_serial"}"
            @input="${this._valueChanged}"
          ></ha-textfield>
          <div class="hint">Aucun appareil Bayrol détecté. Saisissez le numéro de série manuellement.</div>
        </div>
      `:I`
      <div class="row">
        <ha-select
          label="Appareil Bayrol"
          .value="${this._manualSerial?"__manual__":t}"
          @selected="${this._deviceSelected}"
          @closed="${t=>t.stopPropagation()}"
          fixedMenuPosition
        >
          ${this._devices.map(t=>I`
              <ha-list-item .value="${t.serial}">
                ${t.label}
              </ha-list-item>
            `)}
          <ha-list-item value="__manual__">Saisie manuelle…</ha-list-item>
        </ha-select>
      </div>
      ${this._manualSerial?I`
            <div class="row manual-input">
              <ha-textfield
                label="Numéro de série"
                .value="${t}"
                .configValue="${"device_serial"}"
                @input="${this._valueChanged}"
              ></ha-textfield>
            </div>
          `:F}
    `}render(){return I`
      <div>
        ${this._renderDevicePicker()}
        <div class="row">
          <ha-textfield
            label="Préfixe entité (optionnel)"
            .value="${this._config.entity_prefix||""}"
            .configValue="${"entity_prefix"}"
            @input="${this._valueChanged}"
          ></ha-textfield>
        </div>
        <div class="row">
          <ha-formfield label="Afficher les équipements">
            <ha-switch
              .checked="${!1!==this._config.show_equipment}"
              .configValue="${"show_equipment"}"
              @change="${this._switchChanged}"
            ></ha-switch>
          </ha-formfield>
        </div>
        <div class="row">
          <ha-formfield label="Afficher les graphiques">
            <ha-switch
              .checked="${!1!==this._config.show_charts}"
              .configValue="${"show_charts"}"
              @change="${this._switchChanged}"
            ></ha-switch>
          </ha-formfield>
        </div>
        <div class="row">
          <ha-formfield label="Afficher les messages / alertes">
            <ha-switch
              .checked="${!1!==this._config.show_messages}"
              .configValue="${"show_messages"}"
              @change="${this._switchChanged}"
            ></ha-switch>
          </ha-formfield>
        </div>
      </div>
    `}};zt.styles=n`
    :host {
      display: block;
    }
    .row {
      padding: 8px 0;
    }
    ha-textfield,
    ha-select {
      width: 100%;
    }
    .manual-input {
      margin-top: 4px;
    }
    .hint {
      font-size: 0.85em;
      color: var(--secondary-text-color, #727272);
      margin-top: 4px;
    }
  `,t([pt({attribute:!1})],zt.prototype,"hass",void 0),t([ut()],zt.prototype,"_config",void 0),t([ut()],zt.prototype,"_devices",void 0),t([ut()],zt.prototype,"_manualSerial",void 0),zt=t([ct("bayrol-pool-strategy-editor")],zt);console.info("%c BAYROL-POOL-CARD %c v2026.4.2 ","color: white; background: #03a9f4; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;","color: #03a9f4; background: white; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0; border: 1px solid #03a9f4;");const Ut=window;Ut.customCards=Ut.customCards||[],Ut.customCards.push({type:"bayrol-pool-dashboard-card",name:"Bayrol Pool Dashboard",description:"Vue d'ensemble de votre piscine Bayrol — température, pH, ORP, sel, équipements.",preview:!0,documentationURL:"https://github.com/tdenolle/bayrol-pool-card"},{type:"bayrol-pool-chart-card",name:"Bayrol Pool Chart",description:"Graphique historique pour n'importe quelle entité Bayrol Pool Access.",preview:!0,documentationURL:"https://github.com/tdenolle/bayrol-pool-card"},{type:"bayrol-pool-temp-chart-card",name:"Bayrol Pool Temperature Chart",description:"Température avec statut de filtration — met en avant les périodes sans filtration.",preview:!0,documentationURL:"https://github.com/tdenolle/bayrol-pool-card"},{type:"bayrol-pool-messages-card",name:"Bayrol Pool Messages",description:"Affiche les messages et alertes de votre Bayrol Pool Access.",preview:!0,documentationURL:"https://github.com/tdenolle/bayrol-pool-card"});
