const modalStyles = theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    height: '60vh',
    width: '40vw',
    overflow: 'scroll',
    top: `${20}%`,
    left: `${35}%`
  },
  root: {
    width: '100%',
    searching: 'false'
  },
  row: {
    '&:nth-of-type(odd)': {
      backGround: theme.palette.background.default
    }
  },
  button: {
    backgroundColor: '#6495ED'
  }
});

export default modalStyles;
