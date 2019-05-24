const styles = theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 3,
    outline: 'none',
    height: '80vh%',
    width: '12vw',
    top: `${6}%`,
    left: `${80}%`
  },
  textFields: {
    width: '12vw',
    height: '5vh',
    marginTop: '3vh'
  },
  button: {
    marginTop: '2vh',
    textAlign: 'center'
  },
  layout: {
    fontSize: 18,
    color: '#3f51b5'
  },
  registration: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3f51b5',
    textAlign: 'center'
  }
});

export default styles;
