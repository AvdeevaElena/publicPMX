import React from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import SortIcon from '@material-ui/icons/Sort';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Formik, Form}      from 'formik';
import { UpdateNewsButton, FilterNewsButton } from './Buttons'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import BackDataService from "../services/back.service"; 
import { FormikTextField } from 'formik-material-fields';
import Switch from '@material-ui/core//Switch';
import iconId1 from "../icons/categoryIcons/iconId1.png";
import iconId2 from "../icons/categoryIcons/iconId2.png";
import iconId3 from "../icons/categoryIcons/iconId3.png";
import iconId4 from "../icons/categoryIcons/iconId4.png";
import iconId5 from "../icons/categoryIcons/iconId5.png";
import iconId6 from "../icons/categoryIcons/iconId6.png";
import iconId7 from "../icons/categoryIcons/iconId7.png";
import iconId8 from "../icons/categoryIcons/iconId8.png";

//import DatePicker from "react-datepicker";

import TextField from '@material-ui/core/TextField';
import {
  TimePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { LineStyle } from '@material-ui/icons';

const leftCorpus = {background: 'white', width: '100%',  display: "grid",   gridTemplateColumns: 'repeat(6, 0.3fr)'};
const rightCorpus = {background: 'white',  width: '100%',  display: "grid",   gridTemplateColumns: 'repeat(6, 0.3fr)'};

function smallestToBiggest(a, b) {
  return a.creatorId - b.creatorId;
}

function biggestToSmallest(a, b) {
  return b.creatorId - a.creatorId;
} 

class NewsUpdate extends React.Component {

  constructor() {
    super();
    this.state = {
    newsList: [],
    value: 0,
    abc: 978,
    setValue: 1,
    expanded: true,
    open: false,
    expandedNews: true,
    openNews: false,
    openCreate: false,
    openFilter: false,
    sort: false,
    filter: false,
    isSubmitting:true,
    rightCorpus: rightCorpus,
    leftCorpus: leftCorpus,
    setOpenDialog: false,
    openDialog: false,
    reduxIdNewsEvent: 0,
    reduxIdNews: 0,
    reduxReportNews: '',
    reduxTitleNews: '',
    reduxCategoryId: '',
    reduxPublicDate: '',
    createCheck: false,
    createDate:'',
    checked: false,
    curDate: new Date(),
    selectedDate: new Date(),
    filterEvent: '',
    filterShow: false,
    };
  }

  createCheckeValue = (event) => {
    this.setState({ checked: event.target.checked});
  };

   handleChangeEvent = (event) => {
    this.setState({ reduxIdNewsEvent: event.target.value });
  };

  handleChangeFilterEvent = (event) => {
    this.setState({ filterEvent: event.target.value });
  };

   handleTimeChange = (val) => {
    const hours = new Date(val).getHours();
    const minutes = new Date(val).getMinutes();
    const seconds = new Date(val).getSeconds();
    console.log(`${hours}:${minutes}:${seconds}`);
   // setTime(val);
  };

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
};

  handleClickOpenCreate = () => {
    this.setState({ openCreate: true });
};

handleCloseCreate  = () => {
  this.setState({ openCreate: false });
};


showDateTimeInOne =(date) =>  {
  console.log ("!!!!!!!!!!!", 'showDateTimeInOne');
  console.log ("!!!!!!!!!!!", date.toString());
  let dateTime = date.toString();
  var d = new Date(date);
  console.log ("!!!!!!!!!!!", d);
  

 /* val formatter: DateTimeFormatter = DateTimeFormatter.ofPattern(
      "HH:mm dd.MM.yyyy",
      Locale.getDefault()
  )
  return formatter.format(localDateTime)

*/

}


  deleteNews = (id) => {
    return axios.delete(`http://130.193.44.96:8080/fmh/news/${id}`)
    .then(res => res.data);
  };
   handleClickOpenDialogRedux = (id, report, title,publishDate, newsCategoryId) => {
     console.log ("!!!!!!!!!!!");
     console.log ("!!!!!!!!!!!", id);
     console.log ("!!!!!!!!!!!", publishDate);
     console.log ("!!!!!!!!!!!", publishDate.toString());

  var d = new Date(1634459652);
  var datestring = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);

     if (this.state.openDialog === false) {
      this.setState({ openDialog: true });
      this.setState({ reduxIdNews: id });
      this.setState({ reduxReportNews: report });
      this.setState({ reduxTitleNews: title });
      this.setState({ reduxCategoryId: newsCategoryId});
      this.setState({ reduxPublicDate: datestring});
     }
    };


    handleCreateSwitchShow  = (event) => {
      this.setState({ createCheck: event.target.createCheck});
      };

    whatToShow = () => {
        if (this.state.filterShow =='true'){
          return this.showNewsAccordionListFiltered
            }
      else return this.showNewsAccordionList;
       };   

   handleCloseDialog = () => {
    this.setState({ setOpenDialog: false });
    };

  handleClickOpenSort = () => {
    if (this.state.sort === false) {
        this.setState({ sort: true });

    } else
    this.setState({ sort: false });
};

