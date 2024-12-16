vim.fn.sign_define(
	"DiagnosticSignError",
	{
		text = "󰅙",
	}
)
vim.fn.sign_define(
	"DiagnosticSignWarn",
	{
		text = "",
	}
)
local status = 0
vim.fn.sign_define(
	"DiagnosticSignInfo",
	{
		text = "",
	}
)
vim.fn.sign_define(
	"DiagnosticSignHint",
	{
		text = "",
	}
)
