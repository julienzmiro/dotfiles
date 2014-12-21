(function() {
  var AtomGistView, Gist;

  AtomGistView = require('./atom-gist-view');

  Gist = require('./gist');

  module.exports = {
    atomGistView: null,
    initialize: function() {
      return this.gist = null;
    },
    activate: function(state) {
      return atom.workspaceView.command("atom-gist:toggle", (function(_this) {
        return function() {
          return _this.gistFile();
        };
      })(this));
    },
    gistFile: function() {
      var activeItem, _ref;
      this.gist = new Gist;
      activeItem = atom.workspace.activePane.activeItem;
      if ((_ref = atom.workspaceView.statusBar) != null) {
        _ref.appendLeft('<span class="gist-message">Creating gist...</span>');
      }
      this.gist.files[activeItem.getTitle()] = {
        content: activeItem.getText()
      };
      return this.gist.create((function(_this) {
        return function(response) {
          var _ref1;
          return (_ref1 = atom.workspaceView.statusBar) != null ? _ref1.find('.gist-message').html("Gist created at " + response.html_url) : void 0;
        };
      })(this));
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtCQUFBOztBQUFBLEVBQUEsWUFBQSxHQUFlLE9BQUEsQ0FBUSxrQkFBUixDQUFmLENBQUE7O0FBQUEsRUFDQSxJQUFBLEdBQU8sT0FBQSxDQUFRLFFBQVIsQ0FEUCxDQUFBOztBQUFBLEVBR0EsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsWUFBQSxFQUFjLElBQWQ7QUFBQSxJQUVBLFVBQUEsRUFBWSxTQUFBLEdBQUE7YUFDVixJQUFDLENBQUEsSUFBRCxHQUFRLEtBREU7SUFBQSxDQUZaO0FBQUEsSUFLQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7YUFDUixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLGtCQUEzQixFQUErQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUFHLEtBQUMsQ0FBQSxRQUFELENBQUEsRUFBSDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQS9DLEVBRFE7SUFBQSxDQUxWO0FBQUEsSUFRQSxRQUFBLEVBQVUsU0FBQSxHQUFBO0FBQ1IsVUFBQSxnQkFBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLElBQUQsR0FBUSxHQUFBLENBQUEsSUFBUixDQUFBO0FBQUEsTUFDQSxVQUFBLEdBQWEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsVUFEdkMsQ0FBQTs7WUFFNEIsQ0FBRSxVQUE5QixDQUF5QyxvREFBekM7T0FGQTtBQUFBLE1BSUEsSUFBQyxDQUFBLElBQUksQ0FBQyxLQUFNLENBQUEsVUFBVSxDQUFDLFFBQVgsQ0FBQSxDQUFBLENBQVosR0FDQztBQUFBLFFBQUEsT0FBQSxFQUFTLFVBQVUsQ0FBQyxPQUFYLENBQUEsQ0FBVDtPQUxELENBQUE7YUFPQSxJQUFDLENBQUEsSUFBSSxDQUFDLE1BQU4sQ0FBYSxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxRQUFELEdBQUE7QUFDVCxjQUFBLEtBQUE7dUVBQTRCLENBQUUsSUFBOUIsQ0FBbUMsZUFBbkMsQ0FBbUQsQ0FBQyxJQUFwRCxDQUF5RCxrQkFBQSxHQUFxQixRQUFRLENBQUMsUUFBdkYsV0FEUztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWIsRUFSUTtJQUFBLENBUlY7R0FKRixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/julien/.atom/packages/atom-gist/lib/atom-gist.coffee