import { resolve } from "path"
import { createReadStream, statSync } from "fs"

export default defineEventHandler((event) => {
    const id = getRouterParam(event, 'id')

    const dir = resolve(process.cwd(), "../reel")
    const filePath = resolve(dir, `${id}.mp4`)

    if (!filePath.startsWith(dir)) {
        throw createError({ statusCode: 403, message: "Forbidden"})
    }

    if (!statSync(filePath).isFile()) {
        throw createError({ statusCode: 404, message: "File not found"})
    }

    event.node.res.setHeader("Content-Type", "video/mp4")

    return createReadStream(filePath)
})