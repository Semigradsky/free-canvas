class @ColorPickerView extends Backbone.View

	picker: []
	pickerView: []
	defaultColors: [
		'black', 'white',
		'gray', 'silver',
		'navy', 'blue',
		'teal', 'aqua',
		'green', 'lime',
		'olive', 'yellow',
		'purple', 'fuchsia',
		'maroon', 'red'
	]

	initialize: ->
		$(@el).off()
		_.bindAll(@)
		@model.view = @
		@model.bind('change', @update)

	events:
		'click .palette li': 'pickColor'

	pickColor: (e) ->
		$('.palette li').removeClass('active')
		activeColor = $(e.currentTarget)
		$(activeColor).addClass('active')
		color = $(activeColor).css('background-color')
		$(@picker).colorpicker('setColor', color)

	setColor: (color) ->
		$(@picker).colorpicker('setColor', color)

	update: ->
		color = @model.get('Color')
		$(@picker).css('background-color', color)
		$(@picker).css('color', color)
		console.log('ColorPicker update: ' + color)

	render: ->
		# added picker
		$(@el).append('<input type=text class="current-color"></input>')
		@picker = $('.current-color')

		# added palette
		$(@el).append('<ul class="palette"></ul>')
		palette = $(@el).find('ul.palette')
		_.each(@defaultColors, (color) =>
			palette.append('<li style="background-color:' + color + '"></li>')
		);

		# init color picker
		$(@picker).colorpicker({
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