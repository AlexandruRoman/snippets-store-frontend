import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import AppMenu, { HorizontalMargin, VerticalMargin } from '../../_components/AppMenu'
import { locationSelector, gotoSnippetAction } from '../../../_brain/router'
import { LocationState } from 'redux-first-router'
import { api } from '../../../_brain/_helpers/api'
import SnippetSquareCard, { ISnippetSquareProps } from '../../_components/SnippetSquareCard'
import { authRoleSelector } from '../../../_brain/auth/auth'
import ImageSlider from '../../_components/ImageSlider'
import Tag from '../../_components/Tag'
import ButtonGroupSelect from '../../_components/ButtonGroupSelect'
import Comment from '../../_components/Comment'
import CommentInput from '../../_components/CommentInput'
import Container from '../../_components/Container'
import SquareCardList from '../../_components/SquareCardList'
import { Icon, Image } from 'semantic-ui-react'
import userIcon from '../../../_assets/icons/user.png'
/*
 *      ______   ______   .___  ___. .______     ______   .__   __.  _______ .__   __. .___________.
 *     /      | /  __  \  |   \/   | |   _  \   /  __  \  |  \ |  | |   ____||  \ |  | |           |
 *    |  ,----'|  |  |  | |  \  /  | |  |_)  | |  |  |  | |   \|  | |  |__   |   \|  | `---|  |----`
 *    |  |     |  |  |  | |  |\/|  | |   ___/  |  |  |  | |  . `  | |   __|  |  . `  |     |  |
 *    |  `----.|  `--'  | |  |  |  | |  |      |  `--'  | |  |\   | |  |____ |  |\   |     |  |
 *     \______| \______/  |__|  |__| | _|       \______/  |__| \__| |_______||__| \__|     |__|
 */

