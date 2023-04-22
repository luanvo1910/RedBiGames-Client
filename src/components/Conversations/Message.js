import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Moment from 'react-moment'

const Message = ({message, user}) => (
    <>
    {
        message.userId === "63e8d6d3e863857e6ff09221" ? 
            <Card style={{ width: '18rem'}} bg='dark'>
                <Card.Body>
                    <Row>
                        <Col>
                            <h5>ADMIN</h5>
                        </Col>
                        <Col>
                            <Moment fromNow>{message.createAt}</Moment>
                        </Col>
                    </Row>
                    <Card.Text>
                        {message.content}
                    </Card.Text>
                </Card.Body>
            </Card>
        : 
            <Card style={{ width: '18rem' }} bg='info' >
                <Card.Body>
                    <Row>
                        <Col>
                            <h5>{user}</h5>
                        </Col>
                        <Col>
                            <Moment fromNow>{message.createAt}</Moment>
                        </Col>
                    </Row>
                    <Card.Text>
                        {message.content}
                    </Card.Text>
                </Card.Body>
            </Card>
    } 
    </>
)

export default Message