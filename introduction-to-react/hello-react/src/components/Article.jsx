import { useState } from "react";
import {Content, Title, PublishButton} from "./index"

const Article = (props) => {
  const [isPublished, setIsPublished] = useState(false)
  const PublishArticle = () => {
    setIsPublished(true)
  }

  return (
    <div>
      <Title title={props.title}/>
      <Content content={props.content}/>
      <PublishButton isPublished={isPublished} onClick={PublishArticle} />
    </div>
  );
};

export default Article