import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux'

function LikeDislike(props) {

    const user = useSelector(state => state.user)

    const [Likes, setLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [Dislikes, setDislikes] = useState(0)
    const [DislikeAction, setDislikeAction] = useState(null)

    let variable = {}
    if (props.video) {
        variable = { videoId: props.videoId, userId: props.userId }
    } else {
        variable = { commentId: props.commentId, userId: props.userId }
    }

    useEffect(() => {
        axios.post('/api/like/getLikes', variable)
            .then(response => {
                if (response.data.success) {
                    // 얼마나 많은 좋아요를 받았는지
                    setLikes(response.data.likes.length)
                    // 내가 이미 그 좋아요를 눌렀는지
                    response.data.likes.map(like => {
                        if (like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })
                } else {
                    alert('Likes에 정보를 가져오지 못했습니다.')
                }
            })
        axios.post('/api/like/getDislikes', variable)
            .then(response => {
                if (response.data.success) {
                    // 얼마나 많은 싫어요 받았는지
                    setDislikes(response.data.dislikes.length)
                    // 내가 이미 그 싫어요를 눌렀는지
                    response.data.dislikes.map(dislike => {
                        if (dislike.userId === props.userId) {
                            setDislikeAction('disliked')
                        }
                    })
                } else {
                    alert('DisLike에 대한 정보를 가져오지 못했습니다.')
                }
            })
    }, [])

    const onLike = () => {
        if(user.userData && !user.userData.isAuth) return alert('로그인을 먼저해 주세요.')
        if (LikeAction === null) {
            axios.post('/api/like/upLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes + 1)
                        setLikeAction('liked')
                        if (DislikeAction !== null) {
                            setDislikeAction(null)
                            setDislikes(Dislikes - 1)
                        }
                    } else {
                        alert('Like를 올리지 못하였습니다.')
                    }
                })
        } else {
            axios.post('/api/like/unLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes - 1)
                        setLikeAction(null)
                    } else {
                        alert('Like를 내리지 못하였습니다.')
                    }
                })
        }
    }

    const onDislike = () => {
        if(user.userData && !user.userData.isAuth) return alert('로그인을 먼저해 주세요.')
        if (DislikeAction !== null) {
            axios.post('/api/like/unDislike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(Dislikes - 1)
                        setDislikeAction(null)
                    } else {
                        alert('Dislike을 지우지 못했습니다.')
                    }
                })
        } else {
            axios.post('/api/like/upDislike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(Dislikes + 1)
                        setDislikeAction('disliked')
                        if (LikeAction !== null) {
                            setLikeAction(null)
                            setLikes(Likes - 1)
                        }
                    } else {
                        alert('Dislike을 지우지 못했습니다.')
                    }
                })
        }
    }

    return (
        <React.Fragment>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                        onClick={onLike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {Likes} </span>
            </span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike"
                        theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'}
                        onClick={onDislike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {Dislikes} </span>
            </span>
        </React.Fragment>
    )
}

export default LikeDislike
