import styles from './header.module.scss';
import Avatar from '@mui/material/Avatar';

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

export function Header(props: {
  activeArticle: number;
  action: () => void;
  userName: string;
}) {
  return (
    <div className={`${styles.wrapper}`}>
      {props.activeArticle !== -1 && (
        <button onClick={props.action}>Return to list</button>
      )}
      <div style={{ marginLeft: 'auto' }}>
        <Avatar {...stringAvatar(props.userName || 'temp')} />
      </div>
    </div>
  );
}
