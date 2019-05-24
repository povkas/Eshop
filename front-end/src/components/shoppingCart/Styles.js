import blue from '@material-ui/core/colors/blue';

const colorblue = blue[600];

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 42,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    border: '1px solid blue'
  },
  cartItem: {
    border: '1px solid black'
  },
  paper1: {
    position: 'absolute',
    width: theme.spacing.unit * 25,
    backgroundColor: 'inherit',
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 2,
    outline: 'none',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colorblue
  },
  oneRow: {
    flexDirection: 'row'
  },
  shoppingCart: {
    size: 'medium',
    color: 'primary'
  },
  alertDialog: {
    background: 'transparent'
  },
  button1: {
    borderRadius: '20px',
    float: 'right',
    width: 110,
    margnRight: '10px',
    variant: 'contained',
    background: '#5d7ee2',
    '&:hover': {
      cursor: 'pointer',
      background: '#3e6aef'
    },
    color: '#000000',
    size: 'small'
  },
  button2: {
    float: 'right',
    width: 100,
    margnRight: '10px',
    variant: 'contained',
    color: 'primary',
    size: 'small'
  },
  removeButton: {
    borderRadius: '20px',
    size: 'small',
    width: 110,
    variant: 'outlined',
    color: '#000000',
    background: '#f44336',
    '&:hover': {
      cursor: 'pointer',
      background: '#fb0101'
    }
  },
  grid: {
    flex: 1,
    direction: 'row',
    justify: 'flex-start',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  container: {
    flex: 1,
    maxWidth: theme.spacing.unit * 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonColor: {
    backgroundColor: colorblue,
    color: colorblue
  },
  scrollBar: {
    overflowY: 'scroll'
  },
  root: {
    flexGrow: 1
  },
  container1: {
    ...theme.absoluteFillObject,
    alignSelf: 'flex-end',
    marginTop: -5,
    position: 'absolute'
  },
  image: {
    width: 115,
    height: 115
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  },
  textAlign: {
    flexDirection: 'row',
    flex: 1,
    width: '172px',
    whiteSpace: 'pre-wrap',
    flexWrap: 'wrap'
  },
  alertDialogButtons: {
    size: 'small',
    variant: 'outlined',
    color: '#000000',
    '&:hover': {
      cursor: 'pointer',
      background: '#4271f4'
    }
  },
  alertFont: {
    color: '#c7d5ed'
  },
  paper2: {
    padding: theme.spacing.unit,
    margin: 'auto',
    maxWidth: '500%',
    marginRight: '2px'
  },
  container2: {
    ...theme.absoluteFillObject,
    alignSelf: 'flex-end',
    marginTop: -5,
    position: 'absolute'
  }
});

export default styles;
