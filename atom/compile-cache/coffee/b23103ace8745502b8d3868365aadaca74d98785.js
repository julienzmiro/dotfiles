(function() {
  var $, Config;

  $ = require('atom').$;

  Config = require('./config');

  module.exports = {
    activate: function() {
      var project;
      this.resetProject = true;
      project = Config.project();
      if (Config.restoreProject() && (project != null) && (atom.project.getPath() == null)) {
        this.restore(project);
      }
      return this.addListeners();
    },
    save: function() {
      return Config.project(atom.project.getPath());
    },
    restore: function(path) {
      if (path !== '0') {
        return atom.project.setPath(path);
      }
    },
    onNewWindow: function() {
      if (this.resetProject) {
        Config.project(void 0, true);
        return this.resetProject = true;
      }
    },
    onReopenProject: function() {
      this.resetProject = false;
      return atom.workspaceView.trigger('application:new-window');
    },
    addListeners: function() {
      $(window).on('focus', (function(_this) {
        return function(event) {
          return _this.save();
        };
      })(this));
      atom.workspaceView.preempt('application:new-window', (function(_this) {
        return function() {
          return _this.onNewWindow();
        };
      })(this));
      return atom.workspaceView.command('save-session:reopen-project', (function(_this) {
        return function() {
          return _this.onReopenProject();
        };
      })(this));
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFNBQUE7O0FBQUEsRUFBQyxJQUFLLE9BQUEsQ0FBUSxNQUFSLEVBQUwsQ0FBRCxDQUFBOztBQUFBLEVBQ0EsTUFBQSxHQUFTLE9BQUEsQ0FBUSxVQUFSLENBRFQsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBRUU7QUFBQSxJQUFBLFFBQUEsRUFBVSxTQUFBLEdBQUE7QUFDUixVQUFBLE9BQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxZQUFELEdBQWdCLElBQWhCLENBQUE7QUFBQSxNQUNBLE9BQUEsR0FBVSxNQUFNLENBQUMsT0FBUCxDQUFBLENBRFYsQ0FBQTtBQUVBLE1BQUEsSUFBRyxNQUFNLENBQUMsY0FBUCxDQUFBLENBQUEsSUFBNEIsaUJBQTVCLElBQTZDLGdDQUFoRDtBQUNFLFFBQUEsSUFBQyxDQUFBLE9BQUQsQ0FBUyxPQUFULENBQUEsQ0FERjtPQUZBO2FBS0EsSUFBQyxDQUFBLFlBQUQsQ0FBQSxFQU5RO0lBQUEsQ0FBVjtBQUFBLElBUUEsSUFBQSxFQUFNLFNBQUEsR0FBQTthQUNKLE1BQU0sQ0FBQyxPQUFQLENBQWUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFiLENBQUEsQ0FBZixFQURJO0lBQUEsQ0FSTjtBQUFBLElBV0EsT0FBQSxFQUFTLFNBQUMsSUFBRCxHQUFBO0FBQ1AsTUFBQSxJQUFHLElBQUEsS0FBVSxHQUFiO2VBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFiLENBQXFCLElBQXJCLEVBREY7T0FETztJQUFBLENBWFQ7QUFBQSxJQWVBLFdBQUEsRUFBYSxTQUFBLEdBQUE7QUFDWCxNQUFBLElBQUcsSUFBQyxDQUFBLFlBQUo7QUFDRSxRQUFBLE1BQU0sQ0FBQyxPQUFQLENBQWUsTUFBZixFQUEwQixJQUExQixDQUFBLENBQUE7ZUFDQSxJQUFDLENBQUEsWUFBRCxHQUFnQixLQUZsQjtPQURXO0lBQUEsQ0FmYjtBQUFBLElBb0JBLGVBQUEsRUFBaUIsU0FBQSxHQUFBO0FBQ2YsTUFBQSxJQUFDLENBQUEsWUFBRCxHQUFnQixLQUFoQixDQUFBO2FBQ0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQix3QkFBM0IsRUFGZTtJQUFBLENBcEJqQjtBQUFBLElBd0JBLFlBQUEsRUFBYyxTQUFBLEdBQUE7QUFDWixNQUFBLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxFQUFWLENBQWEsT0FBYixFQUFzQixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxLQUFELEdBQUE7aUJBQ3BCLEtBQUMsQ0FBQSxJQUFELENBQUEsRUFEb0I7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF0QixDQUFBLENBQUE7QUFBQSxNQUdBLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIsd0JBQTNCLEVBQXFELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQ25ELEtBQUMsQ0FBQSxXQUFELENBQUEsRUFEbUQ7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFyRCxDQUhBLENBQUE7YUFNQSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLDZCQUEzQixFQUEwRCxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUN4RCxLQUFDLENBQUEsZUFBRCxDQUFBLEVBRHdEO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBMUQsRUFQWTtJQUFBLENBeEJkO0dBTEYsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/julien/.atom/packages/save-session/lib/project.coffee