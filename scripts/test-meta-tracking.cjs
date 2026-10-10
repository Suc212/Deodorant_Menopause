const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')

const source = fs.readFileSync(require.resolve('../lib/meta-tracking.ts'), 'utf8')
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText
const exportsObject = {}
vm.runInNewContext(compiled, { exports: exportsObject })
const { trackSavedPurchase } = exportsObject
const storage = () => {
  const values = new Map()
  return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
}
const session = storage()
const local = storage()
const calls = []
const pixel = { korretdealsMetaPixelInitialized: true, fbq: (...args) => calls.push(args) }
const reference = 'DEOS-test'
const track = () => trackSavedPurchase(reference, pixel, session, local)
track()
assert.equal(calls.length, 0, 'URL reference alone must not fire')
session.setItem(`korretdeals:order-saved:${reference}`, JSON.stringify({ success: false, reference, savedAt: 'today' }))
track()
assert.equal(calls.length, 0, 'Unsuccessful submission must not fire')
session.setItem(`korretdeals:order-saved:${reference}`, JSON.stringify({ success: true, reference: 'other', savedAt: 'today' }))
track()
assert.equal(calls.length, 0, 'Saved reference must match')
session.setItem(`korretdeals:order-saved:${reference}`, JSON.stringify({ success: true, reference, savedAt: 'today' }))
pixel.korretdealsMetaPixelInitialized = false
track()
assert.equal(calls.length, 0, 'Pixel must initialize first')
pixel.korretdealsMetaPixelInitialized = true
local.setItem('marketing_consent', 'pending')
track()
assert.equal(calls.length, 0, 'Required consent must be granted')
local.setItem('marketing_consent', 'denied')
track()
assert.equal(calls.length, 0, 'Denied consent must block')
local.setItem('marketing_consent', 'granted')
track()
assert.deepEqual(calls.map((args) => Array.from(args)), [['track', 'Purchase']])
track()
trackSavedPurchase(reference, { ...pixel }, session, local)
assert.equal(calls.length, 1, 'Refreshes and revisits must not fire again')
const blockedStorage = { getItem() { throw new Error('Blocked') } }
trackSavedPurchase(reference, pixel, session, blockedStorage)
assert.equal(calls.length, 1, 'Storage errors must fail closed')
const freshLocal = storage()
trackSavedPurchase(reference, pixel, session, freshLocal)
assert.equal(calls.length, 2, 'No consent requirement configured permits tracking')
console.log('Meta tracking checks passed')
