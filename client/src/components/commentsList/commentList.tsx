import styles from './commentList.module.scss';

import { TComment } from '../../definitions/main';
import { CommentCard } from '../commentCard/commentCard';

export function CommentList(props: { data: TComment[] }) {
  return (
    <div className={`${styles.wrapper}`}>
      {props.data.map((el) => (
        <CommentCard
          key={el.id}
          data={el}
        />
      ))}
    </div>
  );
}
