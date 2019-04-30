import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#1E90FF',
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

export default CustomTableCell;
