(function() {
  var Config;

  Config = require('./config');

  module.exports = {
    activate: function() {
      if (Config.disableNewBufferOnOpen()) {
        return this.close();
      }
    },
    close: function() {
      var removeFunc;
      atom.workspace.constructor.prototype.saveSessionOpenFunc = atom.workspace.constructor.prototype.open;
      removeFunc = (function(_this) {
        return function(path, options) {
          return atom.workspace.constructor.prototype.open = atom.workspace.constructor.prototype.saveSessionOpenFunc;
        };
      })(this);
      return atom.workspace.constructor.prototype.open = removeFunc;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLE1BQUE7O0FBQUEsRUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFRLFVBQVIsQ0FBVCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FFRTtBQUFBLElBQUEsUUFBQSxFQUFVLFNBQUEsR0FBQTtBQUNSLE1BQUEsSUFBRyxNQUFNLENBQUMsc0JBQVAsQ0FBQSxDQUFIO2VBQ0ksSUFBQyxDQUFBLEtBQUQsQ0FBQSxFQURKO09BRFE7SUFBQSxDQUFWO0FBQUEsSUFNQSxLQUFBLEVBQU8sU0FBQSxHQUFBO0FBQ0wsVUFBQSxVQUFBO0FBQUEsTUFBQSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsbUJBQXJDLEdBQTJELElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFoRyxDQUFBO0FBQUEsTUFFQSxVQUFBLEdBQWEsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsSUFBRCxFQUFPLE9BQVAsR0FBQTtpQkFDWCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBckMsR0FBNEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLG9CQUR0RTtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBRmIsQ0FBQTthQUtBLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFyQyxHQUE0QyxXQU52QztJQUFBLENBTlA7R0FKRixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/julien/.atom/packages/save-session/lib/first-buffer.coffee