import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import FeaturedSection from './components/FeaturedSection';
import CatalogPage from './components/CatalogPage';
import PlantDetailPage from './components/PlantDetailPage';
import CheckoutPage from './components/CheckoutPage';
import OrderSuccessPage from './components/OrderSuccessPage';
import OrdersPage from './components/OrdersPage';
import MyPlantsPage from './components/MyPlantsPage';
import ProfilePage from './components/ProfilePage';
import ContactPage from './components/ContactPage';
import AuthPage from './components/AuthPage';
import LightboxModal from './components/LightboxModal';
import CartDrawer from './components/CartDrawer';
import AuthRequiredModal from './components/AuthRequiredModal';
import Footer from './components/Footer';
import { plants } from './data/plants';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Navigation tabs:
  // 'beranda' | 'katalog' | 'detail' | 'checkout' | 'pesanan-berhasil' | 'pesanan-saya' | 'tanaman-saya' | 'profile' | 'kontak' | 'auth'
  const [activeTab, setActiveTab] = useState('beranda');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [redirectAfterAuth, setRedirectAfterAuth] = useState(null);
  
  // Cart state with localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('greenleaf_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // User auth state with localStorage
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('greenleaf_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Orders state with localStorage (includes sample demo order if empty)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('greenleaf_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map(({ status, ...rest }) => rest);
      }
      return [
        {
          id: 'GL-89241',
          userEmail: 'reyvan@example.com',
          date: '25 September 2026',
          createdAt: '2026-09-25T10:30:00.000Z',
          items: [
            {
              id: 11,
              name: 'Monstera Deliciosa',
              price: 150000,
              quantity: 1,
              image: '/images/unggulan1.jpg',
            },
            {
              id: 13,
              name: 'Snake Plant (Sansevieria)',
              price: 75000,
              quantity: 1,
              image: '/images/unggulan3.jpg',
            },
          ],
          subtotal: 225000,
          shippingFee: 25000,
          total: 250000,
          paymentMethod: 'Transfer Bank',
          shippingData: {
            recipientName: 'Reyvan Maulana',
            phone: '0812-3456-7890',
            address: 'Jl. Dago Asri No. 12',
            city: 'Bandung',
            postalCode: '40135',
            notes: 'Mohon dibungkus aman dengan bubble wrap tebal',
          },
        },
      ];
    } catch {
      return [];
    }
  });

  // My Plants state with localStorage (persisted purchased plants for care guide)
  const [myPlants, setMyPlants] = useState(() => {
    try {
      const saved = localStorage.getItem('greenleaf_my_plants');
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 11,
          userEmail: 'reyvan@example.com',
          name: 'Monstera Deliciosa',
          price: 150000,
          categories: ['unggulan', 'indoor'],
          image: '/images/unggulan1.jpg',
          description: 'Tanaman ikonik favorit dengan daun berlubang khas yang mempercantik interior.',
          purchaseDate: '25 September 2026',
          light: 'Terang Tidak Langsung',
          water: '1-2x Seminggu',
          humidity: 'Tinggi (60-70%)',
          careTips: 'Bersihkan debu pada daun sebulan sekali dengan kain halus basah.',
        },
        {
          id: 13,
          userEmail: 'reyvan@example.com',
          name: 'Snake Plant (Sansevieria)',
          price: 75000,
          categories: ['unggulan', 'indoor'],
          image: '/images/unggulan3.jpg',
          description: 'Penghasil oksigen alami dan penyerap polusi terbaik, hampir mustahil mati.',
          purchaseDate: '25 September 2026',
          light: 'Rendah hingga Terang',
          water: '2-3 Minggu Sekali',
          humidity: 'Toleran Segala Kondisi',
          careTips: 'Hanya butuh sedikit air saat media benar-benar kering.',
        },
      ];
    } catch {
      return [];
    }
  });

  // Modals & UI states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthRequiredModalOpen, setIsAuthRequiredModalOpen] = useState(false);
  const [lightboxData, setLightboxData] = useState(null); // { url, title }
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('greenleaf_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('greenleaf_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('greenleaf_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('greenleaf_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('greenleaf_my_plants', JSON.stringify(myPlants));
    } catch (e) {
      console.error(e);
    }
  }, [myPlants]);

  // Toast notification auto-dismiss
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Cart actions
  const handleAddToCart = (plant) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === plant.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...plant, quantity: 1 }];
    });

    setToastMessage(`"${plant.name}" berhasil ditambahkan ke keranjang!`);
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Lightbox
  const handleOpenLightbox = (url, title) => {
    setLightboxData({ url, title });
  };

  const handleCloseLightbox = () => {
    setLightboxData(null);
  };

  // Navigations
  const handleGoToCatalog = (category = 'all') => {
    setSelectedCategory(category);
    setActiveTab('katalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToContact = () => {
    setActiveTab('kontak');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetail = (plant) => {
    setSelectedPlant(plant);
    setActiveTab('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Proceed to Checkout flow (Auth gate)
  const handleProceedToCheckout = () => {
    if (!user) {
      setIsAuthRequiredModalOpen(true);
      return;
    }
    setActiveTab('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthModalChoice = (mode) => {
    setIsAuthRequiredModalOpen(false);
    setRedirectAfterAuth('checkout');
    setActiveTab('auth');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Confirm Order in CheckoutPage
  const handleConfirmOrder = (newOrder) => {
    const orderWithUser = {
      ...newOrder,
      userEmail: user?.email || '',
    };

    // 1. Add order to history
    setOrders((prev) => [orderWithUser, ...prev]);

    // 2. Add purchased plants to MyPlants
    setMyPlants((prev) => {
      const updated = [...prev];
      newOrder.items.forEach((item) => {
        // Find base plant spec from catalog data
        const basePlant = plants.find((p) => p.id === item.id) || item;
        const exists = updated.some(
          (p) => p.name === item.name && p.userEmail === (user?.email || '')
        );
        if (!exists) {
          updated.unshift({
            ...basePlant,
            userEmail: user?.email || '',
            purchaseDate: newOrder.date,
          });
        }
      });
      return updated;
    });

    // 3. Clear cart
    setCart([]);

    // 4. Set current order and redirect to success page
    setCurrentOrder(orderWithUser);
    setActiveTab('pesanan-berhasil');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth actions
  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    setToastMessage(`Selamat datang, ${loggedInUser.name}!`);

    if (redirectAfterAuth === 'checkout' && cart.length > 0) {
      setActiveTab('checkout');
      setRedirectAfterAuth(null);
    } else {
      setActiveTab('beranda');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    const prevName = user?.name;
    setUser(null);
    setToastMessage(`Akun ${prevName || ''} berhasil keluar.`);
    setActiveTab('beranda');
  };

  const handleUpdateProfile = (updatedUser, prevEmail) => {
    const currentEmail = (prevEmail || user?.email || '').toLowerCase().trim();
    const newEmail = (updatedUser.email || '').toLowerCase().trim();

    // 1. Update user session state (syncs to localStorage.greenleaf_user automatically)
    setUser(updatedUser);

    // 2. Persist profile updates in registered users database
    try {
      const dbStr = localStorage.getItem('greenleaf_users_db');
      let db = dbStr ? JSON.parse(dbStr) : [];
      
      const index = db.findIndex(
        (u) =>
          u.email?.toLowerCase().trim() === currentEmail ||
          u.email?.toLowerCase().trim() === newEmail
      );

      if (index !== -1) {
        db[index] = { ...db[index], ...updatedUser };
      } else {
        db.push({
          ...updatedUser,
          password: 'password123',
          createdAt: new Date().toISOString(),
        });
      }

      localStorage.setItem('greenleaf_users_db', JSON.stringify(db));

      // Persist to src/data/users.json file on disk via local API
      fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(db),
      }).catch(() => {});
    } catch (e) {
      console.error(e);
    }

    // 3. If email changed, also transfer user's orders and myPlants to the new email
    if (currentEmail && newEmail && currentEmail !== newEmail) {
      setOrders((prev) =>
        prev.map((o) =>
          o.userEmail?.toLowerCase().trim() === currentEmail
            ? { ...o, userEmail: updatedUser.email }
            : o
        )
      );
      setMyPlants((prev) =>
        prev.map((p) =>
          p.userEmail?.toLowerCase().trim() === currentEmail
            ? { ...p, userEmail: updatedUser.email }
            : p
        )
      );
    }

    setToastMessage('Data profil berhasil diperbarui.');
  };

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const featuredPlants = plants.filter((p) => p.featured);

  // Filter orders and my-plants by currently logged in user
  const userOrders = user
    ? orders.filter((o) => o.userEmail === user.email)
    : [];

  const userPlants = user
    ? myPlants.filter((p) => p.userEmail === user.email)
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfdfc] font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-stone-900/95 text-white text-xs sm:text-sm font-semibold shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navbar with [ Login ] or [ 👤 User Dropdown ] */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        setIsCartOpen={setIsCartOpen}
        user={user}
        onNavigateToAuth={() => {
          setRedirectAfterAuth(null);
          setActiveTab('auth');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onLogout={handleLogout}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        
        {/* 1. Beranda */}
        {activeTab === 'beranda' && (
          <div>
            <Hero
              onExploreCatalog={() => handleGoToCatalog('all')}
              onContactUs={handleGoToContact}
            />
            <AboutSection onExploreCatalog={() => handleGoToCatalog('all')} />
            <FeaturedSection
              featuredPlants={featuredPlants}
              onAddToCart={handleAddToCart}
              onViewDetail={handleViewDetail}
              onPreviewImage={handleOpenLightbox}
              onViewAll={() => handleGoToCatalog('all')}
            />
          </div>
        )}

        {/* 2. Katalog */}
        {activeTab === 'katalog' && (
          <CatalogPage
            plants={plants}
            onAddToCart={handleAddToCart}
            onViewDetail={handleViewDetail}
            onPreviewImage={handleOpenLightbox}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {/* 3. Detail Tanaman */}
        {activeTab === 'detail' && (
          <PlantDetailPage
            plant={selectedPlant || plants[0]}
            onAddToCart={handleAddToCart}
            onBackToCatalog={() => setActiveTab('katalog')}
            onPreviewImage={handleOpenLightbox}
          />
        )}

        {/* 4. Checkout */}
        {activeTab === 'checkout' && (
          <CheckoutPage
            cart={cart}
            user={user}
            onConfirmOrder={handleConfirmOrder}
            onBackToCart={() => setIsCartOpen(true)}
          />
        )}

        {/* 5. Pesanan Berhasil */}
        {activeTab === 'pesanan-berhasil' && (
          <OrderSuccessPage
            order={currentOrder}
            onViewOrders={() => {
              setActiveTab('pesanan-saya');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackToHome={() => {
              setActiveTab('beranda');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* 6. Pesanan Saya */}
        {activeTab === 'pesanan-saya' && (
          <OrdersPage
            orders={userOrders}
            onExploreCatalog={() => handleGoToCatalog('all')}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* 7. Tanaman Saya & Panduan Perawatan */}
        {activeTab === 'tanaman-saya' && (
          <MyPlantsPage
            myPlants={userPlants}
            onExploreCatalog={() => handleGoToCatalog('all')}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* 8. Profil Saya */}
        {activeTab === 'profile' && (
          <ProfilePage
            user={user}
            onUpdateUser={handleUpdateProfile}
            onLogout={handleLogout}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* 9. Tentang */}
        {activeTab === 'tentang' && (
          <div className="py-8 bg-[#f8faf8] min-h-screen">
            <AboutSection onExploreCatalog={() => handleGoToCatalog('all')} />
          </div>
        )}

        {/* 10. Kontak */}
        {activeTab === 'kontak' && <ContactPage />}

        {/* 11. Login / Pendaftaran Akun */}
        {activeTab === 'auth' && (
          <AuthPage
            onLoginSuccess={handleLoginSuccess}
            onCancel={() => {
              if (redirectAfterAuth === 'checkout') {
                setActiveTab('katalog');
              } else {
                setActiveTab('beranda');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onGoToCatalog={() => handleGoToCatalog('all')}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Modal: "Masuk untuk Melanjutkan" Checkout Prompt */}
      <AuthRequiredModal
        isOpen={isAuthRequiredModalOpen}
        onClose={() => setIsAuthRequiredModalOpen(false)}
        onChooseLogin={() => handleAuthModalChoice('login')}
        onChooseRegister={() => handleAuthModalChoice('register')}
      />

      {/* Lightbox Preview Modal */}
      <LightboxModal
        image={lightboxData?.url}
        title={lightboxData?.title}
        onClose={handleCloseLightbox}
      />

    </div>
  );
}
