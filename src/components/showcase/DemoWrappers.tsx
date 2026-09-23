// Ref: [ADR-SHOWCASE-03] Lightweight non-destructive wrappers exposing interactive reset and parameter controls.
import { useState } from "preact/hooks";
import { HeadingAppearFromBotton, SelectorCard } from "../Basics";
import BasketBall from "../BasketBall";
import { WiggleBox, ScaleButton } from "../keyframes/Generic";
import { LoginForm } from "../keyframes/LoginForm";
import { KillSquare } from "../exit/SimpleExit";
import { AnimatePresence, motion } from "motion/react";
import { RefreshCw, Plus, Bell } from "lucide-react";

/**
 * Day 1: Interactive Basics Card & Heading
 */
export const BasicsDemo = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 text-center max-w-md">
      <HeadingAppearFromBotton />
      <div className="flex flex-col items-center gap-2">
        <span className="text-[11px] font-mono text-neutral-500">
          Hover & tap card below
        </span>
        <div className="size-44 flex items-center justify-center">
          <SelectorCard />
        </div>
      </div>
    </div>
  );
};

/**
 * Day 1: Basketball Bounces with explicit interactive labels
 */
export const BasketBallDemo = () => {
  const zBounceVariants = {
    hover: { scale: 1.25 },
    tap: { scale: 0.8 },
  };

  const yBounceVariants = {
    hover: { scale: 1.25 },
    tap: { y: -50, scale: 1.2 },
  };
  const xBounceVariants = {
    hover: { scale: 1.25 },
    tap: { x: -50, scale: 1.2 },
  };

  return (
    <div className="flex flex-col items-center gap-8 p-6">
      <p className="text-xs text-neutral-400 font-mono">
        Hover or tap each ball to compare spring physics & transform axes:
      </p>
      <div className="flex items-center justify-center gap-12">
        <div className="flex flex-col items-center gap-2.5">
          <BasketBall variants={xBounceVariants} />
          <span className="text-[10px] font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded-md">
            X-Axis Scale
          </span>
        </div>
        <div className="flex flex-col items-center gap-2.5">
          <BasketBall variants={zBounceVariants} />
          <span className="text-[10px] font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded-md">
            Z-Axis Scale
          </span>
        </div>
        <div className="flex flex-col items-center gap-2.5">
          <BasketBall variants={yBounceVariants} />
          <span className="text-[10px] font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded-md">
            Y-Axis Jump
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * Day 2: Interactive Notification Feed Showcase
 * Demonstrates parent-child variant propagation and configurable staggerChildren intervals.
 */
export const NotificationFeedDemo = () => {
  const [messages, setMessages] = useState<string[]>([
    "Initial variant loaded",
    "staggerChildren: 0.15s applied",
    "Spring damping synchronized",
  ]);
  const [staggerSpeed, setStaggerSpeed] = useState<number>(0.15);
  const [feedKey, setFeedKey] = useState<number>(0);

  const addNotification = () => {
    const samples = [
      "Staggered entrance arrived",
      "Variant state propagated",
      "Dynamic feed item queued",
      "Child animation resolved",
      "Spring physics settled",
    ];
    const nextMsg = `${samples[messages.length % samples.length]} (#${messages.length + 1})`;
    setMessages((prev) => [...prev, nextMsg]);
    setFeedKey((k) => k + 1);
  };

  const retriggerCascade = () => {
    setFeedKey((k) => k + 1);
  };

  const activeFeedVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerSpeed,
        when: "beforeChildren" as const,
      },
    },
  };

  const activeItemVariants = {
    hidden: { x: 40, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 140,
        damping: 18,
      },
    },
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm p-4 gap-4">
      {/* Sleek Apple-style Controls Bar */}
      <div className="flex items-center justify-between w-full p-1.5 rounded-lg bg-neutral-900/90 border border-neutral-800 text-xs">
        <button
          type="button"
          title="Add another notification to see staggered entrance"
          onClick={addNotification}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 hover:bg-white text-neutral-900 font-medium text-xs transition-colors active:scale-[0.98] cursor-pointer"
        >
          <Plus className="size-3" />
          <span>Add</span>
        </button>

        {/* Stagger Speed Segmented Control */}
        <div className="flex items-center gap-0.5 bg-neutral-950 p-0.5 rounded-md border border-neutral-800/80">
          <span className="text-[10px] text-neutral-500 px-1 font-mono">Delay:</span>
          {[0.08, 0.15, 0.35].map((speed) => (
            <button
              key={speed}
              type="button"
              title={`Set staggerChildren interval to ${speed}s`}
              onClick={() => {
                setStaggerSpeed(speed);
                setFeedKey((k) => k + 1);
              }}
              className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                staggerSpeed === speed
                  ? "bg-neutral-800 text-neutral-100 font-semibold"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {speed}s
            </button>
          ))}
        </div>

        <button
          type="button"
          title="Re-trigger staggered cascade across all messages"
          onClick={retriggerCascade}
          className="flex items-center gap-1 px-2 py-1 rounded-md bg-neutral-800 hover:bg-neutral-750 text-neutral-300 text-xs transition-colors cursor-pointer"
        >
          <RefreshCw className="size-3 text-neutral-400" />
          <span>Replay</span>
        </button>
      </div>

      {/* The Animated Notification Feed */}
      <div className="w-full min-h-[200px] flex flex-col items-center justify-center">
        <motion.div
          key={`${feedKey}-${staggerSpeed}`}
          variants={activeFeedVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-1.5 w-full"
        >
          {messages.map((text, idx) => (
            <motion.div
              key={`${idx}-${text}`}
              variants={activeItemVariants}
              whileHover={{ x: -2 }}
              className="flex items-center gap-2.5 p-2.5 rounded-md bg-neutral-900 border border-neutral-800/90 text-neutral-200 transition-colors"
            >
              <Bell className="size-3.5 text-neutral-400 shrink-0" />
              <div className="flex-1 flex items-center justify-between gap-2">
                <span className="text-xs font-normal">{text}</span>
                <span className="text-[10px] text-neutral-500 font-mono shrink-0">
                  +{idx === 0 ? "0" : (idx * staggerSpeed).toFixed(2)}s
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <p className="text-[11px] text-neutral-500 text-center font-mono">
        staggerChildren: {staggerSpeed}s
      </p>
    </div>
  );
};

/**
 * Day 3: Keyframe Playground (Wiggle Box & Timed Scale Button)
 */
export const KeyframePlaygroundDemo = () => {
  const [scaleKey, setScaleKey] = useState(0);

  return (
    <div className="flex flex-col items-center gap-8 p-6 max-w-sm text-center">
      <div className="flex flex-col items-center gap-2">
        <span className="text-[11px] font-mono text-neutral-500">
          Hover box to wiggle
        </span>
        <div className="p-2 flex items-center justify-center">
          <WiggleBox />
        </div>
      </div>

      <div className="h-px w-36 bg-neutral-800" />

      <div className="flex flex-col items-center gap-2">
        <span className="text-[11px] font-mono text-neutral-500">
          Percentage timed keyframe scale
        </span>
        <div key={scaleKey} className="flex items-center gap-2">
          <ScaleButton />
          <button
            type="button"
            title="Replay keyframe scale animation"
            onClick={() => setScaleKey((k) => k + 1)}
            className="p-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 border border-neutral-800 transition-colors cursor-pointer"
          >
            <RefreshCw className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Day 4: Login Form with Understated Hint
 */
export const LoginFormDemo = () => {
  return (
    <div className="flex flex-col items-center gap-3 p-4">
      <p className="text-xs font-mono text-neutral-400 text-center max-w-xs m-0">
        Enter any password other than <span className="text-neutral-200 font-semibold">"sumi"</span> to trigger imperative error shake.
      </p>
      <LoginForm />
    </div>
  );
};

/**
 * Day 5: Enhanced SimpleExit with interactive toggle affordance
 */
export const SimpleExitDemo = () => {
  const [show, setShow] = useState(true);

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <button
        type="button"
        title={show ? "Unmount element with exit animation" : "Mount element with entrance animation"}
        onClick={() => setShow((s) => !s)}
        className="px-3 py-1.5 text-xs font-medium rounded-md bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 transition-colors active:scale-[0.98] cursor-pointer"
      >
        {show ? "Trigger Exit Animation" : "Mount Element Again"}
      </button>

      <p className="text-[11px] text-neutral-500 text-center font-mono max-w-xs">
        {show ? "Click button or box to trigger unmount exit." : "Element unmounted after exit animation finished."}
      </p>

      <div className="h-28 flex items-center justify-center">
        <AnimatePresence>
          {show && <KillSquare onClick={() => setShow(false)} />}
        </AnimatePresence>
      </div>
    </div>
  );
};
