import { VFC, memo } from 'react';

type Props = {
  isVisible: boolean;
  onClickClose: VoidFunction;
};

const style = {
  width: '100%',
  height: '200px',
  backgroundColor: 'blue',
};

const ChildArea: VFC<Props> = memo(({ isVisible, onClickClose }) => {
  console.log('Rendering');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const tempManyData = [...Array(2000).keys()];
  tempManyData.forEach((_) => {
    console.log('...');
  });

  return (
    <>
      {isVisible ? (
        <div style={style}>
          <p>子コンポーネント</p>
          <button type="button" onClick={onClickClose}>
            閉じる
          </button>
        </div>
      ) : null}
    </>
  );
});

export default ChildArea;
