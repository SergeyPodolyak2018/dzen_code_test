import { ChangeEvent } from 'react';

import styles from './commentsHeader.module.scss';

import Pagination from '@mui/material/Pagination';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TFilter, TMain } from '../../definitions/main';

export function CommentHeader(props: {
  changeFilter: (data: TFilter) => void;
  filter: TMain['mainComments']['filter'];
}) {
  const handleChange = (event: SelectChangeEvent) => {
    props.changeFilter({ orderBy: event.target.value as TFilter['orderBy'] });
  };
  const handleChangeDirection = (event: SelectChangeEvent) => {
    props.changeFilter({
      orderDirection: event.target.value as TFilter['orderDirection'],
    });
  };
  //@ts-ignore
  const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
    props.changeFilter({
      page: page - 1,
    });
  };

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.sortWrapper}`}>
        <div>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Sort by</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={props.filter.orderBy}
              label='Sort by'
              onChange={handleChange}
            >
              <MenuItem value={'created_time'}>Date</MenuItem>
              <MenuItem value={'user_name'}>Name</MenuItem>
              <MenuItem value={'user_email'}>Email</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl fullWidth>
            <InputLabel id='direction-simple-select-label'>
              Sort type
            </InputLabel>
            <Select
              labelId='direction-simple-select-label'
              id='direction-simple-select'
              value={props.filter.orderDirection}
              label='Sort type'
              onChange={handleChangeDirection}
            >
              <MenuItem value={'ASC'}>ASC</MenuItem>
              <MenuItem value={'DESC'}>DESC</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <Pagination
        count={Math.trunc(props.filter.total / props.filter.limit)}
        variant='outlined'
        shape='rounded'
        onChange={handleChangePage}
        page={props.filter.page + 1}
      />
    </div>
  );
}
