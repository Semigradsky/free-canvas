class @PaletteView extends Backbone.View

	model: new PaletteModel()

	initialize: ->
		@$el.off()
		_.bindAll(@)
		@model.view = @
		@model.bind('change:models', @update)

	events:
		'click .palette li': 'pickColor'

	pickColor: (e) ->
		$('.palette li').removeClass('active')
		$activeColor = $(e.currentTarget)
		$activeColor.addClass('active')
		color = $activeColor.css('background-color')
		@model.set('activeColor', color)

	update: ->
		console.log 'Update palette'

	render: ->
		# added palette
		i = 0;
		_.each(@model.get('colors').first, (color) =>
			@$el.append("<li data-id='#{ i }' style='background-color:#{ color }'></li>")
			@$el.append("<input data-id='#{ i }' value='#{ color }' type=text style='height: 0; width: 0; margin: 0; padding: 0; border: none; float: left'></input>")

			$color = @$el.find("li[data-id=#{ i }]");
			$picker = @$el.find("input[data-id=#{ i }]");
			$color.on('click', (e) ->
				if (e.shiftKey)
					$picker.colorpicker('open')
			)
			$picker.colorpicker({
				hsv: false,
				rgb: false,
				close: (event, color) =>
					colors = @model.get('colors')
					colors.first[$picker.attr('data-id')] = color.formatted
					$color.css('background-color', '#' + color.formatted)
					@model.set('colors', colors)
			})
			i++;
		);