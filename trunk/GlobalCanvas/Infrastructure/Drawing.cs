namespace GlobalCanvas.Infrastructure
{
    public class Drawing
    {
        public Point FromPoint { get; set; }

        public Point ToPoint { get; set; }

        public int LineWidth { get; set; }

        public string LineJoin { get; set; }
    }

    public struct Point
    {
        public double X { get; set; }

        public double Y { get; set; }
    }
}