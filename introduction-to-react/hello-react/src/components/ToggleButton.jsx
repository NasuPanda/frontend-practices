import React, {useState} from 'react';

const ToggleButton = () => {
  const [open, setOpen] = useState(false)

  const toggle = () => {
    setOpen(prevState => !prevState)
  }

  return (
    <button onClick={toggle}>
      {open ? 'open' : 'close'}
    </button>
  );
};

export default ToggleButton;
