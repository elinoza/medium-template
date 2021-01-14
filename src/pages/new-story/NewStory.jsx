import React, { Component } from "react";
import ReactQuill from "react-quill";
import { Container } from "react-bootstrap";
import "react-quill/dist/quill.bubble.css";
import { Button } from "react-bootstrap";
//import Parser from 'html-react-parser';
import "./styles.scss";
import CategoryPicker from "../../components/CategoryPicker";


export default class NewStory extends Component {
  state = {
    html: "",
    topic:'',
    data:{
      headLine:'',
      subHead:'',
      content:'',
      category:{
        name:'', 
        img:''},
      author:{ 
        name:'', 
        img:''},
      cover:''

    },
  };

  editor = React.createRef();

  postFetch= async()=>{ 
    const url=process.env.REACT_APP_URL
    try {
      let response= await fetch(url,
      { 
      method: "POST",
      body: JSON.stringify(this.state.data),
      headers: new Headers({
      "Content-Type": "application/json"})
      })
      if (response.ok){
        console.log("article posted successfully")
        this.setState({

          data:{
            headLine:'',
            subHead:'',
            content:'',
            category:{
              name:'', 
              img:''},
            author:{ 
              name:'', 
              img:''},
            cover:''
      
          }
        })
       }
      else{
        console.log("an error occurred")
        let error = await response.json()
       console.log(error)}
    } catch (error) {
      console.log(error)
      
    }
  }
  ParseChange=(html)=>{
    let  htmlString = html
    let  parsedHtml= htmlString.replace(/<[^>]+>/g, '')
   
    let data={...this.state.data}
    let content= "content"
    data[content] = parsedHtml
    this.setState({data})
    
    console.log(html)

  }
  onChange = (e) => {
    
   
    let data={...this.state.data}
    let currentid = e.currentTarget.id
		data[currentid] = e.currentTarget.value 
    this.setState({data:data})
    
   
   

  };
  onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.editor && this.editor.current.focus();
    }
  };
  render() {
    const { html } = this.state;
    return (
      <Container className="new-story-container" expand="md">
        <div className="category-container">
        <CategoryPicker onChange={(topic)=>{
           let data={...this.state.data}
           let category= "category"
           data[category].name = topic.name
           data[category].img= topic.img
           this.setState({data})
           }} />
        </div>
        <input
          onKeyDown={this.onKeyDown}
          placeholder="Title"
          className="article-title-input"
          id="headLine"
          value={this.state.data.headLine}
          onChange={this.onChange}
        />

        <ReactQuill
          modules={NewStory.modules}
          formats={NewStory.formats}
          ref={this.editor}
          theme="bubble"
          //value={html}
          onChange={this.ParseChange}
          placeholder="Tell your story..."
        />
        <input
          onKeyDown={this.onKeyDown}
          placeholder="Cover link e.g : https://picsum.photos/800"
          className="article-cover-input"
          id="cover"
          value={this.state.data.cover}
          onChange={this.onChange}
        />
        {this.state.data.content}
       
        <Button variant="success" className="post-btn" onClick={this.postFetch}>
          Post
        </Button>
      </Container>
    );
  }
}

NewStory.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],

    ["bold", "italic", "blockquote"],
    [
      { align: "" },
      { align: "center" },
      { align: "right" },
      { align: "justify" },
    ],

    ["link", "image"],

    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
NewStory.formats = [
  "header",
  "bold",
  "italic",
  "blockquote",
  "align",

  "link",
  "image",
];
