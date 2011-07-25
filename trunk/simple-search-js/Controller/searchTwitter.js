var totalQuery=0;
var totalResults=0;
searchTwitter={
    search:function(){
        $("#wait").show();
        var query =$("#q").val();
        var searchKey="";
        searchTwitter.initValues();
        searchTwitter.createScriptLink("?callback=searchTwitter.searchResults&q="+query);
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
    searchNegativeStatment:function( phrase) {
        var prob=0;
        for (word in negativeWords) {
            if (phrase.indexOf(negativeWords[word].toLowerCase())!=-1) {
                 prob++;
                //return true;
            }
        }
        return prob;
    },
    searchPositiveStatment:function(phrase) {
        var prob=0;
        for (word in positiveWords) {
            if (phrase.indexOf(positiveWords[word].toLowerCase())!=-1) {
                //return true;
                prob++;
            }
        }
        return prob;
    },
    searchResults:function(response){
        var d=new Date();
        /*  negativeProb = searchTwitter.searchNegativeStatment(title);
            positiveProb =searchTwitter.searchPositiveStatment(title);
            if(positiveProb>negativeProb){
                positive++;
                positiveResults.push(response.results[i]);
            }else
            {
                if(positiveProb<negativeProb){
                    negative++;
                    negativeResults.push(response.results[i]);
                }else
                {
                    neutral++;
                    neutralResults.push(response.results[i]);
                }
            }*/
        totalResults+=response.results.length;
        for (var i = 0; i < response.results.length; i++) {
            var title = response.results[i]["text"];
            negativeProb = searchTwitter.searchNegativeStatment(title);
            positiveProb =searchTwitter.searchPositiveStatment(title);
            if(positiveProb>negativeProb){
                positive++;
                positiveResults.push(response.results[i]);
            }else
            {
                if(positiveProb<negativeProb){
                    negative++;
                    negativeResults.push(response.results[i]);
                }else
                {
                    neutral++;
                    neutralResults.push(response.results[i]);
                }
            }
        /*  if (searchTwitter.searchNegativeStatment(title)) {
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
            }*/

        }

        if(response.next_page&&(totalQuery<=50)){
            totalQuery++;
            var parameter_=response.next_page.substr(1);
            searchTwitter.createScriptLink("?callback=searchTwitter.searchResults&"+parameter_);
            
        }else{
            $("#wait").hide();
            $("#totalResults").html(totalResults);
            $("#pos").html(positive);
            $("#neg").html(negative);
            $("#ne").html(neutral);
            searchTwitter.showResults();
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
        out+="<b><a href='http://twitter.com/"+response.from_user+"/status/"+response.id_str+"'>"+response.text+"</a></b>";
        out+="</div>";
        return out;
    }
}

/*
 *
 *TOTAL RESULTS Per Page	176
Positive	150
Negative	24
Neutral	2

 **/


/*TOTAL RESULTS Per Page	176
Positive	155
Negative	3
Neutral	18
*/