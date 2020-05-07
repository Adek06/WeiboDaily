import * as OSS from 'ali-oss'
import React from 'react'
import { Form } from 'react-bootstrap'

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
            c:1
        }
        this.upload = this.upload.bind(this)
    }

    upload(e){
        var self     = this;
        let file     = e.target.files[0];
        let fileName = file.name

        let client = new OSS({
            region: 'oss-cn-beijing',
            accessKeyId:'LTAI4GGGUTkxCyEoPfWGcyuA',
            accessKeySecret:'IGtzDrcwkgJtf6bZZe752O2eoH5QCt',
            bucket: 'adek06game',
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
                <Form.File label="上傳圖片" custom onChange={this.upload}/>
            </Form>
        );
    }
}

export default Oss;