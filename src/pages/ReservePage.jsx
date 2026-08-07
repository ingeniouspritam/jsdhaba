function ReservePage({ reservationForm, setReservationForm, onReserveSubmit, user, authMessage }) {
  return (
    <div className="page-stack">
      <section className="card">
        <p className="eyebrow">Reserve a table</p>
        <h1>Book your table online</h1>
        <p>Reserve for a family dinner, birthday party, or business lunch with instant confirmation.</p>
      </section>

      <section className="card-grid two-up">
        <form className="card auth-form" onSubmit={onReserveSubmit}>
          <input value={reservationForm.name} onChange={(e) => setReservationForm({ ...reservationForm, name: e.target.value })} placeholder="Your name" required />
          <input value={reservationForm.email} onChange={(e) => setReservationForm({ ...reservationForm, email: e.target.value })} placeholder="Email address" required />
          <input type="date" value={reservationForm.date} onChange={(e) => setReservationForm({ ...reservationForm, date: e.target.value })} required />
          <input type="time" value={reservationForm.time} onChange={(e) => setReservationForm({ ...reservationForm, time: e.target.value })} required />
          <input type="number" min="1" max="12" value={reservationForm.guests} onChange={(e) => setReservationForm({ ...reservationForm, guests: e.target.value })} required />
          <input value={reservationForm.orderNo} onChange={(e) => setReservationForm({ ...reservationForm, orderNo: e.target.value })} placeholder="Order number (optional)" />
          <select value={reservationForm.tableNo} onChange={(e) => setReservationForm({ ...reservationForm, tableNo: e.target.value })}>
            <option value="A1">Table A1</option>
            <option value="A2">Table A2</option>
            <option value="B1">Table B1</option>
            <option value="B2">Table B2</option>
            <option value="C1">Table C1</option>
          </select>
          <button type="submit" className="primary-btn">Reserve Table</button>
        </form>

        <article className="card">
          <h3>Reservation tips</h3>
          <p>{user ? 'You are logged in and can book instantly.' : 'Create an account first to secure your booking.'}</p>
          {authMessage ? <p className="feedback">{authMessage}</p> : null}
          <ul>
            <li>Ideal for 2–8 guests</li>
            <li>Special occasion requests available</li>
            <li>We confirm reservations within minutes</li>
          </ul>
        </article>
      </section>
    </div>
  )
}

export default ReservePage
