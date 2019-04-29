const modalStyles = theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    height: '60vh',
    width: '30vw',
    top: `${20}%`,
    left: `${35}%`
  },
  root: {
    top: `${0}%`,
    width: '30vw',
    height: '60vh',
    backgroundColor: theme.palette.background.paper,
    overflowY: 'scroll',
    alignItems: 'flex-start'
  },
  button: {
    backgroundColor: '#FF0000'
  }
});

export default modalStyles;
