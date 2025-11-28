import { useState } from 'react'

export default function SearchBar({ onSearch }) {
    const [q, setQ] = useState('')

    function submit(e) {
        e.preventDefault()
        onSearch(q)
    }

    return (
        <form onSubmit={submit} className="flex gap-2 max-w-xl w-full">
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search handmade, e.g. pottery" className="flex-1 px-4 py-2 rounded-md border border-sienna/20 focus:outline-none" />
            <button className="px-4 py-2 rounded-md bg-terracotta text-beige">Search</button>
        </form>
    )
}
