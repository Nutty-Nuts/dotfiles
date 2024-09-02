require("conform").setup({
    format_on_save = {
        -- These options will be passed to conform.format()
        timeout_ms = 500,
        lsp_format = "fallback",
    },
    formatters_by_ft = {
        lua = { "stylua" },
        javascript = { "prettierd" },
        rust = { "rustfmt" },
        python = { "autopep8" },
        asm = { "asmfmt" },
    },
})
