//takes in query and options for start and end date. If start or end is
    //omitted, a default of todays date is inserted
    //**********NOTE:  amount = number of sets to get. each increment adds 10 results 
    //to JSON object returned EX: 0 = 0 - 9, 1 = 10 - 19.

    //NOTHER NOTE: date needs to be in YYYYMMDD format, and in a string
    function searchNYT( entry, amount, start, end ){

        var d = new Date(), startDate = start, endDate = end;

        

        if( start === undefined ){
            startDate = d.getFullYear().toString() + d.getMonth().toString() + d.getDay().toString();
            console.log(startDate);
        }
        if( end === undefined ){
            endDate = d.getFullYear().toString() + d.getMonth().toString() + d.getDay().toString();
            console.log(endDate);
        }
        if( amount === undefined )
            amount = 0;

        let urlQuery = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        urlQuery += '?' + $.param({
                'api-key': "46e02f2d014a489ea182a65f77eb921e",
                'q': entry,
                'begin_date': startDate,
                'end_date' : endDate,
                'page' : amount
                
            });

        var list = new Array();
        $.ajax({ 'url': urlQuery, 'method':"GET" }).then(function(callBack){

            let results = callBack.response.docs;


            for( let i = 0; i < results.length; i++ ){
                let cutTime = results[i].pub_date.indexOf('T');

                results[i].pub_date = results[i].pub_date.slice( 0, cutTime );

                $("#articles").append( "<div id='listing" + i + "'>" +
                
                    "<a href='" + results[i].web_url + "'>" + 
                        results[i].headline.main + "</a><br>" + results[i].pub_date + "</div>"

                );

            }
        });
    
    }

window.onload = function(){
    
    $("#searchButton").on( "click", function(){

        searchNYT( $("#search").val(),  0,      "19970501", "19980220" );
        
    });
    
    
}



