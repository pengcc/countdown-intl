import React, { useState, useEffect } from "react";

import "./Countdown.scss";

const Countdown = props => {
  const { from, to, timeSlots, title, isReset } = props;
  const initOffset = { d: 0, h: 0, m: 0, s: 0 };
  const [offset, setOffset] = useState(initOffset);

  const isTimeToReset = end =>
    new Date().getTime() - new Date(end).getTime() > 0;

  const getTimeDiffFrom = start => {
    let diffMs = new Date().getTime() - new Date(start).getTime();
    let diminution = 0;
    const [dayMs, hourMs, minuteMs, secondMs] = [
      1000 * 60 * 60 * 24,
      1000 * 60 * 60,
      1000 * 60,
      1000
    ];
    let d = Math.floor(diffMs / dayMs);
    diminution += d * dayMs;
    let h = Math.floor((diffMs - diminution) / hourMs);
    diminution += h * hourMs;
    let m = Math.floor((diffMs - diminution) / minuteMs);
    diminution += m * minuteMs;
    let s = Math.floor((diffMs - diminution) / secondMs);

    return { d, h, m, s };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let currentoffset = getTimeDiffFrom(from);
      if (isReset && isTimeToReset(to)) {
        currentoffset = initOffset;
      }
      setOffset(currentoffset);
    }, 1000);
    return () => clearInterval(interval);
  }, [from, to, initOffset, isReset]);

  return (
    <div className="timer-wrapper">
      <div className="timer-title">{title}</div>
      <div className="timer-board">
        {timeSlots.map(({ unit, text } = {}, idx) => {
          return (
            <div className="time-slot" key={idx}>
              <span className="time">{offset[unit]}</span>
              <span className="text">{text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Countdown;
