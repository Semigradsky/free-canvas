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
            LineWidth: 4,
            LineJoin: 'round'
        },
    },
    
    changeToPoint: function (x, y) {
        var newModel = this.get('drawingLineModel');
        newModel.ToPoint = {
            X: x,
            Y: y
        };

        this.set({
            drawingLineModel: newModel
        });
    },
    
    changeFromPoint: function (x, y) {
        var newModel = this.get('drawingLineModel');
        newModel.FromPoint = {
            X: x,
            Y: y
        };

        this.set({
            drawingLineModel: newModel
        });
    }

   //parse: function (response) {
   //    var attrs = {};
   //    attrs.fromPoint = response.FromPoint;
   //    attrs.toPoint = response.ToPoint;
   //    return attrs;
   //}
});