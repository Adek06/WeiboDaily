import React from 'react';
import './Post.css';
import axios from 'axios'
import HOST from './Config'
import './Post.css'
import { Button, Card, Form, InputGroup, FormControl} from 'react-bootstrap'
import { Row, Col } from 'react-bootstrap';
import $ from 'jquery'
interface PProps {
    getDailies?: any;
}

interface PState {
    dailyContent: string;
}

class Post extends React.Component<PProps, PState> {
    constructor(props: Readonly<PProps>) {
        super(props);
        this.state = {
            dailyContent: ""
        }
        this.post = this.post.bind(this);
        this.inputDaily = this.inputDaily.bind(this);
    }

    post() {
        let that = this;
        let daily = {
            content: ""
        }

        daily['content'] = this.state.dailyContent;

        axios.post(HOST + "/dailies", daily).then(function (res) {
            that.props.getDailies();
            $('#content').html("");
        })
    }

    inputDaily(e: any) {
        this.setState({
            dailyContent: e.currentTarget.innerHTML
        })
    }

    render() {
        return (
            <div className="col-md-12 col-offset-1 postBlock">
                <div>寫個小日記</div>
                <Row className="marginTop3 marginBottom3">
                    <Col md={12}>
                        <div contentEditable='true' className='col-md-12 form-control' id='content' onInput={this.inputDaily}></div>
                    </Col>
                    <Col md={12} className="marginTop3">
                        <Button className="btn btn-default col-md-2 float-right" onClick={this.post}>發布</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Post;