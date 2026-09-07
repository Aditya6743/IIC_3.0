import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ShoppingCart, Plus, Minus, X, Utensils, Coffee, Pizza, IndianRupee, Users, MapPin, QrCode, Store, ArrowLeft, Sandwich, IceCream, Clock, Check, Loader2, Upload } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { createPortal } from 'react-dom';
import { globalLenis } from './SmoothScroll';
import { supabase } from '../lib/supabase';

// 6 Premium Outlets Data
const outlets = [
  {
    id: 1,
    name: "The Hacker's Grill",
    desc: "Premium loaded burgers and crispy sides.",
    icon: Store,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "hover:border-orange-500/30",
    menu: [
      { id: 101, name: 'Cyber Burger', price: 90, icon: Utensils, category: 'Fast Food', desc: 'Loaded veg burger with double cheese and secret sauce.' },
      { id: 102, name: 'Binary Fries', price: 70, icon: Utensils, category: 'Sides', desc: 'Crispy salted potato fries with peri-peri sprinkle.' },
      { id: 103, name: 'Grilled Sandwich', price: 80, icon: Sandwich, category: 'Fast Food', desc: 'Triple decker grilled cheese and vegetable sandwich.' },
    ]
  },
  {
    id: 2,
    name: "Cyber Slice",
    desc: "Authentic wood-fired pizzas and garlic bread.",
    icon: Pizza,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "hover:border-red-500/30",
    menu: [
      { id: 201, name: 'Margherita Pizza', price: 150, icon: Pizza, category: 'Pizza', desc: 'Classic cheese and tomato thin crust pizza.' },
      { id: 202, name: 'Pepperoni Simulator', price: 180, icon: Pizza, category: 'Pizza', desc: 'Spicy paneer and jalapeno loaded pizza.' },
      { id: 203, name: 'Garlic Nodes', price: 90, icon: Utensils, category: 'Sides', desc: 'Cheesy garlic breadsticks with dip.' },
    ]
  },
  {
    id: 3,
    name: "Midnight Noodles",
    desc: "Spicy late-night hacker fuel and pasta.",
    icon: Utensils,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "hover:border-yellow-500/30",
    menu: [
      { id: 301, name: 'Masala Maggi', price: 50, icon: Utensils, category: 'Noodles', desc: 'Spicy late-night classic hacker fuel.' },
      { id: 302, name: 'Cheese Maggi', price: 70, icon: Utensils, category: 'Noodles', desc: 'Loaded with melting cheese and herbs.' },
      { id: 303, name: 'White Sauce Pasta', price: 120, icon: Utensils, category: 'Pasta', desc: 'Creamy penne pasta with exotic veggies.' },
    ]
  },
  {
    id: 4,
    name: "Liquid Cooling",
    desc: "Energy drinks, cold coffee, and thick shakes.",
    icon: Coffee,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "hover:border-cyan-500/30",
    menu: [
      { id: 401, name: 'Cold Coffee', price: 80, icon: Coffee, category: 'Beverages', desc: 'Thick and creamy classic cold coffee.' },
      { id: 402, name: 'Red Bull', price: 115, icon: Coffee, category: 'Beverages', desc: 'Instant wing-provider for coding sessions.' },
      { id: 403, name: 'Oreo Shake', price: 100, icon: Coffee, category: 'Beverages', desc: 'Crushed oreos blended with thick vanilla ice cream.' },
    ]
  },
  {
    id: 5,
    name: "Sweet Syntax",
    desc: "Desserts, waffles, and sweet cravings.",
    icon: IceCream,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "hover:border-pink-500/30",
    menu: [
      { id: 501, name: 'Chocolate Waffle', price: 110, icon: IceCream, category: 'Dessert', desc: 'Crispy waffle loaded with melted dark chocolate.' },
      { id: 502, name: 'Vanilla Sundae', price: 90, icon: IceCream, category: 'Dessert', desc: 'Vanilla scoops with nuts and chocolate syrup.' },
      { id: 503, name: 'Brownie Fudge', price: 80, icon: IceCream, category: 'Dessert', desc: 'Hot chocolate brownie with a gooey center.' },
    ]
  },
  {
    id: 6,
    name: "Bite & Compile",
    desc: "Quick snacks, wraps, and rolls.",
    icon: Sandwich,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "hover:border-green-500/30",
    menu: [
      { id: 601, name: 'Paneer Tikka Roll', price: 100, icon: Sandwich, category: 'Wraps', desc: 'Spicy paneer wrapped in a crispy paratha.' },
      { id: 602, name: 'Veg Kathi Roll', price: 80, icon: Sandwich, category: 'Wraps', desc: 'Mixed veggies and sauces rolled up tight.' },
      { id: 603, name: 'Nachos Platter', price: 120, icon: Utensils, category: 'Snacks', desc: 'Crispy nachos loaded with cheese and salsa.' },
    ]
  }
];

