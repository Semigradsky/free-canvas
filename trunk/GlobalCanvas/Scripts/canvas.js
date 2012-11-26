$(function () {
    $('#current-color').colorpicker({
        hsv: false,
        rgb: false,
        select: function (event, color) {
            $('#current-color').css('background-color', '#' + color.formatted);
            $('#current-color').css('color', '#' + color.formatted);
        },
        close: function (event, color) {
            // ToDo: changed color
        }
    });
    
    var view = new CanvasView();
});