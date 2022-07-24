const SocketServer = require('websocket').server
const http = require('http')

const server = http.createServer((req, res) => { })

const GAME_DURATION = 20 * 1000;
const TIME_OUT = 5 * 1000;
let distance = GAME_DURATION;
let obj = "{'name':'time','message':'" + distance + "'}";

let centerCard = null;
let andarCard = null;
let baharCard = null;


server.listen(3000, () => {
    console.log("Listening on port 3000...")
})

wsServer = new SocketServer({ httpServer: server })

const connections = []

let i = 0;


wsServer.on('request', (req) => {
    const connection = req.accept()
    console.log('new connection')
    connections.push(connection)

    connection.sendUTF("{'type':'centerCard','centerCard': " + centerCard + "}");
    connection.sendUTF("{'type':'time','message': " + distance + "}");

    connection.on('message', (mes) => {
        connections.forEach(element => {


            if (element != connection) {
                element.sendUTF(mes.utf8Data)
            }
            console.log(mes.utf8Data)
        })
    })

    connection.on('close', (resCode, des) => {
        console.log('connection closed')
        connections.splice(connections.indexOf(connection), 1)
    })

})



var minutes;
var seconds;
var x = setInterval(function () {


    // Time calculations for days, hours, minutes and seconds

    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance % (1000 * 60)) / 1000);

    let time = minutes + " : " + seconds;

    //  if(distance>=0){
    //  connections.forEach(element=>{
    //      element.sendUTF("{'type':'time','message':'"+time+"'}")
    //     })}



    if (distance == GAME_DURATION - 1000) {

        console.log("gameDuration");
        if (centerCard === null) {
            centerCard = Math.floor(Math.random() * 52);
        }

        connections.forEach(element => {
            element.sendUTF("{'type':'centerCard','centerCard': " + centerCard + "}");
            
        });
    }
    if (distance == 0) {
        if (andarCard === null && baharCard === null) {
            andarCard = Math.floor(Math.random() * 52);
            baharCard = Math.floor(Math.random() * 52);
        }

        connections.forEach(element => {
            element.sendUTF("{'type':'sideCards','andarCard': " + andarCard + ", 'baharCard': " + baharCard + "}")
        });
    }

    if (distance == -(TIME_OUT - 2000)) {
        connections.forEach(element => {
            element.sendUTF("{'type':'resetGame'}");
        })
    }

    if (distance == -TIME_OUT) {
        distance = GAME_DURATION;
        centerCard = null;
        andarCard = null;
        baharCard = null;
        connections.forEach(element=>{
            element.sendUTF("{'type':'restart', 'time':"+GAME_DURATION+"}")
        })
    }

//     console.log(time)
    distance = distance - 1000;

}, 1000);
