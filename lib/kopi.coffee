class Kopi

  parse: ->
    condensed_milk: .2,
    evaporated_milk: 0,
    water: .4,
    coffee: .4,
    sugar: 1

  stringify: (i={}) ->
    if i.condensed_milk > 0
      milk = ''
    else if i.evaporated_milk > 0
      milk = ' C'
    else
      milk = ' O'

    if i.sugar == 0
      sugarLevel = ' Kosong'
    else if i.sugar < 1
      sugarLevel = ' Siew Dai'
    else if i.sugar >= 1
      sugarLevel = ''

    if i.coffee == i.water
      coffeeLevel = ''
    else if i.coffee > i.water
      if i.condensed_milk > i.water
        coffeeLevel = ' Gah Dai'
      else
        coffeeLevel = ' Gau'
    else
      coffeeLevel = ' Po'

    "Kopi#{milk}#{coffeeLevel}#{sugarLevel}"

module.exports = new Kopi