// Helper to look up an item by ID globally
const getMenuItemById = (id: number) => {
  for (const outlet of outlets) {
    const item = outlet.menu.find(i => i.id === id);
    if (item) return item;
  }
  return null;
};

const checkIsOpen = () => {
  const now = new Date();
  const eventStart = new Date(2026, 8, 8, 11, 30); // Sept 8, 2026, 11:30 AM

  // If the event hasn't started yet, keep the menu fully OPEN for preview & testing
  if (now < eventStart) {
    return true;
  }

  // Once the event starts, strictly enforce the hackathon food windows
  const month = now.getMonth(); // 8 is Sept
  const date = now.getDate();
  const hour = now.getHours();

  // We are open if:
  // It's Sept 8 or 9 AND hour is between 2-4 (2:00 AM to 4:59 AM)
  const isSept8or9 = month === 8 && (date === 8 || date === 9);
  const isWindow2 = isSept8or9 && (hour >= 2 && hour < 5);

  // For the 11 PM - 1 AM window:
  // 11 PM (23:00 - 23:59) must be on Sept 8 or 9
  const is11PM = isSept8or9 && hour === 23;
  // 12 AM (00:00 - 00:59) must be on Sept 9 or 10 (the morning after)
  const isSept9or10 = month === 8 && (date === 9 || date === 10);
  const is12AM = isSept9or10 && hour === 0;

  const isWindow1 = is11PM || is12AM;

  return isWindow1 || isWindow2;
};

