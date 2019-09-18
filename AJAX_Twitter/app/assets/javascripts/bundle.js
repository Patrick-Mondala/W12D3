/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/twitter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const APIUtil = {
    followUser: (id) => {
        return $.ajax({
            type: "POST",
            url: `/users/${id}/follow`,
            dataType: "json"
        }); 
    },

    unfollowUser: (id) => {
        return $.ajax({
            type: "DELETE",
            url: `/users/${id}/follow`,
            dataType: "json"
        });
    },

    searchUser: (queryVal) => {
        return $.ajax({
            type: "GET",
            url: "/users/search",
            dataType: "json",
            data: {query: queryVal}
        });
    }
}

/* harmony default export */ __webpack_exports__["default"] = (APIUtil);

/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FollowToggle; });
/* harmony import */ var _api_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");


class FollowToggle {
  constructor($button) {
    this.$button = $button;
    this.userId = $button.data("user-id");
    this.followState = $button.data("initial-follow-state") === "followed";
    this.render();
    this.handleClick();
  }

  render() {
    this.followState ? this.$button.text("Unfollow!") : this.$button.text("Follow!");
    this.$button.prop("disabled", false);
  }

  handleClick() {
    this.$button.on("click", event => {
      event.preventDefault();
      this.$button.prop("disabled", true);
      if (!this.followState) {
        _api_util__WEBPACK_IMPORTED_MODULE_0__["default"].followUser(this.userId).then(
          () => {
          this.followState = true;
          this.render();
        });
      } else {
        _api_util__WEBPACK_IMPORTED_MODULE_0__["default"].unfollowUser(this.userId).then(
          () => {
          this.followState = false;
          this.render();
        });
      }
    });
  }

}

/***/ }),

/***/ "./frontend/twitter.js":
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _follow_toggle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js");
/* harmony import */ var _users_search__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./users_search */ "./frontend/users_search.js");



$(() => {

  $("button.follow-toggle").each(function() {
    new _follow_toggle__WEBPACK_IMPORTED_MODULE_0__["default"]($(this));
  });    

  $("nav.users-search").each(function() {
    new _users_search__WEBPACK_IMPORTED_MODULE_1__["default"]($(this));
  });

})

/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UsersSearch; });
/* harmony import */ var _api_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");


class UsersSearch {
  constructor($search) {
    this.$search = $search;
    this.input = $search.find("input");
    this.ul = $search.find("ul");
    this.handleInput();
  }

  

  handleInput() {
    this.input.on("input", event => {
      _api_util__WEBPACK_IMPORTED_MODULE_0__["default"].searchUser(this.input.val()).then(
        (data) => {
          this.renderResult(data);
        }
      );
    });
  }

  renderResult($users) {
    this.ul.empty();
    $users.forEach(user => {
      let $button = $("<button>").attr("class", "follow-toggle");
      let userEl = $("<li>").html(
        $("<a>").attr("href", `/users/${user.id}`).text(`${user.username}`)
      ).html(
        $button
      );
      new FollowToggle($button);
      this.ul.append(userEl);
    });
  }

}

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map