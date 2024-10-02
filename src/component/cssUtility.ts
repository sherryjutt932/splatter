const classes = (...classes: (string | null | number | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export default classes;
