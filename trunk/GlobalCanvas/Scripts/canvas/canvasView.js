(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.CanvasView = (function(_super) {

    __extends(CanvasView, _super);

    function CanvasView() {
      return CanvasView.__super__.constructor.apply(this, arguments);
    }

    CanvasView.prototype.el = $('.main-content');

    CanvasView.prototype.model = new CanvasModel();

    CanvasView.prototype.canvas = document.getElementById('canvas');

    CanvasView.prototype.canvasContext = null;

    CanvasView.prototype.mouseIsPressed = false;

    CanvasView.prototype.colorPicker = null;

    CanvasView.prototype.thicknessSlider = null;

    CanvasView.prototype.connection = $.connection.canvas;

    CanvasView.prototype.defaultValues = {
      color: 'lime',
      lineThickness: 30
    };

    CanvasView.prototype.initialize = function() {
      var colorPickerModel, lineThicknessModel,
        _this = this;
      $(this.el).off();
      _.bindAll(this);
      this.model.view = this;
      this.canvasContext = this.canvas.getContext('2d');
      lineThicknessModel = new LineThicknessModel();
      this.thicknessSlider = new LineThicknessView({
        el: $('.line-tickness-picker'),
        model: lineThicknessModel
      });
      this.thicknessSlider.render();
      this.thicknessSlider.model.bind('change', this.changeThickness);
      this.thicknessSlider.setThickness(this.defaultValues.lineThickness);
      colorPickerModel = new ColorPickerModel();
      this.colorPicker = new ColorPickerView({
        el: $('.color-picker'),
        model: colorPickerModel
      });
      this.colorPicker.render();
      this.colorPicker.model.bind('change', this.changeColor);
      this.colorPicker.model.bind('change', this.thicknessSlider.changeColor);
      this.colorPicker.setColor(this.defaultValues.color);
      $.connection.hub.start();
      return $.extend(this.connection.client, {
        drawLine: function(drawing) {
          return _this.drawSimpleLine(_this.canvasContext, drawing);
        }
      });
    };

    CanvasView.prototype.events = {
      'mousedown #canvas': 'beginDrawing',
      'mouseup #canvas': 'endDrawing',
      'mousemove #canvas': 'performMouseMove'
    };

    CanvasView.prototype.drawSimpleLine = function(context, drawingModel) {
      var minX, minY;
      if (!drawingModel.FromPoint) {
        return;
      }
      switch (drawingModel.LineType) {
        case 'butt':
        case 'round':
        case 'square':
          context.beginPath();
          context.lineWidth = drawingModel.LineWidth;
          context.lineCap = drawingModel.LineType;
          context.strokeStyle = drawingModel.LineColor;
          context.moveTo(drawingModel.FromPoint.X, drawingModel.FromPoint.Y);
          context.lineTo(drawingModel.ToPoint.X, drawingModel.ToPoint.Y);
          return context.stroke();
        case 'circle':
          minX = drawingModel.FromPoint.X < drawingModel.ToPoint.X ? drawingModel.FromPoint.X : drawingModel.ToPoint.X;
          minY = drawingModel.FromPoint.Y < drawingModel.ToPoint.Y ? drawingModel.FromPoint.Y : drawingModel.ToPoint.Y;
          context.beginPath();
          context.lineWidth = 1;
          context.arc(minX, minY, (drawingModel.LineWidth - 2) / 2, 0, 2 * Math.PI, false);
          context.fillStyle = drawingModel.LineColor;
          context.fill();
          return context.stroke();
        default:
          return console.log('Error! LineType: ' + drawingModel.LineType);
      }
    };

    CanvasView.prototype.beginDrawing = function(e) {
      this.mouseIsPressed = true;
      return this.model.changeFromPoint(this.getMousePos(e));
    };

    CanvasView.prototype.endDrawing = function() {
      return this.mouseIsPressed = false;
    };

    CanvasView.prototype.performMouseMove = function(e) {
      if (this.mouseIsPressed) {
        this.model.changeToPoint(this.getMousePos(e));
        this.connection.server.drawLine(this.model.get('drawingLineModel'));
        return this.model.changeFromPoint(this.model.get('drawingLineModel').ToPoint);
      }
    };

    CanvasView.prototype.getMousePos = function(e) {
      var rect;
      rect = this.canvas.getBoundingClientRect();
      return {
        X: e.clientX - rect.left,
        Y: e.clientY - rect.top
      };
    };

    CanvasView.prototype.changeColor = function() {
      return this.model.changeColor(this.colorPicker.model.get('Color'));
    };

    CanvasView.prototype.changeThickness = function() {
      return this.model.changeThickness(this.thicknessSlider.model.get('LineThickness'));
    };

    return CanvasView;

  })(Backbone.View);

}).call(this);
