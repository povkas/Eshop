import grey from '@material-ui/core/colors/grey';

const color = grey[100];

const styles = theme => ({
  paper: {
    justifyContent: 'center',
    textAlign: 'left',
    margin: '1vmin',
    height: '300px',
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
    backgroundColor: color,
    width: 'inherit'
  },
  textField: {
    width: '100px',
    margin: '12px'
  },
  filterDiv: {
    justifyContent: 'space-evenly',
    alignItems: 'top',
    textAlign: 'center',
    height: '140px'
  },
  inputs: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: '12px',
    width: '250px'
  },
  emptyMessage: {
    margin: '50px'
  },
  sortDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '12px',
    alignItems: 'center'
  },
  sortText: {
    marginRight: '12px'
  }
});

export default styles;
