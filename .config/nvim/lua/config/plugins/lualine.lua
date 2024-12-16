return {
	{
		'nvim-lualine/lualine.nvim',
		dependencies = { 'nvim-tree/nvim-web-devicons' },
		config = function()
			require('lualine').setup {
				options = {
					theme = 'catppuccin',
					section_separators = { left = '', right = '' },
					component_separators = { left = "", right = "" },
				}, sections = { lualine_a = {
				{
					function()
						return string.upper(vim.api.nvim_get_mode()["mode"])
					end,
				}
			},
				lualine_b = {
					'branch',
					{
						'diff',
						colored = true,
						symbols = { added = ' ', modified = ' ', removed = ' ' },
						source = nil,
					},
				},
				lualine_c = {
					{
						'filetype',
						icon_only = true,
						icon = { align = 'right' },
						padding = { left = 1, right = 0 }
					},
					{
						'filename',
						symbols = {
							modified = '', -- Text to show when the file is modified.
							readonly = '', -- Text to show when the file is non-modifiable or readonly.
							unnamed = '[NO NAME]', -- Text to show for unnamed buffers.
							newfile = '[NEW]', -- Text to show for newly created file before first write
						},
						padding = { left = 1, right = 0 }
					}
				},
				lualine_x = {
					'diagnostics',
					{
						function() return '|' end,
						padding = { left = 0, right = 1 }
					},
					{
						function() return ' ' .. vim.lsp.get_clients()[1].name end,
						padding = { left = 0, right = 1 }
					}
				},
				lualine_y = {},
				lualine_z = {
					{
						'location',
						padding = { left = 0, right = 0 }
					}
				},
			}
			}
			vim.api.nvim_set_hl(0, "lualine_c_normal", { bg = "#181825" })
		end
	}
}
