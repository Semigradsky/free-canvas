$(function () {
    var view = new CanvasView(),
        currentColor = $('#current-color');

    // Initialize color picker
    currentColor.colorpicker({
        hsv: false,
        rgb: false,
        select: function (event, color) {
            currentColor.css('background-color', '#' + color.formatted);
            currentColor.css('color', '#' + color.formatted);
        },
        close: function (event, color) {
            $('#palette li').removeClass('active');
            view.changeColor('#' + color.formatted);
        }
    });

    $('#palette li').on('click', function () {
        $('#palette li').removeClass('active');
        $(this).addClass('active');
        
        var color = $(this).css('background-color');
        view.changeColor(color);
        currentColor.colorpicker("setColor", color);
    });
});