import OSS from 'ali-oss'
import React from 'react'

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
            progress: function (p) {
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
            <div className="file">
                <label className="file-label">
                    <input className="file-input" type="file" name="resume" onChange={this.upload}/>
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload" />
                  </span>
                  <span className="file-label">
                    Choose a file…
                  </span>
                </span>
                </label>
            </div>
        );
    }
}

export default Oss;