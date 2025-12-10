"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface Product {
  id: string
  name: string
  description: string
  price: number
  discount_percent: number
  image_url: string
  stock: number
  is_new: boolean
  is_popular: boolean
}

interface User {
  id: string
  email: string
  password: string
  name: string
  role: "admin" | "user"
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "products" | "users">("dashboard")
  const [products, setProducts] = useState<Product[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [isEditingProduct, setIsEditingProduct] = useState<string | null>(null)
  const [isEditingUser, setIsEditingUser] = useState<string | null>(null)
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [isAddingUser, setIsAddingUser] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const savedProducts = localStorage.getItem("deegee_products")
    const savedUsers = localStorage.getItem("deegee_users")

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    } else {
      // Default products
      const defaultProducts: Product[] = [
        {
          id: "1",
          name: "Premium Wireless Headphones",
          description: "High-quality wireless headphones with noise cancellation and 30-hour battery life",
          price: 299.99,
          discount_percent: 15,
          image_url: "/premium-wireless-headphones.png",
          stock: 45,
          is_new: true,
          is_popular: false,
        },
        {
          id: "2",
          name: "Ultra 4K Webcam",
          description: "Crystal clear 4K video quality with auto-focus and built-in microphone",
          price: 149.99,
          discount_percent: 0,
          image_url: "/4k-webcam.png",
          stock: 32,
          is_new: false,
          is_popular: true,
        },
        {
          id: "3",
          name: "Smart Watch Pro",
          description: "Advanced fitness tracking, heart rate monitor, and 14-day battery life",
          price: 399.99,
          discount_percent: 20,
          image_url: "/smart-watch-pro.jpg",
          stock: 28,
          is_new: true,
          is_popular: true,
        },
        {
          id: "4",
          name: "USB-C Hub Adapter",
          description: "All-in-one hub with multiple ports for seamless connectivity",
          price: 79.99,
          discount_percent: 10,
          image_url: "/usb-c-hub-adapter.jpg",
          stock: 120,
          is_new: false,
          is_popular: false,
        },
        {
          id: "5",
          name: "Mechanical Keyboard RGB",
          description: "Professional gaming keyboard with customizable RGB lighting",
          price: 189.99,
          discount_percent: 25,
          image_url: "/mechanical-keyboard-rgb.jpg",
          stock: 56,
          is_new: true,
          is_popular: false,
        },
        {
          id: "6",
          name: "Portable SSD 1TB",
          description: "Super fast external storage with USB 3.2 connectivity",
          price: 129.99,
          discount_percent: 5,
          image_url: "/portable-ssd-1tb.jpg",
          stock: 67,
          is_new: false,
          is_popular: true,
        },
        {
          id: "7",
          name: "Ergonomic Mouse Wireless",
          description: "Comfortable wireless mouse with adjustable DPI and long battery life",
          price: 59.99,
          discount_percent: 0,
          image_url: "/ergonomic-wireless-mouse.jpg",
          stock: 89,
          is_new: true,
          is_popular: false,
        },
        {
          id: "8",
          name: "Laptop Stand Adjustable",
          description: "Premium aluminum laptop stand with multiple height positions",
          price: 99.99,
          discount_percent: 12,
          image_url: "/laptop-stand-adjustable.jpg",
          stock: 45,
          is_new: false,
          is_popular: true,
        },
        {
          id: "9",
          name: "LED Desk Lamp",
          description: "Dimmable LED lamp with three color modes and USB charging",
          price: 49.99,
          discount_percent: 8,
          image_url: "/led-desk-lamp.png",
          stock: 102,
          is_new: true,
          is_popular: false,
        },
        {
          id: "10",
          name: "Monitor 27 Inch 4K",
          description: "Ultra-high definition 27-inch monitor with HDR support",
          price: 599.99,
          discount_percent: 30,
          image_url: "/monitor-27-4k-uhd.jpg",
          stock: 18,
          is_new: false,
          is_popular: true,
        },
        {
          id: "11",
          name: "Wireless Charging Pad",
          description: "Fast charging pad compatible with all Qi-enabled devices",
          price: 39.99,
          discount_percent: 15,
          image_url: "/wireless-charging-pad.png",
          stock: 78,
          is_new: true,
          is_popular: false,
        },
        {
          id: "12",
          name: "Bluetooth Speaker Premium",
          description: "Portable waterproof speaker with 360-degree sound",
          price: 149.99,
          discount_percent: 20,
          image_url: "/bluetooth-speaker-premium.jpg",
          stock: 51,
          is_new: false,
          is_popular: true,
        },
      ]
      setProducts(defaultProducts)
      localStorage.setItem("deegee_products", JSON.stringify(defaultProducts))
    }

