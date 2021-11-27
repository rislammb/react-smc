import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

const useStyles = makeStyles((theme) => ({
  lsPaddingRoot: {
    padding: '4px 6px',
    [theme.breakpoints.up('md')]: {
      padding: '5px 16px',
    },
  },
}));

const SlimTableCell = (props) => {
  const classes = useStyles();

  return (
    <TableCell classes={{ root: classes.lsPaddingRoot }} {...props}>
      {props.children}
    </TableCell>
  );
};

export default SlimTableCell;
