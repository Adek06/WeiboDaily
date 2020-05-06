import React from 'react';
import './Post.css';
import axios from 'axios'

const host = "http://127.0.0.1:3003/api"

interface PProps {

}

interface PState {
    clickTime: number;
    dailyContent: string;
}

class Post extends React.Component<PProps, PState> {
    constructor(props: Readonly<PProps>) {
        super(props);
        this.state = {
            clickTime: 1,
            dailyContent: ""
        }
        this.post       = this.post.bind(this);
        this.inputDaily = this.inputDaily.bind(this);
    }
    
    post(){
        let daily = {
            content: ""
        }

        daily['content'] = this.state.dailyContent;

        axios.post(host+"/dailies",daily)
    }

    inputDaily(e: any) {
        this.setState({
            dailyContent: e.currentTarget.innerHTML
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="row">
                            <div className="form-group">
                                <div className="col-md-12">
                                    <div contentEditable='true' className='form-control' id='content' onInput={this.inputDaily}></div>
                                </div>
                                <div className="marginTop3 postButtom col-md-2 col-md-offset-10">
                                    <button type="button" className="btn btn-default pull-right" onClick={this.post}>發布</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;