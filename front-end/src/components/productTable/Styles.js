import grey from '@material-ui/core/colors/grey';

const lighterGrey = grey[100];
const darkerGrey = grey[200];

const styles = theme => ({
  paper: {
    justifyContent: 'center',
    textAlign: 'left',
    margin: '1vmin',
    height: '300px',
    width: '255px',
    color: theme.palette.text.secondary,
    padding: '15px',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  image: {
    height: '245px',
    width: '255px'
  },
  expansion: {
    backgroundColor: lighterGrey,
    width: 'inherit'
  },
  textField: {
    width: '100px',
    margin: '12px'
  },
  filterDiv: {
    justifyContent: 'space-evenly',
    alignItems: 'top',
    textAlign: 'center',
    height: '140px'
  },
  inputs: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: '12px',
    width: '250px'
  },
  emptyMessage: {
    margin: '50px',
    textAlign: 'center'
  },
  sortDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '12px',
    alignItems: 'center'
  },
  sortText: {
    marginRight: '12px'
  },
  loadingSpinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  divider: {
    width: 'inherit',
    margin: 12
  },
  pageButtonPaper: {
    width: 25,
    height: 25,
    textAlign: 'center',
    margin: 5,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  pageButtonPaperDisabled: {
    width: 25,
    height: 25,
    textAlign: 'center',
    margin: 5,
    backgroundColor: darkerGrey,
    '&:hover': {
      cursor: 'default'
    }
  },
  pages: {
    justifyContent: 'center',
    width: 'inherit'
  },
  select: {
    marginRight: 12
  }
});

export default styles;
