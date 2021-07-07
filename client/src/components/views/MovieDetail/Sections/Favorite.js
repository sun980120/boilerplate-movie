import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Button} from 'antd'
import { useSelector } from 'react-redux';

function Favorite(props) {
    const user = useSelector(state => state.user)

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    let variable = {
        userFrom:userFrom,
        movieId:movieId,
        movieTitle:movieTitle,
        moviePost:moviePost,
        movieRunTime:movieRunTime
    }
    console.log(variable)

    useEffect(() => {
        axios.post('/api/favorite/favoriteNumber',variable)
        .then(response=>{
            if(response.data.success){
                setFavoriteNumber(response.data.favoriteNumber)
            } else {
                alert('숫자 정보를 가져오는데 실패했습니다.')
            }
        })
        axios.post('/api/favorite/favorited',variable)
        .then(response=>{
            if(response.data.success){
                setFavorited(response.data.favorited)
            } else {
                alert('정보를 가져오는데 실패했습니다.')
            }
        })
    }, [])

    const onClickFavorite = () => {
        if (user.userData && !user.userData.isAuth) {
            return alert('로그인을 먼저 해주세요.');
        }
        if(Favorited){
            axios.post('/api/favorite/removeFromFavorite',variable)
            .then(response=>{
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber - 1)
                    setFavorited(!Favorited)
                } else {
                    alert('Favorite 리스트에서 지우는 걸 실패했습니다.')
                }
            })
        } else {
            axios.post('/api/favorite/addToFavorite',variable)
            .then(response=>{
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber + 1)
                    setFavorited(!Favorited)
                } else {
                    alert('Favorite 리스트에서 추가하는 걸 실패했습니다.')
                }
            })
        }
    }

    return (
        <div>
             <Button onClick={onClickFavorite}>{Favorited?"Not Favorite":"Add to Favorite"} {FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite
