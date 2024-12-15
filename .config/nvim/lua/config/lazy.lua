--- @module BOOTSTRAP LAZY.NVIM PLUGIN MANAGER
-- path where lazy.nvim will be cloned
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not (vim.uv or vim.loop).fs_stat(lazypath) then
    --- URL for the lazy.nvim repo
    local lazyrepo = "https://github.com/folke/lazy.nvim.git"

    --- clone lazy.nvim in nvim's data dir
    local out = vim.fn.system({ 
      "git", 
      "clone", 
      "--filter=blob:none", 
      "--branch=stable", 
      lazyrepo, lazypath 
    })
    
    --- print error message when cloning fails
    if vim.v.shell_error ~= 0 then
    vim.api.nvim_echo({
	{ "Failed to clone lazy.nvim:\n", "ErrorMsg" },
	{ out, "WarningMsg" },
	{ "\nPress any key to exit..." },
    }, true, {})

    vim.fn.getchar()
    os.exit(1)
    end
end

-- Add lazy to the `runtimepath`, this allows us to `require` it.
---@diagnostic disable-next-line: undefined-field
vim.opt.runtimepath:prepend(lazypath)

vim.g.mapleader = " "
vim.g.maplocalleader = " "

require("lazy").setup({ import = "config/plugins" }, {
    change_detection = {
	notify = false,
    },
})
