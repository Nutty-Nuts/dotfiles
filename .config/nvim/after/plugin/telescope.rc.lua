local status, telescope = pcall(require, "telescope")
if (not status) then
    return
end

local config = {
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
        file_browser = {
            theme = "dropdown",
            selection_caret = "󰐊 ",
            prompt_prefix = "   ",
            hijack_netrw = true,
        },
    },
}

telescope.setup(config)
telescope.load_extension("file_browser")

