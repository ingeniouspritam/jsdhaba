import { Link } from 'react-router-dom'

function HomePage({ menuItems, onAddToCart, user, authMode, authForm, onAuthFieldChange, onAuthSubmit, onSwitchAuthMode, authMessage, onLogout }) {
  return (
    <div className="page-stack">
      <section className="hero-card home-hero">
        <div>
          <p className="eyebrow">Authentic Indian Dining • JS Dhaba</p>
          <h1>Welcome to JS Dhaba — a feast for every occasion.</h1>
          <p>Enjoy house specials, premium hospitality, and convenient online ordering and reservation services.</p>
          <div className="hero-actions">
            <Link to="/menu" className="primary-btn">Order Now</Link>
            <Link to="/reserve" className="secondary-btn">Reserve a Table</Link>
          </div>
        </div>
        <div className="hero-panel">
          <h3>Why guests love us</h3>
          <ul>
            <li>20+ signature dishes</li>
            <li>Live table booking system</li>
            <li>Secure user accounts</li>
            <li>Admin dashboard for all orders</li>
          </ul>
        </div>
      </section>

      <section className="card-grid">
        <article className="card auth-card">
          <h3>{user ? `Welcome, ${user.name}` : 'Create your account'}</h3>
          <p>{user ? 'You can place orders and reserve tables instantly.' : 'Sign in or register to start ordering online.'}</p>
          {user ? (
            <button onClick={onLogout} className="primary-btn">Logout</button>
          ) : (
            <form onSubmit={onAuthSubmit} className="auth-form">
              <input name="name" value={authForm.name} onChange={onAuthFieldChange} placeholder="Your name" required={authMode === 'register'} />
              <input name="email" type="email" value={authForm.email} onChange={onAuthFieldChange} placeholder="Email address" required />
              <input name="password" type="password" value={authForm.password} onChange={onAuthFieldChange} placeholder="Password" required />
              <button type="submit" className="primary-btn">{authMode === 'login' ? 'Login' : 'Create Account'}</button>
              <button type="button" className="text-btn" onClick={onSwitchAuthMode}>{authMode === 'login' ? 'Need an account? Register' : 'Already have an account? Login'}</button>
            </form>
          )}
          {authMessage ? <p className="feedback">{authMessage}</p> : null}
        </article>
      </section>
    </div>
  )
}

export default HomePage
