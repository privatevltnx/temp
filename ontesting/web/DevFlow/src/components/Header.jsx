import React from 'react'


export default function Header({ onExport, onImportFile }) {
return (
<header className="bg-white shadow-sm px-6 py-3 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="text-xl font-bold">DevFlow</div>
<div className="text-sm text-slate-500">Developer Dashboard — Local-only</div>
</div>
<div className="flex items-center gap-2">
<label className="btn">
<input type="file" accept="application/json" onChange={e => e.target.files && onImportFile(e.target.files[0])} className="hidden" />
Import
</label>
<button onClick={onExport} className="px-3 py-1 rounded bg-slate-800 text-white">Export</button>
</div>
</header>
)
}