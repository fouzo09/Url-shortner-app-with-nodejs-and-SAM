import React from 'react'
import { Alert, Button, Card, Col, Form } from 'react-bootstrap'
import { BACKGROUND_COLOR, BASE_URL} from '../global';


export default function FormCreateUrl({createURl, setLongUrl, longUrl, alias, setAlias, displayShortedUrl, shortedUrl}) {

    
  return (
    <>
        <Col md={{ span: 3 }}>
            <Card style={{ minHeight: '218px'}}>
            <Card.Body>
                { displayShortedUrl && <Alert variant="success" onS>
                    <p style={{ fontSize: '13px' }}>{ shortedUrl }</p>
                </Alert>}
  
                <Form onSubmit={createURl}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label> Enter a long URL to make a TinyURL </Form.Label>
                        <Form.Control type="text" value={longUrl} onChange={(event)=>{setLongUrl(event.target.value)}} />
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Select your domaine</Form.Label>
                        <Form.Select aria-label="Default select example" className='mb-3'>
                        <option>Select your domaine</option>
                        <option value="1">{BASE_URL}</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label> Your alias </Form.Label>
                        <Form.Control type="text" value={alias}  onChange={(event)=>{setAlias(event.target.value)}} />
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button size="lg" type="submit" style={{ backgroundColor: BACKGROUND_COLOR, borderColor: BACKGROUND_COLOR }}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </Card.Body>
            </Card>
        </Col>
    </>
  )
}
