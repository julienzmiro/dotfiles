(function() {
  var HackerNewsView;

  HackerNewsView = require('./hacker-news-view');

  module.exports = {
    hackerNewsView: null,
    activate: function(state) {
      return this.hackerNewsView = new HackerNewsView(state.hackerNewsViewState);
    },
    deactivate: function() {
      return this.hackerNewsView.destroy();
    },
    serialize: function() {
      return {
        hackerNewsViewState: this.hackerNewsView.serialize()
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGNBQUE7O0FBQUEsRUFBQSxjQUFBLEdBQWlCLE9BQUEsQ0FBUSxvQkFBUixDQUFqQixDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsY0FBQSxFQUFnQixJQUFoQjtBQUFBLElBRUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO2FBQ1IsSUFBQyxDQUFBLGNBQUQsR0FBc0IsSUFBQSxjQUFBLENBQWUsS0FBSyxDQUFDLG1CQUFyQixFQURkO0lBQUEsQ0FGVjtBQUFBLElBS0EsVUFBQSxFQUFZLFNBQUEsR0FBQTthQUNWLElBQUMsQ0FBQSxjQUFjLENBQUMsT0FBaEIsQ0FBQSxFQURVO0lBQUEsQ0FMWjtBQUFBLElBUUEsU0FBQSxFQUFXLFNBQUEsR0FBQTthQUNUO0FBQUEsUUFBQSxtQkFBQSxFQUFxQixJQUFDLENBQUEsY0FBYyxDQUFDLFNBQWhCLENBQUEsQ0FBckI7UUFEUztJQUFBLENBUlg7R0FIRixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/julien/.atom/packages/hacker-news/lib/hacker-news.coffee