import { useParams } from 'react-router-dom';

const UrlParameter: React.FC = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>URL Parameter</h2>
      <p>パラメータは {id} です</p>
    </div>
  );
};

export default UrlParameter;
