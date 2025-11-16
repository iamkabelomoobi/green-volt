import * as Battery from "expo-battery";
import { useEffect, useRef, useState } from "react";

type BatteryHealth =
  | "good"
  | "overheat"
  | "dead"
  | "overvoltage"
  | "cold"
  | "unknown";

export function useBatteryStatusWithEstimate({
  sampleWindow = 5,
  minSecondsBetweenSamples = 5,
  pollWhileCharging = true,
  pollIntervalMs = 10000,
} = {}) {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [charging, setCharging] = useState<boolean | null>(null);
  const [batteryHealth] = useState<BatteryHealth>("good");

  const samplesRef = useRef<Array<{ t: number; level: number }>>([]);

  const [etaSeconds, setEtaSeconds] = useState<number | null>(null);
  const [estimatedTimeLeft, setEstimatedTimeLeft] = useState<string | null>(
    null
  );

  function formatSeconds(secs: number) {
    if (!isFinite(secs) || secs <= 0) return null;
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = Math.floor(secs % 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  }

  function pushSample(level: number, now = Date.now()) {
    const buf = samplesRef.current;
    if (
      buf.length > 0 &&
      now - buf[buf.length - 1].t < minSecondsBetweenSamples * 1000
    ) {
      buf[buf.length - 1] = { t: now, level };
    } else {
      buf.push({ t: now, level });
      if (buf.length > sampleWindow) buf.shift();
    }
    samplesRef.current = buf;
  }

  function computeRatePerSecond(): number | null {
    const buf = samplesRef.current;
    if (buf.length < 2) return null;

    const n = buf.length;
    let sumX = 0,
      sumY = 0,
      sumXY = 0,
      sumXX = 0;
    const t0 = buf[0].t / 1000;
    for (let i = 0; i < n; i++) {
      const x = buf[i].t / 1000 - t0;
      const y = buf[i].level;
      sumX += x;
      sumY += y;
      sumXY += x * y;
      sumXX += x * x;
    }
    const denom = n * sumXX - sumX * sumX;
    if (denom === 0) return null;
    const slope = (n * sumXY - sumX * sumY) / denom;
    if (!isFinite(slope)) return null;
    return slope;
  }

  useEffect(() => {
    if (batteryLevel === null || charging !== true) {
      setEtaSeconds(null);
      setEstimatedTimeLeft(null);
      return;
    }

    const rate = computeRatePerSecond();
    if (rate === null || rate <= 1e-6) {
      setEtaSeconds(null);
      setEstimatedTimeLeft("Calculating...");
      return;
    }

    const remainingLevel = 1 - batteryLevel;
    const secondsLeft = remainingLevel / rate;

    if (
      !isFinite(secondsLeft) ||
      secondsLeft < 0 ||
      secondsLeft > 60 * 60 * 24
    ) {
      setEtaSeconds(null);
      setEstimatedTimeLeft("Calculating...");
      return;
    }

    setEtaSeconds(secondsLeft);
    setEstimatedTimeLeft(formatSeconds(secondsLeft));
  }, [batteryLevel, charging, sampleWindow]);

  useEffect(() => {
    let mounted = true;
    let levelSub: { remove: () => void } | null = null;
    let stateSub: { remove: () => void } | null = null;
    let pollInterval: NodeJS.Timeout | null = null;

    async function init() {
      try {
        const lvl = await Battery.getBatteryLevelAsync();
        const st = await Battery.getBatteryStateAsync();

        if (!mounted) return;
        setBatteryLevel(lvl);
        setCharging(
          st === Battery.BatteryState.CHARGING ||
            st === Battery.BatteryState.FULL
        );
        pushSample(lvl, Date.now());
      } catch (err) {}

      try {
        stateSub = Battery.addBatteryStateListener(({ batteryState }) => {
          setCharging(
            batteryState === Battery.BatteryState.CHARGING ||
              batteryState === Battery.BatteryState.FULL
          );
        });

        levelSub = Battery.addBatteryLevelListener(({ batteryLevel }) => {
          setBatteryLevel(batteryLevel);
          pushSample(batteryLevel, Date.now());
        });
      } catch (e) {}
    }

    init();

    if (pollWhileCharging) {
      pollInterval = setInterval(async () => {
        try {
          const lvl = await Battery.getBatteryLevelAsync();
          if (charging) {
            pushSample(lvl, Date.now());
          } else {
            setBatteryLevel(lvl);
          }
        } catch (e) {
          // ignore
        }
      }, pollIntervalMs);
    }

    return () => {
      mounted = false;
      if (levelSub) levelSub.remove();
      if (stateSub) stateSub.remove();
      if (pollInterval) clearInterval(pollInterval);
    };
  }, []);

  useEffect(() => {
    if (batteryLevel === null) return;
    if (charging) {
      pushSample(batteryLevel, Date.now());
    } else {
      samplesRef.current = [];
      setEtaSeconds(null);
      setEstimatedTimeLeft(null);
    }
  }, [batteryLevel, charging]);

  return {
    batteryLevel,
    charging,
    batteryHealth,
    etaSeconds,
    estimatedTimeLeft,
  };
}

export function useBatteryStatus(
  options?: Parameters<typeof useBatteryStatusWithEstimate>[0]
) {
  return useBatteryStatusWithEstimate(options);
}
