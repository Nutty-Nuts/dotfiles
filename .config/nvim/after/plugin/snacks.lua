require("snacks").setup {
	bigfile = { enabled = true },
	dashboard = { enabled = true },
	indent = { enabled = true },
	input = { enabled = true },
	quickfile = { enabled = true },
	statuscolumn = { enabled = true,
		icons = {
			diagnostics = {
				Error = "  ",
				Warn = "  ",
				Hint = "  ",
				Info = "  ",
			},
		},
	},
	words = { enabled = true },
	dim = { enabled = true },
	scroll = {
		enabled = true,
		animate = {
			duration = {
				step = 25,
				total = 125,
			},
			fps = 24,
			easing = "outQuad"
		}
	},
}
