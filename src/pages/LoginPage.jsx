function LoginPage({ user, authMode, authForm, onAuthFieldChange, onAuthSubmit, onSwitchAuthMode, authMessage, onLogout }) {
  return (
    <div className="page-stack">
      <section className="card auth-card">
        <p className="eyebrow">Account access</p>
        <h1>{user ? `Welcome back, ${user.name}` : authMode === 'login' ? 'Login to JS Dhaba' : 'Create your JS Dhaba account'}</h1>
        <p>{user ? 'You can place orders and reserve tables instantly.' : 'Use your account to order food and book a table online.'}</p>

        {user ? (
          <button onClick={onLogout} className="primary-btn">Logout</button>
        ) : (
          <form onSubmit={onAuthSubmit} className="auth-form">
            {authMode === 'register' ? <input name="name" value={authForm.name} onChange={onAuthFieldChange} placeholder="Your name" required /> : null}
            <input name="email" type="email" value={authForm.email} onChange={onAuthFieldChange} placeholder="Email address" required />
            <input name="password" type="password" value={authForm.password} onChange={onAuthFieldChange} placeholder="Password" required />
            <button type="submit" className="primary-btn">{authMode === 'login' ? 'Login' : 'Create Account'}</button>
            <button type="button" className="text-btn" onClick={onSwitchAuthMode}>{authMode === 'login' ? 'Need an account? Register' : 'Already have an account? Login'}</button>
          </form>
        )}

        {authMessage ? <p className="feedback">{authMessage}</p> : null}
      </section>
    </div>
  )
}

export default LoginPage
