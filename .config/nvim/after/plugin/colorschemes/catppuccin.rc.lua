local status, catppuccin = pcall(require, "catppuccin")
if (not status) then
    return
end

catppuccin.setup({
    transparent_background = true,
    show_end_of_buffer = true,
    dim_inactive = {
        enabled = false,
        shade = "dark",
        percentage = 0.15,
    },
})

