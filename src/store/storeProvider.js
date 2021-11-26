import React, { useState, useEffect, useReducer } from 'react';
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import StoreContext from './storeContext';
import App from '../App';

import {
  SET_DARK_MODE,
  AUTH_LOADING,
  SET_USER,
  DATA_LOADING,
  SET_MEDICINES,
  SET_USER_MEDICINES,
  SET_SEARCH_TERM,
  SET_USER_INVOICES,
  SET_SINGLE_INVOICE,
} from './types';
import reducer, { initialState } from './reducer';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_AD,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

db.enablePersistence().catch((err) => {
  console.log('Persistence Faild', err);
});

const StoreProvider = () => {
  const [userError, setUserError] = useState(null);
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [error, setError] = useState(null);
  const [createError, setCreateError] = useState('');

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchMedicines = () => {
    dispatch({ type: DATA_LOADING, payload: true });
    db.collection('smc')
      .orderBy('name')
      .onSnapshot((snapshot) => {
        let medicines = [];
        snapshot.docs.forEach((doc) => {
          medicines.push({ ...doc.data(), id: doc.id });
        });
        dispatch({ type: SET_MEDICINES, payload: medicines });
        dispatch({ type: DATA_LOADING, payload: false });
      });
  };

  const fetchUserMedicines = (url) => {
    dispatch({ type: DATA_LOADING, payload: true });
    db.collection(url)
      .orderBy('name')
      .onSnapshot((snapshot) => {
        let medicines = [];
        snapshot.docs.forEach((doc) => {
          medicines.push({ ...doc.data(), id: doc.id });
        });
        dispatch({ type: SET_USER_MEDICINES, payload: medicines });
        dispatch({ type: DATA_LOADING, payload: false });
      });
  };

  const fetchUserInvoices = (shopUrl) => {
    dispatch({ type: DATA_LOADING, payload: true });
    db.collection(`${shopUrl}.invoices`)
      .orderBy('date', 'desc')
      .onSnapshot((snapshot) => {
        let invoices = [];
        snapshot.docs.forEach((doc) => {
          invoices.push({ ...doc.data(), id: doc.id });
        });
        dispatch({ type: SET_USER_INVOICES, payload: invoices });
        dispatch({ type: DATA_LOADING, payload: false });
      });
  };

  const setSearchTerm = (term) =>
    dispatch({ type: SET_SEARCH_TERM, payload: term });

  const fetchSingleInvoice = (shopUrl, invoiceId) => {
    dispatch({ type: DATA_LOADING, payload: true });
    db.collection(`${shopUrl}.invoices`)
      .doc(invoiceId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          dispatch({
            type: SET_SINGLE_INVOICE,
            payload: { ...doc.data(), id: doc.id },
          });
        } else {
          dispatch({ type: SET_SINGLE_INVOICE, payload: {} });
        }
      })
      .then(() => dispatch({ type: DATA_LOADING, payload: false }));
  };

  const createUser = ({ name, email, password }) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        const newUser = {
          name,
          email,
          uid: data.user.uid,
        };
        return db
          .collection('users')
          .doc(data.user.uid)
          .set(newUser)
          .then(() => dispatch({ type: SET_USER, payload: newUser }));
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          setUserError({ create: 'Email Already In Use' });
        } else if (err.code === 'auth/network-request-failed') {
          setUserError({ create: "Registration doesn't work offline" });
        } else {
          setUserError({ create: 'Something went wrong!' });
        }
      });
  };

  const loginUser = ({ email, password }) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) =>
        db
          .collection('users')
          .doc(res.user.uid)
          .get()
          .then((doc) => {
            const { email, name, shopName, shopUrl, uid } = doc.data();
            dispatch({
              type: SET_USER,
              payload: {
                email,
                name,
                shopName,
                shopUrl,
                uid,
              },
            });
          })
      )
      .catch((err) => {
        if (err.code === 'auth/user-not-found') {
          setUserError({ login: 'User not found! Please Create Your Account' });
        } else if (err.code === 'auth/wrong-password') {
          setUserError({ login: 'Password not correct' });
        } else if (err.code === 'auth/network-request-failed') {
          setUserError({ login: "Login doesn't work offline" });
        } else {
          setUserError({ login: 'Something went wrong!' });
        }
      });
  };

  const recoverAccount = (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setIsSendEmail(true);
      })
      .catch((err) => {
        if (err.code === 'auth/user-not-found') {
          setUserError({
            recover: 'User not found!',
          });
        } else if (err.code === 'auth/network-request-failed') {
          setUserError({ recover: "Send Email doesn't work offline" });
        } else {
          setUserError({ recover: 'Something went wrong!' });
        }
      });
  };

  const logoutUser = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => dispatch({ type: SET_USER, payload: null }))
      .catch((err) => console.log('Log out err', err));
  };

  const createCollection = async (values) => {
    await db
      .collection(values.shopUrl)
      .get()
      .then((res) => {
        if (!res.empty) {
          return setCreateError('This Shop Url already in use!');
        } else {
          const newMedicine = {
            dForm: values.dForm,
            name: values.name,
            size: values.size,
            one: values.one,
            blister: values.blister,
          };
          db.collection(values.shopUrl)
            .add(newMedicine)
            .then(() => {
              db.collection('users')
                .doc(state.user.uid)
                .update({
                  shopName: values.shopName,
                  shopUrl: values.shopUrl,
                })
                .then(() => {
                  dispatch({
                    type: SET_USER,
                    payload: {
                      ...state.user,
                      shopName: values.shopName,
                      shopUrl: values.shopUrl,
                    },
                  });
                  setCreateError('');
                })
                .catch((err) => console.log('Update User Shop Url Error', err));
            })
            .catch((err) => {
              console.log('Medicine Added error', err);
            });
        }
      });
  };

  const addMedicine = (medicine) => {
    return db.collection(state.user.shopUrl).add(medicine);
  };

  const deleteMedicine = (docId) => {
    return db.collection(state.user.shopUrl).doc(docId).delete();
  };

  const addUserInvoice = (invoiceDetails) => {
    return db.collection(`${state.user.shopUrl}.invoices`).add(invoiceDetails);
  };

  const deleteMedicineFromInvoice = (invoiceId, medicineId) => {
    if (state.singleInvoice.medicines?.length > 1) {
      let tempMedicines = state.singleInvoice.medicines.filter(
        (medicine) => medicine.id !== medicineId
      );
      return db
        .collection(`${state.user.shopUrl}.invoices`)
        .doc(invoiceId)
        .update({
          medicines: tempMedicines,
        })
        .then(() =>
          dispatch({
            type: SET_SINGLE_INVOICE,
            payload: { ...state.singleInvoice, medicines: tempMedicines },
          })
        );
    } else {
      return db
        .collection(`${state.user.shopUrl}.invoices`)
        .doc(invoiceId)
        .delete()
        .then(() => dispatch({ type: SET_SINGLE_INVOICE, payload: {} }));
    }
  };

  const lightTheme = createMuiTheme({
    ...commonThemeValue,
    palette: {
      ...commonThemeValue.palette,
    },
  });

  const darkTheme = createMuiTheme({
    ...commonThemeValue,
    palette: {
      ...commonThemeValue.palette,
      type: 'dark',
    },
  });

  const theme = responsiveFontSizes(state.darkMode ? darkTheme : lightTheme);

  const toggleDarkMode = () =>
    dispatch({ type: SET_DARK_MODE, payload: !state.darkMode });

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        return db
          .collection('users')
          .doc(firebase.auth().currentUser?.uid)
          .get()
          .then((doc) => {
            dispatch({ type: SET_USER, payload: doc.data() });
          })
          .then(() => dispatch({ type: AUTH_LOADING, payload: false }))
          .catch(() => {
            dispatch({ type: SET_USER, payload: null });
            dispatch({ type: AUTH_LOADING, payload: false });
          });
      } else {
        dispatch({ type: SET_USER, payload: null });
        dispatch({ type: AUTH_LOADING, payload: false });
      }
    });
  }, [firebase.auth()]);

  useEffect(() => {
    localStorage.setItem('SMC_DARK_MODE', JSON.stringify(state.darkMode));
  }, [state.darkMode]);

  return (
    <StoreContext.Provider
      value={{
        state,
        toggleDarkMode,
        fetchMedicines,
        fetchUserMedicines,
        setSearchTerm,
        createUser,
        loginUser,
        logoutUser,
        recoverAccount,
        isSendEmail,
        setIsSendEmail,
        userError,
        setUserError,
        error,
        setError,
        addMedicine,
        deleteMedicine,
        addUserInvoice,
        deleteMedicineFromInvoice,
        fetchUserInvoices,
        fetchSingleInvoice,
        createCollection,
        createError,
        setCreateError,
      }}
    >
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StoreContext.Provider>
  );
};

export default StoreProvider;

const commonThemeValue = {
  palette: {
    primary: {
      main: '#248b8f',
      light: '#14e8f0',
      dark: '#0f7f83',
    },
  },
  typography: {
    fontFamily: "'Titillium Web', sans-serif",
  },
  overrides: {
    MuiOutlinedInput: {
      input: {
        padding: '10px 16px',
      },
    },
    MuiInputLabel: {
      outlined: {
        transform: 'translate(16px, 12px) scale(1)',
      },
    },
  },
};
