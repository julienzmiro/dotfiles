Environment setup :
===================
- Mac terminal (colors, fonts,...)
- Vim, colors, settings and plugins
- Homebrew
- Node js (via nvm) and npm
- Mongodb
- Git
- Bash-completion
- Ack

Step by step :
==============

1) Homebrew and formulas
------------------------
First install homebrew
``` bash
ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"
```
Then install all formulas
``` bash
brew install git
brew install macvim
brew install mongodb
brew install ack
brew install bash-completion
```

2) Fetch the dotfiles folder
----------------------------
``` bash
cd ~
git clone git://github.com/julienzmiro/dotfiles.git
```

3) Terminal settings
--------------------
Import ~/dotfiles/jzsettings.terminal in Mac OS terminal settings

4) Vim and bash
---------------
``` bash
cd ~/dotfiles
chmod +x makesymlinks.sh
git submodule init
git submodule update
sh akesymlinks.sh
```

5) Install node via nvm
-----------------------
``` bash
git clone git://github.com/creationix/nvm.git ~/nvm
```
