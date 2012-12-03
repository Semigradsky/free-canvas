var ColorPickerView = Backbone.View.extend({
    el: $('.vertical-left-toolbar'),
    picker: $('#current-color'),
    colorModel: new ColorPickerModel(),
    initialize: function () {
        var view = this;
        $(view.el).off();
        _.bindAll(view);
        this.colorModel.view = this;
        this.colorModel.bind('change', this.render);
        $(this.picker).colorpicker({
            hsv: false,
            rgb: false,
            select: function (event, color) {
                $(view.picker).css('background-color', '#' + color.formatted);
                $(view.picker).css('color', '#' + color.formatted);
            },
            close: function (event, color) {
                $('#palette li').removeClass('active');
                view.colorModel.set({
                    Color: view.picker.css('background-color')
                });
            }
        });
    },
    events: {
        'click #palette li': 'pickColor'
    },
    pickColor: function (e) {
        $('#palette li').removeClass('active');
        
        var activeColor = $(e.currentTarget);
        $(activeColor).addClass('active');
        var color = $(activeColor).css('background-color');
        this.colorModel.set({
           Color: color 
        });
       
    },
    render: function () {
        $(this.picker).colorpicker('setColor', this.colorModel.get('Color'));
    }
});