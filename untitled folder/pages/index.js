import Head from 'next/head'
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import DownloadIcon from '@mui/icons-material/Download';
import Divider from '@mui/material/Divider';
import styles from '../styles.module.css'

import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import Card from '@mui/material/Card';
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/firestore'
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import 'firebase/compat/firestore';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { collection, deleteDoc, doc, DocumentData, getDocs, limit, query, QueryDocumentSnapshot, updateDoc, where  ,getDoc} from "@firebase/firestore";

export default function Home() {

  var firestore;
  try{
    initializeApp({
      apiKey: "AIzaSyCKb4AFXlNrrULmmfnwQgt4yjo2LqEniNY",
      authDomain: "staht-connect-322113.firebaseapp.com",
      projectId: "stahtoqgcnyawub",
      storageBucket: "staht-connect-322113.appspot.com",
      messagingSenderId: "1062957635061",
      appId: "1:1062957635061:web:ae189f34def46aa57d3cbc",
      measurementId: "G-9389CBET47"
    });

    firestore = getFirestore();
  }catch (e) {
    console.log(e);
    firestore = getFirestore();
  }

  const [downloadedreprot,setTodos] = useState({});
  const [items,setItems] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect( () => {
    getTodos();
    getReportItems();
    setTimeout( () => {
    //  setLoading(false);
    },2000)

  },[]);






  const todosCollection = doc(firestore,'reports/' + '2pgwUADuWJdbxQ8elYed');
  const reportItemCollection = collection(firestore,'reports/' + '2pgwUADuWJdbxQ8elYed'+"/items");

  const getTodos = async () => {
  // const todosQuery = query(reportItemCollection);
  //  const querySnapshot = await doc(todosQuery);
   var dd = await  getDoc(todosCollection);
    console.log(dd.data())

    const result = [];
   //  querySnapshot.forEach((snapshot) => {
   //    console.log(snapshot.data());
   // //   result.push(snapshot.data());
   //  })
   // console.log(result.length);
     setTodos(dd.data());
  };
  const getReportItems = async () => {
    const todosQuery = query(reportItemCollection);

    const querySnapshot = await getDocs(todosQuery);

    // map through todos adding them to an array

     var result= [];
    querySnapshot.forEach((snapshot) => {
     result.push(snapshot.data());

    });

    setItems(result);
    setLoading(false);

  };
//  ( <TableContainer component={Paper}>
//   <Table sx={{ minWidth: 650 }} aria-label="simple table">
//     <TableHead>
//       <TableRow>
//         <TableCell>Dessert (100g serving)</TableCell>
//         <TableCell align="right">Calories</TableCell>
//         <TableCell align="right">Fat&nbsp;(g)</TableCell>
//         <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//         <TableCell align="right">Protein&nbsp;(g)</TableCell>
//       </TableRow>
//     </TableHead>
//     <TableBody>
//       {rows.map((row) => (
//           <TableRow
//               key={row.field_1}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//           >
//             <TableCell component="th" scope="row">
//               {row.field_1}
//             </TableCell>
//             <TableCell align="right">{row.field_1}</TableCell>
//             <TableCell align="right">{row.field_1}</TableCell>
//             <TableCell align="right">{row.field_1}</TableCell>
//             <TableCell align="right">{row.field_1}</TableCell>
//           </TableRow>
//       ))}
//     </TableBody>
//   </Table>
// </TableContainer>);
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
                <h6 className={styles.primaryColortext}>Report Title &rarr;</h6>
                <h4>{downloadedreprot.field_1}</h4>
            </Grid>


            <Grid item xs={6}>
                <h6 className={styles.primaryColortext}>Site Name &rarr;</h6>
                <h4>{downloadedreprot.field_9}</h4>
            </Grid>
            <Grid item xs={6}>
                <h6 className={styles.primaryColortext}>Report Date &rarr;</h6>
              <h4>{downloadedreprot.created_at}</h4>
            </Grid>
            <Grid item xs={6}>
                <h6 className={styles.primaryColortext}>Site Address &rarr;</h6>
                <h4>{downloadedreprot.field_5}</h4>
            </Grid>
            <Grid item xs={6}>
              <h6 className={styles.primaryColortext}>Compiled By &rarr;</h6>
              <h4>Rob Hi.</h4>
            </Grid>

            <Grid item xs={6}>
              <h6 className={styles.primaryColortext}>Customer Contact Name&rarr;</h6>
              <h4>{downloadedreprot.field_6}</h4>
            </Grid>



            <Grid item xs={6}>
              <h6 className={styles.primaryColortext}>Customer Company Name&rarr;</h6>
              <h4>{downloadedreprot.field_2}</h4>
            </Grid>


            <Grid item xs={6}>
              <h6 className={styles.primaryColortext}>Customer Company Tel&rarr;</h6>
              <h4>{downloadedreprot.field_7}</h4>
            </Grid>

            <Grid item xs={6}>
              <h6 className={styles.primaryColortext}>Customer Address&rarr;</h6>
              <h4>{downloadedreprot.field_10}.</h4>
            </Grid>

            <Grid item xs={6}>
              <h6 className={styles.primaryColortext}>Customer Contact Email&rarr;</h6>
              <h4>{downloadedreprot.field_8}</h4>
            </Grid>



            <Grid item xs={8}>
              <h6 className={styles.primaryColortext}>Test Conclusion&rarr;</h6>
              <h4>{downloadedreprot.field_11}</h4>
            </Grid>

          </Grid>

          <List sx={{ width: '100%', bgcolor: 'background.paper', }}>
             {items.map((value) => (
                 <List>
                   <h3 sx={{fontsize:20}}  className={styles.centertextPrimaryColor}>{value.data.name}</h3>
                   <List sx={{ paddingLeft:4,paddingRight:4}}>

                     {/*<Stack sx={{ width: '100%', }} direction="row" justifyContent="space-between"sx={{paddingLeft:0}}>*/}
                     {/*  <h6 >Test Title</h6>*/}
                     {/*  <h6>{value.data.name}</h6>*/}
                     {/*</Stack>*/}
                     {/*<Stack sx={{ width: '100%', }} direction="row" justifyContent="space-between"sx={{paddingLeft:0}}>*/}
                     {/*  <h6 >Test Note</h6>*/}
                     {/*  <h6>{value.data.note}</h6>*/}
                     {/*</Stack>*/}
                     <h6   className={styles.primaryColortext}>Test Title</h6>
                     <h5>{value.data.name}</h5>
                     <h6 className={styles.primaryColortext}>Test Note</h6>
                     <h5>{value.data.note}</h5>



                     <Stack sx={{ width: '100%', }} direction="row" justifyContent="space-between"sx={{paddingLeft:0}}>
                       <h6>Test Result</h6>
                       <h6>{value.data.didPassed.toString()}</h6>
                     </Stack>


                   </List>
                   <Divider/>
                 </List>



















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
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className="logo" />
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
}