const FoodMenu: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(checkIsOpen());

  // Auto-refresh the open status every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOpen(checkIsOpen());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const [selectedOutlet, setSelectedOutlet] = useState<number | null>(null);
  const [cart, setCart] = useState<Record<number, number>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hackathonFoodCart');
      if (saved) return JSON.parse(saved);
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem('hackathonFoodCart', JSON.stringify(cart));
  }, [cart]);

  const handlePaymentComplete = async () => {
    // 1. Double-click execution guard
    if (isVerifying) return;
    
    // 2. Global spam/buffer guard (60 seconds cooldown between orders)
    const now = Date.now();
    const cooldown = 60000;
    const lastOrder = localStorage.getItem('hackathonLastOrderTime');
    
    if (lastOrder && now - parseInt(lastOrder) < cooldown) {
      const remainingSeconds = Math.ceil((cooldown - (now - parseInt(lastOrder))) / 1000);
      alert(`Please wait ${remainingSeconds} seconds before placing another order to prevent duplicates.`);
      return;
    }

    setIsVerifying(true);
    
    try {
      const orderId = Math.random().toString(36).substring(2, 9).toUpperCase();
      
      const newOrder = {
        id: orderId,
        items: cartItems,
        total: totalAmount,
        teamName,
        roomNo,
        paymentImage: paymentScreenshot?.data,
        timestamp: Date.now(),
        status: 'Received'
      };

      // 1. Save to global Supabase database for organizers
      const { error } = await supabase
        .from('food_orders')
        .insert([
          {
            order_id: orderId,
            team_name: teamName,
            room_no: roomNo,
            total_amount: totalAmount,
            items: cartItems,
            payment_image: paymentScreenshot?.data,
            status: 'Received'
          }
        ]);

      if (error) {
        console.error("Supabase Error:", error);
        // We will still proceed locally so the user experience doesn't break during the hackathon
        // if the database goes down or keys are missing.
      }

      // 2. Save locally so the user can track their own orders
      setPastOrders(prev => [newOrder, ...prev]);
      
      // 3. Record success time for the buffer
      localStorage.setItem('hackathonLastOrderTime', Date.now().toString());

      // 4. Clear cart & show success screen
      setCart({});
      setIsVerifying(false);
      setCheckoutStep(3);
    } catch (err) {
      console.error(err);
      setIsVerifying(false);
    }
  };

  const handleFinishOrder = () => {
    setIsPaymentOpen(false);
    setCheckoutStep(1);
    setTeamName('');
    setRoomNo('');
    setPaymentScreenshot(null);
  };
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1);
  const [teamName, setTeamName] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentScreenshot, setPaymentScreenshot] = useState<{name: string, data: string} | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        // Compress aggressively to webp to save db space
        const compressedBase64 = canvas.toDataURL('image/webp', 0.6);
        setPaymentScreenshot({ name: file.name, data: compressedBase64 });
      };
    };
  };
  const [pastOrders, setPastOrders] = useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hackathonPastOrders');
      if (saved) return JSON.parse(saved);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('hackathonPastOrders', JSON.stringify(pastOrders));
  }, [pastOrders]);

  const addToCart = (id: number) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[id] > 1) {
        newCart[id] -= 1;
      } else {
        delete newCart[id];
      }
      return newCart;
    });
  };

  const cartItems = Object.entries(cart).map(([id, quantity]) => {
    const item = getMenuItemById(parseInt(id));
    const outlet = outlets.find(o => o.menu.some(m => m.id === parseInt(id)));
    return { ...item!, quantity, outletName: outlet?.name };
  });

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = Object.values(cart).reduce((sum, q) => sum + q, 0);

  // Dynamic UPI Link
  const upiId = "arktandon@okhdfcbank";
  const upiName = "Ark Tandon";
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(upiName)}&am=${totalAmount}&cu=INR`;

  const activeOutlet = selectedOutlet !== null ? outlets.find(o => o.id === selectedOutlet) : null;

  return (
    <div className="min-h-screen space-bg relative pb-48" ref={sectionRef}>
      <main className="container mx-auto px-4 pt-32 max-w-6xl">
        
        {/* Header changes based on view */}
        <motion.div
          className="text-center mb-16 relative"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {activeOutlet && (
            <button 
              onClick={() => { setSelectedOutlet(null); if (globalLenis) { globalLenis.scrollTo(0, { immediate: true }); } else { window.scrollTo(0, 0); }; }}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors flex items-center justify-center hidden md:flex"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {activeOutlet ? activeOutlet.name : <>Cyber <span className="gradient-text">Café</span> Outlets</>}
          </h1>
          <div className="section-divider mb-8 mx-auto" aria-hidden="true" />
          
          {activeOutlet && (
            <button 
              onClick={() => { setSelectedOutlet(null); if (globalLenis) { globalLenis.scrollTo(0, { immediate: true }); } else { window.scrollTo(0, 0); }; }}
              className="md:hidden flex items-center justify-center mx-auto mb-6 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Outlets
            </button>
          )}

          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {activeOutlet ? activeOutlet.desc : "Select an outlet to view their menu and order food directly to your desk."}
          </p>
          
          <div className="mt-6 flex flex-col items-center justify-center gap-3 text-sm">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1.5 rounded-full border border-cyan-500/20 font-semibold flex items-center shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                <Clock className="w-4 h-4 mr-1.5" /> Hackathon Operating Hours
              </span>
              <span className="text-gray-400">
                Open exclusively <strong className="text-gray-200">11 PM - 1 AM</strong> and <strong className="text-gray-200">2 AM - 5 AM</strong> on Sept 8 & 9
              </span>
            </div>
            {new Date() < new Date(2026, 8, 8, 11, 30) && (
              <span className="text-yellow-500/90 text-xs font-semibold uppercase tracking-widest bg-yellow-500/10 px-4 py-1.5 rounded-full border border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.1)] mt-2">
                Preview Mode: Menu preview closes at Event Start (Sept 8, 11:30 AM)
              </span>
            )}
          </div>
        </motion.div>

        {/* Active Orders Section */}
        {pastOrders.length > 0 && !activeOutlet && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-3 text-cyan-400" /> Active Orders
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastOrders.map(order => (
                <div key={order.id} className="bg-white/[0.02] border border-cyan-500/20 hover:border-cyan-500/40 transition-colors rounded-3xl p-6 shadow-[0_0_30px_rgba(34,211,238,0.03)] flex flex-col">
                  <div className="flex justify-between items-start mb-5 border-b border-white/5 pb-5">
                    <div>
                      <div className="text-cyan-400 font-bold tracking-widest text-xs mb-1.5 flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2 animate-pulse"></span>
                        ORDER #{order.id}
                      </div>
                      <div className="text-white text-sm">To: <span className="font-bold">{order.roomNo}</span> <span className="text-gray-500">({order.teamName})</span></div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold flex items-center">
                        <Check className="w-3 h-3 mr-1" /> Order Received
                      </span>
                      <span className="text-gray-500 text-xs mt-2 font-medium">{new Date(order.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                  </div>
                  <div className="space-y-3 flex-grow">
                    {order.items.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between text-sm items-center">
                        <span className="text-gray-300 flex items-center"><span className="text-cyan-500 font-bold mr-2">{item.quantity}x</span> {item.name}</span>
                        <span className="text-gray-500 font-medium">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-white/5 flex justify-between items-center font-bold bg-white/[0.01] -mx-5 sm:-mx-6 -mb-5 sm:-mb-6 px-5 sm:px-6 py-4 rounded-b-[2rem]">
                    <span className="text-gray-400 text-sm uppercase tracking-widest">Total Paid</span>
                    <span className="text-cyan-400 text-lg">₹{order.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* View Switching & Closed State */}
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="closed-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-24 h-24 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
                <Clock className="w-12 h-12" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">
                Currently <span className="text-red-500">Closed</span>
              </h2>
              <p className="text-lg text-gray-400 max-w-lg mx-auto leading-relaxed">
                The Cyber Café is resting. We are exclusively taking orders during the following hackathon hours:
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:px-8 shadow-inner">
                  <span className="block text-sm text-gray-500 uppercase tracking-widest mb-2 font-semibold">Window 1</span>
                  <span className="text-xl font-bold text-white">11:00 PM - 1:00 AM</span>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:px-8 shadow-inner">
                  <span className="block text-sm text-gray-500 uppercase tracking-widest mb-2 font-semibold">Window 2</span>
                  <span className="text-xl font-bold text-white">2:00 AM - 5:00 AM</span>
                </div>
              </div>
              <p className="text-sm text-cyan-500/50 mt-10 uppercase tracking-widest font-bold">Sept 8 & 9 Only</p>
            </motion.div>
          ) : !activeOutlet ? (
            /* OUTLETS GRID */
            <motion.div
              key="outlets-grid"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {outlets.map((outlet) => {
                const Icon = outlet.icon;
                return (
                  <div
                    key={outlet.id}
                    onClick={() => { setSelectedOutlet(outlet.id); if (globalLenis) { globalLenis.scrollTo(0, { immediate: true }); } else { window.scrollTo(0, 0); }; }}
                    className={`bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[2rem] p-8 cursor-pointer hover:bg-white/[0.05] transition-all duration-300 flex flex-col items-center text-center group ${outlet.border} hover:shadow-[0_10px_40px_-15px_rgba(34,211,238,0.15)]`}
                  >
                    <div className={`p-5 rounded-3xl ${outlet.bg} ${outlet.color} mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{outlet.name}</h3>
                    <p className="text-gray-400 text-sm">{outlet.desc}</p>
                    <div className="mt-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white uppercase tracking-widest group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-all">
                      View Menu
                    </div>
                  </div>
                )
              })}
            </motion.div>
          ) : (
            /* MENU GRID FOR SELECTED OUTLET */
            <motion.div
              key="menu-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {activeOutlet.menu.map((item) => {
                const Icon = item.icon;
                const quantity = cart[item.id] || 0;
                return (
                  <div
                    key={item.id}
                    className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[2rem] p-6 hover:bg-white/[0.05] transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_10px_30px_-15px_rgba(34,211,238,0.2)] flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold text-pink-400 uppercase tracking-widest px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                    <p className="text-sm text-gray-400 mb-6 flex-grow">{item.desc}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-2xl font-bold text-white flex items-center">
                        <IndianRupee className="w-5 h-5 mr-1 text-cyan-400" />
                        {item.price}
                      </span>
                      
                      {quantity === 0 ? (
                        <button
                          onClick={() => addToCart(item.id)}
                          className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-cyan-500 hover:text-black hover:border-cyan-500 transition-all duration-300"
                        >
                          Add
                        </button>
                      ) : (
                        <div className="flex items-center bg-white/10 rounded-full border border-white/20 p-1">
                          <button onClick={() => removeFromCart(item.id)} className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-white font-semibold">{quantity}</span>
                          <button onClick={() => addToCart(item.id)} className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Sticky Mobile-Optimized Floating Cart - PORTALED */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {totalItems > 0 && isOpen && !isPaymentOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="fixed bottom-4 md:bottom-8 left-0 right-0 mx-auto w-[92%] max-w-3xl bg-gray-950/90 backdrop-blur-3xl border border-cyan-500/40 rounded-[2rem] md:rounded-full p-3 md:p-4 flex flex-row items-center justify-between shadow-[0_0_50px_rgba(34,211,238,0.25)] z-[100]"
            >
              <div className="flex flex-col text-left pl-3 md:pl-6">
                <span className="text-[10px] md:text-xs text-cyan-400 uppercase tracking-widest font-bold mb-0 md:mb-0.5">Your Order</span>
                <span className="text-lg md:text-2xl font-bold text-white flex items-center">
                  {totalItems} <span className="text-gray-500 font-medium mx-1 md:mx-2 text-[10px] md:text-sm">items</span> <span className="text-gray-600 mx-1 md:mx-3">|</span> <IndianRupee className="w-4 h-4 md:w-5 md:h-5 mr-0.5 text-cyan-400" /> {totalAmount}
                </span>
              </div>
              <button
                onClick={() => { setIsPaymentOpen(true); setCheckoutStep(1); }}
                className="px-6 md:px-10 py-2.5 md:py-3.5 bg-cyan-500 text-black font-bold rounded-[1.5rem] md:rounded-full hover:bg-cyan-400 transition-all duration-300 flex items-center justify-center text-sm md:text-lg shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105 shrink-0"
              >
                Checkout <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Payment Modal - Rendered in Portal to escape SmoothScroll transform context */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isPaymentOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl px-4 py-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                className="w-full max-w-xl bg-[#031015]/90 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.15)] relative flex flex-col max-h-[90vh]"
              >
                <button
                  onClick={() => setIsPaymentOpen(false)}
                  className="absolute top-5 right-5 p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                {checkoutStep === 1 ? (
                  <div className="p-5 sm:p-10 flex flex-col h-full overflow-y-auto custom-scrollbar overscroll-contain" data-lenis-prevent="true">
                    <div className="mb-6">
                      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-wide">
                        Order <span className="text-cyan-400">Summary</span>
                      </h2>
                      <p className="text-sm text-gray-400">Review your cart and provide delivery details.</p>
                    </div>
                    
                    {/* Bill Breakdown */}
                    <div className="bg-gradient-to-br from-cyan-950/30 to-blue-950/30 border border-cyan-500/20 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-[0_0_30px_rgba(34,211,238,0.05)] shrink-0">
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Bill Breakdown</h3>
                      <div className="space-y-3 max-h-32 overflow-y-auto custom-scrollbar pr-2 overscroll-contain" data-lenis-prevent="true">
                        {cartItems.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-sm group bg-white/[0.02] hover:bg-white/[0.04] p-2.5 rounded-xl transition-colors border border-transparent hover:border-white/5">
                            <div className="flex-1 pr-2">
                              <div className="text-white font-medium flex items-center">
                                {item.name}
                              </div>
                              <div className="text-gray-500 text-xs mt-0.5">{item.outletName}</div>
                            </div>
                            
                            <div className="flex items-center gap-4 sm:gap-6">
                              {/* Quantity Controls */}
                              <div className="flex items-center bg-black/40 rounded-lg border border-white/10 p-0.5 shadow-inner">
                                <button onClick={() => removeFromCart(item.id)} className="p-1.5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition-colors">
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-6 text-center text-xs font-bold text-cyan-400">{item.quantity}</span>
                                <button onClick={() => addToCart(item.id)} className="p-1.5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white transition-colors">
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              
                              {/* Price */}
                              <div className="text-white font-semibold flex items-center min-w-[50px] justify-end">
                                <IndianRupee className="w-3 h-3 mr-0.5 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                                {item.price * item.quantity}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                        <span className="text-white font-bold">Total Due</span>
                        <span className="text-xl font-bold text-cyan-400 flex items-center">
                          <IndianRupee className="w-4 h-4 mr-1" />{totalAmount}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-6 flex-grow">
                      <div className="space-y-2 relative">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest ml-1">Team Name</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Users className="h-5 w-5 text-cyan-500/50" />
                          </div>
                          <input
                            type="text"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-cyan-400/50 focus:bg-cyan-950/10 transition-all placeholder:text-gray-600 shadow-inner"
                            placeholder="e.g. Cyber Punks"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 relative">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest ml-1">Room Number</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-cyan-500/50" />
                          </div>
                          <input
                            type="text"
                            value={roomNo}
                            onChange={(e) => setRoomNo(e.target.value)}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-cyan-400/50 focus:bg-cyan-950/10 transition-all placeholder:text-gray-600 shadow-inner"
                            placeholder="e.g. Lab 3, Table 4"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-white/5">
                      <button
                        disabled={!teamName.trim() || !roomNo.trim() || totalItems === 0}
                        onClick={() => setCheckoutStep(2)}
                        className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-2xl hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] flex items-center justify-center"
                      >
                        {totalItems === 0 ? "Cart is Empty" : <>Proceed to Pay <IndianRupee className="w-5 h-5 ml-1.5" /></>}
                      </button>
                    </div>
                  </div>
                ) : checkoutStep === 2 ? (
                  <div className="flex flex-col h-full overflow-y-auto custom-scrollbar overscroll-contain" data-lenis-prevent="true">
                    <div className="p-5 sm:p-8 pb-4 sm:pb-6 bg-gradient-to-b from-cyan-950/20 to-transparent">
                      <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
                        <QrCode className="w-6 h-6 mr-3 text-cyan-400" /> Complete Payment
                      </h2>
                      <p className="text-sm text-gray-400">Scan with any UPI app to pay</p>
                    </div>

                    <div className="px-4 sm:px-8 py-6 flex flex-col items-center justify-center flex-grow">
                      <div className="bg-white p-5 rounded-3xl shadow-[0_0_50px_rgba(34,211,238,0.15)] mb-2 relative group">
                        <QRCodeCanvas 
                          value={upiLink} 
                          size={200} 
                          bgColor={"#ffffff"} 
                          fgColor={"#000000"} 
                          level={"H"} 
                          includeMargin={false}
                        />
                        {/* Premium animated corner brackets */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-400 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-cyan-400 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-cyan-400 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-400 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Screenshot Upload Section */}
                      <div className="w-full max-w-[240px] mt-2 p-4 bg-white/[0.02] border border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center relative hover:bg-white/[0.04] transition-colors cursor-pointer group">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        
                        {!paymentScreenshot ? (
                          <div className="flex flex-col items-center text-center">
                            <Upload className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 mb-2 transition-colors" />
                            <span className="text-xs font-semibold text-white">Upload Screenshot</span>
                            <span className="text-[10px] text-gray-500 mt-1">Required to verify payment</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center text-center">
                            <div className="w-8 h-8 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-2">
                              <Check className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-semibold text-white truncate max-w-[150px]">{paymentScreenshot.name}</span>
                            <span className="text-[10px] text-cyan-400 mt-1">Tap to change</span>
                          </div>
                        )}
                      </div>

                    </div>
                    
                    <div className="p-6 bg-white/[0.03] border-t border-white/5 flex flex-col gap-5 mt-auto shrink-0">
                      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex flex-col text-center sm:text-left w-full sm:w-auto">
                          <span className="text-xs text-gray-400 uppercase tracking-widest mb-1">Amount Due</span>
                          <span className="text-2xl font-bold text-white flex items-center justify-center sm:justify-start">
                            <IndianRupee className="w-5 h-5 mr-0.5 text-cyan-400" /> {totalAmount}
                          </span>
                        </div>
                        <div className="flex w-full sm:w-auto">
                          <button
                            onClick={handlePaymentComplete}
                            disabled={isVerifying || !paymentScreenshot}
                            className="w-full sm:w-auto px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
                          >
                            {isVerifying ? (
                              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifying...</>
                            ) : "Submit Payment"}
                          </button>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 text-center flex justify-center items-center gap-2 bg-black/20 py-2 rounded-lg">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                        Order for <span className="text-gray-300 font-medium">{teamName}</span> • {roomNo}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-10 text-center relative overflow-hidden bg-[#031015]/90">
                    {/* Animated background glow */}
                    <div className="absolute inset-0 bg-green-500/5 blur-[100px] rounded-full animate-pulse" />
                    
                    <div className="w-28 h-28 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mb-8 border border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.2)] relative z-10">
                      <Check className="w-14 h-14" />
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 relative z-10">Order <span className="text-green-400">Received!</span></h2>
                    <p className="text-gray-400 mb-10 max-w-sm relative z-10 leading-relaxed">
                      Payment verified successfully. Your order has been received and will be delivered to <strong className="text-white">{roomNo}</strong> shortly.
                    </p>
                    
                    <button
                      onClick={handleFinishOrder}
                      className="w-full sm:w-auto px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl transition-colors relative z-10"
                    >
                      View My Orders
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default FoodMenu;
