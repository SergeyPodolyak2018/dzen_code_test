import { useEffect, useState } from 'react';

import styles from './commentCard.module.scss';

import parse from 'html-react-parser';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import { TComment } from '../../definitions/main';
import { CommentList } from '../commentsList/commentList';
import restApi from '../../api/rest';
import CommentDialog from '../addCommentForm';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 24,
      height: 24,
    },
    children: `${name.split(' ')[0][0]}`,
  };
}

export function CommentCard(props: { data: TComment }) {
  const [showComments, setShowComments] = useState(false);
  const [subComments, setSubcomments] = useState<TComment[]>([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const submit = (form: FormData) => {
    if (props.data?.id) {
      form.append('article_id', '' + props.data.article_id);
      form.append('comment_id', '' + props.data.id);
      setOpen(false);
      restApi.postComment(form).then(() => {
        getComments();
      });
    }
  };

  useEffect(() => {
    if (showComments) {
      getComments();
    }
  }, [showComments]);

  const getComments = () => {
    restApi
      .getComments({
        article_id: props.data.article_id,
        comment_id: props.data.id,
      })
      .then((resp) => {
        setSubcomments(resp.data);
      });
  };
  return (
    <div className={`${styles.wrapper}`}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <Avatar {...stringAvatar(props.data.user_name)} />
          <div className={styles.userinfo}>{props.data.user_name}</div>
          <div className={styles.userinfo}>{props.data.user_email}</div>
          <div className={styles.userinfo}>{props.data.created_time}</div>
        </div>
      </div>
      <div className={styles.body}>{parse(props.data.text)}</div>
      {props.data.file_path && (
        <div className={styles.attached}>
          <Button
            variant='contained'
            component='label'
            color='secondary'
          >
            <a
              href={props.data.file_path}
              target='_blank'
              download
            >
              Download file
            </a>
          </Button>
        </div>
      )}
      <div className={styles.footer}>
        <button onClick={() => setShowComments(!showComments)}>
          {showComments ? 'Hide comments' : 'Show comments'}
        </button>
        <button onClick={handleClickOpen}>Add comments</button>
      </div>
      <CommentDialog
        open={open}
        close={handleClose}
        submit={submit}
      />
      {showComments && <CommentList data={subComments} />}
    </div>
  );
}
