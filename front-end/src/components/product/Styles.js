const styles = theme => ({
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
  },
  image: {
    height: '24vmin',
    width: '24vmin'
  },
  star: {
    width: '2.4vmin',
    height: '2.4vmin',
    fill: '#000000'
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
  input: {
    width: '3.2vmin'
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
