import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

export default function App() {
  const [screen, setScreen] = useState(1);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('19:00');
  const [selectedVibe, setSelectedVibe] = useState(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [roses, setRoses] = useState([]);

  const clickSound = new Audio('/public/click.mp3');
  const loveSong = new Audio('/public/love-song.mp3');
  loveSong.loop = true;

  // Generate falling roses
  useEffect(() => {
    const roseInterval = setInterval(() => {
      const newRose = {
        id: Math.random(),
        left: Math.random() * 100,
        duration: 8 + Math.random() * 3,
      };
      setRoses((prev) => [...prev, newRose]);

      setTimeout(() => {
        setRoses((prev) => prev.filter((r) => r.id !== newRose.id));
      }, newRose.duration * 1000);
    }, 2500);

    return () => clearInterval(roseInterval);
  }, []);

  const playClick = () => {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
  };

  const startMusic = () => {
    if (!musicPlaying) {
      loveSong.play().catch(() => {});
      setMusicPlaying(true);
    }
  };

  const handleYes = () => {
    playClick();
    startMusic();
    setTimeout(() => setScreen(2), 300);
  };

  const handleNoHover = () => {
    const randomX = (Math.random() - 0.5) * 300;
    const randomY = (Math.random() - 0.5) * 200;
    setNoButtonPos({ x: randomX, y: randomY });
  };

  const handleNext = () => {
    playClick();
    setTimeout(() => setScreen(3), 300);
  };

  const isFormComplete = selectedDate && selectedTime && selectedVibe;

  const handleConfirm = () => {
    if (!isFormComplete) return;
    playClick();

    const date = new Date(selectedDate);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    const [hours, minutes] = selectedTime.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    const formattedTime = `${displayHour}:${minutes} ${period}`;

    localStorage.setItem('dateInfo', JSON.stringify({
      date: formattedDate,
      time: formattedTime,
      vibe: selectedVibe,
    }));

    setTimeout(() => setScreen(4), 300);
  };

  // Get stored date info
  const dateInfo = localStorage.getItem('dateInfo') ? JSON.parse(localStorage.getItem('dateInfo')) : null;

  // Set min date to today
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="app">
      {/* Falling Roses */}
      <div className="rose-container">
        <AnimatePresence>
          {roses.map((rose) => (
            <motion.div
              key={rose.id}
              className="rose"
              style={{ left: `${rose.left}%` }}
              initial={{ y: -50, opacity: 0.7, rotate: 0 }}
              animate={{ y: window.innerHeight + 50, opacity: 0, rotate: 360 }}
              transition={{ duration: rose.duration, ease: 'linear' }}
            >
              🌹
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {/* Screen 1: The Question */}
        {screen === 1 && (
          <motion.div
            key="screen1"
            className="screen"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
          >
            <div className="screen-content">
              <motion.div className="gif-wrapper" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}>
                <img src="/public/cat.gif" alt="Cute cat" />
              </motion.div>

              <div className="text-section">
                <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  Damilola...
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  Will you be my girlfriend?
                </motion.p>
              </div>

              <div className="button-group">
                <motion.button
                  className="btn btn-yes"
                  onClick={handleYes}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Yes 💕
                </motion.button>

                <motion.div
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <button
                    className="btn btn-no"
                    onMouseEnter={handleNoHover}
                    onTouchStart={handleNoHover}
                    onMouseLeave={() => setNoButtonPos({ x: 0, y: 0 })}
                  >
                    No 😭
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Screen 2: Celebration */}
        {screen === 2 && (
          <motion.div
            key="screen2"
            className="screen"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            <div className="screen-content">
              <motion.div className="gif-wrapper" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 100 }}>
                <img src="/public/spongebob.gif" alt="SpongeBob celebrating" />
              </motion.div>

              <div className="text-section">
                <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  Wait... you actually said yes?? 😭
                </motion.h2>
                <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  I was so ready for you to say no 😭😭
                </motion.p>
              </div>

              <motion.button
                className="btn btn-primary"
                onClick={handleNext}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Okay Okay! ✨
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Screen 3: Date Planning */}
        {screen === 3 && (
          <motion.div
            key="screen3"
            className="screen"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
          >
            <div className="screen-content form-content">
              <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                So... when are you free?
              </motion.h2>

              <motion.div className="form-group" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <label>Pick a date:</label>
                <input type="date" min={today} value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="form-input" />
              </motion.div>

              <motion.div className="form-group" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <label>Pick a time:</label>
                <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} className="form-input" />
              </motion.div>

              <motion.div className="form-group" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <label>What's the vibe?</label>
                <div className="vibe-grid">
                  {['Mocktails 🍹', 'Ice cream date 🍦', 'Pizza + gist 🍕', 'Shawarma run 🌯', 'Cinema vibes 🍿', 'Anything you want, princess 💕'].map((vibe) => (
                    <motion.button
                      key={vibe}
                      className={`vibe-btn ${selectedVibe === vibe ? 'selected' : ''}`}
                      onClick={() => setSelectedVibe(vibe)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {vibe}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.button
                className={`btn btn-primary ${!isFormComplete ? 'disabled' : ''}`}
                onClick={handleConfirm}
                disabled={!isFormComplete}
                whileHover={isFormComplete ? { scale: 1.05 } : {}}
                whileTap={isFormComplete ? { scale: 0.95 } : {}}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                This one 😌
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Screen 4: Confirmation */}
        {screen === 4 && dateInfo && (
          <motion.div
            key="screen4"
            className="screen"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
          >
            <div className="screen-content">
              <motion.div className="gif-wrapper" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}>
                <img src="/public/shrek.gif" alt="Shrek" />
              </motion.div>

              <div className="text-section">
                <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                  Glad you didn't say no 😏
                </motion.h2>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  Be ready by {dateInfo.time}, I'm coming to get you 🏎️
                </motion.p>
              </div>

              <motion.div className="ticket" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 100, delay: 0.6 }}>
                <div className="ticket-header">✨ Our Date ✨</div>
                <div className="ticket-item">
                  <span className="ticket-label">📅 Date</span>
                  <span className="ticket-value">{dateInfo.date}</span>
                </div>
                <div className="ticket-divider"></div>
                <div className="ticket-item">
                  <span className="ticket-label">🕐 Time</span>
                  <span className="ticket-value">{dateInfo.time}</span>
                </div>
                <div className="ticket-divider"></div>
                <div className="ticket-item">
                  <span className="ticket-label">💫 Vibe</span>
                  <span className="ticket-value">{dateInfo.vibe}</span>
                </div>
              </motion.div>

              <motion.p className="ps-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                P.S. Normal people text. I made a website for you instead of gaming my ass off 😭💕
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
            }

