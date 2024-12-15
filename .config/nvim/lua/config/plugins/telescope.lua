return {
	{
		'nvim-telescope/telescope.nvim',
		tag = '0.1.8',
		dependencies = {
			'nvim-lua/plenary.nvim',
			{ 'nvim-telescope/telescope-fzf-native.nvim', build = 'make' }
		},
		config = function()
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

			vim.keymap.set("n", "<leader>ff", require('telescope.builtin').find_files)
			vim.keymap.set("n", "<leader>fb", require('telescope.builtin').buffers)

			vim.keymap.set("n", "<leader>fcg", function()
				require('telescope.builtin').find_files {
					cwd = vim.fn.stdpath("config")
				}
			end)

			vim.keymap.set("n", "<leader>fp", function()
				require('telescope.builtin').find_files {
					cwd = vim.fs.joinpath(vim.fn.stdpath("data"), "lazy")
				}
			end)

			vim.keymap.set("n", "<leader>fg", function()
				require "config.telescope.multigrep".setup()
			end)
		end
	}
}
