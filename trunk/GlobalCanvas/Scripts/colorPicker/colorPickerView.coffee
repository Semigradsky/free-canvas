class @ColorPickerView extends Backbone.View

	$picker: null
	$inputPicker: null
	pickerView: null

	initialize: ->
		@$el.off()
		_.bindAll(@)
		@model.view = @
		@model.bind('change', @update)

	setColor: (color) ->
		@$inputPicker.colorpicker('setColor', color)

	update: ->
		color = @model.get('Color')
		@$picker.css('background-color', color)
		@$picker.css('color', color)
		console.log('ColorPicker update: ' + color)

	render: ->
		# added picker
		@$el.append('<input type=text style="height: 0; width: 0; margin: 0; padding: 0; border: none; float: left"></input>')
		@$inputPicker = @$el.find('input')

		# init color picker
		@$inputPicker.colorpicker({
			hsv: false,
			rgb: false,
			select: (event, color) =>
				@model.set({
					Color: '#' + color.formatted
				});
			,
			close: (event, color) =>
				$('.palette li').removeClass('active')
				@model.set({
					Color: '#' + color.formatted
				})
		})

		@$el.append('<div class="current-color"></div')
		@$picker = @$el.find('div.current-color')
		@$picker.on('click', => @$inputPicker.colorpicker('open'))

		# added palette
		@$el.append('<ul class="palette"></ul>')
		@palette = new PaletteView({ el: @$el.find('ul.palette') })
		@palette.render()
		@palette.model.bind('change:activeColor',  (paletteModel) => @setColor(paletteModel.get('activeColor')))