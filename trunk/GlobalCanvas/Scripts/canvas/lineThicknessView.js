var LineThicknessView = Backbone.View.extend({
    slider: [],
    circle: [],

    initialize: function() {
        var view = this;
        $(view.el).off();
        _.bindAll(view);
        this.model.view = this;
        this.model.bind('change', this.update);
    },
    
    setThickness: function (thickness) {
        var view = this;
        $(view.slider).slider('value', thickness);
        view.model.set({ LineThickness: thickness });
    },
    
    update: function () {
        var view = this;
        var thickness = view.model.get('LineThickness');
        $(view.circle).css('margin-top', 20 - thickness / 2);
        $(view.circle).css('margin-left', 20 - thickness / 2);
        $(view.circle).css('width', thickness);
        $(view.circle).css('height', thickness);
        $(view.circle).css('border-radius', thickness / 2);
        console.log('LineThicknessPicker update: ' + thickness);
    },
    
    changeColor: function (colorPickerModel) {
        var color = colorPickerModel.get('Color');
        $(this.circle).css('background', color);
    },
    
    render: function () {
        var view = this;
        
        // added thickness view
        $(view.el).append('<div class="line-thickness-view"><div class="circle"></div></div>');
        view.circle = $(view.el).find('.circle');
        
        // added slider
        $(view.el).append('<div class="thickness-picker"></div>');
        view.slider = $(view.el).find('.thickness-picker');

        // init slider
        $(view.slider).slider({
            min: 1,
            max: 40,
            slide: function (event, ui) {
                view.setThickness(ui.value);
            }
        });
    }
})