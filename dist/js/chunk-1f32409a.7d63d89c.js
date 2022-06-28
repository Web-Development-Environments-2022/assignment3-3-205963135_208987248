(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1f32409a"],{"2ca4":function(e,t,r){"use strict";var a=r("5122"),n=r.n(a);n.a},37906:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=this,r=t.$createElement,a=t._self._c||r;return a("div",{staticClass:"search-page"},[a("div",{staticClass:"search-holder"},[a("div",{staticClass:"search-holder__banner"},[a("div",{staticClass:"col-xs-12 text-center hero-header-container"},[a("h1",{staticClass:"hero-header"},[t._v("Find the Best Recipes Right Here")]),a("div",{staticClass:"filters"},[a("b-form-select",{staticClass:"selector",attrs:{options:t.cuisines},model:{value:t.form.cuisine,callback:function(e){t.$set(t.form,"cuisine",e)},expression:"form.cuisine"}}),a("b-form-select",{staticClass:"selector",attrs:{options:t.diets},model:{value:t.form.diet,callback:function(e){t.$set(t.form,"diet",e)},expression:"form.diet"}}),a("b-form-select",{staticClass:"selector",attrs:{options:t.numbers},model:{value:t.form.number,callback:function(e){t.$set(t.form,"number",e)},expression:"form.number"}}),a("b-form-select",{staticClass:"selector",attrs:{options:t.intolerances},model:{value:t.form.intolerance,callback:function(e){t.$set(t.form,"intolerance",e)},expression:"form.intolerance"}})],1),a("div",{staticClass:"search-container"},[a("div",{staticClass:"search-bar"},[a("div",{staticClass:"form-holder"},[a("div",{staticClass:"navbarSearch"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.searchText,expression:"searchText"}],staticClass:"\n                    form-control\n                    navbar-search-input\n                    js-navbar-search-input\n                    nav-input\n                    js-filter-topics\n                  ",attrs:{type:"text",placeholder:"Search for recipes"},domProps:{value:t.searchText},on:{change:t.onChange,keyup:t.onChange,input:function(e){e.target.composing||(t.searchText=e.target.value)}}})]),a("img",{staticClass:"icon",attrs:{src:"https://hackr.io/assets/images/header-icons/search-header.svg",width:"17",height:"17"}})])]),a("b-button",{attrs:{variant:"outline-info"},on:{click:t.searchRecipe}},[t._v("Search Recipes")])],1)])])]),t.search_cond?a("b-container",{key:t.rerenderer},[a("h1",{staticClass:"hero-header"},[t._v("Most Recent Search:")]),a("div",{staticClass:"sorting-buttons"},[a("b-button",{attrs:{variant:"outline-info"},on:{click:function(){e.sortRecipes("Time Asc")}}},[t._v("Sort by Preparation Time Lowest First")]),a("b-button",{attrs:{variant:"outline-info"},on:{click:function(){e.sortRecipes("Time Desc")}}},[t._v("Sort by Preparation Time Highest First")]),a("b-button",{attrs:{variant:"outline-info"},on:{click:function(){e.sortRecipes("Popularity Asc")}}},[t._v("Sort by Popularity Lowest First")]),a("b-button",{attrs:{variant:"outline-info"},on:{click:function(){e.sortRecipes("Popularity Desc")}}},[t._v("Sort by Popularity Highest First")])],1),0==t.recipes.length?a("h1",{staticClass:"hero-header"},[t._v(" No results was found please try again ")]):t._e(),t._l(t.recipes,(function(e,r){return a("b-row",{key:r},t._l(e,(function(e,t){return a("b-col",{key:t},[a("RecipePreview",{staticClass:"recipePreview",attrs:{recipe:e,id:e.id,title:e.title,readyInMinutes:e.readyInMinutes,image:e.image}})],1)})),1)}))],2):t._e()],1)},n=[],s=(r("fb6a"),r("4e82"),r("96cf"),r("1da1")),i=r("832a"),o=void 0,c=function(){},u=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeStamp","trace","warn"],l=u.length;while(l--)o=u[l],console[o]||(console[o]=c);console;var h={name:"SearchPage",components:{RecipePreview:i["a"]},data:function(){return{searchText:sessionStorage.getItem("searchText"),search_cond:Boolean(sessionStorage.getItem("searchText")),rerenderer:0,RecipesList:"",form:{number:5,cuisine:"",diet:"",intolerance:"",SubmitError:void 0},cuisines:[{value:"",text:"Choose a Cuisine Filter"},{value:"African",text:"African"},{value:"American",text:"American"},{value:"British",text:"British"},{value:"Cajun",text:"Cajun"},{value:"Caribbean",text:"Caribbean"},{value:"Chinese",text:"Chinese"},{value:"Eastern European",text:"Eastern European"},{value:"European",text:"European"},{value:"French",text:"French"},{value:"German",text:"German"},{value:"Greek",text:"Greek"},{value:"Indian",text:"Indian"},{value:"Irish",text:"Irish"},{value:"Italian",text:"Italian"},{value:"Japanese",text:"Japanese"},{value:"Jewish",text:"Jewish"},{value:"Korean",text:"Korean"},{value:"Latin American",text:"Latin American"},{value:"Mediterranean",text:"Mediterranean"},{value:"Mexican",text:"Mexican"},{value:"Middle Eastern",text:"Middle Eastern"},{value:"Nordic",text:"Nordic"},{value:"Southern",text:"Southern"},{value:"Spanish",text:"Spanish"},{value:"Thai",text:"Thai"},{value:"Vietnamese",text:"Vietnamese"}],numbers:[{value:5,text:"Choose Number of Recipes Results"},{value:5,text:"5"},{value:10,text:"10"},{value:15,text:"15"}],diets:[{value:"",text:"Choose Your Diet"},{value:"Gluten Free",text:"Gluten Free"},{value:"Ketogenic",text:"Ketogenic"},{value:"Vegetarian",text:"Vegetarian"},{value:"Lacto-Vegetarian",text:"Lacto-Vegetarian"},{value:"Ovo-Vegetarian",text:"Ovo-Vegetarian"},{value:"Vegan",text:"Vegan"},{value:"Pescetarian",text:"Pescetarian"},{value:"Paleo",text:"Paleo"},{value:"Primal",text:"Primal"},{value:"Low FODMAP",text:"Low FODMAP"},{value:"Whole30",text:"Whole30"}],intolerances:[{value:"",text:"Choose Your Intolerances"},{value:"Dairy",text:"Dairy"},{value:"Egg",text:"Egg"},{value:"Gluten",text:"Gluten"},{value:"Grain",text:"Grain"},{value:"Peanut",text:"Peanut"},{value:"Seafood",text:"Seafood"},{value:"Sesame",text:"Sesame"},{value:"Shellfish",text:"Shellfish"},{value:"Soy",text:"Soy"},{value:"Sulfite",text:"Sulfite"},{value:"Tree Nut",text:"Tree Nut"},{value:"Wheat",text:"Wheat"}],recipes:sessionStorage.getItem("searchResults")?JSON.parse(sessionStorage.getItem("searchResults")):[],recipesToSort:[]}},methods:{rerender:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.rerenderer=1-e.rerenderer;case 1:case"end":return t.stop()}}),t)})))()},onChange:function(){this.$emit("search",this.searchText)},chunkArray:function(e,t){return Object(s["a"])(regeneratorRuntime.mark((function r(){var a,n,s,i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:for(a=0,n=e.length,s=[],a=0;a<n;a+=t)i=e.slice(a,a+t),s.push(i);return r.abrupt("return",s);case 5:case"end":return r.stop()}}),r)})))()},sortRecipes:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){var a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return"Time Asc"==e?t.recipesToSort.sort((function(e,t){return e.readyInMinutes-t.readyInMinutes})):"Popularity Asc"==e?t.recipesToSort.sort((function(e,t){return e.aggregateLikes-t.aggregateLikes})):"Time Desc"==e?t.recipesToSort.sort((function(e,t){return t.readyInMinutes-e.readyInMinutes})):"Popularity Desc"==e&&t.recipesToSort.sort((function(e,t){return t.aggregateLikes-e.aggregateLikes})),console.log(t.recipesToSort),r.next=4,t.chunkArray(t.recipesToSort,3);case 4:a=r.sent,console.log(a),t.recipes=a,t.rerender();case 8:case"end":return r.stop()}}),r)})))()},searchRecipe:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r,a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e.$root.store.server_domain="http://127.0.0.1:3000",t.next=4,e.axios.post(e.$root.store.server_domain+"/recipes/search",{querySearch:e.searchText,numberSearch:e.form.number,cuisineSearch:e.form.cuisine,dietSearch:e.form.diet,intoleranceSearch:e.form.intolerance});case 4:return r=t.sent,a=r.data,a.popularity=a.aggregateLikes,console.log(a),e.recipesToSort=a,t.next=11,e.chunkArray(a,3);case 11:n=t.sent,console.log(n),e.recipes=n,void 0!=e.$root.store.username&&(sessionStorage.setItem("searchResults",JSON.stringify(n)),sessionStorage.setItem("searchText",e.searchText)),e.search_cond=!0,t.next=21;break;case 18:t.prev=18,t.t0=t["catch"](0),console.log(t.t0);case 21:case"end":return t.stop()}}),t,null,[[0,18]])})))()}}},v=h,p=(r("2ca4"),r("2877")),m=Object(p["a"])(v,a,n,!1,null,null,null);t["default"]=m.exports},"4e82":function(e,t,r){"use strict";var a=r("23e7"),n=r("1c0b"),s=r("7b0b"),i=r("d039"),o=r("a640"),c=[],u=c.sort,l=i((function(){c.sort(void 0)})),h=i((function(){c.sort(null)})),v=o("sort"),p=l||!h||!v;a({target:"Array",proto:!0,forced:p},{sort:function(e){return void 0===e?u.call(s(this)):u.call(s(this),n(e))}})},5122:function(e,t,r){}}]);
//# sourceMappingURL=chunk-1f32409a.2bf26af9.js.map
