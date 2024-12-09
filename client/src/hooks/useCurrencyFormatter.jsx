const useCurrencyFormatter = (amount, locale) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export default useCurrencyFormatter
