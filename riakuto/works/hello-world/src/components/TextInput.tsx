import { FC, SyntheticEvent, useEffect, useRef } from 'react';

type Props = {
  firstText: string;
};

const TextInput: FC<Props> = ({ firstText }) => {
  const inputRef = useRef<HTMLInputElement>();

  const handleClick = (e: SyntheticEvent): void => {
    e.preventDefault();
    console.log(inputRef);
    // console.log(inputRef.current.value);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <input type="text" defaultValue={firstText} />
      <button onClick={handleClick} type="button">
        Click!
      </button>
    </>
  );
};

export default TextInput;
