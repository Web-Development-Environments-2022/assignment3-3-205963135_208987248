(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-62db2b66"],{"129f":function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}},"1dde":function(e,t,r){var n=r("d039"),a=r("b622"),i=r("2d00"),s=a("species");e.exports=function(e){return i>=51||!n((function(){var t=[],r=t.constructor={};return r[s]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"2ca4":function(e,t,r){"use strict";var n=r("5122"),a=r.n(n);a.a},37906:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=this,r=t.$createElement,n=t._self._c||r;return n("div",{staticClass:"search-page"},[n("div",{staticClass:"search-holder"},[n("div",{staticClass:"search-holder__banner"},[n("div",{staticClass:"col-xs-12 text-center hero-header-container"},[n("h2",{staticClass:"hero-header"},[t._v("Find the Best Recipes Right Here")]),n("div",{staticClass:"filters"},[n("div",{staticClass:"multiple-choice-container"},[n("b-form-select",{staticClass:"selector",attrs:{options:t.numbers},model:{value:t.form.number,callback:function(e){t.$set(t.form,"number",e)},expression:"form.number"}})],1),n("div",{staticClass:"multiple-choice-container"},[n("b-form-group",{attrs:{"label-for":"tags-with-dropdown"}},[n("b-form-tags",{staticClass:"mb-2",attrs:{id:"tags-with-dropdown","no-outer-focus":""},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.tags,a=e.disabled,i=e.addTag,s=e.removeTag;return[r.length>0?n("ul",{staticClass:"list-inline d-inline-block mb-2"},t._l(r,(function(e){return n("li",{key:e,staticClass:"list-inline-item"},[n("b-form-tag",{attrs:{title:e,disabled:a,variant:"info"},on:{remove:function(t){return s(e)}}},[t._v(t._s(e))])],1)})),0):t._e(),n("b-dropdown",{attrs:{size:"sm",variant:"outline-secondary",block:"","menu-class":"w-100"},scopedSlots:t._u([{key:"button-content",fn:function(){return[n("b-icon",{attrs:{icon:"tag-fill"}}),t._v(" Please choose cuisine to filter by ")]},proxy:!0}],null,!0)},[n("b-dropdown-form",{on:{submit:function(e){e.stopPropagation(),e.preventDefault()}}},[n("b-form-group",{staticClass:"mb-0",attrs:{label:"Search tags","label-for":"tag-search-input","label-cols-md":"auto","label-size":"sm",description:t.searchDescCuisines,disabled:a}},[n("b-form-input",{attrs:{id:"tag-search-input",type:"search",size:"sm",autocomplete:"off"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)],1),n("b-dropdown-divider"),t._l(t.availableCuisines,(function(e){return n("b-dropdown-item-button",{key:e,on:{click:function(r){return t.onCuisineClick({cuisine:e,addTag:i})}}},[t._v(" "+t._s(e)+" ")])})),0===t.availableCuisines.length?n("b-dropdown-text",[t._v(" There are no tags available to select ")]):t._e()],2)]}}]),model:{value:t.valueCuisine,callback:function(e){t.valueCuisine=e},expression:"valueCuisine"}})],1)],1),n("div",{staticClass:"multiple-choice-container"},[n("b-form-group",{attrs:{"label-for":"tags-with-dropdown"}},[n("b-form-tags",{staticClass:"mb-2",attrs:{id:"tags-with-dropdown","no-outer-focus":""},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.tags,a=e.disabled,i=e.addTag,s=e.removeTag;return[r.length>0?n("ul",{staticClass:"list-inline d-inline-block mb-2"},t._l(r,(function(e){return n("li",{key:e,staticClass:"list-inline-item"},[n("b-form-tag",{attrs:{title:e,disabled:a,variant:"info"},on:{remove:function(t){return s(e)}}},[t._v(t._s(e))])],1)})),0):t._e(),n("b-dropdown",{attrs:{size:"sm",variant:"outline-secondary",block:"","menu-class":"w-100"},scopedSlots:t._u([{key:"button-content",fn:function(){return[n("b-icon",{attrs:{icon:"tag-fill"}}),t._v(" Please choose diet to filter by ")]},proxy:!0}],null,!0)},[n("b-dropdown-form",{on:{submit:function(e){e.stopPropagation(),e.preventDefault()}}},[n("b-form-group",{staticClass:"mb-0",attrs:{label:"Search tags","label-for":"tag-search-input","label-cols-md":"auto","label-size":"sm",description:t.searchDescDiets,disabled:a}},[n("b-form-input",{attrs:{id:"tag-search-input",type:"search",size:"sm",autocomplete:"off"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)],1),n("b-dropdown-divider"),t._l(t.availableDiets,(function(e){return n("b-dropdown-item-button",{key:e,on:{click:function(r){return t.onDietClick({diet:e,addTag:i})}}},[t._v(" "+t._s(e)+" ")])})),0===t.availableDiets.length?n("b-dropdown-text",[t._v(" There are no tags available to select ")]):t._e()],2)]}}]),model:{value:t.valueDiet,callback:function(e){t.valueDiet=e},expression:"valueDiet"}})],1)],1),n("div",{staticClass:"multiple-choice-container"},[n("b-form-group",{attrs:{"label-for":"tags-with-dropdown"}},[n("b-form-tags",{staticClass:"mb-2",attrs:{id:"tags-with-dropdown","no-outer-focus":""},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.tags,a=e.disabled,i=e.addTag,s=e.removeTag;return[r.length>0?n("ul",{staticClass:"list-inline d-inline-block mb-2"},t._l(r,(function(e){return n("li",{key:e,staticClass:"list-inline-item"},[n("b-form-tag",{attrs:{title:e,disabled:a,variant:"info"},on:{remove:function(t){return s(e)}}},[t._v(t._s(e))])],1)})),0):t._e(),n("b-dropdown",{attrs:{size:"sm",variant:"outline-secondary",block:"","menu-class":"w-100"},scopedSlots:t._u([{key:"button-content",fn:function(){return[n("b-icon",{attrs:{icon:"tag-fill"}}),t._v(" Please choose intolerance to filter by ")]},proxy:!0}],null,!0)},[n("b-dropdown-form",{on:{submit:function(e){e.stopPropagation(),e.preventDefault()}}},[n("b-form-group",{staticClass:"mb-0",attrs:{label:"Search tags","label-for":"tag-search-input","label-cols-md":"auto","label-size":"sm",description:t.searchDescIntolerances,disabled:a}},[n("b-form-input",{attrs:{id:"tag-search-input",type:"search",size:"sm",autocomplete:"off"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)],1),n("b-dropdown-divider"),t._l(t.availableIntolerances,(function(e){return n("b-dropdown-item-button",{key:e,on:{click:function(r){return t.onIntoleranceClick({intolerance:e,addTag:i})}}},[t._v(" "+t._s(e)+" ")])})),0===t.availableIntolerances.length?n("b-dropdown-text",[t._v(" There are no tags available to select ")]):t._e()],2)]}}]),model:{value:t.valueIntolerance,callback:function(e){t.valueIntolerance=e},expression:"valueIntolerance"}})],1)],1)]),n("div",{staticClass:"search-container"},[n("div",{staticClass:"search-bar"},[n("div",{staticClass:"form-holder"},[n("div",{staticClass:"navbarSearch"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.searchText,expression:"searchText"}],staticClass:"\n                    form-control\n                    navbar-search-input\n                    js-navbar-search-input\n                    nav-input\n                    js-filter-topics\n                  ",attrs:{type:"text",placeholder:"Search for recipes"},domProps:{value:t.searchText},on:{change:t.onChange,keyup:t.onChange,input:function(e){e.target.composing||(t.searchText=e.target.value)}}})]),n("img",{staticClass:"icon",attrs:{src:"https://hackr.io/assets/images/header-icons/search-header.svg",width:"17",height:"17"}})])]),n("b-button",{staticClass:"search_btn",attrs:{variant:"outline-dark"},on:{click:t.searchRecipe}},[t._v("Search Recipes")]),n("h2",{staticClass:"hero-header"},[t._v("Most Recent Search:")])],1)])])]),t.search_cond?n("b-container",{key:t.rerenderer},[n("div",{staticClass:"sorting-buttons"},[n("b-button",{attrs:{variant:"outline-dark"},on:{click:function(){e.sortRecipes("Time Asc")}}},[t._v("Sort by Preparation Time Lowest First")]),n("b-button",{attrs:{variant:"outline-dark"},on:{click:function(){e.sortRecipes("Time Desc")}}},[t._v("Sort by Preparation Time Highest First")]),n("b-button",{attrs:{variant:"outline-dark"},on:{click:function(){e.sortRecipes("Popularity Asc")}}},[t._v("Sort by Popularity Lowest First")]),n("b-button",{attrs:{variant:"outline-dark"},on:{click:function(){e.sortRecipes("Popularity Desc")}}},[t._v("Sort by Popularity Highest First")])],1),0==t.recipes.length?n("h4",{staticClass:"hero-header"},[t._v(" No results was found please try again ")]):t._e()]):t._e(),n("b-container",{staticClass:"p-4 all_recipes",attrs:{fluid:""}},t._l(t.recipes.flat(),(function(e,t){return n("b-row",{key:t,staticClass:"row"},[n("RecipePreview",{staticClass:"recipePreview",attrs:{recipe:e,id:e.id,title:e.title,readyInMinutes:e.readyInMinutes,image:e.image,aggregateLikes:e.aggregateLikes,isFavorite:e.isFavorite,isLastseen:e.isLastseen,index:t+1}})],1)})),1)],1)},a=[],i=(r("4de4"),r("4160"),r("caad"),r("c975"),r("a15b9"),r("fb6a"),r("4e82"),r("0d03"),r("d3b7"),r("ac1f"),r("25f0"),r("2532"),r("841c"),r("498a2"),r("159b"),r("96cf"),r("1da1")),s=r("832a"),o={name:"SearchPage",components:{RecipePreview:s["a"]},data:function(){return{searchText:sessionStorage.getItem("searchText"),search_cond:Boolean(sessionStorage.getItem("searchText")),rerenderer:0,RecipesList:"",valueCuisine:[],valueDiet:[],valueIntolerance:[],form:{number:5,cuisine:"",diet:"",intolerance:"",SubmitError:void 0},cuisines:["African","American","British","Cajun","Caribbean","Chinese","Eastern European","European","French","German","Greek","Indian","Irish","Italian","Japanese","Jewish","Korean","Latin American","Mediterranean","Mexican","Middle Eastern","Nordic","Southern","Spanish","Thai","Vietnamese"],numbers:[{value:5,text:"Choose Number of Recipes Results"},{value:5,text:"5"},{value:10,text:"10"},{value:15,text:"15"}],diets:["Choose Your Diet","Gluten Free","Ketogenic","Vegetarian","Lacto-Vegetarian","Ovo-Vegetarian","Vegan","Pescetarian","Paleo","Primal","Low FODMAP","Whole30"],intolerances:["Choose Your Intolerances","Dairy","Egg","Gluten","Grain","Peanut","Seafood","Sesame","Shellfish","Soy","Sulfite","Tree Nut","Wheat"],recipes:sessionStorage.getItem("searchResults")?JSON.parse(sessionStorage.getItem("searchResults")):[],recipesToSort:[],search:""}},computed:{criteria:function(){return this.search.trim().toLowerCase()},availableCuisines:function(){var e=this,t=this.criteria,r=this.cuisines.filter((function(t){return-1===e.valueCuisine.indexOf(t)}));return t?r.filter((function(e){return e.toLowerCase().indexOf(t)>-1})):r},availableDiets:function(){var e=this,t=this.criteria,r=this.diets.filter((function(t){return-1===e.valueDiet.indexOf(t)}));return t?r.filter((function(e){return e.toLowerCase().indexOf(t)>-1})):r},availableIntolerances:function(){var e=this,t=this.criteria,r=this.intolerances.filter((function(t){return-1===e.valueIntolerance.indexOf(t)}));return t?r.filter((function(e){return e.toLowerCase().indexOf(t)>-1})):r},searchDescCuisines:function(){return this.criteria&&0===this.availableCuisine.length?"There are no tags matching your search criteria":""},searchDescDiets:function(){return this.criteria&&0===this.availableDiets.length?"There are no tags matching your search criteria":""},searchDescIntolerances:function(){return this.criteria&&0===this.availableIntolerances.length?"There are no tags matching your search criteria":""}},methods:{onCuisineClick:function(e){var t=e.cuisine,r=e.addTag;this.valueCuisine.push(t),r(t),this.form.cuisine=""},onDietClick:function(e){var t=e.diet,r=e.addTag;this.valueDiet.push(t),r(t),this.form.diet=""},onIntoleranceClick:function(e){var t=e.intolerance,r=e.addTag;this.valueIntolerance.push(t),r(t),this.form.intolerance=""},rerender:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.rerenderer=1-e.rerenderer;case 1:case"end":return t.stop()}}),t)})))()},onChange:function(){this.$emit("search",this.searchText)},chunkArray:function(e,t){return Object(i["a"])(regeneratorRuntime.mark((function r(){var n,a,i,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:for(n=0,a=e.length,i=[],n=0;n<a;n+=t)s=e.slice(n,n+t),i.push(s);return r.abrupt("return",i);case 5:case"end":return r.stop()}}),r)})))()},sortRecipes:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return"Time Asc"==e?t.recipesToSort.sort((function(e,t){return e.readyInMinutes-t.readyInMinutes})):"Popularity Asc"==e?t.recipesToSort.sort((function(e,t){return e.aggregateLikes-t.aggregateLikes})):"Time Desc"==e?t.recipesToSort.sort((function(e,t){return t.readyInMinutes-e.readyInMinutes})):"Popularity Desc"==e&&t.recipesToSort.sort((function(e,t){return t.aggregateLikes-e.aggregateLikes})),r.next=3,t.chunkArray(t.recipesToSort,3);case 3:n=r.sent,t.recipes=n,t.rerender();case 6:case"end":return r.stop()}}),r)})))()},searchRecipe:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,n,a,i,s,o,c,l,u;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e.$root.store.server_domain="https://dm-recipes.cs.bgu.ac.il",r=JSON.parse(JSON.stringify(e.valueCuisine)),n=JSON.parse(JSON.stringify(e.valueDiet)),a=JSON.parse(JSON.stringify(e.valueIntolerance)),t.next=7,e.axios.post(e.$root.store.server_domain+"/recipes/search",{querySearch:e.searchText,numberSearch:e.form.number,cuisineSearch:void 0!=r.join()?r.join():"",dietSearch:void 0!=n.join()?n.join():"",intoleranceSearch:void 0!=a.join()?a.join():""});case 7:if(i=t.sent,e.valueCuisine=[],e.valueDiet=[],e.valueIntolerance=[],s=i.data,s.popularity=s.aggregateLikes,void 0==e.$root.store.username){t.next=28;break}return o=JSON.parse(sessionStorage.getItem("watchedRecipes")),c=JSON.parse(sessionStorage.getItem("favorites")),l=[],s.forEach((function(e){var t=JSON.parse(JSON.stringify(e));t.isFavorite=c.includes(t.id.toString()),t.isLastseen=o.includes(t.id.toString()),l.push(t)})),s=l,e.recipesToSort=s,t.next=22,e.chunkArray(s,3);case 22:u=t.sent,e.recipes=s,sessionStorage.setItem("searchResults",JSON.stringify(u)),sessionStorage.setItem("searchText",e.searchText),t.next=29;break;case 28:e.recipes=i.data;case 29:e.search_cond=!0,t.next=35;break;case 32:t.prev=32,t.t0=t["catch"](0),console.log(t.t0);case 35:case"end":return t.stop()}}),t,null,[[0,32]])})))()}}},c=o,l=(r("2ca4"),r("2877")),u=Object(l["a"])(c,n,a,!1,null,null,null);t["default"]=u.exports},"498a2":function(e,t,r){"use strict";var n=r("23e7"),a=r("58a8").trim,i=r("c8d2");n({target:"String",proto:!0,forced:i("trim")},{trim:function(){return a(this)}})},"4de4":function(e,t,r){"use strict";var n=r("23e7"),a=r("b727").filter,i=r("1dde"),s=r("ae40"),o=i("filter"),c=s("filter");n({target:"Array",proto:!0,forced:!o||!c},{filter:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}})},"4e82":function(e,t,r){"use strict";var n=r("23e7"),a=r("1c0b"),i=r("7b0b"),s=r("d039"),o=r("a640"),c=[],l=c.sort,u=s((function(){c.sort(void 0)})),d=s((function(){c.sort(null)})),f=o("sort"),h=u||!d||!f;n({target:"Array",proto:!0,forced:h},{sort:function(e){return void 0===e?l.call(i(this)):l.call(i(this),a(e))}})},5122:function(e,t,r){},8418:function(e,t,r){"use strict";var n=r("c04e"),a=r("9bf2"),i=r("5c6c");e.exports=function(e,t,r){var s=n(t);s in e?a.f(e,s,i(0,r)):e[s]=r}},"841c":function(e,t,r){"use strict";var n=r("d784"),a=r("825a"),i=r("1d80"),s=r("129f"),o=r("14c3");n("search",1,(function(e,t,r){return[function(t){var r=i(this),n=void 0==t?void 0:t[e];return void 0!==n?n.call(t,r):new RegExp(t)[e](String(r))},function(e){var n=r(t,e,this);if(n.done)return n.value;var i=a(e),c=String(this),l=i.lastIndex;s(l,0)||(i.lastIndex=0);var u=o(i,c);return s(i.lastIndex,l)||(i.lastIndex=l),null===u?-1:u.index}]}))},a15b9:function(e,t,r){"use strict";var n=r("23e7"),a=r("44ad"),i=r("fc6a"),s=r("a640"),o=[].join,c=a!=Object,l=s("join",",");n({target:"Array",proto:!0,forced:c||!l},{join:function(e){return o.call(i(this),void 0===e?",":e)}})},c8d2:function(e,t,r){var n=r("d039"),a=r("5899"),i="​᠎";e.exports=function(e){return n((function(){return!!a[e]()||i[e]()!=i||a[e].name!==e}))}},c975:function(e,t,r){"use strict";var n=r("23e7"),a=r("4d64").indexOf,i=r("a640"),s=r("ae40"),o=[].indexOf,c=!!o&&1/[1].indexOf(1,-0)<0,l=i("indexOf"),u=s("indexOf",{ACCESSORS:!0,1:0});n({target:"Array",proto:!0,forced:c||!l||!u},{indexOf:function(e){return c?o.apply(this,arguments)||0:a(this,e,arguments.length>1?arguments[1]:void 0)}})},fb6a:function(e,t,r){"use strict";var n=r("23e7"),a=r("861d"),i=r("e8b5"),s=r("23cb"),o=r("50c4"),c=r("fc6a"),l=r("8418"),u=r("b622"),d=r("1dde"),f=r("ae40"),h=d("slice"),p=f("slice",{ACCESSORS:!0,0:0,1:2}),v=u("species"),b=[].slice,g=Math.max;n({target:"Array",proto:!0,forced:!h||!p},{slice:function(e,t){var r,n,u,d=c(this),f=o(d.length),h=s(e,f),p=s(void 0===t?f:t,f);if(i(d)&&(r=d.constructor,"function"!=typeof r||r!==Array&&!i(r.prototype)?a(r)&&(r=r[v],null===r&&(r=void 0)):r=void 0,r===Array||void 0===r))return b.call(d,h,p);for(n=new(void 0===r?Array:r)(g(p-h,0)),u=0;h<p;h++,u++)h in d&&l(n,u,d[h]);return n.length=u,n}})}}]);
//# sourceMappingURL=chunk-62db2b66.554be2dd.js.map