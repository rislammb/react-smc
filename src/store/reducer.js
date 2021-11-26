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

const initialMode = localStorage.getItem('SMC_DARK_MODE')
  ? JSON.parse(localStorage.getItem('SMC_DARK_MODE'))
  : false;

export const initialState = {
  darkMode: initialMode,
  authLoading: true,
  dataLoading: false,
  user: null,
  medicines: [],
  userMedicines: [],
  searchTerm: '',
  renderableMedicines: [],
  invoices: [],
  singleInvoice: {},
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_DARK_MODE:
      return { ...state, darkMode: payload };
    case AUTH_LOADING:
      return { ...state, authLoading: payload };
    case SET_USER:
      return { ...state, user: payload };
    case DATA_LOADING:
      return { ...state, dataLoading: payload };
    case SET_MEDICINES:
      return { ...state, medicines: payload };
    case SET_USER_MEDICINES:
      return { ...state, userMedicines: payload };
    case SET_SEARCH_TERM:
      return { ...state, searchTerm: payload };
    case SET_USER_INVOICES:
      return { ...state, invoices: payload };
    case SET_SINGLE_INVOICE:
      return { ...state, singleInvoice: payload };
    default:
      return state;
  }
};
export default reducer;
