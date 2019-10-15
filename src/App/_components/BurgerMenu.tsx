import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import Popper from '@material-ui/core/Popper'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import { Icon } from 'semantic-ui-react'
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

export default class BurgerMenu extends Component<IProps, IState> {
    state: IState = {
        anchorEl: null
    }
    render() {
        const id = this.state.anchorEl != null ? 'simple-popper' : undefined
        return (
            <Wrapper>
                <Icon
                    onClick={(e: any) => this.setState({ anchorEl: this.state.anchorEl ? null : e.currentTarget })}
                    name='bars'
                    size='big'
                    style={{ cursor: 'pointer' }}
                />
                <Popper id={id} open={this.state.anchorEl != null} anchorEl={this.state.anchorEl} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper>
                                <MenuContainer>
                                    {this.props.items.map(item => (
                                        <Fragment key={item.text}>
                                            <MyButton isFluid text={item.text} onClick={item.action} />
                                            <VerticalMargin size={4} />
                                        </Fragment>
                                    ))}
                                </MenuContainer>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </Wrapper>
        )
    }
}

/*
 *    .___________.____    ____ .______    _______     _______.
 *    |           |\   \  /   / |   _  \  |   ____|   /       |
 *    `---|  |----` \   \/   /  |  |_)  | |  |__     |   (----`
 *        |  |       \_    _/   |   ___/  |   __|     \   \
 *        |  |         |  |     |  |      |  |____.----)   |
 *        |__|         |__|     | _|      |_______|_______/
 */

export interface IBurgerMenuItem {
    text: string
    action: () => void
}
interface IProps {
    items: IBurgerMenuItem[]
}

interface IState {
    anchorEl: HTMLElement | null
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

const MenuContainer = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 16px;
`
