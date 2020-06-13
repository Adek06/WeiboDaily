import React from "react"
import {InputGroup, FormControl} from "react-bootstrap"

interface IProps {
    content: string;
    id: number;
    isDone: boolean;
}

interface IState {

}

class TodoItem extends React.Component<IProps, IState> {
    constructor(props: Readonly<IProps>) {
        super(props)
    }

    render() {
        return (
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Radio aria-label="Radio button for following text input"/>
                </InputGroup.Prepend>
                <FormControl aria-label="Text input with radio button"/>
            </InputGroup>
        )
    }
}

interface TProps {

}

interface TState {

}

class TodoList extends React.Component<TProps, TState> {
    constructor(props: Readonly<TProps>) {
        super(props)
    }

    render() {
        return (
            <TodoItem content="" id={1} isDone={true}/>
        )
    }
}