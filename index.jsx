import React, { useState } from 'react';

const services = [
  { id: 'print', name: 'طباعة مستندات', icon: '🖨️', description: 'طباعة ملونة وأبيض وأسود' },
  { id: 'copy', name: 'تصوير مستندات', icon: '📑', description: 'تصوير بجميع المقاسات' },
  { id: 'bind', name: 'تجليد', icon: '📚', description: 'حلزوني وحراري وكتب' },
  { id: 'photo', name: 'طباعة صور', icon: '🖼️', description: 'جميع المقاسات والأنواع' },
  { id: 'laminate', name: 'تغليف حراري', icon: '✂️', description: 'حماية مستنداتك' },
  { id: 'poster', name: 'بوسترات ولوحات', icon: '🎨', description: 'طباعة كبيرة الحجم' },
  { id: 'cards', name: 'كروت شخصية', icon: '📇', description: 'تصاميم احترافية' },
  { id: 'custom', name: 'طلب مخصص', icon: '📦', description: 'أخبرنا بما تحتاج' },
];

const printOptions = {
  color: [
    { id: 'bw', name: 'أبيض وأسود', price: 0.5 },
    { id: 'color', name: 'ملون', price: 2 },
  ],
  size: [
    { id: 'a4', name: 'A4', price: 0 },
    { id: 'a3', name: 'A3', price: 1 },
    { id: 'letter', name: 'Letter', price: 0 },
  ],
  sides: [
    { id: 'single', name: 'وجه واحد', price: 0 },
    { id: 'double', name: 'وجهين', price: 0.5 },
  ],
};

const orderStatuses = [
  { id: 'received', name: 'تم استلام الطلب', icon: '📥' },
  { id: 'accepted', name: 'تم قبول الطلب', icon: '✅', warning: true },
  { id: 'processing', name: 'جاري العمل على طلبك', icon: '🔄' },
  { id: 'ready', name: 'جاهز للاستلام', icon: '📦' },
];

