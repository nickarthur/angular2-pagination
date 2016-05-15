"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var pagination_service_1 = require("./pagination-service");
var COMPONENT_TEMPLATE = "<ul class=\"pagination\" role=\"navigation\" aria-label=\"Pagination\">  <li class=\"pagination-previous\" [class.disabled]=\"getPage() === 1\">    <a href=\"\" (click)=\"setPage($event, getPage() - 1)\" aria-label=\"Prev page\">&lsaquo;</a>  </li>  <li [class.active]=\"getPage() === page.value\" *ngFor=\"let page of pages\">    <a href=\"\" (click)=\"setPage($event, page.value)\">{{ page.label }}</a>  </li>  <li class=\"pagination-next\" [class.disabled]=\"getPage() === pages.length\">    <a href=\"\" (click)=\"setPage($event, getPage() + 1)\" aria-label=\"Next page\">&rsaquo;</a>  </li></ul>";
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
            template: COMPONENT_TEMPLATE,
        }), 
        __metadata('design:paramtypes', [pagination_service_1.PaginationService])
    ], PaginationControlsCmp);
    return PaginationControlsCmp;
    var _a;
}());
exports.PaginationControlsCmp = PaginationControlsCmp;
