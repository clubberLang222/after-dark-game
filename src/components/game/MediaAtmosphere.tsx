import { useEffect, useRef, useState } from 'react';
import { getEngine } from '../../engine/GameEngine';
import { mergeMediaLibrary } from '../../content/builtinMedia';

export function MediaAtmosphere() {
  const [bg, setBg] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    try {
      const engine = getEngine();
      engine.loadSettings();
      const settings = engine.getSettings();
      const media = mergeMediaLibrary(settings.media);

      let backgroundSrc: string | null = null;
      if (media.selectedSlideshowId) {
        const show = media.slideshows.find(
          (s) => s.id === media.selectedSlideshowId && s.active
        );
        if (show?.slideIds?.length) {
          const first = media.backgrounds.find(
            (b) => b.id === show.slideIds![0] && b.active
          );
          backgroundSrc = first?.src ?? null;
          let idx = 0;
          const duration = (show.slideDuration ?? 8) * 1000;
          timer = setInterval(() => {
            idx = (idx + 1) % show.slideIds!.length;
            const slide = media.backgrounds.find(
              (b) => b.id === show.slideIds![idx] && b.active
            );
            if (slide) setBg(slide.src);
          }, duration);
        }
      }
      if (!backgroundSrc && media.selectedBackgroundId) {
        const asset = media.backgrounds.find(
          (b) => b.id === media.selectedBackgroundId && b.active
        );
        backgroundSrc = asset?.src ?? null;
      }
      setBg(backgroundSrc);

      if (settings.musicEnabled && media.selectedMusicId) {
        const track = media.music.find(
          (m) => m.id === media.selectedMusicId && m.active && m.src
        );
        if (track?.src) {
          const audio = new Audio(track.src);
          audio.loop = track.loop !== false;
          audio.volume = track.volume ?? 0.35;
          void audio.play().catch(() => {});
          audioRef.current = audio;
        }
      }
    } catch {
      /* ignore */
    }

    return () => {
      if (timer) clearInterval(timer);
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!bg) return;
    const isGradient = bg.includes('gradient') || bg.startsWith('#');
    const prev = document.body.style.background;
    if (isGradient) {
      document.body.style.background = bg;
      document.body.style.backgroundImage = '';
    } else {
      document.body.style.background = '#0a0e14';
      document.body.style.backgroundImage = `url(${bg})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundAttachment = 'fixed';
    }
    return () => {
      document.body.style.background = prev;
      document.body.style.backgroundImage = '';
    };
  }, [bg]);

  return null;
}

export { playSoundCue } from '../../utils/audio';
