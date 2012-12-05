var CanvasView = Backbone.View.extend({
    el: $('.main-content'),
    canvas: document.getElementById('canvas'),
    canvasContext: null,
    mouseIsPressed: false,
    model: new CanvasModel(),
    colorPicker: null,
    thicknessSlider: null,
    connection: $.connection.canvas,
    defaultValues: {
        color: 'lime',
        lineThickness: 30
    },
    
    initialize: function () {
        var view = this;
        $(view.el).off();
        _.bindAll(view);
        this.model.view = this;
        view.canvasContext = view.canvas.getContext('2d');

        // Initialize thickness picker
        var lineThicknessModel = new LineThicknessModel();
        this.thicknessSlider = new LineThicknessView({ el: $('.line-tickness-picker'), model: lineThicknessModel });
        this.thicknessSlider.render();
        this.thicknessSlider.model.bind('change', this.changeThickness);
        this.thicknessSlider.setThickness(view.defaultValues.lineThickness);

        // Initialize color picker
        var colorPickerModel = new ColorPickerModel();
        this.colorPicker = new ColorPickerView({ el: $('.color-picker'), model: colorPickerModel });
        this.colorPicker.render();
        this.colorPicker.model.bind('change', this.changeColor);
        this.colorPicker.model.bind('change', this.thicknessSlider.changeColor);
        this.colorPicker.setColor(view.defaultValues.color);
        
        // Initialize SignalR
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
    
    drawSimpleLine: function (context, drawingModel) {
        if (!drawingModel.FromPoint)
            return;

        switch (drawingModel.LineType) {
            case 'butt':
            case 'round':
            case 'square':
                // draw line
                context.beginPath();
                context.lineWidth = drawingModel.LineWidth;
                context.lineCap = drawingModel.LineType;
                context.strokeStyle = drawingModel.LineColor;
                context.moveTo(drawingModel.FromPoint.X, drawingModel.FromPoint.Y);
                context.lineTo(drawingModel.ToPoint.X, drawingModel.ToPoint.Y);
                context.stroke();
                break;
            case 'circle':
                // draw circles
                var minX = drawingModel.FromPoint.X < drawingModel.ToPoint.X ? drawingModel.FromPoint.X : drawingModel.ToPoint.X;
                var minY = drawingModel.FromPoint.Y < drawingModel.ToPoint.Y ? drawingModel.FromPoint.Y : drawingModel.ToPoint.Y;
                context.beginPath();
                context.lineWidth = 1; // lineWidth can not be zero
                context.arc(minX, minY, (drawingModel.LineWidth - 2) / 2, 0, 2 * Math.PI, false);
                context.fillStyle = drawingModel.LineColor;
                context.fill();
                context.stroke();
                break;
            default:
                console.log('Error! LineType: ' + drawingModel.LineType);
                break;
        }
    },
    
    beginDrawing: function (e) {
        var view = this;
        view.mouseIsPressed = true;
        view.model.changeFromPoint(view.getMousePos(e));
    },
    
    endDrawing: function () {
        var view = this;
        view.mouseIsPressed = false;
    },

    performMouseMove: function(e) {
        var view = this;
        if (view.mouseIsPressed) {
            view.model.changeToPoint(view.getMousePos(e));
            view.connection.server.drawLine(view.model.get('drawingLineModel'));
            view.model.changeFromPoint(view.model.get('drawingLineModel').ToPoint);
        }
    },
    
    getMousePos: function (e) {
        var view = this;
        var rect = view.canvas.getBoundingClientRect();
        return {
            X: e.clientX - rect.left,
            Y: e.clientY - rect.top
        };
    },

    changeColor: function () {
        var view = this;
        view.model.changeColor(view.colorPicker.model.get('Color'));
    },
    
    changeThickness: function () {
        var view = this;
        view.model.changeThickness(
            view.thicknessSlider.model.get('LineThickness')
        );
    }
});