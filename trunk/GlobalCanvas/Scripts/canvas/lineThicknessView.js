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
        $(view.slider).slider({
            min: 1,
            max: 40,
            slide: function(event, ui) {
                $(view.circle).css('margin-top', 20 - ui.value / 2);
                $(view.circle).css('margin-left', 20 - ui.value / 2);
                $(view.circle).css('width', ui.value);
                $(view.circle).css('height', ui.value);
                $(view.circle).css('border-radius', ui.value / 2);
                view.lineThicknessModel.set({
                    LineThickness: ui.value
                });
            }
        });
    }
})