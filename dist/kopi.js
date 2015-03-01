(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Kopi = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports = {

  parse: function parse(name) {
    name = name.trim().toLowerCase();

    // defaults
    var coffee = 0,
        condensed_milk = 0,
        // sweetened
    evaporated_milk = 0,
        // unsweetened
    sugar = 0,
        water = 0,
        state = "warm";

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

      // 2. STATE

      if (/\b(peng|bing)\b/.test(name)) {
        state = "iced";
      } else if (/\bpua sio\b/.test(name)) {
        state = "lukewarm";
      }

      // 3. EXPRESSIONS

      // kosong = no sugar
      if (/\bkosong\b/.test(name)) {
        if (condensed_milk) {
          throw new Error("Invalid Kopi. Condensed milk contains sugar.");
        }
        sugar = 0;
      }
      // gah dai = sweeter
      else if (/\b(ga|ka)h?\s(d|t)ai\b/.test(name)) {
        if (condensed_milk > 0) {
          condensed_milk += 0.1;
          water -= 0.05;
          coffee -= 0.05;
        } else if (evaporated_milk > 0) {
          evaporated_milk += 0.1;
          water -= 0.05;
          coffee -= 0.05;
        }
        sugar = 1.5;
      }
      // siu dai = less sweet
      else if (/\b(siu|siew|xiu)\s(t|d)ai\b/.test(name)) {
        sugar = 0.5;
      }
      // po = more water, less coffee
      else if (/\bpoh?\b/.test(name)) {
        water += 0.1;
        coffee -= 0.1;
      }
      // gau = more coffee, less water
      else if (/\b(g|k)a(u|o)\b/.test(name)) {
        water -= 0.1;
        coffee += 0.1;
      }
      // di lo = no water, more coffee
      else if (/\bdi\slo\b/.test(name)) {
        coffee += water;
        water = 0;
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
      state: state
    };
  },

  stringify: function stringify() {
    var ingredients = arguments[0] === undefined ? {} : arguments[0];
    var condensed_milk = ingredients.condensed_milk;
    var evaporated_milk = ingredients.evaporated_milk;
    var state = ingredients.state;
    var sugar = ingredients.sugar;
    var coffee = ingredients.coffee;
    var water = ingredients.water;

    var coffeeText = "",
        stateText = "",
        milkText = "",
        sweetnessText = "";

    if (evaporated_milk > 0) {
      milkText = " C";
    } else if (condensed_milk <= 0) {
      // No milk
      milkText = " O";
    }

    if (state == "iced") {
      stateText = " Peng";
    } else if (state == "lukewarm") {
      stateText = " Pua Sio";
    }

    if (coffee > water) {
      if (water == 0) {
        coffeeText = " Di Lo";
      } else if (condensed_milk > water) {
        sweetnessText = " Gah Dai";
      } else {
        coffeeText = " Gao";
      }
    } else if (coffee < water) {
      coffeeText = " Po";
    }

    if (sugar == 0 && condensed_milk <= 0) {
      sweetnessText = " Kosong";
    } else if (sugar < 1) {
      sweetnessText = " Siew Dai";
    } else if (sugar > 1) {
      sweetnessText = " Gah Dai";
    }

    return "Kopi" + milkText + "" + stateText + "" + coffeeText + "" + sweetnessText;
  }

};

},{}]},{},[1])(1)
});