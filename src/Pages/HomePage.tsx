import React, { useEffect, useState } from 'react';

const HomePage: React.FC = () => {
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const handleMotion = (event: DeviceMotionEvent) => {
      const threshold = 150; // Уменьшенное пороговое значение для определения тряски
      const { alpha, beta, gamma } = event.rotationRate || { alpha: 0, beta: 0, gamma: 0 };

      // Заменяем null на 0 перед сравнением
      const absAlpha = Math.abs((alpha || 0));
      const absBeta = Math.abs((beta || 0));
      const absGamma = Math.abs((gamma || 0));

      if (absAlpha > threshold || absBeta > threshold || absGamma > threshold) {
        setIsShaking(true);
      } else {
        setIsShaking(false);
      }
    };

    if ('ondevicemotion' in window) {
      window.addEventListener('devicemotion', handleMotion);
    }

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, []);

  return (
    <div>
      {isShaking? <p>Устройство трясется</p> : <p>Устройство стабильно</p>}
    </div>
  );
};

export default HomePage;
