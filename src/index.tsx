import React from 'react';
import ReactDOM from 'react-dom';
import Post from './Post';
import Daily from './Daily';
import {HOST} from './Config';
import axios from 'axios';
import './index.css'
import 'bulma/css/bulma.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

interface IProps {

}

interface DailyInterface {
    content: string;
    imgUrl: string;
    id: number;
    created_at: string;
}

interface IState {
    dailyList: Array<DailyInterface>;
}

class Index extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            dailyList: []
        }
        this.isPC = this.isPC.bind(this)
        this.getDailies = this.getDailies.bind(this)
        this.getDailies()
    }

    getDailies() {
        let that = this;
        axios.get(HOST + '/dailies').then(function (res) {
            let data = res.data;
            console.log(data)
            that.setState({
                dailyList: data
            })
        })
    }

    isPC() { //是否为PC端
        let userAgentInfo = navigator.userAgent;
        let Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        let flag = true;
        for (let v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    render() {
        let dailyList = this.state.dailyList;
        if (dailyList[0] === undefined) {

        } else {
            console.log(dailyList[0].id)
        }

        let column_size;
        if (this.isPC()) {
            column_size = "is-4 is-offset-4"
        } else {
            column_size = "is-10 is-offset-1"
        }

        return (
            <div className="container">
                <div className="marginTop10 columns is-mobile">
                    <div className={"column " + column_size}>
                        <div className="marginTop3">
                            <Post getDailies={this.getDailies}/>
                        </div>
                        <div style={{marginTop: 30}}>
                            {dailyList.map((i, index) => (
                                <div style={{marginTop: 10}}>
                                    <Daily key={index} iid={i.id.toString()} content={i['content']} imgUrl={i.imgUrl}
                                           createTime={i['created_at']} getDailies={this.getDailies}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Index/>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
