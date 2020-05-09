import * as OSS from 'ali-oss'
import React from 'react'
import { Form } from 'react-bootstrap'
import axios from 'axios'
import {HOST, OSSInfo} from './Config'

// class FileList extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             fileList: props['fileList']
//         }
//     }

//     render(){
//         let filelist = this.props.fileList;
//         console.log(filelist)
//         let listHtml = filelist.map((file)=>
//             <li> {file.name} </li>
//         );

//         return(
//             <ul>{listHtml}</ul>
//         )
//     }
// }

class Oss extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            c:1,
            accessKeyId:'',
            accessKeySecret:'',
            stsToken:'',
        }
        this.upload = this.upload.bind(this)
        this.getSTS = this.getSTS.bind(this)
    }

    getSTS(){
        let self = this;
        axios.get(HOST+'/sts/getsts').then(function(res){
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

    upload(e){
        var self     = this;
        let file     = e.target.files[0];
        let fileName = file.name



        console.log(self.state.accessKeyId)

        let client = new OSS({
            region: OSSInfo.region,
            accessKeyId: self.state.accessKeyId,
            accessKeySecret: self.state.accessKeySecret,
            stsToken: self.state.stsToken,
            bucket: OSSInfo.bucket,
        })

        client.put(fileName, file).then(function(result){
            console.log(result)
            self.setState({
                imgUrl: result.url
            })
            self.props.setImg(result.url);
        });
    }

    render() {
        let showImg = null;
        if(this.state.imgUrl!=null){
            showImg = <img src={this.state.imgUrl} alt="ltu"/>
        }

        return (
            <Form>
                <Form.File label="上傳圖片" custom onChange={this.upload} onClick={this.getSTS}/>
            </Form>
        );
    }
}

export default Oss;