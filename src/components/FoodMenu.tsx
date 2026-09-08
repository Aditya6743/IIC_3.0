import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ShoppingCart, Plus, Minus, X, IndianRupee, Clock, QrCode, Upload, Check, Loader2, UserRound, Phone } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { supabase } from '../lib/supabase';
import { createPortal } from 'react-dom';
import { globalLenis } from './SmoothScroll';

const menuItems = [
  { id: 101, name: 'Aloo Tikki Burger', price: 75, category: 'Burgers', desc: 'Classic spiced potato patty burger' },
  { id: 102, name: 'Crispy Masala Burger', price: 80, category: 'Burgers', desc: 'Crunchy masala patty with fresh veggies' },
  { id: 103, name: 'Tandoori Paneer Burger', price: 130, category: 'Burgers', desc: 'Grilled paneer marinated in tandoori spices' },
  { id: 201, name: 'Aloo Tikki Wrap', price: 110, category: 'Wraps', desc: 'Spiced potato filling wrapped in a soft tortilla' },
  { id: 202, name: 'Spicy Paneer Wrap', price: 140, category: 'Wraps', desc: 'Fiery paneer chunks with tangy sauce wrap' },
  { id: 301, name: 'Salted Fries', price: 80, category: 'Sides', desc: 'Classic crispy salted french fries' },
  { id: 302, name: 'Peri Peri Fries', price: 100, category: 'Sides', desc: 'Spicy and tangy peri-peri coated fries' },
  { id: 401, name: 'Regular Cold Coffee', price: 80, category: 'Beverages', desc: 'Classic refreshing cold coffee' },
  { id: 402, name: 'Medium Cold Coffee', price: 90, category: 'Beverages', desc: 'Larger serving of our classic cold coffee' },
  { id: 403, name: 'Brownie Shake', price: 120, category: 'Beverages', desc: 'Rich chocolate shake blended with gooey brownie' }
];
const MAX_ITEM_QUANTITY = 40;
const MAX_SCREENSHOT_BYTES = 5 * 1024 * 1024;
const MAX_SCREENSHOT_DIMENSION = 1400;

const isPaymentWindowOpen = (date = new Date()) => {
  const isEventMonth = date.getFullYear() === 2026 && date.getMonth() === 8;
  const day = date.getDate();
  const hour = date.getHours();
  const isEventDay = isEventMonth && (day === 8 || day === 9);
  const isLateWindow = isEventDay && (hour === 23 || hour === 0);
  const isEarlyWindow = isEventDay && hour >= 2 && hour < 5;
  return isLateWindow || isEarlyWindow;
};

const sanitizeCart = (value: unknown): Record<number, number> => {
  if (!value || typeof value !== 'object') return {};

  return Object.entries(value).reduce<Record<number, number>>((cartState, [itemId, quantity]) => {
    const numericItemId = Number(itemId);
    if (
      menuItems.some(item => item.id === numericItemId) &&
      typeof quantity === 'number' &&
      Number.isInteger(quantity) &&
      quantity > 0
    ) {
      cartState[numericItemId] = Math.min(quantity, MAX_ITEM_QUANTITY);
    }
    return cartState;
  }, {});
};

type OrderItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  timestamp: string;
  items: OrderItem[];
  total: number;
  status: string;
  roomNo: string;
  teamName: string;
  teamLeaderName: string;
  teamLeaderPhone: string;
};

