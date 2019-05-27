import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#3f51b5',
    color: theme.palette.common.white,
    width: '150px'
  },
  body: {
    fontSize: 14,
    align: 'left',
    width: '150px'
  }
}))(TableCell);

export default CustomTableCell;
