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
    fontSize: 11.5,
    color: '#551A8B',
    marginLeft: '-19px',
    width: '10vw'
  },
  color: {
    color: '#551A8B'
  }
});

export default modalStyles;
