(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(4);
	var pagination_service_1 = __webpack_require__(2);
	__webpack_require__(5);
	var PaginationControlsCmp = (function () {
	    function PaginationControlsCmp(_service) {
	        var _this = this;
	        this._service = _service;
	        this.change = new core_1.EventEmitter();
	        this.pages = [];
	        this._page = 1;
	        this._id = this._id || this._service.defaultId;
	        this._changeSub = this._service.change
	            .subscribe(function (id) {
	            if (_this._id !== id)
	                return;
	            var instance = _this._service.getInstance(_this._id);
	            _this.pages = _this._createPageArray(instance.currentPage, instance.itemsPerPage, instance.totalItems);
	            _this._setPage(instance.currentPage);
	        });
	    }
	    PaginationControlsCmp.prototype.ngOnDestroy = function () {
	        this._changeSub.unsubscribe();
	    };
	    /**
	     * Set the current page number.
	     */
	    PaginationControlsCmp.prototype.setPage = function (event, page) {
	        event.preventDefault();
	        this._service.setCurrentPage(this._id, page);
	    };
	    /**
	     * Get the current page number.
	     */
	    PaginationControlsCmp.prototype.getPage = function () {
	        return this._service.getCurrentPage(this._id);
	    };
	    PaginationControlsCmp.prototype._setPage = function (page) {
	        if (this._page !== page) {
	            this._page = page;
	            this.change.emit({ page: page });
	        }
	    };
	    /**
	     * Returns an array of IPage objects to use in the pagination controls.
	     */
	    PaginationControlsCmp.prototype._createPageArray = function (currentPage, itemsPerPage, totalItems, paginationRange) {
	        if (paginationRange === void 0) { paginationRange = 5; }
	        var totalPages = Math.ceil(totalItems / itemsPerPage);
	        var halfWay = Math.ceil(paginationRange / 2);
	        var isStart = currentPage <= halfWay;
	        var isEnd = totalPages - halfWay < currentPage;
	        var isMiddle = !isStart && !isEnd;
	        var ellipsesNeeded = paginationRange < totalPages;
	        var pages = [];
	        var page = 1;
	        while (page <= totalPages && page <= paginationRange) {
	            var pageNumber = this.calculatePageNumber(page, currentPage, paginationRange, totalPages);
	            var openingEllipsesNeeded = (page === 2 && (isMiddle || isEnd));
	            var closingEllipsesNeeded = (page === paginationRange - 1 && (isMiddle || isStart));
	            var label = pageNumber.toString();
	            if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
	                label = '...';
	            }
	            pages.push({
	                label: label,
	                value: pageNumber
	            });
	            page++;
	        }
	        return pages;
	    };
	    /**
	     * Given the position in the sequence of pagination links [i],
	     * figure out what page number corresponds to that position.
	     */
	    PaginationControlsCmp.prototype.calculatePageNumber = function (page, currentPage, paginationRange, totalPages) {
	        if (page === paginationRange) {
	            return totalPages;
	        }
	        if (page === 1) {
	            return page;
	        }
	        var halfWay = Math.ceil(paginationRange / 2);
	        if (paginationRange < totalPages) {
	            if (totalPages - halfWay < currentPage) {
	                return totalPages - paginationRange + page;
	            }
	            if (halfWay < currentPage) {
	                return currentPage - halfWay + page;
	            }
	        }
	        return page;
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], PaginationControlsCmp.prototype, "_id", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
	    ], PaginationControlsCmp.prototype, "change", void 0);
	    PaginationControlsCmp = __decorate([
	        core_1.Component({
	            selector: 'pagination-controls',
	            template: __webpack_require__(9),
	        }), 
	        __metadata('design:paramtypes', [pagination_service_1.PaginationService])
	    ], PaginationControlsCmp);
	    return PaginationControlsCmp;
	    var _a;
	})();
	exports.PaginationControlsCmp = PaginationControlsCmp;


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	module.exports = require("./pagination-service");

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	module.exports = require("angular2/core");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./pagination-controls-cmp.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./pagination-controls-cmp.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, ".pagination {\n  display: inline-block;\n  list-style-type: none;\n  margin: 20px 0;\n  border-radius: 4px;\n}\n.pagination li {\n  display: inline;\n  padding: 0 5px;\n}\n.pagination li.active > a {\n  text-decoration: none;\n  color: black;\n}\n.pagination .disabled > a {\n  color: #777;\n  cursor: not-allowed;\n}\n", ""]);

	// exports


/***/ },
/* 7 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "module.exports = \"<ul class=\\\"pagination\\\" role=\\\"navigation\\\" aria-label=\\\"Pagination\\\">\\n  <li class=\\\"pagination-previous\\\" [class.disabled]=\\\"getPage() === 1\\\">\\n    <a href=\\\"\\\" (click)=\\\"setPage($event, getPage() - 1)\\\" aria-label=\\\"Prev page\\\">&lsaquo;</a>\\n  </li>\\n\\n  <li [class.active]=\\\"getPage() === page.value\\\" *ngFor=\\\"#page of pages\\\">\\n    <a href=\\\"\\\" (click)=\\\"setPage($event, page.value)\\\">{{ page.label }}</a>\\n  </li>\\n\\n  <li class=\\\"pagination-next\\\" [class.disabled]=\\\"getPage() === pages.length\\\">\\n    <a href=\\\"\\\" (click)=\\\"setPage($event, getPage() + 1)\\\" aria-label=\\\"Next page\\\">&rsaquo;</a>\\n  </li>\\n</ul>\";";

/***/ }
/******/ ])));