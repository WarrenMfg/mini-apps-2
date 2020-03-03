const CSS = {
  resultItem: {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr',
    gridTemplateAreas: '"info description"',
    margin: '10px 0',
    padding: '10px',
    transition: 'all 0.2s ease',
    '&:hover': {
      boxShadow: '0 0 10px black'
    }
  },

  info: {
    gridArea: 'info',
    alignSelf: 'center',
    overflowWrap: 'anywhere',
  },

  description: {
    gridArea: 'description',
    alignSelf: 'center',
    marginLeft: '20px',
    overflowWrap: 'anywhere',
  }
};

module.exports = CSS;