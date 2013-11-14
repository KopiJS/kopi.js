Kopi = require '../index'

describe 'Kopi', ->

  describe '#parse', ->

    it 'returns Kopi contents if pass in "Kopi"', ->
      content = Kopi.parse 'Kopi'
      expect(content).to.deep.equal
        water: .4
        coffee: .4
        sugar: 1
        condensed_milk: .2
        evaporated_milk: 0
        ice: false

    it 'returns Kopi O contents if pass in "Kopi O"', ->
      content = Kopi.parse 'Kopi O'
      expect(content).to.deep.equal
        water: .5
        coffee: .5
        sugar: 1
        condensed_milk: 0
        evaporated_milk: 0
        ice: false

    it 'returns Kopi C contents if pass in "Kopi C"', ->
      content = Kopi.parse 'Kopi C'
      expect(content).to.deep.equal
        water: .4
        coffee: .4
        sugar: 1
        condensed_milk: 0
        evaporated_milk: .2
        ice: false

    it 'returns no sugar if pass in "Kosong"', ->
      content = Kopi.parse 'Kopi O Kosong'
      expect(content.sugar).to.equal 0

    it 'returns more condensed milk if pass in "Gah Dai"', ->
      content = Kopi.parse 'Kopi'
      contentGahDai = Kopi.parse 'Kopi Gah Dai'
      expect(contentGahDai.condensed_milk).to.be.gt content.condensed_milk

    it 'returns less sugar if pass in "Siu Dai"', ->
      content = Kopi.parse 'Kopi Siu Dai'
      expect(content.sugar).to.be.equal .5

    it 'returns more water, less coffee if pass in "Po"', ->
      content = Kopi.parse 'Kopi Po'
      expect(content.water).to.be.gt content.coffee

    it 'returns more coffee, less water if pass in "Gau"', ->
      content = Kopi.parse 'Kopi Gau'
      expect(content.coffee).to.be.gt content.water

    it 'returns more coffee, no water if pass in "Di Lo"', ->
      content = Kopi.parse 'Kopi Di Lo'
      expect(content.coffee).to.be.gt content.water
      expect(content.water).to.be.equal 0

    it 'returns ice if pass in "Peng"', ->
      content = Kopi.parse 'Kopi Peng'
      expect(content.ice).to.be.true

    it 'returns water if pass in "Water"', ->
      content = Kopi.parse 'Water'
      expect(content.water).to.be.equal 1

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

    it 'returns Kopi name appended with "Peng" if ice is added', ->
      name = Kopi.stringify
        condensed_milk: .2
        water: .4
        coffee: .4
        sugar: 1
        ice: true
      expect(name).to.equal 'Kopi Peng'
      name = Kopi.stringify
        condensed_milk: .2
        water: .2
        coffee: .6
        sugar: 1
        ice: true
      expect(name).to.equal 'Kopi Gau Peng'

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
