(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.CanvasModel = (function(_super) {

    __extends(CanvasModel, _super);

    function CanvasModel() {
      return CanvasModel.__super__.constructor.apply(this, arguments);
    }

    CanvasModel.prototype.defaults = {
      drawingLineModel: {
        FromPoint: {
          X: 0,
          Y: 0
        },
        ToPoint: {
          X: 0,
          Y: 0
        },
        LineWidth: 0,
        LineType: 'circle',
        LineColor: ''
      }
    };

    CanvasModel.prototype.changeToPoint = function(point) {
      var newModel;
      newModel = this.get('drawingLineModel');
      newModel.ToPoint = {
        X: point.X,
        Y: point.Y
      };
      return this.set('drawingLineModel', newModel);
    };

    CanvasModel.prototype.changeFromPoint = function(point) {
      var newModel;
      newModel = this.get('drawingLineModel');
      newModel.FromPoint = {
        X: point.X,
        Y: point.Y
      };
      return this.set('drawingLineModel', newModel);
    };

    CanvasModel.prototype.changeThickness = function(newThickness) {
      var newModel;
      newModel = this.get('drawingLineModel');
      newModel.LineWidth = newThickness;
      return this.set('drawingLineModel', newModel);
    };

    CanvasModel.prototype.changeColor = function(newColor) {
      var newModel;
      newModel = this.get('drawingLineModel');
      newModel.LineColor = newColor;
      return this.set('drawingLineModel', newModel);
    };

    return CanvasModel;

  })(Backbone.Model);

}).call(this);
