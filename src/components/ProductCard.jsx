import { Link } from 'react-router-dom'
import { currency } from '../utils/format'

export default function ProductCard({ product }) {
    return (
        <article className="rounded-xl shadow-sm p-4 card-warm border border-sienna/5">
            <Link to={`/product/${product.id}`} className="block">
                <div className="h-48 rounded-lg overflow-hidden bg-sienna/5 flex items-center justify-center">
                    {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full" />
                    ) : (
                        <div className="text-sienna/40">No image</div>
                    )}
                </div>
                <h3 className="mt-3 text-sienna font-semibold">{product.name}</h3>
                <p className="text-sienna/70 text-sm mt-1">{product.shortDescription || product.description?.slice(0, 80)}</p>
                <div className="mt-3 flex items-center justify-between">
                    <div className="text-sienna font-bold">{currency(product.price)}</div>
                    <div className="text-xs text-sienna/60">{product.category || 'Handcrafted'}</div>
                </div>
            </Link>
        </article>
    )
}
