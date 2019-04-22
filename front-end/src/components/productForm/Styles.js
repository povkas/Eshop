const Styles = theme => ({
  paper: {
    position: 'absolute',
    width: '30vw',
    minHeight: '50vh',
    maxHeight: '82vh',
    margin: '2vh',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none'
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

export default Styles;
