var CanvasModel = Backbone.Model.extend({
   defaults: {
       fromPointX: 0,
       fromPointY: 0,
       toPointX: 0,
       toPointY: 0,
       fromPoint: {
           X: 0,
           Y:0
       },
       toPoint: {
           X: 0,
           Y: 0
       }
   },
   //parse: function (response) {
   //    var attrs = {};
   //    attrs.fromPoint = response.FromPoint;
   //    attrs.toPoint = response.ToPoint;
   //    return attrs;
   //}
});