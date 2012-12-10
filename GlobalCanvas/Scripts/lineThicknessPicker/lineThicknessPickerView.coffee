class @LineThicknessView extends Backbone.View

	slider: null
	circle: null

	initialize: ->
		$(@el).off()
		_.bindAll(@)
		@model.view = @
		@model.bind('change', @update)

	setThickness: (thickness) ->
		$(@slider).slider('value', thickness)
		@model.set({ LineThickness: thickness })

	update: ->
		thickness = @model.get('LineThickness')
		$(@circle)
			.css('margin-top', 20 - thickness / 2)
			.css('margin-left', 20 - thickness / 2)
			.css('width', thickness)
			.css('height', thickness)
			.css('border-radius', thickness / 2)
		console.log('LineThicknessPicker update: ' + thickness)

	changeColor: (colorPickerModel) ->
		color = colorPickerModel.get('Color')
		$(@circle).css('background', color)

	render: ->
		# added thickness view
		$(@el).append('<div class="line-thickness-view"><div class="circle"></div></div>')
		@circle = $(@el).find('.circle')

		# added slider
		$(@el).append('<div class="thickness-picker"></div>')
		@slider = $(@el).find('.thickness-picker')

		# init slider
		$(@slider).slider({
			min: 1,
			max: 40,
			slide: (event, ui) =>
				@setThickness(ui.value)
		})