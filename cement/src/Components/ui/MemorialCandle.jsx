import './MemorialCandle.css';

export default function MemorialCandle() {
  return (
    <span className="memorial-candle" role="img" aria-label="A candle burning in remembrance">
      <span className="memorial-candle__halo" aria-hidden="true" />
      <span className="memorial-candle__flame" aria-hidden="true"><span /></span>
      <span className="memorial-candle__wick" aria-hidden="true" />
      <span className="memorial-candle__wax" aria-hidden="true" />
      <span className="memorial-candle__base" aria-hidden="true" />
    </span>
  );
}
