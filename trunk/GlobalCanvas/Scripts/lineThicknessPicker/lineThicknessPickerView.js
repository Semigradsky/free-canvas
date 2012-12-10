(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.LineThicknessView = (function(_super) {

    __extends(LineThicknessView, _super);

    function LineThicknessView() {
      return LineThicknessView.__super__.constructor.apply(this, arguments);
    }

    LineThicknessView.prototype.slider = null;

    LineThicknessView.prototype.circle = null;

    LineThicknessView.prototype.initialize = function() {
      $(this.el).off();
      _.bindAll(this);
      this.model.view = this;
      return this.model.bind('change', this.update);
    };

    LineThicknessView.prototype.setThickness = function(thickness) {
      $(this.slider).slider('value', thickness);
      return this.model.set({
        LineThickness: thickness
      });
    };

    LineThicknessView.prototype.update = function() {
      var thickness;
      thickness = this.model.get('LineThickness');
      $(this.circle).css('margin-top', 20 - thickness / 2).css('margin-left', 20 - thickness / 2).css('width', thickness).css('height', thickness).css('border-radius', thickness / 2);
      return console.log('LineThicknessPicker update: ' + thickness);
    };

    LineThicknessView.prototype.changeColor = function(colorPickerModel) {
      var color;
      color = colorPickerModel.get('Color');
      return $(this.circle).css('background', color);
    };

    LineThicknessView.prototype.render = function() {
      var _this = this;
      $(this.el).append('<div class="line-thickness-view"><div class="circle"></div></div>');
      this.circle = $(this.el).find('.circle');
      $(this.el).append('<div class="thickness-picker"></div>');
      this.slider = $(this.el).find('.thickness-picker');
      return $(this.slider).slider({
        min: 1,
        max: 40,
        slide: function(event, ui) {
          return _this.setThickness(ui.value);
        }
      });
    };

    return LineThicknessView;

  })(Backbone.View);

}).call(this);
