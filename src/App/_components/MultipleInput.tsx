import React, { SFC } from 'react'
import styled from 'styled-components'
import { Input, Button, Icon } from 'semantic-ui-react'
import MyButton from './MyButton'
import { VerticalMargin } from './AppMenu'

/*
 *      ______   ______   .___  ___. .______     ______   .__   __.  _______ .__   __. .___________.
 *     /      | /  __  \  |   \/   | |   _  \   /  __  \  |  \ |  | |   ____||  \ |  | |           |
 *    |  ,----'|  |  |  | |  \  /  | |  |_)  | |  |  |  | |   \|  | |  |__   |   \|  | `---|  |----`
 *    |  |     |  |  |  | |  |\/|  | |   ___/  |  |  |  | |  . `  | |   __|  |  . `  |     |  |
 *    |  `----.|  `--'  | |  |  |  | |  |      |  `--'  | |  |\   | |  |____ |  |\   |     |  |
 *     \______| \______/  |__|  |__| | _|       \______/  |__| \__| |_______||__| \__|     |__|
 */

const MultipleInput: SFC<IProps> = props => {
    const inputChanged = (i: number, value: string) => {
        let items = props.items
        items[i] = value
        props.onChange(items)
    }
    const addItem = () => {
        let items = props.items
        items.push('')
        props.onChange(items)
        console.log(items)
    }
    const deleteItem = (i: number) => {
        let items = props.items.filter((x, index) => i != index)
        if (items.length <= 0) return
        props.onChange(items)
    }
    return (
        <Wrapper>
            <MyButton onClick={() => addItem()} text='Add Image' />
            <VerticalMargin size={16} />
            {props.items.map((x, i) => (
                <div key={i}>
                    <Input
                        label={
                            <Button icon color='red' onClick={() => deleteItem(i)}>
                                <Icon name='trash alternate' />
                            </Button>
                        }
                        labelPosition='right'
                        type='text'
                        onChange={e => inputChanged(i, e.target.value)}
                        value={x}
                        placeholder='Type...'
                        fluid={false}
                    />
                    <VerticalMargin size={8} />
                </div>
            ))}
        </Wrapper>
    )
}
export default MultipleInput

/*
 *    .___________.____    ____ .______    _______     _______.
 *    |           |\   \  /   / |   _  \  |   ____|   /       |
 *    `---|  |----` \   \/   /  |  |_)  | |  |__     |   (----`
 *        |  |       \_    _/   |   ___/  |   __|     \   \
 *        |  |         |  |     |  |      |  |____.----)   |
 *        |__|         |__|     | _|      |_______|_______/
 */

interface IProps {
    items: string[]
    onChange: (items: string[]) => void
}

/*
 *         _______.___________.____    ____  __       _______
 *        /       |           |\   \  /   / |  |     |   ____|
 *       |   (----`---|  |----` \   \/   /  |  |     |  |__
 *        \   \       |  |       \_    _/   |  |     |   __|
 *    .----)   |      |  |         |  |     |  `----.|  |____
 *    |_______/       |__|         |__|     |_______||_______|
 */

interface IWrapperProps {}
const Wrapper = styled.div<IWrapperProps>``
