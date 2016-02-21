function analyze() {
    $('#analyzeBtn').prop('disabled', true);
    $('#analyzeBtn').html('<img src="theme/images/loading.gif" />');
    searchTerm = $("#searchTermTxt").val();
    $.ajax({
        url: '/analyze/twitter-score/' + searchTerm,
        type: 'GET',
        data: 'text/plain'
    }).done(function(result) {
            if(result === "DEFAULT") {
                result = "UNKNOWN";
            }
            $("#analysis").text(result);
            $('#analyzeBtn').prop('disabled', false);
            $('#analyzeBtn').text('Analyze');
    }).fail(function(error) {
            console.log("ERROR: " + error);
    }).always(function() {
            console.log("Request completed.");
    });
}


