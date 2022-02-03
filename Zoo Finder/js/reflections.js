$(document).ready(function () {

//jquery code for image upload
$('#uploadButton').on("click", function() {
            
    var $files = $('#imgFile').get(0).files;

    if ($files.length) {

    // Reject big files - files.size is in bytes, so we convert the max-size value from the form in kb to //bytes (remember 1024 bytes make a kb)
    if ($files[0].size > $(this).data("max-size") * 1024) {
        alert("Please select a smaller file");
        return false;
    }
    
    // Begin file upload
    console.log("Uploading file to Imgur..");
 imageTitle = zooList; 
    // Replace api key with your own API bearer key
    var apiUrl = 'https://api.imgur.com/3/image';
    var apiKey = '76b0b662ae89429c8b066492d2b3ff21099328c3';

    var settings = {
        async: false,
        crossDomain: true,
        processData: false,
        contentType: false,
        type: 'POST',
        url: apiUrl,
        headers: {
        Authorization: 'Bearer ' + apiKey,
        Accept: 'application/json'
        },
        
        mimeType: 'multipart/form-data'
    };
}

    //get the value from the text box
    var imgDesc = $('#imgDesc').val();
    if(imgDesc == "" || imgDesc == null)
    {
        imgDesc = "No Description";
    }

    var zooList = $('#zooList').val();
    var name = $('#name').val();
       
    var formData = new FormData();
    formData.append("image", $files[0]);
    formData.append("album", "ybcziC8"); //set the hash to an album on your imgur account
    formData.append("description", name+" said: "+ imgDesc + " "+"("+zooList+")");
    settings.data = formData;

    // check the console log when in doubt
    $.ajax(settings).done(function(response) {
        console.log(response);
        alert("Upload Successful");
    });


});

});
