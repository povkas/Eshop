import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';

const theme = () => ({
  searchDiv: {
    marginRight: '34vw',
    height: 25,
    width: '10vw',
    justifyContent: 'center'
  },
  suggestion: {
    color: blue[800],
    paddingLeft: 5,
    paddingTop: 3,
    paddingBottom: 3,
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: grey[200]
    }
  },
  suggestionList: {
    width: 466,
    position: 'absolute',
    zIndex: 1
  },
  searchInput: {
    width: 460,
    color: 'white',
    backgroundColor: indigo[700],
    border: `1px solid ${indigo[700]}`,
    borderRadius: '5px',
    height: 'inherit',
    paddingLeft: 5,
    '&:focus': {
      backgroundColor: indigo[800],
      border: `1px solid ${indigo[400]}`
    }
  },
  showAll: {
    color: blue[900],
    paddingTop: 1,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: grey[200]
    }
  },
  emptySuggestions: {
    color: red[800],
    paddingTop: 3,
    paddingBottom: 3,
    textAlign: 'center',
    '&:hover': {
      cursor: 'default'
    }
  }
});

export default theme;
