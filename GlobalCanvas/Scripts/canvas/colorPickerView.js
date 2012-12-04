var ColorPickerView = Backbone.View.extend({
    el: $('.color-picker'),
    picker: {},
    pickerView: {},
    colorModel: new ColorPickerModel(),
    defaultColors: [
        'black', 'white',
        'gray', 'silver',
        'navy', 'blue',
        'teal', 'aqua',
        'green', 'lime',
        'olive', 'yellow',
        'purple', 'fuchsia',
        'maroon', 'red'
    ],

    initialize: function () {
        var view = this;
        $(view.el).off();
        _.bindAll(view);
        this.colorModel.view = this;
        this.colorModel.bind('change', this.update);
    },
    
    events: {
        'click .palette li': 'pickColor'
    },
    
    pickColor: function (e) {
        $('.palette li').removeClass('active');        
        var activeColor = $(e.currentTarget);
        $(activeColor).addClass('active');
        var color = $(activeColor).css('background-color');
        $(this.picker).colorpicker('setColor', color);
    },
    
    setColor: function (color) {
        $(this.picker).colorpicker('setColor', color);
    },

    update: function () {
        var view = this;
        var color = view.colorModel.get('Color');
        $(view.picker).css('background-color', color);
        $(view.picker).css('color', color);
        console.log('ColorPicker update: ' + color);
    },

    render: function () {
        var view = this;
        
        // added picker
        $(view.el).append('<input type=text class="current-color"></input>');
        view.picker = $('.current-color');

        // added palette
        $(view.el).append('<ul class="palette"></ul>');
        var palette = $(view.el).find('ul.palette');
        _.each(view.defaultColors, function (color) {
            palette.append('<li style="background-color:' + color + '"></li>');
        });

        // init color picker
        $(view.picker).colorpicker({
            hsv: false,
            rgb: false,
            select: function (event, color) {
                view.colorModel.set({
                    Color: '#' + color.formatted
                });
            },
            close: function (event, color) {
                $('.palette li').removeClass('active');
                view.colorModel.set({
                    Color: '#' + color.formatted
                });
            }
        });
    }
});