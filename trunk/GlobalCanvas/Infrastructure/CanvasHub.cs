using Microsoft.AspNet.SignalR.Hubs;

namespace GlobalCanvas.Infrastructure
{
    [HubName("canvas")]
    public class CanvasHub : Hub
    {
        private readonly Canvas _canvas;

        public CanvasHub() : this(Canvas.Instance) { }

        public CanvasHub(Canvas canvas)
        {
            _canvas = canvas;
        }

        public void DrawLine(Drawing drawing)
        {
            _canvas.DrawLine(drawing);
        }
    }
}