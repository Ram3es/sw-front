import React, { useEffect } from 'react'

const TrustBox = () => {
  const ref = React.useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (window.Trustpilot && ref.current) {
      window.Trustpilot.loadFromElement(ref.current, true)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="trustpilot-widget"
      data-locale="en-US"
      data-template-id="5406e65db0d04a09e042d5fc"
      data-businessunit-id="5c51a114fb592e00014d0e8d"
      data-style-height="28px"
      data-style-width="100%"
      data-theme="dark"
      >
      <a href="https://www.trustpilot.com/review/skinwallet.com" target="_blank" rel="noopener noreferrer">Trustpilot</a>
    </div>
  )
}

export default TrustBox