    if (savedUsers) {
      setUsers(JSON.parse(savedUsers))
    } else {
      // Default users
      const defaultUsers: User[] = [
        { id: "1", email: "admin@deegee.com", password: "password", name: "Admin User", role: "admin" },
        { id: "2", email: "user1@deegee.com", password: "password", name: "John Doe", role: "user" },
        { id: "3", email: "user2@deegee.com", password: "password", name: "Jane Smith", role: "user" },
        { id: "4", email: "user3@deegee.com", password: "password", name: "Mike Johnson", role: "user" },
        { id: "5", email: "user4@deegee.com", password: "password", name: "Sarah Williams", role: "user" },
        { id: "6", email: "user5@deegee.com", password: "password", name: "Tom Brown", role: "user" },
        { id: "7", email: "user6@deegee.com", password: "password", name: "Emily Davis", role: "user" },
        { id: "8", email: "user7@deegee.com", password: "password", name: "David Miller", role: "user" },
        { id: "9", email: "user8@deegee.com", password: "password", name: "Lisa Anderson", role: "user" },
        { id: "10", email: "user9@deegee.com", password: "password", name: "Chris Taylor", role: "user" },
        { id: "11", email: "user10@deegee.com", password: "password", name: "Rachel Thomas", role: "user" },
      ]
      setUsers(defaultUsers)
      localStorage.setItem("deegee_users", JSON.stringify(defaultUsers))
    }
  }, [])

  const updateProductsStorage = (newProducts: Product[]) => {
    setProducts(newProducts)
    localStorage.setItem("deegee_products", JSON.stringify(newProducts))
  }

  const updateUsersStorage = (newUsers: User[]) => {
    setUsers(newUsers)
    localStorage.setItem("deegee_users", JSON.stringify(newUsers))
  }

  const handleSaveProduct = (formData: any) => {
    if (isEditingProduct) {
      const updated = products.map((p) => (p.id === isEditingProduct ? formData : p))
      updateProductsStorage(updated)
    } else {
      const newProduct = { ...formData, id: Date.now().toString() }
      updateProductsStorage([...products, newProduct])
    }
    setIsEditingProduct(null)
    setIsAddingProduct(false)
  }

  const handleSaveUser = (formData: any) => {
    if (isEditingUser) {
      const updated = users.map((u) => (u.id === isEditingUser ? formData : u))
      updateUsersStorage(updated)
    } else {
      const newUser = { ...formData, id: Date.now().toString() }
      updateUsersStorage([...users, newUser])
    }
    setIsEditingUser(null)
    setIsAddingUser(false)
  }

  const handleDeleteProduct = (id: string) => {
    updateProductsStorage(products.filter((p) => p.id !== id))
  }

  const handleDeleteUser = (id: string) => {
    updateUsersStorage(users.filter((u) => u.id !== id))
  }

  const handleLogout = () => {
    router.push("/login")
  }

  if (!mounted) return null

  const totalRevenue = products.reduce((sum, p) => sum + p.price * (1 - p.discount_percent / 100) * p.stock, 0)
  const totalProducts = products.length
  const totalUsers = users.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white border-b border-black/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">DeeGee Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white font-bold hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex gap-0">
          {["dashboard", "products", "users"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-4 font-bold border-b-2 transition-colors capitalize ${
                activeTab === tab ? "border-black text-black" : "border-transparent text-gray-600 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-12">Welcome to Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 border border-black/10 hover:shadow-lg transition-shadow">
                <p className="text-gray-600 font-bold mb-2">Total Products</p>
                <p className="text-5xl font-bold text-black">{totalProducts}</p>
              </div>
              <div className="bg-white p-8 border border-black/10 hover:shadow-lg transition-shadow">
                <p className="text-gray-600 font-bold mb-2">Total Users</p>
                <p className="text-5xl font-bold text-black">{totalUsers}</p>
              </div>
              <div className="bg-white p-8 border border-black/10 hover:shadow-lg transition-shadow">
                <p className="text-gray-600 font-bold mb-2">Total Inventory Value</p>
                <p className="text-5xl font-bold text-black">${totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold">Products Management</h2>
              <button
                onClick={() => setIsAddingProduct(!isAddingProduct)}
                className="px-6 py-3 bg-black text-white font-bold hover:bg-gray-800 transition-colors"
              >
                {isAddingProduct ? "Cancel" : "Add New Product"}
              </button>
            </div>

            {/* Add/Edit Product Form */}
            {(isAddingProduct || isEditingProduct) && (
              <ProductForm
                product={isEditingProduct ? products.find((p) => p.id === isEditingProduct) : undefined}
                onSave={handleSaveProduct}
                onCancel={() => {
                  setIsAddingProduct(false)
                  setIsEditingProduct(null)
                }}
              />
            )}

            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-6 border border-black/10 flex items-center justify-between hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-6 flex-1">
                    <img
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      className="w-16 h-16 object-cover bg-gray-200"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                      <p className="text-gray-600 text-sm">
                        ${product.price.toFixed(2)} • Discount: {product.discount_percent}% • Stock: {product.stock}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setIsAddingProduct(false)
                        setIsEditingProduct(isEditingProduct === product.id ? null : product.id)
                      }}
                      className="px-4 py-2 bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="px-4 py-2 bg-red-600 text-white font-bold hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold">Users Management</h2>
              <button
                onClick={() => setIsAddingUser(!isAddingUser)}
                className="px-6 py-3 bg-black text-white font-bold hover:bg-gray-800 transition-colors"
              >
                {isAddingUser ? "Cancel" : "Add New User"}
              </button>
            </div>

            {/* Add/Edit User Form */}
            {(isAddingUser || isEditingUser) && (
              <UserForm
                user={isEditingUser ? users.find((u) => u.id === isEditingUser) : undefined}
                onSave={handleSaveUser}
                onCancel={() => {
                  setIsAddingUser(false)
                  setIsEditingUser(null)
                }}
              />
            )}

            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="bg-white p-6 border border-black/10 flex items-center justify-between hover:shadow-md transition-shadow"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{user.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {user.email} • Role: <span className="font-bold capitalize">{user.role}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setIsAddingUser(false)
                        setIsEditingUser(isEditingUser === user.id ? null : user.id)
                      }}
                      className="px-4 py-2 bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="px-4 py-2 bg-red-600 text-white font-bold hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function ProductForm({
  product,
  onSave,
  onCancel,
}: {
  product?: Product
  onSave: (data: Product) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState(
    product || {
      id: "",
      name: "",
      description: "",
      price: 0,
      discount_percent: 0,
      image_url: "",
      stock: 0,
      is_new: false,
      is_popular: false,
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="bg-white p-8 border border-black/10 mb-8">
      <h3 className="text-2xl font-bold mb-6">{product ? "Edit Product" : "Add New Product"}</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-bold mb-2">Product Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-black/20"
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Price</label>
            <input
              type="number"
              required
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border border-black/20"
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Discount %</label>
            <input
              type="number"
              value={formData.discount_percent}
              onChange={(e) => setFormData({ ...formData, discount_percent: Number.parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-black/20"
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Stock</label>
            <input
              type="number"
              required
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: Number.parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-black/20"
            />
          </div>
        </div>
        <div>
          <label className="block font-bold mb-2">Description</label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-black/20 h-24"
          />
        </div>
        <div>
          <label className="block font-bold mb-2">Image URL</label>
          <input
            type="text"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            className="w-full px-4 py-2 border border-black/20"
          />
        </div>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_new}
              onChange={(e) => setFormData({ ...formData, is_new: e.target.checked })}
            />
            <span className="font-bold">Mark as New</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_popular}
              onChange={(e) => setFormData({ ...formData, is_popular: e.target.checked })}
            />
            <span className="font-bold">Mark as Popular</span>
          </label>
        </div>
        <div className="flex gap-4">
          <button type="submit" className="px-6 py-3 bg-black text-white font-bold hover:bg-gray-800">
            {product ? "Update Product" : "Add Product"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-black/20 font-bold hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

function UserForm({
  user,
  onSave,
  onCancel,
}: {
  user?: User
  onSave: (data: User) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState(
    user || {
      id: "",
      email: "",
      password: "",
      name: "",
      role: "user" as const,
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="bg-white p-8 border border-black/10 mb-8">
      <h3 className="text-2xl font-bold mb-6">{user ? "Edit User" : "Add New User"}</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-bold mb-2">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-black/20"
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-black/20"
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-black/20"
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as "admin" | "user" })}
              className="w-full px-4 py-2 border border-black/20"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <div className="flex gap-4">
          <button type="submit" className="px-6 py-3 bg-black text-white font-bold hover:bg-gray-800">
            {user ? "Update User" : "Add User"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-black/20 font-bold hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
