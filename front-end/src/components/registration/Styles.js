const styles = theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    height: '80vh%',
    width: '12vw',
    top: `64px`,
    left: `${80}%`
  },
  textFields: {
    width: '12vw',
    height: '6.5vh',
    marginTop: '1.9vh',
    marginBot: '1.9vh'
  },
  button: {
    marginTop: '2vh',
    marginBot: '1vh'
  },
  registration: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3f51b5',
    textAlign: 'center'
  }
});

export default styles;
