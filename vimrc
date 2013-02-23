" Must be first line
set nocompatible
" Assume a dark bg
set background=dark

" Setup pathogen
execute pathogen#infect()
Helptags

" Automatically detect file types
filetype plugin indent on
" Syntax hl
syntax on
" Enable mouse
set mouse=a
" Default encoding
scriptencoding utf-8
" Switch to the file directory
set autochdir
" better unix / windows compatibility
set viewoptions=folds,options,cursor,unix,slash
" abbrev. of messages (avoids 'hit enter')
set shortmess+=filmnrxoOtT
" allow for cursor beyond last character
set virtualedit=onemore
" Store a ton of history (default is 20)
set history=1000
" spell checking on
" set spell
" Hide buffers instead of closing them
set hidden

" backups are nice ...
set backup
" so is persistent undo ...
set undofile
" maximum number of changes that can be undone
set undolevels=1000
" maximum number lines to save for undo on a buffer reload
set undoreload=10000

" Color scheme
" color desert
color jztermcolors
" set guifont=Inconsolata\ 16
" display the current mode
set showmode
" highlight current line
set cursorline
" highlight bg color of current line
hi cursorline guibg=#333333
" highlight cursor
hi CursorColumn guibg=#333333
" show the ruler
set ruler
" a ruler on steroids
set rulerformat=%30(%=\:b%n%y%m%r%w\ %l,%c%V\ %P%)
" show partial commands in status line and
set showcmd

" Status line
set laststatus=2
" Filename
set statusline=%<%f\
" Options
set statusline+=%w%h%m%r
" current dir
set statusline+=\ [%{getcwd()}]
" synstack
set statusline+=%{synIDattr(synID(line('.'),col('.'),1),'name')}
" Right aligned file nav info
set statusline+=%=%-14.(%l,%c%V%)\ %p%%

" backspace for dummys
set backspace=indent,eol,start
" No extra spaces between rows
set linespace=0
" Line numbers on
set nu
" show matching brackets/parenthesis
set showmatch
" find as you type search
set incsearch
" highlight search terms
set hlsearch
" windows can be 0 line high 
set winminheight=0
" case insensitive search
set ignorecase
" case sensitive when uc present
set smartcase
" show list instead of just completing
set wildmenu
" command <Tab> completion, list matches, then longest common part, then all.
set wildmode=list:longest,full
" backspace and cursor keys wrap to
set whichwrap=b,s,h,l,<,>,[,]
" lines to scroll when cursor leaves screen
set scrolljump=5
" minimum lines to keep above and below cursor
set scrolloff=3
" auto fold code
set foldenable
" the /g flag on :s substitutions by default
set gdefault
" 
set list
" Highlight problematic whitespace
set listchars=tab:>.,trail:.,extends:#,nbsp:.

