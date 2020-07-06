
const twit = require('twit')
const T = new twit({
	consumer_key: 'CONSUMER_KEY',
	consumer_secret: 'CONSUMER_SECRET',
	access_token: 'ACCESS_TOKEN',
	access_token_secret: 'ACCESS_TOKEN_SECRET'
})

function retweet() {
	let params = {
		q: '#JavaScript', //String you wish to search for
		result_type: 'recent', //order by the most recent tweet
		count: 100 //fetch 100 items per query
	}

	T.get('search/tweets', params, (err, data, response)=>{
		let tweets = data.statuses
		if (!err) {
			//loop through results
			for(let dat of tweets){
				let retweetId = dat.id_str //get the tweet id for each tweet
				if (!dat.favorited == true) { //check if tweet has been liked
					T.post('favorites/create', {id: retweetId}, (err, response)=>{ // like each tweet that has not been liked
						if (!err){
							console.log('Liked')
						}
						if (err) {
							console.log('Something went wrong while liking. Possible deleted Tweet')
						}
					});
				}
				if (!dat.retweeted == true) { //check if tweet has been retweeted
					T.post('statuses/retweet/:id', {id: retweetId}, (err, response)=>{ // retweet each tweet that has not been retweeted
						if (!err){
							console.log('Retweeted')
						}
						if (err) {
							console.log('Something went wrong while retweeting. Possible deleted Tweet')
						}
					})
				}
			}
		}
	})
}

setInterval(retweet, 15000)
