import { TArticleShort } from '../definitions/main';
import ArticlePrevueCard from './articlePrevueCard';

export default function ArticlesList(props: {
  data: TArticleShort[];
  action: (id: number) => void;
}) {
  return (
    <>
      {props.data.map((el) => (
        <ArticlePrevueCard
          key={el.id}
          data={el}
          action={() => props.action(el.id)}
        />
      ))}
    </>
  );
}
