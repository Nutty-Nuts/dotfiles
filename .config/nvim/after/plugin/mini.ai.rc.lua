local status, mini_ai = pcall(require, "mini.ai")

if not status then
    return
end

mini_ai.setup()
