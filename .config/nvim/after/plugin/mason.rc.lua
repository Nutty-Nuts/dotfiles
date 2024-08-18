local mason = require("mason")
local masonlsp = require("mason-lspconfig")
local masonnull = require("mason-null-ls")

mason.setup()
masonlsp.setup({
    ensure_installed = {
            "html",
        "lua_ls",
        "tsserver",
        "pyright",
        "rust_analyzer",
        "jdtls",
        "clangd",
        "emmet_ls",
        "cssls",
        "bashls",
        "marksman",
        "cmake",
        "asm_lsp"
    },
})

masonnull.setup({
    ensure_installed = {
        "stylua",
        "rustfmt",
        "autopep8",
        "prettierd",
        "google_java_format",
        "markdownlint",
        "beautysh",
        "clang_format",
        "cmake_format",
    }
})
