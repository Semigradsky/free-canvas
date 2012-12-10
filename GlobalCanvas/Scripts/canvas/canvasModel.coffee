class @CanvasModel extends Backbone.Model

	defaults:
		drawingLineModel:
			FromPoint:
				X: 0
				Y: 0
			ToPoint:
				X: 0
				Y: 0
			LineWidth: 0
			LineType: 'circle'
			LineColor: ''

	changeToPoint: (point) ->
		newModel = @get('drawingLineModel')
		newModel.ToPoint =
			X: point.X
			Y: point.Y

		@set('drawingLineModel', newModel)

	changeFromPoint: (point) ->
		newModel = @get('drawingLineModel')
		newModel.FromPoint =
			X: point.X
			Y: point.Y

		@set('drawingLineModel', newModel)

	changeThickness: (newThickness) ->
		newModel = @get('drawingLineModel')
		newModel.LineWidth = newThickness

		@set('drawingLineModel', newModel)

	changeColor: (newColor) ->
		newModel = @get('drawingLineModel')
		newModel.LineColor = newColor

		@set('drawingLineModel', newModel)