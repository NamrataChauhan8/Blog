
import { styled, Box, Typography } from '@mui/material';

const Image = styled(Box)`
    width: 100%;
    background: url(https://img.freepik.com/free-photo/high-angle-desktop-with-laptop-copy-space_23-2148430882.jpg?w=1480&t=st=1708666835~exp=1708667435~hmac=82f448b22f0a5eb109775987cf48ba842b8e7ae61e78ca67fb9ae48cdaae51c6) center/55% repeat-x #000;
    background-repeat:no-repeat;
    background-size: cover;
    object-fit: cover;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Heading = styled(Typography)`
    font-size: 70px;
    color: #FFFFFF;
    line-height: 1
`;

const SubHeading = styled(Typography)`
    font-size: 20px;
    background: #FFFFFF;
`;

const Banner = () => {
    
    return (
        <Image>
            <Heading>BLOG</Heading>
            <SubHeading>BlogNest</SubHeading>
        </Image>
    )
}

export default Banner;