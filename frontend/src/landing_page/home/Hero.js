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
        <div className="container mt-5">
          <div className="row">
            <div className="col-6 p-5">
              <img src="media/images/largestBroker.svg" />
            </div>
            <div className="col-6 p-5 mt-3">
              <h1>Largest stock broker in india</h1>
              <p className="mb-5">2+ million Zerodha client contribute to over 15% of all retail order volume in india daily by trading and investing in: </p>
              <div className="row ">
                <div className="col-6 ">
                  <ul >
                    <li><p>Futures and Options</p></li>
                    <li><p>Commodity derivatives</p></li>
                    <li><p>Currency derivatives</p></li>
                  </ul>
                </div>

                <div className="col-6">
                  <ul >
                    <li><p>Stocks & IPOs</p></li>
                    <li><p>Direct mutual funds</p></li>
                    <li><p>Bonds</p></li>
                  </ul>
                </div>
              </div>

              <img
                src="media/images/pressLogos.png"
                className="img-fluid mt-3"
                style={{width:"80%"}}
              />

          </div>

        </div>

      </div>

    </div>


        </div >
  )
}

export default Hero
