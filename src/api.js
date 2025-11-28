const BASE = 'http://localhost:8080/api'

async function request(path, opts = {}) {
    const token = localStorage.getItem('token')
    const headers = opts.headers || {}
    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }
    const res = await fetch(`${BASE}${path}`, { ...opts, headers })

    if (res.status === 401) {
        // unauthorized - drop token and redirect to login
        localStorage.removeItem('token')
        window.location.href = '/login'
        throw new Error('Unauthorized')
    }

    const contentType = res.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Error')
        return data
    }

    // for image or blob
    if (res.ok) return res
    const text = await res.text()
    throw new Error(text || 'Error')
}

export async function getProducts() {
    return request('/products')
}

export async function searchProducts(keyword) {
    return request(`/products/search?keyword=${encodeURIComponent(keyword)}`)
}

export async function getProduct(id) {
    return request(`/product/${id}`)
}

export async function getProductImage(productId) {
    // returns blob
    const res = await request(`/product/${productId}/image`, { method: 'GET' })
    return (await res.blob())
}

export async function login(username, password) {
    return request('/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
}

export async function register(user) {
    return request('/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
}

export async function adminAddProduct(formData) {
    return request('/product', { method: 'POST', body: formData })
}

export async function adminEditProduct(id, formData) {
    return request(`/product/${id}`, { method: 'PUT', body: formData })
}

export async function adminDeleteProduct(id) {
    return request(`/product/${id}`, { method: 'DELETE' })
}

export default { BASE }
