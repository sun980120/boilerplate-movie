import React from 'react'
import { Descriptions, Badge } from 'antd'

function MovieInfo(props) {
    let {movie} = props;

    var runtimeHH = Math.floor(movie.runtime / 60);
    var runtimeMM = movie.runtime - (runtimeHH*60);

    var release = false;

    if(movie.status === 'Released'){
        release = true
    }

    return (
        <Descriptions title="영화정보" bordered>
            <Descriptions.Item label="제목">{movie.original_title}</Descriptions.Item>
            <Descriptions.Item label="개봉일">{movie.release_date}</Descriptions.Item>
            <Descriptions.Item label="수익">{movie.revenue}</Descriptions.Item>
            <Descriptions.Item label="런타임">{runtimeHH}시간 {runtimeMM}분</Descriptions.Item>
            <Descriptions.Item label="평점" span={2}>{movie.vote_average}</Descriptions.Item>
            <Descriptions.Item label="평점준 인원">{movie.vote_count}명</Descriptions.Item>
            <Descriptions.Item label="status">{release?"개봉":"미개봉"}</Descriptions.Item>
            <Descriptions.Item label="popularity">{movie.popularity}</Descriptions.Item>
        </Descriptions>
    )
}

export default MovieInfo
