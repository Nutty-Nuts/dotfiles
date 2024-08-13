local encoding = "utf-8"
local indent = 4

local options = {
    clipboard = "unnamedplus",
    backup = false,

    number = true,
    relativenumber = true,
    hlsearch = true,

    showcmd = true,
    cmdheight = 1,

    smarttab = true,
    expandtab = true,
    shiftwidth = indent,
    tabstop = indent,

    autoindent = true,
    smartindent = true,
    breakindent = true,
    linebreak = true,

    shortmess = "awt",
    mouse = "a",
    mousemev = true,

    signcolumn = "yes",
    termguicolors = true,
    splitright = true,
    splitbelow = true,

    foldcolumn = '2',
    foldlevel = 99,
    foldlevelstart = 99,
    foldenable = true,

    undofile = true,
    ignorecase = true,
    smartcase = true,
    updatetime = 250,
    cursorline = true,
    scrolloff = 10,
    inccommand = "split",

    list = true,
    listchars = { tab = '» ', trail = '·', nbsp = '␣' },
}

for option, value in pairs(options) do
    vim.opt[option] = value
end
