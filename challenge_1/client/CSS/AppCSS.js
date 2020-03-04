const CSS = {
  Global: {
    '*': {
      boxSizing: 'border-box',
      '&:focus': {
        outline: 'none'
      },
      '&::selection': {
        backgroundColor: 'black',
        color: 'white'
      }
    },

    body: {
      fontFamily: 'Arial',
      backgroundColor: 'black',
      margin: '0'
    },

    ul: {
      position: 'fixed',
      bottom: '0',
      left: '50%',
      transform: 'translate(-50%, 0)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      listStyleType: 'none',
      margin: '0',
      padding: '0',
      width: '75vw',
      backgroundColor: 'white'
    },

    li: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0',
      padding: '10px',
      minWidth: '50px',
      height: '50px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: 'black',
        color: 'white'
      }
    },

    '.selected': {
      fontWeight: 'bold'
    }
  },

  app: {
    width: '75vw',
    minHeight: '100vh',
    backgroundColor: 'white',
    padding: '20px 20px 50px',
    margin: '0 auto'
  }
};

module.exports = CSS;