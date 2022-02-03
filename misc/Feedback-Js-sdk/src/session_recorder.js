const Session_Recorder = {
    recordSession: function(){
        let events = [];

        rrweb.record({
        emit(event) {
            // push event into the events array
            events.push(event);
            // console.log(events);
        },
        });
        let stopFn = rrweb.record({
            emit(event) {
              if (events.length > 100) {
                // stop after 100 events
                // console.log(events);
                stopFn();
              }
            },
          });
        
        // setInterval(this.recordSession(), 10000);
    },       
}

export default Session_Recorder