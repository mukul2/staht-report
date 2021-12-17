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
import { useRouter } from 'next/router'
import {initializeApp} from "firebase/app";
import Head from "next/head";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Badge from "@mui/material/Badge";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DownloadIcon from "@mui/icons-material/Download";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import Divider from "@mui/material/Divider";
import styles from "../styles.module.css";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import QuiltedImageList from "./photoGallary";
import SingleTestForReport from "./singleTestForReport";
export default function Report() {
    const router = useRouter()
    var reportID = router.query.id;

    var firestore;
    var firestoreCustomer;
    const [downloadedReprot,setReport] = useState({});
    const [reportResourceId,setreportResourceId] = useState({});
    const [items,setItems] = useState([]);



    const getReportResource = async () => {

        try{
            var mainApp =   initializeApp({
                apiKey: "AIzaSyCKb4AFXlNrrULmmfnwQgt4yjo2LqEniNY",
                authDomain: "staht-connect-322113.firebaseapp.com",
                projectId: "staht-connect-322113",
                storageBucket: "staht-connect-322113.appspot.com",
                messagingSenderId: "1062957635061",
                appId: "1:1062957635061:web:ae189f34def46aa57d3cbc",
                measurementId: "G-9389CBET47"
            },"staht-connect-322113")
            // initializeApp({
            //     apiKey: "AIzaSyCKb4AFXlNrrULmmfnwQgt4yjo2LqEniNY",
            //     authDomain: "staht-connect-322113.firebaseapp.com",
            //     projectId: "staht-connect-322113",
            //     storageBucket: "staht-connect-322113.appspot.com",
            //     messagingSenderId: "1062957635061",
            //     appId: "1:1062957635061:web:ae189f34def46aa57d3cbc",
            //     measurementId: "G-9389CBET47"
            // });



            firestore = getFirestore(mainApp);
            console.log("main firestore done")
            console.log(mainApp.name)
        }catch (e) {
            console.log("Exception on main firebase");
            console.log(e);
            firestore = getFirestore();
            console.log("main firebase");

        }


        console.log("report id "+reportID);
        try {
            const todosCollection = collection(firestore,'reports');
            const todosQuery = query(todosCollection,where('report_id','==',reportID));
            const querySnapshot = await getDocs(todosQuery);
            if(true){
              //  console.log(querySnapshot.docs.length.toString());
                  var rId =  querySnapshot.docs[0].resource_id;
                //setreportResourceId(rId);
                querySnapshot.forEach((snapshot) => {
                     setreportResourceId(snapshot.data().resource_id);
                     console.log("report resource id done "+snapshot.data().resource_id);
                     getReportBody(snapshot.data().resource_id);

                })
                // console.log("got res id "+rId)


            }
        }catch (e) {
            console.log("query error")
            console.log(e)
        }





    };
    const getReportBody = async (resID) => {


        try{
          var app =  initializeApp({
                apiKey: "AIzaSyCKb4AFXlNrrULmmfnwQgt4yjo2LqEniNY",
                authDomain: "staht-connect-322113.firebaseapp.com",
                projectId: resID,
                storageBucket: "staht-connect-322113.appspot.com",
                messagingSenderId: "1062957635061",
                appId: "1:1062957635061:web:ae189f34def46aa57d3cbc",
                measurementId: "G-9389CBET47"
            },resID)

            // initializeApp({
            //     apiKey: "AIzaSyCKb4AFXlNrrULmmfnwQgt4yjo2LqEniNY",
            //     authDomain: "staht-connect-322113.firebaseapp.com",
            //     projectId: resID,
            //     storageBucket: "staht-connect-322113.appspot.com",
            //     messagingSenderId: "1062957635061",
            //     appId: "1:1062957635061:web:ae189f34def46aa57d3cbc",
            //     measurementId: "G-9389CBET47"
            // },resID)

            console.log("create done")
            firestoreCustomer = getFirestore(app);
        }catch (e) {
            console.log("app list")
            console.log("ecxepppp")
            console.log(e)
            console.log("ecxepppp end")


           // firestoreCustomer = get
        }
        try{
            // const reportItemCollection = collection(firestoreCustomer,'reports/' + 'zkBlCkfO0mb06Sd4UyOF'+"/items");
            // const todosQuery = query(reportItemCollection);
            //
            // const querySnapshot = await getDocs(todosQuery);
            //
            // // map through todos adding them to an array
            //
            // var result= [];
            // querySnapshot.forEach((snapshot) => {
            //     console.log(snapshot.data())
            //
            // });

            const todosCollection = doc(firestoreCustomer,'reports/'+reportID);
            var dd = await  getDoc(todosCollection);
            console.log("show data")
           // console.log(dd.data())

            // const todosCollection = doc(firestoreCustomer,'reports/' + reportID);
            // var dd = await  getDoc(todosCollection);
            //
            //
            // const result = [];
            // //  querySnapshot.forEach((snapshot) => {
            // //    console.log(snapshot.data());
            // // //   result.push(snapshot.data());
            // //  })
            // // console.log(result.length);
            //
            setReport(dd.data());
            console.log("after set report")
            console.log(downloadedReprot)
            console.log("wrote")
            const reportItemCollection = collection(firestoreCustomer,'reports/' + reportID+"/items");
            const todosQuery = query(reportItemCollection);

            const querySnapshot = await getDocs(todosQuery);

            // map through todos adding them to an array

            var result= [];
            querySnapshot.forEach((snapshot) => {
                result.push(snapshot);

            });

            setItems(result);

             console.log("report items")
             console.log(result.length)
             console.log(items.length)
            // //console.log(downloadedReprot)
            // console.log(dd.data())
        }catch (e) {
            console.log("EXC");
            console.log(e);


        }

    };

    useEffect( () => {

           if(reportID) getReportResource();

        setTimeout( () => {
            //  setLoading(false);
        },2000)

    },[]);



    if(reportID) {
        return (
            <div className="container">
                <Head>
                    <title>Staht Connect</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <Box sx={{
                    width: 600,padding:1}}>



                    <Paper variant="outlined"  >


                        <Stack direction="row"
                               justifyContent="space-between"

                               spacing={10} sx={{paddingLeft:5}}>

                            <p >Report Details </p>
                            <Stack direction="row"
                                   justifyContent="space-evenly"
                                   alignItems="center"
                                   spacing={1}>
                                <IconButton aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                                <Badge badgeContent={4} color="secondary">
                                    <PictureAsPdfIcon color="action" />
                                </Badge>
                                <IconButton color="secondary" aria-label="add an alarm">
                                    <DownloadIcon />
                                </IconButton>
                                <IconButton color="primary" aria-label="add to shopping cart">
                                    <CancelPresentationIcon />
                                </IconButton>
                            </Stack>
                        </Stack>
                        <Divider />
                        <img className={styles.photoLogo}  src="https://st2.depositphotos.com/1768926/7866/v/600/depositphotos_78666192-stock-illustration-a-logo-sample-logo-for.jpg"/>


                        <List>
                            <ListItemText className={styles.centertext} primary="Rob Company" />
                            <ListItemText className={styles.centertext} primary="demo@email.com" />
                            <ListItemText className={styles.centertext} primary="744444444" />

                        </List>



                        <Grid container direction="row" spacing={0} columns={0}
                              justifyContent="space-between"
                              alignItems="baseline"  style={{
                            padding: '30px',
                        }}>
                            <Grid item xs={6}>
                                <h6 className={styles.primaryColortext}>Report Title;</h6>
                                <h4>{downloadedReprot.field_1}</h4>
                            </Grid>


                            <Grid item xs={6}>
                                <h6 className={styles.primaryColortext}>Site Name &rarr;</h6>
                                <h4>{downloadedReprot.field_9}</h4>
                            </Grid>
                            <Grid item xs={6}>
                                <h6 className={styles.primaryColortext}>Report Date &rarr;</h6>
                                <h4>{downloadedReprot.created_at}</h4>
                            </Grid>
                            <Grid item xs={6}>
                                <h6 className={styles.primaryColortext}>Site Address &rarr;</h6>
                                <h4>{downloadedReprot.field_5}</h4>
                            </Grid>
                            <Grid item xs={6}>
                                <h6 className={styles.primaryColortext}>Compiled By &rarr;</h6>
                                <h4>Rob Hi.</h4>
                            </Grid>

                            <Grid item xs={6}>
                                <h6 className={styles.primaryColortext}>Customer Contact Name&rarr;</h6>
                                <h4>{downloadedReprot.field_6}</h4>
                            </Grid>



                            <Grid item xs={6}>
                                <h6 className={styles.primaryColortext}>Customer Company Name&rarr;</h6>
                                <h4>{downloadedReprot.field_2}</h4>
                            </Grid>


                            <Grid item xs={6}>
                                <h6 className={styles.primaryColortext}>Customer Company Tel&rarr;</h6>
                                <h4>{downloadedReprot.field_7}</h4>
                            </Grid>

                            <Grid item xs={6}>
                                <h6 className={styles.primaryColortext}>Customer Address&rarr;</h6>
                                <h4>{downloadedReprot.field_10}.</h4>
                            </Grid>

                            <Grid item xs={6}>
                                <h6 className={styles.primaryColortext}>Customer Contact Email&rarr;</h6>
                                <h4>{downloadedReprot.field_8}</h4>
                            </Grid>



                            <Grid item xs={8}>
                                <h6 className={styles.primaryColortext}>Test Conclusion&rarr;</h6>
                                <h4>{downloadedReprot.field_11}</h4>
                            </Grid>

                        </Grid>

                        <List sx={{ width: '100%', bgcolor: 'background.paper', }}>
                            {items.map((value) => (
                                <SingleTestForReport testBody={value} customerFirestore={firestoreCustomer} reportID={reportID} />




                            ))}
                        </List>

                    </Paper>
                </Box>


                <footer>
                    <a
                        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Powered by{' '}Staht Connect
                        {/*<img src="/vercel.svg" alt="Vercel" className="logo" />*/}
                    </a>
                </footer>

                <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
  

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .teststacktile{
            mx: 'auto'; bgcolor: "#ffff"; color: green; padding:1px;
        
            borderRadius: 0;
            margin:0;
            textAlign: 'center';
        }
        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

                <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
            </div>
        )
    }else{
        return   <label>Invalid Report id</label>
    }

}

