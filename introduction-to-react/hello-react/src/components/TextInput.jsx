import React, {useState} from 'react';

const TextInput = () => {
  const [name, setName] = useState('')

  // eventを受け取りnameのステートを更新する
  const handleName = (event) => {
    console.log(name)
    setName(event.target.value)
  }

  return (
    <input
      onChange={(event) => handleName(event)}
      type={'text'}
      value={name}
    />
  )
}

export default TextInput
