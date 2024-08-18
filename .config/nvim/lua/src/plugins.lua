local function combine(list)
    local plugins = {}
    for _, n in ipairs(list) do
        for _, m in ipairs(n) do
            table.insert(plugins, m)
        end
    end
    return plugins
end

local syntax = {
    { "nvim-treesitter/nvim-treesitter", build = ":TSUpdate" },
    "nvim-treesitter/nvim-treesitter-context",
}

local quality_of_life = {
    "tpope/vim-sleuth",
    "tpope/vim-commentary",
    "abecodes/tabout.nvim",
    "windwp/nvim-autopairs",
    "norcalli/nvim-colorizer.lua",
    "folke/which-key.nvim",
}

local file_navigation = {
    "nvim-lua/plenary.nvim",
    "nvim-telescope/telescope.nvim",
    "nvim-telescope/telescope-file-browser.nvim",
    "nvim-telescope/telescope-symbols.nvim",

    { "nvim-tree/nvim-tree.lua", dependencies = "nvim-tree/nvim-web-devicons" },
}

local package_management = {
    "williamboman/mason.nvim",
    "williamboman/mason-lspconfig.nvim",
    {
        "jay-babu/mason-null-ls.nvim",
        event = { "BufReadPre", "BufNewFile" },
        dependencies = {
            "williamboman/mason.nvim",
            "nvimtools/none-ls.nvim",
        },
    },
}

local language_server_protocol = {
    "neovim/nvim-lspconfig",
    "nvimdev/lspsaga.nvim",
}

local code_autocompletion = {
    "hrsh7th/cmp-nvim-lsp",
    "hrsh7th/cmp-buffer",
    "hrsh7th/cmp-path",
    "hrsh7th/cmp-cmdline",
    "hrsh7th/nvim-cmp",
    "L3MON4D3/LuaSnip",
    "onsails/lspkind-nvim",
    "rafamadriz/friendly-snippets",
    "saadparwaiz1/cmp_luasnip",
}

local code_navigation = {
    {
        "kevinhwang91/nvim-ufo",
        dependencies = "kevinhwang91/promise-async",
    },
}

local themes = {
    { "catppuccin/nvim", name = "catppuccin", priority = 1000 },
    { "ellisonleao/gruvbox.nvim", priority = 1000, config = true },
}

local user_interface = {
    "nvim-lualine/lualine.nvim",
    {
        "folke/noice.nvim",
        event = "VeryLazy",
        dependencies = {
            "MunifTanjim/nui.nvim",
            "rcarriga/nvim-notify",
        },
    },
    {
        "lukas-reineke/indent-blankline.nvim",
        main = "ibl",
        ---@module "ibl"
        ---@type ibl.config
        opts = {},
    },
    "preservim/tagbar",
}

local temp = {
    "mfussenegger/nvim-dap-python",
    {
        "linux-cultist/venv-selector.nvim",
        dependencies = {
            "neovim/nvim-lspconfig",
            "mfussenegger/nvim-dap",
            "mfussenegger/nvim-dap-python", --optional
            {
                "nvim-telescope/telescope.nvim",
                branch = "0.1.x",
                dependencies = { "nvim-lua/plenary.nvim" },
            },
        },
        lazy = false,
        branch = "regexp", -- This is the regexp branch, use this for the new version
        config = function()
            require("venv-selector").setup()
        end,
        keys = {
            { ",v", "<cmd>VenvSelect<cr>" },
        },
    },
    {
        "stevearc/conform.nvim",
        opts = {},
    },
    {
        "NeogitOrg/neogit",
        dependencies = {
            "nvim-lua/plenary.nvim", -- required
            "sindrets/diffview.nvim", -- optional - Diff integration

            -- Only one of these is needed, not both.
            "nvim-telescope/telescope.nvim", -- optional
            "ibhagwan/fzf-lua", -- optional
        },
        config = true,
    },
}

require("lazy").setup({
    combine({
        syntax,
        quality_of_life,
        file_navigation,
        package_management,
        language_server_protocol,
        code_autocompletion,
        code_navigation,
        themes,
        user_interface,
        temp,
    }),
})
