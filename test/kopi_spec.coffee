Kopi = require '../index'

describe 'Kopi', ->

  describe '#parse', ->
    it 'returns Kopi ingredients if pass in "Kopi"', ->
      ingredients = Kopi.parse 'Kopi'
      expect(ingredients).to.deep.equal
        water: 1
        coffee: 1
        sugar: 1
        condensed_milk: 1
        evaporated_milk: 0
    it 'returns Kopi ingredients if pass in "Kopi O"', ->
      ingredients = Kopi.parse 'Kopi O'
      expect(ingredients).to.deep.equal
        water: 1
        coffee: 1
        sugar: 1
        condensed_milk: 0
        evaporated_milk: 0
    it 'returns Kopi ingredients if pass in "Kopi O Gau"', ->
      ingredients = Kopi.parse 'Kopi O Gau'
      expect(ingredients).to.deep.equal
        water: 1
        coffee: 1.5
        sugar: 1
        condensed_milk: 0
        evaporated_milk: 0
    it 'returns Kopi ingredients if pass in "Kopi O Po"', ->
      ingredients = Kopi.parse 'Kopi O Po'
      expect(ingredients).to.deep.equal
        water: 1
        coffee: 0.5
        sugar: 1
        condensed_milk: 0
        evaporated_milk: 0
    it 'returns Kopi ingredients if pass in "Kopi O Siew Dai"', ->
      ingredients = Kopi.parse 'Kopi O Siew Dai'
      expect(ingredients).to.deep.equal
        water: 1
        coffee: 1
        sugar: 0.5
        condensed_milk: 0
        evaporated_milk: 0
    it 'returns Kopi ingredients if pass in "Kopi Gau"', ->
      ingredients = Kopi.parse 'Kopi Gau'
      expect(ingredients).to.deep.equal
        water: 1
        coffee: 1.5
        sugar: 1
        condensed_milk: 1
        evaporated_milk: 0
    it 'returns Kopi ingredients if pass in "Kopi Po"', ->
      ingredients = Kopi.parse 'Kopi Po'
      expect(ingredients).to.deep.equal
        water: 1
        coffee: 0.5
        sugar: 1
        condensed_milk: 1
        evaporated_milk: 0
    it 'returns Kopi ingredients if pass in "Kopi Siew Dai"', ->
      ingredients = Kopi.parse 'Kopi Siew Dai'
      expect(ingredients).to.deep.equal
        water: 1
        coffee: 1
        sugar: 0.5
        condensed_milk: 1
        evaporated_milk: 0
    it 'returns Kopi ingredients if pass in "Kopi Gah Dai"', ->
      ingredients = Kopi.parse 'Kopi Gah Dai'
      expect(ingredients).to.deep.equal
        water: 1
        coffee: 1
        sugar: 1
        condensed_milk: 1.5
        evaporated_milk: 0
    it 'returns Kopi ingredients if pass in "Kopi Si"', ->
      ingredients = Kopi.parse 'Kopi Si'
      expect(ingredients).to.deep.equal
        water: 1
        coffee: 1
        sugar: 1
        condensed_milk: 0
        evaporated_milk: 1
    it 'returns Kopi ingredients if pass in "Kopi Si Kosong"', ->
      ingredients = Kopi.parse 'Kopi Si Kosong'
      expect(ingredients).to.deep.equal
        water: 1
        coffee: 1
        sugar: 0
        condensed_milk: 0
        evaporated_milk: 1
    it 'returns Kopi ingredients if pass in "Kopi Kosong"', ->
      ingredients = Kopi.parse 'Kopi Kosong'
      expect(ingredients).to.deep.equal
        water: 1
        coffee: 1
        sugar: 0
        condensed_milk: 0
        evaporated_milk: 0

  describe '#stringify', ->
    it 'returns "Kopi" if pass in Kopi ingredients', ->
      name = Kopi.stringify
        condensed_milk: .2
        water: .4
        coffee: .4
        sugar: 1
      expect(name).to.equal 'Kopi'

    it 'returns "Kopi Gau" if more coffee is added', ->
      name = Kopi.stringify
        condensed_milk: .2
        water: .2
        coffee: .6
        sugar: 1
      expect(name).to.equal 'Kopi Gau'

    it 'returns "Kopi Po" if less coffee is added', ->
      name = Kopi.stringify
        condensed_milk: .2
        water: .6
        coffee: .2
        sugar: 1
      expect(name).to.equal 'Kopi Po'

    it 'returns "Kopi Siew Dai" if less sugar is added', ->
      name = Kopi.stringify
        condensed_milk: .2
        water: .4
        coffee: .4
        sugar: 0.5
      expect(name).to.equal 'Kopi Siew Dai'

    it 'returns "Kopi Kosong" if no sugar is added', ->
      name = Kopi.stringify
        condensed_milk: .2
        water: .4
        coffee: .4
        sugar: 0
      expect(name).to.equal 'Kopi Kosong'

    it 'returns "Kopi Gah Dai" if more milk is added', ->
      name = Kopi.stringify
        condensed_milk: .4
        water: .2
        coffee: .4
        sugar: 1
      expect(name).to.equal 'Kopi Gah Dai'

    context 'when no milk is added', ->
      it 'returns "Kopi O" if equal amounts of water and coffee is added', ->
        name = Kopi.stringify
          condensed_milk: 0
          water: .5
          coffee: .5
          sugar: 1
        expect(name).to.equal 'Kopi O'

      it 'returns "Kopi O Gau" if more coffee is added', ->
        name = Kopi.stringify
          condensed_milk: 0
          water: .3
          coffee: .7
          sugar: 1
        expect(name).to.equal 'Kopi O Gau'

      it 'returns "Kopi O Po" if less coffee is added', ->
        name = Kopi.stringify
          condensed_milk: 0
          water: .7
          coffee: .3
          sugar: 1
        expect(name).to.equal 'Kopi O Po'

      it 'returns "Kopi O Siew Dai" if less sugar is added', ->
        name = Kopi.stringify
          condensed_milk: 0
          water: .5
          coffee: .5
          sugar: 0.5
        expect(name).to.equal 'Kopi O Siew Dai'

      it 'returns "Kopi O Kosong" if no sugar is added', ->
        name = Kopi.stringify
          condensed_milk: 0
          water: .5
          coffee: .5
          sugar: 0
        expect(name).to.equal 'Kopi O Kosong'

    context 'when evaporated milk is used', ->
      it 'returns "Kopi C" if equal amounts of water and coffee is added', ->
        name = Kopi.stringify
          condensed_milk: 0
          evaporated_milk: .2
          water: .4
          coffee: .4
          sugar: 1
        expect(name).to.equal 'Kopi C'

      it 'returns "Kopi C Gau" if more coffee is added', ->
        name = Kopi.stringify
          condensed_milk: 0
          evaporated_milk: .2
          water: .2
          coffee: .6
          sugar: 1
        expect(name).to.equal 'Kopi C Gau'

      it 'returns "Kopi C Po" if less coffee is added', ->
        name = Kopi.stringify
          condensed_milk: 0
          evaporated_milk: .2
          water: .7
          coffee: .3
          sugar: 1
        expect(name).to.equal 'Kopi C Po'

      it 'returns "Kopi C Siew Dai" if less sugar is added', ->
        name = Kopi.stringify
          condensed_milk: 0
          evaporated_milk: .2
          water: .5
          coffee: .5
          sugar: 0.5
        expect(name).to.equal 'Kopi C Siew Dai'

      it 'returns "Kopi C Kosong" if no sugar is added', ->
        name = Kopi.stringify
          condensed_milk: 0
          evaporated_milk: .2
          water: .5
          coffee: .5
          sugar: 0
        expect(name).to.equal 'Kopi C Kosong'
