var distance = 120000;
var minutes;
var seconds;
var x = setInterval(function() {
  
    
  
    // Time calculations for days, hours, minutes and seconds
   
     minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
     seconds = Math.floor((distance % (1000 * 60)) / 1000);
     
     let time = minutes + "m " + seconds + "s ";
     
    //  connections.forEach(element=>{
    //      element.sendUTF("{'name':'time','message':'"+time+"'}")
    //     })
        
        distance=distance-1000;

        console.log(time)
    
  }, 1000);