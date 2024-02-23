import React from 'react';
import { Box, Typography, IconButton, Link, CardMedia } from '@mui/material';
import { Email, Facebook, Twitter, LinkedIn } from '@mui/icons-material';
const Contact = () => {
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
            <Typography variant="h3" gutterBottom>Contact Us</Typography>
            <Typography variant="body1" gutterBottom>
                Have a question or feedback? We'd love to hear from you!
                Reach out to us via email or through our social media channels.
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
export default Contact;