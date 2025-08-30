import React, { useEffect, useMemo, useState } from 'react'
import { getProducts, getCategories, createBooking } from './api'

function Header({ query, onQuery, onOpenCart, cartCount }) {
  return (
    <header>

      <div className="brand">Fashion Booking</div>
      <div className="search">
        <input placeholder="Search dresses, tops, shoes..." value={query} onChange={e=>onQuery(e.target.value)} />
      </div>
      <div className="inline">
        <button className="btn" onClick={onOpenCart}>🧺 Cart ({cartCount})</button>
          <a className="btn" href="/admin">Admin</a>

      </div>
    </header>
  )
}

function Filters({ categories, filters, setFilters }) {
  const update = (k,v)=> setFilters(prev => ({...prev, [k]: v}))
  return (
    <div className="filter-panel">
      <h3>Filters</h3>
      <label>Category</label>
      <select value={filters.category ?? ''} onChange={e=>update('category', e.target.value || null)}>
        <option value="">All</option>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <div className="inline">
        <div style={{flex:1}}>
          <label>Min Price</label>
          <input type="number" step="0.01" value={filters.minPrice ?? ''} onChange={e=>update('minPrice', e.target.value || null)} />
        </div>
        <div style={{flex:1}}>
          <label>Max Price</label>
          <input type="number" step="0.01" value={filters.maxPrice ?? ''} onChange={e=>update('maxPrice', e.target.value || null)} />
        </div>
      </div>
      <div className="inline">
        <div style={{flex:1}}>
          <label>Color</label>
          <input placeholder="e.g. Black" value={filters.color ?? ''} onChange={e=>update('color', e.target.value || null)} />
        </div>
        <div style={{flex:1}}>
          <label>Size</label>
          <input placeholder="e.g. M" value={filters.size ?? ''} onChange={e=>update('size', e.target.value || null)} />
        </div>
      </div>
      <label>Sort</label>
      <select value={filters.sort ?? 'relevance'} onChange={e=>update('sort', e.target.value)}>
        <option value="relevance">Relevance</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="rating">Rating</option>
      </select>
    </div>
  )
}

function ProductCard({ product, onAddToCart, onBook }) {
  return (
    <div className="card">
      <img src={product.imageUrl} alt={product.name} />
      <div className="padded">
        <div className="inline" style={{justifyContent:'space-between'}}>
          <strong>{product.name}</strong>
          <span className="badge">{product.category}</span>
        </div>
        <small className="muted">⭐ {product.rating.toFixed(1)}</small>
        <div className="price">${Number(product.price).toFixed(2)}</div>
        <div className="inline" style={{marginTop:8}}>
          <button className="btn" onClick={()=>onAddToCart(product)}>Add to Cart</button>
          <button className="btn" onClick={()=>onBook(product)}>Book Try-On</button>
        </div>
      </div>
    </div>
  )
}

function CartPanel({ open, setOpen, items, setItems }) {
  const total = useMemo(()=> items.reduce((s,i)=> s + i.price * i.qty, 0), [items])
  const inc = (id)=> setItems(prev => prev.map(i=> i.id===id? {...i, qty:i.qty+1}: i))
  const dec = (id)=> setItems(prev => prev.map(i=> i.id===id? {...i, qty: Math.max(1, i.qty-1)}: i))
  const remove = (id)=> setItems(prev => prev.filter(i => i.id!==id))

  if (!open) return null
  return (
    <div className="cart-panel">
      <div className="inline" style={{justifyContent:'space-between', alignItems:'center'}}>
        <h3>Your Cart</h3>
        <button className="btn" onClick={()=>setOpen(false)}>Close</button>
      </div>
      <hr/>
      {items.length===0 && <div>Cart is empty.</div>}
      {items.map(i => (
        <div key={i.id} className="cart-item">
          <img src={i.imageUrl} alt={i.name} />
          <div className="grow">
            <div><strong>{i.name}</strong></div>
            <small className="muted">${Number(i.price).toFixed(2)}</small>
          </div>
          <div className="actions">
            <button className="btn" onClick={()=>dec(i.id)}>-</button>
            <div>{i.qty}</div>
            <button className="btn" onClick={()=>inc(i.id)}>+</button>
            <button className="btn" onClick={()=>remove(i.id)}>🗑️</button>
          </div>
        </div>
      ))}
      <hr/>
      <div className="inline" style={{justifyContent:'space-between'}}>
        <strong>Total</strong>
        <strong>${total.toFixed(2)}</strong>
      </div>
      <button className="btn" style={{width:'100%', marginTop:8}} onClick={()=>{ alert('Checkout simulated 🎉'); setItems([]) }}>Checkout</button>
    </div>
  )
}

