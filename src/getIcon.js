export const getIcon = (name) => {
  if (name.toLowerCase().includes('tablet')) {
    return <img src='/form-icons/tablet.svg' alt='tab' width='30' />;
  } else if (name.toLowerCase().includes('capsule')) {
    return <img src='/form-icons/capsule.svg' alt='cap' width='30' />;
  } else if (name.toLowerCase().includes('syrup')) {
    return <img src='/form-icons/syrup.svg' alt='syp' width='30' />;
  } else if (name.toLowerCase().includes('suspension')) {
    return <img src='/form-icons/suspension.svg' alt='sus' width='30' />;
  } else if (
    name.toLowerCase().includes('injection') ||
    name.toLowerCase().includes('syringe')
  ) {
    return <img src='/form-icons/injection.svg' alt='inj' width='30' />;
  } else if (name.toLowerCase().includes('drop')) {
    return <img src='/form-icons/drop.svg' alt='drop' width='30' />;
  } else if (name.toLowerCase().includes('tape')) {
    return <img src='/form-icons/tape.svg' alt='tape' width='30' />;
  } else if (name.toLowerCase().includes('condom')) {
    return <img src='/form-icons/condom.svg' alt='condom' width='30' />;
  } else if (name.toLowerCase().includes('mask')) {
    return <img src='/form-icons/mask.svg' alt='mask' width='30' />;
  } else if (name.toLowerCase().includes('napkin')) {
    return <img src='/form-icons/napkin.svg' alt='napkin' width='30' />;
  } else if (name.toLowerCase().includes('infusion')) {
    return <img src='/form-icons/infusion.svg' alt='inf' width='30' />;
  } else if (name.toLowerCase().includes('solution')) {
    return <img src='/form-icons/solution.svg' alt='sol' width='30' />;
  } else if (name.toLowerCase().includes('pill')) {
    return <img src='/form-icons/pills.svg' alt='pill' width='30' />;
  } else if (
    name.toLowerCase().includes('bandage') ||
    name.toLowerCase().includes('cotton') ||
    name.toLowerCase().includes('gauze')
  ) {
    return <img src='/form-icons/bandage.svg' alt='bdg' width='30' />;
  } else if (name.toLowerCase().includes('pregnancy test')) {
    return <img src='/form-icons/pregnancy-test.svg' alt='test' width='30' />;
  } else if (
    name.toLowerCase().includes('powder') ||
    name.toLowerCase().includes('ors') ||
    name.toLowerCase().includes('saline')
  ) {
    return <img src='/form-icons/powder.svg' alt='pow' width='30' />;
  } else if (
    name.toLowerCase().includes('ointment') ||
    name.toLowerCase().includes('gel') ||
    name.toLowerCase().includes('blam') ||
    name.toLowerCase().includes('cream')
  ) {
    return <img src='/form-icons/ointment.svg' alt='oint' width='30' />;
  } else if (name.toLowerCase().includes('suppository')) {
    return <img src='/form-icons/suppository.svg' alt='supp' width='30' />;
  } else {
    return <img src='/form-icons/default.svg' alt='medi' width='30' />;
  }
};
