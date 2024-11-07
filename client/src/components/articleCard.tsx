import * as React from 'react';
import { TArticle } from '../definitions/main';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CommentDialog from './addCommentForm';

const card = (data: TArticle, action: () => void) => (
  <React.Fragment>
    <CardContent>
      <Typography
        gutterBottom
        variant='h5'
        component='div'
      >
        {data.title}
      </Typography>
      <Typography
        variant='body2'
        sx={{ color: 'text.secondary' }}
      >
        {data.content}
      </Typography>
    </CardContent>
    <CardActions>
      <Button
        onClick={action}
        size='small'
      >
        Add comment
      </Button>
    </CardActions>
  </React.Fragment>
);
export default function ArticleCard(props: {
  data: TArticle | null;
  action: () => void;
  submitComment: (form: FormData) => void;
  children?: string | JSX.Element | JSX.Element[];
}) {
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const submit = (form: FormData) => {
    if (props.data?.id) {
      form.append('article_id', '' + props.data.id);
      form.append('comment_id', '0');
      setOpen(false);
      props.submitComment(form);
    }
  };

  React.useEffect(() => {
    if (!props.data) {
      props.action();
    }
  }, []);
  React.useEffect(() => {
    if (props.data) {
      setLoading(false);
    }
  }, [props.data]);

  return (
    <Box sx={{ minWidth: 275 }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Card variant='outlined'>{card(props?.data!, handleClickOpen)}</Card>
          {props.children}
        </>
      )}
      <CommentDialog
        open={open}
        close={handleClose}
        submit={submit}
      />
    </Box>
  );
}
