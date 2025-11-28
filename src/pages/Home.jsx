import { useEffect, useState } from 'react'
import { getProducts, searchProducts } from '../api'
import ProductList from '../components/ProductList'
import SearchBar from '../components/SearchBar'

export default function Home() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getProducts().then(data => {
            setProducts(data)
        }).catch(() => { }).finally(() => setLoading(false))
    }, [])

    async function doSearch(q) {
        if (!q) return loadAll()
        setLoading(true)
        try {
            const res = await searchProducts(q)
            setProducts(res)
        } catch (e) {
            console.error(e)
        } finally { setLoading(false) }
    }

    async function loadAll() {
        setLoading(true)
        try { const res = await getProducts(); setProducts(res) } catch (e) { } finally { setLoading(false) }
    }

    return (
        <main className="max-w-6xl mx-auto p-4">
            <div className="flex items-center justify-between gap-6 mb-6">
                <h2 className="text-2xl font-semibold text-sienna">Explore Handcrafted Goods</h2>
                <SearchBar onSearch={doSearch} />
            </div>

            {loading ? <div>Loading...</div> : (
                <ProductList products={products} />
            )}
        </main>
    )
}
