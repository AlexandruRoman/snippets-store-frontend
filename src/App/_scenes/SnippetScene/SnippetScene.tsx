import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import AppMenu, { HorizontalMargin, VerticalMargin } from '../../_components/AppMenu'
import Highlight from 'react-highlight'
import { getRandomSnippet } from '../../../_assets/snippets'
import { locationSelector } from '../../../_brain/router'
import { LocationState } from 'redux-first-router'
import { api } from '../../../_brain/_helpers/api'
import { authRoleSelector } from '../../../_brain/auth/auth'
import ImageSlider from '../../_components/ImageSlider'
import Tag from '../../_components/Tag'
import PreviewCode from '../../_components/PreviewCode'
import ButtonGroupSelect from '../../_components/ButtonGroupSelect'
import Comment from '../../_components/Comment'
import CommentInput from '../../_components/CommentInput'
import Container from '../../_components/Container'
import { HeaderContainer, SliderContainer, DataContainer } from '../TemplateScene/TemplateScene'
import { Icon } from 'semantic-ui-react'
import MyButton from '../../_components/MyButton'
import userIcon from '../../../_assets/icons/user.png'
/*
 *      ______   ______   .___  ___. .______     ______   .__   __.  _______ .__   __. .___________.
 *     /      | /  __  \  |   \/   | |   _  \   /  __  \  |  \ |  | |   ____||  \ |  | |           |
 *    |  ,----'|  |  |  | |  \  /  | |  |_)  | |  |  |  | |   \|  | |  |__   |   \|  | `---|  |----`
 *    |  |     |  |  |  | |  |\/|  | |   ___/  |  |  |  | |  . `  | |   __|  |  . `  |     |  |
 *    |  `----.|  `--'  | |  |  |  | |  |      |  `--'  | |  |\   | |  |____ |  |\   |     |  |
 *     \______| \______/  |__|  |__| | _|       \______/  |__| \__| |_______||__| \__|     |__|
 */

class SnippetScene extends Component<IProps, IState> {
    state: IState = {
        comments: [],
        isLoved: false,
        loves: 0,
        views: 0,
        snippet: {
            description: '',
            images: [],
            name: '',
            seller: '',
            tags: [],
            templateName: ''
        },
        code: '',
        preview: true,
        selectedTab: '0',
        commentInput: ''
    }
    addComment = async (id: string) => {
        const response = await api.post('snippet-comment/add', {
            idSnippet: id,
            text: this.state.commentInput
        })
        this.setState({ commentInput: '' })
        this.getComments(id)
    }
    getSnippet = async (id: string) => {
        const response = await api.get('snippet/' + id)
        console.log(response.data)
        this.setState({
            snippet: {
                images: response.data.images,
                name: response.data.name,
                description: response.data.description,
                seller: response.data.seller.user.name,
                templateName: response.data.template.name,
                tags: response.data.snippetTags.map((x: any) => x.name)
            },
            code: response.data.code
        })
    }
    getComments = async (id: string) => {
        const response = await api.get('snippet-comment/get-by-snippet/' + id)
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
        const response = await api.get('snippet-impression/get-counts-by-snippet/' + id)
        console.log(response.data)
        this.setState({ loves: response.data.loves, views: response.data.views })
    }
    view = async (id: string) => {
        await api.post('snippet-impression/view/' + id)
        this.getCounts(id)
    }
    love = async (id: string) => {
        await api.post('snippet-impression/love/' + id)
        this.isLoved(id)
        this.getCounts(id)
    }
    isLoved = async (id: string) => {
        const response = await api.get('snippet-impression/is-loved/' + id)
        this.setState({ isLoved: response.data })
    }
    componentDidMount() {
        const id = (this.props.location.payload as any).id
        this.getSnippet(id)
        this.getComments(id)
        this.getCounts(id)
        if (this.props.userRole == 'CLIENT') {
            this.view(id)
            this.isLoved(id)
        }
    }
    render() {
        const id = (this.props.location.payload as any).id
        const selectItems = [
            { key: '0', value: 'Description' },
            { key: '1', value: 'Comments (' + this.state.comments.length + ')' }
        ]
        return (
            <Wrapper>
                <Container>
                    <AppMenu />
                    <HeaderContainer>
                        <SliderContainer>
                            <ImageSlider images={this.state.snippet.images} />
                        </SliderContainer>
                        <DataContainer>
                            <div
                                style={{
                                    height: '100%',
                                    flexDirection: 'column',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <div>
                                    <div style={{ fontSize: '150%', display: 'flex', alignItems: 'baseline' }}>
                                        {this.state.snippet.name}{' '}
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
                                    {this.state.snippet.tags.map(x => (
                                        <Tag text={x} key={x} />
                                    ))}
                                </div>
                                <div />
                            </div>
                        </DataContainer>
                    </HeaderContainer>
                    <VerticalMargin size={48} />

                    <MyButton text='Description' isActive isFluid onClick={() => 0} />
                    <div style={{ display: 'flex', margin: '16px 0' }}>
                        <div style={{ width: '70%' }}>{this.state.snippet.description}</div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div>
                                <img src={userIcon} style={{ height: '60px' }} />
                            </div>
                            <HorizontalMargin size={10} />
                            <div>
                                <div style={{ fontSize: '120%' }}>{this.state.snippet.seller}</div>
                                <VerticalMargin size={5} />
                                <div>UX Designer</div>
                            </div>
                        </div>
                    </div>
                    <VerticalMargin size={48} />

                    <MyButton text={!this.state.preview ? 'Code' : 'Preview'} isActive isFluid onClick={() => 0} />
                    <PreviewCode
                        preview={this.state.preview}
                        code={this.state.code}
                        onChange={code => this.setState({ code })}
                    />
                    <VerticalMargin size={16} />
                    {(this.props.userRole == 'CLIENT' || this.props.userRole == 'STAFF') && (
                        <MyButton
                            text={this.state.preview ? 'Code' : 'Preview'}
                            onClick={() => this.setState({ preview: !this.state.preview })}
                        />
                    )}
                    <VerticalMargin size={48} />

                    <MyButton text='Comments' isActive isFluid onClick={() => 0} />
                    <VerticalMargin size={10} />

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
                </Container>
            </Wrapper>
        )
    }
}
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(SnippetScene)

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
    return bindActionCreators({}, dispatch)
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

interface IDispatchProps {}

type IProps = IStateProps & IDispatchProps & IOwnProps

interface ISnippet {
    name: string
    seller: string
    images: string[]
    description: string
    templateName: string
    tags: string[]
}
interface IComment {
    client: string
    text: string
}
interface IState {
    snippet: ISnippet
    views: number
    loves: number
    comments: IComment[]
    isLoved: boolean
    code: string
    preview: boolean
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
