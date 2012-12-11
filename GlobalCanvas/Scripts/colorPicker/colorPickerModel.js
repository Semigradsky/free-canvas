(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ColorPickerModel = (function(_super) {

    __extends(ColorPickerModel, _super);

    function ColorPickerModel() {
      return ColorPickerModel.__super__.constructor.apply(this, arguments);
    }

    ColorPickerModel.prototype.defaults = {
      Color: ''
    };

    return ColorPickerModel;

  })(Backbone.Model);

}).call(this);
