$(function () {
    var view = new CanvasView();
    //var Canvas = document.getElementById('canvas'),
    //    CanvasContext,
    //    oldXPos,
    //    oldYPos,
    //    mouseIsPressed = false,
    //    connection = $.connection.canvas;

    //if (Canvas.getContext) {
    //    CanvasContext = Canvas.getContext('2d');
    //    Canvas.addEventListener('mousedown', doMouseDown, false);
    //    Canvas.addEventListener('mouseup', doMouseUp, false);
    //    Canvas.addEventListener('mousemove', doMouseMove, false);
    //}

    //function doMouseMove(ev) {
    //    if (!CanvasContext)
    //        return;

    //    if (mouseIsPressed) {
    //        var x = ev.clientX - Canvas.offsetLeft;
    //        var y = ev.clientY - Canvas.offsetTop - 10;

    //        if (oldXPos && oldYPos) {
    //            CanvasContext.beginPath();
    //            CanvasContext.lineWidth = 4;
    //            CanvasContext.lineJoin = 'round';
    //            CanvasContext.moveTo(oldXPos, oldYPos);
    //            CanvasContext.lineTo(x, y);
    //            CanvasContext.stroke();
    //        }

    //        connection.server.drawLine(oldXPos, oldYPos, x, y);

    //        oldXPos = x;
    //        oldYPos = y;
    //    }
    //}

    //$.extend(connection.client, {
    //    drawLine: function (drawing) {
    //        if (!CanvasContext)
    //            return;
            
    //        CanvasContext.beginPath();
    //        CanvasContext.lineWidth = 4;
    //        CanvasContext.lineJoin = 'round';
    //        CanvasContext.moveTo(drawing.FromXPoint, drawing.FromYPoint);
    //        CanvasContext.lineTo(drawing.ToXPoint, drawing.ToYPoint);
    //        CanvasContext.stroke();
    //    },
    //});

    //function doMouseUp() {
    //    mouseIsPressed = false;
    //}
    //function doMouseDown(ev) {
    //    mouseIsPressed = true;

    //    oldXPos = ev.clientX - Canvas.offsetLeft;
    //    oldYPos = ev.clientY - Canvas.offsetTop - 10;
    //}

    //$.connection.hub.start();
});