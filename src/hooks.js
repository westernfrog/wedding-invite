import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Controls the video invite: tap -> iris opens -> video plays (no controls)
 * -> iris closes back to the invitation when the video is about to end.
 */
export function useStory() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const barRef = useRef(null);
  const playingRef = useRef(false);
  const timers = useRef([]);

  const end = useCallback(() => {
    if (!playingRef.current) return;
    playingRef.current = false;
    setPlaying(false);
    timers.current.push(
      setTimeout(() => {
        const v = videoRef.current;
        if (v) v.pause();
        if (barRef.current) barRef.current.style.transform = 'scaleX(0)';
      }, 1800)
    );
  }, []);

  const start = useCallback(() => {
    const v = videoRef.current;
    if (!v || playingRef.current) return;
    playingRef.current = true;
    try {
      v.muted = false;
      v.volume = 1;
      v.currentTime = 0;
    } catch (_) {}
    setPlaying(true);
    // Unlock playback inside the tap, then start for real once the video band has revealed.
    const unlock = v.play();
    if (unlock && unlock.catch) unlock.catch(() => {});
    v.pause();
    timers.current.push(
      setTimeout(() => {
        if (!playingRef.current) return;
        try {
          v.currentTime = 0;
        } catch (_) {}
        const p = v.play();
        if (p && p.catch) {
          p.catch(() => {
            // Sound blocked by the browser: fall back to muted playback.
            v.muted = true;
            const p2 = v.play();
            if (p2 && p2.catch) p2.catch(end);
          });
        }
      }, 950)
    );
  }, [end]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return undefined;
    const onTime = () => {
      const d = v.duration;
      if (!d || !playingRef.current) return;
      if (barRef.current) barRef.current.style.transform = `scaleX(${Math.min(1, v.currentTime / d)})`;
      const rem = d - v.currentTime;
      if (rem < 1) {
        try {
          v.volume = Math.max(0, rem);
        } catch (_) {}
      }
      if (rem < 1.2) end();
    };
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('ended', end);
    v.addEventListener('error', end);
    const list = timers.current;
    return () => {
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('ended', end);
      v.removeEventListener('error', end);
      list.forEach(clearTimeout);
    };
  }, [end]);

  // Start buffering the video only once the invitation itself has loaded, so it never competes with first paint.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return undefined;
    let timer;
    const warm = () => {
      timer = setTimeout(() => {
        if (playingRef.current || v.readyState > 0) return;
        v.preload = navigator.connection && navigator.connection.saveData ? 'metadata' : 'auto';
        v.load();
      }, 1200);
    };
    if (document.readyState === 'complete') warm();
    else window.addEventListener('load', warm, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', warm);
    };
  }, []);

  return { playing, start, videoRef, barRef };
}
