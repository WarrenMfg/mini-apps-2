const CSS = {
  form: {
    textAlign: 'center',
  },

  header: {
    margin: '0 auto 20px'
  },

  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  input: {
    width: '200px',
    height: '32px',
    fontSize: '16px',
    padding: '10px',
    borderTop: '1px solid black',
    borderRight: 'none',
    borderBottom: '1px solid black',
    borderLeft: '1px solid black',
    transition: 'all 0.2s ease',
    '&:focus': {
      boxShadow: '0 0 5px slategray inset'
    }
  },

  submit: {
    width: '100px',
    height: '32px',
    border: '1px solid black',
    fontSize: '16px',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'black',
      color: 'white',
      cursor: 'pointer'
    },
    '&:focus': {
      boxShadow: '0 0 5px slategray inset'
    }
  },

  clear: {
    width: '100px',
    height: '32px',
    borderTop: '1px solid black',
    borderRight: '1px solid black',
    borderBottom: '1px solid black',
    borderLeft: 'none',
    fontSize: '16px',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'black',
      color: 'white',
      cursor: 'pointer'
    },
    '&:focus': {
      boxShadow: '0 0 5px slategray inset'
    }
  }
};

module.exports = CSS;