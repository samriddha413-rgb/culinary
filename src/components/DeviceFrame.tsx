import React, { ReactNode } from 'react';
import { useApp } from '../context/AppContext';
import { Wifi, Battery, Signal, Circle } from 'lucide-react';

interface DeviceFrameProps {
  children: ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  const { deviceFrame, setDeviceFrame } = useApp();

  if (deviceFrame === 'responsive') {
    return <div className="min-h-screen flex flex-col">{children}</div>;
  }

  const isIOS = deviceFrame === 'ios';

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-start py-6 px-2 sm:px-4">
      {/* Device Switcher Banner above frame */}
      <div className="mb-4 flex items-center gap-3 bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-full text-xs text-neutral-300 shadow-lg">
        <span className="text-amber-400 font-bold">
          {isIOS ? '📱 iOS React Native Container (iPhone 16 Pro)' : '📱 Android React Native Container (Pixel 9)'}
        </span>
        <span className="text-neutral-600">•</span>
        <button
          onClick={() => setDeviceFrame('responsive')}
          className="text-amber-400 hover:underline font-medium"
        >
          Exit to Full Web View
        </button>
      </div>

      {/* Hardware Frame Mockup */}
      <div
        className={`relative w-full max-w-[420px] h-[860px] max-h-[92vh] bg-neutral-950 rounded-[50px] p-3 shadow-2xl ring-1 ring-neutral-700/80 border-4 ${
          isIOS ? 'border-neutral-800' : 'border-neutral-800'
        } flex flex-col overflow-hidden shadow-black/90`}
      >
        {/* Device Status Bar Header */}
        <div className="h-10 bg-neutral-950 text-neutral-100 flex items-center justify-between px-7 shrink-0 text-xs font-semibold select-none">
          <span>9:41</span>

          {/* Dynamic Island (iOS) or Hole punch (Android) */}
          {isIOS ? (
            <div className="w-24 h-5 bg-black rounded-full mx-auto flex items-center justify-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-900" />
            </div>
          ) : (
            <div className="w-4 h-4 rounded-full bg-black mx-auto" />
          )}

          <div className="flex items-center gap-1.5 text-neutral-300">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Device Internal Screen Container */}
        <div className="flex-1 overflow-y-auto bg-neutral-950 rounded-[38px] flex flex-col relative scrollbar-none">
          {children}
        </div>

        {/* Bottom Home Indicator Bar (iOS / Android) */}
        <div className="h-5 bg-neutral-950 flex items-center justify-center shrink-0">
          <div
            className={`rounded-full bg-neutral-500/60 ${
              isIOS ? 'w-32 h-1' : 'w-20 h-1'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
