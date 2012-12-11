(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.PaletteView = (function(_super) {

    __extends(PaletteView, _super);

    function PaletteView() {
      return PaletteView.__super__.constructor.apply(this, arguments);
    }

    PaletteView.prototype.model = new PaletteModel();

    PaletteView.prototype.initialize = function() {
      this.$el.off();
      _.bindAll(this);
      this.model.view = this;
      return this.model.bind('change:models', this.update);
    };

    PaletteView.prototype.events = {
      'click .palette li': 'pickColor'
    };

    PaletteView.prototype.pickColor = function(e) {
      var $activeColor, color;
      $('.palette li').removeClass('active');
      $activeColor = $(e.currentTarget);
      $activeColor.addClass('active');
      color = $activeColor.css('background-color');
      return this.model.set('activeColor', color);
    };

    PaletteView.prototype.update = function() {
      return console.log('Update palette');
    };

    PaletteView.prototype.render = function() {
      var i,
        _this = this;
      i = 0;
      return _.each(this.model.get('colors').first, function(color) {
        var $color, $picker;
        _this.$el.append("<li data-id='" + i + "' style='background-color:" + color + "'></li>");
        _this.$el.append("<input data-id='" + i + "' value='" + color + "' type=text style='height: 0; width: 0; margin: 0; padding: 0; border: none; float: left'></input>");
        $color = _this.$el.find("li[data-id=" + i + "]");
        $picker = _this.$el.find("input[data-id=" + i + "]");
        $color.on('click', function(e) {
          if (e.shiftKey) {
            return $picker.colorpicker('open');
          }
        });
        $picker.colorpicker({
          hsv: false,
          rgb: false,
          close: function(event, color) {
            var colors;
            colors = _this.model.get('colors');
            colors.first[$picker.attr('data-id')] = color.formatted;
            $color.css('background-color', '#' + color.formatted);
            return _this.model.set('colors', colors);
          }
        });
        return i++;
      });
    };

    return PaletteView;

  })(Backbone.View);

}).call(this);
