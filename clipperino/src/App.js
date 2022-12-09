import React from "react";
import axios from "axios";

class App extends React.Component {
constructor(props) {
super(props);
this.state = {
channel: "",
clips: [],
users: {}
};
}

handleChange = event => {
this.setState({ channel: event.target.value });
};

handleSubmit = event => {
event.preventDefault();
const twitchApi = `https://api.twitch.tv/helix/clips?broadcaster_id=${this.state.channel}`;
axios
.get(twitchApi, {
headers: {
"Client-ID": "hqeqfe28iyxpo33uef00u6tizhsthk"
}
})
.then(res => {
this.setState({ clips: res.data.data });
const userCount = {};
this.state.clips.forEach(clip => {
if (clip.creator_name in userCount) {
userCount[clip.creator_name] += clip.view_count;
} else {
userCount[clip.creator_name] = clip.view_count;
}
});
this.setState({ users: userCount });
})
.catch(err => {
console.error(err);
});
};

render() {
return (
<div>
<form onSubmit={this.handleSubmit}>
<label>
Twitch Channel ID:
<input
           type="text"
           value={this.state.channel}
           onChange={this.handleChange}
         />
</label>
<input type="submit" value="Submit" />
</form>
{this.state.clips.length > 0 && (
<div>
<p>Top Users by Clip Views:</p>
{Object.keys(this.state.users)
.sort((a, b) => this.state.users[b] - this.state.users[a])
.map(user => (
<div key={user}>
<p>
{user}: {this.state.users[user]}
</p>
</div>
))}
</div>
)}
</div>
);
}
}

export default App;