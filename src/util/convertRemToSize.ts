export const convertRemToSize = (size: 'M' | 'L' | 'XL' | 'MODAL') => {
  switch (size) {
    case 'M': {
      return '2.7rem';
    }
    case 'L': {
      return '3.5rem';
    }
    case 'MODAL': {
      return '8rem';
    }
    case 'XL': {
      return '13rem';
    }

    default: {
      return '2.7rem';
    }
  }
};
