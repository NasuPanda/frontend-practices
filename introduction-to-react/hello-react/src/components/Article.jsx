import { useState } from "react";

const Article = (props) => {
  const [isPublished, setIsPublished] = useState(false)
  console.log(isPublished)

  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.content}</p>
      {/* onClickにcallbackを登録 */}
      <button onClick={() => setIsPublished(true)}>公開</button>
    </div>
  )
};

export default Article