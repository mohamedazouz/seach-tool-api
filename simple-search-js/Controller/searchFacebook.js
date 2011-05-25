searchFacebook={
    search:function(){
        $("#wait").show();
        var query =$("#q").val();
        var searchKey="";
        searchFacebook.initValues();
        searchFacebook.searchLoop(query,"");
    },
    searchLoop:function(query,parameter){
        //for all results
        /*searchFacebook.getSearchResults(query,parameter,function(response){
            if(response.data.length==0){
                searchFacebook.searchResults(fabookData);
                return;
            }else{
                //fabookData.push(response);

                searchFacebook.searchResults(response)
                parameter_=response.paging.next.substr(response.paging.next.indexOf("&callback"));
                searchFacebook.searchLoop(query,parameter_);
            }
        });*/
        
        searchFacebook.getSearchResults(query,parameter,function(response){
            searchFacebook.searchResults(response);
            $("#totalResults").html(response.data.length);
            $("#wait").hide();
            searchFacebook.showResults();
        });

    }
    ,
    initValues:function(){
        neutralResults=[];
        positiveResults=[];
        negativeResults=[];
        fabookData=[];
        start=1;
        negative=0
        positive=0
        neutral=0;
    },
    getSearchResults:function(q,parameter,callback){
        FB.api("/search?q="+q+"&limit=500"+parameter,{
            access_token:token.access_token
        }, function(response) {
            callback(response)
        })
    },
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
            if (phrase.indexOf(positiveWords[word].toLowerCase())!=-1) {
                return true;
            }
        }
        return false;
    },
    searchResults:function(response){
        var d=new Date();
        for (var i = 0; i < response.data.length; i++) {
            var title = "";
            if(response.data[i]["message"]){
                title=response.data[i]["message"].toLowerCase();
            }else
            {
                if(response.data[i]["description"]){
                 
                    title=response.data[i]["description"].toLowerCase();
                }else
                {
                    if(response.data[i]["caption"]){
                        title=response.data[i]["caption"].toLowerCase();
                    }else
                    {
                        continue;
                    }
                }
            }
            if (searchFacebook.searchNegativeStatment(title)) {
                negative++;
                negativeResults.push(response.data[i]);
            } else {
                if (searchFacebook.searchPositiveStatment(title)) {
                    positive++;
                    positiveResults.push(response.data[i]);
                } else {
                    neutral++;
                    neutralResults.push(response.data[i]);
                }
            }
            
        }
        $("#pos").html(positive)
        $("#neg").html(negative)
        $("#ne").html(neutral)

    },
    showResults:function(){
        searchFacebook.insertArrayIntoTable();
    },
    insertArrayIntoTable:function(){
        var out="";
        var tableSize=Math.max(positiveResults.length,Math.max(negativeResults.length,neutralResults.length));
        for(i=0;i<tableSize;i++){
            out+="<tr>"
            out+="<td>"+(i+1)+"</td>"
            if(positiveResults[i]){
                out+="<td width='300px'>"
                out+=searchFacebook.print(positiveResults[i].type,positiveResults[i])
                out+="</td>"
            }else{
                out+="<td width='300px'></td>"
            }
            if(negativeResults[i]){
                out+="<td width='300px'>"
                out+=searchFacebook.print(negativeResults[i].type,negativeResults[i])
                out+="</td>"
            }else{
                out+="<td width='300px'></td>"
            }
            if(neutralResults[i]){
                out+="<td  width='300px'>"
                out+=searchFacebook.print(neutralResults[i].type,neutralResults[i])
                out+="</td>"
            }else{
                out+="<td width='300px'></td>"
            }
            out+="</tr>"

        }
        $("#linksResults").html(out);
    },
    print:function(type,response){
        var out="<div>";
        
        if(type=="status"){
            out+="<b>"+response.type+"</b><br/>";
            out+="<b><a href='http://www.facebook.com/permalink.php?story_fbid="+response.id.split("_")[1]+"&id="+response.id.split("_")[0]+"'>"+response.message+"</a></b><br/>";
        }else
        {
            out+="<img src='"+response.icon+"'/>&nbsp;&nbsp;&nbsp"
            out+="<a href="+response.link+"><b>"+response.type+"</b></a><br/>";
        }
        out+="<br>From User &nbsp;: &nbsp;&nbsp;  <a href='http://www.facebook.com/profile.php?id="+response.from.id+"'>"+response.from.name+"</a><br>";
        if(type=="video" || type=="link"){
            temp=""
            if(response.message){
                temp=response.message;
            }else
            {
                temp="link";
            }
            out+="<b><a href='http://www.facebook.com/permalink.php?story_fbid="+response.id.split("_")[1]+"&id="+response.id.split("_")[0]+"'>"+temp+"</a></b><br/>";
             temp="";
            if(response.description){
                temp=response.description;
            }
            out+=temp;
        }
        if(type=="photo"){
            temp="";
            if(response.caption){
                temp=response.caption;
            }else
            {
                temp="link";
            }
            out+="<b><a href='http://www.facebook.com/permalink.php?story_fbid="+response.id.split("_")[1]+"&id="+response.id.split("_")[0]+"'>"+temp+"</a></b><br/>";
            temp="";
            if(response.description){
                temp=response.description;
            }
            out+="<div>"+temp+"</div>";
        }
        out+="</div>";
        return out;
    }
}

