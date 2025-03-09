import { useState, useEffect } from 'react';

const StatusBar = () => {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleStatusChange = () => setOnline(navigator.onLine);
    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-full text-center p-2 text-white ${online ? 'bg-green-500' : 'bg-red-500'}`}>
      {online ? '🟢 آنلاین' : '🔴 آفلاین - تغییرات ذخیره می‌شوند'}
    </div>
  );
};

export default StatusBar;