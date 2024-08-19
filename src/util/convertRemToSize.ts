export const convertRemToSize = (size: 'M' | 'L' | 'XL') => {
  switch (size) {
    case 'M': {
      return '2.7rem';
    }
    case 'L': {
      return '3.5rem';
    }
    case 'XL': {
      return '13rem';
    }
    default: {
      return '2.7rem';
    }
  }
};
