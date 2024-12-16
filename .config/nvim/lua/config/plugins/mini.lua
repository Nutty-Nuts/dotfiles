return {
	{
		'echasnovski/mini.nvim',
		version = false,
		config = function()
			require('mini.ai').setup()
			require('mini.surround').setup()
			require('mini.comment').setup()
			require('mini.git').setup()
			require('mini.icons').setup()
			require('mini.pairs').setup()
			require('mini.splitjoin').setup()
			require('mini.hipatterns').setup()
			require('mini.move').setup()

			require('mini.diff').setup {
				view = {
					signs = { add = '┃', change = '┇', delete = '︙' },
				}
			}
		end
	},
}
