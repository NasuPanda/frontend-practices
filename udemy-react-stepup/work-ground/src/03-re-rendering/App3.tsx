import React, { VFC, useState, useCallback } from 'react';
import ChildArea from './ChildArea';

const App: VFC = () => {
  const [text, setText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
    console.log(text);
  };
  const onClickOpen = (): void => {
    setIsVisible(true);
  };
  const onClickClose = useCallback((): void => {
    setIsVisible(false);
  }, [setIsVisible]);

  return (
    <div className="Counter">
      <h1>Test Counter</h1>

      <input type="text" value={text} onChange={onChangeText} />
      <br />
      <button type="button" onClick={onClickOpen}>
        表示
      </button>
      <ChildArea isVisible={isVisible} onClickClose={onClickClose} />
    </div>
  );
};

export default App;
