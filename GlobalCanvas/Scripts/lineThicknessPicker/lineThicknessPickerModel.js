(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.LineThicknessModel = (function(_super) {

    __extends(LineThicknessModel, _super);

    function LineThicknessModel() {
      return LineThicknessModel.__super__.constructor.apply(this, arguments);
    }

    LineThicknessModel.prototype.defaults = {
      LineThickness: 0
    };

    return LineThicknessModel;

  })(Backbone.Model);

}).call(this);
