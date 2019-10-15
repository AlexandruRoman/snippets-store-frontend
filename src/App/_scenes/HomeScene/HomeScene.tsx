import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import { Header, Button } from 'semantic-ui-react'
import AppMenu, { VerticalMargin } from '../../_components/AppMenu'
import Container from '../../_components/Container'
import ActionBox from '../../_components/ActionBox'
import { gotoBrowseTemplatesAction, gotoBrowseSnippetsAction } from '../../../_brain/router'
import templateIcon from '../../../_assets/icons/template-white.png'
import snippetIcon from '../../../_assets/icons/snippet-black.png'
/*
 *      ______   ______   .___  ___. .______     ______   .__   __.  _______ .__   __. .___________.
 *     /      | /  __  \  |   \/   | |   _  \   /  __  \  |  \ |  | |   ____||  \ |  | |           |
 *    |  ,----'|  |  |  | |  \  /  | |  |_)  | |  |  |  | |   \|  | |  |__   |   \|  | `---|  |----`
 *    |  |     |  |  |  | |  |\/|  | |   ___/  |  |  |  | |  . `  | |   __|  |  . `  |     |  |
 *    |  `----.|  `--'  | |  |  |  | |  |      |  `--'  | |  |\   | |  |____ |  |\   |     |  |
 *     \______| \______/  |__|  |__| | _|       \______/  |__| \__| |_______||__| \__|     |__|
 */

class HomeScene extends Component<IProps, IState> {
    render() {
        return (
            <Wrapper>
                <Container>
                    <AppMenu />
                    <Content>
                        <Header style={{ fontSize: '200%' }}>Let us help you build your next vision.</Header>
                        <Header style={{ fontSize: '100%', fontWeight: '400', marginTop: '-10px' }}>
                            Find all the resources you need for your app
                        </Header>
                        <VerticalMargin size={16} />
                        <BoxContainer>
                            <Box>
                                <ActionBox
                                    onClick={this.props.gotoBrowseTemplates}
                                    text='TEMPLATES'
                                    isActive
                                    icon={templateIcon}
                                />
                            </Box>
                            <Box>
                                <ActionBox onClick={this.props.gotoBrowseSnippets} text='SNIPPETS' icon={snippetIcon} />
                            </Box>
                        </BoxContainer>
                    </Content>
                </Container>
            </Wrapper>
        )
    }
}
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(HomeScene)

/*
 *    .______    _______  _______   __    __  ___   ___
 *    |   _  \  |   ____||       \ |  |  |  | \  \ /  /
 *    |  |_)  | |  |__   |  .--.  ||  |  |  |  \  V  /
 *    |      /  |   __|  |  |  |  ||  |  |  |   >   <
 *    |  |\  \-.|  |____ |  '--'  ||  `--'  |  /  .  \
 *    | _| `.__||_______||_______/  \______/  /__/ \__\
 */

function mapStateToProps(state: any, ownProps: IOwnProps): IStateProps {
    return {}
}

function mapDispatchToProps(dispatch: any, ownProps: IOwnProps): IDispatchProps {
    return bindActionCreators(
        {
            gotoBrowseTemplates: gotoBrowseTemplatesAction,
            gotoBrowseSnippets: gotoBrowseSnippetsAction
        },
        dispatch
    )
}

/*
 *    .___________.____    ____ .______    _______     _______.
 *    |           |\   \  /   / |   _  \  |   ____|   /       |
 *    `---|  |----` \   \/   /  |  |_)  | |  |__     |   (----`
 *        |  |       \_    _/   |   ___/  |   __|     \   \
 *        |  |         |  |     |  |      |  |____.----)   |
 *        |__|         |__|     | _|      |_______|_______/
 */

interface IOwnProps {}

interface IStateProps {}

interface IDispatchProps {
    gotoBrowseTemplates: typeof gotoBrowseTemplatesAction
    gotoBrowseSnippets: typeof gotoBrowseSnippetsAction
}

type IProps = IStateProps & IDispatchProps & IOwnProps

interface IState {}

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

const Content = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 200px 15%;
`

const BoxContainer = styled.div`
    width: 100%;
    display: flex;
`
const Box = styled.div`
    width: 100%;
    margin: 10px;
`
