const modalStyles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 25,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    height: '80%vh%',
    top: `${5}%`,
    left: `${75}%`
  }
});

export default modalStyles;
