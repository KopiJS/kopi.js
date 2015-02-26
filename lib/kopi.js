export default {

  parse(name){
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

    if (/^kopi/.test(name)){

      // 1. TYPES

      sugar = 1;

      // Kopi C
      if (/^kopi\s(c|si|see)\b/.test(name)){
        evaporated_milk = .2;
        water = .4;
        coffee = .4;
      }
      // Kopi O
      else if (/^kopi\soh?\b/.test(name)){
        water = .5;
        coffee = .5;
      }
      // Kopi
      else {
        condensed_milk = .2;
        water = .4;
        coffee = .4;
      }

      // 2. EXPRESSIONS

      // kosong = no sugar
      if (/\bkosong\b/.test(name)){
        sugar = 0;
      }
      // gah dai = sweeter
      else if (/\b(gah|ka)\sdai\b/.test(name)){
        if (condensed_milk > 0){
          condensed_milk += .1;
          water -= .05;
          coffee -= .05;
        } else if (evaporated_milk > 0){
          evaporated_milk += .1;
          water -= .05;
          coffee -= .05;
        } else {
          sugar = 1.5;
        }
      }
      // siu dai = less sweet
      else if (/\bsi(u|ew)\sdai\b/.test(name)){
        sugar = .5;
      }
      // po = more water, less coffee
      else if (/\bpo\b/.test(name)){
        water += .1;
        coffee -= .1;
      }
      // gau = more coffee, less water
      else if (/\bgau\b/.test(name)){
        water -= .1;
        coffee += .1;
      }
      // di lo = no water, more coffee
      else if (/\bdi\slo\b/.test(name)){
        coffee += water;
        water = 0;
      }

      // 3. ICE

      if (/\speng$/.test(name)){
        ice = true;
      }

    } else if (/^water$/.test(name)){
      water = 1;
    }

    return {
      water,
      coffee,
      sugar,
      condensed_milk,
      evaporated_milk,
      ice
    };
  },

  stringify(i = {}){
    var coffeeLevel, ice, milk, sugarLevel;

    if (i.condensed_milk > 0){
      milk = '';
    } else if (i.evaporated_milk > 0){
      milk = ' C';
    } else {
      milk = ' O';
    }

    if (i.sugar === 0){
      sugarLevel = ' Kosong';
    } else if (i.sugar < 1){
      sugarLevel = ' Siew Dai';
    } else if (i.sugar >= 1){
      sugarLevel = '';
    }

    if (i.coffee === i.water){
      coffeeLevel = '';
    } else if (i.coffee > i.water){
      if (i.water === 0){
        coffeeLevel = ' Di Lo';
      } else if (i.condensed_milk > i.water){
        coffeeLevel = ' Gah Dai';
      } else {
        coffeeLevel = ' Gau';
      }
    } else {
      coffeeLevel = ' Po';
    }

    if (i.ice){
      ice = ' Peng';
    } else {
      ice = '';
    }

    return `Kopi${milk}${coffeeLevel}${sugarLevel}${ice}`;
  }
  
};
