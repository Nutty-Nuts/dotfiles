local nvim_tree = require("nvim-tree")

local config = {
    view = {
        side = "right"
    },
    renderer = {
        indent_markers = {
            enable = true
        }
    }
}

nvim_tree.setup(config)
