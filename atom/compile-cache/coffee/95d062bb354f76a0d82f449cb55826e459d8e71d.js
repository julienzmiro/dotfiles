(function() {
  var exec, open_terminal, path, platform;

  exec = require('child_process').exec;

  path = require('path');

  platform = require('os').platform;


  /*
     Opens a terminal in the given directory, as specefied by the config
   */

  open_terminal = function(dirpath) {
    var app, args, cmdline, runDirectly, setWorkingDirectory, surpressDirArg;
    app = atom.config.get('atom-terminal.app');
    args = atom.config.get('atom-terminal.args');
    setWorkingDirectory = atom.config.get('atom-terminal.setWorkingDirectory');
    surpressDirArg = atom.config.get('atom-terminal.surpressDirectoryArgument');
    runDirectly = atom.config.get('atom-terminal.MacWinRunDirectly');
    cmdline = "\"" + app + "\" " + args;
    if (!surpressDirArg) {
      cmdline += " \"" + dirpath + "\"";
    }
    if (platform() === "darwin" && !runDirectly) {
      cmdline = "open -a " + cmdline;
    }
    if (platform() === "win32" && !runDirectly) {
      cmdline = "start \"\" " + cmdline;
    }
    console.log("atom-terminal executing: ", cmdline);
    if (setWorkingDirectory) {
      if (dirpath != null) {
        return exec(cmdline, {
          cwd: dirpath
        });
      }
    } else {
      if (dirpath != null) {
        return exec(cmdline);
      }
    }
  };

  module.exports = {
    activate: function() {
      atom.workspaceView.command("atom-terminal:open", (function(_this) {
        return function() {
          return _this.open();
        };
      })(this));
      return atom.workspaceView.command("atom-terminal:open-project-root", (function(_this) {
        return function() {
          return _this.openroot();
        };
      })(this));
    },
    open: function() {
      var editor, file, filepath;
      editor = atom.workspace.getActivePaneItem();
      file = editor != null ? editor.buffer.file : void 0;
      filepath = file != null ? file.path : void 0;
      if (filepath) {
        return open_terminal(path.dirname(filepath));
      }
    },
    openroot: function() {
      if (atom.project.path) {
        return open_terminal(atom.project.path);
      }
    }
  };

  if (platform() === 'darwin') {
    module.exports.configDefaults = {
      app: 'Terminal.app',
      args: '',
      surpressDirectoryArgument: false,
      setWorkingDirectory: false,
      MacWinRunDirectly: false
    };
  } else if (platform() === 'win32') {
    module.exports.configDefaults = {
      app: 'C:\\Windows\\System32\\cmd.exe',
      args: '',
      surpressDirectoryArgument: false,
      setWorkingDirectory: true,
      MacWinRunDirectly: false
    };
  } else {
    module.exports.configDefaults = {
      app: '/usr/bin/x-terminal-emulator',
      args: '',
      surpressDirectoryArgument: true,
      setWorkingDirectory: true,
      MacWinRunDirectly: false
    };
  }

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1DQUFBOztBQUFBLEVBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxlQUFSLENBQXdCLENBQUMsSUFBaEMsQ0FBQTs7QUFBQSxFQUNBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQURQLENBQUE7O0FBQUEsRUFFQSxRQUFBLEdBQVcsT0FBQSxDQUFRLElBQVIsQ0FBYSxDQUFDLFFBRnpCLENBQUE7O0FBSUE7QUFBQTs7S0FKQTs7QUFBQSxFQU9BLGFBQUEsR0FBZ0IsU0FBQyxPQUFELEdBQUE7QUFFZCxRQUFBLG9FQUFBO0FBQUEsSUFBQSxHQUFBLEdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLG1CQUFoQixDQUFOLENBQUE7QUFBQSxJQUNBLElBQUEsR0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0Isb0JBQWhCLENBRFAsQ0FBQTtBQUFBLElBSUEsbUJBQUEsR0FBc0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLG1DQUFoQixDQUp0QixDQUFBO0FBQUEsSUFLQSxjQUFBLEdBQWlCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQix5Q0FBaEIsQ0FMakIsQ0FBQTtBQUFBLElBTUEsV0FBQSxHQUFjLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixpQ0FBaEIsQ0FOZCxDQUFBO0FBQUEsSUFTQSxPQUFBLEdBQVcsSUFBQSxHQUFHLEdBQUgsR0FBUSxLQUFSLEdBQVksSUFUdkIsQ0FBQTtBQVlBLElBQUEsSUFBRyxDQUFBLGNBQUg7QUFDSSxNQUFBLE9BQUEsSUFBYSxLQUFBLEdBQUksT0FBSixHQUFhLElBQTFCLENBREo7S0FaQTtBQWdCQSxJQUFBLElBQUcsUUFBQSxDQUFBLENBQUEsS0FBYyxRQUFkLElBQTBCLENBQUEs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
//# sourceURL=/Users/julien/.atom/packages/atom-terminal/lib/atom-terminal.coffee