var CanvasView = Backbone.View.extend({
    el: $('.main-content'),
    canvas: document.getElementById('canvas'),
    canvasContext: null,
    mouseIsPressed: false,
    currentModel: new CanvasModel({}),
    connection: $.connection.canvas,
    
    initialize: function () {
        var view = this;
        $(view.el).off();
        _.bindAll(view);
        this.currentModel.view = this;
        if (view.canvas.getContext) {
            view.canvasContext = view.canvas.getContext('2d');
        }
        $.connection.hub.start();
        $.extend(view.connection.client, {
            drawLine: function (drawing) {
                view.drawSimpleLine(view.canvasContext, drawing);
            },
        });
    },
    
    events:
        {
            'mousedown #canvas': 'beginDrawing',
            'mouseup #canvas': 'endDrawing',
            'mousemove #canvas': 'performMouseMove'
        },
    
    drawSimpleLine: function (context, drawingModel, func) {
        if (!drawingModel.FromPoint)
            return;

        context.beginPath();
        context.lineWidth = drawingModel.LineWidth;
        context.lineJoin = drawingModel.LineJoin;
        context.strokeStyle = drawingModel.LineColor;
        context.moveTo(drawingModel.FromPoint.X, drawingModel.FromPoint.Y);
        context.lineTo(drawingModel.ToPoint.X, drawingModel.ToPoint.Y);
        context.stroke();
        
        if (func) func();
    },
    
    beginDrawing: function (e) {
        var view = this;
        view.mouseIsPressed = true;
        view.currentModel.changeFromPoint(
            e.clientX - view.canvas.offsetLeft,
            e.clientY - view.canvas.offsetTop - 10
        );
    },
    
    endDrawing: function () {
        var view = this;
        view.mouseIsPressed = false;
    },

    performMouseMove: function(e) {
        var view = this;
        if (view.mouseIsPressed) {
            view.currentModel.changeToPoint(
                e.clientX - view.canvas.offsetLeft,
                e.clientY - view.canvas.offsetTop - 10);

            this.drawSimpleLine(view.canvasContext, view.currentModel.get('drawingLineModel'), function () {                
                view.connection.server.drawLine(view.currentModel.get('drawingLineModel'));
            });
            
            view.currentModel.changeFromPoint(
                view.currentModel.get('drawingLineModel').ToPoint.X,
                view.currentModel.get('drawingLineModel').ToPoint.Y);
        }
    },
    
    changeColor: function (color) {
        var view = this;
        view.currentModel.changeColor(color);
    }
});