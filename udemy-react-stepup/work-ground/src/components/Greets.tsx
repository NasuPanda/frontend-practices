import React from 'react';

type Props = { name: string; times: number; children: React.ReactNode };

const Greets: React.FunctionComponent<Props> = (props) => {
  const { name, times = 1, children } = props;
  // ..Array(number) は必ず [number] を返すが、エラーが出るので無視する
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const range = [...Array(times)];

  return (
    <>
      {range.map(() => (
        <p>
          Hello, {name}! {children}
        </p>
      ))}
    </>
  );
};

export default Greets;
