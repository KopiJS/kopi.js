(function() {
  var Kopi;

  Kopi = (function() {
    function Kopi() {}

    Kopi.prototype.parse = function(name) {
      var coffee, condensed_milk, evaporated_milk, ice, sugar, water;
      name = name.trim().toLowerCase();
      evaporated_milk = condensed_milk = water = coffee = sugar = 0;
      ice = false;
      if (/^kopi/.test(name)) {
        sugar = 1;
        if (/^kopi\s(c|si|see)\b/.test(name)) {
          evaporated_milk = .2;
          water = .4;
          coffee = .4;
        } else if (/^kopi\soh?\b/.test(name)) {
          water = .5;
          coffee = .5;
        } else {
          condensed_milk = .2;
          water = .4;
          coffee = .4;
        }
        if (/\bkosong\b/.test(name)) {
          sugar = 0;
        } else if (/\b(gah|ka)\sdai\b/.test(name)) {
          if (condensed_milk > 0) {
            condensed_milk += .1;
            water -= .05;
            coffee -= .05;
          } else if (evaporated_milk > 0) {
            evaporated_milk += .1;
            water -= .05;
            coffee -= .05;
          } else {
            sugar = 1.5;
          }
        } else if (/\bsi(u|ew)\sdai\b/.test(name)) {
          sugar = .5;
        } else if (/\bpo\b/.test(name)) {
          water += .1;
          coffee -= .1;
        } else if (/\bgau\b/.test(name)) {
          water -= .1;
          coffee += .1;
        } else if (/\bdi\slo\b/.test(name)) {
          coffee += water;
          water = 0;
        }
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
    };

    Kopi.prototype.stringify = function(i) {
      var coffeeLevel, ice, milk, sugarLevel;
      if (i == null) {
        i = {};
      }
      if (i.condensed_milk > 0) {
        milk = '';
      } else if (i.evaporated_milk > 0) {
        milk = ' C';
      } else {
        milk = ' O';
      }
      if (i.sugar === 0) {
        sugarLevel = ' Kosong';
      } else if (i.sugar < 1) {
        sugarLevel = ' Siew Dai';
      } else if (i.sugar >= 1) {
        sugarLevel = '';
      }
      if (i.coffee === i.water) {
        coffeeLevel = '';
      } else if (i.coffee > i.water) {
        if (i.water === 0) {
          coffeeLevel = ' Di Lo';
        } else if (i.condensed_milk > i.water) {
          coffeeLevel = ' Gah Dai';
        } else {
          coffeeLevel = ' Gau';
        }
      } else {
        coffeeLevel = ' Po';
      }
      if (i.ice) {
        ice = ' Peng';
      } else {
        ice = '';
      }
      return "Kopi" + milk + coffeeLevel + sugarLevel + ice;
    };

    return Kopi;

  })();

  module.exports = new Kopi;

}).call(this);
