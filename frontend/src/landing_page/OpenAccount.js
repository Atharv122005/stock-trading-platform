import React from 'react'

function OpenAccount() {
  return (
    <div className="container">

      <div className="row">
        <img src="media/images/homeHero.png" alt="hero" />
      </div>

      <div className="m-3" style={{ textAlign: "center" }}>
        <h2 className="mt-5">Open a Zerodha account</h2>
        <p>Modern platform and apps ,&#8377;0 investments, and flat &#8377;20 intraday and F&O trades</p>
        <button className="p-2 btn btn-primary fs-5 mb-5" style={{ width: '20%', margin: '0px auto' }}>Sign up for free</button>
      </div>
    </div>
  )
}

export default OpenAccount
