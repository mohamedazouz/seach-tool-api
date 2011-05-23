/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var totalQuery=0;
var totalResults=0;
searchTwitter={
    search:function(){
        $("#wait").show();
        var query =$("#q").val();
        var searchKey="";
        var selection= $("input[@name=category]:checked").val();
        if(selection=="facebook"){
            searchKey=facebookkey
        }
        searchTwitter.initValues();
        searchTwitter.createScriptLink("?callback=searchTwitter.searchResults&q="+query);
    },
    searchLoop:function(query){
    //for all results
    /*searchTwitter.getSearchResults(query,parameter,function(response){
            if(response.data.length==0){
                searchTwitter.searchResults(fabookData);
                return;
            }else{
                //fabookData.push(response);

                searchTwitter.searchResults(response)
                parameter_=response.paging.next.substr(response.paging.next.indexOf("&callback"));
                searchFacebook.searchLoop(query,parameter_);
            }
        });*/

    /*searchTwitter.getSearchResults(query,parameter,function(response){
            searchTwitter.searchResults(response)
            $("#wait").hide();
        });*/

    },
    createScriptLink:function(query){
        container  = document.createElement('script');
        link= twitterSearchLink + query;
        container.setAttribute("src",link);
        document.body.appendChild(container);

    },
    initValues:function(){
        neutralResults=[];
        positiveResults=[];
        negativeResults=[];
        fabookData=[];
        start=1;
        negative=0
        positive=0
        neutral=0;
        totalQuery=0;
        totalResults=0
    },
    getSearchResults:function(q,parameter,callback){
        //   alert(token.access_token)
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
            //alert(positiveWords[word].toLowerCase())
            if (phrase.indexOf(positiveWords[word].toLowerCase())!=-1) {
                return true;
            }
        }
        return false;
    },
    searchResults:function(response){
        var d=new Date();
        totalResults+=response.results.length;
        for (var i = 0; i < response.results.length; i++) {
            var title = response.results[i]["text"];
            //alert(title)
            if (searchTwitter.searchNegativeStatment(title)) {
                negative++;
                negativeResults.push(response.results[i]);
            } else {
                if (searchTwitter.searchPositiveStatment(title)) {
                    positive++;
                    positiveResults.push(response.results[i]);
                } else {
                    neutral++;
                    neutralResults.push(response.results[i]);
                }
            }

        }

        if(response.next_page&&(totalQuery<=50)){
            totalQuery++;
            var parameter_=response.next_page.substr(1);
            searchTwitter.createScriptLink("?callback=searchTwitter.searchResults&"+parameter_);
            
        }else{
           // alert("")
           $("#wait").hide();
           $("#totalResults").html(totalResults);
            $("#pos").html(positive)
            $("#neg").html(negative)
            $("#ne").html(neutral)
            var now=new Date();
            var eshta=new Date(now.getTime()-d.getTime());
            var time=0;
            time+=eshta.getSeconds();
            $("#time").html(time);
        }
    },
    showResults:function(){
        searchTwitter.insertArrayIntoTable();
    },
    insertArrayIntoTable:function(){
        var out="";
        var tableSize=Math.max(positiveResults.length,Math.max(negativeResults.length,neutralResults.length));
        for(i=0;i<tableSize;i++){
            //postive
            out+="<tr>"
            out+="<td>"+(i+1)+"</td>"
            if(positiveResults[i]){
                out+="<td width='300px'>"
                out+=searchTwitter.print(positiveResults[i].type,positiveResults[i])
                out+="</td>"
            }else{
                out+="<td width='300px'></td>"
            }
            if(negativeResults[i]){
                out+="<td width='300px'>"
                out+=searchTwitter.print(negativeResults[i].type,negativeResults[i])
                out+="</td>"
            }else{
                out+="<td width='300px'></td>"
            }
            if(neutralResults[i]){
                out+="<td  width='300px'>"
                out+=searchTwitter.print(neutralResults[i].type,neutralResults[i])
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
        out+="<a href='http://www.twitter.com/"+response.from_user+"'><img src='"+response.profile_image_url+"'/></a><br>"
        out+="<b>"+response.text+"</a>";
        out+="</div>";
        return out;
    }
}

