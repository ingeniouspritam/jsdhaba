const STORAGE_KEY = 'js-dhaba-db'

const createDefaultData = () => ({
  users: [
    { id: 1, name: 'Admin', email: 'admin@jsdhaba.com', password: 'admin123', role: 'superuser' },
  ],
  menuItems: [
    { id: 1, name: 'Paneer Tikka Masala', category: 'Main Course', price: 320, description: 'Creamy tomato gravy with grilled paneer and spices.', spice: 'Medium', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80' },
    { id: 2, name: 'Butter Chicken', category: 'Main Course', price: 360, description: 'Tender chicken in buttery tomato gravy.', spice: 'Mild', image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=800&q=80' },
    { id: 3, name: 'Dal Makhani', category: 'Veg', price: 240, description: 'Slow-cooked black lentils with cream and herbs.', spice: 'Mild', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80' },
    { id: 4, name: 'Vegetable Biryani', category: 'Rice', price: 280, description: 'Fragrant rice layered with vegetables and spices.', spice: 'Medium', image: 'https://images.unsplash.com/photo-1626074348374-7f4e3d1f6d85?auto=format&fit=crop&w=800&q=80' },
    { id: 5, name: 'Chicken Biryani', category: 'Rice', price: 320, description: 'Aromatic basmati rice with chicken and caramelized onions.', spice: 'Medium', image: 'https://images.unsplash.com/photo-1599043513900-4f8d4e9f5f9f?auto=format&fit=crop&w=800&q=80' },
    { id: 6, name: 'Tandoori Roti', category: 'Bread', price: 40, description: 'Freshly baked clay oven flatbread.', spice: 'None', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' },
    { id: 7, name: 'Naan', category: 'Bread', price: 55, description: 'Soft fluffy naan baked in the tandoor.', spice: 'None', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80' },
    { id: 8, name: 'Masala Papad', category: 'Starter', price: 90, description: 'Crunchy papad topped with onions, tomato and spice.', spice: 'Spicy', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80' },
    { id: 9, name: 'Samosa', category: 'Starter', price: 80, description: 'Crispy pastry filled with spiced potatoes.', spice: 'Medium', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80' },
    { id: 10, name: 'Hara Bhara Kabab', category: 'Starter', price: 180, description: 'Green vegetable patties served with chutney.', spice: 'Mild', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80' },
    { id: 11, name: 'Chilli Garlic Chicken', category: 'Main Course', price: 340, description: 'Wok-tossed chicken with garlic and chilli.', spice: 'Spicy', image: 'https://images.unsplash.com/photo-1518492106315-9be8b51a1d83?auto=format&fit=crop&w=800&q=80' },
    { id: 12, name: 'Kadhai Paneer', category: 'Main Course', price: 300, description: 'Paneer cooked with bell peppers and onion in kadhai masala.', spice: 'Medium', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80' },
    { id: 13, name: 'Malai Kofta', category: 'Main Course', price: 310, description: 'Soft vegetable dumplings in rich creamy gravy.', spice: 'Mild', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80' },
    { id: 14, name: 'Prawn Curry', category: 'Seafood', price: 380, description: 'Fresh prawns cooked in coastal-style curry.', spice: 'Medium', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80' },
    { id: 15, name: 'Fish Amritsari', category: 'Seafood', price: 360, description: 'Crisp fried fish with tangy spices.', spice: 'Medium', image: 'https://images.unsplash.com/photo-1539136788836-5699e78bfc75?auto=format&fit=crop&w=800&q=80' },
    { id: 16, name: 'Gulab Jamun', category: 'Dessert', price: 120, description: 'Soft milk dumplings in rose sugar syrup.', spice: 'None', image: 'https://images.unsplash.com/photo-1573096108467-2f4a0f3c4b3d?auto=format&fit=crop&w=800&q=80' },
    { id: 17, name: 'Rasmalai', category: 'Dessert', price: 140, description: 'Softer than ever with cardamom and saffron.', spice: 'None', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80' },
    { id: 18, name: 'Mango Lassi', category: 'Beverage', price: 120, description: 'Refreshing yoghurt drink with ripe mango.', spice: 'None', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80' },
    { id: 19, name: 'Masala Chai', category: 'Beverage', price: 80, description: 'Warm tea brewed with aromatic spices.', spice: 'None', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80' },
    { id: 20, name: 'Jeera Rice', category: 'Rice', price: 180, description: 'Fluffy rice tempered with cumin seeds.', spice: 'Mild', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80' },
  ],
  orders: [],
  reservations: [],
})

export const db = {
  data: createDefaultData(),
}

const readFromStorage = () => {
  if (typeof window === 'undefined') {
    return createDefaultData()
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return createDefaultData()
    }

    const parsed = JSON.parse(stored)
    return {
      ...createDefaultData(),
      ...parsed,
      users: parsed.users ?? [],
      menuItems: parsed.menuItems ?? [],
      orders: parsed.orders ?? [],
      reservations: parsed.reservations ?? [],
    }
  } catch {
    return createDefaultData()
  }
}

export const initDatabase = async () => {
  db.data = readFromStorage()
  if (!db.data.users.length) {
    db.data.users = createDefaultData().users
  }
  if (!db.data.menuItems.length) {
    db.data.menuItems = createDefaultData().menuItems
  }
  return db.data
}

export const saveDatabase = async (data = db.data) => {
  db.data = data
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(db.data))
  }
  return db.data
}
