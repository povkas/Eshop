const styles = theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    height: '88vh',
    width: '13vw',
    top: `${0}%`,
    left: `${75}%`
  },
  textFields: {
    width: '12vw',
    height: '6.5vh',
    marginTop: '1.9vh',
    marginBot: '1.9vh'
  }
});

export default styles;
