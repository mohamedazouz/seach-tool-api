/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


search={
    search:function(){
        var query =$("#q").val();
        var searchKey="";
        var selection= $("input[@name=category]:checked").val();
        if(selection=="facebook"){
            searchKey=facebookkey
        }else
        {
            if(selection=="twitter"){
                searchKey=twitterkey
            }else
            {
                searchKey=allkey
            }
        }
        search.initValues();
        /*for(i=0;i<10;i++){
            search.createScriptLink(apikey,searchKey,query,start);
            start+=10;
        }*/

     search.searchResults(searchResults);
    },
    initValues:function(){
        neutralResults=[];
        positiveResults=[];
        negativeResults=[];
        start=1;
        negative=0
        positive=0
        neutral=0;
    }
    ,
    searchNegativeStatment:function( phrase) {
        for (word in negativeWords) {
            if (phrase.indexOf(negativeWords[word].toLowerCase())!=-1) {
                return true;
            }
        }
        return false;
    },
    searchPositiveStatment:function(phrase) {
        for (word in positiveWords) {
            //alert(positiveWords[word].toLowerCase())
            if (phrase.indexOf(positiveWords[word].toLowerCase())!=-1) {
                return true;
            }
        }
        return false;
    },
    searchResults:function(response){
        //console.log(new Date().getTime());
        var d=new Date();
        for (var i = 0; i < response.items.length; i++) {
            var title = response.items[i]["snippet"].toLowerCase();
            if (search.searchNegativeStatment(title)) {
                negative++;
                negativeResults.push(response.items[i]);
            } else {
                if (search.searchPositiveStatment(title)) {
                    positive++;
                    positiveResults.push(response.items[i]);
                } else {
                    neutral++;
                    neutralResults.push(response.items[i]);
                }
            }
        }
        
        $("#pos").html(positive)
        $("#neg").html(negative)
        $("#ne").html(neutral)
        var now=new Date();
        var eshta=new Date(now.getTime()-d.getTime());
        time+=eshta.getSeconds();
        $("#time").html(time);
        //console.log(new Date().getTime());

    },
    createScriptLink:function(APIKey,searchKey,query,start){
        
        //https://www.googleapis.com/customsearch/v1?key=AIzaSyAu4ToDDQZvISG0ZMO8PEyRw5xk6UyOAKI&cx=006548529825748814864:wisi6or1kpo&q=bin laden&callback=eshta&start=10
        container  = document.createElement('script');
        //container.setAttribute("src", "https://www.googleapis.com/customsearch/v1?key=AIzaSyCK2tCHU75RMCeSV4qMMNpzhh5LuyZIFBc&cx=006548529825748814864:wisi6or1kpo&q=Obama&callback=search.searchResults&start="+start);
        link= "https://www.googleapis.com/customsearch/v1?key=" + APIKey + "&cx=" + searchKey + "&q="+query+"&start=" + start+"&callback=search.searchResults";
        container.setAttribute("src",link);
        document.body.appendChild(container);
        
    },
    showResults:function(){
        /*search.insertArrayIntoTable(positiveResults,"link-pos");
        search.insertArrayIntoTable(negativeResults,"link-neg");
        search.insertArrayIntoTable(neutralResults,"link-ne");*/
        search.insertArrayIntoTable("","");
    },
    insertArrayIntoTable:function(array,name){
        var out="";
      /*  for(i=0;i<array.length;i++){
            out+="<div class='search-links'>";
            out+="<b><a href="+array[i].link+">"+array[i].htmlTitle+"</a></b><br/>";
            out+="<div>"+array[i].htmlSnippet+"</div>";
            out+="</div>";
        }*/
        var tableSize=Math.max(positiveResults.length,Math.max(negativeResults.length,neutralResults.length));
        for(i=0;i<tableSize;i++){
            //postive
            out+="<tr>"
            out+="<td>"+(i+1)+"</td>"
            if(positiveResults[i]){
                out+="<td width='300px'>"
                out+="<div>";
                out+="<b><a href="+positiveResults[i].link+">"+positiveResults[i].htmlTitle+"</a></b><br/>";
                out+="<div>"+positiveResults[i].htmlSnippet+"</div>";
                out+="</div>";
                out+="</td>"
            }else{
                out+="<td width='300px'></td>"
            }
            if(negativeResults[i]){
                out+="<td width='300px'>"
                out+="<div>";
                out+="<b><a href="+negativeResults[i].link+">"+negativeResults[i].htmlTitle+"</a></b><br/>";
                out+="<div>"+negativeResults[i].htmlSnippet+"</div>";
                out+="</div>";
                out+="</td>"
            }else{
                out+="<td width='300px'></td>"
            }
            if(neutralResults[i]){
                out+="<td  width='300px'>"
                out+="<div >";
                out+="<b><a href="+neutralResults[i].link+">"+neutralResults[i].htmlTitle+"</a></b><br/>";
                out+="<div>"+neutralResults[i].htmlSnippet+"</div>";
                out+="</div>";
                out+="</td>"
            }else{
                out+="<td width='300px'></td>"
            }
            out+="</tr>"
            
        }
        $("#linksResults").html(out);
    }
}