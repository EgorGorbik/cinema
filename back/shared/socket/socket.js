const Session = require('../../Sessions/session.service');

function socketEvents(io) {
    let session = new Session();

    io.on('connection',function(socket){

        socket.on('connectSessionRoom', async function (obj) {
            socket.join(obj.id);
            //io.sockets.in(obj.id).emit('socketInRoom', 'на этой сеансе кто то ещ>');
        })

        socket.on('choosePlace', async function (obj) {
            console.log(obj)
            let rez = await session.choosePlace(obj.idRoom, obj.idPlace);
            console.log('rez')
            console.log(rez)
            //socket.join(obj.id);
            socket.broadcast.to(obj.idRoom).emit('smdChoosePlace', obj.idPlace);
        })

        socket.on('cancelChoosePlace', async function (obj) {
            console.log(obj)
            //socket.join(obj.id);
            socket.broadcast.to(obj.idRoom).emit('smdCancelChoosePlace', obj.idPlace);
        })
    })
}

module.exports = socketEvents;