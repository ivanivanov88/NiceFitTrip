import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {injected} from "../components/wallet/connectors"
import {useWeb3React} from "@web3-react/core"
import { Container } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { NavDropdown } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Navbar } from 'react-bootstrap'
import React, { useEffect, useState } from "react";
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { Wallet } from './api/hello'
class WalletObject extends React.Component{
  constructor () {
    super();
    this.state = {
      emps:[ new Wallet(1,'Metamask',''),new Wallet(2,'WalletConnect',''),new Wallet(3,'Keystone',''),new Wallet(4,'Lattice',''),new Wallet(5,'Coinbase Wallet',''),new Wallet(6,'Fortmatic',''),
      new Wallet(7,'Portis',''),new Wallet(8,'Torus',''),new Wallet(9,'Binance',''),new Wallet(10,'Clover',''),]
    }
  }
  render(){const listItems = this.state.emps.map((item) => <li key={item.id}>{item.name}</li>);
  return(  <ul>{listItems}</ul>)
}
}
export default function Home() {
const {active,account,library,connector,activate,deactivate}  =  useWeb3React()
async function connect(){
  try {
    await activate(injected)
  }
  catch(ex){
    console.log(ex)
  }
}
async function disconnect(){
  try {
    deactivate(injected)
  }
  catch(ex){
    console.log(ex)
  }

}
function WalletNumberOfRows(numrows){
  for (var i = 0; i < numrows; i++){
    return(
    <Row>
    <Col xs={12} md={8}>
     <WalletObject></WalletObject>
    </Col>
  </Row>
    )
  } 
}
function MydModalWithGrid(props) {
  return ( 
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Select your wallet:
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          {WalletNumberOfRows(5)}
        </Container>
      </Modal.Body>
      <Modal.Footer>
          <Button onClick={connect}>
                Connect to wallet
              </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function App() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Choose a Wallet:
      </Button>

      <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
  return (
    <div className={styles.container}>
      <Head>
       <meta name="description" content="Generated by create next app" />
       <link rel="icon" href="/favicon.ico" />
       <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link href="style.css" rel="stylesheet"/>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
    <title>NiceFitTrip</title>
      </Head>
        <main className={styles.main}>
          <Navbar bg="light" expand="lg">
            <Container fluid>
              <Navbar.Brand href="#">NiceFitTrip</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                 <Navbar.Collapse id="navbarScroll">
                  <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                  >
                    <Nav.Link href="#action1">Home</Nav.Link>
                    <Nav.Link href="#action2">Map</Nav.Link>
                    <NavDropdown title="Link" id="navbarScrollingDropdown">
                      <NavDropdown.Item href="#action3">Meeting</NavDropdown.Item>
                      <NavDropdown.Item href="#action4">Current meet match</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action5">
                        Where is current match?
                      </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#" disabled>
                      Link
                    </Nav.Link>
                  </Nav>
        <Form className="d-flex">
         <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
         {App()}
       </Form>
     </Navbar.Collapse>
   </Container>
  </Navbar>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>    
          </main>
        </div>
    )
}