export default function StationeryApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedService, setSelectedService] = useState(null);
  const [orderDetails, setOrderDetails] = useState({
    file: null,
    fileName: '',
    pages: 1,
    color: 'bw',
    size: 'a4',
    sides: 'single',
    copies: 1,
  });
  const [phone, setPhone] = useState('');
  const [notifications, setNotifications] = useState({ sms: true, whatsapp: true });
  const [orderNumber, setOrderNumber] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(0);
  const [trackingNumber, setTrackingNumber] = useState('');

  const calculatePrice = () => {
    const colorPrice = printOptions.color.find(c => c.id === orderDetails.color)?.price || 0;
    const sizePrice = printOptions.size.find(s => s.id === orderDetails.size)?.price || 0;
    const sidesPrice = printOptions.sides.find(s => s.id === orderDetails.sides)?.price || 0;
    return ((colorPrice + sizePrice + sidesPrice) * orderDetails.pages * orderDetails.copies).toFixed(2);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOrderDetails({
        ...orderDetails,
        file: file,
        fileName: file.name,
        pages: Math.floor(Math.random() * 10) + 1,
      });
    }
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setCurrentPage('service');
  };

  const handleProceedToPhone = () => {
    setCurrentPage('phone');
  };

  const handleProceedToPayment = () => {
    setCurrentPage('payment');
  };

  const handlePayment = () => {
    const newOrderNumber = Math.floor(10000 + Math.random() * 90000);
    setOrderNumber(newOrderNumber);
    setCurrentStatus(0);
    setCurrentPage('success');
  };

  const handleTrackOrder = () => {
    if (trackingNumber) {
      setOrderNumber(parseInt(trackingNumber));
      setCurrentStatus(Math.floor(Math.random() * 4));
      setCurrentPage('tracking');
    }
  };

  const simulateStatusChange = () => {
    if (currentStatus < 3) {
      setCurrentStatus(currentStatus + 1);
    }
  };

  // Home Page
  const HomePage = () => (
    <div className="home-page">
      <header className="header">
        <div className="logo">
          <span className="logo-icon">📋</span>
          <h1>قرطاسية النور</h1>
        </div>
        <p className="tagline">خدمات طباعة احترافية بين يديك</p>
      </header>

      <div className="track-section">
        <div className="track-box">
          <input
            type="text"
            placeholder="أدخل رقم الطلب للتتبع..."
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
          <button onClick={handleTrackOrder}>تتبع</button>
        </div>
      </div>

      <h2 className="section-title">اختر الخدمة</h2>
      
      <div className="services-grid">
        {services.map((service) => (
          <div
            key={service.id}
            className="service-card"
            onClick={() => handleServiceSelect(service)}
          >
            <span className="service-icon">{service.icon}</span>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>

      <footer className="footer">
        <p>📍 فرع حي النرجس - الرياض</p>
        <p>⏰ 9 صباحاً - 10 مساءً</p>
      </footer>
    </div>
  );

  // Service Page
  const ServicePage = () => (
    <div className="service-page">
      <button className="back-btn" onClick={() => setCurrentPage('home')}>
        → رجوع
      </button>
      
      <div className="service-header">
        <span className="service-icon-large">{selectedService?.icon}</span>
        <h2>{selectedService?.name}</h2>
      </div>

      <div className="upload-section">
        <label className="upload-box">
          <input
            type="file"
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
            onChange={handleFileUpload}
            hidden
          />
          {orderDetails.fileName ? (
            <div className="file-info">
              <span className="file-icon">📄</span>
              <span className="file-name">{orderDetails.fileName}</span>
              <span className="file-pages">{orderDetails.pages} صفحات</span>
            </div>
          ) : (
            <div className="upload-placeholder">
              <span className="upload-icon">📤</span>
              <span>اضغط لرفع الملف</span>
              <span className="upload-hint">PDF, Word, صور</span>
            </div>
          )}
        </label>
      </div>

      <div className="options-section">
        <h3>خيارات الطباعة</h3>
        
        <div className="option-group">
          <label>نوع الطباعة</label>
          <div className="option-buttons">
            {printOptions.color.map((opt) => (
              <button
                key={opt.id}
                className={`option-btn ${orderDetails.color === opt.id ? 'active' : ''}`}
                onClick={() => setOrderDetails({ ...orderDetails, color: opt.id })}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </div>

        <div className="option-group">
          <label>حجم الورق</label>
          <div className="option-buttons">
            {printOptions.size.map((opt) => (
              <button
                key={opt.id}
                className={`option-btn ${orderDetails.size === opt.id ? 'active' : ''}`}
                onClick={() => setOrderDetails({ ...orderDetails, size: opt.id })}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </div>

        <div className="option-group">
          <label>طريقة الطباعة</label>
          <div className="option-buttons">
            {printOptions.sides.map((opt) => (
              <button
                key={opt.id}
                className={`option-btn ${orderDetails.sides === opt.id ? 'active' : ''}`}
                onClick={() => setOrderDetails({ ...orderDetails, sides: opt.id })}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </div>

        <div className="option-group">
          <label>عدد النسخ</label>
          <div className="copies-control">
            <button
              className="copies-btn"
              onClick={() => setOrderDetails({ ...orderDetails, copies: Math.max(1, orderDetails.copies - 1) })}
            >
              -
            </button>
            <span className="copies-value">{orderDetails.copies}</span>
            <button
              className="copies-btn"
              onClick={() => setOrderDetails({ ...orderDetails, copies: orderDetails.copies + 1 })}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="price-summary">
        <div className="price-row">
          <span>السعر التقديري</span>
          <span className="price-value">{calculatePrice()} ريال</span>
        </div>
      </div>

      <button
        className="proceed-btn"
        onClick={handleProceedToPhone}
        disabled={!orderDetails.fileName}
      >
        متابعة
      </button>
    </div>
  );

  // Phone Page
  const PhonePage = () => (
    <div className="phone-page">
      <button className="back-btn" onClick={() => setCurrentPage('service')}>
        → رجوع
      </button>

      <div className="phone-header">
        <span className="phone-icon">📱</span>
        <h2>رقم الجوال</h2>
        <p>لإرسال تحديثات الطلب</p>
      </div>

      <div className="phone-input-section">
        <div className="phone-input-wrapper">
          <span className="country-code">966+</span>
          <input
            type="tel"
            placeholder="5XXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
            maxLength={9}
          />
        </div>
      </div>

      <div className="notifications-section">
        <h3>طريقة الإشعارات</h3>
        <label className="notification-option">
          <input
            type="checkbox"
            checked={notifications.sms}
            onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
          />
          <span className="checkbox-custom"></span>
          <span className="notification-label">
            <span className="notification-icon">💬</span>
            رسائل SMS
          </span>
        </label>
        <label className="notification-option">
          <input
            type="checkbox"
            checked={notifications.whatsapp}
            onChange={(e) => setNotifications({ ...notifications, whatsapp: e.target.checked })}
          />
          <span className="checkbox-custom"></span>
          <span className="notification-label">
            <span className="notification-icon">📲</span>
            واتساب
          </span>
        </label>
      </div>

      <button
        className="proceed-btn"
        onClick={handleProceedToPayment}
        disabled={phone.length !== 9}
      >
        متابعة للدفع
      </button>
    </div>
  );

  // Payment Page
  const PaymentPage = () => (
    <div className="payment-page">
      <button className="back-btn" onClick={() => setCurrentPage('phone')}>
        → رجوع
      </button>

      <h2>ملخص الطلب</h2>

      <div className="order-summary">
        <div className="summary-item">
          <span className="summary-label">الخدمة</span>
          <span className="summary-value">{selectedService?.name}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">الملف</span>
          <span className="summary-value">{orderDetails.fileName}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">عدد الصفحات</span>
          <span className="summary-value">{orderDetails.pages}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">نوع الطباعة</span>
          <span className="summary-value">
            {printOptions.color.find(c => c.id === orderDetails.color)?.name}
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">الحجم</span>
          <span className="summary-value">
            {printOptions.size.find(s => s.id === orderDetails.size)?.name}
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">عدد النسخ</span>
          <span className="summary-value">{orderDetails.copies}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">رقم الجوال</span>
          <span className="summary-value" dir="ltr">+966 {phone}</span>
        </div>
        <div className="summary-divider"></div>
        <div className="summary-item total">
          <span className="summary-label">المجموع</span>
          <span className="summary-value">{calculatePrice()} ريال</span>
        </div>
      </div>

      <div className="payment-methods">
        <h3>طريقة الدفع</h3>
        <div className="payment-buttons">
          <button className="payment-method" onClick={handlePayment}>
            <span className="payment-icon">🍎</span>
            Apple Pay
          </button>
          <button className="payment-method" onClick={handlePayment}>
            <span className="payment-icon">💳</span>
            مدى
          </button>
          <button className="payment-method" onClick={handlePayment}>
            <span className="payment-icon">💳</span>
            Visa / Mastercard
          </button>
        </div>
      </div>
    </div>
  );

  // Success Page
  const SuccessPage = () => (
    <div className="success-page">
      <div className="success-animation">
        <div className="success-circle">
          <span className="success-icon">✓</span>
        </div>
      </div>
      
      <h2>تم الطلب بنجاح!</h2>
      <p className="order-number-label">رقم الطلب</p>
      <p className="order-number">#{orderNumber}</p>
      
      <div className="success-info">
        <p>سيتم إرسال إشعار عند تحديث حالة الطلب</p>
        <p className="success-phone" dir="ltr">+966 {phone}</p>
      </div>

      <button className="proceed-btn" onClick={() => setCurrentPage('tracking')}>
        متابعة حالة الطلب
      </button>
      
      <button className="secondary-btn" onClick={() => setCurrentPage('home')}>
        طلب جديد
      </button>
    </div>
  );

  // Tracking Page
  const TrackingPage = () => (
    <div className="tracking-page">
      <button className="back-btn" onClick={() => setCurrentPage('home')}>
        → الرئيسية
      </button>

      <div className="tracking-header">
        <h2>تتبع الطلب</h2>
        <p className="tracking-number">#{orderNumber}</p>
      </div>

      <div className="status-timeline">
        {orderStatuses.map((status, index) => (
          <div
            key={status.id}
            className={`status-item ${index <= currentStatus ? 'completed' : ''} ${index === currentStatus ? 'current' : ''}`}
          >
            <div className="status-line">
              <div className="status-dot">
                {index < currentStatus ? '✓' : status.icon}
              </div>
              {index < orderStatuses.length - 1 && <div className="status-connector"></div>}
            </div>
            <div className="status-content">
              <h4>{status.name}</h4>
              {status.warning && index <= currentStatus && (
                <div className="status-warning">
                  ⚠️ لا يمكن إلغاء الطلب بعد هذه المرحلة
                </div>
              )}
              {index === currentStatus && (
                <span className="status-current-badge">أنت هنا</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="pickup-info">
        <div className="pickup-item">
          <span className="pickup-icon">📍</span>
          <div className="pickup-details">
            <span className="pickup-label">موقع الاستلام</span>
            <span className="pickup-value">فرع حي النرجس - الرياض</span>
          </div>
        </div>
        <div className="pickup-item">
          <span className="pickup-icon">⏰</span>
          <div className="pickup-details">
            <span className="pickup-label">الوقت المتوقع</span>
            <span className="pickup-value">اليوم 4:00 مساءً</span>
          </div>
        </div>
      </div>

      {/* Demo button to simulate status changes */}
      <button className="demo-btn" onClick={simulateStatusChange}>
        محاكاة تغيير الحالة (للعرض)
      </button>
    </div>
  );

  return (
    <div className="app" dir="rtl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .app {
          font-family: 'Tajawal', sans-serif;
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          color: #fff;
          padding: 20px;
          position: relative;
          overflow-x: hidden;
        }
        
        .app::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(255, 179, 71, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(72, 202, 228, 0.1) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }
        
        .app > * {
          position: relative;
          z-index: 1;
        }
        
        /* Header */
        .header {
          text-align: center;
          padding: 30px 0;
        }
        
        .logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 10px;
        }
        
        .logo-icon {
          font-size: 40px;
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .logo h1 {
          font-size: 32px;
          font-weight: 800;
          background: linear-gradient(135deg, #FFB347 0%, #FF6B6B 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .tagline {
          color: #94a3b8;
          font-size: 16px;
        }
        
        /* Track Section */
        .track-section {
          margin: 20px auto;
          max-width: 400px;
        }
        
        .track-box {
          display: flex;
          gap: 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 8px;
        }
        
        .track-box input {
          flex: 1;
          background: transparent;
          border: none;
          color: #fff;
          padding: 12px;
          font-size: 14px;
          font-family: inherit;
          outline: none;
        }
        
        .track-box input::placeholder {
          color: #64748b;
        }
        
        .track-box button {
          background: linear-gradient(135deg, #FFB347 0%, #FF6B6B 100%);
          border: none;
          border-radius: 12px;
          padding: 12px 24px;
          color: #fff;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .track-box button:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 20px rgba(255, 179, 71, 0.3);
        }
        
        /* Section Title */
        .section-title {
          text-align: center;
          font-size: 20px;
          font-weight: 700;
          margin: 30px 0 20px;
          color: #e2e8f0;
        }
        
        /* Services Grid */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          max-width: 500px;
          margin: 0 auto;
        }
        
        .service-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 24px 16px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .service-card:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-4px);
          border-color: rgba(255, 179, 71, 0.5);
          box-shadow: 0 8px 30px rgba(255, 179, 71, 0.15);
        }
        
        .service-icon {
          font-size: 36px;
          display: block;
          margin-bottom: 12px;
        }
        
        .service-card h3 {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 6px;
          color: #fff;
        }
        
        .service-card p {
          font-size: 12px;
          color: #94a3b8;
        }
        
        /* Footer */
        .footer {
          text-align: center;
          margin-top: 40px;
          padding: 20px;
          color: #64748b;
          font-size: 14px;
        }
        
        .footer p {
          margin: 4px 0;
        }
        
        /* Back Button */
        .back-btn {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 16px;
          font-family: inherit;
          cursor: pointer;
          padding: 10px 0;
          margin-bottom: 20px;
          transition: color 0.2s;
        }
        
        .back-btn:hover {
          color: #fff;
        }
        
        /* Service Page */
        .service-header {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .service-icon-large {
          font-size: 60px;
          display: block;
          margin-bottom: 10px;
        }
        
        .service-header h2 {
          font-size: 24px;
          font-weight: 700;
        }
        
        /* Upload Section */
        .upload-section {
          margin-bottom: 30px;
        }
        
        .upload-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 2px dashed rgba(255, 179, 71, 0.5);
          border-radius: 20px;
          padding: 40px 20px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .upload-box:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: #FFB347;
        }
        
        .upload-placeholder {
          text-align: center;
          color: #94a3b8;
        }
        
        .upload-icon {
          font-size: 40px;
          display: block;
          margin-bottom: 10px;
        }
        
        .upload-hint {
          display: block;
          font-size: 12px;
          margin-top: 8px;
          color: #64748b;
        }
        
        .file-info {
          text-align: center;
        }
        
        .file-icon {
          font-size: 40px;
          display: block;
          margin-bottom: 10px;
        }
        
        .file-name {
          display: block;
          font-weight: 600;
          color: #fff;
          margin-bottom: 4px;
        }
        
        .file-pages {
          color: #FFB347;
          font-size: 14px;
        }
        
        /* Options Section */
        .options-section {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 20px;
        }
        
        .options-section h3 {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 20px;
          color: #FFB347;
        }
        
        .option-group {
          margin-bottom: 20px;
        }
        
        .option-group label {
          display: block;
          font-size: 14px;
          color: #94a3b8;
          margin-bottom: 10px;
        }
        
        .option-buttons {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        
        .option-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 12px 20px;
          color: #fff;
          font-family: inherit;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .option-btn.active {
          background: linear-gradient(135deg, #FFB347 0%, #FF6B6B 100%);
          border-color: transparent;
        }
        
        .option-btn:hover:not(.active) {
          background: rgba(255, 255, 255, 0.1);
        }
        
        /* Copies Control */
        .copies-control {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        
        .copies-btn {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          font-size: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .copies-btn:hover {
          background: rgba(255, 179, 71, 0.3);
        }
        
        .copies-value {
          font-size: 24px;
          font-weight: 700;
          min-width: 40px;
          text-align: center;
        }
        
        /* Price Summary */
        .price-summary {
          background: rgba(255, 179, 71, 0.1);
          border: 1px solid rgba(255, 179, 71, 0.3);
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 20px;
        }
        
        .price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .price-value {
          font-size: 24px;
          font-weight: 800;
          color: #FFB347;
        }
        
        /* Proceed Button */
        .proceed-btn {
          width: 100%;
          background: linear-gradient(135deg, #FFB347 0%, #FF6B6B 100%);
          border: none;
          border-radius: 16px;
          padding: 18px;
          color: #fff;
          font-size: 18px;
          font-weight: 700;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .proceed-btn:hover:not(:disabled) {
          transform: scale(1.02);
          box-shadow: 0 8px 30px rgba(255, 179, 71, 0.4);
        }
        
        .proceed-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .secondary-btn {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 18px;
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          margin-top: 12px;
          transition: all 0.2s ease;
        }
        
        .secondary-btn:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        
        /* Phone Page */
        .phone-header {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .phone-icon {
          font-size: 60px;
          display: block;
          margin-bottom: 10px;
        }
        
        .phone-header h2 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        
        .phone-header p {
          color: #94a3b8;
        }
        
        .phone-input-section {
          margin-bottom: 30px;
        }
        
        .phone-input-wrapper {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 4px;
          direction: ltr;
        }
        
        .country-code {
          background: rgba(255, 179, 71, 0.2);
          padding: 14px 16px;
          border-radius: 12px;
          color: #FFB347;
          font-weight: 700;
        }
        
        .phone-input-wrapper input {
          flex: 1;
          background: transparent;
          border: none;
          color: #fff;
          font-size: 18px;
          padding: 14px;
          font-family: inherit;
          outline: none;
          letter-spacing: 2px;
        }
        
        /* Notifications Section */
        .notifications-section {
          margin-bottom: 30px;
        }
        
        .notifications-section h3 {
          font-size: 16px;
          color: #94a3b8;
          margin-bottom: 16px;
        }
        
        .notification-option {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .notification-option:hover {
          background: rgba(255, 255, 255, 0.08);
        }
        
        .notification-option input {
          display: none;
        }
        
        .checkbox-custom {
          width: 24px;
          height: 24px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        
        .notification-option input:checked + .checkbox-custom {
          background: linear-gradient(135deg, #FFB347 0%, #FF6B6B 100%);
          border-color: transparent;
        }
        
        .notification-option input:checked + .checkbox-custom::after {
          content: '✓';
          color: #fff;
          font-size: 14px;
          font-weight: 700;
        }
        
        .notification-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 16px;
        }
        
        .notification-icon {
          font-size: 20px;
        }
        
        /* Payment Page */
        .payment-page h2 {
          text-align: center;
          font-size: 24px;
          margin-bottom: 24px;
        }
        
        .order-summary {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 30px;
        }
        
        .summary-item {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .summary-item:last-child {
          border-bottom: none;
        }
        
        .summary-label {
          color: #94a3b8;
        }
        
        .summary-value {
          font-weight: 600;
        }
        
        .summary-divider {
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255, 179, 71, 0.5), transparent);
          margin: 12px 0;
        }
        
        .summary-item.total .summary-value {
          font-size: 20px;
          font-weight: 800;
          color: #FFB347;
        }
        
        /* Payment Methods */
        .payment-methods h3 {
          font-size: 16px;
          color: #94a3b8;
          margin-bottom: 16px;
          text-align: center;
        }
        
        .payment-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .payment-method {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 18px;
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .payment-method:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 179, 71, 0.5);
        }
        
        .payment-icon {
          font-size: 24px;
        }
        
        /* Success Page */
        .success-page {
          text-align: center;
          padding-top: 40px;
        }
        
        .success-animation {
          margin-bottom: 30px;
        }
        
        .success-circle {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          animation: scaleIn 0.5s ease;
        }
        
        @keyframes scaleIn {
          0% { transform: scale(0); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        .success-icon {
          font-size: 50px;
          color: #fff;
        }
        
        .success-page h2 {
          font-size: 28px;
          margin-bottom: 20px;
        }
        
        .order-number-label {
          color: #94a3b8;
          font-size: 14px;
        }
        
        .order-number {
          font-size: 36px;
          font-weight: 800;
          color: #FFB347;
          margin-bottom: 30px;
        }
        
        .success-info {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 30px;
        }
        
        .success-info p {
          color: #94a3b8;
          margin-bottom: 8px;
        }
        
        .success-phone {
          font-size: 18px;
          font-weight: 600;
          color: #fff !important;
        }
        
        /* Tracking Page */
        .tracking-header {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .tracking-header h2 {
          font-size: 24px;
          margin-bottom: 8px;
        }
        
        .tracking-number {
          font-size: 20px;
          font-weight: 700;
          color: #FFB347;
        }
        
        /* Status Timeline */
        .status-timeline {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 24px;
        }
        
        .status-item {
          display: flex;
          gap: 16px;
          opacity: 0.4;
          transition: all 0.3s ease;
        }
        
        .status-item.completed {
          opacity: 1;
        }
        
        .status-line {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .status-dot {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          transition: all 0.3s ease;
        }
        
        .status-item.completed .status-dot {
          background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
        }
        
        .status-item.current .status-dot {
          background: linear-gradient(135deg, #FFB347 0%, #FF6B6B 100%);
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255, 179, 71, 0.4); }
          50% { box-shadow: 0 0 0 15px rgba(255, 179, 71, 0); }
        }
        
        .status-connector {
          width: 3px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          margin: 8px 0;
        }
        
        .status-item.completed .status-connector {
          background: linear-gradient(180deg, #4ade80, rgba(74, 222, 128, 0.3));
        }
        
        .status-content {
          flex: 1;
          padding: 10px 0 20px;
        }
        
        .status-content h4 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 6px;
        }
        
        .status-warning {
          background: rgba(251, 191, 36, 0.1);
          border: 1px solid rgba(251, 191, 36, 0.3);
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 13px;
          color: #fbbf24;
          margin-top: 8px;
        }
        
        .status-current-badge {
          display: inline-block;
          background: rgba(255, 179, 71, 0.2);
          color: #FFB347;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }
        
        /* Pickup Info */
        .pickup-info {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 20px;
          margin-bottom: 20px;
        }
        
        .pickup-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 0;
        }
        
        .pickup-item:not(:last-child) {
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .pickup-icon {
          font-size: 28px;
        }
        
        .pickup-details {
          display: flex;
          flex-direction: column;
        }
        
        .pickup-label {
          font-size: 12px;
          color: #94a3b8;
        }
        
        .pickup-value {
          font-weight: 600;
        }
        
        /* Demo Button */
        .demo-btn {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px dashed rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 14px;
          color: #64748b;
          font-size: 14px;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .demo-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #94a3b8;
        }
        
        /* ==================== RESPONSIVE DESIGN ==================== */
        
        /* Large screens (desktops) */
        @media (min-width: 1024px) {
          .app {
            padding: 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .home-page,
          .service-page,
          .phone-page,
          .payment-page,
          .success-page,
          .tracking-page {
            max-width: 600px;
            width: 100%;
          }
          
          .header {
            padding: 50px 0;
          }
          
          .logo h1 {
            font-size: 42px;
          }
          
          .tagline {
            font-size: 18px;
          }
          
          .services-grid {
            grid-template-columns: repeat(4, 1fr);
            max-width: 800px;
            gap: 20px;
          }
          
          .service-card {
            padding: 30px 20px;
          }
          
          .service-icon {
            font-size: 44px;
          }
          
          .service-card h3 {
            font-size: 18px;
          }
          
          .track-section {
            max-width: 500px;
          }
          
          .option-buttons {
            gap: 12px;
          }
          
          .option-btn {
            padding: 14px 28px;
            font-size: 15px;
          }
          
          .payment-buttons {
            flex-direction: row;
            justify-content: center;
          }
          
          .payment-method {
            flex: 1;
            max-width: 200px;
          }
        }
        
        /* Medium screens (tablets) */
        @media (min-width: 768px) and (max-width: 1023px) {
          .app {
            padding: 30px;
          }
          
          .home-page,
          .service-page,
          .phone-page,
          .payment-page,
          .success-page,
          .tracking-page {
            max-width: 550px;
            margin: 0 auto;
          }
          
          .services-grid {
            grid-template-columns: repeat(4, 1fr);
            max-width: 600px;
            gap: 14px;
          }
          
          .service-card {
            padding: 20px 12px;
          }
          
          .service-icon {
            font-size: 32px;
            margin-bottom: 8px;
          }
          
          .service-card h3 {
            font-size: 13px;
          }
          
          .service-card p {
            font-size: 11px;
          }
          
          .logo h1 {
            font-size: 36px;
          }
          
          .payment-buttons {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            gap: 12px;
          }
          
          .payment-method {
            flex: 1;
            min-width: 150px;
          }
        }
        
        /* Small screens (mobile phones) */
        @media (max-width: 767px) {
          .app {
            padding: 16px;
          }
          
          .header {
            padding: 20px 0;
          }
          
          .logo-icon {
            font-size: 32px;
          }
          
          .logo h1 {
            font-size: 26px;
          }
          
          .tagline {
            font-size: 14px;
          }
          
          .section-title {
            font-size: 18px;
            margin: 24px 0 16px;
          }
          
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          
          .service-card {
            padding: 20px 12px;
          }
          
          .service-icon {
            font-size: 30px;
            margin-bottom: 8px;
          }
          
          .service-card h3 {
            font-size: 14px;
          }
          
          .service-card p {
            font-size: 11px;
          }
          
          .track-box {
            flex-direction: column;
            padding: 12px;
          }
          
          .track-box input {
            text-align: center;
          }
          
          .track-box button {
            width: 100%;
          }
          
          .service-icon-large {
            font-size: 50px;
          }
          
          .service-header h2 {
            font-size: 22px;
          }
          
          .upload-box {
            padding: 30px 16px;
          }
          
          .upload-icon {
            font-size: 34px;
          }
          
          .options-section {
            padding: 18px;
          }
          
          .options-section h3 {
            font-size: 16px;
            margin-bottom: 16px;
          }
          
          .option-buttons {
            gap: 8px;
          }
          
          .option-btn {
            padding: 10px 14px;
            font-size: 13px;
            flex: 1;
            min-width: calc(33% - 8px);
            text-align: center;
          }
          
          .copies-control {
            justify-content: center;
          }
          
          .copies-btn {
            width: 40px;
            height: 40px;
          }
          
          .copies-value {
            font-size: 22px;
          }
          
          .price-summary {
            padding: 16px;
          }
          
          .price-value {
            font-size: 22px;
          }
          
          .proceed-btn {
            padding: 16px;
            font-size: 16px;
          }
          
          .phone-icon {
            font-size: 50px;
          }
          
          .phone-header h2 {
            font-size: 22px;
          }
          
          .phone-input-wrapper input {
            font-size: 16px;
            letter-spacing: 1px;
          }
          
          .notification-option {
            padding: 14px;
          }
          
          .notification-label {
            font-size: 14px;
          }
          
          .order-summary {
            padding: 18px;
          }
          
          .summary-item {
            padding: 10px 0;
            font-size: 14px;
          }
          
          .summary-item.total .summary-value {
            font-size: 18px;
          }
          
          .payment-method {
            padding: 16px;
            font-size: 15px;
          }
          
          .success-circle {
            width: 80px;
            height: 80px;
          }
          
          .success-icon {
            font-size: 40px;
          }
          
          .success-page h2 {
            font-size: 24px;
          }
          
          .order-number {
            font-size: 30px;
          }
          
          .success-info {
            padding: 16px;
          }
          
          .tracking-header h2 {
            font-size: 22px;
          }
          
          .tracking-number {
            font-size: 18px;
          }
          
          .status-timeline {
            padding: 18px;
          }
          
          .status-dot {
            width: 38px;
            height: 38px;
            font-size: 18px;
          }
          
          .status-connector {
            height: 30px;
          }
          
          .status-content h4 {
            font-size: 14px;
          }
          
          .status-warning {
            font-size: 12px;
            padding: 8px 12px;
          }
          
          .status-current-badge {
            font-size: 11px;
            padding: 3px 10px;
          }
          
          .pickup-info {
            padding: 16px;
          }
          
          .pickup-icon {
            font-size: 24px;
          }
          
          .pickup-label {
            font-size: 11px;
          }
          
          .pickup-value {
            font-size: 14px;
          }
          
          .footer {
            margin-top: 30px;
            padding: 16px;
            font-size: 13px;
          }
        }
        
        /* Extra small screens */
        @media (max-width: 359px) {
          .app {
            padding: 12px;
          }
          
          .logo h1 {
            font-size: 22px;
          }
          
          .services-grid {
            gap: 10px;
          }
          
          .service-card {
            padding: 16px 10px;
          }
          
          .service-icon {
            font-size: 26px;
          }
          
          .service-card h3 {
            font-size: 13px;
          }
          
          .option-btn {
            padding: 8px 10px;
            font-size: 12px;
          }
          
          .phone-input-wrapper {
            flex-direction: column;
          }
          
          .country-code {
            width: 100%;
            text-align: center;
            border-radius: 12px 12px 0 0;
          }
          
          .phone-input-wrapper input {
            text-align: center;
          }
        }
        
        /* Landscape mode for mobile */
        @media (max-height: 500px) and (orientation: landscape) {
          .header {
            padding: 15px 0;
          }
          
          .logo-icon {
            font-size: 28px;
          }
          
          .logo h1 {
            font-size: 24px;
          }
          
          .services-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
          }
          
          .service-card {
            padding: 14px 10px;
          }
          
          .service-icon {
            font-size: 24px;
            margin-bottom: 6px;
          }
          
          .service-card h3 {
            font-size: 12px;
          }
          
          .service-card p {
            display: none;
          }
          
          .success-circle {
            width: 60px;
            height: 60px;
          }
          
          .success-icon {
            font-size: 30px;
          }
          
          .success-page {
            padding-top: 20px;
          }
        }
        
        /* Touch improvements */
        @media (hover: none) and (pointer: coarse) {
          .service-card:active {
            transform: scale(0.98);
            background: rgba(255, 255, 255, 0.1);
          }
          
          .option-btn:active {
            transform: scale(0.95);
          }
          
          .proceed-btn:active:not(:disabled) {
            transform: scale(0.98);
          }
          
          .payment-method:active {
            transform: scale(0.98);
          }
        }
        
        /* Print styles */
        @media print {
          .app {
            background: #fff;
            color: #000;
          }
          
          .back-btn,
          .proceed-btn,
          .secondary-btn,
          .demo-btn,
          .payment-buttons {
            display: none;
          }
        }
      `}</style>

      {currentPage === 'home' && <HomePage />}
      {currentPage === 'service' && <ServicePage />}
      {currentPage === 'phone' && <PhonePage />}
      {currentPage === 'payment' && <PaymentPage />}
      {currentPage === 'success' && <SuccessPage />}
      {currentPage === 'tracking' && <TrackingPage />}
    </div>
  );
}
