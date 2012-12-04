var LineThicknessView = Backbone.View.extend({
    el: $('.horizontal-toolbar'),
    slider: $('#line-thickness-picker'),
    circle: $('#line-thickness-view .circle'),
    lineThicknessModel: new LineThicknessModel(),

    initialize: function() {
        var view = this;
        $(view.el).off();
        _.bindAll(view);
        this.lineThicknessModel.view = this;
        this.lineThicknessModel.bind('change', this.update);
    },
    
    setThickness: function (thickness) {
        var view = this;
        $(view.slider).slider('value', thickness);
        view.lineThicknessModel.set({ LineThickness: thickness });
    },
    
    update: function () {
        var view = this;
        var thickness = view.lineThicknessModel.get('LineThickness');
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
        $(view.slider).slider({
            min: 1,
            max: 40,
            slide: function (event, ui) {
                view.setThickness(ui.value);
            }
        });
    }
})