var ColorPickerView = Backbone.View.extend({
    picker: [],
    pickerView: [],
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
        this.model.view = this;
        this.model.bind('change', this.update);
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
        var color = view.model.get('Color');
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
                view.model.set({
                    Color: '#' + color.formatted
                });
            },
            close: function (event, color) {
                $('.palette li').removeClass('active');
                view.model.set({
                    Color: '#' + color.formatted
                });
            }
        });
    }
});