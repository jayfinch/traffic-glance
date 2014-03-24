define (require) ->
  TrafficModel = require('models/traffic-model')

  describe 'TrafficModel', ->
    beforeEach ->
      @sandbox = sinon.sandbox.create()
    afterEach ->
      @sandbox.restore()

    describe 'TrafficModel', ->

      describe 'url', ->
        it 'should return hours', ->
          trafficModel = new TrafficModel coords:[
            {
              coordLat: '44.444'
              coordLong: '-99.999'
              type: 'wp'
            },
            {
              coordLat: '44.445'
              coordLong: '-99.998'
              type: 'vwp'
            },
            {
              coordLat: '44.446'
              coordLong: '-99.997'
              type: 'wp'
            },
            {
              coordLat: '44.447'
              coordLong: '-99.996'
              type: 'vwp'
            },
            {
              coordLat: '44.448'
              coordLong: '-99.995'
              type: 'wp'
            }
          ]

          url = trafficModel.url()
          expectedUrl = 'http://dev.virtualearth.net/REST/V1/Routes/Driving?&distanceUnit=mi&wp.0=44.444,-99.999&vwp.1=44.445,-99.998&wp.2=44.446,-99.997&vwp.3=44.447,-99.996&wp.4=44.448,-99.995&key=no-key-defined'
          expect(url).to.equal(expectedUrl)


      describe 'formatResults', ->
        it 'should return hours', ->
          trafficModel = new TrafficModel resourceSets: [
            resources: [
              travelDurationTraffic: 6000
            ]
          ]

          results = trafficModel.formatResults()
          expect(results.travelDurationStats.hours).to.equal(1)
          expect(results.travelDurationStats.minutes).to.equal(40)

        it 'should return hours + minutes', ->
          trafficModel = new TrafficModel resourceSets: [
            resources: [
              travelDurationTraffic: 600
            ]
          ]

          results = trafficModel.formatResults()
          expect(results.travelDurationStats.hours).to.equal(0)
          expect(results.travelDurationStats.minutes).to.equal(10)

        it 'should return distance', ->
          trafficModel = new TrafficModel resourceSets: [
            resources: [
              travelDistance: 10
            ]
          ]

          results = trafficModel.formatResults()
          expect(results.travelDurationStats.distance).to.equal(10)

        it 'should return arrival time', ->
          clock = @sandbox.useFakeTimers(1395625613967) # 8:46 pm

          trafficModel = new TrafficModel resourceSets: [
            resources: [
              travelDurationTraffic: 60
            ]
          ]

          results = trafficModel.formatResults()
          expect(results.travelDurationStats.arriveTime).to.equal('8:47 pm')

        it 'should return incident warnings', ->
          trafficModel = new TrafficModel resourceSets: [
            resources: [
              routeLegs: [
                {
                  itineraryItems: [
                    warnings: [
                      warningType: 'Accident'
                      text: 'Fake accident'
                    ]
                  ]
                },
                {
                  itineraryItems: [
                    {
                      warnings: [
                        warningType: 'Accident'
                        text: 'Fake accident 2'
                      ]
                    },
                    {
                      warnings: [
                        warningType: 'Accident'
                        text: 'Fake accident 3'
                      ]
                    }
                  ]
                }
              ]
            ]
          ]

          results = trafficModel.formatResults()
          expect(results.travelWarnings[0]).to.equal('Fake accident')
          expect(results.travelWarnings[1]).to.equal('Fake accident 2')
          expect(results.travelWarnings[2]).to.equal('Fake accident 3')

        it 'should not repeat incident warnings', ->
          trafficModel = new TrafficModel resourceSets: [
            resources: [
              routeLegs: [
                {
                  itineraryItems: [
                    warnings: [
                      warningType: 'Accident'
                      text: 'Fake accident'
                    ]
                  ]
                },
                {
                  itineraryItems: [
                    {
                      warnings: [
                        warningType: 'Accident'
                        text: 'Fake accident'
                      ]
                    },
                    {
                      warnings: [
                        warningType: 'Accident'
                        text: 'Other fake accident'
                      ]
                    }
                  ]
                }
              ]
            ]
          ]

          results = trafficModel.formatResults()
          expect(results.travelWarnings[0]).to.equal('Fake accident')
          expect(results.travelWarnings[1]).to.equal('Other fake accident')

        it 'should return congestion', ->
          trafficModel = new TrafficModel resourceSets: [
            resources: [
              routeLegs: [
                {
                  itineraryItems: [
                    {
                      travelDistance: 1
                      warnings: [
                        warningType: 'TrafficFlow'
                        severity: 'Minor'
                      ]
                    },
                    {
                      travelDistance: 1
                      warnings: [
                        warningType: 'TrafficFlow'
                        severity: 'Low Impact'
                      ]
                    }
                  ]
                },
                {
                  itineraryItems: [
                    {
                      travelDistance: 3
                      warnings: [
                        warningType: 'TrafficFlow'
                        severity: 'Moderate'
                      ]
                    },
                    {
                      travelDistance: 4
                      warnings: [
                        warningType: 'TrafficFlow'
                        severity: 'Serious'
                      ]
                    },
                    {
                      travelDistance: 5
                    }
                  ]
                }
              ]
            ]
          ]

          results = trafficModel.formatResults().travelDurationByCongestion

          expect(results.noCongestion).to.equal(5)
          expect(results.lowCongestion).to.equal(2)
          expect(results.moderateCongestion).to.equal(3)
          expect(results.seriousCongestion).to.equal(4)
