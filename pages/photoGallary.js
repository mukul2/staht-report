import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { collection, deleteDoc, doc, DocumentData, getDocs, limit, query, QueryDocumentSnapshot, updateDoc, where  ,getDoc} from "@firebase/firestore";
import { useEffect, useState } from 'react';
import {getFirestore} from "firebase/firestore";
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 0,
    p: 0,
};

export default function QuiltedImageList({attachmentsArray}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <ImageList sx={{ width: 582, }}  rowHeight={164}   variant="quilted"
                   cols={4}>
            {attachmentsArray.map((item) => (
                <ImageListItem key={item.link} onClick={handleOpen}>
                    <img
                        src={`${item.link}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.link}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}

                        loading="lazy"
                    />
                    <Modal
                        open={open}
                        onClose={handleClose}

                    >
                        <img
                            src={`${item.link}`}
                            srcSet={`${item.link}`}


                        />
                    </Modal>
                </ImageListItem>
            ))}
        </ImageList>


    );
}

