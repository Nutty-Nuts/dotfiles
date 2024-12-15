local function config()
	require('telescope').setup {
		defaults = {
			path_display = { "smart" },
			theme = "dropdown",
		},

		pickers = {
			find_files = {
				theme = "dropdown",
				selection_caret = "󰐊 ",
				prompt_prefix = "   ",
				follow = true,
			},
			buffers = {
				theme = "dropdown",
				selection_caret = "󰐊 ",
				prompt_prefix = "   ",
			},
			live_grep = {
				theme = "dropdown",
				selection_caret = "󰐊 ",
				prompt_prefix = "   ",
				follow = true,
			},
		},
		extensions = {
			fzf = {}
		}
	}
end

return {
	{
		'nvim-telescope/telescope.nvim',
		tag = '0.1.8',
		dependencies = {
			'nvim-lua/plenary.nvim',
			{ 'nvim-telescope/telescope-fzf-native.nvim', build = 'make' }
		},
		config = config(),
	}
}
