import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, CalendarDays, Clock, Sparkles, Car, Gamepad2 } from "lucide-react";

const choices = [
  "Mocktails 🍹",
  "Ice cream date 🍦",
  "Pizza + gist 🍕",
  "Shawarma run 🌯",
  "Cinema vibes 🍿",
  "Anything you want, princess 💕",
];

function FallingRoses() {
  const roses = useMemo(
    () =>
      Array.from({ length: 32 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 7 + Math.random() * 8,
        size: 18 + Math.random() * 18,
        drift: -35 + Math.random() * 70,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {roses.map((rose) => (
        <motion.div
          key={rose.id}
          className="absolute top-[-60px] select-none"
          style={{ left: `${rose.left}%`, fontSize: rose.size }}
          initial={{ y: -80, x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: "110vh",
            x: rose.drift,
            rotate: 360,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: rose.duration,
            delay: rose.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          🌹
        </motion.div>
      ))}
    </div>
  );
}

function DancingMeme() {
  return (
    <motion.div
      className="mx-auto mt-5 flex h-28 w-28 items-center justify-center rounded-[2rem] border border-white/40 bg-white/30 text-6xl shadow-2xl backdrop-blur"
      animate={{
        x: [-12, 12, -8, 8, 0],
        y: [0, -12, 6, -8, 0],
        rotate: [-8, 9, -6, 7, 0],
        backgroundColor: ["#fff1f2", "#fef3c7", "#dcfce7", "#dbeafe", "#fce7f3"],
      }}
      transition={{ duration: 2.1, repeat: Infinity }}
    >
      <img src="/public/spongebob.gif" alt="SpongeBob" className="h-20 w-20 object-cover rounded-2xl" />
    </motion.div>
  );
}

function StepCard({ children }) {
  return (
    <motion.div
      initial={{ scale: 0.94, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.94, opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 130, damping: 16 }}
      className="relative z-10 w-full max-w-xl rounded-[2rem] border border-white/50 bg-white/75 p-6 shadow-2xl backdrop-blur-md sm:p-8"
    >
      {children}
    </motion.div>
  );
}

export default function DamilolaDateAskSite() {
  const [step, setStep] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [feeling, setFeeling] = useState(choices[0]);

  const moveNo = () => {
    setNoPosition({
      x: Math.floor(Math.random() * 220 - 110),
      y: Math.floor(Math.random() * 160 - 80),
    });
  };

  return (
    const clickSound = new Audio("/public/click.mp3");

  const playClick = () => {
    clickSound.currentTime = 0;
    clickSound.play();
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-100 via-pink-100 to-amber-100 px-4 py-8 text-slate-900">
      <FallingRoses />

      <div className="absolute left-8 top-8 h-28 w-28 rounded-full bg-pink-300/40 blur-3xl" />
      <div className="absolute bottom-12 right-8 h-36 w-36 rounded-full bg-amber-300/40 blur-3xl" />

      <audio autoPlay loop>
        <source src="/public/love-song.mp3" type="audio/mp3" />
      </audio>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col items-center justify-center text-center">
        <motion.div
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/60 px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles size={16} /> For Damilola only 🐱💕
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <StepCard key="ask">
              <img src="/gifs/cat.gif" alt="cat" className="mx-auto h-28 w-28 rounded-[2rem] object-cover shadow-xl" />
              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                Damilola...
              </h1>
              <p className="mt-4 text-2xl font-bold text-pink-700">
                Will you go on a date with me?
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Choose wisely. The website is watching 😭
              </p>

              <div className="relative mt-8 flex min-h-28 items-center justify-center gap-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.06 }}
                  onClick={() => {
                    playClick();
                    setStep(1);
                  }}
                  className="rounded-full bg-pink-600 px-8 py-4 text-lg font-black text-white shadow-xl shadow-pink-300 transition hover:bg-pink-700"
                >
                  Yes 💕
                </motion.button>

                <motion.button
                  animate={{ x: noPosition.x, y: noPosition.y }}
                  onMouseEnter={moveNo}
                  onMouseMove={moveNo}
                  onFocus={moveNo}
                  onClick={moveNo}
                  className="rounded-full bg-slate-900 px-8 py-4 text-lg font-black text-white shadow-xl"
                >
                  No 😭
                </motion.button>
              </div>
            </StepCard>
          )}

          {step === 1 && (
            <StepCard key="surprise">
              <div className="text-7xl">😭</div>
              <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                Wait... you actually said yes??
              </h2>
              <p className="mt-4 text-lg font-semibold text-slate-700">
                I was so ready for you to say no 😭😭
              </p>
              <DancingMeme />
              <button
                onClick={() => setStep(2)}
                className="mt-8 rounded-full bg-slate-900 px-8 py-4 text-lg font-black text-white shadow-xl transition hover:scale-105"
              >
                Okay Okay! ✨
              </button>
            </StepCard>
          )}

          {step === 2 && (
            <StepCard key="schedule">
              <div className="text-6xl">💕</div>
              <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                So... when are you free?
              </h2>
              <p className="mt-3 text-slate-600">
                Pick a date and time so I can start acting normal again 😹
              </p>

              <div className="mt-7 grid gap-4 text-left sm:grid-cols-2">
                <label className="rounded-3xl bg-white/70 p-4 shadow-inner">
                  <span className="mb-2 flex items-center gap-2 font-bold text-pink-700">
                    <CalendarDays size={18} /> Select date
                  </span>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 outline-none focus:ring-4 focus:ring-pink-200"
                  />
                </label>

                <label className="rounded-3xl bg-white/70 p-4 shadow-inner">
                  <span className="mb-2 flex items-center gap-2 font-bold text-pink-700">
                    <Clock size={18} /> What time?
                  </span>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 outline-none focus:ring-4 focus:ring-pink-200"
                  />
                </label>
              </div>

              <button
                onClick={() => setStep(3)}
                disabled={!date || !time}
                className="mt-7 rounded-full bg-pink-600 px-8 py-4 text-lg font-black text-white shadow-xl shadow-pink-300 transition hover:scale-105 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
              >
                Set the date! 💌
              </button>
            </StepCard>
          )}

          {step === 3 && (
            <StepCard key="feeling">
              <div className="text-6xl">🍹</div>
              <h2 className="mt-4 text-3xl font-black sm:text-4xl">
                What are we feeling?
              </h2>
              <p className="mt-3 text-slate-600">
                Choose the vibe. I’ll pretend I had it planned all along 💀
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {choices.map((choice) => (
                  <button
                    key={choice}
                    onClick={() => setFeeling(choice)}
                    className={`rounded-3xl border px-4 py-4 text-left font-bold shadow-sm transition hover:scale-[1.02] ${
                      feeling === choice
                        ? "border-pink-500 bg-pink-100 text-pink-800"
                        : "border-white bg-white/70 text-slate-700"
                    }`}
                  >
                    {choice}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(4)}
                className="mt-7 rounded-full bg-slate-900 px-8 py-4 text-lg font-black text-white shadow-xl transition hover:scale-105"
              >
                This one 😌
              </button>
            </StepCard>
          )}

          {step === 4 && (
            <StepCard key="final">
              <motion.div
                className="text-7xl"
                animate={{ scale: [1, 1.18, 1], rotate: [0, -6, 6, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                😏
              </motion.div>

              <h2 className="mt-4 text-3xl font-black text-pink-700 sm:text-4xl">
                Glad you didn’t say no.
              </h2>

              <p className="mt-5 text-xl font-bold leading-relaxed">
                Be ready by {time || "6:00"}, I’m coming to get you <Car className="inline" />
              </p>

              <img src="/public/shrek.gif" alt="Shrek" className="mx-auto mt-5 h-40 rounded-[2rem] object-cover shadow-2xl" />

              <div className="mt-6 rounded-3xl bg-white/70 p-5 text-left shadow-inner">
                <p className="font-bold text-slate-800">Date: {date || "our chosen day"}</p>
                <p className="font-bold text-slate-800">Time: {time || "6:00"}</p>
                <p className="font-bold text-slate-800">Vibe: {feeling}</p>
              </div>

              <p className="mt-6 rounded-3xl bg-slate-900 p-4 text-sm font-semibold text-white">
                P.S. Normal people text. I made a website for you instead of gaming my ass off! <Gamepad2 className="inline" size={16} /> 😭💕
              </p>
            </StepCard>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}

