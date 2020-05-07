import React from 'react'
import axios from 'axios'
import { Card, Dropdown, DropdownButton, Image} from 'react-bootstrap'
import { Row, Col } from 'react-bootstrap';
import HOST from './Config';

interface DProps {
    content: string;
    imgUrl?: string;
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
        axios.delete(HOST+'/dailies/'+that.props.iid).then(function(e){
            that.props.getDailies();
        })
    }

    render() {
        let img = null;
        if (this.props.imgUrl !== "") {
            img = <Image src={this.props.imgUrl} fluid />
        }
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
                        <Card.Body>
                            <div>{this.props.content}</div>
                            {img}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default Daily;