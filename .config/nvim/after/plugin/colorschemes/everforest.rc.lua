local status, everforest = pcall(require, "everforest")
if not status then
    return
end

everforest.setup()
