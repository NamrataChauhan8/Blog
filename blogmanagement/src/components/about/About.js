import React from 'react';
import { Box, Typography, IconButton, Link, CardMedia } from '@mui/material';
import { Email, Facebook, Twitter, LinkedIn } from '@mui/icons-material';
const About = () => {
    return (
        <Box>
            <Box
                height={300}
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor="lightblue"
                marginBottom={4}
            >
                <CardMedia
                    style={{ width: '100%', height: '100%', objectFit: 'cover'}}
                />
                <Typography variant="h3" color="white" align="center">Welcome to  BlogNest</Typography>
            </Box>
            {/* About Content */}
            <Typography variant="h3" gutterBottom>About Us</Typography>
            <Typography variant="body1" gutterBottom>
                Welcome to our blog! We are passionate about blog writing, covering topics such as sports, music, fashion, technology, and more. Our mission is to provide valuable content to our readers and create a community where people can learn, share ideas, and connect with others who share their interests.
            </Typography>
            <Typography variant="body1" gutterBottom>
                We strive to deliver high-quality articles, tutorials, and resources that inspire and educate our audience.
            </Typography>
            <Typography variant="body1" gutterBottom>
                Whether you're a student, an experienced developer, or simply curious about technology, fashion, sports, etc., we hope you find our blog helpful and informative. Thank you for visiting, and don't hesitate to subscribe to our newsletter for updates.
            </Typography>
            {/* Social Media Icons */}
            <Box mt={3}>
                <IconButton component={Link} href="mailto:namratac@zignuts.com">
                    <Email />
                </IconButton>
                <IconButton component={Link} href="#">
                    <Facebook />
                </IconButton>
                <IconButton component={Link} href="#">
                    <Twitter />
                </IconButton>
                <IconButton component={Link} href="#">
                    <LinkedIn />
                </IconButton>
            </Box>
            {/* Contact Information */}
            <Typography variant="body1" mt={2}>
                For inquiries or collaborations, you can reach us at <Link href="mailto:namratac@zignuts.com">namratac@zignuts.com</Link>.
            </Typography>
        </Box>
    );
}
export default About;