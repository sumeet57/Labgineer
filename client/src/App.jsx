import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ThemeProvider, useTheme } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'

import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/product/ProductsPage'
import ProductDetailPage from './pages/product/ProductDetailPage'
import BlogPage from './pages/blog/BlogPage'
import BlogPostPage from './pages/blog/BlogPostPage'
import ResearchPage from './pages/ResearchPage'
import CartPage from './pages/CartPage'

import AuthPage from './pages/auth/AuthPages'
import {
  DashboardLayout,
  DashboardOverview,
  DashboardOrders,
  DashboardProfile,
} from './pages/dashboard/DashboardPages'


// oauth2 imports
import { GoogleOAuthProvider } from '@react-oauth/google'
import TermsAndConditions from './pages/policies/TermsAndConditions'
import PrivacyStatement from './pages/policies/PrivacyStatement'
import RefundPolicy from './pages/policies/RefundPolicy'
import Contact from './pages/policies/Contact'
import Shipping from './pages/policies/Shipping'
import About from './pages/policies/About'

function ToastWrapper() {
  const { isDark } = useTheme()
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3500}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      theme={isDark ? 'dark' : 'light'}
      toastStyle={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '13px',
        borderRadius: '12px',
        border: '1px solid var(--color-border)',
        background: 'var(--color-bg-card)',
        color: 'var(--color-text)',
      }}
    />
  )
}

const clientid = import.meta.env.VITE_GOOGLE_CLIENT_ID

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                {/* Public */}
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/research" element={<ResearchPage />} />
                <Route path="/cart" element={<CartPage />} />

                {/* Auth */}
                <Route path="/auth" element={
                  <GoogleOAuthProvider clientId={clientid}>
                    <AuthPage />
                  </GoogleOAuthProvider>
                } />
                {/* <Route path="/auth/register" element={<RegisterPage />} /> */}

                {/* Dashboard (protected inside DashboardLayout) */}
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<DashboardOverview />} />
                  <Route path="orders" element={<DashboardOrders />} />
                  <Route path="profile" element={<DashboardProfile />} />
                </Route>
              </Route>

              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/privacy" element={<PrivacyStatement />} />
              <Route path="/refund" element={<RefundPolicy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/shipping" element={<Shipping />} />
            </Routes>
            <ToastWrapper />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
    
  )
}