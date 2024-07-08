import styled from 'styled-components'

export const BackgroundImgContainer = styled.div`
background-image:url(${props => props.bgUrl});
width:100%;
background-size:cover;
border-top-right-radius:20px;
border-bottom-right-radius:20px;

`