handleClickOpenFilter = () => {
  if (this.state.filter === false) {
      this.setState({ openFilter: true });

  } else
  this.setState({ openFilter: false });
};

  handleExpandClick = () => {
    this.state.setExpanded(!this.state.expanded);};
  
 
  handleExpandNewsClick = () => {
    this.state.setExpandedNews(!this.state.expandedNews);};

  handleChangeNews = (panel) => (event, isExpanded) => {
    this.setState( {expandedNews: isExpanded ? panel : false});};

        componentDidMount() {
        //BackDataService.getAllNews()
     //   axios.get(`http://130.193.44.96:8080/fmh/news`)
        axios.get(`https://avdeevaelena.github.io/json/newsUpdate.json`)
            .then(res => {
              const newsList = res.data;
              console.log("QWWRYUJJTRWE!!!!!!!!!");
              console.log("QWWRYUJJTRWE!!!!!!!!!",newsList);
              this.setState({ newsList });
            }) 
  
    } 

render() {    
const sorted = this.state.newsList.sort(biggestToSmallest);
  if (this.state.sort === false) {
   this.sorted = this.state.newsList.sort(smallestToBiggest);
  }

//const filtered= this.state.newsList.filter(s => s.reduxCategoryId.includes("2"));
const results = this.state.newsList.filter((value) => {
  return String(value.newsCategoryId).includes("2");
  

  // Use the toLowerCase() method to make it case-insensitive
});
  

 const showDialogUpdate = <Dialog
                            open={this.state.openDialog}
                            onClose={this.handleClose}
                            >
                            <DialogTitle 
                            id="form-dialog-title"><Typography variant="h5" component="h3"
                            style={{ textAlign: 'center' }} >
                              Редактировать новость
                              </Typography>
                            </DialogTitle>
                            <Formik
                            enableReinitialize={true}
                            initialValues={{
                              title: this.state.reduxTitleNews,
                              text: this.state.reduxReportNews,
                              //date: '2012-12-12'
                              date: '1970-01-20'
                             // date: this.state.reduxPublicDate,
                            }}
                            onSubmit={({title, text, date}, { setStatus, setSubmitting }) => {
                            let idNews = this.state.reduxIdNews;
                            let eventId = this.state.reduxIdNewsEvent;
                            BackDataService.testNews(idNews,title,eventId, text);
                            }}
                            >
                            {({isSubmitting}) => (        
                            <Form>       
                              <div style={{ marginLeft:10,  marginTop:5, marginRight:10}} >
                                <FormikTextField  
                                htmlFor="title"
                                placeholder="Заголовок"
                                name="title"
                                margin="normal"
                                variant="outlined"
                                defaultValue={this.state.reduxTitleNews}
                                style={{minWidth:500}}  
                                type="text" />
                              </div>
                              <div style={{ marginLeft:10,  marginTop:10, marginRight:10}} >
                              <FormControl sx={{ m: 1, minWidth: 420 }}>
                            <InputLabel id="demo-simple-select-helper-label">Событие</InputLabel>
                            <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                              htmlFor="newsCategoryId"
                              placeholder={this.state.eventTest}
                              style={{minWidth:500}} 
                              name="newsCategoryId"
                              defaultValue={this.state.reduxCategoryId}
                              margin="normal"
                              variant="outlined" 
                                type="text"
                                value={this.setEventRedux}
                                onChange={this.handleChangeEvent}
                              >
                                <MenuItem value={1}>Объявление</MenuItem>
                                <MenuItem value={2}>День рождение</MenuItem>
                                <MenuItem value={3}>Зарплата</MenuItem>
                                <MenuItem value={4}>Профсоюз</MenuItem>
                                <MenuItem value={5}>Праздник</MenuItem>
                                <MenuItem value={6}>Массаж</MenuItem>
                                <MenuItem value={7}>Благодарность</MenuItem>
                                <MenuItem value={8}>Нужна помощь</MenuItem>
                              </Select>
                                <FormikTextField  
                                htmlFor="text"
                                placeholder="Сообщение"
                                name="text"
                                margin="normal"
                                variant="outlined"
                                multiline={true}
                                rows={5}
                                maxRows= {8}
                                style={{width:500, height: '100%'}}  
                                defaultValue={this.state.reduxReportNews}
                                type="text" />

                                <FormikTextField 
                                        htmlFor="date"
                                        id="date"
                                        label="Публикация test"
                                        type="date"
                                        name="date"
                                        dateFormat="dd/MM/yyyy"
                                        value='2019-05-01'
                                        selected='2019-05-01'
                                       
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        //defaultValue={this.state.reduxPublicDate}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                      />
 
                              </FormControl>
                              </div>

                              <DialogActions>
                              <Button onClick={this.handleClose} color="primary">
                                Отмена
                              </Button>
                              <UpdateNewsButton 
                              //value={s.id}
                              isSubmitting={isSubmitting}/>
                            </DialogActions>
                              {/*{status &&
                                <div className={'alert alert-danger'}>{status}</div>
                              }*/}
                            </Form>      
                            )}
                            </Formik>
                            </Dialog>

const showDialogCreate = <Dialog
open={this.state.openCreate}
onClose={this.handleClose}
>
<DialogTitle id="form-dialog-title">
<Typography variant="h5" component="h3"
        style={{ textAlign: 'center' }} >
          Создать новость
          </Typography>
 </DialogTitle>

<Formik
 initialValues={{
  title: '',
  text: '',
  newsCategoryId:'',
  date: '',
}}
onSubmit={({title, text, date}) => {
let eventId = this.state.reduxIdNewsEvent;
let show = this.state.checked;

BackDataService.createNews(title,eventId, text, show, date);
}}
>
{({isSubmitting}) => (        
<Form>       
  <div style={{ marginLeft:10,  marginTop:5, marginRight:10}} >

    <FormikTextField  
    htmlFor="title"
    placeholder="Заголовок"
    name="title"
    margin="normal"
    variant="outlined"
    style={{minWidth:500}}  
    type="text" />
  </div>
  <div style={{ marginLeft:10,  marginTop:10, marginRight:10}} >
  <FormControl sx={{ m: 1, minWidth: 420 }}>
<InputLabel id="demo-simple-select-helper-label">Событие</InputLabel>
<Select
labelId="demo-simple-select-helper-label"
id="demo-simple-select-helper"
  htmlFor="newsCategoryId"
  placeholder={this.setEventRedux}
  style={{minWidth:500}} 
  name="newsCategoryId"
  margin="normal"
  variant="outlined" 
    type="text"
    value={this.setEventRedux}
    onChange={this.handleChangeEvent}
  >
    <MenuItem value={1}>Объявление</MenuItem>
    <MenuItem value={2}>День рождение</MenuItem>
    <MenuItem value={3}>Зарплата</MenuItem>
    <MenuItem value={4}>Профсоюз</MenuItem>
    <MenuItem value={5}>Праздник</MenuItem>
    <MenuItem value={6}>Массаж</MenuItem>
    <MenuItem value={7}>Благодарность</MenuItem>
    <MenuItem value={8}>Нужна помощь</MenuItem>
  </Select>
  <div style={{ marginLeft:10,  marginTop:5, marginRight:10}} >
    <FormikTextField   
    htmlFor="text"
    multiline={true}
    rows={5}
    maxRows= {8}
    placeholder="Сообщение"
    name="text"
    margin="normal"
    fullWidth="true"
    variant="outlined"
    style={{width:500}}  
    defaultValue={this.state.reduxReportNews}
    type="text" />
  </div>


  <FormikTextField 
        htmlFor="date"
        id="date"
        label="Публикация"
        type="date"
        name="date"
        defaultValue={this.state.curDate}
        InputLabelProps={{
          shrink: true,
        }}
      />

<Switch
      checked={this.state.checked}
      onChange={this.createCheckeValue}
      inputProps={{ 'aria-label': 'controlled' }}
    />
 
  </FormControl>
  </div>

  <DialogActions>
  <Button onClick={this.handleClose} color="primary">
    Отмена
  </Button>
  <UpdateNewsButton 
  //value={s.id}
  isSubmitting={isSubmitting}/>
</DialogActions>
  {/*{status &&
    <div className={'alert alert-danger'}>{status}</div>
  }*/}
</Form>      
)}
</Formik>
</Dialog>


const showDialogFilter = <Dialog
open={this.state.openFilter}
onClose={this.handleClose}
>
<DialogTitle id="form-dialog-title">
<Typography variant="h5" component="h3"
        style={{ textAlign: 'center' }} >
          Фильтр новостей
          </Typography>
 </DialogTitle>

<Formik
 initialValues={{
  newsCategoryId:'',
  date: '',
}}
onSubmit={({newsCategoryId, date}) => {
  console.log("FILTER!!!!!!!!!");
  console.log(" FILTER!!!!!!!!! = ",this.state.filterEvent);
//BackDataService.createNews(title,eventId, text, show, date);
}}
>
{({isSubmitting}) => (        
<Form>       

  <div style={{ marginLeft:10,  marginTop:10, marginRight:10}} >
  <FormControl sx={{ m: 1, minWidth: 420 }}>
<InputLabel id="demo-simple-select-helper-label">Событие</InputLabel>
<Select
labelId="demo-simple-select-helper-label"
id="demo-simple-select-helper"
  htmlFor="newsCategoryId"
  placeholder={this.setEventRedux}
  style={{minWidth:500}} 
  name="newsCategoryId"
  margin="normal"
  variant="outlined" 
    type="text"
    value={this.setEventRedux}
    onChange={this.handleChangeFilterEvent}
  >
    <MenuItem value={1}>Объявление</MenuItem>
    <MenuItem value={2}>День рождение</MenuItem>
    <MenuItem value={3}>Зарплата</MenuItem>
    <MenuItem value={4}>Профсоюз</MenuItem>
    <MenuItem value={5}>Праздник</MenuItem>
    <MenuItem value={6}>Массаж</MenuItem>
    <MenuItem value={7}>Благодарность</MenuItem>
    <MenuItem value={8}>Нужна помощь</MenuItem>
  </Select>
  
  <FormikTextField 
        htmlFor="date"
        id="date"
        label="Публикация"
        type="date"
        name="date"
        defaultValue={this.state.curDate}
        InputLabelProps={{
          shrink: true,
        }}
      />
  </FormControl>
  </div>

  <DialogActions>
  <Button onClick={this.handleClose} color="primary">
    Отмена
  </Button>
  <FilterNewsButton 
  //value={s.id}
  isSubmitting={isSubmitting}/>
</DialogActions>
  {/*{status &&
    <div className={'alert alert-danger'}>{status}</div>
  }*/}
</Form>      
)}
</Formik>
</Dialog>

  //const showNewsAccordionList = this.state.newsList.map(s => {
   const showNewsAccordionList = sorted.map(s => {
   let publishEnabledIcon;
      let check = s.creatorId;
      let icon;
      switch (s.newsCategoryId) {
        case "1": icon = <img  alt={"test"} src={iconId1}/>; break;
        case "2": icon = <img  alt={"test"} src={iconId2}/>; break;
        case "3": icon = <img  alt={"test"} src={iconId3}/>; break;
        case "4": icon = <img  alt={"test"} src={iconId4}/>; break;
        case "5": icon = <img  alt={"test"} src={iconId5}/>; break;
        case "6": icon = <img  alt={"test"} src={iconId6}/>; break;
        case "7": icon = <img  alt={"test"} src={iconId7}/>; break; 
        case "8": icon = <img  alt={"test"} src={iconId8}/>; break;  
        default: break; 
        }

      if (s.publishEnabled == 'false') {
        publishEnabledIcon =<Typography><Close/>  НЕ РАЗМЕЩЕНА</Typography>
      } else {
        publishEnabledIcon =<Typography><Check/>  РАЗМЕЩЕНА</Typography>;
      }
              return (  
          <Accordion expanded={this.expandedNews }
          style={{border: 'green', boxShadow: '0px 2px 0px 0px #38c6d7' }}
          onChange={this.handleChangeNews(s.createDate)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header">
            <Typography style={{ fontSize: 'theme.typography.pxToRem(15)',  outLine: 'green', borderColor: 'green' }}>
            <ListItemIcon>
                          {icon}
             </ListItemIcon>
                      {s.title}
            </Typography>
          </AccordionSummary>

          <AccordionDetails style={{ display:'block'}}>

<Box item boxShadow={1} xs={3} 
style={{ display:'flex', boxShadow: '0px 2px 0px 0px #D7D7D7', width: '100%'}} >
          <Typography
          style={{ float: 'left', width: '30%'}}
          >Дата публикации: </Typography >
          <Typography
          style={{ float: 'right', width: '70%'}}
          >{s.publishDate} </Typography > 
  </Box>

  <Box item boxShadow={1} xs={3}
  style={{ display:'flex', boxShadow: '0px 2px 0px 0px #D7D7D7', width: '100%'}}>
             <Typography style={{ float: 'left', width: '30%'}}>
             Дата создания:  </Typography>
             <Typography
          style={{ float: 'right', width: '70%'}}
          >{s.createDate}
           </Typography>
  </Box>
  <Box item boxShadow={1} xs={3}
  style={{ display:'flex', boxShadow: '0px 2px 0px 0px #D7D7D7', width: '100%'}}>
             <Typography style={{ float: 'left', width: '30%'}}>
           Автор:
           </Typography>
           <Typography style={{ float: 'right', width: '70%'}}>
           {s.creatorId}
           </Typography>
  </Box> 
  <Box item boxShadow={1} xs={3}
  style={{ display:'flex', boxShadow: 'none', width: '100%', justifyContent: 'space-between', paddingTop: '10px'}}>
  <Typography style={{ float: 'left'}}>
            {publishEnabledIcon}
  </Typography>         
    <Typography style={{ float: 'right'}}>  
            <Button  color="black" style={{float: "left"}}
            onClick={this.deleteNews(s.id)}><DeleteOutlineIcon />
            </Button>   
            {showDialogUpdate}
        <Button 
        style={{ float: 'right'}} color="black" 
        onClick={() =>  this.handleClickOpenDialogRedux(s.id, s.description, s.title, s.publishDate, s.newsCategoryId)}><BorderColorIcon />
        </Button>
    </Typography>  
 </Box>      
            <div style={{ float: 'left'}}> 
            <Typography>
            {s.description}
            </Typography>
            </div>
          </AccordionDetails>
        </Accordion>
              )
   }); 

   const showNewsAccordionList2 = this.whatToShow();
   
   const showNewsAccordionListFiltered = results.map(s => { 
   
    let publishEnabledIcon;
       let check = s.creatorId;
       let icon;
       switch (s.newsCategoryId) {
         case "1": icon = <img  alt={"test"} src={iconId1}/>; break;
         case "2": icon = <img  alt={"test"} src={iconId2}/>; break;
         case "3": icon = <img  alt={"test"} src={iconId3}/>; break;
         case "4": icon = <img  alt={"test"} src={iconId4}/>; break;
         case "5": icon = <img  alt={"test"} src={iconId5}/>; break;
         case "6": icon = <img  alt={"test"} src={iconId6}/>; break;
         case "7": icon = <img  alt={"test"} src={iconId7}/>; break; 
         case "8": icon = <img  alt={"test"} src={iconId8}/>; break;  
         default: break; 
         }
 
       if (s.publishEnabled == 'false') {
         publishEnabledIcon =<Typography><Close/>  НЕ РАЗМЕЩЕНА</Typography>
       } else {
         publishEnabledIcon =<Typography><Check/>  РАЗМЕЩЕНА</Typography>;
       }
               return (  
           <Accordion expanded={this.expandedNews }
           style={{border: 'green', boxShadow: '0px 2px 0px 0px #38c6d7' }}
           onChange={this.handleChangeNews(s.createDate)}>
           <AccordionSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel2bh-content"
             id="panel2bh-header">
             <Typography style={{ fontSize: 'theme.typography.pxToRem(15)',  outLine: 'green', borderColor: 'green' }}>
             <ListItemIcon>
                           {icon}
              </ListItemIcon>
                       {s.title}
             </Typography>
           </AccordionSummary>
 
           <AccordionDetails style={{ display:'block'}}>
 
 <Box item boxShadow={1} xs={3} 
 style={{ display:'flex', boxShadow: '0px 2px 0px 0px #D7D7D7', width: '100%'}} >
           <Typography
           style={{ float: 'left', width: '30%'}}
           >Дата публикации: </Typography >
           <Typography
           style={{ float: 'right', width: '70%'}}
           >{s.publishDate} </Typography > 
   </Box>
 
   <Box item boxShadow={1} xs={3}
   style={{ display:'flex', boxShadow: '0px 2px 0px 0px #D7D7D7', width: '100%'}}>
              <Typography style={{ float: 'left', width: '30%'}}>
              Дата создания:  </Typography>
              <Typography
           style={{ float: 'right', width: '70%'}}
           >{s.createDate}
            </Typography>
   </Box>
   <Box item boxShadow={1} xs={3}
   style={{ display:'flex', boxShadow: '0px 2px 0px 0px #D7D7D7', width: '100%'}}>
              <Typography style={{ float: 'left', width: '30%'}}>
            Автор:
            </Typography>
            <Typography style={{ float: 'right', width: '70%'}}>
            {s.creatorId}
            </Typography>
   </Box> 
   <Box item boxShadow={1} xs={3}
   style={{ display:'flex', boxShadow: 'none', width: '100%', justifyContent: 'space-between', paddingTop: '10px'}}>
   <Typography style={{ float: 'left'}}>
             {publishEnabledIcon}
   </Typography>         
     <Typography style={{ float: 'right'}}>  
             <Button  color="black" style={{float: "left"}}
             onClick={this.deleteNews(s.id)}><DeleteOutlineIcon />
             </Button>   
             {showDialogUpdate}
         <Button 
         style={{ float: 'right'}} color="black" 
         onClick={() =>  this.handleClickOpenDialogRedux(s.id, s.description, s.title, s.publishDate, s.newsCategoryId)}><BorderColorIcon />
         </Button>
     </Typography>  
  </Box>      
             <div style={{ float: 'left'}}> 
             <Typography>
             {s.description}
             </Typography>
             </div>
           </AccordionDetails>
         </Accordion>
               )
    });  
     
   
   return (
        <div style={{marginRight:10 }}>
              <Paper style={{marginTop:60 }} elevation={1}>
        <Typography variant="h5" component="h3"
        style={{ paddingBottom:8, paddingLeft:8, backgroundColor: '#f5f5f5', textAlign: 'center' }} >
          Новости   
          <Button  color="primary" 
        style={{float: "right"}}
        onClick={this.handleClickOpenCreate}>Create</Button>
        {showDialogCreate}
          <Button  color="primary" 
        style={{float: "right"}}
        onClick={this.handleClickOpenSort}><SortIcon /></Button> 
           <Button  color="primary" 
        style={{float: "right"}}
        onClick={this.handleClickOpenFilter}>Filter</Button> 
        {showDialogFilter}
        </Typography>   
            <div>
         {showNewsAccordionList2}
    </div>
        </Paper>   
          </div>      
            )
      }
}

export default NewsUpdate;
/*
                      <DatePicker 
                      selected='2019-05-01'
                      dateFormat="MMMM d, yyyy"
                     // className="form-control"
                     // name="startDate"
                      //onChange={date => setFieldValue('startDate', date)}
                    />    
                    */