import React, {
  VFC,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import { Button, Card, Icon, Statistic } from 'semantic-ui-react';
import { getPrimes } from 'utils/math-tool';
import './Timer.css';

type TimerProps = {
  limit: number;
};

const Timer: VFC<TimerProps> = ({ limit }) => {
  const [timeLeft, setTimeLeft] = useState(limit);
  const primes = useMemo(() => getPrimes(limit), [limit]);
  const timerId = useRef<NodeJS.Timeout>();
  const reset = useCallback(() => setTimeLeft(limit), [limit]);
  const tick = () => setTimeLeft((t) => t - 1);

  // カウントダウンタスクのリセット・タイマーの初期化を行う
  useEffect(() => {
    const clearTimer = () => {
      if (timerId.current) clearInterval(timerId.current);
    };

    reset();
    clearTimer();
    timerId.current = setInterval(tick, 1000);

    return clearTimer;
  }, [limit, reset]);

  // 残り0になったら再スタート
  useEffect(() => {
    if (timeLeft === 0) reset();
  }, [timeLeft, reset]);

  return (
    <Card>
      <Statistic className="number-board">
        <Statistic.Label>time</Statistic.Label>
        <Statistic.Value
          className={primes.includes(timeLeft) ? 'prime-number' : undefined}
        >
          {timeLeft}
        </Statistic.Value>
      </Statistic>
      <Card.Content>
        <Button color="red" fluid onClick={reset}>
          <Icon name="redo" />
          Reset
        </Button>
      </Card.Content>
    </Card>
  );
};

export default Timer;
