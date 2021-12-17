import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { collection, deleteDoc, doc, DocumentData, getDocs, limit, query, QueryDocumentSnapshot, updateDoc, where  ,getDoc} from "@firebase/firestore";
import { useEffect, useState } from 'react';
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import styles from "../styles.module.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import QuiltedImageList from "./photoGallary";
import moment from "moment";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function SingleTestForReport({testBody}){
    function convertDate(da) {
        var dateTime = new Date(da);
        var result = moment(dateTime).format('HH:mm Do MMMM YYYY');
        return  <label>{result}</label>;

    }
    function convertmilisToMinute(da) {
        var dateTime = new Date(da);
        var result = moment(dateTime).format('mm:ss');
        return  result;

    }
    function testDataTile(dataone, datatwo) {
        return (<Box  sx={{
            mx: 'auto',
            bgcolor: "#ffff",
            color: '#007913',
            padding:1,
            // width:  '80%',
            // p: 1,
            // m: 1,
            borderRadius: 0,
            margin:0,
            textAlign: 'center',
        }}
        >
            <Stack sx={{ width: '100%',height:10 }} direction="row" justifyContent="space-between"sx={{paddingLeft:2,paddingRight:2,paddingTop:1,paddingBottom:1}}>


                <Typography variant="p" component="p"   style={{color:"#868686"}} >
                    {dataone}
                </Typography>

                <label>{datatwo} </label>

            </Stack>
        </Box>);

    }
    return (<List>
        <Divider />
        <h3 sx={{fontsize:20}}  className={styles.centertextPrimaryColor}>{testBody.data().data.name}</h3>
        <Divider />
        <Box
            sx={{
                mx: 'auto',
                bgcolor: "#7feeae",
                color: '#00681d',
                padding:2,
                // width:  '80%',
                // p: 1,
                // m: 1,
                borderRadius: 0,
                margin:1,
                textAlign: 'center',
            }}
        >
            {testBody.data.startedLoad==0?"Test Result Not Timed":(testBody.data().data.startedLoad>0?(testBody.data().data.didPassed==true?"Test Result Passed":"Test Result Failed"):"Test Result Failed")}
        </Box>



        <Card elevation={0} sx={{ maxWidth: '100%' }}>

            <CardMedia
                component="img"

                image={`data:image/jpeg;base64,${testBody.data().data.graphImage}`}
                alt="Paella dish"
            />
            <CardContent>

            </CardContent>


        </Card>
        <List sx={{ paddingLeft:0,paddingRight:0}}>

            {testDataTile("Test Title",testBody.data().data.name)}



            <Divider/>


            {/*<h6   className={styles.primaryColortext}>Test Title</h6>*/}
            {/*<h5>{value.data.name}</h5>*/}
            {/*<h6 className={styles.primaryColortext}>Test Note</h6>*/}
            {/*<h5>{value.data.note}</h5>*/}
            {testDataTile("Test Note",testBody.data().data.note)}


            <Divider/>

            {testDataTile("Date & Time",convertDate(testBody.data().data.time))}




            <Divider/>
            {testDataTile("Target Value",testBody.data().data.targetLoad.toString() +testBody.data().data.loadMode.toString() )}

            <Divider/>
            {testDataTile("Max Value",testBody.data().data.max.toString() +testBody.data().data.loadMode.toString()+" at "+convertmilisToMinute( testBody.data().data.maxAt) )}

            <Divider/>
            {testDataTile("Times Section Started",convertmilisToMinute( testBody.data().data.startedLoad)  )}
            <Divider/>
            {testDataTile("Times Section Finished",convertmilisToMinute( testBody.data().data.endedLoad)  )}
            <Divider/>
            {testDataTile("Times Section Length",convertmilisToMinute( testBody.data().data.targetDuration*1000)  )}
            <Divider/>
            {testDataTile("Device SN", testBody.data().data.index2  )}
            <Divider/>
            {testDataTile("Next Calibration Date",testBody.data().data.index6)}
            <QuiltedImageList attachmentsArray= {testBody.data().attachment} />

        </List>

    </List>);

}

