import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#7733ff',
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14,
    align: 'left'
  }
}))(TableCell);

export default CustomTableCell;
