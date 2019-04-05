import grey from '@material-ui/core/colors/grey';

const color = grey[100];

const styles = theme => ({
  paper: {
    justifyContent: 'center',
    textAlign: 'left',
    margin: '1vmin',
    minHeight: '27vmin',
    color: theme.palette.text.secondary,
    padding: '15px',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  image: {
    height: '24.5vmin',
    width: '25.5vmin'
  },
  expansion: {
    backgroundColor: color
  }
});

export default styles;
