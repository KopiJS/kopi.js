Kopi = require '../index'

describe 'Kopi', ->

	describe '#parse', ->
    it 'returns Kopi ingredients if pass in "Kopi"', ->
      ingredients = Kopi.parse 'Kopi'
      expect(ingredients).to.deep.equal
        condensed_milk: .2,
        evaporated_milk: 0,
        water: .4,
        coffee: .4,
        sugar: 1

  describe '#stringify', ->
    it 'returns "Kopi" if pass in Kopi ingredients', ->
      name = Kopi.stringify
        condensed_milk: .2,
        water: .4,
        coffee: .4,
        sugar: 1
      expect(name).to.equal 'Kopi'