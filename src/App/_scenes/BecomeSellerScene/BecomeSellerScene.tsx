import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import { Header, Button, Grid, Form, Segment } from 'semantic-ui-react'
import { authBecomeSellerStartAction } from '../../../_brain/auth/_ducks/become-seller'
import Container from '../../_components/Container'
import AppMenu, { VerticalMargin } from '../../_components/AppMenu'
import MyButton from '../../_components/MyButton'

/*
 *      ______   ______   .___  ___. .______     ______   .__   __.  _______ .__   __. .___________.
 *     /      | /  __  \  |   \/   | |   _  \   /  __  \  |  \ |  | |   ____||  \ |  | |           |
 *    |  ,----'|  |  |  | |  \  /  | |  |_)  | |  |  |  | |   \|  | |  |__   |   \|  | `---|  |----`
 *    |  |     |  |  |  | |  |\/|  | |   ___/  |  |  |  | |  . `  | |   __|  |  . `  |     |  |
 *    |  `----.|  `--'  | |  |  |  | |  |      |  `--'  | |  |\   | |  |____ |  |\   |     |  |
 *     \______| \______/  |__|  |__| | _|       \______/  |__| \__| |_______||__| \__|     |__|
 */

class BecomeSellerScene extends Component<IProps, IState> {
    state: IState = {
        name: '',
        email: '',
        password: ''
    }

    submit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log(this.state)
        this.props.becomeSeller(this.state)
    }
    render() {
        return (
            <Wrapper>
                <Container>
                    <AppMenu />
                    <VerticalMargin size={150} />

                    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                        <Grid.Column style={{ width: 650 }}>
                            <Header as='h2' color='black' textAlign='center'>
                                Create a seller account
                            </Header>
                            <Form size='large' onSubmit={this.submit}>
                                <Segment>
                                    <Form.Input
                                        fluid
                                        icon='user'
                                        iconPosition='left'
                                        placeholder='Name'
                                        value={this.state.name}
                                        onChange={e => this.setState({ name: e.target.value })}
                                    />
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
                                        value={this.state.password}
                                        onChange={e => this.setState({ password: e.target.value })}
                                        type='password'
                                    />

                                    <Button color='black' fluid size='large' type='submit'>
                                        Become Seller
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
)(BecomeSellerScene)

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
            becomeSeller: authBecomeSellerStartAction
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
    becomeSeller: typeof authBecomeSellerStartAction
}

type IProps = IStateProps & IDispatchProps & IOwnProps

interface IState {
    name: string
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
