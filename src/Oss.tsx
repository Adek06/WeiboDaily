import OSS from 'ali-oss'
import React from 'react'
import {Form} from 'react-bootstrap'

interface OProps {
    accessKeyId: string;
    accessKeySecret: string;
    stsToken?: string;
    region: string;
    bucket: string;
    callback: any;
    labelStr?: string;
}

interface OState {
    imgUrl: string;
}

class Oss extends React.Component<OProps, OState> {
    constructor(props: Readonly<OProps>) {
        super(props);
        this.state = {
            imgUrl: ""
        }
        this.upload = this.upload.bind(this)
    }

    static defaultProps = {
        labelStr: "上传图片",
    };

    upload(e: any) {
        let client;
        let self = this;
        let file = e.target.files[0];
        let fileName = file.name

        if (self.props.stsToken) {
            client = new OSS({
                region: self.props.region,
                accessKeyId: self.props.accessKeyId,
                accessKeySecret: self.props.accessKeySecret,
                stsToken: self.props.stsToken,
                bucket: self.props.bucket,
            });
        } else {
            client = new OSS({
                region: self.props.region,
                accessKeyId: self.props.accessKeyId,
                accessKeySecret: self.props.accessKeySecret,
                bucket: self.props.bucket,
            });
        }

        client.multipartUpload(fileName, file, {
            progress: function (p, checkPoint) {
                console.log(p)
                let obj = {
                    fileName: fileName,
                    url: "",
                    progressbar: p * 100
                }
                self.props.callback(obj)
            },
        }).then(function (res: any) {
            // console.log(res)
            let obj = {
                fileName: fileName,
                url: res.res.requestUrls[0].split("?")[0],
                progressbar: 100
            }
            self.setState({
                imgUrl: obj.url
            })
            self.props.callback(obj)
        })
    }

    render() {
        return (
            <Form>
                <Form.File label={this.props.labelStr} custom onChange={this.upload}/>
            </Form>
        );
    }
}

export default Oss;