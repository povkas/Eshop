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
    color: 'black',
    paddingLeft: 2,
    paddingTop: 1,
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: 'silver'
    }
  },
  suggestionList: {
    width: 256,
    position: 'absolute'
  },
  searchInput: {
    width: 250
  },
  showAll: {
    color: 'black',
    paddingTop: 1,
    textAlign: 'center',
    backgroundColor: 'lightgrey',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: 'silver'
    }
  }
});

export default theme;
