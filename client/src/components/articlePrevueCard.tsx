import * as React from 'react';
import { TArticleShort } from '../definitions/main';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const card = (title: string, action: () => void) => (
  <React.Fragment>
    <CardContent>
      <Typography
        gutterBottom
        sx={{ color: 'text.secondary', fontSize: 14 }}
      >
        {title}
      </Typography>
    </CardContent>
    <CardActions>
      <Button
        onClick={action}
        size='small'
      >
        Learn More
      </Button>
    </CardActions>
  </React.Fragment>
);
export default function ArticlePrevueCard(props: {
  data: TArticleShort;
  action: () => void;
}) {
  return (
    <Box sx={{ minWidth: 275, marginTop: '10px' }}>
      <Card variant='outlined'>{card(props.data.title, props.action)}</Card>
    </Box>
  );
}
