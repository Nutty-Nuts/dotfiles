local harpoon = require("harpoon")
local which_key = require("which-key")

vim.g.mapleader = " "
vim.g.maplocalleader = " "

local function register_binds(binds, mode)
    for key, bind in pairs(binds) do
        which_key.add({ key, bind.command, desc = bind.desc, mode = mode })
    end
end

local binds = {
    normal = {
        --- BINDS FOR NORMAL MODE
        -- F-key Binds
        ["<F1>"] = {
            command = ":Telescope find_files<CR>",
            desc = "Find Files",
        },
        ["<F2>"] = {
            command = ":Lspsaga rename<CR>",
            desc = "Rename",
        },
        ["<leader>b"] = {
            command = ":NvimTreeToggle<CR>",
            desc = "Toggle File Tree",
        },

        -- TELESCOPE: Telescope Binds
        ["<leader>ff"] = {
            command = ":Telescope find_files<CR>",
            desc = "Find Files",
        },
        ["<leader>fs"] = {
            command = ":Telescope live_grep<CR>",
            desc = "Live File Search via Grep",
        },
        ["<leader>fb"] = {
            command = ":Telescope buffers<CR>",
            desc = "Browse through buffers",
        },
        ["<leader>fg"] = {
            command = ":Telescope git_files<CR>",
            desc = "Find Git Files",
        },
        ["<leader>fn"] = {
            command = ":Telescope notify theme=dropdown<CR>",
            desc = "Browse through notifications",
        },

        -- LSPSAGA: Lspsaga Binds
        ["<leader>lh"] = {
            command = ":Lspsaga hover_doc<CR>",
            desc = "Hover Documentation",
        },
        ["<leader>lg"] = {
            command = ":Lspsaga goto_definition<CR>",
            desc = "Goto Definition",
        },
        ["<leader>lr"] = {
            command = ":Lspsaga rename<CR>",
            desc = "Rename Signatur",
        },
        ["<leader>lf"] = {
            command = ":Lspsaga lsp_finder<CR>",
            desc = "Lsp Finder",
        },
        ["<leader>lt"] = {
            command = ":Lspsaga term_toggle<CR>",
            desc = "Toggle Terminal",
        },
        ["<leader>la"] = {
            command = ":Lspsaga code_action<CR>",
            desc = "Code Actions",
        },

        --- TAGBAR: Tagbar Binds
        ["<leader>gb"] = {
            command = ":TagbarToggle<CR>",
            desc = "Toggle Tagbar",
        },

        --- NEOGIT: Neogit Binds
        ["<leader>ngg"] = {
            command = ":Neogit<CR>",
            desc = "Git",
        },
        ["<leader>ngc"] = {
            command = ":Neogit commit<CR>",
            desc = "Git Commit",
        },
        ["<leader>ngd"] = {
            command = ":Neogit diff<CR>",
            desc = "Toggle ",
        },

        -- SPLIT: Split Navigation Binds
        ["<C-h>"] = {
            commands = "<C-w><C-h>",
            desc = "Focus Left Window",
        },
        ["<C-l>"] = {
            commands = "<C-w><C-l>",
            desc = "Focus Right Window",
        },
        ["<C-j>"] = {
            commands = "<C-w><C-j>",
            desc = "Focus Lower Window",
        },
        ["<C-k>"] = {
            commands = "<C-w><C-k>",
            desc = "Focus Upper Window",
        },

        -- UFO: UFO/Folds Binds
        ["zr"] = {
            command = require("ufo").openAllFolds,
            desc = "Open Folds",
        },
        ["zm"] = {
            command = require("ufo").closeAllFolds,
            desc = "Close Folds",
        },

        ["<leader>/"] = {
            command = ":Commentary<CR>",
            desc = "Comment/Uncomment Line",
        },

        ["<Esc>"] = {
            command = ":nohlsearch<CR>",
            desc = "",
        },

        -- TROUBLE: Trouble Binds
        ["<leader>tg"] = {
            command = ":Trouble diagnostics toggle<CR>",
            desc = "Toggle Trouble diagnostics",
        },
        ["<leader>tt"] = {
            command = ":Trouble diagnostics toggle filter.buf=0<CR>",
            desc = "Toggle Trouble diagnostics",
        },

        -- HARPOON: Harpoon Binds
        ["<leader>ha"] = {
            command = function()
                harpoon:list():add()
            end,
            desc = "Add to Harpoon List",
        },
        ["<leader>hn"] = {
            command = function()
                harpoon:list():next()
            end,
            desc = "Next Item in Harpoon List",
        },
        ["<leader>hp"] = {
            command = function()
                harpoon:list():prev()
            end,
            desc = "Previous Item in Harpoon List",
        },
        ["<leader>he"] = {
            command = function()
                harpoon.ui:toggle_quick_menu(harpoon:list())
            end,
            desc = "Toggle Harpoon Quick Menu",
        },
    },
    edit = {
        -- BINDS FOR EDIT MODE
    },
    visual = {
        -- BINDS FOR VISUAL MODE
        ["<leader>/"] = {
            command = ":Commentary<CR>",
            desc = "(Un)comment Lines",
        },
        ["<C-d>"] = {
            command = "<C-d>zz",
            desc = "",
        },
        ["K"] = {
            command = ":m '<-2<CR>gv=gv",
            desc = "",
        },
        ["J"] = {
            command = ":m '>+1<CR>gv=gv",
            desc = "",
        },
    },
    terminal = {},
}

register_binds(binds.normal, "n")
register_binds(binds.edit, "e")
register_binds(binds.visual, "v")

which_key.add({
    { "<leader>f", { group = "+telescope" } },
    { "<leader>d", { group = "+debugging" } },
    { "<leader>l", { group = "+lsp" } },
    { "<leader>ng", { group = "+neogit" } },
})
