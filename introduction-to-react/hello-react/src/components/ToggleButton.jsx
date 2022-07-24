import React, {useState, useEffect} from 'react';

const ToggleButton = () => {
  const [open, setOpen] = useState(false)

  const toggle = () => {
    setOpen(prevState => !prevState)
  }

  useEffect(() => {
    console.log("current state is", open)

    if (open) {
      console.log("subscribe database!")
    }
    return () => {
      console.log("unsubscribe database!")
    }
  })

  return (
    <button onClick={toggle}>
      {open ? 'open' : 'close'}
    </button>
  );
};

export default ToggleButton;
