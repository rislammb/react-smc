export const getIcon = (name) => {
  if (name.toLowerCase().includes('tablet')) {
    return <img src='/form-icons/tablet.svg' alt='tab' width='30' />;
  } else if (name.toLowerCase().includes('capsule')) {
    return <img src='/form-icons/capsule.svg' alt='cap' width='30' />;
  } else if (name.toLowerCase().includes('syrup')) {
    return <img src='/form-icons/syrup.svg' alt='syp' width='30' />;
  } else if (name.toLowerCase().includes('suspension')) {
    return <img src='/form-icons/suspension.svg' alt='sus' width='30' />;
  } else if (name.toLowerCase().includes('injection')) {
    return <img src='/form-icons/injection.svg' alt='inj' width='30' />;
  } else if (name.toLowerCase().includes('drop')) {
    return <img src='/form-icons/drop.svg' alt='drop' width='30' />;
  } else if (name.toLowerCase().includes('infusion')) {
    return <img src='/form-icons/infusion.svg' alt='inf' width='30' />;
  } else if (name.toLowerCase().includes('solution')) {
    return <img src='/form-icons/solution.svg' alt='sol' width='30' />;
  } else if (
    name.toLowerCase().includes('ointment') ||
    name.toLowerCase().includes('cream')
  ) {
    return <img src='/form-icons/ointment.svg' alt='oint' width='30' />;
  } else if (name.toLowerCase().includes('suppository')) {
    return <img src='/form-icons/suppository.svg' alt='supp' width='30' />;
  } else {
    return <img src='/form-icons/default.svg' alt='medi' width='30' />;
  }
};
