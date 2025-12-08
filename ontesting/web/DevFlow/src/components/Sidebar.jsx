import React from 'react'


const items = [
{ id: 'dashboard', label: 'Dashboard' },
{ id: 'snippets', label: 'Snippets' },
{ id: 'bookmarks', label: 'Bookmarks' },
{ id: 'tasks', label: 'Tasks' },
{ id: 'notes', label: 'Notes' }
]


export default function Sidebar({ view, setView }) {
return (
<aside className="w-64 border-r px-4 py-6 bg-slate-50">
<nav className="space-y-2">
{items.map(it => (
<button key={it.id} onClick={() => setView(it.id)} className={`w-full text-left px-3 py-2 rounded ${view===it.id? 'bg-slate-200':'hover:bg-slate-100'}`}>
{it.label}
</button>
))}
</nav>
</aside>
)
}