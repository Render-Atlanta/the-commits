import { NextResponse } from 'next/server'

import { sandboxStorageScript } from '@/lib/sandbox-storage-script'

const SCENE = 'https://prod.spline.design/2Gm4QkPYPfTwREcA/scene.splinecode'

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="robots" content="noindex, nofollow"/>
<title>Trophy</title>
<style>
  html, body { margin: 0; height: 100%; background: #000; }
  canvas { display: block; width: 100%; height: 100%; cursor: grab; }
  canvas:active { cursor: grabbing; }
</style>
<script>${sandboxStorageScript}</script>
</head>
<body>
<canvas></canvas>
<script type="module">
  import { Application } from '/trophy-scene/runtime/runtime.js'
  const canvas = document.querySelector('canvas')
  const app = new Application(canvas)
  app.load(${JSON.stringify(SCENE)})
</script>
</body>
</html>`

export function GET() {
  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}