" wrap long lines
set wrap
" indent at the same level of the previous line
set autoindent
" use indents of 2 spaces
set shiftwidth=2
" tabs are spaces, not tabs
set expandtab
" an indentation every 2 columns
set tabstop=2
" let backspace delete indent
set softtabstop=2
" match, to be used with % 
" set matchpairs+=<:>
" pastetoggle (sane indentation on pastes)
set pastetoggle=<F12>
" auto format comment blocks
"set comments=sl:/*,mb:*,elx:*/
" Remove trailing whitespaces and ^M chars
autocmd FileType c,cpp,java,php,js,python,twig,xml,yml autocmd BufWritePre <buffer> :call setline(1,map(getline(1,"$"),'substitute(v:val,"\\s\\+$","","")'))
" Highlight every occurence of cursor word
autocmd CursorMoved * exe printf('match IncSearch /\V\<%s\>/', escape(expand('<cword>'), '/\'))
" Warning if the file changed on the disk
au FileChangedShell * echo "Warning: File changed on disk"
" Current window more obvious
augroup BgHighlight
  autocmd!
  autocmd WinEnter * set cul
  autocmd WinLeave * set nocul
augroup END
autocmd InsertEnter * highlight  Normal cterm=NONE ctermbg=black ctermfg=NONE
autocmd InsertLeave * highlight  Normal cterm=NONE ctermbg=NONE ctermfg=NONE
" JS fold
"au FileType javascript call JavaScriptFold()
" Unfold all when open
"autocmd Syntax vim,xml,html,xhtml,js,css setlocal foldmethod=syntax
"autocmd Syntax vim,xml,html,xhtml,js,css normal zR
set nofoldenable
" Treat JSON as JS
autocmd BufNewFile,BufRead *.json setfiletype json syntax=javascript

" Key mapping
let mapleader = ','
"clearing highlighted search
nmap <silent> <leader>/ :nohlsearch<CR>
" For when you forget to sudo.. Really Write the file
cmap w!! w !sudo tee % >/dev/null
" Tab nav
map <Leader>tp :tabprevious<CR>
map <Leader>tn :tabnext<CR>
map <Leader>t :tabnew<CR>
" Move lines
nnoremap <C-j> :m .+1<CR>==
nnoremap <C-k> :m .-2<CR>==
inoremap <C-j> <Esc>:m .+1<CR>==gi
inoremap <C-k> <Esc>:m .-2<CR>==gi
vnoremap <C-j> :m '>+1<CR>gv=gv
vnoremap <C-k> :m '<-2<CR>gv=gv
" Duplicate current line
nnoremap <Leader>d :t.<CR>
" Easy buffer nav (type Leader b to show the list of buffers and then type the
" buffer number
:nnoremap <Leader>b :buffers<CR>:buffer<Space>
"Scroll faster
nnoremap <C-e> 3<C-e>
nnoremap <C-y> 3<C-y>

" YankRing configuration
nnoremap <Leader>y :YRShow<CR>
nnoremap Y y$
let g:yankring_replace_n_pkey = '<leader>yp'
let g:yankring_replace_n_nkey = '<leader>yn'

" NERDTree configuration
let NERDTreeIgnore=['\.pyc$', '\.rbc$', '\~$']
let NERDTreeShowHidden=1
map <Leader>n :NERDTreeToggle<CR>

" NERDCommenter conf
map <Leader>c :call NERDComment(0,"toggle")<CR>

" CtrlP configuration
" Define a custom root marker (touch .ctrlp)
let g:ctrlp_root_markers = ['.ctrlp']
nnoremap ; :CtrlPBuffer<CR>
" map <Leader>p :CtrlP<CR>
" map <Leader>pb :CtrlPBuffer<CR>
" map <Leader>pm :CtrlPMRU<CR>

" Supertab conf
let g:SuperTabDefaultCompletionType = '<C-X><C-O>'
let g:SuperTabDefaultCompletionType = 'context'

"Load matchit
runtime macros/matchit.vim

"Display page title
set title

if $TERM == "xterm-256color" || $TERM == "screen-256color" || $COLORTERM == "gnome-terminal"
  set t_Co=256
endif

function! InitializeDirectories()
  let separator = "."
  let parent = $HOME 
  let prefix = '.vim'
  let dir_list = { 
			  \ 'backup': 'backupdir', 
			  \ 'views': 'viewdir', 
			  \ 'swap': 'directory', 
			  \ 'undo': 'undodir' }

  for [dirname, settingname] in items(dir_list)
	  let directory = parent . '/' . prefix . dirname . "/"
	  if exists("*mkdir")
		  if !isdirectory(directory)
			  call mkdir(directory)
		  endif
	  endif
	  if !isdirectory(directory)
		  echo "Warning: Unable to create backup directory: " . directory
		  echo "Try: mkdir -p " . directory
	  else  
          let directory = substitute(directory, " ", "\\\\ ", "")
          exec "set " . settingname . "=" . directory
	  endif
  endfor
endfunction
call InitializeDirectories()
