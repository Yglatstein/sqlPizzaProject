import React from 'react'
import logo from "../../assets/images/logo.png";
import './footer.scss'


const Footer = () => {
  return (
    <footer className='footer'>
       <div className="footer__logo">
        <img src={logo} alt="logo" />
        <h5>MyPizza</h5>
        <p>Best Pizzas in town,<br></br> try it out!</p>
      </div>
      <div className='footer__delivery'>
        <h5>Delivery Time</h5>
          <div>
            <p>
              Friday - Tuesday<br></br>
              10:00am - 11:00pm<br></br>
              Wednesday - Thursday<br></br>
              Off day
            </p>
         </div>
      </div>
    </footer>
  )
}

export default Footer