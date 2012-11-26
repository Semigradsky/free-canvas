using Microsoft.AspNet.SignalR.Hubs;

namespace GlobalCanvas.Infrastructure
{
    using System.Drawing;

    [HubName("canvas")]
    public class CanvasHub : Hub
    {
        private readonly Canvas _canvas;

        public CanvasHub() : this(Canvas.Instance) { }

        public CanvasHub(Canvas canvas)
        {
            _canvas = canvas;
        }

        public void DrawLine(double fromXPoint, double fromYPoint, double toXPoint, double toYPoint)
        {
            //var drawing = new Drawing
            //    { FromXPoint = fromXPoint, FromYPoint = fromYPoint, ToXPoint = toXPoint, ToYPoint = toYPoint };
            var drawing = new Drawing
                {
                    FromPoint = new Point { X = fromXPoint, Y = fromYPoint },
                    ToPoint = new Point { X = toXPoint, Y = toYPoint }
                };
            _canvas.DrawLine(drawing);
        }
    }
}