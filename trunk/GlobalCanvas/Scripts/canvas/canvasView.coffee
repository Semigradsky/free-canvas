class @CanvasView extends Backbone.View

	el: $('.main-content')
	model: new CanvasModel()
	canvas: document.getElementById('canvas')
	canvasContext: null
	mouseIsPressed: false
	colorPicker: null
	thicknessSlider: null
	connection: $.connection.canvas
	defaultValues:
		color: 'lime'
		lineThickness: 30

	initialize: ->
		$(@el).off()
		_.bindAll(@)
		@model.view = @
		@.canvasContext = @.canvas.getContext('2d')

		# Initialize thickness picker
		lineThicknessModel = new LineThicknessModel()
		@thicknessSlider = new LineThicknessView({ el: $('.line-tickness-picker'), model: lineThicknessModel })
		@thicknessSlider.render()
		@thicknessSlider.model.bind('change', @changeThickness)
		@thicknessSlider.setThickness(@.defaultValues.lineThickness)

		# Initialize color picker
		colorPickerModel = new ColorPickerModel()
		@colorPicker = new ColorPickerView({ el: $('.color-picker'), model: colorPickerModel })
		@colorPicker.render()
		@colorPicker.model.bind('change', @changeColor)
		@colorPicker.model.bind('change', @thicknessSlider.changeColor)
		@colorPicker.setColor(@defaultValues.color)

		# Initialize SignalR
		$.connection.hub.start()
		$.extend(@connection.client, {
			drawLine: (drawing) =>
				@drawSimpleLine(@canvasContext, drawing)
		})

	events: 
		'mousedown #canvas': 'beginDrawing'
		'mouseup #canvas': 'endDrawing'
		'mousemove #canvas': 'performMouseMove'

	drawSimpleLine: (context, drawingModel) ->
		if !drawingModel.FromPoint
			return

		switch drawingModel.LineType
			when 'butt', 'round', 'square'
				# draw line
				context.beginPath()
				context.lineWidth = drawingModel.LineWidth
				context.lineCap = drawingModel.LineType
				context.strokeStyle = drawingModel.LineColor
				context.moveTo(drawingModel.FromPoint.X, drawingModel.FromPoint.Y)
				context.lineTo(drawingModel.ToPoint.X, drawingModel.ToPoint.Y)
				context.stroke()
			when 'circle'
				# draw circles
				minX = if drawingModel.FromPoint.X < drawingModel.ToPoint.X then drawingModel.FromPoint.X else drawingModel.ToPoint.X
				minY = if drawingModel.FromPoint.Y < drawingModel.ToPoint.Y then drawingModel.FromPoint.Y else drawingModel.ToPoint.Y
				context.beginPath()
				context.lineWidth = 1        # lineWidth can not be zero
				context.arc(minX, minY, (drawingModel.LineWidth - 2) / 2, 0, 2 * Math.PI, false)
				context.fillStyle = drawingModel.LineColor
				context.fill()
				context.stroke()
			else
				console.log('Error! LineType: ' + drawingModel.LineType)

	beginDrawing: (e) ->
		@mouseIsPressed = true
		@model.changeFromPoint(@getMousePos(e))

	endDrawing: ->
		@mouseIsPressed = false

	performMouseMove: (e) ->
		if @mouseIsPressed
			@model.changeToPoint(@getMousePos(e))
			@connection.server.drawLine(@model.get('drawingLineModel'))
			@model.changeFromPoint(@model.get('drawingLineModel').ToPoint)

	getMousePos: (e) ->
		rect = @canvas.getBoundingClientRect()
		return {
			X: e.clientX - rect.left
			Y: e.clientY - rect.top
		}

	changeColor: ->
		@model.changeColor(@colorPicker.model.get('Color'))

	changeThickness: ->
		@model.changeThickness(@thicknessSlider.model.get('LineThickness'))