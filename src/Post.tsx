import React from 'react';
import './Post.css';
import axios from 'axios'
import HOST from './Config'
import './Post.css'
import { Button, Image } from 'react-bootstrap'
import { Row, Col } from 'react-bootstrap';
import $ from 'jquery'
import Oss from './Oss'
interface PProps {
    getDailies?: any;
}

interface PState {
    dailyContent: string;
    imgUrl: string;
}

class Post extends React.Component<PProps, PState> {
    constructor(props: Readonly<PProps>) {
        super(props);
        
        this.state = {
            dailyContent: "",
            imgUrl: ""
        }

        this.post = this.post.bind(this);
        this.inputDaily = this.inputDaily.bind(this);
        this.getImg = this.getImg.bind(this);
    }

    componentDidMount() {
        let dailyContent = localStorage.getItem('dailyContent');
        let imgUrl = localStorage.getItem('imgUrl');
        dailyContent = dailyContent==null?"":dailyContent;
        imgUrl = imgUrl==null?"":imgUrl;
        this.setState({
            dailyContent: dailyContent,
            imgUrl: imgUrl
        })

        $('#content').html(dailyContent);
    }

    post() {
        let that = this;
        let daily = {
            content: "",
            imgUrl: ""
        }

        daily['content'] = this.state.dailyContent;
        daily['imgUrl'] = this.state.imgUrl;

        axios.post(HOST + "/dailies", daily).then(function (res) {
            that.props.getDailies();
            $('#content').html("");
            that.setState({
                imgUrl: ""
            })
            localStorage.clear();
        })
    }

    inputDaily(e: any) {
        this.setState({
            dailyContent: e.currentTarget.innerHTML
        })

        localStorage.setItem('dailyContent', this.state.dailyContent)
    }

    getImg(img: any) {
        this.setState({
            imgUrl: img
        })

        localStorage.setItem('imgUrl', img)
    }

    render() {
        let img = null;
        if (this.state.imgUrl !== "") {
            img = <Image src={this.state.imgUrl} fluid />
        }
        return (
            <div className="col-md-12 col-offset-1 postBlock">
                <div>寫個小日記</div>
                <Row className="marginTop3 marginBottom3">
                    <Col md={12}>
                        <div contentEditable='true' className='col-md-12 form-control' id='content' onInput={this.inputDaily}></div>
                    </Col>
                    <Col md={12}>
                        {img}
                    </Col>
                    <Col md={4} className="marginTop3">
                        <Oss setImg={this.getImg} />
                        {/* <Button className="btn btn-default col-md-2">插入圖片</Button> */}
                    </Col>
                    <Col md={8}>
                        <Button className="btn btn-default col-md-2 float-right" onClick={this.post}>發布</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Post;