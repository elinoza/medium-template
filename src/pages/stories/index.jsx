import React, { Component } from 'react'
import Bootstrap from "react-bootstrap";
import {format,parseISO} from 'date-fns'
import { List,Container,ListGroup} from 'react-bootstrap'
import { RiDeleteBin6Fill,RiEditLine} from 'react-icons/ri';

 class Stories extends Component {

    state={
        articles:[],
        id:''
      
    }

    fetchDelete=async (id)=>{  
           const url=process.env.REACT_APP_URL
        try {
          let response= await fetch(url + `/${id}`,
          { 
          method: "DELETE"
    
          })
          if (response.ok){
            console.log("article deletedsuccessfully")
          this.setState({id:''})
          this.fetchArticles()
           }
          else{
            console.log("an error occurred")
            let error = await response.json()
           console.log(error)}
        } catch (error) {
          console.log(error)
          
        }}
    handleDelete=async (id)=>{
        this.setState({id:id})
        this.fetchDelete(id)
        
          
    }
handleEdit =async ()=>{}
fetchArticles=async ()=>{ 
     try {
    const url=process.env.REACT_APP_URL
    let response = await fetch(url)
    if (response.ok){
        let articles= await response.json()
        this.setState({articles:articles})
        console.log(articles)
    }
    else{
        let error= await response.json()
        console.log(error)
    }
} catch (error) {
    console.log(error)
}}
    componentDidMount=async()=>{
        this.fetchArticles()

    }
    componentDidUpdate=(prevState)=>{
if (this.state.id !== prevState.id && this.state.id === '')

{

  }

    }


    render() {
        return (

            //outes.map(({ path, component ,index}) =>
            <Container>
                <p>List your stories here</p>
                {this.state.articles.map((article)=> 
               <div className="d-flex border-bottom p-3">
                   <h5 className="mr-5 text-black">{article.headLine}</h5> 
                   <span className="text-muted">{format(parseISO(article.createdAt),'yyyy-MM-dd')}</span>
                   <div  className="ml-auto d-inline "> 
                    <RiDeleteBin6Fill onClick={()=>this.handleDelete(article._id)} style={{color:"red",fontSize:"30px", paddingRight:"5px"}} />
                   <RiEditLine onClick={this.handleEdit} style={{color:"green",fontSize:"30px", paddingRight:"5px"}} /></div>
                  
               </div>
                  )}
            </Container>
        )
    }
}
export default Stories
