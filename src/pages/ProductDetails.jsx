import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProduct, getProductImage } from '../api'
import { currency } from '../utils/format'

export default function ProductDetails() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [imgSrc, setImgSrc] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            try {
                // Fetch product
                const p = await getProduct(id)
                setProduct(p)

                // Fetch image
                try {
                    const blob = await getProductImage(id)
                    setImgSrc(URL.createObjectURL(blob))
                } catch (imgErr) {
                    setImgSrc(null)
                }

            } catch (err) {
                console.error("Failed to load product", err)
            } finally {
                setLoading(false)
            }
        }

        loadData()

        // Cleanup blob URL
        return () => {
            if (imgSrc) URL.revokeObjectURL(imgSrc)
        }
    }, [id])

    // Loading UI
    if (loading) {
        return (
            <div className="p-6 text-center text-sienna/60 animate-pulse text-lg">
                Loading product details...
            </div>
        )
    }

    if (!product) {
        return (
            <div className="p-6 text-center text-red-500 font-semibold">
                Product not found.
            </div>
        )
    }

    return (
        <main className="max-w-5xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* IMAGE SECTION */}
                <div className="rounded-2xl overflow-hidden bg-sienna/5 shadow">
                    {imgSrc ? (
                        <img
                            src={imgSrc}
                            alt={product.name}
                            className="w-full h-96 object-cover"
                        />
                    ) : (
                        <div className="h-96 flex items-center justify-center text-sienna/40 text-lg">
                            No image available
                        </div>
                    )}
                </div>

                {/* DETAILS SECTION */}
                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl font-bold text-sienna">{product.name}</h1>

                    <p className="mt-3 text-sienna/70 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="mt-5 text-2xl font-semibold text-sienna">
                        {currency(product.price)}
                    </div>

                    <div className="mt-8">
                        <button className="px-6 py-3 rounded-xl bg-terracotta text-beige font-medium shadow hover:shadow-lg transition">
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}
