import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';

const theme = () => ({
  menuButton: {
    marginRight: 20
  },
  leftButtons: {
    marginLeft: 20
  },
  shopName: {
    marginLeft: 15,
    textDecoration: 'none',
    color: 'white'
  },
  searchDiv: {
    marginLeft: 20,
    flexGrow: 1
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
    width: 256,
    position: 'absolute',
    zIndex: 1
  },
  searchInput: {
    width: 250,
    color: 'white'
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
