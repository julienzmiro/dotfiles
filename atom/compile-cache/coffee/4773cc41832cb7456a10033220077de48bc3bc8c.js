(function() {
  var Gist, https;

  https = require('https');

  module.exports = Gist = (function() {
    function Gist() {
      this["public"] = true;
      this.description = '';
      this.files = {};
    }

    Gist.prototype.create = function(cb) {
      var options, request;
      options = {
        hostname: 'api.github.com',
        path: '/gists',
        method: 'POST',
        headers: {
          'User-Agent': "Atom"
        }
      };
      request = https.request(options, function(response) {
        var body;
        response.setEncoding('utf8');
        body = '';
        response.on('data', function(data) {
          return body += data;
        });
        return response.on('end', function() {
          return cb(JSON.parse(body));
        });
      });
      request.write(JSON.stringify(this));
      return request.end();
    };

    return Gist;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFdBQUE7O0FBQUEsRUFBQSxLQUFBLEdBQVEsT0FBQSxDQUFRLE9BQVIsQ0FBUixDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDUTtBQUVTLElBQUEsY0FBQSxHQUFBO0FBQ1gsTUFBQSxJQUFDLENBQUEsUUFBQSxDQUFELEdBQVUsSUFBVixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsV0FBRCxHQUFlLEVBRGYsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLEtBQUQsR0FBUyxFQUZULENBRFc7SUFBQSxDQUFiOztBQUFBLG1CQUtBLE1BQUEsR0FBUSxTQUFDLEVBQUQsR0FBQTtBQUNOLFVBQUEsZ0JBQUE7QUFBQSxNQUFBLE9BQUEsR0FDRTtBQUFBLFFBQUEsUUFBQSxFQUFVLGdCQUFWO0FBQUEsUUFDQSxJQUFBLEVBQU0sUUFETjtBQUFBLFFBRUEsTUFBQSxFQUFRLE1BRlI7QUFBQSxRQUdBLE9BQUEsRUFDRTtBQUFBLFVBQUEsWUFBQSxFQUFjLE1BQWQ7U0FKRjtPQURGLENBQUE7QUFBQSxNQU9BLE9BQUEsR0FBVSxLQUFLLENBQUMsT0FBTixDQUFjLE9BQWQsRUFBdUIsU0FBQyxRQUFELEdBQUE7QUFDL0IsWUFBQSxJQUFBO0FBQUEsUUFBQSxRQUFRLENBQUMsV0FBVCxDQUFxQixNQUFyQixDQUFBLENBQUE7QUFBQSxRQUNBLElBQUEsR0FBTyxFQURQLENBQUE7QUFBQSxRQUdBLFFBQVEsQ0FBQyxFQUFULENBQVksTUFBWixFQUFvQixTQUFDLElBQUQsR0FBQTtpQkFDbEIsSUFBQSxJQUFRLEtBRFU7UUFBQSxDQUFwQixDQUhBLENBQUE7ZUFLQSxRQUFRLENBQUMsRUFBVCxDQUFZLEtBQVosRUFBbUIsU0FBQSxHQUFBO2lCQUNqQixFQUFBLENBQUcsSUFBSSxDQUFDLEtBQUwsQ0FBVyxJQUFYLENBQUgsRUFEaUI7UUFBQSxDQUFuQixFQU4rQjtNQUFBLENBQXZCLENBUFYsQ0FBQTtBQUFBLE1BZ0JBLE9BQU8sQ0FBQyxLQUFSLENBQWMsSUFBSSxDQUFDLFNBQUwsQ0FBZSxJQUFmLENBQWQsQ0FoQkEsQ0FBQTthQWlCQSxPQUFPLENBQUMsR0FBUixDQUFBLEVBbEJNO0lBQUEsQ0FMUixDQUFBOztnQkFBQTs7TUFMSixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/julien/.atom/packages/atom-gist/lib/gist.coffee