function BookingModal({ open, onClose, product }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [note, setNote] = useState('')

  const submit = async (e)=>{
    e.preventDefault()
    if(!date || !time) return alert('Pick date & time')
    const appointmentAt = new Date(`${date}T${time}:00`)
    await createBooking({
      customerName: name || 'Guest',
      email: email || 'guest@example.com',
      productId: product?.id ?? null,
      appointmentAt: appointmentAt.toISOString(),
      note
    })
    alert('Booking created ✅')
    onClose()
  }

  if (!open) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <h3>Book Try-On {product ? `for ${product.name}`:''}</h3>
        <form onSubmit={submit}>
          <div className="row">
            <input placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
            <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div className="row">
            <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
            <input type="time" value={time} onChange={e=>setTime(e.target.value)} />
          </div>
          <textarea rows="3" placeholder="Notes (optional)" value={note} onChange={e=>setNote(e.target.value)} />
          <div className="inline" style={{justifyContent:'flex-end'}}>
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
            <button className="btn" type="submit">Create Booking</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function App(){
  const [query, setQuery] = useState('')
  const [categories, setCategories] = useState([])
  const [filters, setFilters] = useState({ sort:'relevance' })
  const [items, setItems] = useState(()=> JSON.parse(localStorage.getItem('cart') || '[]'))
  const [data, setData] = useState({ items: [], total: 0 })
  const [openCart, setOpenCart] = useState(false)
  const [bookingFor, setBookingFor] = useState(null)

  useEffect(()=>{ localStorage.setItem('cart', JSON.stringify(items)) }, [items])
  useEffect(()=>{ getCategories().then(setCategories) },[])

  useEffect(()=>{
    const timer = setTimeout(()=>{
      const params = {...filters, q: query || undefined, page: 0, sizePerPage: 50}
      getProducts(params).then(setData)
    }, 300)
    return ()=> clearTimeout(timer)
  }, [query, filters])

  const addToCart = (p)=>{
    setItems(prev => {
      const existing = prev.find(i=> i.id===p.id)
      if (existing) return prev.map(i=> i.id===p.id? {...i, qty:i.qty+1}: i)
      return [...prev, { id:p.id, name:p.name, price:Number(p.price), imageUrl:p.imageUrl, qty:1 }]
    })
  }

  return (
    <>
      <Header query={query} onQuery={setQuery} onOpenCart={()=>setOpenCart(true)} cartCount={items.reduce((s,i)=>s+i.qty,0)} />
      <div className="container">
        <Filters categories={categories} filters={filters} setFilters={setFilters} />
        <div>
          <div className="inline" style={{justifyContent:'space-between', marginBottom:8}}>
            <div><strong>{data.items.length}</strong> items</div>
            <small className="muted">Tip: You can filter by category, price, color, size, or sort.</small>
          </div>
          <div className="grid">
            {data.items.map(p => (
              <ProductCard key={p.id} product={p} onAddToCart={addToCart} onBook={(prod)=> setBookingFor(prod)} />
            ))}
          </div>
        </div>
      </div>
      <div className="footer">
        <hr/>
        <div className="inline" style={{justifyContent:'space-between'}}>
          <div>© {new Date().getFullYear()} Fashion Booking — demo app for learning</div>
          <div><small className="muted">Backend: Spring Boot + MongoDB · Frontend: React + Vite</small></div>
        </div>
      </div>
      <button className="cart" onClick={()=>setOpenCart(v=>!v)}>🧺</button>
      <CartPanel open={openCart} setOpen={setOpenCart} items={items} setItems={setItems} />
      <BookingModal open={!!bookingFor} onClose={()=>setBookingFor(null)} product={bookingFor} />
    </>
  )
}
