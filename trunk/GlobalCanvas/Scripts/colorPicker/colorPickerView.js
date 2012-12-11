(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ColorPickerView = (function(_super) {

    __extends(ColorPickerView, _super);

    function ColorPickerView() {
      return ColorPickerView.__super__.constructor.apply(this, arguments);
    }

    ColorPickerView.prototype.$picker = null;

    ColorPickerView.prototype.$inputPicker = null;

    ColorPickerView.prototype.pickerView = null;

    ColorPickerView.prototype.initialize = function() {
      this.$el.off();
      _.bindAll(this);
      this.model.view = this;
      return this.model.bind('change', this.update);
    };

    ColorPickerView.prototype.setColor = function(color) {
      return this.$inputPicker.colorpicker('setColor', color);
    };

    ColorPickerView.prototype.update = function() {
      var color;
      color = this.model.get('Color');
      this.$picker.css('background-color', color);
      this.$picker.css('color', color);
      return console.log('ColorPicker update: ' + color);
    };

    ColorPickerView.prototype.render = function() {
      var _this = this;
      this.$el.append('<input type=text style="height: 0; width: 0; margin: 0; padding: 0; border: none; float: left"></input>');
      this.$inputPicker = this.$el.find('input');
      this.$inputPicker.colorpicker({
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
      this.$el.append('<div class="current-color"></div');
      this.$picker = this.$el.find('div.current-color');
      this.$picker.on('click', function() {
        return _this.$inputPicker.colorpicker('open');
      });
      this.$el.append('<ul class="palette"></ul>');
      this.palette = new PaletteView({
        el: this.$el.find('ul.palette')
      });
      this.palette.render();
      return this.palette.model.bind('change:activeColor', function(paletteModel) {
        return _this.setColor(paletteModel.get('activeColor'));
      });
    };

    return ColorPickerView;

  })(Backbone.View);

}).call(this);
