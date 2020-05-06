import React from 'react'

interface DProps {
    content: string;
    createTime: string;
}

interface DState {

}

class Daily extends React.Component<DProps, DState>{
    constructor(props: DProps) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="row">
                            <div className="col-md-12">
                                <div id='content'>{this.props.content}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Daily;