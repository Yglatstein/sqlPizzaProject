import React from "react";
import './home.scss'
import guyImg from '../assets/images/delivery_guy.png'

const Home = () => {
    return(
        <div className="home">
             <div className="section_1">
              <div className="hero__content">
                <h5>Easy order & fast delivery</h5>
                <h1 className="hero__title">
                  Enjoy your favorite Pizza
                </h1>
                <button className="order__btn">
                  <a href="/menu">Menu</a>
                </button>
              </div>
            </div>

            <div>
              <div className="hero__img">
                <img src={guyImg} alt="delivery-guy" className="w-100" />
              </div>
            </div>
        </div>
    )
}

export default Home