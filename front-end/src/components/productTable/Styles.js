import grey from '@material-ui/core/colors/grey';

const color = grey[100];

const styles = theme => ({
  paper: {
    justifyContent: 'center',
    textAlign: 'left',
    margin: '1vmin',
    height: '285px',
    width: '255px',
    color: theme.palette.text.secondary,
    padding: '15px',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  image: {
    height: '245px',
    width: '255px'
  },
  expansion: {
    backgroundColor: color
  },
  textField: {
    width: '10vmin;'
  },
  filterDiv: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    textAlign: 'center'
  },
  inputs: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: '12px'
  }
});

export default styles;
