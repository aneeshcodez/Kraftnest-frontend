import { useState } from 'react'

export default function ProductForm({ initial = {}, onSubmit }) {
    const [name, setName] = useState(initial.name || '')
    const [desc, setDesc] = useState(initial.description || '')
    const [price, setPrice] = useState(initial.price || '')
    const [category, setCategory] = useState(initial.category || '')
    const [image, setImage] = useState(null)

    function submit(e) {
        e.preventDefault()
        const fd = new FormData()
        fd.append('name', name)
        fd.append('description', desc)
        fd.append('price', price)
        fd.append('category', category)
        if (image) fd.append('imageFile', image)
        onSubmit(fd)
    }

    return (
        <form onSubmit={submit} className="space-y-3 bg-beige p-4 rounded-xl border">
            <div>
                <label className="text-xs text-sienna/70">Product Name</label>
                <input value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 rounded-md border" />
            </div>
            <div>
                <label className="text-xs text-sienna/70">Description</label>
                <textarea value={desc} onChange={e => setDesc(e.target.value)} className="w-full px-3 py-2 rounded-md border" rows={4} />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="text-xs text-sienna/70">Price</label>
                    <input value={price} onChange={e => setPrice(e.target.value)} type="number" step="0.01" className="w-full px-3 py-2 rounded-md border" />
                </div>
                <div>
                    <label className="text-xs text-sienna/70">Category</label>
                    <input value={category} onChange={e => setCategory(e.target.value)} className="w-full px-3 py-2 rounded-md border" />
                </div>
            </div>
            <div>
                <label className="text-xs text-sienna/70">Image</label>
                <input onChange={e => setImage(e.target.files[0])} type="file" accept="image/*" className="block" />
            </div>
            <div className="flex justify-end">
                <button type="submit" className="px-4 py-2 rounded-md bg-sienna text-beige">Save</button>
            </div>
        </form>
    )
}
