vim.g.mapleader = ' '
vim.g.maplocalleader = ' '

local function bind_keys(mode, table)
    for keys, command in pairs(table) do
        vim.keymap.set(mode, keys, command[1], {noremap = true})
    end
    require('which-key').register(mode)
end

local normal_mode = {
    ["<leader>b"] = { ":NvimTreeToggle<CR>", "Toggle File Tree" },

    ["<F1>"] = { ":Telescope find_files<CR>", "Find Files" },
    ["<leader>ff"] = { ":Telescope find_files<CR>", "Find Files" },
    ["<leader>fs"] = { ":Telescope live_grep<CR>", "Grep Search" },
    ["<leader>fb"] = { ":Telescope buffers<CR>", "Browse Buffers" },
    ["<leader>fg"] = { ":Telescope git_files<CR>", "Find Git Files" },
    ["<leader>fn"] = { ":Telescope notify theme=dropdown<CR>", "Find Git Files" },

    ["<F2>"] = { ":Lspsaga rename<CR>", "Rename" },
    ["<leader>lh"] = { ":Lspsaga hover_doc<CR>", "Hover Docs" },
    ["<leader>lg"] = { ":Lspsaga goto_definition<CR>", "Goto Definition" },
    ["<leader>lr"] = { ":Lspsaga rename<CR>", "Rename" },
    ["<leader>lf"] = { ":Lspsaga lsp_finder<CR>", "Lsp Finder" },
    ["<leader>lt"] = { ":Lspsaga term_toggle<CR>", "Toggle Terminal" },
    ["<leader>la"] = { ":Lspsaga code_action<CR>", "Code Actions" },

    ["<leader>tb"] = { ":TagbarToggle<CR>", "Toggle Tagbar" },

    ["zr"] = { require('ufo').openAllFolds, "Open All Folds"},
    ["zm"] = { require('ufo').closeAllFolds, "Close All Folds"},

    ["<leader>/"] = { ":Commentary<CR>", "(Un)comment Line" },

    ["<Esc>"] = {":nohlsearch<CR>"},

    ["<C-h>"] = { "<C-w><C-h>", "Focus Left Window" },
    ["<C-l>"] = { "<C-w><C-l>", "Focus Right Window" },
    ["<C-j>"] = { "<C-w><C-j>", "Focus Lower Window" },
    ["<C-k>"] = { "<C-w><C-k>", "Focus Upper Window" },
}

local visual_mode = {
    ["<leader>/"] = { ":Commentary<CR>", "(Un)comment Lines" },

    ["<C-d>"] = { "<C-d>zz" },
    ["K"] = { ":m '<-2<CR>gv=gv" },
    ["J"] = { ":m '>+1<CR>gv=gv" },
}

local terminal_mode = {
    ['<Esc><Esc>'] = { '<C-\\><C-n>', 'Exit terminal mode' }
}

bind_keys("n", normal_mode)
bind_keys("v", visual_mode)
bind_keys("t", terminal_mode)

require('which-key').register({
	["<leader>f"] = { name = "+fuzzy finder" },
	["<leader>d"] = { name = "+debugging" },
	["<leader>l"] = { name = "+lsp actions" },
})
