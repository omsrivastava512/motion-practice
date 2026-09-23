// Ref: [ADR-COMP-03] Stacked toast notification exit lifecycles and motion/react standardization.
import { AnimatePresence, motion, type Variants } from 'motion/react';
import { useState, useEffect } from 'preact/hooks';

type ToastData = {
  id: number;
  message: string;
};

export const ToastNotification = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = () => {
    setToasts(t => [
      ...t,
      {
        id: Date.now(),
        message: 'Message ' + (t.length + 1),
      },
    ]);
  };

  const removeToast = (id: number) => {
    setToasts(ts => ts.filter(t => t.id !== id));
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={addToast}
        className="px-3.5 py-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 text-xs font-medium shadow-sm active:scale-95 transition-all cursor-pointer"
        title="Add notification to stack (click to enqueue next toast)"
      >
        Add Notification
      </button>

      <div className="fixed bottom-6 right-6 flex flex-col space-y-2 z-50 pointer-events-auto">
        <AnimatePresence>
          {toasts.map((t) => (
            <Toast
              key={t.id}
              id={t.id}
              onClose={removeToast}
              message={t.message}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

type ToastProps = ToastData & {
  onClose(id: number): void;
  timerInSeconds?: number;
};

const Toast = ({ id, message, onClose, timerInSeconds = 20 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, timerInSeconds * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose, id, timerInSeconds]);

  return (
    <motion.div
      layout    
      className="flex justify-between items-center px-4 py-3 w-72 rounded-xl bg-neutral-900/95 border border-neutral-800 text-neutral-100 shadow-2xl backdrop-blur-md text-xs font-medium cursor-pointer select-none"
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={() => onClose(id)}
      title="Click notification to dismiss immediately"
    >
      <span>{message}</span>
      <span className="text-[10px] text-neutral-500 font-mono">Dismiss</span>
    </motion.div>
  );
};

const toastVariants: Variants = {
  initial: { opacity: 0, x: 300 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, type:"spring"} },
  exit: { opacity: 0, scale:0.5, transition: { duration: 0.3, ease: 'easeOut' } },
};
