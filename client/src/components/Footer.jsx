import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-4">
            <h2>About Us</h2>
            <p>
                Department Of
             Software Engineering, SUST
              </p>
            <div className="contact">
               
              <span><i className="fas fa-envelope"></i>robiul43@student.sust.edu</span>
              <br />
              <span><i className="fas fa-envelope"></i>ashraful42@student.sust.edu</span>
             

              
             
            </div>
          </div>
          <div className="col-md-4">
            <h2>Quick Links</h2>
            <ul className="list-unstyled">
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h2>Follow Us</h2>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-secondary text-center py-3">
        &copy; {new Date().getFullYear()} Lost and Found. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
