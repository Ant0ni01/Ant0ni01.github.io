$(document).ready(function () {
    // Get Images from Imgur
       var settings = {
        "url": "https://api.imgur.com/3/album/ybcziC8/images",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Authorization": "Bearer 76b0b662ae89429c8b066492d2b3ff21099328c3",
        },
      };
    
              //code for row fix on showing images
              $.ajax(settings).done(function (response) {
                var photoHTML = "";
                //Loop through JSON data
                var loopCount = 0;
                $.each(response.data, function(i,images) {
                  photoHTML += '<div class="clearfix visible-sm-block"></div><div class="col-md-4"><div class="fh5co-blog "><img src="'+images.link+'"class="img-responsive" title="'+images.description+'"/><div class="blog-text"><p class="text-format">'+images.description+'</p></div>	</div> </div>  ';
                    {
                    loopCount++;
                    if(loopCount == 3) 
                    return false;
                    }
               
                }); //end each
    
                
            $('#imgur-images').html(photoHTML);
    
            console.log(response);
            });
        });
        
        