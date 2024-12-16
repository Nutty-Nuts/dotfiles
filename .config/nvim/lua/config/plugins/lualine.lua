return {
	{
		'nvim-lualine/lualine.nvim',
		dependencies = { 'nvim-tree/nvim-web-devicons' },
		config = function()
			require('lualine').setup {
				options = {
					theme = 'catppuccin',
					section_separators = { left = '', right = '' },
					component_separators = { left = "", right = "" },
				},
				sections = {
					lualine_a = {
						{ function() return string.upper(vim.api.nvim_get_mode()["mode"]) end }
					},
					lualine_b = {
						'branch',
						{
							'diff'
						},
						'diagnostics'
					}
				}
			}
		end
	}
}
