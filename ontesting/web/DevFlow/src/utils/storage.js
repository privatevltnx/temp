// Simple LocalStorage wrapper with JSON
const KEY = 'devflow:v1'


export function loadState() {
try {
const raw = localStorage.getItem(KEY)
if (!raw) return null
return JSON.parse(raw)
} catch (e) { return null }
}


export function saveState(state) {
try { localStorage.setItem(KEY, JSON.stringify(state)) } catch (e) { console.error(e) }
}


export function exportState() {
const data = loadState() || getInitialState()
const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
return URL.createObjectURL(blob)
}


export function importState(json) {
try {
const data = typeof json === 'string' ? JSON.parse(json) : json
saveState(data)
return true
} catch (e) { console.error(e); return false }
}


export function getInitialState() {
return {
notes: [],
snippets: [],
bookmarks: [],
tasks: [],
settings: { theme: 'light' }
}
}