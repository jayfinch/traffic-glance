define(function(require) {
  var TrafficModel = require('models/traffic-model');

  describe('TrafficModel', function() {
    describe('formatResults', function() {
      it('should return hours', function() {
        var trafficModel = new TrafficModel({
          'resourceSets':[{
            'resources':[{
              'travelDurationTraffic': 6000
            }]
          }]
        });

        var results = trafficModel.formatResults();
        expect(results.travelDurationStats.hours).to.equal(1);
        expect(results.travelDurationStats.minutes).to.equal(40);
      });

      it('should return minutes', function() {
        var trafficModel = new TrafficModel({
          'resourceSets':[{
            'resources':[{
              'travelDurationTraffic': 600
            }]
          }]
        });

        var results = trafficModel.formatResults();
        expect(results.travelDurationStats.hours).to.equal(0);
        expect(results.travelDurationStats.minutes).to.equal(10);
      });
    });
  });
});