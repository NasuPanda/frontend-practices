import { useLocation } from 'react-router-dom';

const Page1DetailA: React.FC = () => {
  const { state } = useLocation();

  return (
    <div>
      <h2>Page1 Detail A</h2>
      {state ? <p>state is {state}</p> : <p>state is undefined</p>}
    </div>
  );
};

export default Page1DetailA;
