export const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

export const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class='alert alet--${type}>${msg}</div>`;
  document.querySelector('body').insertAdjacentElement('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};
