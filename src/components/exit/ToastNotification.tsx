import { AnimatePresence, motion, type Variants } from 'framer-motion';
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
    <div className="">
      <button
        onClick={addToast}
        className="button"
        title={'Add Notification'}
      >
        Add Notification
      </button>

      <div className={'fixed bottom-5 right-5 flex flex-col space-y-3'}>
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
      className="flex justify-between items-center p-4 mb-3 w-3xs bg-gray-200 rounded shadow-4xl font-semibold text-black"
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={() => onClose(id)}
    >
      <span>{message}</span>
    </motion.div>
  );
};

const toastVariants: Variants = {
  initial: { opacity: 0, x: 300 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, type:"spring"} },
  exit: { opacity: 0, scale:0.5, transition: { duration: 0.3, ease: 'easeOut' } },
};
