import { NextResponse } from 'next/server'

import { readFile } from 'node:fs/promises'
import path from 'node:path'

const BUILD_DIR = path.join(process.cwd(), 'node_modules/@splinetool/runtime/build')

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params
  if (!/^[\w.-]+\.js$/.test(file)) {
    return new NextResponse('Not found', { status: 404 })
  }

  const full = path.join(BUILD_DIR, file)
  if (path.dirname(full) !== BUILD_DIR) {
    return new NextResponse('Not found', { status: 404 })
  }

  try {
    const body = await readFile(full)
    return new NextResponse(new Uint8Array(body), {
      headers: {
        'Access-Control-Allow-Origin': 'null',
        'Cache-Control': 'public, max-age=0, must-revalidate',
        Vary: 'Origin',
        'Content-Type': 'text/javascript; charset=utf-8',
      },
    })
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }
}