const FoodMenu = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const [cart, setCart] = useState<Record<number, number>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('hackathonFoodCart');
        if (saved) return sanitizeCart(JSON.parse(saved));
      } catch {
        localStorage.removeItem('hackathonFoodCart');
      }
    }
    return {};
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [canAcceptPayment, setCanAcceptPayment] = useState(() => isPaymentWindowOpen());
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamLeaderName, setTeamLeaderName] = useState('');
  const [teamLeaderPhone, setTeamLeaderPhone] = useState('');
  const [roomNo, setRoomNo] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [paymentScreenshotBlob, setPaymentScreenshotBlob] = useState<Blob | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [pastOrders, setPastOrders] = useState<Order[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hackathonFoodOrders');
      if (saved) return JSON.parse(saved);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('hackathonFoodCart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('hackathonFoodOrders', JSON.stringify(pastOrders));
  }, [pastOrders]);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const eventStart = new Date(2026, 8, 8, 11, 30); // Sept 8, 11:30 AM
      
      if (now < eventStart) {
        setIsOpen(true);
        setIsPreview(true);
        setCanAcceptPayment(false);
        return;
      }
      
      setIsPreview(false);
      setCanAcceptPayment(isPaymentWindowOpen(now));
      const isEventMonth = now.getFullYear() === 2026 && now.getMonth() === 8;
      const day = now.getDate();
      const h = now.getHours();
      const minutes = now.getMinutes();
      
      const isSept8 = isEventMonth && day === 8;
      const isSept9 = isEventMonth && day === 9;
      const isWindow1 = h >= 23 || h < 1; // 11 PM - 1 AM
      const isWindow2 = (h === 2 && minutes >= 30) || h === 3; // 2:30 AM - 4 AM
      
      if ((isSept8 || isSept9) && (isWindow1 || isWindow2)) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    
    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const addToCart = (itemId: number) => {
    setCart(prev => ({ ...prev, [itemId]: Math.min((prev[itemId] || 0) + 1, MAX_ITEM_QUANTITY) }));
  };

  const removeFromCart = (itemId: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setPaymentScreenshot(null);
      setPaymentScreenshotBlob(null);
      setPaymentError('Please choose a JPG, PNG, or WebP image.');
      return;
    }

    if (file.size > MAX_SCREENSHOT_BYTES) {
      setPaymentScreenshot(null);
      setPaymentScreenshotBlob(null);
      setPaymentError('Payment screenshots must be smaller than 5 MB.');
      return;
    }

    setPaymentScreenshot(file);
    setPaymentScreenshotBlob(null);
    setPaymentError(null);

    if (file.type === 'image/webp' && file.size <= MAX_SCREENSHOT_BYTES) {
      setPaymentScreenshotBlob(file);
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    try {
      const image = await new Promise<HTMLImageElement>((resolve, reject) => {
        const loadedImage = new Image();
        loadedImage.onload = () => resolve(loadedImage);
        loadedImage.onerror = () => reject(new Error('Image could not be read'));
        loadedImage.src = imageUrl;
      });

      const scale = Math.min(1, MAX_SCREENSHOT_DIMENSION / Math.max(image.width, image.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      canvas.getContext('2d')?.drawImage(image, 0, 0, canvas.width, canvas.height);

      const compressedImage = await new Promise<Blob | null>(resolve => {
        canvas.toBlob(resolve, 'image/webp', 0.82);
      });
      if (!compressedImage) throw new Error('Image compression failed');
      setPaymentScreenshotBlob(compressedImage);
    } catch {
      setPaymentScreenshot(null);
      setPaymentError('The payment screenshot could not be processed.');
    } finally {
      URL.revokeObjectURL(imageUrl);
    }
  };

  const handlePaymentComplete = async () => {
    if (isVerifying || !paymentScreenshotBlob || !canAcceptPayment) return;
    
    const now = Date.now();
    const lastOrderTime = localStorage.getItem('hackathonLastOrderTime');
    if (lastOrderTime && now - parseInt(lastOrderTime) < 60000) {
      alert(`Please wait ${Math.ceil((60000 - (now - parseInt(lastOrderTime))) / 1000)} seconds before placing another order to prevent duplicates.`);
      return;
    }
    
    setIsVerifying(true);
    setIsUploading(true);
    
    const orderId = crypto.randomUUID();
    const orderItems = cartItems.map(item => ({ id: item.id, quantity: item.quantity }));
    const paymentScreenshotPath = `payments/${orderId}.webp`;
    let uploadSucceeded = false;

    const isTransientUploadError = (error: { statusCode?: number; message?: string }) => {
      const statusCode = error.statusCode ?? 0;
      return statusCode === 408 || statusCode === 429 || statusCode >= 500 || !statusCode || /network|fetch|timeout/i.test(error.message ?? '');
    };
    
    try {
      let uploadError = null;
      for (let attempt = 0; attempt < 3; attempt += 1) {
        const result = await supabase.storage
          .from('payment-screenshots')
          .upload(paymentScreenshotPath, paymentScreenshotBlob, {
            cacheControl: '3600',
            contentType: 'image/webp',
            upsert: false
          });
        uploadError = result.error;
        if (!uploadError || !isTransientUploadError(uploadError)) break;
        await new Promise(resolve => setTimeout(resolve, 250 * 2 ** attempt));
      }

      if (uploadError) throw uploadError;
      uploadSucceeded = true;
      setIsUploading(false);

      const { data, error } = await supabase.rpc('place_food_order', {
        p_order_id: orderId,
        p_team_name: teamName,
        p_team_leader_name: teamLeaderName,
        p_team_leader_phone: teamLeaderPhone,
        p_room_no: roomNo,
        p_items: orderItems,
        p_payment_screenshot_path: paymentScreenshotPath
      });
        
      if (error) throw error;
      const createdOrder = data?.[0];
      if (!createdOrder) throw new Error('Order was not created');
      
      const newOrder = {
        id: orderId,
        timestamp: new Date().toISOString(),
        items: cartItems,
        total: createdOrder.total_amount,
        status: createdOrder.status,
        roomNo,
        teamName,
        teamLeaderName,
        teamLeaderPhone
      };
      
      setPastOrders(prev => [newOrder, ...prev]);
      localStorage.setItem('hackathonLastOrderTime', now.toString());
      setCheckoutStep(3); // Success Screen
    } catch (err) {
      console.error('Failed to submit order:', err);
      if (uploadSucceeded) {
        await supabase.storage.from('payment-screenshots').remove([paymentScreenshotPath]);
      }
      setPaymentError(err instanceof Error ? err.message : 'Failed to place order. Please try again or contact an organizer.');
    } finally {
      setIsUploading(false);
      setIsVerifying(false);
    }
  };

  const handleFinishOrder = () => {
    setIsPaymentOpen(false);
    setCart({});
    setPaymentScreenshot(null);
    setPaymentScreenshotBlob(null);
    setPaymentError(null);
    if (globalLenis) {
      globalLenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  };

  const cartItems = Object.entries(cart).map(([id, quantity]) => {
    const item = menuItems.find(i => i.id === parseInt(id));
    if (!item || !Number.isInteger(quantity) || quantity < 1 || quantity > MAX_ITEM_QUANTITY) return null;
    return { ...item, quantity };
  }).filter((item): item is (typeof menuItems)[number] & { quantity: number } => item !== null);

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const upiLink = `upi://pay?pa=8903244085@axisbank&pn=${encodeURIComponent('SARATH')}&am=${totalAmount.toFixed(2)}&cu=INR`;

  return (
    <div className="min-h-screen space-bg relative pb-48">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-cyan-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10" ref={sectionRef}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <div className="inline-flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Slice of <span className="gradient-text">Heaven</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Premium hackathon fuel delivered straight to your desk.
            </p>
            
            {isPreview && (
              <span className="text-yellow-500/90 text-xs font-semibold uppercase tracking-widest bg-yellow-500/10 px-4 py-1.5 rounded-full border border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.1)] mt-4 inline-block">
                Preview Mode: Menu preview closes at Event Start (Sept 8, 11:30 AM)
              </span>
            )}
          </div>
        </motion.div>

        {/* Active Orders Section */}
        {pastOrders.length > 0 && (
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
                <div key={order.id} className="bg-white/[0.02] border border-cyan-500/20 hover:border-cyan-500/40 transition-colors rounded-[2rem] p-5 sm:p-6 shadow-[0_0_30px_rgba(34,211,238,0.03)] flex flex-col">
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
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm items-center">
                        <span className="text-gray-300">
                          <span className="text-cyan-400 mr-2 font-bold">{item.quantity}x</span> 
                          {item.name}
                        </span>
                        <span className="text-gray-500">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-white/5 flex justify-between items-center font-bold bg-white/[0.01] -mx-5 sm:-mx-6 -mb-5 sm:-mb-6 px-5 sm:px-6 py-4 rounded-b-[2rem]">
                    <span className="text-gray-400">Total Paid</span>
                    <span className="text-cyan-400 text-lg flex items-center"><IndianRupee className="w-4 h-4 mr-0.5" />{order.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {isOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/[0.02] border border-white/5 rounded-3xl p-5 sm:p-6 flex flex-col hover:bg-white/[0.04] transition-colors shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:border-cyan-500/20 group"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{item.name}</h3>
                  <span className="text-lg font-bold text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full flex items-center">
                    <IndianRupee className="w-4 h-4 mr-0.5" /> {item.price}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-6 flex-grow">{item.desc}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{item.category}</span>
                  {cart[item.id] ? (
                    <div className="flex items-center bg-white/10 rounded-full border border-white/10 p-1">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-bold text-white">{cart[item.id]}</span>
                      <button 
                        onClick={() => addToCart(item.id)}
                        className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-black hover:bg-cyan-400 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => addToCart(item.id)}
                      className="px-5 py-2.5 bg-white/5 hover:bg-cyan-500 hover:text-black text-white text-sm font-bold rounded-full transition-all duration-300 flex items-center border border-white/10 hover:border-transparent group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                    >
                      <Plus className="w-4 h-4 mr-1.5" /> Add
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-gray-900/50 rounded-full flex items-center justify-center mb-6 border border-white/5">
              <Clock className="w-10 h-10 text-gray-500" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Kitchen is Closed</h2>
            <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
              Food delivery is only available during specific hackathon windows:
              <br/><br/>
              <span className="text-cyan-400 font-bold block mb-2">11:00 PM - 1:00 AM</span>
              <span className="text-cyan-400 font-bold block">2:30 AM - 4:00 AM</span>
              <br/>
              Check back during these times to order!
            </p>
          </div>
        )}
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
              className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-xl px-4 py-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-[#051319] border border-cyan-500/30 w-full max-w-3xl rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.15)] flex flex-col relative max-h-[90vh]"
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
                              <span className="text-white font-bold w-12 text-right flex items-center justify-end"><IndianRupee className="w-3.5 h-3.5 mr-0.5 text-gray-500" />{item.price * item.quantity}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-cyan-500/20 flex justify-between items-center">
                        <span className="text-gray-300 font-medium">Total to Pay</span>
                        <span className="text-2xl font-bold text-cyan-400 flex items-center"><IndianRupee className="w-5 h-5 mr-1" />{totalAmount}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 mt-auto shrink-0">
                      <div>
                        <label className="block text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">Team Name</label>
                        <input
                          type="text"
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value.replace(/[^a-zA-Z0-9 ]/g, ''))}
                          placeholder="e.g. Cyber Punks"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 sm:py-4 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">Room / Table No.</label>
                        <input
                          type="text"
                          value={roomNo}
                          onChange={(e) => setRoomNo(e.target.value.replace(/[^a-zA-Z0-9 ]/g, ''))}
                          placeholder="e.g. Room 402"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 sm:py-4 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>
                      <div className="space-y-2 relative">
                        <label className="text-xs font-semibold text-cyan-400 uppercase tracking-widest ml-1">Team Leader Name</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <UserRound className="h-5 w-5 text-cyan-500/50" />
                          </div>
                          <input
                            type="text"
                            value={teamLeaderName}
                            onChange={(e) => setTeamLeaderName(e.target.value)}
                            placeholder="e.g. John Doe"
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-12 pr-4 py-3 sm:py-4 text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-gray-600"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 relative">
                        <label className="text-xs font-semibold text-cyan-400 uppercase tracking-widest ml-1">Team Leader Phone</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-cyan-500/50" />
                          </div>
                          <input
                            type="tel"
                            value={teamLeaderPhone}
                            onChange={(e) => setTeamLeaderPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                            placeholder="e.g. 9876543210"
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-12 pr-4 py-3 sm:py-4 text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-gray-600"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <button
                        onClick={() => { if (canAcceptPayment) setCheckoutStep(2); }}
                        disabled={!canAcceptPayment || !teamName.trim() || !teamLeaderName.trim() || !teamLeaderPhone.trim() || !roomNo.trim() || totalItems === 0}
                        className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-2xl hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] flex items-center justify-center"
                      >
                        {!canAcceptPayment ? "Ordering is closed" : totalItems === 0 ? "Cart is Empty" : <>Proceed to Pay <IndianRupee className="w-5 h-5 ml-1.5" /></>}
                      </button>
                    </div>
                  </div>
                ) : checkoutStep === 2 ? (
                  !canAcceptPayment ? (
                    <div className="flex flex-col items-center justify-center h-full p-10 text-center">
                      <Clock className="w-12 h-12 text-gray-500 mb-5" />
                      <h2 className="text-2xl font-bold text-white mb-3">Ordering is closed</h2>
                      <p className="text-gray-400 max-w-sm">The payment QR is available only during 11:00 PM - 1:00 AM and 2:00 AM - 5:00 AM on the event days.</p>
                    </div>
                  ) : <div className="flex flex-col h-full overflow-y-auto custom-scrollbar overscroll-contain" data-lenis-prevent="true">
                    <div className="p-5 sm:p-8 pb-4 sm:pb-6 bg-gradient-to-b from-cyan-950/20 to-transparent shrink-0">
                      <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
                        <QrCode className="w-6 h-6 mr-3 text-cyan-400" /> Complete Payment
                      </h2>
                      <p className="text-sm text-gray-400">Scan with any UPI app to pay</p>
                    </div>

                    <div className="px-4 sm:px-8 py-2 flex flex-col items-center justify-center flex-grow">
                      <div className="bg-white p-3 rounded-2xl shadow-[0_0_50px_rgba(34,211,238,0.15)] mb-4 relative group w-[180px] sm:w-[220px] aspect-square flex items-center justify-center overflow-hidden">
                        <QRCodeCanvas
                          value={upiLink}
                          size={200}
                          bgColor="#ffffff"
                          fgColor="#000000"
                          level="H"
                          includeMargin={false}
                          className="w-full h-full"
                        />
                        {/* Premium animated corner brackets */}
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-cyan-400 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-cyan-400 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-cyan-400 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-cyan-400 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Screenshot Upload Section */}
                      <div className="w-full max-w-[240px] p-4 bg-white/[0.02] border border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center relative hover:bg-white/[0.04] transition-colors cursor-pointer group">
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
                            <span className="text-[10px] text-cyan-400 mt-1">Ready to upload</span>
                          </div>
                        )}
                      </div>
                      {paymentError && <p className="text-xs text-red-400 text-center mt-3 max-w-[260px]">{paymentError}</p>}

                    </div>
                    
                    <div className="p-5 sm:p-6 bg-white/[0.03] border-t border-white/5 flex flex-col gap-4 mt-auto shrink-0">
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
                            disabled={isVerifying || !paymentScreenshotBlob}
                            className="w-full sm:w-auto px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
                          >
                            {isUploading ? (
                              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading payment screenshot...</>
                            ) : isVerifying ? (
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
