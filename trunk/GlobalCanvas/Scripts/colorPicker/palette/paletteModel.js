(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.PaletteModel = (function(_super) {

    __extends(PaletteModel, _super);

    function PaletteModel() {
      return PaletteModel.__super__.constructor.apply(this, arguments);
    }

    PaletteModel.prototype.defaults = {
      activeColor: '',
      colors: {
        first: ['black', 'white', 'gray', 'silver', 'navy', 'blue', 'teal', 'aqua', 'green', 'lime', 'olive', 'yellow', 'purple', 'fuchsia', 'maroon', 'red'],
        second: ['gray', 'silver', 'navy', 'blue', 'teal', 'aqua', 'black', 'white', 'green', 'lime', 'olive', 'yellow', 'purple', 'fuchsia', 'maroon', 'red'],
        third: ['black', 'white', 'gray', 'silver', 'navy', 'blue', 'purple', 'fuchsia', 'teal', 'aqua', 'green', 'lime', 'olive', 'yellow', 'maroon', 'red'],
        fourth: ['purple', 'fuchsia', 'black', 'white', 'gray', 'silver', 'navy', 'blue', 'teal', 'aqua', 'green', 'lime', 'olive', 'yellow', 'maroon', 'red']
      }
    };

    return PaletteModel;

  })(Backbone.Model);

}).call(this);
