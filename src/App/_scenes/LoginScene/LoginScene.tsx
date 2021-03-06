import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Grid, Header, Form, Segment, Button } from 'semantic-ui-react'
import { authLoginStartAction } from '../../../_brain/auth/_ducks/login'
import AppMenu, { VerticalMargin } from '../../_components/AppMenu'
import Container from '../../_components/Container'

/*
 *      ______   ______   .___  ___. .______     ______   .__   __.  _______ .__   __. .___________.
 *     /      | /  __  \  |   \/   | |   _  \   /  __  \  |  \ |  | |   ____||  \ |  | |           |
 *    |  ,----'|  |  |  | |  \  /  | |  |_)  | |  |  |  | |   \|  | |  |__   |   \|  | `---|  |----`
 *    |  |     |  |  |  | |  |\/|  | |   ___/  |  |  |  | |  . `  | |   __|  |  . `  |     |  |
 *    |  `----.|  `--'  | |  |  |  | |  |      |  `--'  | |  |\   | |  |____ |  |\   |     |  |
 *     \______| \______/  |__|  |__| | _|       \______/  |__| \__| |_______||__| \__|     |__|
 */

class LoginScene extends Component<IProps, IState> {
    state: IState = {
        email: '',
        password: ''
    }

    submit = (e: React.FormEvent<HTMLFormElement>) => {
        this.props.login({ email: this.state.email, password: this.state.password })
    }
    render() {
        return (
            <Wrapper>
                <Container>
                    <AppMenu />
                    <VerticalMargin size={150} />
                    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 650 }}>
                            <Header as='h2' color='black' textAlign='center'>
                                Login into your account
                            </Header>
                            <Form size='large' onSubmit={this.submit}>
                                <Segment>
                                    <Form.Input
                                        fluid
                                        icon='mail'
                                        iconPosition='left'
                                        placeholder='E-mail address'
                                        value={this.state.email}
                                        onChange={e => this.setState({ email: e.target.value })}
                                    />
                                    <Form.Input
                                        fluid
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='Password'
                                        type='password'
                                        value={this.state.password}
                                        onChange={e => this.setState({ password: e.target.value })}
                                    />

                                    <Button type='submit' color='black' fluid size='large'>
                                        Login
                                    </Button>
                                </Segment>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </Container>
            </Wrapper>
        )
    }
}
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(LoginScene)

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
    return bindActionCreators({ login: authLoginStartAction }, dispatch)
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
    login: typeof authLoginStartAction
}

type IProps = IStateProps & IDispatchProps & IOwnProps

interface IState {
    email: string
    password: string
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
