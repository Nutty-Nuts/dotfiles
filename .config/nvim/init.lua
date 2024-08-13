local dir = "src."
local files = {
    "opts",
    "lazy",
    "plugins",
    "style",
    "autocmd",
    "keymaps",
    "highlights",
}

for _, file in ipairs(files) do
    require(dir .. file)
end
