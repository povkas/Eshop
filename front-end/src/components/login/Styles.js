const modalStyles = theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    height: '80vh%',
    width: '10vw',
    top: `${6}%`,
    left: `${75}%`
  },
  button1: {
    fontSize: 14,
    color: '#551A8B',
    width: '10vw',
    textDecoration: 'underline',
    textTransform: 'none'
  },
  button2: {
    fontSize: 14,
    color: '#551A8B',
    width: '10vw',
    textDecoration: 'underline',
    textTransform: 'none',
    fontWeight: 'bold'
  },
  color: {
    fontSize: 14,
    color: '#551A8B'
  }
});

export default modalStyles;
