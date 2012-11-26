var CanvasModel = Backbone.Model.extend({
    defaults: {
        // ToDo: Should be deleted
               fromPointX: 0,
               fromPointY: 0,
               toPointX: 0,
               toPointY: 0,
        //
       
       fromPoint: {
           X: 0,
           Y:0
       },
       toPoint: {
           X: 0,
           Y: 0
       },
       lineWidth: 4,
       lineJoin: 'round'
   },
   //parse: function (response) {
   //    var attrs = {};
   //    attrs.fromPoint = response.FromPoint;
   //    attrs.toPoint = response.ToPoint;
   //    return attrs;
   //}
});