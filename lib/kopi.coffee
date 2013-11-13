class Kopi

  parse: (name)->
    kopi_content = 
      water: 1
      coffee: 1
      sugar: 1
      condensed_milk: 1
      evaporated_milk: 0

    parse_name = name.trim().toLowerCase()

    switch parse_name
      when 'kopi o'
        kopi_content.condensed_milk = 0
      when 'kopi o gau'
        kopi_content.coffee = 1.5
        kopi_content.condensed_milk = 0
      when 'kopi o po'
        kopi_content.coffee = 0.5
        kopi_content.condensed_milk = 0
      when 'kopi o siew dai'
        kopi_content.sugar = 0.5
        kopi_content.condensed_milk = 0
      when 'kopi gau'
        kopi_content.coffee = 1.5
      when 'kopi po'
        kopi_content.coffee = 0.5
      when 'kopi siew dai'
        kopi_content.sugar = 0.5
      when 'kopi gah dai'
        kopi_content.condensed_milk = 1.5
      when 'kopi si'
        kopi_content.condensed_milk = 0
        kopi_content.evaporated_milk = 1
      when 'kopi si kosong'
        kopi_content.condensed_milk = 0
        kopi_content.evaporated_milk = 1
        kopi_content.sugar = 0
      when 'kopi kosong'
        kopi_content.condensed_milk = 0
        kopi_content.evaporated_milk = 0
        kopi_content.sugar = 0

    kopi_content


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

    if i.ice
      ice = ' Peng'
    else
      ice = ''

    "Kopi#{milk}#{coffeeLevel}#{sugarLevel}#{ice}"

module.exports = new Kopi
