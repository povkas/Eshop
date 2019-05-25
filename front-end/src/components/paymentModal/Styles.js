const styles = theme => ({
  paper: {
    position: 'absolute',
    width: 920,
    height: 500,
    margin: '2vh',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: '24px',
    outline: 'none'
  },
  image: {
    height: '24vmin',
    width: '24vmin'
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
  },
  creditCardDetails: {
    width: 240,
    height: 265,
    padding: '24px'
  },
  purchaseError: {
    color: '#c94c4c',
    marginTop: 15
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: 10
  },
  validationButton: {
    marginTop: 10
  },
  textAlign: {
    tableLayout: 'fixed',
    width: 90,
    flexDirection: 'row',
    flex: 1,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'pre-wrap',
    flexWrap: 'wrap'
  },
  table: {
    height: 200
  },
  tablePaper: {
    width: 350,
    padding: 24
  }
});

export const getModalStyle = () => {
  const top = 42;
  const left = 45;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
};

export default styles;
