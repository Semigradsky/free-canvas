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
                view.colorModel.set({
                    Color: '#' + color.formatted
                });
            },
            close: function (event, color) {
                $('#palette li').removeClass('active');
                view.colorModel.set({
                    Color: '#' + color.formatted
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
        $(this.picker).colorpicker('setColor', color);  
    },
    
    setColor: function (color) {
        this.colorModel.set({ Color: color });
    },

    render: function () {
        var view = this;
        var color = view.colorModel.get('Color');
        $(view.picker).css('background-color', color);
        $(view.picker).css('color', color);
        console.log('ColorPicker render: ' + color);
    }
});