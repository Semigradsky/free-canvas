(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ColorPickerView = (function(_super) {

    __extends(ColorPickerView, _super);

    function ColorPickerView() {
      return ColorPickerView.__super__.constructor.apply(this, arguments);
    }

    ColorPickerView.prototype.picker = [];

    ColorPickerView.prototype.pickerView = [];

    ColorPickerView.prototype.defaultColors = ['black', 'white', 'gray', 'silver', 'navy', 'blue', 'teal', 'aqua', 'green', 'lime', 'olive', 'yellow', 'purple', 'fuchsia', 'maroon', 'red'];

    ColorPickerView.prototype.initialize = function() {
      $(this.el).off();
      _.bindAll(this);
      this.model.view = this;
      return this.model.bind('change', this.update);
    };

    ColorPickerView.prototype.events = {
      'click .palette li': 'pickColor'
    };

    ColorPickerView.prototype.pickColor = function(e) {
      var activeColor, color;
      $('.palette li').removeClass('active');
      activeColor = $(e.currentTarget);
      $(activeColor).addClass('active');
      color = $(activeColor).css('background-color');
      return $(this.picker).colorpicker('setColor', color);
    };

    ColorPickerView.prototype.setColor = function(color) {
      return $(this.picker).colorpicker('setColor', color);
    };

    ColorPickerView.prototype.update = function() {
      var color;
      color = this.model.get('Color');
      $(this.picker).css('background-color', color);
      $(this.picker).css('color', color);
      return console.log('ColorPicker update: ' + color);
    };

    ColorPickerView.prototype.render = function() {
      var palette,
        _this = this;
      $(this.el).append('<input type=text class="current-color"></input>');
      this.picker = $('.current-color');
      $(this.el).append('<ul class="palette"></ul>');
      palette = $(this.el).find('ul.palette');
      _.each(this.defaultColors, function(color) {
        return palette.append('<li style="background-color:' + color + '"></li>');
      });
      return $(this.picker).colorpicker({
        hsv: false,
        rgb: false,
        select: function(event, color) {
          return _this.model.set({
            Color: '#' + color.formatted
          });
        },
        close: function(event, color) {
          $('.palette li').removeClass('active');
          return _this.model.set({
            Color: '#' + color.formatted
          });
        }
      });
    };

    return ColorPickerView;

  })(Backbone.View);

}).call(this);
