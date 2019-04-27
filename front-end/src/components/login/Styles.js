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
  button: {
    fontSize: 14,
    color: '#551A8B',
    marginLeft: '-24px',
    width: '10vw',
    textTransform: 'none'
  },
  color: {
    fontSize: 14,
    color: '#551A8B'
  }
});

export default modalStyles;
