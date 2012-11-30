var ColorPicker = function() {
    var colorPicker = $('#current-color');

    var initializeColorPicker = function () {
        colorPicker.colorpicker({
            hsv: false,
            rgb: false,
            select: function (event, color) {
                colorPicker.css('background-color', '#' + color.formatted);
                colorPicker.css('color', '#' + color.formatted);
                LineThicknessPicker.setCircleColor('#' + color.formatted);
            },
            close: function (event, color) {
                $('#palette li').removeClass('active');
                view.changeColor('#' + color.formatted);
                LineThicknessPicker.setCircleColor('#' + color.formatted);
            }
        });

        $('#palette li').on('click', function () {
            $('#palette li').removeClass('active');
            $(this).addClass('active');

            var color = $(this).css('background-color');
            LineThicknessPicker.setCircleColor(color);
            setColor(color);
        });
    };

    var setColor = function(color) {
        colorPicker.colorpicker("setColor", color);
        view.changeColor(color);
    };

    return {
        initialize: initializeColorPicker,
        setColor: setColor
    };
}();

var LineThicknessPicker = function() {
    var lineThicknessPicker = $('#line-thickness-picker'),
        lineThicknessCircle = $('#line-thickness-view .circle');

    var initializeThicknessPicker = function () {
        if (!Modernizr.inputtypes.range) {
            alert('go away! switch to chrome');
            //lineThicknessPicker.slider();
        } else {
            lineThicknessPicker.on('change', function () {
                var lineThickness = lineThicknessPicker.val();
                setThickness(lineThickness);
            });
        }
    };

    var setThickness = function(thickness) {
        lineThicknessPicker.val(thickness);
        lineThicknessCircle.css('margin-top', 20 - thickness / 2);
        lineThicknessCircle.css('margin-left', 20 - thickness / 2);
        lineThicknessCircle.css('width', thickness);
        lineThicknessCircle.css('height', thickness);
        lineThicknessCircle.css('border-radius', thickness / 2);
        view.changeThickness(thickness);
    };

    var setCircleColor = function(color) {
        lineThicknessCircle.css('background-color', color);
    };

    return {
        initialize: initializeThicknessPicker,
        setThickness: setThickness,
        setCircleColor: setCircleColor
    };
}();

var view = new CanvasView();

$(function () {
    ColorPicker.initialize();
    LineThicknessPicker.initialize();

    var color = 'green',
        lineThickness = 10;

    
    ColorPicker.setColor(color);
    LineThicknessPicker.setThickness(lineThickness);
});