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
import SingleTestForReport from "./singleTestForReport";
import List from "@mui/material/List";
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

export default function AllTestGrid({reportId,customerFirestore}) {
    const [open, setOpen] = React.useState(false);
    const [items, setItem] = React.useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getReportItems = async () =>{
        const reportItemCollection = collection(customerFirestore,'reports/' + reportId+"/items");
        const todosQuery = query(reportItemCollection);

        const querySnapshot = await getDocs(todosQuery);

        // map through todos adding them to an array

        var result= [];
        querySnapshot.forEach((snapshot) => {
            result.push(snapshot);
            console.log("one added")

        });
        setItem(result);
    }


    useEffect( () => {

      //  getReportItems();

        setTimeout( () => {
            //  setLoading(false);
        },2000)

    },[]);
    return (
       <label>{items.length}</label>


    );
}

