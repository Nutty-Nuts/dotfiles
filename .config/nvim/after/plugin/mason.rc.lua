local mason = require("mason")
local masonlsp = require("mason-lspconfig")

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
