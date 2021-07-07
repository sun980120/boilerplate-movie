import React from 'react'
import { Descriptions, Badge } from 'antd'

function MovieInfo(props) {
    let {movie} = props;
    return (
        <Descriptions title="Movie Info" bordered>
            <Descriptions.Item label="Title">{movie.original_title}</Descriptions.Item>
            <Descriptions.Item label="release_data">{movie.release_data}</Descriptions.Item>
            <Descriptions.Item label="revenue">{movie.revenue}</Descriptions.Item>
            <Descriptions.Item label="runtime">{movie.runtime}</Descriptions.Item>
            <Descriptions.Item label="vote_average" span={2}>{movie.vote_average}</Descriptions.Item>
            <Descriptions.Item label="vote_content">{movie.vote_content}</Descriptions.Item>
            <Descriptions.Item label="status">{movie.status}</Descriptions.Item>
            <Descriptions.Item label="popularity">{movie.popularity}</Descriptions.Item>
        </Descriptions>
    )
}

export default MovieInfo
