function AboutPage() {
  return (
    <div className="page-stack">
      <section className="card">
        <p className="eyebrow">Our story</p>
        <h1>Serving comfort, flavour, and hospitality since 2008.</h1>
        <p>JS Dhaba brings together rich Indian recipes, warm service, and modern digital convenience. Our mission is to make every visit feel personal, whether you dine in or order online.</p>
      </section>
      <section className="card-grid two-up">
        <article className="card">
          <h3>Our promise</h3>
          <p>Fresh ingredients, family recipes, and quick service for dine-in, takeaway, and online orders.</p>
        </article>
        <article className="card">
          <h3>Why choose JS Dhaba</h3>
          <p>From festive platters to everyday favourites, we make every meal memorable in a relaxed atmosphere.</p>
        </article>
      </section>
    </div>
  )
}

export default AboutPage
