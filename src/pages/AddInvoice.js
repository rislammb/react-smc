import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Button,
  TextField,
  Typography,
  Card,
} from '@material-ui/core';
import { Add, Delete, ArrowBack } from '@material-ui/icons';

import StoreContext from '../store/storeContext';
import DatePickersComp from '../components/DatePickersComp';
import AddInvoiceItemList from '../components/AddInvoiceItemList';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '5px',
    padding: theme.spacing(1),
    backgroundColor:
      theme.palette.type === 'light' ? 'rgba(255,255,255,0.3)' : '',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2),
      marginTop: '0px',
    },
  },
  header: {
    textAlign: 'center',
    color:
      theme.palette.type === 'light'
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
  },
  btn: {
    background: theme.palette.primary.main,
    color: '#fafafa',
    padding: '5px',
    transition: 'all 0.5s ease',
    '&:hover': {
      background: theme.palette.primary.main,
      color: '#cacaca',
    },
  },
  deleteBtn: {
    background: theme.palette.secondary.main,
    color: '#fafafa',
    padding: '7px',
    marginLeft: '5px',
    transition: 'all 0.5s ease',
    '&:hover': {
      background: theme.palette.secondary.main,
      color: '#cacaca',
    },
  },
  error: {
    color: theme.palette.secondary.main,
  },
  formContainer: {
    overflowX: 'auto',
    overflowY: 'hidden',
    paddingTop: '7px',
    marginBottom: '7px',
  },
  form: {
    minWidth: '540px',
  },
  cardActions: {
    marginTop: theme.spacing(1.4),
    display: 'flex',
    justifyContent: 'center',
  },
  backBtn: {
    background: theme.palette.primary.main,
    color: '#fafafa',
    transition: 'all .4s ease',
    marginRight: '15px',
    '&:hover': {
      background: theme.palette.primary.main,
      color: '#cacaca',
    },
  },
}));

const initialInfo = {
  buyFrom: '',
  invoiceNumber: '',
};

const initialValues = {
  dogesForm: '',
  name: '',
  size: '',
  amount: '',
  price: '',
  expireDate: new Date(),
};

const initialList = [
  {
    id: Math.random() + '-' + Math.random(),
    ...initialValues,
  },
  {
    id: Math.random() + '-' + Math.random(),
    ...initialValues,
  },
  {
    id: Math.random() + '-' + Math.random(),
    ...initialValues,
  },
];

