import { Link, useHistory } from 'react-router-dom';

const Page1: React.FC = () => {
  const paths = {
    detailA: '/page1/detailA',
    detailB: '/page1/detailB',
  };
  // state により渡す
  const value = '渡したい値';

  const history = useHistory();
  const onClickDetailA = () => history.push(paths.detailA);

  return (
    <div>
      <h2>Page1</h2>
      {/* state により変数を渡す */}
      <Link to={{ pathname: paths.detailA, state: value }}>DetailA</Link>

      <br />

      <Link to={paths.detailB}>DetailB</Link>

      <br />

      {/* Link 以外の画面遷移 */}
      <button type="button" onClick={onClickDetailA}>
        Detail A from Button (not Link)
      </button>
    </div>
  );
};

export default Page1;
