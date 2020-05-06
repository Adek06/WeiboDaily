import React from 'react'
import axios from 'axios'
import { Button, Card, Form, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap'
import { Container, Row, Col } from 'react-bootstrap';
import HOST from './Config';

interface DProps {
    content: string;
    createTime: string;
    key: number;
    iid: string;
    style?: Object;
    getDailies?: any;
}

interface DState {

}

class Daily extends React.Component<DProps, DState>{
    constructor(props: DProps) {
        super(props)
        this.state = {

        }
        console.log(this.props.iid)
        this.delDaily = this.delDaily.bind(this)
    }

    delDaily() {
        let that = this;
        let dataModel = {
            id: this.props.iid
        }
        axios.delete(HOST+'/dailies/'+that.props.iid).then(function(e){
            that.props.getDailies();
        })
    }

    render() {
        return (
            <Row>
                <Col md={12}>
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col md={11}>{this.props.createTime}</Col>
                                <DropdownButton id="dropdown-basic-button" size="sm" variant="secondary" title="編輯">
                                    <Dropdown.Item>編輯</Dropdown.Item>
                                    <Dropdown.Item>分享</Dropdown.Item>
                                    <Dropdown.Item onClick={this.delDaily}>刪除</Dropdown.Item>
                                </DropdownButton>
                            </Row>
                        </Card.Header>
                        <Card.Body>{this.props.content}</Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default Daily;