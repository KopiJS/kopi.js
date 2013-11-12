class Kopi

  parse: ->
    condensed_milk: .2,
    evaporated_milk: 0,
    water: .4,
    coffee: .4,
    sugar: 1

  stringify: ->
    'Kopi'

module.exports = new Kopi