const AddInvoice = ({ match, history }) => {
  const { shopUrl } = match.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [invoiceInfo, setInvoiceInfo] = useState(initialInfo);
  const [itemList, setItemList] = useState(initialList);
  const [isInfoError, setIsInfoError] = useState(false);
  const [isListError, setIsListError] = useState(false);
  const classes = useStyles();
  const {
    state: { user },
    addUserInvoice,
  } = useContext(StoreContext);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const addItemRow = () => {
    setItemList((prev) => {
      return [
        ...prev,
        {
          id: Math.random() + '-' + Math.random(),
          ...initialValues,
        },
      ];
    });
  };

  const deleteItemRow = () => {
    if (itemList.length > 1) {
      const tempList = [...itemList];
      tempList.pop();
      setItemList(tempList);
    }
  };

  const onChangeInfo = ({ target }) => {
    setIsInfoError(false);
    setInvoiceInfo((prev) => {
      return {
        ...prev,
        [target.name]: target.value,
      };
    });
  };

  const onChangeItem = (id, event, date) => {
    setIsListError(false);
    const tempList = [...itemList];
    const editedList = tempList.map((item) => {
      if (item.id === id) {
        if (date) {
          return {
            ...item,
            expireDate: event,
          };
        } else if (
          event.target.name === 'amount' ||
          event.target.name === 'price'
        ) {
          return {
            ...item,
            [event.target.name]: event.target.value.replace(/[^0-9]/g, ''),
          };
        } else {
          return {
            ...item,
            [event.target.name]: event.target.value,
          };
        }
      } else return item;
    });
    setItemList(editedList);
  };

  const getDate = (value) => {
    const dateStr = new Date(value).toDateString();
    const date = dateStr.substr(8, 2);
    const month = dateStr.substr(3, 4);
    const year = dateStr.substr(10, 5);
    return date + month + year;
  };
  const getMonth = (value) => {
    const dateStr = new Date(value).toDateString();
    const month = dateStr.substr(4, 3);
    const year = dateStr.substr(10, 5);
    return month + year;
  };

  const addInvoiceFn = () => {
    const trimedBuyFrom = invoiceInfo.buyFrom.trim();
    if (selectedDate && trimedBuyFrom) {
      const emptyList = itemList.filter(
        (item) => !item.name.trim() || !item.amount.trim() || !item.price.trim()
      );
      if (emptyList.length < 1) {
        const trimedInvoiceNumber = invoiceInfo.invoiceNumber.trim();
        const finalList = itemList.map((item) => {
          return {
            id: item.id,
            dogesForm: item.dogesForm.trim(),
            name: item.name.trim(),
            size: item.size.trim(),
            amount: +item.amount.trim(),
            price: +item.price.trim(),
            expireDate: getMonth(item.expireDate),
          };
        });
        console.log(finalList);
        // addUserInvoice({
        //   date: getDate(selectedDate),
        //   buyFrom: trimedBuyFrom,
        //   invoiceNumber: trimedInvoiceNumber,
        //   medicines: finalList,
        // });
        return history.goBack();
      } else {
        setIsListError(true);
      }
    } else {
      setIsInfoError(true);
    }
  };

  const getTotal = () => {
    let total = 0;
    const tempItem = itemList.filter((item) => item.price !== '');
    tempItem.map((item) => (total += +item.price));
    return total;
  };

  if (shopUrl !== user?.shopUrl) return <Redirect to={`/p/${shopUrl}`} />;
  return (
    <Card className={classes.root}>
      <Typography variant='h4' className={classes.header}>
        Add Invoice
      </Typography>
      <div className={classes.formContainer}>
        <div
          style={{
            minWidth: '430px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <DatePickersComp
            label='Date'
            value={selectedDate}
            onChange={handleDateChange}
          />
          <TextField
            name='buyFrom'
            placeholder='e.g. Beximco Pharma'
            label='Buy From'
            value={invoiceInfo.buyFrom}
            onChange={onChangeInfo}
            style={{ marginLeft: 8, marginRight: 8, flex: 4 }}
          />
          <TextField
            name='invoiceNumber'
            placeholder='e.g. 382382'
            label='Invoice Number'
            value={invoiceInfo.invoiceNumber}
            onChange={onChangeInfo}
            style={{ flex: 3 }}
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <div>
          {isInfoError ? (
            <Typography className={classes.error}>
              Please fill above info properly!
            </Typography>
          ) : (
            isListError && (
              <Typography className={classes.error}>
                Please fill below info properly!
              </Typography>
            )
          )}
        </div>
        <div>
          <IconButton size='small' className={classes.btn} onClick={addItemRow}>
            <Add />
          </IconButton>
          <IconButton
            size='small'
            className={classes.deleteBtn}
            onClick={deleteItemRow}
          >
            <Delete fontSize='small' />
          </IconButton>
        </div>
      </div>
      <div className={classes.formContainer}>
        <form className={classes.form}>
          {itemList.map((item) => (
            <AddInvoiceItemList
              key={item.id}
              item={item}
              onChangeItem={onChangeItem}
            />
          ))}
        </form>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography style={{ marginRight: '16px' }}>
          Total items: {itemList.length}
        </Typography>
        <Typography>Price: {getTotal()}</Typography>
      </div>
      <div className={classes.cardActions}>
        <Link to={`/i/${shopUrl}`}>
          <IconButton size='small' className={classes.backBtn}>
            <ArrowBack fontSize='large' />
          </IconButton>
        </Link>
        <Button color='primary' variant='contained' onClick={addInvoiceFn}>
          Add
        </Button>
      </div>
    </Card>
  );
};

export default AddInvoice;
