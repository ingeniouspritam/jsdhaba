function MenuPage({ menuItems, onAddToCart, cart }) {
  return (
    <div className="page-stack">
      <section className="card">
        <p className="eyebrow">Menu</p>
        <h1>Choose from 20+ signature dishes</h1>
        <p>Every item is prepared fresh and served with authentic flavours. Add favourites to your cart and place your order instantly.</p>
      </section>

      <section className="menu-grid">
        {menuItems.map((item) => (
          <article key={item.id} className="menu-card">
            {item.image ? <img className="menu-image" src={item.image} alt={item.name} /> : null}
            <div className="menu-card-top">
              <span className="menu-badge">{item.category}</span>
              <strong>₹{item.price}</strong>
            </div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <div className="menu-footer">
              <span>{item.spice}</span>
              <button onClick={() => onAddToCart(item)}>Add to order</button>
            </div>
          </article>
        ))}
      </section>

      <section className="card summary-card">
        <h3>Your current order</h3>
        <p>{cart.length ? `${cart.length} item(s) ready for checkout.` : 'Add dishes to build your order.'}</p>
      </section>
    </div>
  )
}

export default MenuPage
