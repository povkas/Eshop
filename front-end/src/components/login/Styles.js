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
  }
});

export default modalStyles;
