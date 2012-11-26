using System;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace GlobalCanvas.Infrastructure
{
    public class Canvas
    {
        private readonly static Lazy<Canvas> _instance = new Lazy<Canvas>(() => new Canvas());
        private readonly Lazy<IHubConnectionContext> _clientsInstance =
            new Lazy<IHubConnectionContext>(() => GlobalHost.ConnectionManager.GetHubContext<CanvasHub>().Clients);

        private IHubConnectionContext Clients
        {
            get { return _clientsInstance.Value; }
        }

        public static Canvas Instance
        {
            get
            {
                return _instance.Value;
            }
        }

        public void DrawLine(Drawing drawing)
        {
            Clients.All.drawLine(drawing);
        }
    }
}