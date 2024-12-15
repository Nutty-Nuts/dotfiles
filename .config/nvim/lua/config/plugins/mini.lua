return {
  {
    "echasnovski/mini.nvim",
    config = function()
	require("mini.icons").setup()
	require("mini.git").setup()
	require("mini.diff").setup()

	local statusline = require 'mini.statusline'
	statusline.setup { use_icons = true }

	require("mini.statusline").setup()
	require("mini.ai").setup()
	require("mini.surround").setup()
    end,
  },
}
