import React from 'react'
import PropTypes from 'prop-types'
import { CToast, CToastHeader, CToastBody } from '@coreui/react'

const CustomToast = ({ title, body, closeButton, timestamp }) => (
  <CToast>
    <CToastHeader closeButton={closeButton}>
      {title && (
        <svg
          className="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect width="100%" height="100%" fill="#007aff" />
        </svg>
      )}
      {title && <strong className="me-auto">{title}</strong>}
      {timestamp && <small>{timestamp}</small>}
    </CToastHeader>
    {body && <CToastBody>{body}</CToastBody>}
  </CToast>
)

CustomToast.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  closeButton: PropTypes.bool,
  timestamp: PropTypes.string,
}

export default CustomToast
