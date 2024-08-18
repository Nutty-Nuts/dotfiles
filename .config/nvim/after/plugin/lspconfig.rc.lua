local status, lsp = pcall(require, "lspconfig")

if not status then
	return
end

local capabilities = vim.lsp.protocol.make_client_capabilities()
capabilities = vim.tbl_deep_extend("force", capabilities, require("cmp_nvim_lsp").default_capabilities())

local server_configurations = {
	["html"] = {},
	["lua_ls"] = {
		settings = {
			Lua = {
				runtime = { version = "LuaJIT" },
				diagnostics = { globals = { "vim" } },
				settings = { telemetry = { enable = false } },
				workspace = {
					library = vim.api.nvim_get_runtime_file("", true),
					checkThirdParty = false,
				},
				format = {
					enable = false,
				},
			},
		},
	},
	["tsserver"] = {},
	["pyright"] = {},
	["rust_analyzer"] = {},
	["jdtls"] = {},
	["clangd"] = {},
	["emmet_ls"] = {
		filetypes = { "html", "typescriptreact", "javascriptreact" },
	},
	["cssls"] = {},
	["bashls"] = {},
	["marksman"] = {},
	["cmake"] = {},
	["asm_lsp"] = {},
}

for language, configurations in pairs(server_configurations) do
	configurations.capabilities = capabilities
	lsp[language].setup(configurations)
end
