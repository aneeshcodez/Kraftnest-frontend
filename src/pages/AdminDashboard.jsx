import { useEffect, useState } from 'react'
import { adminAddProduct, adminDeleteProduct, adminEditProduct, getProducts } from '../api'
import ProductForm from '../components/ProductForm'
import useAuth from '../hooks/useAuth'

export default function AdminDashboard() {
    const { isAdmin } = useAuth()
    const [products, setProducts] = useState([])
    const [editing, setEditing] = useState(null)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        if (!isAdmin) return
        load()
    }, [isAdmin])

    async function load() {
        try { const res = await getProducts(); setProducts(res) } catch (e) { }
    }

    async function handleAdd(fd) {
        try {
            await adminAddProduct(fd)
            setMessage('Product added')
            load()
        } catch (e) { setMessage(e.message) }
    }

    async function handleEdit(fd) {
        try {
            await adminEditProduct(editing.id, fd)
            setMessage('Product updated')
            setEditing(null)
            load()
        } catch (e) { setMessage(e.message) }
    }

    async function handleDelete(id) {
        if (!confirm('Delete this product?')) return
        try {
            await adminDeleteProduct(id)
            setMessage('Deleted')
            load()
        } catch (e) { setMessage(e.message) }
    }

    if (!isAdmin) return <div className="p-6">Unauthorized: admin only</div>

    return (
        <main className="max-w-6xl mx-auto p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-sienna">Admin Dashboard</h2>
            {message && <div className="text-sm text-sienna/70">{message}</div>}

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="font-semibold text-sienna">Add product</h3>
                    <ProductForm onSubmit={handleAdd} />
                </div>

                <div>
                    <h3 className="font-semibold text-sienna">Existing products</h3>
                    <div className="space-y-3 mt-3">
                        {products.map(p => (
                            <div key={p.id} className="p-3 rounded-md border bg-beige flex items-center justify-between">
                                <div>
                                    <div className="font-semibold text-sienna">{p.name}</div>
                                    <div className="text-sienna/60 text-sm">{p.category} • ₹{p.price}</div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setEditing(p)} className="px-3 py-1 rounded-md border">Edit</button>
                                    <button onClick={() => handleDelete(p.id)} className="px-3 py-1 rounded-md bg-sienna text-beige">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {editing && (
                <section>
                    <h3 className="font-semibold text-sienna">Edit product: {editing.name}</h3>
                    <ProductForm initial={editing} onSubmit={handleEdit} />
                    <div className="mt-3">
                        <button className="px-3 py-1 border" onClick={() => setEditing(null)}>Cancel</button>
                    </div>
                </section>
            )}
        </main>
    )
}
