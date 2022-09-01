import { useParams, useLocation } from 'react-router-dom';
import { useMemo } from 'react';

const UrlParameter: React.FC = () => {
  const { id } = useParams();

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const queryKey = useMemo(() => 'name', []); // メモ化いらないけど一応

  return (
    <div>
      <h2>URL Parameter</h2>
      <p>パラメータは {id} です</p>
      <h2>Query Parameter</h2>
      <p>
        キー {queryKey} のクエリパラメータは {query.get(queryKey)} です
      </p>
    </div>
  );
};

export default UrlParameter;
