import React from 'react';

import Container from 'components/Container';

const Footer = () => {
  return (
    <footer>
      <Container>
        <p>&copy; { new Date().getFullYear() }, by <a className='link-external' rel="noopener noreferrer" target='_blank' href='https://tagir-a.com'>Tagir</a></p>
      </Container>
    </footer>
  );
};

export default Footer;
