import React, { useState } from 'react'
import { createProduct, getAdminAuthHeader } from './api'

function Login({ onLoggedIn }) {
    const [u, setU] = useState('')
    const [p, setP] = useState('')
    const [err, setErr] = useState('')

    const login = (e) => {
        e.preventDefault()
        setErr('')
        try {
            const token = btoa(`${u}:${p}`)
            localStorage.setItem('adminAuth', token)
            onLoggedIn()
        } catch { setErr('Login failed') }
    }

    return (
        <div className="container" style={{gridTemplateColumns:'1fr'}}>
            <div className="card"><div className="padded">
                <h2>Admin Login</h2>
                <form onSubmit={login}>
                    <input placeholder="Username" value={u} onChange={e=>setU(e.target.value)} required />
                    <input type="password" placeholder="Password" value={p} onChange={e=>setP(e.target.value)} required />
                    <div className="inline" style={{justifyContent:'flex-end', marginTop:8}}>
                        <button className="btn">Login</button>
                    </div>
                </form>
                {err && <div style={{color:'crimson'}}>{err}</div>}
                <a className="btn" href="/">← Back to Shop</a>
            </div></div>
        </div>
    )
}

function AddForm() {
    const [form, setForm] = useState({ name:'', description:'', category:'', imageUrl:'', price:'', rating:'0', sizes:'', colors:'' })
    const [busy, setBusy] = useState(false)

    const update = (k,v)=> setForm(prev => ({...prev, [k]: v}))

    const submit = async (e)=>{
        e.preventDefault(); setBusy(true)
        try {
            const headers = getAdminAuthHeader()
            if (!headers.Authorization) throw new Error('Not logged in')
            const payload = {
                name: form.name.trim(),
                description: form.description.trim(),
                category: form.category.trim(),
                imageUrl: form.imageUrl.trim(),
                price: Number(form.price),
                rating: Number(form.rating||0),
                sizes: form.sizes.split(',').map(s=>s.trim()).filter(Boolean),
                colors: form.colors.split(',').map(s=>s.trim()).filter(Boolean),
            }
            await createProduct(payload)
            alert('Created ✅')
            setForm({name:'',description:'',category:'',imageUrl:'',price:'',rating:'0',sizes:'',colors:''})
        } catch (err) { alert(err.message) } finally { setBusy(false) }
    }

    const logout = ()=> { localStorage.removeItem('adminAuth'); window.location.reload() }

    return (
        <div className="container" style={{gridTemplateColumns:'1fr'}}>
            <div className="card"><div className="padded">
                <div className="inline" style={{justifyContent:'space-between'}}>
                    <h2>Admin — Add Product</h2>
                    <div className="inline">
                        <a className="btn" href="/">Shop</a>
                        <button className="btn" onClick={logout}>Logout</button>
                    </div>
                </div>
                <form onSubmit={submit}>
                    <div className="inline">
                        <input placeholder="Name" value={form.name} onChange={e=>update('name', e.target.value)} required />
                        <input placeholder="Category" value={form.category} onChange={e=>update('category', e.target.value)} required />
                    </div>
                    <input placeholder="Image URL" value={form.imageUrl} onChange={e=>update('imageUrl', e.target.value)} required />
                    <textarea rows="3" placeholder="Description" value={form.description} onChange={e=>update('description', e.target.value)} />
                    <div className="inline">
                        <input type="number" step="0.01" placeholder="Price" value={form.price} onChange={e=>update('price', e.target.value)} required />
                        <input type="number" step="0.1" placeholder="Rating (0-5)" value={form.rating} onChange={e=>update('rating', e.target.value)} />
                    </div>
                    <div className="inline">
                        <input placeholder="Sizes (comma separated)" value={form.sizes} onChange={e=>update('sizes', e.target.value)} />
                        <input placeholder="Colors (comma separated)" value={form.colors} onChange={e=>update('colors', e.target.value)} />
                    </div>
                    <div className="inline" style={{justifyContent:'flex-end', marginTop:8}}>
                        <button className="btn" disabled={busy}>{busy? 'Saving...' : 'Create'}</button>
                    </div>
                </form>
            </div></div>
        </div>
    )
}

export default function AdminPage(){
    const token = localStorage.getItem('adminAuth')
    const [isLoggedIn, setIsLoggedIn] = useState(!!token)
    return isLoggedIn ? <AddForm /> : <Login onLoggedIn={()=>setIsLoggedIn(true)} />
}
