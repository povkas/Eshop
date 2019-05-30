const modalStyles = theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    paddingRight: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit * 4,
    paddingTop: theme.spacing.unit * 1,
    outline: 'none',
    height: '60vh',
    width: '60vw',
    overflowY: 'scroll',
    top: `${20}%`,
    left: `${20}%`
  },
  root: {
    width: '100%',
    marginTop: '2vh'
  },
  row: {
    '&:nth-of-type(odd)': {
      backGround: theme.palette.background.default
    }
  },
  button: {
    align: 'left'
  },
  emptyArray: {
    paddingTop: 20,
    paddingBottom: 3,
    textAlign: 'center'
  },
  borderTopLeftRadius: {
    borderTopLeftRadius: '17px'
  },
  removeButton: {
    top: `${1}%`,
    marginLeft: '57vw'
  },
  borderTopRightRadius: {
    borderTopRightRadius: '17px'
  }
});

export default modalStyles;
