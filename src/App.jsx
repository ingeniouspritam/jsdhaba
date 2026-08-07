import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import MenuPage from './pages/MenuPage'
import ContactPage from './pages/ContactPage'
import ReservePage from './pages/ReservePage'
import LoginPage from './pages/LoginPage'
import { db, initDatabase, saveDatabase } from './database'

function App() {
  const [menuItems, setMenuItems] = useState([])
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [authMode, setAuthMode] = useState('login')
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' })
  const [authMessage, setAuthMessage] = useState('')
  const [orders, setOrders] = useState([])
  const [reservations, setReservations] = useState([])
  const [reservationForm, setReservationForm] = useState({ name: '', email: '', date: '', time: '', guests: 2, tableNo: 'A1', orderNo: '' })
  const [adminView, setAdminView] = useState('orders')
  const [newItem, setNewItem] = useState({ name: '', category: '', price: '', description: '', spice: 'Mild', image: '' })

  useEffect(() => {
    const loadData = async () => {
      const data = await initDatabase()
      setUsers(data.users)
      setMenuItems(data.menuItems)
      setOrders(data.orders)
      setReservations(data.reservations)
    }
    loadData()
  }, [])

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const visibleOrders = useMemo(() => {
    if (!user) return []
    if (user.role === 'superuser') return orders
    return orders.filter((order) => order.customer?.email === user.email)
  }, [orders, user])

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((entry) => entry.id === item.id)
      if (existing) return prev.map((entry) => entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry)
      return [...prev, { ...item, quantity: 1 }]
    })
    setAuthMessage(`${item.name} added to your order.`)
  }

  const updateQuantity = (id, delta) => {
    setCart((prev) => prev.map((entry) => entry.id === id ? { ...entry, quantity: entry.quantity + delta } : entry).filter((entry) => entry.quantity > 0))
  }

  const handleAuthSubmit = (e) => {
    e.preventDefault()
    if (authMode === 'register') {
      const exists = users.some((entry) => entry.email === authForm.email)
      if (exists) {
        setAuthMessage('Account already exists. Please login instead.')
        return
      }
      const newUser = { id: Date.now(), name: authForm.name, email: authForm.email, password: authForm.password, role: 'customer' }
      const nextUsers = [...users, newUser]
      setUsers(nextUsers)
      db.data.users = nextUsers
      saveDatabase()
      setUser(newUser)
      setAuthMessage('Account created successfully. You can now order and reserve tables.')
    } else {
      const found = users.find((entry) => entry.email === authForm.email && entry.password === authForm.password)
      if (!found) {
        setAuthMessage('Invalid email or password.')
        return
      }
      setUser(found)
      setAuthMessage(`Welcome back, ${found.name}.`)
    }
    setAuthForm({ name: '', email: '', password: '' })
  }

  const handleLogout = () => {
    setUser(null)
    setAuthMessage('Logged out successfully.')
  }

  const placeOrder = () => {
    if (!user) {
      setAuthMessage('Please create an account before placing an order.')
      return
    }
    if (!cart.length) {
      setAuthMessage('Your cart is empty. Add items first.')
      return
    }
    const order = { id: Date.now(), customer: user, items: cart, total, createdAt: new Date().toLocaleString() }
    const nextOrders = [order, ...orders]
    setOrders(nextOrders)
    db.data.orders = nextOrders
    saveDatabase()
    setCart([])
    setAuthMessage('Order placed successfully. Kitchen is preparing your meal.')
  }

  const handleReserveSubmit = (e) => {
    e.preventDefault()
    if (!user) {
      setAuthMessage('Please log in to reserve a table.')
      return
    }
    const reservation = { id: Date.now(), customer: user, ...reservationForm, createdAt: new Date().toLocaleString() }
    const nextReservations = [reservation, ...reservations]
    setReservations(nextReservations)
    db.data.reservations = nextReservations
    saveDatabase()
    setReservationForm({ name: '', email: '', date: '', time: '', guests: 2, tableNo: 'A1', orderNo: '' })
    setAuthMessage('Table reserved successfully. We will confirm shortly.')
  }

  const addMenuItem = (e) => {
    e.preventDefault()
    if (!user?.role || user.role !== 'superuser') {
      setAuthMessage('Only superuser can add menu items.')
      return
    }
    const item = { id: Date.now(), name: newItem.name, category: newItem.category, price: Number(newItem.price), description: newItem.description, spice: newItem.spice, image: newItem.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' }
    const nextMenuItems = [...menuItems, item]
    setMenuItems(nextMenuItems)
    db.data.menuItems = nextMenuItems
    saveDatabase()
    setNewItem({ name: '', category: '', price: '', description: '', spice: 'Mild', image: '' })
    setAuthMessage('New menu item added successfully.')
  }

  const updateOrderStatus = (orderId, status) => {
    if (!user?.role || user.role !== 'superuser') return
    const nextOrders = orders.map((order) => order.id === orderId ? { ...order, status } : order)
    setOrders(nextOrders)
    db.data.orders = nextOrders
    saveDatabase()
    setAuthMessage(`Order marked as ${status}.`)
  }

  const updateReservationStatus = (reservationId, status) => {
    if (!user?.role || user.role !== 'superuser') return
    const nextReservations = reservations.map((reservation) => reservation.id === reservationId ? { ...reservation, status } : reservation)
    setReservations(nextReservations)
    db.data.reservations = nextReservations
    saveDatabase()
    setAuthMessage(`Reservation marked as ${status}.`)
  }

  const navItems = user
    ? [
        { to: '/menu', label: 'My Order' },
        { to: '/reserve', label: 'Reserve Table' },
        { to: '/login', label: `Logout (${user.name})`, onClick: handleLogout },
      ]
    : [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About' },
        { to: '/menu', label: 'Menu' },
        { to: '/contact', label: 'Contact' },
        { to: '/reserve', label: 'Reserve Table' },
        { to: '/login', label: 'Login' },
      ]

  return (
    <BrowserRouter>
      <div className="app-shell">
        <nav className="top-nav">
          <Link to="/" className="brand">JS Dhaba</Link>
          <div className="nav-links">
            {navItems.map((item) => (
              <Link key={`${item.to}-${item.label}`} to={item.to} onClick={item.onClick}>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage menuItems={menuItems} onAddToCart={addToCart} user={user} authMode={authMode} authForm={authForm} onAuthFieldChange={(e) => setAuthForm({ ...authForm, [e.target.name]: e.target.value })} onAuthSubmit={handleAuthSubmit} onSwitchAuthMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} authMessage={authMessage} onLogout={handleLogout} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/menu" element={<MenuPage menuItems={menuItems} onAddToCart={addToCart} cart={cart} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/reserve" element={<ReservePage reservationForm={reservationForm} setReservationForm={setReservationForm} onReserveSubmit={handleReserveSubmit} user={user} authMessage={authMessage} />} />
          <Route path="/login" element={<LoginPage user={user} authMode={authMode} authForm={authForm} onAuthFieldChange={(e) => setAuthForm({ ...authForm, [e.target.name]: e.target.value })} onAuthSubmit={handleAuthSubmit} onSwitchAuthMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} authMessage={authMessage} onLogout={handleLogout} />} />
        </Routes>

        <section className="card-grid lower-grid">
          <article className="card order-card">
            <h3>Order summary</h3>
            {cart.length === 0 ? <p>No items selected yet.</p> : cart.map((item) => (
              <div key={item.id} className="list-row">
                <span>{item.name} x {item.quantity}</span>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
              </div>
            ))}
            <div className="totals">
              <div><span>Subtotal</span><strong>₹{total}</strong></div>
              <div><span>Delivery</span><strong>Free</strong></div>
            </div>
            <button className="primary-btn" onClick={placeOrder}>Place Order</button>

            {user ? (
              <div className="order-history">
                <h4>Your recent orders</h4>
                {visibleOrders.length === 0 ? (
                  <p>No orders yet. Your placed orders will appear here.</p>
                ) : (
                  visibleOrders.map((order) => (
                    <div key={order.id} className="history-item history-item-stack">
                      <div>
                        <strong>Order #{order.id}</strong>
                        <p>{order.createdAt}</p>
                      </div>
                      <span>₹{order.total}</span>
                      <div className="history-items">
                        {order.items?.map((item) => (
                          <span key={`${order.id}-${item.id}`}>
                            {item.name} × {item.quantity}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : null}
          </article>

          {user?.role === 'superuser' ? (
            <article className="card admin-card">
              <h3>Admin backend</h3>
              <div className="admin-tabs">
                <button className={adminView === 'orders' ? 'chip active' : 'chip'} onClick={() => setAdminView('orders')}>Orders</button>
                <button className={adminView === 'reservations' ? 'chip active' : 'chip'} onClick={() => setAdminView('reservations')}>Reservations</button>
                <button className={adminView === 'users' ? 'chip active' : 'chip'} onClick={() => setAdminView('users')}>Users</button>
              </div>

              <form onSubmit={addMenuItem} className="auth-form">
                <input placeholder="Dish name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} required />
                <input placeholder="Category" value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} required />
                <input type="number" placeholder="Price" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} required />
                <input placeholder="Description" value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} required />
                <input placeholder="Image URL" value={newItem.image} onChange={(e) => setNewItem({ ...newItem, image: e.target.value })} />
                <button className="primary-btn" type="submit">Add Menu Item</button>
              </form>

              {adminView === 'orders' ? orders.map((order) => (
                <div key={order.id} className="list-row" style={{ display: 'block', padding: '12px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '6px' }}>
                    <strong>Order #{order.id} • {order.customer?.name || 'Unknown customer'}</strong>
                    <span>₹{order.total}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {order.items?.map((item) => (
                      <small key={`${order.id}-${item.id}`}>
                        • {item.name} × {item.quantity}
                      </small>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '12px', color: order.status === 'cancelled' ? '#d9534f' : order.status === 'completed' ? '#2e7d32' : '#f0ad4e', fontWeight: '600' }}>
                      Status: {order.status || 'pending'}
                    </span>
                    <button type="button" className="chip" onClick={() => updateOrderStatus(order.id, 'completed')}>Close Order</button>
                    <button type="button" className="chip" onClick={() => updateOrderStatus(order.id, 'cancelled')}>Cancel Order</button>
                  </div>
                  <small>{order.createdAt}</small>
                </div>
              )) : null}
              {adminView === 'reservations' ? reservations.map((reservation) => (
                <div key={reservation.id} className="list-row" style={{ display: 'block', padding: '12px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '6px' }}>
                    <strong>{reservation.name}</strong>
                    <span>Table {reservation.tableNo}</span>
                  </div>
                  <small>{reservation.date} • {reservation.time}</small>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                    <small>Guests: {reservation.guests}</small>
                    <small>Order No: {reservation.orderNo || 'Not provided'}</small>
                    <small>Email: {reservation.email}</small>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '12px', color: reservation.status === 'cancelled' ? '#d9534f' : reservation.status === 'confirmed' ? '#2e7d32' : '#f0ad4e', fontWeight: '600' }}>
                      Status: {reservation.status || 'pending'}
                    </span>
                    <button type="button" className="chip" onClick={() => updateReservationStatus(reservation.id, 'confirmed')}>Close Reservation</button>
                    <button type="button" className="chip" onClick={() => updateReservationStatus(reservation.id, 'cancelled')}>Cancel Reservation</button>
                  </div>
                </div>
              )) : null}
              {adminView === 'users' ? users.map((entry) => <div key={entry.id} className="list-row"><span>{entry.name} ({entry.role})</span><small>{entry.email}</small></div>) : null}
            </article>
          ) : null}
        </section>
      </div>
    </BrowserRouter>
  )
}

export default App
