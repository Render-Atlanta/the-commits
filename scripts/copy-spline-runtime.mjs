import { cp, mkdir, readdir } from 'node:fs/promises'
import { createRequire } from 'node:module'
import path from 'node:path'

const require = createRequire(import.meta.url)
const source = path.dirname(require.resolve('@splinetool/runtime/build/runtime.js'))
const destination = path.join(process.cwd(), 'public/spline-runtime')

await mkdir(destination, { recursive: true })

const files = (await readdir(source)).filter(name => name.endsWith('.js') && name !== 'runtime.cjs')

await Promise.all(files.map(name => cp(path.join(source, name), path.join(destination, name))))
