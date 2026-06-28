import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import db from "./db/index.js"
import * as schema from "./db/schema.js"
import { eq } from "drizzle-orm"
import { cors } from "hono/cors"

import { YtDlp } from 'ytdlp-nodejs';
import { getDefaultResultOrder } from 'node:dns/promises'

const ytdlp = new YtDlp();

const app = new Hono()
app.use("*", cors({
  origin: "*"
}))

async function downloadReel(id: string) {
    const result = await ytdlp
    .download(`https://www.instagram.com/reel/${id}`)
    .cookiesFromBrowser("firefox")
    //path traversal attack possible or something augh
    .setOutputTemplate(`../reel/${id}.%(ext)s`)
    .on('progress', (p) => console.log(`${p.percentage_str}`))
    .run();
    console.log(result)
    return result
}

app.get('/reel/:id', async (c) => {
  const id = c.req.param("id")

  const reelExist = await db.select().from(schema.reelsTable).where(eq(schema.reelsTable.reelId, id))

  console.log(`Amount of videos: ${reelExist.length}`)
  if (reelExist.length > 0) {
    return c.json({ success: true, description: reelExist[0].description })
  }

  console.log("Fetching video")
  const r = await downloadReel(id)
  await db.insert(schema.reelsTable).values({
    creationDate: Date.now(),
    reelId: id,
    description: String(r.info[0].description),

  })
  return c.json({ success: true, description: String(r.info[0].description) })
})

serve({
  fetch: app.fetch,
  port: 8080
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
