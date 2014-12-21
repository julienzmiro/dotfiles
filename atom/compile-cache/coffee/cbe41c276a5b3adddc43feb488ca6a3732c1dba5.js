(function() {
  var AtomGistView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;

  module.exports = AtomGistView = (function(_super) {
    __extends(AtomGistView, _super);

    function AtomGistView() {
      return AtomGistView.__super__.constructor.apply(this, arguments);
    }

    AtomGistView.content = function() {
      return this.div({
        "class": 'atom-gist overlay from-top'
      }, (function(_this) {
        return function() {
          return _this.div("The AtomGist package is Alive! It's ALIVE!", {
            "class": "message"
          });
        };
      })(this));
    };

    AtomGistView.prototype.initialize = function(serializeState) {
      return atom.workspaceView.command("atom-gist:toggle", (function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this));
    };

    AtomGistView.prototype.serialize = function() {};

    AtomGistView.prototype.destroy = function() {
      return this.detach();
    };

    AtomGistView.prototype.toggle = function() {
      console.log("AtomGistView was toggled!");
      if (this.hasParent()) {
        return this.detach();
      } else {
        return atom.workspaceView.append(this);
      }
    };

    return AtomGistView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxNQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLG1DQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLFlBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLDRCQUFQO09BQUwsRUFBMEMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDeEMsS0FBQyxDQUFBLEdBQUQsQ0FBSyw0Q0FBTCxFQUFtRDtBQUFBLFlBQUEsT0FBQSxFQUFPLFNBQVA7V0FBbkQsRUFEd0M7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUExQyxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLDJCQUlBLFVBQUEsR0FBWSxTQUFDLGNBQUQsR0FBQTthQUNWLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIsa0JBQTNCLEVBQStDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQUcsS0FBQyxDQUFBLE1BQUQsQ0FBQSxFQUFIO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBL0MsRUFEVTtJQUFBLENBSlosQ0FBQTs7QUFBQSwyQkFRQSxTQUFBLEdBQVcsU0FBQSxHQUFBLENBUlgsQ0FBQTs7QUFBQSwyQkFXQSxPQUFBLEdBQVMsU0FBQSxHQUFBO2FBQ1AsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQURPO0lBQUEsQ0FYVCxDQUFBOztBQUFBLDJCQWNBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDTixNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksMkJBQVosQ0FBQSxDQUFBO0FBQ0EsTUFBQSxJQUFHLElBQUMsQ0FBQSxTQUFELENBQUEsQ0FBSDtlQUNFLElBQUMsQ0FBQSxNQUFELENBQUEsRUFERjtPQUFBLE1BQUE7ZUFHRSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQW5CLENBQTBCLElBQTFCLEVBSEY7T0FGTTtJQUFBLENBZFIsQ0FBQTs7d0JBQUE7O0tBRHlCLEtBSDNCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/julien/.atom/packages/atom-gist/lib/atom-gist-view.coffee