class TemplateScene extends Component<IProps, IState> {
    state: IState = {
        comments: [],
        isLoved: false,
        loves: 0,
        views: 0,
        snippets: [],
        template: {
            description: '',
            images: [],
            name: '',
            seller: '',
            tags: []
        },
        selectedTab: '0',
        commentInput: ''
    }
    addComment = async (id: string) => {
        const response = await api.post('template-comment/add', {
            idTemplate: id,
            text: this.state.commentInput
        })
        this.setState({ commentInput: '' })
        this.getComments(id)
    }
    getTemplate = async (id: string) => {
        const response = await api.get('template/' + id)
        console.log(response.data)
        this.setState({
            template: {
                images: response.data.images,
                name: response.data.name,
                description: response.data.description,
                seller: response.data.seller.user.name,
                tags: response.data.templateTags.map((x: any) => x.name)
            }
        })
    }
    getComments = async (id: string) => {
        const response = await api.get('template-comment/get-by-template/' + id)
        console.log(response.data)
        this.setState({
            comments: response.data.map((x: any) => {
                return {
                    text: x.text,
                    client: x.client.user.name
                }
            })
        })
    }
    getCounts = async (id: String) => {
        const response = await api.get('template-impression/get-counts-by-template/' + id)
        console.log(response.data)
        this.setState({ loves: response.data.loves, views: response.data.views })
    }
    getSnippets = async (id: string) => {
        const response = await api.get('snippet/get-by-template/' + id)
        console.log(response.data)
        this.setState({
            snippets: response.data.map((snippet: any) => {
                return {
                    img: snippet.images[0] ? snippet.images[0] : '',
                    name: snippet.name,
                    onClick: () => this.props.gotoSnippet(snippet._id)
                }
            })
        })
    }
    view = async (id: string) => {
        await api.post('template-impression/view/' + id)
        this.getCounts(id)
    }
    love = async (id: string) => {
        await api.post('template-impression/love/' + id)
        this.isLoved(id)
        this.getCounts(id)
    }
    isLoved = async (id: string) => {
        const response = await api.get('template-impression/is-loved/' + id)
        this.setState({ isLoved: response.data })
    }
    componentDidMount() {
        const id = (this.props.location.payload as any).id
        this.getTemplate(id)
        this.getComments(id)
        this.getCounts(id)
        this.getSnippets(id)
        if (this.props.userRole == 'CLIENT') {
            this.view(id)
            this.isLoved(id)
        }
    }
    render() {
        const id = (this.props.location.payload as any).id
        const selectItems = [
            { key: '0', value: 'Description' },
            { key: '1', value: 'Snippets' },
            { key: '2', value: 'Comments (' + this.state.comments.length + ')' }
        ]
        return (
            <Wrapper>
                <Container>
                    <AppMenu />
                    <HeaderContainer>
                        <SliderContainer>
                            <ImageSlider images={this.state.template.images} />
                        </SliderContainer>
                        <DataContainer>
                            <div style={{ fontSize: '150%', display: 'flex', alignItems: 'center' }}>
                                {this.state.template.name}{' '}
                                {this.props.userRole == 'CLIENT' && (
                                    <Icon
                                        style={{ fontSize: '120%', cursor: 'pointer', marginLeft: '16px' }}
                                        onClick={() => this.love(id)}
                                        name={this.state.isLoved ? 'heart' : 'heart outline'}
                                    />
                                )}
                            </div>
                            <div style={{ display: 'flex', marginTop: '16px' }}>
                                <div>
                                    <Icon name='eye' />
                                    {this.state.views}
                                </div>
                                <HorizontalMargin size={8} />
                                <div>
                                    <Icon name='heart' />
                                    {this.state.loves}
                                </div>
                            </div>
                            <VerticalMargin size={16} />
                            {this.state.template.tags.map(x => (
                                <Tag text={x} key={x} />
                            ))}
                        </DataContainer>
                    </HeaderContainer>
                    <VerticalMargin size={32} />
                    <ButtonGroupSelect
                        items={selectItems}
                        selected={this.state.selectedTab}
                        onChange={x => this.setState({ selectedTab: x })}
                    />
                    <VerticalMargin size={16} />

                    {this.state.selectedTab == '0' && (
                        <div style={{ display: 'flex' }}>
                            <div style={{ width: '70%' }}>{this.state.template.description}</div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div>
                                    <img src={userIcon} style={{ height: '60px' }} />
                                </div>
                                <HorizontalMargin size={10} />
                                <div>
                                    <div style={{ fontSize: '120%' }}>{this.state.template.seller}</div>
                                    <VerticalMargin size={5} />
                                    <div>UX Designer</div>
                                </div>
                            </div>
                        </div>
                    )}
                    {this.state.selectedTab == '1' && (
                        <div>
                            <SquareCardList items={this.state.snippets} />
                        </div>
                    )}
                    {this.state.selectedTab == '2' && (
                        <div>
                            <CommentInput
                                onChange={x => this.setState({ commentInput: x })}
                                value={this.state.commentInput}
                                onClick={() => this.addComment(id)}
                            />
                            <VerticalMargin size={10} />

                            {this.state.comments.map(x => (
                                <Fragment key={x.text}>
                                    <VerticalMargin size={10} />
                                    <Comment text={x.text} author={x.client} />
                                </Fragment>
                            ))}
                        </div>
                    )}
                    <VerticalMargin size={48} />
                </Container>
            </Wrapper>
        )
    }
}
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(TemplateScene)

/*
 *    .______    _______  _______   __    __  ___   ___
 *    |   _  \  |   ____||       \ |  |  |  | \  \ /  /
 *    |  |_)  | |  |__   |  .--.  ||  |  |  |  \  V  /
 *    |      /  |   __|  |  |  |  ||  |  |  |   >   <
 *    |  |\  \-.|  |____ |  '--'  ||  `--'  |  /  .  \
 *    | _| `.__||_______||_______/  \______/  /__/ \__\
 */

function mapStateToProps(state: any, ownProps: IOwnProps): IStateProps {
    return {
        location: locationSelector(state),
        userRole: authRoleSelector(state)
    }
}

function mapDispatchToProps(dispatch: any, ownProps: IOwnProps): IDispatchProps {
    return bindActionCreators(
        {
            gotoSnippet: gotoSnippetAction
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

interface IStateProps {
    location: LocationState
    userRole: string
}

interface IDispatchProps {
    gotoSnippet: typeof gotoSnippetAction
}

type IProps = IStateProps & IDispatchProps & IOwnProps

interface ITemplate {
    name: string
    seller: string
    images: string[]
    description: string
    tags: string[]
}
interface IComment {
    client: string
    text: string
}
interface IState {
    template: ITemplate
    views: number
    loves: number
    comments: IComment[]
    snippets: ISnippetSquareProps[]
    isLoved: boolean
    selectedTab: string
    commentInput: string
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

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
export const SliderContainer = styled.div`
    width: 60%;
    height: 100%;
`

export const DataContainer = styled.div`
    width: 38%;
`
