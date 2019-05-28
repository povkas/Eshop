const styles = theme => ({
  paper: {
    position: 'absolute',
    width: 920,
    height: 500,
    margin: '2vh',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: '24px 0px 24px 0px',
    outline: 'none'
  },
  scrollbar: {
    overflow: 'auto',
    height: '200px'
  },
  tableWrapper: {
    position: 'relative'
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
    padding: '24px',
    justify: 'space-evenly'
  },
  purchaseError: {
    color: '#c94c4c',
    marginTop: 15
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: 10
  },
  validationButton: {
    marginTop: 10,
    variant: 'outlined',
    '&:hover': {
      cursor: 'pointer',
      background: '#0a4487'
    }
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
    height: 233
  },
  tablePaper: {
    width: 355,
    height: 300,
    padding: '0px 25px 15px 25px',
    justify: 'space-evenly'
  },
  tableHeader: {
    fontSize: '16px',
    padding: '4px 3px 5px 24px',
    textAlign: 'left',
    border: 'none',
    color: 'black'
  },
  tableHead: {
    paddingRight: '0px'
  },
  tableRow: {
    paddingTop: '24px'
  },
  productRows: {
    width: '150.6px',
    overflow: 'hidden',
    padding: '4px 0px 5px 24px',
    fontSize: '16px',
    border: 'none'
  },
  paymentTitle: {
    marginLeft: '75px'
  },
  priceRows: {
    padding: '4px 0px 4px 0px',
    width: '100px',
    fontSize: '16px',
    textAlign: 'left',
    border: 'none'
  },
  columnRow: {
    width: '300px'
  },
  priceColumn: {
    padding: '4px 0px 4px 0px',
    textAlign: 'left',
    fontSize: '16px',
    border: 'none',
    color: 'black'
  },
  spanStyle: {
    whiteSpace: 'normal',
    overflow: 'hidden',
    width: '150px',
    margin: '0px 0px 0px 0px',
    display: 'block',
    textOverflow: 'ellipsis'
  },
  totalPriceTitle: {
    textAlign: 'right',
    paddingRight: '17px',
    marginTop: '5px',
    marginBottom: '0px'
  },
  errorMessage: {
    color: '#ff0000'
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
