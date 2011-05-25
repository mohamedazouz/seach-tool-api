var entiredQuery="";
var totalResults=0;
var pages_index=1;
searchBlog={
    search:function(){
        $("#wait").show();
        var query =$("#q").val();
        var searchKey="";
        searchBlog.initValues();
        entiredQuery=query;
        searchBlog.createScriptLink("&callback=searchBlog.searchResults&q="+query);
    },
    createScriptLink:function(query){
        container  = document.createElement('script');
        link= blogSearchLink + query;
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
        totalResults=0;
        entiredQuery="";
        pages_index=1;
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
        totalResults+=response.responseData.results.length;
        for (var i = 0; i < response.responseData.results.length; i++) {
            var title = response.responseData.results[i]["content"];
            if (searchBlog.searchNegativeStatment(title)) {
                negative++;
                negativeResults.push(response.responseData.results[i]);
            } else {
                if (searchBlog.searchPositiveStatment(title)) {
                    positive++;
                    positiveResults.push(response.responseData.results[i]);
                } else {
                    neutral++;
                    neutralResults.push(response.responseData.results[i]);
                }
            }

        }
        
        if(response.responseData.cursor.pages&&response.responseData.cursor.pages[pages_index]){
            page=response.responseData.cursor.pages[pages_index]
            pages_index++;
            parameter_="q="+entiredQuery+"&start="+page.start+"&label="+page.label;
            searchBlog.createScriptLink("&callback=searchBlog.searchResults&"+parameter_);
        }else{
           $("#wait").hide();
           $("#totalResults").html(totalResults);
            $("#pos").html(positive);
            $("#neg").html(negative);
            $("#ne").html(neutral);
            searchBlog.showResults();
        }
    },
    showResults:function(){
        searchBlog.insertArrayIntoTable();
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
                out+=searchBlog.print(positiveResults[i])
                out+="</td>"
            }else{
                out+="<td width='300px'></td>"
            }
            if(negativeResults[i]){
                out+="<td width='300px'>"
                out+=searchBlog.print(negativeResults[i])
                out+="</td>"
            }else{
                out+="<td width='300px'></td>"
            }
            if(neutralResults[i]){
                out+="<td  width='300px'>"
                out+=searchBlog.print(neutralResults[i])
                out+="</td>"
            }else{
                out+="<td width='300px'></td>"
            }
            out+="</tr>"

        }
        $("#linksResults").html(out);
    },
    print:function(response){
        out="<div>";
        out+=" Blog Title <h3>"+response.title+"</h3>";
        out+=" Blog Author <a href='"+response.blogUrl+"'>"+response.author+"</a><br/>";
        out+="<a href='"+response.postUrl+"'>"+response.content+"</a><br/>";
        out+="</div>";
        return out;
    }
}