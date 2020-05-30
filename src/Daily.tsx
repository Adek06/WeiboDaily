import React from 'react'
import axios from 'axios'
import './Daily.css'
import {HOST} from './Config';

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
    isActiveDropdown: boolean;
}

class Daily extends React.Component<DProps, DState> {
    constructor(props: DProps) {
        super(props)
        this.state = {
            isActiveDropdown: false
        }
        console.log(this.props.iid)
        this.delDaily = this.delDaily.bind(this)
        this.activeDropdown = this.activeDropdown.bind(this)
    }

    delDaily() {
        let that = this;
        axios.delete(HOST + '/dailies/' + that.props.iid).then(function () {
            that.props.getDailies();
        })
    }

    activeDropdown() {
        let self = this;
        let isActiveDropdown = self.state.isActiveDropdown
        self.setState({
            isActiveDropdown: !isActiveDropdown
        })
    }

    render() {
        let img = null;
        if (this.props.imgUrl !== "") {
            img = <img alt={this.props.imgUrl} src={this.props.imgUrl}/>
        }
        return (
            <div className="dailyBlock">
                <div className="column is-12">
                    <div className="level">
                        <div className="level-left">
                            <div className="level-item">
                                {this.props.createTime}
                            </div>
                        </div>
                        <div className="level-right">
                            <div className="level-item">
                                <div className={"dropdown " + (this.state.isActiveDropdown? "is-active": "") }  onClick={this.activeDropdown}>
                                    <div className="dropdown-trigger">
                                        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                            <span>编辑</span>
                                            <span className="icon is-small">
                                                <i className="fas fa-angle-down" aria-hidden="true" />
                                            </span>
                                        </button>
                                    </div>
                                    <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                        <div className="dropdown-content">
                                            <a href="#" className="dropdown-item">
                                                编辑
                                            </a>
                                            <hr className="dropdown-divider"/>
                                            <a onClick={this.delDaily} className="dropdown-item">
                                                删除
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>{this.props.content}</div>
                    {img}
                </div>
            </div>
        )
    }
}

export default Daily;