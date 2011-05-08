/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var positiveWords = ["America", "great", "funny","beautiful","wonderful","intelligent","Absolutely","Abundant","Accept","Acclaimed","Accomplishment","Achievement","Action","Active","Activist","Acumen","Adjust","Admire","Adopt","Adorable","Adored","Adventure","Affirmative","Affluent","Agree","Airy","Alive","Alliance","Alter","Amaze","Amity","Animated","Answer","Appreciation","Approve","Aptitude","Artistic","Assertive","Astonish","Astounding","Astute","Attractive","Authentic","Basic","Beaming","Beautiful","Believe","Benefactor","Benefit","Bighearted","Blessed","Bliss","Bloom","Bountiful","Bounty","Brave","Bright","Brilliant","Bubbly","Bunch","Burgeon","Calm","Celebrate","Certain","Change","Character","Charitable","Charming","Cheer","Cherish","Clarity","Classy","Clean","Clever","Closeness","Commend","Companionship","Complete","Comradeship","Confident","Connect","Connected","Constant","Content","Conviction","Copious","Core","Coupled","Courageous","Creative","Cuddle","Cultivate","Cure","Curious","Cute","Dazzling","Delight","Direct","Discover","Distinguished","Divine","Donate","Each Day","Eager","Earnest","Easy","Ecstasy","Effervescent","Efficient","Effortless","Electrifying","Elegance","Embrace","Encompassing","Encourage","Endorse","Energized","Energy","Enjoy","Enormously","Enthuse","Enthusiastic","Entirely","Essence","Established","Esteem","Esteemed","Everyday","Excited","Exciting","Exhilarating","Expand","Explore","Express","Exquisite","Exultant","Faith","Familiar","Family","Famous","Feat","Fit","Flourish","For the Highest Good","Fortunate","Fortune","Freedom","Fresh","Friendship","Full","Funny","Gather","Generous","Genius","Genuine","Give","Glad","Glow","Gorgeous","Grace","Graceful","Gratitude","Green","Grin","Group","Grow","Handsome","Happy","Harmony","Healed","Healing","Healthful","Healthy","Heart","Hearty","Heavenly","Helpful","Here","Here","Hold","Holy","Honest","Honored","Hug","I affirm","I allow","I am willing","I am.","I Can","I choose","I create","I follow","I know","I know"," without a doubt","I make","I realize","I take action","I trust","Idea","Ideal","Imaginative","In Every Way","In this moment","Increase","Incredible","Independent","Ingenious","Innate","Innovate","Inspire","Instantaneous","Instinct","Intellectual","Intelligence","Intuitive","Inventive","Joined","Jovial","Joy","Jubilation","Keen","Key","Kind","Kiss","Knowledge","Laugh","Leader","Learn","Legendary","Let Go","Light","Lively","Love","Loveliness","Lucidity","Lucrative","Luminous","Maintain","Marvelous","Master","Meaningful","Meditate","Mend","Metamorphosis","Mind-Blowing","Miracle","Mission","Modify","Motivate","Moving","Natural","Nature","Nourish","Nourished","Novel","Now","Nurture","Nutritious","One","Open","Openhanded","Optimistic","Paradise","Party","Peace","Perfect","Phenomenon","Pleasure","Plenteous","Plentiful","Plenty","Plethora","Poise","Polish","Popular","Positive","Powerful","Prepared","Pretty","Principle","Productive","Project","Prominent","Prosperous","Protect","Proud","Purpose","Quest","Quick","Quiet","Ready","Recognized","Refinement","Refresh","Rejoice","Rejuvenate","Relax","Reliance","Rely","Remarkable","Renew","Renowned","Replenished","Resolution","Resound","Resources","Respect","Restore","Revered","Revolutionize","Rewarding","Rich","Right Now","Robust","Rousing","Safe","Secure","See","Sensation","Serenity","Shift","Shine","Shown","Silence","Simple","Sincerity","Smart","Smile","Smooth","Solution","Soul","Sparkling","Spirit","Spirited","Spiritual","Splendid","Spontaneous","Stillness","Stir","Stirring","Strong","Style","Success","Sunny","Support","Sure","Surprise","Sustain","Synchronized","Team","Thankful","Therapeutic","Thorough","Thrilled","Thrive","Tied","Today","Today","Together","Tranquil","Transform","Triumph","Trust","Truth","Unity","Unusual","Unwavering","Upbeat","Valued","Vary","Venerated","Venture","Vibrant","Victory","Vigorous","Vision","Visualize","Vital","Vivacious","Voyage","Wealthy","Welcome","Well","Whole","Wholesome","Willing","With Everyone","Wonder","Wonderful","Wondrous","Yes"];
var negativeWords = ["bad", "stupid", "lazy","idiot","fuck","shit","incredable","ridiculous","kill","destory","Aggravated","Anger","Apoplectic","Avoid","Beg","Bored","Can’t","Collapse","Competition","Confused","Corrupt","Cry","Damage","Depressed","Deprived","Destroy","Disease","Divorce","Don’t","Enraged","Famine","Fear","Fight","Furious","Gossip","Greed","Hate","Hide","Hunger","Hurt","Ignore","Impossible","Irate","Jealousy","Lack","Lie","Livid","Mean","Miser","Mistrust","Misunderstood","No","Old","Pain","Pissed","Revenge","Ruthless","Sabotage","Savage","Scared","Seething","Shouldn’t","Sneaky","Steal","Stress","Sucks","Suppress","Terrified","Threat","Unfair","Unhappy","Unhealthy","Uninterested","Unjust","Unloved","Unwanted","War","Won’t","Wouldn’t","Yell"];
var negative=0,positive=0,neutral=0;
var time=0;
var start=1;
//var allkey="006193276902692689241:sbmg9r8ii5c"
//var apikey="AIzaSyAu4ToDDQZvISG0ZMO8PEyRw5xk6UyOAKI"
//var facebookkey="006193276902692689241:vxiqgwuttsq"
//var twitterkey="006193276902692689241:nlgratbhona"
var allkey="006548529825748814864:wisi6or1kpo"
var apikey="AIzaSyD7AthUC-gi0KCcXrCb93PEjHfTYgK2LaU"
var facebookkey="006548529825748814864:ypu4j_48vzc"
var twitterkey="006548529825748814864:ql7ox0ipmk0"

var positiveResults=[];
var negativeResults=[];
var neutralResults=[];
var crefLink="http://local.activedd.com/azouz/cref.xml";