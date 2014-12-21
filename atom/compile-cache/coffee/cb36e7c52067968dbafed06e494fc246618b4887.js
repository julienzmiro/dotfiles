(function() {
  var Config;

  Config = require('./config');

  module.exports = {
    activate: function() {
      this.defaultSavePrompt = atom.workspace.getActivePane().constructor.prototype.promptToSaveItem;
      return this.addListeners();
    },
    disable: function() {
      return atom.workspace.getActivePane().constructor.prototype.promptToSaveItem = function(item) {
        return true;
      };
    },
    enable: function() {
      return atom.workspace.getActivePane().constructor.prototype.promptToSaveItem = this.defaultSavePrompt;
    },
    enableTemp: function() {
      return atom.workspace.getActivePane().constructor.prototype.promptToSaveItem = (function(_this) {
        return function(item) {
          var save;
          save = _this.defaultSavePrompt(item);
          _this.disable();
          return save;
        };
      })(this);
    },
    addListeners: function() {
      atom.config.observe('save-session.skipSavePrompt', (function(_this) {
        return function(val) {
          if (val) {
            return _this.disable();
          } else {
            return _this.enable();
          }
        };
      })(this));
      return atom.workspace.observePanes((function(_this) {
        return function(pane) {
          return pane.onWillDestroyItem(function(event) {
            if (Config.skipSavePrompt()) {
              return _this.enableTemp();
            }
          });
        };
      })(this));
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLE1BQUE7O0FBQUEsRUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFRLFVBQVIsQ0FBVCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FFRTtBQUFBLElBQUEsUUFBQSxFQUFVLFNBQUEsR0FBQTtBQUNSLE1BQUEsSUFBQyxDQUFBLGlCQUFELEdBQXFCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBZixDQUFBLENBQThCLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxnQkFBMUUsQ0FBQTthQUNBLElBQUMsQ0FBQSxZQUFELENBQUEsRUFGUTtJQUFBLENBQVY7QUFBQSxJQU9BLE9BQUEsRUFBUyxTQUFBLEdBQUE7YUFDUCxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWYsQ0FBQSxDQUE4QixDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsZ0JBQXJELEdBQXdFLFNBQUMsSUFBRCxHQUFBO0FBQ3RFLGVBQU8sSUFBUCxDQURzRTtNQUFBLEVBRGpFO0lBQUEsQ0FQVDtBQUFBLElBV0EsTUFBQSxFQUFRLFNBQUEsR0FBQTthQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBZixDQUFBLENBQThCLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxnQkFBckQsR0FBd0UsSUFBQyxDQUFBLGtCQURuRTtJQUFBLENBWFI7QUFBQSxJQWNBLFVBQUEsRUFBWSxTQUFBLEdBQUE7YUFDVixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWYsQ0FBQSxDQUE4QixDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsZ0JBQXJELEdBQXdFLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLElBQUQsR0FBQTtBQUN0RSxjQUFBLElBQUE7QUFBQSxVQUFBLElBQUEsR0FBTyxLQUFDLENBQUEsaUJBQUQsQ0FBbUIsSUFBbkIsQ0FBUCxDQUFBO0FBQUEsVUFDQSxLQUFDLENBQUEsT0FBRCxDQUFBLENBREEsQ0FBQTtpQkFFQSxLQUhzRTtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLEVBRDlEO0lBQUEsQ0FkWjtBQUFBLElBb0JBLFlBQUEsRUFBYyxTQUFBLEdBQUE7QUFDWixNQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBWixDQUFvQiw2QkFBcEIsRUFBbUQsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsR0FBRCxHQUFBO0FBQ2pELFVBQUEsSUFBRyxHQUFIO21CQUNFLEtBQUMsQ0FBQSxPQUFELENBQUEsRUFERjtXQUFBLE1BQUE7bUJBR0UsS0FBQyxDQUFBLE1BQUQsQ0FBQSxFQUhGO1dBRGlEO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbkQsQ0FBQSxDQUFBO2FBT0EsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFmLENBQTRCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLElBQUQsR0FBQTtpQkFDMUIsSUFBSSxDQUFDLGlCQUFMLENBQXVCLFNBQUMsS0FBRCxHQUFBO0FBQ3JCLFlBQUEsSUFBRyxNQUFNLENBQUMsY0FBUCxDQUFBLENBQUg7cUJBQ0UsS0FBQyxDQUFBLFVBQUQsQ0FBQSxFQURGO2FBRHFCO1VBQUEsQ0FBdkIsRUFEMEI7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUE1QixFQVJZO0lBQUEsQ0FwQmQ7R0FKRixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/julien/.atom/packages/save-session/lib/save-prompt.coffee