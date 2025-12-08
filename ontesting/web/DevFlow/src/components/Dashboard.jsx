import React from 'react'
import SnippetsView from './views/SnippetsView'
import BookmarksView from './views/BookmarksView'
import TasksView from './views/TasksView'
import NotesView from './views/NotesView'


export default function Dashboard({ view, state, setState, update }) {
return (
<div>
{view === 'dashboard' && (
<div>
<h2 className="text-2xl font-semibold mb-4">Welcome to DevFlow</h2>
<div className="grid grid-cols-3 gap-4">
<div className="p-4 border rounded">Snippets: {state.snippets.length}</div>
<div className="p-4 border rounded">Bookmarks: {state.bookmarks.length}</div>
<div className="p-4 border rounded">Tasks: {state.tasks.length}</div>
</div>
</div>
)}
{view === 'snippets' && <SnippetsView state={state} setState={setState} />}
{view === 'bookmarks' && <BookmarksView state={state} setState={setState} />}
{view === 'tasks' && <TasksView state={state} setState={setState} />}
{view === 'notes' && <NotesView state={state} setState={setState} />}
</div>
)
}