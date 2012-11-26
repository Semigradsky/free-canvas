namespace GlobalCanvas.Infrastructure
{
    public class Drawing
    {
        //public double FromXPoint { get; set; }

        //public double FromYPoint { get; set; }

        //public double ToXPoint { get; set; }

        //public double ToYPoint { get; set; }

        public Point FromPoint { get; set; }

        public Point ToPoint { get; set; }
    }

    public struct Point
    {
        public double X { get; set; }

        public double Y { get; set; }
    }
}