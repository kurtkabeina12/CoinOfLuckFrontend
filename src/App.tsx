import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [shakeDetected, setShakeDetected] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      if ('permissions' in navigator) {
        try {
          const permissionStatus = await navigator.permissions.query({ name: 'device-motion' } as any);
          if (permissionStatus.state === 'granted') {
            setupDeviceMotionListener();
          } else {
            console.error('Разрешение на доступ к акселерометру отклонено');
          }
        } catch (error) {
          console.error('Ошибка при запросе разрешения:', error);
        }
      } else {
        setupDeviceMotionListener(); // Если метод permissions отсутствует, предполагаем, что разрешение уже предоставлено
      }
    };

    const setupDeviceMotionListener = () => {
      const handleDeviceMotion = (event: DeviceMotionEvent) => {
        const acceleration = event.accelerationIncludingGravity;
        if (!acceleration) return;

        const threshold = 1.2; // Значение порога тряски
        const x = acceleration.x?? 0;
        const y = acceleration.y?? 0;
        const z = acceleration.z?? 0;

        if (Math.abs(x) > threshold || Math.abs(y) > threshold || Math.abs(z) > threshold) {
          setShakeDetected(true);
          setTimeout(() => setShakeDetected(false), 500); // Сброс состояния после 500 мс
        }
      };

      window.addEventListener('devicemotion', handleDeviceMotion);

      return () => {
        window.removeEventListener('devicemotion', handleDeviceMotion);
      };
    };

    requestPermission();
  }, []);

  return (
    <div className="App">
      {shakeDetected? <p>Тряска обнаружена!</p> : <p>Ждем тряску...</p>}
    </div>
  );
};

export default App;
