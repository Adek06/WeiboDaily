import React from 'react';
import ReactDOM from 'react-dom';
import Post from './Post';
import Daily from './Daily';
import HOST from './Config';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap';

interface IProps{

}

interface DailyInterface{
  content: string;
  id: number;
  created_at: string;
}

interface IState{
  dailyList: Array<DailyInterface>;
}

class Index extends React.Component<IProps, IState>{
    constructor(props:IProps){
      super(props)
      this.state = {
        dailyList:[]
      }
      this.getDailies = this.getDailies.bind(this)
      this.getDailies()
    }

    getDailies(){
      let that = this;
      axios.get(HOST+'/dailies/all').then(function(res){
        let data = res.data;
        console.log(data)
        that.setState({
            dailyList : data
        })
      })
    }

    render(){
      let dailyList = this.state.dailyList;
      if(dailyList[0]==undefined){

      }else{
        console.log(dailyList[0].id)
      }
      return(
        <Container>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <div>我的小日記</div>
              <Post getDailies={this.getDailies} />
              {dailyList.map((i,index)=>(
                <div style={{marginTop: 5}}>
                  <Daily key={index} iid={i.id.toString()} content={i['content']} createTime={i['created_at']} getDailies={this.getDailies}/>
                </div>
              ))}
            </Col>
          </Row>    
        </Container>
      )
    }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
