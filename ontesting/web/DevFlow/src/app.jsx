import React, { useEffect, useState } from 'react'
import { loadState, saveState, getInitialState, exportState, importState } from './utils/storage'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'


export default function App() {
const [state, setState] = useState(() => loadState() || getInitialState())
const [view, setView] = useState('dashboard')


useEffect(() => { saveState(state) }, [state])


function update(partial) {
setState(prev => ({ ...prev, ...partial }))
}


function handleExport() {
const url = exportState()
const a = document.createElement('a')
a.href = url
a.download = 'devflow-backup.json'
a.click()
URL.revokeObjectURL(url)
}


async function handleImportFile(file) {
const text = await file.text()
if (importState(text)) { const s = loadState(); setState(s) }
}


return (
<div className="min-h-screen flex flex-col">
<Header onExport={handleExport} onImportFile={handleImportFile} />
<div className="flex flex-1">
<Sidebar view={view} setView={setView} />
<main className="flex-1 p-6">
<Dashboard view={view} state={state} setState={setState} update={update} />
</main>
</div>
</div>
)
}