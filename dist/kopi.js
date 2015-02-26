(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Kopi = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports = {

  parse: function parse(name) {
    name = name.trim().toLowerCase();

    // condensend milk = sweetened
    // evaporated milk = unsweetened

    // defaults
    var coffee = 0,
        condensed_milk = 0,
        evaporated_milk = 0,
        sugar = 0,
        water = 0,
        ice = false;

    if (/^kopi/.test(name)) {

      // 1. TYPES

      sugar = 1;

      // Kopi C
      if (/^kopi\s(c|si|see)\b/.test(name)) {
        evaporated_milk = 0.2;
        water = 0.4;
        coffee = 0.4;
      }
      // Kopi O
      else if (/^kopi\soh?\b/.test(name)) {
        water = 0.5;
        coffee = 0.5;
      }
      // Kopi
      else {
        condensed_milk = 0.2;
        water = 0.4;
        coffee = 0.4;
      }

      // 2. EXPRESSIONS

      // kosong = no sugar
      if (/\bkosong\b/.test(name)) {
        sugar = 0;
      }
      // gah dai = sweeter
      else if (/\b(gah|ka)\sdai\b/.test(name)) {
        if (condensed_milk > 0) {
          condensed_milk += 0.1;
          water -= 0.05;
          coffee -= 0.05;
        } else if (evaporated_milk > 0) {
          evaporated_milk += 0.1;
          water -= 0.05;
          coffee -= 0.05;
        } else {
          sugar = 1.5;
        }
      }
      // siu dai = less sweet
      else if (/\bsi(u|ew)\sdai\b/.test(name)) {
        sugar = 0.5;
      }
      // po = more water, less coffee
      else if (/\bpo\b/.test(name)) {
        water += 0.1;
        coffee -= 0.1;
      }
      // gau = more coffee, less water
      else if (/\bgau\b/.test(name)) {
        water -= 0.1;
        coffee += 0.1;
      }
      // di lo = no water, more coffee
      else if (/\bdi\slo\b/.test(name)) {
        coffee += water;
        water = 0;
      }

      // 3. ICE

      if (/\speng$/.test(name)) {
        ice = true;
      }
    } else if (/^water$/.test(name)) {
      water = 1;
    }

    return {
      water: water,
      coffee: coffee,
      sugar: sugar,
      condensed_milk: condensed_milk,
      evaporated_milk: evaporated_milk,
      ice: ice
    };
  },

  stringify: function stringify() {
    var i = arguments[0] === undefined ? {} : arguments[0];

    var coffeeLevel, ice, milk, sugarLevel;

    if (i.condensed_milk > 0) {
      milk = "";
    } else if (i.evaporated_milk > 0) {
      milk = " C";
    } else {
      milk = " O";
    }

    if (i.sugar === 0) {
      sugarLevel = " Kosong";
    } else if (i.sugar < 1) {
      sugarLevel = " Siew Dai";
    } else if (i.sugar >= 1) {
      sugarLevel = "";
    }

    if (i.coffee === i.water) {
      coffeeLevel = "";
    } else if (i.coffee > i.water) {
      if (i.water === 0) {
        coffeeLevel = " Di Lo";
      } else if (i.condensed_milk > i.water) {
        coffeeLevel = " Gah Dai";
      } else {
        coffeeLevel = " Gau";
      }
    } else {
      coffeeLevel = " Po";
    }

    if (i.ice) {
      ice = " Peng";
    } else {
      ice = "";
    }

    return "Kopi" + milk + "" + coffeeLevel + "" + sugarLevel + "" + ice;
  }

};

},{}]},{},[1])(1)
});