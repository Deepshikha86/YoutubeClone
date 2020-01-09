import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchKeyword: 'reactjs',
      Videolist: [],
      loadingStatus: null ,
      currVideoUrl: '',
      comment: '',
      commentList: [],
      likeStatus: 'Like',
      isLoadingError: false
    };
  }
setSearchValue = (event) => {

this.setState({
  searchKeyword: event.target.value
})
console.log(this.state.searchKeyword)
}
searchVideo = async () => {
    this.setState({
    loadingStatus: "LOADING",
    isLoadingError: false
  })
const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&order=viewCount&q=${this.state.searchKeyword}&type=video&videoDefinition=high&key=AIzaSyDijjd2yQlT4lGGtYH_JflEkcD1scuXDK4`);
const myJson = await response.json();
console.log("myJson " , myJson);
if(myJson.items.length == 0) {
  this.setState({
    isLoadingError: true
  })
}
this.setState({
  Videolist: myJson.items
})
console.log(this.state.Videolist)
  this.setState({
    loadingStatus: "LOADED"
  })
}
showMostPopularVideos = async () => {
  this.setState({
    loadingStatus: 'LOADING'
  })
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=15&regionCode=IN&key=AIzaSyDijjd2yQlT4lGGtYH_JflEkcD1scuXDK4`);
const myJson = await response.json();
console.log("myJson " , myJson);
this.setState({
  Videolist: myJson.items,
  loadingStatus: "LOADED"
})
console.log(this.state.Videolist)
this.setState({
  currVideoUrl: this.state.Videolist[0].id.videoId
})
console.log("currVideoUrl" , this.state.currVideoUrl)
}
componentDidMount() {
  this.showMostPopularVideos()
  console.log("Videolist" , this.state.Videolist)
}
setCurrentUrl = (id) => {

  this.setState({
    currVideoUrl: id
  })
}
setComment = (event) => {
  this.setState({
    comment: event.target.value
  })
}
addComment = () => {
  this.setState({
    commentList: [...this.state.commentList, this.state.comment],
    comment: ''
  })
}
likeButton = () => {
  if(this.state.likeStatus == "Like"){
  this.setState({
    likeStatus: 'Liked'
  })
  } else {
      this.setState({
    likeStatus: 'Like'
  })
  }

}
  render() {
    let videos = this.state.Videolist.map(eachVideo => (
<img src={eachVideo.snippet.thumbnails.high.url} style={{ height: '300px', cursor:'pointer'}} onClick={()=> this.setCurrentUrl(eachVideo.id.videoId)} />
        ))
    return (
    
      <div >
        <input class="searchbar" placeholder="Search here..." onChange={this.setSearchValue} />
        <button  onClick={this.searchVideo}>Search</button>
        <br/>
      <div>
      <hr/>
      
{this.state.isLoadingError ? (<h1>No search found</h1>): (
  <iframe class="iframe" src={`https://www.youtube.com/embed/${this.state.currVideoUrl}`}/>
)}


      </div>
      <br/>
     
        <br/>
        <br/>
        <br/>
        <div style={{ width: '300px', float : 'right'}}>
        {this.state.loadingStatus == "LOADING" ? (<h1>Loading...</h1>) : (videos) }
        </div>
         <div style={{display: 'block', float: 'left'}}>
    <button class="like"
  onClick={this.likeButton}>{this.state.likeStatus}</button>
{this.state.commentList.map(eachComment => (
  <li>{eachComment}</li>
))}
         <h3> comments</h3>
    <input class="commentername" onChange={this.setComment} placeholder= "Upgrad" value={this.state.comment}/>

    <input class="comment" onChange={this.setComment} placeholder="Your Comment" value={this.state.comment}/> 
    <br/><br/>
    <button class="commentbtn" onClick={this.addComment}> Comment</button>
    <button onClick={this.addComment} style={{marginLeft:"20px" ,width:'120px'}}> cancel</button>
    
    


      </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));