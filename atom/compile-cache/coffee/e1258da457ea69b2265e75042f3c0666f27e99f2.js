(function() {
  var $, Config, Dimensions, Files, FirstBuffer, Fs, Project, SavePrompt;

  $ = require('atom').$;

  Fs = require('fs');

  Config = require('./config');

  Dimensions = require('./dimensions');

  Files = require('./files');

  FirstBuffer = require('./first-buffer');

  Project = require('./project');

  SavePrompt = require('./save-prompt');

  module.exports = {
    config: {
      disableNewFileOnOpen: {
        type: 'boolean',
        "default": true,
        description: 'Auto close the default file opened by Atom'
      },
      restoreProject: {
        type: 'boolean',
        "default": true,
        description: 'Restore the last opened project'
      },
      restoreWindow: {
        type: 'boolean',
        "default": true,
        description: 'Restore window size'
      },
      restoreFileTreeSize: {
        type: 'boolean',
        "default": true,
        description: 'Restore file tree size'
      },
      restoreOpenFiles: {
        type: 'boolean',
        "default": true,
        description: 'Restore files from the previous session'
      },
      restoreOpenFileContents: {
        type: 'boolean',
        "default": true,
        description: 'Restore the contents of files that were unsaved in the last session'
      },
      restoreOpenFilesPerProject: {
        type: 'boolean',
        "default": true,
        description: 'Restore files from previous sessions per project'
      },
      restoreCursor: {
        type: 'boolean',
        "default": true,
        description: 'Restore the cursor position in a file'
      },
      restoreScrollPosition: {
        type: 'boolean',
        "default": true,
        description: 'Restore the scroll position in a file'
      },
      skipSavePrompt: {
        type: 'boolean',
        "default": true,
        description: 'Disable the save on exit prompt'
      },
      extraDelay: {
        type: 'integer',
        "default": 0,
        description: "Add an extra delay time in ms for saving files after typing"
      },
      project: {
        type: 'string',
        "default": '0',
        description: 'The last open project that will be restored'
      },
      windowX: {
        type: 'integer',
        "default": -1,
        description: 'The x position of the window to be restored'
      },
      windowY: {
        type: 'integer',
        "default": -1,
        description: 'The y position of the window to be restored'
      },
      windowWidth: {
        type: 'integer',
        "default": -1,
        description: 'The width of the window to be restored'
      },
      windowHeight: {
        type: 'integer',
        "default": -1,
        description: 'The height of the window to be restored'
      },
      treeSize: {
        type: 'integer',
        "default": 200,
        description: 'The width of the file tree to be restored'
      }
    },
    activate: function(state) {
      if (Config.saveFolder() == null) {
        Config.saveFolderDefault();
      }
      Project.activate();
      Dimensions.activate();
      SavePrompt.activate();
      FirstBuffer.activate();
      return Files.activate();
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtFQUFBOztBQUFBLEVBQUMsSUFBSyxPQUFBLENBQVEsTUFBUixFQUFMLENBQUQsQ0FBQTs7QUFBQSxFQUNBLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUixDQURMLENBQUE7O0FBQUEsRUFFQSxNQUFBLEdBQVMsT0FBQSxDQUFRLFVBQVIsQ0FGVCxDQUFBOztBQUFBLEVBR0EsVUFBQSxHQUFhLE9BQUEsQ0FBUSxjQUFSLENBSGIsQ0FBQTs7QUFBQSxFQUlBLEtBQUEsR0FBUSxPQUFBLENBQVEsU0FBUixDQUpSLENBQUE7O0FBQUEsRUFLQSxXQUFBLEdBQWMsT0FBQSxDQUFRLGdCQUFSLENBTGQsQ0FBQTs7QUFBQSxFQU1BLE9BQUEsR0FBVSxPQUFBLENBQVEsV0FBUixDQU5WLENBQUE7O0FBQUEsRUFPQSxVQUFBLEdBQWEsT0FBQSxDQUFRLGVBQVIsQ0FQYixDQUFBOztBQUFBLEVBU0EsTUFBTSxDQUFDLE9BQVAsR0FFRTtBQUFBLElBQUEsTUFBQSxFQUNFO0FBQUEsTUFBQSxvQkFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLElBRFQ7QUFBQSxRQUVBLFdBQUEsRUFBYSw0Q0FGYjtPQURGO0FBQUEsTUFJQSxjQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsSUFEVDtBQUFBLFFBRUEsV0FBQSxFQUFhLGlDQUZiO09BTEY7QUFBQSxNQVFBLGFBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxJQURUO0FBQUEsUUFFQSxXQUFBLEVBQWEscUJBRmI7T0FURjtBQUFBLE1BWUEsbUJBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47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
//# sourceURL=/Users/julien/.atom/packages/save-session/lib/save-session.coffee