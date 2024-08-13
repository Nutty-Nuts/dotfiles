local ufo = require("ufo")

local config = {
    provider_selector = function(bufnr, filetype, buftype)
        return {'treesitter', 'indent'}
    end
}

ufo.setup(config)
