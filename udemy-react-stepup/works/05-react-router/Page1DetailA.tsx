import { useLocation, useHistory } from 'react-router-dom';

const Page1DetailA: React.FC = () => {
  const { state } = useLocation();

  // 戻るボタンの実装
  const history = useHistory();
  const onClickBack = () => history.goBack();

  return (
    <div>
      <h2>Page1 Detail A</h2>
      {state ? <p>state is {state}</p> : <p>state is undefined</p>}

      {/* 戻るボタンの実装 */}
      <button onClick={onClickBack} type="button">
        戻る
      </button>
    </div>
  );
};

export default Page1DetailA;
