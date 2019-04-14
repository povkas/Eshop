export const modalStyles = theme => ({
  paper: {
    position: 'absolute',
    // width: theme.spacing.unit * 25,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    height: '88vh',
    width: '13vw',
    top: `${0}%`,
    left: `${75}%`
  }
});

export const styles = {
  width: '12vw',
  height: '6.5vh',
  marginTop: '1.9vh',
  marginBot: '1.9vh'
};

export default modalStyles;
