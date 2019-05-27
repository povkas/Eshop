const styles = theme => ({
  paper: {
    width: '30vw',
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
  image: {
    height: '24vmin',
    width: '24vmin'
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`
  },
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 110
  },
  textField: {
    maxWidth: '10vmin'
  }
});

export default styles;
