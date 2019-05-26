const Styles = theme => ({
  paper: {
    position: 'absolute',
    width: '24vw',
    minHeight: '50vh',
    maxHeight: '82vh',
    margin: '2vh',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    top: `${18}%`,
    left: `${34}%`
  },
  formControl: {
    margin: 'normal',
    minWidth: 192
  },
  image: {
    height: '245px',
    width: '255px'
  },
  textFields: {
    height: '6.5vh',
    marginTop: '1.9vh',
    marginBot: '1.9vh'
  },
  typeface: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3f51b5',
    textAlign: 'left'
  }
});

export default Styles;
