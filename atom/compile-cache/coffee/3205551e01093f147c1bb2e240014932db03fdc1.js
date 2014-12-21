(function() {
  var open;

  open = require('open');

  module.exports = {
    activate: function() {
      atom.workspaceView.command('search:google', (function(_this) {
        return function() {
          return open(_this.getSearchUrl('google'));
        };
      })(this));
      atom.workspaceView.command('search:ddg', (function(_this) {
        return function() {
          return open(_this.getSearchUrl('duckduckgo'));
        };
      })(this));
      atom.workspaceView.command('search:twitter', (function(_this) {
        return function() {
          return open(_this.getSearchUrl('twitter'));
        };
      })(this));
      atom.workspaceView.command('search:github', (function(_this) {
        return function() {
          return open(_this.getSearchUrl('github'));
        };
      })(this));
      atom.workspaceView.command('search:stackoverflow', (function(_this) {
        return function() {
          return open(_this.getSearchUrl('stackoverflow'));
        };
      })(this));
      return atom.workspaceView.command('search:wikipedia', (function(_this) {
        return function() {
          return open(_this.getSearchUrl('wikipedia'));
        };
      })(this));
    },
    baseSearchUrls: {
      google: 'https://www.google.com/',
      duckduckgo: 'https://www.duckduckgo.com/',
      twitter: 'https://twitter.com/search',
      github: 'https://github.com/search',
      stackoverflow: 'http://stackoverflow.com/search',
      wikipedia: 'http://en.wikipedia.org/'
    },
    searchPrefixes: {
      google: '#q=',
      duckduckgo: '?q=',
      twitter: '?q=',
      github: '?q=',
      stackoverflow: '?q=',
      wikipedia: 'w/index.php?search='
    },
    getSearchTerm: function() {
      var editor, searchText;
      editor = atom.workspaceView.getActivePaneItem();
      return searchText = editor.getSelectedText();
    },
    getSearchUrl: function(site) {
      var searchTerm;
      searchTerm = this.getSearchTerm();
      if (searchTerm === "") {
        return this.baseSearchUrls[site];
      } else {
        return encodeURI(this.baseSearchUrls[site] + this.searchPrefixes[site] + searchTerm);
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLElBQUE7O0FBQUEsRUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FBUCxDQUFBOztBQUFBLEVBZ0JBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFFBQUEsRUFBVSxTQUFBLEdBQUE7QUFDUixNQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIsZUFBM0IsRUFBNEMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDMUMsSUFBQSxDQUFLLEtBQUMsQ0FBQSxZQUFELENBQWMsUUFBZCxDQUFMLEVBRDBDO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBNUMsQ0FBQSxDQUFBO0FBQUEsTUFFQSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLFlBQTNCLEVBQXlDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQ3ZDLElBQUEsQ0FBSyxLQUFDLENBQUEsWUFBRCxDQUFjLFlBQWQsQ0FBTCxFQUR1QztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXpDLENBRkEsQ0FBQTtBQUFBLE1BSUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQixnQkFBM0IsRUFBNkMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDM0MsSUFBQSxDQUFLLEtBQUMsQ0FBQSxZQUFELENBQWMsU0FBZCxDQUFMLEVBRDJDO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBN0MsQ0FKQSxDQUFBO0FBQUEsTUFNQSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLGVBQTNCLEVBQTRDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQzFDLElBQUEsQ0FBSyxLQUFDLENBQUEsWUFBRCxDQUFjLFFBQWQsQ0FBTCxFQUQwQztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTVDLENBTkEsQ0FBQTtBQUFBLE1BUUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQixzQkFBM0IsRUFBbUQsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDakQsSUFBQSxDQUFLLEtBQUMsQ0FBQSxZQUFELENBQWMsZUFBZCxDQUFMLEVBRGlEO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbkQsQ0FSQSxDQUFBO2FBV0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQixrQkFBM0IsRUFBK0MsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDN0MsSUFBQSxDQUFLLEtBQUMsQ0FBQSxZQUFELENBQWMsV0FBZCxDQUFMLEVBRDZDO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBL0MsRUFaUTtJQUFBLENBQVY7QUFBQSxJQWVBLGNBQUEsRUFDRTtBQUFBLE1BQUEsTUFBQSxFQUFRLHlCQUFSO0FBQUEsTUFDQSxVQUFBLEVBQVksNkJBRFo7QUFBQSxNQUVBLE9BQUEsRUFBUyw0QkFGVDtBQUFBLE1BR0EsTUFBQSxFQUFRLDJCQUhSO0FBQUEsTUFJQSxhQUFBLEVBQWUsaUNBSmY7QUFBQSxNQUtBLFNBQUEsRUFBVywwQkFMWDtLQWhCRjtBQUFBLElBdUJBLGNBQUEsRUFDRTtBQUFBLE1BQUEsTUFBQSxFQUFRLEtBQVI7QUFBQSxNQUNBLFVBQUEsRUFBWSxLQURaO0FBQUEsTUFFQSxPQUFBLEVBQVMsS0FGVDtBQUFBLE1BR0EsTUFBQSxFQUFRLEtBSFI7QUFBQSxNQUlBLGFBQUEsRUFBZSxLQUpmO0FBQUEsTUFLQSxTQUFBLEVBQVcscUJBTFg7S0F4QkY7QUFBQSxJQStCQSxhQUFBLEVBQWUsU0FBQSxHQUFBO0FBRWIsVUFBQSxrQkFBQTtBQUFBLE1BQUEsTUFBQSxHQUFTLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQW5CLENBQUEsQ0FBVCxDQUFBO2FBQ0EsVUFBQSxHQUFhLE1BQU0sQ0FBQyxlQUFQLENBQUEsRUFIQTtJQUFBLENBL0JmO0FBQUEsSUFvQ0EsWUFBQSxFQUFjLFNBQUMsSUFBRCxHQUFBO0FBQ1osVUFBQSxVQUFBO0FBQUEsTUFBQSxVQUFBLEdBQWEsSUFBQyxDQUFBLGFBQUQsQ0FBQSxDQUFiLENBQUE7QUFDQSxNQUFBLElBQUcsVUFBQSxLQUFjLEVBQWpCO2VBQ0UsSUFBQyxDQUFBLGNBQWUsQ0FBQSxJQUFBLEVBRGxCO09BQUEsTUFBQTtlQUtFLFNBQUEsQ0FBVSxJQUFDLENBQUEsY0FBZSxDQUFBLElBQUEsQ0FBaEIsR0FBd0IsSUFBQyxDQUFBLGNBQWUsQ0FBQSxJQUFBLENBQXhDLEdBQWdELFVBQTFELEVBTEY7T0FGWTtJQUFBLENBcENkO0dBakJGLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/julien/.atom/packages/Search/lib/search.coffee