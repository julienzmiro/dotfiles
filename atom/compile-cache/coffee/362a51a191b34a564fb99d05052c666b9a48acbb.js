(function() {
  var $, $$, AutocompleteView, CompositeDisposable, Editor, FuzzyProvider, Range, SimpleSelectListView, Utils, minimatch, path, _, _ref, _ref1,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), Editor = _ref.Editor, Range = _ref.Range;

  CompositeDisposable = require('event-kit').CompositeDisposable;

  _ref1 = require('space-pen'), $ = _ref1.$, $$ = _ref1.$$;

  _ = require('underscore-plus');

  path = require('path');

  minimatch = require('minimatch');

  SimpleSelectListView = require('./simple-select-list-view');

  FuzzyProvider = require('./fuzzy-provider');

  Utils = require('./utils');

  module.exports = AutocompleteView = (function(_super) {
    __extends(AutocompleteView, _super);

    function AutocompleteView() {
      this.onChanged = __bind(this.onChanged, this);
      this.onSaved = __bind(this.onSaved, this);
      this.editorHasFocus = __bind(this.editorHasFocus, this);
      this.cursorMoved = __bind(this.cursorMoved, this);
      this.contentsModified = __bind(this.contentsModified, this);
      this.runAutocompletion = __bind(this.runAutocompletion, this);
      this.cancel = __bind(this.cancel, this);
      return AutocompleteView.__super__.constructor.apply(this, arguments);
    }

    AutocompleteView.prototype.currentBuffer = null;

    AutocompleteView.prototype.debug = false;

    AutocompleteView.prototype.originalCursorPosition = null;

    AutocompleteView.prototype.initialize = function(editor) {
      this.editor = editor;
      this.editorView = atom.views.getView(this.editor);
      this.compositeDisposable = new CompositeDisposable;
      AutocompleteView.__super__.initialize.apply(this, arguments);
      this.addClass("autocomplete-plus");
      this.providers = [];
      if (this.currentFileBlacklisted()) {
        return;
      }
      this.registerProvider(new FuzzyProvider(this.editor));
      this.handleEvents();
      this.setCurrentBuffer(this.editor.getBuffer());
      this.compositeDisposable.add(atom.commands.add('atom-text-editor', {
        "autocomplete-plus:activate": this.runAutocompletion
      }));
      return this.compositeDisposable.add(atom.commands.add('.autocomplete-plus', {
        "autocomplete-plus:confirm": this.confirmSelection,
        "autocomplete-plus:select-next": this.selectNextItemView,
        "autocomplete-plus:select-previous": this.selectPreviousItemView,
        "autocomplete-plus:cancel": this.cancel
      }));
    };

    AutocompleteView.prototype.currentFileBlacklisted = function() {
      var blacklist, blacklistGlob, fileName, _i, _len;
      blacklist = (atom.config.get("autocomplete-plus.fileBlacklist") || "").split(",").map(function(s) {
        return s.trim();
      });
      fileName = path.basename(this.editor.getBuffer().getPath());
      for (_i = 0, _len = blacklist.length; _i < _len; _i++) {
        blacklistGlob = blacklist[_i];
        if (minimatch(fileName, blacklistGlob)) {
          return true;
        }
      }
      return false;
    };

    AutocompleteView.prototype.viewForItem = function(_arg) {
      var className, item, label, renderLabelAsHtml, word;
      word = _arg.word, label = _arg.label, renderLabelAsHtml = _arg.renderLabelAsHtml, className = _arg.className;
      item = $$(function() {
        return this.li((function(_this) {
          return function() {
            _this.span(word, {
              "class": "word"
            });
            if (label != null) {
              return _this.span(label, {
                "class": "label"
              });
            }
          };
        })(this));
      });
      if (renderLabelAsHtml) {
        item.find(".label").html(label);
      }
      if (className != null) {
        item.addClass(className);
      }
      return item;
    };

    AutocompleteView.prototype.escapeHtml = function(string) {
      var escapedString;
      escapedString = string.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return escapedString;
    };

    AutocompleteView.prototype.handleEvents = function() {
      this.compositeDisposable.add(this.editor.onDidChangeCursorPosition(this.cursorMoved));
      this.compositeDisposable.add(this.editor.onDidChangeTitle(this.cancel));
      this.list.on("mousewheel", function(event) {
        return event.stopPropagation();
      });
      this.hiddenInput.on('compositionstart', (function(_this) {
        return function() {
          _this.compositionInProgress = true;
          return null;
        };
      })(this));
      return this.hiddenInput.on('compositionend', (function(_this) {
        return function() {
          _this.compositionInProgress = false;
          return null;
        };
      })(this));
    };

    AutocompleteView.prototype.registerProvider = function(provider) {
      if (_.findWhere(this.providers, provider) == null) {
        this.providers.push(provider);
        if (provider.dispose != null) {
          return this.compositeDisposable.add(provider);
        }
      }
    };

    AutocompleteView.prototype.unregisterProvider = function(provider) {
      _.remove(this.providers, provider);
      return this.compositeDisposable.remove(provider);
    };

    AutocompleteView.prototype.confirmed = function(match) {
      var replace, _ref2, _ref3;
      if ((match != null ? match.provider : void 0) == null) {
        return;
      }
      if (this.editor == null) {
        return;
      }
      replace = match.provider.confirm(match);
      if (!replace) {
        return;
      }
      if ((_ref2 = this.editor.getSelections()) != null) {
        _ref2.forEach(function(selection) {
          return selection != null ? selection.clear() : void 0;
        });
      }
      this.cancel();
      this.replaceTextWithMatch(match);
      return (_ref3 = this.editor.getCursors()) != null ? _ref3.forEach(function(cursor) {
        var position;
        position = cursor != null ? cursor.getBufferPosition() : void 0;
        if (position != null) {
          return cursor.setBufferPosition([position.row, position.column]);
        }
      }) : void 0;
    };

    AutocompleteView.prototype.cancel = function() {
      var _ref2;
      if (!this.active) {
        return;
      }
      if ((_ref2 = this.overlayDecoration) != null) {
        _ref2.destroy();
      }
      this.overlayDecoration = void 0;
      AutocompleteView.__super__.cancel.apply(this, arguments);
      if (!this.editorView.hasFocus()) {
        return this.editorView.focus();
      }
    };

    AutocompleteView.prototype.runAutocompletion = function() {
      var buffer, marker, options, provider, providerSuggestions, suggestions, _i, _len, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
      if (this.compositionInProgress) {
        return;
      }
      this.cancel();
      this.originalSelectionBufferRanges = this.editor.getSelections().map(function(selection) {
        return selection.getBufferRange();
      });
      this.originalCursorPosition = this.editor.getCursorScreenPosition();
      if (this.originalCursorPosition == null) {
        return;
      }
      buffer = (_ref2 = this.editor) != null ? _ref2.getBuffer() : void 0;
      if (buffer == null) {
        return;
      }
      options = {
        path: buffer.getPath(),
        text: buffer.getText(),
        pos: this.originalCursorPosition
      };
      suggestions = [];
      _ref5 = (_ref3 = this.providers) != null ? (_ref4 = _ref3.slice()) != null ? _ref4.reverse() : void 0 : void 0;
      for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
        provider = _ref5[_i];
        providerSuggestions = provider != null ? provider.buildSuggestions(options) : void 0;
        if (!(providerSuggestions != null ? providerSuggestions.length : void 0)) {
          continue;
        }
        if (provider.exclusive) {
          suggestions = providerSuggestions;
          break;
        } else {
          suggestions = suggestions.concat(providerSuggestions);
        }
      }
      if (!(suggestions != null ? suggestions.length : void 0)) {
        return this.cancel();
      }
      this.setItems(suggestions);
      if (this.overlayDecoration == null) {
        marker = (_ref6 = this.editor.getLastCursor()) != null ? _ref6.getMarker() : void 0;
        return this.overlayDecoration = (_ref7 = this.editor) != null ? _ref7.decorateMarker(marker, {
          type: 'overlay',
          item: this
        }) : void 0;
      }
    };

    AutocompleteView.prototype.contentsModified = function() {
      var delay;
      delay = parseInt(atom.config.get("autocomplete-plus.autoActivationDelay"));
      if (this.delayTimeout) {
        clearTimeout(this.delayTimeout);
      }
      return this.delayTimeout = setTimeout(this.runAutocompletion, delay);
    };

    AutocompleteView.prototype.cursorMoved = function(data) {
      if (!data.textChanged) {
        return this.cancel();
      }
    };

    AutocompleteView.prototype.editorHasFocus = function() {
      var editorView;
      editorView = this.editorView;
      if (editorView.jquery) {
        editorView = editorView[0];
      }
      return editorView.hasFocus();
    };

    AutocompleteView.prototype.onSaved = function() {
      if (!this.editorHasFocus()) {
        return;
      }
      return this.cancel();
    };

    AutocompleteView.prototype.onChanged = function(e) {
      if (!this.editorHasFocus()) {
        return;
      }
      if (atom.config.get("autocomplete-plus.enableAutoActivation") && (e.newText.trim().length === 1 || e.oldText.trim().length === 1)) {
        return this.contentsModified();
      } else {
        return this.cancel();
      }
    };

    AutocompleteView.prototype.replaceTextWithMatch = function(match) {
      var buffer, newSelectedBufferRanges, selections;
      if (this.editor == null) {
        return;
      }
      newSelectedBufferRanges = [];
      buffer = this.editor.getBuffer();
      if (buffer == null) {
        return;
      }
      selections = this.editor.getSelections();
      if (selections == null) {
        return;
      }
      selections.forEach((function(_this) {
        return function(selection, i) {
          var cursorPosition, infixLength, startPosition, _ref2, _ref3, _ref4;
          if (selection != null) {
            startPosition = (_ref2 = selection.getBufferRange()) != null ? _ref2.start : void 0;
            selection.deleteSelectedText();
            cursorPosition = (_ref3 = _this.editor.getCursors()) != null ? (_ref4 = _ref3[i]) != null ? _ref4.getBufferPosition() : void 0 : void 0;
            buffer["delete"](Range.fromPointWithDelta(cursorPosition, 0, -match.prefix.length));
            infixLength = match.word.length - match.prefix.length;
            return newSelectedBufferRanges.push([startPosition, [startPosition.row, startPosition.column + infixLength]]);
          }
        };
      })(this));
      this.editor.insertText(match.word);
      return this.editor.setSelectedBufferRanges(newSelectedBufferRanges);
    };

    AutocompleteView.prototype.afterAttach = function(onDom) {
      var widestCompletion;
      if (!onDom) {
        return;
      }
      widestCompletion = parseInt(this.css("min-width")) || 0;
      this.list.querySelector("li").each(function() {
        var labelWidth, totalWidth, wordWidth;
        wordWidth = $(this).querySelector("span.word").outerWidth();
        labelWidth = $(this).querySelector("span.label").outerWidth();
        totalWidth = wordWidth + labelWidth + 40;
        return widestCompletion = Math.max(widestCompletion, totalWidth);
      });
      this.list.width(widestCompletion);
      return this.width(this.list.outerWidth());
    };

    AutocompleteView.prototype.populateList = function() {
      return AutocompleteView.__super__.populateList.apply(this, arguments);
    };

    AutocompleteView.prototype.setCurrentBuffer = function(currentBuffer) {
      this.currentBuffer = currentBuffer;
      this.compositeDisposable.add(this.currentBuffer.onDidSave(this.onSaved));
      return this.compositeDisposable.add(this.currentBuffer.onDidChange(this.onChanged));
    };

    AutocompleteView.prototype.getModel = function() {
      return null;
    };

    AutocompleteView.prototype.dispose = function() {
      return this.compositeDisposable.dispose();
    };

    return AutocompleteView;

  })(SimpleSelectListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHdJQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsT0FBbUIsT0FBQSxDQUFRLE1BQVIsQ0FBbkIsRUFBQyxjQUFBLE1BQUQsRUFBUyxhQUFBLEtBQVQsQ0FBQTs7QUFBQSxFQUNDLHNCQUF1QixPQUFBLENBQVEsV0FBUixFQUF2QixtQkFERCxDQUFBOztBQUFBLEVBRUEsUUFBVSxPQUFBLENBQVEsV0FBUixDQUFWLEVBQUMsVUFBQSxDQUFELEVBQUksV0FBQSxFQUZKLENBQUE7O0FBQUEsRUFHQSxDQUFBLEdBQUksT0FBQSxDQUFRLGlCQUFSLENBSEosQ0FBQTs7QUFBQSxFQUlBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUpQLENBQUE7O0FBQUEsRUFLQSxTQUFBLEdBQVksT0FBQSxDQUFRLFdBQVIsQ0FMWixDQUFBOztBQUFBLEVBTUEsb0JBQUEsR0FBdUIsT0FBQSxDQUFRLDJCQUFSLENBTnZCLENBQUE7O0FBQUEsRUFPQSxhQUFBLEdBQWdCLE9BQUEsQ0FBUSxrQkFBUixDQVBoQixDQUFBOztBQUFBLEVBUUEsS0FBQSxHQUFRLE9BQUEsQ0FBUSxTQUFSLENBUlIsQ0FBQTs7QUFBQSxFQVVBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSix1Q0FBQSxDQUFBOzs7Ozs7Ozs7OztLQUFBOztBQUFBLCtCQUFBLGFBQUEsR0FBZSxJQUFmLENBQUE7O0FBQUEsK0JBQ0EsS0FBQSxHQUFPLEtBRFAsQ0FBQTs7QUFBQSwrQkFFQSxzQkFBQSxHQUF3QixJQUZ4QixDQUFBOztBQUFBLCtCQVFBLFVBQUEsR0FBWSxTQUFFLE1BQUYsR0FBQTtBQUNWLE1BRFcsSUFBQyxDQUFBLFNBQUEsTUFDWixDQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsVUFBRCxHQUFjLElBQUksQ0FBQyxLQUFLLENB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
//# sourceURL=/Users/julien/.atom/packages/autocomplete-plus/lib/autocomplete-view.coffee