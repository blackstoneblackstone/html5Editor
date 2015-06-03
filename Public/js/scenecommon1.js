/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 0.11.0 - 2014-05-01
 * License: MIT
 */
angular.module("ui.bootstrap",["ui.bootstrap.tpls","ui.bootstrap.transition","ui.bootstrap.collapse","ui.bootstrap.accordion","ui.bootstrap.alert","ui.bootstrap.bindHtml","ui.bootstrap.buttons","ui.bootstrap.carousel","ui.bootstrap.dateparser","ui.bootstrap.position","ui.bootstrap.datepicker","ui.bootstrap.dropdown","ui.bootstrap.modal","ui.bootstrap.pagination","ui.bootstrap.tooltip","ui.bootstrap.popover","ui.bootstrap.progressbar","ui.bootstrap.rating","ui.bootstrap.tabs","ui.bootstrap.timepicker","ui.bootstrap.typeahead"]),angular.module("ui.bootstrap.tpls",["template/accordion/accordion-group.html","template/accordion/accordion.html","template/alert/alert.html","template/carousel/carousel.html","template/carousel/slide.html","template/datepicker/datepicker.html","template/datepicker/day.html","template/datepicker/month.html","template/datepicker/popup.html","template/datepicker/year.html","template/modal/backdrop.html","template/modal/window.html","template/pagination/pager.html","template/pagination/pagination.html","template/tooltip/tooltip-html-unsafe-popup.html","template/tooltip/tooltip-popup.html","template/popover/popover.html","template/progressbar/bar.html","template/progressbar/progress.html","template/progressbar/progressbar.html","template/rating/rating.html","template/tabs/tab.html","template/tabs/tabset.html","template/timepicker/timepicker.html","template/typeahead/typeahead-match.html","template/typeahead/typeahead-popup.html"]),angular.module("ui.bootstrap.transition",[]).factory("$transition",["$q","$timeout","$rootScope",function(a,b,c){function d(a){for(var b in a)if(void 0!==f.style[b])return a[b]}var e=function(d,f,g){g=g||{};var h=a.defer(),i=e[g.animation?"animationEndEventName":"transitionEndEventName"],j=function(){c.$apply(function(){d.unbind(i,j),h.resolve(d)})};return i&&d.bind(i,j),b(function(){angular.isString(f)?d.addClass(f):angular.isFunction(f)?f(d):angular.isObject(f)&&d.css(f),i||h.resolve(d)}),h.promise.cancel=function(){i&&d.unbind(i,j),h.reject("Transition cancelled")},h.promise},f=document.createElement("trans"),g={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"},h={WebkitTransition:"webkitAnimationEnd",MozTransition:"animationend",OTransition:"oAnimationEnd",transition:"animationend"};return e.transitionEndEventName=d(g),e.animationEndEventName=d(h),e}]),angular.module("ui.bootstrap.collapse",["ui.bootstrap.transition"]).directive("collapse",["$transition",function(a){return{link:function(b,c,d){function e(b){function d(){j===e&&(j=void 0)}var e=a(c,b);return j&&j.cancel(),j=e,e.then(d,d),e}function f(){k?(k=!1,g()):(c.removeClass("collapse").addClass("collapsing"),e({height:c[0].scrollHeight+"px"}).then(g))}function g(){c.removeClass("collapsing"),c.addClass("collapse in"),c.css({height:"auto"})}function h(){if(k)k=!1,i(),c.css({height:0});else{c.css({height:c[0].scrollHeight+"px"});{c[0].offsetWidth}c.removeClass("collapse in").addClass("collapsing"),e({height:0}).then(i)}}function i(){c.removeClass("collapsing"),c.addClass("collapse")}var j,k=!0;b.$watch(d.collapse,function(a){a?h():f()})}}}]),angular.module("ui.bootstrap.accordion",["ui.bootstrap.collapse"]).constant("accordionConfig",{closeOthers:!0}).controller("AccordionController",["$scope","$attrs","accordionConfig",function(a,b,c){this.groups=[],this.closeOthers=function(d){var e=angular.isDefined(b.closeOthers)?a.$eval(b.closeOthers):c.closeOthers;e&&angular.forEach(this.groups,function(a){a!==d&&(a.isOpen=!1)})},this.addGroup=function(a){var b=this;this.groups.push(a),a.$on("$destroy",function(){b.removeGroup(a)})},this.removeGroup=function(a){var b=this.groups.indexOf(a);-1!==b&&this.groups.splice(b,1)}}]).directive("accordion",function(){return{restrict:"EA",controller:"AccordionController",transclude:!0,replace:!1,templateUrl:"template/accordion/accordion.html"}}).directive("accordionGroup",function(){return{require:"^accordion",restrict:"EA",transclude:!0,replace:!0,templateUrl:"template/accordion/accordion-group.html",scope:{heading:"@",isOpen:"=?",isDisabled:"=?"},controller:function(){this.setHeading=function(a){this.heading=a}},link:function(a,b,c,d){d.addGroup(a),a.$watch("isOpen",function(b){b&&d.closeOthers(a)}),a.toggleOpen=function(){a.isDisabled||(a.isOpen=!a.isOpen)}}}}).directive("accordionHeading",function(){return{restrict:"EA",transclude:!0,template:"",replace:!0,require:"^accordionGroup",link:function(a,b,c,d,e){d.setHeading(e(a,function(){}))}}}).directive("accordionTransclude",function(){return{require:"^accordionGroup",link:function(a,b,c,d){a.$watch(function(){return d[c.accordionTransclude]},function(a){a&&(b.html(""),b.append(a))})}}}),angular.module("ui.bootstrap.alert",[]).controller("AlertController",["$scope","$attrs",function(a,b){a.closeable="close"in b}]).directive("alert",function(){return{restrict:"EA",controller:"AlertController",templateUrl:"template/alert/alert.html",transclude:!0,replace:!0,scope:{type:"@",close:"&"}}}),angular.module("ui.bootstrap.bindHtml",[]).directive("bindHtmlUnsafe",function(){return function(a,b,c){b.addClass("ng-binding").data("$binding",c.bindHtmlUnsafe),a.$watch(c.bindHtmlUnsafe,function(a){b.html(a||"")})}}),angular.module("ui.bootstrap.buttons",[]).constant("buttonConfig",{activeClass:"active",toggleEvent:"click"}).controller("ButtonsController",["buttonConfig",function(a){this.activeClass=a.activeClass||"active",this.toggleEvent=a.toggleEvent||"click"}]).directive("btnRadio",function(){return{require:["btnRadio","ngModel"],controller:"ButtonsController",link:function(a,b,c,d){var e=d[0],f=d[1];f.$render=function(){b.toggleClass(e.activeClass,angular.equals(f.$modelValue,a.$eval(c.btnRadio)))},b.bind(e.toggleEvent,function(){var d=b.hasClass(e.activeClass);(!d||angular.isDefined(c.uncheckable))&&a.$apply(function(){f.$setViewValue(d?null:a.$eval(c.btnRadio)),f.$render()})})}}}).directive("btnCheckbox",function(){return{require:["btnCheckbox","ngModel"],controller:"ButtonsController",link:function(a,b,c,d){function e(){return g(c.btnCheckboxTrue,!0)}function f(){return g(c.btnCheckboxFalse,!1)}function g(b,c){var d=a.$eval(b);return angular.isDefined(d)?d:c}var h=d[0],i=d[1];i.$render=function(){b.toggleClass(h.activeClass,angular.equals(i.$modelValue,e()))},b.bind(h.toggleEvent,function(){a.$apply(function(){i.$setViewValue(b.hasClass(h.activeClass)?f():e()),i.$render()})})}}}),angular.module("ui.bootstrap.carousel",["ui.bootstrap.transition"]).controller("CarouselController",["$scope","$timeout","$transition",function(a,b,c){function d(){e();var c=+a.interval;!isNaN(c)&&c>=0&&(g=b(f,c))}function e(){g&&(b.cancel(g),g=null)}function f(){h?(a.next(),d()):a.pause()}var g,h,i=this,j=i.slides=a.slides=[],k=-1;i.currentSlide=null;var l=!1;i.select=a.select=function(e,f){function g(){if(!l){if(i.currentSlide&&angular.isString(f)&&!a.noTransition&&e.$element){e.$element.addClass(f);{e.$element[0].offsetWidth}angular.forEach(j,function(a){angular.extend(a,{direction:"",entering:!1,leaving:!1,active:!1})}),angular.extend(e,{direction:f,active:!0,entering:!0}),angular.extend(i.currentSlide||{},{direction:f,leaving:!0}),a.$currentTransition=c(e.$element,{}),function(b,c){a.$currentTransition.then(function(){h(b,c)},function(){h(b,c)})}(e,i.currentSlide)}else h(e,i.currentSlide);i.currentSlide=e,k=m,d()}}function h(b,c){angular.extend(b,{direction:"",active:!0,leaving:!1,entering:!1}),angular.extend(c||{},{direction:"",active:!1,leaving:!1,entering:!1}),a.$currentTransition=null}var m=j.indexOf(e);void 0===f&&(f=m>k?"next":"prev"),e&&e!==i.currentSlide&&(a.$currentTransition?(a.$currentTransition.cancel(),b(g)):g())},a.$on("$destroy",function(){l=!0}),i.indexOfSlide=function(a){return j.indexOf(a)},a.next=function(){var b=(k+1)%j.length;return a.$currentTransition?void 0:i.select(j[b],"next")},a.prev=function(){var b=0>k-1?j.length-1:k-1;return a.$currentTransition?void 0:i.select(j[b],"prev")},a.isActive=function(a){return i.currentSlide===a},a.$watch("interval",d),a.$on("$destroy",e),a.play=function(){h||(h=!0,d())},a.pause=function(){a.noPause||(h=!1,e())},i.addSlide=function(b,c){b.$element=c,j.push(b),1===j.length||b.active?(i.select(j[j.length-1]),1==j.length&&a.play()):b.active=!1},i.removeSlide=function(a){var b=j.indexOf(a);j.splice(b,1),j.length>0&&a.active?i.select(b>=j.length?j[b-1]:j[b]):k>b&&k--}}]).directive("carousel",[function(){return{restrict:"EA",transclude:!0,replace:!0,controller:"CarouselController",require:"carousel",templateUrl:"template/carousel/carousel.html",scope:{interval:"=",noTransition:"=",noPause:"="}}}]).directive("slide",function(){return{require:"^carousel",restrict:"EA",transclude:!0,replace:!0,templateUrl:"template/carousel/slide.html",scope:{active:"=?"},link:function(a,b,c,d){d.addSlide(a,b),a.$on("$destroy",function(){d.removeSlide(a)}),a.$watch("active",function(b){b&&d.select(a)})}}}),angular.module("ui.bootstrap.dateparser",[]).service("dateParser",["$locale","orderByFilter",function(a,b){function c(a,b,c){return 1===b&&c>28?29===c&&(a%4===0&&a%100!==0||a%400===0):3===b||5===b||8===b||10===b?31>c:!0}this.parsers={};var d={yyyy:{regex:"\\d{4}",apply:function(a){this.year=+a}},yy:{regex:"\\d{2}",apply:function(a){this.year=+a+2e3}},y:{regex:"\\d{1,4}",apply:function(a){this.year=+a}},MMMM:{regex:a.DATETIME_FORMATS.MONTH.join("|"),apply:function(b){this.month=a.DATETIME_FORMATS.MONTH.indexOf(b)}},MMM:{regex:a.DATETIME_FORMATS.SHORTMONTH.join("|"),apply:function(b){this.month=a.DATETIME_FORMATS.SHORTMONTH.indexOf(b)}},MM:{regex:"0[1-9]|1[0-2]",apply:function(a){this.month=a-1}},M:{regex:"[1-9]|1[0-2]",apply:function(a){this.month=a-1}},dd:{regex:"[0-2][0-9]{1}|3[0-1]{1}",apply:function(a){this.date=+a}},d:{regex:"[1-2]?[0-9]{1}|3[0-1]{1}",apply:function(a){this.date=+a}},EEEE:{regex:a.DATETIME_FORMATS.DAY.join("|")},EEE:{regex:a.DATETIME_FORMATS.SHORTDAY.join("|")}};this.createParser=function(a){var c=[],e=a.split("");return angular.forEach(d,function(b,d){var f=a.indexOf(d);if(f>-1){a=a.split(""),e[f]="("+b.regex+")",a[f]="$";for(var g=f+1,h=f+d.length;h>g;g++)e[g]="",a[g]="$";a=a.join(""),c.push({index:f,apply:b.apply})}}),{regex:new RegExp("^"+e.join("")+"$"),map:b(c,"index")}},this.parse=function(b,d){if(!angular.isString(b))return b;d=a.DATETIME_FORMATS[d]||d,this.parsers[d]||(this.parsers[d]=this.createParser(d));var e=this.parsers[d],f=e.regex,g=e.map,h=b.match(f);if(h&&h.length){for(var i,j={year:1900,month:0,date:1,hours:0},k=1,l=h.length;l>k;k++){var m=g[k-1];m.apply&&m.apply.call(j,h[k])}return c(j.year,j.month,j.date)&&(i=new Date(j.year,j.month,j.date,j.hours)),i}}}]),angular.module("ui.bootstrap.position",[]).factory("$position",["$document","$window",function(a,b){function c(a,c){return a.currentStyle?a.currentStyle[c]:b.getComputedStyle?b.getComputedStyle(a)[c]:a.style[c]}function d(a){return"static"===(c(a,"position")||"static")}var e=function(b){for(var c=a[0],e=b.offsetParent||c;e&&e!==c&&d(e);)e=e.offsetParent;return e||c};return{position:function(b){var c=this.offset(b),d={top:0,left:0},f=e(b[0]);f!=a[0]&&(d=this.offset(angular.element(f)),d.top+=f.clientTop-f.scrollTop,d.left+=f.clientLeft-f.scrollLeft);var g=b[0].getBoundingClientRect();return{width:g.width||b.prop("offsetWidth"),height:g.height||b.prop("offsetHeight"),top:c.top-d.top,left:c.left-d.left}},offset:function(c){var d=c[0].getBoundingClientRect();return{width:d.width||c.prop("offsetWidth"),height:d.height||c.prop("offsetHeight"),top:d.top+(b.pageYOffset||a[0].documentElement.scrollTop),left:d.left+(b.pageXOffset||a[0].documentElement.scrollLeft)}},positionElements:function(a,b,c,d){var e,f,g,h,i=c.split("-"),j=i[0],k=i[1]||"center";e=d?this.offset(a):this.position(a),f=b.prop("offsetWidth"),g=b.prop("offsetHeight");var l={center:function(){return e.left+e.width/2-f/2},left:function(){return e.left},right:function(){return e.left+e.width}},m={center:function(){return e.top+e.height/2-g/2},top:function(){return e.top},bottom:function(){return e.top+e.height}};switch(j){case"right":h={top:m[k](),left:l[j]()};break;case"left":h={top:m[k](),left:e.left-f};break;case"bottom":h={top:m[j](),left:l[k]()};break;default:h={top:e.top-g,left:l[k]()}}return h}}}]),angular.module("ui.bootstrap.datepicker",["ui.bootstrap.dateparser","ui.bootstrap.position"]).constant("datepickerConfig",{formatDay:"dd",formatMonth:"MMMM",formatYear:"yyyy",formatDayHeader:"EEE",formatDayTitle:"MMMM yyyy",formatMonthTitle:"yyyy",datepickerMode:"day",minMode:"day",maxMode:"year",showWeeks:!0,startingDay:0,yearRange:20,minDate:null,maxDate:null}).controller("DatepickerController",["$scope","$attrs","$parse","$interpolate","$timeout","$log","dateFilter","datepickerConfig",function(a,b,c,d,e,f,g,h){var i=this,j={$setViewValue:angular.noop};this.modes=["day","month","year"],angular.forEach(["formatDay","formatMonth","formatYear","formatDayHeader","formatDayTitle","formatMonthTitle","minMode","maxMode","showWeeks","startingDay","yearRange"],function(c,e){i[c]=angular.isDefined(b[c])?8>e?d(b[c])(a.$parent):a.$parent.$eval(b[c]):h[c]}),angular.forEach(["minDate","maxDate"],function(d){b[d]?a.$parent.$watch(c(b[d]),function(a){i[d]=a?new Date(a):null,i.refreshView()}):i[d]=h[d]?new Date(h[d]):null}),a.datepickerMode=a.datepickerMode||h.datepickerMode,a.uniqueId="datepicker-"+a.$id+"-"+Math.floor(1e4*Math.random()),this.activeDate=angular.isDefined(b.initDate)?a.$parent.$eval(b.initDate):new Date,a.isActive=function(b){return 0===i.compare(b.date,i.activeDate)?(a.activeDateId=b.uid,!0):!1},this.init=function(a){j=a,j.$render=function(){i.render()}},this.render=function(){if(j.$modelValue){var a=new Date(j.$modelValue),b=!isNaN(a);b?this.activeDate=a:f.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.'),j.$setValidity("date",b)}this.refreshView()},this.refreshView=function(){if(this.element){this._refreshView();var a=j.$modelValue?new Date(j.$modelValue):null;j.$setValidity("date-disabled",!a||this.element&&!this.isDisabled(a))}},this.createDateObject=function(a,b){var c=j.$modelValue?new Date(j.$modelValue):null;return{date:a,label:g(a,b),selected:c&&0===this.compare(a,c),disabled:this.isDisabled(a),current:0===this.compare(a,new Date)}},this.isDisabled=function(c){return this.minDate&&this.compare(c,this.minDate)<0||this.maxDate&&this.compare(c,this.maxDate)>0||b.dateDisabled&&a.dateDisabled({date:c,mode:a.datepickerMode})},this.split=function(a,b){for(var c=[];a.length>0;)c.push(a.splice(0,b));return c},a.select=function(b){if(a.datepickerMode===i.minMode){var c=j.$modelValue?new Date(j.$modelValue):new Date(0,0,0,0,0,0,0);c.setFullYear(b.getFullYear(),b.getMonth(),b.getDate()),j.$setViewValue(c),j.$render()}else i.activeDate=b,a.datepickerMode=i.modes[i.modes.indexOf(a.datepickerMode)-1]},a.move=function(a){var b=i.activeDate.getFullYear()+a*(i.step.years||0),c=i.activeDate.getMonth()+a*(i.step.months||0);i.activeDate.setFullYear(b,c,1),i.refreshView()},a.toggleMode=function(b){b=b||1,a.datepickerMode===i.maxMode&&1===b||a.datepickerMode===i.minMode&&-1===b||(a.datepickerMode=i.modes[i.modes.indexOf(a.datepickerMode)+b])},a.keys={13:"enter",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down"};var k=function(){e(function(){i.element[0].focus()},0,!1)};a.$on("datepicker.focus",k),a.keydown=function(b){var c=a.keys[b.which];if(c&&!b.shiftKey&&!b.altKey)if(b.preventDefault(),b.stopPropagation(),"enter"===c||"space"===c){if(i.isDisabled(i.activeDate))return;a.select(i.activeDate),k()}else!b.ctrlKey||"up"!==c&&"down"!==c?(i.handleKeyDown(c,b),i.refreshView()):(a.toggleMode("up"===c?1:-1),k())}}]).directive("datepicker",function(){return{restrict:"EA",replace:!0,templateUrl:"template/datepicker/datepicker.html",scope:{datepickerMode:"=?",dateDisabled:"&"},require:["datepicker","?^ngModel"],controller:"DatepickerController",link:function(a,b,c,d){var e=d[0],f=d[1];f&&e.init(f)}}}).directive("daypicker",["dateFilter",function(a){return{restrict:"EA",replace:!0,templateUrl:"template/datepicker/day.html",require:"^datepicker",link:function(b,c,d,e){function f(a,b){return 1!==b||a%4!==0||a%100===0&&a%400!==0?i[b]:29}function g(a,b){var c=new Array(b),d=new Date(a),e=0;for(d.setHours(12);b>e;)c[e++]=new Date(d),d.setDate(d.getDate()+1);return c}function h(a){var b=new Date(a);b.setDate(b.getDate()+4-(b.getDay()||7));var c=b.getTime();return b.setMonth(0),b.setDate(1),Math.floor(Math.round((c-b)/864e5)/7)+1}b.showWeeks=e.showWeeks,e.step={months:1},e.element=c;var i=[31,28,31,30,31,30,31,31,30,31,30,31];e._refreshView=function(){var c=e.activeDate.getFullYear(),d=e.activeDate.getMonth(),f=new Date(c,d,1),i=e.startingDay-f.getDay(),j=i>0?7-i:-i,k=new Date(f);j>0&&k.setDate(-j+1);for(var l=g(k,42),m=0;42>m;m++)l[m]=angular.extend(e.createDateObject(l[m],e.formatDay),{secondary:l[m].getMonth()!==d,uid:b.uniqueId+"-"+m});b.labels=new Array(7);for(var n=0;7>n;n++)b.labels[n]={abbr:a(l[n].date,e.formatDayHeader),full:a(l[n].date,"EEEE")};if(b.title=a(e.activeDate,e.formatDayTitle),b.rows=e.split(l,7),b.showWeeks){b.weekNumbers=[];for(var o=h(b.rows[0][0].date),p=b.rows.length;b.weekNumbers.push(o++)<p;);}},e.compare=function(a,b){return new Date(a.getFullYear(),a.getMonth(),a.getDate())-new Date(b.getFullYear(),b.getMonth(),b.getDate())},e.handleKeyDown=function(a){var b=e.activeDate.getDate();if("left"===a)b-=1;else if("up"===a)b-=7;else if("right"===a)b+=1;else if("down"===a)b+=7;else if("pageup"===a||"pagedown"===a){var c=e.activeDate.getMonth()+("pageup"===a?-1:1);e.activeDate.setMonth(c,1),b=Math.min(f(e.activeDate.getFullYear(),e.activeDate.getMonth()),b)}else"home"===a?b=1:"end"===a&&(b=f(e.activeDate.getFullYear(),e.activeDate.getMonth()));e.activeDate.setDate(b)},e.refreshView()}}}]).directive("monthpicker",["dateFilter",function(a){return{restrict:"EA",replace:!0,templateUrl:"template/datepicker/month.html",require:"^datepicker",link:function(b,c,d,e){e.step={years:1},e.element=c,e._refreshView=function(){for(var c=new Array(12),d=e.activeDate.getFullYear(),f=0;12>f;f++)c[f]=angular.extend(e.createDateObject(new Date(d,f,1),e.formatMonth),{uid:b.uniqueId+"-"+f});b.title=a(e.activeDate,e.formatMonthTitle),b.rows=e.split(c,3)},e.compare=function(a,b){return new Date(a.getFullYear(),a.getMonth())-new Date(b.getFullYear(),b.getMonth())},e.handleKeyDown=function(a){var b=e.activeDate.getMonth();if("left"===a)b-=1;else if("up"===a)b-=3;else if("right"===a)b+=1;else if("down"===a)b+=3;else if("pageup"===a||"pagedown"===a){var c=e.activeDate.getFullYear()+("pageup"===a?-1:1);e.activeDate.setFullYear(c)}else"home"===a?b=0:"end"===a&&(b=11);e.activeDate.setMonth(b)},e.refreshView()}}}]).directive("yearpicker",["dateFilter",function(){return{restrict:"EA",replace:!0,templateUrl:"template/datepicker/year.html",require:"^datepicker",link:function(a,b,c,d){function e(a){return parseInt((a-1)/f,10)*f+1}var f=d.yearRange;d.step={years:f},d.element=b,d._refreshView=function(){for(var b=new Array(f),c=0,g=e(d.activeDate.getFullYear());f>c;c++)b[c]=angular.extend(d.createDateObject(new Date(g+c,0,1),d.formatYear),{uid:a.uniqueId+"-"+c});a.title=[b[0].label,b[f-1].label].join(" - "),a.rows=d.split(b,5)},d.compare=function(a,b){return a.getFullYear()-b.getFullYear()},d.handleKeyDown=function(a){var b=d.activeDate.getFullYear();"left"===a?b-=1:"up"===a?b-=5:"right"===a?b+=1:"down"===a?b+=5:"pageup"===a||"pagedown"===a?b+=("pageup"===a?-1:1)*d.step.years:"home"===a?b=e(d.activeDate.getFullYear()):"end"===a&&(b=e(d.activeDate.getFullYear())+f-1),d.activeDate.setFullYear(b)},d.refreshView()}}}]).constant("datepickerPopupConfig",{datepickerPopup:"yyyy-MM-dd",currentText:"Today",clearText:"Clear",closeText:"Done",closeOnDateSelection:!0,appendToBody:!1,showButtonBar:!0}).directive("datepickerPopup",["$compile","$parse","$document","$position","dateFilter","dateParser","datepickerPopupConfig",function(a,b,c,d,e,f,g){return{restrict:"EA",require:"ngModel",scope:{isOpen:"=?",currentText:"@",clearText:"@",closeText:"@",dateDisabled:"&"},link:function(h,i,j,k){function l(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}function m(a){if(a){if(angular.isDate(a)&&!isNaN(a))return k.$setValidity("date",!0),a;if(angular.isString(a)){var b=f.parse(a,n)||new Date(a);return isNaN(b)?void k.$setValidity("date",!1):(k.$setValidity("date",!0),b)}return void k.$setValidity("date",!1)}return k.$setValidity("date",!0),null}var n,o=angular.isDefined(j.closeOnDateSelection)?h.$parent.$eval(j.closeOnDateSelection):g.closeOnDateSelection,p=angular.isDefined(j.datepickerAppendToBody)?h.$parent.$eval(j.datepickerAppendToBody):g.appendToBody;h.showButtonBar=angular.isDefined(j.showButtonBar)?h.$parent.$eval(j.showButtonBar):g.showButtonBar,h.getText=function(a){return h[a+"Text"]||g[a+"Text"]},j.$observe("datepickerPopup",function(a){n=a||g.datepickerPopup,k.$render()});var q=angular.element("<div datepicker-popup-wrap><div datepicker></div></div>");q.attr({"ng-model":"date","ng-change":"dateSelection()"});var r=angular.element(q.children()[0]);j.datepickerOptions&&angular.forEach(h.$parent.$eval(j.datepickerOptions),function(a,b){r.attr(l(b),a)}),angular.forEach(["minDate","maxDate"],function(a){j[a]&&(h.$parent.$watch(b(j[a]),function(b){h[a]=b}),r.attr(l(a),a))}),j.dateDisabled&&r.attr("date-disabled","dateDisabled({ date: date, mode: mode })"),k.$parsers.unshift(m),h.dateSelection=function(a){angular.isDefined(a)&&(h.date=a),k.$setViewValue(h.date),k.$render(),o&&(h.isOpen=!1,i[0].focus())},i.bind("input change keyup",function(){h.$apply(function(){h.date=k.$modelValue})}),k.$render=function(){var a=k.$viewValue?e(k.$viewValue,n):"";i.val(a),h.date=m(k.$modelValue)};var s=function(a){h.isOpen&&a.target!==i[0]&&h.$apply(function(){h.isOpen=!1})},t=function(a){h.keydown(a)};i.bind("keydown",t),h.keydown=function(a){27===a.which?(a.preventDefault(),a.stopPropagation(),h.close()):40!==a.which||h.isOpen||(h.isOpen=!0)},h.$watch("isOpen",function(a){a?(h.$broadcast("datepicker.focus"),h.position=p?d.offset(i):d.position(i),h.position.top=h.position.top+i.prop("offsetHeight"),c.bind("click",s)):c.unbind("click",s)}),h.select=function(a){if("today"===a){var b=new Date;angular.isDate(k.$modelValue)?(a=new Date(k.$modelValue),a.setFullYear(b.getFullYear(),b.getMonth(),b.getDate())):a=new Date(b.setHours(0,0,0,0))}h.dateSelection(a)},h.close=function(){h.isOpen=!1,i[0].focus()};var u=a(q)(h);p?c.find("body").append(u):i.after(u),h.$on("$destroy",function(){u.remove(),i.unbind("keydown",t),c.unbind("click",s)})}}}]).directive("datepickerPopupWrap",function(){return{restrict:"EA",replace:!0,transclude:!0,templateUrl:"template/datepicker/popup.html",link:function(a,b){b.bind("click",function(a){a.preventDefault(),a.stopPropagation()})}}}),angular.module("ui.bootstrap.dropdown",[]).constant("dropdownConfig",{openClass:"open"}).service("dropdownService",["$document",function(a){var b=null;this.open=function(e){b||(a.bind("click",c),a.bind("keydown",d)),b&&b!==e&&(b.isOpen=!1),b=e},this.close=function(e){b===e&&(b=null,a.unbind("click",c),a.unbind("keydown",d))};var c=function(a){a&&a.isDefaultPrevented()||b.$apply(function(){b.isOpen=!1})},d=function(a){27===a.which&&(b.focusToggleElement(),c())}}]).controller("DropdownController",["$scope","$attrs","$parse","dropdownConfig","dropdownService","$animate",function(a,b,c,d,e,f){var g,h=this,i=a.$new(),j=d.openClass,k=angular.noop,l=b.onToggle?c(b.onToggle):angular.noop;this.init=function(d){h.$element=d,b.isOpen&&(g=c(b.isOpen),k=g.assign,a.$watch(g,function(a){i.isOpen=!!a}))},this.toggle=function(a){return i.isOpen=arguments.length?!!a:!i.isOpen},this.isOpen=function(){return i.isOpen},i.focusToggleElement=function(){h.toggleElement&&h.toggleElement[0].focus()},i.$watch("isOpen",function(b,c){f[b?"addClass":"removeClass"](h.$element,j),b?(i.focusToggleElement(),e.open(i)):e.close(i),k(a,b),angular.isDefined(b)&&b!==c&&l(a,{open:!!b})}),a.$on("$locationChangeSuccess",function(){i.isOpen=!1}),a.$on("$destroy",function(){i.$destroy()})}]).directive("dropdown",function(){return{restrict:"CA",controller:"DropdownController",link:function(a,b,c,d){d.init(b)}}}).directive("dropdownToggle",function(){return{restrict:"CA",require:"?^dropdown",link:function(a,b,c,d){if(d){d.toggleElement=b;var e=function(e){e.preventDefault(),b.hasClass("disabled")||c.disabled||a.$apply(function(){d.toggle()})};b.bind("click",e),b.attr({"aria-haspopup":!0,"aria-expanded":!1}),a.$watch(d.isOpen,function(a){b.attr("aria-expanded",!!a)}),a.$on("$destroy",function(){b.unbind("click",e)})}}}}),angular.module("ui.bootstrap.modal",["ui.bootstrap.transition"]).factory("$$stackedMap",function(){return{createNew:function(){var a=[];return{add:function(b,c){a.push({key:b,value:c})},get:function(b){for(var c=0;c<a.length;c++)if(b==a[c].key)return a[c]},keys:function(){for(var b=[],c=0;c<a.length;c++)b.push(a[c].key);return b},top:function(){return a[a.length-1]},remove:function(b){for(var c=-1,d=0;d<a.length;d++)if(b==a[d].key){c=d;break}return a.splice(c,1)[0]},removeTop:function(){return a.splice(a.length-1,1)[0]},length:function(){return a.length}}}}}).directive("modalBackdrop",["$timeout",function(a){return{restrict:"EA",replace:!0,templateUrl:"template/modal/backdrop.html",link:function(b){b.animate=!1,a(function(){b.animate=!0})}}}]).directive("modalWindow",["$modalStack","$timeout",function(a,b){return{restrict:"EA",scope:{index:"@",animate:"="},replace:!0,transclude:!0,templateUrl:function(a,b){return b.templateUrl||"template/modal/window.html"},link:function(c,d,e){d.addClass(e.windowClass||""),c.size=e.size,b(function(){c.animate=!0,d[0].focus()}),c.close=function(b){var c=a.getTop();c&&c.value.backdrop&&"static"!=c.value.backdrop&&b.target===b.currentTarget&&(b.preventDefault(),b.stopPropagation(),a.dismiss(c.key,"backdrop click"))}}}}]).factory("$modalStack",["$transition","$timeout","$document","$compile","$rootScope","$$stackedMap",function(a,b,c,d,e,f){function g(){for(var a=-1,b=n.keys(),c=0;c<b.length;c++)n.get(b[c]).value.backdrop&&(a=c);return a}function h(a){var b=c.find("body").eq(0),d=n.get(a).value;n.remove(a),j(d.modalDomEl,d.modalScope,300,function(){d.modalScope.$destroy(),b.toggleClass(m,n.length()>0),i()})}function i(){if(k&&-1==g()){var a=l;j(k,l,150,function(){a.$destroy(),a=null}),k=void 0,l=void 0}}function j(c,d,e,f){function g(){g.done||(g.done=!0,c.remove(),f&&f())}d.animate=!1;var h=a.transitionEndEventName;if(h){var i=b(g,e);c.bind(h,function(){b.cancel(i),g(),d.$apply()})}else b(g,0)}var k,l,m="modal-open",n=f.createNew(),o={};return e.$watch(g,function(a){l&&(l.index=a)}),c.bind("keydown",function(a){var b;27===a.which&&(b=n.top(),b&&b.value.keyboard&&(a.preventDefault(),e.$apply(function(){o.dismiss(b.key,"escape key press")})))}),o.open=function(a,b){n.add(a,{deferred:b.deferred,modalScope:b.scope,backdrop:b.backdrop,keyboard:b.keyboard});var f=c.find("body").eq(0),h=g();h>=0&&!k&&(l=e.$new(!0),l.index=h,k=d("<div modal-backdrop></div>")(l),f.append(k));var i=angular.element("<div modal-window></div>");i.attr({"template-url":b.windowTemplateUrl,"window-class":b.windowClass,size:b.size,index:n.length()-1,animate:"animate"}).html(b.content);var j=d(i)(b.scope);n.top().value.modalDomEl=j,f.append(j),f.addClass(m)},o.close=function(a,b){var c=n.get(a).value;c&&(c.deferred.resolve(b),h(a))},o.dismiss=function(a,b){var c=n.get(a).value;c&&(c.deferred.reject(b),h(a))},o.dismissAll=function(a){for(var b=this.getTop();b;)this.dismiss(b.key,a),b=this.getTop()},o.getTop=function(){return n.top()},o}]).provider("$modal",function(){var a={options:{backdrop:!0,keyboard:!0},$get:["$injector","$rootScope","$q","$http","$templateCache","$controller","$modalStack",function(b,c,d,e,f,g,h){function i(a){return a.template?d.when(a.template):e.get(a.templateUrl,{cache:f}).then(function(a){return a.data})}function j(a){var c=[];return angular.forEach(a,function(a){(angular.isFunction(a)||angular.isArray(a))&&c.push(d.when(b.invoke(a)))}),c}var k={};return k.open=function(b){var e=d.defer(),f=d.defer(),k={result:e.promise,opened:f.promise,close:function(a){h.close(k,a)},dismiss:function(a){h.dismiss(k,a)}};if(b=angular.extend({},a.options,b),b.resolve=b.resolve||{},!b.template&&!b.templateUrl)throw new Error("One of template or templateUrl options is required.");var l=d.all([i(b)].concat(j(b.resolve)));return l.then(function(a){var d=(b.scope||c).$new();d.$close=k.close,d.$dismiss=k.dismiss;var f,i={},j=1;b.controller&&(i.$scope=d,i.$modalInstance=k,angular.forEach(b.resolve,function(b,c){i[c]=a[j++]}),f=g(b.controller,i)),h.open(k,{scope:d,deferred:e,content:a[0],backdrop:b.backdrop,keyboard:b.keyboard,windowClass:b.windowClass,windowTemplateUrl:b.windowTemplateUrl,size:b.size})},function(a){e.reject(a)}),l.then(function(){f.resolve(!0)},function(){f.reject(!1)}),k},k}]};return a}),angular.module("ui.bootstrap.pagination",[]).controller("PaginationController",["$scope","$attrs","$parse",function(a,b,c){var d=this,e={$setViewValue:angular.noop},f=b.numPages?c(b.numPages).assign:angular.noop;this.init=function(f,g){e=f,this.config=g,e.$render=function(){d.render()},b.itemsPerPage?a.$parent.$watch(c(b.itemsPerPage),function(b){d.itemsPerPage=parseInt(b,10),a.totalPages=d.calculateTotalPages()}):this.itemsPerPage=g.itemsPerPage},this.calculateTotalPages=function(){var b=this.itemsPerPage<1?1:Math.ceil(a.totalItems/this.itemsPerPage);return Math.max(b||0,1)},this.render=function(){a.page=parseInt(e.$viewValue,10)||1},a.selectPage=function(b){a.page!==b&&b>0&&b<=a.totalPages&&(e.$setViewValue(b),e.$render())},a.getText=function(b){return a[b+"Text"]||d.config[b+"Text"]},a.noPrevious=function(){return 1===a.page},a.noNext=function(){return a.page===a.totalPages},a.$watch("totalItems",function(){a.totalPages=d.calculateTotalPages()}),a.$watch("totalPages",function(b){f(a.$parent,b),a.page>b?a.selectPage(b):e.$render()})}]).constant("paginationConfig",{itemsPerPage:10,boundaryLinks:!1,directionLinks:!0,firstText:"First",previousText:"Previous",nextText:"Next",lastText:"Last",rotate:!0}).directive("pagination",["$parse","paginationConfig",function(a,b){return{restrict:"EA",scope:{totalItems:"=",firstText:"@",previousText:"@",nextText:"@",lastText:"@"},require:["pagination","?ngModel"],controller:"PaginationController",templateUrl:"template/pagination/pagination.html",replace:!0,link:function(c,d,e,f){function g(a,b,c){return{number:a,text:b,active:c}}function h(a,b){var c=[],d=1,e=b,f=angular.isDefined(k)&&b>k;f&&(l?(d=Math.max(a-Math.floor(k/2),1),e=d+k-1,e>b&&(e=b,d=e-k+1)):(d=(Math.ceil(a/k)-1)*k+1,e=Math.min(d+k-1,b)));for(var h=d;e>=h;h++){var i=g(h,h,h===a);c.push(i)}if(f&&!l){if(d>1){var j=g(d-1,"...",!1);c.unshift(j)}if(b>e){var m=g(e+1,"...",!1);c.push(m)}}return c}var i=f[0],j=f[1];if(j){var k=angular.isDefined(e.maxSize)?c.$parent.$eval(e.maxSize):b.maxSize,l=angular.isDefined(e.rotate)?c.$parent.$eval(e.rotate):b.rotate;c.boundaryLinks=angular.isDefined(e.boundaryLinks)?c.$parent.$eval(e.boundaryLinks):b.boundaryLinks,c.directionLinks=angular.isDefined(e.directionLinks)?c.$parent.$eval(e.directionLinks):b.directionLinks,i.init(j,b),e.maxSize&&c.$parent.$watch(a(e.maxSize),function(a){k=parseInt(a,10),i.render()});var m=i.render;i.render=function(){m(),c.page>0&&c.page<=c.totalPages&&(c.pages=h(c.page,c.totalPages))}}}}}]).constant("pagerConfig",{itemsPerPage:10,previousText:"« Previous",nextText:"Next »",align:!0}).directive("pager",["pagerConfig",function(a){return{restrict:"EA",scope:{totalItems:"=",previousText:"@",nextText:"@"},require:["pager","?ngModel"],controller:"PaginationController",templateUrl:"template/pagination/pager.html",replace:!0,link:function(b,c,d,e){var f=e[0],g=e[1];g&&(b.align=angular.isDefined(d.align)?b.$parent.$eval(d.align):a.align,f.init(g,a))}}}]),angular.module("ui.bootstrap.tooltip",["ui.bootstrap.position","ui.bootstrap.bindHtml"]).provider("$tooltip",function(){function a(a){var b=/[A-Z]/g,c="-";
return a.replace(b,function(a,b){return(b?c:"")+a.toLowerCase()})}var b={placement:"top",animation:!0,popupDelay:0},c={mouseenter:"mouseleave",click:"click",focus:"blur"},d={};this.options=function(a){angular.extend(d,a)},this.setTriggers=function(a){angular.extend(c,a)},this.$get=["$window","$compile","$timeout","$parse","$document","$position","$interpolate",function(e,f,g,h,i,j,k){return function(e,l,m){function n(a){var b=a||o.trigger||m,d=c[b]||b;return{show:b,hide:d}}var o=angular.extend({},b,d),p=a(e),q=k.startSymbol(),r=k.endSymbol(),s="<div "+p+'-popup title="'+q+"tt_title"+r+'" content="'+q+"tt_content"+r+'" placement="'+q+"tt_placement"+r+'" animation="tt_animation" is-open="tt_isOpen"></div>';return{restrict:"EA",scope:!0,compile:function(){var a=f(s);return function(b,c,d){function f(){b.tt_isOpen?m():k()}function k(){(!y||b.$eval(d[l+"Enable"]))&&(b.tt_popupDelay?v||(v=g(p,b.tt_popupDelay,!1),v.then(function(a){a()})):p()())}function m(){b.$apply(function(){q()})}function p(){return v=null,u&&(g.cancel(u),u=null),b.tt_content?(r(),t.css({top:0,left:0,display:"block"}),w?i.find("body").append(t):c.after(t),z(),b.tt_isOpen=!0,b.$digest(),z):angular.noop}function q(){b.tt_isOpen=!1,g.cancel(v),v=null,b.tt_animation?u||(u=g(s,500)):s()}function r(){t&&s(),t=a(b,function(){}),b.$digest()}function s(){u=null,t&&(t.remove(),t=null)}var t,u,v,w=angular.isDefined(o.appendToBody)?o.appendToBody:!1,x=n(void 0),y=angular.isDefined(d[l+"Enable"]),z=function(){var a=j.positionElements(c,t,b.tt_placement,w);a.top+="px",a.left+="px",t.css(a)};b.tt_isOpen=!1,d.$observe(e,function(a){b.tt_content=a,!a&&b.tt_isOpen&&q()}),d.$observe(l+"Title",function(a){b.tt_title=a}),d.$observe(l+"Placement",function(a){b.tt_placement=angular.isDefined(a)?a:o.placement}),d.$observe(l+"PopupDelay",function(a){var c=parseInt(a,10);b.tt_popupDelay=isNaN(c)?o.popupDelay:c});var A=function(){c.unbind(x.show,k),c.unbind(x.hide,m)};d.$observe(l+"Trigger",function(a){A(),x=n(a),x.show===x.hide?c.bind(x.show,f):(c.bind(x.show,k),c.bind(x.hide,m))});var B=b.$eval(d[l+"Animation"]);b.tt_animation=angular.isDefined(B)?!!B:o.animation,d.$observe(l+"AppendToBody",function(a){w=angular.isDefined(a)?h(a)(b):w}),w&&b.$on("$locationChangeSuccess",function(){b.tt_isOpen&&q()}),b.$on("$destroy",function(){g.cancel(u),g.cancel(v),A(),s()})}}}}}]}).directive("tooltipPopup",function(){return{restrict:"EA",replace:!0,scope:{content:"@",placement:"@",animation:"&",isOpen:"&"},templateUrl:"template/tooltip/tooltip-popup.html"}}).directive("tooltip",["$tooltip",function(a){return a("tooltip","tooltip","mouseenter")}]).directive("tooltipHtmlUnsafePopup",function(){return{restrict:"EA",replace:!0,scope:{content:"@",placement:"@",animation:"&",isOpen:"&"},templateUrl:"template/tooltip/tooltip-html-unsafe-popup.html"}}).directive("tooltipHtmlUnsafe",["$tooltip",function(a){return a("tooltipHtmlUnsafe","tooltip","mouseenter")}]),angular.module("ui.bootstrap.popover",["ui.bootstrap.tooltip"]).directive("popoverPopup",function(){return{restrict:"EA",replace:!0,scope:{title:"@",content:"@",placement:"@",animation:"&",isOpen:"&"},templateUrl:"template/popover/popover.html"}}).directive("popover",["$tooltip",function(a){return a("popover","popover","click")}]),angular.module("ui.bootstrap.progressbar",[]).constant("progressConfig",{animate:!0,max:100}).controller("ProgressController",["$scope","$attrs","progressConfig",function(a,b,c){var d=this,e=angular.isDefined(b.animate)?a.$parent.$eval(b.animate):c.animate;this.bars=[],a.max=angular.isDefined(b.max)?a.$parent.$eval(b.max):c.max,this.addBar=function(b,c){e||c.css({transition:"none"}),this.bars.push(b),b.$watch("value",function(c){b.percent=+(100*c/a.max).toFixed(2)}),b.$on("$destroy",function(){c=null,d.removeBar(b)})},this.removeBar=function(a){this.bars.splice(this.bars.indexOf(a),1)}}]).directive("progress",function(){return{restrict:"EA",replace:!0,transclude:!0,controller:"ProgressController",require:"progress",scope:{},templateUrl:"template/progressbar/progress.html"}}).directive("bar",function(){return{restrict:"EA",replace:!0,transclude:!0,require:"^progress",scope:{value:"=",type:"@"},templateUrl:"template/progressbar/bar.html",link:function(a,b,c,d){d.addBar(a,b)}}}).directive("progressbar",function(){return{restrict:"EA",replace:!0,transclude:!0,controller:"ProgressController",scope:{value:"=",type:"@"},templateUrl:"template/progressbar/progressbar.html",link:function(a,b,c,d){d.addBar(a,angular.element(b.children()[0]))}}}),angular.module("ui.bootstrap.rating",[]).constant("ratingConfig",{max:5,stateOn:null,stateOff:null}).controller("RatingController",["$scope","$attrs","ratingConfig",function(a,b,c){var d={$setViewValue:angular.noop};this.init=function(e){d=e,d.$render=this.render,this.stateOn=angular.isDefined(b.stateOn)?a.$parent.$eval(b.stateOn):c.stateOn,this.stateOff=angular.isDefined(b.stateOff)?a.$parent.$eval(b.stateOff):c.stateOff;var f=angular.isDefined(b.ratingStates)?a.$parent.$eval(b.ratingStates):new Array(angular.isDefined(b.max)?a.$parent.$eval(b.max):c.max);a.range=this.buildTemplateObjects(f)},this.buildTemplateObjects=function(a){for(var b=0,c=a.length;c>b;b++)a[b]=angular.extend({index:b},{stateOn:this.stateOn,stateOff:this.stateOff},a[b]);return a},a.rate=function(b){!a.readonly&&b>=0&&b<=a.range.length&&(d.$setViewValue(b),d.$render())},a.enter=function(b){a.readonly||(a.value=b),a.onHover({value:b})},a.reset=function(){a.value=d.$viewValue,a.onLeave()},a.onKeydown=function(b){/(37|38|39|40)/.test(b.which)&&(b.preventDefault(),b.stopPropagation(),a.rate(a.value+(38===b.which||39===b.which?1:-1)))},this.render=function(){a.value=d.$viewValue}}]).directive("rating",function(){return{restrict:"EA",require:["rating","ngModel"],scope:{readonly:"=?",onHover:"&",onLeave:"&"},controller:"RatingController",templateUrl:"template/rating/rating.html",replace:!0,link:function(a,b,c,d){var e=d[0],f=d[1];f&&e.init(f)}}}),angular.module("ui.bootstrap.tabs",[]).controller("TabsetController",["$scope",function(a){var b=this,c=b.tabs=a.tabs=[];b.select=function(a){angular.forEach(c,function(b){b.active&&b!==a&&(b.active=!1,b.onDeselect())}),a.active=!0,a.onSelect()},b.addTab=function(a){c.push(a),1===c.length?a.active=!0:a.active&&b.select(a)},b.removeTab=function(a){var d=c.indexOf(a);if(a.active&&c.length>1){var e=d==c.length-1?d-1:d+1;b.select(c[e])}c.splice(d,1)}}]).directive("tabset",function(){return{restrict:"EA",transclude:!0,replace:!0,scope:{type:"@"},controller:"TabsetController",templateUrl:"template/tabs/tabset.html",link:function(a,b,c){a.vertical=angular.isDefined(c.vertical)?a.$parent.$eval(c.vertical):!1,a.justified=angular.isDefined(c.justified)?a.$parent.$eval(c.justified):!1}}}).directive("tab",["$parse",function(a){return{require:"^tabset",restrict:"EA",replace:!0,templateUrl:"template/tabs/tab.html",transclude:!0,scope:{active:"=?",heading:"@",onSelect:"&select",onDeselect:"&deselect"},controller:function(){},compile:function(b,c,d){return function(b,c,e,f){b.$watch("active",function(a){a&&f.select(b)}),b.disabled=!1,e.disabled&&b.$parent.$watch(a(e.disabled),function(a){b.disabled=!!a}),b.select=function(){b.disabled||(b.active=!0)},f.addTab(b),b.$on("$destroy",function(){f.removeTab(b)}),b.$transcludeFn=d}}}}]).directive("tabHeadingTransclude",[function(){return{restrict:"A",require:"^tab",link:function(a,b){a.$watch("headingElement",function(a){a&&(b.html(""),b.append(a))})}}}]).directive("tabContentTransclude",function(){function a(a){return a.tagName&&(a.hasAttribute("tab-heading")||a.hasAttribute("data-tab-heading")||"tab-heading"===a.tagName.toLowerCase()||"data-tab-heading"===a.tagName.toLowerCase())}return{restrict:"A",require:"^tabset",link:function(b,c,d){var e=b.$eval(d.tabContentTransclude);e.$transcludeFn(e.$parent,function(b){angular.forEach(b,function(b){a(b)?e.headingElement=b:c.append(b)})})}}}),angular.module("ui.bootstrap.timepicker",[]).constant("timepickerConfig",{hourStep:1,minuteStep:1,showMeridian:!0,meridians:null,readonlyInput:!1,mousewheel:!0}).controller("TimepickerController",["$scope","$attrs","$parse","$log","$locale","timepickerConfig",function(a,b,c,d,e,f){function g(){var b=parseInt(a.hours,10),c=a.showMeridian?b>0&&13>b:b>=0&&24>b;return c?(a.showMeridian&&(12===b&&(b=0),a.meridian===p[1]&&(b+=12)),b):void 0}function h(){var b=parseInt(a.minutes,10);return b>=0&&60>b?b:void 0}function i(a){return angular.isDefined(a)&&a.toString().length<2?"0"+a:a}function j(a){k(),o.$setViewValue(new Date(n)),l(a)}function k(){o.$setValidity("time",!0),a.invalidHours=!1,a.invalidMinutes=!1}function l(b){var c=n.getHours(),d=n.getMinutes();a.showMeridian&&(c=0===c||12===c?12:c%12),a.hours="h"===b?c:i(c),a.minutes="m"===b?d:i(d),a.meridian=n.getHours()<12?p[0]:p[1]}function m(a){var b=new Date(n.getTime()+6e4*a);n.setHours(b.getHours(),b.getMinutes()),j()}var n=new Date,o={$setViewValue:angular.noop},p=angular.isDefined(b.meridians)?a.$parent.$eval(b.meridians):f.meridians||e.DATETIME_FORMATS.AMPMS;this.init=function(c,d){o=c,o.$render=this.render;var e=d.eq(0),g=d.eq(1),h=angular.isDefined(b.mousewheel)?a.$parent.$eval(b.mousewheel):f.mousewheel;h&&this.setupMousewheelEvents(e,g),a.readonlyInput=angular.isDefined(b.readonlyInput)?a.$parent.$eval(b.readonlyInput):f.readonlyInput,this.setupInputEvents(e,g)};var q=f.hourStep;b.hourStep&&a.$parent.$watch(c(b.hourStep),function(a){q=parseInt(a,10)});var r=f.minuteStep;b.minuteStep&&a.$parent.$watch(c(b.minuteStep),function(a){r=parseInt(a,10)}),a.showMeridian=f.showMeridian,b.showMeridian&&a.$parent.$watch(c(b.showMeridian),function(b){if(a.showMeridian=!!b,o.$error.time){var c=g(),d=h();angular.isDefined(c)&&angular.isDefined(d)&&(n.setHours(c),j())}else l()}),this.setupMousewheelEvents=function(b,c){var d=function(a){a.originalEvent&&(a=a.originalEvent);var b=a.wheelDelta?a.wheelDelta:-a.deltaY;return a.detail||b>0};b.bind("mousewheel wheel",function(b){a.$apply(d(b)?a.incrementHours():a.decrementHours()),b.preventDefault()}),c.bind("mousewheel wheel",function(b){a.$apply(d(b)?a.incrementMinutes():a.decrementMinutes()),b.preventDefault()})},this.setupInputEvents=function(b,c){if(a.readonlyInput)return a.updateHours=angular.noop,void(a.updateMinutes=angular.noop);var d=function(b,c){o.$setViewValue(null),o.$setValidity("time",!1),angular.isDefined(b)&&(a.invalidHours=b),angular.isDefined(c)&&(a.invalidMinutes=c)};a.updateHours=function(){var a=g();angular.isDefined(a)?(n.setHours(a),j("h")):d(!0)},b.bind("blur",function(){!a.invalidHours&&a.hours<10&&a.$apply(function(){a.hours=i(a.hours)})}),a.updateMinutes=function(){var a=h();angular.isDefined(a)?(n.setMinutes(a),j("m")):d(void 0,!0)},c.bind("blur",function(){!a.invalidMinutes&&a.minutes<10&&a.$apply(function(){a.minutes=i(a.minutes)})})},this.render=function(){var a=o.$modelValue?new Date(o.$modelValue):null;isNaN(a)?(o.$setValidity("time",!1),d.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')):(a&&(n=a),k(),l())},a.incrementHours=function(){m(60*q)},a.decrementHours=function(){m(60*-q)},a.incrementMinutes=function(){m(r)},a.decrementMinutes=function(){m(-r)},a.toggleMeridian=function(){m(720*(n.getHours()<12?1:-1))}}]).directive("timepicker",function(){return{restrict:"EA",require:["timepicker","?^ngModel"],controller:"TimepickerController",replace:!0,scope:{},templateUrl:"template/timepicker/timepicker.html",link:function(a,b,c,d){var e=d[0],f=d[1];f&&e.init(f,b.find("input"))}}}),angular.module("ui.bootstrap.typeahead",["ui.bootstrap.position","ui.bootstrap.bindHtml"]).factory("typeaheadParser",["$parse",function(a){var b=/^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;return{parse:function(c){var d=c.match(b);if(!d)throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "'+c+'".');return{itemName:d[3],source:a(d[4]),viewMapper:a(d[2]||d[1]),modelMapper:a(d[1])}}}}]).directive("typeahead",["$compile","$parse","$q","$timeout","$document","$position","typeaheadParser",function(a,b,c,d,e,f,g){var h=[9,13,27,38,40];return{require:"ngModel",link:function(i,j,k,l){var m,n=i.$eval(k.typeaheadMinLength)||1,o=i.$eval(k.typeaheadWaitMs)||0,p=i.$eval(k.typeaheadEditable)!==!1,q=b(k.typeaheadLoading).assign||angular.noop,r=b(k.typeaheadOnSelect),s=k.typeaheadInputFormatter?b(k.typeaheadInputFormatter):void 0,t=k.typeaheadAppendToBody?i.$eval(k.typeaheadAppendToBody):!1,u=b(k.ngModel).assign,v=g.parse(k.typeahead),w=i.$new();i.$on("$destroy",function(){w.$destroy()});var x="typeahead-"+w.$id+"-"+Math.floor(1e4*Math.random());j.attr({"aria-autocomplete":"list","aria-expanded":!1,"aria-owns":x});var y=angular.element("<div typeahead-popup></div>");y.attr({id:x,matches:"matches",active:"activeIdx",select:"select(activeIdx)",query:"query",position:"position"}),angular.isDefined(k.typeaheadTemplateUrl)&&y.attr("template-url",k.typeaheadTemplateUrl);var z=function(){w.matches=[],w.activeIdx=-1,j.attr("aria-expanded",!1)},A=function(a){return x+"-option-"+a};w.$watch("activeIdx",function(a){0>a?j.removeAttr("aria-activedescendant"):j.attr("aria-activedescendant",A(a))});var B=function(a){var b={$viewValue:a};q(i,!0),c.when(v.source(i,b)).then(function(c){var d=a===l.$viewValue;if(d&&m)if(c.length>0){w.activeIdx=0,w.matches.length=0;for(var e=0;e<c.length;e++)b[v.itemName]=c[e],w.matches.push({id:A(e),label:v.viewMapper(w,b),model:c[e]});w.query=a,w.position=t?f.offset(j):f.position(j),w.position.top=w.position.top+j.prop("offsetHeight"),j.attr("aria-expanded",!0)}else z();d&&q(i,!1)},function(){z(),q(i,!1)})};z(),w.query=void 0;var C;l.$parsers.unshift(function(a){return m=!0,a&&a.length>=n?o>0?(C&&d.cancel(C),C=d(function(){B(a)},o)):B(a):(q(i,!1),z()),p?a:a?void l.$setValidity("editable",!1):(l.$setValidity("editable",!0),a)}),l.$formatters.push(function(a){var b,c,d={};return s?(d.$model=a,s(i,d)):(d[v.itemName]=a,b=v.viewMapper(i,d),d[v.itemName]=void 0,c=v.viewMapper(i,d),b!==c?b:a)}),w.select=function(a){var b,c,e={};e[v.itemName]=c=w.matches[a].model,b=v.modelMapper(i,e),u(i,b),l.$setValidity("editable",!0),r(i,{$item:c,$model:b,$label:v.viewMapper(i,e)}),z(),d(function(){j[0].focus()},0,!1)},j.bind("keydown",function(a){0!==w.matches.length&&-1!==h.indexOf(a.which)&&(a.preventDefault(),40===a.which?(w.activeIdx=(w.activeIdx+1)%w.matches.length,w.$digest()):38===a.which?(w.activeIdx=(w.activeIdx?w.activeIdx:w.matches.length)-1,w.$digest()):13===a.which||9===a.which?w.$apply(function(){w.select(w.activeIdx)}):27===a.which&&(a.stopPropagation(),z(),w.$digest()))}),j.bind("blur",function(){m=!1});var D=function(a){j[0]!==a.target&&(z(),w.$digest())};e.bind("click",D),i.$on("$destroy",function(){e.unbind("click",D)});var E=a(y)(w);t?e.find("body").append(E):j.after(E)}}}]).directive("typeaheadPopup",function(){return{restrict:"EA",scope:{matches:"=",query:"=",active:"=",position:"=",select:"&"},replace:!0,templateUrl:"template/typeahead/typeahead-popup.html",link:function(a,b,c){a.templateUrl=c.templateUrl,a.isOpen=function(){return a.matches.length>0},a.isActive=function(b){return a.active==b},a.selectActive=function(b){a.active=b},a.selectMatch=function(b){a.select({activeIdx:b})}}}}).directive("typeaheadMatch",["$http","$templateCache","$compile","$parse",function(a,b,c,d){return{restrict:"EA",scope:{index:"=",match:"=",query:"="},link:function(e,f,g){var h=d(g.templateUrl)(e.$parent)||"template/typeahead/typeahead-match.html";a.get(h,{cache:b}).success(function(a){f.replaceWith(c(a.trim())(e))})}}}]).filter("typeaheadHighlight",function(){function a(a){return a.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")}return function(b,c){return c?(""+b).replace(new RegExp(a(c),"gi"),"<strong>$&</strong>"):b}}),angular.module("template/accordion/accordion-group.html",[]).run(["$templateCache",function(a){a.put("template/accordion/accordion-group.html",'<div class="panel panel-default">\n  <div class="panel-heading">\n    <h4 class="panel-title">\n      <a class="accordion-toggle" ng-click="toggleOpen()" accordion-transclude="heading"><span ng-class="{\'text-muted\': isDisabled}">{{heading}}</span></a>\n    </h4>\n  </div>\n  <div class="panel-collapse" collapse="!isOpen">\n	  <div class="panel-body" ng-transclude></div>\n  </div>\n</div>')}]),angular.module("template/accordion/accordion.html",[]).run(["$templateCache",function(a){a.put("template/accordion/accordion.html",'<div class="panel-group" ng-transclude></div>')}]),angular.module("template/alert/alert.html",[]).run(["$templateCache",function(a){a.put("template/alert/alert.html",'<div class="alert" ng-class="{\'alert-{{type || \'warning\'}}\': true, \'alert-dismissable\': closeable}" role="alert">\n    <button ng-show="closeable" type="button" class="close" ng-click="close()">\n        <span aria-hidden="true">&times;</span>\n        <span class="sr-only">Close</span>\n    </button>\n    <div ng-transclude></div>\n</div>\n')}]),angular.module("template/carousel/carousel.html",[]).run(["$templateCache",function(a){a.put("template/carousel/carousel.html",'<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel" ng-swipe-right="prev()" ng-swipe-left="next()">\n    <ol class="carousel-indicators" ng-show="slides.length > 1">\n        <li ng-repeat="slide in slides track by $index" ng-class="{active: isActive(slide)}" ng-click="select(slide)"></li>\n    </ol>\n    <div class="carousel-inner" ng-transclude></div>\n    <a class="left carousel-control" ng-click="prev()" ng-show="slides.length > 1"><span class="glyphicon glyphicon-chevron-left"></span></a>\n    <a class="right carousel-control" ng-click="next()" ng-show="slides.length > 1"><span class="glyphicon glyphicon-chevron-right"></span></a>\n</div>\n')}]),angular.module("template/carousel/slide.html",[]).run(["$templateCache",function(a){a.put("template/carousel/slide.html","<div ng-class=\"{\n    'active': leaving || (active && !entering),\n    'prev': (next || active) && direction=='prev',\n    'next': (next || active) && direction=='next',\n    'right': direction=='prev',\n    'left': direction=='next'\n  }\" class=\"item text-center\" ng-transclude></div>\n")}]),angular.module("template/datepicker/datepicker.html",[]).run(["$templateCache",function(a){a.put("template/datepicker/datepicker.html",'<div ng-switch="datepickerMode" role="application" ng-keydown="keydown($event)">\n  <daypicker ng-switch-when="day" tabindex="0"></daypicker>\n  <monthpicker ng-switch-when="month" tabindex="0"></monthpicker>\n  <yearpicker ng-switch-when="year" tabindex="0"></yearpicker>\n</div>')}]),angular.module("template/datepicker/day.html",[]).run(["$templateCache",function(a){a.put("template/datepicker/day.html",'<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="{{5 + showWeeks}}"><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n    <tr>\n      <th ng-show="showWeeks" class="text-center"></th>\n      <th ng-repeat="label in labels track by $index" class="text-center"><small aria-label="{{label.full}}">{{label.abbr}}</small></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-show="showWeeks" class="text-center h6"><em>{{ weekNumbers[$index] }}</em></td>\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default btn-sm" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-muted\': dt.secondary, \'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')}]),angular.module("template/datepicker/month.html",[]).run(["$templateCache",function(a){a.put("template/datepicker/month.html",'<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')}]),angular.module("template/datepicker/popup.html",[]).run(["$templateCache",function(a){a.put("template/datepicker/popup.html",'<ul class="dropdown-menu" ng-style="{display: (isOpen && \'block\') || \'none\', top: position.top+\'px\', left: position.left+\'px\'}" ng-keydown="keydown($event)">\n	<li ng-transclude></li>\n	<li ng-if="showButtonBar" style="padding:10px 9px 2px">\n		<span class="btn-group">\n			<button type="button" class="btn btn-sm btn-info" ng-click="select(\'today\')">{{ getText(\'current\') }}</button>\n			<button type="button" class="btn btn-sm btn-danger" ng-click="select(null)">{{ getText(\'clear\') }}</button>\n		</span>\n		<button type="button" class="btn btn-sm btn-success pull-right" ng-click="close()">{{ getText(\'close\') }}</button>\n	</li>\n</ul>\n')}]),angular.module("template/datepicker/year.html",[]).run(["$templateCache",function(a){a.put("template/datepicker/year.html",'<table role="grid" aria-labelledby="{{uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left" ng-click="move(-1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-left"></i></button></th>\n      <th colspan="3"><button id="{{uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm" ng-click="toggleMode()" tabindex="-1" style="width:100%;"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right" ng-click="move(1)" tabindex="-1"><i class="glyphicon glyphicon-chevron-right"></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat="row in rows track by $index">\n      <td ng-repeat="dt in row track by dt.date" class="text-center" role="gridcell" id="{{dt.uid}}" aria-disabled="{{!!dt.disabled}}">\n        <button type="button" style="width:100%;" class="btn btn-default" ng-class="{\'btn-info\': dt.selected, active: isActive(dt)}" ng-click="select(dt.date)" ng-disabled="dt.disabled" tabindex="-1"><span ng-class="{\'text-info\': dt.current}">{{dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')}]),angular.module("template/modal/backdrop.html",[]).run(["$templateCache",function(a){a.put("template/modal/backdrop.html",'<div class="modal-backdrop fade"\n     ng-class="{in: animate}"\n     ng-style="{\'z-index\': 1040 + (index && 1 || 0) + index*10}"\n></div>\n')}]),angular.module("template/modal/window.html",[]).run(["$templateCache",function(a){a.put("template/modal/window.html",'<div tabindex="-1" role="dialog" class="modal fade" ng-class="{in: animate}" ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}" ng-click="close($event)">\n    <div class="modal-dialog" ng-class="{\'modal-sm\': size == \'sm\', \'modal-lg\': size == \'lg\'}"><div class="modal-content" ng-transclude></div></div>\n</div>')}]),angular.module("template/pagination/pager.html",[]).run(["$templateCache",function(a){a.put("template/pagination/pager.html",'<ul class="pager">\n  <li ng-class="{disabled: noPrevious(), previous: align}"><a href ng-click="selectPage(page - 1)">{{getText(\'previous\')}}</a></li>\n  <li ng-class="{disabled: noNext(), next: align}"><a href ng-click="selectPage(page + 1)">{{getText(\'next\')}}</a></li>\n</ul>')}]),angular.module("template/pagination/pagination.html",[]).run(["$templateCache",function(a){a.put("template/pagination/pagination.html",'<ul class="pagination">\n  <li ng-if="boundaryLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(1)">{{getText(\'first\')}}</a></li>\n  <li ng-if="directionLinks" ng-class="{disabled: noPrevious()}"><a href ng-click="selectPage(page - 1)">{{getText(\'previous\')}}</a></li>\n  <li ng-repeat="page in pages track by $index" ng-class="{active: page.active}"><a href ng-click="selectPage(page.number)">{{page.text}}</a></li>\n  <li ng-if="directionLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(page + 1)">{{getText(\'next\')}}</a></li>\n  <li ng-if="boundaryLinks" ng-class="{disabled: noNext()}"><a href ng-click="selectPage(totalPages)">{{getText(\'last\')}}</a></li>\n</ul>')}]),angular.module("template/tooltip/tooltip-html-unsafe-popup.html",[]).run(["$templateCache",function(a){a.put("template/tooltip/tooltip-html-unsafe-popup.html",'<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" bind-html-unsafe="content"></div>\n</div>\n')}]),angular.module("template/tooltip/tooltip-popup.html",[]).run(["$templateCache",function(a){a.put("template/tooltip/tooltip-popup.html",'<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="tooltip-arrow"></div>\n  <div class="tooltip-inner" ng-bind="content"></div>\n</div>\n')}]),angular.module("template/popover/popover.html",[]).run(["$templateCache",function(a){a.put("template/popover/popover.html",'<div class="popover {{placement}}" ng-class="{ in: isOpen(), fade: animation() }">\n  <div class="arrow"></div>\n\n  <div class="popover-inner">\n      <h3 class="popover-title" ng-bind="title" ng-show="title"></h3>\n      <div class="popover-content" ng-bind="content"></div>\n  </div>\n</div>\n')}]),angular.module("template/progressbar/bar.html",[]).run(["$templateCache",function(a){a.put("template/progressbar/bar.html",'<div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: percent + \'%\'}" aria-valuetext="{{percent | number:0}}%" ng-transclude></div>')}]),angular.module("template/progressbar/progress.html",[]).run(["$templateCache",function(a){a.put("template/progressbar/progress.html",'<div class="progress" ng-transclude></div>')}]),angular.module("template/progressbar/progressbar.html",[]).run(["$templateCache",function(a){a.put("template/progressbar/progressbar.html",'<div class="progress">\n  <div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: percent + \'%\'}" aria-valuetext="{{percent | number:0}}%" ng-transclude></div>\n</div>')}]),angular.module("template/rating/rating.html",[]).run(["$templateCache",function(a){a.put("template/rating/rating.html",'<span ng-mouseleave="reset()" ng-keydown="onKeydown($event)" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="{{range.length}}" aria-valuenow="{{value}}">\n    <i ng-repeat="r in range track by $index" ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" class="glyphicon" ng-class="$index < value && (r.stateOn || \'glyphicon-star\') || (r.stateOff || \'glyphicon-star-empty\')">\n        <span class="sr-only">({{ $index < value ? \'*\' : \' \' }})</span>\n    </i>\n</span>')}]),angular.module("template/tabs/tab.html",[]).run(["$templateCache",function(a){a.put("template/tabs/tab.html",'<li ng-class="{active: active, disabled: disabled}">\n  <a ng-click="select()" tab-heading-transclude>{{heading}}</a>\n</li>\n')}]),angular.module("template/tabs/tabset-titles.html",[]).run(["$templateCache",function(a){a.put("template/tabs/tabset-titles.html","<ul class=\"nav {{type && 'nav-' + type}}\" ng-class=\"{'nav-stacked': vertical}\">\n</ul>\n")}]),angular.module("template/tabs/tabset.html",[]).run(["$templateCache",function(a){a.put("template/tabs/tabset.html",'\n<div>\n  <ul class="nav nav-{{type || \'tabs\'}}" ng-class="{\'nav-stacked\': vertical, \'nav-justified\': justified}" ng-transclude></ul>\n  <div class="tab-content">\n    <div class="tab-pane" \n         ng-repeat="tab in tabs" \n         ng-class="{active: tab.active}"\n         tab-content-transclude="tab">\n    </div>\n  </div>\n</div>\n')}]),angular.module("template/timepicker/timepicker.html",[]).run(["$templateCache",function(a){a.put("template/timepicker/timepicker.html",'<table>\n	<tbody>\n		<tr class="text-center">\n			<td><a ng-click="incrementHours()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n			<td>&nbsp;</td>\n			<td><a ng-click="incrementMinutes()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n			<td ng-show="showMeridian"></td>\n		</tr>\n		<tr>\n			<td style="width:50px;" class="form-group" ng-class="{\'has-error\': invalidHours}">\n				<input type="text" ng-model="hours" ng-change="updateHours()" class="form-control text-center" ng-mousewheel="incrementHours()" ng-readonly="readonlyInput" maxlength="2">\n			</td>\n			<td>:</td>\n			<td style="width:50px;" class="form-group" ng-class="{\'has-error\': invalidMinutes}">\n				<input type="text" ng-model="minutes" ng-change="updateMinutes()" class="form-control text-center" ng-readonly="readonlyInput" maxlength="2">\n			</td>\n			<td ng-show="showMeridian"><button type="button" class="btn btn-default text-center" ng-click="toggleMeridian()">{{meridian}}</button></td>\n		</tr>\n		<tr class="text-center">\n			<td><a ng-click="decrementHours()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n			<td>&nbsp;</td>\n			<td><a ng-click="decrementMinutes()" class="btn btn-link"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n			<td ng-show="showMeridian"></td>\n		</tr>\n	</tbody>\n</table>\n')}]),angular.module("template/typeahead/typeahead-match.html",[]).run(["$templateCache",function(a){a.put("template/typeahead/typeahead-match.html",'<a tabindex="-1" bind-html-unsafe="match.label | typeaheadHighlight:query"></a>')}]),angular.module("template/typeahead/typeahead-popup.html",[]).run(["$templateCache",function(a){a.put("template/typeahead/typeahead-popup.html",'<ul class="dropdown-menu" ng-if="isOpen()" ng-style="{top: position.top+\'px\', left: position.left+\'px\'}" style="display: block;" role="listbox" aria-hidden="{{!isOpen()}}">\n    <li ng-repeat="match in matches track by $index" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index)" role="option" id="{{match.id}}">\n        <div typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>\n    </li>\n</ul>')
}]);/*! ui-grid - v3.0.0-rc.12 - 2014-10-08
* Copyright (c) 2014 ; License: MIT */
!function(){"use strict";angular.module("ui.grid.i18n",[]),angular.module("ui.grid",["ui.grid.i18n"])}(),function(){"use strict";angular.module("ui.grid").constant("uiGridConstants",{CUSTOM_FILTERS:/CUSTOM_FILTERS/g,COL_FIELD:/COL_FIELD/g,MODEL_COL_FIELD:/MODEL_COL_FIELD/g,DISPLAY_CELL_TEMPLATE:/DISPLAY_CELL_TEMPLATE/g,TEMPLATE_REGEXP:/<.+>/,FUNC_REGEXP:/(\([^)]*\))?$/,DOT_REGEXP:/\./g,APOS_REGEXP:/'/g,BRACKET_REGEXP:/^(.*)((?:\s*\[\s*\d+\s*\]\s*)|(?:\s*\[\s*"(?:[^"\\]|\\.)*"\s*\]\s*)|(?:\s*\[\s*'(?:[^'\\]|\\.)*'\s*\]\s*))(.*)$/,COL_CLASS_PREFIX:"ui-grid-col",events:{GRID_SCROLL:"uiGridScroll",COLUMN_MENU_SHOWN:"uiGridColMenuShown",ITEM_DRAGGING:"uiGridItemDragStart"},keymap:{TAB:9,STRG:17,CTRL:17,CTRLRIGHT:18,CTRLR:18,SHIFT:16,RETURN:13,ENTER:13,BACKSPACE:8,BCKSP:8,ALT:18,ALTR:17,ALTRIGHT:17,SPACE:32,WIN:91,MAC:91,FN:null,UP:38,DOWN:40,LEFT:37,RIGHT:39,ESC:27,DEL:46,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123},ASC:"asc",DESC:"desc",filter:{STARTS_WITH:2,ENDS_WITH:4,EXACT:8,CONTAINS:16,GREATER_THAN:32,GREATER_THAN_OR_EQUAL:64,LESS_THAN:128,LESS_THAN_OR_EQUAL:256,NOT_EQUAL:512},aggregationTypes:{sum:2,count:4,avg:8,min:16,max:32},CURRENCY_SYMBOLS:["ƒ","$","£","$","¤","¥","៛","₩","₱","฿","₫"]})}(),angular.module("ui.grid").directive("uiGridCell",["$compile","$log","$parse","gridUtil","uiGridConstants",function(a,b,c,d,e){var f={priority:0,scope:!1,require:"?^uiGrid",compile:function(){return{pre:function(b,c,f,g){function h(){var a=b.col.compiledElementFn;a(b,function(a){c.append(a)})}if(g&&b.col.compiledElementFn)h();else if(g&&!b.col.compiledElementFn)b.col.getCompiledElementFn().then(function(a){a(b,function(a){c.append(a)})});else{var i=b.col.cellTemplate.replace(e.MODEL_COL_FIELD,"row.entity."+d.preEval(b.col.field)).replace(e.COL_FIELD,"grid.getCellValue(row, col)"),j=a(i)(b);c.append(j)}},post:function(a,b){if(b.addClass(a.col.getColClass(!1)),a.col.cellClass){var c=b;c.addClass(angular.isFunction(a.col.cellClass)?a.col.cellClass(a.grid,a.row,a.col,a.rowRenderIndex,a.colRenderIndex):a.col.cellClass)}}}}};return f}]),function(){angular.module("ui.grid").service("uiGridColumnMenuService",["i18nService","uiGridConstants","gridUtil",function(a,b,c){var d={initialize:function(a,b){a.grid=b.grid,b.columnMenuScope=a,a.menuShown=!1},setColMenuItemWatch:function(a){var b=a.$watch("col.menuItems",function(b){"undefined"!=typeof b&&b&&angular.isArray(b)?(b.forEach(function(b){"undefined"!=typeof b.context&&b.context||(b.context={}),b.context.col=a.col}),a.menuItems=a.defaultMenuItems.concat(b)):a.menuItems=a.defaultMenuItems});a.$on("$destroy",b)},sortable:function(a){return a.grid.options.enableSorting&&"undefined"!=typeof a.col&&a.col&&a.col.enableSorting?!0:!1},isActiveSort:function(a,b){return"undefined"!=typeof a.col&&"undefined"!=typeof a.col.sort&&"undefined"!=typeof a.col.sort.direction&&a.col.sort.direction===b},suppressRemoveSort:function(a){return a.col&&a.col.colDef&&a.col.colDef.suppressRemoveSort?!0:!1},hideable:function(a){return"undefined"!=typeof a.col&&a.col&&a.col.colDef&&a.col.colDef.disableHiding?!1:!0},getDefaultMenuItems:function(c){return[{title:a.getSafeText("sort.ascending"),icon:"ui-grid-icon-sort-alt-up",action:function(a){a.stopPropagation(),c.sortColumn(a,b.ASC)},shown:function(){return d.sortable(c)},active:function(){return d.isActiveSort(c,b.ASC)}},{title:a.getSafeText("sort.descending"),icon:"ui-grid-icon-sort-alt-down",action:function(a){a.stopPropagation(),c.sortColumn(a,b.DESC)},shown:function(){return d.sortable(c)},active:function(){return d.isActiveSort(c,b.DESC)}},{title:a.getSafeText("sort.remove"),icon:"ui-grid-icon-cancel",action:function(a){a.stopPropagation(),c.unsortColumn()},shown:function(){return d.sortable(c)&&"undefined"!=typeof c.col&&"undefined"!=typeof c.col.sort&&"undefined"!=typeof c.col.sort.direction&&null!==c.col.sort.direction&&!d.suppressRemoveSort(c)}},{title:a.getSafeText("column.hide"),icon:"ui-grid-icon-cancel",shown:function(){return d.hideable(c)},action:function(a){a.stopPropagation(),c.hideColumn()}}]},getColumnElementPosition:function(a,b,d){var e={};return e.left=d[0].offsetLeft,e.top=d[0].offsetTop,e.offset=0,b.grid.options.offsetLeft&&(e.offset=b.grid.options.offsetLeft),e.height=c.elementHeight(d,!0),e.width=c.elementWidth(d,!0),e},repositionMenu:function(a,b,d,e,f){var g=e[0].querySelectorAll(".ui-grid-menu"),h=b.renderContainer?b.renderContainer:"body",i=(b.grid.renderContainers[h],c.closestElm(f,".ui-grid-render-container")),j=i.getBoundingClientRect().left-a.grid.element[0].getBoundingClientRect().left,k=i.querySelectorAll(".ui-grid-viewport")[0].scrollLeft,l=b.lastMenuWidth?b.lastMenuWidth:a.lastMenuWidth?a.lastMenuWidth:170,m=b.lastMenuPaddingRight?b.lastMenuPaddingRight:a.lastMenuPaddingRight?a.lastMenuPaddingRight:10;if(0!==g.length){var n=g[0].querySelectorAll(".ui-grid-menu-mid");0===n.length||angular.element(n).hasClass("ng-hide")||(l=c.elementWidth(g,!0),a.lastMenuWidth=l,b.lastMenuWidth=l,m=parseInt(c.getStyles(angular.element(g)[0]).paddingRight,10),a.lastMenuPaddingRight=m,b.lastMenuPaddingRight=m)}var o=d.left+j-k+d.width-l+m;o<d.offset&&(o=d.offset),e.css("left",o+"px"),e.css("top",d.top+d.height+"px")}};return d}]).directive("uiGridColumnMenu",["$log","$timeout","gridUtil","uiGridConstants","uiGridColumnMenuService",function(a,b,c,d,e){var f={priority:0,scope:!0,require:"?^uiGrid",templateUrl:"ui-grid/uiGridColumnMenu",replace:!0,link:function(a,b,c,d){var f=this;e.initialize(a,d),a.defaultMenuItems=e.getDefaultMenuItems(a),a.menuItems=a.defaultMenuItems,e.setColMenuItemWatch(a),a.showMenu=function(c,d,g){a.col=c;var h=e.getColumnElementPosition(a,c,d);a.menuShown?(a.colElement=d,a.colElementPosition=h,a.hideThenShow=!0,a.$broadcast("hide-menu",{originalEvent:g})):(f.shown=a.menuShown=!0,e.repositionMenu(a,c,h,b,d),a.colElement=d,a.colElementPosition=h,a.$broadcast("show-menu",{originalEvent:g}))},a.hideMenu=function(b){delete a.col,a.menuShown=!1,b||a.$broadcast("hide-menu")},a.$on("menu-hidden",function(){a.hideThenShow?(delete a.hideThenShow,e.repositionMenu(a,a.col,a.colElementPosition,b,a.colElement),a.$broadcast("show-menu"),a.menuShown=!0):a.hideMenu(!0)}),a.$on("menu-shown",function(){e.repositionMenu(a,a.col,a.colElementPosition,b,a.colElement),delete a.colElementPosition,delete a.columnElement}),a.sortColumn=function(b,c){b.stopPropagation(),a.grid.sortColumn(a.col,c,!0).then(function(){a.grid.refresh(),a.hideMenu()})},a.unsortColumn=function(){a.col.unsort(),a.grid.refresh(),a.hideMenu()},a.hideColumn=function(){a.col.colDef.visible=!1,a.grid.refresh(),a.hideMenu()}},controller:["$scope",function(a){var b=this;a.$watch("menuItems",function(a){b.menuItems=a})}]};return f}])}(),function(){"use strict";angular.module("ui.grid").directive("uiGridFooterCell",["$log","$timeout","gridUtil","$compile",function(a,b,c,d){var e={priority:0,scope:{col:"=",row:"=",renderIndex:"="},replace:!0,require:"^uiGrid",compile:function(){return{pre:function(a,b){function e(e){c.getTemplate(e).then(function(c){var e=d(c),f=e(a);b.append(f)})}e(a.col.footerCellTemplate?a.col.footerCellTemplate:"ui-grid/uiGridFooterCell")},post:function(a,b,c,d){a.grid=d.grid,b.addClass(a.col.getColClass(!1))}}}};return e}])}(),function(){"use strict";angular.module("ui.grid").directive("uiGridFooter",["$log","$templateCache","$compile","uiGridConstants","gridUtil","$timeout",function(a,b,c,d,e){var f="ui-grid/ui-grid-footer";return{restrict:"EA",replace:!0,require:["^uiGrid","^uiGridRenderContainer"],scope:!0,compile:function(){return{pre:function(a,b,d,g){var h=g[0],i=g[1];a.grid=h.grid,a.colContainer=i.colContainer,i.footer=b;var j=a.grid.options.footerTemplate?a.grid.options.footerTemplate:f;e.getTemplate(j).then(function(d){var e=angular.element(d),f=c(e)(a);if(b.append(f),i){var g=b[0].getElementsByClassName("ui-grid-footer-viewport")[0];g&&(i.footerViewport=g)}})},post:function(b,c,d,f){var g=f[0],h=f[1];a.debug("ui-grid-footer link");g.grid;e.disableAnimations(c),h.footer=c;var i=c[0].getElementsByClassName("ui-grid-footer-viewport")[0];i&&(h.footerViewport=i)}}}}}])}(),function(){"use strict";angular.module("ui.grid").directive("uiGridGroupPanel",["$compile","uiGridConstants","gridUtil",function(a,b,c){var d="ui-grid/ui-grid-group-panel";return{restrict:"EA",replace:!0,require:"?^uiGrid",scope:!1,compile:function(){return{pre:function(b,e){var f=b.grid.options.groupPanelTemplate||d;c.getTemplate(f).then(function(c){var d=angular.element(c),f=a(d)(b);e.append(f)})},post:function(a,b){b.bind("$destroy",function(){})}}}}}])}(),function(){"use strict";angular.module("ui.grid").directive("uiGridHeaderCell",["$log","$compile","$timeout","$window","$document","gridUtil","uiGridConstants",function(a,b,c,d,e,f,g){var h=500,i={priority:0,scope:{col:"=",row:"=",renderIndex:"="},require:["?^uiGrid","^uiGridRenderContainer"],replace:!0,compile:function(){return{pre:function(a,c){var d=b(a.col.headerCellTemplate)(a);c.append(d)},post:function(a,b,d,e){function f(b){var c=!1;b.shiftKey&&(c=!0),i.grid.sortColumn(a.col,c).then(function(){i.columnMenuScope&&i.columnMenuScope.hideMenu(),i.grid.refresh()})}var i=e[0],j=e[1];a.grid=i.grid,a.renderContainer=i.grid.renderContainers[j.containerId],b.addClass(a.col.getColClass(!1)),a.menuShown=!1,a.asc=g.ASC,a.desc=g.DESC;var k=(angular.element(b[0].querySelectorAll(".ui-grid-header-cell-menu")),angular.element(b[0].querySelectorAll(".ui-grid-cell-contents")));a.sortable=i.grid.options.enableSorting&&a.col.enableSorting?!0:!1,a.filterable=i.grid.options.enableFiltering&&a.col.enableFiltering?!0:!1;var l,m=0;if(k.on("mousedown touchstart",function(d){"undefined"!=typeof d.originalEvent&&void 0!==d.originalEvent&&(d=d.originalEvent),d.button&&0!==d.button||(m=(new Date).getTime(),l=c(function(){},h),l.then(function(){a.col.colDef&&!a.col.colDef.disableColumnMenu&&i.columnMenuScope.showMenu(a.col,b,d)}))}),k.on("mouseup touchend",function(){c.cancel(l)}),a.$on("$destroy",function(){k.off("mousedown touchstart")}),a.toggleMenu=function(c){c.stopPropagation(),i.columnMenuScope.menuShown&&i.columnMenuScope.col===a.col?i.columnMenuScope.hideMenu():i.columnMenuScope.showMenu(a.col,b)},a.sortable&&(k.on("click touchend",function(a){a.stopPropagation(),c.cancel(l);var b=(new Date).getTime(),d=b-m;d>h||f(a)}),a.$on("$destroy",function(){c.cancel(l)})),a.filterable){var n=[];angular.forEach(a.col.filters,function(b,c){n.push(a.$watch("col.filters["+c+"].term",function(){i.grid.api.core.raise.filterChanged(),i.grid.refresh().then(function(){i.prevScrollArgs&&i.prevScrollArgs.y&&i.prevScrollArgs.y.percentage&&i.fireScrollingEvent({y:{percentage:i.prevScrollArgs.y.percentage}})})}))}),a.$on("$destroy",function(){angular.forEach(n,function(a){a()})})}}}}};return i}])}(),function(){"use strict";angular.module("ui.grid").directive("uiGridHeader",["$log","$templateCache","$compile","uiGridConstants","gridUtil","$timeout",function(a,b,c,d,e){var f="ui-grid/ui-grid-header",g="ui-grid/ui-grid-no-header";return{restrict:"EA",replace:!0,require:["^uiGrid","^uiGridRenderContainer"],scope:!0,compile:function(){return{pre:function(a,b,d,h){var i=h[0],j=h[1];a.grid=i.grid,a.colContainer=j.colContainer,j.header=b,j.colContainer.header=b;var k;k=a.grid.options.hideHeader?g:a.grid.options.headerTemplate?a.grid.options.headerTemplate:f,e.getTemplate(k).then(function(d){var e=angular.element(d),f=c(e)(a);if(b.replaceWith(f),j.header=f,j.colContainer.header=f,b=f,j){var g=b[0].getElementsByClassName("ui-grid-header-viewport")[0];g&&(j.headerViewport=g)}})},post:function(b,c,d,f){function g(){var a=[],b=[],c=0,d=i.colContainer.getViewportWidth();"undefined"!=typeof h.grid.verticalScrollbarWidth&&void 0!==h.grid.verticalScrollbarWidth&&h.grid.verticalScrollbarWidth>0&&(d+=h.grid.verticalScrollbarWidth);var f,g=0,k=0,l="",m=i.colContainer.visibleColumnCache;m.forEach(function(d){if(d.visible){var f=!1;angular.isNumber(d.width)||(f=isNaN(d.width)?e.endsWith(d.width,"%"):!1),angular.isString(d.width)&&-1!==d.width.indexOf("*")?(c=parseInt(c+d.width.length,10),a.push(d)):f?b.push(d):angular.isNumber(d.width)&&(g=parseInt(g+d.width,10),k=parseInt(k,10)+parseInt(d.width,10),d.drawnWidth=d.width)}});var n,o,p,q=d-g;if(b.length>0){for(n=0;n<b.length;n++){o=b[n];var r=parseInt(o.width.replace(/%/g,""),10)/100;p=parseInt(r*q,10),o.colDef.minWidth&&p<o.colDef.minWidth?(p=o.colDef.minWidth,q-=p,k+=p,o.drawnWidth=p,b.splice(n,1)):o.colDef.maxWidth&&p>o.colDef.maxWidth&&(p=o.colDef.maxWidth,q-=p,k+=p,o.drawnWidth=p,b.splice(n,1))}b.forEach(function(a){var b=parseInt(a.width.replace(/%/g,""),10)/100,c=parseInt(b*q,10);k+=c,a.drawnWidth=c})}if(a.length>0){var s=parseInt(q/c,10);for(n=0;n<a.length;n++)o=a[n],p=parseInt(s*o.width.length,10),o.colDef.minWidth&&p<o.colDef.minWidth?(p=o.colDef.minWidth,q-=p,c--,k+=p,o.drawnWidth=p,f=o,a.splice(n,1)):o.colDef.maxWidth&&p>o.colDef.maxWidth&&(p=o.colDef.maxWidth,q-=p,c--,k+=p,o.drawnWidth=p,a.splice(n,1));s=parseInt(q/c,10),a.forEach(function(a){var b=parseInt(s*a.width.length,10);k+=b,a.drawnWidth=b})}var t=d-parseInt(k,10);if(t>0&&k>0&&d>k){var u=!1;if(m.forEach(function(a){a.width&&!angular.isNumber(a.width)&&(u=!0)}),u)for(var v=function(a){t>0&&(a.drawnWidth=a.drawnWidth+1,k+=1,t--)};t>0;)m.forEach(v)}return d>k&&(k=d),m.forEach(function(a){l+=a.getColClassDefinition()}),j.verticalScrollbarWidth&&(k+=j.verticalScrollbarWidth),m.length>0&&(m[m.length-1].headerWidth=m[m.length-1].drawnWidth-30),i.colContainer.canvasWidth=parseInt(k,10),l}var h=f[0],i=f[1];a.debug("ui-grid-header link");var j=h.grid;e.disableAnimations(c),i.header=c;var k=c[0].getElementsByClassName("ui-grid-header-viewport")[0];k&&(i.headerViewport=k),h&&h.grid.registerStyleComputation({priority:5,func:g})}}}}}])}(),function(){angular.module("ui.grid").service("uiGridGridMenuService",["$log","i18nService",function(a,b){var c={initialize:function(a,b){b.gridMenuScope=a,a.grid=b,a.$on("$destroy",function(){a.grid.gridMenuScope=null,a.grid=null,a.registeredMenuItems=null}),a.registeredMenuItems=[],b.api.registerMethod("core","addToGridMenu",c.addToGridMenu),b.api.registerMethod("core","removeFromGridMenu",c.removeFromGridMenu)},addToGridMenu:function(b,c){angular.isArray(c)?b.gridMenuScope.registeredMenuItems=b.gridMenuScope.registeredMenuItems.concat(c):a.error("addToGridMenu: menuItems must be an array, and is not, not adding any items")},removeFromGridMenu:function(b,c){var d=-1;b.gridMenuScope.registeredMenuItems.forEach(function(b,e){b.id===c&&(d>-1?a.error("removeFromGridMenu: found multiple items with the same id, removing only the last"):d=e)}),d>-1&&b.gridMenuScope.registeredMenuItems.splice(d,1)},getMenuItems:function(b){var d=[];return b.grid.options.gridMenuCustomItems&&(angular.isArray(b.grid.options.gridMenuCustomItems)?d=d.concat(b.grid.options.gridMenuCustomItems):a.error("gridOptions.gridMenuCustomItems must be an array, and is not")),d=d.concat(b.registeredMenuItems),b.grid.options.gridMenuShowHideColumns!==!1&&(d=d.concat(c.showHideColumns(b))),d},showHideColumns:function(d){var e=[];return d.grid.options.columnDefs?(e.push({title:b.getSafeText("gridMenu.columns")}),d.grid.options.gridMenuTitleFilter=d.grid.options.gridMenuTitleFilter?d.grid.options.gridMenuTitleFilter:function(a){return a},d.grid.options.columnDefs.forEach(function(a){if(!a.disableHiding){var b={icon:"ui-grid-icon-ok",action:function(a){a.stopPropagation(),c.toggleColumnVisibility(this.context.gridCol)},shown:function(){return this.context.gridCol.colDef.visible===!0||void 0===this.context.gridCol.colDef.visible},context:{gridCol:d.grid.getColumn(a.name||a.field)}};c.setMenuItemTitle(b,a,d.grid),e.push(b),b={icon:"ui-grid-icon-cancel",action:function(a){a.stopPropagation(),c.toggleColumnVisibility(this.context.gridCol)},shown:function(){return!(this.context.gridCol.colDef.visible===!0||void 0===this.context.gridCol.colDef.visible)},context:{gridCol:d.grid.getColumn(a.name||a.field)}},c.setMenuItemTitle(b,a,d.grid),e.push(b)}}),e):(a.error("Something is wrong in showHideColumns, there are no columnDefs"),e)},setMenuItemTitle:function(b,c,d){var e=d.options.gridMenuTitleFilter(c.displayName||c.name||c.field);"string"==typeof e?b.title=e:e.then?(b.title="",e.then(function(a){b.title=a},function(a){b.title=a})):(a.error("Expected gridMenuTitleFilter to return a string or a promise, it has returned neither, bad config"),b.title="badconfig")},toggleColumnVisibility:function(a){a.colDef.visible=!(a.colDef.visible===!0||void 0===a.colDef.visible),a.grid.refresh()}};return c}]).directive("uiGridMenuButton",["$log","gridUtil","uiGridConstants","uiGridGridMenuService",function(a,b,c,d){return{priority:0,scope:!0,require:["?^uiGrid"],templateUrl:"ui-grid/ui-grid-menu-button",replace:!0,link:function(a,b,c,e){var f=e[0];d.initialize(a,f.grid),a.shown=!1,a.toggleMenu=function(){a.shown?(a.$broadcast("hide-menu"),a.shown=!1):(a.menuItems=d.getMenuItems(a),a.$broadcast("show-menu"),a.shown=!0)},a.$on("menu-hidden",function(){a.shown=!1})}}}])}(),function(){angular.module("ui.grid").directive("uiGridMenu",["$log","$compile","$timeout","$window","$document","gridUtil","uiGridConstants",function(a,b,c,d,e,f,g){var h={priority:0,scope:{menuItems:"=",autoHide:"=?"},require:"?^uiGrid",templateUrl:"ui-grid/uiGridMenu",replace:!1,link:function(a,b){var e,h,i=this;i.showMenu=a.showMenu=function(d,g){a.shown?a.shownMid||(e=b[0].querySelectorAll(".ui-grid-menu-mid"),h=f.enableAnimations(e),h?(a.shownMid=!0,h.removeClass(e,"ng-hide",function(){a.$emit("menu-shown")})):(a.shownMid=!0,a.$emit("menu-shown"))):(a.shown=!0,c(function(){e=b[0].querySelectorAll(".ui-grid-menu-mid"),h=f.enableAnimations(e),h?(a.shownMid=!0,h.removeClass(e,"ng-hide",function(){a.$emit("menu-shown")})):(a.shownMid=!0,a.$emit("menu-shown"))}));var i="click";g&&g.originalEvent&&g.originalEvent.type&&"touchstart"===g.originalEvent.type&&(i=g.originalEvent.type),angular.element(document).off("click touchstart",j),c(function(){angular.element(document).on(i,j)})},i.hideMenu=a.hideMenu=function(){a.shown&&(e=b[0].querySelectorAll(".ui-grid-menu-mid"),h=f.enableAnimations(e),h?(a.shownMid=!1,h.addClass(e,"ng-hide",function(){a.shownMid||(a.shown=!1,a.$emit("menu-hidden"))})):(a.shownMid=!1,a.shown=!1)),angular.element(document).off("click touchstart",j)},a.$on("hide-menu",function(b,c){a.hideMenu(b,c)}),a.$on("show-menu",function(b,c){a.showMenu(b,c)});var j=function(){a.$apply(function(){a.hideMenu()})};("undefined"==typeof a.autoHide||void 0===a.autoHide)&&(a.autoHide=!0),a.autoHide&&angular.element(d).on("resize",j),a.$on("$destroy",function(){angular.element(document).off("click touchstart",j)}),a.$on("$destroy",function(){angular.element(d).off("resize",j)}),a.$on("$destroy",a.$on(g.events.GRID_SCROLL,j)),a.$on("$destroy",a.$on(g.events.ITEM_DRAGGING,j))},controller:["$scope","$element","$attrs",function(){}]};return h}]).directive("uiGridMenuItem",["$log","gridUtil","$compile","i18nService",function(a,b,c,d){var e={priority:0,scope:{title:"=",active:"=",action:"=",icon:"=",shown:"=",context:"=",templateUrl:"="},require:["?^uiGrid","^uiGridMenu"],templateUrl:"ui-grid/uiGridMenuItem",replace:!0,compile:function(){return{pre:function(a,d,e,f){f[0],f[1];a.templateUrl&&b.getTemplate(a.templateUrl).then(function(b){var e=angular.element(b),f=c(e)(a);d.replaceWith(f)})},post:function(b,c,e,f){{var g=f[0];f[1]}("undefined"==typeof b.shown||null===b.shown)&&(b.shown=function(){return!0}),b.itemShown=function(){var a={};return b.context&&(a.context=b.context),"undefined"!=typeof g&&g&&(a.grid=g.grid),b.shown.call(a)},b.itemAction=function(c,d){if(a.debug("itemAction"),c.stopPropagation(),"function"==typeof b.action){var e={};b.context&&(e.context=b.context),"undefined"!=typeof g&&g&&(e.grid=g.grid),b.action.call(e,c,d),b.$emit("hide-menu")}},b.i18n=d.get()}}}};return e}])}(),function(){angular.module("ui.grid").directive("uiGridNativeScrollbar",["$log","$timeout","$document","uiGridConstants","gridUtil",function(a,b,c,d,e){var f=e.getScrollbarWidth();angular.isNumber(f)||(f=0);var g=e.detectBrowser();return"ie"===g&&(f+=1),{scope:{type:"@"},require:["^uiGrid","^uiGridRenderContainer"],link:function(a,b,c,g){function h(){var a=n.getViewportHeight(),b=n.getCanvasHeight(),c=o.headerHeight?o.headerHeight:p.headerHeight,d=".grid"+p.id+" .ui-grid-render-container-"+m.containerId+" .ui-grid-native-scrollbar.vertical .contents { height: "+b+"px; }";return d+="\n .grid"+p.id+" .ui-grid-render-container-"+m.containerId+" .ui-grid-native-scrollbar.vertical { height: "+a+"px; top: "+c+"px}",s=b,d}function i(){var a=o.getCanvasWidth(),b=-1*f+u;p.options.showFooter&&(b-=1);var c=".grid"+p.id+" .ui-grid-render-container-"+m.containerId+" .ui-grid-native-scrollbar.horizontal { bottom: "+b+"px; }";return c+=".grid"+p.id+" .ui-grid-render-container-"+m.containerId+" .ui-grid-native-scrollbar.horizontal .contents { width: "+a+"px; }",s=a,c}function j(){if("vertical"===a.type){p.flagScrollingVertically();var c=b[0].scrollTop,d=n.getCanvasHeight()-n.getViewportHeight();p.horizontalScrollbarHeight&&p.horizontalScrollbarHeight>0&&(d-=l.grid.horizontalScrollbarHeight);var f=c/d;f>1&&(f=1),0>f&&(f=0);var g={target:b,y:{percentage:f}};a.scrollSource?a.scrollSource=null:l.fireScrollingEvent(g),r=c}else if("horizontal"===a.type){p.flagScrollingHorizontally();var h=e.normalizeScrollLeft(b),i=o.getCanvasWidth()-o.getViewportWidth(),j=h/i,k={target:b,x:{percentage:j}};a.scrollSource?a.scrollSource=null:l.fireScrollingEvent(k),r=h}}function k(c,d){if(!d.target||d.target!==b&&!angular.element(d.target).hasClass("ui-grid-native-scrollbar"))if(a.scrollSource=d.target,"vertical"===a.type){if(d.y&&"undefined"!=typeof d.y.percentage&&void 0!==d.y.percentage){p.flagScrollingVertically();var f=n.getCanvasHeight()-n.getViewportHeight(),g=Math.max(0,d.y.percentage*f);b[0].scrollTop=g}}else if("horizontal"===a.type&&d.x&&"undefined"!=typeof d.x.percentage&&void 0!==d.x.percentage){p.flagScrollingHorizontally();var h=o.getCanvasWidth()-o.getViewportWidth(),i=Math.max(0,d.x.percentage*h);b[0].scrollLeft=e.denormalizeScrollLeft(b,i)}}var l=g[0],m=g[1],n=m.rowContainer,o=m.colContainer,p=l.grid,q=angular.element('<div class="contents">&nbsp;</div>');b.addClass("ui-grid-native-scrollbar");var r,s=0;"vertical"===a.type?(b.css("width",f+"px"),b.addClass("vertical"),p.verticalScrollbarWidth=f,o.verticalScrollbarWidth=f,r=b[0].scrollTop):"horizontal"===a.type&&(b.css("height",f+"px"),b.addClass("horizontal"),p.horizontalScrollbarHeight=f,n.horizontalScrollbarHeight=f,r=e.normalizeScrollLeft(b)),b.append(q),"vertical"===a.type?s=e.elementHeight(b):"horizontal"===a.type&&(s=e.elementWidth(b));var t=e.closestElm(b,".ui-grid"),u=e.getBorderSize(t,"bottom");"vertical"===a.type?p.registerStyleComputation({priority:6,func:h}):"horizontal"===a.type&&p.registerStyleComputation({priority:6,func:i}),a.scrollSource=null,b.on("scroll",j),b.on("$destroy",function(){b.off("scroll")});var v=a.$on(d.events.GRID_SCROLL,k);a.$on("$destroy",v)}}}])}(),function(){"use strict";var a=angular.module("ui.grid");a.directive("uiGridRenderContainer",["$log","$timeout","$document","uiGridConstants","gridUtil",function(a,b,c,d,e){return{replace:!0,transclude:!0,templateUrl:"ui-grid/uiGridRenderContainer",require:["^uiGrid","uiGridRenderContainer"],scope:{containerId:"=",rowContainerName:"=",colContainerName:"=",bindScrollHorizontal:"=",bindScrollVertical:"=",enableScrollbars:"="},controller:"uiGridRenderContainer as RenderContainer",compile:function(){return{pre:function(b,c,d,e){a.debug("render container "+b.containerId+" pre-link");var f=e[0],g=e[1],h=b.grid=f.grid;if(!b.rowContainerName)throw"No row render container name specified";if(!b.colContainerName)throw"No column render container name specified";if(!h.renderContainers[b.rowContainerName])throw"Row render container '"+b.rowContainerName+"' is not registered.";if(!h.renderContainers[b.colContainerName])throw"Column render container '"+b.colContainerName+"' is not registered.";var i=b.rowContainer=h.renderContainers[b.rowContainerName],j=b.colContainer=h.renderContainers[b.colContainerName];g.containerId=b.containerId,g.rowContainer=i,g.colContainer=j},post:function(f,g,h,i){function j(a,b){if(b.y&&f.bindScrollVertical){o.prevScrollArgs=b;var c=q.getCanvasHeight()-q.getViewportHeight();p.horizontalScrollbarHeight&&p.horizontalScrollbarHeight>0&&(c+=p.horizontalScrollbarHeight);var d,g=o.viewport[0].scrollTop;if("undefined"!=typeof b.y.percentage&&void 0!==b.y.percentage)d=b.y.percentage;else{if("undefined"==typeof b.y.pixels||void 0===b.y.pixels)throw new Error("No percentage or pixel value provided for scroll event Y axis");d=b.y.percentage=(g+b.y.pixels)/c}var h=Math.max(0,d*c);o.viewport[0].scrollTop=h,o.prevScrollArgs.y.pixels=h-g}if(b.x&&f.bindScrollHorizontal){o.prevScrollArgs=b;var i,j=r.getCanvasWidth()-r.getViewportWidth(),k=e.normalizeScrollLeft(o.viewport);if("undefined"!=typeof b.x.percentage&&void 0!==b.x.percentage)i=b.x.percentage;else{if("undefined"==typeof b.x.pixels||void 0===b.x.pixels)throw new Error("No percentage or pixel value provided for scroll event X axis");i=b.x.percentage=(k+b.x.pixels)/j}var l=Math.max(0,i*j);o.viewport[0].scrollLeft=e.denormalizeScrollLeft(o.viewport,l),o.prevScrollLeft=l,o.headerViewport&&(o.headerViewport.scrollLeft=e.denormalizeScrollLeft(o.headerViewport,l)),o.footerViewport&&(o.footerViewport.scrollLeft=e.denormalizeScrollLeft(o.footerViewport,l)),o.prevScrollArgs.x.pixels=l-k}}function k(a){a.originalEvent&&(a=a.originalEvent),a.preventDefault();var b,c,d,e;d=a.targetTouches[0].screenX,e=a.targetTouches[0].screenY,b=-(d-w),c=-(e-v),z=1>c?-1:1,A=1>b?-1:1,c*=2,b*=2;var f={target:a.target};if(0!==c){var g=(x+c)/(q.getCanvasHeight()-q.getViewportHeight());g>1?g=1:0>g&&(g=0),f.y={percentage:g,pixels:c}}if(0!==b){var h=(y+b)/(r.getCanvasWidth()-r.getViewportWidth());h>1?h=1:0>h&&(h=0),f.x={percentage:h,pixels:b}}n.fireScrollingEvent(f)}function l(a){function d(){b(function(){var b={target:a.target};if(0!==t){var c=(o.viewport[0].scrollTop+t)/(q.getCanvasHeight()-q.getViewportHeight());b.y={percentage:c,pixels:t}}if(0!==v){var e=(o.viewport[0].scrollLeft+v)/(r.getCanvasWidth()-r.getViewportWidth());b.x={percentage:e,pixels:v}}n.fireScrollingEvent(b),s-=1,t/=2,v/=2,s>0?d():n.scrollbars.forEach(function(a){a.removeClass("ui-grid-scrollbar-visible"),a.removeClass("ui-grid-scrolling")})},p)}a.originalEvent&&(a=a.originalEvent),a.preventDefault(),c.unbind("touchmove",k),c.unbind("touchend",l),c.unbind("touchcancel",l);var e=o.viewport[0].scrollTop,f=o.viewport[0].scrollTop,g=Math.abs(e-x),h=Math.abs(f-y),i=new Date-u,j=g/i,m=h/i,p=63,s=8,t=120*z*j,v=120*A*m;d()}function m(){var a="",b=r.getCanvasWidth(),c=r.getViewportWidth(),d=q.getCanvasHeight(),e=q.getViewportHeight(),g=r.getHeaderViewportWidth(),h=r.getHeaderViewportWidth();return a+="\n .grid"+n.grid.id+" .ui-grid-render-container-"+f.containerId+" .ui-grid-canvas { width: "+b+"px; height: "+d+"px; }",a+="\n .grid"+n.grid.id+" .ui-grid-render-container-"+f.containerId+" .ui-grid-header-canvas { width: "+b+"px; }",a+="\n .grid"+n.grid.id+" .ui-grid-render-container-"+f.containerId+" .ui-grid-viewport { width: "+c+"px; height: "+e+"px; }",a+="\n .grid"+n.grid.id+" .ui-grid-render-container-"+f.containerId+" .ui-grid-header-viewport { width: "+g+"px; }",a+="\n .grid"+n.grid.id+" .ui-grid-render-container-"+f.containerId+" .ui-grid-footer-canvas { width: "+b+"px; }",a+="\n .grid"+n.grid.id+" .ui-grid-render-container-"+f.containerId+" .ui-grid-footer-viewport { width: "+h+"px; }",void 0!==s.explicitHeaderHeight&&null!==s.explicitHeaderHeight&&s.explicitHeaderHeight>0?a+="\n .grid"+n.grid.id+" .ui-grid-render-container-"+f.containerId+" .ui-grid-header-cell { height: "+s.explicitHeaderHeight+"px; }":void 0!==s.innerHeaderHeight&&null!==s.innerHeaderHeight&&s.innerHeaderHeight>0&&(a+="\n .grid"+n.grid.id+" .ui-grid-render-container-"+f.containerId+" .ui-grid-header-cell { height: "+s.innerHeaderHeight+"px; }"),a}a.debug("render container "+f.containerId+" post-link");var n=i[0],o=i[1],p=n.grid,q=o.rowContainer,r=o.colContainer,s=p.renderContainers[f.containerId];g.addClass("ui-grid-render-container-"+f.containerId);var t;(f.bindScrollHorizontal||f.bindScrollVertical)&&(t=f.$on(d.events.GRID_SCROLL,j)),g.bind("wheel mousewheel DomMouseScroll MozMousePixelScroll",function(a){a.preventDefault();var b=e.normalizeWheelEvent(a),c={target:g};if(0!==b.deltaY){var d=-120*b.deltaY,f=(o.viewport[0].scrollTop+d)/(q.getCanvasHeight()-q.getViewportHeight());0>f?f=0:f>1&&(f=1),c.y={percentage:f,pixels:d}}if(0!==b.deltaX){var h=-120*b.deltaX,i=e.normalizeScrollLeft(o.viewport),j=(i+h)/(r.getCanvasWidth()-r.getViewportWidth());0>j?j=0:j>1&&(j=1),c.x={percentage:j,pixels:h}}n.fireScrollingEvent(c)});var u,v=0,w=0,x=0,y=0,z=1,A=1;e.isTouchEnabled()&&g.bind("touchstart",function(a){a.originalEvent&&(a=a.originalEvent),a.preventDefault(),n.scrollbars.forEach(function(a){a.addClass("ui-grid-scrollbar-visible"),a.addClass("ui-grid-scrolling")}),u=new Date,v=a.targetTouches[0].screenY,w=a.targetTouches[0].screenX,x=o.viewport[0].scrollTop,y=o.viewport[0].scrollLeft,c.on("touchmove",k),c.on("touchend touchcancel",l)}),g.bind("$destroy",function(){t(),g.unbind("keydown"),["touchstart","touchmove","touchend","keydown","wheel","mousewheel","DomMouseScroll","MozMousePixelScroll"].forEach(function(a){g.unbind(a)})}),n.grid.registerStyleComputation({priority:6,func:m})}}}}}]),a.controller("uiGridRenderContainer",["$scope","$log",function(a){var b=this;b.rowStyle=function(c){var d=a.grid.renderContainers[a.containerId],e={};if(!d.disableRowOffset&&0===c&&0!==b.currentTopRow){var f=a.rowContainer.currentTopRow*a.rowContainer.visibleRowCache[a.rowContainer.currentTopRow].height;e["margin-top"]=f+"px"}return d.disableColumnOffset||0===a.colContainer.currentFirstColumn||(a.grid.isRTL()?e["margin-right"]=a.colContainer.columnOffset+"px":e["margin-left"]=a.colContainer.columnOffset+"px"),e},b.columnStyle=function(b){var c=a.grid.renderContainers[a.containerId];if(!c.disableColumnOffset&&0===b&&0!==a.colContainer.currentFirstColumn){var d=a.colContainer.columnOffset;return a.grid.isRTL()?{"margin-right":d+"px"}:{"margin-left":d+"px"}}return null}}])}(),function(){"use strict";angular.module("ui.grid").directive("uiGridRow",["$log",function(){return{replace:!0,require:["^uiGrid","^uiGridRenderContainer"],scope:{row:"=uiGridRow",rowRenderIndex:"="},compile:function(){return{pre:function(a,b,c,d){var e=d[0],f=d[1],g=e.grid;a.grid=e.grid,a.colContainer=f.colContainer,g.getRowTemplateFn.then(function(c){c(a,function(a){b.replaceWith(a)})})},post:function(a,b,c,d){{var e=d[0];d[1]}a.getExternalScopes=e.getExternalScopes}}}}}])}(),function(){angular.module("ui.grid").directive("uiGridStyle",["$log","$interpolate",function(a,b){return{link:function(c,d){a.debug("ui-grid-style link");var e=b(d.text(),!0);e&&c.$watch(e,function(a){d.text(a)})}}}])}(),function(){"use strict";angular.module("ui.grid").directive("uiGridViewport",["$log","gridUtil",function(a,b){return{replace:!0,scope:{},templateUrl:"ui-grid/uiGridViewport",require:["^uiGrid","^uiGridRenderContainer"],link:function(c,d,e,f){a.debug("viewport post-link");var g=f[0],h=f[1];c.containerCtrl=h;{var i=h.rowContainer,j=h.colContainer;g.grid}c.grid=g.grid,c.rowContainer=h.rowContainer,c.colContainer=h.colContainer,h.viewport=d,d.on("scroll",function(){var a=d[0].scrollTop,e=b.normalizeScrollLeft(d),f=-1,h=-1;if(e!==j.prevScrollLeft){var k=(e-j.prevScrollLeft,j.getCanvasWidth()-j.getViewportWidth());f=e/k,j.adjustScrollHorizontal(e,f)}if(a!==i.prevScrollTop){var l=(a-i.prevScrollTop,i.getCanvasHeight()-i.getViewportHeight());h=a/l,h>1&&(h=1),0>h&&(h=0),i.adjustScrollVertical(a,h)}if(!c.grid.isScrollingVertically&&!c.grid.isScrollingHorizontally){var m={};f>-1&&(m.x={percentage:f}),h>-1&&(m.y={percentage:h}),g.fireScrollingEvent(m)}})}}}])}(),function(){angular.module("ui.grid").directive("uiGridVisible",function(){return function(a,b,c){a.$watch(c.uiGridVisible,function(a){b[a?"removeClass":"addClass"]("ui-grid-invisible")
})}})}(),function(){"use strict";angular.module("ui.grid").controller("uiGridController",["$scope","$element","$attrs","$log","gridUtil","$q","uiGridConstants","$templateCache","gridClassFactory","$timeout","$parse","$compile",function(a,b,c,d,e,f,g,h,i,j,k,l){function m(a,b){a&&a!==b&&(o.grid.options.columnDefs=a,o.grid.buildColumns().then(function(){o.grid.preCompileCellTemplates(),o.grid.refresh()}))}function n(b){var e=[];b&&(o.grid.columns.length===(o.grid.rowHeaderColumns?o.grid.rowHeaderColumns.length:0)&&(d.debug("loading cols in dataWatchFunction"),c.uiGridColumns||0!==o.grid.options.columnDefs.length||o.grid.buildColumnDefsFromData(b),e.push(o.grid.buildColumns().then(function(){o.grid.preCompileCellTemplates()}))),f.all(e).then(function(){o.grid.modifyRows(b).then(function(){o.grid.redrawInPlace(),a.$evalAsync(function(){o.grid.refreshCanvas(!0)})})}))}d.debug("ui-grid controller");var o=this;o.grid=i.createGrid(a.uiGrid),b.addClass("grid"+o.grid.id),o.grid.rtl="rtl"===e.getStyles(b[0]).direction,o.getExternalScopes=a.getExternalScopes,a.grid=o.grid,c.uiGridColumns&&c.$observe("uiGridColumns",function(a){o.grid.options.columnDefs=a,o.grid.buildColumns().then(function(){o.grid.preCompileCellTemplates(),o.grid.refreshCanvas(!0)})});var p;p=angular.isString(a.uiGrid.data)?a.$parent.$watchCollection(a.uiGrid.data,n):a.$parent.$watchCollection(function(){return a.uiGrid.data},n);var q=a.$parent.$watchCollection(function(){return a.uiGrid.columnDefs},m);a.$on("$destroy",function(){p(),q()}),a.$watch(function(){return o.grid.styleComputations},function(){o.grid.refreshCanvas(!0)}),o.fireScrollingEvent=e.throttle(function(b){a.$broadcast(g.events.GRID_SCROLL,b)},o.grid.options.scrollThrottle,{trailing:!0}),o.fireEvent=function(b,c){("undefined"==typeof c||void 0===c)&&(c={}),("undefined"==typeof c.grid||void 0===c.grid)&&(c.grid=o.grid),a.$broadcast(b,c)},o.innerCompile=function(b){l(b)(a)}}]),angular.module("ui.grid").directive("uiGrid",["$log","$compile","$templateCache","gridUtil","$window",function(a,b,c,d,e){return{templateUrl:"ui-grid/ui-grid",scope:{uiGrid:"=",getExternalScopes:"&?externalScopes"},replace:!0,transclude:!0,controller:"uiGridController",compile:function(){return{post:function(b,c,f,g){function h(){i.gridWidth=b.gridWidth=d.elementWidth(c),i.gridHeight=b.gridHeight=d.elementHeight(c),i.queueRefresh()}a.debug("ui-grid postlink");var i=g.grid;if(g.scrollbars=[],i.renderingComplete(),i.element=c,i.gridWidth=b.gridWidth=d.elementWidth(c),i.canvasWidth=g.grid.gridWidth,i.gridHeight=b.gridHeight=d.elementHeight(c),i.gridHeight<i.options.rowHeight){var j=i.options.minRowsToShow*i.options.rowHeight;c.css("height",j+"px"),i.gridHeight=b.gridHeight=d.elementHeight(c)}i.refreshCanvas();var k=angular.element('<div ng-if="grid.hasLeftContainer()" style="width: 0" ui-grid-pinned-container="\'left\'"></div>');c.prepend(k),g.innerCompile(k);var l=angular.element('<div  ng-if="grid.hasRightContainer()" style="width: 0" ui-grid-pinned-container="\'right\'"></div>');c.append(l),g.innerCompile(l),b.$watch(function(){return i.hasLeftContainer()},function(a,b){a!==b&&i.refreshCanvas(!0)}),b.$watch(function(){return i.hasRightContainer()},function(a,b){a!==b&&i.refreshCanvas(!0)}),angular.element(e).on("resize",h),c.on("$destroy",function(){angular.element(e).off("resize",h)})}}}}}])}(),function(){"use strict";angular.module("ui.grid").directive("uiGridPinnedContainer",["$log",function(a){return{restrict:"EA",replace:!0,template:'<div class="ui-grid-pinned-container"><div ui-grid-render-container container-id="side" row-container-name="\'body\'" col-container-name="side" bind-scroll-vertical="true" class="{{ side }} ui-grid-render-container-{{ side }}"></div></div>',scope:{side:"=uiGridPinnedContainer"},require:"^uiGrid",compile:function(){return{post:function(b,c,d,e){function f(){var a="";if("left"===b.side||"right"===b.side){for(var d=g.renderContainers[b.side].visibleColumnCache,e=0,f=0;f<d.length;f++){var i=d[f];e+=i.drawnWidth}h=e,c.attr("style",null);var j=g.renderContainers.body.getViewportHeight();a+=".grid"+g.id+" .ui-grid-pinned-container-"+b.side+", .grid"+g.id+" .ui-grid-pinned-container-"+b.side+" .ui-grid-render-container-"+b.side+" .ui-grid-viewport { width: "+h+"px; height: "+j+"px; } "}return a}a.debug("ui-grid-pinned-container "+b.side+" link");var g=e.grid,h=0;c.addClass("ui-grid-pinned-container-"+b.side),g.renderContainers.body.registerViewportAdjuster(function(a){return a.width-=h,a}),g.registerStyleComputation({priority:15,func:f})}}}}}])}(),function(){angular.module("ui.grid").factory("Grid",["$log","$q","$compile","$parse","gridUtil","uiGridConstants","GridOptions","GridColumn","GridRow","GridApi","rowSorter","rowSearcher","GridRenderContainer","$timeout",function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){function o(){}var p=function(a){var b=this;if(void 0===a||"undefined"==typeof a.id||!a.id)throw new Error("No ID provided. An ID must be given when creating a grid.");if(!/^[_a-zA-Z0-9-]+$/.test(a.id))throw new Error("Grid id '"+a.id+'" is invalid. It must follow CSS selector syntax rules.');b.id=a.id,delete a.id,b.options=new g,angular.extend(b.options,a),b.headerHeight=b.options.headerRowHeight,b.footerHeight=b.options.showFooter===!0?b.options.footerRowHeight:0,b.rtl=!1,b.gridHeight=0,b.gridWidth=0,b.columnBuilders=[],b.rowBuilders=[],b.rowsProcessors=[],b.columnsProcessors=[],b.styleComputations=[],b.viewportAdjusters=[],b.rowHeaderColumns=[],b.renderContainers={},b.renderContainers.body=new m("body",b),b.cellValueGetterCache={},b.getRowTemplateFn=null,b.rows=[],b.columns=[],b.isScrollingVertically=!1,b.isScrollingHorizontally=!1;var c=e.debounce(function(){b.isScrollingVertically=!1},300),d=e.debounce(function(){b.isScrollingHorizontally=!1},300);b.flagScrollingVertically=function(){b.isScrollingVertically=!0,c()},b.flagScrollingHorizontally=function(){b.isScrollingHorizontally=!0,d()},b.api=new j(b),b.api.registerMethod("core","refresh",this.refresh),b.api.registerMethod("core","refreshRows",this.refreshRows),b.api.registerMethod("core","handleWindowResize",this.handleWindowResize),b.api.registerMethod("core","addRowHeaderColumn",this.addRowHeaderColumn),b.api.registerMethod("core","sortHandleNulls",k.handleNulls),b.api.registerEvent("core","sortChanged")};return p.prototype.isRTL=function(){return this.rtl},p.prototype.registerColumnBuilder=function(a){this.columnBuilders.push(a)},p.prototype.buildColumnDefsFromData=function(a){this.options.columnDefs=e.getColumnsFromData(a,this.options.excludeProperties)},p.prototype.registerRowBuilder=function(a){this.rowBuilders.push(a)},p.prototype.getColumn=function(a){var b=this.columns.filter(function(b){return b.colDef.name===a});return b.length>0?b[0]:null},p.prototype.getColDef=function(a){var b=this.options.columnDefs.filter(function(b){return b.name===a});return b.length>0?b[0]:null},p.prototype.assignTypes=function(){var b=this;b.options.columnDefs.forEach(function(c,d){if(!c.type){var f=new h(c,d,b),g=b.rows.length>0?b.rows[0]:null;g?c.type=e.guessType(b.getCellValue(g,f)):(a.log("Unable to assign type from data, so defaulting to string"),c.type="string")}})},p.prototype.addRowHeaderColumn=function(a){var b=this,c=new h(a,b.rowHeaderColumns.length,b);c.isRowHeader=!0,b.isRTL()?(b.createRightContainer(),c.renderContainer="right"):(b.createLeftContainer(),c.renderContainer="left"),b.columnBuilders[0](a,c,b.options).then(function(){c.enableFiltering=!1,c.enableSorting=!1,c.disableHiding=!0,b.rowHeaderColumns.push(c),b.buildColumns().then(function(){b.preCompileCellTemplates(),b.handleWindowResize()})})},p.prototype.buildColumns=function(){a.debug("buildColumns");var c,d=this,f=[],g=d.rowHeaderColumns.length;for(c=0;c<d.columns.length;c++)d.getColDef(d.columns[c].name)||(d.columns.splice(c,1),c--);return d.rowHeaderColumns.forEach(function(a){d.columns.unshift(a)}),d.options.columnDefs.forEach(function(a,b){d.preprocessColDef(a);var c=d.getColumn(a.name);c?c.updateColumnDef(a):(c=new h(a,e.nextUid(),d),d.columns.splice(b+g,0,c)),d.columnBuilders.forEach(function(b){f.push(b.call(d,a,c,d.options))})}),b.all(f)},p.prototype.preCompileCellTemplates=function(){var a=this;this.columns.forEach(function(b){var d=b.cellTemplate.replace(f.MODEL_COL_FIELD,a.getQualifiedColField(b));d=d.replace(f.COL_FIELD,"grid.getCellValue(row, col)");var e=c(d);b.compiledElementFn=e,b.compiledElementFnDefer&&b.compiledElementFnDefer.resolve(b.compiledElementFn)})},p.prototype.getQualifiedColField=function(a){return"row.entity."+e.preEval(a.field)},p.prototype.createLeftContainer=function(){this.hasLeftContainer()||(this.renderContainers.left=new m("left",this,{disableColumnOffset:!0}))},p.prototype.createRightContainer=function(){this.hasRightContainer()||(this.renderContainers.right=new m("right",this,{disableColumnOffset:!0}))},p.prototype.hasLeftContainer=function(){return void 0!==this.renderContainers.left},p.prototype.hasRightContainer=function(){return void 0!==this.renderContainers.right},p.prototype.preprocessColDef=function(a){if(!a.field&&!a.name)throw new Error("colDef.name or colDef.field property is required");void 0===a.name&&void 0!==a.field&&(a.name=a.field)},p.prototype.newInN=function(a,b,c,d){for(var e=this,f=[],g=0;g<b.length;g++){for(var h=d?b[g][d]:b[g],i=!1,j=0;j<a.length;j++){var k=c?a[j][c]:a[j];if(e.options.rowEquality(h,k)){i=!0;break}}i||f.push(h)}return f},p.prototype.getRow=function(a){var b=this.rows.filter(function(b){return b.entity===a});return b.length>0?b[0]:null},p.prototype.modifyRows=function(a){var c,d,e=this;if(0===e.rows.length&&a.length>0){if(e.options.enableRowHashing)for(e.rowHashMap||e.createRowHashMap(),c=0;c<a.length;c++)d=a[c],e.rowHashMap.put(d,{i:c,entity:d});e.addRows(a),e.assignTypes()}else if(a.length>0){var f,g,h;if(e.options.enableRowHashing){f=[],h=[];var i={};g=[],e.rowHashMap||e.createRowHashMap();var j=e.rowHashMap;for(c=0;c<a.length;c++){d=a[c];var k=!1;e.options.getRowIdentity(d)||(k=!0);var l=j.get(d);l?l.row&&(i[e.options.rowIdentity(d)]=!0):(j.put(d,{i:c,entity:d}),k?h.push(d):f.push(d))}for(c=0;c<e.rows.length;c++){var m=e.rows[c],n=e.options.rowIdentity(m.entity);i[n]||g.push(m)}}var o=f||[],p=h||a;o=o.concat(e.newInN(e.rows,p,"entity")),e.addRows(o);var q=e.getDeletedRows(g||e.rows,a);for(c=0;c<q.length;c++)e.options.enableRowHashing&&e.rowHashMap.remove(q[c].entity),e.rows.splice(e.rows.indexOf(q[c]),1)}else e.createRowHashMap(),e.rows.length=0;var r=b.when(e.processRowsProcessors(e.rows)).then(function(a){return e.setVisibleRows(a)}),s=b.when(e.processColumnsProcessors(e.columns)).then(function(a){return e.setVisibleColumns(a)});return b.all([r,s])},p.prototype.getDeletedRows=function(a,b){var c=this,d=a.filter(function(a){return!b.some(function(b){return c.options.rowEquality(b,a.entity)})});return d},p.prototype.addRows=function(a){for(var b=this,c=b.rows.length,d=0;d<a.length;d++){var e=b.processRowBuilders(new i(a[d],d+c,b));if(b.options.enableRowHashing){var f=b.rowHashMap.get(e.entity);f&&(f.row=e)}b.rows.push(e)}},p.prototype.processRowBuilders=function(a){var b=this;return b.rowBuilders.forEach(function(c){c.call(b,a,b.gridOptions)}),a},p.prototype.registerStyleComputation=function(a){this.styleComputations.push(a)},p.prototype.registerRowsProcessor=function(a){if(!angular.isFunction(a))throw"Attempt to register non-function rows processor: "+a;this.rowsProcessors.push(a)},p.prototype.removeRowsProcessor=function(a){var b=this.rowsProcessors.indexOf(a);"undefined"!=typeof b&&void 0!==b&&this.rowsProcessors.splice(b,1)},p.prototype.processRowsProcessors=function(a){function c(a,e){var g=d.rowsProcessors[a];return b.when(g.call(d,e,d.columns)).then(function(b){if(!b)throw"Processor at index "+a+" did not return a set of renderable rows";if(!angular.isArray(b))throw"Processor at index "+a+" did not return an array";return a++,a<=d.rowsProcessors.length-1?c(a,b):void f.resolve(b)})}var d=this,e=a.slice(0);if(0===d.rowsProcessors.length)return b.when(e);var f=b.defer();return c(0,e),f.promise},p.prototype.setVisibleRows=function(a){var b=this;for(var c in b.renderContainers){var d=b.renderContainers[c];d.visibleRowCache.length=0}for(var e=0;e<a.length;e++){var f=a[e];f.visible&&("undefined"!=typeof f.renderContainer&&f.renderContainer?b.renderContainers[f.renderContainer].visibleRowCache.push(f):b.renderContainers.body.visibleRowCache.push(f))}},p.prototype.registerColumnsProcessor=function(a){if(!angular.isFunction(a))throw"Attempt to register non-function rows processor: "+a;this.columnsProcessors.push(a)},p.prototype.removeColumnsProcessor=function(a){var b=this.columnsProcessors.indexOf(a);"undefined"!=typeof b&&void 0!==b&&this.columnsProcessors.splice(b,1)},p.prototype.processColumnsProcessors=function(a){function c(a,g){var h=d.columnsProcessors[a];return b.when(h.call(d,g,d.rows)).then(function(b){if(!b)throw"Processor at index "+a+" did not return a set of renderable rows";if(!angular.isArray(b))throw"Processor at index "+a+" did not return an array";return a++,a<=d.columnsProcessors.length-1?c(a,e):void f.resolve(e)})}var d=this,e=a.slice(0);if(0===d.columnsProcessors.length)return b.when(e);var f=b.defer();return c(0,e),f.promise},p.prototype.setVisibleColumns=function(a){var b=this;for(var c in b.renderContainers){var d=b.renderContainers[c];d.visibleColumnCache.length=0}for(var e=0;e<a.length;e++){var f=a[e];f.visible&&("undefined"!=typeof f.renderContainer&&f.renderContainer?b.renderContainers[f.renderContainer].visibleColumnCache.push(f):b.renderContainers.body.visibleColumnCache.push(f))}},p.prototype.handleWindowResize=function(){var a=this;a.gridWidth=e.elementWidth(a.element),a.gridHeight=e.elementHeight(a.element),a.queueRefresh()},p.prototype.queueRefresh=function(){var a=this;return a.refreshCanceller&&n.cancel(a.refreshCanceller),a.refreshCanceller=n(function(){a.refreshCanvas(!0)}),a.refreshCanceller.then(function(){a.refreshCanceller=null}),a.refreshCanceller},p.prototype.buildStyles=function(){var a=this;a.customStyles="",a.styleComputations.sort(function(a,b){return null===a.priority?1:null===b.priority?-1:null===a.priority&&null===b.priority?0:a.priority-b.priority}).forEach(function(b){var c=b.func.call(a);angular.isString(c)&&(a.customStyles+="\n"+c)})},p.prototype.minColumnsToRender=function(){var a=this,b=this.getViewportWidth(),c=0,d=0;return a.columns.forEach(function(e,f){if(b>d)d+=e.drawnWidth,c++;else{for(var g=0,h=f;h>=f-c;h--)g+=a.columns[h].drawnWidth;b>g&&c++}}),c},p.prototype.getBodyHeight=function(){var a=this.getViewportHeight();return"undefined"!=typeof this.horizontalScrollbarHeight&&void 0!==this.horizontalScrollbarHeight&&this.horizontalScrollbarHeight>0&&(a+=this.horizontalScrollbarHeight),a},p.prototype.getViewportHeight=function(){var a=this,b=this.gridHeight-this.headerHeight-this.footerHeight;"undefined"!=typeof this.horizontalScrollbarHeight&&void 0!==this.horizontalScrollbarHeight&&this.horizontalScrollbarHeight>0&&(b-=this.horizontalScrollbarHeight);var c=a.getViewportAdjustment();return b+=c.height},p.prototype.getViewportWidth=function(){var a=this,b=this.gridWidth;"undefined"!=typeof this.verticalScrollbarWidth&&void 0!==this.verticalScrollbarWidth&&this.verticalScrollbarWidth>0&&(b-=this.verticalScrollbarWidth);var c=a.getViewportAdjustment();return b+=c.width},p.prototype.getHeaderViewportWidth=function(){var a=this.getViewportWidth();return"undefined"!=typeof this.verticalScrollbarWidth&&void 0!==this.verticalScrollbarWidth&&this.verticalScrollbarWidth>0&&(a+=this.verticalScrollbarWidth),a},p.prototype.registerViewportAdjuster=function(a){this.viewportAdjusters.push(a)},p.prototype.removeViewportAdjuster=function(a){var b=this.viewportAdjusters.indexOf(a);"undefined"!=typeof b&&void 0!==b&&this.viewportAdjusters.splice(b,1)},p.prototype.getViewportAdjustment=function(){var a=this,b={height:0,width:0};return a.viewportAdjusters.forEach(function(a){b=a.call(this,b)}),b},p.prototype.getVisibleRowCount=function(){return this.renderContainers.body.visibleRowCache.length},p.prototype.getVisibleRows=function(){return this.renderContainers.body.visibleRowCache},p.prototype.getVisibleColumnCount=function(){return this.renderContainers.body.visibleColumnCache.length},p.prototype.searchRows=function(a){return l.search(this,a,this.columns)},p.prototype.sortByColumn=function(a){return k.sort(this,a,this.columns)},p.prototype.getCellValue=function(a,b){var c=this;return c.cellValueGetterCache[b.colDef.name]||(c.cellValueGetterCache[b.colDef.name]=d(a.getEntityQualifiedColField(b))),c.cellValueGetterCache[b.colDef.name](a)},p.prototype.getNextColumnSortPriority=function(){var a=this,b=0;return a.columns.forEach(function(a){a.sort&&a.sort.priority&&a.sort.priority>b&&(b=a.sort.priority)}),b+1},p.prototype.resetColumnSorting=function(a){var b=this;b.columns.forEach(function(b){b!==a&&(b.sort={})})},p.prototype.getColumnSorting=function(){var a,b=this,c=[];return a=b.columns.slice(0),a.sort(k.prioritySort).forEach(function(a){a.sort&&"undefined"!=typeof a.sort.direction&&a.sort.direction&&(a.sort.direction===f.ASC||a.sort.direction===f.DESC)&&c.push(a)}),c},p.prototype.sortColumn=function(a,c,d){var e=this,g=null;if("undefined"==typeof a||!a)throw new Error("No column parameter provided");return"boolean"==typeof c?d=c:g=c,d?a.sort.priority=e.getNextColumnSortPriority():(e.resetColumnSorting(a),a.sort.priority=0),a.sort.direction=g?g:a.sort.direction&&a.sort.direction===f.ASC?f.DESC:a.sort.direction&&a.sort.direction===f.DESC?a.colDef&&a.colDef.suppressRemoveSort?f.ASC:null:f.ASC,e.api.core.raise.sortChanged(e,e.getColumnSorting()),b.when(a)},p.prototype.renderingComplete=function(){angular.isFunction(this.options.onRegisterApi)&&this.options.onRegisterApi(this.api),this.api.core.raise.renderingComplete(this.api)},p.prototype.createRowHashMap=function(){var a=this,b=new o;b.grid=a,a.rowHashMap=b},p.prototype.refresh=function(){a.debug("grid refresh");var c=this,d=c.processRowsProcessors(c.rows).then(function(a){c.setVisibleRows(a)}),e=c.processColumnsProcessors(c.columns).then(function(a){c.setVisibleColumns(a)});return b.all([d,e]).then(function(){c.redrawInPlace(),c.refreshCanvas(!0)})},p.prototype.refreshRows=function(){var a=this;return a.processRowsProcessors(a.rows).then(function(b){a.setVisibleRows(b),a.redrawRows(),a.refreshCanvas()})},p.prototype.refreshCanvas=function(a){var c=this;a&&c.buildStyles();var d=b.defer(),f=[];for(var g in c.renderContainers)if(c.renderContainers.hasOwnProperty(g)){var h=c.renderContainers[g];h.header&&f.push(h)}return n(f.length>0?function(){var b,g,h=!1,i=0;for(b=0;b<f.length;b++)if(g=f[b],g.header){var j=g.headerHeight,k=e.outerElementHeight(g.header);g.headerHeight=parseInt(k,10),j!==k&&(h=!0);var l=e.getBorderSize(g.header,"top"),m=e.getBorderSize(g.header,"bottom"),n=parseInt(k-l-m,10);n=0>n?0:n,g.innerHeaderHeight=n,n>i&&(i=n)}for(b=0;b<f.length;b++)g=f[b],g.headerHeight<i&&(g.explicitHeaderHeight=i);a&&h&&c.buildStyles(),d.resolve()}:function(){d.resolve()}),d.promise},p.prototype.redrawInPlace=function(){var a=this;for(var b in a.renderContainers){var c=a.renderContainers[b];c.adjustRows(c.prevScrollTop,null),c.adjustColumns(c.prevScrollLeft,null)}},o.prototype={put:function(a,b){this[this.grid.options.rowIdentity(a)]=b},get:function(a){return this[this.grid.options.rowIdentity(a)]},remove:function(a){var b=this[a=this.grid.options.rowIdentity(a)];return delete this[a],b}},p}])}(),function(){angular.module("ui.grid").factory("GridApi",["$log","$q","$rootScope","gridUtil","uiGridConstants","GridRow","uiGridGridMenuService",function(a,b,c,d,e,f){function g(a,b,c,d){return a.$on(b,function(){var a=Array.prototype.slice.call(arguments);a.splice(0,1),c.apply(d.api,a)})}var h=function(a){this.grid=a,this.listeners=[],this.registerEvent("core","renderingComplete"),this.registerEvent("core","filterChanged"),this.registerMethod("core","setRowInvisible",f.prototype.setRowInvisible),this.registerMethod("core","clearRowInvisible",f.prototype.clearRowInvisible),this.registerMethod("core","getVisibleRows",f.prototype.getVisibleRows),this.registerEvent("core","rowsVisibleChanged")};return h.prototype.suppressEvents=function(a,b){var c=this,d=angular.isArray(a)?a:[a],e=[];d.forEach(function(a){e=c.listeners.filter(function(b){return a===b.handler})}),e.forEach(function(a){a.dereg()}),b(),e.forEach(function(a){a.dereg=g(a.scope,a.eventId,a.handler,c.grid)})},h.prototype.registerEvent=function(b,d){var e=this;e[b]||(e[b]={});var f=e[b];f.on||(f.on={},f.raise={});var h=e.grid.id+b+d;a.log("Creating raise event method "+b+".raise."+d),f.raise[d]=function(){c.$broadcast.apply(c,[h].concat(Array.prototype.slice.call(arguments)))},a.log("Creating on event method "+b+".on."+d),f.on[d]=function(a,b){var c=g(a,h,b,e.grid),d={handler:b,dereg:c,eventId:h,scope:a};e.listeners.push(d),a.$on("$destroy",function(){d.dereg=null,d.handler=null,d.eventId=null,d.scope=null})}},h.prototype.registerEventsFromObject=function(a){var b=this,c=[];angular.forEach(a,function(a,b){var d={name:b,events:[]};angular.forEach(a,function(a,b){d.events.push(b)}),c.push(d)}),c.forEach(function(a){a.events.forEach(function(c){b.registerEvent(a.name,c)})})},h.prototype.registerMethod=function(a,b,c,e){this[a]||(this[a]={});var f=this[a];f[b]=d.createBoundedWrapper(e||this.grid,c)},h.prototype.registerMethodsFromObject=function(a,b){var c=this,d=[];angular.forEach(a,function(a,b){var c={name:b,methods:[]};angular.forEach(a,function(a,b){c.methods.push({name:b,fn:a})}),d.push(c)}),d.forEach(function(a){a.methods.forEach(function(d){c.registerMethod(a.name,d.name,d.fn,b)})})},h}])}(),function(){angular.module("ui.grid").factory("GridColumn",["gridUtil","uiGridConstants","i18nService","$log",function(a,b,c,d){function e(a,b,c){var d=this;d.grid=c,d.uid=b,d.updateColumnDef(a)}return e.prototype.setPropertyOrDefault=function(a,b,c){var d=this;d[b]="undefined"!=typeof a[b]&&a[b]?a[b]:"undefined"!=typeof d[b]?d[b]:c?c:{}},e.prototype.updateColumnDef=function(b){var c=this;if(c.colDef=b,void 0===b.name)throw new Error("colDef.name is required for column at index "+c.grid.options.columnDefs.indexOf(b));var f="Cannot parse column width '"+b.width+"' for column named '"+b.name+"'";if(a.isNullOrUndefined(c.width)||!angular.isNumber(c.width))if(a.isNullOrUndefined(b.width))c.width="*";else if(angular.isNumber(b.width))c.width=b.width;else if(a.endsWith(b.width,"%")){var g=b.width.replace(/%/g,""),h=parseInt(g,10);if(isNaN(h))throw new Error(f);c.width=b.width}else if(b.width.match(/^(\d+)$/))c.width=parseInt(b.width.match(/^(\d+)$/)[1],10);else if(!b.width.match(/^\*+$/))throw new Error(f);e.prototype.unsort=function(){this.sort={},c.grid.api.core.raise.sortChanged(c,c.grid.getColumnSorting())},c.minWidth=b.minWidth?b.minWidth:50,c.maxWidth=b.maxWidth?b.maxWidth:9e3,c.field=void 0===b.field?b.name:b.field,"string"!=typeof c.field&&d.error("Field is not a string, this is likely to break the code, Field is: "+c.field),c.name=b.name,c.displayName=void 0===b.displayName?a.readableColumnName(b.name):b.displayName,c.aggregationType=angular.isDefined(b.aggregationType)?b.aggregationType:null,c.footerCellTemplate=angular.isDefined(b.footerCellTemplate)?b.footerCellTemplate:null,c.cellClass=b.cellClass,c.cellFilter=b.cellFilter?b.cellFilter:"",c.headerCellFilter=b.headerCellFilter?b.headerCellFilter:"",c.visible=a.isNullOrUndefined(b.visible)||b.visible,c.headerClass=b.headerClass,c.visible=!0,c.enableSorting="undefined"!=typeof b.enableSorting?b.enableSorting:!0,c.sortingAlgorithm=b.sortingAlgorithm,c.enableFiltering="undefined"!=typeof b.enableFiltering?b.enableFiltering:!0,c.setPropertyOrDefault(b,"menuItems",[]),c.setPropertyOrDefault(b,"sort");var i=[];b.filter?i.push(b.filter):c.enableFiltering&&c.grid.options.enableFiltering&&i.push({}),c.setPropertyOrDefault(b,"filter"),c.setPropertyOrDefault(b,"filters",i)},e.prototype.getColClass=function(a){var c=b.COL_CLASS_PREFIX+this.uid;return a?"."+c:c},e.prototype.getColClassDefinition=function(){return" .grid"+this.grid.id+" "+this.getColClass(!0)+" { width: "+this.drawnWidth+"px; }"},e.prototype.getRenderContainer=function(){var a=this,b=a.renderContainer;return(null===b||""===b||void 0===b)&&(b="body"),a.grid.renderContainers[b]},e.prototype.showColumn=function(){this.colDef.visible=!0},e.prototype.hideColumn=function(){this.colDef.visible=!1},e.prototype.getAggregationValue=function(){var a=this,c=0,d=a.grid.getVisibleRows(),e=[];return angular.forEach(d,function(b){var c=a.grid.getCellValue(b,a);angular.isNumber(c)&&e.push(c)}),angular.isFunction(a.aggregationType)?a.aggregationType(d,a):a.aggregationType===b.aggregationTypes.count?a.getAggregationText("aggregation.count",a.grid.getVisibleRowCount()):a.aggregationType===b.aggregationTypes.sum?(angular.forEach(e,function(a){c+=a}),a.getAggregationText("aggregation.sum",c)):a.aggregationType===b.aggregationTypes.avg?(angular.forEach(e,function(a){c+=a}),c/=e.length,a.getAggregationText("aggregation.avg",c)):a.aggregationType===b.aggregationTypes.min?a.getAggregationText("aggregation.min",Math.min.apply(null,e)):a.aggregationType===b.aggregationTypes.max?a.getAggregationText("aggregation.max",Math.max.apply(null,e)):null},e.prototype.getAggregationText=function(a,b){var d=this;return d.colDef.aggregationHideLabel?b:c.getSafeText(a)+b},e.prototype.getCellTemplate=function(){var a=this;return a.cellTemplatePromise},e.prototype.getCompiledElementFn=function(){var a=this;return a.compiledElementFnDefer.promise},e}])}(),function(){angular.module("ui.grid").factory("GridOptions",["gridUtil",function(a){function b(){this.onRegisterApi=angular.noop(),this.data=[],this.columnDefs=[],this.excludeProperties=["$$hashKey"],this.enableRowHashing=!0,this.rowIdentity=function(b){return a.hashKey(b)},this.getRowIdentity=function(a){return a.$$hashKey},this.headerRowHeight=50,this.rowHeight=30,this.maxVisibleRowCount=200,this.minRowsToShow=10,this.showFooter=!1,this.footerRowHeight=30,this.columnWidth=50,this.maxVisibleColumnCount=200,this.virtualizationThreshold=20,this.columnVirtualizationThreshold=10,this.excessRows=4,this.scrollThreshold=4,this.excessColumns=4,this.horizontalScrollThreshold=2,this.scrollThrottle=70,this.enableSorting=!0,this.enableFiltering=!1,this.enableColumnMenu=!0,this.enableScrollbars=!0,this.minimumColumnSize=10,this.rowEquality=function(a,b){return a===b},this.headerTemplate=null,this.footerTemplate=null,this.rowTemplate="ui-grid/ui-grid-row"}return b}])}(),function(){angular.module("ui.grid").factory("GridRenderContainer",["$log","gridUtil",function(a,b){function c(a,b,c){var d=this;d.name=a,d.grid=b,d.visibleRowCache=[],d.visibleColumnCache=[],d.renderedRows=[],d.renderedColumns=[],d.prevScrollTop=0,d.prevScrolltopPercentage=0,d.prevRowScrollIndex=0,d.prevScrollLeft=0,d.prevScrollleftPercentage=0,d.prevColumnScrollIndex=0,d.columnStyles="",d.viewportAdjusters=[],c&&angular.isObject(c)&&angular.extend(d,c),b.registerStyleComputation({priority:5,func:function(){return d.columnStyles}})}return c.prototype.reset=function(){this.visibleColumnCache.length=0,this.visibleRowCache.length=0,this.renderedRows.length=0,this.renderedColumns.length=0},c.prototype.minRowsToRender=function(){for(var a=this,b=0,c=0,d=a.getViewportHeight(),e=a.visibleRowCache.length-1;d>c&&e>=0;e--)c+=a.visibleRowCache[e].height,b++;return b},c.prototype.minColumnsToRender=function(){for(var a=this,b=this.getViewportWidth(),c=0,d=0,e=0;e<a.visibleColumnCache.length;e++){var f=a.visibleColumnCache[e];if(b>d)d+=f.drawnWidth?f.drawnWidth:0,c++;else{for(var g=0,h=e;h>=e-c;h--)g+=a.visibleColumnCache[h].drawnWidth?a.visibleColumnCache[h].drawnWidth:0;b>g&&c++}}return c},c.prototype.getVisibleRowCount=function(){return this.visibleRowCache.length},c.prototype.registerViewportAdjuster=function(a){this.viewportAdjusters.push(a)},c.prototype.removeViewportAdjuster=function(a){var b=this.viewportAdjusters.indexOf(a);"undefined"!=typeof b&&void 0!==b&&this.viewportAdjusters.splice(b,1)},c.prototype.getViewportAdjustment=function(){var a=this,b={height:0,width:0};return a.viewportAdjusters.forEach(function(a){b=a.call(this,b)}),b},c.prototype.getViewportHeight=function(){var a=this,b=a.headerHeight?a.headerHeight:a.grid.headerHeight,c=a.grid.gridHeight-b-a.grid.footerHeight;"undefined"!=typeof a.horizontalScrollbarHeight&&void 0!==a.horizontalScrollbarHeight&&a.horizontalScrollbarHeight>0&&(c-=a.horizontalScrollbarHeight);var d=a.getViewportAdjustment();return c+=d.height},c.prototype.getViewportWidth=function(){var a=this,b=a.grid.gridWidth;"undefined"!=typeof a.grid.verticalScrollbarWidth&&void 0!==a.grid.verticalScrollbarWidth&&a.grid.verticalScrollbarWidth>0&&(b-=a.grid.verticalScrollbarWidth);var c=a.getViewportAdjustment();return b+=c.width},c.prototype.getHeaderViewportWidth=function(){var a=this,b=this.getViewportWidth();return"undefined"!=typeof a.grid.verticalScrollbarWidth&&void 0!==a.grid.verticalScrollbarWidth&&a.grid.verticalScrollbarWidth>0&&(b+=a.grid.verticalScrollbarWidth),b},c.prototype.getCanvasHeight=function(){var a=this,b=0;return a.visibleRowCache.forEach(function(a){b+=a.height}),"undefined"!=typeof a.grid.horizontalScrollbarHeight&&void 0!==a.grid.horizontalScrollbarHeight&&a.grid.horizontalScrollbarHeight>0&&(b-=a.grid.horizontalScrollbarHeight),b},c.prototype.getCanvasWidth=function(){var a=this,b=a.canvasWidth;return"undefined"!=typeof a.verticalScrollbarWidth&&void 0!==a.verticalScrollbarWidth&&a.verticalScrollbarWidth>0&&(b-=a.verticalScrollbarWidth),b},c.prototype.setRenderedRows=function(a){this.renderedRows.length=a.length;for(var b=0;b<a.length;b++)this.renderedRows[b]=a[b]},c.prototype.setRenderedColumns=function(a){this.renderedColumns.length=a.length;for(var b=0;b<a.length;b++)this.renderedColumns[b]=a[b];this.updateColumnOffset()},c.prototype.updateColumnOffset=function(){for(var a=0,b=0;b<this.currentFirstColumn;b++)a+=this.visibleColumnCache[b].drawnWidth;this.columnOffset=a},c.prototype.adjustScrollVertical=function(a,b,c){(this.prevScrollTop!==a||c)&&(a=this.getCanvasHeight()*b,this.adjustRows(a,b),this.prevScrollTop=a,this.prevScrolltopPercentage=b,this.grid.queueRefresh())},c.prototype.adjustScrollHorizontal=function(a,b,c){(this.prevScrollLeft!==a||c)&&(a=this.getCanvasWidth()*b,this.adjustColumns(a,b),this.prevScrollLeft=a,this.prevScrollleftPercentage=b,this.grid.queueRefresh())},c.prototype.adjustRows=function(a,b){var c=this,d=c.minRowsToRender(),e=c.visibleRowCache,f=e.length-d;c.maxRowIndex=f;c.prevRowScrollIndex;"undefined"!=typeof b&&null!==b||!a||(b=a/c.getCanvasHeight());var g=Math.ceil(Math.min(f,f*b));g>f&&(g=f);var h=[];if(e.length>c.grid.options.virtualizationThreshold){if(c.prevScrollTop<a&&g<c.prevRowScrollIndex+c.grid.options.scrollThreshold&&f>g)return;if(c.prevScrollTop>a&&g>c.prevRowScrollIndex-c.grid.options.scrollThreshold&&f>g)return;var i=Math.max(0,g-c.grid.options.excessRows),j=Math.min(e.length,g+d+c.grid.options.excessRows);h=[i,j]}else{var k=c.visibleRowCache.length;h=[0,Math.max(k,d+c.grid.options.excessRows)]}c.updateViewableRowRange(h),c.prevRowScrollIndex=g},c.prototype.adjustColumns=function(a,b){var c=this,d=c.minColumnsToRender(),e=c.visibleColumnCache,f=e.length-d;"undefined"!=typeof b&&null!==b||!a||(b=a/c.getCanvasWidth());var g=Math.ceil(Math.min(f,f*b));g>f&&(g=f);var h=[];if(e.length>c.grid.options.columnVirtualizationThreshold&&c.getCanvasWidth()>c.getViewportWidth()){if(c.prevScrollLeft<a&&g<c.prevColumnScrollIndex+c.grid.options.horizontalScrollThreshold&&f>g)return;if(c.prevScrollLeft>a&&g>c.prevColumnScrollIndex-c.grid.options.horizontalScrollThreshold&&f>g)return;var i=Math.max(0,g-c.grid.options.excessColumns),j=Math.min(e.length,g+d+c.grid.options.excessColumns);h=[i,j]}else{var k=c.visibleColumnCache.length;h=[0,Math.max(k,d+c.grid.options.excessColumns)]}c.updateViewableColumnRange(h),c.prevColumnScrollIndex=g},c.prototype.updateViewableRowRange=function(a){var b=this.visibleRowCache.slice(a[0],a[1]);
this.currentTopRow=a[0],this.setRenderedRows(b)},c.prototype.updateViewableColumnRange=function(a){var b=this.visibleColumnCache.slice(a[0],a[1]);this.currentFirstColumn=a[0],this.setRenderedColumns(b)},c.prototype.rowStyle=function(a){var b=this,c={};if(0===a&&0!==b.currentTopRow){var d=b.currentTopRow*b.grid.options.rowHeight;c["margin-top"]=d+"px"}return 0!==b.currentFirstColumn&&(b.grid.isRTL()?c["margin-right"]=b.columnOffset+"px":c["margin-left"]=b.columnOffset+"px"),c},c.prototype.columnStyle=function(a){var b=this;if(0===a&&0!==b.currentFirstColumn){var c=b.columnOffset;return b.grid.isRTL()?{"margin-right":c+"px"}:{"margin-left":c+"px"}}return null},c.prototype.updateColumnWidths=function(){var a=this,c=[],d=[],e=0,f=a.getViewportWidth();"undefined"!=typeof a.grid.verticalScrollbarWidth&&void 0!==a.grid.verticalScrollbarWidth&&a.grid.verticalScrollbarWidth>0&&(f+=a.grid.verticalScrollbarWidth);var g,h=0,i=0,j="",k=a.visibleColumnCache;k.forEach(function(a){if(a.visible){var f=!1;angular.isNumber(a.width)||(f=isNaN(a.width)&&b.endsWith(a.width,"%")),angular.isString(a.width)&&-1!==a.width.indexOf("*")?(e=parseInt(e+a.width.length,10),c.push(a)):f?d.push(a):angular.isNumber(a.width)&&(h=parseInt(h+a.width,10),i=parseInt(i,10)+parseInt(a.width,10),a.drawnWidth=a.width)}});var l,m,n,o=f-h;if(d.length>0){for(l=0;l<d.length;l++){m=d[l];var p=parseInt(m.width.replace(/%/g,""),10)/100;n=parseInt(p*o,10),m.colDef.minWidth&&n<m.colDef.minWidth?(n=m.colDef.minWidth,o-=n,i+=n,m.drawnWidth=n,d.splice(l,1)):m.colDef.maxWidth&&n>m.colDef.maxWidth&&(n=m.colDef.maxWidth,o-=n,i+=n,m.drawnWidth=n,d.splice(l,1))}d.forEach(function(a){var b=parseInt(a.width.replace(/%/g,""),10)/100,c=parseInt(b*o,10);i+=c,a.drawnWidth=c})}if(c.length>0){var q=parseInt(o/e,10);for(l=0;l<c.length;l++)m=c[l],n=parseInt(q*m.width.length,10),m.colDef.minWidth&&n<m.colDef.minWidth?(n=m.colDef.minWidth,o-=n,e--,i+=n,m.drawnWidth=n,g=m,c.splice(l,1)):m.colDef.maxWidth&&n>m.colDef.maxWidth&&(n=m.colDef.maxWidth,o-=n,e--,i+=n,m.drawnWidth=n,c.splice(l,1));q=parseInt(o/e,10),c.forEach(function(a){var b=parseInt(q*a.width.length,10);i+=b,a.drawnWidth=b})}var r=f-parseInt(i,10);if(r>0&&i>0&&f>i){var s=!1;if(k.forEach(function(a){a.width&&!angular.isNumber(a.width)&&(s=!0)}),s)for(var t=function(a){r>0&&(a.drawnWidth=a.drawnWidth+1,i+=1,r--)};r>0;)k.forEach(t)}f>i&&(i=f),k.forEach(function(a){j+=a.getColClassDefinition()}),a.grid.verticalScrollbarWidth&&(i+=a.grid.verticalScrollbarWidth),a.canvasWidth=parseInt(i,10),this.columnStyles=j},c}])}(),function(){angular.module("ui.grid").factory("GridRow",["gridUtil",function(a){function b(b,c,d){this.grid=d,this.entity=b,this.uid=a.nextUid(),this.visible=!0,this.height=d.options.rowHeight}return b.prototype.getQualifiedColField=function(a){return"row."+this.getEntityQualifiedColField(a)},b.prototype.getEntityQualifiedColField=function(b){return a.preEval("entity."+b.field)},b.prototype.setRowInvisible=function(a){null!==a&&(a.forceInvisible=!0,a.visible&&(a.visible=!1,a.grid.refresh(),a.grid.api.core.raise.rowsVisibleChanged()))},b.prototype.clearRowInvisible=function(a){null!==a&&(a.forceInvisible=!1,a.visible||(a.visible=!0,a.grid.refresh(),a.grid.api.core.raise.rowsVisibleChanged()))},b.prototype.getVisibleRows=function(a){return a.rows.filter(function(a){return a.visible})},b}])}(),function(){"use strict";angular.module("ui.grid").service("gridClassFactory",["gridUtil","$q","$compile","$templateCache","uiGridConstants","$log","Grid","GridColumn","GridRow",function(a,b,c,d,e,f,g){var h={createGrid:function(d){d="undefined"!=typeof d?d:{},d.id=a.newId();var e=new g(d);if(e.options.rowTemplate){var f=b.defer();e.getRowTemplateFn=f.promise,a.getTemplate(e.options.rowTemplate).then(function(a){var b=c(a);f.resolve(b)},function(){throw new Error("Couldn't fetch/use row template '"+e.options.rowTemplate+"'")})}return e.registerColumnBuilder(h.defaultColumnBuilder),e.registerRowsProcessor(function(a){return a.forEach(function(a){a.visible=!a.forceInvisible}),a}),e.registerColumnsProcessor(function(a){return a.forEach(function(a){a.visible=!0}),a}),e.registerColumnsProcessor(function(a){return a.forEach(function(a){a.colDef.visible===!1&&(a.visible=!1)}),a}),e.options.enableFiltering&&e.registerRowsProcessor(e.searchRows),e.registerRowsProcessor(e.options.externalSort&&angular.isFunction(e.options.externalSort)?e.options.externalSort:e.sortByColumn),e},defaultColumnBuilder:function(c,d){var f=[];return c.headerCellTemplate||(c.headerCellTemplate="ui-grid/uiGridHeaderCell"),c.cellTemplate||(c.cellTemplate="ui-grid/uiGridCell",d.cellTemplatePromise=a.getTemplate(c.cellTemplate)),d.cellTemplatePromise=a.getTemplate(c.cellTemplate),f.push(d.cellTemplatePromise.then(function(a){d.cellTemplate=a.replace(e.CUSTOM_FILTERS,d.cellFilter?"|"+d.cellFilter:"")},function(){throw new Error("Couldn't fetch/use colDef.cellTemplate '"+c.cellTemplate+"'")})),f.push(a.getTemplate(c.headerCellTemplate).then(function(a){d.headerCellTemplate=a.replace(e.CUSTOM_FILTERS,d.headerCellFilter?"|"+d.headerCellFilter:"")},function(){throw new Error("Couldn't fetch/use colDef.headerCellTemplate '"+c.headerCellTemplate+"'")})),d.compiledElementFnDefer=b.defer(),b.all(f)}};return h}])}(),function(){function a(a){return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}function b(){var a=function(b,c){return b&&a.cache[b]?a.cache[b]:b&&c?(a.cache[b]=c,a.cache[b]):void 0};return a.cache={},a.clear=function(){a.cache={}},a}var c=angular.module("ui.grid");c.service("rowSearcher",["$log","uiGridConstants",function(c,d){var e=d.filter.STARTS_WITH,f={};return f.getTerm=function(a){if("undefined"==typeof a.term)return a.term;var b=a.term;return"string"==typeof b&&(b=b.trim()),b},f.stripTerm=function(b){var c=f.getTerm(b);return"string"==typeof c?a(c.replace(/(^\*|\*$)/g,"")):c},f.guessCondition=function(a){if("undefined"==typeof a.term||!a.term)return e;var b=f.getTerm(a);if(/\*/.test(b)){var c="";a.flags&&a.flags.caseSensitive||(c+="i");var d=b.replace(/(\\)?\*/g,function(a,b){return b?a:"[\\s\\S]*?"});return new RegExp("^"+d+"$",c)}return e},f.runColumnFilter=function(a,b,c,e,g,h){var i=typeof h.condition;"undefined"!==i&&h.condition||(h.condition=d.filter.CONTAINS);var j=f.stripTerm(h);if(null===j||void 0===j||""===j)return!0;var k=a.getCellValue(b,c),l="";h.flags&&h.flags.caseSensitive||(l+="i");var m=c.field+g;if(h.condition instanceof RegExp){if(!h.condition.test(k))return!1}else{if("function"===i)return h.condition(j,k,b,c);if(h.condition===d.filter.STARTS_WITH){var n=e(m)?e(m):e(m,new RegExp("^"+j,l));if(!n.test(k))return!1}else if(h.condition===d.filter.ENDS_WITH){var o=e(m)?e(m):e(m,new RegExp(j+"$",l));if(!o.test(k))return!1}else if(h.condition===d.filter.CONTAINS){var p=e(m)?e(m):e(m,new RegExp(j,l));if(!p.test(k))return!1}else if(h.condition===d.filter.EXACT){var q=e(m)?e(m):e(m,new RegExp("^"+j+"$",l));if(!q.test(k))return!1}else if(h.condition===d.filter.GREATER_THAN){if(j>=k)return!1}else if(h.condition===d.filter.GREATER_THAN_OR_EQUAL){if(j>k)return!1}else if(h.condition===d.filter.LESS_THAN){if(k>=j)return!1}else if(h.condition===d.filter.LESS_THAN_OR_EQUAL){if(k>j)return!1}else if(h.condition===d.filter.NOT_EQUAL&&!angular.equals(k,j))return!1}return!0},f.searchColumn=function(a,b,c,d){var e=[];if(a.options.useExternalFiltering)return!0;if(!("undefined"!=typeof c.filters&&c.filters&&c.filters.length>0))return!0;e=c.filters;for(var g in e){var h=e[g];if(!h.condition){var i="cond-"+c.field+"-"+h.term,j=d(i)?d(i):d(i,f.guessCondition(h));h={term:h.term,condition:j,flags:angular.extend({caseSensitive:!1},h.flags)}}var k=f.runColumnFilter(a,b,c,d,g,h);if(!k)return!1}return!0},f.search=function(a,c,d){if(c){var e=new b,g=[];return d.forEach(function(a){"undefined"!=typeof a.filters&&a.filters.length>0?g.push(a):"undefined"!=typeof a.filter&&a.filter&&"undefined"!=typeof a.filter.term&&a.filter.term&&g.push(a)}),g.length>0&&(g.forEach(function(b){c.forEach(function(c){(c.forceInvisible||!f.searchColumn(a,c,b,e))&&(c.visible=!1)})}),a.api.core.raise.rowsVisibleChanged&&a.api.core.raise.rowsVisibleChanged()),e.clear(),c}},f}])}(),function(){var a=angular.module("ui.grid");a.service("rowSorter",["$parse","uiGridConstants",function(a,b){var c="("+b.CURRENCY_SYMBOLS.map(function(a){return"\\"+a}).join("|")+")?",d=(new RegExp("^[-+]?"+c+"[\\d,.]+"+c+"%?$"),{colSortFnCache:[]});return d.guessSortFn=function(a){switch(a){case"number":return d.sortNumber;case"boolean":return d.sortBool;case"string":return d.sortAlpha;case"date":return d.sortDate;case"object":return d.basicSort;default:throw new Error("No sorting function found for type:"+a)}},d.handleNulls=function(a,b){if(!a&&0!==a&&a!==!1||!b&&0!==b&&b!==!1){if(!a&&0!==a&&a!==!1&&!b&&0!==b&&b!==!1)return 0;if(!a&&0!==a&&a!==!1)return 1;if(!b&&0!==b&&b!==!1)return-1}return null},d.basicSort=function(a,b){var c=d.handleNulls(a,b);return null!==c?c:a===b?0:b>a?-1:1},d.sortNumber=function(a,b){var c=d.handleNulls(a,b);return null!==c?c:a-b},d.sortNumberStr=function(a,b){var c=d.handleNulls(a,b);if(null!==c)return c;var e,f,g=!1,h=!1;return e=parseFloat(a.replace(/[^0-9.-]/g,"")),isNaN(e)&&(g=!0),f=parseFloat(b.replace(/[^0-9.-]/g,"")),isNaN(f)&&(h=!0),g&&h?0:g?1:h?-1:e-f},d.sortAlpha=function(a,b){var c=d.handleNulls(a,b);if(null!==c)return c;var e=a.toLowerCase(),f=b.toLowerCase();return e===f?0:f>e?-1:1},d.sortDate=function(a,b){var c=d.handleNulls(a,b);if(null!==c)return c;var e=a.getTime(),f=b.getTime();return e===f?0:f>e?-1:1},d.sortBool=function(a,b){var c=d.handleNulls(a,b);return null!==c?c:a&&b?0:a||b?a?1:-1:0},d.getSortFn=function(a,b){var c;return d.colSortFnCache[b.colDef.name]?c=d.colSortFnCache[b.colDef.name]:void 0!==b.sortingAlgorithm?(c=b.sortingAlgorithm,d.colSortFnCache[b.colDef.name]=b.sortingAlgorithm):(c=d.guessSortFn(b.colDef.type),c?d.colSortFnCache[b.colDef.name]=c:c=d.sortAlpha),c},d.prioritySort=function(a,b){return void 0!==a.sort.priority&&void 0!==b.sort.priority?a.sort.priority<b.sort.priority?-1:a.sort.priority===b.sort.priority?0:1:a.sort.priority?-1:b.sort.priority?1:0},d.sort=function(a,c,e){if(c){if(a.options.useExternalSorting)return c;var f=[];if(e.forEach(function(a){a.sort&&a.sort.direction&&(a.sort.direction===b.ASC||a.sort.direction===b.DESC)&&f.push(a)}),f=f.sort(d.prioritySort),0===f.length)return c;var g,h,i=c.slice(0);return c.sort(function(c,e){for(var j,k=0,l=0;0===k&&l<f.length;){g=f[l],h=f[l].sort.direction,j=d.getSortFn(a,g,i);var m=a.getCellValue(c,g),n=a.getCellValue(e,g);k=j(m,n),l++}return h===b.ASC?k:0-k})}},d}])}(),function(){function a(a){var b=a;return"undefined"!=typeof b.length&&b.length&&(b=a[0]),b.ownerDocument.defaultView.getComputedStyle(b,null)}function b(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0,h=["Top","Right","Bottom","Left"];4>f;f+=2){var i=h[f];if("margin"===c){var j=parseFloat(e[c+i]);isNaN(j)||(g+=j)}if(d){if("content"===c){var k=parseFloat(e["padding"+i]);isNaN(k)||(g-=k)}if("margin"!==c){var l=parseFloat(e["border"+i+"Width"]);isNaN(l)||(g-=l)}}else{var m=parseFloat(e["padding"+i]);if(isNaN(m)||(g+=m),"padding"!==c){var n=parseFloat(e["border"+i+"Width"]);isNaN(n)||(g+=n)}}}return g}function c(c,d,f){var g,h=!0,i=a(c),j="border-box"===i.boxSizing;if(0>=g||null==g){if(g=i[d],(0>g||null==g)&&(g=c.style[d]),e.test(g))return g;h=j&&!0,g=parseFloat(g)||0}var k=g+b(c,d,f||(j?"border":"content"),h,i);return k}var d=angular.module("ui.grid"),e=new RegExp("^("+/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source+")(?!px)[a-z%]+$","i"),f=/^(block|none|table(?!-c[ea]).+)/,g={position:"absolute",visibility:"hidden",display:"block"},h=["0","0","0"],i="uiGrid-";d.service("gridUtil",["$log","$window","$document","$http","$templateCache","$timeout","$injector","$q","uiGridConstants",function(b,d,e,j,k,l,m,n,o){var p={getStyles:a,createBoundedWrapper:function(a,b){return function(){return b.apply(a,arguments)}},readableColumnName:function(a){return"undefined"==typeof a||void 0===a||null===a?a:("string"!=typeof a&&(a=String(a)),a.replace(/_+/g," ").replace(/^[A-Z]+$/,function(a){return angular.lowercase(angular.uppercase(a.charAt(0))+a.slice(1))}).replace(/(\w+)/g,function(a){return angular.uppercase(a.charAt(0))+a.slice(1)}).replace(/(\w+?(?=[A-Z]))/g,"$1 "))},getColumnsFromData:function(a,b){var c=[];if(!a||"undefined"==typeof a[0]||void 0===a[0])return[];angular.isUndefined(b)&&(b=[]);var d=a[0];return angular.forEach(d,function(a,d){-1===b.indexOf(d)&&c.push({name:d})}),c},newId:function(){var a=(new Date).getTime();return function(){return a+=1}}(),getTemplate:function(a){if(k.get(a))return n.when(k.get(a));if(a.hasOwnProperty("then"))return a;try{if(angular.element(a).length>0)return n.when(a)}catch(c){}return b.debug("Fetching url",a),j({method:"GET",url:a}).then(function(b){var c=b.data.trim();return k.put(a,c),c},function(b){throw new Error("Could not get template "+a+": "+b)})},guessType:function(a){var b=typeof a;switch(b){case"number":case"boolean":case"string":return b;default:return angular.isDate(a)?"date":"object"}},elementWidth:function(){},elementHeight:function(){},getScrollbarWidth:function(){var a=document.createElement("div");a.style.visibility="hidden",a.style.width="100px",a.style.msOverflowStyle="scrollbar",document.body.appendChild(a);var b=a.offsetWidth;a.style.overflow="scroll";var c=document.createElement("div");c.style.width="100%",a.appendChild(c);var d=c.offsetWidth;return a.parentNode.removeChild(a),b-d},swap:function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e},fakeElement:function(a,b,c){var d,e,f=angular.element(a).clone()[0];for(e in b)f.style[e]=b[e];return angular.element(document.body).append(f),d=c.call(f,f),angular.element(f).remove(),d},normalizeWheelEvent:function(a){var b,c,d,e=a||window.event,f=([].slice.call(arguments,1),0),g=0,h=0,i=0,j=0;return e.originalEvent&&(e=e.originalEvent),e.wheelDelta&&(f=e.wheelDelta),e.detail&&(f=-1*e.detail),h=f,void 0!==e.axis&&e.axis===e.HORIZONTAL_AXIS&&(h=0,g=-1*f),e.deltaY&&(h=-1*e.deltaY,f=h),e.deltaX&&(g=e.deltaX,f=-1*g),void 0!==e.wheelDeltaY&&(h=e.wheelDeltaY),void 0!==e.wheelDeltaX&&(g=e.wheelDeltaX),i=Math.abs(f),(!b||b>i)&&(b=i),j=Math.max(Math.abs(h),Math.abs(g)),(!c||c>j)&&(c=j),d=f>0?"floor":"ceil",f=Math[d](f/b),g=Math[d](g/c),h=Math[d](h/c),{delta:f,deltaX:g,deltaY:h}},isTouchEnabled:function(){var a;return("ontouchstart"in d||d.DocumentTouch&&e instanceof DocumentTouch)&&(a=!0),a},isNullOrUndefined:function(a){return void 0===a||null===a?!0:!1},endsWith:function(a,b){return a&&b&&"string"==typeof a?-1!==a.indexOf(b,a.length-b.length):!1},requestAnimationFrame:d.requestAnimationFrame&&d.requestAnimationFrame.bind(d)||d.webkitRequestAnimationFrame&&d.webkitRequestAnimationFrame.bind(d)||function(a){return l(a,10,!1)},numericAndNullSort:function(a,b){return null===a?1:null===b?-1:null===a&&null===b?0:a-b},disableAnimations:function(a){var b;try{b=m.get("$animate"),b.enabled(!1,a)}catch(c){}},enableAnimations:function(a){var b;try{return b=m.get("$animate"),b.enabled(!0,a),b}catch(c){}},nextUid:function(){for(var a,b=h.length;b;){if(b--,a=h[b].charCodeAt(0),57===a)return h[b]="A",i+h.join("");if(90!==a)return h[b]=String.fromCharCode(a+1),i+h.join("");h[b]="0"}return h.unshift("0"),i+h.join("")},hashKey:function(a){var b,c=typeof a;return"object"===c&&null!==a?"function"==typeof(b=a.$$hashKey)?b=a.$$hashKey():"undefined"!=typeof a.$$hashKey&&a.$$hashKey?b=a.$$hashKey:void 0===b&&(b=a.$$hashKey=p.nextUid()):b=a,c+":"+b},resetUids:function(){h=["0","0","0"]}};return["width","height"].forEach(function(b){var d=angular.uppercase(b.charAt(0))+b.substr(1);p["element"+d]=function(d,e){var h=d;if(h&&"undefined"!=typeof h.length&&h.length&&(h=d[0]),h){var i=a(h);return 0===h.offsetWidth&&f.test(i.display)?p.fakeElement(h,g,function(a){return c(a,b,e)}):c(h,b,e)}return null},p["outerElement"+d]=function(a,b){return a?p["element"+d].call(this,a,b?"margin":"border"):null}}),p.closestElm=function(a,b){"undefined"!=typeof a.length&&a.length&&(a=a[0]);var c;["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"].some(function(a){return"function"==typeof document.body[a]?(c=a,!0):!1});for(var d;null!==a;){if(d=a.parentElement,null!==d&&d[c](b))return d;a=d}return null},p.type=function(a){var b=Function.prototype.toString.call(a.constructor);return b.match(/function (.*?)\(/)[1]},p.getBorderSize=function(b,c){"undefined"!=typeof b.length&&b.length&&(b=b[0]);var d=a(b);c=c?"border"+c.charAt(0).toUpperCase()+c.slice(1):"border",c+="Width";var e=parseInt(d[c],10);return isNaN(e)?0:e},p.detectBrowser=function(){var a=d.navigator.userAgent,b={chrome:/chrome/i,safari:/safari/i,firefox:/firefox/i,ie:/internet explorer|trident\//i};for(var c in b)if(b[c].test(a))return c;return"unknown"},p.normalizeScrollLeft=function(a){"undefined"!=typeof a.length&&a.length&&(a=a[0]);var b=p.detectBrowser(),c=a.scrollLeft,d=p.getStyles(a).direction;if("ie"===b)return c;if("chrome"===b){if("rtl"===d){var e=a.scrollWidth-a.clientWidth;return e-c}return c}return"firefox"===b?Math.abs(c):c},p.denormalizeScrollLeft=function(a,b){"undefined"!=typeof a.length&&a.length&&(a=a[0]);var c=p.detectBrowser(),d=p.getStyles(a).direction;if("ie"===c)return b;if("chrome"===c){if("rtl"===d){var e=a.scrollWidth-a.clientWidth;return e-b}return b}return"firefox"===c&&"rtl"===d?-1*b:b},p.preEval=function(a){var b=o.BRACKET_REGEXP.exec(a);if(b)return(b[1]?p.preEval(b[1]):b[1])+b[2]+(b[3]?p.preEval(b[3]):b[3]);a=a.replace(o.APOS_REGEXP,"\\'");var c=a.split(o.DOT_REGEXP),d=[c.shift()];return angular.forEach(c,function(a){d.push(a.replace(o.FUNC_REGEXP,"']$1"))}),d.join("['")},p.debounce=function(a,b,c){function d(){g=this,f=arguments;var d=function(){e=null,c||(h=a.apply(g,f))},i=c&&!e;return e&&l.cancel(e),e=l(d,b),i&&(h=a.apply(g,f)),h}var e,f,g,h;return d.cancel=function(){l.cancel(e),e=null},d},p.throttle=function(a,b,c){function d(){g=+new Date,a.apply(e,f),l(function(){h=null},0)}c=c||{};var e,f,g=0,h=null;return function(){if(e=this,f=arguments,null===h){var a=+new Date-g;a>b?d():c.trailing&&(h=l(d,b-a))}}},p}]),d.filter("px",function(){return function(a){return a.match(/^[\d\.]+$/)?a+"px":a}})}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("da",{aggregate:{label:"artikler"},groupPanel:{description:"Grupér rækker udfra en kolonne ved at trække dens overskift hertil."},search:{placeholder:"Søg...",showingItems:"Viste rækker:",selectedItems:"Valgte rækker:",totalItems:"Rækker totalt:",size:"Side størrelse:",first:"Første side",next:"Næste side",previous:"Forrige side",last:"Sidste side"},menu:{text:"Vælg kolonner:"},column:{hide:"Skjul kolonne"},aggregation:{count:"samlede rækker: ",sum:"smalede: ",avg:"gns: ",min:"min: ",max:"max: "},gridMenu:{columns:"Columns:",exporterAllAsCsv:"Export all data as csv",exporterVisibleAsCsv:"Export visible data as csv",exporterSelectedAsCsv:"Export selected data as csv",exporterAllAsPdf:"Export all data as pdf",exporterVisibleAsPdf:"Export visible data as pdf",exporterSelectedAsPdf:"Export selected data as pdf"}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("de",{aggregate:{label:"eintrag"},groupPanel:{description:"Ziehen Sie eine Spaltenüberschrift hierhin um nach dieser Spalte zu gruppieren."},search:{placeholder:"Suche...",showingItems:"Zeige Einträge:",selectedItems:"Ausgewählte Einträge:",totalItems:"Einträge gesamt:",size:"Einträge pro Seite:",first:"Erste Seite",next:"Nächste Seite",previous:"Vorherige Seite",last:"Letzte Seite"},menu:{text:"Spalten auswählen:"},column:{hide:"Spalte ausblenden"},aggregation:{count:"gesamt reihen: ",sum:"gesamt: ",avg:"durchschnitt: ",min:"min: ",max:"max: "},gridMenu:{columns:"Columns:",exporterAllAsCsv:"Export all data as csv",exporterVisibleAsCsv:"Export visible data as csv",exporterSelectedAsCsv:"Export selected data as csv",exporterAllAsPdf:"Export all data as pdf",exporterVisibleAsPdf:"Export visible data as pdf",exporterSelectedAsPdf:"Export selected data as pdf"}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("en",{aggregate:{label:"items"},groupPanel:{description:"Drag a column header here and drop it to group by that column."},search:{placeholder:"Search...",showingItems:"Showing Items:",selectedItems:"Selected Items:",totalItems:"Total Items:",size:"Page Size:",first:"First Page",next:"Next Page",previous:"Previous Page",last:"Last Page"},menu:{text:"Choose Columns:"},sort:{ascending:"Sort Ascending",descending:"Sort Descending",remove:"Remove Sort"},column:{hide:"Hide Column"},aggregation:{count:"total rows: ",sum:"total: ",avg:"avg: ",min:"min: ",max:"max: "},pinning:{pinLeft:"Pin Left",pinRight:"Pin Right",unpin:"Unpin"},gridMenu:{columns:"Columns:",exporterAllAsCsv:"Export all data as csv",exporterVisibleAsCsv:"Export visible data as csv",exporterSelectedAsCsv:"Export selected data as csv",exporterAllAsPdf:"Export all data as pdf",exporterVisibleAsPdf:"Export visible data as pdf",exporterSelectedAsPdf:"Export selected data as pdf"}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("es",{aggregate:{label:"Artículos"},groupPanel:{description:"Arrastre un encabezado de columna aquí y soltarlo para agrupar por esa columna."},search:{placeholder:"Buscar...",showingItems:"Artículos Mostrando:",selectedItems:"Artículos Seleccionados:",totalItems:"Artículos Totales:",size:"Tamaño de Página:",first:"Primera Página",next:"Página Siguiente",previous:"Página Anterior",last:"Última Página"},menu:{text:"Elegir columnas:"},column:{hide:"Ocultar la columna"},aggregation:{count:"total rows: ",sum:"total: ",avg:"avg: ",min:"min: ",max:"max: "},gridMenu:{columns:"Columns:",exporterAllAsCsv:"Export all data as csv",exporterVisibleAsCsv:"Export visible data as csv",exporterSelectedAsCsv:"Export selected data as csv",exporterAllAsPdf:"Export all data as pdf",exporterVisibleAsPdf:"Export visible data as pdf",exporterSelectedAsPdf:"Export selected data as pdf"}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("fa",{aggregate:{label:"موردها"},groupPanel:{description:"یک عنوان ستون اینجا را بردار و به گروهی از آن ستون بیانداز."},search:{placeholder:"جستجو...",showingItems:"نمایش موردها:",selectedItems:"موردهای انتخاب‌شده:",totalItems:"همهٔ موردها:",size:"اندازهٔ صفحه:",first:"صفحهٔ اول",next:"صفحهٔ بعد",previous:"صفحهٔ قبل",last:"آخرین صفحه"},menu:{text:"انتخاب ستون‌ها:"},column:{hide:"ستون پنهان کن"},aggregation:{count:"total rows: ",sum:"total: ",avg:"avg: ",min:"min: ",max:"max: "},gridMenu:{columns:"Columns:",exporterAllAsCsv:"Export all data as csv",exporterVisibleAsCsv:"Export visible data as csv",exporterSelectedAsCsv:"Export selected data as csv",exporterAllAsPdf:"Export all data as pdf",exporterVisibleAsPdf:"Export visible data as pdf",exporterSelectedAsPdf:"Export selected data as pdf"}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("fr",{aggregate:{label:"articles"},groupPanel:{description:"Faites glisser un en-tête de colonne ici et déposez-le vers un groupe par cette colonne."},search:{placeholder:"Recherche...",showingItems:"Articles Affichage des:",selectedItems:"Éléments Articles:",totalItems:"Nombre total d'articles:",size:"Taille de page:",first:"Première page",next:"Page Suivante",previous:"Page précédente",last:"Dernière page"},menu:{text:"Choisir des colonnes:"},column:{hide:"Colonne de peau"},aggregation:{count:"total rows: ",sum:"total: ",avg:"avg: ",min:"min: ",max:"max: "},gridMenu:{columns:"Columns:",exporterAllAsCsv:"Export all data as csv",exporterVisibleAsCsv:"Export visible data as csv",exporterSelectedAsCsv:"Export selected data as csv",exporterAllAsPdf:"Export all data as pdf",exporterVisibleAsPdf:"Export visible data as pdf",exporterSelectedAsPdf:"Export selected data as pdf"}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("he",{aggregate:{label:"items"},groupPanel:{description:"גרור עמודה לכאן ושחרר בכדי לקבץ עמודה זו."},search:{placeholder:"חפש...",showingItems:"מציג:",selectedItems:'סה"כ נבחרו:',totalItems:'סה"כ רשומות:',size:"תוצאות בדף:",first:"דף ראשון",next:"דף הבא",previous:"דף קודם",last:"דף אחרון"},menu:{text:"בחר עמודות:"},sort:{ascending:"סדר עולה",descending:"סדר יורד",remove:"בטל"},column:{hide:"טור הסתר"},aggregation:{count:"total rows: ",sum:"total: ",avg:"avg: ",min:"min: ",max:"max: "},gridMenu:{columns:"Columns:",exporterAllAsCsv:"Export all data as csv",exporterVisibleAsCsv:"Export visible data as csv",exporterSelectedAsCsv:"Export selected data as csv",exporterAllAsPdf:"Export all data as pdf",exporterVisibleAsPdf:"Export visible data as pdf",exporterSelectedAsPdf:"Export selected data as pdf"}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("nl",{aggregate:{label:"items"},groupPanel:{description:"Sleep hier een kolomnaam heen om op te groeperen."},search:{placeholder:"Zoeken...",showingItems:"Getoonde items:",selectedItems:"Geselecteerde items:",totalItems:"Totaal aantal items:",size:"Items per pagina:",first:"Eerste pagina",next:"Volgende pagina",previous:"Vorige pagina",last:"Laatste pagina"},menu:{text:"Kies kolommen:"},sort:{ascending:"Sorteer oplopend",descending:"Sorteer aflopend",remove:"Verwijder sortering"},column:{hide:"Verberg kolom"},aggregation:{count:"aantal rijen: ",sum:"som: ",avg:"gemiddelde: ",min:"min: ",max:"max: "},gridMenu:{columns:"Columns:",exporterAllAsCsv:"Export all data as csv",exporterVisibleAsCsv:"Export visible data as csv",exporterSelectedAsCsv:"Export selected data as csv",exporterAllAsPdf:"Export all data as pdf",exporterVisibleAsPdf:"Export visible data as pdf",exporterSelectedAsPdf:"Export selected data as pdf"}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("pt-br",{aggregate:{label:"itens"},groupPanel:{description:"Arraste e solte uma coluna aqui para agrupar por essa coluna"},search:{placeholder:"Procurar...",showingItems:"Mostrando os Itens:",selectedItems:"Items Selecionados:",totalItems:"Total de Itens:",size:"Tamanho da Página:",first:"Primeira Página",next:"Próxima Página",previous:"Página Anterior",last:"Última Página"},menu:{text:"Selecione as colunas:"},sort:{ascending:"Ordenar Ascendente",descending:"Ordenar Descendente",remove:"Remover Ordenação"},column:{hide:"Esconder coluna"},aggregation:{count:"total de linhas: ",sum:"total: ",avg:"med: ",min:"min: ",max:"max: "},gridMenu:{columns:"Colunas:",exporterAllAsCsv:"Exportar todos os dados como csv",exporterVisibleAsCsv:"Exportar dados visíveis como csv",exporterSelectedAsCsv:"Exportar dados selecionados como csv",exporterAllAsPdf:"Exportar todos os dados como pdf",exporterVisibleAsPdf:"Exportar dados visíveis como pdf",exporterSelectedAsPdf:"Exportar dados selecionados como pdf"}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("ru",{aggregate:{label:"элементы"},groupPanel:{description:"Для группировки по столбцу перетащите сюда его название."},search:{placeholder:"Поиск...",showingItems:"Показать элементы:",selectedItems:"Выбранные элементы:",totalItems:"Всего элементов:",size:"Размер страницы:",first:"Первая страница",next:"Следующая страница",previous:"Предыдущая страница",last:"Последняя страница"},menu:{text:"Выбрать столбцы:"},sort:{ascending:"По возрастанию",descending:"По убыванию",remove:"Убрать сортировку"},column:{hide:"спрятать столбец"},aggregation:{count:"total rows: ",sum:"total: ",avg:"avg: ",min:"min: ",max:"max: "},gridMenu:{columns:"Columns:",exporterAllAsCsv:"Export all data as csv",exporterVisibleAsCsv:"Export visible data as csv",exporterSelectedAsCsv:"Export selected data as csv",exporterAllAsPdf:"Export all data as pdf",exporterVisibleAsPdf:"Export visible data as pdf",exporterSelectedAsPdf:"Export selected data as pdf"}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("sk",{aggregate:{label:"items"},groupPanel:{description:"Pretiahni sem názov stĺpca pre zoskupenie podľa toho stĺpca."},search:{placeholder:"Hľadaj...",showingItems:"Zobrazujem položky:",selectedItems:"Vybraté položky:",totalItems:"Počet položiek:",size:"Počet:",first:"Prvá strana",next:"Ďalšia strana",previous:"Predchádzajúca strana",last:"Posledná strana"},menu:{text:"Vyberte stĺpce:"},sort:{ascending:"Zotriediť vzostupne",descending:"Zotriediť zostupne",remove:"Vymazať triedenie"},aggregation:{count:"total rows: ",sum:"total: ",avg:"avg: ",min:"min: ",max:"max: "},gridMenu:{columns:"Columns:",exporterAllAsCsv:"Export all data as csv",exporterVisibleAsCsv:"Export visible data as csv",exporterSelectedAsCsv:"Export selected data as csv",exporterAllAsPdf:"Export all data as pdf",exporterVisibleAsPdf:"Export visible data as pdf",exporterSelectedAsPdf:"Export selected data as pdf"}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("sv",{aggregate:{label:"artiklar"},groupPanel:{description:"Dra en kolumnrubrik hit och släpp den för att gruppera efter den kolumnen."},search:{placeholder:"Sök...",showingItems:"Visar artiklar:",selectedItems:"Valda artiklar:",totalItems:"Antal artiklar:",size:"Sidstorlek:",first:"Första sidan",next:"Nästa sida",previous:"Föregående sida",last:"Sista sidan"},menu:{text:"Välj kolumner:"},sort:{ascending:"Sortera stigande",descending:"Sortera fallande",remove:"Inaktivera sortering"},column:{hide:"Göm kolumn"},aggregation:{count:"total rows: ",sum:"total: ",avg:"avg: ",min:"min: ",max:"max: "},pinning:{pinLeft:"Fäst vänster",pinRight:"Fäst höger",unpin:"Lösgör"},gridMenu:{columns:"Columns:",exporterAllAsCsv:"Export all data as csv",exporterVisibleAsCsv:"Export visible data as csv",exporterSelectedAsCsv:"Export selected data as csv",exporterAllAsPdf:"Export all data as pdf",exporterVisibleAsPdf:"Export visible data as pdf",exporterSelectedAsPdf:"Export selected data as pdf"}}),a}])}])}(),function(){var a=["uiT","uiTranslate"],b=["t","uiTranslate"],c=angular.module("ui.grid.i18n");c.constant("i18nConstants",{MISSING:"[MISSING]",UPDATE_EVENT:"$uiI18n",LOCALE_DIRECTIVE_ALIAS:"uiI18n",DEFAULT_LANG:"en"}),c.service("i18nService",["$log","i18nConstants","$rootScope",function(a,b,c){var d={_langs:{},current:null,get:function(a){return this._langs[a.toLowerCase()]},add:function(a,b){var c=a.toLowerCase();this._langs[c]||(this._langs[c]={}),angular.extend(this._langs[c],b)},getAllLangs:function(){var a=[];if(!this._langs)return a;for(var b in this._langs)a.push(b);return a},setCurrent:function(a){this.current=a.toLowerCase()},getCurrentLang:function(){return this.current}},e={add:function(a,b){"object"==typeof a?angular.forEach(a,function(a){a&&d.add(a,b)}):d.add(a,b)},getAllLangs:function(){return d.getAllLangs()},get:function(a){var b=a?a:e.getCurrentLang();return d.get(b)},getSafeText:function(a,c){var f=c?c:e.getCurrentLang(),g=d.get(f);if(!g)return b.MISSING;for(var h=a.split("."),i=g,j=0;j<h.length;++j){if(void 0===i[h[j]]||null===i[h[j]])return b.MISSING;i=i[h[j]]}return i},setCurrentLang:function(a){a&&(d.setCurrent(a),c.$broadcast(b.UPDATE_EVENT))},getCurrentLang:function(){var a=d.getCurrentLang();
return a||(a=b.DEFAULT_LANG,d.setCurrent(a)),a}};return e}]);var d=function(a,b){return{compile:function(){return{pre:function(c,d,e){var f=b.LOCALE_DIRECTIVE_ALIAS,g=c.$eval(e[f]);g?c.$watch(e[f],function(){a.setCurrentLang(g)}):e.$$observers&&e.$observe(f,function(){a.setCurrentLang(e[f]||b.DEFAULT_LANG)})}}}}};c.directive("uiI18n",["i18nService","i18nConstants",d]);var e=function(b,c,d){return{restrict:"EA",compile:function(){return{pre:function(e,f,g){var h,i=a[0],j=a[1],k=g[i]||g[j]||f.html(),l=d.MISSING+k;if(g.$$observers){var m=g[i]?i:j;h=g.$observe(m,function(a){a&&f.html(b(a)(c.getCurrentLang())||l)})}var n=b(k),o=e.$on(d.UPDATE_EVENT,function(){h?h(g[i]||g[j]):f.html(n(c.get())||l)});e.$on("$destroy",o),f.html(n(c.get())||l)}}}}};a.forEach(function(a){c.directive(a,["$parse","i18nService","i18nConstants",e])});var f=function(a,b,c){return function(d){var e=a(d);return e(b.get())||c.MISSING+d}};b.forEach(function(a){c.filter(a,["$parse","i18nService","i18nConstants",f])})}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("zh-cn",{aggregate:{label:"条目"},groupPanel:{description:"拖曳表头到此处以进行分组"},search:{placeholder:"搜索...",showingItems:"当前显示条目：",selectedItems:"选中条目：",totalItems:"条目总数：",size:"每页显示数：",first:"回到首页",next:"下一页",previous:"上一页",last:"前往尾页"},menu:{text:"数据分组与选择列："},column:{hide:"隐藏列"},aggregation:{count:"total rows: ",sum:"total: ",avg:"avg: ",min:"min: ",max:"max: "},gridMenu:{columns:"Columns:",exporterAllAsCsv:"Export all data as csv",exporterVisibleAsCsv:"Export visible data as csv",exporterSelectedAsCsv:"Export selected data as csv",exporterAllAsPdf:"Export all data as pdf",exporterVisibleAsPdf:"Export visible data as pdf",exporterSelectedAsPdf:"Export selected data as pdf"}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("zh-tw",{aggregate:{label:"筆"},groupPanel:{description:"拖拉表頭到此處以進行分組"},search:{placeholder:"搜尋...",showingItems:"目前顯示筆數：",selectedItems:"選取筆數：",totalItems:"總筆數：",size:"每頁顯示：",first:"第一頁",next:"下一頁",previous:"上一頁",last:"最後頁"},menu:{text:"選擇欄位："},column:{hide:"隐藏列"},aggregation:{count:"total rows: ",sum:"total: ",avg:"avg: ",min:"min: ",max:"max: "},gridMenu:{columns:"Columns:",exporterAllAsCsv:"Export all data as csv",exporterVisibleAsCsv:"Export visible data as csv",exporterSelectedAsCsv:"Export selected data as csv",exporterAllAsPdf:"Export all data as pdf",exporterVisibleAsPdf:"Export visible data as pdf",exporterSelectedAsPdf:"Export selected data as pdf"}}),a}])}])}(),function(){"use strict";var a=angular.module("ui.grid.autoResize",["ui.grid"]);a.directive("uiGridAutoResize",["$log","$timeout","gridUtil",function(a,b,c){return{require:"uiGrid",scope:!1,link:function(a,d,e,f){function g(){j=c.elementHeight(d),i=c.elementWidth(d)}function h(){b.cancel(k),k=b(function(){var a=c.elementHeight(d),b=c.elementWidth(d);a!==j||b!==i?(f.grid.gridHeight=a,f.grid.gridWidth=b,f.grid.queueRefresh().then(function(){g(),h()})):h()},250)}var i,j;g();var k;h(),a.$on("$destroy",function(){b.cancel(k)})}}}])}(),function(){"use strict";function a(a,b){this.row=a,this.col=b}var b=angular.module("ui.grid.cellNav",["ui.grid"]);b.constant("uiGridCellNavConstants",{FEATURE_NAME:"gridCellNav",CELL_NAV_EVENT:"cellNav",direction:{LEFT:0,RIGHT:1,UP:2,DOWN:3}}),b.factory("uiGridCellNavFactory",["$log","uiGridConstants","uiGridCellNavConstants","$q",function(b,c,d){var e=function(a,b,c,d){this.rows=a.visibleRowCache,this.columns=b.visibleColumnCache,this.leftColumns=c?c.visibleColumnCache:[],this.rightColumns=d?d.visibleColumnCache:[]};return e.prototype.getFocusableCols=function(){var a=this.leftColumns.concat(this.columns,this.rightColumns);return a.filter(function(a){return a.colDef.allowCellFocus})},e.prototype.getNextRowCol=function(a,b,c){switch(a){case d.direction.LEFT:return this.getRowColLeft(b,c);case d.direction.RIGHT:return this.getRowColRight(b,c);case d.direction.UP:return this.getRowColUp(b,c);case d.direction.DOWN:return this.getRowColDown(b,c)}},e.prototype.getRowColLeft=function(b,c){var d=this.getFocusableCols(),e=d.indexOf(c),f=this.rows.indexOf(b);-1===e&&(e=1);var g=0===e?d.length-1:e-1;return g>e?0===f?new a(b,d[g]):new a(this.rows[f-1],d[g]):new a(b,d[g])},e.prototype.getRowColRight=function(b,c){var d=this.getFocusableCols(),e=d.indexOf(c),f=this.rows.indexOf(b);-1===e&&(e=0);var g=e===d.length-1?0:e+1;return e>g?f===this.rows.length-1?new a(b,d[g]):new a(this.rows[f+1],d[g]):new a(b,d[g])},e.prototype.getRowColDown=function(b,c){var d=this.getFocusableCols(),e=d.indexOf(c),f=this.rows.indexOf(b);return-1===e&&(e=0),f===this.rows.length-1?new a(b,d[e]):new a(this.rows[f+1],d[e])},e.prototype.getRowColUp=function(b,c){var d=this.getFocusableCols(),e=d.indexOf(c),f=this.rows.indexOf(b);return-1===e&&(e=0),0===f?new a(b,d[e]):new a(this.rows[f-1],d[e])},e}]),b.service("uiGridCellNavService",["$log","uiGridConstants","uiGridCellNavConstants","$q","uiGridCellNavFactory",function(a,b,c,d,e){var f={initializeGrid:function(a){a.registerColumnBuilder(f.cellNavColumnBuilder),a.cellNav={},a.cellNav.lastRowCol=null;var b={events:{cellNav:{navigate:function(){}}},methods:{cellNav:{scrollTo:function(a,b,c,d){f.scrollTo(a,b,c,d)},getFocusedCell:function(){return a.cellNav.lastRowCol}}}};a.api.registerEventsFromObject(b.events),a.api.registerMethodsFromObject(b.methods)},decorateRenderContainers:function(a){var b=a.hasRightContainer()?a.renderContainers.right:null,c=a.hasLeftContainer()?a.renderContainers.left:null;null!==c&&(a.renderContainers.left.cellNav=new e(a.renderContainers.body,c,b,a.renderContainers.body)),null!==b&&(a.renderContainers.right.cellNav=new e(a.renderContainers.body,b,a.renderContainers.body,c)),a.renderContainers.body.cellNav=new e(a.renderContainers.body,a.renderContainers.body,c,b)},getDirection:function(a){return a.keyCode===b.keymap.LEFT||a.keyCode===b.keymap.TAB&&a.shiftKey?c.direction.LEFT:a.keyCode===b.keymap.RIGHT||a.keyCode===b.keymap.TAB?c.direction.RIGHT:a.keyCode===b.keymap.UP||a.keyCode===b.keymap.ENTER&&a.shiftKey?c.direction.UP:a.keyCode===b.keymap.DOWN||a.keyCode===b.keymap.ENTER?c.direction.DOWN:null},cellNavColumnBuilder:function(a){var b=[];return a.allowCellFocus=void 0===a.allowCellFocus?!0:a.allowCellFocus,d.all(b)},scrollTo:function(a,b,c,d){var e=null,f=null;null!==c&&(e=a.getRow(c)),null!==d&&(f=a.getColumn(d.name?d.name:d.field)),this.scrollToInternal(a,b,e,f)},scrollToInternal:function(a,c,d,e){var f={};null!==d&&(f.y={percentage:a.renderContainers.body.visibleRowCache.indexOf(d)/a.renderContainers.body.visibleRowCache.length}),null!==e&&(f.x={percentage:this.getLeftWidth(a,e)/this.getLeftWidth(a,a.renderContainers.body.visibleColumnCache[a.renderContainers.body.visibleColumnCache.length-1])}),(f.y||f.x)&&c.$broadcast(b.events.GRID_SCROLL,f)},getLeftWidth:function(a,b){var c=0;if(!b)return c;var d=a.renderContainers.body.visibleColumnCache.indexOf(b);a.renderContainers.body.visibleColumnCache.forEach(function(a,b){d>b&&(c+=a.drawnWidth)});var e=0===d?0:(d+1)/a.renderContainers.body.visibleColumnCache.length;return c+=b.drawnWidth*e}};return f}]),b.directive("uiGridCellnav",["$log","uiGridCellNavService","uiGridCellNavConstants",function(b,c,d){return{replace:!0,priority:-150,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(b,e,f,g){var h=g.grid;c.initializeGrid(h),g.cellNav={},g.cellNav.broadcastCellNav=function(a){b.$broadcast(d.CELL_NAV_EVENT,a),g.cellNav.broadcastFocus(a.row,a.col)},g.cellNav.broadcastFocus=function(b,c){if(null===h.cellNav.lastRowCol||h.cellNav.lastRowCol.row!==b||h.cellNav.lastRowCol.col!==c){var d=new a(b,c);h.api.cellNav.raise.navigate(d,h.cellNav.lastRowCol),h.cellNav.lastRowCol=d}}},post:function(){}}}}}]),b.directive("uiGridRenderContainer",["$log","uiGridCellNavService","uiGridCellNavConstants",function(a,b){return{replace:!0,priority:-99999,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(){},post:function(a,c,d,e){var f=e.grid;b.decorateRenderContainers(f)}}}}}]),b.directive("uiGridCell",["uiGridCellNavService","$log","uiGridCellNavConstants",function(a,b,c){return{priority:-150,restrict:"A",require:"^uiGrid",scope:!1,link:function(b,d,e,f){function g(){d.find("div").attr("tabindex",-1)}function h(){var a=d.find("div");console.log("setFocused: "+a[0].parentElement.className),a[0].focus(),a.attr("tabindex",0),b.grid.queueRefresh()}b.col.colDef.allowCellFocus&&(g(),d.on("keydown",function(c){var d=a.getDirection(c);if(null===d)return!0;var e=b.colContainer.cellNav.getNextRowCol(d,b.row,b.col);return f.cellNav.broadcastCellNav(e),g(),c.stopPropagation(),c.preventDefault(),!1}),d.find("div").on("focus",function(){f.cellNav.broadcastFocus(b.row,b.col)}),b.$on(c.CELL_NAV_EVENT,function(a,c){c.row===b.row&&c.col===b.col&&h()}))}}}])}(),function(){"use strict";var a=angular.module("ui.grid.edit",["ui.grid"]);a.constant("uiGridEditConstants",{EDITABLE_CELL_TEMPLATE:/EDITABLE_CELL_TEMPLATE/g,EDITABLE_CELL_DIRECTIVE:/editable_cell_directive/g,events:{BEGIN_CELL_EDIT:"uiGridEventBeginCellEdit",END_CELL_EDIT:"uiGridEventEndCellEdit",CANCEL_CELL_EDIT:"uiGridEventCancelCellEdit"}}),a.service("uiGridEditService",["$log","$q","$templateCache","uiGridConstants","gridUtil",function(a,b,c,d,e){var f={initializeGrid:function(a){f.defaultGridOptions(a.options),a.registerColumnBuilder(f.editColumnBuilder);var b={events:{edit:{afterCellEdit:function(){},beginCellEdit:function(){},cancelCellEdit:function(){}}},methods:{edit:{}}};a.api.registerEventsFromObject(b.events)},defaultGridOptions:function(a){a.cellEditableCondition=void 0===a.cellEditableCondition?!0:a.cellEditableCondition,a.enableCellEditOnFocus=void 0===a.enableCellEditOnFocus?!1:a.enableCellEditOnFocus},editColumnBuilder:function(a,c,d){var f=[];return a.enableCellEdit=void 0===a.enableCellEdit?void 0===d.enableCellEdit?"object"!==a.type:d.enableCellEdit:a.enableCellEdit,a.cellEditableCondition=void 0===a.cellEditableCondition?d.cellEditableCondition:a.cellEditableCondition,a.enableCellEdit&&(a.editableCellTemplate=a.editableCellTemplate||d.editableCellTemplate||"ui-grid/cellEditor",f.push(e.getTemplate(a.editableCellTemplate).then(function(a){c.editableCellTemplate=a},function(){throw new Error("Couldn't fetch/use colDef.editableCellTemplate '"+a.editableCellTemplate+"'")}))),a.enableCellEditOnFocus=void 0===a.enableCellEditOnFocus?d.enableCellEditOnFocus:a.enableCellEditOnFocus,b.all(f)},isStartEditKey:function(a){return a.keyCode===d.keymap.LEFT||a.keyCode===d.keymap.TAB&&a.shiftKey||a.keyCode===d.keymap.RIGHT||a.keyCode===d.keymap.TAB||a.keyCode===d.keymap.UP||a.keyCode===d.keymap.ENTER&&a.shiftKey||a.keyCode===d.keymap.DOWN||a.keyCode===d.keymap.ENTER?!1:!0}};return f}]),a.directive("uiGridEdit",["$log","uiGridEditService",function(a,b){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(a,c,d,e){b.initializeGrid(e.grid)},post:function(){}}}}}]),a.directive("uiGridCell",["$compile","uiGridConstants","uiGridEditConstants","$log","$parse","uiGridEditService",function(a,b,c,d,e,f){return{priority:-100,restrict:"A",scope:!1,link:function(d,g){function h(){g.on("dblclick",m),g.on("keydown",k),d.col.colDef.enableCellEditOnFocus&&g.find("div").on("focus",j)}function i(){g.off("dblclick",m),g.off("keydown",k),d.col.colDef.enableCellEditOnFocus&&g.find("div").off("focus",j)}function j(a){console.log("begin edit"),a.stopPropagation(),m()}function k(a){f.isStartEditKey(a)&&m()}function l(a,b){return!b.isSaving&&(angular.isFunction(a.colDef.cellEditableCondition)?a.colDef.cellEditableCondition(d):a.colDef.cellEditableCondition)}function m(){if(l(d.col,d.row)){r=e(d.row.getQualifiedColField(d.col)),q=r(d),p=d.col.editableCellTemplate,p=p.replace(b.MODEL_COL_FIELD,d.row.getQualifiedColField(d.col));var f=d.col.colDef.editDropdownFilter?"|"+d.col.colDef.editDropdownFilter:"";switch(p=p.replace(b.CUSTOM_FILTERS,f),d.inputType="text",d.col.colDef.type){case"boolean":d.inputType="checkbox";break;case"number":d.inputType="number";break;case"date":d.inputType="date"}d.editDropdownOptionsArray=d.col.colDef.editDropdownOptionsArray,d.editDropdownIdLabel=d.col.colDef.editDropdownIdLabel?d.col.colDef.editDropdownIdLabel:"id",d.editDropdownValueLabel=d.col.colDef.editDropdownValueLabel?d.col.colDef.editDropdownValueLabel:"value";var h;d.$apply(function(){s=!0,i(),h=a(p)(d.$new());var b=angular.element(g.children()[0]);t=b.hasClass(":focus"),b.addClass("ui-grid-cell-contents-hidden"),g.append(h)});var j=d.$on(b.events.GRID_SCROLL,function(){n(!0),d.grid.api.edit.raise.afterCellEdit(d.row.entity,d.col.colDef,r(d),q),j()}),k=d.$on(c.events.END_CELL_EDIT,function(a,b){n(b),d.grid.api.edit.raise.afterCellEdit(d.row.entity,d.col.colDef,r(d),q),k()}),m=d.$on(c.events.CANCEL_CELL_EDIT,function(){o(),m()});d.$broadcast(c.events.BEGIN_CELL_EDIT),d.grid.api.edit.raise.beginCellEdit(d.row.entity,d.col.colDef)}}function n(a){if(s){var b=angular.element(g.children()[0]);angular.element(g.children()[1]).remove(),b.removeClass("ui-grid-cell-contents-hidden"),a&&t&&b.focus(),t=!1,s=!1,h()}}function o(){s&&(r.assign(d,q),d.$apply(),d.grid.api.edit.raise.cancelCellEdit(d.row.entity,d.col.colDef),n(!0))}if(d.col.colDef.enableCellEdit){var p,q,r,s=!1,t=!1;h()}}}}]),a.directive("uiGridEditor",["uiGridConstants","uiGridEditConstants",function(a,b){return{scope:!0,compile:function(){return{pre:function(){},post:function(c,d){c.$on(b.events.BEGIN_CELL_EDIT,function(){d[0].focus(),d[0].select(),d.on("blur",function(a){c.stopEdit(a)})}),c.deepEdit=!1,c.stopEdit=function(a){c.inputForm&&!c.inputForm.$valid?(a.stopPropagation(),c.$emit(b.events.CANCEL_CELL_EDIT)):c.$emit(b.events.END_CELL_EDIT),c.deepEdit=!1},d.on("click",function(){c.deepEdit=!0}),d.on("keydown",function(d){switch(d.keyCode){case a.keymap.ESC:d.stopPropagation(),c.$emit(b.events.CANCEL_CELL_EDIT);break;case a.keymap.ENTER:c.stopEdit(d);break;case a.keymap.TAB:c.stopEdit(d)}if(c.deepEdit)switch(d.keyCode){case a.keymap.LEFT:d.stopPropagation();break;case a.keymap.RIGHT:d.stopPropagation();break;case a.keymap.UP:d.stopPropagation();break;case a.keymap.DOWN:d.stopPropagation()}return!0})}}}}}]),a.directive("input",["$filter",function(a){function b(a){if("undefined"==typeof a||""===a)return null;var b=a.split("-");if(3!==b.length)return null;var c=parseInt(b[0],10),d=parseInt(b[1],10),e=parseInt(b[2],10);return 1>d||1>c||1>e?null:new Date(c,d-1,e)}return{restrict:"E",require:"?ngModel",link:function(c,d,e,f){2===angular.version.minor&&e.type&&"date"===e.type&&f&&(f.$formatters.push(function(b){return f.$setValidity(null,!b||!isNaN(b.getTime())),a("date")(b,"yyyy-MM-dd")}),f.$parsers.push(function(a){if(a&&a.length>0){var c=b(a);return f.$setValidity(null,c&&!isNaN(c.getTime())),c}return f.$setValidity(null,!0),null}))}}}]),a.directive("uiGridEditDropdown",["uiGridConstants","uiGridEditConstants",function(a,b){return{scope:!0,compile:function(){return{pre:function(){},post:function(c,d){c.$on(b.events.BEGIN_CELL_EDIT,function(){d[0].focus(),d[0].style.width=d[0].parentElement.offsetWidth-1+"px",d.on("blur",function(a){c.stopEdit(a)})}),c.stopEdit=function(){c.$emit(b.events.END_CELL_EDIT)},d.on("keydown",function(d){switch(d.keyCode){case a.keymap.ESC:d.stopPropagation(),c.$emit(b.events.CANCEL_CELL_EDIT);break;case a.keymap.ENTER:c.stopEdit(d);break;case a.keymap.LEFT:c.stopEdit(d);break;case a.keymap.RIGHT:c.stopEdit(d);break;case a.keymap.UP:d.stopPropagation();break;case a.keymap.DOWN:d.stopPropagation();break;case a.keymap.TAB:c.stopEdit(d)}return!0})}}}}}])}(),function(){"use strict";var a=angular.module("ui.grid.expandable",["ui.grid"]);a.service("uiGridExpandableService",["gridUtil","$log","$compile",function(){var a={initializeGrid:function(b){var c={events:{expandable:{rowExpandedStateChanged:function(){}}},methods:{expandable:{toggleRowExpansion:function(c){var d=b.getRow(c);null!==d&&a.toggleRowExpansion(b,d)},expandAllRows:function(){a.expandAllRows(b)},collapseAllRows:function(){a.collapseAllRows(b)}}}};b.api.registerEventsFromObject(c.events),b.api.registerMethodsFromObject(c.methods)},toggleRowExpansion:function(a,b){b.isExpanded=!b.isExpanded,b.height=b.isExpanded?b.grid.options.rowHeight+a.options.expandable.expandableRowHeight:b.grid.options.rowHeight,a.api.expandable.raise.rowExpandedStateChanged(b)},expandAllRows:function(b){angular.forEach(b.renderContainers.body.visibleRowCache,function(c){c.isExpanded||a.toggleRowExpansion(b,c)}),b.refresh()},collapseAllRows:function(b){angular.forEach(b.renderContainers.body.visibleRowCache,function(c){c.isExpanded&&a.toggleRowExpansion(b,c)}),b.refresh()}};return a}]),a.directive("uiGridExpandable",["$log","uiGridExpandableService","$templateCache",function(a,b,c){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(a,d,e,f){var g={name:"expandableButtons",width:40};g.cellTemplate=c.get("ui-grid/expandableRowHeader"),f.grid.addRowHeaderColumn(g),b.initializeGrid(f.grid)},post:function(){}}}}}]),a.directive("uiGridExpandableRow",["uiGridExpandableService","$timeout","$log","$compile","uiGridConstants","gridUtil","$interval",function(a,b,c,d,e,f){return{replace:!1,priority:0,scope:!1,compile:function(){return{pre:function(a,b){f.getTemplate(a.grid.options.expandable.rowExpandableTemplate).then(function(c){var e=d(c)(a);b.append(e),a.row.expandedRendered=!0})},post:function(a){a.$on("$destroy",function(){a.row.expandedRendered=!1})}}}}}]),a.directive("uiGridRow",["$compile","$log","$templateCache",function(){return{priority:-200,scope:!1,compile:function(){return{pre:function(a){a.expandableRow={},a.expandableRow.shouldRenderExpand=function(){var b="body"===a.colContainer.name&&a.row.isExpanded&&(!a.grid.isScrollingVertically||a.row.expandedRendered);return b},a.expandableRow.shouldRenderFiller=function(){var b=a.row.isExpanded&&("body"!==a.colContainer.name||a.grid.isScrollingVertically&&!a.row.expandedRendered);return b}},post:function(){}}}}}]),a.directive("uiGridViewport",["$compile","$log","$templateCache",function(a,b,c){return{priority:-200,scope:!1,compile:function(a){var b=angular.element(a.children().children()[0]),d=c.get("ui-grid/expandableScrollFiller"),e=c.get("ui-grid/expandableRow");return b.append(e),b.append(d),{pre:function(){},post:function(){}}}}}])}(),function(){"use strict";var a=angular.module("ui.grid.exporter",["ui.grid"]);a.constant("uiGridExporterConstants",{featureName:"exporter",ALL:"all",VISIBLE:"visible",SELECTED:"selected",CSV_CONTENT:"CSV_CONTENT",LINK_LABEL:"LINK_LABEL",BUTTON_LABEL:"BUTTON_LABEL"}),a.service("uiGridExporterService",["$log","$q","uiGridExporterConstants","gridUtil","$compile","$interval","i18nService",function(a,b,c,d,e,f,g){var h={initializeGrid:function(a){a.exporter={},this.defaultGridOptions(a.options);var b={events:{exporter:{}},methods:{exporter:{csvExport:function(b,c,d){h.csvExport(a,b,c,d)},pdfExport:function(b,c){h.pdfExport(a,b,c)}}}};a.api.registerEventsFromObject(b.events),a.api.registerMethodsFromObject(b.methods),a.api.core.addToGridMenu?h.addToMenu(a):f(function(){a.api.core.addToGridMenu&&h.addToMenu(a)},100,1)},defaultGridOptions:function(a){a.exporterSuppressButton=a.exporterSuppressButton===!0,a.exporterLinkTemplate=a.exporterLinkTemplate?a.exporterLinkTemplate:"ui-grid/csvLink",a.exporterHeaderTemplate=a.exporterHeaderTemplate?a.exporterHeaderTemplate:"ui-grid/exporterHeader",a.exporterLinkLabel=a.exporterLinkLabel?a.exporterLinkLabel:"Download CSV",a.exporterButtonLabel=a.exporterButtonLabel?a.exporterButtonLabel:"Export",a.exporterPdfDefaultStyle=a.exporterPdfDefaultStyle?a.exporterPdfDefaultStyle:{fontSize:11},a.exporterPdfTableStyle=a.exporterPdfTableStyle?a.exporterPdfTableStyle:{margin:[0,5,0,15]},a.exporterPdfTableHeaderStyle=a.exporterPdfTableHeaderStyle?a.exporterPdfTableHeaderStyle:{bold:!0,fontSize:12,color:"black"},a.exporterPdfOrientation=a.exporterPdfOrientation?a.exporterPdfOrientation:"landscape",a.exporterPdfPageSize=a.exporterPdfPageSize?a.exporterPdfPageSize:"A4",a.exporterPdfMaxGridWidth=a.exporterPdfMaxGridWidth?a.exporterPdfMaxGridWidth:720,a.exporterMenuCsv=void 0!==a.exporterMenuCsv?a.exporterMenuCsv:!0,a.exporterMenuPdf=void 0!==a.exporterMenuPdf?a.exporterMenuPdf:!0},addToMenu:function(a){a.api.core.addToGridMenu(a,[{title:g.getSafeText("gridMenu.exporterAllAsCsv"),action:function(){this.grid.api.exporter.csvExport(c.ALL,c.ALL)},shown:function(){return this.grid.options.exporterMenuCsv}},{title:g.getSafeText("gridMenu.exporterVisibleAsCsv"),action:function(){this.grid.api.exporter.csvExport(c.VISIBLE,c.VISIBLE)},shown:function(){return this.grid.options.exporterMenuCsv}},{title:g.getSafeText("gridMenu.exporterSelectedAsCsv"),action:function(){this.grid.api.exporter.csvExport(c.SELECTED,c.VISIBLE)},shown:function(){return this.grid.options.exporterMenuCsv&&this.grid.api.selection&&this.grid.api.selection.getSelectedRows().length>0}},{title:g.getSafeText("gridMenu.exporterAllAsPdf"),action:function(){this.grid.api.exporter.pdfExport(c.ALL,c.ALL)},shown:function(){return this.grid.options.exporterMenuPdf}},{title:g.getSafeText("gridMenu.exporterVisibleAsPdf"),action:function(){this.grid.api.exporter.pdfExport(c.VISIBLE,c.VISIBLE)},shown:function(){return this.grid.options.exporterMenuPdf}},{title:g.getSafeText("gridMenu.exporterSelectedAsPdf"),action:function(){this.grid.api.exporter.pdfExport(c.SELECTED,c.VISIBLE)},shown:function(){return this.grid.options.exporterMenuPdf&&this.grid.api.selection&&this.grid.api.selection.getSelectedRows().length>0}}])},csvExport:function(b,c,d,e){var f=this.getColumnHeaders(b,d),g=this.getData(b,c,d),h=this.formatAsCsv(f,g);!e&&b.options.exporterCsvLinkElement&&(e=b.options.exporterCsvLinkElement),e?this.renderCsvLink(b,h,e):a.error("Exporter asked to export as csv, but no element provided.  Perhaps you should set gridOptions.exporterCsvLinkElement?")},getColumnHeaders:function(a,b){var d=[];return angular.forEach(a.columns,function(a){(a.visible||b===c.ALL)&&d.push({name:a.field,displayName:a.displayName,width:a.drawnWidth?a.drawnWidth:a.width,align:"number"===a.colDef.type?"right":"left"})}),d},getData:function(b,d,e){var f,g=[];switch(d){case c.ALL:f=b.rows;break;case c.VISIBLE:f=b.getVisibleRows();break;case c.SELECTED:b.api.selection?f=b.api.selection.getSelectedGridRows():a.error("selection feature must be enabled to allow selected rows to be exported")}return c.ALL?(angular.forEach(f,function(a){var d=[];angular.forEach(b.columns,function(f){(f.visible||e===c.ALL)&&d.push(b.getCellValue(a,f))}),g.push(d)}),g):void 0},formatAsCsv:function(a,b){var c=this,d=a.map(function(a){return a.displayName}),e=c.formatRowAsCsv(this)(d)+"\n";return e+=b.map(this.formatRowAsCsv(this)).join("\n")},formatRowAsCsv:function(a){return function(b){return b.map(a.formatFieldAsCsv).join(",")}},formatFieldAsCsv:function(a){return null==a?"":"number"==typeof a?a:"boolean"==typeof a?a?"TRUE":"FALSE":"string"==typeof a?'"'+a.replace(/"/g,'""')+'"':JSON.stringify(a)},renderCsvLink:function(a,b,f){var g=f?f:angular.element(a.exporter.gridElm[0].querySelectorAll(".ui-grid-exporter-csv-link"));angular.element(g[0].querySelectorAll(".ui-grid-exporter-csv-link-span"))&&angular.element(g[0].querySelectorAll(".ui-grid-exporter-csv-link-span")).remove();d.getTemplate(a.options.exporterLinkTemplate).then(function(d){d=d.replace(c.LINK_LABEL,a.options.exporterLinkLabel),d=d.replace(c.CSV_CONTENT,encodeURIComponent(b));var f=angular.element(d),h=e(f)(a.exporter.$scope);g.append(h)})},pdfExport:function(a,b,c){var d=this.getColumnHeaders(a,c),e=this.getData(a,b,c),f=this.prepareAsPdf(a,d,e);pdfMake.createPdf(f).open()},prepareAsPdf:function(a,b,c){var d=this.calculatePdfHeaderWidths(a,b),e=b.map(function(a){return{text:a.displayName,style:"tableHeader"}}),f=c.map(this.formatRowAsPdf(this)),g=[e].concat(f),h={pageOrientation:a.options.exporterPdfOrientation,content:[{style:"tableStyle",table:{headerRows:1,widths:d,body:g}}],styles:{tableStyle:a.options.exporterPdfTableStyle,tableHeader:a.options.exporterPdfTableHeaderStyle},defaultStyle:a.options.exporterPdfDefaultStyle};return a.options.exporterPdfLayout&&(h.layout=a.options.exporterPdfLayout),h},calculatePdfHeaderWidths:function(a,b){var c=0;angular.forEach(b,function(a){"number"==typeof a.width&&(c+=a.width)});var d=0;angular.forEach(b,function(a){if("*"===a.width&&(d+=100),"string"==typeof a.width&&a.width.match(/(\d)*%/)){var b=parseInt(a.width.match(/(\d)*%/)[0]);a.width=c*b/100,d+=a.width}});var e=c+d;return b.map(function(b){return"*"===b.width?b.width:b.width*a.options.exporterPdfMaxGridWidth/e})},formatRowAsPdf:function(a){return function(b){return b.map(a.formatFieldAsPdfString)}},formatFieldAsPdfString:function(a){return null==a?"":"number"==typeof a?a.toString():"boolean"==typeof a?a?"TRUE":"FALSE":"string"==typeof a?a.replace(/"/g,'""'):JSON.stringify(a).replace(/^"/,"").replace(/"$/,"")}};return h}]),a.directive("uiGridExporter",["$log","uiGridExporterConstants","uiGridExporterService","gridUtil","$compile",function(a,b,c){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,link:function(a,b,d,e){c.initializeGrid(e.grid),e.grid.exporter.$scope=a}}}])}(),function(){"use strict";var a=angular.module("ui.grid.infiniteScroll",["ui.grid"]);a.service("uiGridInfiniteScrollService",["gridUtil","$log","$compile","$timeout",function(){var a={initializeGrid:function(b){a.defaultGridOptions(b.options);var c={events:{infiniteScroll:{needLoadMoreData:function(){}}},methods:{infiniteScroll:{dataLoaded:function(){b.options.loadTimout=!1}}}};b.options.loadTimout=!1,b.api.registerEventsFromObject(c.events),b.api.registerMethodsFromObject(c.methods)},defaultGridOptions:function(a){a.enableInfiniteScroll=a.enableInfiniteScroll!==!1},loadData:function(a){a.api.infiniteScroll.raise.needLoadMoreData(),a.options.loadTimout=!0},checkScroll:function(a,b){var c=a.options.infiniteScrollPercentage?a.options.infiniteScrollPercentage:20;return!a.options.loadTimout&&c>=b?(this.loadData(a),!0):!1}};return a}]),a.directive("uiGridInfiniteScroll",["$log","uiGridInfiniteScrollService",function(a,b){return{priority:-200,scope:!1,require:"^uiGrid",compile:function(){return{pre:function(a,c,d,e){b.initializeGrid(e.grid)},post:function(){}}}}}]),a.directive("uiGridViewport",["$compile","$log","uiGridInfiniteScrollService","uiGridConstants",function(a,b,c,d){return{priority:-200,scope:!1,link:function(a){a.grid.options.enableInfiniteScroll&&a.$on(d.events.GRID_SCROLL,function(b,d){if(d.y){var e=100-100*d.y.percentage;c.checkScroll(a.grid,e)}})}}}])}(),function(){"use strict";var a=angular.module("ui.grid.pinning",["ui.grid"]);a.service("uiGridPinningService",["$log","GridRenderContainer","i18nService",function(a,b,c){var d={initializeGrid:function(a){d.defaultGridOptions(a.options),a.registerColumnBuilder(d.pinningColumnBuilder)},defaultGridOptions:function(a){a.enablePinning=a.enablePinning!==!1},pinningColumnBuilder:function(a,b,d){if(a.enablePinning=void 0===a.enablePinning?d.enablePinning:a.enablePinning,a.pinnedLeft?(b.renderContainer="left",b.grid.createLeftContainer()):a.pinnedRight&&(b.renderContainer="right",b.grid.createRightContainer()),a.enablePinning){var e={title:c.get().pinning.pinLeft,icon:"ui-grid-icon-left-open",shown:function(){return"undefined"==typeof this.context.col.renderContainer||!this.context.col.renderContainer||"left"!==this.context.col.renderContainer},action:function(){this.context.col.renderContainer="left",this.context.col.width=this.context.col.drawnWidth,this.context.col.grid.createLeftContainer(),b.grid.refresh().then(function(){b.grid.refresh()})}},f={title:c.get().pinning.pinRight,icon:"ui-grid-icon-right-open",shown:function(){return"undefined"==typeof this.context.col.renderContainer||!this.context.col.renderContainer||"right"!==this.context.col.renderContainer},action:function(){this.context.col.renderContainer="right",this.context.col.width=this.context.col.drawnWidth,this.context.col.grid.createRightContainer(),b.grid.refresh().then(function(){b.grid.refresh()})}},g={title:c.get().pinning.unpin,icon:"ui-grid-icon-cancel",shown:function(){return"undefined"!=typeof this.context.col.renderContainer&&null!==this.context.col.renderContainer&&"body"!==this.context.col.renderContainer},action:function(){this.context.col.renderContainer=null,b.grid.refresh().then(function(){b.grid.refresh()})}};b.menuItems.push(e),b.menuItems.push(f),b.menuItems.push(g)}}};return d}]),a.directive("uiGridPinning",["$log","uiGridPinningService",function(a,b){return{require:"uiGrid",scope:!1,compile:function(){return{pre:function(a,c,d,e){b.initializeGrid(e.grid)},post:function(){}}}}}])}(),function(){"use strict";var a=angular.module("ui.grid.resizeColumns",["ui.grid"]);a.constant("columnBounds",{minWidth:35}),a.service("uiGridResizeColumnsService",["$log","$q",function(a,b){var c={defaultGridOptions:function(a){a.enableColumnResizing=a.enableColumnResizing!==!1,a.enableColumnResize===!1&&(a.enableColumnResizing=!1)},colResizerColumnBuilder:function(a,c,d){var e=[];return a.enableColumnResizing=void 0===a.enableColumnResizing?d.enableColumnResizing:a.enableColumnResizing,a.enableColumnResize===!1&&(a.enableColumnResizing=!1),b.all(e)}};return c}]),a.directive("uiGridResizeColumns",["$log","uiGridResizeColumnsService",function(a,b){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(a,c,d,e){b.defaultGridOptions(e.grid.options),e.grid.registerColumnBuilder(b.colResizerColumnBuilder)},post:function(){}}}}}]),a.directive("uiGridHeaderCell",["$log","$templateCache","$compile","$q",function(a,b,c,d){return{priority:-10,require:"^uiGrid",compile:function(){return{post:function(a,e,f,g){if(g.grid.options.enableColumnResizing){var h=d.defer();f.$observe("renderIndex",function(b){a.renderIndex=a.$eval(b),h.resolve()}),h.promise.then(function(){var d=b.get("ui-grid/columnResizer"),f=angular.element(d).clone(),g=angular.element(d).clone();f.attr("position","left"),g.attr("position","right");var h=a.col,i=h.getRenderContainer(),j=i.renderedColumns[a.renderIndex-1];j&&0!==i.visibleColumnCache.indexOf(a.col)&&j.colDef.enableColumnResizing!==!1&&(e.prepend(f),c(f)(a)),a.col.colDef.enableColumnResizing!==!1&&(e.append(g),c(g)(a))})}}}}}}]),a.directive("uiGridColumnResizer",["$log","$document","gridUtil","uiGridConstants","columnBounds",function(a,b,c,d,e){var f=angular.element('<div class="ui-grid-resize-overlay"></div>'),g={priority:0,scope:{col:"=",position:"@",renderIndex:"="},require:"?^uiGrid",link:function(a,g,h,i){function j(a){var b=a.getRenderContainer();b.visibleColumnCache.forEach(function(b){if(b!==a){var c=b.colDef;(!c.width||angular.isString(c.width)&&(-1!==c.width.indexOf("*")||-1!==c.width.indexOf("%")))&&(b.width=b.drawnWidth)}})}function k(){i.grid.buildColumns().then(function(){i.grid.refreshCanvas(!0)})}function l(b){b.originalEvent&&(b=b.originalEvent),b.preventDefault(),o=b.clientX-p,0>o?o=0:o>i.grid.gridWidth&&(o=i.grid.gridWidth);var c,g=a.col,h=g.getRenderContainer();if("left"===a.position?(g=h.renderedColumns[a.renderIndex-1],c=a.col):"right"===a.position&&(c=h.renderedColumns[a.renderIndex+1]),g.colDef.enableColumnResizing!==!1){i.grid.element.hasClass("column-resizing")||i.grid.element.addClass("column-resizing");var j=o-n,k=g.drawnWidth+j;g.colDef.minWidth&&k<g.colDef.minWidth?o+=g.colDef.minWidth-k:!g.colDef.minWidth&&e.minWidth&&k<e.minWidth?o+=g.colDef.minWidth-k:g.colDef.maxWidth&&k>g.colDef.maxWidth&&(o+=g.colDef.maxWidth-k),f.css({left:o+"px"}),i.fireEvent(d.events.ITEM_DRAGGING)}}function m(c){c.originalEvent&&(c=c.originalEvent),c.preventDefault(),i.grid.element.removeClass("column-resizing"),f.remove(),o=c.clientX-p;var d=o-n;if(0===d)return b.off("mouseup",m),void b.off("mousemove",l);var g,h=a.col,q=h.getRenderContainer();if("left"===a.position?(h=q.renderedColumns[a.renderIndex-1],g=a.col):"right"===a.position&&(g=q.renderedColumns[a.renderIndex+1]),h.colDef.enableColumnResizing!==!1){var r=parseInt(h.drawnWidth+d,10);
h.colDef.minWidth&&r<h.colDef.minWidth?r=h.colDef.minWidth:!h.colDef.minWidth&&e.minWidth&&r<e.minWidth&&(r=e.minWidth),h.colDef.maxWidth&&r>h.colDef.maxWidth&&(r=h.colDef.maxWidth),h.width=r,j(h),k(d),b.off("mouseup",m),b.off("mousemove",l)}}var n=0,o=0,p=0;"left"===a.position?g.addClass("left"):"right"===a.position&&g.addClass("right"),g.on("mousedown",function(a){a.originalEvent&&(a=a.originalEvent),a.stopPropagation(),p=i.grid.element[0].getBoundingClientRect().left,n=a.clientX-p,i.grid.element.append(f),f.css({left:n}),b.on("mouseup",m),b.on("mousemove",l)}),g.on("dblclick",function(b){b.stopPropagation();var f,h,i=a.col,l=i.getRenderContainer();"left"===a.position?(i=l.renderedColumns[a.renderIndex-1],f=a.col,h=1):"right"===a.position&&(f=l.renderedColumns[a.renderIndex+1],f=l.renderedColumns[a.renderIndex+1],h=-1);var m=0,n=0,o=c.closestElm(g,".ui-grid-render-container"),p=o.querySelectorAll("."+d.COL_CLASS_PREFIX+i.uid+" .ui-grid-cell-contents");Array.prototype.forEach.call(p,function(a){var b;angular.element(a).parent().hasClass("ui-grid-header-cell")&&(b=angular.element(a).parent()[0].querySelectorAll(".ui-grid-column-menu-button")),c.fakeElement(a,{},function(a){var d=angular.element(a);d.attr("style","float: left");var e=c.elementWidth(d);if(b){var f=c.elementWidth(b);e+=f}e>m&&(m=e,n=m-e)})}),i.colDef.minWidth&&m<i.colDef.minWidth?m=i.colDef.minWidth:!i.colDef.minWidth&&e.minWidth&&m<e.minWidth&&(m=e.minWidth),i.colDef.maxWidth&&m>i.colDef.maxWidth&&(m=i.colDef.maxWidth),i.width=parseInt(m,10),j(i),k(n)}),g.on("$destroy",function(){g.off("mousedown"),g.off("dblclick"),b.off("mousemove",l),b.off("mouseup",m)})}};return g}])}(),function(){"use strict";var a=angular.module("ui.grid.rowEdit",["ui.grid","ui.grid.edit","ui.grid.cellNav"]);a.constant("uiGridRowEditConstants",{}),a.service("uiGridRowEditService",["$interval","$log","$q","uiGridConstants","uiGridRowEditConstants","gridUtil",function(a,b,c){var d={initializeGrid:function(a,b){var c={events:{rowEdit:{saveRow:function(){}}},methods:{rowEdit:{setSavePromise:function(a,b,c){d.setSavePromise(a,b,c)},getDirtyRows:function(a){return a.rowEditDirtyRows?a.rowEditDirtyRows:[]},getErrorRows:function(a){return a.rowEditErrorRows?a.rowEditErrorRows:[]},flushDirtyRows:function(a){return d.flushDirtyRows(a)}}}};b.api.registerEventsFromObject(c.events),b.api.registerMethodsFromObject(c.methods),b.api.core.on.renderingComplete(a,function(){b.api.edit.on.afterCellEdit(a,d.endEditCell),b.api.edit.on.beginCellEdit(a,d.beginEditCell),b.api.edit.on.cancelCellEdit(a,d.cancelEditCell),b.api.cellNav&&b.api.cellNav.on.navigate(a,d.navigate)})},defaultGridOptions:function(){},saveRow:function(a,c){var d=this;return function(){c.isSaving=!0;var e=a.api.rowEdit.raise.saveRow(c.entity);return c.rowEditSavePromise?c.rowEditSavePromise.then(d.processSuccessPromise(a,c),d.processErrorPromise(a,c)):b.log("A promise was not returned when saveRow event was raised, either nobody is listening to event, or event handler did not return a promise"),e}},setSavePromise:function(a,b,c){var d=a.getRow(b);d.rowEditSavePromise=c},processSuccessPromise:function(a,b){var c=this;return function(){delete b.isSaving,delete b.isDirty,delete b.isError,delete b.rowEditSaveTimer,c.removeRow(a.rowEditErrorRows,b),c.removeRow(a.rowEditDirtyRows,b)}},processErrorPromise:function(a,b){return function(){delete b.isSaving,delete b.rowEditSaveTimer,b.isError=!0,a.rowEditErrorRows||(a.rowEditErrorRows=[]),a.rowEditErrorRows.push(b)}},removeRow:function(a,b){angular.forEach(a,function(c,d){c.uid===b.uid&&a.splice(d,1)})},flushDirtyRows:function(a){var b=[];return angular.forEach(a.rowEditDirtyRows,function(c){d.saveRow(a,c)(),b.push(c.rowEditSavePromise)}),c.all(b)},endEditCell:function(a,c,e,f){var g=this.grid,h=g.getRow(a);return h?void((e!==f||h.isDirty)&&(g.rowEditDirtyRows||(g.rowEditDirtyRows=[]),h.isDirty||(h.isDirty=!0,g.rowEditDirtyRows.push(h)),delete h.isError,d.considerSetTimer(g,h))):void b.log("Unable to find rowEntity in grid data, dirty flag cannot be set")},beginEditCell:function(a){var c=this.grid,e=c.getRow(a);return e?void d.cancelTimer(c,e):void b.log("Unable to find rowEntity in grid data, timer cannot be cancelled")},cancelEditCell:function(a){var c=this.grid,e=c.getRow(a);return e?void d.considerSetTimer(c,e):void b.log("Unable to find rowEntity in grid data, timer cannot be set")},navigate:function(a,b){var c=this.grid;a.row.rowEditSaveTimer&&d.cancelTimer(c,a.row),b&&b.row&&b.row!==a.row&&d.considerSetTimer(c,b.row)},considerSetTimer:function(b,c){if(d.cancelTimer(b,c),c.isDirty&&!c.isSaving&&-1!==b.options.rowEditWaitInterval){var e=b.options.rowEditWaitInterval?b.options.rowEditWaitInterval:2e3;c.rowEditSaveTimer=a(d.saveRow(b,c),e,1)}},cancelTimer:function(b,c){c.rowEditSaveTimer&&!c.isSaving&&(a.cancel(c.rowEditSaveTimer),delete c.rowEditSaveTimer)}};return d}]),a.directive("uiGridRowEdit",["$log","uiGridRowEditService","uiGridEditConstants",function(a,b){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(a,c,d,e){b.initializeGrid(a,e.grid)},post:function(){}}}}}]),a.directive("uiGridViewport",["$compile","uiGridConstants","$log","$parse",function(){return{priority:-200,scope:!1,compile:function(a){var b=angular.element(a.children().children()[0]),c=b.attr("ng-class"),d="";return d=c?c.slice(0,-1)+", 'ui-grid-row-dirty': row.isDirty, 'ui-grid-row-saving': row.isSaving, 'ui-grid-row-error': row.isError}":"{'ui-grid-row-dirty': row.isDirty, 'ui-grid-row-saving': row.isSaving, 'ui-grid-row-error': row.isError}",b.attr("ng-class",d),{pre:function(){},post:function(){}}}}}])}(),function(){"use strict";var a=angular.module("ui.grid.selection",["ui.grid"]);a.constant("uiGridSelectionConstants",{featureName:"selection"}),a.service("uiGridSelectionService",["$log","$q","$templateCache","uiGridSelectionConstants","gridUtil",function(){var a={initializeGrid:function(b){b.selection={},b.selection.lastSelectedRow=null,a.defaultGridOptions(b.options);var c={events:{selection:{rowSelectionChanged:function(){}}},methods:{selection:{toggleRowSelection:function(c){var d=b.getRow(c);null!==d&&a.toggleRowSelection(b,d,b.options.multiSelect,b.options.noUnselect)},selectRow:function(c){var d=b.getRow(c);null===d||d.isSelected||a.toggleRowSelection(b,d,b.options.multiSelect,b.options.noUnselect)},unSelectRow:function(c){var d=b.getRow(c);null!==d&&d.isSelected&&a.toggleRowSelection(b,d,b.options.multiSelect,b.options.noUnselect)},selectAllRows:function(){b.options.multiSelect!==!1&&b.rows.forEach(function(a){a.isSelected=!0})},selectAllVisibleRows:function(){b.options.multiSelect!==!1&&b.rows.forEach(function(a){a.isSelected=a.visible?!0:!1})},clearSelectedRows:function(){a.clearSelectedRows(b)},getSelectedRows:function(){return a.getSelectedRows(b).map(function(a){return a.entity})},getSelectedGridRows:function(){return a.getSelectedRows(b)},setMultiSelect:function(a){b.options.multiSelect=a},setModifierKeysToMultiSelect:function(a){b.options.modifierKeysToMultiSelect=a}}}};b.api.registerEventsFromObject(c.events),b.api.registerMethodsFromObject(c.methods)},defaultGridOptions:function(a){a.enableRowSelection=a.enableRowSelection!==!1,a.multiSelect=a.multiSelect!==!1,a.noUnselect=a.noUnselect===!0,a.modifierKeysToMultiSelect=a.modifierKeysToMultiSelect===!0,a.enableRowHeaderSelection=a.enableRowHeaderSelection!==!1},toggleRowSelection:function(b,c,d,e){var f=c.isSelected;d||f||a.clearSelectedRows(b),c.isSelected&&e||(c.isSelected=!f,c.isSelected===!0&&(b.selection.lastSelectedRow=c),b.api.selection.raise.rowSelectionChanged(c))},shiftSelect:function(b,c,d){if(d){var e=a.getSelectedRows(b),f=e.length>0?b.renderContainers.body.visibleRowCache.indexOf(b.selection.lastSelectedRow):0,g=b.renderContainers.body.visibleRowCache.indexOf(c);if(f>g){var h=f;f=g,g=h}for(var i=f;g>=i;i++){var j=b.renderContainers.body.visibleRowCache[i];j&&(j.isSelected=!0,b.selection.lastSelectedRow=j,b.api.selection.raise.rowSelectionChanged(j))}}},getSelectedRows:function(a){return a.rows.filter(function(a){return a.isSelected})},clearSelectedRows:function(b){a.getSelectedRows(b).forEach(function(a){a.isSelected=!1,b.api.selection.raise.rowSelectionChanged(a)})}};return a}]),a.directive("uiGridSelection",["$log","uiGridSelectionConstants","uiGridSelectionService","$templateCache",function(a,b,c){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(a,b,d,e){if(c.initializeGrid(e.grid),e.grid.options.enableRowHeaderSelection){var f={name:"selectionRowHeaderCol",displayName:"",width:30,cellTemplate:"ui-grid/selectionRowHeader",headerCellTemplate:"ui-grid/selectionHeaderCell"};e.grid.addRowHeaderColumn(f)}},post:function(){}}}}}]),a.directive("uiGridSelectionRowHeaderButtons",["$log","$templateCache","uiGridSelectionService",function(a,b,c){return{replace:!0,restrict:"E",template:b.get("ui-grid/selectionRowHeaderButtons"),scope:!0,require:"^uiGrid",link:function(a,b,d,e){var f=e.grid;a.selectButtonClick=function(a,b){b.shiftKey?c.shiftSelect(f,a,f.options.multiSelect):b.ctrlKey||b.metaKey?c.toggleRowSelection(f,a,f.options.multiSelect,f.options.noUnselect):c.toggleRowSelection(f,a,f.options.multiSelect&&!f.options.modifierKeysToMultiSelect,f.options.noUnselect)}}}}]),a.directive("uiGridViewport",["$compile","uiGridConstants","uiGridSelectionConstants","$log","$parse","uiGridSelectionService",function(){return{priority:-200,scope:!1,compile:function(a){var b=angular.element(a.children().children()[0]),c=b.attr("ng-class"),d="";return d=c?c.slice(0,-1)+",'ui-grid-row-selected': row.isSelected}":"{'ui-grid-row-selected': row.isSelected}",b.attr("ng-class",d),{pre:function(){},post:function(){}}}}}]),a.directive("uiGridCell",["$compile","uiGridConstants","uiGridSelectionConstants","$log","$parse","uiGridSelectionService",function(a,b,c,d,e,f){return{priority:-200,restrict:"A",scope:!1,link:function(a,b){function c(){b.on("click",function(b){b.shiftKey?f.shiftSelect(a.grid,a.row,a.grid.options.multiSelect):b.ctrlKey||b.metaKey?f.toggleRowSelection(a.grid,a.row,a.grid.options.multiSelect,a.grid.options.noUnselect):f.toggleRowSelection(a.grid,a.row,a.grid.options.multiSelect&&!a.grid.options.modifierKeysToMultiSelect,a.grid.options.noUnselect),a.$apply()})}a.grid.options.enableRowSelection&&!a.grid.options.enableRowHeaderSelection&&(b.addClass("ui-grid-disable-selection"),c())}}}])}(),angular.module("ui.grid").run(["$templateCache",function(a){"use strict";a.put("ui-grid/ui-grid-footer",'<div class="ui-grid-footer-panel"><div ui-grid-group-panel ng-show="grid.options.showGroupPanel"></div><div class="ui-grid-footer ui-grid-footer-viewport"><div class="ui-grid-footer-canvas"><div ng-repeat="col in colContainer.renderedColumns track by col.colDef.name" ui-grid-footer-cell col="col" render-index="$index" class="ui-grid-footer-cell clearfix" ng-style="$index === 0 && colContainer.columnStyle($index)"></div></div></div></div>'),a.put("ui-grid/ui-grid-group-panel",'<div class="ui-grid-group-panel"><div ui-t="groupPanel.description" class="description" ng-show="groupings.length == 0"></div><ul ng-show="groupings.length > 0" class="ngGroupList"><li class="ngGroupItem" ng-repeat="group in configGroups"><span class="ngGroupElement"><span class="ngGroupName">{{group.displayName}} <span ng-click="removeGroup($index)" class="ngRemoveGroup">x</span></span> <span ng-hide="$last" class="ngGroupArrow"></span></span></li></ul></div>'),a.put("ui-grid/ui-grid-header",'<div class="ui-grid-header"><div class="ui-grid-top-panel"><div ui-grid-group-panel ng-show="grid.options.showGroupPanel"></div><div class="ui-grid-header-viewport"><div class="ui-grid-header-canvas"><div class="ui-grid-header-cell clearfix" ng-repeat="col in colContainer.renderedColumns track by col.colDef.name" ui-grid-header-cell col="col" render-index="$index" ng-style="$index === 0 && colContainer.columnStyle($index)"></div></div></div><div ui-grid-menu></div></div></div>'),a.put("ui-grid/ui-grid-menu-button",'<div class="ui-grid-menu-button" ng-click="toggleMenu()"><div class="ui-grid-icon-container"><i class="ui-grid-icon-menu">&nbsp;</i></div><div ui-grid-menu menu-items="menuItems"></div></div>'),a.put("ui-grid/ui-grid-no-header",'<div class="ui-grid-top-panel"></div>'),a.put("ui-grid/ui-grid-row",'<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" ui-grid-cell></div>'),a.put("ui-grid/ui-grid",'<div ui-i18n="en" class="ui-grid"><!-- TODO (c0bra): add "scoped" attr here, eventually? --><style ui-grid-style>.grid{{ grid.id }} {\n      /* Styles for the grid */\n    }\n\n    .grid{{ grid.id }} .ui-grid-row, .grid{{ grid.id }} .ui-grid-cell, .grid{{ grid.id }} .ui-grid-cell .ui-grid-vertical-bar {\n      height: {{ grid.options.rowHeight }}px;\n    }\n\n    .grid{{ grid.id }} .ui-grid-row:last-child .ui-grid-cell {\n      border-bottom-width: {{ ((grid.getTotalRowHeight() < grid.getViewportHeight()) && \'1\') || \'0\' }}px;\n    }\n\n    {{ grid.verticalScrollbarStyles }}\n    {{ grid.horizontalScrollbarStyles }}\n\n    .ui-grid[dir=rtl] .ui-grid-viewport {\n      padding-left: {{ grid.verticalScrollbarWidth }}px;\n    }\n\n    {{ grid.customStyles }}</style><div ui-grid-menu-button ng-if="grid.options.enableGridMenu"></div><div ui-grid-render-container container-id="\'body\'" col-container-name="\'body\'" row-container-name="\'body\'" bind-scroll-horizontal="true" bind-scroll-vertical="true" enable-scrollbars="grid.options.enableScrollbars"></div><div ui-grid-column-menu ng-if="grid.options.enableColumnMenu"></div><div ng-transclude></div></div>'),a.put("ui-grid/uiGridCell",'<div class="ui-grid-cell-contents">{{COL_FIELD CUSTOM_FILTERS}}</div>'),a.put("ui-grid/uiGridColumnFilter",'<li class="ui-grid-menu-item ui-grid-clearfix ui-grid-column-filter" ng-show="itemShown()" ng-click="$event.stopPropagation();"><div class="input-container"><input class="column-filter-input" type="text" ng-model="item.model" placeholder="{{ i18n.search.placeholder }}"><div class="column-filter-cancel-icon-container"><i class="ui-grid-filter-cancel ui-grid-icon-cancel column-filter-cancel-icon">&nbsp;</i></div></div><div style="button-container" ng-click="item.action($event)"><div class="ui-grid-button"><i class="ui-grid-icon-search">&nbsp;</i></div></div></li>'),a.put("ui-grid/uiGridColumnMenu",'<div class="ui-grid-column-menu"><div ui-grid-menu menu-items="menuItems"><!-- <div class="ui-grid-column-menu">\n    <div class="inner" ng-show="menuShown">\n      <ul>\n        <div ng-show="grid.options.enableSorting">\n          <li ng-click="sortColumn($event, asc)" ng-class="{ \'selected\' : col.sort.direction == asc }"><i class="ui-grid-icon-sort-alt-up"></i> Sort Ascending</li>\n          <li ng-click="sortColumn($event, desc)" ng-class="{ \'selected\' : col.sort.direction == desc }"><i class="ui-grid-icon-sort-alt-down"></i> Sort Descending</li>\n          <li ng-show="col.sort.direction" ng-click="unsortColumn()"><i class="ui-grid-icon-cancel"></i> Remove Sort</li>\n        </div>\n      </ul>\n    </div>\n  </div> --></div></div>'),a.put("ui-grid/uiGridFooterCell",'<div class="ui-grid-cell-contents" col-index="renderIndex"><div>{{ col.getAggregationValue() }}</div></div>'),a.put("ui-grid/uiGridHeaderCell",'<div ng-class="{ \'sortable\': sortable }"><div class="ui-grid-vertical-bar">&nbsp;</div><div class="ui-grid-cell-contents" col-index="renderIndex">{{ col.displayName CUSTOM_FILTERS }} <span ui-grid-visible="col.sort.direction" ng-class="{ \'ui-grid-icon-up-dir\': col.sort.direction == asc, \'ui-grid-icon-down-dir\': col.sort.direction == desc, \'ui-grid-icon-blank\': !col.sort.direction }">&nbsp;</span></div><div class="ui-grid-column-menu-button" ng-if="grid.options.enableColumnMenu && !col.isRowHeader  && !col.colDef.disableColumnMenu" class="ui-grid-column-menu-button" ng-click="toggleMenu($event)"><i class="ui-grid-icon-angle-down">&nbsp;</i></div><div ng-if="filterable" class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><input type="text" class="ui-grid-filter-input" ng-model="colFilter.term" ng-click="$event.stopPropagation()" ng-attr-placeholder="{{colFilter.placeholder || \'\'}}"><div class="ui-grid-filter-button" ng-click="colFilter.term = null"><i class="ui-grid-icon-cancel right" ng-show="!!colFilter.term">&nbsp;</i> <!-- use !! because angular interprets \'f\' as false --></div></div></div>'),a.put("ui-grid/uiGridMenu",'<div class="ui-grid-menu" ng-if="shown"><div class="ui-grid-menu-mid" ng-show="shownMid"><div class="ui-grid-menu-inner"><ul class="ui-grid-menu-items"><li ng-repeat="item in menuItems" ui-grid-menu-item action="item.action" title="item.title" active="item.active" icon="item.icon" shown="item.shown" context="item.context" template-url="item.templateUrl"></li></ul></div></div></div>'),a.put("ui-grid/uiGridMenuItem",'<li class="ui-grid-menu-item" ng-click="itemAction($event, title)" ng-show="itemShown()" ng-class="{ \'ui-grid-menu-item-active\' : active() }"><i ng-class="icon"></i> {{ title }}</li>'),a.put("ui-grid/uiGridRenderContainer",'<div class="ui-grid-render-container"><div ui-grid-header></div><div ui-grid-viewport></div><div ui-grid-footer ng-if="grid.options.showFooter"></div><!-- native scrolling --><div ui-grid-native-scrollbar ng-if="enableScrollbars" type="vertical"></div><div ui-grid-native-scrollbar ng-if="enableScrollbars" type="horizontal"></div></div>'),a.put("ui-grid/uiGridViewport",'<div class="ui-grid-viewport"><div class="ui-grid-canvas"><div ng-repeat="(rowRenderIndex, row) in rowContainer.renderedRows track by row.uid" class="ui-grid-row" ng-style="containerCtrl.rowStyle(rowRenderIndex)"><div ui-grid-row="row" row-render-index="rowRenderIndex"></div></div></div></div>'),a.put("ui-grid/cellEditor",'<div><form name="inputForm"><input type="{{inputType}}" ng-class="\'colt\' + col.uid" ui-grid-editor ng-model="MODEL_COL_FIELD"></form></div>'),a.put("ui-grid/dropdownEditor",'<div><form name="inputForm"><select ng-class="\'colt\' + col.uid" ui-grid-edit-dropdown ng-model="MODEL_COL_FIELD" ng-options="field[editDropdownIdLabel] as field[editDropdownValueLabel] CUSTOM_FILTERS for field in editDropdownOptionsArray"></select></form></div>'),a.put("ui-grid/expandableRow",'<div ui-grid-expandable-row ng-if="expandableRow.shouldRenderExpand()" class="expandableRow" style="float:left; margin-top: 1px; margin-bottom: 1px" ng-style="{width: (grid.renderContainers.body.getCanvasWidth() - grid.verticalScrollbarWidth) + \'px\'\n     , height: grid.options.expandable.expandableRowHeight + \'px\'}"></div>'),a.put("ui-grid/expandableRowHeader",'<div class="ui-grid-row-header-cell ui-grid-expandable-buttons-cell"><div class="ui-grid-cell-contents"><i ng-class="{ \'ui-grid-icon-plus-squared\' : !row.isExpanded, \'ui-grid-icon-minus-squared\' : row.isExpanded }" ng-click="grid.api.expandable.toggleRowExpansion(row.entity)"></i></div></div>'),a.put("ui-grid/expandableScrollFiller","<div ng-if=\"expandableRow.shouldRenderFiller()\" style=\"float:left; margin-top: 2px; margin-bottom: 2px\" ng-style=\"{ width: (grid.getViewportWidth()) + 'px',\n              height: grid.options.expandable.expandableRowHeight + 'px', 'margin-left': grid.options.rowHeader.rowHeaderWidth + 'px' }\"><i class=\"ui-grid-icon-spin5 ui-grid-animate-spin\" ng-style=\"{ 'margin-top': ( grid.options.expandable.expandableRowHeight/2 - 5) + 'px',\n            'margin-left' : ((grid.getViewportWidth() - grid.options.rowHeader.rowHeaderWidth)/2 - 5) + 'px' }\"></i></div>"),a.put("ui-grid/csvLink",'<span class="ui-grid-exporter-csv-link-span"><a href="data:text/csv;charset=UTF-8,CSV_CONTENT">LINK_LABEL</a></span>'),a.put("ui-grid/columnResizer",'<div ui-grid-column-resizer ng-if="grid.options.enableColumnResizing" class="ui-grid-column-resizer" col="col" position="right" render-index="renderIndex"></div>'),a.put("ui-grid/selectionHeaderCell",'<div><div class="ui-grid-vertical-bar">&nbsp;</div><div class="ui-grid-cell-contents" col-index="renderIndex"></div></div>'),a.put("ui-grid/selectionRowHeader",'<div class="ui-grid-row-header-cell ui-grid-disable-selection"><div class="ui-grid-cell-contents"><ui-grid-selection-row-header-buttons></ui-grid-selection-row-header-buttons></div></div>'),a.put("ui-grid/selectionRowHeaderButtons",'<div class="ui-grid-selection-row-header-buttons ui-grid-icon-ok" ng-class="{\'ui-grid-row-selected\': row.isSelected}" ng-click="selectButtonClick(row, $event)">&nbsp;</div>')}]);/*!
 * ui-select
 * http://github.com/angular-ui/ui-select
 * Version: 0.8.3 - 2014-10-14T18:22:05.432Z
 * License: MIT
 */
!function(){"use strict";var e={TAB:9,ENTER:13,ESC:27,SPACE:32,LEFT:37,UP:38,RIGHT:39,DOWN:40,SHIFT:16,CTRL:17,ALT:18,PAGE_UP:33,PAGE_DOWN:34,HOME:36,END:35,BACKSPACE:8,DELETE:46,COMMAND:91,isControl:function(t){var c=t.which;switch(c){case e.COMMAND:case e.SHIFT:case e.CTRL:case e.ALT:return!0}return t.metaKey?!0:!1},isFunctionKey:function(e){return e=e.which?e.which:e,e>=112&&123>=e},isVerticalMovement:function(t){return~[e.UP,e.DOWN].indexOf(t)},isHorizontalMovement:function(t){return~[e.LEFT,e.RIGHT,e.BACKSPACE,e.DELETE].indexOf(t)}};void 0===angular.element.prototype.querySelectorAll&&(angular.element.prototype.querySelectorAll=function(e){return angular.element(this[0].querySelectorAll(e))}),angular.module("ui.select",[]).constant("uiSelectConfig",{theme:"bootstrap",searchEnabled:!0,placeholder:"",refreshDelay:1e3}).service("uiSelectMinErr",function(){var e=angular.$$minErr("ui.select");return function(){var t=e.apply(this,arguments),c=t.message.replace(new RegExp("\nhttp://errors.angularjs.org/.*"),"");return new Error(c)}}).service("RepeatParser",["uiSelectMinErr","$parse",function(e,t){var c=this;c.parse=function(c){var l=c.match(/^\s*(?:([\s\S]+?)\s+as\s+)?([\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);if(!l)throw e("iexp","Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.",c);return{itemName:l[2],source:t(l[3]),trackByExp:l[4],modelMapper:t(l[1]||l[2])}},c.getGroupNgRepeatExpression=function(){return"$group in $select.groups"},c.getNgRepeatExpression=function(e,t,c,l){var s=e+" in "+(l?"$group.items":t);return c&&(s+=" track by "+c),s}}]).controller("uiSelectCtrl",["$scope","$element","$timeout","RepeatParser","uiSelectMinErr",function(t,c,l,s,i){function n(){p.resetSearchInput&&(p.search=d,p.selected&&p.items.length&&!p.multiple&&(p.activeIndex=p.items.indexOf(p.selected)))}function a(t){var c=!0;switch(t){case e.DOWN:!p.open&&p.multiple?p.activate(!1,!0):p.activeIndex<p.items.length-1&&p.activeIndex++;break;case e.UP:!p.open&&p.multiple?p.activate(!1,!0):p.activeIndex>0&&p.activeIndex--;break;case e.TAB:(!p.multiple||p.open)&&p.select(p.items[p.activeIndex],!0);break;case e.ENTER:p.open?p.select(p.items[p.activeIndex]):p.activate(!1,!0);break;case e.ESC:p.close();break;default:c=!1}return c}function r(t){function c(){switch(t){case e.LEFT:return~p.activeMatchIndex?u:n;case e.RIGHT:return~p.activeMatchIndex&&a!==n?r:(p.activate(),!1);case e.BACKSPACE:return~p.activeMatchIndex?(p.removeChoice(a),u):n;case e.DELETE:return~p.activeMatchIndex?(p.removeChoice(p.activeMatchIndex),a):!1}}var l=o(h[0]),s=p.selected.length,i=0,n=s-1,a=p.activeMatchIndex,r=p.activeMatchIndex+1,u=p.activeMatchIndex-1,d=a;return l>0||p.search.length&&t==e.RIGHT?!1:(p.close(),d=c(),p.activeMatchIndex=p.selected.length&&d!==!1?Math.min(n,Math.max(i,d)):-1,!0)}function o(e){return angular.isNumber(e.selectionStart)?e.selectionStart:e.value.length}function u(){var e=c.querySelectorAll(".ui-select-choices-content"),t=e.querySelectorAll(".ui-select-choices-row");if(t.length<1)throw i("choices","Expected multiple .ui-select-choices-row but got '{0}'.",t.length);var l=t[p.activeIndex],s=l.offsetTop+l.clientHeight-e[0].scrollTop,n=e[0].offsetHeight;s>n?e[0].scrollTop+=s-n:s<l.clientHeight&&(p.isGrouped&&0===p.activeIndex?e[0].scrollTop=0:e[0].scrollTop-=l.clientHeight-s)}var p=this,d="";p.placeholder=void 0,p.search=d,p.activeIndex=0,p.activeMatchIndex=-1,p.items=[],p.selected=void 0,p.open=!1,p.focus=!1,p.focusser=void 0,p.disabled=void 0,p.searchEnabled=void 0,p.resetSearchInput=void 0,p.refreshDelay=void 0,p.multiple=!1,p.disableChoiceExpression=void 0,p.isEmpty=function(){return angular.isUndefined(p.selected)||null===p.selected||""===p.selected};var h=c.querySelectorAll("input.ui-select-search");if(1!==h.length)throw i("searchInput","Expected 1 input.ui-select-search but got '{0}'.",h.length);p.activate=function(e,t){p.disabled||p.open||(t||n(),p.focusser.prop("disabled",!0),p.open=!0,p.activeMatchIndex=-1,p.activeIndex=p.activeIndex>=p.items.length?0:p.activeIndex,l(function(){p.search=e||p.search,h[0].focus()}))},p.findGroupByName=function(e){return p.groups&&p.groups.filter(function(t){return t.name===e})[0]},p.parseRepeatAttr=function(e,c){function l(e){p.groups=[],angular.forEach(e,function(e){var l=t.$eval(c),s=angular.isFunction(l)?l(e):e[l],i=p.findGroupByName(s);i?i.items.push(e):p.groups.push({name:s,items:[e]})}),p.items=[],p.groups.forEach(function(e){p.items=p.items.concat(e.items)})}function n(e){p.items=e}var a=c?l:n;p.parserResult=s.parse(e),p.isGrouped=!!c,p.itemProperty=p.parserResult.itemName,t.$watchCollection(p.parserResult.source,function(e){if(void 0===e||null===e)p.items=[];else{if(!angular.isArray(e))throw i("items","Expected an array but got '{0}'.",e);if(p.multiple){var t=e.filter(function(e){return p.selected.indexOf(e)<0});a(t)}else a(e);p.ngModel.$modelValue=null}}),p.multiple&&t.$watchCollection("$select.selected",function(e){var c=p.parserResult.source(t);if(e.length){var l=c.filter(function(t){return e.indexOf(t)<0});a(l)}else a(c);p.sizeSearchInput()})};var v;p.refresh=function(e){void 0!==e&&(v&&l.cancel(v),v=l(function(){t.$eval(e)},p.refreshDelay))},p.setActiveItem=function(e){p.activeIndex=p.items.indexOf(e)},p.isActive=function(e){return p.open&&p.items.indexOf(e[p.itemProperty])===p.activeIndex},p.isDisabled=function(e){if(p.open){var t,c=p.items.indexOf(e[p.itemProperty]),l=!1;return c>=0&&!angular.isUndefined(p.disableChoiceExpression)&&(t=p.items[c],l=!!e.$eval(p.disableChoiceExpression),t._uiSelectChoiceDisabled=l),l}},p.select=function(e,c){if(void 0===e||!e._uiSelectChoiceDisabled){var l={};l[p.parserResult.itemName]=e,p.onSelectCallback(t,{$item:e,$model:p.parserResult.modelMapper(t,l)}),p.multiple?(p.selected.push(e),p.sizeSearchInput()):p.selected=e,p.close(c)}},p.close=function(e){p.open&&(n(),p.open=!1,p.multiple||l(function(){p.focusser.prop("disabled",!1),e||p.focusser[0].focus()},0,!1))},p.toggle=function(e){p.open?p.close():p.activate(),e.preventDefault(),e.stopPropagation()},p.removeChoice=function(e){var c=p.selected[e],l={};l[p.parserResult.itemName]=c,p.selected.splice(e,1),p.activeMatchIndex=-1,p.sizeSearchInput(),p.onRemoveCallback(t,{$item:c,$model:p.parserResult.modelMapper(t,l)})},p.getPlaceholder=function(){return p.multiple&&p.selected.length?void 0:p.placeholder};var f;p.sizeSearchInput=function(){var e=h[0],c=h.parent().parent()[0];h.css("width","10px");var s=function(){var t=c.clientWidth-e.offsetLeft-10;50>t&&(t=c.clientWidth),h.css("width",t+"px")};l(function(){0!==c.clientWidth||f?f||s():f=t.$watch(function(){return c.clientWidth},function(e){0!==e&&(s(),f(),f=null)})},0,!1)},h.on("keydown",function(c){var l=c.which;t.$apply(function(){var t=!1;p.multiple&&e.isHorizontalMovement(l)&&(t=r(l)),!t&&p.items.length>0&&(t=a(l)),t&&l!=e.TAB&&(c.preventDefault(),c.stopPropagation())}),e.isVerticalMovement(l)&&p.items.length>0&&u()}),h.on("blur",function(){l(function(){p.activeMatchIndex=-1})}),t.$on("$destroy",function(){h.off("keydown blur")})}]).directive("uiSelect",["$document","uiSelectConfig","uiSelectMinErr","$compile","$parse",function(t,c,l,s,i){return{restrict:"EA",templateUrl:function(e,t){var l=t.theme||c.theme;return l+(angular.isDefined(t.multiple)?"/select-multiple.tpl.html":"/select.tpl.html")},replace:!0,transclude:!0,require:["uiSelect","ngModel"],scope:!0,controller:"uiSelectCtrl",controllerAs:"$select",link:function(c,n,a,r,o){function u(e){var t=!1;t=window.jQuery?window.jQuery.contains(n[0],e.target):n[0].contains(e.target),t||(p.close(),c.$digest())}var p=r[0],d=r[1],h=n.querySelectorAll("input.ui-select-search");p.multiple=angular.isDefined(a.multiple)?""===a.multiple?!0:"true"===a.multiple.toLowerCase():!1,p.onSelectCallback=i(a.onSelect),p.onRemoveCallback=i(a.onRemove),d.$parsers.unshift(function(e){var t,l={};if(p.multiple){for(var s=[],i=p.selected.length-1;i>=0;i--)l={},l[p.parserResult.itemName]=p.selected[i],t=p.parserResult.modelMapper(c,l),s.unshift(t);return s}return l={},l[p.parserResult.itemName]=e,t=p.parserResult.modelMapper(c,l)}),d.$formatters.unshift(function(e){var t,l=p.parserResult.source(c,{$select:{search:""}}),s={};if(l){if(p.multiple){var i=[],n=function(e,l){if(e&&e.length){for(var n=e.length-1;n>=0;n--)if(s[p.parserResult.itemName]=e[n],t=p.parserResult.modelMapper(c,s),t==l)return i.unshift(e[n]),!0;return!1}};if(!e)return i;for(var a=e.length-1;a>=0;a--)n(p.selected,e[a])||n(l,e[a]);return i}var r=function(l){return s[p.parserResult.itemName]=l,t=p.parserResult.modelMapper(c,s),t==e};if(p.selected&&r(p.selected))return p.selected;for(var o=l.length-1;o>=0;o--)if(r(l[o]))return l[o]}return e}),p.ngModel=d;var v=angular.element("<input ng-disabled='$select.disabled' class='ui-select-focusser ui-select-offscreen' type='text' aria-haspopup='true' role='button' />");a.tabindex&&a.$observe("tabindex",function(e){p.multiple?h.attr("tabindex",e):v.attr("tabindex",e),n.removeAttr("tabindex")}),s(v)(c),p.focusser=v,p.multiple||(n.append(v),v.bind("focus",function(){c.$evalAsync(function(){p.focus=!0})}),v.bind("blur",function(){c.$evalAsync(function(){p.focus=!1})}),v.bind("keydown",function(t){return t.which===e.BACKSPACE?(t.preventDefault(),t.stopPropagation(),p.select(void 0),void c.$apply()):void(t.which===e.TAB||e.isControl(t)||e.isFunctionKey(t)||t.which===e.ESC||((t.which==e.DOWN||t.which==e.UP||t.which==e.ENTER||t.which==e.SPACE)&&(t.preventDefault(),t.stopPropagation(),p.activate()),c.$digest()))}),v.bind("keyup input",function(t){t.which===e.TAB||e.isControl(t)||e.isFunctionKey(t)||t.which===e.ESC||t.which==e.ENTER||t.which===e.BACKSPACE||(p.activate(v.val()),v.val(""),c.$digest())})),c.$watch("searchEnabled",function(){var e=c.$eval(a.searchEnabled);p.searchEnabled=void 0!==e?e:!0}),a.$observe("disabled",function(){p.disabled=void 0!==a.disabled?a.disabled:!1}),a.$observe("resetSearchInput",function(){var e=c.$eval(a.resetSearchInput);p.resetSearchInput=void 0!==e?e:!0}),p.multiple?(c.$watchCollection(function(){return d.$modelValue},function(e,t){t!=e&&(d.$modelValue=null)}),c.$watchCollection("$select.selected",function(){d.$setViewValue(Date.now())}),v.prop("disabled",!0)):c.$watch("$select.selected",function(e){d.$viewValue!==e&&d.$setViewValue(e)}),d.$render=function(){if(p.multiple&&!angular.isArray(d.$viewValue)){if(!angular.isUndefined(d.$viewValue)&&null!==d.$viewValue)throw l("multiarr","Expected model value to be array but got '{0}'",d.$viewValue);p.selected=[]}p.selected=d.$viewValue},t.on("click",u),c.$on("$destroy",function(){t.off("click",u)}),o(c,function(e){var t=angular.element("<div>").append(e),c=t.querySelectorAll(".ui-select-match");if(c.removeAttr("ui-select-match"),1!==c.length)throw l("transcluded","Expected 1 .ui-select-match but got '{0}'.",c.length);n.querySelectorAll(".ui-select-match").replaceWith(c);var s=t.querySelectorAll(".ui-select-choices");if(s.removeAttr("ui-select-choices"),1!==s.length)throw l("transcluded","Expected 1 .ui-select-choices but got '{0}'.",s.length);n.querySelectorAll(".ui-select-choices").replaceWith(s)})}}}]).directive("uiSelectChoices",["uiSelectConfig","RepeatParser","uiSelectMinErr","$compile",function(e,t,c,l){return{restrict:"EA",require:"^uiSelect",replace:!0,transclude:!0,templateUrl:function(t){var c=t.parent().attr("theme")||e.theme;return c+"/choices.tpl.html"},compile:function(s,i){if(!i.repeat)throw c("repeat","Expected 'repeat' expression.");return function(s,i,n,a,r){var o=n.groupBy;if(a.parseRepeatAttr(n.repeat,o),a.disableChoiceExpression=n.uiDisableChoice,o){var u=i.querySelectorAll(".ui-select-choices-group");if(1!==u.length)throw c("rows","Expected 1 .ui-select-choices-group but got '{0}'.",u.length);u.attr("ng-repeat",t.getGroupNgRepeatExpression())}var p=i.querySelectorAll(".ui-select-choices-row");if(1!==p.length)throw c("rows","Expected 1 .ui-select-choices-row but got '{0}'.",p.length);p.attr("ng-repeat",t.getNgRepeatExpression(a.parserResult.itemName,"$select.items",a.parserResult.trackByExp,o)).attr("ng-mouseenter","$select.setActiveItem("+a.parserResult.itemName+")").attr("ng-click","$select.select("+a.parserResult.itemName+")");var d=i.querySelectorAll(".ui-select-choices-row-inner");if(1!==d.length)throw c("rows","Expected 1 .ui-select-choices-row-inner but got '{0}'.",d.length);d.attr("uis-transclude-append",""),l(i,r)(s),s.$watch("$select.search",function(e){e&&!a.open&&a.multiple&&a.activate(!1,!0),a.activeIndex=0,a.refresh(n.refresh)}),n.$observe("refreshDelay",function(){var t=s.$eval(n.refreshDelay);a.refreshDelay=void 0!==t?t:e.refreshDelay})}}}}]).directive("uisTranscludeAppend",function(){return{link:function(e,t,c,l,s){s(e,function(e){t.append(e)})}}}).directive("uiSelectMatch",["uiSelectConfig",function(e){return{restrict:"EA",require:"^uiSelect",replace:!0,transclude:!0,templateUrl:function(t){var c=t.parent().attr("theme")||e.theme,l=t.parent().attr("multiple");return c+(l?"/match-multiple.tpl.html":"/match.tpl.html")},link:function(t,c,l,s){l.$observe("placeholder",function(t){s.placeholder=void 0!==t?t:e.placeholder}),s.multiple&&s.sizeSearchInput()}}}]).filter("highlight",function(){function e(e){return e.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")}return function(t,c){return c&&t?t.replace(new RegExp(e(c),"gi"),'<span class="ui-select-highlight">$&</span>'):t}})}(),angular.module("ui.select").run(["$templateCache",function(e){e.put("bootstrap/choices.tpl.html",'<ul class="ui-select-choices ui-select-choices-content dropdown-menu" role="menu" aria-labelledby="dLabel" ng-show="$select.items.length > 0"><li class="ui-select-choices-group"><div class="divider" ng-show="$select.isGrouped && $index > 0"></div><div ng-show="$select.isGrouped" class="ui-select-choices-group-label dropdown-header">{{$group.name}}</div><div class="ui-select-choices-row" ng-class="{active: $select.isActive(this), disabled: $select.isDisabled(this)}"><a href="javascript:void(0)" class="ui-select-choices-row-inner"></a></div></li></ul>'),e.put("bootstrap/match-multiple.tpl.html",'<span class="ui-select-match"><span ng-repeat="$item in $select.selected"><span style="margin-right: 3px;" class="ui-select-match-item btn btn-default btn-xs" tabindex="-1" type="button" ng-disabled="$select.disabled" ng-click="$select.activeMatchIndex = $index;" ng-class="{\'btn-primary\':$select.activeMatchIndex === $index}"><span class="close ui-select-match-close" ng-hide="$select.disabled" ng-click="$select.removeChoice($index)">&nbsp;&times;</span> <span uis-transclude-append=""></span></span></span></span>'),e.put("bootstrap/match.tpl.html",'<button type="button" class="btn btn-default form-control ui-select-match" tabindex="-1" ng-hide="$select.open" ng-disabled="$select.disabled" ng-class="{\'btn-default-focus\':$select.focus}" ;="" ng-click="$select.activate()"><span ng-show="$select.searchEnabled && $select.isEmpty()" class="text-muted">{{$select.placeholder}}</span> <span ng-hide="$select.isEmpty()" ng-transclude=""></span> <span class="caret ui-select-toggle" ng-click="$select.toggle($event)"></span></button>'),e.put("bootstrap/select-multiple.tpl.html",'<div class="ui-select-multiple ui-select-bootstrap dropdown form-control" ng-class="{open: $select.open}"><div><div class="ui-select-match"></div><input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="ui-select-search input-xs" placeholder="{{$select.getPlaceholder()}}" ng-disabled="$select.disabled" ng-hide="$select.disabled" ng-click="$select.activate()" ng-model="$select.search"></div><div class="ui-select-choices"></div></div>'),e.put("bootstrap/select.tpl.html",'<div class="ui-select-bootstrap dropdown" ng-class="{open: $select.open}"><div class="ui-select-match"></div><input type="text" autocomplete="off" tabindex="-1" class="form-control ui-select-search" placeholder="{{$select.placeholder}}" ng-model="$select.search" ng-show="$select.searchEnabled && $select.open"><div class="ui-select-choices"></div></div>'),e.put("select2/choices.tpl.html",'<ul class="ui-select-choices ui-select-choices-content select2-results"><li class="ui-select-choices-group" ng-class="{\'select2-result-with-children\': $select.isGrouped}"><div ng-show="$select.isGrouped" class="ui-select-choices-group-label select2-result-label">{{$group.name}}</div><ul ng-class="{\'select2-result-sub\': $select.isGrouped, \'select2-result-single\': !$select.isGrouped}"><li class="ui-select-choices-row" ng-class="{\'select2-highlighted\': $select.isActive(this), \'select2-disabled\': $select.isDisabled(this)}"><div class="select2-result-label ui-select-choices-row-inner"></div></li></ul></li></ul>'),e.put("select2/match-multiple.tpl.html",'<span class="ui-select-match"><li class="ui-select-match-item select2-search-choice" ng-repeat="$item in $select.selected" ng-class="{\'select2-search-choice-focus\':$select.activeMatchIndex === $index}"><span uis-transclude-append=""></span> <a href="javascript:;" class="ui-select-match-close select2-search-choice-close" ng-click="$select.removeChoice($index)" tabindex="-1"></a></li></span>'),e.put("select2/match.tpl.html",'<a class="select2-choice ui-select-match" ng-class="{\'select2-default\': $select.isEmpty()}" ng-click="$select.activate()"><span ng-show="$select.searchEnabled && $select.isEmpty()" class="select2-chosen">{{$select.placeholder}}</span> <span ng-hide="$select.isEmpty()" class="select2-chosen" ng-transclude=""></span> <span class="select2-arrow ui-select-toggle" ng-click="$select.toggle($event)"><b></b></span></a>'),e.put("select2/select-multiple.tpl.html",'<div class="ui-select-multiple select2 select2-container select2-container-multi" ng-class="{\'select2-container-active select2-dropdown-open\': $select.open,\n                \'select2-container-disabled\': $select.disabled}"><ul class="select2-choices"><span class="ui-select-match"></span><li class="select2-search-field"><input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="select2-input ui-select-search" placeholder="{{$select.getPlaceholder()}}" ng-disabled="$select.disabled" ng-hide="$select.disabled" ng-model="$select.search" ng-click="$select.activate()" style="width: 34px;"></li></ul><div class="select2-drop select2-with-searchbox select2-drop-active" ng-class="{\'select2-display-none\': !$select.open}"><div class="ui-select-choices"></div></div></div>'),e.put("select2/select.tpl.html",'<div class="select2 select2-container" ng-class="{\'select2-container-active select2-dropdown-open\': $select.open,\n                \'select2-container-disabled\': $select.disabled,\n                \'select2-container-active\': $select.focus }"><div class="ui-select-match"></div><div class="select2-drop select2-with-searchbox select2-drop-active" ng-class="{\'select2-display-none\': !$select.open}"><div class="select2-search" ng-show="$select.searchEnabled"><input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="ui-select-search select2-input" ng-model="$select.search"></div><div class="ui-select-choices"></div></div></div>'),e.put("selectize/choices.tpl.html",'<div ng-show="$select.open" class="ui-select-choices selectize-dropdown single"><div class="ui-select-choices-content selectize-dropdown-content"><div class="ui-select-choices-group optgroup"><div ng-show="$select.isGrouped" class="ui-select-choices-group-label optgroup-header">{{$group.name}}</div><div class="ui-select-choices-row" ng-class="{active: $select.isActive(this), disabled: $select.isDisabled(this)}"><div class="option ui-select-choices-row-inner" data-selectable=""></div></div></div></div></div>'),e.put("selectize/match.tpl.html",'<div ng-hide="$select.searchEnabled && ($select.open || $select.isEmpty())" class="ui-select-match" ng-transclude=""></div>'),e.put("selectize/select.tpl.html",'<div class="selectize-control single"><div class="selectize-input" ng-class="{\'focus\': $select.open, \'disabled\': $select.disabled, \'selectize-focus\' : $select.focus}" ng-click="$select.activate()"><div class="ui-select-match"></div><input type="text" autocomplete="off" tabindex="-1" class="ui-select-search ui-select-toggle" ng-click="$select.toggle($event)" placeholder="{{$select.placeholder}}" ng-model="$select.search" ng-hide="!$select.searchEnabled || ($select.selected && !$select.open)" ng-disabled="$select.disabled"></div><div class="ui-select-choices"></div></div>')}]);/*!
 * zeroclipboard
 * The Zero Clipboard library provides an easy way to copy text to the clipboard using an invisible Adobe Flash movie, and a JavaScript interface.
 * Copyright 2012 Jon Rohan, James M. Greene, .
 * Released under the MIT license
 * http://jonrohan.github.com/ZeroClipboard/
 * v1.1.7
 */(function(){"use strict";var a=function(a,b){var c=a.style[b];a.currentStyle?c=a.currentStyle[b]:window.getComputedStyle&&(c=document.defaultView.getComputedStyle(a,null).getPropertyValue(b));if(c=="auto"&&b=="cursor"){var d=["a"];for(var e=0;e<d.length;e++)if(a.tagName.toLowerCase()==d[e])return"pointer"}return c},b=function(a){if(!l.prototype._singleton)return;a||(a=window.event);var b;this!==window?b=this:a.target?b=a.target:a.srcElement&&(b=a.srcElement),l.prototype._singleton.setCurrent(b)},c=function(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&a.attachEvent("on"+b,c)},d=function(a,b,c){a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent&&a.detachEvent("on"+b,c)},e=function(a,b){if(a.addClass)return a.addClass(b),a;if(b&&typeof b=="string"){var c=(b||"").split(/\s+/);if(a.nodeType===1)if(!a.className)a.className=b;else{var d=" "+a.className+" ",e=a.className;for(var f=0,g=c.length;f<g;f++)d.indexOf(" "+c[f]+" ")<0&&(e+=" "+c[f]);a.className=e.replace(/^\s+|\s+$/g,"")}}return a},f=function(a,b){if(a.removeClass)return a.removeClass(b),a;if(b&&typeof b=="string"||b===undefined){var c=(b||"").split(/\s+/);if(a.nodeType===1&&a.className)if(b){var d=(" "+a.className+" ").replace(/[\n\t]/g," ");for(var e=0,f=c.length;e<f;e++)d=d.replace(" "+c[e]+" "," ");a.className=d.replace(/^\s+|\s+$/g,"")}else a.className=""}return a},g=function(b){var c={left:0,top:0,width:b.width||b.offsetWidth||0,height:b.height||b.offsetHeight||0,zIndex:9999},d=a(b,"zIndex");d&&d!="auto"&&(c.zIndex=parseInt(d,10));while(b){var e=parseInt(a(b,"borderLeftWidth"),10),f=parseInt(a(b,"borderTopWidth"),10);c.left+=isNaN(b.offsetLeft)?0:b.offsetLeft,c.left+=isNaN(e)?0:e,c.top+=isNaN(b.offsetTop)?0:b.offsetTop,c.top+=isNaN(f)?0:f,b=b.offsetParent}return c},h=function(a){return(a.indexOf("?")>=0?"&":"?")+"nocache="+(new Date).getTime()},i=function(a){var b=[];return a.trustedDomains&&(typeof a.trustedDomains=="string"?b.push("trustedDomain="+a.trustedDomains):b.push("trustedDomain="+a.trustedDomains.join(","))),b.join("&")},j=function(a,b){if(b.indexOf)return b.indexOf(a);for(var c=0,d=b.length;c<d;c++)if(b[c]===a)return c;return-1},k=function(a){if(typeof a=="string")throw new TypeError("ZeroClipboard doesn't accept query strings.");return a.length?a:[a]},l=function(a,b){a&&(l.prototype._singleton||this).glue(a);if(l.prototype._singleton)return l.prototype._singleton;l.prototype._singleton=this,this.options={};for(var c in o)this.options[c]=o[c];for(var d in b)this.options[d]=b[d];this.handlers={},l.detectFlashSupport()&&p()},m,n=[];l.prototype.setCurrent=function(b){m=b,this.reposition(),b.getAttribute("title")&&this.setTitle(b.getAttribute("title")),this.setHandCursor(a(b,"cursor")=="pointer")},l.prototype.setText=function(a){a&&a!==""&&(this.options.text=a,this.ready()&&this.flashBridge.setText(a))},l.prototype.setTitle=function(a){a&&a!==""&&this.htmlBridge.setAttribute("title",a)},l.prototype.setSize=function(a,b){this.ready()&&this.flashBridge.setSize(a,b)},l.prototype.setHandCursor=function(a){this.ready()&&this.flashBridge.setHandCursor(a)},l.version="1.1.7";var o={moviePath:"ZeroClipboard.swf",trustedDomains:null,text:null,hoverClass:"zeroclipboard-is-hover",activeClass:"zeroclipboard-is-active",allowScriptAccess:"sameDomain"};l.setDefaults=function(a){for(var b in a)o[b]=a[b]},l.destroy=function(){l.prototype._singleton.unglue(n);var a=l.prototype._singleton.htmlBridge;a.parentNode.removeChild(a),delete l.prototype._singleton},l.detectFlashSupport=function(){var a=!1;try{new ActiveXObject("ShockwaveFlash.ShockwaveFlash")&&(a=!0)}catch(b){navigator.mimeTypes["application/x-shockwave-flash"]&&(a=!0)}return a};var p=function(){var a=l.prototype._singleton,b=document.getElementById("global-zeroclipboard-html-bridge");if(!b){var c='      <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="global-zeroclipboard-flash-bridge" width="100%" height="100%">         <param name="movie" value="'+a.options.moviePath+h(a.options.moviePath)+'"/>         <param name="allowScriptAccess" value="'+a.options.allowScriptAccess+'"/>         <param name="scale" value="exactfit"/>         <param name="loop" value="false"/>         <param name="menu" value="false"/>         <param name="quality" value="best" />         <param name="bgcolor" value="#ffffff"/>         <param name="wmode" value="transparent"/>         <param name="flashvars" value="'+i(a.options)+'"/>         <embed src="'+a.options.moviePath+h(a.options.moviePath)+'"           loop="false" menu="false"           quality="best" bgcolor="#ffffff"           width="100%" height="100%"           name="global-zeroclipboard-flash-bridge"           allowScriptAccess="always"           allowFullScreen="false"           type="application/x-shockwave-flash"           wmode="transparent"           pluginspage="http://www.macromedia.com/go/getflashplayer"           flashvars="'+i(a.options)+'"           scale="exactfit">         </embed>       </object>';b=document.createElement("div"),b.id="global-zeroclipboard-html-bridge",b.setAttribute("class","global-zeroclipboard-container"),b.setAttribute("data-clipboard-ready",!1),b.style.position="absolute",b.style.left="-9999px",b.style.top="-9999px",b.style.width="15px",b.style.height="15px",b.style.zIndex="9999",b.innerHTML=c,document.body.appendChild(b)}a.htmlBridge=b,a.flashBridge=document["global-zeroclipboard-flash-bridge"]||b.children[0].lastElementChild};l.prototype.resetBridge=function(){this.htmlBridge.style.left="-9999px",this.htmlBridge.style.top="-9999px",this.htmlBridge.removeAttribute("title"),this.htmlBridge.removeAttribute("data-clipboard-text"),f(m,this.options.activeClass),m=null,this.options.text=null},l.prototype.ready=function(){var a=this.htmlBridge.getAttribute("data-clipboard-ready");return a==="true"||a===!0},l.prototype.reposition=function(){if(!m)return!1;var a=g(m);this.htmlBridge.style.top=a.top+"px",this.htmlBridge.style.left=a.left+"px",this.htmlBridge.style.width=a.width+"px",this.htmlBridge.style.height=a.height+"px",this.htmlBridge.style.zIndex=a.zIndex+1,this.setSize(a.width,a.height)},l.dispatch=function(a,b){l.prototype._singleton.receiveEvent(a,b)},l.prototype.on=function(a,b){var c=a.toString().split(/\s/g);for(var d=0;d<c.length;d++)a=c[d].toLowerCase().replace(/^on/,""),this.handlers[a]||(this.handlers[a]=b);this.handlers.noflash&&!l.detectFlashSupport()&&this.receiveEvent("onNoFlash",null)},l.prototype.addEventListener=l.prototype.on,l.prototype.off=function(a,b){var c=a.toString().split(/\s/g);for(var d=0;d<c.length;d++){a=c[d].toLowerCase().replace(/^on/,"");for(var e in this.handlers)e===a&&this.handlers[e]===b&&delete this.handlers[e]}},l.prototype.removeEventListener=l.prototype.off,l.prototype.receiveEvent=function(a,b){a=a.toString().toLowerCase().replace(/^on/,"");var c=m;switch(a){case"load":if(b&&parseFloat(b.flashVersion.replace(",",".").replace(/[^0-9\.]/gi,""))<10){this.receiveEvent("onWrongFlash",{flashVersion:b.flashVersion});return}this.htmlBridge.setAttribute("data-clipboard-ready",!0);break;case"mouseover":e(c,this.options.hoverClass);break;case"mouseout":f(c,this.options.hoverClass),this.resetBridge();break;case"mousedown":e(c,this.options.activeClass);break;case"mouseup":f(c,this.options.activeClass);break;case"datarequested":var d=c.getAttribute("data-clipboard-target"),g=d?document.getElementById(d):null;if(g){var h=g.value||g.textContent||g.innerText;h&&this.setText(h)}else{var i=c.getAttribute("data-clipboard-text");i&&this.setText(i)}break;case"complete":this.options.text=null}if(this.handlers[a]){var j=this.handlers[a];typeof j=="function"?j.call(c,this,b):typeof j=="string"&&window[j].call(c,this,b)}},l.prototype.glue=function(a){a=k(a);for(var d=0;d<a.length;d++)j(a[d],n)==-1&&(n.push(a[d]),c(a[d],"mouseover",b))},l.prototype.unglue=function(a){a=k(a);for(var c=0;c<a.length;c++){d(a[c],"mouseover",b);var e=j(a[c],n);e!=-1&&n.splice(e,1)}},typeof module!="undefined"?module.exports=l:typeof define=="function"&&define.amd?define(function(){return l}):window.ZeroClipboard=l})();
(function ($) {

  $.Jcrop = function (obj, opt) {
    var options = $.extend({}, $.Jcrop.defaults),
        docOffset,
        _ua = navigator.userAgent.toLowerCase(),
        is_msie = /msie/.test(_ua),
        ie6mode = /msie [1-6]\./.test(_ua);

    // Internal Methods {{{
    function px(n) {
      return Math.round(n) + 'px';
    }
    function cssClass(cl) {
      return options.baseClass + '-' + cl;
    }
    function supportsColorFade() {
      return $.fx.step.hasOwnProperty('backgroundColor');
    }
    function getPos(obj) //{{{
    {
      var pos = $(obj).offset();
      return [pos.left, pos.top];
    }
    //}}}
    function mouseAbs(e) //{{{
    {
      return [(e.pageX - docOffset[0]), (e.pageY - docOffset[1])];
    }
    //}}}
    function setOptions(opt) //{{{
    {
      if (typeof(opt) !== 'object') opt = {};
      options = $.extend(options, opt);

      $.each(['onChange','onSelect','onRelease','onDblClick'],function(i,e) {
        if (typeof(options[e]) !== 'function') options[e] = function () {};
      });
    }
    //}}}
    function startDragMode(mode, pos, touch) //{{{
    {
      docOffset = getPos($img);
      Tracker.setCursor(mode === 'move' ? mode : mode + '-resize');

      if (mode === 'move') {
        return Tracker.activateHandlers(createMover(pos), doneSelect, touch);
      }

      var fc = Coords.getFixed();
      var opp = oppLockCorner(mode);
      var opc = Coords.getCorner(oppLockCorner(opp));

      Coords.setPressed(Coords.getCorner(opp));
      Coords.setCurrent(opc);

      Tracker.activateHandlers(dragmodeHandler(mode, fc), doneSelect, touch);
    }
    //}}}
    function dragmodeHandler(mode, f) //{{{
    {
      return function (pos) {
        if (!options.aspectRatio) {
          switch (mode) {
          case 'e':
            pos[1] = f.y2;
            break;
          case 'w':
            pos[1] = f.y2;
            break;
          case 'n':
            pos[0] = f.x2;
            break;
          case 's':
            pos[0] = f.x2;
            break;
          }
        } else {
          switch (mode) {
          case 'e':
            pos[1] = f.y + 1;
            break;
          case 'w':
            pos[1] = f.y + 1;
            break;
          case 'n':
            pos[0] = f.x + 1;
            break;
          case 's':
            pos[0] = f.x + 1;
            break;
          }
        }
        Coords.setCurrent(pos);
        Selection.update();
      };
    }
    //}}}
    function createMover(pos) //{{{
    {
      var lloc = pos;
      KeyManager.watchKeys();

      return function (pos) {
        Coords.moveOffset([pos[0] - lloc[0], pos[1] - lloc[1]]);
        lloc = pos;

        Selection.update();
      };
    }
    //}}}
    function oppLockCorner(ord) //{{{
    {
      switch (ord) {
      case 'n':
        return 'sw';
      case 's':
        return 'nw';
      case 'e':
        return 'nw';
      case 'w':
        return 'ne';
      case 'ne':
        return 'sw';
      case 'nw':
        return 'se';
      case 'se':
        return 'nw';
      case 'sw':
        return 'ne';
      }
    }
    //}}}
    function createDragger(ord) //{{{
    {
      return function (e) {
        if (options.disabled) {
          return false;
        }
        if ((ord === 'move') && !options.allowMove) {
          return false;
        }
        
        // Fix position of crop area when dragged the very first time.
        // Necessary when crop image is in a hidden element when page is loaded.
        docOffset = getPos($img);

        btndown = true;
        startDragMode(ord, mouseAbs(e));
        e.stopPropagation();
        e.preventDefault();
        return false;
      };
    }
    //}}}
    function presize($obj, w, h) //{{{
    {
      var nw = $obj.width(),
          nh = $obj.height();
      if ((nw > w) && w > 0) {
        nw = w;
        nh = (w / $obj.width()) * $obj.height();
      }
      if ((nh > h) && h > 0) {
        nh = h;
        nw = (h / $obj.height()) * $obj.width();
      }
      xscale = $obj.width() / nw;
      yscale = $obj.height() / nh;
      $obj.width(nw).height(nh);
    }
    //}}}
    function unscale(c) //{{{
    {
      return {
        x: c.x * xscale,
        y: c.y * yscale,
        x2: c.x2 * xscale,
        y2: c.y2 * yscale,
        w: c.w * xscale,
        h: c.h * yscale
      };
    }
    //}}}
    function doneSelect(pos) //{{{
    {
      var c = Coords.getFixed();
      if ((c.w > options.minSelect[0]) && (c.h > options.minSelect[1])) {
        Selection.enableHandles();
        Selection.done();
      } else {
        Selection.release();
      }
      Tracker.setCursor(options.allowSelect ? 'crosshair' : 'default');
    }
    //}}}
    function newSelection(e) //{{{
    {
      if (options.disabled) {
        return false;
      }
      if (!options.allowSelect) {
        return false;
      }
      btndown = true;
      docOffset = getPos($img);
      Selection.disableHandles();
      Tracker.setCursor('crosshair');
      var pos = mouseAbs(e);
      Coords.setPressed(pos);
      Selection.update();
      Tracker.activateHandlers(selectDrag, doneSelect, e.type.substring(0,5)==='touch');
      KeyManager.watchKeys();

      e.stopPropagation();
      e.preventDefault();
      return false;
    }
    //}}}
    function selectDrag(pos) //{{{
    {
      Coords.setCurrent(pos);
      Selection.update();
    }
    //}}}
    function newTracker() //{{{
    {
      var trk = $('<div></div>').addClass(cssClass('tracker'));
      if (is_msie) {
        trk.css({
          opacity: 0,
          backgroundColor: 'white'
        });
      }
      return trk;
    }
    //}}}

    // }}}
    // Initialization {{{
    // Sanitize some options {{{
    if (typeof(obj) !== 'object') {
      obj = $(obj)[0];
    }
    if (typeof(opt) !== 'object') {
      opt = {};
    }
    // }}}
    setOptions(opt);
    // Initialize some jQuery objects {{{
    // The values are SET on the image(s) for the interface
    // If the original image has any of these set, they will be reset
    // However, if you destroy() the Jcrop instance the original image's
    // character in the DOM will be as you left it.
    var img_css = {
      border: 'none',
      visibility: 'visible',
      margin: 0,
      padding: 0,
      position: 'absolute',
      top: 0,
      left: 0
    };

    var $origimg = $(obj),
      img_mode = true;

    if (obj.tagName == 'IMG') {
      // Fix size of crop image.
      // Necessary when crop image is within a hidden element when page is loaded.
      if ($origimg[0].width != 0 && $origimg[0].height != 0) {
        // Obtain dimensions from contained img element.
        $origimg.width($origimg[0].width);
        $origimg.height($origimg[0].height);
      } else {
        // Obtain dimensions from temporary image in case the original is not loaded yet (e.g. IE 7.0). 
        var tempImage = new Image();
        tempImage.src = $origimg[0].src;
        $origimg.width(tempImage.width);
        $origimg.height(tempImage.height);
      } 

      var $img = $origimg.clone().removeAttr('id').css(img_css).show();

      $img.width($origimg.width());
      $img.height($origimg.height());
      $origimg.after($img).hide();

    } else {
      $img = $origimg.css(img_css).show();
      img_mode = false;
      if (options.shade === null) { options.shade = true; }
    }

    presize($img, options.boxWidth, options.boxHeight);

    var boundx = $img.width(),
        boundy = $img.height(),
        
        
        $div = $('<div />').width(boundx).height(boundy).addClass(cssClass('holder')).css({
        position: 'relative',
        backgroundColor: options.bgColor
      }).insertAfter($origimg).append($img);

    if (options.addClass) {
      $div.addClass(options.addClass);
    }

    var $img2 = $('<div />'),

        $img_holder = $('<div />') 
        .width('100%').height('100%').css({
          zIndex: 310,
          position: 'absolute',
          overflow: 'hidden'
        }),

        $hdl_holder = $('<div />') 
        .width('100%').height('100%').css('zIndex', 320), 

        $sel = $('<div />') 
        .css({
          position: 'absolute',
          zIndex: 600
        }).dblclick(function(){
          var c = Coords.getFixed();
          options.onDblClick.call(api,c);
        }).insertBefore($img).append($img_holder, $hdl_holder); 

    if (img_mode) {

      $img2 = $('<img />')
          .attr('src', $img.attr('src')).css(img_css).width(boundx).height(boundy),

      $img_holder.append($img2);

    }

    if (ie6mode) {
      $sel.css({
        overflowY: 'hidden'
      });
    }

    var bound = options.boundary;
    var $trk = newTracker().width(boundx + (bound * 2)).height(boundy + (bound * 2)).css({
      position: 'absolute',
      top: px(-bound),
      left: px(-bound),
      zIndex: 290
    }).mousedown(newSelection);

    /* }}} */
    // Set more variables {{{
    var bgcolor = options.bgColor,
        bgopacity = options.bgOpacity,
        xlimit, ylimit, xmin, ymin, xscale, yscale, enabled = true,
        btndown, animating, shift_down;

    docOffset = getPos($img);
    // }}}
    // }}}
    // Internal Modules {{{
    // Touch Module {{{ 
    var Touch = (function () {
      // Touch support detection function adapted (under MIT License)
      // from code by Jeffrey Sambells - http://github.com/iamamused/
      function hasTouchSupport() {
        var support = {}, events = ['touchstart', 'touchmove', 'touchend'],
            el = document.createElement('div'), i;

        try {
          for(i=0; i<events.length; i++) {
            var eventName = events[i];
            eventName = 'on' + eventName;
            var isSupported = (eventName in el);
            if (!isSupported) {
              el.setAttribute(eventName, 'return;');
              isSupported = typeof el[eventName] == 'function';
            }
            support[events[i]] = isSupported;
          }
          return support.touchstart && support.touchend && support.touchmove;
        }
        catch(err) {
          return false;
        }
      }

      function detectSupport() {
        if ((options.touchSupport === true) || (options.touchSupport === false)) return options.touchSupport;
          else return hasTouchSupport();
      }
      return {
        createDragger: function (ord) {
          return function (e) {
            if (options.disabled) {
              return false;
            }
            if ((ord === 'move') && !options.allowMove) {
              return false;
            }
            docOffset = getPos($img);
            btndown = true;
            startDragMode(ord, mouseAbs(Touch.cfilter(e)), true);
            e.stopPropagation();
            e.preventDefault();
            return false;
          };
        },
        newSelection: function (e) {
          return newSelection(Touch.cfilter(e));
        },
        cfilter: function (e){
          e.pageX = e.originalEvent.changedTouches[0].pageX;
          e.pageY = e.originalEvent.changedTouches[0].pageY;
          return e;
        },
        isSupported: hasTouchSupport,
        support: detectSupport()
      };
    }());
    // }}}
    // Coords Module {{{
    var Coords = (function () {
      var x1 = 0,
          y1 = 0,
          x2 = 0,
          y2 = 0,
          ox, oy;

      function setPressed(pos) //{{{
      {
        pos = rebound(pos);
        x2 = x1 = pos[0];
        y2 = y1 = pos[1];
      }
      //}}}
      function setCurrent(pos) //{{{
      {
        pos = rebound(pos);
        ox = pos[0] - x2;
        oy = pos[1] - y2;
        x2 = pos[0];
        y2 = pos[1];
      }
      //}}}
      function getOffset() //{{{
      {
        return [ox, oy];
      }
      //}}}
      function moveOffset(offset) //{{{
      {
        var ox = offset[0],
            oy = offset[1];

        if (0 > x1 + ox) {
          ox -= ox + x1;
        }
        if (0 > y1 + oy) {
          oy -= oy + y1;
        }

        if (boundy < y2 + oy) {
          oy += boundy - (y2 + oy);
        }
        if (boundx < x2 + ox) {
          ox += boundx - (x2 + ox);
        }

        x1 += ox;
        x2 += ox;
        y1 += oy;
        y2 += oy;
      }
      //}}}
      function getCorner(ord) //{{{
      {
        var c = getFixed();
        switch (ord) {
        case 'ne':
          return [c.x2, c.y];
        case 'nw':
          return [c.x, c.y];
        case 'se':
          return [c.x2, c.y2];
        case 'sw':
          return [c.x, c.y2];
        }
      }
      //}}}
      function getFixed() //{{{
      {
        if (!options.aspectRatio) {
          return getRect();
        }
        // This function could use some optimization I think...
        var aspect = options.aspectRatio,
            min_x = options.minSize[0] / xscale,
            
            
            //min_y = options.minSize[1]/yscale,
            max_x = options.maxSize[0] / xscale,
            max_y = options.maxSize[1] / yscale,
            rw = x2 - x1,
            rh = y2 - y1,
            rwa = Math.abs(rw),
            rha = Math.abs(rh),
            real_ratio = rwa / rha,
            xx, yy, w, h;

        if (max_x === 0) {
          max_x = boundx * 10;
        }
        if (max_y === 0) {
          max_y = boundy * 10;
        }
        if (real_ratio < aspect) {
          yy = y2;
          w = rha * aspect;
          xx = rw < 0 ? x1 - w : w + x1;

          if (xx < 0) {
            xx = 0;
            h = Math.abs((xx - x1) / aspect);
            yy = rh < 0 ? y1 - h : h + y1;
          } else if (xx > boundx) {
            xx = boundx;
            h = Math.abs((xx - x1) / aspect);
            yy = rh < 0 ? y1 - h : h + y1;
          }
        } else {
          xx = x2;
          h = rwa / aspect;
          yy = rh < 0 ? y1 - h : y1 + h;
          if (yy < 0) {
            yy = 0;
            w = Math.abs((yy - y1) * aspect);
            xx = rw < 0 ? x1 - w : w + x1;
          } else if (yy > boundy) {
            yy = boundy;
            w = Math.abs(yy - y1) * aspect;
            xx = rw < 0 ? x1 - w : w + x1;
          }
        }

        // Magic %-)
        if (xx > x1) { // right side
          if (xx - x1 < min_x) {
            xx = x1 + min_x;
          } else if (xx - x1 > max_x) {
            xx = x1 + max_x;
          }
          if (yy > y1) {
            yy = y1 + (xx - x1) / aspect;
          } else {
            yy = y1 - (xx - x1) / aspect;
          }
        } else if (xx < x1) { // left side
          if (x1 - xx < min_x) {
            xx = x1 - min_x;
          } else if (x1 - xx > max_x) {
            xx = x1 - max_x;
          }
          if (yy > y1) {
            yy = y1 + (x1 - xx) / aspect;
          } else {
            yy = y1 - (x1 - xx) / aspect;
          }
        }

        if (xx < 0) {
          x1 -= xx;
          xx = 0;
        } else if (xx > boundx) {
          x1 -= xx - boundx;
          xx = boundx;
        }

        if (yy < 0) {
          y1 -= yy;
          yy = 0;
        } else if (yy > boundy) {
          y1 -= yy - boundy;
          yy = boundy;
        }

        return makeObj(flipCoords(x1, y1, xx, yy));
      }
      //}}}
      function rebound(p) //{{{
      {
        if (p[0] < 0) p[0] = 0;
        if (p[1] < 0) p[1] = 0;

        if (p[0] > boundx) p[0] = boundx;
        if (p[1] > boundy) p[1] = boundy;

        return [Math.round(p[0]), Math.round(p[1])];
      }
      //}}}
      function flipCoords(x1, y1, x2, y2) //{{{
      {
        var xa = x1,
            xb = x2,
            ya = y1,
            yb = y2;
        if (x2 < x1) {
          xa = x2;
          xb = x1;
        }
        if (y2 < y1) {
          ya = y2;
          yb = y1;
        }
        return [xa, ya, xb, yb];
      }
      //}}}
      function getRect() //{{{
      {
        var xsize = x2 - x1,
            ysize = y2 - y1,
            delta;

        if (xlimit && (Math.abs(xsize) > xlimit)) {
          x2 = (xsize > 0) ? (x1 + xlimit) : (x1 - xlimit);
        }
        if (ylimit && (Math.abs(ysize) > ylimit)) {
          y2 = (ysize > 0) ? (y1 + ylimit) : (y1 - ylimit);
        }

        if (ymin / yscale && (Math.abs(ysize) < ymin / yscale)) {
          y2 = (ysize > 0) ? (y1 + ymin / yscale) : (y1 - ymin / yscale);
        }
        if (xmin / xscale && (Math.abs(xsize) < xmin / xscale)) {
          x2 = (xsize > 0) ? (x1 + xmin / xscale) : (x1 - xmin / xscale);
        }

        if (x1 < 0) {
          x2 -= x1;
          x1 -= x1;
        }
        if (y1 < 0) {
          y2 -= y1;
          y1 -= y1;
        }
        if (x2 < 0) {
          x1 -= x2;
          x2 -= x2;
        }
        if (y2 < 0) {
          y1 -= y2;
          y2 -= y2;
        }
        if (x2 > boundx) {
          delta = x2 - boundx;
          x1 -= delta;
          x2 -= delta;
        }
        if (y2 > boundy) {
          delta = y2 - boundy;
          y1 -= delta;
          y2 -= delta;
        }
        if (x1 > boundx) {
          delta = x1 - boundy;
          y2 -= delta;
          y1 -= delta;
        }
        if (y1 > boundy) {
          delta = y1 - boundy;
          y2 -= delta;
          y1 -= delta;
        }

        return makeObj(flipCoords(x1, y1, x2, y2));
      }
      //}}}
      function makeObj(a) //{{{
      {
        return {
          x: a[0],
          y: a[1],
          x2: a[2],
          y2: a[3],
          w: a[2] - a[0],
          h: a[3] - a[1]
        };
      }
      //}}}

      return {
        flipCoords: flipCoords,
        setPressed: setPressed,
        setCurrent: setCurrent,
        getOffset: getOffset,
        moveOffset: moveOffset,
        getCorner: getCorner,
        getFixed: getFixed
      };
    }());

    //}}}
    // Shade Module {{{
    var Shade = (function() {
      var enabled = false,
          holder = $('<div />').css({
            position: 'absolute',
            zIndex: 240,
            opacity: 0
          }),
          shades = {
            top: createShade(),
            left: createShade().height(boundy),
            right: createShade().height(boundy),
            bottom: createShade()
          };

      function resizeShades(w,h) {
        shades.left.css({ height: px(h) });
        shades.right.css({ height: px(h) });
      }
      function updateAuto()
      {
        return updateShade(Coords.getFixed());
      }
      function updateShade(c)
      {
        shades.top.css({
          left: px(c.x),
          width: px(c.w),
          height: px(c.y)
        });
        shades.bottom.css({
          top: px(c.y2),
          left: px(c.x),
          width: px(c.w),
          height: px(boundy-c.y2)
        });
        shades.right.css({
          left: px(c.x2),
          width: px(boundx-c.x2)
        });
        shades.left.css({
          width: px(c.x)
        });
      }
      function createShade() {
        return $('<div />').css({
          position: 'absolute',
          backgroundColor: options.shadeColor||options.bgColor
        }).appendTo(holder);
      }
      function enableShade() {
        if (!enabled) {
          enabled = true;
          holder.insertBefore($img);
          updateAuto();
          Selection.setBgOpacity(1,0,1);
          $img2.hide();

          setBgColor(options.shadeColor||options.bgColor,1);
          if (Selection.isAwake())
          {
            setOpacity(options.bgOpacity,1);
          }
            else setOpacity(1,1);
        }
      }
      function setBgColor(color,now) {
        colorChangeMacro(getShades(),color,now);
      }
      function disableShade() {
        if (enabled) {
          holder.remove();
          $img2.show();
          enabled = false;
          if (Selection.isAwake()) {
            Selection.setBgOpacity(options.bgOpacity,1,1);
          } else {
            Selection.setBgOpacity(1,1,1);
            Selection.disableHandles();
          }
          colorChangeMacro($div,0,1);
        }
      }
      function setOpacity(opacity,now) {
        if (enabled) {
          if (options.bgFade && !now) {
            holder.animate({
              opacity: 1-opacity
            },{
              queue: false,
              duration: options.fadeTime
            });
          }
          else holder.css({opacity:1-opacity});
        }
      }
      function refreshAll() {
        options.shade ? enableShade() : disableShade();
        if (Selection.isAwake()) setOpacity(options.bgOpacity);
      }
      function getShades() {
        return holder.children();
      }

      return {
        update: updateAuto,
        updateRaw: updateShade,
        getShades: getShades,
        setBgColor: setBgColor,
        enable: enableShade,
        disable: disableShade,
        resize: resizeShades,
        refresh: refreshAll,
        opacity: setOpacity
      };
    }());
    // }}}
    // Selection Module {{{
    var Selection = (function () {
      var awake,
          hdep = 370,
          borders = {},
          handle = {},
          dragbar = {},
          seehandles = false;

      // Private Methods
      function insertBorder(type) //{{{
      {
        var jq = $('<div />').css({
          position: 'absolute',
          opacity: options.borderOpacity
        }).addClass(cssClass(type));
        $img_holder.append(jq);
        return jq;
      }
      //}}}
      function dragDiv(ord, zi) //{{{
      {
        var jq = $('<div />').mousedown(createDragger(ord)).css({
          cursor: ord + '-resize',
          position: 'absolute',
          zIndex: zi
        }).addClass('ord-'+ord);

        if (Touch.support) {
          jq.bind('touchstart.jcrop', Touch.createDragger(ord));
        }

        $hdl_holder.append(jq);
        return jq;
      }
      //}}}
      function insertHandle(ord) //{{{
      {
        var hs = options.handleSize,

          div = dragDiv(ord, hdep++).css({
            opacity: options.handleOpacity
          }).addClass(cssClass('handle'));

        if (hs) { div.width(hs).height(hs); }

        return div;
      }
      //}}}
      function insertDragbar(ord) //{{{
      {
        return dragDiv(ord, hdep++).addClass('jcrop-dragbar');
      }
      //}}}
      function createDragbars(li) //{{{
      {
        var i;
        for (i = 0; i < li.length; i++) {
          dragbar[li[i]] = insertDragbar(li[i]);
        }
      }
      //}}}
      function createBorders(li) //{{{
      {
        var cl,i;
        for (i = 0; i < li.length; i++) {
          switch(li[i]){
            case'n': cl='hline'; break;
            case's': cl='hline bottom'; break;
            case'e': cl='vline right'; break;
            case'w': cl='vline'; break;
          }
          borders[li[i]] = insertBorder(cl);
        }
      }
      //}}}
      function createHandles(li) //{{{
      {
        var i;
        for (i = 0; i < li.length; i++) {
          handle[li[i]] = insertHandle(li[i]);
        }
      }
      //}}}
      function moveto(x, y) //{{{
      {
        if (!options.shade) {
          $img2.css({
            top: px(-y),
            left: px(-x)
          });
        }
        $sel.css({
          top: px(y),
          left: px(x)
        });
      }
      //}}}
      function resize(w, h) //{{{
      {
        $sel.width(Math.round(w)).height(Math.round(h));
      }
      //}}}
      function refresh() //{{{
      {
        var c = Coords.getFixed();

        Coords.setPressed([c.x, c.y]);
        Coords.setCurrent([c.x2, c.y2]);

        updateVisible();
      }
      //}}}

      // Internal Methods
      function updateVisible(select) //{{{
      {
        if (awake) {
          return update(select);
        }
      }
      //}}}
      function update(select) //{{{
      {
        var c = Coords.getFixed();

        resize(c.w, c.h);
        moveto(c.x, c.y);
        if (options.shade) Shade.updateRaw(c);

        awake || show();

        if (select) {
          options.onSelect.call(api, unscale(c));
        } else {
          options.onChange.call(api, unscale(c));
        }
      }
      //}}}
      function setBgOpacity(opacity,force,now) //{{{
      {
        if (!awake && !force) return;
        if (options.bgFade && !now) {
          $img.animate({
            opacity: opacity
          },{
            queue: false,
            duration: options.fadeTime
          });
        } else {
          $img.css('opacity', opacity);
        }
      }
      //}}}
      function show() //{{{
      {
        $sel.show();

        if (options.shade) Shade.opacity(bgopacity);
          else setBgOpacity(bgopacity,true);

        awake = true;
      }
      //}}}
      function release() //{{{
      {
        disableHandles();
        $sel.hide();

        if (options.shade) Shade.opacity(1);
          else setBgOpacity(1);

        awake = false;
        options.onRelease.call(api);
      }
      //}}}
      function showHandles() //{{{
      {
        if (seehandles) {
          $hdl_holder.show();
        }
      }
      //}}}
      function enableHandles() //{{{
      {
        seehandles = true;
        if (options.allowResize) {
          $hdl_holder.show();
          return true;
        }
      }
      //}}}
      function disableHandles() //{{{
      {
        seehandles = false;
        $hdl_holder.hide();
      } 
      //}}}
      function animMode(v) //{{{
      {
        if (v) {
          animating = true;
          disableHandles();
        } else {
          animating = false;
          enableHandles();
        }
      } 
      //}}}
      function done() //{{{
      {
        animMode(false);
        refresh();
      } 
      //}}}
      // Insert draggable elements {{{
      // Insert border divs for outline

      if (options.dragEdges && $.isArray(options.createDragbars))
        createDragbars(options.createDragbars);

      if ($.isArray(options.createHandles))
        createHandles(options.createHandles);

      if (options.drawBorders && $.isArray(options.createBorders))
        createBorders(options.createBorders);

      //}}}

      // This is a hack for iOS5 to support drag/move touch functionality
      $(document).bind('touchstart.jcrop-ios',function(e) {
        if ($(e.currentTarget).hasClass('jcrop-tracker')) e.stopPropagation();
      });

      var $track = newTracker().mousedown(createDragger('move')).css({
        cursor: 'move',
        position: 'absolute',
        zIndex: 360
      });

      if (Touch.support) {
        $track.bind('touchstart.jcrop', Touch.createDragger('move'));
      }

      $img_holder.append($track);
      disableHandles();

      return {
        updateVisible: updateVisible,
        update: update,
        release: release,
        refresh: refresh,
        isAwake: function () {
          return awake;
        },
        setCursor: function (cursor) {
          $track.css('cursor', cursor);
        },
        enableHandles: enableHandles,
        enableOnly: function () {
          seehandles = true;
        },
        showHandles: showHandles,
        disableHandles: disableHandles,
        animMode: animMode,
        setBgOpacity: setBgOpacity,
        done: done
      };
    }());
    
    //}}}
    // Tracker Module {{{
    var Tracker = (function () {
      var onMove = function () {},
          onDone = function () {},
          trackDoc = options.trackDocument;

      function toFront(touch) //{{{
      {
        $trk.css({
          zIndex: 450
        });

        if (touch)
          $(document)
            .bind('touchmove.jcrop', trackTouchMove)
            .bind('touchend.jcrop', trackTouchEnd);

        else if (trackDoc)
          $(document)
            .bind('mousemove.jcrop',trackMove)
            .bind('mouseup.jcrop',trackUp);
      } 
      //}}}
      function toBack() //{{{
      {
        $trk.css({
          zIndex: 290
        });
        $(document).unbind('.jcrop');
      } 
      //}}}
      function trackMove(e) //{{{
      {
        onMove(mouseAbs(e));
        return false;
      } 
      //}}}
      function trackUp(e) //{{{
      {
        e.preventDefault();
        e.stopPropagation();

        if (btndown) {
          btndown = false;

          onDone(mouseAbs(e));

          if (Selection.isAwake()) {
            options.onSelect.call(api, unscale(Coords.getFixed()));
          }

          toBack();
          onMove = function () {};
          onDone = function () {};
        }

        return false;
      }
      //}}}
      function activateHandlers(move, done, touch) //{{{
      {
        btndown = true;
        onMove = move;
        onDone = done;
        toFront(touch);
        return false;
      }
      //}}}
      function trackTouchMove(e) //{{{
      {
        onMove(mouseAbs(Touch.cfilter(e)));
        return false;
      }
      //}}}
      function trackTouchEnd(e) //{{{
      {
        return trackUp(Touch.cfilter(e));
      }
      //}}}
      function setCursor(t) //{{{
      {
        $trk.css('cursor', t);
      }
      //}}}

      if (!trackDoc) {
        $trk.mousemove(trackMove).mouseup(trackUp).mouseout(trackUp);
      }

      $img.before($trk);
      return {
        activateHandlers: activateHandlers,
        setCursor: setCursor
      };
    }());
    //}}}
    // KeyManager Module {{{
    var KeyManager = (function () {
      var $keymgr = $('<input type="radio" />').css({
        position: 'fixed',
        left: '-120px',
        width: '12px'
      }).addClass('jcrop-keymgr'),

        $keywrap = $('<div />').css({
          position: 'absolute',
          overflow: 'hidden'
        }).append($keymgr);

      function watchKeys() //{{{
      {
        if (options.keySupport) {
          $keymgr.show();
          $keymgr.focus();
        }
      }
      //}}}
      function onBlur(e) //{{{
      {
        $keymgr.hide();
      }
      //}}}
      function doNudge(e, x, y) //{{{
      {
        if (options.allowMove) {
          Coords.moveOffset([x, y]);
          Selection.updateVisible(true);
        }
        e.preventDefault();
        e.stopPropagation();
      }
      //}}}
      function parseKey(e) //{{{
      {
        if (e.ctrlKey || e.metaKey) {
          return true;
        }
        shift_down = e.shiftKey ? true : false;
        var nudge = shift_down ? 10 : 1;

        switch (e.keyCode) {
        case 37:
          doNudge(e, -nudge, 0);
          break;
        case 39:
          doNudge(e, nudge, 0);
          break;
        case 38:
          doNudge(e, 0, -nudge);
          break;
        case 40:
          doNudge(e, 0, nudge);
          break;
        case 27:
          if (options.allowSelect) Selection.release();
          break;
        case 9:
          return true;
        }

        return false;
      }
      //}}}

      if (options.keySupport) {
        $keymgr.keydown(parseKey).blur(onBlur);
        if (ie6mode || !options.fixedSupport) {
          $keymgr.css({
            position: 'absolute',
            left: '-20px'
          });
          $keywrap.append($keymgr).insertBefore($img);
        } else {
          $keymgr.insertBefore($img);
        }
      }


      return {
        watchKeys: watchKeys
      };
    }());
    //}}}
    // }}}
    // API methods {{{
    function setClass(cname) //{{{
    {
      $div.removeClass().addClass(cssClass('holder')).addClass(cname);
    }
    //}}}
    function animateTo(a, callback) //{{{
    {
      var x1 = a[0] / xscale,
          y1 = a[1] / yscale,
          x2 = a[2] / xscale,
          y2 = a[3] / yscale;

      if (animating) {
        return;
      }

      var animto = Coords.flipCoords(x1, y1, x2, y2),
          c = Coords.getFixed(),
          initcr = [c.x, c.y, c.x2, c.y2],
          animat = initcr,
          interv = options.animationDelay,
          ix1 = animto[0] - initcr[0],
          iy1 = animto[1] - initcr[1],
          ix2 = animto[2] - initcr[2],
          iy2 = animto[3] - initcr[3],
          pcent = 0,
          velocity = options.swingSpeed;

      x1 = animat[0];
      y1 = animat[1];
      x2 = animat[2];
      y2 = animat[3];

      Selection.animMode(true);
      var anim_timer;

      function queueAnimator() {
        window.setTimeout(animator, interv);
      }
      var animator = (function () {
        return function () {
          pcent += (100 - pcent) / velocity;

          animat[0] = Math.round(x1 + ((pcent / 100) * ix1));
          animat[1] = Math.round(y1 + ((pcent / 100) * iy1));
          animat[2] = Math.round(x2 + ((pcent / 100) * ix2));
          animat[3] = Math.round(y2 + ((pcent / 100) * iy2));

          if (pcent >= 99.8) {
            pcent = 100;
          }
          if (pcent < 100) {
            setSelectRaw(animat);
            queueAnimator();
          } else {
            Selection.done();
            Selection.animMode(false);
            if (typeof(callback) === 'function') {
              callback.call(api);
            }
          }
        };
      }());
      queueAnimator();
    }
    //}}}
    function setSelect(rect) //{{{
    {
      setSelectRaw([rect[0] / xscale, rect[1] / yscale, rect[2] / xscale, rect[3] / yscale]);
      options.onSelect.call(api, unscale(Coords.getFixed()));
      Selection.enableHandles();
    }
    //}}}
    function setSelectRaw(l) //{{{
    {
      Coords.setPressed([l[0], l[1]]);
      Coords.setCurrent([l[2], l[3]]);
      Selection.update();
    }
    //}}}
    function tellSelect() //{{{
    {
      return unscale(Coords.getFixed());
    }
    //}}}
    function tellScaled() //{{{
    {
      return Coords.getFixed();
    }
    //}}}
    function setOptionsNew(opt) //{{{
    {
      setOptions(opt);
      interfaceUpdate();
    }
    //}}}
    function disableCrop() //{{{
    {
      options.disabled = true;
      Selection.disableHandles();
      Selection.setCursor('default');
      Tracker.setCursor('default');
    }
    //}}}
    function enableCrop() //{{{
    {
      options.disabled = false;
      interfaceUpdate();
    }
    //}}}
    function cancelCrop() //{{{
    {
      Selection.done();
      Tracker.activateHandlers(null, null);
    }
    //}}}
    function destroy() //{{{
    {
      $div.remove();
      $origimg.show();
      $origimg.css('visibility','visible');
      $(obj).removeData('Jcrop');
    }
    //}}}
    function setImage(src, callback) //{{{
    {
      Selection.release();
      disableCrop();
      var img = new Image();
      img.onload = function () {
        var iw = img.width;
        var ih = img.height;
        var bw = options.boxWidth;
        var bh = options.boxHeight;
        $img.width(iw).height(ih);
        $img.attr('src', src);
        $img2.attr('src', src);
        presize($img, bw, bh);
        boundx = $img.width();
        boundy = $img.height();
        $img2.width(boundx).height(boundy);
        $trk.width(boundx + (bound * 2)).height(boundy + (bound * 2));
        $div.width(boundx).height(boundy);
        Shade.resize(boundx,boundy);
        enableCrop();

        if (typeof(callback) === 'function') {
          callback.call(api);
        }
      };
      img.src = src;
    }
    //}}}
    function colorChangeMacro($obj,color,now) {
      var mycolor = color || options.bgColor;
      if (options.bgFade && supportsColorFade() && options.fadeTime && !now) {
        $obj.animate({
          backgroundColor: mycolor
        }, {
          queue: false,
          duration: options.fadeTime
        });
      } else {
        $obj.css('backgroundColor', mycolor);
      }
    }
    function interfaceUpdate(alt) //{{{
    // This method tweaks the interface based on options object.
    // Called when options are changed and at end of initialization.
    {
      if (options.allowResize) {
        if (alt) {
          Selection.enableOnly();
        } else {
          Selection.enableHandles();
        }
      } else {
        Selection.disableHandles();
      }

      Tracker.setCursor(options.allowSelect ? 'crosshair' : 'default');
      Selection.setCursor(options.allowMove ? 'move' : 'default');

      if (options.hasOwnProperty('trueSize')) {
        xscale = options.trueSize[0] / boundx;
        yscale = options.trueSize[1] / boundy;
      }

      if (options.hasOwnProperty('setSelect')) {
        setSelect(options.setSelect);
        Selection.done();
        delete(options.setSelect);
      }

      Shade.refresh();

      if (options.bgColor != bgcolor) {
        colorChangeMacro(
          options.shade? Shade.getShades(): $div,
          options.shade?
            (options.shadeColor || options.bgColor):
            options.bgColor
        );
        bgcolor = options.bgColor;
      }

      if (bgopacity != options.bgOpacity) {
        bgopacity = options.bgOpacity;
        if (options.shade) Shade.refresh();
          else Selection.setBgOpacity(bgopacity);
      }

      xlimit = options.maxSize[0] || 0;
      ylimit = options.maxSize[1] || 0;
      xmin = options.minSize[0] || 0;
      ymin = options.minSize[1] || 0;

      if (options.hasOwnProperty('outerImage')) {
        $img.attr('src', options.outerImage);
        delete(options.outerImage);
      }

      Selection.refresh();
    }
    //}}}
    //}}}

    if (Touch.support) $trk.bind('touchstart.jcrop', Touch.newSelection);

    $hdl_holder.hide();
    interfaceUpdate(true);

    var api = {
      setImage: setImage,
      animateTo: animateTo,
      setSelect: setSelect,
      setOptions: setOptionsNew,
      tellSelect: tellSelect,
      tellScaled: tellScaled,
      setClass: setClass,

      disable: disableCrop,
      enable: enableCrop,
      cancel: cancelCrop,
      release: Selection.release,
      destroy: destroy,

      focus: KeyManager.watchKeys,

      getBounds: function () {
        return [boundx * xscale, boundy * yscale];
      },
      getWidgetSize: function () {
        return [boundx, boundy];
      },
      getScaleFactor: function () {
        return [xscale, yscale];
      },
      getOptions: function() {
        // careful: internal values are returned
        return options;
      },

      ui: {
        holder: $div,
        selection: $sel
      }
    };

    if (is_msie) $div.bind('selectstart', function () { return false; });

    $origimg.data('Jcrop', api);
    return api;
  };
  $.fn.Jcrop = function (options, callback) //{{{
  {
    var api;
    // Iterate over each object, attach Jcrop
    this.each(function () {
      // If we've already attached to this object
      if ($(this).data('Jcrop')) {
        // The API can be requested this way (undocumented)
        if (options === 'api') return $(this).data('Jcrop');
        // Otherwise, we just reset the options...
        else $(this).data('Jcrop').setOptions(options);
      }
      // If we haven't been attached, preload and attach
      else {
        if (this.tagName == 'IMG')
          $.Jcrop.Loader(this,function(){
            $(this).css({display:'block',visibility:'hidden'});
            api = $.Jcrop(this, options);
            if ($.isFunction(callback)) callback.call(api);
          });
        else {
          $(this).css({display:'block',visibility:'hidden'});
          api = $.Jcrop(this, options);
          if ($.isFunction(callback)) callback.call(api);
        }
      }
    });

    // Return "this" so the object is chainable (jQuery-style)
    return this;
  };
  //}}}
  // $.Jcrop.Loader - basic image loader {{{

  $.Jcrop.Loader = function(imgobj,success,error){
    var $img = $(imgobj), img = $img[0];

    function completeCheck(){
      if (img.complete) {
        $img.unbind('.jcloader');
        if ($.isFunction(success)) success.call(img);
      }
      else window.setTimeout(completeCheck,50);
    }

    $img
      .bind('load.jcloader',completeCheck)
      .bind('error.jcloader',function(e){
        $img.unbind('.jcloader');
        if ($.isFunction(error)) error.call(img);
      });

    if (img.complete && $.isFunction(success)){
      $img.unbind('.jcloader');
      success.call(img);
    }
  };

  //}}}
  // Global Defaults {{{
  $.Jcrop.defaults = {

    // Basic Settings
    allowSelect: true,
    allowMove: true,
    allowResize: true,

    trackDocument: true,

    // Styling Options
    baseClass: 'jcrop',
    addClass: null,
    bgColor: 'black',
    bgOpacity: 0.6,
    bgFade: false,
    borderOpacity: 0.4,
    handleOpacity: 0.5,
    handleSize: null,

    aspectRatio: 0,
    keySupport: true,
    createHandles: ['n','s','e','w','nw','ne','se','sw'],
    createDragbars: ['n','s','e','w'],
    createBorders: ['n','s','e','w'],
    drawBorders: true,
    dragEdges: true,
    fixedSupport: true,
    touchSupport: null,

    shade: null,

    boxWidth: 0,
    boxHeight: 0,
    boundary: 2,
    fadeTime: 400,
    animationDelay: 20,
    swingSpeed: 3,

    minSelect: [0, 0],
    maxSize: [0, 0],
    minSize: [0, 0],

    // Callbacks / Event Handlers
    onChange: function () {},
    onSelect: function () {},
    onDblClick: function () {},
    onRelease: function () {}
  };

  // }}}
}(jQuery));
/* http://github.com/mindmup/bootstrap-wysiwyg */
/*global jQuery, $, FileReader*/
/*jslint browser:true*/
(function ($) {
	'use strict';
	var readFileIntoDataUrl = function (fileInfo) {
		var loader = $.Deferred(),
			fReader = new FileReader();
		fReader.onload = function (e) {
			loader.resolve(e.target.result);
		};
		fReader.onerror = loader.reject;
		fReader.onprogress = loader.notify;
		fReader.readAsDataURL(fileInfo);
		return loader.promise();
	};
	$.fn.cleanHtml = function () {
		var html = $(this).html();
		return html && html.replace(/(<br>|\s|<div><br><\/div>|&nbsp;)*$/, '');
	};
	$.fn.wysiwyg_destroy = function(userOptions) {
	    var editor, options, toolbar, toolbarBtnSelector;
	    editor = this;
	    options = $.extend({}, $.fn.wysiwyg.defaults, userOptions);
	    toolbarBtnSelector = "a[data-" + options.commandRole + "],button[data-" + options.commandRole + "],input[type=button][data-" + options.commandRole + "]";
	    editor.off("." + options.eventNamespace);
	    editor.off("paste");
	    $(window).off("." + options.eventNamespace);
	    toolbar = $(options.toolbarSelector);
	    toolbar.find(toolbarBtnSelector).off("." + options.eventNamespace);
	    toolbar.find("[data-toggle=dropdown]").off("." + options.eventNamespace);
	    toolbar.find("input[type=text][data-" + options.commandRole + "]").off("." + options.eventNamespace);
	    toolbar.find("input[type=file][data-" + options.commandRole + "]").off("." + options.eventNamespace);
	    return this;
	};
	$.fn.wysiwyg = function (userOptions) {		
		var editor = this,
			selectedRange,
			options,
			toolbarBtnSelector,
			startContainer,
			startOffset,
			endContainer,
			endOffset,
			updateToolbar = function () {
				if (options.activeToolbarClass) {
					$(options.toolbarSelector).find(toolbarBtnSelector).each(function () {
						var command = $(this).data(options.commandRole);
						if (document.queryCommandState(command)) {
							$(this).addClass(options.activeToolbarClass);
						} else {
							$(this).removeClass(options.activeToolbarClass);
						}
					});
				}
			},
			execCommand = function (commandWithArgs, valueArg) {
				var commandArr = commandWithArgs.split(' '),
					command = commandArr.shift(),
					args = commandArr.join(' ') + (valueArg || '');
				/*if(command == 'unlink') {
					$('#btn-toolbar input[type=text][data-edit]').val('');
					$('#btn-toolbar select[data-edit]').val(0);
				}*/
				if(command == 'createLink') {
					//EQ-179恢复选区
					var selection = window.getSelection();
					// 构造新的 Range
					var newRange = document.createRange(); // 注意，此处必须创建一个新的选区，在原来的 range 上修改无效
					newRange.setStart(startContainer, startOffset);
					newRange.setEnd(endContainer, endOffset);

					// 恢复选区
					selection.removeAllRanges();
					selection.addRange(newRange);
					
					//document.execCommand('insertHTML', false, '<a href="' + args + '" target="_blank">' + window.getSelection() + '</a>');
					//document.execCommand(command, true, args);
					//没有选中
					if(window.getSelection().isCollapsed ) {
						updateToolbar();
						return;
					}
					if(valueArg[0] == 'external') {
						var newLink = document.execCommand(command, 0	, PREFIX_S1_URL + 'scenedata-links?id=' + args.split(',')[2] + '&url=' + encodeURIComponent(args.split(',')[1]));
						window.getSelection().focusNode.parentElement.target = '_blank';
						$(window.getSelection().focusNode.parentElement).removeAttr('data');
					} else if(valueArg[0] == 'internal') {
						var newLink = document.execCommand(command, 0 , args.split(',')[1]);
						$(window.getSelection().focusNode.parentElement).removeAttr('href');
						$(window.getSelection().focusNode.parentElement).attr('data', args.split(',')[1]);
						console.log($(window.getSelection().focusNode.parentElement)[0]);
					}
     				//newLink.target = "_blank";
				} else {
					document.execCommand(command, 0, args);
				}				
				updateToolbar();
			},
			bindHotkeys = function (hotKeys) {
				$.each(hotKeys, function (hotkey, command) {
					editor.keydown(hotkey, function (e) {
						if (editor.attr('contenteditable') && editor.is(':visible')) {
							e.preventDefault();
							e.stopPropagation();
							execCommand(command);
						}
					}).keyup(hotkey, function (e) {
						if (editor.attr('contenteditable') && editor.is(':visible')) {
							e.preventDefault();
							e.stopPropagation();
						}
					});
				});
			},
			getCurrentRange = function () {
				var sel = window.getSelection();
				if (sel.getRangeAt && sel.rangeCount) {
					return sel.getRangeAt(0);
				}
			},
			saveSelection = function () {
				selectedRange = getCurrentRange();
			},
			restoreSelection = function () {
				var selection = window.getSelection();
				if (selectedRange) {
					try {
						selection.removeAllRanges();
					} catch (ex) {
						document.body.createTextRange().select();
						document.selection.empty();
					}

					selection.addRange(selectedRange);
				}
			},
			insertFiles = function (files) {
				editor.focus();
				$.each(files, function (idx, fileInfo) {
					if (/^image\//.test(fileInfo.type)) {
						$.when(readFileIntoDataUrl(fileInfo)).done(function (dataUrl) {
							execCommand('insertimage', dataUrl);
						}).fail(function (e) {
							options.fileUploadError("file-reader", e);
						});
					} else {
						options.fileUploadError("unsupported-file-type", fileInfo.type);
					}
				});
			},
			markSelection = function (input, color) {
				restoreSelection();
				if (document.queryCommandSupported('hiliteColor')) {
					document.execCommand('hiliteColor', 0, color || 'transparent');
				}
				saveSelection();
				input.data(options.selectionMarker, color);
			},
			bindToolbar = function (toolbar, options) {
				toolbar.find(toolbarBtnSelector).click(function () {
					restoreSelection();
					editor.focus();
					execCommand($(this).data(options.commandRole));
					saveSelection();
				});
				toolbar.find('[data-toggle=dropdown]').click(restoreSelection);
				var radioValue, elementid;
				toolbar.find('.createLink[data-toggle=dropdown]').click(function() {
					//$('.selected-text').html(getCurrentRange().endContainer.data.substring(getCurrentRange().startOffset, getCurrentRange().endOffset));
					var input;
					var parent = $(getSelection().focusNode).parent();
					elementid = $(parent).closest('.element').attr('id');
					$('#btn-toolbar input[type=text][data-edit]').attr('id', 'input_' + elementid);
					$('#btn-toolbar select[data-edit]').attr('id', 'select_' + elementid);
					$('#btn-toolbar input[name=external]').attr('id', 'external_' + elementid);
					$('#btn-toolbar input[name=internal]').attr('id', 'internal_' + elementid);
					if(isNaN($('#select_'+ elementid).find('option')[0].value)) {
						$($('#select_'+ elementid).find('option')[0]).remove();
					}
					if(parent.is('a')) {
						if(parent.attr('href')) {
							input = $('#btn-toolbar #input_' + elementid);
							input.val(decodeURIComponent(parent.attr('href').split('url=')[1]));
							$('#btn-toolbar #select_' + elementid).val(0).attr('disabled', true);
							$('#btn-toolbar #external_' + elementid).attr('checked', true);
							$('#btn-toolbar #internal_' + elementid).attr('checked', false);
							radioValue = 'external';
						} else if(parent.attr('data')) {
							input = $('#btn-toolbar #select_' + elementid);
							input.val(parent.attr('data')-1);
							$('#btn-toolbar #input_' + elementid).val('http://').attr('disabled', true);
							$('#btn-toolbar #internal_' + elementid).attr('checked', true);
							$('#btn-toolbar #external_' + elementid).attr('checked', false);
							radioValue = 'internal';
						}
						/*input.val(decodeURIComponent(parent.attr('href').split('url=')[1]));*/
					} else {
						$('#btn-toolbar #input_' + elementid).val('http://');
						$('#btn-toolbar #select_' + elementid).val(0).attr('disabled', true);
						$('#btn-toolbar #internal_' + elementid).attr('checked', false);
						$('#btn-toolbar #external_' + elementid).attr('checked', true);
						radioValue = 'external';
					}

					//EQ-179解决鼠标光标focus在文本区后丢失选区问题。
					var selection = window.getSelection();
					var range = selection.getRangeAt(0);

					// 保存所有 Range 的属性
					startContainer = range.startContainer;
					startOffset = range.startOffset;
					endContainer = range.endContainer;
					endOffset = range.endOffset;
				});

				$('#btn-toolbar input[name=external]').change(function() {
					radioValue = this.value;
					$('#btn-toolbar #select_' + elementid).val(0).attr('disabled', true);
					$('#btn-toolbar #input_' + elementid).removeAttr('disabled');
					$('#btn-toolbar #internal_' + elementid).attr('checked', false);
				});
				$('#btn-toolbar input[name=internal]').change(function() {
					radioValue = this.value;
					$('#btn-toolbar #input_' + elementid).val('http://').attr('disabled', true);
					$('#btn-toolbar #select_' + elementid).removeAttr('disabled');
					$('#btn-toolbar #external_' + elementid).attr('checked', false);
				});

				$('a[dropdown-toggle]').click(function() {
					if(radioValue == 'external') {
						var elem = toolbar.find('input[type=text][data-' + options.commandRole + ']');
						var newValue = $(elem).val(); /* ugly but prevents fake double-calls due to selection restoration */
						$(elem).val('');
						var sceneId = $(elem).attr('sceneid');
						restoreSelection();
						var prefix = 'http://';
						if (newValue.substr(0, prefix.length) !== prefix)
						{
							newValue = prefix + newValue;
						}
						if (newValue && newValue != prefix) {
							editor.focus();
							execCommand($(elem).data(options.commandRole), [radioValue, newValue, sceneId]);
						}
						saveSelection();
					} else if(radioValue == 'internal') {
						//alert(789);
						var elem = toolbar.find('select[data-' + options.commandRole + ']');
						var newValue = $(elem).val(); /* ugly but prevents fake double-calls due to selection restoration */
						$(elem).val('');
						var sceneId = $(elem).attr('sceneid');
						restoreSelection();
						if (newValue) {
							editor.focus();
							execCommand($(elem).data(options.commandRole), [radioValue, parseInt(newValue) + 1, sceneId]);
						}
					}
				});
				toolbar.find('input[type=file][data-' + options.commandRole + ']').change(function () {
					restoreSelection();
					if (this.type === 'file' && this.files && this.files.length > 0) {
						insertFiles(this.files);
					}
					saveSelection();
					this.value = '';
				});
			},
			initFileDrops = function () {
				editor.on('dragenter dragover', false)
					.on('drop', function (e) {
						var dataTransfer = e.originalEvent.dataTransfer;
						e.stopPropagation();
						e.preventDefault();
						if (dataTransfer && dataTransfer.files && dataTransfer.files.length > 0) {
							insertFiles(dataTransfer.files);
						}
					});
			};
		options = $.extend({}, $.fn.wysiwyg.defaults, userOptions);
		toolbarBtnSelector = 'a[data-' + options.commandRole + '],button[data-' + options.commandRole + '],input[type=button][data-' + options.commandRole + ']';
		bindHotkeys(options.hotKeys);
		if (options.dragAndDropImages) {
			initFileDrops();
		}
		bindToolbar($(options.toolbarSelector), options);
		editor.attr('contenteditable', true).on('mouseup keyup mouseout', function () {
				saveSelection();
				updateToolbar();
			});
		editor.on('paste',function(e) {
		    e.preventDefault();
		    var text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('Paste something..');
		    document.execCommand('insertText', false, text);
		});
		$(window).bind('touchend', function (e) {
			var isInside = (editor.is(e.target) || editor.has(e.target).length > 0),
				currentRange = getCurrentRange(),
				clear = currentRange && (currentRange.startContainer === currentRange.endContainer && currentRange.startOffset === currentRange.endOffset);
			if (!clear || isInside) {
				saveSelection();
				updateToolbar();
			}
		});
		return this;
	};
	$.fn.wysiwyg.defaults = {
		hotKeys: {
			'ctrl+b meta+b': 'bold',
			'ctrl+i meta+i': 'italic',
			'ctrl+u meta+u': 'underline',
			'ctrl+z meta+z': 'undo',
			'ctrl+y meta+y meta+shift+z': 'redo',
			'ctrl+l meta+l': 'justifyleft',
			'ctrl+r meta+r': 'justifyright',
			'ctrl+e meta+e': 'justifycenter',
			'ctrl+j meta+j': 'justifyfull',
			'shift+tab': 'outdent',
			'tab': 'indent'
		},
		toolbarSelector: '[data-role=editor-toolbar]',
		commandRole: 'edit',
		activeToolbarClass: 'btn-info',
		selectionMarker: 'edit-focus-marker',
		selectionColor: 'darkgrey',
		dragAndDropImages: true,
		fileUploadError: function (reason, detail) { console.log("File upload error", reason, detail); }
	};
}(window.jQuery));
/*
 * jQuery Hotkeys Plugin
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Based upon the plugin by Tzury Bar Yochay:
 * http://github.com/tzuryby/hotkeys
 *
 * Original idea by:
 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
*/

(function(jQuery){
	
	jQuery.hotkeys = {
		version: "0.8",

		specialKeys: {
			8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
			20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
			37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 
			96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
			104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/", 
			112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 
			120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
		},
	
		shiftNums: {
			"`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&", 
			"8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<", 
			".": ">",  "/": "?",  "\\": "|"
		}
	};

	function keyHandler( handleObj ) {
		// Only care when a possible input has been specified
		if ( typeof handleObj.data !== "string" ) {
			return;
		}
		
		var origHandler = handleObj.handler,
			keys = handleObj.data.toLowerCase().split(" "),
			textAcceptingInputTypes = ["text", "password", "number", "email", "url", "range", "date", "month", "week", "time", "datetime", "datetime-local", "search", "color"];
	
		handleObj.handler = function( event ) {
			// Don't fire in text-accepting inputs that we didn't directly bind to
			if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) ||
				jQuery.inArray(event.target.type, textAcceptingInputTypes) > -1 ) ) {
				return;
			}
			
			// Keypress represents characters, not special keys
			var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[ event.which ],
				character = String.fromCharCode( event.which ).toLowerCase(),
				key, modif = "", possible = {};

			// check combinations (alt|ctrl|shift+anything)
			if ( event.altKey && special !== "alt" ) {
				modif += "alt+";
			}

			if ( event.ctrlKey && special !== "ctrl" ) {
				modif += "ctrl+";
			}
			
			// TODO: Need to make sure this works consistently across platforms
			if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {
				modif += "meta+";
			}

			if ( event.shiftKey && special !== "shift" ) {
				modif += "shift+";
			}

			if ( special ) {
				possible[ modif + special ] = true;

			} else {
				possible[ modif + character ] = true;
				possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true;

				// "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
				if ( modif === "shift+" ) {
					possible[ jQuery.hotkeys.shiftNums[ character ] ] = true;
				}
			}

			for ( var i = 0, l = keys.length; i < l; i++ ) {
				if ( possible[ keys[i] ] ) {
					return origHandler.apply( this, arguments );
				}
			}
		};
	}

	jQuery.each([ "keydown", "keyup", "keypress" ], function() {
		jQuery.event.special[ this ] = { add: keyHandler };
	});

})( jQuery );
/*
 angular-file-upload v1.1.1
 https://github.com/nervgh/angular-file-upload
*/
(function(angular, factory) {
    if (typeof define === 'function' && define.amd) {
        define('angular-file-upload', ['angular'], function(angular) {
            return factory(angular);
        });
    } else {
        return factory(angular);
    }
}(typeof angular === 'undefined' ? null : angular, function(angular) {

var module = angular.module('angularFileUpload', []);

'use strict';

/**
 * Classes
 *
 * FileUploader
 * FileUploader.FileLikeObject
 * FileUploader.FileItem
 * FileUploader.FileDirective
 * FileUploader.FileSelect
 * FileUploader.FileDrop
 * FileUploader.FileOver
 */

module


    .value('fileUploaderOptions', {
        url: '/',
        alias: 'file',
        headers: {},
        queue: [],
        progress: 0,
        autoUpload: false,
        removeAfterUpload: false,
        method: 'POST',
        filters: [],
        formData: [],
        queueLimit: Number.MAX_VALUE,
        withCredentials: false
    })


    .factory('FileUploader', ['fileUploaderOptions', '$rootScope', '$http', '$window', '$compile',
        function(fileUploaderOptions, $rootScope, $http, $window, $compile) {
            /**
             * Creates an instance of FileUploader
             * @param {Object} [options]
             * @constructor
             */
            function FileUploader(options) {
                var settings = angular.copy(fileUploaderOptions);
                angular.extend(this, settings, options, {
                    isUploading: false,
                    _nextIndex: 0,
                    _failFilterIndex: -1,
                    _directives: {select: [], drop: [], over: []}
                });

                // add default filters
                this.filters.unshift({name: 'queueLimit', fn: this._queueLimitFilter});
                this.filters.unshift({name: 'folder', fn: this._folderFilter});
            }
            /**********************
             * PUBLIC
             **********************/
            /**
             * Checks a support the html5 uploader
             * @returns {Boolean}
             * @readonly
             */
            FileUploader.prototype.isHTML5 = !!($window.File && $window.FormData);
            /**
             * Adds items to the queue
             * @param {File|HTMLInputElement|Object|FileList|Array<Object>} files
             * @param {Object} [options]
             * @param {Array<Function>|String} filters
             */
            FileUploader.prototype.addToQueue = function(files, options, filters) {
                var list = this.isArrayLikeObject(files) ? files: [files];
                var arrayOfFilters = this._getFilters(filters);
                var count = this.queue.length;
                var addedFileItems = [];

                angular.forEach(list, function(some /*{File|HTMLInputElement|Object}*/) {
                    var temp = new FileUploader.FileLikeObject(some);
                    if (this._isValidFile(temp, arrayOfFilters, options)) {
                        var fileItem = new FileUploader.FileItem(this, some, options);
                        addedFileItems.push(fileItem);
                        this.queue.push(fileItem);
                        this._onAfterAddingFile(fileItem);
                    } else {
                        if(this.queue && this.queueLimit == 1) {
                            var item = this.queue[0];
                            if (item.isUploading) item.cancel();
                            this.queue.splice(0, 1);
                            item._destroy();
                            this.progress = this._getTotalProgress();
                            var fileItem = new FileUploader.FileItem(this, some, options);
                            addedFileItems.push(fileItem);
                            this.queue.push(fileItem);
                            this._onAfterAddingFile(fileItem);
                        }
                        var filter = this.filters[this._failFilterIndex];
                        this._onWhenAddingFileFailed(temp, filter, options);
                    }
                }, this);

                if(this.queue.length !== count) {
                    this._onAfterAddingAll(addedFileItems);
                    this.progress = this._getTotalProgress();
                }

                this._render();
                if (this.autoUpload) this.uploadAll();
            };
            /**
             * Remove items from the queue. Remove last: index = -1
             * @param {FileItem|Number} value
             */
            FileUploader.prototype.removeFromQueue = function(value) {
                var index = this.getIndexOfItem(value);
                var item = this.queue[index];
                if (item.isUploading) item.cancel();
                this.queue.splice(index, 1);
                item._destroy();
                this.progress = this._getTotalProgress();
            };
            /**
             * Clears the queue
             */
            FileUploader.prototype.clearQueue = function() {
                while(this.queue.length) {
                    this.queue[0].remove();
                }
                this.progress = 0;
            };
            /**
             * Uploads a item from the queue
             * @param {FileItem|Number} value
             */
            FileUploader.prototype.uploadItem = function(value) {
                var index = this.getIndexOfItem(value);
                var item = this.queue[index];
                var transport = this.isHTML5 ? '_xhrTransport' : '_iframeTransport';

                item._prepareToUploading();
                if(this.isUploading) return;

                this.isUploading = true;
                this[transport](item);
            };
            /**
             * Cancels uploading of item from the queue
             * @param {FileItem|Number} value
             */
            FileUploader.prototype.cancelItem = function(value) {
                var index = this.getIndexOfItem(value);
                var item = this.queue[index];
                var prop = this.isHTML5 ? '_xhr' : '_form';
                if (item && item.isUploading) item[prop].abort();
            };
            /**
             * Uploads all not uploaded items of queue
             */
            FileUploader.prototype.uploadAll = function() {
                var items = this.getNotUploadedItems().filter(function(item) {
                    return !item.isUploading;
                });
                if (!items.length) return;

                angular.forEach(items, function(item) {
                    item._prepareToUploading();
                });
                items[0].upload();
            };
            /**
             * Cancels all uploads
             */
            FileUploader.prototype.cancelAll = function() {
                var items = this.getNotUploadedItems();
                angular.forEach(items, function(item) {
                    item.cancel();
                });
            };
            /**
             * Returns "true" if value an instance of File
             * @param {*} value
             * @returns {Boolean}
             * @private
             */
            FileUploader.prototype.isFile = function(value) {
                var fn = $window.File;
                return (fn && value instanceof fn);
            };
            /**
             * Returns "true" if value an instance of FileLikeObject
             * @param {*} value
             * @returns {Boolean}
             * @private
             */
            FileUploader.prototype.isFileLikeObject = function(value) {
                return value instanceof FileUploader.FileLikeObject;
            };
            /**
             * Returns "true" if value is array like object
             * @param {*} value
             * @returns {Boolean}
             */
            FileUploader.prototype.isArrayLikeObject = function(value) {
                return (angular.isObject(value) && 'length' in value);
            };
            /**
             * Returns a index of item from the queue
             * @param {Item|Number} value
             * @returns {Number}
             */
            FileUploader.prototype.getIndexOfItem = function(value) {
                return angular.isNumber(value) ? value : this.queue.indexOf(value);
            };
            /**
             * Returns not uploaded items
             * @returns {Array}
             */
            FileUploader.prototype.getNotUploadedItems = function() {
                return this.queue.filter(function(item) {
                    return !item.isUploaded;
                });
            };
            /**
             * Returns items ready for upload
             * @returns {Array}
             */
            FileUploader.prototype.getReadyItems = function() {
                return this.queue
                    .filter(function(item) {
                        return (item.isReady && !item.isUploading);
                    })
                    .sort(function(item1, item2) {
                        return item1.index - item2.index;
                    });
            };
            /**
             * Destroys instance of FileUploader
             */
            FileUploader.prototype.destroy = function() {
                angular.forEach(this._directives, function(key) {
                    angular.forEach(this._directives[key], function(object) {
                        object.destroy();
                    }, this);
                }, this);
            };
            /**
             * Callback
             * @param {Array} fileItems
             */
            FileUploader.prototype.onAfterAddingAll = function(fileItems) {};
            /**
             * Callback
             * @param {FileItem} fileItem
             */
            FileUploader.prototype.onAfterAddingFile = function(fileItem) {};
            /**
             * Callback
             * @param {File|Object} item
             * @param {Object} filter
             * @param {Object} options
             * @private
             */
            FileUploader.prototype.onWhenAddingFileFailed = function(item, filter, options) {};
            /**
             * Callback
             * @param {FileItem} fileItem
             */
            FileUploader.prototype.onBeforeUploadItem = function(fileItem) {};
            /**
             * Callback
             * @param {FileItem} fileItem
             * @param {Number} progress
             */
            FileUploader.prototype.onProgressItem = function(fileItem, progress) {};
            /**
             * Callback
             * @param {Number} progress
             */
            FileUploader.prototype.onProgressAll = function(progress) {};
            /**
             * Callback
             * @param {FileItem} item
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             */
            FileUploader.prototype.onSuccessItem = function(item, response, status, headers) {};
            /**
             * Callback
             * @param {FileItem} item
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             */
            FileUploader.prototype.onErrorItem = function(item, response, status, headers) {};
            /**
             * Callback
             * @param {FileItem} item
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             */
            FileUploader.prototype.onCancelItem = function(item, response, status, headers) {};
            /**
             * Callback
             * @param {FileItem} item
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             */
            FileUploader.prototype.onCompleteItem = function(item, response, status, headers) {};
            /**
             * Callback
             */
            FileUploader.prototype.onCompleteAll = function() {};
            /**********************
             * PRIVATE
             **********************/
            /**
             * Returns the total progress
             * @param {Number} [value]
             * @returns {Number}
             * @private
             */
            FileUploader.prototype._getTotalProgress = function(value) {
                if(this.removeAfterUpload) return value || 0;

                var notUploaded = this.getNotUploadedItems().length;
                var uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
                var ratio = 100 / this.queue.length;
                var current = (value || 0) * ratio / 100;

                return Math.round(uploaded * ratio + current);
            };
            /**
             * Returns array of filters
             * @param {Array<Function>|String} filters
             * @returns {Array<Function>}
             * @private
             */
            FileUploader.prototype._getFilters = function(filters) {
                if (angular.isUndefined(filters)) return this.filters;
                if (angular.isArray(filters)) return filters;
                var names = filters.match(/[^\s,]+/g);
                return this.filters.filter(function(filter) {
                    return names.indexOf(filter.name) !== -1;
                }, this);
            };
            /**
             * Updates html
             * @private
             */
            FileUploader.prototype._render = function() {
                if (!$rootScope.$$phase) $rootScope.$apply();
            };
            /**
             * Returns "true" if item is a file (not folder)
             * @param {File|FileLikeObject} item
             * @returns {Boolean}
             * @private
             */
            FileUploader.prototype._folderFilter = function(item) {
                return !!(item.size || item.type);
            };
            /**
             * Returns "true" if the limit has not been reached
             * @returns {Boolean}
             * @private
             */
            FileUploader.prototype._queueLimitFilter = function() {
                return this.queue.length < this.queueLimit;
            };
            /**
             * Returns "true" if file pass all filters
             * @param {File|Object} file
             * @param {Array<Function>} filters
             * @param {Object} options
             * @returns {Boolean}
             * @private
             */
            FileUploader.prototype._isValidFile = function(file, filters, options) {
                this._failFilterIndex = -1;
                return !filters.length ? true : filters.every(function(filter) {
                    this._failFilterIndex++;
                    return filter.fn.call(this, file, options);
                }, this);
            };
            /**
             * Checks whether upload successful
             * @param {Number} status
             * @returns {Boolean}
             * @private
             */
            FileUploader.prototype._isSuccessCode = function(status) {
                return (status >= 200 && status < 300) || status === 304;
            };
            /**
             * Transforms the server response
             * @param {*} response
             * @returns {*}
             * @private
             */
            FileUploader.prototype._transformResponse = function(response) {
                angular.forEach($http.defaults.transformResponse, function(transformFn) {
                    response = transformFn(response);
                });
                return response;
            };
            /**
             * Parsed response headers
             * @param headers
             * @returns {Object}
             * @see https://github.com/angular/angular.js/blob/master/src/ng/http.js
             * @private
             */
            FileUploader.prototype._parseHeaders = function(headers) {
                var parsed = {}, key, val, i;

                if (!headers) return parsed;

                function trim(string) {
                    return string.replace(/^\s+/, '').replace(/\s+$/, '');
                }
                function lowercase(string) {
                    return string.toLowerCase();
                }

                angular.forEach(headers.split('\n'), function(line) {
                    i = line.indexOf(':');
                    key = lowercase(trim(line.substr(0, i)));
                    val = trim(line.substr(i + 1));

                    if (key) {
                        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
                    }
                });

                return parsed;
            };
            /**
             * The XMLHttpRequest transport
             * @param {FileItem} item
             * @private
             */
            FileUploader.prototype._xhrTransport = function(item) {
                var xhr = item._xhr = new XMLHttpRequest();
                var form = new FormData();
                var that = this;

                that._onBeforeUploadItem(item);

                angular.forEach(item.formData, function(obj) {
                    angular.forEach(obj, function(value, key) {
                        form.append(key, value);
                    });
                });

                form.append(item.alias, item._file, item.file.name);

                xhr.onload = function() {
                    var headers = that._parseHeaders(xhr.getAllResponseHeaders());
                    var response = that._transformResponse(xhr.response);
                    var gist = that._isSuccessCode(xhr.status) ? 'Success' : 'Error';
                    var method = '_on' + gist + 'Item';
                    that[method](item, response, xhr.status, headers);
                    that._onCompleteItem(item, response, xhr.status, headers);
                };

                xhr.onerror = function() {
                    var headers = that._parseHeaders(xhr.getAllResponseHeaders());
                    var response = that._transformResponse(xhr.response);
                    that._onErrorItem(item, response, xhr.status, headers);
                    that._onCompleteItem(item, response, xhr.status, headers);
                };

                xhr.onabort = function() {
                    var headers = that._parseHeaders(xhr.getAllResponseHeaders());
                    var response = that._transformResponse(xhr.response);
                    that._onCancelItem(item, response, xhr.status, headers);
                    that._onCompleteItem(item, response, xhr.status, headers);
                };

                xhr.open(item.method, item.url, true);

                xhr.withCredentials = item.withCredentials;

                angular.forEach(item.headers, function(value, name) {
                    xhr.setRequestHeader(name, value);
                });

                xhr.send(form);
                this._render();
            };
            /**
             * The IFrame transport
             * @param {FileItem} item
             * @private
             */
            FileUploader.prototype._iframeTransport = function(item) {
                var form = angular.element('<form style="display: none;" />');
                var iframe = angular.element('<iframe name="iframeTransport' + Date.now() + '">');
                var input = item._input;
                var that = this;

                if (item._form) item._form.replaceWith(input); // remove old form
                item._form = form; // save link to new form

                that._onBeforeUploadItem(item);

                input.prop('name', item.alias);

                angular.forEach(item.formData, function(obj) {
                    angular.forEach(obj, function(value, key) {
                        form.append(angular.element('<input type="hidden" name="' + key + '" value="' + value + '" />'));
                    });
                });

                form.prop({
                    action: item.url,
                    method: 'POST',
                    target: iframe.prop('name'),
                    enctype: 'multipart/form-data',
                    encoding: 'multipart/form-data' // old IE
                });

                iframe.bind('load', function() {
                    try {
                        // Fix for legacy IE browsers that loads internal error page
                        // when failed WS response received. In consequence iframe
                        // content access denied error is thrown becouse trying to
                        // access cross domain page. When such thing occurs notifying
                        // with empty response object. See more info at:
                        // http://stackoverflow.com/questions/151362/access-is-denied-error-on-accessing-iframe-document-object
                        // Note that if non standard 4xx or 5xx error code returned
                        // from WS then response content can be accessed without error
                        // but 'XHR' status becomes 200. In order to avoid confusion
                        // returning response via same 'success' event handler.

                        // fixed angular.contents() for iframes
                        var html = iframe[0].contentDocument.body.innerHTML;
                    } catch (e) {}

                    var xhr = {response: html, status: 200, dummy: true};
                    var response = that._transformResponse(xhr.response);
                    var headers = {};

                    that._onSuccessItem(item, response, xhr.status, headers);
                    that._onCompleteItem(item, response, xhr.status, headers);
                });

                form.abort = function() {
                    var xhr = {status: 0, dummy: true};
                    var headers = {};
                    var response;

                    iframe.unbind('load').prop('src', 'javascript:false;');
                    form.replaceWith(input);

                    that._onCancelItem(item, response, xhr.status, headers);
                    that._onCompleteItem(item, response, xhr.status, headers);
                };

                input.after(form);
                form.append(input).append(iframe);

                form[0].submit();
                this._render();
            };
            /**
             * Inner callback
             * @param {File|Object} item
             * @param {Object} filter
             * @param {Object} options
             * @private
             */
            FileUploader.prototype._onWhenAddingFileFailed = function(item, filter, options) {
                this.onWhenAddingFileFailed(item, filter, options);
            };
            /**
             * Inner callback
             * @param {FileItem} item
             */
            FileUploader.prototype._onAfterAddingFile = function(item) {
                this.onAfterAddingFile(item);
            };
            /**
             * Inner callback
             * @param {Array<FileItem>} items
             */
            FileUploader.prototype._onAfterAddingAll = function(items) {
                this.onAfterAddingAll(items);
            };
            /**
             *  Inner callback
             * @param {FileItem} item
             * @private
             */
            FileUploader.prototype._onBeforeUploadItem = function(item) {
                item._onBeforeUpload();
                this.onBeforeUploadItem(item);
            };
            /**
             * Inner callback
             * @param {FileItem} item
             * @param {Number} progress
             * @private
             */
            FileUploader.prototype._onProgressItem = function(item, progress) {
                var total = this._getTotalProgress(progress);
                this.progress = total;
                item._onProgress(progress);
                this.onProgressItem(item, progress);
                this.onProgressAll(total);
                this._render();
            };
            /**
             * Inner callback
             * @param {FileItem} item
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             * @private
             */
            FileUploader.prototype._onSuccessItem = function(item, response, status, headers) {
                item._onSuccess(response, status, headers);
                this.onSuccessItem(item, response, status, headers);
            };
            /**
             * Inner callback
             * @param {FileItem} item
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             * @private
             */
            FileUploader.prototype._onErrorItem = function(item, response, status, headers) {
                item._onError(response, status, headers);
                this.onErrorItem(item, response, status, headers);
            };
            /**
             * Inner callback
             * @param {FileItem} item
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             * @private
             */
            FileUploader.prototype._onCancelItem = function(item, response, status, headers) {
                item._onCancel(response, status, headers);
                this.onCancelItem(item, response, status, headers);
            };
            /**
             * Inner callback
             * @param {FileItem} item
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             * @private
             */
            FileUploader.prototype._onCompleteItem = function(item, response, status, headers) {
                item._onComplete(response, status, headers);
                this.onCompleteItem(item, response, status, headers);

                var nextItem = this.getReadyItems()[0];
                this.isUploading = false;

                if(angular.isDefined(nextItem)) {
                    nextItem.upload();
                    return;
                }

                this.onCompleteAll();
                this.progress = this._getTotalProgress();
                this._render();
            };
            /**********************
             * STATIC
             **********************/
            /**
             * @borrows FileUploader.prototype.isFile
             */
            FileUploader.isFile = FileUploader.prototype.isFile;
            /**
             * @borrows FileUploader.prototype.isFileLikeObject
             */
            FileUploader.isFileLikeObject = FileUploader.prototype.isFileLikeObject;
            /**
             * @borrows FileUploader.prototype.isArrayLikeObject
             */
            FileUploader.isArrayLikeObject = FileUploader.prototype.isArrayLikeObject;
            /**
             * @borrows FileUploader.prototype.isHTML5
             */
            FileUploader.isHTML5 = FileUploader.prototype.isHTML5;
            /**
             * Inherits a target (Class_1) by a source (Class_2)
             * @param {Function} target
             * @param {Function} source
             */
            FileUploader.inherit = function(target, source) {
                target.prototype = Object.create(source.prototype);
                target.prototype.constructor = target;
                target.super_ = source;
            };
            FileUploader.FileLikeObject = FileLikeObject;
            FileUploader.FileItem = FileItem;
            FileUploader.FileDirective = FileDirective;
            FileUploader.FileSelect = FileSelect;
            FileUploader.FileDrop = FileDrop;
            FileUploader.FileOver = FileOver;

            // ---------------------------

            /**
             * Creates an instance of FileLikeObject
             * @param {File|HTMLInputElement|Object} fileOrInput
             * @constructor
             */
            function FileLikeObject(fileOrInput) {
                var isInput = angular.isElement(fileOrInput);
                var fakePathOrObject = isInput ? fileOrInput.value : fileOrInput;
                var postfix = angular.isString(fakePathOrObject) ? 'FakePath' : 'Object';
                var method = '_createFrom' + postfix;
                this[method](fakePathOrObject);
            }

            /**
             * Creates file like object from fake path string
             * @param {String} path
             * @private
             */
            FileLikeObject.prototype._createFromFakePath = function(path) {
                this.lastModifiedDate = null;
                this.size = null;
                this.type = 'like/' + path.slice(path.lastIndexOf('.') + 1).toLowerCase();
                this.name = path.slice(path.lastIndexOf('/') + path.lastIndexOf('\\') + 2);
            };
            /**
             * Creates file like object from object
             * @param {File|FileLikeObject} object
             * @private
             */
            FileLikeObject.prototype._createFromObject = function(object) {
                this.lastModifiedDate = angular.copy(object.lastModifiedDate);
                this.size = object.size;
                this.type = object.type;
                this.name = object.name;
            };

            // ---------------------------

            /**
             * Creates an instance of FileItem
             * @param {FileUploader} uploader
             * @param {File|HTMLInputElement|Object} some
             * @param {Object} options
             * @constructor
             */
            function FileItem(uploader, some, options) {
                var isInput = angular.isElement(some);
                var input = isInput ? angular.element(some) : null;
                var file = !isInput ? some : null;

                angular.extend(this, {
                    url: uploader.url,
                    alias: uploader.alias,
                    headers: angular.copy(uploader.headers),
                    formData: angular.copy(uploader.formData),
                    removeAfterUpload: uploader.removeAfterUpload,
                    withCredentials: uploader.withCredentials,
                    method: uploader.method
                }, options, {
                    uploader: uploader,
                    file: new FileUploader.FileLikeObject(some),
                    isReady: false,
                    isUploading: false,
                    isUploaded: false,
                    isSuccess: false,
                    isCancel: false,
                    isError: false,
                    progress: 0,
                    index: null,
                    _file: file,
                    _input: input
                });

                if (input) this._replaceNode(input);
            }
            /**********************
             * PUBLIC
             **********************/
            /**
             * Uploads a FileItem
             */
            FileItem.prototype.upload = function() {
                this.uploader.uploadItem(this);
            };
            /**
             * Cancels uploading of FileItem
             */
            FileItem.prototype.cancel = function() {
                this.uploader.cancelItem(this);
            };
            /**
             * Removes a FileItem
             */
            FileItem.prototype.remove = function() {
                this.uploader.removeFromQueue(this);
            };
            /**
             * Callback
             * @private
             */
            FileItem.prototype.onBeforeUpload = function() {};
            /**
             * Callback
             * @param {Number} progress
             * @private
             */
            FileItem.prototype.onProgress = function(progress) {};
            /**
             * Callback
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             */
            FileItem.prototype.onSuccess = function(response, status, headers) {};
            /**
             * Callback
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             */
            FileItem.prototype.onError = function(response, status, headers) {};
            /**
             * Callback
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             */
            FileItem.prototype.onCancel = function(response, status, headers) {};
            /**
             * Callback
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             */
            FileItem.prototype.onComplete = function(response, status, headers) {};
            /**********************
             * PRIVATE
             **********************/
            /**
             * Inner callback
             */
            FileItem.prototype._onBeforeUpload = function() {
                this.isReady = true;
                this.isUploading = true;
                this.isUploaded = false;
                this.isSuccess = false;
                this.isCancel = false;
                this.isError = false;
                this.progress = 0;
                this.onBeforeUpload();
            };
            /**
             * Inner callback
             * @param {Number} progress
             * @private
             */
            FileItem.prototype._onProgress = function(progress) {
                this.progress = progress;
                this.onProgress(progress);
            };
            /**
             * Inner callback
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             * @private
             */
            FileItem.prototype._onSuccess = function(response, status, headers) {
                this.isReady = false;
                this.isUploading = false;
                this.isUploaded = true;
                this.isSuccess = true;
                this.isCancel = false;
                this.isError = false;
                this.progress = 100;
                this.index = null;
                this.onSuccess(response, status, headers);
            };
            /**
             * Inner callback
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             * @private
             */
            FileItem.prototype._onError = function(response, status, headers) {
                this.isReady = false;
                this.isUploading = false;
                this.isUploaded = true;
                this.isSuccess = false;
                this.isCancel = false;
                this.isError = true;
                this.progress = 0;
                this.index = null;
                this.onError(response, status, headers);
            };
            /**
             * Inner callback
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             * @private
             */
            FileItem.prototype._onCancel = function(response, status, headers) {
                this.isReady = false;
                this.isUploading = false;
                this.isUploaded = false;
                this.isSuccess = false;
                this.isCancel = true;
                this.isError = false;
                this.progress = 0;
                this.index = null;
                this.onCancel(response, status, headers);
            };
            /**
             * Inner callback
             * @param {*} response
             * @param {Number} status
             * @param {Object} headers
             * @private
             */
            FileItem.prototype._onComplete = function(response, status, headers) {
                this.onComplete(response, status, headers);
                if (this.removeAfterUpload) this.remove();
            };
            /**
             * Destroys a FileItem
             */
            FileItem.prototype._destroy = function() {
                if (this._input) this._input.remove();
                if (this._form) this._form.remove();
                delete this._form;
                delete this._input;
            };
            /**
             * Prepares to uploading
             * @private
             */
            FileItem.prototype._prepareToUploading = function() {
                this.index = this.index || ++this.uploader._nextIndex;
                this.isReady = true;
            };
            /**
             * Replaces input element on his clone
             * @param {JQLite|jQuery} input
             * @private
             */
            FileItem.prototype._replaceNode = function(input) {
                var clone = $compile(input.clone())(input.scope());
                clone.prop('value', null); // FF fix
                input.css('display', 'none');
                input.after(clone); // remove jquery dependency
            };

            // ---------------------------

            /**
             * Creates instance of {FileDirective} object
             * @param {Object} options
             * @param {Object} options.uploader
             * @param {HTMLElement} options.element
             * @param {Object} options.events
             * @param {String} options.prop
             * @constructor
             */
            function FileDirective(options) {
                angular.extend(this, options);
                this.uploader._directives[this.prop].push(this);
                this._saveLinks();
                this.bind();
            }
            /**
             * Map of events
             * @type {Object}
             */
            FileDirective.prototype.events = {};
            /**
             * Binds events handles
             */
            FileDirective.prototype.bind = function() {
                for(var key in this.events) {
                    var prop = this.events[key];
                    this.element.bind(key, this[prop]);
                }
            };
            /**
             * Unbinds events handles
             */
            FileDirective.prototype.unbind = function() {
                for(var key in this.events) {
                    this.element.unbind(key, this.events[key]);
                }
            };
            /**
             * Destroys directive
             */
            FileDirective.prototype.destroy = function() {
                var index = this.uploader._directives[this.prop].indexOf(this);
                this.uploader._directives[this.prop].splice(index, 1);
                this.unbind();
                // this.element = null;
            };
            /**
             * Saves links to functions
             * @private
             */
            FileDirective.prototype._saveLinks = function() {
                for(var key in this.events) {
                    var prop = this.events[key];
                    this[prop] = this[prop].bind(this);
                }
            };

            // ---------------------------

            FileUploader.inherit(FileSelect, FileDirective);

            /**
             * Creates instance of {FileSelect} object
             * @param {Object} options
             * @constructor
             */
            function FileSelect(options) {
                FileSelect.super_.apply(this, arguments);

                if(!this.uploader.isHTML5) {
                    this.element.removeAttr('multiple');
                }
                this.element.prop('value', null); // FF fix
            }
            /**
             * Map of events
             * @type {Object}
             */
            FileSelect.prototype.events = {
                $destroy: 'destroy',
                change: 'onChange'
            };
            /**
             * Name of property inside uploader._directive object
             * @type {String}
             */
            FileSelect.prototype.prop = 'select';
            /**
             * Returns options
             * @return {Object|undefined}
             */
            FileSelect.prototype.getOptions = function() {};
            /**
             * Returns filters
             * @return {Array<Function>|String|undefined}
             */
            FileSelect.prototype.getFilters = function() {};
            /**
             * If returns "true" then HTMLInputElement will be cleared
             * @returns {Boolean}
             */
            FileSelect.prototype.isEmptyAfterSelection = function() {
                return !!this.element.attr('multiple');
            };
            /**
             * Event handler
             */
            FileSelect.prototype.onChange = function() {
                var files = this.uploader.isHTML5 ? this.element[0].files : this.element[0];
                var options = this.getOptions();
                var filters = this.getFilters();

                if (!this.uploader.isHTML5) this.destroy();
                this.uploader.addToQueue(files, options, filters);
                if (this.isEmptyAfterSelection()) this.element.prop('value', null);
            };

            // ---------------------------

            FileUploader.inherit(FileDrop, FileDirective);

            /**
             * Creates instance of {FileDrop} object
             * @param {Object} options
             * @constructor
             */
            function FileDrop(options) {
                FileDrop.super_.apply(this, arguments);
            }
            /**
             * Map of events
             * @type {Object}
             */
            FileDrop.prototype.events = {
                $destroy: 'destroy',
                drop: 'onDrop',
                dragover: 'onDragOver',
                dragleave: 'onDragLeave'
            };
            /**
             * Name of property inside uploader._directive object
             * @type {String}
             */
            FileDrop.prototype.prop = 'drop';
            /**
             * Returns options
             * @return {Object|undefined}
             */
            FileDrop.prototype.getOptions = function() {};
            /**
             * Returns filters
             * @return {Array<Function>|String|undefined}
             */
            FileDrop.prototype.getFilters = function() {};
            /**
             * Event handler
             */
            FileDrop.prototype.onDrop = function(event) {
                var transfer = this._getTransfer(event);
                if (!transfer) return;
                var options = this.getOptions();
                var filters = this.getFilters();
                this._preventAndStop(event);
                angular.forEach(this.uploader._directives.over, this._removeOverClass, this);
                this.uploader.addToQueue(transfer.files, options, filters);
            };
            /**
             * Event handler
             */
            FileDrop.prototype.onDragOver = function(event) {
                var transfer = this._getTransfer(event);
                if(!this._haveFiles(transfer.types)) return;
                transfer.dropEffect = 'copy';
                this._preventAndStop(event);
                angular.forEach(this.uploader._directives.over, this._addOverClass, this);
            };
            /**
             * Event handler
             */
            FileDrop.prototype.onDragLeave = function(event) {
                if (event.target !== this.element[0]) return;
                this._preventAndStop(event);
                angular.forEach(this.uploader._directives.over, this._removeOverClass, this);
            };
            /**
             * Helper
             */
            FileDrop.prototype._getTransfer = function(event) {
                return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer; // jQuery fix;
            };
            /**
             * Helper
             */
            FileDrop.prototype._preventAndStop = function(event) {
                event.preventDefault();
                event.stopPropagation();
            };
            /**
             * Returns "true" if types contains files
             * @param {Object} types
             */
            FileDrop.prototype._haveFiles = function(types) {
                if (!types) return false;
                if (types.indexOf) {
                    return types.indexOf('Files') !== -1;
                } else if(types.contains) {
                    return types.contains('Files');
                } else {
                    return false;
                }
            };
            /**
             * Callback
             */
            FileDrop.prototype._addOverClass = function(item) {
                item.addOverClass();
            };
            /**
             * Callback
             */
            FileDrop.prototype._removeOverClass = function(item) {
                item.removeOverClass();
            };

            // ---------------------------

            FileUploader.inherit(FileOver, FileDirective);

            /**
             * Creates instance of {FileDrop} object
             * @param {Object} options
             * @constructor
             */
            function FileOver(options) {
                FileOver.super_.apply(this, arguments);
            }
            /**
             * Map of events
             * @type {Object}
             */
            FileOver.prototype.events = {
                $destroy: 'destroy'
            };
            /**
             * Name of property inside uploader._directive object
             * @type {String}
             */
            FileOver.prototype.prop = 'over';
            /**
             * Over class
             * @type {string}
             */
            FileOver.prototype.overClass = 'nv-file-over';
            /**
             * Adds over class
             */
            FileOver.prototype.addOverClass = function() {
                this.element.addClass(this.getOverClass());
            };
            /**
             * Removes over class
             */
            FileOver.prototype.removeOverClass = function() {
                this.element.removeClass(this.getOverClass());
            };
            /**
             * Returns over class
             * @returns {String}
             */
            FileOver.prototype.getOverClass = function() {
                return this.overClass;
            };

            return FileUploader;
        }])


    .directive('nvFileSelect', ['$parse', 'FileUploader', function($parse, FileUploader) {
        return {
            link: function(scope, element, attributes) {
                var uploader = scope.$eval(attributes.uploader);

                if (!(uploader instanceof FileUploader)) {
                    throw new TypeError('"Uploader" must be an instance of FileUploader');
                }

                var object = new FileUploader.FileSelect({
                    uploader: uploader,
                    element: element
                });

                object.getOptions = $parse(attributes.options).bind(object, scope);
                object.getFilters = function() {return attributes.filters;};
            }
        };
    }])


    .directive('nvFileDrop', ['$parse', 'FileUploader', function($parse, FileUploader) {
        return {
            link: function(scope, element, attributes) {
                var uploader = scope.$eval(attributes.uploader);

                if (!(uploader instanceof FileUploader)) {
                    throw new TypeError('"Uploader" must be an instance of FileUploader');
                }

                if (!uploader.isHTML5) return;

                var object = new FileUploader.FileDrop({
                    uploader: uploader,
                    element: element
                });

                object.getOptions = $parse(attributes.options).bind(object, scope);
                object.getFilters = function() {return attributes.filters;};
            }
        };
    }])


    .directive('nvFileOver', ['FileUploader', function(FileUploader) {
        return {
            link: function(scope, element, attributes) {
                var uploader = scope.$eval(attributes.uploader);

                if (!(uploader instanceof FileUploader)) {
                    throw new TypeError('"Uploader" must be an instance of FileUploader');
                }

                var object = new FileUploader.FileOver({
                    uploader: uploader,
                    element: element
                });

                object.getOverClass = function() {
                    return attributes.overClass || this.overClass;
                };
            }
        };
    }])
    return module;
}));
'use strict';


angular


    .module('app.upload', [])


    // Angular File Upload module does not include this directive
    // Only for example


    /**
    * The ng-thumb directive
    * @author: nerv
    * @version: 0.1.2, 2014-01-09
    */
    .directive('ngThumb', ['$window', function($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function(scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
					if(width > 300) {
						width = 300;
						height = this.height / this.width * 300;
					}
                    canvas.attr({ width: width, height: height });
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
            }
        };
    }]).directive('ngThumbnail', ['$window', function($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };
        return {
            restrict: 'A',
            link: function(scope, element, attributes) {
                if (!helper.support) return;
                var params = scope.$eval(attributes.ngThumbnail);

                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                var img = new Image();
                img.id = 'uploadThumbnail';

                function onLoadFile(event) {
                    img.onload = onLoadImage;
                    img.src = event.target.result;

                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
					if(width > 300) {
						width = 300;
						height = this.height / this.width * 300;
					}
                    $(img).attr({ width: width, height: height });
                    element.append(img);
                }
            }
        };
    }]);
/**
 * Zepto swipeSlide Plugin
 * 西门 http://ons.me/500.html
 * 20141007 v2.0
 */

;(function($){
    'use strict';
    $.fn.swipeSlide = function(options,callback){
        var _index = 0,
            _startX = 0,
            _startY = 0,
            _moveX = 0,
            _moveY = 0,
            _moveDistance = 0,
            _curX = 0,
            _curY = 0,
            autoScroll,
            _touchDistance = 50,
            _loadPicNum = 0,
            firstMovePrev = true,
            $this = $(this),
            opts = $.extend({}, {
                ul : $this.children('ul'),              // 父dom
                li : $this.children().children('li'),   // 子dom
                continuousScroll : false,               // 连续滚动
                autoSwipe : true,                       // 自动切换
                speed : 4000,                           // 切换速度
                axisX : true,                           // X轴
                transitionType : 'ease',                // 过渡类型
                lazyLoad : false,                       // 懒加载
                clone: true,                            // 是否要克隆li
                width: 0,                               // 轮播的宽度
                length: 0                               // li的个数
            }, options || {}),
            _liWidth = opts.width || opts.li.width(),
            _liHeight = opts.li.height(),
            _liLength = opts.length || opts.li.length;
        callback = callback || function(){};

        // 初始化
        (function(){
            // 连续滚动，需要复制dom
            if(opts.continuousScroll){
                if(opts.clone) opts.ul.prepend(opts.li.last().clone()).append(opts.li.first().clone());
                if(opts.axisX){
                    fnTranslate(opts.ul.children().first(),_liWidth*-1);
                    fnTranslate(opts.ul.children().last(),_liWidth*_liLength);
                }else{
                    fnTranslate(opts.ul.children().first(),_liHeight*-1);
                    fnTranslate(opts.ul.children().last(),_liHeight*_liLength);
                }
            }

            // 懒加载图片
            if(opts.lazyLoad){
                var i = 0;
                if(opts.continuousScroll){
                    _loadPicNum = 3;
                }else{
                    _loadPicNum = 2;
                }
                for(i; i < _loadPicNum; i++){
                    fnLazyLoad(i);
                }
            }

            // 给初始图片定位
            if(opts.axisX){
                opts.li.each(function(i){
                    fnTranslate($(this),_liWidth*i);
                });
            }else{
                opts.li.each(function(i){
                    fnTranslate($(this),_liHeight*i);
                });
            }

            // 自动滚动
            fnAutoSwipe();

            // 回调
            callback(_index, autoScroll);

            // 绑定触摸
            $this.on('touchstart',function(e){
                e.stopPropagation();
                fnTouches(e);
                fnTouchstart(e);
            });
            $this.on('touchmove',function(e){
                e.stopPropagation();
                fnTouches(e);
                fnTouchmove(e);
            });
            $this.on('touchend',function(e){
                e.stopPropagation();
                fnTouchend();
            });
        })();

        // css过渡
        function fnTransition(dom,num){
            dom.css({
                '-webkit-transition':'all '+num+'s '+opts.transitionType,
                'transition':'all '+num+'s '+opts.transitionType
            });
        }

        // css滚动
        function fnTranslate(dom,result){
            if(opts.axisX){
                dom.css({
                    '-webkit-transform':'translate3d(' + result + 'px,0,0)',
                    'transform':'translate3d(' + result + 'px,0,0)'
                });
            }else{
                dom.css({
                    '-webkit-transform':'translate3d(0,' + result + 'px,0)',
                    'transform':'translate3d(0,' + result + 'px,0)'
                });
            }
        }

        // 懒加载图片
        function fnLazyLoad(index){
            if(opts.lazyLoad){
                var $img = opts.ul.find('[data-src]');
                if($img.length > 0){
                    var $thisImg = $img.eq(index);
                    if($thisImg.data('src')){
                        if($thisImg.is('img')){
                            $thisImg.attr('src',$thisImg.data('src')).data('src','');
                        }else{
                            $thisImg.css({'background-image':'url('+$thisImg.data('src')+')'}).data('src','');
                        }
                    }
                }
            }
        }

        // touches
        function fnTouches(e){
            if(!e.touches){
                e.touches = e.originalEvent.touches;
            }
        }

        // touchstart
        function fnTouchstart(e){
            _startX = e.touches[0].pageX;
            _startY = e.touches[0].pageY;
        }

        // touchmove
        function fnTouchmove(e){
            e.preventDefault();
            if(opts.autoSwipe && autoScroll){
                clearInterval(autoScroll);
            }
            _curX = e.touches[0].pageX;
            _curY = e.touches[0].pageY;
            _moveX = _curX - _startX;
            _moveY = _curY - _startY;
            fnTransition(opts.ul,0);
            if(opts.axisX){
                if(!opts.continuousScroll){
                    if(_index == 0 && _moveX > 0){
                        _moveX = 0;
                        return fnAutoSwipe();
                    }else if((_index + 1) >= _liLength && _moveX < 0){
                        _moveX = 0;
                        return fnAutoSwipe();
                    }
                }
                fnTranslate(opts.ul,-(_liWidth * (parseInt(_index)) - _moveX));
            }else{
                if(!opts.continuousScroll){
                    if(_index == 0 && _moveY > 0){
                        _moveY = 0;
                        return fnAutoSwipe();
                    }else if((_index + 1) >= _liLength && _moveY < 0){
                        _moveY = 0;
                        return fnAutoSwipe();
                    }
                }
                fnTranslate(opts.ul,-(_liHeight * (parseInt(_index)) - _moveY));
            }
        }

        // touchend
        function fnTouchend(){
            if(opts.axisX){
                _moveDistance = _moveX;
            }else{
                _moveDistance = _moveY;
            }
            // 距离小
            if(Math.abs(_moveDistance) <= _touchDistance){
                fnScroll(.3);
            // 距离大
            }else{
                // 手指触摸上一屏滚动
                if(_moveDistance > _touchDistance){
                    fnMovePrev();
                // 手指触摸下一屏滚动
                }else if(_moveDistance < -_touchDistance){
                    fnMoveNext();
                }
            }
            fnAutoSwipe();
            _moveX = 0;
            _moveY = 0;
        }

        // 滚动方法
        function fnScroll(num){
            fnTransition(opts.ul,num);
            if(opts.axisX){
                fnTranslate(opts.ul,-_index*_liWidth);
            }else{
                fnTranslate(opts.ul,-_index*_liHeight);
            }
        }

        // 滚动判断
        function fnMove(){
            if(opts.continuousScroll){
                if(_index >= _liLength){
                    fnScroll(.3);
                    _index = 0;
                    setTimeout(function(){
                        fnScroll(0);
                    },300);
                }else if(_index < 0){
                    fnScroll(.3);
                    _index = _liLength-1;
                    setTimeout(function(){
                        fnScroll(0);
                    },300);
                }else{
                    fnScroll(.3);
                }
            }else{
                if(_index >= _liLength){
                    _index = 0;
                }else if(_index < 0){
                    _index = _liLength-1;
                }
                fnScroll(.3);
            }
            callback(_index);
        }

        // 下一屏滚动
        function fnMoveNext(){
            _index++;
            fnMove();
            if(opts.lazyLoad){
                if(opts.continuousScroll){
                    fnLazyLoad(_index+2);
                }else{
                    fnLazyLoad(_index+1);
                }
            }
        }

        // 上一屏滚动
        function fnMovePrev(){
            _index--;
            fnMove();
            // 第一次往右滚动懒加载图片
            if(firstMovePrev && opts.lazyLoad){
                var i = _liLength-1;
                for(i; i <= (_liLength+1); i++){
                    fnLazyLoad(i);
                }
                firstMovePrev = false;
                return;
            }
            if(!firstMovePrev && opts.lazyLoad){
                fnLazyLoad(_index);
            }
        }
        
        // 自动滚动
        function fnAutoSwipe(){
            if(opts.autoSwipe){
                autoScroll = setInterval(function(){
                    fnMoveNext();
                    //console.log(1);
                },opts.speed);
            }
        }
    }
})(window.Zepto || window.jQuery);