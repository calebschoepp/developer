(()=>{const{el:t,mount:e,text:i,list:s,setChildren:a,setStyle:n,setAttr:l}=redom;let o,c;async function r(){c=await async function(){try{let t=await fetch("/static/data.json");return await t.json()}catch(t){console.Err("cannot load search module")}}(),o=lunr((function(){this.field("title"),this.field("subheading"),this.field("content"),this.field("keywords",{boost:10}),this.ref("url"),c.forEach((function(t){this.add(t)}),this)}))}class h{constructor(){this.itemIcon=t("span.result-item-icon","#"),this.link=t("span"),this.el=t("a.result-subitem",{onclick:function(t){v.close()}},[this.itemIcon,this.link])}update(t){this.link.textContent=t.subheading,this.el.href=t.url}}class d{constructor(){this.subheading=s("div.result-subheading-container",h),this.projectName=t("code.project-name"),this.pageTitle=t("span"),this.title=t("a",this.pageTitle,this.projectName),this.el=t("div.result-block",[this.title,this.subheading])}update(t){this.pageTitle.textContent=t.title,this.projectName.textContent=t.project,this.title.href=t.url,this.subheading.update(t.data)}}class u{constructor(){this.index,this.active=!0,this.parentCallback,this.el=t("code.active",{onclick:function(t){this.toggle()}.bind(this)})}update(t,e,i,s){this.parentCallback=s.callback,this.index=e,s.reset&&(this.active=!0),this.active&&this.el.classList.add("active"),this.el.textContent=t}toggle(){this.active=!this.active,this.active?this.el.classList.add("active"):this.el.classList.remove("active"),this.parentCallback(this.index,this.active)}}class p{constructor(e,i){this.categories=e,this.parentCallback=i,this.active=[!0,!0,!0],this.activefilter=e.map((t=>t.toLowerCase())),this.filters=s("div.filter-categories",u),this.filters.update(this.categories,{callback:this.updateFilterSearch.bind(this)}),this.resetFilter=t("span.reset-filter",{onclick:function(t){this.resetFilters()}.bind(this)},"Clear filters"),this.el=t("div.result-filters",this.filters,this.resetFilter)}updateFilterSearch(t,e){console.log(this.active,this.active[t]),this.active[t]=e,this.activefilter=this.categories.filter(((t,e)=>this.active[e])).map((t=>t.toLowerCase())),this.parentCallback(this.activefilter)}resetFilters(){this.activefilter=this.categories.map((t=>t.toLowerCase())),this.parentCallback(this.activefilter),this.filters.update(this.categories,{callback:this.updateFilterSearch.bind(this),reset:!0})}}class m{constructor(){this.data,this.projects=["Spin","Cloud"],this.resultItems=s("div.result-section",d),this.resultFilters=new p(this.projects,this.filter.bind(this)),this.el=t("div.result-section-container",this.resultFilters,this.resultItems)}update(t){this.data=t,this.resultItems.update(this.data)}filter(t){this.resultItems.update(this.data.filter((e=>t.includes(e.project))))}}class g{constructor(){this.link1=t("a.suggested-project-link"),this.link2=t("a.suggested-project-link"),this.link3=t("a.suggested-project-link"),this.link4=t("a.suggested-project-link"),this.projectLinks=t("div.recommended-navs",this.link1,this.link2,this.link3,this.link4),this.projectTitle=t("div.project-title"),this.el=t("div.suggested-project",this.projectTitle,this.projectLinks)}update(t){this.projectTitle.textContent=t.project,this.link1.textContent=t.link1[0],this.link1.href=t.link1[1],this.link2.textContent=t.link2[0],this.link2.href=t.link2[1],this.link3.textContent=t.link3[0],this.link3.href=t.link3[1],this.link4.textContent=t.link4[0],this.link4.href=t.link4[1]}}class b{constructor(){this.projectData=[{project:"Spin",link1:["Install","/spin/install"],link2:["Quickstart","/spin/quickstart/"],link3:["Develop","/spin/developing"],link4:["Deploy","/spin/deploying-to-fermyon/"]},{project:"Cloud",link1:["Quickstart","/cloud/quickstart"],link2:["VS Code","/cloud/spin-vs-code-extension"],link3:["Support","/cloud/support"],link4:["FAQ","/cloud/faq"]}],this.projectRecommendations=s("div.result-section",g),this.projectRecommendations.update(this.projectData),this.el=t("div.result-section-container","Suggested Projects",this.projectRecommendations)}}let v=new class{constructor(){this.container=document.getElementById("search-modal-container"),this.modalSearchBar=t("input.modal-search-bar",{type:"text",spellcheck:!1,placeholder:"Search Fermyon Developer Home",oninput:function(t){this.updateSearch()}.bind(this)}),this.searchResults=new m,this.modalSuggest=new b,this.modal=t("div.modal-box",{onclick:function(t){t.stopPropagation()}}),this.el=t("div.modal-wrapper",{onclick:function(t){this.close()}.bind(this),onkeydown:function(t){"Escape"!=t.key&&t.stopPropagation()}},this.modal)}open(){n(this.container,{display:"block"}),n(document.body,{overflow:"hidden",height:"100%"}),this.modalSearchBar.value="",a(this.modal,[this.modalSearchBar,this.modalSuggest]),this.modalSearchBar.focus()}close(){n(this.container,{display:"none"}),n(document.body,{"overflow-y":"auto",height:"auto"}),a(this.modal,[])}updateSearch(){let t=this.modalSearchBar.value;if(""==t)return void a(this.modal,[this.modalSearchBar,this.modalSuggest]);let e,i=t.split(" ").map((t=>t+"^2 "+t+"* ")).join(" "),s=o.search(i),n={};s.map((t=>{if(t.score<.5)return;e=c.find((e=>t.ref===e.url));let i=e.title.replaceAll(" ","");n[i]||(n[i]={},n[i].data=[]),""!=e.subheading?(n[i].url=e.url.slice(0,e.url.indexOf("#")),n[i].data.push({subheading:e.subheading,url:e.url}),n[i].title=e.title,n[i].project=e.project,n[i].score=n[i].score&&n[i].score>t.score?n[i].score:t.score):n[i].url=e.url})),n=Object.keys(n).map((t=>n[t])).sort((function(t,e){return e.score-t.score})).filter((t=>null!=t.title)),this.searchResults.update(n),a(this.modal,[this.modalSearchBar,this.searchResults])}},f=new class{constructor(e){this.modal=e,this.searchPlaceholder=t("span.search-placeholder","Search"),this.searchCommand=t("span.search-command","⌘/ctrl + K"),this.el=t("button.search-button",{onclick:function(t){this.modal.open()}.bind(this)},[this.searchPlaceholder,this.searchCommand])}}(v);var k=new Headroom(document.querySelector("#topbar"),{tolerance:5,offset:80}),y=new Headroom(document.querySelector("#blogSlogan"),{tolerance:5,offset:300});function w(){let t=document.querySelector("aside.menu");t&&t.querySelector(".active")?.scrollIntoView({behavior:"auto",block:"center",inline:"center",behavior:"smooth"})}const C='<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"viewBox="0 0 448 512">\x3c!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --\x3e<path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"/></svg>',{el:S,mount:L,text:T,list:x,setChildren:j,setStyle:E,setAttr:I}=redom;class q{constructor(t){this.index,this.parentCallback=t,this.lang=S("a"),this.el=S("li",{onclick:function(e){t(this.index)}.bind(this)},this.lang)}update(t,e,i,s){this.index=e,this.lang.textContent=t,s.active==this.index?this.lang.classList.add("is-active"):this.lang.classList.remove("is-active")}}class B{constructor(t,e,i,s){this.tabClass=e,this.parentCallback=s,this.nodes=Array.from(t),this.langs=this.nodes.map((t=>t.dataset.title)),this.active=this.langs.indexOf(i),this.active=this.active>0?this.active:0,this.tabs=x("ul",q,null,this.ChildEventHandler.bind(this)),this.el=S("div.tabs.is-boxed",this.tabs),this.tabs.update(this.langs,{active:0}),this.updateTabContent(this.active)}ChildEventHandler(t){this.tabs.update(this.langs,{active:t}),this.updateTabContent(t),this.parentCallback(this.tabClass,this.langs[t],!0)}updateTabContent(t){for(let e=0;e<this.nodes.length;e++)E(this.nodes[e],{display:e==t?"block":"none"})}globalTabUpdate(t){console.log("global update",t);let e=this.langs.indexOf(t);console.log(e),e<0||(this.tabs.update(this.langs,{active:e}),this.updateTabContent(e))}}class A{constructor(){this.selectedTab=JSON.parse(localStorage.getItem("toggleTabSelections"))||{os:null,code:null},this.handler=[],document.querySelectorAll("div.multitab-content-wrapper").forEach(((t,e)=>{let i=t.querySelectorAll("div.multitab-content");this.handler[e]={},this.handler[e].class=t.dataset.class.toLowerCase(),this.handler[e].tabBlock=new B(i,this.handler[e].class,this.selectedTab[this.handler[e].class],this.updateTabs.bind(this)),t.insertBefore(this.handler[e].tabBlock.el,t.firstChild)})),Object.keys(this.selectedTab).map((t=>{this.selectedTab[t]&&this.updateTabs(t,this.selectedTab[t],!1)})),window.addEventListener("storage",(t=>{"toggleTabSelections"==t.key&&Object.keys(this.selectedTab).map((t=>{this.selectedTab=JSON.parse(localStorage.getItem("toggleTabSelections"))||this.selectedTab,this.selectedTab[t]&&this.updateTabs(t,this.selectedTab[t],!1)}))}))}updateTabs(t,e,i){"soloblock"!=t&&(this.selectedTab[t]=e,console.log("setting value",e),this.handler.map((i=>{i.class==t&&i.tabBlock.globalTabUpdate(e)})),i&&localStorage.setItem("toggleTabSelections",JSON.stringify(this.selectedTab)))}}const{el:F,mount:H,text:M,list:N,setChildren:O,setStyle:D,setAttr:V}=redom;document.querySelectorAll(".modal-button").forEach((function(t){t.addEventListener("click",(function(){var e=document.querySelector(t.getAttribute("data-target"));e.classList.add("is-active"),e.querySelector(".modal-close").addEventListener("click",(function(){e.classList.remove("is-active")})),e.querySelector(".modal-background").addEventListener("click",(function(){e.classList.remove("is-active")}))}))})),document.body.contains(document.getElementById("blogSlogan"))&&y.init(),document.addEventListener("DOMContentLoaded",(function(){var t,e,i;t=document.querySelector(".burger"),e=document.querySelector("#"+t.dataset.target),t.addEventListener("click",(function(){t.classList.toggle("is-active"),e.classList.toggle("is-active")})),k.init(),hljs.highlightAll(),navigator&&navigator.clipboard&&(i=navigator.clipboard,document.querySelectorAll("pre > code").forEach((t=>{let e=t.innerText.trim(),s=t.parentNode.previousSibling.previousSibling;if(s&&"#comment"==s.nodeName)switch(s.textContent.trim()){case"@nocpy":return;case"@selectiveCpy":{let t=!1;e=e.split("\n").map((e=>{let i=(e=e.trim()).startsWith("$");return i||1==t?(t=!!e.endsWith("\\"),i?e.substring(1).trim():e):void 0})).filter((t=>null!=t)).join("\n")}}let a=document.createElement("button");a.className="copy-code-button",a.type="button",a.ariaLabel="Copy code",a.innerHTML=C,a.addEventListener("click",(()=>{i.writeText(e).then((()=>{a.classList.add("is-success"),a.innerHTML='<svg aria-hidden="true" height="24" viewBox="0 0 16 16" version="1.1" width="24" data-view-component="true"><path fill-rule="evenodd" fill="#18d1a5" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>',setTimeout((()=>{a.innerHTML=C,a.classList.remove("is-success")}),2e3)}),(t=>a.innerHTML="Error"))})),t.parentNode.appendChild(a)}))),document.querySelectorAll(".content h1, .content h2, .content h3, .content h4").forEach((t=>{let e=t.innerText.toLowerCase().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,"").replace(/ +/g,"-");t.setAttribute("id",e),t.classList.add("heading-anchor");let i=document.createElement("a");i.className="anchor-link",i.href="#"+e,i.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width=16 height=16 viewBox="0 0 640 512">\x3c!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --\x3e<path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/></svg>',t.append(i),i.addEventListener("click",(t=>{t.preventDefault(),window.location=i.href,document.querySelector(i.getAttribute("href")).scrollIntoView({behavior:"smooth",block:"start"})}))})),w(),new A,window.location.hash.length>0&&(setTimeout((function(){document.querySelector('a[href="'+window.location.hash+'"]').click()}),150),k.unpin()),async function(){try{await r(),H(document.getElementById("search-button-container"),f),H(document.getElementById("search-modal-container"),v),document.onkeydown=function(t){"Escape"==t.key&&v.close(),"k"!=t.key&&"K"!=t.key||!t.metaKey&&!t.ctrlKey||(t.preventDefault(),t.stopPropagation(),v.open())}}catch(t){console.err("Could not setup search")}}()}))})();