import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'


export default function SnippetsView({ state, setState }) {
const [form, setForm] = useState({ title: '', code: '', lang: 'javascript' })


function add() {
const next = { ...state, snippets: [{ id: Date.now(), ...form }, ...state.snippets] }
setState(next)
setForm({ title: '', code: '', lang: 'javascript' })
}


function remove(id) {
setState({ ...state, snippets: state.snippets.filter(s => s.id !== id) })
}


return (
<div>
<h3 className="text-xl mb-2">Snippets</h3>
<div className="mb-4 p-4 border rounded">
<input className="w-full mb-2 p-2 border" placeholder="Title" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} />
<select value={form.lang} onChange={e=>setForm(f=>({...f,lang:e.target.value}))} className="mb-2 p-2 border">
<option value="javascript">javascript</option>
<option value="python">python</option>
<option value="html">html</option>
</select>
<textarea className="w-full p-2 border mb-2" rows={6} placeholder="Code" value={form.code} onChange={e=>setForm(f=>({...f,code:e.target.value}))} />
<div className="flex gap-2">
<button onClick={add} className="px-3 py-1 bg-slate-800 text-white rounded">Add</button>
</div>
</div>


<div className="space-y-3">
{state.snippets.map(s => (
<div key={s.id} className="p-3 border rounded">
<div className="flex justify-between items-start">
<div>
<div className="font-medium">{s.title}</div>
<div className="text-sm text-slate-500">{s.lang}</div>
</div>
<div className="flex gap-2">
<button onClick={()=>remove(s.id)} className="text-sm px-2 py-1 border rounded">Delete</button>
</div>
</div>
<div className="mt-2">
<SyntaxHighlighter language={s.lang}>{s.code}</SyntaxHighlighter>
</div>
</div>
))}
</div>
</div>
)
}