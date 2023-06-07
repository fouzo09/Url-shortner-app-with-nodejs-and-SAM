import React, { useState } from 'react'
import { Button, Container, Modal, Nav, Navbar } from 'react-bootstrap'


function Header({shortUrlList}) {

  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="#">SHORTURL</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="" onClick={handleShow}>Historiques url</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          {(shortUrlList?.count) ? 
             shortUrlList.items.map((item)=>(
                <p style={{ fontSize: '12px' }}>
                  <a href={item.url} target='_blank'>{item.url}</a>
                </p>
             )) : <p>L'historique de vos shorturl est vide.</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Header