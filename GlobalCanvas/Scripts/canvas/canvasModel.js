var CanvasModel = Backbone.Model.extend({
    defaults: {
        drawingLineModel: {
            FromPoint: {
                X: 0,
                Y: 0
            },
            ToPoint: {
                X: 0,
                Y: 0
            },
            LineWidth: {},
            LineType: 'circle',
            LineColor: {}
        },
    },
    
    changeToPoint: function (point) {
        var newModel = this.get('drawingLineModel');
        newModel.ToPoint = {
            X: point.X,
            Y: point.Y
        };

        this.set({
            drawingLineModel: newModel
        });
    },
    
    changeFromPoint: function (point) {
        var newModel = this.get('drawingLineModel');
        newModel.FromPoint = {
            X: point.X,
            Y: point.Y
        };

        this.set({
            drawingLineModel: newModel
        });
    },

    changeThickness: function (newThickness) {
        var newModel = this.get('drawingLineModel');
        newModel.LineWidth = newThickness;

        this.set({
            drawingLineModel: newModel
        });
    },
    
    changeColor: function (newColor) {
        var newModel = this.get('drawingLineModel');
        newModel.LineColor = newColor;

        this.set({
            drawingLineModel: newModel
        });
    }
});