vim.keymap.set("n", "<leader><leader>x", ":so<CR>")
vim.keymap.set("n", "<leader>x", ":.lua<CR>")
vim.keymap.set("v", "<leader>x", ":lua<CR>")

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
