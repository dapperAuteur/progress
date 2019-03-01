import React from 'react';

const Footer = props => {
  return (
    <footer className="mt-4">
      <div className="container">
        <hr />
        <p className="text-muted text-center py-3">
          Copyright&copy; {new Date().getFullYear()} | Muhammad Al Juburi
        </p>
      </div>
    </footer>
  );
};

export default Footer;
