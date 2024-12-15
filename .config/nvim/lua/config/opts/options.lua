local indent = 4

vim.opt.showcmd = true
vim.opt.cmdheight = 1
vim.opt.clipboard = "unnamedplus"
vim.opt.backup = false

vim.opt.number = true
vim.opt.relativenumber = true
vim.opt.termguicolors = true

vim.opt.smarttab = true
vim.opt.expandtab = true
vim.opt.shiftwidth = indent
vim.opt.softtabstop = indent
vim.opt.tabstop = indent

vim.opt.autoindent = true
vim.opt.smartindent = true
vim.opt.breakindent = true
vim.opt.linebreak = true

vim.opt.shortmess = "awt"
vim.opt.mouse = "a"
vim.opt.mousemev = true

vim.opt.signcolumn = "yes"
vim.opt.termguicolors = true
vim.opt.splitright = true
vim.opt.splitbelow = true

vim.opt.foldcolumn = "2"
vim.opt.foldlevel = 99
vim.opt.foldlevelstart = 99
vim.opt.foldenable = true

vim.opt.undofile = true
vim.opt.ignorecase = true
vim.opt.smartcase = true
vim.opt.updatetime = 250
vim.opt.cursorline = true
vim.opt.scrolloff = 10
vim.opt.inccommand = "split"

vim.opt.list = true
vim.opt.listchars = { tab = "» ", trail = "·", nbsp = "␣" }
