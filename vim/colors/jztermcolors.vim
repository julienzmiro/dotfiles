" Vim color file

" cool help screens
" :he group-name
" :he highlight-groups
" :he cterm-colors

set background=dark
if version > 580
    " no guarantees for version 5.8 and below, but this makes it stop
    " complaining
    hi clear
    if exists("syntax_on")
	syntax reset
    endif
endif
let g:colors_name="jztermcolors"

" color terminal definitions
hi Todo cterm=NONE ctermfg=black ctermbg=red

hi SpecialKey	ctermfg=darkgreen
hi NonText	cterm=bold ctermfg=darkblue
hi Directory	ctermfg=darkcyan
hi ErrorMsg	cterm=bold ctermfg=7 ctermbg=1
hi IncSearch	cterm=NONE ctermfg=NONE ctermbg=black
hi Search	cterm=NONE ctermfg=lightgreen ctermbg=darkgreen
hi MoreMsg	ctermfg=darkgreen
hi ModeMsg	cterm=NONE ctermfg=red
hi LineNr	ctermfg=3
hi Question	ctermfg=green
" More obvious current window
hi StatusLine	cterm=bold,reverse
hi StatusLineNC cterm=NONE ctermbg=darkgrey
hi VertSplit	cterm=reverse
hi Title	ctermfg=5
" hi Visual	cterm=reverse
hi Visual cterm=NONE ctermfg=NONE ctermbg=darkgrey
hi VisualNOS	cterm=bold,underline
hi WarningMsg	ctermfg=1
hi WildMenu	ctermfg=0 ctermbg=3
hi Folded	ctermfg=darkgrey ctermbg=NONE
hi FoldColumn	ctermfg=darkgrey ctermbg=NONE
hi DiffAdd	ctermbg=4
hi DiffChange	ctermbg=5
hi DiffDelete	cterm=bold ctermfg=4 ctermbg=6
hi DiffText	cterm=bold ctermbg=1
hi Comment	ctermfg=darkcyan
hi Constant	ctermfg=brown
hi Special	ctermfg=5
hi Identifier	ctermfg=6
hi Statement	ctermfg=3
hi PreProc	ctermfg=5
hi Type		ctermfg=2
hi Underlined	cterm=underline ctermfg=5
hi Ignore	cterm=bold ctermfg=7
hi Ignore	ctermfg=darkgrey
hi Error	cterm=bold ctermfg=7 ctermbg=1
" Popup menu
hi Pmenu cterm=NONE ctermfg=lightgrey ctermbg=black
hi PmenuSel cterm=NONE ctermfg=black ctermbg=darkgreen
hi link PmenuSbar PmenuSel
hi PmenuThumb cterm=NONE ctermfg=darkgreen ctermbg=lightgrey

" languages specific
" JS
hi javaScriptParens cterm=NONE ctermbg=NONE ctermfg=brown
hi link javaScriptOperator javaScriptParens
hi link javaScriptStatement javaScriptParens
hi link javaScriptConditional javaScriptParens
hi javaScriptIdentifier cterm=NONE ctermbg=NONE ctermfg=lightgreen
hi link javaScriptFuncArg javaScriptIdentifier
hi javaScriptFunction cterm=NONE ctermbg=NONE ctermfg=green
hi link javaScriptFuncKeyword javaScriptFunction
hi link javaScriptBraces javaScriptFunction
hi javaScriptLineComment cterm=NONE ctermbg=NONE ctermfg=darkgrey
