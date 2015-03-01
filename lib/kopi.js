export default {

  parse(name){
    name = name.trim().toLowerCase();

    // defaults
    var coffee = 0,
      condensed_milk = 0, // sweetened
      evaporated_milk = 0, // unsweetened
      sugar = 0,
      water = 0,
      state = 'warm';

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

      // 2. STATE

      if (/\b(peng|bing)\b/.test(name)){
        state = 'iced';
      } else if (/\bpua sio\b/.test(name)){
        state = 'lukewarm';
      }

      // 3. EXPRESSIONS

      // kosong = no sugar
      if (/\bkosong\b/.test(name)){
        if (condensed_milk){
          throw new Error('Invalid Kopi. Condensed milk contains sugar.');
        }
        sugar = 0;
      }
      // gah dai = sweeter
      else if (/\b(ga|ka)h?\s(d|t)ai\b/.test(name)){
        if (condensed_milk > 0){
          condensed_milk += .1;
          water -= .05;
          coffee -= .05;
        } else if (evaporated_milk > 0){
          evaporated_milk += .1;
          water -= .05;
          coffee -= .05;
        }
        sugar = 1.5;
      }
      // siu dai = less sweet
      else if (/\b(siu|siew|xiu)\s(t|d)ai\b/.test(name)){
        sugar = .5;
      }
      // po = more water, less coffee
      else if (/\bpoh?\b/.test(name)){
        water += .1;
        coffee -= .1;
      }
      // gau = more coffee, less water
      else if (/\b(g|k)a(u|o)\b/.test(name)){
        water -= .1;
        coffee += .1;
      }
      // di lo = no water, more coffee
      else if (/\bdi\slo\b/.test(name)){
        coffee += water;
        water = 0;
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
      state
    };
  },

  stringify(ingredients = {}){
    var {condensed_milk, evaporated_milk, state, sugar, coffee, water} = ingredients;

    var coffeeText = '',
      stateText = '',
      milkText = '',
      sweetnessText = '';

    if (evaporated_milk > 0){
      milkText = ' C';
    } else if (condensed_milk <= 0){ // No milk
      milkText = ' O';
    }

    if (state == 'iced'){
      stateText = ' Peng';
    } else if (state == 'lukewarm'){
      stateText = ' Pua Sio';
    }

    if (coffee > water){
      if (water == 0){
        coffeeText = ' Di Lo';
      } else if (condensed_milk > water){
        sweetnessText = ' Gah Dai';
      } else {
        coffeeText = ' Gao';
      }
    } else if (coffee < water){
      coffeeText = ' Po';
    }

    if (sugar == 0 && condensed_milk <= 0){
      sweetnessText = ' Kosong';
    } else if (sugar < 1){
      sweetnessText = ' Siew Dai';
    } else if (sugar > 1){
      sweetnessText = ' Gah Dai';
    }

    return `Kopi${milkText}${stateText}${coffeeText}${sweetnessText}`;
  }

};
