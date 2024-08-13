local treesitter = require("nvim-treesitter.configs")
local treesitter_context = require("treesitter-context")

local servers = {
    "javascript",
    "typescript",
    "tsx",
    "css", "html",
    "svelte",
    "vue",
    "c",
    "cpp",
    "cmake",
    "rust",
    "lua",
    "java",
    "python",
    "rasi",
    "yaml",
    "json",
    "bash",
    "markdown",
    "markdown_inline",
}

local treesitter_config = {
    highlight = {
        enable = true,
        disable = {},
    },
    indent = {
        enable = true,
        disale = {},
    },
    ensure_installed = servers,
    sync_install = true,
    auto_install = true,
    autotag = {
        enable = true,
    },
    rainbow = {
        enable = true,
    },
}

treesitter.setup(treesitter_config)
treesitter_context.setup()
