const Styles = theme => ({
  paper: {
    width: '24vw',
    minWidth: '530px',
    minHeight: '50vh',
    maxHeight: '82vh',
    margin: '2vh',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    marginTop: '20vh',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  formControl: {
    margin: 'normal',
    width: '190px',
    marginBottom: '1.1vh'
  },
  image: {
    height: '245px',
    width: '255px',
    marginBottom: '1.9vh'
  },
  textFields: {
    height: '6.5vh',
    width: '190px',
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
