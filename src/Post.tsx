import React from 'react';
import './Post.css';
import axios from 'axios'
import {HOST, OSSInfo} from './Config'
import './Post.css'
import $ from 'jquery'
import Oss from './Oss'

interface IProps {
    clearImg: any;
    imgUrl: string;
}

class Img extends React.Component<IProps, any> {
    constructor(props: Readonly<IProps>) {
        super(props);
    }

    render() {
        return (
            <div className="img-wrap">
                <button className="delete close" onClick={this.props.clearImg}/>
                <img alt={this.props.imgUrl} src={this.props.imgUrl}/>
            </div>


        );
    }
}


interface PProps {
    getDailies?: any;
}

interface PState {
    dailyContent: string;
    imgUrl: string;
    accessKeyId: string;
    accessKeySecret: string;
    stsToken: string;
}

class Post extends React.Component<PProps, PState> {
    private timer: NodeJS.Timeout | undefined;

    constructor(props: Readonly<PProps>) {
        super(props);

        this.state = {
            accessKeySecret: "",
            stsToken: "",
            accessKeyId: "",
            dailyContent: "",
            imgUrl: ""
        }

        this.post = this.post.bind(this);
        this.inputDaily = this.inputDaily.bind(this);
        this.getImg = this.getImg.bind(this);
        this.getSTS = this.getSTS.bind(this);
        this.clearImg = this.clearImg.bind(this);
    }

    componentDidMount() {
        let self = this;
        let dailyContent = localStorage.getItem('dailyContent');
        let imgUrl = localStorage.getItem('imgUrl');
        dailyContent = dailyContent == null ? "" : dailyContent;
        imgUrl = imgUrl == null ? "" : imgUrl;
        this.setState({
            dailyContent: dailyContent,
            imgUrl: imgUrl
        })
        self.getSTS()

        this.timer = setInterval(() => {
            self.getSTS()
        }, 600000);

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

        axios.post(HOST + "/dailies", daily).then(function () {
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

    getImg(obj: any) {
        this.setState({
            imgUrl: obj.url
        })

        localStorage.setItem('imgUrl', obj.url)
    }

    clearImg() {
        let self = this;
        self.setState({
            imgUrl: ""
        })
        localStorage.setItem('imgUrl', "")
    }

    getSTS() {
        let self = this;
        axios.get(HOST + '/sts').then(function (res) {
            console.log(res)
            let data = res.data
            self.setState({
                accessKeyId: data.access_key_id,
                accessKeySecret: data.access_key_secret,
                stsToken: data.security_token,
            })

            console.log(self.state)
        })
    }

    componentWillUnmount() {
        if (this.timer != null) {
            clearInterval(this.timer);
        }
    }

    render() {
        let img = null;
        if (this.state.imgUrl !== "") {

            img = <Img clearImg={this.clearImg} imgUrl={this.state.imgUrl}/>

        }
        return (
            <div className="postBlock">
                <div className={"column is-12"}>
                    <div className="title">寫個小日記</div>
                    <div contentEditable='true' className='form-control' id='content'
                         onInput={this.inputDaily}/>
                    {img}
                    <div className="level">
                        <div className="level-left">
                            <div className="level-item">
                                <Oss accessKeyId={this.state.accessKeyId}
                                     accessKeySecret={this.state.accessKeySecret}
                                     stsToken={this.state.stsToken} bucket={OSSInfo.bucket}
                                     region={OSSInfo.region}
                                     callback={this.getImg}/>
                            </div>
                        </div>
                        <div className="level-right">
                            <div className="level-item">
                                <button className="button is-primary" onClick={this.post}>發布</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}

export default Post;