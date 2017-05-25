import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import _ from 'lodash';
import "./index.css";

class FirstDemo extends Component{
  constructor(props) {
   super(props);

   this.state = {
    postArray: [],
    commentArray: [],
    isDropdown:true,
    clickIndex:0
  };

this.handleClick = this.handleClick.bind(this);

}

componentWillMount(){
  console.log(this.state.clickIndex);
    axios
      .get('http://jsonplaceholder.typicode.com/posts')
      .then(({ data })=> {
        console.log(this.state.clickIndex);
        this.setState(
          { postArray: data }
        );
      })
      .catch((err)=> {})

}


handleClick(i){

  this.setState(prevState  => ({
    isDropdown :!prevState.isDropdown,
   clickIndex: i
 }), this.getCommentData.bind(this));

}

getCommentData(){
  var index = this.state.clickIndex;
  axios
    .get('http://jsonplaceholder.typicode.com/comments?postId='+ index)
    .then(({ data })=> {
      console.log(data);
      this.setState(
        { commentArray: data }
      );
    })
    .catch((err)=> {})

}

render() {
  console.log(this.state.isDropdown);

  return (
    <div>
      <h3>Comments</h3>
      <ul className="list-group" >
        {this.renderPosts()}
      </ul>
    </div>
  );

}

  renderPosts() {

     console.log(this.state.isDropdown);

     if(this.state.isDropdown){
       return _.map(this.state.postArray, data => {
        return (

       <div  key={data.id} onClick={() => this.handleClick(data.id)} >
         <ul className="list-detail" >

           <li>
             {data.title}</li>

           <li>
             {data.body}</li>


         </ul>
       </div>

     );
   });
 }
 else{
    console.log(JSON.stringify(this.state.commentArray));
    console.log(this.state.clickIndex);
   return _.map(this.state.postArray, data => {
     return (

         <div  key={data.id} className="list-commentwithpost" onClick={() => this.handleClick(data.id)}>
           <ul  >

             <li>
               {data.title}</li>

             <li>
               {data.body}</li>

             {(() =>{
               if(this.state.clickIndex === data.id){
                 return this.renderCommentswithPost();
               }
             })()

             }

           </ul>
         </div>

     );
   });
 }
}

 renderCommentswithPost(){

   console.log(JSON.stringify(this.state.commentArray));
    return _.map(this.state.commentArray, data => {
      return (
         <div  key={data.id}>
           <ul className="list-detail" >
             <li>{data.postId}</li>
             <li>{data.name}</li>
             <li>{data.email}</li>
             <li>{data.body}</li>

           </ul>
         </div>
       );
     });
   }
  }

  ReactDOM.render(<FirstDemo />,document.getElementById('root'));
