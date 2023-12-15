import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLink,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CPopover,
  CRow,
  CTooltip,
} from '@coreui/react'
import { DocsExample } from 'src/components'

const Modals = () => {
  const [visible, setVisible] = useState(false)
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Modal</strong>
          </CCardHeader>
          <CCardBody>
            <CButton onClick={() => setVisible(!visible)}>Vertically centered modal</CButton>
            <CModal
              alignment="center"
              visible={visible}
              onClose={() => setVisible(false)}
              aria-labelledby="VerticallyCenteredExample"
            >
              <CModalHeader>
                <CModalTitle id="VerticallyCenteredExample">Modal title</CModalTitle>
              </CModalHeader>
              <CModalBody>Bạn có chắc muốn xóa ?</CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setVisible(false)}>
                  Đóng
                </CButton>
                <CButton color="primary">Có</CButton>
              </CModalFooter>
            </CModal>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Modals
