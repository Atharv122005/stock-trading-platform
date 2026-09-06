import React from 'react'

function Hero() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <img src="media/images/homeHero.png" alt="hero" />
        </div>
        <div className="m-3" style={{ textAlign: "center" }}>
          <h2 className="mt-5">Invest in everything</h2>
          <p>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
          <button className="p-2 btn btn-primary fs-5 mb-5" style={{ width: '20%', margin: '0px autofo' }}>Sign up for free</button>
        </div>
      </div>
    </div >
  )
}

export default Hero
