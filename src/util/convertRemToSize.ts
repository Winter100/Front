export const convertRemToSize = (size: 'S' | 'M' | 'L' | 'XL' | 'MODAL') => {
  switch (size) {
    case 'S': {
      return '2.5rem';
    }
    case 'M': {
      return '2.7rem';
    }
    case 'L': {
      return '3.5rem';
    }
    case 'MODAL': {
      return '7rem';
    }
    case 'XL': {
      return '13rem';
    }

    default: {
      return '2.7rem';
    }
  }
};
