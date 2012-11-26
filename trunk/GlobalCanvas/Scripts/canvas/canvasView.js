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
            drawLine: function(drawing) {
                view.canvasContext.beginPath();
                view.canvasContext.lineWidth = 4;
                view.canvasContext.lineJoin = 'round';
                view.canvasContext.moveTo(drawing.FromPoint.X, drawing.FromPoint.Y);
                view.canvasContext.lineTo(drawing.ToPoint.X, drawing.ToPoint.Y);
                view.canvasContext.stroke();
            },
        });
    },
    
    events:
        {
            'mousedown #canvas': 'beginDrawing',
            'mouseup #canvas': 'endDrawing',
            'mousemove #canvas': 'performMouseMove'
        },
    
    // ToDo: Should be used
    drawSimpleLine: function (context, drawingModel) {
        context.beginPath();
        context.lineWidth = drawingModel.lineWidth;
        context.lineJoin = drawingModel.lineJoin;
        context.moveTo(drawingModel.FromPoint.X, drawingModel.FromPoint.Y);
        context.lineTo(drawingModel.ToPoint.X, drawingModel.ToPoint.Y);
        context.stroke();
    },
    
    beginDrawing: function (e) {
        var view = this;
        view.mouseIsPressed = true;
        view.currentModel.set({
            oldPositionX: e.clientX - view.canvas.offsetLeft,
            oldPositionY: e.clientY - view.canvas.offsetTop - 10
        });
    },
    
    endDrawing: function () {
        var view = this;
        view.mouseIsPressed = false;
    },

    performMouseMove: function(e) {
        var view = this;
        if (view.mouseIsPressed) {
            var oldX = view.currentModel.get('oldPositionX'),
                oldY = view.currentModel.get('oldPositionY'),
                newX = e.clientX - view.canvas.offsetLeft,
                newY = e.clientY - view.canvas.offsetTop - 10;

            view.currentModel.set({
                newPositionX: newX,
                newPositionY: newY
            });
        
            if (oldX && oldY) {
                view.canvasContext.beginPath();
                view.canvasContext.lineWidth = 4;
                view.canvasContext.lineJoin = 'round';
                view.canvasContext.moveTo(oldX, oldY);
                view.canvasContext.lineTo(newX, newY);
                view.canvasContext.stroke();

                view.connection.server.drawLine(
                    oldX, oldY,
                    newX, newY
                );

                view.currentModel.set({
                    oldPositionX: newX,
                    oldPositionY: newY
                });
            }
        }
    }
});