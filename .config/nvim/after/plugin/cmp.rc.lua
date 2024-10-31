local cmp = require("cmp")
local lspkind = require("lspkind")
local luasnip = require("luasnip")

local format = function(entry, vim_item)
    local kind = lspkind.cmp_format({ mode = "symbol_text", maxwidth = 30 })(entry, vim_item)
    local strings = vim.split(kind.kind, "%s", { trimempty = true })
    kind.kind = " " .. (strings[1] or "") .. " "
    kind.menu = "    [" .. (strings[2] or "") .. "]"

    local source = entry.source.name
    vim_item.menu = vim_item.menu .. ":" .. source

    -- local item = entry:get_completion_item()

    -- if item.detail then
    --     vim_item.menu = item.detail
    -- end

    return kind
end

local lspkind_config = {
    mode = "symbol_text",
    preset = "codicons",
    symbol_map = {
        Text = "󰊄",
        Method = "󰆧",
        Function = "󰊕",
        Constructor = "",
        Field = "󰜢",
        Variable = "󰀫",
        Class = "󰠱",
        Interface = "",
        Module = "",
        Property = "󰜢",
        Unit = "󰑭",
        Value = "󰎠",
        Enum = "",
        Keyword = "󰌋",
        Snippet = "",
        Color = "󰏘",
        File = "󰈙",
        Reference = "󰈇",
        Folder = "󰉋",
        EnumMember = "",
        Constant = "󰏿",
        Struct = "󰙅",
        Event = "",
        Operator = "󰆕",
        TypeParameter = "",
    },
}

local cmp_config = {
    snippet = {
        expand = function(args)
            luasnip.lsp_expand(args.body)
        end,
    },
    mapping = cmp.mapping.preset.insert({
        ["<CR>"] = cmp.mapping.confirm({
            behavior = cmp.ConfirmBehavior.Replace,
            select = true,
        }),
    }),
    sources = cmp.config.sources({
        { name = "nvim_lsp" },
        { name = "luasnip" },
    }, {
        { name = "buffer" },
    }),
    formatting = {
        fields = { "kind", "abbr", "menu" },
        format = format,
    },
    window = {
        completion = cmp.config.window.bordered({
            winhighlight = "Normal:Pmenu,FloatBorder:Pmenu,CursorLine:PmenuThumb",
            scrollbar = false,
        }),
        documentation = cmp.config.window.bordered({
            winhighlight = "Normal:Pmenu,FloatBorder:Pmenu,CursorLine:PmenuThumb",
        }),
    },
}

lspkind.init(lspkind_config)
cmp.setup(cmp_config)
require("luasnip.loaders.from_vscode").lazy_load()

luasnip.filetype_extend("javascript", { "javascriptreact" })
luasnip.filetype_extend("javascript", { "html" })
