print_before_the_prompt ()
{
	printf "\n%s : %s\n" "$USER" "$PWD"
}

PROMPT_COMMAND=print_before_the_prompt
PS1='->'

export PATH=/usr/local/bin:$PATH
export PATH=$HOME/local/node/bin:$PATH
export PATH=/usr/local/mysql/bin:$PATH
export PATH=$HOME/bin:$PATH

alias ls='ls -Ga'
# alias mongodshell='/usr/local/bin/mongo'
alias mysqlstart='sudo /usr/local/mysql/support-files/mysql.server start'
alias mysqlstop='sudo /usr/local/mysql/support-files/mysql.server stop'
alias apachestart='sudo apachectl start'
alias apachestop='sudo apachectl stop'

. ~/nvm/nvm.sh

if [ -f `brew --prefix`/etc/bash_completion ]; then
    . `brew --prefix`/etc/bash_completion
fi
