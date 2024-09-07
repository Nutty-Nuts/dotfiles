# Set the directory to store zinit and plugins
ZINIT_HOME="${XDG_DATA_HOME:-${HOME}/.local/share}/zinit/zinit.git"

# Shell PATHs
export PREFIX="$HOME/opt/cross"
export TARGET=i686-elf
# export TERM="xterm-256color"

export PATH="$PREFIX/bin:$PATH"
export PATH="$HOME/opt/cross/bin:$PATH"
export PATH=$PATH:/home/gerardvega/.local/bin

# Download Zinit if its is not installed
if [ ! -d "$ZINIT_HOME" ]; then
    mkdir -p "$(dirname $ZINIT_HOME)"
    git clone https://github.com/zdharma-continuum/zinit.git "$ZINIT_HOME"
fi

# Source or Load Zinit
source "${ZINIT_HOME}/zinit.zsh"

# Add in zsh plugins
zinit light zsh-users/zsh-syntax-highlighting
zinit light zsh-users/zsh-completions
zinit light zsh-users/zsh-autosuggestions
zinit light Aloxaf/fzf-tab

# Add in snippets
zinit snippet OMZP::git
zinit snippet OMZP::sudo
zinit snippet OMZP::command-not-found

# Load completions
autoload -U compinit && compinit

# Auto completions history config
HISTSIZE=5000
HISTFILE=~/.zsh-history
SAVEHIST=$HISTSIZE
HISTDUP=erase
setopt appendhistory
setopt sharehistory
setopt hist_ignore_space
setopt hist_ignore_all_dups
setopt hist_save_no_dups
setopt hist_ignore_dups
setopt hist_find_no_dups

# Completion styling
zstyle ':completion:*' matcher-list 'm:{a-z}={A-Za-z}'
zstyle ':completion:*' list-colors '${(s.:.)LS_COLORS}'
zstyle ':completion:*' menu no
# zstyle ':fzf-tab:complete:cd:*' fzf-preview 'ls --color $realpath'
zstyle ':fzf-tab:complete:cd:*' fzf-preview 'eza -T --all -L 2 --colour=always --icons=always $realpath'
# zstyle ':fzf-tab:complete:__zoxide_z:*' fzf-preview 'ls --color $realpath'

# Shell integrations
eval "$(oh-my-posh init zsh --config $HOME/.config/ohmyposh/zen.toml)"
eval "$(fzf --zsh)"
eval "$(zoxide init --cmd cd zsh)"

# aliases for commands
alias ls='eza --all --icons=always'
alias :q="exit"
alias ff="fastfetch --logo ~/.local/assets/fastfetch_logo.jpg"
alias nv="nvim"
# alias nvf='nvim $(fzf -m --preview="highlight -O ansi --force {}")'
alias nvf='nvim $(fzf -m --preview="bat --style=numbers --theme=base16 --color=always {}")'

# custom functions/commands
stowdots() {
    cd ~/dotfiles
    stow --verbose --adopt .
    echo "Created symlinks ~/dotfiles/* => ~/*"
    cd -
}

nvgit() {
    nvim +"Neogit $1"
}

nvimc() {
    rm ~/.local/state/nvim/swap/*.swn
    rm ~/.local/state/nvim/swap/*.swo
    rm ~/.local/state/nvim/swap/*.swp
}

# local color00='#32302f'
# local color01='#3c3836'
# local color02='#504945'
# local color03='#665c54'
# local color04='#bdae93'
# local color05='#d5c4a1'
# local color06='#ebdbb2'
# local color07='#fbf1c7'
# local color08='#fb4934'
# local color09='#fe8019'
# local color0A='#fabd2f'
# local color0B='#b8bb26'
# local color0C='#8ec07c'
# local color0D='#83a598'
# local color0E='#d3869b'
# local color0F='#d65d0e'

local color00='#272e33'
local color01='#23383c'
local color02='#374145'
local color03='#424b50'
local color04='#7a8478'
local color05='#859289'
local color06='#9da9a0'
local color07='#d3c6aa'
local color08='#e67e80'
local color09='#e69875'
local color0A='#dbbc7f'
local color0B='#a7c080'
local color0C='#83c092'
local color0D='#7fbbb3'
local color0E='#d699b6'
local color0F='#e67e80'

export FZF_DEFAULT_OPTS="$FZF_DEFAULT_OPTS"\
" --color=spinner:$color0C,hl:$color0D,gutter:$color00,bg+:$color02"\
" --color=fg:$color04,header:$color0D,info:$color0A,pointer:$color0C"\
" --color=marker:$color0C,fg+:$color06,prompt:$color0A,hl+:$color0D"\
" --color=border:$color04"\
" --layout=reverse --highlight-line --border=rounded --prompt=▌ --header-first --multi"
